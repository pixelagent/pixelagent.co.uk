# Systems Migration Guide: From 2D (Example 01) to 3D (Example 02)

This document outlines the strategy for porting the complex deduction, interrogation, and codex systems from the 2D prototype into the 3D spatial world.

## 1. The Codex System (Evidence & Metadata)
Example 01 has a much richer data structure for evidence, including prophecies and detailed investigator notes.

### Migration Steps:
- **Data Merge:** Copy the `prophecies` and `contradictions` objects from `js/act1_case.js` (and subsequent act files) into your consolidated case files.
- **Detail Modal Port:** Port the HTML structure for `#evidence-detail-modal` and its associated CSS. 
- **Bible Integration:** Update `BibleReader2.js` in Example 02 to accept the `bibleRef` from your evidence metadata. Use the `fetchVerse()` logic from Example 01 to populate the "Read Full Verse" section of the codex.
- **UI Trigger:** In Example 02, clicking an evidence slot in the sidebar should open this rich modal instead of a simple alert or small popup.

## 2. The Lab System (Deduction Engine)
The "brain" of your game (`deductionEngine.js`) is identical across both versions. The challenge is the UI transition.

### Migration Steps:
- **Sidebar Integration:** In the 3D view, use the left sidebar as the "Lab" input.
- **Selection Logic:** 
    - Clicking an evidence icon in the sidebar should "select" it for analysis (indicated by a glow or border).
    - When exactly two items are selected, a "Run Analysis" button should appear in the Actions panel.
- **Investigation Board:** Instead of a tab, create a 3D-styled overlay (The "Investigation Board") that shows the results of `deductionEngine.analyze(A, B)`.

## 3. The People System (Spatial Interrogation)
In Example 01, you select people from a list. In Example 02, the player must physically find them in the world.

### Migration Steps:
- **Proximity Trigger:** Use the existing `findNPC()` logic in Example 02 to detect when the player is near an NPC.
- **The Challenge Action:** 
    - The "Challenge" action should only appear in the **Right Sidebar (Actions Panel)** when the player is standing next to an NPC AND has two pieces of evidence selected in the left sidebar.
    - Logic: `Challenge [Evidence A] + [Evidence B]`.
- **Pressure & Mood:** 
    - Port the `pressureLevel` and `mood` state machine from Example 01's `npcSystem.js`.
    - **Visual Feedback:** Instead of a static bar in a card, consider showing the mood/pressure as a UI element floating above the NPC's head in the 3D space or as a meter in the WhatsApp-style chat overlay.

## 4. The Accuse System (Spatial Climax)
Accusation moves from a menu button to a deliberate world interaction.

### Migration Steps:
- **Activation Condition:** The "Accuse" option should only be unlocked once the `quest.cur >= quest.tar` (all evidence collected).
- **Interaction:** 
    - The player must navigate to the NPC they believe is the culprit.
    - Upon interacting (`E` key), an "ACCUSE" choice should appear in the dialogue menu.
- **The Verdict:** Port the `calculateScore()` and the "Truth Reveal" screen from Example 01. This is critical for the educational component, showing the motive, method, and biblical lesson upon completion.

## 5. UI/UX Mapping

| Feature | Example 01 (2D) | Example 02 (3D) Implementation |
| :--- | :--- | :--- |
| **Finding Evidence** | Unlocked via dialogue | Spatially hidden in world / spawned by dialogue |
| **Viewing Codex** | Evidence Tab grid | Left Sidebar icons (Click to expand) |
| **Selecting Lab Pair** | Checkboxes in Lab Tab | Click sidebar icons to toggle "Selected" state |
| **Finding NPCs** | People Tab list | Minimap Radar / Exploration |
| **Interrogation** | "Talk" button in card | Approach NPC + `E` key to open Chat Overlay |
| **Challenging** | Button in NPC card | "Challenge" button in Right Sidebar Actions |
| **Accusing** | Accuse Tab | Interactive dialogue choice on specific 3D NPCs |

## 6. Technical Checklist

1. [ ] **Copy Styles:** Move `.evidence-detail-modal`, `.mood-indicator`, and `.pressure-bar` styles to `css/components.css`.
2. [ ] **Update Case Files:** Ensure `js/act3_case.js` contains the `contradictions` mapping for `npcSystem.challenge()`.
3. [ ] **Refactor Controls:** Update `controls.js` to manage the "Challenge" and "Accuse" button visibility based on `nearestNPC`.
4. [ ] **Port Scoring:** Move the `submitAccusation` logic from Example 01's `caseManager.js` to Example 02 to handle result screens and ranks.
5. [ ] **Unify Audio:** Ensure breakthrough sound effects (`breakthrough.mp3`) are triggered via the `AudioManager` in Example 02 during successful challenges.

---
*Note: Example 02's strength is immersion. Ensure that when a challenge is successful, the 3D world reflects it (e.g., the NPC's light changes color or a "Breakthrough!" alert flashes across the 3D view).*