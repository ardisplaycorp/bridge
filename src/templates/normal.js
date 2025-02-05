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
  ".ardisplay-qr-code-button": {
    all: "unset",
    position: "absolute",
    top: "10px",
    right: "50%",
    transform: "translateX(50%)",
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
        <div class="normal-view-container" style="direction: ltr;">
            <model-viewer
                ar="${ar}"
                shadow-intensity="${modelData.shadow}"
                ar-placement="${modelData.placement}"
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="fixed"
                camera-controls="true"
                disable-pan="true"
                disable-tap="true"
                interaction-prompt="none"
                interpolation-decay="40"
                touch-action="none"
                max-field-of-view="auto"
                field-of-view="auto"
                camera-orbit="0deg 75deg 105%"
                ar-status="not-presenting"
            >
                ${template}
                <button class="ardisplay-qr-code-button" style="background-color: ${
                  modelData.arBtn.btnBgColor
                };color: ${modelData.arBtn.btnTextColor};border-radius: ${
    modelData.arBtn.cornerRadius
  }px;font-size: ${modelData.arBtn.btnSize - 6}px;text-wrap: nowrap;">
                    ${
                      modelData.arBtn.btnIcon
                        ? `<i data-lucide="${modelData.arBtn.btnIcon}" style="width: 24px; height: 24px;color: inherit;"></i>`
                        : ""
                    }
                    ${modelData.arBtn.btnText}
                </button>
            </model-viewer>
        </div>
    `;
};
