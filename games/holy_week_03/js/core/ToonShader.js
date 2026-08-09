import * as THREE from 'three';
import { OUTLINE_COLOR, USE_TOON_SHADER } from './../config.js';

export class ToonShader {
    constructor() {
        // Only create gradient map if toon shading is enabled
        this.gradientMap = null;
        if (USE_TOON_SHADER) {
            this.gradientMap = this.createGradientMap();
        }
    }

    createGradientMap() {
        // Use RedFormat (WebGL2 compatible) instead of deprecated LuminanceFormat
        const format = THREE.RedFormat;
        // 3-step gradient: black -> mid-gray -> white for clear light/dark separation
        const colors = new Uint8Array([0, 128, 255]);
        const gradientMap = new THREE.DataTexture(colors, colors.length, 1, format);
        gradientMap.needsUpdate = true;
        return gradientMap;
    }

    /**
     * Creates a toon material with gradient mapping (if toon enabled) or standard material
     * @param {number} color - Hex color value
     * @param {Object} options - Additional material options
     * @returns {THREE.Material}
     */
    createToonMaterial(color, options = {}) {
        if (USE_TOON_SHADER) {
            return new THREE.MeshToonMaterial({
                color: color,
                gradientMap: this.gradientMap,
                ...options
            });
        } else {
            // Use physically-based standard material when toon is disabled
            return new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.8,
                metallic: 0.0,
                ...options
            });
        }
    }

    /**
     * Creates a toon mesh group with main mesh and optional black outline
     * (outline only when toon shading is enabled)
     * @param {THREE.Geometry} geometry - The geometry for the mesh
     * @param {number} color - Hex color value for the main mesh
     * @param {number} outlineSize - Size multiplier for the outline (default: 0.08, ignored if toon disabled)
     * @param {Object} options - Additional material options
     * @returns {Object} {group, mainMesh, outlineMesh|undefined}
     */
    createToonGroup(geometry, color, outlineSize = 0.08, options = {}) {
        const group = new THREE.Group();

        if (USE_TOON_SHADER) {
            // Main toon mesh
            const toonMat = this.createToonMaterial(color, options);
            const mainMesh = new THREE.Mesh(geometry, toonMat);
            mainMesh.castShadow = true;
            mainMesh.receiveShadow = true;
            group.add(mainMesh);

            // Black outline hull (backsided geometry)
            const outlineMat = new THREE.MeshBasicMaterial({
                color: OUTLINE_COLOR,
                side: THREE.BackSide
            });
            const outlineMesh = new THREE.Mesh(geometry.clone(), outlineMat);
            outlineMesh.scale.multiplyScalar(1 + outlineSize);
            group.add(outlineMesh);

            return { group, mainMesh, outlineMesh };
        } else {
            // Standard PBR material, no outline
            const stdMat = this.createToonMaterial(color, options);
            const mainMesh = new THREE.Mesh(geometry, stdMat);
            mainMesh.castShadow = true;
            mainMesh.receiveShadow = true;
            group.add(mainMesh);

            return { group, mainMesh };
        }
    }

    /**
     * Updates shadow settings for toon materials
     * @param {THREE.Group} group - The group to update
     * @param {boolean} castShadow - Whether meshes should cast shadows
     * @param {boolean} receiveShadow - Whether meshes should receive shadows
     */
    updateShadowSettings(group, castShadow = true, receiveShadow = true) {
        group.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = castShadow;
                child.receiveShadow = receiveShadow;
            }
        });
    }

    /**
     * Disposes of the gradient map texture (if created)
     */
    dispose() {
        if (this.gradientMap) {
            this.gradientMap.dispose();
        }
    }
}
