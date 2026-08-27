import * as THREE from 'three';
import { config as gameConfig } from './config.js';
import { GameState } from './GameState.js';

/**
 * DayNightManager
 * ---------------
 * Drives a smooth day <-> night transition for the wilderness scene:
 *   - dims the sun and raises a bluish moon light at night,
 *   - lerps the sky-background colour and fog toward a dark night sky,
 *   - eases the renderer exposure down after dusk,
 *   - lights a warm torch that the player carries once darkness falls.
 *
 * The core game keeps its warm gradient sky texture on the menu; while a
 * journey is underway this manager takes over the background as a colour it
 * can blend, then restores the gradient when the run ends.
 *
 * `factor` is the daylight amount: 1 = bright noon, 0 = deep night.
 */
export class DayNightManager {
  constructor(game) {
    this.game = game;
    this.cfg = gameConfig.dayNight;

    this.enabled = false;
    this.mode = 'day';        // 'day' | 'night'
    this.factor = 1;          // current eased daylight amount
    this.targetFactor = 1;

    this.dayColor = new THREE.Color(this.cfg.day.skyColor);
    this.nightColor = new THREE.Color(this.cfg.night.skyColor);
    this.dayFog = new THREE.Color(this.cfg.day.fogColor);
    this.nightFog = new THREE.Color(this.cfg.night.fogColor);

    this.moonLight = null;
    this.torch = null;
    this.sunDisc = null;
    this.moonDisc = null;
    this.ambientLight = null;
    this.hemiLight = null;

    this._bgColor = new THREE.Color(this.cfg.day.skyColor);
  }

  /** Build the moon light, torch and celestial discs. Call after the scene exists. */
  init() {
    if (!this.game.scene) return;

    // Cache the scene's ambient + hemisphere lights so we don't traverse each frame.
    this.game.scene.traverse((obj) => {
      if (obj.isAmbientLight && !this.ambientLight) this.ambientLight = obj;
      else if (obj.isHemisphereLight && !this.hemiLight) this.hemiLight = obj;
    });

    this.moonLight = new THREE.DirectionalLight(new THREE.Color(this.cfg.moonColor), 0);
    this.moonLight.castShadow = false;
    this.game.scene.add(this.moonLight);
    this.game.scene.add(this.moonLight.target);

    this.torch = new THREE.PointLight(new THREE.Color(this.cfg.torchColor), 0, this.cfg.torchDistance, 1);
    this.torch.castShadow = false;
    this.game.scene.add(this.torch);

    // Small emissive sun / moon discs, kept far above the player for flavour.
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfff2cc, transparent: true, fog: false });
    this.sunDisc = new THREE.Mesh(new THREE.SphereGeometry(6, 20, 20), sunMat);
    this.sunDisc.renderOrder = -1;
    this.game.scene.add(this.sunDisc);

    const moonMat = new THREE.MeshBasicMaterial({ color: 0xdfe6ff, transparent: true, fog: false });
    this.moonDisc = new THREE.Mesh(new THREE.SphereGeometry(4.5, 20, 20), moonMat);
    this.moonDisc.renderOrder = -1;
    this.moonDisc.visible = false;
    this.game.scene.add(this.moonDisc);
  }

  /** Begin managing the background/lighting (call when a journey starts). */
  enable() {
    this.enabled = true;
    if (this.game.scene) {
      // Swap the gradient texture for a colour we can blend between day and night.
      this._bgColor.copy(this.dayColor);
      this.game.scene.background = this._bgColor;
    }
    this.setDay(true);
  }

  /** Stop managing and restore the warm gradient sky (menu / game over). */
  disable() {
    this.enabled = false;
    if (this.torch) this.torch.intensity = 0;
    if (this.moonLight) this.moonLight.intensity = 0;
    if (this.sunDisc) this.sunDisc.visible = false;
    if (this.moonDisc) this.moonDisc.visible = false;
    if (this.game.updateSky) this.game.updateSky();
  }

  setDay(instant = false) {
    this.mode = 'day';
    this.targetFactor = 1;
    if (instant) this._applyInstant();
  }

  setNight(instant = false) {
    this.mode = 'night';
    this.targetFactor = 0;
    if (instant) this._applyInstant();
  }

  toggle() {
    if (this.mode === 'day') this.setNight();
    else this.setDay();
    return this.mode;
  }

  _applyInstant() {
    this.factor = this.targetFactor;
    this._applyLighting();
  }

  update(dt) {
    if (!this.enabled) return;

    // While actively gathering, drift toward dusk as the day's timer runs down
    // so the world visibly ages from noon to evening.
    if (this.mode === 'day' && GameState.world.gameState === 'playing') {
      const dayLength = gameConfig.game.dayLength || 60;
      const t = Math.max(0, Math.min(1, GameState.world.timeLeft / dayLength));
      this.targetFactor = this.cfg.duskFloor + (1 - this.cfg.duskFloor) * t;
    }

    // Ease the daylight factor toward its target.
    const k = 1 - Math.exp(-(this.cfg.transitionSpeed) * dt);
    this.factor += (this.targetFactor - this.factor) * k;

    this._applyLighting();
    this._positionCelestials();
  }

  _applyLighting() {
    const f = this.factor;
    const day = this.cfg.day;
    const night = this.cfg.night;

    // Background + fog colours.
    this._bgColor.copy(this.nightColor).lerp(this.dayColor, f);
    if (this.enabled && this.game.scene && this.game.scene.background !== this._bgColor) {
      this.game.scene.background = this._bgColor;
    }
    if (this.game.scene && this.game.scene.fog) {
      this.game.scene.fog.color.copy(this.nightFog).lerp(this.dayFog, f);
    }

    // Lights.
    if (this.game.sunLight) {
      this.game.sunLight.intensity = THREE.MathUtils.lerp(night.sunIntensity, day.sunIntensity, f);
      this.game.sunLight.castShadow = f > 0.35;
    }
    if (this.moonLight) {
      this.moonLight.intensity = THREE.MathUtils.lerp(night.moonIntensity, day.moonIntensity, f);
    }
    if (this.torch) {
      this.torch.intensity = THREE.MathUtils.lerp(night.torch, day.torch, f);
    }

    // Ambient + hemisphere lights (cached in init()).
    if (this.ambientLight) this.ambientLight.intensity = THREE.MathUtils.lerp(night.ambient, day.ambient, f);
    if (this.hemiLight) this.hemiLight.intensity = THREE.MathUtils.lerp(night.hemi, day.hemi, f);

    // Renderer exposure.
    if (this.game.renderer) {
      this.game.renderer.toneMappingExposure = THREE.MathUtils.lerp(night.exposure, day.exposure, f);
    }

    // Celestial disc fades.
    if (this.sunDisc) {
      this.sunDisc.material.opacity = Math.max(0, (f - 0.3) / 0.7);
      this.sunDisc.visible = this.sunDisc.material.opacity > 0.02;
    }
    if (this.moonDisc) {
      this.moonDisc.material.opacity = Math.max(0, (0.6 - f) / 0.6);
      this.moonDisc.visible = this.moonDisc.material.opacity > 0.02;
    }
  }

  _positionCelestials() {
    const player = this.game.player;
    if (!player) return;
    const p = player.position;

    if (this.torch) {
      this.torch.position.set(p.x, p.y + 1.6, p.z);
    }
    if (this.moonLight) {
      // Moon comes from the opposite side of the sun for a cross-lit night.
      this.moonLight.position.set(p.x - 40, p.y + 45, p.z - 30);
      this.moonLight.target.position.copy(p);
      this.moonLight.target.updateMatrixWorld();
    }
    if (this.sunDisc) {
      this.sunDisc.position.set(p.x + 120, p.y + 140, p.z + 90);
    }
    if (this.moonDisc) {
      this.moonDisc.position.set(p.x - 120, p.y + 150, p.z - 90);
    }
  }
}
