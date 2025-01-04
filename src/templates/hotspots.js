export default () => {
  return `
        <!-- Template for hotspots -->
        <button data-hotspot slot="hotspot-dot+X-Y+Z" class="dot" data-position="1 -1 1" data-normal="1 0 0"></button>
        <button data-hotspot slot="hotspot-dim+X-Y" class="dim" data-position="1 -1 0" data-normal="1 0 0"></button>
        <button data-hotspot slot="hotspot-dot+X-Y-Z" class="dot" data-position="1 -1 -1" data-normal="1 0 0"></button>
        <button data-hotspot slot="hotspot-dim+X-Z" class="dim" data-position="1 0 -1" data-normal="1 0 0"></button>
        <button data-hotspot slot="hotspot-dot+X+Y-Z" class="dot" data-position="1 1 -1" data-normal="0 1 0"></button>
        <button data-hotspot slot="hotspot-dim+Y-Z" class="dim" data-position="0 -1 -1" data-normal="0 1 0"></button>
        <button data-hotspot slot="hotspot-dot-X+Y-Z" class="dot" data-position="-1 1 -1" data-normal="0 1 0"></button>
        <button data-hotspot slot="hotspot-dim-X-Z" class="dim" data-position="-1 0 -1" data-normal="-1 0 0"></button>
        <button data-hotspot slot="hotspot-dot-X-Y-Z" class="dot" data-position="-1 -1 -1" data-normal="-1 0 0"></button>
        <button data-hotspot slot="hotspot-dim-X-Y" class="dim" data-position="-1 -1 0" data-normal="-1 0 0"></button>
        <button data-hotspot slot="hotspot-dot-X-Y+Z" class="dot" data-position="-1 -1 1" data-normal="-1 0 0"></button>
        <svg id="dimLines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="dimensionLineContainer">
            <line class="dimensionLine"></line>
            <line class="dimensionLine"></line>
            <line class="dimensionLine"></line>
            <line class="dimensionLine"></line>
            <line class="dimensionLine"></line>
        </svg>
    `;
};
