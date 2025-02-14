import QRCodeStyling from "qr-code-styling";
import normalTemplate from "./templates/normal.js";
import modalTemplate from "./templates/modal.js";
import buttonTemplate from "./templates/button.js";
import hotspotsTemplate from "./templates/hotspots.js";
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

function createPortal(element, container = document.body) {
  container.appendChild(element);
  return element;
}

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

async function PosterWithCache(posterUrl, cache) {
  if (cache[posterUrl]) {
    return cache[posterUrl];
  } else {
    try {
      const fetchPromise = fetch(posterUrl)
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.blob();
        })
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          cache[posterUrl] = blobUrl;
          return blobUrl;
        });
      cache[posterUrl] = fetchPromise;
      return await fetchPromise;
    } catch (error) {
      console.error("Failed to load poster:", error);
      delete cache[posterUrl];
      return posterUrl; // Fallback to original URL
    }
  }
}

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
    // Clear all existing content inside the container
    this.container.innerHTML = "";

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
  <div class="ardisplay-progress-modal" id="ardisplayProgressModal" style="display: none;direction: ltr;">
    <div class="ardisplay-progress-content">
      <button class="ardisplay-progress-close-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg></button>
      <h3 class="ardisplay-progress-text">Loading...</h3>
      <div class="ardisplay-progress-bar">
        <div class="ardisplay-progress-bar-fill" id="ardisplayProgressBarFill"></div>
      </div>
    </div>
  </div>
  <style>
    .ardisplay-progress-modal {
      position: fixed;
      z-index: 9999;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .ardisplay-progress-content {
      position: relative;
      text-align: center;
      font-family: sans-serif;
    }
    .ardisplay-progress-text {
      color:white;
    }
    .ardisplay-progress-bar {
      width: 200px;
      background: transparent;
      border: 2px solid white;
      border-radius: 4px;
      margin-top: 16px;
      overflow: hidden;
    }
    .ardisplay-progress-bar-fill {
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
    .ardisplay-progress-close-button {
      position: fixed;
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
        padding: 0;
        background: transparent;
    }
    .ardisplay-progress-close-button:hover {
      color: #ccc;
    }
    .ardisplay-progress-close-button svg{
      width:30px;
      height:30px;
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
    title: "Ready to view",
    description: "Get started with AR view",
  },
];

// Multi-steps modal template (bottom 60vh, 90vw, dark overlay)
const stepsModalTemplate = document.createElement("template");
stepsModalTemplate.innerHTML = `
  <div class="ardisplay-multi-steps-overlay" style="display: none;direction: ltr;">
    <div class="ardisplay-overlay-bg" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9998;
    ">
      <div class="ardisplay-steps-close-button" style="
        position: fixed;
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
        <svg xmlns="http://www.w3.org/2000/svg" style="width:30px;height:30px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <div class="ardisplay-multi-steps-modal" style="
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
      <div class="ardisplay-steps-content" style="padding: 1rem; flex: 1;padding-top: 0;">
        <h3 class="ardisplay-translate-lang instructions-title">Scanning</h3>
        <img id="instructionGif" src="" class="ardisplay-steps-gif" alt="Computer man">
        <div class="ardisplay-instructions-body translate-lang" data-id="space-info">Stand several feet back. With camera facing wall, make sweeping motion side to side, up and down.</div>
      </div>
      <div class="ardisplay-steps-footer" style="
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
        <button class="ardisplay-next-button ardisplay-multi-button">Next</button>
      </div>
    </div>
  </div>
  <style>
    /* You can customize these classes as well */
    .ardisplay-multi-steps-overlay.show {
      display: block;
    }

    .ardisplay-steps-gif{
      width:100%;
      height:auto;
      border-radius: 20px;
    }

    .ardisplay-view-wall-button{
      width: 100%;
    }

    .ardisplay-view-wall-button svg{
      width: 24px;
      height: 24px;
      margin-right: 8px;
      fill: white;
      stroke: white;
    }

    .ardisplay-instructions-body {
        display:flex;
        align-items:center;
        font-size: 16px;
        line-height: 1.5;
        color: #272727;
        margin: 10px 0 10px 0;
        text-align: justify;
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

    .ardisplay-steps-header{
      display:flex;
      flex-direction:row;
      width:80%;
      gap:12px;
      margin:auto;
    }

    .ardisplay-steps-content{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      overflow:hidden;
    }

    .ardisplay-step-indicator{
      height:6px;
      background:#bbbbbb;
      flex:1;
    }

    .ardisplay-step-indicator.active{
      background:black;
    }

    .ardisplay-multi-button{
      padding-block: .5rem;
      cursor:pointer;
      height:45px;
      border-radius:10px;
      flex-shrink:0;
      font-weight:bold;
    }

    .ardisplay-next-button{
      background:black!important;
      color:white;
    }

    .ardisplay-skip-button{
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
    this.totalSteps = 2;

    // Initialize QR related properties
    this.qrCodeManager = null;
    this.qrModal = null;

    this.posters = {};

    // Cache elements
    this.modelViewer = null;

    // Use a requestAnimationFrame for smoother updates
    this.debouncedRenderSVG = this.animationFrameDebounce(this._renderSVG);
    this.debouncedUpdateDimensionHotspots = this.animationFrameDebounce(
      this._updateDimensionHotspots
    );

    // Array of GIF URLs for each step
    this.GIF_URLS = [];

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
        const currentGif = container.querySelector(".ardisplay-steps-gif");

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

    if (this.modelData.placement === "wall") {
      this.GIF_URLS.push(`${CDN_URL}/wall.webp`);
    } else {
      this.GIF_URLS.push(`${CDN_URL}/floor.gif`);
    }

    // Bundling external styles and scripts
    this.styles = this._consolidateStyles();
    if (this.modelData.mode !== "popup") {
      this.shadowRoot.appendChild(this.styles);
    } else {
      document.body.appendChild(this.styles);
    }

    const qrModalTemplate = document.createElement("template");
    qrModalTemplate.innerHTML = `
      <!-- QR Code Modal -->
      <style>
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
          background-color: #fefefe;
          border: 1px solid #888;
          width: 820px;
          height: 418px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
        #qr-code {
          margin: 20px auto;
        }
      </style>
      <div id="qrModal" class="qr-modal" style="direction: ltr;">
          <div class="qr-modal-content" style="display: flex; flex-direction: row;text-align: center;overflow: hidden;">
          <button class="qr-close-button">×</button>
          <div style="width: 50%; height:100%;flex-grow: 0; flex-shrink: 0;display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
              <h2>
                  <p id="btn-text" style="margin: 0">${this.modelData.title}</p>
              </h2>
              <p data-id="qrcode-info" class="translate-lang" style="margin:0">${this.modelData.description}</p>
              <div class="qr-code-container">
                  <div id="qr-code"></div>
              </div>
          </div>
          <div style="width: 50%; height:100%; flex-grow: 0; flex-shrink: 0;">
              <img src="${this.modelData.options[0].posterFileUrl}" alt="Artwork" style="width: 100%; height: 100%; object-fit: contain; object-position: center;">
          </div>
          </div>
      </div>
    `;

    const template = hotspotsTemplate();

    const modalModeTemplate = document.createElement("template");
    modalModeTemplate.innerHTML = `
      <style>
      .model-viewer-container{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 96px);
        height: calc(100% - 96px);
        display: none;
        background-color: white;
        flex-direction: row;
        z-index: 999;
      }

      /* Consolidated Styles */
      model-viewer {
        width: 100%;
        height: 100%;
        --min-hotspot-opacity: 0;
        position: relative;
      }
        
      .ardisplay-close-button{
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
      }
      .ardisplay-close-button svg{
        width: 24px;
        height: 24px;
        fill: black;
      }
      .ardisplay-model-viewer-overlay{
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
        display: none;
      }
      .ardisplay-details-panel{
        width: 400px;
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding-block: 1rem;
        padding-top: 50px; // added padding
      }
      @media only screen and (max-width: 900px){
        .model-viewer-container{
          width: 100%;
          height: calc(100% - 48px);
          transform: translate(-50%, 0);
          top: 48px;
        }
        .ardisplay-details-panel{
          display: none!important;
        }

        .ardisplay-model-viewer-overlay{
          top: -48px;
        }

        .ardisplay-qr-code-button{
          display:flex!important;
        }
      }
      .ardisplay-details-panel{
        display:flex;
      }
      .ardisplay-qr-code-button{
        all: unset;
        position: absolute;
        display:none;
        top: 10px;
        right: 50%;
        transform: translateX(50%);
        background: white;
        cursor: pointer;
        padding: 10px;
        z-index: 1000;
        align-items: center;
        justify-content: center;
        gap: 10px;
        white-space: nowrap;
      }
      .ardisplay-show{
        display:flex!important;
      }
      </style>
      <div class="model-viewer-container" style="direction: ltr;">
                <model-viewer  
                    ar
                    shadow-intensity="${this.modelData.shadow}"
                    ar-placement="${this.modelData.placement}"
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
                      this.modelData.arBtn.btnBgColor
                    };color: ${
      this.modelData.arBtn.btnTextColor
    };border-radius: ${this.modelData.arBtn.cornerRadius}px;font-size: ${
      this.modelData.arBtn.btnSize - 6
    }px;text-wrap: nowrap;">
                        ${
                          this.modelData.arBtn.btnIcon
                            ? `<i data-lucide="${this.modelData.arBtn.btnIcon}" style="width: 24px; height: 24px;color: inherit;"></i>`
                            : ""
                        }
                        ${this.modelData.arBtn.btnText}
                    </button>
                </model-viewer>
                <button class="ardisplay-close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
                <div class="ardisplay-details-panel" style="flex-direction:column;">
                    <div class="ar-display-custom-panel" style="flex:1;display:block;"></div>
                    <button id="showQRButton" style="margin-top: 16px; margin-right: 16px; padding: 8px 16px; color: black; border: none; border-radius: 4px; cursor: pointer;display:flex;flex-direction:row;align-items:center;gap:16px;font-weight:700;">
                      <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" aria-hidden="true" class="rotera-svg-icon"><path d="M2 2h7v2H4v5H2V2zm18 2h-5V2h7v7h-2V4zM4 15H2v7h7v-2H4v-5zm18 0h-2v5h-5v2h7v-7z"></path><path d="M11 6h2v5h5v7h-7v-5H6v-2h5V6z"></path><path d="M9 6H6v3h3V6zm6 0h3v3h-3V6zm-6 9H6v3h3v-3z"></path></svg>
                      Try it in your home
                    </button>
                    <div id="inline-qr-container" style="display: none; margin-top: 16px;justify-content:center;align-items:center;"></div>
                </div>
            </div>
            <div class="ardisplay-model-viewer-overlay"></div>
        </div>
    `;

    this.styles = this._consolidateStyles();
    this.shadowRoot.appendChild(this.styles);

    // Load template first
    await this._loadTemplate(this.modelData.mode);
    this._moveSlottedContent();

    // Add progress modal to shadow DOM
    createPortal(progressModalTemplate.content.cloneNode(true));

    // Add multi-steps modal template using portal
    createPortal(stepsModalTemplate.content.cloneNode(true));

    const gifFile =
      this.modelData.placement === "wall" ? "wall.webp" : "floor.gif";
    const instructionGif = document.querySelector("#instructionGif");
    if (instructionGif) {
      instructionGif.src = `${CDN_URL}/${gifFile}`;
    }

    const contentBody = this.modelData.placement === "wall" ? "wall" : "floor";
    const instructionBody = document.querySelector(
      ".ardisplay-instructions-body"
    );
    instructionBody.innerHTML = `Stand several feet back. With camera facing ${contentBody}, make sweeping motion side to side, up and down.`;

    if (this.modelData.mode !== "popup") {
      // Add QR modal template using portal
      createPortal(qrModalTemplate.content.cloneNode(true));
    }

    if (this.modelData.mode === "popup") {
      createPortal(modalModeTemplate.content.cloneNode(true));
    }

    this.modelViewer =
      this.modelData.mode === "popup"
        ? document.querySelector("model-viewer")
        : this.shadowRoot.querySelector("model-viewer");

    const showQRButton = document.querySelector("#showQRButton");
    if (showQRButton) {
      showQRButton.addEventListener("click", () => {
        // NEW CODE: show the QR inline
        const inlineQrContainer = document.querySelector(
          "#inline-qr-container"
        );
        if (inlineQrContainer) {
          // Reveal the container if it was hidden
          inlineQrContainer.classList.toggle("ardisplay-show");

          // Update the QR code to reflect your desired URL
          const currentUrl = `${BRIDGE_URL}/${this.modelData.modelId}`;
          if (this.qrCodeManager) {
            this.qrCodeManager.updateQrCode(currentUrl);
          }
        }
      });
    }

    if (this.modelData.mode === "popup") {
      this._processLucideIcons(
        document.querySelector(".ardisplay-qr-code-button")
      );
    }

    // Set up QR code listeners after template is loaded
    const qrCodeButton = this.shadowRoot.querySelector(
      ".ardisplay-qr-code-button"
    );
    const qrCodeContainer = document.querySelector("#qr-code");

    if (qrCodeButton && qrCodeContainer && this.modelData.mode !== "popup") {
      // Initialize QR code manager
      this.qrCodeManager = new QrCodeManager(qrCodeContainer, this.modelData);
      this._setupQRCodeListeners();
    }

    if (this.modelData.mode === "popup") {
      const inlineQrContainer = document.querySelector("#inline-qr-container");
      if (inlineQrContainer) {
        this.qrCodeManager = new QrCodeManager(
          inlineQrContainer,
          this.modelData
        );
      }
    }

    const nextBtn = document.querySelector(".ardisplay-next-button");
    const stepsCloseBtn = document.querySelector(
      ".ardisplay-steps-close-button"
    );
    nextBtn?.addEventListener("click", this._goToNextStep.bind(this));
    stepsCloseBtn?.addEventListener("click", () => {
      const stepsOverlay = document.querySelector(
        ".ardisplay-multi-steps-overlay"
      );
      if (stepsOverlay) {
        stepsOverlay.style.display = "none";
      }
    });

    // Setup progress modal close functionality
    const progressModal = document.querySelector("#ardisplayProgressModal");
    const progressContent = document.querySelector(
      ".ardisplay-progress-content"
    );
    const closeButton = document.querySelector(
      ".ardisplay-progress-close-button"
    );

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

    this._setupEventListeners();
    // this._setupBottomNavBar(this.modelViewer);

    this._sendShortStatsEvent("View");

    // ---------- UI updates for bottom nav and floating cart ----------
    // Bottom area container (relative positioning for floating button)
    const bottomContainer = createDomElement("div", {
      classList: ["bottom-container"],
    });
    bottomContainer.style.direction = "ltr";
    this.modelViewer.appendChild(bottomContainer);

    // Setup the floating cart button
    this._setupCartButton(bottomContainer);

    // Setup the panels and bottom nav
    this._setupBottomNavBar(bottomContainer);
    // ------------------------------------------------------------------
  }

  _showStepsModal() {
    const modal = document.querySelector(".ardisplay-multi-steps-overlay");
    if (modal) {
      modal.style.display = "block";
      // Preload the first GIF immediately since it's visible
      const firstGifUrl = this.GIF_URLS[0];
      this.preloadImage(firstGifUrl);
      // Setup preloading for the second GIF
      this.setupPreloaderForStep(0, document);
      // Initialize swipe listeners
      this._setupSwipeListeners();
    }
  }

  _skipToLast() {
    this.currentStep = this.totalSteps;
    const stepsContent = document.querySelector(".ardisplay-steps-content");
    const nextBtn = document.querySelector(".ardisplay-next-button");
    const skipBtn = document.querySelector(".ardisplay-skip-button");

    // Update step indicators
    document
      .querySelectorAll(".ardisplay-step-indicator")
      .forEach((el, index) => {
        el.classList.toggle("active", index < this.currentStep);
      });

    // Update content for final step
    stepsContent.innerHTML = `
      <h3 class="ardisplay-instructions-title">${
        STEPS[this.currentStep - 1].title
      }</h3>
      <img src="${this.GIF_URLS[this.GIF_URLS.length - 1]}"
           class="ardisplay-steps-gif"
           alt="Product preview"
           style="width: 100%;">
      <div class="ardisplay-instructions-body">${
        STEPS[this.currentStep - 1].description
      }</div>
      <button class="ardisplay-view-wall-button" style="
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
        nextBtn.parentElement.style.display = "none";
      });
    }
    if (skipBtn) {
      requestAnimationFrame(() => {
        skipBtn.style.display = "none";
      });
    }

    // Add click handler for view wall button
    const viewWallBtn = stepsContent.querySelector(
      ".ardisplay-view-wall-button"
    );
    if (viewWallBtn) {
      viewWallBtn.addEventListener("click", () => {
        this.handleActivateAR();
        const modal = document.querySelector(".ardisplay-multi-steps-overlay");
        if (modal) modal.style.display = "none";
      });
    }
  }

  async _goToNextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      document
        .querySelectorAll(".ardisplay-step-indicator")
        .forEach((el, index) => {
          el.classList.remove("active");
          if (index <= this.currentStep - 1) {
            el.classList.add("active");
          }
        });

      // Handle last step specially
      if (this.currentStep === this.totalSteps) {
        const stepsContent = document.querySelector(".ardisplay-steps-content");
        const nextBtn = document.querySelector(".ardisplay-next-button");
        const skipBtn = document.querySelector(".ardisplay-skip-button");

        // Update content for final step
        stepsContent.innerHTML = `
          <h3 class="ardisplay-instructions-title">${
            STEPS[this.currentStep - 1].title
          }</h3>
          <img src="${this.GIF_URLS[this.GIF_URLS.length - 1]}"
               class="ardisplay-steps-gif"
               alt="Product preview"
               style="object-fit: cover;width: 100%;">
          <div class="ardisplay-instructions-body">${
            STEPS[this.currentStep - 1].description
          }</div>
          <button class="ardisplay-view-wall-button" style="
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

        const gifElement = stepsContent.querySelector(".ardisplay-steps-gif"); // Get the newly created img element
        const currentGifUrl = this.GIF_URLS[this.GIF_URLS.length - 1]; // URL for the last step

        // Hide next/skip buttons on last step
        if (nextBtn) {
          requestAnimationFrame(() => {
            nextBtn.parentElement.style.display = "none";
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
        const viewWallBtn = stepsContent.querySelector(
          ".ardisplay-view-wall-button"
        );
        if (viewWallBtn) {
          viewWallBtn.addEventListener("click", () => {
            this.handleActivateAR();
            const modal = document.querySelector(
              ".ardisplay-multi-steps-overlay"
            );
            if (modal) modal.style.display = "none";
          });
        }
      } else {
        // Normal step update
        const gifElement = document.querySelector(".ardisplay-steps-gif");
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

        document.querySelector(".ardisplay-instructions-title").innerHTML =
          STEPS[this.currentStep - 1].title;
        document.querySelector(".ardisplay-instructions-body").innerHTML =
          STEPS[this.currentStep - 1].description;

        // Setup preloading for the next step's gif
        this.setupPreloaderForStep(this.currentStep - 1, document);
      }
    }
  }

  async _goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      document
        .querySelectorAll(".ardisplay-step-indicator")
        .forEach((el, index) => {
          el.classList.remove("active");
          if (index < this.currentStep) {
            el.classList.add("active");
          }
        });

      // Update content for the previous slide using this.modelData.placement
      const stepsContent = document.querySelector(".ardisplay-steps-content");
      stepsContent.innerHTML = `
        <h3 class="ardisplay-instructions-title">${
          STEPS[this.currentStep - 1].title
        }</h3>
        <img src="${this.GIF_URLS[this.currentStep - 1]}"
             class="ardisplay-steps-gif"
             alt="Product preview"
             style="width: 100%;">
        <div class="ardisplay-instructions-body">
          Stand several feet back. With camera facing ${
            this.modelData.placement
          }, make sweeping motion side to side, up and down.
        </div>
      `;

      // Restore next button container to flex (in case it was hidden on the final slide)
      const nextBtn = document.querySelector(".ardisplay-next-button");
      if (nextBtn && nextBtn.parentElement) {
        nextBtn.parentElement.style.display = "flex";
      }
    }
  }

  _setupSwipeListeners() {
    const stepsContent = document.querySelector(".ardisplay-steps-content");
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

      if (this.getAttribute("src")) {
        this.modelData.mode = "none";
      }

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

    if (
      this.modelData.mode !== "none" &&
      !this.getAttribute("src") &&
      this.modelData.mode !== "popup"
    ) {
      style.textContent = `
        :host {
          display: block;
          width: 100%;
          height: 600px;
          transform: scale(1);
        }
      `;
    } else {
      style.textContent = `
        :host {
          display: block;
          width: fit-content;
          height: fit-content;
          transform: scale(1);
        }
      `;
    }

    style.textContent += ` 
      *,*::before,*::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      /* Consolidated Styles */
      model-viewer {
        width: 100%;
        height: 100%;
        --min-hotspot-opacity: 0;
        position: relative;
        display: block;
      }

      model-viewer[ar-status="session-started"] .ardisplay-qr-code-button,
      model-viewer[ar-status="object-placed"] .ardisplay-qr-code-button {
        display: none;
      }



      model-viewer[ar-status="session-started"] .ardisplay-nav-icon-button:last-child,
      model-viewer[ar-status="object-placed"] .ardisplay-nav-icon-button:last-child {
        display: flex;
      }

      model-viewer[ar-status="session-started"] .dim,
      model-viewer[ar-status="object-placed"] .dim{
        display: none!important;
      }

      model-viewer[ar-status="session-started"] #dimLines,
      model-viewer[ar-status="object-placed"] #dimLines{
        display: none!important;
      }

      .ardisplay-nav-icon-button:last-child {
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

      /* Bottom Nav Bar */
      .bottom-container{
        position: absolute;
        width: 100%;
        bottom: 0px;
        height: auto;
      }

      .ardisplay-bottom-nav-bar {
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
        justify-content: center;
        padding: 10px;
        flex-direction: row-reverse;
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
      .slide.selected {
        border-color: #4285f4;
        box-shadow: 0 0 0 2px rgba(66,133,244,0.3);
      }

      .size-panel {
      /* Similar to 'flex flex-wrap gap-2' in Tailwind */
      display: flex;
      flex-wrap: wrap;
      gap: 8px; /* ~ Tailwind gap-2 */
      padding: 16px; /* for some breathing room */
      padding-top: 0;
      background-color: transparent;
      z-index: 100;
    }

    .size-buttons-wrapper {
      /* If you need an extra wrapper, adjust accordingly */
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
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
      .ardisplay-bottom-nav {
        height: fit-content; /* h-16 in Tailwind */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        position: relative;
        z-index: 100;
        margin-bottom: 16px;
      }
      .ardisplay-nav-icon-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 120px;
        padding: 8px 16px;
        color: black; /* text-gray-600 */
        background: #ccc;
        border-radius:40px;
        gap:10px;
        border: none;
        cursor: pointer;
        transition: color 0.2s ease;
      }
      .ardisplay-nav-icon-button svg {
        height: 24px; /* h-6 */
        width: 24px;
      }
      .ardisplay-nav-icon-button span {
        font-size: 12px; /* text-xs ~12px */
        font-weight: bold;
      }
      /* ------------------------------------------------------------------ */
      .sub-panel{
      position: absolute;
      bottom: 0; /* ensure it sits over the nav bar */
      height: auto;
      width: 100%;
      z-index: 10000;
      background: white;
      padding-top: 50px; // added padding for close button
    }
      .sub-panel .sub-panel-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
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

  async _loadTemplate(viewMode) {
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
      imageOverlay.src = await PosterWithCache(
        this.modelData.options[0].posterFileUrl,
        this.posters
      );
      imageOverlay.style.position = "absolute";
      imageOverlay.style.top = "0";
      imageOverlay.style.left = "0";
      imageOverlay.style.width = "100%";
      imageOverlay.style.height = "100%";
      imageOverlay.style.objectFit = "contain";
      imageOverlay.style.zIndex = "10";
      this.shadowRoot.querySelector("model-viewer").appendChild(imageOverlay);

      this.addEventListener("click", async () => {
        const imageElement = this.shadowRoot.querySelector("model-viewer img");
        if (imageElement) {
          this.shadowRoot
            .querySelector("model-viewer")
            .removeChild(imageElement);
        }
        await lazyLoadModelViewerIfNeeded();
        const style = document.createElement("style");
        style.textContent = `.container { direction: ltr; }`;
        this.modelViewer.shadowRoot.appendChild(style);
      });

      this.addEventListener("mouseenter", async () => {
        const imageElement = this.shadowRoot.querySelector("model-viewer img");
        if (imageElement) {
          this.shadowRoot
            .querySelector("model-viewer")
            .removeChild(imageElement);
        }
        await lazyLoadModelViewerIfNeeded();
        const style = document.createElement("style");
        style.textContent = `.container { direction: ltr; }`;
        this.modelViewer.shadowRoot.appendChild(style);
      });
    }
  }

  _updateSizePanel(variantIndex) {
    const sizePanel =
      this.modelData.mode !== "popup"
        ? this.shadowRoot.querySelector(".size-panel")
        : document.querySelector(".size-panel");
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
          attributes: {
            "data-size-key": sizeKey,
          },
          disabled: false,
        });

        button.innerHTML = `
          <span class="size-label">${sizeKey}</span>
          <span class="size-description">
            (${sizeValues.width} X ${sizeValues.height} X ${
          sizeValues.depth ? sizeValues.depth + "" : ""
        })
          </span>
        `;

        button.addEventListener("click", (event) => {
          if (!this.modelViewer) return;

          if (this.modelData.mode === "popup") {
            document
              .querySelectorAll(".size-button")
              .forEach((btn) => btn.classList.remove("selected"));
          } else {
            this.shadowRoot
              .querySelectorAll(".size-button")
              .forEach((btn) => btn.classList.remove("selected"));
          }
          event.currentTarget.classList.add("selected");
          const desiredSize = this.variantSizes[variantIndex][sizeKey];
          this.calculateAndApplyScale(desiredSize);
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
      // const arDisplayDetailsPanel =
      //   this.shadowRoot.querySelector(".details-panel");
      // if (arDisplayDetailsPanel) {
      //   arDisplayDetailsPanel.remove();
      // }
    }
  }

  _setupEventListeners() {
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
              this.modelData.mode !== "popup"
                ? this.shadowRoot.querySelectorAll(".size-button")
                : document.querySelectorAll(".size-button");
            sizeButtons.forEach((btn, index) => {
              if (index === 0) {
                btn.classList.add("selected");
              } else {
                btn.classList.remove("selected");
              }
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
      const progressModal = document.querySelector("#ardisplayProgressModal");
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
      const fillElem = document.querySelector("#ardisplayProgressBarFill");
      if (fillElem) {
        fillElem.style.width = `${progress}%`;
        fillElem.style.display = "block";
      }
    });

    this.modelViewer.addEventListener("load", () => {
      this.isModelLoaded = true;

      if (this.modelData.mode === "popup") {
        document.querySelectorAll(".dim").forEach((dim) => {
          dim.style.display = "block";
        });
      } else {
        this.shadowRoot.querySelectorAll(".dim").forEach((dim) => {
          dim.style.display = "block";
        });
      }

      // Show AR button if model is loaded
      const arButton = document.querySelector("#activateAR");
      if (arButton) {
        arButton.addEventListener("click", async (event) => {
          // Ensure we're handling the click event
          if (event instanceof MouseEvent) {
            try {
              await this.modelViewer.activateAR();
              // Hide progress modal after AR is activated
              const progressModal = document.querySelector(
                "#ardisplayProgressModal"
              );
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
    const qrModal = document.querySelector("#qrModal");
    const qrCodeContainer = document.querySelector("#qr-code");
    const qrCodeButton =
      this.modelData.mode !== "popup"
        ? this.shadowRoot.querySelector(".ardisplay-qr-code-button")
        : document.querySelector(".ardisplay-qr-code-button");
    const qrCloseButton = document.querySelector(".qr-close-button");

    // Initialize QR code manager if not already initialized
    if (!this.qrCodeManager) {
      this.qrCodeManager = new QrCodeManager(qrCodeContainer, this.modelData);
    }

    qrCodeButton.addEventListener("click", async () => {
      this.GIF_URLS.push(
        await PosterWithCache(
          this.modelData.options[0].posterFileUrl,
          this.posters
        )
      );
      if (this.modelData.mode === "none" && this._isMobileDevice()) {
        // Show progress modal immediately!
        const progressModal = document.querySelector("#ardisplayProgressModal");
        if (progressModal) {
          const fillElem = document.querySelector("#ardisplayProgressBarFill");
          if (fillElem) {
            fillElem.style.width = "0%"; // Reset progress bar
            fillElem.style.display = "block";
          }
          progressModal.style.display = "flex"; // Show the modal
          this.userClickedAR = true; // Keep track of user click
        }

        await lazyLoadModelViewerIfNeeded();
        const style = document.createElement("style");
        style.textContent = `.container { direction: ltr; }`;
        this.modelViewer.shadowRoot.appendChild(style); // Start loading model-viewer

        if (this.modelViewer) {
          this.modelViewer.addEventListener("progress", (event) => {
            const progress = Math.round(event.detail.totalProgress * 100);
            const fillElem = document.querySelector(
              "#ardisplayProgressBarFill"
            );
            if (fillElem) {
              fillElem.style.width = `${progress}%`;
              fillElem.style.display = `block`;
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
        const progressModal = document.querySelector("#ardisplayProgressModal");
        if (progressModal) {
          const fillElem = document.querySelector("#ardisplayProgressBarFill");
          if (fillElem) {
            fillElem.style.width = "0%";
            fillElem.style.display = "block";
          }
          progressModal.style.display = "flex";
          this.userClickedAR = true;
        }
        await lazyLoadModelViewerIfNeeded();
        const style = document.createElement("style");
        style.textContent = `.container { direction: ltr; }`;
        this.modelViewer.shadowRoot.appendChild(style);
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
    document
      .querySelectorAll(".ardisplay-step-indicator")
      .forEach((el, index) => {
        el.classList.toggle("active", index === 0);
      });

    // Reset content to first step
    const stepsContent = document.querySelector(".ardisplay-steps-content");
    if (stepsContent) {
      stepsContent.innerHTML = `
        <h3 class="ardisplay-instructions-title">Scanning</h3>
        <img src="${this.GIF_URLS[0]}" class="ardisplay-steps-gif" alt="Computer man">
        <div class="ardisplay-instructions-body">Stand several feet back. With camera facing ${this.modelData.placement}, make sweeping motion side to side, up and down.</div>
      `;
    }

    // Show next/skip buttons
    const nextBtn = document.querySelector(".ardisplay-next-button");
    const skipBtn = document.querySelector(".ardisplay-skip-button");
    if (nextBtn) nextBtn.parentElement.style.display = "flex";
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

    this.variants.forEach(async (variant, index) => {
      const slideButton = createDomElement("button", { classList: ["slide"] });

      if (index === 0) {
        slideButton.classList.add("selected");
        if (this.modelViewer && variant.url) {
          let VARIANT_URL = new URL(variant.url);
          this.modelViewer.src = VARIANT_URL.href;
          if (variant.posterFileUrl) {
            this.modelViewer.poster = await PosterWithCache(
              variant.posterFileUrl,
              this.posters
            );
          } else {
            this.modelViewer.removeAttribute("poster");
          }
        }
      }

      if (variant.posterFileUrl) {
        slideButton.style.backgroundImage = `url('${variant.posterFileUrl}')`;
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

        if (!this.modelData.mode === "popup") {
          this.shadowRoot
            .querySelectorAll(".slide")
            .forEach((s) => s.classList.remove("selected"));
          slideButton.classList.add("selected");
        } else {
          document
            .querySelectorAll(".slide")
            .forEach((s) => s.classList.remove("selected"));
          slideButton.classList.add("selected");
        }

        this.selectedIndex = index;
        this._updateNavButtonsVisibility();
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
    // Create the size sub-panel
    const sizePanel = createDomElement("div", {
      classList: ["sub-panel", "hidden"],
    });

    // Create a close button and add it to the sizePanel
    const sizePanelCloseBtn = createDomElement("button", {
      classList: ["sub-panel-close-button"],
      textContent: "×", // or use an icon if you prefer
    });
    // Style the close button (you can move these styles to your CSS)
    sizePanelCloseBtn.style.position = "absolute";
    sizePanelCloseBtn.style.top = "0px";
    sizePanelCloseBtn.style.right = "10px";
    sizePanelCloseBtn.style.background = "transparent";
    sizePanelCloseBtn.style.height = "50px";
    sizePanelCloseBtn.style.border = "none";
    sizePanelCloseBtn.style.fontSize = "32px";
    sizePanelCloseBtn.style.cursor = "pointer";
    // When clicked, hide the panel (and optionally remove the active state from the related nav button)
    sizePanelCloseBtn.addEventListener("click", () => {
      sizePanel.classList.add("hidden");
      // If you have a reference to the size nav button, you can remove its "active" class, e.g.:
      // sizeNavBtn.classList.remove("active");
    });
    // Append the close button to the panel
    sizePanel.appendChild(sizePanelCloseBtn);

    const sizePanelLabel = createDomElement("div", {
      classList: ["sub-panel-label"],
      textContent: "Size",
    });
    sizePanelLabel.style.fontSize = "16px";
    sizePanelLabel.style.position = "absolute";
    sizePanelLabel.style.top = "0";
    sizePanelLabel.style.left = "50%";
    sizePanelLabel.style.height = "50px";
    sizePanelLabel.style.display = "flex";
    sizePanelLabel.style.alignItems = "center";
    sizePanelLabel.style.justifyContent = "center";
    sizePanelLabel.style.transform = "translateX(-50%)";
    sizePanel.appendChild(sizePanelLabel);
    // Then add the size controls to the sizePanel
    const sizeControls = this._createSizeControls();
    if (sizeControls) sizePanel.appendChild(sizeControls);

    // Create the variant sub-panel
    const variantPanel = createDomElement("div", {
      classList: ["sub-panel", "hidden"],
    });

    // Create a close button for the variant panel
    const variantPanelCloseBtn = createDomElement("button", {
      classList: ["sub-panel-close-button"],
      textContent: "×", // or use an SVG icon here if preferred
    });
    // Apply similar styling for the variant close button
    variantPanelCloseBtn.style.position = "absolute";
    variantPanelCloseBtn.style.top = "0px";
    variantPanelCloseBtn.style.right = "10px";
    variantPanelCloseBtn.style.background = "transparent";
    variantPanelCloseBtn.style.border = "none";
    variantPanelCloseBtn.style.fontSize = "32px";
    variantPanelCloseBtn.style.height = "50px";
    variantPanelCloseBtn.style.cursor = "pointer";
    variantPanelCloseBtn.addEventListener("click", () => {
      variantPanel.classList.add("hidden");
      // Optionally remove the "active" class from the variant nav button:
      // variantNavBtn.classList.remove("active");
    });
    // Append the close button to the variant panel
    variantPanel.appendChild(variantPanelCloseBtn);

    const variantPanelLabel = createDomElement("div", {
      classList: ["sub-panel-label"],
      textContent: "Variant",
    });
    variantPanelLabel.style.fontSize = "16px";
    variantPanelLabel.style.position = "absolute";
    variantPanelLabel.style.top = "0";
    variantPanelLabel.style.left = "50%";
    variantPanelLabel.style.height = "50px";
    variantPanelLabel.style.display = "flex";
    variantPanelLabel.style.alignItems = "center";
    variantPanelLabel.style.justifyContent = "center";
    variantPanelLabel.style.transform = "translateX(-50%)";
    variantPanel.appendChild(variantPanelLabel);

    // Then add the variant controls (color/variant selection)
    const variantControls = this._setupVariantsColors();
    if (variantControls) variantPanel.appendChild(variantControls);

    // Create the bottom nav container
    const navBar = createDomElement("div", {
      classList: ["ardisplay-bottom-nav"],
    });

    // Toggle function for showing/hiding a given panel
    const togglePanel = (panel) => {
      const isHidden = panel.classList.contains("hidden");
      // Hide both panels
      sizePanel.classList.add("hidden");
      variantPanel.classList.add("hidden");
      // Show only if it was hidden when the button was pressed
      if (isHidden) panel.classList.remove("hidden");
    };

    // Create the Size nav button (only show if there are multiple size options)
    const sizeBtn = createDomElement("button", {
      classList: ["ardisplay-nav-icon-button", "ardisplay-size-btn"],
    });
    // For example, add an icon (using an SVG or text) and label:
    sizeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="height:28px;width:28px;">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6V4H20V20H12V18H8V16H4V8H8V6H12ZM14 6H18V18H14V6ZM12 8H10V16H12V8ZM8 10V14H6V10H8Z" fill="#000000"/>
      </svg>
      <span>Size</span>
    `;
    // Add a click listener to toggle the size panel
    sizeBtn.addEventListener("click", () => {
      togglePanel(sizePanel);
      sizeBtn.classList.toggle(
        "active",
        !sizePanel.classList.contains("hidden")
      );
      // Also remove the variant button's active state
      variantBtn.classList.remove("active");
    });

    // Create the Variant nav button (only if there are multiple variants)
    const variantBtn = createDomElement("button", {
      classList: ["ardisplay-nav-icon-button", "ardisplay-variant-btn"],
    });
    variantBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" style="height:24px;width:24px;">
        <path d="M1 9.431l14.847 8.085c0.149 0.081 0.313 0.122 0.479 0.122 0.163 0 0.326-0.04 0.474-0.12l15.003-8.085c0.327-0.176 0.53-0.52 0.525-0.892s-0.216-0.711-0.547-0.88l-14.848-7.54c-0.283-0.143-0.617-0.144-0.902-0.002l-15.002 7.54c-0.332 0.167-0.545 0.505-0.551 0.877s0.196 0.717 0.521 0.895zM16.161 2.134l12.692 6.446-12.843 6.921-12.693-6.912zM31.292 15.01l-2.968-1.507-2.142 1.155 2.5 1.27-12.842 6.921-12.694-6.912 2.666-1.34-2.136-1.164-3.135 1.575c-0.332 0.167-0.545 0.505-0.551 0.877s0.196 0.717 0.521 0.895l14.847 8.085c0.149 0.081 0.313 0.122 0.479 0.122 0.163 0 0.326-0.04 0.474-0.12l15.003-8.085c0.327-0.176 0.53-0.52 0.525-0.892s-0.215-0.711-0.546-0.88zM31.292 22.01l-2.811-1.382-2.142 1.155 2.344 1.145-12.843 6.921-12.694-6.912 2.478-1.121-2.136-1.164-2.947 1.357c-0.332 0.167-0.545 0.505-0.551 0.877s0.196 0.717 0.521 0.895l14.847 8.085c0.149 0.081 0.313 0.122 0.479 0.122 0.163 0 0.326-0.04 0.475-0.12l15.003-8.085c0.327-0.176 0.53-0.52 0.525-0.892-0.005-0.373-0.215-0.712-0.546-0.88z"/>
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

    if (this.variants.length === 1 && variantBtn) {
      variantBtn.style.display = "none";
    }

    if (this.variants.length > 0) {
      const defaultVariantSizes = this.variants[0].sizes;
      if (defaultVariantSizes && defaultVariantSizes.length === 1 && sizeBtn) {
        sizeBtn.style.display = "none";
      }
    }

    // You can add a Share button or any additional buttons, if needed.
    const shareBtn = createDomElement("button", {
      classList: ["ardisplay-nav-icon-button"],
    });
    shareBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
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
      } catch (err) {
        console.warn("Share failed:", err);
      }
    });

    // Append all nav buttons to the nav bar
    navBar.appendChild(sizeBtn);
    navBar.appendChild(variantBtn);
    navBar.appendChild(shareBtn);

    // Also close any open panels when clicking outside (optional)
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

    // Finally, append the navBar and the sub-panels to the container.
    container.appendChild(navBar);
    container.appendChild(sizePanel);
    container.appendChild(variantPanel);
  }

  _updateNavButtonsVisibility() {
    const sizeBtn =
      this.modelData.mode !== "popup"
        ? this.shadowRoot.querySelector(
            ".ardisplay-bottom-nav .ardisplay-size-btn"
          )
        : document.querySelector(".ardisplay-bottom-nav .ardisplay-size-btn");
    const variantBtn =
      this.modelData.mode !== "popup"
        ? this.shadowRoot.querySelector(
            ".ardisplay-bottom-nav .ardisplay-variant-btn"
          )
        : document.querySelector(
            ".ardisplay-bottom-nav .ardisplay-variant-btn"
          );

    // Hide the variant button if there is only one variant
    if (this.variants.length === 1 && variantBtn) {
      variantBtn.style.display = "none";
    } else if (variantBtn) {
      variantBtn.style.display = "flex";
    }

    // Get the currently selected variant (default to index 0 if not set)
    const selectedIndex =
      typeof this.selectedIndex === "number" ? this.selectedIndex : 0;
    console.log(selectedIndex);
    console.log(sizeBtn);
    const currentVariantSizes = this.variants[selectedIndex]?.sizes;
    if (currentVariantSizes && currentVariantSizes.length === 1 && sizeBtn) {
      sizeBtn.style.display = "none";
    } else if (sizeBtn) {
      sizeBtn.style.display = "flex";
    }
  }
  // ------------------------------------------------------------------

  async _setupModalEventListeners() {
    const view3DButton = this.shadowRoot.querySelector(
      ".ardisplay-view-3d-button"
    );
    const previewImage = this.shadowRoot.querySelector(
      ".ardisplay-preview-image"
    );
    const modelViewerContainer = document.querySelector(
      ".model-viewer-container"
    );
    const closeButton = document.querySelector(".ardisplay-close-button");
    const overlay = document.querySelector(".ardisplay-model-viewer-overlay");

    if (view3DButton && modelViewerContainer) {
      view3DButton.addEventListener("click", async () => {
        await lazyLoadModelViewerIfNeeded();
        const style = document.createElement("style");
        style.textContent = `.container { direction: ltr; }`;
        this.modelViewer.shadowRoot.appendChild(style);
        modelViewerContainer.style.display = "flex";
        overlay.style.display = "block";
      });
    }

    if (closeButton && overlay) {
      closeButton.addEventListener("click", () => {
        modelViewerContainer.style.display = "none";
        overlay.style.display = "none";
      });

      overlay.addEventListener("click", () => {
        modelViewerContainer.style.display = "none";
        overlay.style.display = "none";
      });
    }
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
    if (this.modelData.mode === "popup") {
      document.querySelectorAll(".dimensionLine").forEach((el) => {
        el.style.display = "block";
      });
    } else {
      this.shadowRoot.querySelectorAll(".dimensionLine").forEach((el) => {
        el.style.display = "block";
      });
    }
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
  const xpathQuery = "//*[normalize-space(text())='{%AR-DISPLAY-PLAYER%}']";
  const xpathResult = document.evaluate(
    xpathQuery,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  const placeholder = xpathResult.singleNodeValue;
  const newEl = document.createElement("ardisplay-viewer");
  placeholder.replaceWith(newEl);
}
