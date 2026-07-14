# Item 11 – Integrate SeedRandom for Deterministic World Generation (★★★★★)

## Overview

Manna Collector currently relies on `Math.random()` whenever random values are required, such as placing manna, generating terrain features, or creating daily market conditions.

While this works, every playthrough produces a completely different world with no way to reproduce it.

Integrating **SeedRandom** allows the game to generate the exact same world whenever the same seed is used. This makes procedural generation deterministic and lays the foundation for daily challenges, shared worlds, debugging, and reproducible saves.

---

# Why SeedRandom?

`Math.random()` is unpredictable.

Example:

```javascript
Math.random();
```

Every refresh produces a completely different sequence of random numbers.

With SeedRandom:

```javascript
const rng = new Math.seedrandom("desert");
```

Every time the game starts with the seed `"desert"`, it produces exactly the same sequence of random numbers.

---

# Benefits

Using SeedRandom enables:

- Deterministic procedural worlds
- Daily challenges
- Shareable world seeds
- Consistent testing
- Easier debugging
- Reproducible terrain
- Save/load compatibility
- Multiplayer-ready world generation

---

# Current Situation

Random values are likely generated using:

```javascript
Math.random()
```

Examples may include:

- Manna placement
- Rock placement
- Tree placement
- Daily market prices
- Random events

Every new game creates an entirely different world.

---

# Step 1 – Install

Using npm:

```bash
npm install seedrandom
```

Or include the CDN version before your game script.

---

# Step 2 – Create a Random Number Generator

Instead of calling:

```javascript
Math.random();
```

Create a seeded generator:

```javascript
const rng =
    new Math.seedrandom("manna");
```

Now every call produces a predictable result.

---

# Step 3 – Store the World Seed

Add a seed to the GameState.

```javascript
GameState.world = {

    seed: "manna",

    day: 1,

    weather: "clear"

};
```

This seed becomes part of every save file.

---

# Step 4 – Replace Math.random()

Instead of:

```javascript
const x = Math.random();
```

Use:

```javascript
const x = rng();
```

Do this throughout the game for procedural generation.

---

# Step 5 – Terrain Generation

If using **Simplex Noise** (Item 4), initialise it using the stored seed.

Example:

```javascript
const rng =
    new Math.seedrandom(
        GameState.world.seed
    );
```

Now terrain generation becomes fully reproducible.

Every player using the same seed will see the same desert.

---

# Step 6 – Manna Placement

Instead of placing manna randomly each game:

```javascript
const x =
    rng() * worldWidth;

const z =
    rng() * worldDepth;
```

The same seed now produces identical manna locations.

---

# Step 7 – Random Scenery

Use the seeded generator for placing:

- Rocks
- Cacti
- Shrubs
- Oasis decorations
- Ruins
- Camp details

Players sharing a seed will explore identical landscapes.

---

# Step 8 – Market Randomness

Daily prices can still vary while remaining deterministic.

Example:

```javascript
const variation =
    Math.floor(
        rng() * 4
    );
```

Given the same seed and day number, the market behaves consistently.

---

# Step 9 – Daily Challenges

Generate a new seed each day.

Example:

```
2026-06-30
```

Every player receives the same world for that date.

Tomorrow:

```
2026-07-01
```

A completely new world is generated.

This is ideal for leaderboards and community challenges.

---

# Step 10 – Custom World Seeds

Allow players to enter their own seed.

Example:

```
Golden Oasis

Desert King

12345

Explorer

Ancient Temple
```

Friends can share these seeds and explore identical worlds.

---

# Step 11 – Save the Seed

Include the seed in the save file.

```javascript
GameState.world.seed =
    "Golden Oasis";
```

When loading:

```javascript
rng =
    new Math.seedrandom(
        GameState.world.seed
    );
```

The world regenerates exactly as before.

---

# Step 12 – Debugging

Seeded randomness is extremely useful during development.

If a player reports:

> "The game crashes using seed 'Temple42'."

Developers can load:

```javascript
Temple42
```

and reproduce the exact world.

Without deterministic generation, this would be almost impossible.

---

# Step 13 – Suggested GameState Structure

```javascript
GameState.world = {

    seed: "Golden Oasis",

    day: 1,

    weather: "clear",

    timeLeft: 60

};
```

This integrates naturally with the GameState architecture introduced in Item 9.

---

# Step 14 – Optional Random Helper

Instead of using the generator directly throughout the codebase, create a helper.

```javascript
Random.next()
```

Internally:

```javascript
Random.next = () => rng();
```

This makes it easier to replace or extend the random system in the future.

---

# Suggested Uses

Use SeedRandom for:

- Terrain generation
- Manna placement
- Rock placement
- Oasis generation
- Market prices
- Weather selection
- Random events
- NPC placement
- Loot generation
- Animal spawning

Avoid using it for:

- Animation timing
- UI effects
- Sound variation
- Frame-dependent logic

These do not need deterministic behaviour.

---

# Integration Checklist

- Install SeedRandom
- Create a seeded random number generator
- Store the world seed in `GameState.world`
- Replace `Math.random()` for procedural generation
- Save the seed with the game
- Restore the seed when loading
- Support custom seeds
- Prepare for daily challenge worlds

---

# Files to Modify

## GameState

Add:

```javascript
GameState.world = {

    seed: "manna",

    day: 1,

    timeLeft: 60

};
```

---

## World Initialisation

Create the generator:

```javascript
const rng =
    new Math.seedrandom(
        GameState.world.seed
    );
```

---

## Procedural Generation

Replace:

```javascript
Math.random();
```

with:

```javascript
rng();
```

Wherever deterministic randomness is required.

---

## SaveManager

Ensure the world seed is included in the saved GameState.

---

# Future Enhancements

Once SeedRandom is integrated, Manna Collector can easily support:

- Shared world codes
- Daily challenge maps
- Weekly events
- Seasonal worlds
- Procedural quests
- Deterministic NPC behaviour
- Replay systems
- Community speedrunning competitions

---

# Benefits for Manna Collector

Integrating **SeedRandom** transforms the game's procedural systems from unpredictable randomness into deterministic world generation. Players can revisit favourite worlds, share seeds with friends, and participate in daily challenges, while developers gain a powerful debugging tool for reproducing issues.

Combined with **Simplex Noise**, **GameState**, and **LocalForage**, SeedRandom completes a robust procedural generation pipeline, providing a scalable foundation for future gameplay systems and long-term progression.