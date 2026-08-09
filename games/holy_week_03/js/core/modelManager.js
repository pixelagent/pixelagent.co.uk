import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MODEL_SYSTEM, MODELS, PRIMITIVE_CONFIG, MODEL_SCALES, COLORS, USE_TOON_SHADER } from './../config.js';

/**
 * ModelManager - Loads and caches 3D models (GLB or primitives)
 * Provides a unified interface to get models by type
 *
 * Usage:
 *   const modelMgr = new ModelManager();
 *   await modelMgr.init();
 *   const playerMesh = modelMgr.getModel('player');
 */
export class ModelManager {
    constructor() {
        this.system = MODEL_SYSTEM;
        this.modelCache = {};
        this.loaded = false;
    }

    async init() {
        if (this.system === 'glb') {
            // Pre-load all GLB models
            const modelKeys = Object.values(MODELS);
            const uniquePaths = [...new Set(modelKeys)];
            await Promise.all(uniquePaths.map(path => this.loadGLB(path)));
        }
        this.loaded = true;
        console.log(`ModelManager: ${this.system} model system ready`);
    }

    /**
     * Load a GLB file and cache it (Promise-wrapped for async/await)
     */
    async loadGLB(path) {
        return new Promise((resolve) => {
            fetch(path)
                .then(resp => {
                    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                    return resp.arrayBuffer();
                })
                .then(arrayBuffer => {
                    const loader = new GLTFLoader();
                    const resourcePath = path.substring(0, path.lastIndexOf('/') + 1);

                    loader.parse(
                        arrayBuffer,
                        resourcePath,
                        (gltf) => {
                            this.modelCache[path] = gltf.scene;
                            console.log(`Loaded GLB: ${path}`);
                            resolve();
                        },
                        (error) => {
                            console.error(`Failed to parse GLB: ${path}`, error);
                            const fallbackKey = Object.keys(MODELS).find(k => MODELS[k] === path);
                            this.modelCache[path] = this.createPrimitiveFromConfig(fallbackKey || 'player');
                            resolve();
                        }
                    );
                })
                .catch(e => {
                    console.error(`Failed to fetch GLB: ${path}`, e);
                    const fallbackKey = Object.keys(MODELS).find(k => MODELS[k] === path);
                    this.modelCache[path] = this.createPrimitiveFromConfig(fallbackKey || 'player');
                    resolve();
                });
        });
    }

    /**
     * Create primitive fallback if GLB fails to load
     */
    createPrimitiveFallback(path) {
        const key = Object.keys(MODELS).find(k => MODELS[k] === path);
        if (!key) return new THREE.Group();
        return this.createPrimitiveFromConfig(key);
    }

    /**
     * Create primitive geometry from config
     */
    createPrimitive(cfg) {
        const group = new THREE.Group();

        // Choose material type based on USE_TOON_SHADER flag
        const useToon = USE_TOON_SHADER;

        switch (cfg.type) {
            case 'box':
                const geometryBox = new THREE.BoxGeometry(...cfg.size);
                const materialBox = useToon
                    ? new THREE.MeshToonMaterial({ color: cfg.color })
                    : new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.8, metallic: 0.0 });
                const box = new THREE.Mesh(geometryBox, materialBox);
                group.add(box);
                break;

            case 'sphere':
                const geometrySphere = new THREE.SphereGeometry(cfg.radius, 16, 16);
                const materialSphere = useToon
                    ? new THREE.MeshToonMaterial({ color: cfg.color })
                    : new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.8, metallic: 0.0 });
                const sphere = new THREE.Mesh(geometrySphere, materialSphere);
                group.add(sphere);
                break;

            case 'capsule':
                const geometryCapsule = new THREE.CapsuleGeometry(cfg.radius, cfg.length, 8, 16);
                const materialCapsule = useToon
                    ? new THREE.MeshToonMaterial({ color: cfg.color })
                    : new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.8, metallic: 0.0 });
                const capsule = new THREE.Mesh(geometryCapsule, materialCapsule);
                capsule.position.y = cfg.length / 2 + cfg.radius;
                group.add(capsule);
                break;

            case 'octahedron':
                const geometryOct = new THREE.OctahedronGeometry(cfg.radius);
                const hasEmissive = !!cfg.emissive;
                let materialOct;
                if (useToon) {
                    materialOct = new THREE.MeshToonMaterial({
                        color: cfg.color,
                        emissive: cfg.emissive || COLORS.black
                    });
                } else {
                    materialOct = new THREE.MeshStandardMaterial({
                        color: cfg.color,
                        emissive: cfg.emissive || COLORS.black,
                        transparent: hasEmissive,
                        opacity: hasEmissive ? 0.9 : 1.0,
                        roughness: 0.8,
                        metallic: 0.0
                    });
                }
                const oct = new THREE.Mesh(geometryOct, materialOct);
                group.add(oct);
                break;

            case 'icosahedron':
                const geometryIco = new THREE.IcosahedronGeometry(cfg.radius, cfg.segments || 0);
                const materialIco = useToon
                    ? new THREE.MeshToonMaterial({ color: cfg.color })
                    : new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.8, metallic: 0.0 });
                const ico = new THREE.Mesh(geometryIco, materialIco);
                group.add(ico);
                break;
        }

        return group;
    }

    /**
     * Get a model by key (player, npcEcho, pickupCell, etc.)
     * Returns a THREE.Group (cloned from cache)
     */
    getModel(key) {
        if (this.system === 'primitives') {
            return this.createPrimitiveFromConfig(key);
        }

        // GLB system: try exact key, then lowercase
        let path = MODELS[key];
        if (!path) path = MODELS[key.toLowerCase()];
        if (!path) {
            console.warn(`Model not found: ${key}`);
            return new THREE.Group();
        }

        const cached = this.modelCache[path];
        if (!cached) {
            console.warn(`Model not loaded: ${key}`);
            return new THREE.Group();
        }

        const cloned = cached.clone(true);
        const scale = MODEL_SCALES[key] || MODEL_SCALES[key.toLowerCase()] || 1;
        if (scale !== 1) {
            cloned.scale.setScalar(scale);
        }
        return cloned;
    }

    /**
     * Create primitive from config (case-insensitive key)
     */
    createPrimitiveFromConfig(key) {
        let cfg = PRIMITIVE_CONFIG[key];
        if (!cfg) cfg = PRIMITIVE_CONFIG[key.toLowerCase()];
        if (!cfg) {
            console.warn(`Primitive config not found: ${key}`);
            return new THREE.Group();
        }
        return this.createPrimitive(cfg);
    }

    /**
     * Get raw cached model (for special cases where cloning not needed)
     */
    getCachedModel(key) {
        let path = MODELS[key];
        if (!path) path = MODELS[key.toLowerCase()];
        return this.modelCache[path] || null;
    }
}
