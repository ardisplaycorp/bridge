import hotspotsTemplate from "./hotspots.js";
import { styleObjectToString } from "../utils/styleObjectToString.js";

const modalStyles = {
  "model-viewer": {
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: -100,
    position: "absolute",
  },
  ".qr-code-button": {
    all: "unset",
    background: "white",
    cursor: "pointer",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
};

export default (
  src,
  alt,
  ar,
  cameraControls,
  touchAction,
  shadowIntensity,
  modelPoster,
  arPlacement,
  modelData
) => {
  const styles = styleObjectToString(modalStyles);
  const template = hotspotsTemplate();
  return `
        <!-- Template for modal view -->
        <style>${styles}</style>
        <button class="qr-code-button" style="background-color: ${
          modelData.arBtn.btnBgColor
        };color: ${modelData.arBtn.btnTextColor};border-radius: ${
    modelData.arBtn.cornerRadius
  }px;font-size: ${modelData.arBtn.btnSize}px;">
            ${
              modelData.arBtn.btnIcon
                ? `<i data-lucide="${modelData.arBtn.btnIcon}" style="width: 24px; height: 24px;color: inherit;"></i>`
                : ""
            }
            ${modelData.arBtn.btnText}
        </button>
        <model-viewer
            src="${src}"
            alt="${alt}"
            ar="${ar}"
            camera-controls="${cameraControls}"
            touch-action="${touchAction}"
            shadow-intensity="${modelData.shadow}"
            ar-placement="${modelData.placement}"
            ar-modes="webxr scene-viewer quick-look"
        >
            ${template}
        </model-viewer>
        <!-- QR Code Modal -->
        <div id="qrModal" class="qr-modal">
            <div class="qr-modal-content" style="display: flex; flex-direction: row;text-align: center;overflow: hidden;">
            <button class="qr-close-button">×</button>
            <div style="width: 45%; height:100%;flex-grow: 0; flex-shrink: 0;display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                <h2>
                    <p id="btn-text" style="margin: 0">${modelData.title}</p>
                </h2>
                <p data-id="qrcode-info" class="translate-lang" style="margin:0">${
                  modelData.description
                }</p>
                <div class="qr-code-container">
                    <div id="qr-code"></div>
                </div>
            </div>
            <div style="width: 50%; height:100%; flex-grow: 0; flex-shrink: 0;">
                <img src="https://cdn.shopify.com/s/files/1/0768/6891/1392/files/1.jpg?v=1735181973" alt="Artwork" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
            </div>
            </div>
        </div>
    `;
};
