# Manna Collector — Source of Truth

_Last updated: 2026-07-14 (Tribe → Household start flow added)_

This document is the canonical reference for **Manna Collector**. It is derived from:

- **`v3/mana_collector_v3_1.html`** — the current single-file prototype (the visual/design reference).
- **`index.html` + `js/*` + `styles/*` + `config.js`** — the modular production build (the code we ship).
- The design + roadmap notes in **`docs/`**.

> ⚠️ **Read this first.** The two codebases have *diverged*. The modular build (`index.html`) is
> **not** simply "behind" the prototype — in most systems it is far **ahead** (save/load, market
> simulation, quotas, particles, camp props, GUI, music). At the same time it is **missing a small
> set of visual/UX features** that exist in `v3_1`. The precise gap list is in
> [§6 Gap Analysis](#6-gap-analysis-in-v31-not-yet-in-indexhtml).

---

## 1. The two codebases

| | `v3/mana_collector_v3_1.html` | `index.html` (+ `js/`, `styles/`) |
|---|---|---|
| Structure | One file, ~2,800 lines, everything inline | Modular ES modules under `js/`, CSS under `styles/` |
| Three.js | CDN `three@0.128` (global `THREE`) + legacy example passes | Import-map `three.module.js` + jsm modules |
| State | Ad-hoc properties on `window.game` | Central `GameState` object (`js/GameState.js`) |
| Config | Hard-coded literals | `js/config.js` (all tunables) |
| Persistence | None | `SaveManager` + LocalForage |
| Market | Random price roll | `MarketSimulation` (10k-household economy) |
| Particles | None | `ParticleManager` (Partykals) |
| Dev tools | None | lil-gui + Stats.js (behind `config.debug`) |
| Role | **Design/visual reference** | **Production target** |

**Rule of thumb:** treat `v3_1` as the "art direction & feel" reference, and the modular build as
the living product. New work goes into the modular build.

---

## 2. Canonical game design

(Summarised from `docs/GAME_DESIGN.md`; the modular build is the authority for exact numbers.)

**Concept:** A wanderer survives a desert wilderness by gathering and selling mystical *manna*.
Endless daily survival loop. Game ends when Health reaches 0.

**Resources**
- **Gathered manna** (`dayManaGathered`) — total collected in a day; drives the end-of-day health calc.
- **Collected manna / basket** (`dayManaCollected`) — sellable inventory; decreases as you sell.
- **Wasted manna** — anything in the basket not sold by nightfall; spoils and damages health.
- **Silver** — persistent currency from selling; feeds the Wealth bar.
- **Health** — 0–100, persistent; drains with movement, adjusted at day end.
- **Score** — running total from pickups + perfect-day bonuses.

**Daily flow:** Day start (market sets price + demand) → Gathering phase → Market phase (sell) →
Day end (health + score evaluated).

**"Goldilocks" feedback loop:** under-gathering starves you, over-gathering causes overexertion
**and** waste risk, waste hurts health hard, optimal gathering + full sell is the sweet spot.

---

## 3. Feature inventory of the current version (`v3_1`)

### 3.1 UI / DOM elements
- **Loading screen** — parchment card, animated walking character, "collectible" mana dots, % bar.
- **Top-right control cluster** — Pause, Toggle Mobile Controls, Toggle Audio, About (`.icon-btn`).
- **About panel** — slide-in "The Wilderness Law" rules panel.
- **Market** — appears automatically at the **end of each day** (state `'market'`, opened by
  `Game.endDay()` → `UIManager.showMarket`). The market panel has **Buy 5 / Sell 5 / Sell All / Leave**
  actions. There is **no** on-demand mid-day trigger button (it was prototyped then reverted on
  2026-07-14 so the market stays an end-of-day event).
- **HUD** — `Mana` (score), `Day N · Ns` timer, `Basket` (`.hud-mana`), `Location`, `Silver`.
- **Location popup** (`#locationPopup`) — lower-left zone name badge.
- **Status bars** — Wellbeing (health) + Wealth (silver), bottom-centre.
- **Mobile D-pad** — 4-direction on-screen arrows (`.mobile-controls`).
- **Modals** — Menu, Difficulty+Character, Day End, Game Over, Market, Pause.

### 3.2 Start flow — Tribe → Household (modular build, canonical)

The player is chosen in **two steps** before a run begins.

1. **Choose Your Tribe** (`#characterStep` → `#tribeButtons`) — pick **one of the 12 tribes** of
   Israel. This is the **base gameplay profile** (see `js/tribes.json` and [§3.2a](#32a-the-tribe-data-file)).
   Each tribe defines: `moveSpeed`, `manaCount` (manna spawned per day), `quota` (daily manna needed),
   `moveDrain` (health lost per step), `startMoney`, `startHealth`, plus flavour (`color`, `epithet`,
   `blessing`, `description`). Selecting a tribe also tints the player's dress with the tribe colour.
2. **Household Size** (`#householdStep`) — pick **single / couple / family**. This is a **modifier**
   applied on top of the tribe base (see `config.household`): single = lighter/faster, family =
   heavier/slower. The combined profile is `tribe base × household modifier`.

> **Design decision (2026-07-14):** _Tribe = base profile, Household = modifier._ The tribe sets the
> core feel and numbers; the household scales them (e.g. family multiplies quota ×1.25 and moveSpeed ×0.85).
> `GameState.world.difficulty` internally stores the household type (`single`/`couple`/`family`).

#### 3.2a The tribe data file (`js/tribes.json`)
- Loaded at startup by `Game.loadTribes()` (fetched, then `this.tribeMap` keyed by `id`).
- 12 tribes in birth order: Reuben, Simeon, Levi, Judah, Dan, Naphtali, Gad, Asher, Issachar,
  Zebulun, Joseph, Benjamin. `judah` is the default selected tribe (balanced/recommended).
- Buttons are rendered dynamically by `UIManager.buildTribeButtons()` (grid of 12 cards with a colour
  swatch, name, epithet, and base quota). There is **no** static Character select anymore — the old
  warrior/mage/rogue presets and the `selectedCharacter` field were removed.
- `Game.getDifficultySettings()` returns the combined profile used by movement, spawn counts, quota,
  and starting money/health. A legacy fallback exists if `tribes.json` fails to load.
- Save summary stores `GameSummary.tribe` (the chosen tribe id); the menu "Continue Journey" panel
  shows **Tribe** + **Household**.

### 3.3 Scene elements
- **Infinite terrain tiles** (`createTile`/`updateTileGrid`) with **Bayer 4×4 ordered-dither**
  vertex colours baked into the mesh (world-space stipple = seamless retro sand look).
- **Sky** canvas gradient background.
- **Lighting** — ambient + hemisphere + shadow-casting sun (follows player) + a torch point light.
- **Fog**.
- **Landmarks** — Camp, Oasis, Split Rock, Temple, Wilderness (emissive cylinder markers).
- **Location flags** (`createLocationFlag` + `animateFlagWave`) — a **3D wooden pole + gold finial +
  parchment cloth banner** with the place name, and a **rippling cloth wave animation**. Shown only
  when the player is near.
- **Props** — rocks (pebble/medium/boulder), round trees, **palm trees**, scattered rocks.
- **Birds** — flock drifting overhead.
- **Player** — "lovelable" capsule/sphere character with eyes, dress, feet, walk bob.

### 3.4 Post-processing
- `EffectComposer`: RenderPass → UnrealBloom → **inline Vignette ShaderPass**.
- The old full-screen pixel/scanline pass was **removed** in v3_1 (dither now lives in the terrain
  mesh instead — see [§5](#5-what-changed-v30--v31)).
- A separate `uiScene` is rendered as a depth-cleared overlay pass.

### 3.5 Systems
- Movement: WASD/arrows/D-pad + click-to-move raycast onto ground.
- Simple obstacle collision (push-out).
- Day timer (60s), day-end health math, score/perfect-day bonus.
- **Market:** `generateMarketPrices()` — random daily demand (22–35) and price (crash 1–2 /
  normal 3–6 / boom 7–10). Sell 5 / Sell All only. Waste warning.
- Audio: Howler SFX (pickup, sell, sellAll, dayEnd, gameOver, hurt, click, pause).

---

## 4. Modular build (`index.html`) status

### 4.1 Already implemented (and often beyond v3_1)
- Full ES-module architecture: `Game`, `GameState`, `SceneManager`, `PlayerManager`, `UIManager`,
  `ParticleManager`, `MarketSimulation`, `SaveManager`, `AudioManager`, `LoadingScreenManager`.
- **Config-driven** everything (`js/config.js`).
- **Save/Load** via LocalForage (+ "Continue Journey" panel on the menu, manual Save in Pause).
- **Market simulation** — 10,000-household supply/demand economy with market *status*
  (shortage/glut/surplus/balanced), moods, quota, and a **Buy** action.
- **Quota system** + **Day 6/7 special events** (doubled quota / barren day).
- **Particle effects** (Partykals): dust trail, campfire flames, smoke, embers, temple sparkles,
  market confetti, mana burst.
- **Richer camp**: `createCampfire`, `createTent`, `createMarketStall`.
- **Detailed landmarks**: `createSplitRock`, `createTemple` (base, roof, pillars, walls).
- **Better terrain**: FastNoiseLite (OpenSimplex) + ripples + procedural grain sand texture.
- **Better birds**: wandering flight, wing flap, bob (config-driven).
- **Music** (menu + desert loops with fades), **lil-gui**, **Stats.js**.
- **Tribe → Household start flow**: two-step character creation. Step 1 picks one of **12 tribes**
  (`js/tribes.json`, the base gameplay profile); Step 2 picks **household size** single/couple/family
  (a multiplier on the tribe base — see [§3.2](#32-start-flow--tribe--household-modular-build-canonical)).
  Replaces the old warrior/mage/rogue Character select.
- **End-of-day Market** — opened automatically by `Game.endDay()` (state `'market'`). Panel has
  **Buy 5 / Sell 5 / Sell All / Leave**; Buy is now wired (`Game.buyMana`) and the panel shows Buy
  Price + Manna-for-Sale. _The earlier on-demand mid-day trigger button was reverted (2026-07-14)._
- **3D parchment banner flags** (`createLocationFlag` + cloth-ripple `animateFlagWave`) — ported from
  `v3_1`: wooden pole + gold finial + waving cloth banner, shown near a zone.
- **Bayer 4×4 ordered-dither terrain** — ported into `SceneManager.createTile` (world-space stipple).
- **Household difficulty**: single / couple / family modifier (lighter/steady/heavier load).

### 4.2 Orphaned CSS (historical)
- `styles/main.css` previously had `.market-trigger-btn` styling with no matching element. The
  `#marketTriggerBtn` element now **exists** in `index.html` and is wired (`Game.openMarket()`), so
  this is resolved — kept only as a note that the styling is now live.

---

## 5. What changed v3.0 → v3.1

The only differences between the two prototype files:
1. **Mobile status-bar layout** — bars moved to bottom-left at 50% width on small screens.
2. **Bayer 4×4 ordered-dither** added to terrain vertex colours (world-space stipple).
3. **Removed** the full-screen retro pixel/quantise/scanline `ShaderPass` (the dither in the terrain
   mesh replaces it, so props/player are no longer posterised).

---

## 6. Gap Analysis — in `v3_1`, NOT yet in `index.html`

These are the genuine additions from the current prototype that have **not** been ported to the
modular build. (Note: several things you might expect here — **palm trees, mobile controls, the
market modal itself** — are **already present** in the modular build.)

| # | Feature | In `v3_1` | In `index.html` | Notes |
|---|---------|:---:|:---:|-------|
| 1 | **On-demand Market trigger button** (open market mid-day) | ✅ | ❌ (intentionally removed) | Reverted 2026-07-14: the market is an **end-of-day** event only (`Game.endDay()` → `showMarket`). The end-of-day panel still has Buy/Sell/Sell All/Leave. |
| 2 | **3D parchment banner flags** (pole + gold finial + waving cloth banner) | ✅ | ✅ (done) | `createLocationFlag` + cloth-ripple `animateFlagWave` ported. |
| 3 | **Bayer-dithered terrain colouring** (retro stipple sand) | ✅ | ✅ (done) | `createTile` now bakes the 4×4 Bayer matrix into vertex colours. |
| 4 | **HUD "Basket" line + "Mana=score" wording** | ✅ | ⚠️ different | Modular shows `Score` + `Mana x/quota`; prototype shows `Mana`(score) + `Basket`. Reconcile intentionally. |
| 5 | **`easy/normal/hard` difficulty naming** | ✅ | ⚠️ replaced | Modular uses **Tribe (base profile) + Household size (single/couple/family modifier)**. Canonical. |
| 6 | **Separate `uiScene` overlay render pass** | ✅ | ⚠️ declared but not rendered | Only matters if we add screen-space 3D UI. |
| 7 | **Torch point light on the player** | ✅ (created; movement commented) | ❌ (`this.torchLight` declared, never created) | Low priority. |
| 8 | **12-tribe selection** | ❌ (n/a in prototype) | ✅ (new) | `js/tribes.json` + two-step Tribe→Household start flow (see [§3.2](#32-start-flow--tribe--household-modular-build-canonical)). |

### Things the user asked about specifically
- **Market panel** → already in modular build (and richer: Buy button, market status, mood,
  waste warning). The *on-demand trigger button* (#1) was prototyped then **reverted** — the market
  is intentionally end-of-day only.
- **Mobile control panel** → already in modular build (DOM + CSS + handlers).
- **Palm trees / scene elements** → palm trees, rocks, round trees, birds are already in modular
  build. The missing scene element is the **banner flag** (#2) and the **terrain dither** (#3).

---

## 7. Reverse gaps — in `index.html`, NOT in `v3_1`

So nothing is lost if `v3_1` is ever treated as the base: the modular build additionally has
save/load, market simulation + Buy, quota + day 6/7 events, particles, campfire/tents/stalls,
detailed Split Rock + Temple, FastNoiseLite terrain + grain texture, music, lil-gui, Stats.js,
dust trail, household difficulty, the 3D banner flags, Bayer-dithered terrain, the on-demand
market trigger, and the **12-tribe selection** (`js/tribes.json`).

---

## 8. Known issues / blockers

- 🟢 **Resolved (2026-07-14):** the fatal `Game.js animate()` duplicate `const playerPos` /
  `const heading` `SyntaxError` was fixed (single declarations + camera follow). The module now parses
  and runs.
- 🟢 **Resolved:** `sellMana` no longer hard-codes a 5-unit sell (Sell 5 button passes a click event,
  coerced to the default). `sellAllMana` delegates to `sellMana`.
- 🟡 **Reverted (2026-07-14):** the on-demand mid-day market trigger (`#marketTriggerBtn` /
  `Game.openMarket()`) was prototyped then removed — the market is now an **end-of-day** event only
  (`Game.endDay()` → `showMarket`). Selling is guarded to the `'market'` state again; `buyMana` is
  now wired so the **Buy** button works too.
- 🟠 `UIManager.showLocationPopup()` is a no-op (`return`), so the lower-left location popup never
  shows; in-world text was meant to replace it (the 3D banner flags cover the zone name instead).
- 🟡 `GameState.world.difficulty` stores the household type (`single`/`couple`/`family`) rather than a
  literal "difficulty" — named for legacy reasons; harmless but worth a rename if touched.

---

## 9. Config / tunables quick reference (`js/config.js`)

- **Day length:** 60s. **Initial health:** 100. **Initial money:** 50.
- **Tribe base profile (`js/tribes.json`):** 12 tribes, each with `moveSpeed`, `manaCount`, `quota`,
  `moveDrain`, `startMoney`, `startHealth`, plus `color`/`epithet`/`blessing`/`description`. Default
  selected tribe: `judah` (balanced/recommended).
- **Household modifier (`config.household`):** single = ×{1.15 speed, 0.85 mana, 0.8 quota, 0.85 drain}
  (lighter/faster); couple = ×1.0 (baseline); family = ×{0.85 speed, 1.15 mana, 1.25 quota, 1.15 drain}
  (heavier/slower). Final profile = `tribe base × household`.
- **Start money:** `config.player.initialMoney` (50) + tribe `startMoney`. **Start health:** tribe
  `startHealth` (default 100).
- **Health math:** penalty ×1.2 (under quota), +8 bonus (met, no waste), waste penalty ×1.5,
  day-6 quota ×2.
- **Market:** base sell price 4, min demand 5, `closedChance` 0.6 (quiet market after day 1).
- **Terrain:** OpenSimplex, scale 0.02, height 1, 4 octaves, ripples on.
- **Post-fx:** bloom 0.3/0.2/0.97, exposure 1.9, vignette offset 1.0 / darkness 0.9.
- **Debug:** `debug.stats` / `debug.gui` (both off by default).

---

## 10. Roadmap / docs index

Integration plans and future features live in `docs/`:

- `item_1` EffectComposer + Bloom · `item_2` Troika Text · `item_3` GSAP · `item_4` Simplex terrain
- `Item_5` MeshBVH · `Item_6` Stats.js · `Item_7` lil-gui · `Item_8` Howler · `Item_9` GameState
- `Item_10` LocalForage · `Item_11` SeedRandom · `Item_12` Partykals · `Item_13` Tweakpane
- `item_14` Texture generation · `item_15` Pixel art / dither · `item_16` Leaderboards
- `item_17` Achievements · `item_18` Dialogue/Narrative · `updates.md` library priorities
- `GAME_DESIGN.md` core loop · `js/procedural_models.md` model notes

**Status:** items 1, 4, 6, 7, 8, 9, 10, 12 are effectively **done** in the modular build.
Items 2 (Troika), 3 (GSAP), 5 (MeshBVH), 11 (SeedRandom), 13 (Tweakpane) are still open.
