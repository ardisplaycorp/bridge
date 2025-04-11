import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { USDZExporter } from "three/examples/jsm/exporters/USDZExporter.js";
import { MeshoptDecoder } from "./meshopt_decoder.module.js"; // Ensure this path is correct

/**
 * Generates a USDZ Blob URL from a given GLB file URL.
 *
 * @param {string} glbUrl - The URL of the GLB file to convert.
 * @param {"horizontal"|"vertical"} [anchoringAlignment="horizontal"] - Use "horizontal" for floor, "vertical" for wall placement.
 * @param {{scaleX: number, scaleY: number, scaleZ: number}} [scale] - If given, apply this scale to the scene before export.
 * @returns {Promise<string>} A promise that resolves with a Blob URL string (e.g., "blob:http://...").
 *                            The caller is responsible for revoking this URL using URL.revokeObjectURL() when no longer needed.
 */
export function createUSDZModelFromGLB(
  glbUrl,
  anchoringAlignment = "horizontal",
  scale
) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    // Setup DRACOLoader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/"
    ); // Use CDN URL for decoders
    dracoLoader.preload(); // Optional, but can help to load decoders sooner
    console.log(dracoLoader);
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      glbUrl,
      (gltf) => {
        // Process the loaded GLTF scene
        gltf.scene.traverse((child) => {
          if (child.isMesh && child.material) {
            // Ensure materials are single-sided for USDZ compatibility/performance
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];
            materials.forEach((material) => {
              if (material.side === THREE.DoubleSide) {
                material.side = THREE.FrontSide;
                material.needsUpdate = true; // Good practice to flag update
              }
              // Optional: Add other material adjustments if needed
              // if (material.map) material.map.encoding = THREE.sRGBEncoding;
              // if (material.emissiveMap) material.emissiveMap.encoding = THREE.sRGBEncoding;
              // ... etc ...
            });
          }
        });

        if (scale) {
          gltf.scene.scale.set(scale.scaleX, scale.scaleY, scale.scaleZ);
        }

        // Apply rotation for vertical anchoring *before* exporting
        if (anchoringAlignment === "vertical") {
          // Rotate around the X-axis to align Z-up (GLTF) with Y-up (often expected for vertical AR)
          // Note: USDZ itself is Y-up, so this might be correct depending on exporter interpretation
          gltf.scene.rotation.x = -Math.PI / 2;
        }

        // Ensure world matrices are updated after scale/rotation changes
        gltf.scene.updateMatrixWorld(true);

        const usdzExportOptions = {
          ar: {
            anchoring: { type: "plane" },
            planeAnchoring: { alignment: anchoringAlignment },
          },
          // includeAnchoringProperties: true, // Generally implied by 'ar' options
          quickLookCompatible: false, // Set true for basic iOS AR Quick Look compatibility if needed, might limit features
          maxTextureSize: 1024, // Limit texture size for performance/compatibility
          // Consider adding `embedImages: true` if textures aren't loading
        };

        const exporter = new USDZExporter();
        exporter.parse(
          gltf.scene,
          (usdzArrayBuffer) => {
            // Create a Blob from the ArrayBuffer
            const usdzBlob = new Blob([usdzArrayBuffer], {
              type: "model/vnd.usdz+zip", // More specific USDZ MIME type
            });

            // Create a Blob URL from the Blob
            const blobUrl = URL.createObjectURL(usdzBlob);

            console.log(blobUrl);

            // Resolve the promise with the Blob URL string
            resolve(blobUrl);
          },
          (error) => {
            console.error("Error during USDZ export:", error);
            reject(new Error(`USDZ export failed: ${String(error)}`));
          },
          usdzExportOptions
        );
      },
      undefined, // onProgress callback (optional)
      (error) => {
        // Handle GLTF loading errors
        console.error("Error loading GLB:", glbUrl, error);
        reject(
          new Error(`Failed to load GLB from ${glbUrl}: ${String(error)}`)
        );
      }
    );
  });
}

// --- Example Usage (and cleanup) ---
/*
async function convertAndUse() {
  const glbModelUrl = '/path/to/your/model.glb'; // Replace with your actual GLB URL
  let usdzBlobUrl = null;

  try {
    console.log("Starting conversion...");
    usdzBlobUrl = await createUSDZModelFromGLB(glbModelUrl, "horizontal");
    console.log("Conversion successful. USDZ Blob URL:", usdzBlobUrl);

    // Now you can use the blobUrl, e.g., set it as the src for an <a> tag or <model-viewer>
    const link = document.createElement('a');
    link.href = usdzBlobUrl;
    // Derive filename for download attribute (optional but good practice)
    const filename = (glbModelUrl.split('/').pop() || 'model.glb').replace(/\.glb$/i, '.usdz');
    link.download = filename;
    link.textContent = `Download ${filename}`;
    link.rel="ar"; // Add rel="ar" for iOS Quick Look hint
    const img = document.createElement('img'); // Add a preview image inside the link if desired
    img.src = '/path/to/your/preview.jpg'; // Optional preview image
    img.alt = 'Preview of 3D model';
    link.appendChild(img);

    document.body.appendChild(link);

    // Or use with <model-viewer>
    // const modelViewer = document.getElementById('my-model-viewer');
    // if (modelViewer) {
    //   modelViewer.iosSrc = usdzBlobUrl;
    // }

    // --- IMPORTANT CLEANUP ---
    // Keep the URL alive for as long as needed.
    // For example, if it's just for a download link that the user clicks once:
    // You might revoke it *after* the user potentially clicks, maybe on window unload,
    // or after a timeout if you assume the download started.
    // If it's for a <model-viewer>, revoke it when the component is removed or the src changes.

    // Example: Revoke after 5 minutes (adjust strategy as needed)
    // setTimeout(() => {
    //   if (usdzBlobUrl) {
    //     console.log("Revoking Blob URL:", usdzBlobUrl);
    //     URL.revokeObjectURL(usdzBlobUrl);
    //     usdzBlobUrl = null; // Clear reference
    //   }
    // }, 5 * 60 * 1000);

  } catch (error) {
    console.error("USDZ generation failed:", error);
    // Handle the error appropriately in your UI

    // Ensure cleanup even on failure if a URL was somehow created before error
    if (usdzBlobUrl) {
       URL.revokeObjectURL(usdzBlobUrl);
    }
  }
}

// Call the example usage function
// convertAndUse();
*/
