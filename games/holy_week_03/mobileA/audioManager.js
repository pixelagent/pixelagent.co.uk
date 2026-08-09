// audioManager.js — handles sound effects for game events using Web Audio API
export class AudioManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
    this.bgMusic = null;  // Howler for background music
    this.timeAmbience = null;  // Day/night Howl instance
    this.currentAct = null;

    const basePath = './../assets/audio/';
    const musicPath = './../assets/music/';
   this.sounds = {
      collect: basePath + 'ping_pong.mp3',
      clue: basePath + 'ping_pong.mp3',
      complete: basePath + 'ping_pong.mp3',
      talk: basePath + 'ping_pong.mp3',
      error: basePath + 'ping_pong.mp3',
      ui: basePath + 'ping_pong.mp3',
      morning: basePath + 'day.mp3',
      outdoor: basePath + 'day.mp3',
      day: basePath + 'day.mp3'
    };

    // Background music tracks for each act
    this.bgTracks = {
      'Act I - The Triumphal Entry': musicPath + 'act1_sunlight_on_marble.mp3',
      'Act II - The Temple Courts': musicPath + 'act2_shackles_on_the_stone.mp3',
      'Act III - The Last Supper': musicPath + 'act3_laurel_and_iron.mp3',
      'Act IV - The Resurrection': musicPath + 'act4_victory_at_the_sunlit_gate.mp3'
    };
    this.audioContext = null;
    this.ambienceSources = {};

    // Initialize audio context on first user interaction (required by browsers)
    this._initAudioContext = this._initAudioContext.bind(this);
    document.addEventListener('click', this._initAudioContext);
    document.addEventListener('keydown', this._initAudioContext);

    // Bind play methods to ensure they can be called from event listeners
    this.playCollect = this.playCollect.bind(this);
    this.playClue = this.playClue.bind(this);
    this.playComplete = this.playComplete.bind(this);
    this.playTalk = this.playTalk.bind(this);
    this.playError = this.playError.bind(this);
    this.playRumble = this.playRumble.bind(this);
    this.playUI = this.playUI.bind(this);
    this.playBonus = this.playBonus.bind(this);
    this.playHighStakes = this.playHighStakes.bind(this);
  }

  _initAudioContext() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this._createAmbienceOscillators();
      }

      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      if (this.audioContext.state === 'running') {
        document.removeEventListener('click', this._initAudioContext);
        document.removeEventListener('keydown', this._initAudioContext);
      }
    } catch (e) { /* Silently wait for next gesture */ }
  }

  _createAmbienceOscillators() {
    // Morning ambience - gentle birds-like sound (higher frequency, irregular)
    this.ambienceSources.morning = {
      oscillator: this.audioContext.createOscillator(),
      gain: this.audioContext.createGain(),
      filter: this.audioContext.createBiquadFilter(),
      active: false
    };

    // Outdoor ambience - deeper, more constant sound (lower frequency)
    this.ambienceSources.outdoor = {
      oscillator: this.audioContext.createOscillator(),
      gain: this.audioContext.createGain(),
      filter: this.audioContext.createBiquadFilter(),
      active: false
    };

    // Configure morning ambience (bird-like chirps)
    this.ambienceSources.morning.oscillator.type = 'sine';
    this.ambienceSources.morning.filter.type = 'bandpass';
    this.ambienceSources.morning.filter.frequency.value = 800; // Bird-like frequency
    this.ambienceSources.morning.filter.Q.value = 2;
    this.ambienceSources.morning.gain.gain.value = 0;

    // Configure outdoor ambience (deeper, constant tone)
    this.ambienceSources.outdoor.oscillator.type = 'sine';
    this.ambienceSources.outdoor.filter.type = 'lowpass';
    this.ambienceSources.outdoor.filter.frequency.value = 200; // Deeper tone
    this.ambienceSources.outdoor.filter.Q.value = 1;
    this.ambienceSources.outdoor.gain.gain.value = 0;

    // Connect the chains: oscillator -> filter -> gain -> destination
    this.ambienceSources.morning.oscillator.connect(this.ambienceSources.morning.filter);
    this.ambienceSources.morning.filter.connect(this.ambienceSources.morning.gain);
    this.ambienceSources.morning.gain.connect(this.audioContext.destination);

    this.ambienceSources.outdoor.oscillator.connect(this.ambienceSources.outdoor.filter);
    this.ambienceSources.outdoor.filter.connect(this.ambienceSources.outdoor.gain);
    this.ambienceSources.outdoor.gain.connect(this.audioContext.destination);

    // Start oscillators
    this.ambienceSources.morning.oscillator.start();
    this.ambienceSources.outdoor.oscillator.start();
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      // Stop any playing sounds by setting gain to 0
      Object.values(this.ambienceSources).forEach(source => {
        if (source.active) {
          source.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
          source.active = false;
        }
      });
      // Stop background music
      this.stopBackgroundMusic();
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));

    // Update ambience volumes
    Object.values(this.ambienceSources).forEach(source => {
      if (source.active) {
        // Ambience is quieter than effects
        source.gain.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
      }
    });
  }

  play(event) {
    if (!this.enabled) return;

    // Use Howler sounds if available, otherwise fall back to oscillator
    if (this.sounds[event]) {
      const sound = new Howl({
        src: [this.sounds[event]],
        volume: this.volume * 0.5
      });
      sound.play();
      return;
    }

    // Fallback to oscillator for events without sound files
    if (!this.audioContext || this.audioContext.state === 'suspended') return;
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    switch (event) {
      case 'bonus':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(500, now);
        oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        break;
      default:
        oscillator.disconnect();
        gain.disconnect();
        return;
    }
    oscillator.start(now);
    oscillator.stop(now + 0.5);
  }

  // Convenience methods for specific events
  playCollect() { this.play('collect'); }
  playClue() { this.play('clue'); }
  playComplete() { this.play('complete'); }
  playTalk() { this.play('talk'); }
  playError() { this.play('error'); }
  playRumble() { this.play('rumble'); }
  playBonus() { this.play('bonus'); }
  playHighStakes() { this.play('highStakes'); }

  // Ambience controls
  playMorningAmbience() {
    if (!this.enabled || !this.audioContext) return;

    // Initialize audio context if needed
    if (!this.ambienceSources.morning) {
      this._createAmbienceOscillators();
    }

    const source = this.ambienceSources.morning;
    if (!source.active) {
      // Create irregular bird-like chirping pattern
      const chirp = () => {
        if (!this.enabled || !this.audioContext) return;

        // Random frequency between 600-1000 Hz for bird-like sound
        const freq = 600 + Math.random() * 400;
        source.oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);

        // Quick attack and decay
        source.gain.gain.cancelScheduledValues(this.audioContext.currentTime);
        source.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        source.gain.gain.linearRampToValueAtTime(this.volume * 0.15, this.audioContext.currentTime + 0.01);
        source.gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);

        source.active = true;

        // Schedule next chirp (random interval between 1-3 seconds)
        setTimeout(chirp, 1000 + Math.random() * 2000);
      };

      // Start the chirping pattern
      chirp();
    }
  }

  playOutdoorAmbience() {
    if (!this.enabled || !this.audioContext) return;

    // Initialize audio context if needed
    if (!this.ambienceSources.outdoor) {
      this._createAmbienceOscillators();
    }

    const source = this.ambienceSources.outdoor;
    if (!source.active) {
      // Constant deeper outdoor ambience
      source.gain.gain.cancelScheduledValues(this.audioContext.currentTime);
      source.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
      source.gain.gain.linearRampToValueAtTime(this.volume * 0.1, this.audioContext.currentTime + 0.1);

      source.active = true;
    }
  }


  // Background music with crossfade between acts
  fadeToAct(actLabel, duration = 2) {
    if (!this.enabled || !this.bgTracks[actLabel] || actLabel === this.currentAct) return;

    const fadeTime = duration * 500; // ms

    // Fade out current track
    if (this.bgMusic) {
      this.bgMusic.fade(this.bgMusic.volume(), 0, fadeTime);
      setTimeout(() => {
        if (this.bgMusic) {
          this.bgMusic.stop();
          this.bgMusic = null;
        }
      }, fadeTime);
    }

    // Fade in new track
    this.bgMusic = new Howl({
      src: [this.bgTracks[actLabel]],
      volume: 0,
      loop: true
    });

    this.bgMusic.play();
    this.bgMusic.fade(0, this.volume * 0.8, fadeTime * 1.6);
    this.currentAct = actLabel;
  }

  stopBackgroundMusic() {
    if (this.bgMusic) {
      this.bgMusic.fade(this.bgMusic.volume(), 0, 300);
      setTimeout(() => {
        if (this.bgMusic) {
          this.bgMusic.stop();
          this.bgMusic = null;
        }
      }, 300);
    }
  }

  playUI() {
    if (!this.enabled) return;
    if (this.sounds.ui) {
      const sound = new Howl({ src: [this.sounds.ui], volume: this.volume * 0.3 });
      sound.play();
    }
  }

  // Day/night ambient based on case timeOfDay
  playTimeAmbience(timeOfDay) {
    if (!this.enabled) return;
    const key = timeOfDay === 'night' ? 'night' : 'day';
    if (!this.sounds[key]) return;
    this.stopTimeAmbience();
    this.timeAmbience = new Howl({
      src: [this.sounds[key]],
      volume: this.volume * 0.4,
      loop: true
    });
    this.timeAmbience.play();
  }

  stopTimeAmbience() {
    if (this.timeAmbience) {
      this.timeAmbience.fade(this.timeAmbience.volume(), 0, 300);
      setTimeout(() => {
        if (this.timeAmbience) {
          this.timeAmbience.stop();
          this.timeAmbience = null;
        }
      }, 300);
    }
  }

  stopAllAmbience() {
    if (!this.audioContext) return;

    Object.values(this.ambienceSources).forEach(source => {
      if (source.active) {
        source.gain.gain.cancelScheduledValues(this.audioContext.currentTime);
        source.gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
        source.active = false;
      }
    });
  }
}
