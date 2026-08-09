import * as THREE from 'three';
import { DAY_NIGHT, SCENE, MODEL_SYSTEM } from './../config.js';
import * as CONFIG from './../config.js';

export class DayNight {
    constructor(scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;

        // Day/Night configuration
        this.autoCycle = DAY_NIGHT.autoCycle;
        this.cycleSpeed = DAY_NIGHT.cycleSpeed;
        this.dayPosition = DAY_NIGHT.dayPosition;
        this.nightPosition = DAY_NIGHT.nightPosition;
        this.skyColors = DAY_NIGHT.sky;
        this.fogDensity = DAY_NIGHT.fogDensity;

        // Time tracking
        this.timeProgress = this.dayPosition; // Start at day
        this._isDay = true; // Renamed from isDayMode to avoid collision with method

        // Celestial bodies
        this.sunSphere = null;
        this.sunLight = null;
        this.moonLight = null;
        this.ambientLight = null;
        this.hemiLight = null;

        // Colors
        this.skyBlueDay = new THREE.Color(this.skyColors.day);
        this.spaceBlackNight = new THREE.Color(this.skyColors.night);

        // Player effect references (set via registerPlayerEffects)
        this._playerTorch = null;
        this._playerMaterial = null;

        // Callback for when day/night changes (receives isNight boolean)
        this.onModeChange = null;

        this.setupCelestialBodies();
        this.updateCelestial(true); // Initial setup
    }

    /**
     * Register player torch and material for day/night effect management.
     * @param {THREE.PointLight} torch - Player's torch light
     * @param {THREE.Material} material - Player's body material
     */
    registerPlayerEffects(torch, material) {
        this._playerTorch = torch;
        this._playerMaterial = material;
    }

    /**
     * Update player torch intensity and emissive glow.
     * Called every frame from updateCelestial().
     */
    _updatePlayerEffects() {
        if (!this._playerTorch || !this._playerMaterial) return;

        const lerpFactor = 0.05; // Faster lerping for more responsive torch

        // Update torch intensity
        if (this._playerTorch) {
            // Use torch's stored target intensity (adjusted for model system)
            const modelSystemIntensity = MODEL_SYSTEM === 'glb' 
                ? SCENE.torchIntensityNightGLB 
                : SCENE.torchIntensityNightPrimitive;
            const targetIntensity = this._isDay ? 0 : (this._playerTorch.targetIntensity || modelSystemIntensity);
            const newIntensity = THREE.MathUtils.lerp(
                this._playerTorch.intensity,
                targetIntensity,
                lerpFactor
            );
            this._playerTorch.intensity = newIntensity;
        }

        // Update player emissive glow (adjusted for model system)
        if (this._playerMaterial && this._playerMaterial.emissive) {
            const glowIntensity = MODEL_SYSTEM === 'glb' 
                ? CONFIG.DAY_NIGHT.playerGlowNightGLB 
                : CONFIG.DAY_NIGHT.playerGlowNightPrimitive;
            const targetGlow = this._isDay
                ? new THREE.Color(CONFIG.DAY_NIGHT.playerGlowDay) // No glow during day
                : new THREE.Color(glowIntensity); // Adjusted red glow at night

            this._playerMaterial.emissive.lerp(targetGlow, lerpFactor);
        }
    }

    setupCelestialBodies() {
        // Sun sphere (visual only)
        this.sunSphere = new THREE.Mesh(
            new THREE.SphereGeometry(12, 32, 32),
            new THREE.MeshBasicMaterial({ color: CONFIG.SCENE.sunSphereColor })
        );
        this.scene.add(this.sunSphere);

        // Ambient light (affects overall brightness)
        this.ambientLight = new THREE.AmbientLight(SCENE.ambientLight, SCENE.ambientIntensity);
        this.scene.add(this.ambientLight);

        // Hemisphere light (sky-ground illumination)
        this.hemiLight = new THREE.HemisphereLight(this.skyColors.day, CONFIG.SCENE.hemiGroundColorDay, CONFIG.SCENE.hemiIntensityDay);
        this.scene.add(this.hemiLight);

        // Sun directional light (shadow-casting)
        this.sunLight = new THREE.DirectionalLight(SCENE.sunColor, SCENE.sunIntensity);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.bias = -0.0001; // Fine-tuned bias for clean shadows
        this.sunLight.shadow.radius = 4; // Softer shadow edges
        // Optimized shadow camera for planet-sized scene
        this.sunLight.shadow.camera.left   = -100;
        this.sunLight.shadow.camera.right  =  100;
        this.sunLight.shadow.camera.top    =  100;
        this.sunLight.shadow.camera.bottom = -100;
        this.sunLight.shadow.camera.near   =  10; // Closer near plane for better precision
        this.sunLight.shadow.camera.far    = 500; // Appropriate far plane for planet
        this.sunLight.shadow.mapSize.set(2048, 2048); // Higher resolution shadows
        // Set target to planet center for proper shadow casting
        this.sunLight.target.position.set(0, 0, 0);
        this.scene.add(this.sunLight);
        this.scene.add(this.sunLight.target);

        // Moon directional light
        this.moonLight = new THREE.DirectionalLight(CONFIG.SCENE.moonColor, CONFIG.SCENE.moonIntensity);
        this.scene.add(this.moonLight);

        // Set initial scene colors
        this.scene.background = this.skyBlueDay.clone();
        this.scene.fog = new THREE.FogExp2(this.skyColors.day, this.fogDensity);
    }

    updateCelestial(instant = false) {
        const lerpFactor = instant ? 1 : 0.02;
        const angle = this.timeProgress * Math.PI * 2;
        const orbitDist = 450;

        // Calculate celestial positions
        const sunPos = new THREE.Vector3(0, Math.sin(angle) * orbitDist, Math.cos(angle) * orbitDist);
        const moonPos = new THREE.Vector3(0, -Math.sin(angle) * orbitDist, -Math.cos(angle) * orbitDist);

        // Update light positions
        this.sunLight.position.copy(sunPos);
        this.sunSphere.position.copy(sunPos);
        this.moonLight.position.copy(moonPos);

        // Update light intensities based on height (above/below horizon)
        this.sunLight.intensity = sunPos.y > 0 ? SCENE.sunIntensity : 0;
        this.moonLight.intensity = moonPos.y > 0 ? 1.5 : 0;
        this.sunSphere.visible = sunPos.y > 0;

        // Update scene colors
        const targetSky = this._isDay ? this.skyBlueDay : this.spaceBlackNight;
        this.scene.background.lerp(targetSky, lerpFactor);
        this.scene.fog.color.lerp(targetSky, lerpFactor);

        this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.isDayMode() ? SCENE.ambientIntensity : SCENE.ambientIntensity * SCENE.ambientNightMultiplier, lerpFactor);
        this.hemiLight.intensity = THREE.MathUtils.lerp(this.hemiLight.intensity, this.isDayMode() ? CONFIG.SCENE.hemiIntensityDay : CONFIG.SCENE.hemiIntensityNight, lerpFactor);


        // Update ambient lighting
        const targetAmbient = this._isDay ? 0.6 : 0.2;
        const targetHemi = this._isDay ? 0.5 : 0;

        this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, targetAmbient, lerpFactor);
        this.hemiLight.intensity = THREE.MathUtils.lerp(this.hemiLight.intensity, targetHemi, lerpFactor);

        // Update hemisphere light colors
        this.hemiLight.color.lerp(this._isDay ? this.skyBlueDay : this.spaceBlackNight, lerpFactor);
        this.hemiLight.groundColor.lerp(this._isDay ? new THREE.Color(CONFIG.SCENE.hemiGroundColorDay) : new THREE.Color(CONFIG.SCENE.hemiGroundColorNight), lerpFactor);

        // Update player torch and emissive glow
        this._updatePlayerEffects();
    }

    update(deltaTime) {
        if (this.autoCycle) {
            this.timeProgress = (this.timeProgress + this.cycleSpeed) % 1;
        }

        this.updateCelestial();
    }

    toggleMode() {
        this._isDay = !this._isDay;
        this.timeProgress = this._isDay ? this.dayPosition : this.nightPosition;

        // Notify listeners
        if (this.onModeChange) {
            this.onModeChange(!this._isDay); // Pass isNight
        }

        return this._isDay;
    }

    setMode(isDay) {
        this._isDay = isDay;
        this.timeProgress = isDay ? this.dayPosition : this.nightPosition;

        // Notify listeners
        if (this.onModeChange) {
            this.onModeChange(!isDay); // Pass isNight
        }
    }

    isDayMode() {
        return this._isDay;
    }

    isNight() {
        return !this._isDay;
    }

    getButtonIcon() {
        return this._isDay ? 'day' : 'night';
    }
}
