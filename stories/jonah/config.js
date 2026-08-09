/**
 * CONFIG.JS
 * A single source of truth for all settings and constants.
 */

const CONFIG = {
    paths: {
        scenes: 'data/scenes.json',
        tileset: 'data/main_tileset.json',
        maps: 'data/',
        epilogues: 'data/epilogues.json',
        dialogueDir: 'data/dialogue/'
    },

    transitions: {
        textFadeOutDuration: 400,
        textFadeOutEasing: 'easeInQuad'
    },

    compass: {
        indicatorSelector: '#compass-indicator',
        neutralThreshold: 15
    },

    isometric: {
        camera: {
            frustumSize: 15,
            rotationDeg: 45,
            angleDeg: 35.264,
            followSpeed: 2.0 // Higher is faster
        },
        movement: {
            speed: 5, // units per second
            hotspotRadius: 1.5
        }
    },

    beats: {
        act2: {
            prayerFullHoldMs: 4000
        }
    },

    postProduction: {
        bloom: {
            strength: 0.8,
            radius: 0.5,
            threshold: 0.85
        },
        vignette: {
            darkness: 1.0
        },
        palettes: {
            sea: {
                bloomStrength: 0.8,
                bloomRadius: 0.5,
                vignetteDarkness: 1.0
            },
            desert: {
                bloomStrength: 0.5,
                bloomRadius: 0.7,
                vignetteDarkness: 1.2
            }
        }
    }
};