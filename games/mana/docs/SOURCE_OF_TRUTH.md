# Manna Collector — Survival Game Source of Truth

Updated: 23 October 2026  
Product: Manna Collector — A Wilderness Chronicle  
Scope: the modular browser prototype in `Prototypes/Mana_v1/`  
Status: playable development prototype; survival balance is provisional.

## 1. Purpose and authority

This document describes the current game, the experience it should deliver, and the remaining work. It supersedes the July source-of-truth document and conflicting descriptions in older design notes. The previous document is preserved in `docs/archive/SOURCE_OF_TRUTH-2026-07-14.md`.

The implementation is `index.html`, `js/`, `styles/`, and `plugins/`. Historical single-file prototypes are references, not the active product. Some historical files are absent from the current checkout; development must not depend on them.

**Status language:** “Implemented” means present in the current source. “Verified” identifies an actual check. “Planned” means a proposal, not a shipped feature. Numbers below are current defaults, not final balancing commitments. If code and this document disagree, record the discrepancy and update both after deciding the intended behaviour.

## 2. The player promise

**Survive another day by gathering enough food, managing water and effort, and deciding when to return to camp.**

A small wanderer crosses an expressive desert inspired by Exodus 16. Food sustains the household; water makes exploration possible; silver gives trading options. Taking more is a choice with costs, rather than the automatic route to success.

The immediate question should be clear: “What do I need next, and can I safely reach it?” The longer question is: “Can I sustain this household over many days?”

### Design pillars

1. **Readable survival.** Show food needs, remaining time, water, and wellbeing. Explain the cause of losses and gains.
2. **Useful exploration.** Camp, water and shelter must change the player's route. Landmarks should be recognisable and reachable.
3. **Understandable risk.** Extra gathering costs time, effort and water; unsold surplus spoils. Hunger is a food shortage, not a failure to sell food.
4. **Mobile first.** Controls must work with thumbs, recover from interrupted touches, and leave a clear view of the player.
5. **Restraint and care.** The Exodus setting informs gathering, household responsibility, Sabbath, generosity and temptation. Narrative systems should support survival rather than obscure it.

## 3. Current playable loop — implemented

| Phase | Player experience | Transition |
|---|---|---|
| Start | Play immediately with Judah + Single, continue a saved journey, or customise tribe and household | Enter the day |
| Dawn | Daily market conditions are calculated; tithe, blessings and Sabbath rules run | Gathering begins |
| Gather | Collect manna, watch water and wellbeing, visit water or shelter, decide whether surplus is worth it | Timer reaches zero, or player chooses Make Camp near Camp |
| Food reservation | Set aside up to the household quota from the basket | Remaining basket becomes tradeable surplus |
| Market | Buy 5, Sell 5, Sell All, or leave; demand and stock constrain trades | Leave Market |
| Evening | Purchases first cover missing household food; remaining inventory is waste; legacy temptation/healing options appear | Rest until Dawn |
| Reckoning | Apply food/waste health consequences and score; show results; save | Next day or game over |

There is no mid-day trading. Returning to Camp finishes the gathering phase early; it does not open a shop while the day continues. If the timer expires elsewhere, the game currently advances to the market automatically. Forced travel back to camp, a missed-return penalty and rescue are **not implemented**.

The game is currently endless. Health reaching zero ends the journey. There is no final victory, campaign ending, multiplayer or leaderboard.

## 4. Resources and rules — implemented

| Resource | Meaning | Persistence |
|---|---|---|
| Wellbeing / health | 0–100; lost through movement, dehydration, shortages, waste and existing wilderness events | Across days |
| Water / hydration | 0–100; falls during gathering, faster in exposed midday heat | Carries between days with an overnight refill |
| Manna gathered | Count of world pickups gathered today; used for progress and part of scoring | Resets each day |
| Basket | Manna still available for food reservation or trading | Resets each day |
| Food reserved | Manna assigned to the household; cannot be sold | Resets each day |
| Silver | Currency for food and existing wilderness choices | Across days |
| Score | Pickup points plus the current surplus-based day bonus | Across days |

### Food and waste

At the end of gathering:

- `foodReserved = min(quota, basket)`.
- Subtract reserved food from the basket.
- Only the remaining basket enters the market.
- When leaving the market, bought manna first fills any household food shortage. Anything remaining is surplus that spoils.

Example: quota 10 and basket 14 reserves 10 food and offers 4 for trade. Selling those 4 does not make the household hungry. If only 6 food was reserved, buying 5 supplies the missing 4; the remaining 1 must be sold or it becomes waste.

At reckoning, current health adjustments are:

- Food shortage: lose `1.2 × missing food` health.
- Enough food gathered and zero waste: gain 8 health.
- Otherwise, when there is surplus waste: lose `1.5 × wasted manna` health.
- These branches are mutually exclusive: a shortage currently takes precedence over waste damage.
- Health is clamped to 0–100. A purchase that fills the quota prevents hunger, but does not earn the gathering-based health bonus if the gathered total remains below quota.

Current scoring gives 1 point per manna pickup, plus `max(0, gathered − quota − waste)` at day end. This rewards sold surplus; it is **not** a separately implemented fixed “perfect day” score bonus. Whether this score incentive fits the restraint theme needs playtesting.

### Daily weather — implemented

`WeatherManager.js` defines a repeatable four-day cycle: **clear → heatwave → desert wind → light rain**. The day number determines the forecast, so save/load does not reroll weather. Day one is clear. Each dawn announces the forecast; the survival HUD displays current weather.

- Clear: normal thirst, with extra exposed midday loss.
- Heatwave: heat lasts all day, with an exposed thirst multiplier of 1.45 (3.335 water per second).
- Desert wind: exposed thirst multiplier of 1.15, and exposed movement health cost ×1.35. Normal midday heat also applies.
- Light rain: no midday heat; exposed thirst is 0.85 ×0.25 = 0.2125 per second. Rain does not refill water.
- Shelter removes weather multipliers and extra heat, retaining baseline 0.85 thirst per second. Actual water sources still refill at 12 per second.
- Sabbath prevents thirst and extra wind effort regardless of weather.
- Wind/rain visuals use bounded Three.js points (96 on the touch/small-screen profile; 180 otherwise). Oasis mist uses 16 Partykals particles. Weather visuals hide while paused or outside gathering.

This is an initial predictable weather system. Random storms, wetness, lightning, rain audio, weather-dependent spawns and forecast uncertainty are not implemented. The balance requires multi-day playtesting.

### Water, heat and shelter

| Rule | Current value |
|---|---:|
| New journey hydration | 100 |
| Clear-weather water loss | 0.85 per second |
| Clear-weather exposed midday water loss | 2.3 per second |
| Midday window | After 30% and before 75% of the day has elapsed |
| Standing near a water source | +12 water per second, up to 100 |
| Water collectible | +24 water, up to 100 |
| Dehydrated health loss | 2.5 per second while water is zero |
| Overnight water recovery | +45, up to 100 |

Water sources are the Oasis (within 8 world units) and Split Rock (within 11). Shelter covers those water zones, Camp (10) and Temple (13). Shelter prevents the extra midday water loss; it does not stop normal thirst. Water areas refill hydration without consuming a collectible. This makes water recovery repeatable while health pickup recovery remains limited.

Hydration is independent from health. It currently does not change movement speed. There is no stamina meter, sprinting, crafting, equipment durability or temperature meter.

### Movement and health recovery

Movement speed, steering, jump integration and movement health cost are scaled by elapsed frame time. Difficulty is the chosen tribe profile multiplied by the household modifier. Global movement drain multiplier is 0.3.

Split Rock water collectibles and Temple rest collectibles each restore 4 health per pickup, subject to an actual-health-gained cap of 10 health per type per day. Each location initially spawns 6 recovery pickups. Standing at water restores water, not unlimited health.

## 5. Days, households, market and faith

### Current defaults

- Day length: 60 seconds. This is a balancing starting point, not a confirmed target session length.
- Starting silver: 50 plus the tribe's starting-money modifier, before dawn events.
- Starting health: tribe profile; hydration starts at 100.
- Household: Single = speed ×1.15, pickups ×0.85, quota ×0.8, movement drain ×0.85. Couple = ×1 throughout. Family = speed ×0.85, pickups ×1.15, quota ×1.25, movement drain ×1.15.
- Manna spawn count also uses a global ×2 multiplier.
- Every sixth day in a seven-day cycle doubles the food quota.
- Every seventh day is Sabbath: no manna spawns, no movement health drain, no thirst drain, no market/evening trade; existing dawn/rest rules apply.
- Day-six preparation does **not** currently carry food into Sabbath. Sabbath is mechanically protected rest, not a simulated stored-food day.

The twelve tribes and their base movement, food, drain and starting-resource profiles are defined in `js/tribes.json`. Quick Play uses Judah + Single; custom selection remains Tribe → Household. Internal `world.difficulty` stores household size.

### Market

A simulated household economy sets price, demand, available stock and mood before gathering. The UI reveals them at market time. Defaults include base sell price 4 silver, buy price 6 silver, minimum calculated demand 5 and a 60% chance of a quiet market after the first day. Actual demand can be zero. Selling cannot exceed remaining demand; buying cannot exceed stock or affordability. Market closure never removes reserved household food.

Prices, demand and quiet-market odds need balance testing. Visible forecasts before gathering are **planned**, not implemented.

### Existing faith systems

Dawn tithes, Levite exceptions, blessings, Golden Calf temptation, wrath, plagues, Bronze Serpent healing and cumulative faith statistics remain in the prototype. Exact rules live in `js/wilderness-day-cycle.js`, with integration in `js/WildernessManager.js` and settings in `js/config.js`.

These are secondary systems. Do not describe them as a replacement for food and water survival. The evening choices are still relatively complex and are a candidate for progressive introduction after the first successful day. They are not currently tutorial-gated.

## 6. World and controls — implemented

| Place | World X, Z | Purpose |
|---|---|---|
| Camp | 20, −20 | Finish the day early within 12 units; shelter within 10 |
| Oasis | −25, −15 | Repeatable water refill and shelter |
| Split Rock | 0, 25 | Repeatable water refill and limited healing pickups |
| Temple | −20, 20 | Shelter and limited rest/healing pickups |
| Wilderness | 25, 15 | Exploration landmark |

Desktop: WASD or arrows; left/right steer the heading, forward/back move along it. Click ground to walk. Space jumps. Escape pauses/resumes.

Touch: a thumb D-pad and central jump button appear automatically on coarse-pointer devices. Pointer capture and release/cancel handlers prevent stuck inputs. The page pauses when hidden and clears movement when focus is lost. The direction guide uses world directions; there is no minimap or live compass yet.

The interface uses a compact HUD, water/heat/objective guidance, a Camp action, wellbeing bar, and Pause / Audio / Credits / Help controls. Advanced tribe/household setup is optional. Long dialogs scroll within the viewport; touch controls use explicit grid positions and safe-area spacing. Real-device portrait, landscape and browser-toolbar behaviour still require acceptance testing.

## 7. Terrain, collisions and effects — implemented

- Three.js desert with procedural OpenSimplex terrain, wind ripples, grain texture, smooth height colour transitions, sky, fog, shadows, bloom and vignette.
- Tiles are now 96 world units with 80 subdivisions per edge; a 3×3 neighbourhood follows the player. The former 1,000-unit tiles were too coarse near the player.
- Texture UVs use world coordinates so neighbouring tiles align. Shared textures are retained when tiles unload; cached height grids are removed with their tiles.
- Ground height follows the same triangles as the rendered mesh.
- Circular obstacle push-out uses world position and scale, two passes, and a deterministic escape direction for exact centre overlap. It remains an approximation, not mesh-accurate physics.
- Pickups search for clear positions outside collider footprints. Existing landmark collision volumes can still be broader than the visible architecture; walking inside buildings is not an implemented feature.
- Partykals supplies dust, fire, smoke, embers, landmark sparkles and world-space pickup bursts. The VFX references below were reviewed; their runtimes were **not integrated**.

## 8. Audio, credits and third-party references

**Implemented DailySounds assets:**

| Asset | Source | Use |
|---|---|---|
| Desert Winds Ambiance | https://dailysounds.org/sounds/1439 | Looping gameplay ambience |
| Water Bubbling | https://dailysounds.org/sounds/1497 | Trimmed water pickup cue |
| Picking Up Pocket Change | https://dailysounds.org/sounds/1744 | Trimmed buy/sell cues |

The Credits dialog contains **“Sound effects from DailySounds.org”**, individual sound links and the license link. Local provenance is recorded in `assets/audio/CREDITS.md`. The [DailySounds license](https://dailysounds.org/license), checked 23 October 2026, permits personal/commercial games and editing; it prohibits redistribution as a standalone sound library and claiming original recording authorship. Existing music and remaining prototype effects are retained; their original provenance has not been re-audited.

Howler handles playback. Short cue cooldowns limit overlapping sound; pickup pitch varies subtly. Browser autoplay policy still applies. Per-channel volume controls and spatial footsteps are not implemented.

Effects references supplied for investigation:

- [NixieFX](https://nixiefx.com/) — Three.js particle editing/runtime workflow.
- [Effekseer WebGL sample](https://effekseer.github.io/EffekseerForWebGL/Sample/index.html) — authored WebGL effects reference.
- [ShaderParticleEngine](https://squarefeet.github.io/ShaderParticleEngine/) — GPU particle approach/reference.

The immediate prototype retains its existing particle engine. Adding another engine requires a specific visual need and measured mobile benefit.

## 9. Technical ownership and persistence

| File | Responsibility |
|---|---|
| `js/Game.js` | State transitions, timer, gathering, survival pressure, food reservation and daily accounting |
| `js/GameState.js` | Shared persistent resources and session counters |
| `js/config.js` / `js/tribes.json` | Tunable defaults / tribe base profiles |
| `js/PlayerManager.js` | Movement, animation, jumping, obstacle resolution |
| `js/SceneManager.js` | Terrain, landmarks, clear pickup placement |
| `js/UIManager.js` / `index.html` | Screens, HUD, feedback and credits |
| `styles/survival.css` | Current responsive survival UI overrides |
| `js/AudioManager.js` / `js/ParticleManager.js` | Audio / particle playback |
| `js/WeatherManager.js` | Daily forecasts, exposure rules and bounded wind/rain visuals |
| `js/SaveManager.js` | LocalForage save/continue |
| `js/WildernessManager.js` / `js/wilderness-day-cycle.js` | Faith/economy integration / rule engine |
| `vite.config.js` | Build aliases and copying runtime assets into the output |
| `tests/survival.test.mjs` | Regression checks for core repaired rules |

Save/continue persists resources, location, day, time and wilderness state through LocalForage. Resuming gathering preserves remaining time. Market, evening and reckoning phases reopen their matching UI. Saves are local to the browser; there is no cloud sync.

**Known limitation:** exact remaining world pickups and random market/world seeds are not snapshotted. Loading during gathering can regenerate pickups. Do not claim deterministic, exploit-proof or exact-world restoration. Save-format migration and full inventory snapshots are follow-up work.

## 10. Verification and release gate

Verified during this update:

- Production build completes and explicitly copies audio, tribe data, fonts and legacy browser scripts.
- Browser startup reaches the menu and Quick Play renders a playable 3D scene.
- Fourteen automated regression checks pass: survival accounting, heat/water behaviour, collision and movement, triangle-ground interpolation, effect isolation/expiry/cleanup, visible camp props, local dependency references, world rebuild disposal, daily weather/exposure and bounded weather particles.

Still required before calling this a finished survival game:

- Test a complete multi-day journey, including sixth-day preparation and repeating Sabbaths.
- Test actual iOS Safari and Android Chrome in portrait/landscape, including simultaneous movement+jump, interrupted touches, safe areas and address-bar changes.
- Confirm all HUD/actions stay inside the viewport at 320px width and short landscape heights.
- Listen to the audio mix on phone speakers/headphones; verify mute, pause, resume and autoplay behaviour.
- Measure frame rate, memory and battery impact on a representative lower-end phone.
- Confirm water detours and health costs create decisions without making the first day punitive.
- Verify save/load across every phase, then address pickup regeneration before persistent progression matters.

Build success is not proof of mobile usability or balanced survival.

## 11. Prioritised next decisions — planned, not shipped

1. **Playtest the first three days.** Target a clear first successful day, followed by harder route choices. Adjust day length, food density and drain based on observed play rather than adding meters.
2. **Improve navigation.** Add a small heading/landmark compass, reachable-distance cues and a water detour hint. Current cardinal text is insufficient when the camera turns.
3. **Extend forecasts after playtesting.** Daily weather forecasts now exist. Next consider a tomorrow preview and market-demand forecast; avoid storms/disasters until the current weather is balanced.
4. **Make return meaningful.** Decide whether a dusk return is required, rewarded, or optional. Current automatic dusk transition is intentionally recorded above; no penalty should be described until implemented and taught.
5. **Simplify the evening.** Introduce faith choices progressively, combine redundant panels, and make food eaten / surplus sold / waste / health change explicit in one summary.
6. **Protect progression.** Snapshot pickups and randomness; add save migration/versioning and round-trip regression coverage.
7. **Add longer-term purpose.** Consider a seven-day expedition milestone and household/camp improvements. No upgrades, crafting or campaign promises are committed yet.

## 12. Change record

**23 October 2026:** Established the modular survival prototype as the sole active reference; replaced the stale sell-everything food model with reserved household meals; added hydration, midday heat, water/shelter utility and early Camp finish; repaired startup wiring, touch release, frame-dependent movement, terrain density/interpolation and clear pickup placement; added DailySounds audio and a Credits dialog; documented verification limits and separated proposals from implemented behaviour.

**23 October 2026 — migration audit:** Repaired particle lifetime/blending settings, conflicting pickup-size options and shared emitters; added Oasis mist and world-rebuild cleanup; restored visible tents/stalls; completed scenery surface placement and time-scaled bird movement; verified local dependency references. Added a predictable daily weather cycle with dawn forecasts and exposure rules. Fourteen regression checks and the production build pass; real-device and multi-day balance testing remain open.
