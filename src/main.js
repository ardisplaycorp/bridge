import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ModelViewerElement } from '@google/model-viewer';
import { QRCode } from 'qr-code-styling';
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

class ARDisplayViewer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const attributes = this._getAttributes();
        this._createStyles();
        this._buildComponentStructure();
        this._moveSlottedContent();
        this._setupEventListeners();
    }

    _getAttributes() {
        const attributes = {};
        return attributes;
    }

    _createStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            /* Add your styles here */
        `;
        this.shadowRoot.appendChild(styles);
    }

    _buildComponentStructure() {
        const template = `
            <!-- Add your template here -->
        `
        this.shadowRoot.innerHTML += template;
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