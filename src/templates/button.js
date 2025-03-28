import hotspotsTemplate from "./hotspots.js";
import { styleObjectToString } from "../utils/styleObjectToString.js";
import { CDN_URL } from "../config/config.js";

const modalStyles = {
  "model-viewer": {
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: -100,
    position: "absolute",
  },
  ".ardisplay-qr-code-button": {
    all: "unset",
    background: "white",
    cursor: "pointer",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxSizing: "border-box",
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
        <button class="ardisplay-qr-code-button" style="background-color: ${
          modelData.arBtn.btnBgColor
        };color: ${modelData.arBtn.btnTextColor};border-radius: ${
    modelData.arBtn.cornerRadius
  }px;font-size: ${
    modelData.arBtn.btnSize - 6
  }px;text-wrap: nowrap;direction: ltr;box-sizing: border-box;">
            ${
              modelData.arBtn.btnIcon
                ? `<i data-lucide="${modelData.arBtn.btnIcon}" style="width: 24px; height: 24px;color: inherit;"></i>`
                : ""
            }
            ${modelData.arBtn.btnText}
        </button>
        <model-viewer
            ar
            shadow-intensity="${modelData.shadow}"
            ar-placement="${
              (modelData.options &&
                modelData.options.length > 0 &&
                modelData.options[0].placement) ||
              modelData.placement
            }"
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="fixed"
            camera-controls="true"
            disable-pan="true"
            disable-tap="true"
            ar-status="not-presenting"
        >
            ${template}
        </model-viewer>
    `;
};
