# Example 02 — Detailed System Review

## Overview

**Location:** `tests/example_02/`
**Architecture:** Three.js 3D environment + modular CSS + tabbed overlays
**Core Files:**
- `index.html` — Main shell with 3D canvas, HUD layers, modals (1913 lines)
- `styles/variables.css`, `ui-layout.css`, `gameplay.css`, `components.css` — Modular CSS
- `caseManager.js` — Same core as 01
- `evidenceSystem.js` — Extended with `unlock()` / `isUnlocked()` / `unlockedIds`
- `npcSystem.js` — Similar state machine but slightly simplified
- `deductionEngine.js` — Identical to 01
- `chatUI.js` — Simplified feed, no per-NPC message history
- `labUI.js` — Same as 01
- `locationSystem.js` — Same as 01
- `accessibility.js` — Same as 01
- `audioManager.js` — Same as 01
- `dialogueManager.js` — Same Ink wrapper
- `controls.js` — **NEW:** Keyboard input (WASD, Space, E, M, R)
- `environment.js` — **NEW:** Day/night cycle lighting
- `mapModal.js` — **NEW:** 3D orbital case selection
- `BibleReader2.js` — **NEW:** Bible verse API with translation support
- `act1-4_case_3d.js` — Extended case data
- `story/` — 38 `.json` + `.ink` files 

---

## System 1: 3D World Engine (NEW in 02)

### How It Works
- Three.js WebGL renderer with `PerspectiveCamera`
- Player is a cone mesh with attached point light (torch)
- Ground plane, directional lights (sun + moon), ambient light
- `requestAnimationFrame` game loop in `GameEngine.animate()`
- Player movement via WASD/Arrow keys with gravity and jumping
- Third-person camera follows player with smooth lerp

### Key Components
```javascript
// GameEngine state
this.pPos = new THREE.Vector3(0, 1, 15);     // Player position
this.pVelocity = new THREE.Vector3();          // Movement velocity
this.camHeading = new THREE.Vector3(0, 0, -1); // Camera direction
this.isGrounded = true;
this.nearestNPC = null;
this.inDialogue = false;
this.npcMeshes = [];       // 3D NPC objects
this.evidenceMeshes = [];  // 3D evidence objects
this.lockedEvidence = {};  // Evidence not yet revealed
```

### Strengths
- Immersive spatial environment
- Smooth movement and camera
- In-world proximity tags for NPCs and collectibles
- Day/night cycle with torch lighting
- Minimap/radar showing NPC and evidence positions

### Weaknesses
- No collision detection with world boundaries (only NPC blocking)
- Evidence spheres are simple glowing orbs (no detail)
- No terrain variety (flat ground only)
- Performance may struggle on lower-end devices

---

## System 2: Proximity-Based Evidence Collection (NEW in 02)

### How It Works
- Evidence starts as `lockedEvidence` entries (no 3D object)
- NPCs unlock evidence via dialogue/reactions → `_unlockEvidence()` spawns a glowing sphere
- Player walks near sphere (distance < 2) → auto-collects
- Collected evidence stored in `collectedEvidence[]` array
- UI shows evidence grid with emoji/FA icons
- Click evidence slot → shows popup with details

### Unlock Flow
```
NPC dialogue choice → revealedClue
  → _unlockEvidence(evidenceId)
    → es.unlock(id) — marks as collected
    → Spawns THREE.Sphere at ev.pos
    → Pulse animation on sphere
    → Chat message: "EVIDENCE REVEALED: go collect it!"
    → Quest progress advances
```

### Strengths
- Spatial discovery (walk to collect)
- Visual pulse animation on new evidence
- "Locked" hints when near un-unlocked spots
- Quest tracking integrated
- Evidence grid in left sidebar always visible

### Weaknesses
- Evidence positions are hardcoded in case data (`pos: [-15, 0, -10]`)
- No randomization or dynamic placement
- No "examine" interaction — just proximity collect
- Can't see evidence details before collecting
- Some evidence may be missed if player doesn't explore

---

## System 3: Proximity-Based NPC Interaction (NEW in 02)

### How It Works
- NPCs placed as BoxGeometry meshes at `npc.pos` coordinates
- `findNPC()` runs each frame, finds nearest NPC within 6.5 units
- In-world HTML tag appears above nearest NPC ("Talk to [Name] [E]")
- Player presses E or clicks tag → opens WhatsApp-style dialogue overlay
- Hard collision: player can't walk through NPCs
- `updateInWorldTags()` projects 3D positions to 2D screen coords

### Interaction Flow
```
Player approaches NPC (within 6.5 units)
  → nearestNPC updated
  → Actions panel shows "Talk to [Name]"
  → In-world tag appears above NPC
  → Press E / click tag
    → vn-overlay opens (WhatsApp style)
    → Dialogue begins
    → Player can talk, show evidence, challenge
```

### Strengths
- Immersive spatial presence
- Clear proximity feedback (in-world tag + actions panel)
- Collision blocking adds physicality
- Keyboard shortcut (E) for fast interaction

### Weaknesses
- NPCs are static boxes (no animation or distinct visuals)
- Only nearest NPC interactable at a time
- No NPC AI or wandering
- Dialogue overlay covers screen (can see 3D world behind)

---

## System 4: Dialogue System (Overhauled in 02)

### How It Works
- WhatsApp-style modal overlay (`vn-overlay`)
- Avatar bubble, speaker name, status indicator
- Message bubbles with typing animation
- Choice buttons at bottom
- Multi-stage conversation:
  - **initial:** Dialogue options + "Show evidence" options
  - **followup:** After pressing, offer deeper probing or expose
  - **closing:** End conversation

### Dialogue Stages
```javascript
_renderChoices(npcConfig, stage) {
  if (stage === 'initial') {
    // Dialogue branch buttons (cautious, pressured, exposed, friendly)
    // Evidence show buttons (for reactions this NPC has)
    // "Press harder" probe button
  } else if (stage === 'followup') {
    // "I think you're hiding something" → exposed
    // Close button
  }
}
```

### Key Differences from 01
| Aspect | Example 01 | Example 02 |
|---|---|---|
| UI Style | Sidebar NPC cards | WhatsApp modal overlay |
| Ink Integration | Full Ink narratives | Simplified (only 1-line JSON) |
| Message History | Per-NPC feed in cards | Single global feed |
| Evidence in Dialogue | Separate picker | Inline choice buttons |
| Closing Flow | Manual | "End conversation" button |
| Typing Animation | None | 3-dot typing indicator |

### Strengths
- More immersive chat UI
- Inline evidence options in choices
- Typing animation adds character
- Cleaner visual design

### Weaknesses
- **Porting in progress** — while core narratives are being restored, several legacy JSON files still require full conversion from the rich Ink source.

---

## System 5: Accuse System (Modified in 02)

### How It Works
- Triggered when quest reaches `cur >= tar` via `advanceQuest()`
- Opens accusation inside the WhatsApp-style overlay
- Player clicks suspect button → `endInvestigation(correct, name)`
- Shows result message in chat, then "New Investigation" button
- End screen with "CASE CLOSED" overlay

### Key Differences from 01
| Aspect | Example 01 | Example 02 |
|---|---|---|
| Trigger | Manual tab switch | Automatic when quest complete |
| UI | Dedicated accuse tab | WhatsApp-style suspect buttons |
| Result | Full detail screen | In-chat message + end screen |
| Score | Detailed breakdown | Simple correct/wrong message |
| Replay | Back to map | "New Investigation" reload |

### Strengths
- Automatic trigger when all evidence collected
- Integrated into dialogue flow
- Clean end-game screen

### Weaknesses
- No score breakdown display
- No rank progression shown
- No "truth" reveal on wrong answer (just name)
- Loses educational content from result screen
- No play-again within session (forces reload)

---

## System 6: Challenge System (Modified in 02)

### How It Works
- Player selects two evidence in left sidebar grid
- Challenge button appears in right sidebar Actions panel
- Shows selected evidence names: `Challenge [A+B]`
- Click Challenge → `_playerChallengedNPC()`:
  1. Adds player message to chat
  2. Calls `ns.challenge(npcConfig.id, evidenceA, evidenceB)`
  3. Shows NPC response (breakthrough or not)
  4. On breakthrough: pressure +40, mood update, sound effect
  5. Re-renders choices (followup stage)

### Key Differences from 01
| Aspect | Example 01 | Example 02 |
|---|---|---|
| Selection | Lab tab checkboxes | Sidebar grid click |
| Button Location | NPC card | Right sidebar actions |
| Result Display | Challenge-result panel | In-chat message |
| Pressure Update | Via state object | Direct mesh.userData update |
| Breakthrough | Badge + sound | Sound + mood change |

### Strengths
- Always-visible challenge button in sidebar
- Clear evidence pairing in grid (A/B selection styling)
- Integrated into dialogue flow
- Sound feedback on breakthrough

### Weaknesses
- No case-specific contradiction data in challenge responses (always generic fallback)
- `ns.challenge()` returns generic "You can't prove anything" instead of case-specific text
- Pressure system partially broken (updates `userData.npcState` but NPC system reads `npcStates` separately)

---

## System 7: Analysis System (Lab)

### How It Works
- Same core engine as 01 (`deductionEngine.js` identical)
- `LabUI` renders in two contexts:
  1. Lab tab (same tabbed UI as 01)
  2. Investigation Board overlay (modal)
- Evidence selection in sidebar grid also feeds Lab
- Operation buttons same as 01

### Strengths
- Dual presentation (tab + overlay)
- Evidence selection syncs between sidebar and Lab
- Same case-specific deduction logic

### Weaknesses
- Lab tab UI is secondary to sidebar in 02
- Investigation Board is a secondary feature
- No visual improvement over 01's Lab

---

## System 8: BibleReader System (NEW in 02)

### How It Works
- `BibleReader2.js` — standalone global `window.BibleReader` object
- Fetches from `bible-api.com` with configurable translation
- Caching system for fetched verses
- Local fallback for common references
- Settings panel for translation selection (WEB, KJV, BBE, OEB)
- Overlay modal for reading passages

### Features
```javascript
window.BibleReader = {
  translation: 'web',        // Current translation
  cache: {},                 // Verse cache
  localFallback: {...},      // Offline verses
  
  updateTranslation(val),    // Change translation
  fetchVerse(verseId),       // Async fetch
  displayPassage(ref),       // Show overlay
  closeOverlay(event),       // Hide overlay
  formatRef(raw),            // Parse reference string
}
```

### Strengths
- Multiple translation support
- Offline fallback for key verses
- Caching for performance
- Settings integration
- Clean modal reader UI

### Weaknesses
- BibleReader is global/globalThis, not module-scoped
- `api-bible.json` exists but unclear how used
- No integration with evidence detail modal (separate from 01's inline fetch)
- Translation doesn't persist across sessions

---

## System 10: Investigation Save System (NEW in 02)

### How It Works
- **Serialization:** `saveGame()` captures the active case ID, collected evidence, world-spawned evidence spheres, NPC moods/pressure levels, player coordinates, and the current environmental time.
- **Persistence:** Data is stored in `localStorage` under the key `holy_week_save_v1`.
- **Restoration:** `loadGame()` rebuilds the 3D world meshes based on the saved state, restores the player's spatial context, and updates the HUD trackers.
- **Auto-Save:** The game automatically triggers a save whenever the player successfully advances a quest (e.g., by collecting evidence).

### Key Components
```javascript
// Save Data Structure
const saveData = {
  activeCaseId: this.activeCaseId,
  collectedIds: this.es.collected,
  unlockedWorldIds: this.evidenceMeshes.map(...),
  npcStates: this.ns.npcStates,
  playerPos: { x, y, z },
  time: this.envManager.timeProgress
};
```

### Strengths
- Seamless session continuation.
- Prevents progress loss during complex investigations.

---

## System 9: New/Enhanced Features

### Controls Manager (`controls.js`)
- WASD + Arrow key movement
- Space: Jump
- E: Interact with nearest NPC
- M: Open investigation map
- R: Toggle auto day/night cycle
- Sidebar toggle buttons (left/right panels)
- Alert display system

### Environment Manager (`environment.js`)
- Day/night cycle with sun/moon positions
- Sky color interpolation (day ↔ night)
- Torch intensity adjusts to darkness
- Auto-cycle or manual freeze

### Orbital Select Matrix (`mapModal.js`)
- 3D rotating core with case markers
- Act-based grouping (tree view sidebar)
- Drag to rotate, scroll to zoom
- Color-coded case markers
- Smooth open/close transitions

### Modular CSS (`styles/`)
- `variables.css` — Theme colors, typography, base resets
- `ui-layout.css` — Screen structure, grid overlays, wireframes
- `gameplay.css` — HUD panels, inventory, meters, radar
- `components.css` — Modals, screens, transitions, dialogue

### HUD System
- Top bar: location, act, level title, audio toggle, map button, settings
- Left sidebar: quest card, evidence grid, evidence popup
- Right sidebar: actions panel, key discoveries/prophecies
- Bottom bar: minimap/radar with blips for player, NPCs, collectibles

---

## Suggested Improvements for Example 02

### High Priority
1. **Finalize Ink Restoration:** Complete the porting of full branching narratives for all characters (Malchus, Pashhur, Longinus, and Chuza are done).
2. **Fix Challenge Contradictions:** Port the specific `contradiction` text objects from Example 01 case files into the Act III/IV improved case files.
3. **Sync Biblical Context:** Ensure the BibleReader system and evidence detail modals share the same translation settings.
5. **Add Score/Rank Display:** 02's accusation has no score breakdown. Port 01's scoring and rank display.

### Medium Priority
6. **Evidence Detail Modal:** 02 shows evidence popup but lacks the rich detail from 01 (bible refs, prophecy links, investigator notes).
7. **Accusation Education:** Add truth reveal (motive, method, lesson) on wrong accusation like 01 has.
8. **NPC Contradiction Data:** Port full `contradictions` objects from 01's act files to 02's act files.
9. **Case-Specific Deductions:** Verify 02's act files have the same `deductions` data as 01.
10. **Investigation Board Integration:** Make the Lab overlay functional with full case-specific deductions.

### Low Priority
11. **Bible API Consistency:** Unify BibleReader with evidence detail modal verses (currently separate systems).
12. **Translation Persistence:** Save selected Bible translation to localStorage.
13. **Minimap Enhancements:** Add evidence type icons to blips, show locked/unlocked status.
14. **NPC Visual Variety:** Replace box geometry with distinct models/sprites per NPC.
15. **Terrain Variety:** Add buildings, walls, and environmental obstacles.
