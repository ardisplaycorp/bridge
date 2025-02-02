import QRCodeStyling from "qr-code-styling";
import normalTemplate from "./templates/normal.js";
import modalTemplate from "./templates/modal.js";
import buttonTemplate from "./templates/button.js";
import { Eye, Blocks, Rotate3D, Box, FileAxis3D, Scan } from "lucide";
import { BRIDGE_URL, CDN_URL } from "./config/config.js";
import { lazyLoadModelViewerIfNeeded } from "./utils/modelViewerLoader.js";

const NODE_ENV = "production";

const encodeBase64 = (text) => {
  return btoa(text);
};

// Utility for creating and appending elements
const createDomElement = (tag, options = {}) => {
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
  error: (...args) => {
    // console.error(...args);
  },
  warn: (...args) => {
    // console.warn(...args)
  },
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

// Progress modal template
const progressModalTemplate = document.createElement("template");
progressModalTemplate.innerHTML = `
  <div class="progress-modal" id="progressModal" style="display: none;">
    <div class="progress-content">
      <button class="progress-close-button">&times;</button>
      <h3 class="progress-text">Loading...</h3>
      <div class="progress-bar">
        <div class="progress-bar-fill" id="progressBarFill"></div>
      </div>
    </div>
  </div>
  <style>
    .progress-modal {
      position: fixed;
      z-index: 9999;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0.5);
    }
    .progress-content {
      position: relative;
      text-align: center;
      font-family: sans-serif;
    }
    .progress-text {
      color:white;
    }
    .progress-bar {
      width: 200px;
      background: transparent;
      border: 2px solid white;
      border-radius: 4px;
      margin-top: 16px;
      overflow: hidden;
    }
    .progress-bar-fill {
      width: 0;
      height: 8px;
      background: white;
      transition: width 0.2s linear;
    }
    .ar-button {
      margin-top: 16px;
      padding: 8px 16px;
      background: #0072f5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      display: none;
    }
    .ar-button:hover {
      background: #0058bc;
    }
    .progress-close-button {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
      z-index: 10000;
    }
    .progress-close-button:hover {
      color: #ccc;
    }
  </style>
`;

const STEPS = [
  {
    title: "Scanning",
    description:
      "Stand several feet back. With camera facing wall, make sweeping motion side to side, up and down.",
  },
  {
    title: "Basics",
    description:
      "Wall should be well lit. Crop furnishings from initial view. Step back once picture is mounted.",
  },
  {
    title: "Blank wall space",
    description:
      "Mount picture onto another object on the same wall. Hold finger on picture to move with camera into place.",
  },
  {
    title: "Featureless wall",
    description:
      "Tape a newspaper or other graphical item to wall. Mount picture then slide it over to cover paper.",
  },
  {
    title: "Ready to view",
    description: "Get started with AR view",
  },
];

// Multi-steps modal template (bottom 60vh, 90vw, dark overlay)
const stepsModalTemplate = document.createElement("template");
stepsModalTemplate.innerHTML = `
  <div class="multi-steps-overlay" style="display: none;">
    <div class="overlay-bg" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9998;
    ">
      <div class="steps-close-button" style="
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        color: white;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <div class="multi-steps-modal" style="
      position: fixed;
      bottom: .5rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 1rem);
      height: auto;
      max-height: 90vh;
      background-color: rgba(255, 255, 255, 0.85);
      -webkit-backdrop-filter: blur(15px);
      backdrop-filter: blur(15px);
      z-index: 9999;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 15px;
    ">
      <div class="steps-header" style="padding: 1rem;">
        <div class="step-indicator active"></div>
        <div class="step-indicator"></div>
        <div class="step-indicator"></div>
        <div class="step-indicator"></div>
        <div class="step-indicator"></div>
      </div>
      <div class="steps-content" style="padding: 1rem; flex: 1;">
        <img src="${CDN_URL}/wall-art-instructions-1-anim.gif" class="steps-gif" alt="Computer man">
        <h3 class="translate-lang instructions-title">Scanning</h3>
        <div class="instructions-body translate-lang" data-id="space-info">Stand several feet back. With camera facing wall, make sweeping motion side to side, up and down.</div>
      </div>
      <div class="steps-footer" style="
        display: flex; 
        justify-content: flex-end; 
        flex-direction:column;
        gap: 0.5rem; 
        border-top: 1px solid #ccc; 
        font-size: 16px;
        font-weight: bold;
        line-height: 1.5;
        padding: 8px;
        width: 75%;
        max-width: 100%;
        margin: 10px auto;
      ">
        <button class="next-button multi-button">Next</button>
        <button class="skip-button multi-button">Skip</button>
      </div>
    </div>
  </div>
  <style>
    /* You can customize these classes as well */
    .multi-steps-overlay.show {
      display: block;
    }

    .steps-gif{
      width:100%;
      height:auto;
    }

    .view-wall-button{
      width: 100%;
    }

    .view-wall-button svg{
      width: 24px;
      height: 24px;
      margin-right: 8px;
      fill: white;
      stroke: white;
    }

    .instructions-body {
        height:72px;
        display:flex;
        align-items:center;
        font-size: 16px;
        line-height: 1.5;
        color: #272727;
        margin: 10px 0 10px 0;
        text-align: left;
        font-family:sans-serif;
    }

    h3 {
        font-size: 20px;
        font-weight: bold;
        font-family:sans-serif;
        line-height: 1.5;
        margin: 5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 10px 10px 10px 10px;
    }

    .steps-header{
      display:flex;
      flex-direction:row;
      width:80%;
      gap:12px;
      margin:auto;
    }

    .steps-content{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      overflow:hidden;
    }

    .step-indicator{
      height:6px;
      background:#bbbbbb;
      flex:1;
    }

    .step-indicator.active{
      background:black;
    }

    .multi-button{
      padding-block: .5rem;
      cursor:pointer;
      height:45px;
      border-radius:10px;
      flex-shrink:0;
      font-weight:bold;
    }

    .next-button{
      background:black;
      color:white;
    }

    .skip-button{
      border:none;
      color:gray;
      text-decoration:underline;
    }
  </style>
`;

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

    this.isModelLoaded = false;
    this.userClickedAR = false;

    this.currentStep = 1;
    this.totalSteps = 5;

    // Initialize QR related properties
    this.qrCodeManager = null;
    this.qrModal = null;

    // Cache elements
    this.modelViewer = null;

    // Use a requestAnimationFrame for smoother updates
    this.debouncedRenderSVG = this.animationFrameDebounce(this._renderSVG);
    this.debouncedUpdateDimensionHotspots = this.animationFrameDebounce(
      this._updateDimensionHotspots
    );

    // Array of GIF URLs for each step
    this.GIF_URLS = [
      `${CDN_URL}/wall-art-instructions-1-anim.gif`,
      `${CDN_URL}/wall-art-instructions-2-anim.gif`,
      `${CDN_URL}/wall-art-instructions-3-anim.gif`,
      `${CDN_URL}/wall-art-instructions-4-anim.gif`,
    ];

    // Cache for blob URLs
    this.gifCache = {};

    // Simple preloader function with blob URL caching
    this.preloadImage = async (url) => {
      // If we already have something in cache, return it.
      // It could be a promise or the final blob URL.
      if (this.gifCache[url]) {
        return this.gifCache[url];
      }

      // Create and cache the promise immediately.
      const promise = fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          // Replace the promise with the final blob URL.
          this.gifCache[url] = blobUrl;
          logger.debug(`Created blob URL for: ${url}`);
          return blobUrl;
        })
        .catch((error) => {
          logger.warn(`Failed to preload: ${url}`, error);
          // Remove the failed promise so future attempts can try again
          delete this.gifCache[url];
          // Return the original URL as a fallback
          return url;
        });

      // Temporarily store the promise to avoid duplicate fetches
      this.gifCache[url] = promise;
      return promise;
    };

    // Function to setup the preloader for a given step-index
    this.setupPreloaderForStep = (stepIndex, container) => {
      // Only preload if the next gif exists and hasn't been preloaded yet
      if (
        stepIndex + 1 < this.GIF_URLS.length &&
        !this.gifCache[this.GIF_URLS[stepIndex + 1]]
      ) {
        const nextGifUrl = this.GIF_URLS[stepIndex + 1];
        const currentGif = container.querySelector(".steps-gif");

        if (!currentGif) return;

        // Immediately preload if element is already visible
        const rect = currentGif.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
          this.preloadImage(nextGifUrl);
          return;
        }

        const observer = new IntersectionObserver(
          (entries, observerInstance) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.preloadImage(nextGifUrl);
                observerInstance.disconnect();
              }
            });
          },
          {
            threshold: 0.5,
          }
        );

        observer.observe(currentGif);
      }
    };
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

    this.GIF_URLS.push(this.modelData.options[0].posterFileUrl);

    // Bundling external styles and scripts
    this.styles = this._consolidateStyles();
    this.shadowRoot.appendChild(this.styles);

    this._loadTemplate(this.modelData.mode);
    this._moveSlottedContent();

    // Add progress modal to shadow DOM
    this.shadowRoot.appendChild(progressModalTemplate.content.cloneNode(true));

    // Add multi-steps modal template to shadow DOM
    this.shadowRoot.appendChild(stepsModalTemplate.content.cloneNode(true));

    const skipBtn = this.shadowRoot.querySelector(".skip-button");
    const nextBtn = this.shadowRoot.querySelector(".next-button");
    const stepsCloseBtn = this.shadowRoot.querySelector(".steps-close-button");
    skipBtn?.addEventListener("click", () => this._skipToLast());
    nextBtn?.addEventListener("click", () => this._goToNextStep());
    stepsCloseBtn?.addEventListener("click", () => {
      const stepsOverlay = this.shadowRoot.querySelector(
        ".multi-steps-overlay"
      );
      if (stepsOverlay) {
        stepsOverlay.style.display = "none";
      }
    });

    // Setup progress modal close functionality
    const progressModal = this.shadowRoot.querySelector("#progressModal");
    const progressContent = this.shadowRoot.querySelector(".progress-content");
    const closeButton = this.shadowRoot.querySelector(".progress-close-button");

    if (progressModal && closeButton) {
      // Close on X button click
      closeButton.addEventListener("click", () => {
        progressModal.style.display = "none";
      });

      // Close on click outside modal content
      progressModal.addEventListener("click", (event) => {
        if (!progressContent.contains(event.target)) {
          progressModal.style.display = "none";
        }
      });
    }

    this.modelViewer = this.shadowRoot.querySelector("model-viewer");
    this._setupEventListeners();
    // this._setupBottomNavBar(this.modelViewer);

    this._sendShortStatsEvent("View");

    // ---------- UI updates for bottom nav and floating cart ----------
    // Bottom area container (relative positioning for floating button)
    const bottomContainer = createDomElement("div", {
      classList: ["bottom-container"],
    });
    this.modelViewer.appendChild(bottomContainer);

    // Setup the floating cart button
    this._setupCartButton(bottomContainer);

    // Setup the panels and bottom nav
    this._setupBottomNavBar(bottomContainer);
    // ------------------------------------------------------------------
  }

  _showStepsModal() {
    const modal = this.shadowRoot.querySelector(".multi-steps-overlay");
    if (modal) {
      modal.style.display = "block";
      // Preload the first GIF immediately since it's visible
      const firstGifUrl = this.GIF_URLS[0];
      this.preloadImage(firstGifUrl);
      // Setup preloading for the second GIF
      this.setupPreloaderForStep(0, this.shadowRoot);
      // Initialize swipe listeners
      this._setupSwipeListeners();
    }
  }

  _skipToLast() {
    this.currentStep = this.totalSteps;
    const stepsContent = this.shadowRoot.querySelector(".steps-content");
    const nextBtn = this.shadowRoot.querySelector(".next-button");
    const skipBtn = this.shadowRoot.querySelector(".skip-button");

    // Update step indicators
    this.shadowRoot.querySelectorAll(".step-indicator").forEach((el, index) => {
      el.classList.toggle("active", index < this.currentStep);
    });

    // Update content for final step
    stepsContent.innerHTML = `
      <img src="${this.GIF_URLS[this.GIF_URLS.length - 1]}" 
           class="steps-gif" 
           alt="Product preview"
           style="width: 100%;">
      <h3 class="instructions-title">${STEPS[this.currentStep - 1].title}</h3>
      <div class="instructions-body">${
        STEPS[this.currentStep - 1].description
      }</div>
      <button class="view-wall-button" style="
        background: black;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        ">
        <svg version="1.1" id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
        <g>
          <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
            M33.002,49H44c2.762,0,5-2.239,5-5V32.626"/>
          <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
            M1,33v10.999c0,2.763,2.24,5,5,5h11"/>
          <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
            M17,1H6C3.238,1,1,3.238,1,6v11"/>
          <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
            M49,16.625V6c0-2.762-2.238-5-5-5H33.002"/>
          <g>
            <path d="M39,39c0,1.104-1.116,2-2.22,2L14.89,35C13.785,35,13,34.104,13,33V17c0-1.104,0.676-2,1.78-2l22.11-6
              C37.994,9,39,9.896,39,11V39z M23.686,29.171c-0.59,0.588-0.59,1.541,0,2.129c0.293,0.295,0.678,0.441,1.064,0.441
              c0.385,0,0.77-0.146,1.064-0.441l4.377-4.376l4.199,4.198c0.588,0.59,1.541,0.59,2.129,0c0.588-0.588,0.588-1.541,0-2.129
              l-5.264-5.264c-0.588-0.59-1.541-0.59-2.129,0l-1.697,1.697l-3.76-3.758c-0.586-0.586-1.535-0.586-2.121,0l-6.943,6.943
              c-0.586,0.586-0.586,1.535,0,2.121c0.293,0.293,0.676,0.439,1.061,0.439c0.383,0,0.768-0.146,1.061-0.439l5.883-5.883l2.699,2.697
              L23.686,29.171z M29.119,19.571c0-0.998-0.809-1.807-1.807-1.807c-0.996,0-1.805,0.809-1.805,1.807
              c0,0.996,0.809,1.805,1.805,1.805C28.311,21.376,29.119,20.567,29.119,19.571"/>
          </g>
        </g>
        </svg>
        View on your wall
      </button>
    `;

    // Hide next/skip buttons on last step
    if (nextBtn) {
      requestAnimationFrame(() => {
        nextBtn.style.display = "none";
      });
    }
    if (skipBtn) {
      requestAnimationFrame(() => {
        skipBtn.style.display = "none";
      });
    }

    // Add click handler for view wall button
    const viewWallBtn = stepsContent.querySelector(".view-wall-button");
    if (viewWallBtn) {
      viewWallBtn.addEventListener("click", () => {
        this.handleActivateAR();
        const modal = this.shadowRoot.querySelector(".multi-steps-overlay");
        if (modal) modal.style.display = "none";
      });
    }
  }

  async _goToNextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.shadowRoot
        .querySelectorAll(".step-indicator")
        .forEach((el, index) => {
          el.classList.remove("active");
          if (index <= this.currentStep - 1) {
            el.classList.add("active");
          }
        });

      // Handle last step specially
      if (this.currentStep === this.totalSteps) {
        const stepsContent = this.shadowRoot.querySelector(".steps-content");
        const nextBtn = this.shadowRoot.querySelector(".next-button");
        const skipBtn = this.shadowRoot.querySelector(".skip-button");

        // Update content for final step
        stepsContent.innerHTML = `
          <img src="${this.GIF_URLS[this.GIF_URLS.length - 1]}"
               class="steps-gif"
               alt="Product preview"
               style="width: 100%;">
          <h3 class="instructions-title">${
            STEPS[this.currentStep - 1].title
          }</h3>
          <div class="instructions-body">${
            STEPS[this.currentStep - 1].description
          }</div>
          <button class="view-wall-button" style="
            background: black;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            margin-top: 16px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            ">
              <svg version="1.1" id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
              <g>
                <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                  M33.002,49H44c2.762,0,5-2.239,5-5V32.626"/>
                <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                  M1,33v10.999c0,2.763,2.24,5,5,5h11"/>
                <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                  M17,1H6C3.238,1,1,3.238,1,6v11"/>
                <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                  M49,16.625V6c0-2.762-2.238-5-5-5H33.002"/>
                <g>
                  <path d="M39,39c0,1.104-1.116,2-2.22,2L14.89,35C13.785,35,13,34.104,13,33V17c0-1.104,0.676-2,1.78-2l22.11-6
                    C37.994,9,39,9.896,39,11V39z M23.686,29.171c-0.59,0.588-0.59,1.541,0,2.129c0.293,0.295,0.678,0.441,1.064,0.441
                    c0.385,0,0.77-0.146,1.064-0.441l4.377-4.376l4.199,4.198c0.588,0.59,1.541,0.59,2.129,0c0.588-0.588,0.588-1.541,0-2.129
                    l-5.264-5.264c-0.588-0.59-1.541-0.59-2.129,0l-1.697,1.697l-3.76-3.758c-0.586-0.586-1.535-0.586-2.121,0l-6.943,6.943
                    c-0.586,0.586-0.586,1.535,0,2.121c0.293,0.293,0.676,0.439,1.061,0.439c0.383,0,0.768-0.146,1.061-0.439l5.883-5.883l2.699,2.697
                    L23.686,29.171z M29.119,19.571c0-0.998-0.809-1.807-1.807-1.807c-0.996,0-1.805,0.809-1.805,1.807
                    c0,0.996,0.809,1.805,1.805,1.805C28.311,21.376,29.119,20.567,29.119,19.571"/>
                </g>
              </g>
              </svg>
              View on your wall
          </button>
        `;

        const gifElement = stepsContent.querySelector(".steps-gif"); // Get the newly created img element
        const currentGifUrl = this.GIF_URLS[this.GIF_URLS.length - 1]; // URL for the last step

        // Hide next/skip buttons on last step
        if (nextBtn) {
          requestAnimationFrame(() => {
            nextBtn.style.display = "none";
          });
        }
        if (skipBtn) {
          requestAnimationFrame(() => {
            skipBtn.style.display = "none";
          });
        }

        try {
          const blobUrl = await this.preloadImage(currentGifUrl);
          gifElement.src = blobUrl;
          gifElement.setAttribute("loading", "eager");
        } catch (error) {
          gifElement.src = currentGifUrl;
          logger.warn(
            "Failed to use blob URL for last step, falling back to original URL",
            error
          );
        }

        // Add click handler for view wall button
        const viewWallBtn = stepsContent.querySelector(".view-wall-button");
        if (viewWallBtn) {
          viewWallBtn.addEventListener("click", () => {
            this.handleActivateAR();
            const modal = this.shadowRoot.querySelector(".multi-steps-overlay");
            if (modal) modal.style.display = "none";
          });
        }
      } else {
        // Normal step update
        const gifElement = this.shadowRoot.querySelector(".steps-gif");
        const currentGifUrl = this.GIF_URLS[this.currentStep - 1];

        try {
          // Get or create blob URL for the current GIF
          const blobUrl = await this.preloadImage(currentGifUrl);
          gifElement.src = blobUrl;
          gifElement.setAttribute("loading", "eager");
        } catch (error) {
          // Fallback to original URL if blob creation fails
          gifElement.src = currentGifUrl;
          logger.warn(
            "Failed to use blob URL, falling back to original URL",
            error
          );
        }

        this.shadowRoot.querySelector(".instructions-title").innerHTML =
          STEPS[this.currentStep - 1].title;
        this.shadowRoot.querySelector(".instructions-body").innerHTML =
          STEPS[this.currentStep - 1].description;

        // Setup preloading for the next step's gif
        this.setupPreloaderForStep(this.currentStep - 1, this.shadowRoot);
      }
    }
  }

  async _goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      // Update the step indicators
      this.shadowRoot
        .querySelectorAll(".step-indicator")
        .forEach((el, index) => {
          el.classList.toggle("active", index < this.currentStep);
        });

      const stepsContent = this.shadowRoot.querySelector(".steps-content");
      const gifElement = this.shadowRoot.querySelector(".steps-gif");
      const nextBtn = this.shadowRoot.querySelector(".next-button");
      const skipBtn = this.shadowRoot.querySelector(".skip-button");

      // Show next/skip buttons when going back from last step
      if (nextBtn) nextBtn.style.display = "block";
      if (skipBtn) skipBtn.style.display = "block";

      // Update content
      stepsContent.innerHTML = `
        <img src="${
          this.GIF_URLS[this.currentStep - 1]
        }" class="steps-gif" alt="Instructions animation">
        <h3 class="instructions-title">${STEPS[this.currentStep - 1].title}</h3>
        <div class="instructions-body">${
          STEPS[this.currentStep - 1].description
        }</div>
      `;

      const newGifElement = stepsContent.querySelector(".steps-gif");
      if (newGifElement) {
        try {
          const blobUrl = await this.preloadImage(
            this.GIF_URLS[this.currentStep - 1]
          );
          newGifElement.src = blobUrl;
          newGifElement.setAttribute("loading", "eager");
        } catch (error) {
          logger.warn(
            "Failed to use blob URL, falling back to original URL",
            error
          );
        }
      }

      // Setup preloading for the next step's gif
      this.setupPreloaderForStep(this.currentStep - 1, this.shadowRoot);
    }
  }

  _setupSwipeListeners() {
    const stepsContent = this.shadowRoot.querySelector(".steps-content");
    if (!stepsContent) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // minimum px needed for a valid swipe

    const touchStartHandler = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const touchEndHandler = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this._handleSwipeGesture(touchStartX, touchEndX, swipeThreshold);
    };

    stepsContent.addEventListener("touchstart", touchStartHandler);
    stepsContent.addEventListener("touchend", touchEndHandler);

    // Store handlers for cleanup
    this._swipeHandlers = {
      start: touchStartHandler,
      end: touchEndHandler,
      element: stepsContent,
    };
  }

  _handleSwipeGesture(startX, endX, threshold) {
    const diffX = endX - startX;
    if (Math.abs(diffX) > threshold) {
      if (diffX < 0) {
        // Swipe left: go to next step
        this._goToNextStep();
      } else {
        // Swipe right: go to previous step
        this._goToPreviousStep();
      }
    }
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

    // Cleanup blob URLs when component is destroyed
    this.cleanupBlobUrls();

    // Clean up swipe listeners if they exist
    if (this._swipeHandlers) {
      const { start, end, element } = this._swipeHandlers;
      element.removeEventListener("touchstart", start);
      element.removeEventListener("touchend", end);
      this._swipeHandlers = null;
    }
  }

  async _getModelData() {
    // get current url
    let url = window.location.href;
    try {
      // Consider local caching of model data
      let response;
      if (this.getAttribute("src")) {
        response = await fetch(
          `https://v2.ardisplay.io/api/3d-model?id=${this.getAttribute("src")}`
        );
      } else {
        if (url && url.endsWith("/")) {
          url = url.slice(0, -1);
        }
        response = await fetch(
          `https://v2.ardisplay.io/api/3d-model?url=${encodeBase64(url)}`
        );
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
    const style = document.createElement("style");

    if (this.modelData.mode !== "none" && !this.getAttribute("src")) {
      style.textContent = `
        :host {
          display: block;
          width: 100%;
          height: 600px;
        }
      `;
    } else {
      style.textContent = `
        :host {
          display: block;
          width: fit-content;
          height: fit-content;
        }
      `;
    }

    style.textContent += ` 
      *,*::before,*::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      #qrModal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .qr-modal-content {
        background: white;
        border-radius: 8px;
        position: relative;
      }
      .qr-close-button {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 24px;
        cursor: pointer;
        border: none;
        background: none;
        padding: 5px;
      }
      #qr-code {
        margin: 20px auto;
      }

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
      }

      .hide {
        display: none;
      }

      .dot {
        display: none;
      }

      .dim {
        display: none;
        border-radius: 20px;
        color: #1185bb;
        padding: 4px 8px;
        border: 1px solid #1185bb;
      }

      /* QR Modal */

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
    return style;
  }

  async checkWebXRSupport() {
    try {
      if ("xr" in navigator) {
        return await navigator.xr.isSessionSupported("immersive-ar");
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  _loadTemplate(viewMode) {
    let template =
      viewMode === "popup"
        ? modalTemplate
        : viewMode === "inpage"
        ? normalTemplate
        : buttonTemplate;

    if (this.getAttribute("src")) {
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

    // Use a DocumentFragment for better DOM updates
    const fragment = document
      .createRange()
      .createContextualFragment(templateString);

    // Process the icons within the fragment
    this._processLucideIcons(fragment);

    this.shadowRoot.appendChild(fragment);

    if (viewMode === "inpage" && !this.getAttribute("src")) {
      const imageOverlay = document.createElement("img");
      imageOverlay.src = this.modelData.options[0].posterFileUrl;
      imageOverlay.style.position = "absolute";
      imageOverlay.style.top = "0";
      imageOverlay.style.left = "0";
      imageOverlay.style.width = "100%";
      imageOverlay.style.height = "100%";
      imageOverlay.style.objectFit = "contain";
      imageOverlay.style.zIndex = "10";
      this.shadowRoot.querySelector("model-viewer").appendChild(imageOverlay);

      console.log(this);

      this.addEventListener("click", async () => {
        const imageElement = this.shadowRoot.querySelector("model-viewer img");
        if (imageElement) {
          this.shadowRoot
            .querySelector("model-viewer")
            .removeChild(imageElement);
        }
        await lazyLoadModelViewerIfNeeded();
      });

      this.addEventListener("mouseenter", async () => {
        const imageElement = this.shadowRoot.querySelector("model-viewer img");
        if (imageElement) {
          this.shadowRoot
            .querySelector("model-viewer")
            .removeChild(imageElement);
        }
        await lazyLoadModelViewerIfNeeded();
      });
    }
  }

  _updateSizePanel(variantIndex) {
    const sizePanel = this.shadowRoot.querySelector(".size-panel");
    if (!sizePanel) return;

    sizePanel.innerHTML = "";

    const sizeButtonsWrapper = createDomElement("div", {
      classList: ["size-buttons-wrapper"],
    });

    const sizesForVariant = this.variantSizes[variantIndex];
    if (sizesForVariant) {
      Object.entries(sizesForVariant).forEach(([sizeKey, sizeValues]) => {
        const button = createDomElement("button", {
          classList: ["size-button"],
          textContent: sizeKey,
          attributes: {
            "data-size-key": sizeKey,
          },
          disabled: false,
        });

        button.addEventListener("click", (event) => {
          if (!this.modelViewer) return;

          if (variantIndex === 0) {
            this.shadowRoot
              .querySelectorAll(".size-button")
              .forEach((btn) => btn.classList.remove("selected"));
            event.target.classList.add("selected");
            const desiredSize = this.variantSizes[variantIndex][sizeKey];
            this.calculateAndApplyScale(desiredSize);
          }
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
      scan: Scan,
    };

    const elements = fragment.querySelectorAll("[data-lucide]");

    elements.forEach((element) => {
      const iconName = element.getAttribute("data-lucide").toLowerCase();
      const icon = iconMap[iconName];

      if (icon) {
        const size = element.getAttribute("width") || 24;
        const color = element.getAttribute("color") || "currentColor";

        // Create SVG element
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", color);
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        // Process icon children
        icon[2].forEach((child) => {
          const [tagName, attributes] = child;
          const element = document.createElementNS(
            "http://www.w3.org/2000/svg",
            tagName
          );

          // Set attributes
          Object.entries(attributes).forEach(([name, value]) => {
            element.setAttribute(name, value);
          });

          svg.appendChild(element);
        });

        // Replace original element
        element.parentNode.replaceChild(svg, element);
      } else {
        // console.warn(`Icon "${iconName}" not found`);
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
    console.log(this.modelData.mode);
    if (this.modelData.mode === "popup") {
      this._setupModalEventListeners();
    } else if (this.modelData.mode === "inpage") {
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
      this.isModelLoaded = true;
      if (this.qrCodeButton) {
        this.qrCodeButton.disabled = false;
      }

      // Get dimensions and set up sizes
      const size = this.modelViewer.getDimensions();
      const scale = this.modelViewer.scale.toString().split(" ").map(Number);
      this.originalSize = { x: 0, y: 0, z: 0 };
      this.originalSize.x = size.x / scale[0];
      this.originalSize.y = size.y / scale[1];
      this.originalSize.z = size.z / scale[2];

      // Apply initial size if available
      if (this.variantSizes && this.variantSizes[this.selectedIndex]) {
        const sizesForVariant = this.variantSizes[this.selectedIndex];
        const firstSizeKey = Object.keys(sizesForVariant)[0];
        if (firstSizeKey) {
          const firstSizeValues = sizesForVariant[firstSizeKey];
          this.calculateAndApplyScale(firstSizeValues);

          requestAnimationFrame(() => {
            const sizeButtons =
              this.shadowRoot.querySelectorAll(".size-button");
            sizeButtons.forEach((btn) => {
              btn.classList.toggle(
                "selected",
                btn.textContent === firstSizeKey
              );
            });
          });
        }
      }

      // Create size panel if needed
      if (!this.shadowRoot.querySelector(".size-panel button")) {
        this._updateSizePanel(0);
      }

      // Hide default AR button
      const arButtonSlot =
        this.modelViewer.shadowRoot.querySelector(".slot.ar-button");
      if (arButtonSlot) {
        arButtonSlot.style.display = "none";
      }

      // Handle progress modal and show multi-steps
      const progressModal = this.shadowRoot.querySelector("#progressModal");
      if (progressModal && progressModal.style.display !== "none") {
        progressModal.style.display = "none";
        // Only show multi-steps modal if we were showing the progress modal
        this._showStepsModal();
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

    this.modelViewer.addEventListener("progress", (event) => {
      const progress = Math.round(event.detail.totalProgress * 100);
      const fillElem = this.shadowRoot.querySelector("#progressBarFill");
      if (fillElem) {
        fillElem.style.width = `${progress}%`;
      }
    });

    this.modelViewer.addEventListener("load", () => {
      this.isModelLoaded = true;

      this.shadowRoot.querySelectorAll(".dim").forEach((dim) => {
        dim.style.display = "block";
      });

      // Show AR button if model is loaded
      const arButton = this.shadowRoot.querySelector("#activateAR");
      if (arButton) {
        arButton.addEventListener("click", async (event) => {
          // Ensure we're handling the click event
          if (event instanceof MouseEvent) {
            try {
              await this.modelViewer.activateAR();
              // Hide progress modal after AR is activated
              const progressModal =
                this.shadowRoot.querySelector("#progressModal");
              if (progressModal) {
                progressModal.style.display = "none";
              }
            } catch (error) {
              // console.error("Error activating AR:", error);
            }
          }
        });
        arButton.style.display = "block";
      }
    });

    this._setupQRCodeListeners();
  }

  _isIOSDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  _isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  async _setupQRCodeListeners() {
    const qrModal = this.shadowRoot.querySelector("#qrModal");
    const qrCodeContainer = this.shadowRoot.querySelector("#qr-code");
    const qrCodeButton = this.shadowRoot.querySelector(".qr-code-button");
    const qrCloseButton = this.shadowRoot.querySelector(".qr-close-button");

    if (!qrModal || !qrCodeContainer || !qrCodeButton || !qrCloseButton) {
      logger.warn("QR code elements not found in the DOM");
      return;
    }

    // Store references to QR elements
    this.qrModal = qrModal;
    this.qrCodeManager = new QrCodeManager(qrCodeContainer, this.modelData);

    qrCodeButton.addEventListener("click", async () => {
      if (this.modelData.mode === "none" && this._isMobileDevice()) {
        // Show progress modal immediately!
        const progressModal = this.shadowRoot.querySelector("#progressModal");
        if (progressModal) {
          const fillElem = this.shadowRoot.querySelector("#progressBarFill");
          if (fillElem) fillElem.style.width = "0%"; // Reset progress bar
          progressModal.style.display = "flex"; // Show the modal
          this.userClickedAR = true; // Keep track of user click
        }

        await lazyLoadModelViewerIfNeeded(); // Start loading model-viewer

        // Now that model-viewer is loaded, get the element and attach event listener
        this.modelViewer = this.shadowRoot.querySelector("model-viewer"); // Re-fetch modelViewer after lazy load
        if (this.modelViewer) {
          this.modelViewer.addEventListener("progress", (event) => {
            const progress = Math.round(event.detail.totalProgress * 100);
            const fillElem = this.shadowRoot.querySelector("#progressBarFill");
            if (fillElem) {
              fillElem.style.width = `${progress}%`;
            }
          });
        }

        // Continue with the rest of your logic (steps modal, etc.)
        // const hasWebXRSupport = await this.checkWebXRSupport();
        // if (!hasWebXRSupport) {
        //   this._resetSteps();
        //   this._showStepsModal();
        //   return;
        // }

        if (this.isModelLoaded) {
          this._resetSteps();
          this._showStepsModal();
          return;
        }
      } else if (!this._isMobileDevice()) {
        // If not mobile device, show QR code directly
        const currentUrl = `${BRIDGE_URL}/${this.modelData.modelId}`;
        this.qrCodeManager.updateQrCode(currentUrl);
        qrModal.style.display = "flex";
        return;
      } else {
        // Mobile device, but not mode "none" (likely inpage or popup)
        // For mobile devices, check WebXR support
        const hasWebXRSupport = await this.checkWebXRSupport();

        // If mobile device doesn't support WebXR, show multi-steps modal immediately
        // if (!hasWebXRSupport) {
        //   this._resetSteps();
        //   this._showStepsModal();
        //   return;
        // }

        // Continue with WebXR flow
        if (this.isModelLoaded) {
          this._resetSteps();
          this._showStepsModal();
          return;
        }

        // Loading flow for WebXR-supported devices
        const progressModal = this.shadowRoot.querySelector("#progressModal");
        if (progressModal) {
          const fillElem = this.shadowRoot.querySelector("#progressBarFill");
          if (fillElem) fillElem.style.width = "0%";
          progressModal.style.display = "flex";
          this.userClickedAR = true;
        }
        await lazyLoadModelViewerIfNeeded();
      }
    });

    qrCloseButton.addEventListener("click", () => {
      qrModal.style.display = "none";
    });

    // Close modal when clicking outside
    qrModal.addEventListener("click", (event) => {
      if (event.target === qrModal) {
        qrModal.style.display = "none";
      }
    });
  }

  _resetSteps() {
    // Reset steps to initial state
    this.currentStep = 1;
    this.shadowRoot.querySelectorAll(".step-indicator").forEach((el, index) => {
      el.classList.toggle("active", index === 0);
    });

    // Reset content to first step
    const stepsContent = this.shadowRoot.querySelector(".steps-content");
    if (stepsContent) {
      stepsContent.innerHTML = `
        <img src="${this.GIF_URLS[0]}" class="steps-gif" alt="Computer man">
        <h3 class="instructions-title">${STEPS[0].title}</h3>
        <div class="instructions-body">${STEPS[0].description}</div>
      `;
    }

    // Show next/skip buttons
    const nextBtn = this.shadowRoot.querySelector(".next-button");
    const skipBtn = this.shadowRoot.querySelector(".skip-button");
    if (nextBtn) nextBtn.style.display = "block";
    if (skipBtn) skipBtn.style.display = "block";
  }

  handleActivateAR() {
    this._sendShortStatsEvent("Click");

    // Show QR code directly if not mobile
    if (!this._isMobileDevice()) {
      const currentUrl = `${BRIDGE_URL}/${this.modelData.modelId}`;
      if (this.qrCodeManager && this.qrModal) {
        this.qrCodeManager.updateQrCode(currentUrl);
        this.qrModal.style.display = "flex";
      }
      return;
    }

    // Mobile device flow
    if (this.modelViewer.canActivateAR) {
      try {
        this._sendShortStatsEvent("Try");
        this.modelViewer.activateAR();
      } catch (err) {
        this._sendShortStatsEvent("Failed", err.message);
        logger.warn("Could not activate AR:", err);
        const currentUrl = `${BRIDGE_URL}/${this.modelData.modelId}`;
        if (this.qrCodeManager && this.qrModal) {
          this.qrCodeManager.updateQrCode(currentUrl);
          this.qrModal.style.display = "flex";
        } else {
          logger.error("QR code manager or modal not initialized");
        }
      }
    }
  }

  _setupVariantsColors() {
    if (!this.variants || this.variants.length === 0) return null;

    const slider = createDomElement("div", { classList: ["slider"] });
    const slidesWrapper = createDomElement("div", { classList: ["slides"] });

    this.variants.forEach((variant, index) => {
      const slideButton = createDomElement("button", { classList: ["slide"] });

      if (index === 0) {
        slideButton.classList.add("selected");
        if (this.modelViewer && variant.url) {
          let VARIANT_URL = new URL(variant.url);
          this.modelViewer.src = VARIANT_URL.href;
          if (variant.posterFileUrl) {
            this.modelViewer.poster = variant.posterFileUrl;
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
          let VARIANT_URL = new URL(variant.url);
          this.modelViewer.src = VARIANT_URL.href;
        }

        this._updateSizePanel(index);

        if (variant.posterFileUrl) {
          this.modelViewer.poster = variant.posterFileUrl;
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
    const cartWrapper = createDomElement("div", {
      classList: ["cart-button-wrapper"],
    });
    const cartBtn = createDomElement("button", { classList: ["cart-btn"] });
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
               2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0
               100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
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
    const sizePanel = createDomElement("div", {
      classList: ["sub-panel", "hidden"],
    });
    const sizeControls = this._createSizeControls();
    if (sizeControls) sizePanel.appendChild(sizeControls);

    // (Variant panel)
    const variantPanel = createDomElement("div", {
      classList: ["sub-panel", "hidden"],
    });
    const variantControls = this._setupVariantsColors();
    if (variantControls) variantPanel.appendChild(variantControls);

    // Create the bottom nav container
    const navBar = createDomElement("div", { classList: ["bottom-nav"] });

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
    const sizeBtn = createDomElement("button", {
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
    const variantBtn = createDomElement("button", {
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
    const shareBtn = createDomElement("button", {
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
                   105.367-2.684 3 3 0
                   00-5.367 2.684zm0
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

    view3DButton.addEventListener("click", async () => {
      previewImage.style.display = "none";
      view3DButton.style.display = "none";
      modelViewerContainer.style.display = "flex";
      overlay.style.display = "block";
      await lazyLoadModelViewerIfNeeded();
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
        end: "hotspot-dot+X-Y+Z",
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
    this.shadowRoot.querySelectorAll(".dimensionLine").forEach((el) => {
      el.style.display = "block";
    });
    this.debouncedRenderSVG();
    this.debouncedUpdateDimensionHotspots();
  }

  _createSizeControls() {
    const sizePanel = createDomElement("div", { classList: ["size-panel"] });
    const sizeButtonsWrapper = createDomElement("div", {
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

  cleanupBlobUrls() {
    Object.values(this.gifCache).forEach((blobUrl) => {
      URL.revokeObjectURL(blobUrl);
    });
    this.gifCache = {};
  }
}

customElements.define("ardisplay-viewer", ARDisplayViewer);

document.addEventListener("DOMContentLoaded", () => {
  // Ensure custom element is defined before replacement
  if (window.customElements.get("ardisplay-viewer")) {
    replacePlaceholders();
  } else {
    window.customElements
      .whenDefined("ardisplay-viewer")
      .then(replacePlaceholders);
  }
});

function replacePlaceholders() {
  const placeholders = document.querySelectorAll("div.ardisplay-viewer");
  placeholders.forEach((placeholder) => {
    const newEl = document.createElement("ardisplay-viewer");
    // Copy attributes and children
    Array.from(placeholder.attributes).forEach((attr) => {
      newEl.setAttribute(attr.name, attr.value);
    });
    while (placeholder.firstChild) {
      newEl.appendChild(placeholder.firstChild);
    }
    placeholder.replaceWith(newEl);
  });
}
