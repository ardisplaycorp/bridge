import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ModelViewerElement } from '@google/model-viewer';
import QRCodeStyling, { QRCode } from 'qr-code-styling';
import normalTemplate from './templates/normal.js';
import modalTemplate from './templates/modal.js';
import './style.css';

// headers: {
//     "X-Secret-Key": "2jiXHGqKE5DH7cwDdyJZCmSndKhjvTto",
//     "X-Requested-With": "XMLHttpRequest",
//   }

// Utility function for Base64 decoding
function base64Decode(base64String) {
    // Use atob if available
    if (typeof atob === 'function') {
      return atob(base64String);
    }
  
    // Fallback decoding
    const binaryString = Buffer.from(base64String, 'base64').toString('binary');
    return binaryString;
}

class ARDisplayViewer extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.currentSize = 'm';

        this.calculatedScale = null;

        this.modelData = null;

        this.originalSize = null;

        // Initialize custom 'scale' event
        this.scaleEvent = new Event('scale', { bubbles: true, composed: true });
    }

    async connectedCallback() {
        const attributes = this._getAttributes();
        await this._getModelData().then(() => {
            this._createStyles();
            this._loadTemplate(attributes.viewMode);
            this._moveSlottedContent();
            this._setupEventListeners();
            this._setupVariantsColors(); // <--- Add this line
        })
    }

    async _getModelData() {
        const url = this.getAttribute('href');
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            this.modelData = data;
            this.modelData.model = '/art.webp (2).glb';
            this._setupVariantsSizes();
        } catch (error) {
            console.error(error.message);
        } 
    }

    _setupVariantsSizes() {
        console.log('hi');
        // Find the part of the options array that has type = "size"
        const sizeOption = this.modelData?.options?.find(opt => opt.type === 'size');
        console.log(this.modelData);
        console.log(sizeOption);
        if (!sizeOption) return;

        // Store the sizes on the instance for easy access
        // (Map them by label or any key you like)
        this.sizes = {};
        sizeOption.values.forEach(obj => {
            // Example: { width: "50cm", height: "30cm", label: "small" }
            // Use the label as a key, or transform it however you want
            const key = obj.label.toLowerCase();
            this.sizes[key] = {
            width: obj.width,
            height: obj.height,
            depth: obj.depth || '' // if your JSON might not have depth
            };
        });
    }

    _getAttributes() {
        const attributes = {
            modelSrc: this.getAttribute('src') || '',
            modelPoster: this.getAttribute('poster') || '',
            ar: this.hasAttribute('ar'),
            shadowIntensity: this.getAttribute('shadow-intensity') || '0',
            cameraControls: this.hasAttribute('camera-controls'),
            TouchAction: this.getAttribute('touch-action') || 'none',
            alt: this.getAttribute('alt') || '',
            viewMode: this.getAttribute('view-mode') || 'normal',
            arPlacement: this.getAttribute('ar-placement') || 'floor',
        };
        return attributes;
    }

    _createStyles() {
        const styles = document.createElement('style');
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
                overflow:hidden;
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
        if (viewMode === 'modal') {
            template = modalTemplate;
        } else {
             template = normalTemplate;
        }
        const templateString = template(this.modelData.model, this.getAttribute('alt'), this.hasAttribute('ar'), this.hasAttribute('camera-controls'), this.getAttribute('touch-action') || 'none', this.getAttribute('shadow-intensity') || '0', this.getAttribute('poster') || '',this.getAttribute('ar-placement') || 'floor', this.modelData);
        this.shadowRoot.innerHTML += templateString;
    }

    _moveSlottedContent() {
        const customPanel = this.shadowRoot?.querySelector('.ar-display-custom-panel');
        const slottedContent = this.querySelector('[slot="custom-panel"]');
        if (customPanel && slottedContent) {
            if(slottedContent) {
                customPanel.appendChild(slottedContent);
            }
        } else {
            const arDisplayDetailsPanel = this.shadowRoot?.querySelector('.details-panel');
            if(arDisplayDetailsPanel) {
                arDisplayDetailsPanel.remove();
            }
        }
    }

    _setupEventListeners() {
        this.shadowRoot.querySelector('model-viewer').addEventListener('model-visibility', () => {
            const modelViewer = this.shadowRoot.querySelector('model-viewer');
            const sizes = modelViewer.getDimensions();
            this.originalSize = new THREE.Vector3(sizes.x, sizes.y, sizes.z);
            this.calculateAndApplyScale();

            // Enable size buttons
            const sizeButtons = sizeControls.querySelectorAll('.size-button');
            sizeButtons.forEach(button => {
                button.disabled = false;
                button.style.cursor = 'pointer';
            });

            modelViewer.shadowRoot.querySelector('.slot.ar-button').style.display = 'none';
        });

        // Add event listeners here
        if (this.getAttribute('view-mode') === 'modal') {
            this._setupModalEventListeners();
        } else {
            this._setupNormalEventListeners();
        }

        const sizeControls = this._createSizeControls(this.shadowRoot.querySelector('model-viewer'));

        // Event listener for size buttons
        sizeControls.addEventListener('click', (event) => this._handleSizeChange(event));
        // Event listener for the custom 'scale' event
        document.addEventListener('scale', () => this._setupDimensions(this.shadowRoot.querySelector('model-viewer')));

        const qrCodeButton = this.shadowRoot.querySelector('.qr-code-button');
        const qrModal = this.shadowRoot.getElementById('qrModal');
        const qrCloseButton = this.shadowRoot.querySelector('.qr-close-button');
        const qrCodeContainer = this.shadowRoot.getElementById('qr-code');


        let qrCode = null;
        // Function to initialize and update QR code
        const updateQrCode = (url) => {
        if (qrCodeContainer.firstChild) {
            qrCodeContainer.removeChild(qrCodeContainer.firstChild);
        }
            qrCode = new QRCodeStyling({
            width: 240,
            height: 240,
            data: url,
            dotsOptions: {
                color: "#555555",
                type: "rounded"
            },
            cornersSquareOptions: {
                type: 'extra-rounded',
                },
                cornersDotOptions: {
                    type: 'dot',
                },
            });
            qrCode.append(qrCodeContainer);
        };

        const modelViewer = this.shadowRoot.querySelector('model-viewer');
    
        qrCodeButton.addEventListener('click', () => {
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile && modelViewer.canActivateAR) {
                try {
                    modelViewer.activateAR();
                } catch (err) {
                    console.warn('Could not activate AR:', err);
                    // Fallback to QR if it fails
                    const currentUrl = window.location.href;
                    updateQrCode(currentUrl);
                    qrModal.style.display = 'flex';
                }
            } else {
                const currentUrl = window.location.href;
                updateQrCode(currentUrl);
                qrModal.style.display = 'flex';
            }
        });

        qrCloseButton.addEventListener('click', () => {
            qrModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === qrModal) {
                qrModal.style.display = 'none';
            }
        });
    }

    _setupVariantsColors() {
        // 1) Find the part of the options array that has type="color"  
        const colorOption = this.modelData?.options?.find(opt => opt.type === 'color');
        if (!colorOption) return;
      
        // 2) Build the container for the slider
        const slider = document.createElement('div');
        slider.classList.add('slider');
      
        const slidesWrapper = document.createElement('div');
        slidesWrapper.classList.add('slides');
      
        // 3) For each color variant, create a "slide" button
        colorOption.values.forEach((colorObj, index) => {
          // colorObj might look like:
          // {
          //   color: "#FF0000",
          //   label: "Red",
          //   model: "chairRed.glb",
          //   poster: "chairRed.webp"
          // }
      
          const slideButton = document.createElement('button');
          slideButton.classList.add('slide');
          
          // Show a selected outline on the first slide by default:
          if (index === 0) {
            slideButton.classList.add('selected');
          }
      
          // If you have a poster image or color swatch:
          if (colorObj.poster) {
            slideButton.style.backgroundImage = `url('${colorObj.poster}')`;
          } else {
            // Fallback: just show a color background
            slideButton.style.backgroundColor = colorObj.color;
          }
      
          // 4) On click, switch the model’s src/poster (like your switchSrc function)
          slideButton.onclick = () => {
            // const modelViewer = this.shadowRoot.querySelector('model-viewer');
            // if (colorObj.model) {
            //   modelViewer.src = colorObj.model;
            // }
            // if (colorObj.poster) {
            //   modelViewer.poster = colorObj.poster;
            // }
            // Update "selected" visual
            const allSlides = slider.querySelectorAll('.slide');
            allSlides.forEach(s => s.classList.remove('selected'));
            slideButton.classList.add('selected');
          };
      
          // Append slide to .slides container
          slidesWrapper.appendChild(slideButton);
        });
      
        // 5) Append the .slides container into .slider, then into model-viewer
        slider.appendChild(slidesWrapper);
        const modelViewerElem = this.shadowRoot.querySelector('model-viewer');
        modelViewerElem.appendChild(slider);
      
        // 6) Add carousel styling
        const style = document.createElement('style');
        style.textContent = `
          .slider {
            width: 100%;
            text-align: center;
            overflow: hidden;
            position: absolute;
            bottom: 16px;
            left: 0;
          }
          .slides {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            padding: 0 10px;
          }
          .slide {
            scroll-snap-align: start;
            flex-shrink: 0;
            width: 100px;
            height: 100px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            background-color: #fff;
            margin-right: 10px;
            border-radius: 10px;
            border: none;
            display: flex;
            cursor: pointer;
          }
          .slide.selected {
            outline: 2px solid #4285f4;
          }
        `;
        modelViewerElem.appendChild(style);
      }

    _setupModalEventListeners() {
        // Add event listeners here
        const view3DButton = this.shadowRoot.querySelector('.view-3d-button');
        const previewImage = this.shadowRoot.querySelector('.preview-image');
        const modelViewerContainer = this.shadowRoot.querySelector('.model-viewer-container');
        const closeButton = this.shadowRoot.querySelector('.close-button');
        const overlay = this.shadowRoot.querySelector('.overlay');
        const modelViewer = this.shadowRoot.querySelector('model-viewer');

        view3DButton.addEventListener('click', () => {
            previewImage.style.display = 'none';
            view3DButton.style.display = 'none';
            modelViewerContainer.style.display = 'flex';
            overlay.style.display = 'block';
            this._setupDimensions(modelViewer);
        });

        closeButton.addEventListener('click', () => {
            previewImage.style.display = 'block';
            view3DButton.style.display = 'flex';
            modelViewerContainer.style.display = 'none';
            overlay.style.display = 'none';
        });
    }

    _setupNormalEventListeners() {
        // Add event listeners here
        this.shadowRoot.querySelector('model-viewer').addEventListener('model-visibility', () => {
            this._setupDimensions(this.shadowRoot.querySelector('model-viewer'));
        });
    }

    _updateHotspots(modelViewer) {
        modelViewer.addEventListener('scene-graph-ready', () => {
            this._setupDimensions(modelViewer);
        });
    }

    _setupDimensions(modelViewer) {
        if (!this.hasAttribute('show-hotspots')) {
            return;
        }
    
        const dimElements = [
            ...modelViewer.querySelectorAll('[data-hotspot]'),
            modelViewer.querySelector('#dimLines')
        ].filter(Boolean);
    
        const setVisibility = (visible) => {
            dimElements.forEach((element) => {
                element.classList.toggle('hide', !visible);
            });
        };
    
        // Toggle visibility of dimension elements during AR sessions
        modelViewer.addEventListener('ar-status', (event) => {
            const isSessionStarted = event.detail.status === 'session-started';
            setVisibility(!isSessionStarted);
        });
    
        const drawLine = (svgLine, startHotspot, endHotspot, dimensionHotspot) => {
            if (!svgLine || !startHotspot || !endHotspot) return;
    
            svgLine.setAttribute('x1', startHotspot.canvasPosition.x);
            svgLine.setAttribute('y1', startHotspot.canvasPosition.y);
            svgLine.setAttribute('x2', endHotspot.canvasPosition.x);
            svgLine.setAttribute('y2', endHotspot.canvasPosition.y);
    
            if (dimensionHotspot) {
                svgLine.classList.toggle('hide', !dimensionHotspot.facingCamera);
            }
        };
    
        const dimLines = modelViewer.querySelectorAll('line');
    
        const renderSVG = () => {
            if (dimLines.length === 0) return;
    
            const lineMappings = [
                {
                    line: dimLines[0],
                    start: 'hotspot-dot+X-Y+Z',
                    end: 'hotspot-dot+X-Y-Z',
                    dimension: 'hotspot-dim+X-Y'
                },
                {
                    line: dimLines[1],
                    start: 'hotspot-dot+X-Y-Z',
                    end: 'hotspot-dot+X+Y-Z',
                    dimension: 'hotspot-dim+X-Z'
                },
                {
                    line: dimLines[2],
                    start: 'hotspot-dot+X+Y-Z',
                    end: 'hotspot-dot-X+Y-Z'
                    // Line always visible; no dimension hotspot needed
                },
                {
                    line: dimLines[3],
                    start: 'hotspot-dot-X+Y-Z',
                    end: 'hotspot-dot-X-Y-Z',
                    dimension: 'hotspot-dim-X-Z'
                },
                {
                    line: dimLines[4],
                    start: 'hotspot-dot-X-Y-Z',
                    end: 'hotspot-dot-X-Y+Z',
                    dimension: 'hotspot-dim-X-Y'
                }
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
            const center = modelViewer.getBoundingBoxCenter();
            const size = modelViewer.getDimensions();
            const halfSize = {
                x: size.x / 2,
                y: size.y / 2,
                z: size.z / 2
            };
    
            const hotspotsData = [
                {
                    name: 'hotspot-dot+X-Y+Z',
                    position: [
                        center.x + halfSize.x,
                        center.y - halfSize.y,
                        center.z + halfSize.z
                    ]
                },
                {
                    name: 'hotspot-dim+X-Y',
                    position: [
                        center.x + halfSize.x * 1.2,
                        center.y - halfSize.y * 1.1,
                        center.z
                    ],
                    label: `${(size.z * 100).toFixed(0)} cm`,
                    labelSelector: 'button[slot="hotspot-dim+X-Y"]'
                },
                {
                    name: 'hotspot-dot+X-Y-Z',
                    position: [
                        center.x + halfSize.x,
                        center.y - halfSize.y,
                        center.z - halfSize.z
                    ]
                },
                {
                    name: 'hotspot-dim+X-Z',
                    position: [
                        center.x + halfSize.x * 1.2,
                        center.y,
                        center.z - halfSize.z * 1.2
                    ],
                    label: `${(size.y * 100).toFixed(0)} cm`,
                    labelSelector: 'button[slot="hotspot-dim+X-Z"]'
                },
                {
                    name: 'hotspot-dot+X+Y-Z',
                    position: [
                        center.x + halfSize.x,
                        center.y + halfSize.y,
                        center.z - halfSize.z
                    ]
                },
                {
                    name: 'hotspot-dim+Y-Z',
                    position: [
                        center.x,
                        center.y + halfSize.y * 1.1,
                        center.z - halfSize.z * 1.1
                    ],
                    label: `${(size.x * 100).toFixed(0)} cm`,
                    labelSelector: 'button[slot="hotspot-dim+Y-Z"]'
                },
                {
                    name: 'hotspot-dot-X+Y-Z',
                    position: [
                        center.x - halfSize.x,
                        center.y + halfSize.y,
                        center.z - halfSize.z
                    ]
                },
                {
                    name: 'hotspot-dim-X-Z',
                    position: [
                        center.x - halfSize.x * 1.2,
                        center.y,
                        center.z - halfSize.z * 1.2
                    ],
                    label: `${(size.y * 100).toFixed(0)} cm`,
                    labelSelector: 'button[slot="hotspot-dim-X-Z"]'
                },
                {
                    name: 'hotspot-dot-X-Y-Z',
                    position: [
                        center.x - halfSize.x,
                        center.y - halfSize.y,
                        center.z - halfSize.z
                    ]
                },
                {
                    name: 'hotspot-dim-X-Y',
                    position: [
                        center.x - halfSize.x * 1.2,
                        center.y - halfSize.y * 1.1,
                        center.z
                    ],
                    label: `${(size.z * 100).toFixed(0)} cm`,
                    labelSelector: 'button[slot="hotspot-dim-X-Y"]'
                },
                {
                    name: 'hotspot-dot-X-Y+Z',
                    position: [
                        center.x - halfSize.x,
                        center.y - halfSize.y,
                        center.z + halfSize.z
                    ]
                }
            ];
    
            hotspotsData.forEach(({ name, position, label, labelSelector }) => {
                modelViewer.updateHotspot({
                    name,
                    position: position.join(' ')
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

        // Update dimensions when the camera changes
        modelViewer.addEventListener('camera-change', () => {
            renderSVG();
            updateDimensionHotspots();
        });

        // Update dimensions when the scene graph is ready
        modelViewer.addEventListener('scene-graph-ready', () => {
            renderSVG();
            updateDimensionHotspots();
        });
    }

    _createSizeControls(modelViewer) {
        // Create a container for size controls
        const sizePanel = document.createElement('div');
        sizePanel.classList.add('size-panel');
      
        // Create an inner container for the buttons
        const sizeButtonsWrapper = document.createElement('div');
        sizeButtonsWrapper.classList.add('size-buttons-wrapper');
      
        // If you have sizes loaded, create a button per size
        if (this.sizes) {
          Object.entries(this.sizes).forEach(([labelKey, sizeObj]) => {
            // labelKey could be "small", "medium", "large"
            const button = document.createElement('button');
            button.classList.add('size-button');
            button.textContent = labelKey;
            button.setAttribute('data-size-key', labelKey);
            button.disabled = true; // initially disabled until model-visibility event
      
            sizeButtonsWrapper.appendChild(button);
          });
        }
      
        sizePanel.appendChild(sizeButtonsWrapper);
      
        // Inject into the <model-viewer>'s shadow root
        modelViewer.appendChild(sizePanel);
      
        // Add styling
        const style = document.createElement('style');
        style.textContent = `
          .size-panel {
            position: absolute;
            top: 16px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.8);
            padding: 8px 12px;
            border-radius: 8px;
            gap: 10px;
            z-index: 10;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }
      
          .size-label {
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }
      
          .size-buttons-wrapper {
            display: flex;
            gap: 8px;
          }
      
          .size-button {
            min-width: 60px;
            padding: 6px 10px;
            background-color: #f0f0f0;
            color: #333;
            border: 1px solid #ccc;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s ease, border-color 0.2s ease;
          }
      
          .size-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
      
          .size-button:hover:not(:disabled) {
            background-color: #e5e5e5;
          }
      
          .size-button.selected {
            border-color: #4285f4;
            background-color: #e6f0ff;
          }
        `;
        modelViewer.appendChild(style);
      
        return sizePanel;
    }

    _handleSizeChange(event) {
        if (event.target.classList.contains('size-button')) {
            const sizeKey = event.target.getAttribute('data-size-key');
            if (this.sizes && this.sizes[sizeKey]) {
            // Remove "selected" from all size buttons
            const allSizeBtns = this.shadowRoot
                .querySelector('model-viewer')
                ?.shadowRoot.querySelectorAll('.size-button');
            allSizeBtns?.forEach(btn => btn.classList.remove('selected'));
        
            // Add "selected" to the clicked button
            event.target.classList.add('selected');
        
            // Apply the scale
            const desiredSize = this.sizes[sizeKey];
            this.calculateAndApplyScale(desiredSize);
            }
        }
    }

    applyScale() {
        if (this.calculatedScale && this.shadowRoot) {
            const modelViewer = this.shadowRoot.querySelector('model-viewer');
            if (modelViewer) {
                modelViewer.scale = `${this.calculatedScale.scaleX} ${this.calculatedScale.scaleY} ${this.calculatedScale.scaleZ}`;

                if (typeof modelViewer.updateFraming === 'function') {
                    requestAnimationFrame(() => {
                        modelViewer.updateFraming();
                        document.dispatchEvent(this.scaleEvent);
                    });
                }
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
        return parseFloat(cmString.replace('cm', '')) / 100;
    }

    calculateModelScale(desiredSize) {
        const size = this.originalSize

        const originalWidth = size.x;
        const originalHeight = size.y;
        const originalDepth = size.z;

        // Convert cm strings to meters
        const desiredWidth = this.cmToMeters(desiredSize.width);
        const desiredHeight = this.cmToMeters(desiredSize.height);
        let desiredDepth;
        if (!desiredSize.depth) {
            desiredDepth = 0.05;
        }
        else{
            desiredDepth = this.cmToMeters(desiredSize.depth);
        }
        const scaleX = desiredWidth / originalWidth;
        const scaleY = desiredHeight / originalHeight;
        const scaleZ = desiredDepth / originalDepth;

        return { scaleX, scaleY, scaleZ };
    }
}

customElements.define('ardisplay-viewer', ARDisplayViewer);