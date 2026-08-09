import { GameEngine } from "./gameEngine.js";

const CONFIG = {
  unlockAllCases: true,
  unlockAllEvidence: true
};

const game = new GameEngine(CONFIG);

// Listen for clicks to play UI sound effects globally
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button, input[type="button"]');
  if (btn && game.audio && game.audio.enabled) {
    game.audio.playUI();
  }
});

// Initialize the engine when the script loads
game.init();