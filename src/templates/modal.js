import hotspotsTemplate from "./hotspots.js";
import { styleObjectToString } from "../utils/styleObjectToString.js";
import { CDN_URL } from "../config/config.js";

const modalStyles = {
  ".ardisplay-custom-model-viewer-container": {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "block",
    fontFamily: "sans-serif",
  },
  ".ardisplay-preview-image": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  ".ardisplay-view-3d-button": {
    bottom: "10px",
    right: "10px",
    padding: "10px 20px",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  ".ardisplay-view-3d-button svg": {
    fill: "white",
  }
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
        <div class="ardisplay-custom-model-viewer-container" style="direction: ltr;">
            <button class="ardisplay-view-3d-button" style="background-color: ${
                      modelData.arBtn.btnBgColor
                    };color: ${modelData.arBtn.btnTextColor};border-radius: ${
      modelData.arBtn.cornerRadius
    }px;font-size: ${modelData.arBtn.btnSize - 6}px;">
                <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" aria-hidden="true" class="pip-svg-icon pip-btn__icon"><path d="M11 16.9766c.3294.0154.663.0233 1 .0233 2.2351 0 4.3234-.3458 6-.9495 1.7881-.6438 4-1.8975 4-4.0505 0-1.9568-1.8939-3.1985-3.5147-3.864l-1.5605 1.5606C17.8623 9.9943 20 10.7292 20 11.9999c0 .9329-1.2789 1.5728-2 1.8958-1.8614.8335-3.9768 1.1042-6 1.1042-.3392 0-.6729-.0088-1-.0257v-1.9743l-3 3 3 3v2.0233zm2-9.9532A21.3903 21.3903 0 0 0 12.0001 7c-2.235 0-4.3234.3457-6 .9494-1.7881.6438-4 1.8976-4 4.0506 0 1.9568 1.894 3.1984 3.5146 3.8639l1.5606-1.5605C6.1378 14.0057 4 13.2707 4 12.0001c0-.9329 1.2789-1.5729 2-1.8958 1.8614-.8336 3.9767-1.1042 6-1.1042.3392 0 .6729.0087.9999.0257V11l3-3-3-3v2.0234z"></path></svg>
                View in 3D
            </button>
        </div>
    `;
};
