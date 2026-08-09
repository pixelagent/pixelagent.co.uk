// environment.js
import * as THREE from 'three';

export class EnvironmentManager {
    constructor(scene, sunLight, moonLight, torchLight, audio) {
        this.scene = scene;
        this.sunLight = sunLight;
        this.moonLight = moonLight;
        this.torchLight = torchLight;
        this.audio = audio;
        this.timeProgress = 0.25;
        this.wasDay = null; // track state to trigger audio transitions

        // Ensure light targets are in the scene graph so their world matrices update
        this.scene.add(this.sunLight.target);
        this.scene.add(this.moonLight.target);
    }

    update(autoCycle, playerPos) {
        if (autoCycle) this.timeProgress = (this.timeProgress + 0.00027) % 1;

        const rad = this.timeProgress * Math.PI * 2;
        this.sunLight.position.set(Math.cos(rad) * 1500, Math.sin(rad) * 1500, 0);
        this.moonLight.position.set(Math.cos(rad + Math.PI) * 1500, Math.sin(rad + Math.PI) * 1500, 0);

        // Move shadow camera targets to follow the player
        if (playerPos) {
            this.sunLight.target.position.copy(playerPos);
            this.moonLight.target.position.copy(playerPos);
        }

        const dayMix = Math.max(0, Math.min(1, (Math.sin(rad) + 0.2) / 0.4));

        // Handle audio transitions based on day/night cycle
        if (this.audio) {
            const isDay = dayMix > 0.5;
            if (isDay !== this.wasDay) {
                if (isDay) {
                    this.audio.playMorningAmbience();
                } else {
                    this.audio.playOutdoorAmbience();
                }
                this.wasDay = isDay;
            }
        }

        const dayColor = new THREE.Color(0x87ceeb);
        const nightColor = new THREE.Color(0x050a15); // Deep navy instead of pure black

        this.scene.background.copy(nightColor.lerp(dayColor, dayMix));
        this.torchLight.intensity = (1 - dayMix) * 5; // Slightly stronger torch for visibility
    }
}