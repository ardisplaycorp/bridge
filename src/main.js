import { ModelViewerElement } from "@google/model-viewer/dist/model-viewer-module.min.js";
import QRCodeStyling from "qr-code-styling";
import normalTemplate from "./templates/normal.js";
import modalTemplate from "./templates/modal.js";
import buttonTemplate from "./templates/button.js";
import { Eye, Blocks, Rotate3D, Box, FileAxis3D, Scan } from 'lucide';
import { BRIDGE_URL } from "./config/config.js";

const NODE_ENV = "production"

const encodeBase64 = (text) => {
  return btoa(text);
};

// Utility for creating and appending elements
const createElement = (tag, options = {}) => {
  const el = document.createElement(tag);
  if (options.classList) {
    options.classList.forEach((cls) => el.classList.add(cls));
  }
  if (options.textContent) {
    el.textContent = options.textContent;
  }
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([attr, val]) => {
      el.setAttribute(attr, val);
    });
  }
  return el;
};

// Debug/Logging Utility
const logger = {
  debug: (...args) => {
    if (NODE_ENV === "development") {
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
    let imageUrl = qrCodeSettings?.faviconUrl;

    if (imageUrl) {
      try {
        await this.loadImage(imageUrl);
      } catch (err) {
        logger.warn("Failed to load image for QR code:", err);
        imageUrl = null;
      }
    }

    const qrCodeOptions = {
      width: parseInt(qrCodeSettings.QRsize) || 240,
      height: parseInt(qrCodeSettings.QRsize) || 240,
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
        margin: parseInt(qrCodeSettings.faviconMargin) || 0,
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

    // Check if width and height are not already set via inline styles
    if (!this.style.width) {
      this.style.width = '100%';
    }
    if (!this.style.height) {
      this.style.height = '100%';
    }
    if(!this.style.display) {
      this.style.display = 'block';
    }

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

    // Setup for iOS AR Quick Look custom button
    if (this._isIOSDevice()) {
      this._setupIOSARQuickLookButton();
    }
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
    fetch("https://v2.ardisplay.io/api/stats", {
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

    this._loadTemplate(this.modelData.mode);
    this._moveSlottedContent();

    this.modelViewer = this.shadowRoot.querySelector("model-viewer");
    this._setupEventListeners();
    // this._setupBottomNavBar(this.modelViewer);

    this._sendShortStatsEvent("View");

    // ---------- UI updates for bottom nav and floating cart ----------
    // Bottom area container (relative positioning for floating button)
    const bottomContainer = createElement("div", {
      classList: ["bottom-container"],
    });
    this.modelViewer.appendChild(bottomContainer);

    // Setup the floating cart button
    this._setupCartButton(bottomContainer);

    // Setup the panels and bottom nav
    this._setupBottomNavBar(bottomContainer);
    // ------------------------------------------------------------------
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
    // get current url
    const url = window.location.href
    console.log(url);
    try {
      // Consider local caching of model data
      let response;
      if (this.getAttribute('src')){
        response = await fetch(`https://v2.ardisplay.io/api/3d-model?id=${this.getAttribute('src')}`);
      }
      else{
        response = await fetch(`https://v2.ardisplay.io/api/3d-model?url=${encodeBase64(url)}`);
      }
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
        display: none;
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
      .bottom-container{
        position: absolute;
        width: 100%;
        height: 0px;
        bottom: 64px;
      }

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

      .cart-button-wrapper{
        display: none;
      }

      model-viewer[ar-status="session-started"] .cart-button-wrapper,
      model-viewer[ar-status="object-placed"] .cart-button-wrapper{
        display: flex;
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
        bottom: 0; /* ensure it sits over the nav bar */
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

      .size-panel {
      /* Similar to 'flex flex-wrap gap-2' in Tailwind */
      display: flex;
      flex-wrap: wrap;
      gap: 8px; /* ~ Tailwind gap-2 */
      margin-top: 8px;
      padding: 16px; /* for some breathing room */
      background-color: transparent;
      z-index: 100;
    }

    .size-buttons-wrapper {
      /* If you need an extra wrapper, adjust accordingly */
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0;
    }

    .size-button {
      /* Mimicking "border-2 border-gray-300 rounded-lg px-4 py-2" */
      border: 2px solid #ccc;
      border-radius: 8px; /* ~ Tailwind rounded-lg */
      padding: 8px 16px; /* ~ px-4 py-2 in Tailwind */
      background-color: rgba(255, 255, 255, 0.8); /* ~ bg-white/80 */
      font-weight: 500;
      cursor: pointer;
      color: black;

      /* Tailwind “transition-colors” is basically short for smooth border/color transitions */
      transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
    }

    /* Hover effect: "hover:border-blue-600 hover:text-blue-600" */
    .size-button:hover:not(:disabled) {
      border-color: #2563EB;
      color: #2563EB;
    }

    /* Active/selected state similar to your existing .selected logic */
    .size-button.selected {
      color: #4285f4;
      border-color: #4285f4;
      opacity: 1;
    }

      /* ---------- New styles for bottom nav and floating cart ---------- */
      /* Container for the bottom region (holds floating cart & bottom nav) */
      .bottom-container {
        position: relative;
        width: 100%;
        height: 0px; /* let content define height; this just serves as a positioning wrapper */
      }

      /* Floating Add to Cart button */
      .cart-button-wrapper {
        position: absolute;
        top: -64px; /* similar to -top-16 from Tailwind */
        left: 0;
        right: 0;
        justify-content: center;
      }
      .cart-btn {
        background-color: #2563EB; /* Tailwind blue-600 */
        color: #fff;
        border: none;
        border-radius: 9999px; /* fully rounded */
        padding: 12px 32px; /* ~py-3 px-8 */
        font-weight: 600;
        font-family: sans-serif;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .cart-btn:hover {
        background-color: #1D4ED8; /* Tailwind blue-700 */
      }
      .cart-btn svg {
        height: 20px; /* h-5 in Tailwind ~ 20px */
        width: 20px;
      }

      /* Bottom Nav Bar (matching the React code style) */
      .bottom-nav {
        height: 64px; /* h-16 in Tailwind */
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        border-top: 1px solid #E5E7EB; /* border-gray-200 */
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: relative;
        z-index: 100;
      }
      .nav-icon-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 16px;
        color: #4B5563; /* text-gray-600 */
        background: transparent;
        border: none;
        cursor: pointer;
        transition: color 0.2s ease;
      }
      .nav-icon-button.active {
        color: #2563EB; /* text-blue-600 */
      }
      .nav-icon-button svg {
        height: 24px; /* h-6 */
        width: 24px;
      }
      .nav-icon-button span {
        font-size: 12px; /* text-xs ~12px */
        margin-top: 4px;
      }

      /* Sub-panels (size panel, variant panel) that appear above the nav */
      .sub-panel {
        position: absolute;
        bottom: 0; /* sits just above nav (which is 64px tall) */
        left: 0;
        right: 0;
        background-color: rgba(255,255,255,0.95);
        backdrop-filter: blur(8px);
        border-top: 1px solid #E5E7EB;
        padding: 16px;
        box-shadow: 0 -2px 8px rgba(0,0,0,0.15);
        z-index: 100;
      }
      /* ------------------------------------------------------------------ */
    `;
    return combinedStyles;
  }

  _loadTemplate(viewMode) {
    const template =
      viewMode === "popup"
        ? modalTemplate
        : viewMode === "inpage"
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
    const iconMap = {
      eye: Eye,
      blocks: Blocks,
      rotate3d: Rotate3D,
      box: Box,
      fileaxis3d: FileAxis3D,
      scan: Scan
    };
  
    const elements = fragment.querySelectorAll("[data-lucide]");
    
    elements.forEach(element => {
      const iconName = element.getAttribute("data-lucide").toLowerCase();
      const icon = iconMap[iconName];
      
      if (icon) {
        const size = element.getAttribute("width") || 24;
        const color = element.getAttribute("color") || 'currentColor';
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
  
        // Process icon children
        icon[2].forEach(child => {
          const [tagName, attributes] = child;
          const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
          
          // Set attributes
          Object.entries(attributes).forEach(([name, value]) => {
            element.setAttribute(name, value);
          });
          
          svg.appendChild(element);
        });
  
        // Replace original element
        element.parentNode.replaceChild(svg, element);
      } else {
        console.warn(`Icon "${iconName}" not found`);
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
    if (this.modelData.mode === "popup") {
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

  _isIOSDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  _setupIOSARQuickLookButton() {
    // Construct the AR Quick Look URL with callToAction and other parameters
    const iOSQuickLookURL = new URL(this.modelData.iosSrc); // Assuming you have an iosSrc in your modelData
    iOSQuickLookURL.hash = `callToAction=${encodeURIComponent("Add to Cart")}`; // Or "🛒 Add to Cart"

    // Add optional parameters if needed
    if (this.modelData.checkoutTitle) {
      iOSQuickLookURL.hash += `&checkoutTitle=${encodeURIComponent(
        this.modelData.checkoutTitle
      )}`;
    }
    if (this.modelData.checkoutSubtitle) {
      iOSQuickLookURL.hash += `&checkoutSubtitle=${encodeURIComponent(
        this.modelData.checkoutSubtitle
      )}`;
    }
    if (this.modelData.price) {
      iOSQuickLookURL.hash += `&price=${encodeURIComponent(
        this.modelData.price
      )}`;
    }

    // Dynamically create or update the <a> element for AR Quick Look
    let linkElement = this.shadowRoot.querySelector("a[rel='ar']");
    if (!linkElement) {
      linkElement = document.createElement("a");
      linkElement.setAttribute("rel", "ar");
      // Add the link to your component (e.g., inside a container)
      // container.appendChild(linkElement); // Assuming you have a suitable container
      // Hide the default AR-button slot if desired
      const arButtonSlot =
        this.modelViewer.shadowRoot.querySelector(".slot.ar-button");
      if (arButtonSlot) {
        arButtonSlot.style.display = "none";
      }
      this.modelViewer.appendChild(linkElement);
    }
    linkElement.href = iOSQuickLookURL.toString();

    // Listen for taps on the custom AR Quick Look banner
    linkElement.removeEventListener("message", this._handleARQuickLookMessage); // Prevent duplicates
    this._handleARQuickLookMessage = (event) => {
      if (event.data === "_apple_ar_quicklook_button_tapped") {
        // 1. Send stats event (same as Android)
        this._sendShortStatsEvent("Cart");

        // 2. Redirect to cart (same as Android)
        window.location.href = this.modelData.addToCartUrl;
      }
    };
    linkElement.addEventListener("message", this._handleARQuickLookMessage);
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
          const currentUrl = `${BRIDGE_URL}/${this.modelData.modelId}`;
          qrCodeManager.updateQrCode(currentUrl);
          qrModal.style.display = "flex";
        }
      } else {
        const currentUrl = `${BRIDGE_URL}/${this.modelData.modelId}`;
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

  // ---------- UI updates for bottom nav and floating cart ----------
  _setupCartButton(container) {
    // Wrapper to position the cart button above the bottom nav
    const cartWrapper = createElement("div", {
      classList: ["cart-button-wrapper"],
    });
    const cartBtn = createElement("button", { classList: ["cart-btn"] });
    cartBtn.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293
               2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4
               2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add to Cart
      `;
    cartWrapper.appendChild(cartBtn);
    container.appendChild(cartWrapper);

    cartWrapper.addEventListener("click", async () => {
      await this._sendShortStatsEvent("Cart");
      window.location.href = this.modelData.addToCartUrl;
    });
  }

  _setupBottomNavBar(container) {
    // create sub-panels
    // (Size panel)
    const sizePanel = createElement("div", {
      classList: ["sub-panel", "hidden"],
    });
    const sizeControls = this._createSizeControls();
    if (sizeControls) sizePanel.appendChild(sizeControls);

    // (Variant panel)
    const variantPanel = createElement("div", {
      classList: ["sub-panel", "hidden"],
    });
    const variantControls = this._setupVariantsColors();
    if (variantControls) variantPanel.appendChild(variantControls);

    // Create the bottom nav container
    const navBar = createElement("div", { classList: ["bottom-nav"] });

    // Toggle function
    const togglePanel = (panel) => {
      const isHidden = panel.classList.contains("hidden");
      // Hide both
      sizePanel.classList.add("hidden");
      variantPanel.classList.add("hidden");
      // Show only if it was hidden
      if (isHidden) panel.classList.remove("hidden");
    };

    // Size button with icon
    const sizeBtn = createElement("button", {
      classList: ["nav-icon-button"],
    });
    sizeBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <span>Size</span>
          `;
    sizeBtn.addEventListener("click", () => {
      togglePanel(sizePanel);
      sizeBtn.classList.toggle(
        "active",
        !sizePanel.classList.contains("hidden")
      );
      variantBtn.classList.remove("active");
    });

    // Variant (Color) button with icon
    const variantBtn = createElement("button", {
      classList: ["nav-icon-button"],
    });
    variantBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0
                   012-2h4a2 2 0 012 2v12a4 4 0
                   01-4 4zm0 0h12a2 2 0 002-2v-4a2
                   2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2
                   2 0 012.828 0l2.829 2.829a2 2 0 010
                   2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <span>Variant</span>
          `;
    variantBtn.addEventListener("click", () => {
      togglePanel(variantPanel);
      variantBtn.classList.toggle(
        "active",
        !variantPanel.classList.contains("hidden")
      );
      sizeBtn.classList.remove("active");
    });

    // Share button with icon
    const shareBtn = createElement("button", {
      classList: ["nav-icon-button"],
    });
    shareBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938
                   9 12.482 9 12c0-.482-.114-.938-.316-1.342m0
                   2.684a3 3 0 110-2.684m0 2.684l6.632
                   3.316m-6.632-6l6.632-3.316m0 0a3 3 0
                   105.367-2.684 3 3 0 00-5.367 2.684zm0
                   9.316a3 3 0 105.368 2.684 3 3 0
                   00-5.368-2.684z"
              />
            </svg>
            <span>Share</span>
          `;
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

    // Append nav buttons
    navBar.appendChild(sizeBtn);
    navBar.appendChild(variantBtn);
    navBar.appendChild(shareBtn);

    // Event to close panels when clicking outside
    this.boundHandleDocumentMouseDown = (e) => {
      const path = e.composedPath();
      if (
        !path.includes(navBar) &&
        !path.includes(sizePanel) &&
        !path.includes(variantPanel)
      ) {
        sizePanel.classList.add("hidden");
        variantPanel.classList.add("hidden");
        sizeBtn.classList.remove("active");
        variantBtn.classList.remove("active");
      }
    };
    document.addEventListener("mousedown", this.boundHandleDocumentMouseDown);

    // Add everything to container
    container.appendChild(sizePanel);
    container.appendChild(variantPanel);
    container.appendChild(navBar);
  }
  // ------------------------------------------------------------------

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
    this.shadowRoot.querySelectorAll('.dimensionLine').forEach((el) => {
      el.style.display = 'block'
    })
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
