# Item 10 – Integrate LocalForage for Save Games and Persistent Data (★★★★★)

## Overview

Manna Collector currently stores all gameplay data in memory. When the player refreshes the page or closes the browser, their progress is lost.

Integrating **LocalForage** provides a simple, reliable way to save game progress automatically. It offers a much friendlier API than the browser's built-in `localStorage` and transparently uses the best available storage backend, such as **IndexedDB**, **WebSQL**, or **localStorage**.

Combined with the **GameState** system introduced in Item 9, LocalForage enables robust save/load functionality with very little code.

---

# Why LocalForage?

Compared to using `localStorage` directly, LocalForage provides:

- Asynchronous API
- Larger storage capacity
- Automatic IndexedDB support
- Simpler code
- Better browser compatibility
- Stores JavaScript objects directly
- Future-proof save system

It removes the need to manually serialize and manage browser storage.

---

# Benefits

Adding LocalForage allows the game to remember:

- Player progress
- Money
- Health
- Day number
- Market prices
- Settings
- Statistics
- Unlocked achievements
- Inventory
- Graphics options

Even after closing the browser.

---

# Current Situation

Currently all data exists only while the game is running.

Example:

```javascript
window.game.money

window.game.health

window.game.day
```

Refreshing the page resets everything.

---

# Step 1 – Install

Using npm:

```bash
npm install localforage
```

Or include the CDN version before your game script.

---

# Step 2 – Configure LocalForage

During game startup:

```javascript
localforage.config({

    name: "Manna Collector",

    storeName: "savegame"

});
```

This creates a dedicated storage area for the game.

---

# Step 3 – Create Save Functions

Example:

```javascript
async function saveGame() {

    await localforage.setItem(
        "gameState",
        GameState
    );

}
```

Unlike `localStorage`, no `JSON.stringify()` is required.

---

# Step 4 – Load Saved Games

Example:

```javascript
async function loadGame() {

    const save =
        await localforage.getItem("gameState");

    if (save) {

        Object.assign(GameState, save);

    }

}
```

If no save exists, the game starts normally.

---

# Step 5 – Auto Save

Save automatically after important events.

Examples:

- End of day
- Player sleeps
- Item sold
- Money changes
- Achievement unlocked
- Settings changed

Example:

```javascript
GameState.player.money += earnings;

saveGame();
```

This minimizes progress loss.

---

# Step 6 – Save on Exit

Automatically save before the browser closes.

```javascript
window.addEventListener(
    "beforeunload",
    () => {

        saveGame();

    }
);
```

Although not guaranteed on every browser, this provides an additional safety net.

---

# Step 7 – Save Settings

Store player preferences separately.

Example:

```javascript
await localforage.setItem(

    "settings",

    GameState.settings

);
```

These include:

- Audio volume
- Music enabled
- Graphics quality
- Fullscreen mode
- Control preferences

Settings can be loaded before the main game starts.

---

# Step 8 – Save Statistics

Maintain long-term player statistics.

Example:

```javascript
GameState.statistics = {

    totalManaCollected: 0,

    totalMoneyEarned: 0,

    daysPlayed: 0,

    distanceWalked: 0

};
```

These values can persist across multiple play sessions.

---

# Step 9 – Add Manual Save and Load

For debugging or future menus:

```javascript
saveGame();

loadGame();
```

These functions can later be connected to menu buttons.

---

# Step 10 – Add New Game

Provide a way to delete the existing save.

Example:

```javascript
async function newGame() {

    await localforage.removeItem(
        "gameState"
    );

    location.reload();

}
```

This starts the game from scratch.

---

# Step 11 – Save Versioning

As the game evolves, the save format may change.

Store a version number alongside the save.

Example:

```javascript
GameState.version = 1;
```

Future versions can migrate old save data safely.

Example:

```javascript
if (save.version < 2) {

    migrateSave(save);

}
```

This prevents older saves from breaking after updates.

---

# Step 12 – Save Structure

A recommended save object:

```javascript
GameState = {

    version: 1,

    player: {},

    world: {},

    market: {},

    settings: {},

    statistics: {},

    achievements: {}

};
```

This matches the GameState architecture from Item 9.

---

# Step 13 – Autosave Strategy

Rather than saving every frame, save only after significant events.

Recommended triggers:

- Player sleeps
- Day ends
- Money changes
- Purchase completed
- Item sold
- Settings changed
- Achievement earned

This keeps storage operations efficient.

---

# Step 14 – Loading Sequence

A suggested startup flow:

```
Start Game

↓

Load Settings

↓

Load Save

↓

Create World

↓

Restore Player

↓

Update HUD

↓

Begin Gameplay
```

Loading before creating gameplay objects avoids unnecessary state changes.

---

# Suggested Save Data

## Player

- Health
- Money
- Inventory
- Position
- Score

## World

- Current day
- Time remaining
- Weather
- World seed

## Market

- Daily demand
- Current prices
- Items sold today

## Settings

- Audio
- Graphics
- Controls

## Statistics

- Total days played
- Total mana collected
- Total money earned
- Distance walked

## Achievements

- Unlocked badges
- Challenges completed

---

# Integration Checklist

- Install LocalForage
- Configure a storage database
- Create `saveGame()`
- Create `loadGame()`
- Save the GameState object
- Load GameState during startup
- Auto-save after important events
- Save settings separately
- Add save versioning
- Add a "New Game" option

---

# Files to Modify

## Create a New File

```
SaveManager.js
```

Example:

```javascript
async function saveGame() {

    await localforage.setItem(
        "gameState",
        GameState
    );

}

async function loadGame() {

    const save =
        await localforage.getItem(
            "gameState"
        );

    if (save) {

        Object.assign(
            GameState,
            save
        );

    }

}
```

---

## Game Initialisation

Before starting gameplay:

```javascript
await loadGame();
```

---

## End of Day

After processing daily events:

```javascript
await saveGame();
```

---

## Settings Menu

Whenever a player changes an option:

```javascript
await saveGame();
```

---

# Future Enhancements

With LocalForage integrated, the game is well prepared for:

- Multiple save slots
- Cloud save synchronization
- Daily challenge progress
- Persistent achievements
- Player profiles
- Save import/export
- Automatic backups
- Cross-device saves (with a future online account system)

---

# Benefits for Manna Collector

Integrating **LocalForage** gives Manna Collector a modern, reliable save system with minimal effort. Players can safely leave and return to the game without losing progress, while developers gain a clean and scalable persistence layer.

Together with the **GameState** architecture from Item 9, LocalForage provides the foundation for long-term progression, achievements, settings, statistics, and future save features, making it one of the most valuable architectural improvements for the project.