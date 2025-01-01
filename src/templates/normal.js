import hotspotsTemplate from './hotspots.js';

const modalStyles = {
    '.normal-view-container': {
        width: '100%',
        height: '100%',
        display: 'block',
        fontFamily: 'sans-serif',
        position: 'relative',
    },
    '.qr-code-button': {
        position: 'absolute',
        bottom: '130px',
        right: '50%',
        transform: 'translateX(50%)',
        background: 'white',
        border: '1px solid black',
        cursor: 'pointer',
        padding: '10px',
        zIndex: '1000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
};


function styleObjectToString(styles) {
    let cssString = "";

    for (const selector in styles) {
        if (styles.hasOwnProperty(selector)) {
            const rules = styles[selector];

            if (typeof rules === 'object' && !isMediaQuery(selector)) {  // Regular selector
                cssString += `${selector} {\n`;
                for (const property in rules) {
                    if (rules.hasOwnProperty(property)) {
                        const value = rules[property];
                        cssString += `  ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};\n`;
                    }
                }
                cssString += '}\n';
             } else if (typeof rules === 'string') {
                 cssString += `${selector} {\n  ${rules} \n}\n`;
            } else if (isMediaQuery(selector)) { // Handle media query
                cssString += `${selector} {\n`;
                for (const innerSelector in rules) {
                    if(rules.hasOwnProperty(innerSelector)){
                        let innerRules = rules[innerSelector];
                         if (typeof innerRules === 'object') {
                            cssString += `  ${innerSelector} {\n`;
                            for (const property in innerRules) {
                                if (innerRules.hasOwnProperty(property)) {
                                    const value = innerRules[property];
                                    cssString += `    ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};\n`;
                                }
                            }
                            cssString += '  }\n';
                        }  else if (typeof innerRules === 'string') {
                            cssString += `  ${innerSelector} {\n    ${innerRules}\n  }\n`;
                       }

                    }
                }
                 cssString += '}\n';
            }
        }
    }
    return cssString;

    function isMediaQuery(selector) {
        return selector.trim().startsWith('@media');
    }
}

export default (src, alt, ar, cameraControls, touchAction, shadowIntensity, modelPoster, arPlacement, modelData) => {
    const styles = styleObjectToString(modalStyles)
    const template = hotspotsTemplate();
    return `
        <!-- Template for modal view -->
        <style>${styles}</style>
        <div class="normal-view-container">
            <model-viewer
                src="${src}"
                alt="${alt}"
                ar="${ar}"
                camera-controls="${cameraControls}"
                touch-action="${touchAction}"
                shadow-intensity="${modelData.shadow}"
                ar-placement="${modelData.placement}"
                ar-modes="webxr scene-viewer quick-look"
            >
                ${template}
                <button class="qr-code-button" style="background-color: ${modelData.arBtn.bgColor};color: ${modelData.arBtn.textColor};">
                    ${modelData.arBtn.icon ? (
                        '<img src="' + modelData.arBtn.icon + '" style="width: 24px; height: 24px;">'
                    ) : ''}
                    ${modelData.arBtn.text}
                </button>
            </model-viewer>
            <!-- QR Code Modal -->
            <div id="qrModal" class="qr-modal">
                <div class="qr-modal-content" style="display: flex; flex-direction: row;text-align: center;overflow: hidden;">
                <button class="qr-close-button">×</button>
                <div style="width: 45%; height:100%;flex-grow: 0; flex-shrink: 0;display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                    <h2>
                        <p id="btn-text" style="margin: 0">${modelData.title}</p>
                    </h2>
                    <p data-id="qrcode-info" class="translate-lang" style="margin:0">${modelData.description}</p>
                    <div class="qr-code-container">
                        <div id="qr-code"></div>
                    </div>
                </div>
                <div style="width: 50%; height:100%; flex-grow: 0; flex-shrink: 0;">
                    <img src="https://cdn.shopify.com/s/files/1/0768/6891/1392/files/1.jpg?v=1735181973" alt="Artwork" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                </div>
                </div>
            </div>
        </div>
    `;
};