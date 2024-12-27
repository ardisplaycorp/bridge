
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
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div id="ar-display-viewer">Hello World</div>
        `;
    }

    connectedCallback() {
        const arDisplayViewer = document.createElement('ar-display-viewer');
        this.shadowRoot.appendChild(arDisplayViewer);
    }
}

customElements.define('ardisplay-viewer', ARDisplayViewer);