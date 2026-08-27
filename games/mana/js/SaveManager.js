import { GameState, GameSummary } from './GameState.js';

const SAVE_KEY = 'manaCollectorSave';
const SUMMARY_KEY = 'manaCollectorSummary';
export class SaveManager {
  constructor(game) {
    this.game = game;
    localforage.config({
      name: 'MannaCollector',
      storeName: 'savegame',
      description: 'Manna Collector Save Data'
    });
  }

  async saveSummary() {
    GameSummary.hasSave = true;
    GameSummary.score = GameState.player.score;
    GameSummary.day = GameState.world.day;
    GameSummary.tribe = GameState.player.selectedTribe;
    GameSummary.difficulty = GameState.world.difficulty;
    GameSummary.health = GameState.player.health;
    GameSummary.money = GameState.player.money;
    try {
      await localforage.setItem(SUMMARY_KEY, GameSummary);
    } catch (err) {
      console.error('Error saving game summary:', err);
    }
  }
  async saveGame() {
    try {
      console.log('Saving game state...');
      if (this.game.player) {
        GameState.player.position.x = this.game.player.position.x;
        GameState.player.position.y = this.game.player.position.y;
        GameState.player.position.z = this.game.player.position.z;
      }
      await localforage.setItem(SAVE_KEY, GameState);
      await this.saveSummary();
      console.log('Game state saved.');
    } catch (err) {
      console.error('Error saving game state:', err);
    }
  }

  async loadGame() {
    try {
      const savedState = await localforage.getItem(SAVE_KEY);
      if (savedState) {
        // Deep merge might be better, but for now Object.assign is fine
        // We need to be careful not to overwrite entire nested objects if the save is partial
        for (const key in savedState) {
          if (GameState.hasOwnProperty(key) && typeof GameState[key] === 'object' && GameState[key] !== null) {
            Object.assign(GameState[key], savedState[key]);
          } else {
            GameState[key] = savedState[key];
          }
        }
        console.log('Game state loaded.', GameState);
        this.game.resumeFromLoad();
      } else {
        console.log('No save file found, starting new game.');
      }
    } catch (err) {
      console.error('Error loading game state:', err);
    }
  }

  async loadSummary() {
    try {
      const savedSummary = await localforage.getItem(SUMMARY_KEY);
      if (savedSummary && savedSummary.hasSave) {
        Object.assign(GameSummary, savedSummary);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error loading game summary:', err);
      return false;
    }
  }
  async newGame() {
    await localforage.removeItem(SAVE_KEY);
    await localforage.removeItem(SUMMARY_KEY);
    console.log('Save data cleared for new game.');
    window.location.reload();
  }
}