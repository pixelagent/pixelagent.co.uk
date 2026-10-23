# Mana Migration Plan

Reviewed against the active `Mana_v1` modular prototype on **23 October 2026**.

**Result:** the useful implementation tasks in this plan are complete following the fixes below. Automated checks pass; the manual playtesting checklist remains open and must not be treated as completed migration work. The canonical gameplay reference is [docs/SOURCE_OF_TRUTH.md](docs/SOURCE_OF_TRUTH.md).

## Review findings and fixes

| Area | Finding before review | Current result |
|---|---|---|
| Dust, fire, smoke, embers, sparkles | Present, but particle lifetime used an unsupported `lifetime` field | Uses Partykals `ttl`; additive/normal blending now uses its supported API |
| Pickup bursts | Conflicting `size` and `startSize` could throw during collection | Uses randomised `startSize`; repeat bursts tested |
| Emitter reuse | Instances shared mutable emitter state | Fresh particle/system options and emitters for every instance |
| Oasis | Mist was a placeholder | Subtle bounded mist identifies the water landmark |
| World rebuild | Left scenery effects and nested resources behind | Clears effects, resets dust attachment, disposes nested/shared resources once |
| Camp props | Tents and market stalls created colliders but omitted visible groups | Visible groups added and registered for cleanup |
| Terrain grounding | Several scenery placements still used analytic noise | Landmark/scenery placement uses the rendered surface cache |
| Bird motion | Movement depended on frame rate | Travel and steering scaled by elapsed time |
| Plugins | Required files existed, without a repeatable audit | Automated check verifies local scripts, stylesheets and import-map targets exist |
| Weather | Not implemented | Daily clear/heat/wind/rain forecasts, thirst/effort consequences and bounded visual particles |

Quarks files are present but unused by the active game; keeping them does not mean Quarks is integrated. Partykals remains the scenery/pickup engine, while `WeatherManager` uses bounded Three.js points for weather. Another particle runtime is not needed for these tasks. Generic magic effects remain deferred because no current survival mechanic uses them.

Validation: `node --test tests/*.test.mjs` — **14 passing**. `npm run build` — **passes**, with existing bundle-size and legacy-script warnings. Runtime assets are copied by the build configuration. External fonts/icons and the debug GUI CDN are still network dependencies; this is not an offline-certification result.

## Completed (config-focused changes)

### Game.js
- [x] Import `FastNoiseLite` instead of `simplex-noise`
- [x] Move terrain config to use `gameConfig.terrain.*` values
- [x] Move lighting to use `gameConfig.scene.ambientLight.intensity`
- [x] Move hemisphere light to use config colors and intensity
- [x] Move sun light to use config position, intensity, shadow properties
- [x] Move fog to use config values
- [x] Move camera FOV to use `gameConfig.camera.initialFov`
- [x] Move toneMappingExposure to use config value
- [x] Move market values to use config (`baseSellPrice`, `demandFactor`, `closedChance`, `minDemand`)
- [x] Move gameplay values to use config (`healthPenaltyMultiplier`, `healthBonusNoWaste`, `healthPenaltyWasteMultiplier`, `quotaDoubleDay6`)
- [x] Add `tileHeightGrids` caching for performance
- [x] Add `getSurfaceHeight()` method for accurate terrain height lookup
- [x] Add `rebuildWorld()` method for scenery clearing
- [x] Add throttled tile updates (`tileUpdateTimer`, `tileUpdateInterval`)
- [x] Update GUI to use config-based terrain controls

### PlayerManager.js
- [x] Use config values for bob animation (`gameConfig.player.bob.speed/amount`)
- [x] Use config values for idle animation (`gameConfig.player.idle.speed/amount`)
- [x] Use `getSurfaceHeight()` instead of `getTerrainHeight()` for proper player placement

### SceneManager.js
- [x] Import config for all changes
- [x] Add `scenery` array support
- [x] Use `MeshStandardMaterial` with vertex colors for rocks
- [x] Update mana pickup material to use white with emissive
- [x] Use config values for birds (count, flightHeight, speed, bounds, flapAmount, bobAmount, turn)
- [x] Use `getSurfaceHeight()` for pickups and scenery
- [x] Add `tileHeightGrids` caching in `createTile()`

### index.html
- [x] Use local FastNoiseLite and the lil-gui CDN; the production entry imports FastNoiseLite directly
- [x] Remove simplex-noise and localforage CDN references
- [x] Copy FastNoiseLite.js, three.quarks.esm.js, quarks.core.esm.js to plugins

## Remaining Changes (not yet migrated)

### Useful additions — completed in this review
- [x] Audit and repair dust, campfire, smoke, embers, sparkles and repeated pickup effects.
- [x] Add a subtle Oasis water cue.
- [x] Verify required local plugin/script/import-map files exist.
- [x] Verify repeated burst expiry and complete effect cleanup.
- [x] Add weather with a forecast and meaningful survival consequences.
- [x] Keep generic magic and additional particle-engine migrations deferred until needed.

## Key Improvements for Lighting & Movement

1. **Lighting Config Integration**: All lighting parameters now come from config, enabling easy tuning
2. **FastNoiseLite**: Local noise implementation replaces simplex-noise; no comparative performance benchmark has been run
3. **Surface Height Cache**: `getSurfaceHeight()` uses cached grid data for O(1) terrain height lookup instead of raycasting
4. **Throttled Tile Updates**: Tiles only update every 0.5 seconds, not every frame
5. **Improved Rock Materials**: Vertex-colored MeshStandardMaterial for better visual variation
6. **Configurable Mana Pickups**: Uses white base with emissive glow
7. **Better Player Grounding**: Player now aligns to actual rendered terrain mesh, not analytical noise

## Testing Notes

After migration, verify:
- [ ] Visually check terrain colours and tile edges on actual phones.
- [ ] Walk and jump across slopes and landmark edges.
- [ ] Check day/night lighting, sun, ambient light and fog on target devices.
- [ ] Observe birds over a longer session and confirm wrapping/animation.
- [ ] Collect multiple manna and recovery pickups; confirm audio and visual feedback.
- [ ] Play through market buying/selling, demand limits and food reservation.
- [ ] Play the four weather types; assess route choices, warning clarity and water availability.
- [ ] Measure weather effects and rebuild memory on lower-end phones.

Automated checks cover several underlying rules and resource lifecycles. They do not replace these visual, balance and device checks.