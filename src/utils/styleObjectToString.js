export function styleObjectToString(styles) {
  let cssString = "";

  function isMediaQuery(selector) {
    return selector.trim().startsWith("@media");
  }

  function toKebabCase(str) {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }

  function processRules(rules, indentLevel) {
    let result = "";
    const indent = "  ".repeat(indentLevel);

    for (const property in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, property)) {
        const value = rules[property];
        if (typeof value === "object" && !Array.isArray(value)) {
          result += `\n${indent}${property} {`;
          result += processRules(value, indentLevel + 1);
          result += `\n${indent}}`;
        } else {
          const propertyName = toKebabCase(property);
          result += `\n${indent}${propertyName}: ${value};`;
        }
      }
    }
    return result;
  }

  for (const selector in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, selector)) {
      const rules = styles[selector];

      if (typeof rules === "object") {
        cssString += `${selector} {`;
        if (isMediaQuery(selector)) {
          // Media query: process nested selectors
          cssString += processRules(rules, 1);
          cssString += `\n}\n`;
        } else {
          // Regular selector
          cssString += processRules(rules, 1);
          cssString += `\n}\n`;
        }
      } else if (typeof rules === "string") {
        // If rules is a string, add it directly
        cssString += `${selector} {\n  ${rules}\n}\n`;
      }
    }
  }

  return cssString;
}
