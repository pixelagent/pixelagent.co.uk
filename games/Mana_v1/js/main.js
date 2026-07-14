import { config as gameConfig } from './config.js';
import { LoadingScreenManager } from './LoadingScreenManager.js';
import { GameState } from './GameState.js';
import { Game } from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = new LoadingScreenManager(gameConfig.display.minLoadingTime);
  const game = new Game(loadingScreen);
  window.game = game; // Expose to global scope for HTML onclick handlers
  game.init();
});