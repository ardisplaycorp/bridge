import { ModelViewerElement } from "@google/model-viewer";
import QRCodeStyling from "qr-code-styling";
import normalTemplate from "./templates/normal.js";
import modalTemplate from "./templates/modal.js";
import buttonTemplate from "./templates/button.js";
import { icons } from "lucide";
import "./style.css";

// Utility for creating and appending elements
function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key === "classList") {
      value.forEach((className) => element.classList.add(className));
    } else if (key === "textContent") {
      element.textContent = value;
    } else if (key === "attributes") {
      Object.entries(value).forEach(([attr, attrValue]) => {
        element.setAttribute(attr, attrValue);
      });
    } else {
      element[key] = value;
    }
  });
  return element;
}

// Debug/Logging Utility
const logger = {
  debug: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.log(...args);
    }
  },
  error: (...args) => console.error(...args),
  warn: (...args) => console.warn(...args),
};

// QR Code Manager
class QrCodeManager {
  constructor(container, modelData) {
    this.container = container;
    this.modelData = modelData;
    this.qrCode = null;
  }

  async loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = img.onabort = () =>
        reject(new Error("Image failed to load"));
      img.src = url;
    });
  }

  async updateQrCode(url) {
    if (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }

    const qrCodeSettings = this.modelData?.qrCode;
    let imageUrl = qrCodeSettings?.image;

    if (imageUrl) {
      try {
        await this.loadImage(imageUrl);
      } catch (err) {
        logger.warn("Failed to load image for QR code:", err);
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

    this.qrCode = new QRCodeStyling(qrCodeOptions);
    this.qrCode.append(this.container);
  }
}

class ARDisplayViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.selectedIndex = 0;
    this.calculatedScale = null;
    this.modelData = null;
    this.originalSize = null;
    this.variants = [];
    this.variantSizes = [];
    this.scaleEvent = new Event("scale", { bubbles: true, composed: true });

    // Cache elements
    this.modelViewer = null;

    // Bundling external styles and scripts
    this.styles = this._consolidateStyles();
    this.shadowRoot.appendChild(this.styles);

    // Use requestAnimationFrame for smoother updates
    this.debouncedRenderSVG = this.animationFrameDebounce(this._renderSVG);
    this.debouncedUpdateDimensionHotspots = this.animationFrameDebounce(
      this._updateDimensionHotspots
    );
  }

  // Debounce using requestAnimationFrame
  animationFrameDebounce(func) {
    let requested = false;
    return (...args) => {
      if (!requested) {
        requested = true;
        requestAnimationFrame(() => {
          func.apply(this, args);
          requested = false;
        });
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  _sendShortStatsEvent(action, message = "") {
    logger.debug(this.modelData);
    const eventData = {
      dmodelId: this.modelData?.modelId || "no-model-id",
      action,
      browser: navigator.userAgent,
      message: message || undefined,
    };

    // Use a queue or offline handling for stats if necessary
    fetch("https://26eb-102-100-169-68.ngrok-free.app/api/stats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => {
        if (!response.ok) {
          logger.error("Error sending stats:", response.status);
        }
      })
      .catch((error) => {
        logger.error("Error sending stats:", error);
      });
  }

  async connectedCallback() {
    const attributes = this._getAttributes();

    await this._getModelData();

    this._loadTemplate(attributes.viewMode);
    this._moveSlottedContent();

    this.modelViewer = this.shadowRoot.querySelector("model-viewer");
    this._setupEventListeners();
    this._setupBottomNavBar(this.modelViewer);

    this._sendShortStatsEvent("View");
  }

  disconnectedCallback() {
    // Remove global event listeners
    document.removeEventListener(
      "mousedown",
      this.boundHandleDocumentMouseDown
    );
    document.removeEventListener("scale", this.boundHandleScale);

    if (this.modelViewer) {
      this.modelViewer.removeEventListener(
        "model-visibility",
        this.boundHandleModelVisibility
      );
      this.modelViewer.removeEventListener(
        "ar-status",
        this.boundHandleArStatus
      );
      this.modelViewer.removeEventListener(
        "camera-change",
        this.boundHandleCameraChange
      );
      this.modelViewer.removeEventListener(
        "scene-graph-ready",
        this.boundHandleSceneGraphReady
      );
      this.modelViewer.removeEventListener("load", this.boundHandleLoad);
    }
  }

  async _getModelData() {
    const url = this.getAttribute("src");
    try {
      // Consider local caching of model data
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      this.modelData = data;

      // Handle missing data gracefully
      if (!this.modelData?.options) {
        logger.warn("Missing model options. Skipping variant initialization.");
      }

      this._setupVariantsSizes();
    } catch (error) {
      logger.error(error.message);
      // Show a fallback UI message
    }
  }

  _setupVariantsSizes() {
    this.variants = this.modelData?.options || [];
    this.variantSizes = [];

    this.variants.forEach((variant) => {
      const sizesForThisVariant = {};
      variant.sizes.forEach((size) => {
        const key = size.label.toLowerCase();
        sizesForThisVariant[key] = {
          width: size.width,
          height: size.height,
          depth: size.depth || "",
        };
      });
      this.variantSizes.push(sizesForThisVariant);
    });
  }

  _getAttributes() {
    return {
      modelSrc: this.getAttribute("src") || "",
      modelPoster: this.getAttribute("poster") || "",
      ar: this.hasAttribute("ar"),
      cameraControls: this.hasAttribute("camera-controls"),
      touchAction: this.getAttribute("touch-action") || "none",
      viewMode: this.getAttribute("view-mode") || "normal",
      arPlacement: this.getAttribute("ar-placement") || "floor",
    };
  }

  _consolidateStyles() {
    const combinedStyles = createElement("style");
    combinedStyles.textContent = `
      /* Consolidated Styles */
      model-viewer {
        width: 100%;
        height: 100%;
        --min-hotspot-opacity: 0;
        position: relative;
      }

      model-viewer[ar-status="session-started"] .qr-code-button,
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

      /* QR Modal */
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
      /* Bottom Nav Bar */
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

      /* Sub-panels */
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

      /* Color Slider */
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

      /* Size Panel */
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
    return combinedStyles;
  }

  _loadTemplate(viewMode) {
    const template =
      viewMode === "modal"
        ? modalTemplate
        : viewMode === "normal"
        ? normalTemplate
        : buttonTemplate;

    const attributes = this._getAttributes();
    const templateString = template(
      attributes.ar,
      attributes.cameraControls,
      attributes.touchAction,
      attributes.modelPoster,
      attributes.arPlacement,
      this.modelData
    );

    // Use a DocumentFragment for better DOM updates
    const fragment = document
      .createRange()
      .createContextualFragment(templateString);

    // Process the icons within the fragment
    this._processLucideIcons(fragment);

    this.shadowRoot.appendChild(fragment);
  }

  _updateSizePanel(variantIndex) {
    const sizePanel = this.shadowRoot.querySelector(".size-panel");
    if (!sizePanel) return;

    sizePanel.innerHTML = "";

    const sizeButtonsWrapper = createElement("div", {
      classList: ["size-buttons-wrapper"],
    });

    const sizesForVariant = this.variantSizes[variantIndex];
    if (sizesForVariant) {
      Object.entries(sizesForVariant).forEach(([sizeKey, sizeValues]) => {
        const button = createElement("button", {
          classList: ["size-button"],
          textContent: sizeKey,
          attributes: {
            "data-size-key": sizeKey,
          },
          disabled: false,
        });

        button.addEventListener("click", (event) => {
          this.shadowRoot
            .querySelectorAll(".size-button")
            .forEach((btn) => btn.classList.remove("selected"));
          event.target.classList.add("selected");
          this.calculateAndApplyScale(sizeValues);
        });

        sizeButtonsWrapper.appendChild(button);
      });
    }

    sizePanel.appendChild(sizeButtonsWrapper);
  }

  _processLucideIcons(fragment) {
    const elements = fragment.querySelectorAll("[data-lucide]");

    elements.forEach((element) => {
      const iconName = element.getAttribute("data-lucide");
      const iconData = icons[iconName];

      if (iconData) {
        const [tagName, attributes, children] = iconData;

        const svgElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          tagName
        );

        for (const attr in attributes) {
          svgElement.setAttribute(attr, attributes[attr]);
        }

        const defaultAttributes = {
          width: "24",
          height: "24",
          color: "currentColor",
        };
        for (const attr in defaultAttributes) {
          svgElement.setAttribute(
            attr,
            element.getAttribute(attr) ||
              svgElement.getAttribute(attr) ||
              defaultAttributes[attr]
          );
        }

        children.forEach((childData) => {
          const [childTagName, childAttributes] = childData;
          const childElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            childTagName
          );
          for (const attr in childAttributes) {
            childElement.setAttribute(attr, childAttributes[attr]);
          }
          svgElement.appendChild(childElement);
        });

        element.parentNode.replaceChild(svgElement, element);
      } else {
        logger.warn(`Icon "${iconName}" not found in Lucide icons.`);
      }
    });
  }

  _moveSlottedContent() {
    const customPanel = this.shadowRoot.querySelector(
      ".ar-display-custom-panel"
    );
    const slottedContent = this.querySelector('slot[name="custom-panel"]');
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
    if (this.getAttribute("view-mode") === "modal") {
      this._setupModalEventListeners();
    } else {
      this._setupNormalEventListeners();
    }

    // Use a single debounced/throttled method for dimension updates
    this.boundHandleScale = () => this._setupDimensions(this.modelViewer);
    this.boundHandleModelVisibility = () =>
      this._setupDimensions(this.modelViewer);
    this.boundHandleArStatus = (event) => this._handleArStatusChange(event);
    this.boundHandleCameraChange = () => {
      this.debouncedRenderSVG();
      this.debouncedUpdateDimensionHotspots();
    };
    this.boundHandleSceneGraphReady = () => {
      this.debouncedRenderSVG();
      this.debouncedUpdateDimensionHotspots();
    };
    this.boundHandleLoad = () => {
      // If no explicit boundingBox is found for the initially loaded variant,
      // fallback to model-viewer's reported size
      const size = this.modelViewer.getDimensions();
      const scale = this.modelViewer.scale.toString().split(" ").map(Number);
      this.originalSize = { x: 0, y: 0, z: 0 };
      this.originalSize.x = size.x / scale[0];
      this.originalSize.y = size.y / scale[1];
      this.originalSize.z = size.z / scale[2];

      // Automatically apply the first size in the selected variant if it exists
      if (this.variantSizes && this.variantSizes[this.selectedIndex]) {
        const sizesForVariant = this.variantSizes[this.selectedIndex];
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

      // if not size panel exists, create it
      if (!this.shadowRoot.querySelector(".size-panel button")) {
        this._updateSizePanel(0);
      }

      // Hide the default AR-button slot if desired
      const arButtonSlot =
        this.modelViewer.shadowRoot.querySelector(".slot.ar-button");
      if (arButtonSlot) {
        arButtonSlot.style.display = "none";
      }
    };

    document.addEventListener("scale", this.boundHandleScale);
    this.modelViewer.addEventListener(
      "model-visibility",
      this.boundHandleModelVisibility
    );
    this.modelViewer.addEventListener("ar-status", this.boundHandleArStatus);
    this.modelViewer.addEventListener(
      "camera-change",
      this.boundHandleCameraChange
    );
    this.modelViewer.addEventListener(
      "scene-graph-ready",
      this.boundHandleSceneGraphReady
    );
    this.modelViewer.addEventListener("load", this.boundHandleLoad);

    this._setupQRCodeListeners();
  }

  _setupQRCodeListeners() {
    const qrCodeButton = this.shadowRoot.querySelector(".qr-code-button");
    const qrModal = this.shadowRoot.getElementById("qrModal");
    const qrCloseButton = this.shadowRoot.querySelector(".qr-close-button");
    const qrCodeContainer = this.shadowRoot.getElementById("qr-code");

    const qrCodeManager = new QrCodeManager(qrCodeContainer, this.modelData);

    qrCodeButton.addEventListener("click", () => {
      this._sendShortStatsEvent("Click");
      const isMobile =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobile && this.modelViewer.canActivateAR) {
        try {
          this._sendShortStatsEvent("Try");
          this.modelViewer.activateAR();
        } catch (err) {
          this._sendShortStatsEvent("Failed", err.message);
          logger.warn("Could not activate AR:", err);
          // AR Fallback Flow
          logger.warn("AR not supported on this device. Displaying QR code.");
          const currentUrl = window.location.href;
          qrCodeManager.updateQrCode(currentUrl);
          qrModal.style.display = "flex";
        }
      } else {
        const currentUrl = window.location.href;
        qrCodeManager.updateQrCode(currentUrl);
        qrModal.style.display = "flex";
      }
    });

    qrCloseButton.addEventListener("click", () => {
      qrModal.style.display = "none";
    });

    this.boundHandleDocumentMouseDown = (event) => {
      if (event.target === qrModal) {
        qrModal.style.display = "none";
      }
    };

    window.addEventListener("click", this.boundHandleDocumentMouseDown);
  }

  _setupVariantsColors() {
    if (!this.variants || this.variants.length === 0) return null;

    const slider = createElement("div", { classList: ["slider"] });
    const slidesWrapper = createElement("div", { classList: ["slides"] });

    this.variants.forEach((variant, index) => {
      const slideButton = createElement("button", { classList: ["slide"] });

      if (index === 0) {
        slideButton.classList.add("selected");
        if (this.modelViewer && variant.url) {
          this.modelViewer.src = variant.url;
          if (variant.image) {
            this.modelViewer.poster = variant.image;
          } else {
            this.modelViewer.removeAttribute("poster");
          }
        }
      }

      if (variant.image) {
        slideButton.style.backgroundImage = `url('${variant.image}')`;
      } else {
        slideButton.style.backgroundColor = variant.color || "#ccc";
      }

      slideButton.onclick = () => {
        if (!this.modelViewer) return;

        if (variant.url) {
          this.modelViewer.src = variant.url;
        }

        this._updateSizePanel(index);

        if (variant.image) {
          this.modelViewer.poster = variant.image;
        } else {
          this.modelViewer.removeAttribute("poster");
        }

        slidesWrapper
          .querySelectorAll(".slide")
          .forEach((s) => s.classList.remove("selected"));
        slideButton.classList.add("selected");

        this.selectedIndex = index;
      };

      slidesWrapper.appendChild(slideButton);
    });

    slider.appendChild(slidesWrapper);
    return slider;
  }

  _setupBottomNavBar() {
    const navBar = createElement("div", { classList: ["bottom-nav-bar"] });
    const sizeBtn = createElement("button", {
      textContent: "Size",
      classList: ["nav-btn"],
    });
    const colorBtn = createElement("button", {
      textContent: "Color",
      classList: ["nav-btn"],
    });
    const shareBtn = createElement("button", {
      textContent: "Share",
      classList: ["nav-btn", "share-btn"],
    });
    const sizePanel = createElement("div", {
      classList: ["sub-panel", "hidden"],
    });
    const colorPanel = createElement("div", {
      classList: ["sub-panel", "hidden"],
    });

    const sizeControls = this._createSizeControls();
    const colorControls = this._setupVariantsColors();

    sizePanel.addEventListener("click", (event) =>
      this._handleSizeChange(event)
    );

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
      this._sendShortStatsEvent("Share");
      const shareData = {
        title: document.title,
        text: "Check out this AR model!",
        url: window.location.href,
      };
      try {
        await navigator.share(shareData);
        logger.debug("Content shared successfully");
      } catch (err) {
        logger.warn("Share failed:", err);
      }
    });

    this.boundHandleDocumentMouseDown = (e) => {
      const path = e.composedPath();
      if (!path.includes(navBar)) {
        sizePanel.classList.add("hidden");
        colorPanel.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", this.boundHandleDocumentMouseDown);

    this.modelViewer.appendChild(navBar);
  }

  _setupModalEventListeners() {
    const view3DButton = this.shadowRoot.querySelector(".view-3d-button");
    const previewImage = this.shadowRoot.querySelector(".preview-image");
    const modelViewerContainer = this.shadowRoot.querySelector(
      ".model-viewer-container"
    );
    const closeButton = this.shadowRoot.querySelector(".close-button");
    const overlay = this.shadowRoot.querySelector(".overlay");

    view3DButton.addEventListener("click", () => {
      previewImage.style.display = "none";
      view3DButton.style.display = "none";
      modelViewerContainer.style.display = "flex";
      overlay.style.display = "block";
      this._setupDimensions(this.modelViewer);
    });

    closeButton.addEventListener("click", () => {
      previewImage.style.display = "block";
      view3DButton.style.display = "flex";
      modelViewerContainer.style.display = "none";
      overlay.style.display = "none";
    });
  }

  _setupNormalEventListeners() {
    // This is handled in _setupEventListeners
  }

  _handleArStatusChange(event) {
    const isSessionStarted = event.detail.status === "session-started";
    const dimElements = [
      ...this.modelViewer.querySelectorAll("[data-hotspot]"),
      this.modelViewer.querySelector("#dimLines"),
    ].filter(Boolean);

    const setVisibility = (visible) => {
      dimElements.forEach((element) => {
        element.classList.toggle("hide", !visible);
      });
    };

    setVisibility(!isSessionStarted);
  }

  _drawLine(svgLine, startHotspot, endHotspot, dimensionHotspot) {
    if (!svgLine || !startHotspot || !endHotspot) return;
    svgLine.setAttribute("x1", startHotspot.canvasPosition.x);
    svgLine.setAttribute("y1", startHotspot.canvasPosition.y);
    svgLine.setAttribute("x2", endHotspot.canvasPosition.x);
    svgLine.setAttribute("y2", endHotspot.canvasPosition.y);
    if (dimensionHotspot) {
      svgLine.classList.toggle("hide", !dimensionHotspot.facingCamera);
    }
  }

  _renderSVG() {
    const dimLines = this.modelViewer.querySelectorAll("line");
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
      this._drawLine(
        line,
        this.modelViewer.queryHotspot(start),
        this.modelViewer.queryHotspot(end),
        dimension ? this.modelViewer.queryHotspot(dimension) : null
      );
    });
  }

  _updateDimensionHotspots() {
    const center = this.modelViewer.getBoundingBoxCenter();
    const size = this.modelViewer.getDimensions();
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
      this.modelViewer.updateHotspot({
        name,
        position: position.join(" "),
      });
      if (label && labelSelector) {
        const labelElement = this.modelViewer.querySelector(labelSelector);
        if (labelElement) {
          labelElement.textContent = label;
        }
      }
    });
  }

  _setupDimensions() {
    this.debouncedRenderSVG();
    this.debouncedUpdateDimensionHotspots();
  }

  _createSizeControls() {
    const sizePanel = createElement("div", { classList: ["size-panel"] });
    const sizeButtonsWrapper = createElement("div", {
      classList: ["size-buttons-wrapper"],
    });

    sizePanel.appendChild(sizeButtonsWrapper);
    return sizePanel;
  }

  _handleSizeChange(event) {
    if (event.target.classList.contains("size-button")) {
      const sizeKey = event.target.getAttribute("data-size-key");
      if (this.variantSizes[this.selectedIndex][sizeKey]) {
        this.shadowRoot
          .querySelectorAll(".size-button")
          .forEach((btn) => btn.classList.remove("selected"));

        event.target.classList.add("selected");

        const desiredSize = this.variantSizes[this.selectedIndex][sizeKey];
        this.calculateAndApplyScale(desiredSize);
      }
    }
  }

  applyScale() {
    if (this.calculatedScale && this.modelViewer) {
      this.modelViewer.scale = `${this.calculatedScale.scaleX} ${this.calculatedScale.scaleY} ${this.calculatedScale.scaleZ}`;
      if (typeof this.modelViewer.updateFraming === "function") {
        requestAnimationFrame(() => {
          this.modelViewer.updateFraming();
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
      logger.error("Error applying scale for chosen size:", error);
    }
  }

  cmToMeters(cmString) {
    return parseFloat(cmString.replace("cm", "")) / 100;
  }

  calculateModelScale(desiredSize) {
    const size = this.originalSize || { x: 1, y: 1, z: 1 };

    const originalWidth = size.x;
    const originalHeight = size.y;
    const originalDepth = size.z;

    const desiredWidth = this.cmToMeters(desiredSize.width);
    const desiredHeight = this.cmToMeters(desiredSize.height);
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
