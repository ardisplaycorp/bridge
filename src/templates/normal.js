import hotspotsTemplate from "./hotspots.js";
import { styleObjectToString } from "../utils/styleObjectToString.js";
import { CDN_URL } from "../config/config.js";

const modalStyles = {
  ".normal-view-container": {
    width: "100%",
    height: "100%",
    display: "block",
    fontFamily: "sans-serif",
    position: "relative",
  },
  ".qr-code-button": {
    all: "unset",
    position: "absolute",
    top: "0",
    right: "0",
    background: "white",
    cursor: "pointer",
    padding: "10px",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
};

export default (
  ar,
  cameraControls,
  touchAction,
  modelPoster,
  arPlacement,
  modelData
) => {
  const styles = styleObjectToString(modalStyles);
  const template = hotspotsTemplate();
  return `
        <!-- Template for modal view -->
        <style>${styles}</style>
        <div class="normal-view-container">
            <model-viewer
                ar="${ar}"
                camera-controls="${cameraControls}"
                shadow-intensity="${modelData.shadow}"
                ar-placement="${modelData.placement}"
                ar-modes="webxr scene-viewer quick-look"
            >
                ${template}
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
            </model-viewer>
            <!-- QR Code Modal -->
            <div id="qrModal" class="qr-modal">
                <div class="qr-modal-content" style="display: flex; flex-direction: row;text-align: center;overflow: hidden;">
                <button class="qr-close-button">×</button>
                <div style="width: 45%; height:100%;flex-grow: 0; flex-shrink: 0;display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                    <h2>
                        <p id="btn-text" style="margin: 0">${
                          modelData.title
                        }</p>
                    </h2>
                    <p data-id="qrcode-info" class="translate-lang" style="margin:0">${
                      modelData.description
                    }</p>
                    <div class="qr-code-container">
                        <div id="qr-code"></div>
                    </div>
                </div>
                <div style="width: 50%; height:100%; flex-grow: 0; flex-shrink: 0;">
                    <img src="${CDN_URL}/1.webp" alt="Artwork" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                </div>
                </div>
            </div>
        </div>
    `;
};
