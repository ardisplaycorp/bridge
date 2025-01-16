import * as THREE from "three";
import { ModelViewerElement } from "@google/model-viewer";
import QRCodeStyling from "qr-code-styling";
import normalTemplate from "./templates/normal.js";
import modalTemplate from "./templates/modal.js";
import buttonTemplate from "./templates/button.js";
import { icons } from "lucide";
import "./style.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class ARDisplayViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.currentSize = "m";
    this.calculatedScale = null;
    // Holds the JSON from "src" plus variant data
    this.modelData = null;
    // This will be replaced per-variant once we measure the unscaled bounding box
    this.originalSize = null;

    // Will store the array of variant info, each with:
    // { url, image, sizes, blobUrl, boundingBox: { x, y, z } }
    this.variants = [];

    // For each variant index => { s: {width, height, depth}, m: {...}, ... }
    this.variantSizes = [];

    // Initialize custom 'scale' event
    this.scaleEvent = new Event("scale", { bubbles: true, composed: true });
  }

  async connectedCallback() {
    const attributes = this._getAttributes();

    // 1. Fetch the model JSON.
    await this._getModelData();

    // 2. Preload the variant models as blobs and measure their bounding boxes.
    await this._preloadVariants();

    // 3. Create styles, template, and place any user-slotted content.
    this._createStyles();
    this._loadTemplate(attributes.viewMode);
    this._moveSlottedContent();

    // 4. Wire up event listeners, etc.
    this._setupEventListeners();
    const modelViewer = this.shadowRoot.querySelector("model-viewer");
    this._setupBottomNavBar(modelViewer);
  }

  async _getModelData() {
    const url = this.getAttribute("src");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      this.modelData = data;
      this._setupVariantsSizes();
    } catch (error) {
      console.error(error.message);
    }
  }

  _setupVariantsSizes() {
    this.variants = this.modelData?.options || [];
    // We'll create an array parallel to this.variants, each element is an object of sizes keyed by label
    this.variantSizes = [];

    this.variants.forEach((variant, variantIndex) => {
      const sizesForThisVariant = {};
      variant.sizes.forEach((size) => {
        const key = size.label.toLowerCase();
        sizesForThisVariant[key] = {
          width: size.width,
          height: size.height,
          depth: size.depth || "",
        };
      });
      // Store these size definitions for each variant
      this.variantSizes[variantIndex] = sizesForThisVariant;
    });
  }

  //---------------------------------------------------------------------------
  // Preload each variant’s GLB/GLTF as a Blob, measure bounding box unscaled
  //---------------------------------------------------------------------------
  async _preloadVariants() {
    // If no variants, do nothing
    if (!this.variants || this.variants.length === 0) return;

    const gltfLoader = new GLTFLoader();

    for (let i = 0; i < this.variants.length; i++) {
      const variant = this.variants[i];
      if (!variant.url) continue;

      try {
        // 1) Fetch as Blob
        const res = await fetch(variant.url);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch variant ${i}, status: ${res.status}`
          );
        }
        const blob = await res.blob();
        variant.blobUrl = URL.createObjectURL(blob);

        // 2) Measure bounding box using GLTFLoader
        // Use the blob URL so we don't re-fetch from network.
        const size = await new Promise((resolve, reject) => {
          gltfLoader.load(
            variant.blobUrl,
            (gltf) => {
              const box = new THREE.Box3().setFromObject(gltf.scene);
              const dimension = new THREE.Vector3();
              box.getSize(dimension);
              resolve(dimension);
            },
            undefined,
            (err) => reject(err)
          );
        });

        variant.boundingBox = {
          x: size.x,
          y: size.y,
          z: size.z,
        };
      } catch (err) {
        console.warn(`Error preloading variant ${i}:`, err);
      }
    }
  }

  _getAttributes() {
    return {
      modelSrc: this.getAttribute("src") || "",
      modelPoster: this.getAttribute("poster") || "",
      ar: true,
      cameraControls: true,
      touchAction: "none",
      viewMode: this.getAttribute("view-mode") || "normal",
      arPlacement: this.getAttribute("ar-placement") || "floor",
    };
  }

  _createStyles() {
    const styles = document.createElement("style");
    styles.textContent = `
/* Add your styles here */
model-viewer {
width: 100%;
height: 100%;
--min-hotspot-opacity: 0;
position: relative;
}

model-viewer[ar-status="session-started"] .qr-code-button {
display: none;
}

model-viewer[ar-status="object-placed"] .qr-code-button {
display: none;
}

.dimensionLineContainer {
pointer-events: none;
display: block;
}

.dimensionLine {
stroke: #16a5e6;
stroke-width: 2;
stroke-dasharray: 2;
}

.hide {
display: none;
}

.dot {
display: none;
}

.qr-modal {
display: none;
position: fixed;
z-index: 1000;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 100vw;
height: 100vh;
overflow: hidden;
background-color: rgba(0,0,0,0.4);
backdrop-filter: blur(5px);
justify-content: center;
align-items: center;
font-family: sans-serif;
}

.qr-modal-content {
background-color: #fefefe;
border: 1px solid #888;
width: 820px;
height: 418px;
position: relative;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.qr-modal-content h2 {
margin-top: 0;
color: #333;
text-align: center;
}

.qr-code-container {
display: flex;
justify-content: center;
align-items: center;
margin: 20px 0;
}

.qr-close-button {
position: absolute;
top: 10px;
right: 10px;
width: 30px;
height: 30px;
background-color: rgba(0, 0, 0, 0.5);
color: white;
font-size: 28px;
font-weight: bold;
cursor: pointer;
border: none;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
}
`;
    this.shadowRoot.appendChild(styles);
  }

  _loadTemplate(viewMode) {
    let template;
    if (viewMode === "modal") {
      template = modalTemplate;
    } else if (viewMode === "normal") {
      template = normalTemplate;
    } else {
      template = buttonTemplate;
    }

    const attributes = this._getAttributes();
    const templateString = template(
      attributes.ar,
      attributes.cameraControls,
      attributes.touchAction,
      attributes.modelPoster,
      attributes.arPlacement,
      this.modelData
    );
    this.shadowRoot.innerHTML += templateString;

    // Process the icons within the shadow root
    this._processLucideIcons();
  }

  _updateSizePanel(variantIndex) {
    const sizePanel = this.shadowRoot.querySelector(".size-panel");
    if (!sizePanel) return;

    // Clear existing size buttons
    sizePanel.innerHTML = "";

    // Create the wrapper again
    const sizeButtonsWrapper = document.createElement("div");
    sizeButtonsWrapper.classList.add("size-buttons-wrapper");

    const sizesForVariant = this.variantSizes[variantIndex];
    if (sizesForVariant) {
      Object.entries(sizesForVariant).forEach(([sizeKey, sizeValues]) => {
        const button = document.createElement("button");
        button.classList.add("size-button");
        button.textContent = sizeKey;
        button.setAttribute("data-size-key", sizeKey);
        // Enable as soon as variant is chosen
        button.disabled = false;

        // On click, apply that size
        button.addEventListener("click", (event) => {
          // Remove "selected" from all size buttons
          const allSizeBtns = this.shadowRoot.querySelectorAll(".size-button");
          allSizeBtns.forEach((btn) => btn.classList.remove("selected"));

          // Add "selected" to the clicked button
          event.target.classList.add("selected");

          // Calculate scale and apply
          this.calculateAndApplyScale(sizeValues);
        });

        sizeButtonsWrapper.appendChild(button);
      });
    }

    sizePanel.appendChild(sizeButtonsWrapper);
  }

  _processLucideIcons() {
    const element = this.shadowRoot.querySelector("[data-lucide]");
    if (!element) return;

    const iconName = element.getAttribute("data-lucide");
    const iconData = icons[iconName];

    if (iconData) {
      // Create the SVG element
      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        iconData[0]
      );

      // Set attributes on the SVG element
      const svgAttributes = iconData[1];
      for (const attr in svgAttributes) {
        svgElement.setAttribute(attr, svgAttributes[attr]);
      }

      // Update attributes based on element attributes
      svgElement.setAttribute(
        "width",
        element.getAttribute("width") ||
          svgElement.getAttribute("width") ||
          "24"
      );
      svgElement.setAttribute(
        "height",
        element.getAttribute("height") ||
          svgElement.getAttribute("height") ||
          "24"
      );
      svgElement.setAttribute(
        "color",
        element.getAttribute("color") ||
          svgElement.getAttribute("color") ||
          "currentColor"
      );

      // Create child elements (paths, circles, etc.)
      const childElementsData = iconData[2];
      childElementsData.forEach((childData) => {
        const childElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          childData[0]
        );
        const childAttributes = childData[1];
        for (const attr in childAttributes) {
          childElement.setAttribute(attr, childAttributes[attr]);
        }
        svgElement.appendChild(childElement);
      });

      // Replace the element with the new SVG element
      element.parentNode.replaceChild(svgElement, element);
    } else {
      console.warn(`Icon "${iconName}" not found in Lucide icons.`);
    }
  }

  _moveSlottedContent() {
    const customPanel = this.shadowRoot.querySelector(
      ".ar-display-custom-panel"
    );
    const slottedContent = this.querySelector('[slot="custom-panel"]');
    if (customPanel && slottedContent) {
      customPanel.appendChild(slottedContent);
    } else {
      const arDisplayDetailsPanel =
        this.shadowRoot.querySelector(".details-panel");
      if (arDisplayDetailsPanel) {
        arDisplayDetailsPanel.remove();
      }
    }
  }

  _setupEventListeners() {
    const modelViewer = this.shadowRoot.querySelector("model-viewer");

    if (this.getAttribute("view-mode") === "modal") {
      this._setupModalEventListeners();
    } else {
      this._setupNormalEventListeners();
    }

    document.addEventListener("scale", () =>
      this._setupDimensions(modelViewer)
    );

    this._setupQRCodeListeners(modelViewer);
  }

  _setupQRCodeListeners(modelViewer) {
    const qrCodeButton = this.shadowRoot.querySelector(".qr-code-button");
    const qrModal = this.shadowRoot.getElementById("qrModal");
    const qrCloseButton = this.shadowRoot.querySelector(".qr-close-button");
    const qrCodeContainer = this.shadowRoot.getElementById("qr-code");

    let qrCode = null;

    // Utility function to load an image
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = img.onabort = () =>
          reject(new Error("Image failed to load"));
        img.src = url;
      });
    };

    // Function to initialize and update QR code
    const updateQrCode = async (url) => {
      if (qrCodeContainer.firstChild) {
        qrCodeContainer.removeChild(qrCodeContainer.firstChild);
      }

      const qrCodeSettings = this.modelData?.qrCode;
      let imageUrl = qrCodeSettings?.image;

      if (imageUrl) {
        try {
          await loadImage(imageUrl);
        } catch (err) {
          console.warn("Failed to load image for QR code:", err);
          imageUrl = null;
        }
      }

      const qrCodeOptions = {
        width: parseInt(qrCodeSettings.width) || 240,
        height: parseInt(qrCodeSettings.width) || 240,
        data: url,
        dotsOptions: {
          color: qrCodeSettings.dotColor || "#000000",
          type: qrCodeSettings.dotStyle || "square",
        },
        cornersSquareOptions: {
          color: qrCodeSettings.cornerColor || "#000000",
          type: qrCodeSettings.cornerStyle || "square",
        },
        cornersDotOptions: {
          color: qrCodeSettings.cornerDotColor || "#000000",
          type: qrCodeSettings.cornerDotStyle || "square",
        },
        backgroundOptions: {
          color: qrCodeSettings.backgroundColor || "#ffffff",
        },
      };

      if (imageUrl) {
        qrCodeOptions.image = imageUrl;
        qrCodeOptions.imageOptions = {
          margin: parseInt(qrCodeSettings.imgMargin) || 0,
          hideBackgroundDots: qrCodeSettings.imgBackground || false,
        };
      }

      qrCode = new QRCodeStyling(qrCodeOptions);
      qrCode.append(qrCodeContainer);
    };

    qrCodeButton.addEventListener("click", () => {
      if (navigator.xr) {
        console.log("WebXR is supported");
      } else {
        console.log("WebXR is not supported");
      }
      const isMobile =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobile && modelViewer.canActivateAR) {
        try {
          modelViewer.activateAR();
        } catch (err) {
          console.warn("Could not activate AR:", err);
          const currentUrl = window.location.href;
          updateQrCode(currentUrl);
          qrModal.style.display = "flex";
        }
      } else {
        const currentUrl = window.location.href;
        updateQrCode(currentUrl);
        qrModal.style.display = "flex";
      }
    });

    qrCloseButton.addEventListener("click", () => {
      qrModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === qrModal) {
        qrModal.style.display = "none";
      }
    });
  }

  _setupVariantsColors() {
    if (!this.variants || this.variants.length === 0) return null;

    const slider = document.createElement("div");
    slider.classList.add("slider");

    const slidesWrapper = document.createElement("div");
    slidesWrapper.classList.add("slides");

    this.variants.forEach((variant, index) => {
      const modelViewer = this.shadowRoot.querySelector("model-viewer");
      const slideButton = document.createElement("button");
      slideButton.classList.add("slide");

      // If it’s the first variant, treat it as default
      if (index === 0) {
        slideButton.classList.add("selected");
        if (modelViewer && variant.blobUrl) {
          modelViewer.src = variant.blobUrl;
          // For dimension measurements, store the boundingBox as originalSize:
          this.originalSize = variant.boundingBox
            ? { ...variant.boundingBox }
            : { x: 1, y: 1, z: 1 }; // fallback
          // Possibly set poster
          if (variant.image) {
            modelViewer.poster = variant.image;
          } else {
            modelViewer.removeAttribute("poster");
          }
        }
      }

      // If there's a color or an image used for the "chip"
      if (variant.image) {
        slideButton.style.backgroundImage = `url('${variant.image}')`;
      } else {
        slideButton.style.backgroundColor = variant.color || "#ccc";
      }

      slideButton.onclick = () => {
        if (!modelViewer) return;

        // Swap model src to the blob URL
        if (variant.blobUrl) {
          modelViewer.src = variant.blobUrl;
        }

        // Also update our "originalSize" for subsequent scale calcs
        this.originalSize = variant.boundingBox
          ? { ...variant.boundingBox }
          : { x: 1, y: 1, z: 1 };

        // Rebuild the size panel for this variant index
        this._updateSizePanel(index);

        // Poster?
        if (variant.image) {
          modelViewer.poster = variant.image;
        } else {
          modelViewer.removeAttribute("poster");
        }

        // Manage “selected” classes
        const allSlides = slidesWrapper.querySelectorAll(".slide");
        allSlides.forEach((s) => s.classList.remove("selected"));
        slideButton.classList.add("selected");
      };

      slidesWrapper.appendChild(slideButton);
    });

    slider.appendChild(slidesWrapper);
    return slider;
  }

  _setupBottomNavBar(modelViewer) {
    const navBar = document.createElement("div");
    navBar.classList.add("bottom-nav-bar");

    const sizeBtn = document.createElement("button");
    sizeBtn.textContent = "Size";
    sizeBtn.classList.add("nav-btn");

    const colorBtn = document.createElement("button");
    colorBtn.textContent = "Color";
    colorBtn.classList.add("nav-btn");

    const shareBtn = document.createElement("button");
    shareBtn.textContent = "Share";
    shareBtn.classList.add("nav-btn", "share-btn");

    const sizePanel = document.createElement("div");
    sizePanel.classList.add("sub-panel", "hidden");
    const colorPanel = document.createElement("div");
    colorPanel.classList.add("sub-panel", "hidden");

    const sizeControls = this._createSizeControls();
    const colorControls = this._setupVariantsColors();

    sizePanel.addEventListener("click", (event) =>
      this._handleSizeChange(event)
    );

    modelViewer.addEventListener("load", () => {
      // After the internal <model-viewer> has loaded
      // We can attempt a neutral scale of 1
      modelViewer.scale = "1 1 1";

      // If no explicit boundingBox is found for the initially loaded variant,
      // we fallback to model-viewer's reported size (but note, the user wants
      // to rely on the bounding-box approach, so do that first if possible).
      if (!this.originalSize) {
        this.originalSize = modelViewer.getDimensions();
      }

      // Build the size panel UI for the first variant (index 0)
      this._updateSizePanel(0);

      // Automatically apply the first size in the first variant if it exists
      if (this.variantSizes && this.variantSizes[0]) {
        const sizesForVariant = this.variantSizes[0];
        const firstSizeKey = Object.keys(sizesForVariant)[0];
        if (firstSizeKey) {
          const firstSizeValues = sizesForVariant[firstSizeKey];
          // Apply the scale computation
          this.calculateAndApplyScale(firstSizeValues);

          // Mark the correct button as "selected" in the UI
          requestAnimationFrame(() => {
            const sizeButtons =
              this.shadowRoot.querySelectorAll(".size-button");
            sizeButtons.forEach((btn) => {
              if (btn.textContent === firstSizeKey) {
                btn.classList.add("selected");
              } else {
                btn.classList.remove("selected");
              }
            });
          });
        }
      }

      // Hide the default AR-button slot if desired
      const arButtonSlot =
        modelViewer.shadowRoot.querySelector(".slot.ar-button");
      if (arButtonSlot) {
        arButtonSlot.style.display = "none";
      }
    });

    if (sizeControls) sizePanel.appendChild(sizeControls);
    if (colorControls) colorPanel.appendChild(colorControls);

    navBar.appendChild(sizeBtn);
    navBar.appendChild(colorBtn);
    navBar.appendChild(shareBtn);
    navBar.appendChild(sizePanel);
    navBar.appendChild(colorPanel);

    const togglePanel = (panel) => {
      const currentPanelState = panel.classList.contains("hidden");
      sizePanel.classList.add("hidden");
      colorPanel.classList.add("hidden");
      panel.classList.toggle("hidden", !currentPanelState);
    };

    sizeBtn.addEventListener("click", () => {
      togglePanel(sizePanel);
    });

    colorBtn.addEventListener("click", () => {
      togglePanel(colorPanel);
    });

    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: document.title,
        text: "Check out this AR model!",
        url: window.location.href,
      };
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully");
      } catch (err) {
        console.warn("Share failed:", err);
      }
    });

    // Add the click-away event listener
    document.addEventListener("mousedown", (e) => {
      const path = e.composedPath();
      if (!path.includes(navBar)) {
        sizePanel.classList.add("hidden");
        colorPanel.classList.add("hidden");
      }
    });

    modelViewer.appendChild(navBar);

    // Add styling
    const style = document.createElement("style");
    style.textContent = `
    /* The bottom nav bar container */
    .bottom-nav-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      z-index: 10;
    }

    .nav-btn {
      background-color: #f0f0f0;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 4px;
      margin-right: 8px;
      font-weight: 500;
      transition: background-color 0.2s ease;
      flex: 1;
    }
    .nav-btn:hover {
      background-color: #ddd;
    }

    /* Sub-panels that slide up above the nav bar */
    .sub-panel {
      position: absolute;
      bottom: 60px; /* ensure it sits over the nav bar */
      left: 0;
      width: 100%;
      background-color: transparent;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.15);
      padding: 16px 0;
    }
    .hidden {
      display: none;
    }

    /* COLOR SLIDER STYLES */
    .slider {
      width: 100%;
      text-align: center;
      overflow: hidden;
      margin: 0 auto;
    }
    .slides {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      padding: 0 10px;
      gap: 10px; /* spacing between slides */
    }
    .slide {
      scroll-snap-align: start;
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 10px;
      cursor: pointer;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      outline: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .slide:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .slide.selected {
      border-color: #4285f4;
      box-shadow: 0 0 0 2px rgba(66,133,244,0.3);
    }

    /* SIZE PANEL STYLES */
    .size-panel {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 8px;
      padding: 10px;
    }

    .size-buttons-wrapper {
      display: flex;
      flex-direction: row;
      gap: 12px;
      padding: 0 10px;
    }
    .size-button {
      padding: 10px 16px;
      background-color: #eee;
      border: 1px solid #ccc;
      border-radius: 6px;
      transition: all 0.2s ease;
      font-weight: 500;
    }
    .size-button:hover:not(:disabled) {
      background-color: #ddd;
    }
    .size-button.selected {
      background-color: #4285f4 !important;
      color: #fff;
      border-color: #4285f4;
      opacity: 1;
    }
    `;
    modelViewer.appendChild(style);
  }

  _setupModalEventListeners() {
    const view3DButton = this.shadowRoot.querySelector(".view-3d-button");
    const previewImage = this.shadowRoot.querySelector(".preview-image");
    const modelViewerContainer = this.shadowRoot.querySelector(
      ".model-viewer-container"
    );
    const closeButton = this.shadowRoot.querySelector(".close-button");
    const overlay = this.shadowRoot.querySelector(".overlay");
    const modelViewer = this.shadowRoot.querySelector("model-viewer");

    view3DButton.addEventListener("click", () => {
      previewImage.style.display = "none";
      view3DButton.style.display = "none";
      modelViewerContainer.style.display = "flex";
      overlay.style.display = "block";
      this._setupDimensions(modelViewer);
    });

    closeButton.addEventListener("click", () => {
      previewImage.style.display = "block";
      view3DButton.style.display = "flex";
      modelViewerContainer.style.display = "none";
      overlay.style.display = "none";
    });
  }

  _setupNormalEventListeners() {
    this.shadowRoot
      .querySelector("model-viewer")
      .addEventListener("model-visibility", () => {
        this._setupDimensions(this.shadowRoot.querySelector("model-viewer"));
      });
  }

  _setupDimensions(modelViewer) {
    const dimElements = [
      ...modelViewer.querySelectorAll("[data-hotspot]"),
      modelViewer.querySelector("#dimLines"),
    ].filter(Boolean);

    const setVisibility = (visible) => {
      dimElements.forEach((element) => {
        element.classList.toggle("hide", !visible);
      });
    };

    modelViewer.addEventListener("ar-status", (event) => {
      const isSessionStarted = event.detail.status === "session-started";
      setVisibility(!isSessionStarted);
    });

    const drawLine = (svgLine, startHotspot, endHotspot, dimensionHotspot) => {
      if (!svgLine || !startHotspot || !endHotspot) return;
      svgLine.setAttribute("x1", startHotspot.canvasPosition.x);
      svgLine.setAttribute("y1", startHotspot.canvasPosition.y);
      svgLine.setAttribute("x2", endHotspot.canvasPosition.x);
      svgLine.setAttribute("y2", endHotspot.canvasPosition.y);
      if (dimensionHotspot) {
        svgLine.classList.toggle("hide", !dimensionHotspot.facingCamera);
      }
    };

    const dimLines = modelViewer.querySelectorAll("line");

    const renderSVG = () => {
      if (dimLines.length === 0) return;

      const lineMappings = [
        {
          line: dimLines[0],
          start: "hotspot-dot+X-Y+Z",
          end: "hotspot-dot+X-Y-Z",
          dimension: "hotspot-dim+X-Y",
        },
        {
          line: dimLines[1],
          start: "hotspot-dot+X-Y-Z",
          end: "hotspot-dot+X+Y-Z",
          dimension: "hotspot-dim+X-Z",
        },
        {
          line: dimLines[2],
          start: "hotspot-dot+X+Y-Z",
          end: "hotspot-dot-X+Y-Z",
        },
        {
          line: dimLines[3],
          start: "hotspot-dot-X+Y-Z",
          end: "hotspot-dot-X-Y-Z",
          dimension: "hotspot-dim-X-Z",
        },
        {
          line: dimLines[4],
          start: "hotspot-dot-X-Y-Z",
          end: "hotspot-dot-X-Y+Z",
          dimension: "hotspot-dim-X-Y",
        },
      ];

      lineMappings.forEach(({ line, start, end, dimension }) => {
        drawLine(
          line,
          modelViewer.queryHotspot(start),
          modelViewer.queryHotspot(end),
          dimension ? modelViewer.queryHotspot(dimension) : null
        );
      });
    };

    const updateDimensionHotspots = () => {
      // Position dimension hotspots around the current bounding box
      const center = modelViewer.getBoundingBoxCenter();
      const size = modelViewer.getDimensions();
      const halfSize = {
        x: size.x / 2,
        y: size.y / 2,
        z: size.z / 2,
      };

      const hotspotsData = [
        {
          name: "hotspot-dot+X-Y+Z",
          position: [
            center.x + halfSize.x,
            center.y - halfSize.y,
            center.z + halfSize.z,
          ],
        },
        {
          name: "hotspot-dim+X-Y",
          position: [
            center.x + halfSize.x * 1.2,
            center.y - halfSize.y * 1.1,
            center.z,
          ],
          label: `${(size.z * 100).toFixed(0)} cm`,
          labelSelector: '[slot="hotspot-dim+X-Y"]',
        },
        {
          name: "hotspot-dot+X-Y-Z",
          position: [
            center.x + halfSize.x,
            center.y - halfSize.y,
            center.z - halfSize.z,
          ],
        },
        {
          name: "hotspot-dim+X-Z",
          position: [
            center.x + halfSize.x * 1.2,
            center.y,
            center.z - halfSize.z * 1.2,
          ],
          label: `${(size.y * 100).toFixed(0)} cm`,
          labelSelector: '[slot="hotspot-dim+X-Z"]',
        },
        {
          name: "hotspot-dot+X+Y-Z",
          position: [
            center.x + halfSize.x,
            center.y + halfSize.y,
            center.z - halfSize.z,
          ],
        },
        {
          name: "hotspot-dim+Y-Z",
          position: [
            center.x,
            center.y + halfSize.y * 1.1,
            center.z - halfSize.z * 1.1,
          ],
          label: `${(size.x * 100).toFixed(0)} cm`,
          labelSelector: '[slot="hotspot-dim+Y-Z"]',
        },
        {
          name: "hotspot-dot-X+Y-Z",
          position: [
            center.x - halfSize.x,
            center.y + halfSize.y,
            center.z - halfSize.z,
          ],
        },
        {
          name: "hotspot-dim-X-Z",
          position: [
            center.x - halfSize.x * 1.2,
            center.y,
            center.z - halfSize.z * 1.2,
          ],
          label: `${(size.y * 100).toFixed(0)} cm`,
          labelSelector: '[slot="hotspot-dim-X-Z"]',
        },
        {
          name: "hotspot-dot-X-Y-Z",
          position: [
            center.x - halfSize.x,
            center.y - halfSize.y,
            center.z - halfSize.z,
          ],
        },
        {
          name: "hotspot-dim-X-Y",
          position: [
            center.x - halfSize.x * 1.2,
            center.y - halfSize.y * 1.1,
            center.z,
          ],
          label: `${(size.z * 100).toFixed(0)} cm`,
          labelSelector: '[slot="hotspot-dim-X-Y"]',
        },
        {
          name: "hotspot-dot-X-Y+Z",
          position: [
            center.x - halfSize.x,
            center.y - halfSize.y,
            center.z + halfSize.z,
          ],
        },
      ];

      hotspotsData.forEach(({ name, position, label, labelSelector }) => {
        modelViewer.updateHotspot({
          name,
          position: position.join(" "),
        });
        if (label && labelSelector) {
          const labelElement = modelViewer.querySelector(labelSelector);
          if (labelElement) {
            labelElement.textContent = label;
          }
        }
      });
    };

    requestAnimationFrame(() => {
      renderSVG();
      updateDimensionHotspots();
    });

    modelViewer.addEventListener("camera-change", () => {
      renderSVG();
      updateDimensionHotspots();
    });

    modelViewer.addEventListener("scene-graph-ready", () => {
      renderSVG();
      updateDimensionHotspots();
    });
  }

  _createSizeControls() {
    const sizePanel = document.createElement("div");
    sizePanel.classList.add("size-panel");

    const sizeButtonsWrapper = document.createElement("div");
    sizeButtonsWrapper.classList.add("size-buttons-wrapper");

    // The actual size buttons get appended or replaced later in _updateSizePanel.
    // This is just the container.
    sizePanel.appendChild(sizeButtonsWrapper);
    return sizePanel;
  }

  _handleSizeChange(event) {
    if (event.target.classList.contains("size-button")) {
      const sizeKey = event.target.getAttribute("data-size-key");
      // Not used in the updated code because we call calculateAndApplyScale ourselves
      if (this.sizes && this.sizes[sizeKey]) {
        // Remove "selected" from all size buttons
        const allSizeBtns = this.shadowRoot.querySelectorAll(".size-button");
        allSizeBtns.forEach((btn) => btn.classList.remove("selected"));

        // Add "selected" to the clicked button
        event.target.classList.add("selected");

        // Apply the scale
        const desiredSize = this.sizes[sizeKey];
        this.calculateAndApplyScale(desiredSize);
      }
    }
  }

  applyScale() {
    const modelViewer = this.shadowRoot.querySelector("model-viewer");
    if (this.calculatedScale && modelViewer) {
      modelViewer.scale = `${this.calculatedScale.scaleX} ${this.calculatedScale.scaleY} ${this.calculatedScale.scaleZ}`;

      if (typeof modelViewer.updateFraming === "function") {
        requestAnimationFrame(() => {
          modelViewer.updateFraming();
          document.dispatchEvent(this.scaleEvent);
        });
      }
    }
  }

  async calculateAndApplyScale(desiredSize) {
    if (!desiredSize) return;
    try {
      const scale = await this.calculateModelScale(desiredSize);
      this.calculatedScale = scale;
      this.applyScale();
    } catch (error) {
      console.error("Error applying scale for chosen size:", error);
    }
  }

  cmToMeters(cmString) {
    return parseFloat(cmString.replace("cm", "")) / 100;
  }

  calculateModelScale(desiredSize) {
    // If for some reason we never measured bounding box, fallback
    const size = this.originalSize || { x: 1, y: 1, z: 1 };

    const originalWidth = size.x;
    const originalHeight = size.y;
    const originalDepth = size.z;

    const desiredWidth = this.cmToMeters(desiredSize.width);
    const desiredHeight = this.cmToMeters(desiredSize.height);
    // If no depth is specified, pick a small default
    const desiredDepth = desiredSize.depth
      ? this.cmToMeters(desiredSize.depth)
      : 0.05;

    const scaleX = desiredWidth / originalWidth;
    const scaleY = desiredHeight / originalHeight;
    const scaleZ = desiredDepth / originalDepth;

    return { scaleX, scaleY, scaleZ };
  }
}

customElements.define("ardisplay-viewer", ARDisplayViewer);
