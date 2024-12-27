
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
}

customElements.define('ardisplay-viewer', ARDisplayViewer);