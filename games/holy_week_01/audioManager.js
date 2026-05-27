// audioManager.js — handles sound effects for game events using Web Audio API
export class AudioManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
    this.audioContext = null;
    this.ambienceSources = {};
    
    // Initialize audio context on first user interaction (required by browsers)
    this._initAudioContext = this._initAudioContext.bind(this);
    
    // Bind play methods to ensure they can be called from event listeners
    this.playCollect = this.playCollect.bind(this);
    this.playClue = this.playClue.bind(this);
    this.playComplete = this.playComplete.bind(this);
    this.playTalk = this.playTalk.bind(this);
    this.playError = this.playError.bind(this);
  }

  _initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create ambience oscillators
      this._createAmbienceOscillators();
      
      // Remove the listener after first use
      document.removeEventListener('click', this._initAudioContext);
      document.removeEventListener('keydown', this._initAudioContext);
    }
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
    // Initialize audio context on first interaction if needed
    if (!this.audioContext) {
      this._initAudioContext();
    }
    
    if (!this.enabled || !this.audioContext) return;
    
    // Create different sounds for different events
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    // Connect oscillator to gain to destination
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    
    // Configure based on event type
    switch(event) {
      case 'collect':
        // Pleasant high chirp
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        break;
        
      case 'clue':
        // Rising arpeggio
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.2, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        break;
        
      case 'complete':
        // Triumphant chord (three notes)
        const playChord = (baseFreq, delay) => {
          setTimeout(() => {
            if (!this.enabled || !this.audioContext) return;
            const osc = this.audioContext.createOscillator();
            const g = this.audioContext.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(baseFreq, now + delay);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + delay + 0.2);
            g.gain.setValueAtTime(0, now + delay);
            g.gain.linearRampToValueAtTime(this.volume * 0.2, now + delay + 0.01);
            g.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.3);
            osc.connect(g);
            g.connect(this.audioContext.destination);
            osc.start(now + delay);
            osc.stop(now + delay + 0.5);
          }, delay * 1000);
        };
        
        playChord(220, 0);   // A3
        playChord(277, 0.2); // C#4
        playChord(330, 0.4); // E4
        break;
        
      case 'talk':
        // Soft blip
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.1, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        break;
        
      case 'error':
        // Harsh buzz
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.4, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        break;
        
      default:
        oscillator.disconnect();
        gain.disconnect();
        return;
    }
    
    // Start and stop the sound
    oscillator.start(now);
    oscillator.stop(now + 0.5); // Auto-stop after 0.5 seconds
  }

  // Convenience methods for specific events
  playCollect() { this.play('collect'); }
  playClue() { this.play('clue'); }
  playComplete() { this.play('complete'); }
  playTalk() { this.play('talk'); }
  playError() { this.play('error'); }

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