import { config } from './config.js';

export class AudioManager {
  constructor() {
    // Assuming Howler.js is loaded from the CDN and `Howl` is globally available.
    this.lastPlayed = {};
    this.sounds = {
      wind: new Howl({ src: ['assets/audio/sfx/desert-wind.mp3'], loop: true, volume: 0.65 }),
      water: new Howl({ src: ['assets/audio/sfx/water.mp3'], sprite: { effect: [2340, 900] }, volume: 0.8 }),
      pickup: new Howl({ src: ['assets/audio/sfx/pickup.wav'], volume: config.audio.sfxVolume }),
      buy: new Howl({ src: ['assets/audio/sfx/coins.mp3'], sprite: { effect: [360, 1200] }, volume: config.audio.sfxVolume * 0.9 }),
      sell: new Howl({ src: ['assets/audio/sfx/coins.mp3'], sprite: { effect: [360, 1200] }, volume: config.audio.sfxVolume }),
      sellAll: new Howl({ src: ['assets/audio/sfx/coins.mp3'], sprite: { effect: [360, 1800] }, volume: config.audio.sfxVolume }),
      dayEnd: new Howl({ src: ['assets/audio/sfx/day_end.wav'], volume: config.audio.sfxVolume * 1.2 }),
      gameOver: new Howl({ src: ['assets/audio/sfx/game_over.wav'], volume: config.audio.sfxVolume * 1.2 }),
      hurt: new Howl({ src: ['assets/audio/sfx/hurt.wav'], volume: config.audio.sfxVolume }),
      click: new Howl({ src: ['assets/audio/sfx/click.wav'], volume: config.audio.sfxVolume * 0.8 }),
      pause: new Howl({ src: ['assets/audio/sfx/pause.wav'], volume: config.audio.sfxVolume * 0.9 }),
      // Music
      menuMusic: new Howl({ src: ['assets/audio/music/menu.mp3'], loop: true, volume: 0 }),
      gameMusic: new Howl({ src: ['assets/audio/music/desert.mp3'], loop: true, volume: 0 }),
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      const now = performance.now();
      if (now - (this.lastPlayed[soundName] ?? -Infinity) < 100) return;
      this.lastPlayed[soundName] = now;
      const sound = this.sounds[soundName];
      if (['buy', 'sell', 'sellAll', 'water'].includes(soundName)) sound.play('effect');
      else {
        if (soundName === 'pickup') sound.rate(0.94 + Math.random() * 0.12);
        sound.play();
      }
    }
  }

  playMenuMusic() {
    this.sounds.wind.stop();
    if (!this.sounds.menuMusic.playing()) {
      this.sounds.gameMusic.fade(this.sounds.gameMusic.volume(), 0, 1000);
      this.sounds.menuMusic.play();
      this.sounds.menuMusic.fade(0, config.audio.musicVolume, 1000);
    }
  }

  playGameMusic() {
    if (!this.sounds.wind.playing()) this.sounds.wind.play();
    if (!this.sounds.gameMusic.playing()) {
      this.sounds.menuMusic.fade(this.sounds.menuMusic.volume(), 0, 1000);
      this.sounds.gameMusic.play();
      this.sounds.gameMusic.fade(0, config.audio.musicVolume, 1000);
    }
  }

  stopAllMusic() {
    this.sounds.wind.stop();
    this.sounds.menuMusic.fade(this.sounds.menuMusic.volume(), 0, 1500);
    this.sounds.gameMusic.fade(this.sounds.gameMusic.volume(), 0, 1500);
    setTimeout(() => {
      if (this.sounds.menuMusic.volume() === 0) this.sounds.menuMusic.stop();
      if (this.sounds.gameMusic.volume() === 0) this.sounds.gameMusic.stop();
    }, 1500);
  }
}