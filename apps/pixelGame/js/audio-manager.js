// Audio Manager for Pixel Game
// Handles all sound effects using Howler.js

class AudioManager {
    constructor() {
        this.sounds = {};
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        console.log('Initializing AudioManager...');
        
        // Initialize all sound effects
        this.sounds.collectable = new Howl({
            src: ['https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'],
            volume: 0.5,
            preload: true,
            onload: () => console.log('Collectable sound loaded'),
            onloaderror: () => console.error('Failed to load collectable sound')
        });

        this.sounds.checkpoint = new Howl({
            src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'],
            volume: 0.7,
            preload: true,
            onload: () => console.log('Checkpoint sound loaded'),
            onloaderror: () => console.error('Failed to load checkpoint sound')
        });

        this.sounds.npc = new Howl({
            src: ['https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3'],
            volume: 0.6,
            preload: true,
            onload: () => console.log('NPC sound loaded'),
            onloaderror: () => console.error('Failed to load NPC sound')
        });

        this.initialized = true;
        console.log('AudioManager initialized successfully');
    }

    playCollectable() {
        if (!this.initialized) {
            console.warn('AudioManager not initialized');
            return;
        }
        this.sounds.collectable.play();
    }

    playCheckpoint() {
        if (!this.initialized) {
            console.warn('AudioManager not initialized');
            return;
        }
        this.sounds.checkpoint.play();
    }

    playNPC() {
        if (!this.initialized) {
            console.warn('AudioManager not initialized');
            return;
        }
        this.sounds.npc.play();
    }

    // Global access to audio manager
    static getInstance() {
        if (!window.audioManager) {
            window.audioManager = new AudioManager();
        }
        return window.audioManager;
    }

    // Mute/unmute all sounds
    setMuted(muted) {
        Howler.mute(muted);
    }

    // Set global volume
    setVolume(volume) {
        Howler.volume(volume);
    }
}

// Initialize audio manager when script loads
window.audioManager = new AudioManager();
audioManager.init();