import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ModelViewerElement } from '@google/model-viewer';
import QRCodeStyling, { QRCode } from 'qr-code-styling';
import normalTemplate from './templates/normal.js';
import modalTemplate from './templates/modal.js';
import './style.css';

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

        this.sizes = {
            s: { width: '47.5cm', height: '50cm', depth: '69.5cm' },
            m: { width: '94cm', height: '100cm', depth: '139cm' },
            l: { width: '141cm', height: '150cm', depth: '208.5cm' }
        };

        // Initialize custom 'scale' event
        this.scaleEvent = new Event('scale', { bubbles: true, composed: true });
    }

    connectedCallback() {
        const attributes = this._getAttributes();
        this._createStyles();
        this._loadTemplate(attributes.viewMode);
        this._moveSlottedContent();
        this._setupEventListeners();
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
                right: -30px;
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
        const templateString = template(this.getAttribute('src'), this.getAttribute('alt'), this.hasAttribute('ar'), this.hasAttribute('camera-controls'), this.getAttribute('touch-action') || 'none', this.getAttribute('shadow-intensity') || '0', this.getAttribute('poster') || '',this.getAttribute('ar-placement') || 'floor');
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
        // Add event listeners here
        if (this.getAttribute('view-mode') === 'modal') {
            this._setupModalEventListeners();
        } else {
            this._setupNormalEventListeners();
        }

        const sizeControls = this._createSizeControls(this.shadowRoot.querySelector('model-viewer'));

        // Event listener for size buttons
        sizeControls.addEventListener('click', (event) => this._handleSizeChange(event, this.getAttribute('src')));
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
    
        qrCodeButton.addEventListener('click', () => {
            const currentUrl = window.location.href;
            updateQrCode(currentUrl);
            qrModal.style.display = 'flex';
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
        // Add size buttons
        const sizeControls = document.createElement('div');
        sizeControls.innerHTML = `
            <button class="size-button" data-size="s">S</button>
            <button class="size-button" data-size="m">M</button>
            <button class="size-button" data-size="l">L</button>
        `;
        sizeControls.classList.add('size-controls');
        modelViewer.shadowRoot.appendChild(sizeControls);

        const modelViewerStyles = document.createElement('style');
        modelViewerStyles.textContent = `  
          /* Style for size controls */
          .size-controls {
            position: absolute;
            bottom: 10px;
            left: 10px;
            display: flex;
            gap: 10px;
          }

          .size-button {
            padding: 5px 10px;
            background-color: rgba(0, 0, 0, 0.75);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `;
        modelViewer.shadowRoot.appendChild(modelViewerStyles);

        return sizeControls;
    }

    _handleSizeChange(event, modelSrc) {
        if (event.target.classList.contains('size-button')) {
          this.currentSize = event.target.getAttribute('data-size');
          this.calculateAndApplyScale(modelSrc);
        }
    }

    _setupVariantsSizes() {

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

    async calculateAndApplyScale(modelURL) {
        const desiredSize = this.sizes[this.currentSize];
        if (!desiredSize) return;
        try {
            const scale = await this.calculateModelScale(modelURL, desiredSize);
            this.calculatedScale = scale;
            this.applyScale();
        } catch (error) {
            console.error("Error applying scale for size", this.currentSize, error);
        }
    }

    cmToMeters(cmString) {
        return parseFloat(cmString.replace('cm', '')) / 100;
    }

    calculateModelScale(url, desiredSize) {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(
                url,
                (gltf) => {
                    const scene = gltf.scene;
                    const box = new THREE.Box3().setFromObject(scene);
                    const size = new THREE.Vector3();
                    box.getSize(size);

                    const originalWidth = size.x;
                    const originalHeight = size.y;
                    const originalDepth = size.z;

                    // Convert cm strings to meters
                    const desiredWidth = this.cmToMeters(desiredSize.width);
                    const desiredHeight = this.cmToMeters(desiredSize.height);
                    const desiredDepth = this.cmToMeters(desiredSize.depth);

                    const scaleX = desiredWidth / originalWidth;
                    const scaleY = desiredHeight / originalHeight;
                    const scaleZ = desiredDepth / originalDepth;

                    resolve({ scaleX, scaleY, scaleZ });
                },
                undefined,
                (error) => {
                    console.error('An error occurred while loading the model for scaling:', error);
                    reject(error);
                }
            );
        });
    }
}

customElements.define('ardisplay-viewer', ARDisplayViewer);