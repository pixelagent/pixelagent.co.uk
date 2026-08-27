import * as THREE from 'three';
import * as Partykals from 'partykals';

export class ParticleManager {
    constructor(scene) {
        this.scene = scene;
        // The original Partykals library does not have a global manager.
        // Each effect is a `ParticlesSystem`. We will manage these systems.
        this.activeSystems = new Set();

        // Pre-defined system configurations based on the original Partykals API
        this.systemConfigs = {
            manaPickup: {
                particles: {
                    // Partykals uses THREE.Color and separate alpha properties.
                    startColor: new THREE.Color(0.2, 0.5, 1.0),
                    endColor: new THREE.Color(0.5, 0.8, 1.0),
                    startAlpha: 1.0,
                    endAlpha: 0,
                    startSize: 0.1,
                    endSize: 0.3,
                    // sizeRandomness is not a direct property, but we can use a randomizer.
                    size: new Partykals.Randomizers.MinMaxRandomizer(0.1 - 0.05, 0.1 + 0.05),
                    lifetime: 0.5,
                    velocity: new Partykals.Randomizers.SphereRandomizer(0.5),
                    velocityBonus: new THREE.Vector3(0, 1, 0),
                    worldPosition: true, // Particles should burst in world space
                },
                system: {
                    ttl: 0.1, // Emitter duration
                    particlesCount: 50, // Max particles for this one-shot effect
                    emitters: new Partykals.Emitter({
                        onInterval: 1,
                        interval: 1 / 50, // for a rate of 50/sec
                        onSpawnBurst: 20,
                    }),
                    perspective: true,
                    scale: 600,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                }
            },
            dust: {
                particles: {
                    startColor: new THREE.Color(0.72, 0.58, 0.45),
                    endColor: new THREE.Color(0.82, 0.72, 0.6),
                    startAlpha: 0.35,
                    endAlpha: 0,
                    startSize: 0.04,
                    endSize: 0.14,
                    sizeRandomness: 0.2,
                    lifetime: 0.5,
                    // Small random spread + a bias DOWN and BEHIND the player (local -Z is "behind"
                    // the facing direction, local -Y is down). This makes the trail kick up at the
                    // feet and drift backward rather than puffing upward like a chimney.
                    velocity: new Partykals.Randomizers.SphereRandomizer(0.15),
                    velocityBonus: new THREE.Vector3(0, -0.06, -0.18),
                    worldPosition: true, // Dust stays put in the world as the player walks away
                },
                system: {
                    ttl: Infinity, // Continuous effect
                    particlesCount: 14, // Few, subtle puffs (was 50)
                    emitters: new Partykals.Emitter({
                        onInterval: 1,
                        interval: 1 / 18, // ~18 puffs/sec (was 30)
                    }),
                    perspective: true,
                    scale: 600,
                    depthWrite: false,
                    blending: THREE.NormalBlending,
                }
            },
            smoke: {
                particles: {
                    startColor: new THREE.Color(0x333333),
                    endColor: new THREE.Color(0x555555),
                    startAlpha: 0.7,
                    endAlpha: 0,
                    startSize: 0.1,
                    endSize: 1.5,
                    sizeRandomness: 0.4,
                    lifetime: 4,
                    velocity: new Partykals.Randomizers.SphereRandomizer(0.3),
                    velocityBonus: new THREE.Vector3(0, 0.8, 0),
                    worldPosition: true,
                },
                system: {
                    ttl: Infinity, // Continuous
                    particlesCount: 100,
                    emitters: new Partykals.Emitter({
                        onInterval: 1,
                        interval: 1 / 20, // rate of 20/sec
                    }),
                    perspective: true,
                    scale: 600,
                    depthWrite: false,
                    blending: THREE.NormalBlending,
                }
            },
            embers: {
                particles: {
                    startColor: new THREE.Color(0xffddaa),
                    endColor: new THREE.Color(0xff4400),
                    startAlpha: 1.0,
                    endAlpha: 0,
                    startSize: 0.05,
                    endSize: 0.01,
                    lifetime: 1.5,
                    velocity: new Partykals.Randomizers.SphereRandomizer(0.4),
                    velocityBonus: new THREE.Vector3(0, 0.6, 0),
                    worldPosition: true,
                },
                system: {
                    ttl: Infinity, // Continuous
                    particlesCount: 50,
                    emitters: new Partykals.Emitter({
                        onInterval: 1,
                        interval: 1 / 10, // rate of 10/sec
                    }),
                    perspective: true,
                    scale: 600,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                }
            },
            market: {
                particles: {
                    startColor: new THREE.Color(0.9, 0.7, 0.2), // Gold
                    endColor: new THREE.Color(1.0, 1.0, 0.8),   // Bright yellow
                    startAlpha: 1.0,
                    endAlpha: 0,
                    startSize: 0.05,
                    endSize: 0.25,
                    lifetime: 0.7,
                    velocity: new Partykals.Randomizers.SphereRandomizer(1.8),
                    velocityBonus: new THREE.Vector3(0, 0.8, 0),
                    worldPosition: true, // Particles stay in world space
                },
                system: {
                    ttl: 0.1, // A very short burst
                    particlesCount: 80,
                    emitters: new Partykals.Emitter({
                        onSpawnBurst: 80,
                    }),
                    perspective: true,
                    scale: 600,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                }
            },
            oasis: {
                // TODO: Configuration for mist
            },
            campfire: {
                particles: {
                    // Licking orange/yellow flame particles, layered on top of smoke + embers.
                    startColor: new THREE.Color(1.0, 0.75, 0.15),
                    endColor: new THREE.Color(1.0, 0.25, 0.05),
                    startAlpha: 0.9,
                    endAlpha: 0,
                    startSize: 0.18,
                    endSize: 0.02,
                    sizeRandomness: 0.1,
                    lifetime: 0.4,
                    velocity: new Partykals.Randomizers.SphereRandomizer(0.15),
                    velocityBonus: new THREE.Vector3(0, 1.4, 0),
                    worldPosition: true,
                },
                system: {
                    ttl: Infinity, // Continuous
                    particlesCount: 40,
                    emitters: new Partykals.Emitter({
                        onInterval: 1,
                        interval: 1 / 25, // rate of 25/sec
                    }),
                    perspective: true,
                    scale: 600,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                }
            },
            sparkle: {
                particles: {
                    // Slow, gentle golden sparkles drifting up around the temple.
                    startColor: new THREE.Color(1.0, 0.85, 0.3),
                    endColor: new THREE.Color(1.0, 1.0, 0.75),
                    startAlpha: 1.0,
                    endAlpha: 0,
                    startSize: 0.04,
                    endSize: 0.14,
                    sizeRandomness: 0.1,
                    lifetime: 1.6,
                    velocity: new Partykals.Randomizers.SphereRandomizer(0.2),
                    velocityBonus: new THREE.Vector3(0, 0.35, 0),
                    worldPosition: true,
                },
                system: {
                    ttl: Infinity, // Continuous
                    particlesCount: 45,
                    emitters: new Partykals.Emitter({
                        onInterval: 1,
                        interval: 1 / 8, // rate of 8/sec, gentle
                    }),
                    perspective: true,
                    scale: 600,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                }
            },
            confetti: {
                particles: {
                    // Bright, varied party colors that pop and drift down like confetti.
                    color: new Partykals.Randomizers.ColorsRandomizer(
                        new THREE.Color(1.0, 0.2, 0.4),
                        new THREE.Color(0.2, 0.7, 1.0)
                    ),
                    startAlpha: 1.0,
                    endAlpha: 0,
                    startSize: 0.12,
                    endSize: 0.1,
                    sizeRandomness: 0.3,
                    lifetime: 1.6,
                    velocity: new Partykals.Randomizers.BoxRandomizer(
                        new THREE.Vector3(-0.8, 1.2, -0.8),
                        new THREE.Vector3(0.8, 2.2, 0.8)
                    ),
                    velocityBonus: new THREE.Vector3(0, -0.9, 0), // gravity pulling confetti back down
                    worldPosition: true,
                },
                system: {
                    ttl: Infinity, // Continuous festive atmosphere at the market
                    particlesCount: 60,
                    emitters: new Partykals.Emitter({
                        onInterval: 1,
                        interval: 1 / 12, // rate of 12/sec
                    }),
                    perspective: true,
                    scale: 600,
                    depthWrite: false,
                    blending: THREE.NormalBlending,
                }
            },
            rain: {
                // TODO: Configuration for rain
            },
            magic: {
                // TODO: Configuration for magic burst
            }
        };
    }

    /**
     * Creates and starts a particle system.
     * @param {string} name - The name of the effect to create (e.g., 'manaPickup').
     * @param {THREE.Vector3 | THREE.Object3D} [target] - The position to spawn or object to attach the emitter to.
     * @returns {Partykals.ParticlesSystem | undefined} The created system instance.
     */
    createEmitter(name, target) {
        const config = this.systemConfigs[name];
        if (!config) {
            console.warn(`Particle effect "${name}" not found.`);
            return;
        }

        // The original library adds the system to a container you provide in options.
        const finalConfig = { ...config };
        if (target && target instanceof THREE.Object3D) {
            finalConfig.container = target;
        } else {
            finalConfig.container = this.scene;
        }

        const system = new Partykals.ParticlesSystem(finalConfig);

        if (target) {
            if (target instanceof THREE.Vector3) {
                // Spawn at a static position
                system.particleSystem.position.copy(target);
            }
        }

        this.activeSystems.add(system);

        return system;
    }

    /**
     * Stops and removes a given particle system.
     * @param {Partykals.ParticlesSystem} system - The system to stop.
     * @param {boolean} [graceful=true] - If true, stops emission and waits for particles to die. If false, removes immediately.
     */
    stopEmitter(system, graceful = true) {
        if (!system || !this.activeSystems.has(system)) return;

        if (graceful) {
            // To stop emission, set the system's ttl to 0.
            // The update loop will handle cleanup when all particles are dead.
            system.ttl = 0;
        } else {
            // Immediate removal
            if (system.particleSystem.parent) {
                system.particleSystem.parent.remove(system.particleSystem);
            }
            system.dispose();
            this.activeSystems.delete(system);
        }
    }

    /**
     * Updates all active particle systems.
     * @param {number} deltaTime - The time since the last frame in seconds.
     */
    update(deltaTime) {
        // Use a copy of the set to iterate over, to avoid issues with modification during iteration
        const systemsToUpdate = new Set(this.activeSystems);
        for (const system of systemsToUpdate) {
            system.update(deltaTime);

            // The system is finished when its TTL has expired and all particles are dead.
            if (system.finished) {
                this.stopEmitter(system, false); // remove immediately
            }
        }
    }
}