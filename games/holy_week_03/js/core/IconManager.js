import { ICON_SYSTEM, FA_ICONS, ICONS } from './../config.js';

/**
 * IconManager - Provides unified icon rendering regardless of source
 * Usage:
 *   - getIconClass(iconType) returns FA class string or null for SVG
 *   - getSVGPath(iconType) returns SVG path data string for inline <path>
 *   - createIconElement(iconType) returns <i> or <svg> element
 */
export class IconManager {
    constructor() {
        this.ICON_SYSTEM = ICON_SYSTEM;
        this.FA_ICONS = FA_ICONS;
        this.SVG_ICONS = ICONS;

        // Pre-load SVG files
        this.svgCache = {};
        this.loaded = false;
    }

    /**
     * Initialize by fetching all SVG files
     */
    async init() {
        if (this.ICON_SYSTEM !== 'svg') return;
        const iconKeys = Object.values(this.SVG_ICONS);
        const uniquePaths = [...new Set(iconKeys)];
        await Promise.all(uniquePaths.map(path => this.loadSVG(path)));
        this.loaded = true;
        console.log('IconManager: SVG icons loaded', Object.keys(this.svgCache));
    }

    /**
     * Load SVG file and cache its content
     */
    async loadSVG(path) {
        try {
            const resp = await fetch(path);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const text = await resp.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'image/svg+xml');
            const svg = doc.querySelector('svg');
            if (svg) {
                const viewBox = svg.getAttribute('viewBox') || '0 0 24 24';
                // Normalize root fill to currentColor if it's a solid color (not 'none')
                const rootFill = svg.getAttribute('fill');
                if (rootFill && rootFill !== 'none' && rootFill !== 'currentColor') {
                    svg.setAttribute('fill', 'currentColor');
                }
                // Normalize shape fills: convert solid colors to currentColor, preserve 'none'
                const shapes = svg.querySelectorAll('path, circle, rect, polyline, polygon, ellipse, line');
                shapes.forEach(shape => {
                    const fill = shape.getAttribute('fill');
                    if (fill && fill !== 'none' && fill !== 'currentColor') {
                        shape.setAttribute('fill', 'currentColor');
                    }
                    const stroke = shape.getAttribute('stroke');
                    if (stroke && stroke !== 'none' && stroke !== 'currentColor') {
                        shape.setAttribute('stroke', 'currentColor');
                    }
                });
                const innerSVG = Array.from(svg.children).map(el => el.outerHTML).join('\n');
                this.svgCache[path] = { viewBox, innerSVG };
            }
        } catch (e) {
            console.error(`Failed to load SVG icon: ${path}`, e);
        }
    }
           

    /**
     * Get FontAwesome class string for an icon type (only for FA system)
     */
    getIconClass(iconType) {
        return this.FA_ICONS[iconType] || '';
    }

    /**
     * Get SVG path content for an icon type (only for SVG system)
     */
    getSVGContent(iconType) {
        const path = this.SVG_ICONS[iconType];
        if (!path) return null;
        const cached = this.svgCache[path];
        if (!cached) return null;
        return {
            viewBox: cached.viewBox,
            innerHTML: cached.innerSVG
        };
    }

    /**
     * Create DOM element for icon (either <i> or <svg>)
     * @param {string} iconType - Key from ICONS/FA_ICONS
     * @param {Object} options - { className, size, color }
     */
    createIconElement(iconType, options = {}) {
        const { className = '', size = '1em', color = 'currentColor' } = options;

        if (this.ICON_SYSTEM === 'fontawesome') {
            const i = document.createElement('i');
            i.className = `${this.FA_ICONS[iconType]} ${className}`.trim();
            i.style.fontSize = size;
            i.style.color = color;
            return i;
        } else {
            const content = this.getSVGContent(iconType);
            if (!content) {
                console.warn(`SVG icon not found in cache: ${iconType}, using fallback`);
                return this.createFallbackIcon(color);
            }

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', content.viewBox);
            // Set fill to currentColor to propagate to child shapes
            svg.setAttribute('fill', 'currentColor');
            svg.style.color = color; // CSS custom property for inheritance
            svg.classList.add('icon-svg');
            if (className) svg.classList.add(className);
            svg.style.verticalAlign = 'middle';
            svg.style.display = 'inline-block';
            svg.style.width = typeof size === 'number' ? `${size}px` : size;
            svg.style.height = typeof size === 'number' ? `${size}px` : size;
            svg.innerHTML = content.innerHTML;
            return svg;
        }
    }




    createFallbackIcon(color) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '12');
        circle.setAttribute('r', '10');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', color);
        svg.appendChild(circle);
        return svg;
    }


}

