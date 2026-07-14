import { Player } from './Player.js';

export class GameManager {
  constructor() {
    this.player = new Player('Hero');
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.gameLoop();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  gameLoop() {
    // Your game logic will go here
    console.log('Game loop running...');
    requestAnimationFrame(() => this.gameLoop());
  }
}