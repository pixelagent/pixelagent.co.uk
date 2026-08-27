import { config } from './config.js';

export class AudioManager {
  constructor() {
    // Assuming Howler.js is loaded from the CDN and `Howl` is globally available.
    this.sounds = {
      pickup: new Howl({ src: ['assets/audio/sfx/pickup.wav'], volume: config.audio.sfxVolume }),
      buy: new Howl({ src: ['assets/audio/sfx/sell.wav'], volume: config.audio.sfxVolume * 0.9 }),
      sell: new Howl({ src: ['assets/audio/sfx/sell.wav'], volume: config.audio.sfxVolume }),
      sellAll: new Howl({ src: ['assets/audio/sfx/sell_all.wav'], volume: config.audio.sfxVolume }),
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
      this.sounds[soundName].play();
    }
  }

  playMenuMusic() {
    if (!this.sounds.menuMusic.playing()) {
      this.sounds.gameMusic.fade(this.sounds.gameMusic.volume(), 0, 1000);
      this.sounds.menuMusic.play();
      this.sounds.menuMusic.fade(0, config.audio.musicVolume, 1000);
    }
  }

  playGameMusic() {
    if (!this.sounds.gameMusic.playing()) {
      this.sounds.menuMusic.fade(this.sounds.menuMusic.volume(), 0, 1000);
      this.sounds.gameMusic.play();
      this.sounds.gameMusic.fade(0, config.audio.musicVolume, 1000);
    }
  }

  stopAllMusic() {
    this.sounds.menuMusic.fade(this.sounds.menuMusic.volume(), 0, 1500);
    this.sounds.gameMusic.fade(this.sounds.gameMusic.volume(), 0, 1500);
    setTimeout(() => {
      if (this.sounds.menuMusic.volume() === 0) this.sounds.menuMusic.stop();
      if (this.sounds.gameMusic.volume() === 0) this.sounds.gameMusic.stop();
    }, 1500);
  }
}