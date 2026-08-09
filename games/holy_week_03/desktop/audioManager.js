// audioManager.js — handles sound effects and ambience using Howler.js
export class AudioManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.3;

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
    this.actMusicMap = {
      'Act I - The Triumphal Entry': musicPath + 'act1_sunlight_on_marble.mp3',
      'Act II - The Temple Courts': musicPath + 'act2_shackles_on_the_stone.mp3',
      'Act III - The Last Supper': musicPath + 'act3_laurel_and_iron.mp3',
      'Act IV - The Resurrection': musicPath + 'act4_victory_at_the_sunlit_gate.mp3'
    };

    this._howls = {};
    this.bgMusic = null;
    this.currentActLabel = null;
    this.currentAmbient = null;

    // Sync Howler global state with initial manager settings immediately
    if (typeof Howler !== 'undefined') {
      Howler.volume(this.volume);
      Howler.mute(!this.enabled);
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (typeof Howler !== 'undefined') {
      Howler.mute(!enabled);
      if (this.bgMusic) {
        if (enabled) {
          if (!this.bgMusic.playing()) this.bgMusic.play();
          this.bgMusic.fade(0, 0.3, 1000);
        } else {
          this.bgMusic.fade(this.bgMusic.volume() || 0, 0, 1000);
          setTimeout(() => { if (this.bgMusic) this.bgMusic.pause(); }, 1000);
        }
      }
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (typeof Howler !== 'undefined') {
      Howler.volume(this.volume);
    }
  }

  play(event, loop = false) {
    if (!this.enabled || typeof Howl === 'undefined') return;

    if (!this._howls[event]) {
      const src = this.sounds[event];
      if (!src) {
        console.warn(`No sound source for event: ${event}`);
        return;
      }
      this._howls[event] = new Howl({
        src: [src],
        loop: loop,
        volume: loop ? 0.6 : 1.0,
        html5: true, // Required for file:// protocol compatibility and reliable loading
        onloaderror: () => {
          console.warn(`[Audio] Failed to load sound: ${event} (${src})`);
          delete this._howls[event];
        }
      });
    }
    if (loop && this._howls[event].playing()) return;
    this._howls[event].play();
  }

  updateActMusic(actLabel) {
    if (this.currentActLabel === actLabel) return;
    this.currentActLabel = actLabel;

    const nextTrackPath = this.actMusicMap[actLabel];
    const fadeTime = 4000;

    const startNext = () => {
      if (!nextTrackPath) {
        this.bgMusic = null;
        return;
      }
      this.bgMusic = new Howl({
        src: [nextTrackPath],
        loop: true,
        volume: 0,
        html5: true,
        onloaderror: (id, err) => console.error(`[Audio] Failed to load ${nextTrackPath}.`, err)
      });
      if (this.enabled) {
        this.bgMusic.play();
        this.bgMusic.fade(0, 0.3, fadeTime);
      }
    };

    if (this.bgMusic) {
      this.bgMusic.fade(this.bgMusic.volume() || 0, 0, fadeTime);
      const old = this.bgMusic;
      setTimeout(() => {
        old.stop();
        startNext();
      }, fadeTime);
    } else {
      startNext();
    }
  }

  playCollect() { this.play('collect'); }
  playClue() { this.play('clue'); }
  playComplete() { this.play('complete'); }
  playTalk() { this.play('talk'); }
  playError() { this.play('error'); }
  playUI() { this.play('ui'); }
  playJump() { this.play('ui'); }

  playMorningAmbience() {
    this.stopAllAmbience();
    this.currentAmbient = 'morning';
    this.play('morning', true);
  }

  playOutdoorAmbience() {
    this.stopAllAmbience();
    this.currentAmbient = 'outdoor';
    this.play('outdoor', true);
  }

  stopAllAmbience() {
    if (this.currentAmbient && this._howls[this.currentAmbient]) {
      this._howls[this.currentAmbient].stop();
    }
    this.currentAmbient = null;
  }
}