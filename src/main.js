import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ModelViewerElement } from '@google/model-viewer';
import { QRCode } from 'qr-code-styling';
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
        const templateString = template(this.getAttribute('src'), this.getAttribute('alt'), this.hasAttribute('ar'), this.hasAttribute('camera-controls'), this.getAttribute('touch-action') || 'none', this.getAttribute('shadow-intensity') || '0', this.getAttribute('poster') || '');
        this.shadowRoot.innerHTML += templateString;
    }

    _moveSlottedContent() {
        const customPanel = this.shadow?.querySelector('ar-display-custom-panel');
        if (customPanel) {
            while (this.firstChild) {
                customPanel.appendChild(this.firstChild);
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
    }

    _setupModalEventListeners() {
        // Add event listeners here
        const view3DButton = this.shadowRoot.querySelector('.view-3d-button');
        const previewImage = this.shadowRoot.querySelector('.preview-image');
        const modelViewerContainer = this.shadowRoot.querySelector('.model-viewer-container');
        const closeButton = this.shadowRoot.querySelector('.close-button');
        const overlay = this.shadowRoot.querySelector('.overlay');

        view3DButton.addEventListener('click', () => {
            previewImage.style.display = 'none';
            view3DButton.style.display = 'none';
            modelViewerContainer.style.display = 'flex';
            overlay.style.display = 'block';
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