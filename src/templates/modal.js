const modalStyles = {
    '.custom-model-viewer-container': {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'block',
        fontFamily: 'sans-serif',
    },
    '.preview-image': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
    },
    '.view-3d-button': {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        padding: '10px 20px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    '.view-3d-button svg': {
      fill: 'white',
    },
    '.model-viewer-container': {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 6rem)',
        height: 'calc(100% - 6rem)',
        display: 'none',
        backgroundColor: 'white',
        flexDirection: 'row',
        zIndex: '1000',
    },
    '.close-button': {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
    },
    '.close-button svg': {
      width: '24px',
      height: '24px',
      fill: 'black',
    },
    '.overlay': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '-1',
        display: 'none',
    }
};


function styleObjectToString(styles) {
    let cssString = "";
  
    for (const selector in styles) {
      if (styles.hasOwnProperty(selector)) {
        let rules = styles[selector];
        if (typeof rules === 'object') {
          cssString += `${selector} {\n`;
            for (const property in rules) {
                if (rules.hasOwnProperty(property)) {
                    const value = rules[property];
                    cssString += `  ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};\n`;
                }
            }
            cssString += '}\n';
        } else if(typeof rules === 'string') {
             cssString += `${selector} {\n  ${rules} \n}\n`;
        }
  
      }
    }
    return cssString;
}

export default (src, alt, ar, cameraControls, touchAction, shadowIntensity, modelPoster) => {
    const styles = styleObjectToString(modalStyles)
    return `
        <!-- Template for modal view -->
        <style>${styles}</style>
        <div class="custom-model-viewer-container">
            <img class="preview-image" src="${modelPoster}" alt="Model Preview">
            <button class="view-3d-button">
                <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" aria-hidden="true" class="pip-svg-icon pip-btn__icon"><path d="M11 16.9766c.3294.0154.663.0233 1 .0233 2.2351 0 4.3234-.3458 6-.9495 1.7881-.6438 4-1.8975 4-4.0505 0-1.9568-1.8939-3.1985-3.5147-3.864l-1.5605 1.5606C17.8623 9.9943 20 10.7292 20 11.9999c0 .9329-1.2789 1.5728-2 1.8958-1.8614.8335-3.9768 1.1042-6 1.1042-.3392 0-.6729-.0088-1-.0257v-1.9743l-3 3 3 3v2.0233zm2-9.9532A21.3903 21.3903 0 0 0 12.0001 7c-2.235 0-4.3234.3457-6 .9494-1.7881.6438-4 1.8976-4 4.0506 0 1.9568 1.894 3.1984 3.5146 3.8639l1.5606-1.5605C6.1378 14.0057 4 13.2707 4 12.0001c0-.9329 1.2789-1.5729 2-1.8958 1.8614-.8336 3.9767-1.1042 6-1.1042.3392 0 .6729.0087.9999.0257V11l3-3-3-3v2.0234z"></path></svg>
                View in 3D
            </button>
            <div class="model-viewer-container">
                <model-viewer
                    src="${src}"
                    alt="${alt}"
                    ar="${ar}"
                    camera-controls="${cameraControls}"
                    touch-action="${touchAction}"
                    shadow-intensity="${shadowIntensity}"
                >
                </model-viewer>
                <button class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
            <div class="overlay"></div>
        </div>
    `;
};