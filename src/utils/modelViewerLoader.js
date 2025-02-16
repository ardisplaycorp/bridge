/**
 * Helper function to lazy load model-viewer only when needed
 */
export async function lazyLoadModelViewerIfNeeded() {
  // If the component is already defined, no need to import again
  if (!window.customElements.get('model-viewer')) {
    try {
      // Dynamically import model-viewer
      await import("https://art.nvzn.io/assets/lib/model-viewer/3.4.0/model-viewer.min.js");
      return true;
    } catch (error) {
      console.error('Failed to load model-viewer:', error);
      return false;
    }
  }
  return true;
}
