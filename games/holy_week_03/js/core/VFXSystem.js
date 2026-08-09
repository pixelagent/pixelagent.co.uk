/**
 * VFXSystem.js — Visual Effects System
 * ================================
 * Manages all runtime visual effects for the planet game:
 *
 *  • Particle pool  – dust, fireworks, and ambient atmospheric particles
 *  • Bird flock     – 20 ambient mesh birds orbiting the planet
 *  • Landing decals – surface stamps left when the player lands
 *
 * USAGE
 * -----
 *   // 1. Construct once (after scene + planet mesh exist):
 *   const vfx = new VFXSystem(scene, planetMesh, PLANET_RADIUS);
 *
 *   // 2. Call every frame in your game loop:
 *   vfx.update(dt, player.position, player.velocity, player.isGrounded);
 *
 *   // 3. Trigger effects manually where needed:
 *   vfx.emitFirework(pos, up);        // celebration burst
 *   vfx.emitLandingDecal(pos, up);    // stamp on landing
 *
 *   // 4. Sync day/night state whenever it changes:
 *   vfx.setNightMode(true);
 *
 * DEPENDENCIES
 * ------------
 *   three          — core 3-D library
 *   DecalGeometry  — three/addons/geometries/DecalGeometry.js
 *   VFX            — ./config.js  (landingDecal: { size, lifetime, dayColor, nightColor })
 */

/**
 * VFXSystem.js — Visual Effects System
 * ================================
 * Manages all runtime visual effects for the planet game:
 *
 *  • Particle pool    – dust, fireworks, and ambient atmospheric particles
 *  • Bird flock       – 20 ambient mesh birds orbiting the planet
 *  • Landing decals   – surface stamps left when the player lands
 *  • Player trail     – footprint particles emitted while the player moves
 *  • Player torch     – PointLight + emissive glow that activates at night
 *
 * USAGE
 * -----
 *   // 1. Construct once (after scene + planet mesh exist):
 *   const vfx = new VFXSystem(scene, planetMesh, PLANET_RADIUS);
 *
 *   // 2. Register the player's torch light and material so VFX can drive them:
 *   vfx.initPlayerEffects(torchPointLight, playerMeshStandardMaterial);
 *
 *   // 3. Call every frame in your game loop:
 *   vfx.update(dt, player.position, player.velocity, player.isGrounded);
 *
 *   // 4. Trigger effects manually where needed:
 *   vfx.emitFirework(pos, up);        // celebration burst
 *   vfx.emitLandingDecal(pos, up);    // stamp on landing
 *
 *   // 5. Sync day/night state whenever it changes:
 *   vfx.setNightMode(true);
 *
 * DEPENDENCIES
 * ------------
 *   three          — core 3-D library
 *   DecalGeometry  — three/addons/geometries/DecalGeometry.js
 *   VFX            — ./config.js  (landingDecal: { size, lifetime, dayColor, nightColor })
 */

import * as THREE from 'three';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
import { COLORS, VFX } from '../config.js';

// ---------------------------------------------------------------------------
// createCircuitTexture()
// ---------------------------------------------------------------------------
/**
 * Fallback canvas texture used when `./assets/gfx/dirt.svg` fails to load.
 * Draws a glowing cyan hexagonal circuit ring on a transparent background.
 *
 * @returns {THREE.CanvasTexture}
 */
function createCircuitTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const cx = 128, cy = 128;

    ctx.clearRect(0, 0, 256, 256);

    // Outer glowing ring
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00f2ff';
    ctx.strokeStyle = '#00f2ff';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(cx, cy, 100, 0, Math.PI * 2);
    ctx.stroke();

    // Six spoke lines + dot connectors (hexagonal pattern)
    ctx.shadowColor = '#00ffaa';
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 100, cy + Math.sin(angle) * 100);
        ctx.lineTo(cx + Math.cos(angle) * 60, cy + Math.sin(angle) * 60);
        ctx.strokeStyle = '#00f2ff';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx + Math.cos(angle) * 60, cy + Math.sin(angle) * 60, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffaa';
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
}


// ---------------------------------------------------------------------------
// VFXSystem
// ---------------------------------------------------------------------------
export class VFXSystem {

    /**
     * @param {THREE.Scene}  scene      The Three.js scene to add effects to.
     * @param {THREE.Mesh}   planet     The planet mesh (used for decal raycasting).
     * @param {number}       planetR    Planet radius (used for bird altitude targeting).
     */
    constructor(scene, planet, planetR, planetMesh = null) {
        this.scene = scene;
        this.planet = planet;
        this.planetR = planetR;
        this.planetMesh = planetMesh || planet; // Use provided mesh or fallback to planet

        // ── Player trail system ──────────────────────────────────────────
        this.trailParticles = [];

        this._isNight = false;
        this.decalMat = null;
        this.decals = [];

        // ── Particle pool ────────────────────────────────────────────────
        this.MAX_PARTICLES = 2000;
        this.lifetimes = new Float32Array(this.MAX_PARTICLES);
        this.gravityScales = new Float32Array(this.MAX_PARTICLES);
        this.velocities = [];
        this._nextParticle = 0;

        for (let i = 0; i < this.MAX_PARTICLES; i++) {
            this.velocities.push(new THREE.Vector3());
        }

        // Geometry: one position attribute (x,y,z) per particle
        const positions = new Float32Array(this.MAX_PARTICLES * 3).fill(99999);
        this.geom = new THREE.BufferGeometry();
        this.geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Color attribute so each particle can have its own colour
        const colors = new Float32Array(this.MAX_PARTICLES * 3).fill(1);
        this.geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 0.6,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            depthWrite: false,
            sizeAttenuation: true,
        });

        this.particles = new THREE.Points(this.geom, particleMat);
        this.scene.add(this.particles);

        // ── Bird flock ───────────────────────────────────────────────────
        this.birdData = [];
        this._initBirds(20);

        // ── Decal texture ────────────────────────────────────────────────
        this._loadDecalTexture();
    }

    // =========================================================================
    // Private helpers
    // =========================================================================

    /** Build a tiny bird mesh and add it to the scene. */
    _makeBirdMesh() {
        // Simple cross shape: body + wings from two flat boxes
        const group = new THREE.Group();

        const bodyGeo = new THREE.BoxGeometry(0.6, 0.15, 0.15);
        const wingGeo = new THREE.BoxGeometry(0.15, 0.08, 0.8);
        const mat = new THREE.MeshBasicMaterial({ color: COLORS.bird });

        group.add(new THREE.Mesh(bodyGeo, mat));

        const wingL = new THREE.Mesh(wingGeo, mat);
        wingL.position.set(0, 0, 0);
        group.add(wingL);

        return group;
    }

    /** Spawn `count` birds distributed randomly around the planet. */
    _initBirds(count) {
        for (let i = 0; i < count; i++) {
            const mesh = this._makeBirdMesh();
            this.scene.add(mesh);

            // Random point on a sphere at target altitude
            const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.copy(dir.clone().multiplyScalar(this.planetR + 30));

            // Tangential velocity: cross with a random axis gives a direction
            // perpendicular to the radius, scaled to a plausible bird speed
            const speed = 8 + Math.random() * 6;
            const tangent = new THREE.Vector3()
                .crossVectors(dir, new THREE.Vector3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                ))
                .normalize()
                .multiplyScalar(speed);

            this.birdData.push({
                mesh,
                vel: tangent,
                phase: Math.random() * Math.PI * 2,
            });
        }
    }

    /** Load SVG decal texture, fall back to canvas if it fails. */
    _loadDecalTexture() {
        const loader = new THREE.TextureLoader();
        loader.load(
            '../assets/gfx/dirt.svg',
            (tex) => {
                this.decalMat = this._buildDecalMaterial(tex);
            },
            undefined,
            () => {
                // SVG not found — use procedural fallback
                this.decalMat = this._buildDecalMaterial(createCircuitTexture());
            }
        );
    }

    /** Create a transparent, depth-write-off decal material. */
    _buildDecalMaterial(texture) {
        return new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
            depthTest: true,
            alphaTest: 0.5,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            opacity: 0.8,
            color: new THREE.Color(COLORS.white), // White base, will be tinted in getDecalMaterial
        });
    }

    // =========================================================================
    // Public API
    // =========================================================================

    /**
     * Returns the current decal material, tinted for day or night.
     * Returns null if the texture is still loading.
     * @returns {THREE.MeshBasicMaterial|null}
     */
    getDecalMaterial() {
        if (!this.decalMat) return null;
        const color = this._isNight
            ? VFX.landingDecal.nightColor
            : VFX.landingDecal.dayColor;
        this.decalMat.color.setHex(color);
        return this.decalMat.clone(); // Clone so each decal fades independently
    }

    // ── Player trail system ──────────────────────────────────────────────

    /**
     * Spawn a trail particle at the given position.
     * @param {THREE.Vector3} pos  Position to spawn the trail particle.
     */
    spawnTrail(pos) {
        const color = this._isNight ? COLORS.cyan : COLORS.brown;
        const geo = new THREE.SphereGeometry(0.3, 6, 6);
        const mat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.7
        });
        const p = new THREE.Mesh(geo, mat);
        p.position.copy(pos);
        this.scene.add(p);
        this.trailParticles.push({ mesh: p, life: 1.0 });
    }

    /**
     * Update trail particles (fade and remove expired ones).
     * @param {number} dt  Delta time in seconds.
     */
    updateTrail(dt = 1 / 60) {
        for (let i = this.trailParticles.length - 1; i >= 0; i--) {
            const p = this.trailParticles[i];
            p.life -= dt * 1.5; // Increased fade speed (approx 0.7s lifetime)
            const scale = Math.max(0.1, p.life);
            p.mesh.scale.setScalar(scale);
            p.mesh.material.opacity = Math.max(0, p.life);

            if (p.life <= 0) {
                this.scene.remove(p.mesh);
                if (p.mesh.geometry) p.mesh.geometry.dispose();
                if (p.mesh.material) p.mesh.material.dispose();
                this.trailParticles.splice(i, 1);
            }
        }
    }

    /**
     * Spawn trail particles when player is moving fast enough.
     * @param {THREE.Vector3} playerPos  Player position.
     * @param {THREE.Vector3} playerVel  Player velocity.
     * @param {boolean} isGrounded       Whether player is on ground.
     */
    updateMovementTrail(playerPos, playerVel, isGrounded) {
        if (playerPos && playerVel && isGrounded && playerVel.lengthSq() > 10) {
            const up = playerPos.clone().normalize();
            // Offset adjusted to sit exactly at the player's feet (approx 1.0 units below center)
            const trailPos = playerPos.clone().sub(up.clone().multiplyScalar(0.95));
            this.spawnTrail(trailPos);
        }
    }

    // ── Player torch management ──────────────────────────────────────────

    /**
     * Initialize player torch and material references for day/night effects.
     * Call this after player is fully constructed.
     * @param {THREE.PointLight} torch    The player's torch light
     * @param {THREE.Material}   material The player's body material
     */
    /**
     * Sync the VFX system with the current day/night state.
     * @param {boolean} isNight
     */
    setNightMode(isNight) {
        this._isNight = isNight;
        // Update any live decals immediately
        const tint = isNight
            ? (VFX.landingDecal.nightColor ?? COLORS.white)
            : (VFX.landingDecal.dayColor ?? COLORS.black);
        for (const d of this.decals) {
            d.mesh.material.color.setHex(tint);
        }
    }

    /**
     * Spawn a single particle into the pool.
     *
     * @param {THREE.Vector3} pos          World-space spawn position.
     * @param {THREE.Vector3} vel          Initial velocity.
     * @param {THREE.Color}   color        Particle colour.
     * @param {number}        [lifetime=1] Seconds before the particle expires.
     * @param {number}        [gravity=1]  Scale applied to the gravity pull
     *                                     toward the planet centre (0 = weightless).
     */
    spawnParticle(pos, vel, color, lifetime = 1, gravity = 1) {
        const i = this._nextParticle;
        this._nextParticle = (this._nextParticle + 1) % this.MAX_PARTICLES;

        this.lifetimes[i] = lifetime;
        this.gravityScales[i] = gravity;
        this.velocities[i].copy(vel);

        const posAttr = this.geom.attributes.position;
        posAttr.array[i * 3] = pos.x;
        posAttr.array[i * 3 + 1] = pos.y;
        posAttr.array[i * 3 + 2] = pos.z;
        posAttr.needsUpdate = true;

        const colAttr = this.geom.attributes.color;
        colAttr.array[i * 3] = color.r;
        colAttr.array[i * 3 + 1] = color.g;
        colAttr.array[i * 3 + 2] = color.b;
        colAttr.needsUpdate = true;
    }

    // =========================================================================
    // Emission helpers
    // =========================================================================

    /**
     * Emit trail particles while the player is moving.
     * Color changes based on day/night mode for visibility.
     * @param {THREE.Vector3} pos  player world position
     * @param {THREE.Vector3} up   normalised up vector at that point
     */
    emitTrail(pos, up) {
        const color = this._isNight
            ? new THREE.Color(COLORS.cyan)
            : new THREE.Color(COLORS.brown);

        const vel = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
            .normalize()
            .multiplyScalar(0.5)
            .add(up.clone().multiplyScalar(0.2));

        const p = pos.clone().sub(up.clone().multiplyScalar(1.2));
        this.spawnParticle(p, vel, color, 1.0, 0.3);
    }

    /**
     * Emit a small burst of landing dust at the player's feet.
     * @param {THREE.Vector3} pos  player world position
     * @param {THREE.Vector3} up   normalised up vector at that point
     */
    emitDust(pos, up) {
        const color = new THREE.Color(COLORS.dust);
        for (let i = 0; i < 2; i++) {
            const vel = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
                .normalize()
                .multiplyScalar(3)
                .add(up.clone().multiplyScalar(2));

            const p = pos.clone()
                .add(new THREE.Vector3().randomDirection().multiplyScalar(0.5))
                .sub(up.clone().multiplyScalar(1.0));

            this.spawnParticle(p, vel, color, 0.4 + Math.random() * 0.4);
        }
    }

    /**
     * Spawn a single slow-drifting ambient particle near the player.
     * Internally skips ~90 % of frames via a random gate.
     *
     * @param {THREE.Vector3} playerPos  Current player world position.
     */
    emitAmbientDust(playerPos) {
        if (Math.random() > 0.1) return; // Back to normal spawn rate
        const color = new THREE.Color(COLORS.cyan);
        const offset = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
            .normalize()
            .multiplyScalar(15 + Math.random() * 10);
        const vel = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(0.5);
        this.spawnParticle(
            playerPos.clone().add(offset),
            vel,
            color,
            5 + Math.random() * 5,
            0.0
        );
    }

    /**
     * Explode a colourful firework above the player's position.
     *
     * @param {THREE.Vector3} pos  Player world position.
     * @param {THREE.Vector3} up   Normalised up vector (burst offset direction).
     */
    emitFirework(pos, up) {
        const palette = [
            new THREE.Color(COLORS.orange),
            new THREE.Color(COLORS.cyan),
            new THREE.Color(COLORS.green),
        ];
        const color = palette[Math.floor(Math.random() * palette.length)];
        const origin = pos.clone().add(up.clone().multiplyScalar(6));

        for (let i = 0; i < 200; i++) {
            const vel = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
                .normalize()
                .multiplyScalar(15 + Math.random() * 20);
            this.spawnParticle(origin, vel, color, 1.5 + Math.random() * 1.5);
        }
    }

    /**
     * Stamp a decal onto the planet surface directly below `pos`.
     *
     * @param {THREE.Vector3} pos  Player world position at the moment of landing.
     * @param {THREE.Vector3} up   Normalised up vector at that planet surface point.
     */
    emitLandingDecal(pos, up) {
        if (!this.decalMat) return;

        const raycaster = new THREE.Raycaster(
            pos.clone().add(up.clone().multiplyScalar(2)),
            up.clone().multiplyScalar(-1)
        );
        const hits = raycaster.intersectObject(this.planetMesh);

        if (hits.length > 0) {
            const hit = hits[0];
            // Fallback for older Three.js versions or non-mesh intersections
            const normal = hit.normal || (hit.face ? hit.face.normal : up);
            
            const size = new THREE.Vector3(
                VFX.landingDecal.size,
                VFX.landingDecal.size,
                VFX.landingDecal.size * 2 // Deepen projection box to handle curvature
            );

            const m = new THREE.Matrix4();
            let dummyUp = new THREE.Vector3(0, 1, 0);
            if (Math.abs(normal.dot(dummyUp)) > 0.9) dummyUp.set(1, 0, 0);
            m.lookAt(hit.point, hit.point.clone().add(normal), dummyUp);
            
            const orientation = new THREE.Euler().setFromRotationMatrix(m);
            // Randomize spin for organic 'splat' look like the prototype
            orientation.z = Math.random() * Math.PI * 2;

            const geom = new DecalGeometry(this.planetMesh, hit.point, orientation, size);
            const mat = this.getDecalMaterial();
            if (!mat) return;

            const mesh = new THREE.Mesh(geom, mat);
            this.scene.add(mesh);
            this.decals.push({
                mesh,
                life: VFX.landingDecal.lifetime,
                maxLife: VFX.landingDecal.lifetime,
            });
        }
    }

    // =========================================================================
    // Main update — call once per frame
    // =========================================================================

    /**
     * Advances all VFX subsystems by one frame.
     *
     * @param {number}        dt           Delta time in seconds.
     * @param {THREE.Vector3} [playerPos]  Required for dust / ambient dust.
     * @param {THREE.Vector3} [playerVel]  Required for movement-dust speed gate.
     * @param {boolean}       [isGrounded] Whether the player is on the ground.
     */
    update(dt, playerPos, playerVel, isGrounded) {

        // ── Particle pool ─────────────────────────────────────────────────
        const posAttr = this.geom.attributes.position;
        let needsUpdate = false;

        for (let i = 0; i < this.lifetimes.length; i++) {
            if (this.lifetimes[i] > 0) {
                this.lifetimes[i] -= dt;

                const p = new THREE.Vector3(
                    posAttr.array[i * 3],
                    posAttr.array[i * 3 + 1],
                    posAttr.array[i * 3 + 2]
                );

                const up = p.clone().normalize();

                this.velocities[i].addScaledVector(up, -20 * dt * this.gravityScales[i]);
                p.add(this.velocities[i].clone().multiplyScalar(dt));

                posAttr.array[i * 3] = p.x;
                posAttr.array[i * 3 + 1] = p.y;
                posAttr.array[i * 3 + 2] = p.z;

                if (this.lifetimes[i] <= 0) posAttr.array[i * 3] = 99999;

                needsUpdate = true;
            }
        }
        if (needsUpdate) posAttr.needsUpdate = true;

        // ── Movement trail handled by Player class ─────────────────────────

        // ── Ambient atmospheric dust ──────────────────────────────────────
        if (playerPos) this.emitAmbientDust(playerPos);

        // ── Player trail system ───────────────────────────────────────────
        this.updateMovementTrail(playerPos, playerVel, isGrounded);
        this.updateTrail(dt);

        // ── Decals: fade out then clean up ────────────────────────────────
        for (let i = this.decals.length - 1; i >= 0; i--) {
            const d = this.decals[i];
            d.life -= dt;
            d.mesh.material.opacity = Math.max(0, d.life / d.maxLife);

            if (d.life <= 0) {
                this.scene.remove(d.mesh);
                d.mesh.geometry.dispose();
                d.mesh.material.dispose();
                this.decals.splice(i, 1);
            }
        }

        // ── Bird flock ────────────────────────────────────────────────────
        this.birdData.forEach(bird => {
            bird.phase += dt * 10;

            const bPos = bird.mesh.position;
            const up = bPos.clone().normalize();

            const alt = bPos.length();
            const targetAlt = this.planetR + 15; // Bring birds closer to planet surface
            if (alt > targetAlt) bird.vel.addScaledVector(up, -5 * dt);
            if (alt < targetAlt) bird.vel.addScaledVector(up, 5 * dt);

            bPos.add(bird.vel.clone().multiplyScalar(dt));
            bPos.add(up.clone().multiplyScalar(Math.sin(bird.phase) * 0.08));

            bird.mesh.position.copy(bPos);
            bird.mesh.up.copy(up);

            if (bird.vel.lengthSq() > 0.01) {
                bird.mesh.lookAt(bPos.clone().add(bird.vel));
            }
        });
    }
}