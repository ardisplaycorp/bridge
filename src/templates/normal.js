const modalStyles = {
    
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

export default (src, alt, ar, cameraControls, touchAction, shadowIntensity) => {
    const styles = styleObjectToString(modalStyles)
    return `
        <!-- Template for modal view -->
        <style>${styles}</style>
        <model-viewer
            src="${src}"
            alt="${alt}"
            ar="${ar}"
            camera-controls="${cameraControls}"
            touch-action="${touchAction}"
            shadow-intensity="${shadowIntensity}"
        >
        </model-viewer>
    `;
};