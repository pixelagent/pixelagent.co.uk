# Item 9 – Introduce a Central Game State System (★★★★★)

## Overview

As Manna Collector continues to grow, game data is currently stored directly on the global `window.game` object.

Examples include:

```javascript
window.game.health

window.game.money

window.game.score

window.game.day

window.game.timeLeft
```

While this approach works for a small project, it becomes increasingly difficult to maintain as more systems are added.

A central **Game State** system provides a single source of truth for all game data, making the code easier to organise, debug, save, and extend.

Unlike React applications, this game does **not** require a full state management library like Zustand. A lightweight custom GameState object or a tiny event bus is more than sufficient.

---

# Why Introduce Game State?

Without a central state:

```
Player

↓

Updates health

↓

HUD

↓

Updates score

↓

Market

↓

Updates money

↓

Weather

↓

Updates day

↓

Everything talks to everything
```

This creates many hidden dependencies.

With a GameState:

```
Player

↓

GameState

↓

HUD

↓

Market

↓

Save System

↓

Achievements

↓

Audio

↓

UI
```

Everything communicates through one shared source.

---

# Benefits

A central state system provides:

- Easier debugging
- Cleaner architecture
- Better save/load support
- Simpler UI updates
- Reduced coupling
- Easier multiplayer support (future)
- Easier balancing
- Better testing

---

# Current Structure

Many gameplay values currently live directly inside `window.game`.

Example:

```javascript
window.game = {

    Mana: 0,

    health: 100,

    money: 50,

    day: 1,

    timeLeft: 60,

    difficulty: "normal"

}
```

As the game grows this object will become increasingly difficult to manage.

---

# Step 1 – Create a GameState Object

Instead of storing everything directly on `window.game`, group related data.

Example:

```javascript
const GameState = {

    player: {},

    world: {},

    market: {},

    settings: {}

};
```

Each system owns its own data.

---

# Step 2 – Create a Player State

Example:

```javascript
GameState.player = {

    health: 100,

    money: 50,

    mana: 0,

    score: 0,

    position: {

        x: 0,

        y: 0,

        z: 0

    }

};
```

Now instead of:

```javascript
window.game.health
```

use

```javascript
GameState.player.health
```

---

# Step 3 – Create a World State

```javascript
GameState.world = {

    day: 1,

    timeLeft: 60,

    weather: "clear",

    paused: false

};
```

This keeps world information together.

---

# Step 4 – Create a Market State

```javascript
GameState.market = {

    sellPrice: 4,

    dailyDemand: 30,

    manaSold: 0

};
```

Instead of:

```javascript
this.marketSellPrice
```

use:

```javascript
GameState.market.sellPrice
```

---

# Step 5 – Create a Settings State

Example:

```javascript
GameState.settings = {

    muted: false,

    difficulty: "normal",

    graphics: "high"

};
```

These values are ideal candidates for future save files.

---

# Step 6 – Update the HUD

Instead of reading directly from game variables:

```javascript
score.innerText = this.score;
```

Use:

```javascript
score.innerText =
    GameState.player.score;
```

The HUD now depends only on GameState.

---

# Step 7 – Update Player Logic

Instead of:

```javascript
this.health -= 5;
```

Use:

```javascript
GameState.player.health -= 5;
```

The player modifies only player data.

---

# Step 8 – Update the Market

Instead of:

```javascript
this.money += earnings;
```

Use:

```javascript
GameState.player.money += earnings;
```

Instead of:

```javascript
this.marketSellPrice
```

Use:

```javascript
GameState.market.sellPrice
```

---

# Step 9 – Update the Day System

Current:

```javascript
this.day++;
```

New:

```javascript
GameState.world.day++;
```

Likewise:

```javascript
GameState.world.timeLeft--;
```

---

# Step 10 – Prepare for Save Games

Once all data lives inside GameState, saving becomes straightforward.

Example:

```javascript
saveGame() {

    localforage.setItem(
        "save",
        GameState
    );

}
```

Loading becomes equally simple:

```javascript
loadGame() {

    GameState =
        savedData;

}
```

This works perfectly with **Item 10 – LocalForage**.

---

# Step 11 – Optional Event System

As the game grows, it is useful to notify other systems when state changes.

Example:

```javascript
GameEvents.emit(
    "healthChanged"
);
```

The HUD listens:

```javascript
GameEvents.on(
    "healthChanged",
    updateHealthBar
);
```

Instead of manually updating every UI element, events keep everything synchronised.

---

# Step 12 – Suggested Structure

```
GameState

│

├── Player

│     Health

│     Money

│     Mana

│     Score

│     Position

│

├── World

│     Day

│     Time

│     Weather

│     Pause

│

├── Market

│     Price

│     Demand

│     Sales

│

├── Settings

│     Audio

│     Difficulty

│     Graphics

│

└── Statistics

      Days Survived

      Total Mana

      Total Silver

      Steps Walked
```

This organisation makes it much easier to find and maintain data.

---

# Step 13 – Refactor Gradually

There is no need to rewrite the game all at once.

A sensible migration order is:

1. Player data
2. World data
3. Market data
4. Settings
5. Statistics
6. Save system

This reduces risk and keeps the game playable throughout the refactor.

---

# Integration Checklist

- Create a `GameState` object
- Move player data into `GameState.player`
- Move world data into `GameState.world`
- Move market data into `GameState.market`
- Move settings into `GameState.settings`
- Update the HUD to read from GameState
- Update gameplay systems to write to GameState
- Prepare the structure for LocalForage save files
- Optionally add an event bus for state change notifications

---

# Files to Modify

## Create a New File

```
GameState.js
```

Example:

```javascript
export const GameState = {

    player: {},

    world: {},

    market: {},

    settings: {},

    statistics: {}

};
```

---

## Game Initialisation

Replace scattered variables with initial GameState values.

---

## HUD

Read values from GameState.

---

## Player

Write values into GameState.

---

## Market

Use `GameState.market`.

---

## Day System

Use `GameState.world`.

---

# Future Enhancements

A central GameState makes future features significantly easier to implement, including:

- LocalForage save/load
- Achievements
- Daily challenges
- NPC relationships
- Weather systems
- Inventory
- Crafting
- Quests
- Multiplayer synchronisation
- Replay recording

---

# Benefits for Manna Collector

Introducing a central **GameState** transforms the game's architecture from a collection of loosely connected variables into a well-organised, maintainable system. It reduces code duplication, simplifies debugging, and lays the groundwork for robust save games, achievements, and future gameplay systems.

For Manna Collector, this is less about adding a visible feature and more about investing in a scalable foundation that will make every future enhancement easier to implement and maintain.