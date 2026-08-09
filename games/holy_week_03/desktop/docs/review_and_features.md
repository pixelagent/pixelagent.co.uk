# Folder Review: Example 02 - Content Expansion

## Current Features
### 1. Multi-Case Support
Expands beyond the Temple to include the **Bethany / Lazarus Conspiracy**.
- Introduces `act2CaseB` (The Price of Life).
- Includes unique locations like "Bethany Road" and "Simon the Leper's house."

### 2. Extended NPC Cast
Adds critical characters for the Lazarus plot:
- **Annas:** The power behind the high priesthood.
- **Martha:** A high-truthfulness witness.
- **Nicodemus:** A "Conflicted" NPC who helps the player by leaking secrets.

## Missing Features (To be ported from 01)
- **Branching Narratives:** [PORTED] Added `generate_ink.py` to create complex dialogue for all Case B NPCs.
- **NPC Interaction System:** [IN PROGRESS] The player needs the UI hook to trigger these new Ink files via proximity.
- **Analysis Depth:** The deductions in Case B are thinner than Case A.

## Suggested Improvements
1.  **"Accuse Anyone" System:** 
    - Implement a proximity-based interaction where walking up to *any* NPC opens a "Challenge" menu.
    - This menu should allow the player to present *any* item from their inventory, triggering the `reactions` logic defined in the JS.
2.  **Lazarus Forensic System:**
    - Use the `grave_dirt` evidence to create a "Forensic Analysis" mini-game (e.g., matching the scent of the dirt to the `secret_decree`).
3.  **NPC Behavior Loops:**
    - Give the "Temple Spy" a patrol path. If the player is caught investigating "Construction Debris" without a high enough reputation, the spy should block access.
4.  **Unified Narrative Generator:** 
    - Update `generate_ink.py` to include the Bethany NPCs so their dialogue is as deep as the Jerusalem locals.

## Feature Comparison Table
| Feature | Example 01 | Example 02 |
| :--- | :--- | :--- |
| Branching Dialogue | Yes (Ink) | **Yes (Ink Ported)** |
| Multiple Cases | No | Yes (2 Cases) |
| Contradiction Logic | High | Medium |
| Prophetic Fulfillment| Deep | Basic |