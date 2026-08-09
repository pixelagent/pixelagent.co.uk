import * as THREE from 'three';
import * as CANNON from 'cannon';
import * as CONFIG from './../config.js';

export class SceneManager {
    constructor(container) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(CONFIG.SCENE.background);
        this.scene.fog = new THREE.FogExp2(CONFIG.SCENE.fogColor, CONFIG.SCENE.fogDensity);
        this.canvasContainer = null;
        this.planetR = 100;

        // Get container dimensions for embedded view
        // Use fallback if container not yet visible (tab not active)
        const width = container && container.clientWidth ? container.clientWidth : window.innerWidth;
        const height = container && container.clientHeight ? container.clientHeight : window.innerHeight;
        
        this.camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 8000);
        // Camera will be repositioned by setPlanetRadius
        this.camera.position.set(0, 250, 280);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        if (container) {
            const mount = container.querySelector('#scene-canvas-mount');
            (mount || container).appendChild(this.renderer.domElement);
            this.canvasContainer = mount || container;
        } else {
            document.body.appendChild(this.renderer.domElement);
        }

        // Physics world
        this.world = new CANNON.World();
        this.world.solver.iterations = 15;

        this.setupLights();
        this.setupStarField();
    }

    setPlanetRadius(r) {
        this.planetR = r;
        // Reposition camera based on planet radius - closer for better view
        this.camera.position.set(0, r * 2 + 50, r * 2 + 80);
    }

    setupLights() {
        // Lighting is now handled by DayNight system
        // This method is kept for compatibility but doesn't set up lights
    }

    setupStarField() {
        const starGeo = new THREE.BufferGeometry();
        const starPos = [];
        for (let i = 0; i < 1500; i++) {
            const v = new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 2000 + 100);
            starPos.push(v.x, v.y, v.z);
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
        const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
            color: CONFIG.SCENE.starColor,
            size: 1.5,
            transparent: true,
            opacity: 0.8
        }));
        this.scene.add(stars);
        this.stars = stars;
    }

    handleResize() {
        const width = this.canvasContainer ? this.canvasContainer.clientWidth : window.innerWidth;
        const height = this.canvasContainer ? this.canvasContainer.clientHeight : window.innerHeight;
        // Skip if no valid dimensions yet
        if (width === 0 || height === 0) return;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
