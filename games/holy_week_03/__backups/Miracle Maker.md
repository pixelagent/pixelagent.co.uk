# Miracle Maker - Source of Truth

## Table of Contents

- [Games](#gsames)
- [Linked Documentation](#linked-documentation)
- [Prophecy & Typology System](#prophecy--typology-system)
  - [Categories in the Codex](#categories-in-the-codex)
  - [Discovery Steps](#discovery-steps)
- [Codex: Biblical Patterns Section](#codex-biblical-patterns-section)
  - [Predictive Prophecies (Direct OT Predictions)](#predictive-prophecies-direct-ot-predictions)
  - [Typological Fulfilments (Types & Shadows)](#typological-fulfilments-types--shadows)
- [Typology Deep Dive: The Passover Lamb](#typology-deep-dive-the-passover-lamb)
- [Typology Deep Dive: The Priest-King of Salem](#typology-deep-dive-the-priest-king-of-salem)
- [Hidden Detective Chains](#hidden-detective-chains)
- [Scoring System](#scoring-system)
- [Prophecy Collection System](#prophecy-collection-system)
- [Cross-Reference: Story Files vs. `js/act*_case.js`](#-cross-reference-story-files-vs-jsact_casejs)
- Appendix: Emoji Reference
- Appendix: Character Emoji & Icon Reference
- Appendix: Location Emoji & Icon Reference

**Note on Suspects:** All characters involved in a case are considered potential suspects from the start. The final list of accusable suspects is fully unlocked once all prophecies/typologies for that case have been discovered.

This document serves as the canonical source of truth for the game's narrative structure, characters, and case resolutions for both mobile and desktop versions. It is generated from the `act*.js` case files.

---
[Back to Top](#table-of-contents)

---

## Gsames

Currently 3 versions all using a core gameplay 
*  [`/mobileA/`](../mobileA/)
*  [`/mobileB/`](../mobileB/)
*  [`/desktop/`](../desktop/)

## Linked Documentation

*   [**Holy Week Chronology**](`holy_week_chronology.md`) holy_week_chronology.md : The master timeline of events, locations, prophecies, and historical context.
*   [**Character Dialogue Profiles**](`Character_Dialogue_Profiles.md`) Character_Dialogue_Profiles.md : Master index of all character dialogue profiles, roles, and linguistic styles.
*   [**Game Case & Lab Reference**](`Game Case & Lab Reference.md`) Game Case & Lab Reference.md : Master reference for Lab mechanics, UI specs, and case evidence databases.
*   [**Prophecy & Evidence Links**](`prophecies.md`) : Maps every case to its prophecies and evidence links.
*   [**Scoring System**](`ScoringSystem.md`) ScoringSystem.md: Comprehensive overview of the scoring, doubt, and reputation systems.
*   [**System Architecture**](`CONFIG.md`) CONFIG.md: Technical documentation for the game's configuration and engine systems.
*   [**Trigger & NPC System**](`TRIGGER_NPC_SYSTEM.md`) TRIGGER_NPC_SYSTEM.md: Design pattern for binding Blender objects to game logic.


---
[Back to Top](#table-of-contents)

## Prophecy & Typology System

Unlocking prophetic and typological insights is a key mechanics layer for scoring and narrative discovery.

### Categories in the Codex
1. **Fulfilled Prophecies:** Direct OT predictions matched with NT events (e.g., Zechariah 9:9).
2. **Typological Fulfilments (Types & Shadows):** Structural patterns where OT historical events foreshadow Christ (e.g., Passover Lamb sequence).

### Discovery Steps
1. **Reveal (Discovery):** Unlocked through NPC conversation or Lab analysis (`revealsProphecy`).
2. **Link (Codex):** Match revealed prophecy/type to its fulfilling evidence item (+10 points).
3. **Scoring:**
   - Correct Link: `+10 points`
   - Incorrect Link: `+5 doubt`

---
[Back to Top](#table-of-contents)

---

## Codex: Biblical Patterns Section

The Codex features a dedicated section for **Biblical Patterns & Typology**, distinguishing between predictive prophecies and typological fulfilments:

### Predictive Prophecies (Direct OT Predictions)

| Prophecy | Scripture | Category | Codex Entry |
|---|---|---|---|
| The Rejected City | Jeremiah 19:10–11; Daniel 9:26 | Prophecy | *The Rejected City* |
| The Rejected King | Psalm 2:1–6; Isaiah 8:14–15 | Prophecy | *The Rejected King* |
| The New Covenant | Jeremiah 31:31–34; Exodus 24:8 | Prophecy | *The New Covenant* |
| The Scattered Sheep | Zechariah 13:7 | Prophecy | *The Scattered Sheep* |
| The Silent Lamb | Isaiah 53:7; Psalm 27:12; Isaiah 50:6 | Prophecy | *The Silent Lamb* |
| Psalm 22 | Psalm 22:1, 7–8, 16, 18 | Prophecy | *Psalm 22 Fulfilled* |
| The Perfect Sacrifice | Zechariah 12:10; Exodus 12:46; Psalm 34:20 | Prophecy | *The Perfect Sacrifice* |
| The Unexpected Tomb | Isaiah 53:9 | Prophecy | *The Unexpected Tomb* |
| The Firstfruits of Resurrection | Leviticus 23:9–14; Psalm 16:10; Hosea 6:2; Isaiah 53:10–11 | Prophecy | *The Firstfruits of Resurrection* |

### Typological Fulfilments (Types & Shadows)

* **Passover Lamb** (Exodus 12)
* **Bronze Serpent** (Numbers 21)
* **Jonah** (Jonah 1)
* **Hyssop at Passover** (Exodus 12:22)
* **Manna** (Exodus 16)
* **Melchizedek** (Genesis 14)
* **Isaac Carrying the Wood** (Genesis 22)
* **Joseph Rejected then Exalted** (Genesis 37–45)
* **Day of Atonement / Scapegoat** (Leviticus 16)
* **Red Heifer** (Numbers 19)
* **Abel's Righteous Blood** (Genesis 4)
* **Rock Struck for Water** (Exodus 17)

---
---
[Back to Top](#table-of-contents)


## Typology Deep Dive: The Passover Lamb

### Case Details
* **ID:** `passover_lamb_chain` (Act II) & `crucifixion_site` (Act III)
* **Theme:** The detective discovers that Jesus is intentionally fulfilling the multi-day Passover Lamb sequence from Exodus 12.

### Evidence Items
*   🧴 **Flask of Nard (`nard_flask`):** Anointing of Jesus's feet at Bethany (John 12). *Typology: The anointing of Jesus's feet with expensive perfume was an act of profound worship. In the Old Testament, anointing with oil consecrated kings (1 Samuel 16:13) and priests (Exodus 30:30) for service. This act sets Jesus apart as the Messiah (the "Anointed One") and, as Jesus Himself stated, prepares His body "beforehand for burial" (Mark 14:8).*
*   🏺 **Broken Alabaster Jar (`alabaster_jar`):** Anointing of Jesus's head (Matthew 26). *Typology: The anointing of Jesus's head directly mirrors the way kings like Saul and David were anointed, signifying His royal authority. It also serves as a prophetic act of consecration, setting Him apart as the ultimate High Priest and King who would offer Himself as the final sacrifice.*
*   📜 **Temple Inspection Notes (`inspection_notes`):** Jesus is publicly questioned by priests and found without fault. *Typology: The lamb is inspected for four days.*
*   🌿 **Sponge Soaked in Sour Wine (`sour_wine_sponge`):** The sponge is lifted to Jesus on a hyssop branch at the cross (John 19:29). *Typology: Hyssop was used to apply the lamb's blood to the doorposts for salvation (Exodus 12:22).*

### Lab Mechanics & "Aha!" Moment
When players link evidence from across multiple cases (e.g., `nard_flask` + `alabaster_jar` + `sour_wine_sponge`), the game unlocks the hidden pattern:

> **Hidden Pattern Discovered:** 
> *Jesus is intentionally following the Passover Lamb sequence (Selection -&gt; Inspection -&gt; Anointing -&gt; Sacrifice).*

---
[Back to Top](#table-of-contents)

---

## Typology Deep Dive: The Priest-King of Salem

*   **Case:** `last_supper` (Act III)
*   **Evidence:** `Spilled Wine on the Linen` (`wine_stain`)
*   **Typology:** Melchizedek, the mysterious priest-king of Salem, blessed Abraham with bread and wine (Genesis 14:18). Jesus, as the ultimate priest-king (Hebrews 7), uses the same elements to establish the New Covenant, fulfilling this ancient pattern.

---
[Back to Top](#table-of-contents)

---

## Hidden Detective Chains

Hidden Detective Chains are **cross-case discovery patterns** that unlock bonus Codex entries when the player links all related evidence items from multiple cases. Each chain represents a complete theological arc spanning multiple days of Holy Week.

### Chain 1 — Psalm 22 (Crucifixion Prophecy Chain)

| Detail | Information |
|---|---|
| **Theme** | The complete crucifixion psalm fulfilled scene by scene |
| **Cases Involved** | `crucifixion_site` (Act III) |
| **Unlock Requirements** | Mocking Witness, Roman Dice, Crucifixion Nails, Divided Garments, Sour Wine |
| **Reward** | Codex Entry: *Psalm 22 Fulfilled* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | All 5 evidence items linked to their respective Psalm 22 prophecy entries in the Codex |

### Chain 2 — Passover Lamb (The True Passover)

| Detail | Information |
|---|---|
| **Theme** | Jesus follows the Exodus 12 lamb-sacrifice sequence |
| **Cases Involved** | `last_supper` (Act III), `crucifixion_site` (Act III), `passover_lamb_chain` (Act II) |
| **Unlock Requirements** | Lamb Selection, Temple Inspection, Hyssop Branch, Unbroken Bones, Crucifixion |
| **Reward** | Codex Entry: *The True Passover Lamb* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | Evidence from `nard_flask`, `alabaster_jar`, `inspection_notes`, `sour_wine_sponge`, `unbroken_legs` all linked across cases |

### Chain 3 — Day of Atonement (The Greater Atonement)

| Detail | Information |
|---|---|
| **Theme** | Christ fulfills the dual role of sacrificial lamb and scapegoat |
| **Cases Involved** | `barabbas_choice` (Act III), `sanhedrin_trial` (Act III), `crucifixion_site` (Act III) |
| **Unlock Requirements** | High Priest, Trial, Scapegoat Evidence, Outside-the-City Execution |
| **Reward** | Codex Entry: *The Greater Atonement* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | Evidence linking Caiaphas's high-priestly role, the trial records, Barabbas as scapegoat, and the crucifixion outside the city all connected |

### Chain 4 — New Covenant (Covenant of Blood)

| Detail | Information |
|---|---|
| **Theme** | The Jeremiah-prophesied new covenant is inaugurated |
| **Cases Involved** | `last_supper` (Act III) |
| **Unlock Requirements** | Bread, Wine, Jeremiah Scroll, Upper Room Witness |
| **Reward** | Codex Entry: *The New Covenant* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | `bread_crumbs`, `wine_stain`, `new_covenant_declaration`, and Upper Room preparation evidence all linked to Jeremiah 31:31–34 |

### Chain 5 — Resurrection (Death Defeated)

| Detail | Information |
|---|---|
| **Theme** | Christ's resurrection fulfills the Feast of Firstfruits and the Jonah sign |
| **Cases Involved** | `resurrection` (Act IV) |
| **Unlock Requirements** | Jonah Record, Firstfruits Offering, Empty Tomb, Resurrection Witnesses |
| **Reward** | Codex Entry: *Death Defeated* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | `sign_of_jonah`, `firstfruits_offering`, `empty_tomb`, and `mary_encounter` evidence all linked across prophecy entries |

### Cross-Case Discovery Mechanics

Hidden chains are discovered through the **Codex** tab. When a prophecy from one case is linked to evidence from a *different* case that also relates to the same chain, a "Cross-Case Discovery" notification appears. Completing all links in a chain triggers the bonus Codex entry.

| Chain | Cross-Case Links | Trigger Point |
|---|---|---|
| Psalm 22 | `crucifixion_site`: `mockery_crown` → `psalm_22_7_8`, `crucifixion_nails` → `psalm_22_16`, `split_dice` → `psalm_22_18` | After linking all 3 prophecy entries |
| Passover Lamb | `passover_lamb_chain`: `nard_flask` → `typology_passover_lamb`, `crucifixion_site`: `sour_wine_sponge` → `typology_passover_lamb`, `unbroken_legs` → `exodus_12_46` | After linking evidence from 3 cases |
| Day of Atonement | `barabbas_choice`: `barabbas_warrant` → scapegoat, `sanhedrin_trial`: high priest evidence, `crucifixion_site`: outside-city execution | After linking trial + execution evidence |
| New Covenant | `last_supper`: `bread_crumbs` → Exodus 12, `wine_stain` → Jeremiah 31, `new_covenant_declaration` → Jeremiah 31 | After linking all 4 Last Supper evidence |
| Resurrection | `resurrection`: `sign_of_jonah`, `firstfruits_offering`, `empty_tomb`, `mary_encounter` | After linking all 4 resurrection evidence |

---
[Back to Top](#table-of-contents)

---

## Scoring System

The player's performance in each case is evaluated based on a comprehensive scoring system designed to reward thorough investigation and careful deduction. The final score for a case is calculated when the player submits an accusation.

The score is composed of the following elements:

### Score
*   **Correct Accusation:** `+50 points`
    *   Awarded for correctly identifying the culprit (or 'No One' if it was a prophetic act). An incorrect accusation results in a `-25 point` penalty and adds `+25 Doubt`.
*   **Lab Deductions:** `+15 points` per key deduction, `+8 points` per standard deduction
    *   Awarded for successfully analyzing evidence in the Lab to reveal its implication on a suspect (e.g., clearing them, implicating them, or identifying them as a witness). Each case's Lab table lists the exact Points/Reputation/Doubt outcome per pairing — see **Lab Actions** below.
*   **Prophecies Linked:** `+10 points` per prophecy
    *   Awarded for correctly matching evidence to prophecies in the Codex.
*   **Successful Challenges:** `+10 points` per breakthrough
    *   Awarded for successfully challenging an NPC with a contradiction, leading to a breakthrough. Also grants `+5 Reputation` with the challenged NPC's faction.
*   **Evidence Collected:** `+5 points` per item
    *   Rewards finding all available physical evidence and testimonials.
*   **Perfect Case Bonus:** `+25 points`
    *   A bonus awarded if the accusation is correct and the player made no failed challenges during the case.
*   **Doubt Penalty:** `-2 points` per doubt point
    *   The player's final score for the case is reduced by a penalty calculated from their accumulated "Doubt" score.
*   **Hidden Detective Chains:** `+25 points` + `Codex Entry` per chain unlocked
    *   Awarded for completing all evidence-to-prophecy links within a cross-case hidden chain. Each unlocked chain grants a bonus Codex entry and contributes `+10 Faith` (a persistent spiritual-progress meter).

### Ranks
*   **Rookie:** 0–59 points
*   **Investigator:** 60–99 points
*   **Analyst:** 100–149 points
*   **Master Detective:** 150+ points

# Prophecy Collection System

## Overview

The prophecy collection system allows players to discover and track biblical prophecies that are fulfilled throughout their investigation. Prophecies work similarly to evidence but are categorized separately and displayed in a dedicated Codex tab.

## Architecture

### Evidence Type Addition
- PROPHECY is added to EVIDENCE_TYPES in evidenceSystem.js
- Prophecies have id, type, icon, location, desc fields
- Evidence can reference related prophecies via `relatedProphecy` field
- NPC reactions can reveal prophecies via `revealsProphecy` field

### Case Manager Tracking
- `propheciesFound` array tracks discovered prophecy IDs per case
- `recordProphecyFound(prophecyId)` method records discoveries
- Progress saved to localStorage under `cases[id].propheciesFound`

### NPC System Integration
- `showEvidence()` checks for `revealsProphecy` in reactions
- `challenge()` checks for `revealsProphecy` in contradictions
- Prophecies unlocked through investigation and deduction

### UI Changes
- Accuse tab renamed to "Codex"
- Codex shows discovered prophecies grouped by case
- Prophecy detail view shows full reference, text, and fulfillment info
- Completion percentage shown for each case's prophecy collection
- **Faith meter:** A persistent progress bar tracks hidden chain completions (+10 Faith per chain)

## Hidden Chains Integration

- Hidden Detective Chains span multiple cases
- `chainManager.js` tracks cross-case evidence-to-prophecy linkages
- `chainsCompleted` array stored in `caseState` per case
- Cross-case links trigger a "Discovery" notification in the Codex
- Completing a chain unlocks a bonus Codex entry and awards Faith

## Implementation Pattern

Prophecies follow the same discovery pattern as evidence:
1. Player shows evidence to NPC
2. NPC reaction may include `revealsProphecy: "prophecy_id"`
3. System marks prophecy as discovered
4. Prophecy appears in Codex tab

## Prophecy Data Structure

```javascript
{
  id: "zechariah_9_9",
  reference: "Zechariah 9:9",
  text: "Rejoice greatly, O daughter of Zion!...",
  written: "~520 BC",
  fulfilledBy: "Jesus riding a donkey colt into Jerusalem",
  gospelLink: "Matthew 21:4-5; John 12:14-15",
  insight: "The donkey was not a practical choice...",
  icon: "🔮",
  location: "Bethphage, Mount of Olives",
  type: "PROPHECY"
}
```

---

# 🔍 Cross-Reference: Story Files vs. `js/act*_case.js`

Generated audit of dialogue story files (`story/extras/*.ink` + `story/system/*.ink`) against `storyFile` references in `js/act1_case.js`, `js/act2_case.js`, `js/act3_case.js`, and `js/act4_case.js`.

* **Story files present:** 79
* **Distinct `storyFile` references used:** 62
* **Story files NOT referenced by any act case (unused):** 18
* **`storyFile` references with NO matching file (orphans / broken links):** 1 — `chief_priest`

## ⚠️ Broken Reference (fixed)
* `js/act2_case.js` referenced `storyFile: "chief_priest"` (NPC id `chief_priest` = Caiaphas), but no `chief_priest.ink`/`.json` exists. The correct file is `caiaphas_priest`. **Corrected** in `js/act2_case.js:213` to `storyFile: "caiaphas_priest"` (act3 already used the correct name).

## Unused Story Files (present in `/story/` but not referenced in `act*_case.js`)

| Story File | Identity | Notes |
|---|---|---|
| `board_debate` | Board Debate (Senior Scribe) | System overlay / case-review interface |
| `board_review` | Board Review (Senior Scribe) | System overlay / case-review interface |
| `centurion_witness` | Centurion Longinus Witness | Crucifixion spear-thrust account |
| `excited_child_donkey` | Excited Child (Donkey) | Triumphal entry flavor |
| `guard_entry` | Guard — Entry | Antonia gate duty |
| `guard_report_crucifixion` | Guard — Crucifixion | Roman watch report variant |
| `guard_report_gethsemane` | Guard — Gethsemane | Arrest watch report variant |
| `guard_report_temple` | Guard — Temple | Cleansing watch report variant |
| `jesus_reinstatement` | Jesus Reinstatement (Peter) | John 21 restoration |
| `peter_reinstated` | Peter Reinstated | John 21 restoration variant |
| `pilate_interrogation` | Pilate Interrogation | Trial dialogue variant |
| `pontius_pilate_barabbas` | Pilate — Barabbas | Barabbas exchange variant |
| `pontius_pilate_temple` | Pilate — Temple | Temple-cleansing variant |
| `priest_objection_crucifixion` | Priest Objection — Crucifixion | Crucifixion variant |
| `priest_objection_temple` | Priest Objection — Temple | Temple variant |
| `rich_young_ruler` | Rich Young Ruler | Extra encounter |
| `roman_council` | Roman Council | Extra encounter |
| `roman_soldier` | Roman Soldier | Extra encounter |

## Notes
* Several unused files are **variant** dialogue trees (`*_crucifixion`, `*_temple`, `*_gethsemane`, `*_barabbas`, `pilate_interrogation`, `priest_objection_*`) that branch the same NPC but are not currently wired into the linear act cases.
* `board_debate` / `board_review` belong to the persistent investigation-board overlay rather than an act case, which is expected.
* The `chief_priest` → `caiaphas_priest` mismatch was the only broken link; it has been resolved.


### Lab Actions

Every case's Lab table includes **Points**, **Reputation**, and **Doubt** columns showing exactly what each pairing awards:

*   **Correct Pairing:** `+15 points`
    *   Awarded when the player combines the listed pair of evidence with the correct operation (Link or Compare) and reaches the stated Result. This is the same `+15 points` "Lab Deductions" reward listed under Score, above.
    *   **Reputation:** unaffected. Unlike NPC challenges, Lab deductions are private research and don't move any faction's trust — the Reputation column always reads `—`.
    *   **Prophecy:** if the pairing also unlocks a prophecy, that's a notification only; the `+10 points` for a prophecy is earned separately when it's linked in the Codex.
*   **Incorrect Pairing:** `-5 points`, `+5 doubt`
    *   Applied whenever the player submits an evidence pair/operation that doesn't match any correct combination listed for that case. This isn't listed as its own row in every table — it's a standing rule that applies to any mismatch, in every case.

### Doubt

Doubt is a global penalty meter that accumulates across all cases. It measures how many missteps the investigator has made.

*   **Starting Value:** `0`
*   **Minimum Value:** `0` (cannot go negative)
*   **Penalty Calculation:** The player's final case score is reduced by `Doubt × 2` points.
*   **Accrual Triggers:**
    *   **Failed Challenge:** `+10 doubt`
        *   Awarded when the player incorrectly pairs two pieces of evidence during an NPC challenge and no contradiction is found.
    *   **Incorrect Lab Pairing:** `+5 doubt`
        *   Awarded when the player submits an evidence pair/operation in the Lab that doesn't match any correct combination for the case. Also carries a `-5 point` penalty — see **Lab Actions** above.
    *   **Incorrect Prophecy Link:** `+5 doubt`
        *   Awarded when the player links evidence to the wrong prophecy in the Codex.
    *   **Incorrect Accusation:** `+25 doubt`
        *   Awarded when the player accuses the wrong suspect (or 'No One') of a crime.

### Reputation

Reputation is a faction-based trust meter that tracks how each major group in Jerusalem views the investigator.

*   **Factions:**
    *   `scribes` — Religious scholars and teachers
    *   `temple` — Temple authorities and priests
    *   `roman` — Roman military and administrative officials
    *   `local` — Local Jerusalem residents and merchants
*   **Starting Value:** `100` per faction
*   **Range:** `0` to `100` (clamped on change)
*   **Displayed Value:** The UI shows the **average** of all four faction reputations as a single number.
*   **Change Triggers:**
    *   **Successful Challenge:** `+5` to the challenged NPC's faction
        *   Awarded when the player correctly exposes a contradiction without having previously failed that challenge.
    *   **Failed Challenge:** `-15` to the challenged NPC's faction
        *   Awarded when the player incorrectly challenges an NPC and fails to find a contradiction.

---
[Back to Top](#table-of-contents)

---

## Core Gameplay Systems

### Inventory & Evidence System

The player's inventory consists of **Evidence** collected during an investigation. Evidence is the primary resource used for making deductions, challenging witnesses, and linking events to prophecies.

*   **Collection:** Evidence is discovered by exploring the 2D/3D scene, interacting with objects, and talking to witnesses.
*   **Management:** Collected evidence is accessible through the **Evidence** tab (or "Lab" tab in some versions). From here, players can review details or select items for analysis.
*   **Usage:**
    *   **Lab:** Combine two pieces of evidence to make a deduction.
    *   **People:** Show evidence to a witness to get a reaction.
    *   **Codex:** Link evidence to a revealed prophecy to score points.

### Actions System

A new **Actions** tab is available on the main investigation screen, providing access to thematic and spiritual actions that deepen the player's connection to the narrative.

*   **Purpose:** To provide immersive, non-investigative interactions that reinforce the game's spiritual themes.
*   **Current Actions:**
    *   **🙏 Pray:** The player can offer a prayer for guidance. This triggers a visual effect of a floating icon, representing a moment of reflection.
    *   **❤️‍🩹 Heal:** A context-sensitive action representing spiritual restoration. It provides a visual effect and could be used in specific cases (like "The Severed Ear") to confirm a miracle.
*   **Gameplay:** These actions are currently for atmospheric effect and do not directly impact scoring or case progression. They are accessible from the "Actions" tab in the main investigation UI for all game versions (`/desktop/`, `/mobileB/`, `/mobileC/`).

---
[Back to Top](#table-of-contents)

## Acts & Cases

## Act I: The Arrival

### Case: `triumphal_entry` (The Missing Donkey)
*   **Title:** The Missing Donkey
*   **Characters:**
    *   Peter (Disciple) ([`../story/act1/case_a_missing_donkey/peter_donkey.ink`](../story/act1/case_a_missing_donkey/peter_donkey.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   John (Disciple) ([`../story/act1/case_a_missing_donkey/john_donkey.ink`](../story/act1/case_a_missing_donkey/john_donkey.ink)) ([`../characters/john_apostle.json`](../characters/john_apostle.json))
    *   Tobias (Donkey Owner) ([`../story/act1/case_a_missing_donkey/galilean_pilgrim.ink`](../story/act1/case_a_missing_donkey/galilean_pilgrim.ink)) ([`../characters/tobias_owner.json`](../characters/tobias_owner.json))
    *   Jemimah (Local Skeptic) ([`../story/act1/case_a_missing_donkey/jerusalem_local.ink`](../story/act1/case_a_missing_donkey/jerusalem_local.ink)) ([`../characters/jemimah.json`](../characters/jemimah.json))
    *   Eleazar (Sadducean Aristocrat) ([`../story/act1/case_a_missing_donkey/eleazar_sadducee.ink`](../story/act1/case_a_missing_donkey/eleazar_sadducee.ink)) ([`../characters/eleazar.json`](../characters/eleazar.json))
*   **Suspects:**
    *   Peter ([`../characters/peter.json`](../characters/peter.json))
    *   John ([`../characters/john_apostle.json`](../characters/john_apostle.json))
    *   Tobias (Owner) ([`../characters/tobias_owner.json`](../characters/tobias_owner.json))
    *   Local Villager ([`../characters/local_traveler.json`](../characters/local_traveler.json))
    *   Pharisee ([`../characters/simon_pharisee.json`](../characters/simon_pharisee.json))
    *   Jemimah (Local Skeptic) ([`../characters/jemimah.json`](../characters/jemimah.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a willing fulfillment of prophecy, not a theft.
*   **Prophecies:** Zechariah 9:9, Psalm 118:25–26, Genesis 49:10–11, Malachi 3:1
*   **Evidence:**
    *   `Fresh Hoofprints`
    *   `Two Disciples' Cloaks`
    *   `Villager's Testimony`
    *   `Cut Rope at the Tethering Post`
    *   `Zechariah 9:9 Scroll Fragment`
    *   `Fresh-Cut Palm Branch`
    *   `Pharisee's Written Complaint`

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Two Disciples' Cloaks`, `Cut Rope at the Tethering Post` | Genesis 49:10–11 |
| John | Talk | `Fresh Hoofprints`, `Villager's Testimony` | — |
| Tobias | Talk | `Fresh-Cut Palm Branch`, `Zechariah Scroll` | Psalm 118:25–26 |
| Eleazar | Talk | `Pharisee's Written Complaint` | Malachi 3:1 |






##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Peter | `peter` | NPC + Suspect | Talk to Peter; Collect `cloaks`, `rope_fibers`; Lab: **Motive Clarified** (Acted on instruction, not as a thief) | ✅ Yes |
| John | `john` | NPC + Suspect | Talk to John; Collect `donkey_tracks`, `crowd_testimony`, `witness_account` | ✅ Yes |
| Tobias | `owner` | NPC + Suspect | Talk to Tobias; Collect `prophecy_scroll`, `palm_branch`; Lab: **Cleared** (Confirmed he willingly lent the colt) | ✅ Yes |
| Jemimah | `local_skeptic` | NPC + Suspect | Talk to Jemimah | ✅ Yes |
| Eleazar | `eleazar` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Local Villager | `villager` | Suspect only | Talk to John or Tobias | ✅ Yes |
| Pharisee | `pharisee` | Suspect only | Talk to Eleazar; Collect `crowd_testimony` | ✅ Yes |
| No One | `none` | Suspect only | Collect `witness_account`, `prophecy_scroll` | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Two Disciples' Cloaks` + `Zechariah Scroll` | Compare | **Motive Clarified** for Peter (Acted on instruction) | Zechariah 9:9 | +15 | — | — |
| `Fresh Hoofprints` + `Villager's Testimony` | Compare | **Cleared** Tobias (Confirmed he willingly lent the colt) | — | +15 | — | — |

#### Codex
 
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Zechariah Scroll` → Zechariah 9:9 | Lab: `Two Disciples' Cloaks` + `Zechariah Scroll` |
| `Fresh-Cut Palm Branch` → Psalm 118:25–26 | Dialogue: Tobias |
| `Two Disciples' Cloaks` → Genesis 49:10–11 | Dialogue: Peter |
| `Pharisee's Written Complaint` → Malachi 3:1 | Dialogue: Eleazar |



*   **Title:** The Overturned Tables
*   **Characters:**
    *   Malachi (Money Changer) ([`../story/act1/case_b_overturned_tables/money_changer.ink`](../story/act1/case_b_overturned_tables/money_changer.ink)) ([`../characters/malachi_moneychanger.json`](../characters/malachi_moneychanger.json))
    *   Marcus (Garrison Guard) ([`../story/act1/case_b_overturned_tables/guard_report.ink`](../story/act1/case_b_overturned_tables/guard_report.ink)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Jadan of Bethphage (Temple Dove Vendor) ([`../characters/displaced_merchant.json`](../characters/displaced_merchant.json))
*   **Suspects:**
    *   Jadan of Bethphage ([`../characters/displaced_merchant.json`](../characters/displaced_merchant.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a prophetic act of judgment by Jesus.
*   **Prophecies:** Malachi 3:1, Isaiah 56:7, Psalm 69:9

*   **Evidence:**
    *   `Scattered Tyrian Shekels`
    *   `Shattered Dove Cages`
    *   `Discarded Whip of Cords`

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Malachi (Money Changer) | Talk | `Scattered Shekels` | Malachi 3:1 |
| Marcus (Garrison Guard) | Talk | `Roman Standard`, `Whip of Cords` | — |
| Jadan of Bethphage | Talk | `Shattered Dove Cages` | Isaiah 56:7 |
| Disciples (generic) | Talk | `Disciples' Testimony` | Psalm 69:9 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Shattered Dove Cages` + `Whip of Cords` | Link | **Identified as Victim** for Jadan | — | +15 | — | — |
| `Scattered Shekels` + `Whip of Cords` | Link | **Identified as Victim** for Malachi | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Shattered Dove Cages` → Isaiah 56:7 | Dialogue: Jadan of Bethphage |
| `Scattered Shekels` → Malachi 3:1 | Dialogue: Malachi (Money Changer) |
| `Disciples' Testimony` → Psalm 69:9 | Dialogue: Disciples (generic) |
 
*   **Title:** The Barren Fig Tree
*   **Characters:**
    *   Peter (Disciple) ([`../story/act1/case_c_fig_tree_incident/peter_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/peter_fig_tree.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   John (Disciple) ([`../story/act1/case_c_fig_tree_incident/john_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/john_fig_tree.ink)) ([`../characters/john_apostle.json`](../characters/john_apostle.json))
    *   Nathan (Gardener) ([`../story/act1/case_c_fig_tree_incident/nathan_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/nathan_fig_tree.ink)) ([`../characters/nathan_gardener.json`](../characters/nathan_gardener.json))
    *   Local Traveler ([`../story/act1/case_c_fig_tree_incident/local_traveler.ink`](../story/act1/case_c_fig_tree_incident/local_traveler.ink)) ([`../characters/local_traveler.json`](../characters/local_traveler.json))
*   **Suspects:**
    *   Peter ([`../characters/peter.json`](../characters/peter.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a prophetic act by Jesus.
*   **Prophecies:** Micah 7:1, Jeremiah 8:13, Psalm 33:8–9, Zechariah 4:6–7

*   **Evidence:**
    *   `Description of the Fig Tree (Monday)`
    *   `The Withered Fig Tree (Tuesday)`
    *   `Peter's Astonished Reaction`
    *   `Jesus's Teaching on Faith`

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Withered Fig Leaf (Tuesday)`, `Disciples' Astonishment` | Jeremiah 8:13 |
| John | Talk | `Jesus's Teaching on Faith`, `Disciples' Astonishment` | Zechariah 4:6–7 |
| Nathan (Gardener) | Talk | `Healthy Fig Leaf (Monday)` | Micah 7:1 |
| Local Traveler | Talk | — | Psalm 33:8–9 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Withered Fig Leaf (Tuesday)` + `Disciples' Astonishment` | Link | **Identified as Witness** for Peter | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Healthy Fig Leaf (Monday)` → Micah 7:1 | Dialogue: Nathan (Gardener) |
| `Withered Fig Leaf (Tuesday)` → Jeremiah 8:13 | Dialogue: Peter |
| `Disciples' Astonishment` → Psalm 33:8–9 | Dialogue: Local Traveler |
| `Jesus's Teaching on Faith` → Zechariah 4:6–7 | Dialogue: John |
 
---
[Back to Top](#table-of-contents)

## Act II: The Teacher

### Case: `authority_challenged` (The Silenced Teacher)
*   **Title:** The Silenced Teacher
*   **Characters:**
    *   Caiaphas (High Priest) ([`../story/act2/case_a_silenced_teacher/caiaphas_priest.ink`](../story/act2/case_a_silenced_teacher/caiaphas_priest.ink)) ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Samuel (Scribe) ([`../story/act2/case_a_silenced_teacher/scribe_intro.ink`](../story/act2/case_a_silenced_teacher/scribe_intro.ink)) ([`../characters/samuel_scribe.json`](../characters/samuel_scribe.json))
    *   Nathanael (Pharisee) ([`../story/act1/case_b_overturned_tables/pharisee_critique.ink`](../story/act1/case_b_overturned_tables/pharisee_critique.ink)) ([`../characters/nathanael_pharisee.json`](../characters/nathanael_pharisee.json))
*   **Suspects:**
    *   Caiaphas ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Samuel ([`../characters/samuel_scribe.json`](../characters/samuel_scribe.json))
    *   Nathanael ([`../characters/nathanael_pharisee.json`](../characters/nathanael_pharisee.json))
    *   No One ()
*   **Culprit:** **Caiaphas**. He orchestrated the challenges to protect institutional authority.
*   **Prophecies:** Psalm 118:22–23, Isaiah 5:1–7, Daniel 7:13–14, Malachi 3:1

*   **Evidence:**
    *   `The Formal Authority Challenge`
    *   `Sketch of the Vineyard Parable`
    *   `Rejected Cornerstone Fragment`
    *   `Denarius of Tiberius Caesar`
    *   `Withered Fig Leaf`
    *   `Two Leptons (Widow's Mites)`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Caiaphas | Talk | `Priestly Vestments`, `Rejected Cornerstone Fragment` |
| Caiaphas | Talk | `Denarius of Tiberius Caesar`, `Two Leptons (Widow's Mites)` |
| Samuel (Scribe) | Talk | `Sketch of Vineyard Parable`, `Temple Bystander's Written Account` |
| Nathanael (Pharisee) | Talk | — |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Caiaphas | `chief_priest` | NPC + Suspect | Talk to Caiaphas; Lab: **Implicated by Parable** (The teaching was aimed at him) | ✅ Yes |
| Samuel | `scribe` | NPC + Suspect | Talk to Samuel; Lab: **Identified as Witness** (His record implicates the priests) | ✅ Yes |
| Nathanael | `pharisee` | NPC + Suspect | Talk to Nathanael | ✅ Yes |
| Thomas the Rich Young Ruler | `rich_young_ruler` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Sketch of Vineyard Parable` + `Rejected Cornerstone Fragment` | Link | **Implicated by Parable** for Caiaphas | Psalm 118:22–23 | +15 | — | — |
| `Priestly Vestments` + `Temple Bystander's Written Account` | Compare | **Identified as Witness** for Samuel | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Rejected Cornerstone Fragment` → Psalm 118:22–23 | Lab: `Sketch of Vineyard Parable` + `Rejected Cornerstone Fragment` |
| `Sketch of Vineyard Parable` → Isaiah 5:1–7 | Dialogue: Samuel (Scribe) |
| `Priestly Vestments` → Daniel 7:13–14 | Dialogue: Caiaphas |
| `question_scroll` → Malachi 3:1 | Dialogue: Caiaphas |
 
### Case: `lazarus_plot` (The Price of Life)
*   **Title:** The Price of Life
*   **Characters:**
    *   Maluch (Temple Spy) ([`../story/act2/case_b_lazarus_conspiracy/temple_spy.ink`](../story/act2/case_b_lazarus_conspiracy/temple_spy.ink)) ([`../characters/maluch.json`](../characters/maluch.json))
    *   Annas (High Priest Emeritus) ([`../story/act2/case_b_lazarus_conspiracy/annas_patriarch.ink`](../story/act2/case_b_lazarus_conspiracy/annas_patriarch.ink)) ([`../characters/annas.json`](../characters/annas.json))
    *   Martha (Sister of Lazarus) ([`../story/act2/case_b_lazarus_conspiracy/martha_bethany.ink`](../story/act2/case_b_lazarus_conspiracy/martha_bethany.ink)) ([`../characters/martha.json`](../characters/martha.json))
    *   Nicodemus (Conflicted Pharisee) ([`../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.ink`](../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.ink)) ([`../characters/nicodemus.json`](../characters/nicodemus.json))
    *   Simon the Leper (Healed Host) ([`../story/act2/case_b_lazarus_conspiracy/simon_leper.ink`](../story/act2/case_b_lazarus_conspiracy/simon_leper.ink)) ([`../characters/simon_leper.json`](../characters/simon_leper.json))
*   **Suspects:**
    *   Nicodemus ([`../characters/nicodemus.json`](../characters/nicodemus.json))
    *   Caiaphas ([`../characters/caiaphas.json`](../characters/caiaphas.json))
*   **Culprit:** **Caiaphas**. He authorized the plot to eliminate Lazarus to contain the political fallout of the miracle.
*   **Prophecies:** Isaiah 25:8

*   **Evidence:**
    *   `Bethany Pilgrim Manifest`
    *   `Bethany Limestone Dust`
    *   `Intercepted Sadducean Memorandum`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Maluch (Temple Spy) | Talk | `Report to Caiaphas` |
| Maluch (Temple Spy) | Talk | `Lazarus's Grave Cloth` |
| Annas (High Priest Emeritus) | Talk | `Sanhedrin Meeting Scroll` |
| Martha (Sister of Lazarus) | Talk | `grave_dirt` | Isaiah 25:8 |
| Nicodemus | Talk | — |
| Simon the Leper | Talk | — |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Maluch | `temple_spy` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Annas | `annas_patriarch` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Martha | `martha_bethany` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Thomas (Parable) | `parable_meaning` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Thomas (Vineyard) | `parable_vineyard` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Trial Rumors | `trial_rumors` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Bethesda Witness | `witness_healed` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Mount Teacher | `teaching_mount` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Nicodemus | `nicodemus` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Simon the Leper | `simon_leper` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Nicodemus | `nicodemus_secret` | Suspect only | Talk to Martha; Lab: **Cleared** (Shows he was a dissenting voice) | ✅ Yes |
| Caiaphas | `caiaphas` | Suspect only | Talk to Maluch; Lab: **Implicated in Conspiracy** (Directly links him to the plot) | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Report to Caiaphas` + `Sanhedrin Meeting Scroll` | Link | **Implicated in Conspiracy** for Caiaphas | — | +15 | — | — |
| `grave_dirt` + `Sanhedrin Meeting Scroll` | Link | **Cleared** Nicodemus (Shows he was a dissenting voice) | — | +15 | — | — |

...
#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Lazarus's Grave Cloth` → Isaiah 25:8 | Dialogue: Martha |
 
### Case: `olivet_discourse` (The End of the Age)
*   **Title:** The End of the Age
*   **Characters:**
    *   Peter (Disciple) ([`../story/act2/case_c_olivet_discourse/peter_olivet.ink`](../story/act2/case_c_olivet_discourse/peter_olivet.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   John (Disciple) ([`../story/act2/case_c_olivet_discourse/john_olivet.ink`](../story/act2/case_c_olivet_discourse/john_olivet.ink)) ([`../characters/john_apostle.json`](../characters/john_apostle.json))
    *   Thomas (Disciple) ([`../story/act2/case_a_silenced_teacher/parable_meaning.ink`](../story/act2/case_a_silenced_teacher/parable_meaning.ink)) ([`../characters/thomas.json`](../characters/thomas.json))
    *   Andrew (Disciple) ([`../story/act2/case_c_olivet_discourse/andrew_olivet.ink`](../story/act2/case_c_olivet_discourse/andrew_olivet.ink)) ([`../characters/andrew_disciple.json`](../characters/andrew_disciple.json))
*   **Suspects:**
    *   No One ()
*   **Culprit:** **No One**. This is a teaching event, not a crime.
*   **Prophecies:** Daniel 9:27, Joel 2:30-31, Isaiah 13:10

*   **Evidence:**
    *   `View of the Temple from Olivet`
    *   `Disciples' Questions (Written Notes)`
    *   `Parable of the Ten Virgins (Notes)`
    *   `Old Testament Cosmic Sign References`
    *   `Darkened Sun Record`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Disciples' Questions` | |
| John | Talk | `Sketch of Temple Stones`, `Notes on Cosmic Signs` | Isaiah 13:10 |
| Thomas | Talk | `parable_of_virgins_notes`, `cosmic_signs_references` |
| Andrew | Talk | — |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Peter | `peter_olivet` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| John | `john_olivet` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Thomas | `thomas_olivet` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Andrew | `andrew_olivet` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Sketch of Temple Stones` + `Disciples' Questions` | Link | **Identified as Primary Witness** for Peter | Daniel 9:27 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Disciples' Questions` → Daniel 9:27 | Lab: `Sketch of Temple Stones` + `Disciples' Questions` |
| `Notes on Cosmic Signs` → Joel 2:30-31 | Dialogue: Thomas |
| `Notes on Cosmic Signs` → Isaiah 13:10 | Dialogue: John |
 
---
[Back to Top](#table-of-contents)

## Act III: The Pressure Builds

### Case: `last_supper` (The Broken Cup)
*   **Title:** The Broken Cup
*   **Characters:**
    *   John Mark (Son of the House Owner) ([`../story/act3/case_a_broken_cup/john_disciple.ink`](../story/act3/case_a_broken_cup/john_disciple.ink)) ([`../characters/john_mark.json`](../characters/john_mark.json))
    *   Rhoda (Household Servant) ([`../story/act3/case_a_broken_cup/rhoda_servant.ink`](../story/act3/case_a_broken_cup/rhoda_servant.ink)) ([`../characters/rhoda.json`](../characters/rhoda.json))
    *   Judas Iscariot (Disciple) ([`../story/act3/case_a_broken_cup/judas_iscariot.ink`](../story/act3/case_a_broken_cup/judas_iscariot.ink)) ([`../characters/judas.json`](../characters/judas.json))
*   **Suspects:**
    *   John Mark ([`../characters/john_mark.json`](../characters/john_mark.json))
    *   Rhoda ([`../characters/rhoda.json`](../characters/rhoda.json))
    *   Judas Iscariot ([`../characters/judas.json`](../characters/judas.json))
*   **Culprit:** **Judas Iscariot**. His agitation and haste led to the broken items as he prepared for his betrayal.
*   **Prophecies:** Exodus 12:1–14, Jeremiah 31:31–34, Exodus 24:8, Psalm 41:9, Zechariah 11:12–13, Isaiah 53:12
*   **Typologies:** Melchizedek (Genesis 14:18), Passover Meal (Exodus 12)

*   **Evidence:**
    *   `Unleavened Bread Crumbs`
    *   `Spilled Wine on the Linen`
    *   `Shattered Clay Cup`
    *   `Large Stone Water Jug`
    *   `Imprint of a Money Bag`
    *   `Fragment of Sop (Dipped Bread)`
    *   `Written Summary of Jesus\'s Words`
    *   `List of the Twelve`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| John Mark | Talk | `Broken Wine Cup`, `Jeremiah Scroll` | Jeremiah 31:31–34 |
| Rhoda | Talk | `Spilled Water Basin`, `Passover Lamb Bone`, `Dipped Bread Fragment` | Exodus 12:1–14 |
| Judas Iscariot | Talk | `Dipped Bread Fragment` |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| John Mark | `john_mark` | NPC + Suspect | Talk to John Mark; Collect `bread_crumbs`, `new_covenant_declaration`, `betrayal_dipped_bread`, `covenant_seal`; Lab: **Witness to Agitation** (Observed the event, but did not cause it) | ✅ Yes |
| Rhoda | `servant` | NPC + Suspect | Talk to Rhoda; Collect `water_jug`, `cup_fragments`; Lab: **Witness to Haste** (Saw someone leaving in a hurry) | ✅ Yes |
| Judas Iscariot | `judas` | NPC + Suspect | Talk to Judas Iscariot; Collect `money_bag_impression`; Lab: **Implicated by Prophecy** (Links him to the betrayal) | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Broken Wine Cup` + `Dipped Bread Fragment` | Link | **Implicated by Prophecy** for Judas Iscariot | Psalm 41:9 | +15 | — | — |
| `Spilled Water Basin` + `Dipped Bread Fragment` | Link | **Witness to Haste** for Rhoda | — | +15 | — | — |
| `Broken Wine Cup` + `Spilled Water Basin` | Compare | **Witness to Agitation** for John Mark | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Broken Wine Cup` → Jeremiah 31:31–34 | Dialogue: John Mark |
| `Dipped Bread Fragment` → Psalm 41:9 | Lab: `Broken Wine Cup` + `Dipped Bread Fragment` |
| `Passover Lamb Bone` → Exodus 12:1–14 | Dialogue: Rhoda |
| `Money Bag Impression` → Zechariah 11:12–13 | Lab: betrayal evidence (thirty pieces of silver) |
| `Dipped Bread Fragment` → Isaiah 53:12 | Not explicitly linked in Lab/People tables |
| `Jeremiah Scroll` → Exodus 24:8 (Covenant sealed with blood) | Dialogue: John Mark |
| `Unleavened Bread Crumbs` → Genesis 14:18 (Melchizedek) | Codex: New Covenant Hidden Chain |

**Hidden Detective Chain:** *The New Covenant* — Links bread, wine, Jeremiah scroll, and Upper Room witness across the Last Supper investigation.
 
### Case: `gethsemane_arrest` (The Severed Ear)
*   **Title:** The Severed Ear
*   **Characters:**
    *   Malchus (High Priest's Assistant) ([`../story/act3/case_b_severed_ear/malchus.ink`](../story/act3/case_b_severed_ear/malchus.ink)) ([`../characters/malchus.json`](../characters/malchus.json))
    *   Simon Peter (Disciple) ([`../story/act3/case_b_severed_ear/peter_defense.ink`](../story/act3/case_b_severed_ear/peter_defense.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   Roman Soldier ([`../story/act3/case_b_severed_ear/guard_report_gethsemane.json`](../story/act3/case_b_severed_ear/guard_report_gethsemane.json)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
*   **Suspects:**
    *   Malchus ([`../characters/malchus.json`](../characters/malchus.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a scuffle during the arrest, immediately resolved by Jesus.
*   **Prophecies:** Isaiah 53:7, Zechariah 13:7

*   **Evidence:**
    *   `Abandoned Linen Wrapper`
    *   `Extinguished Roman Torch`
    *   `Bloodied Scarf Fragment`
    *   `Unresisting Prisoner's Cord`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Malchus | Talk | `Bloody Linen Swab` | Isaiah 53:7 |
| Simon Peter | Talk | `Disciple's Sword` | |
| Roman Soldier | Talk | `Extinguished Roman Torch`, `Unresisting Prisoner's Cord` | Isaiah 53:7 |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Malchus | `malchus_servant` | NPC + Suspect | Talk to Malchus; Collect `abandoned_linen`, `dropped_torch`; Lab: **Identified as Victim** (He was healed, not an aggressor) | ✅ Yes |
| Simon Peter | `simon_peter` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Garrison Guard | `roman_soldier` | NPC | Talk to Garrison Guard; Collect `dropped_torch`, `prisoner_cord`; Lab: **Witness to Non-Resistance** (Observed Jesus's silent submission) | ✅ Yes |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Bloody Linen Swab` + `Disciple's Sword` | Link | **Identified as Victim** for Malchus | — | +15 | — | — |
| `Disciple's Sword` + `Extinguished Roman Torch` | Link | **Implicated as Assailant** for Simon Peter | Zechariah 13:7 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Disciple's Sword` → Isaiah 53:7 | Dialogue: Malchus |
| `Unresisting Prisoner's Cord` → Isaiah 53:7 | Dialogue: Roman Soldier |
| `Scattered Disciples' Cloaks` → Zechariah 13:7 | Lab: `Disciple's Sword` + `Extinguished Roman Torch` |

**🔗 Cross-Case Chain:** *The Scattered Sheep* — Zechariah 13:7 fulfilled at Gethsemane; its reversal in Peter's Restoration (`peter_restoration` case).
 
### Case: `sanhedrin_trial` (The Midnight Tribunal)
*   **Title:** The Midnight Tribunal
*   **Characters:**
    *   Caiaphas (High Priest) ([`../story/act3/case_c_midnight_tribunal/caiaphas_priest.ink`](../story/act3/case_c_midnight_tribunal/caiaphas_priest.ink)) ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Peter (Denying Disciple) ([`../story/act3/case_c_midnight_tribunal/peter_denial.ink`](../story/act3/case_c_midnight_tribunal/peter_denial.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   Ananias (False Witness) ([`../story/act3/case_c_midnight_tribunal/false_witness.ink`](../story/act3/case_c_midnight_tribunal/false_witness.ink)) ([`../characters/ananias_witness.json`](../characters/ananias_witness.json))
*   **Suspects:**
    *   Caiaphas ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Ananias ([`../characters/ananias_witness.json`](../characters/ananias_witness.json))
    *   Peter ([`../characters/peter.json`](../characters/peter.json))
    *   No One ()
*   **Culprit:** **Caiaphas**. He orchestrated the illegal trial to secure a blasphemy charge.
*   **Prophecies:** Isaiah 53:7, Isaiah 50:6, Micah 5:1, Psalm 27:12, Psalm 35:11

*   **Evidence:**
    *   `Rooster Feather`
    *   `Priestly Robe Fragment`
    *   `Conflicting Depositions`
    *   `Mocking Guards' Reed and Spittle`
    *   `Guard's Reed`
    *   `Charcoal Briquette`
     *   `Perjured Witness Statement`
     *   `Silent Witness Account`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Caiaphas | Talk | `Torn High Priestly Robe`, `Silent Witness Account` | Isaiah 50:6 & Micah 5:1, Isaiah 53:7 |
| Peter | Talk | `Courtyard Rooster Feather` | |
| Ananias | Talk | `Conflicting Depositions` |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Caiaphas | `caiaphas_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Peter | `peter_denial_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Ananias | `false_witness_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Caiaphas | `chief_priest` | Suspect only | Talk to Caiaphas; Lab: **Implicated by Action** (His own gesture reveals his orchestration) | ✅ Yes |
| Ananias | `false_witness` | Suspect only | Talk to Ananias; Lab: **Discredited** (Revealed as a false witness) | ✅ Yes |
| Peter | `peter_denial` | Suspect only | Talk to Peter; Lab: **Motive Established** (Fear and denial, not conspiracy) | ✅ Yes |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Torn High Priestly Robe` + `Conflicting Depositions` | Link | **Implicated by Action** for Caiaphas | Isaiah 50:6 & Micah 5:1 | +15 | — | — |
| `Conflicting Depositions` + `Torn High Priestly Robe` | Compare | **Discredited** Ananias | Psalm 27:12 & Psalm 35:11 | +15 | — | — |
| `Courtyard Rooster Feather` + `Torn High Priestly Robe` | Compare | **Motive Established** for Peter (Fear, not conspiracy) | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Torn High Priestly Robe` → Isaiah 50:6 & Micah 5:1 | Lab: `Torn High Priestly Robe` + `Conflicting Depositions` |
| `Conflicting Depositions` → Psalm 27:12 & Psalm 35:11 | Lab: `Conflicting Depositions` + `Torn High Priestic Robe` |
| `Silent Witness Account` → Isaiah 53:7 | Dialogue: Caiaphas |
| `Mocking Guards' Reed and Spittle` → Isaiah 50:6 | Dialogue: Ananias (false witness account) |
| `Guard's Reed` → Micah 5:1 | Dialogue: Caiaphas |
| `Perjured Witness Statement` → Psalm 35:11 | Lab: `Conflicting Depositions` comparison |

**🔗 Cross-Case Chain:** *The Greater Atonement* — The Sanhedrin trial (high priest role) and `barabbas_choice` (scapegoat) connect here to `crucifixion_site`, forming the Day of Atonement typology.
 
### Case: `barabbas_choice` (The People's Choice)
*   **Title:** The People's Choice
*   **Characters:**
    *   Pontius Pilate (Roman Prefect) ([`../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.ink`](../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.ink)) ([`../characters/pontius_pilate.json`](../characters/pontius_pilate.json))
    *   Barabbas (Released Criminal) ([`../story/act3/case_d_roman_interrogation/barabbas_choice.ink`](../story/act3/case_d_roman_interrogation/barabbas_choice.ink)) ([`../characters/barabbas.json`](../characters/barabbas.json))
*   **Suspects:**
    *   Barabbas ([`../characters/barabbas.json`](../characters/barabbas.json))
    *   No One ()
*   **Culprit:** **No One**. The "crime" was the crowd's choice, manipulated by the priests.
*   **Prophecies:** Isaiah 53:3, Psalm 2:1–2

*   **Evidence:**
    *   `The Governor's Silver Basin`
    *   `Claudia's Warning Scroll`
    *   `The Insurgent's Dossier`
    *   `Joint Verdict Scroll`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Pontius Pilate | Talk | `Pilate's Wash Basin` | |
| Barabbas | Talk | `Broken Prison Shackles`, `Pilate's Written Judgment` |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Pontius Pilate | `pontius_pilate_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Barabbas | `barabbas_insurgent_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Barabbas | `barabbas_insurgent` | Suspect only | Talk to Barabbas; Lab: **Cleared** (He was the beneficiary, not the cause) | ✅ Yes |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Broken Prison Shackles` + `Pilate's Wash Basin` | Link | **Cleared** Barabbas (Beneficiary, not cause) | Isaiah 53:3 | +15 | — | — |
| `Pilate's Wash Basin` + `Broken Prison Shackles` | Link | **Has Alibi** for Pontius Pilate (Publicly washed hands) | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Broken Prison Shackles` → Isaiah 53:3 | Lab: `Broken Prison Shackles` + `Pilate's Wash Basin` |
| `Broken Prison Shackles` → Psalm 2:1–2 | Not explicitly linked in Lab/People tables |
 
### Case: `crucifixion_site` (The Final Sacrifice)
*   **Title:** The Final Sacrifice
*   **Characters:**
    *   Centurion Longinus ([`../story/act3/case_e_final_sacrifice/roman_assessment.ink`](../story/act3/case_e_final_sacrifice/roman_assessment.ink)) ([`../characters/centurion_longinus.json`](../characters/centurion_longinus.json))
    *   Pashhur (Temple Priest) ([`../story/act3/case_e_final_sacrifice/pashhur.ink`](../story/act3/case_e_final_sacrifice/pashhur.ink)) ([`../characters/pashhur.json`](../characters/pashhur.json))
    *   Joseph of Arimathea ([`../story/act3/case_e_final_sacrifice/joseph_arimathea_cross.ink`](../story/act3/case_e_final_sacrifice/joseph_arimathea_cross.ink)) ([`../characters/joseph_arimathea.json`](../characters/joseph_arimathea.json))
*   **Suspects:**
    *   Longinus ([`../characters/centurion_longinus.json`](../characters/centurion_longinus.json))
    *   Pashhur ([`../characters/pashhur.json`](../characters/pashhur.json))
    *   Joseph of Arimathea ([`../characters/joseph_arimathea.json`](../characters/joseph_arimathea.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a divine/cosmic act, not a human crime.
*   **Prophecies:** Psalm 22:1, Psalm 22:7–8, Psalm 22:16, Psalm 22:18, Psalm 69:21, Amos 8:9, Isaiah 53:9, Zechariah 12:10, Psalm 34:20, Exodus 12:46, Psalm 31:5

*   **Typologies:** Red Heifer (Numbers 19), Isaac Carrying the Wood (Genesis 22)

*   **Evidence:**
    *   `Soldiers' Casting Dice`
    *   `Crucifixion Nails`
    *   `Mocking Crown of Thorns`
    *   `Cry of Abandonment`
    *   `Blood-Stained Roman Hasta`
    *   `Shattered Limestone Fragment`
    *   `Thick Blue and Scarlet Threads`
    *   `Joseph's Market Bill for Fine Linen`
    *   `Unbroken Tibiae Report`
    *   `Final Words Scroll`
    *   `Sponge Soaked in Sour Wine`
    *   `Simon of Cyrene's Burden`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Centurion Longinus | Talk | `Soldier's Gambling Dice`, `Centurion's Spear`, `Mocking Crown of Thorns` | Psalm 34:20 |
| Pashhur | Talk | `The Torn Temple Veil`, `Split Rocks` | Amos 8:9 |
| Joseph of Arimathea | Talk | `Fine Linen Burial Cloth` | Isaiah 53:9 |
| Crucifixion Guard | Talk | `Crucifixion Nails`, `Cry of Abandonment` | Psalm 22:1, Psalm 22:16 |
| Simon of Cyrene | Talk | `Simon of Cyrene's Burden` | Genesis 22:6 (Isaac) |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Centurion Longinus | `centurion_longinus` | NPC + Suspect | Talk to Centurion Longinus; Collect `split_dice`, `pierced_spear`; Lab: **Motive Questioned** (Was a participant, not an instigator) | ✅ Yes |
| Pashhur | `temple_priest_pashhur` | NPC + Suspect | Talk to Pashhur; Collect `torn_temple_veil`, `split_rocks`; Lab: **Identified as Witness** (Witnessed the divine event in the Temple) | ✅ Yes |
| Joseph of Arimathea | `joseph_arimathea` | NPC + Suspect | Talk to Joseph of Arimathea; Collect `linen_shroud_receipt`; Lab: **Motive Clarified** (Acted out of respect, not conspiracy) | ✅ Yes |
| Upper Room Prep | `upper_room_prep` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Secret Visitor | `secret_visit` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Peter (Denial) | `peter_denial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Peter (Simple Defense) | `peter_defense_simple` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Simon of Cyrene | `simon_cyrene` | NPC | Talk to Simon of Cyrene; Collect `simon_cyrene_burden`; Lab: **Isaac Typology** (Carries the wood, just as Isaac did) | ✅ Yes |
| Temple Curtain Witness | `temple_curtain` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Crucifixion Guard | `execution_guard` | NPC | Talk to Crucifixion Guard; Collect `crucifixion_nails`, `last_cry_abandonment`; Lab: **Gospel Details Verified** (Nails and final words confirm Gospel accuracy) | ✅ Yes |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Soldier's Gambling Dice` + `Centurion's Spear` | Link | **Motive Questioned** for Centurion Longinus | Psalm 22:18 | +15 | — | — |
| `The Torn Temple Veil` + `Soldiers' Gambling Dice` | Compare | **Identified as Witness** for Pashhur | Jeremiah 31:31-34 | +15 | — | — |
| `Fine Linen Burial Cloth` + `Centurion's Spear` | Link | **Motive Clarified** for Joseph of Arimathea | Isaiah 53:9 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Soldier's Gambling Dice` → Psalm 22:18 | Lab: `Soldier's Gambling Dice` + `Centurion's Spear` |
| `Crucifixion Nails` → Psalm 22:16 | Dialogue: Centurion Longinus |
| `Mocking Crown of Thorns` → Psalm 22:7–8 | Dialogue: Centurion Longinus |
| `Cry of Abandonment` → Psalm 22:1 | Dialogue: Centurion Longinus |
| `The Torn Temple Veil` → Jeremiah 31:31-34 | Lab: `The Torn Temple Veil` + `Soldiers' Gambling Dice` |
| `Split Rocks` → Haggai 2:6-7 | Dialogue: Pashhur |
| `Fine Linen Burial Cloth` → Isaiah 53:9 | Lab: `Fine Linen Burial Cloth` + `Centurion's Spear` |
| `Centurion's Spear` → Psalm 34:20 | Dialogue: Centurion Longinus |
| `Centurion's Spear` → Zechariah 12:10 | Lab: `Centurion's Spear` (pierced side) |
| `Shattered Limestone Fragment` → Numbers 19 (Red Heifer) | Dialogue: Pashhur |
| `Simon of Cyrene's Burden` → Genesis 22:6 (Isaac Carrying the Wood) | Dialogue: Centurion Longinus |
| `Centurion's Spear` → Psalm 31:5 | Not explicitly linked in Lab/People tables |

**🔓 Hidden Chain:** *The Perfect Sacrifice* — Complete the Psalm 22 chain by linking all mocking, piercing, and garment-division evidence.

**🔓 Hidden Chain:** *The True Passover Lamb* — Link Passover Lamb evidence across `last_supper`, `passover_lamb_chain`, and `crucifixion_site`.
 
---
[Back to Top](#table-of-contents)

## Act IV: The New Beginning

### Case: `resurrection` (The Empty Tomb)
*   **Title:** The Empty Tomb
*   **Characters:**
    *   Mary Magdalene (First Witness) ([`../story/act4/case_a_empty_tomb/mary_magdalene.ink`](../story/act4/case_a_empty_tomb/mary_magdalene.ink)) ([`../characters/mary_magdalene.json`](../characters/mary_magdalene.json))
    *   Marcus (Roman Guard) ([`../story/act4/case_a_empty_tomb/execution_soldier.ink`](../story/act4/case_a_empty_tomb/execution_soldier.ink)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Joseph of Arimathea (Tomb Owner) ([`../story/act4/case_a_empty_tomb/joseph_arimathea.ink`](../story/act4/case_a_empty_tomb/joseph_arimathea.ink)) ([`../characters/joseph_arimathea.json`](../characters/joseph_arimathea.json))
*   **Suspects:**
    *   Mary Magdalene ([`../characters/mary_magdalene.json`](../characters/mary_magdalene.json))
    *   Marcus ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Joseph of Arimathea ([`../characters/joseph_arimathea.json`](../characters/joseph_arimathea.json))
    *   No One ()
*   **Culprit:** **No One**. The resurrection was a supernatural event.
*   **Prophecies:** Psalm 16:10, Hosea 6:2, Jonah 1:17 / Matthew 12:40, Isaiah 53:10–11, Psalm 22:1–31, Isaiah 26:19, Leviticus 23:9–14

*   **Evidence:**
    *   `The Displaced Sealing Stone`
    *   `The Empty Burial Chamber`
    *   `Folded Burial Linens`
    *   `The Angelic Proclamation`
    *   `The Soldiers' Broken Report`
    *   `Unused Burial Spices`
    *   `Mary Magdalene's Testimony`
    *   `Resurrection Psalm Scroll`
    *   `Sign of Jonah`
    *   `Firstfruits Offering`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Mary Magdalene | Talk | `rolled_stone`, `empty_tomb`, `burial_linen`, `angelic_witness`, `mary_encounter` | Psalm 16:10 |
| Marcus | Talk | `guard_report`, `rolled_stone` | Hosea 6:2 |
| Joseph of Arimathea | Talk | `spice_jars`, `empty_tomb`, `firstfruits_offering` | Isaiah 53:10–11, Leviticus 23:9–14 |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Mary Magdalene | `mary_magdalene` | NPC + Suspect | Talk to Mary Magdalene; Collect `mary_encounter`, `angelic_witness`, `empty_tomb`, `burial_linen`; Lab: **Identified as Witness** (Discovered the empty tomb) | ✅ Yes |
| Marcus | `marcus` | NPC + Suspect | Talk to Marcus; Collect `guard_report`, `rolled_stone`; Lab: **Implicated in Failure** (The seal he guarded was broken) | ✅ Yes |
| Joseph of Arimathea | `joseph` | NPC + Suspect | Talk to Joseph of Arimathea; Collect `spice_jars`; Lab: **Cleared** (His intention was to anoint a body, not hide one) | ✅ Yes |
| No One | `none` | Suspect only | Collect `empty_tomb`, `guard_report` | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `burial_linen` + `rolled_stone` | Compare | **Identified as Witness** for Mary Magdalene | Psalm 16:10 | +15 | — | — |
| `rolled_stone` + `guard_report` | Compare | **Implicated in Failure** for Marcus | Hosea 6:2 & Jonah 1:17 | +15 | — | — |
| `spice_jars` + `burial_linen` | Timeline | **Cleared** Joseph of Arimathea | Isaiah 53:10–11 | +15 | — | — |
| `rolled_stone` + `guard_report` | Link | **Supernatural Event Confirmed** | Psalm 16:10 | +15 | — | — |
| `empty_tomb` + `burial_linen` | Compare | **Theft Ruled Out** | Psalm 16:10 | +15 | — | — |
| `angelic_witness` + `mary_encounter` | Compare | **Witness Convergence** | Isaiah 53:10–11 | +15 | — | — |
| `mary_encounter` + `guard_report` | Contradict | **Independent Accounts** | Jonah 1:17 / Matthew 12:40 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `burial_linen` → Psalm 16:10 | Lab: `burial_linen` + `rolled_stone` |
| `rolled_stone` → Hosea 6:2 & Jonah 1:17 | Lab: `rolled_stone` + `guard_report` |
| `spice_jars` → Isaiah 53:10–11 | Lab: `spice_jars` + `burial_linen` |
| `empty_tomb` → Psalm 22:1–31 | Codex: `empty_tomb` (cry of abandonment opens, resurrection closes the psalm) |
| `rolled_stone` → Psalm 16:10 | Lab: `rolled_stone` (the dead rise and shout for joy) |
| `opened_tombs` → Ezekiel 37:12-13 | Lab: `opened_tombs` + `guard_report` |
| `firstfruits_offering` → Leviticus 23:9–14 | Dialogue: Joseph of Arimathea |
| `empty_tomb` → Psalm 16:10 | Lab: `empty_tomb` (resurrection as guarantee of our own rising) |

**🔓 Hidden Chain:** *Death Defeated* — Link Jonah Record, Firstfruits Offering, Empty Tomb, and Resurrection Witnesses to complete the resurrection prophecy chain.
 
### Case: `roman_inquiry` (The Guard's Report)
*   **Title:** The Guard's Report
*   **Characters:**
    *   Lucas (Tomb Guard Sentry) ([`../story/act4/case_b_guards_report/sentry_lucas.ink`](../story/act4/case_b_guards_report/sentry_lucas.ink)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Caiaphas (High Priest) ([`../story/act4/case_b_guards_report/caiaphas_roman_inquiry.ink`](../story/act4/case_b_guards_report/caiaphas_roman_inquiry.ink)) ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Pilate's Secretary ([`../story/act3/case_d_roman_interrogation/pilates_secretary.ink`](../story/act3/case_d_roman_interrogation/pilates_secretary.ink)) ([`../characters/pilate_secretary.json`](../characters/pilate_secretary.json))
*   **Suspects:**
    *   Lucas ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   No One ()
*   **Culprit:** **No One**. The crime was the cover-up conspiracy orchestrated by the Sanhedrin.
*   **Prophecies:** Psalm 2:1–2

*   **Evidence:**
    *   `High-Grade Sanctuary Coins`
    *   `Snapped Clay Roman Seal`
    *   `Shattered Pilum Shaft`
    *   `Official Sanhedrin Report`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Lucas | Talk | `bribe_shekels`, `broken_imperial_seal`, `shattered_spear` | Psalm 2:1–2 |
| Caiaphas | Talk | `sanhedrin_report` | Psalm 2:1–2 |
| Pilate's Secretary | Talk | — | Psalm 2:1–2 |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Lucas of the Tenth Legion | `sentry_lucas` | NPC + Suspect | Talk to Lucas of the Tenth Legion; Lab: **Implicated in Bribery** (Possession of the coins links him to the cover-up) | ✅ Yes |
| Caiaphas | `chief_priest_caiaphas` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Pilate’s Secretary | `pilates_secretary` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Mary (Resurrection) | `mary_resurrection` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Judas (Betrayal) | `judas_betrayal` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Herod's Servant | `herods_servant` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Peter (Restored) | `peter_restored` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `bribe_shekels` + `sanhedrin_report` | Link | **Implicated in Bribery** for Lucas | Psalm 2:1–2 | +15 | — | — |
| `sanhedrin_report` + `bribe_shekels` | Link | **Implicated in Conspiracy** for Caiaphas | Psalm 2:1–2 | +15 | — | — |
| `broken_imperial_seal` + `shattered_spear` | Link | **Physical Damage Confirmed** | Psalm 2:1–2 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `bribe_shekels` → Psalm 2:1–2 | Lab: `bribe_shekels` + `sanhedrin_report` |
 
### Case: `peter_restoration` (Peter's Restoration)
*   **Title:** Peter's Restoration
*   **Characters:**
    *   Peter (Restored Apostle) ([`../story/act4/case_c_peters_restoration/peter_restored.ink`](../story/act4/case_c_peters_restoration/peter_restored.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   Thomas (Disciple) ([`../story/act4/case_c_peters_restoration/thomas_restoration.ink`](../story/act4/case_c_peters_restoration/thomas_restoration.ink)) ([`../characters/thomas.json`](../characters/thomas.json))
    *   Mary Magdalene (Witness) ([`../story/act4/case_c_peters_restoration/jesus_reinstatement.ink`](../story/act4/case_c_peters_restoration/jesus_reinstatement.ink)) ([`../characters/mary_magdalene.json`](../characters/mary_magdalene.json))
    *   Nathanael (Disciple) ([`../story/act4/case_c_peters_restoration/nathanael_disciple.ink`](../story/act4/case_c_peters_restoration/nathanael_disciple.ink)) ([`../characters/nathanael_disciple.json`](../characters/nathanael_disciple.json))
*   **Suspects:**
    *   Peter ([`../characters/peter.json`](../characters/peter.json))
    *   No One ()
*   **Culprit:** **No One**. The event was an act of divine grace and restoration.
*   **Prophecies:** Zechariah 13:7, Ezekiel 34:11-16

*   **Evidence:**
    *   `The Charcoal Fire`
    *   `The Miraculous Catch`
    *   `Bread and Fish Breakfast`
    *   `The Threefold Commission`
    *   `Risen Appearance`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `charcoal_fire`, `threefold_commission` | Zechariah 13:7 |
| Thomas | Talk | `miraculous_catch`, `threefold_commission` | Zechariah 13:7 |
| Mary Magdalene | Talk | `miraculous_catch` | Ezekiel 34:11-16 |
| Nathanael | Talk | — | Ezekiel 34:11-16 |





##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Peter | `peter` | NPC + Suspect | Talk to Peter; Collect `charcoal_fire`, `threefold_commission`; Lab: **Motive Clarified** (Links his restoration to his earlier denial) | ✅ Yes |
| Thomas | `thomas` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Mary Magdalene | `mary_magdalene` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Nathanael | `nathanael` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| No One | `none` | Suspect only | Collect `threefold_commission` | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `charcoal_fire` + `threefold_commission` | Compare | **Motive Clarified** for Peter | Zechariah 13:7 | +15 | — | — |
| `miraculous_catch` + `threefold_commission` | Timeline | **Restoration Pattern** | Ezekiel 34:11-16 | +15 | — | — |
| `galilean_apparition` + `bread_breakfast` | Compare | **Physical Resurrection Confirmed** | Ezekiel 34:11-16 | +15 | — | — |
| `galilean_apparition` + `miraculous_catch` | Compare | **Eyewitness Confirmation** | Isaiah 53:10-11 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `charcoal_fire` → Zechariah 13:7 | Lab: `charcoal_fire` + `threefold_commission` |
| `miraculous_catch` → Ezekiel 34:11-16 | Lab: `miraculous_catch` + `threefold_commission` |
| `bread_breakfast` → Ezekiel 34:11-16 | Lab: `galilean_apparition` + `bread_breakfast` |
| `galilean_apparition` → Isaiah 53:10-11 | Lab: `galilean_apparition` + `miraculous_catch` |
| `threefold_commission` → Ezekiel 34:11-16 | Dialogue: Peter / Nathanael |
 



---
[Back to Top](#table-of-contents)

<!-- AUTO-GENERATED: DIALOGUE-ID-INDEX START -->
## Canonical Runtime Dialogue ID Reference (Auto-Generated)


This section is generated from `js/act*_case.js` + `js/gameplay/dialogueMaps.js` and reflects the **actual runtime mapping**.

- Dialogue cache key is case-scoped at runtime: `caseId::npcId`.
- `dialogueKey` is resolved from: `npc.storyFile || npc.dialogueId || npc.id`.

| Act | Case ID | Character ID | Character Name | dialogueKey | Runtime Story (.json) | Source (.ink) |
|---|---|---|---|---|---|---|
| Act I | `fig_tree_incident` | `john_fig_tree` | John | `john_fig_tree` | [`../story/act1/case_c_fig_tree_incident/john_fig_tree.json`](../story/act1/case_c_fig_tree_incident/john_fig_tree.json) | [`../story/act1/case_c_fig_tree_incident/john_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/john_fig_tree.ink) |
| Act I | `fig_tree_incident` | `local_traveler_fig_tree` | Local Traveler | `local_traveler` | [`../story/act1/case_c_fig_tree_incident/local_traveler.json`](../story/act1/case_c_fig_tree_incident/local_traveler.json) | [`../story/act1/case_c_fig_tree_incident/local_traveler.ink`](../story/act1/case_c_fig_tree_incident/local_traveler.ink) |
| Act I | `fig_tree_incident` | `nathan_gardener` | Nathan | `nathan_fig_tree` | [`../story/act1/case_c_fig_tree_incident/nathan_fig_tree.json`](../story/act1/case_c_fig_tree_incident/nathan_fig_tree.json) | — |
| Act I | `fig_tree_incident` | `peter_fig_tree` | Peter | `peter_fig_tree` | [`../story/act1/case_c_fig_tree_incident/peter_fig_tree.json`](../story/act1/case_c_fig_tree_incident/peter_fig_tree.json) | [`../story/act1/case_c_fig_tree_incident/peter_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/peter_fig_tree.ink) |
| Act I | `temple_cleansing` | `barabbas_insurgent` | Barabbas | `barabbas_insurgent` | [`../story/act1/case_b_overturned_tables/barabbas_insurgent.json`](../story/act1/case_b_overturned_tables/barabbas_insurgent.json) | [`../story/act1/case_b_overturned_tables/barabbas_insurgent.ink`](../story/act1/case_b_overturned_tables/barabbas_insurgent.ink) |
| Act I | `temple_cleansing` | `corrupt_seller` | Corrupt Seller | `corrupt_seller` | [`../story/act1/case_b_overturned_tables/corrupt_seller.json`](../story/act1/case_b_overturned_tables/corrupt_seller.json) | [`../story/act1/case_b_overturned_tables/corrupt_seller.ink`](../story/act1/case_b_overturned_tables/corrupt_seller.ink) |
| Act I | `temple_cleansing` | `garrison_guard` | Marcus | `guard_report_temple` | [`../story/act1/case_b_overturned_tables/guard_report_temple.json`](../story/act1/case_b_overturned_tables/guard_report_temple.json) | — |
| Act I | `temple_cleansing` | `informant_bribe` | Market Informant | `informant_bribe` | [`../story/act1/case_b_overturned_tables/informant_bribe.json`](../story/act1/case_b_overturned_tables/informant_bribe.json) | [`../story/act1/case_b_overturned_tables/informant_bribe.ink`](../story/act1/case_b_overturned_tables/informant_bribe.ink) |
| Act I | `temple_cleansing` | `market_rumors` | Market Vendor | `market_rumors` | [`../story/act1/case_b_overturned_tables/market_rumors.json`](../story/act1/case_b_overturned_tables/market_rumors.json) | [`../story/act1/case_b_overturned_tables/market_rumors.ink`](../story/act1/case_b_overturned_tables/market_rumors.ink) |
| Act I | `temple_cleansing` | `money_changer` | Malachi | `money_changer` | [`../story/act1/case_b_overturned_tables/money_changer.json`](../story/act1/case_b_overturned_tables/money_changer.json) | [`../story/act1/case_b_overturned_tables/money_changer.ink`](../story/act1/case_b_overturned_tables/money_changer.ink) |
| Act I | `temple_cleansing` | `pharisee_critique` | Simon the Pharisee | `pharisee_critique` | [`../story/act1/case_b_overturned_tables/pharisee_critique.json`](../story/act1/case_b_overturned_tables/pharisee_critique.json) | [`../story/act1/case_b_overturned_tables/pharisee_critique.ink`](../story/act1/case_b_overturned_tables/pharisee_critique.ink) |
| Act I | `temple_cleansing` | `pilates_secretary` | Pilate's Secretary | `pilates_secretary` | [`../story/act1/case_b_overturned_tables/pilates_secretary.json`](../story/act1/case_b_overturned_tables/pilates_secretary.json) | [`../story/act1/case_b_overturned_tables/pilates_secretary.ink`](../story/act1/case_b_overturned_tables/pilates_secretary.ink) |
| Act I | `temple_cleansing` | `pontius_pilate` | Pontius Pilate | `pontius_pilate_temple` | [`../story/act1/case_b_overturned_tables/pontius_pilate_temple.json`](../story/act1/case_b_overturned_tables/pontius_pilate_temple.json) | [`../story/act1/case_b_overturned_tables/pontius_pilate_temple.ink`](../story/act1/case_b_overturned_tables/pontius_pilate_temple.ink) |
| Act I | `temple_cleansing` | `priest_objection` | Temple Priest Objector | `priest_objection_temple` | [`../story/act1/case_b_overturned_tables/priest_objection_temple.json`](../story/act1/case_b_overturned_tables/priest_objection_temple.json) | — |
| Act I | `temple_cleansing` | `rumor_whisper` | Rumor Whisperer | `rumor_whisper` | [`../story/act1/case_b_overturned_tables/rumor_whisper.json`](../story/act1/case_b_overturned_tables/rumor_whisper.json) | [`../story/act1/case_b_overturned_tables/rumor_whisper.ink`](../story/act1/case_b_overturned_tables/rumor_whisper.ink) |
| Act I | `temple_cleansing` | `sadducee_opposition` | Sadducee Opposer | `sadducee_opposition` | [`../story/act1/case_a_missing_donkey/sadducee_opposition.json`](../story/act1/case_a_missing_donkey/sadducee_opposition.json) | [`../story/act1/case_a_missing_donkey/sadducee_opposition.ink`](../story/act1/case_a_missing_donkey/sadducee_opposition.ink) |
| Act I | `temple_cleansing` | `upset_buyer` | Upset Temple Buyer | `upset_buyer` | [`../story/act1/case_b_overturned_tables/upset_buyer.json`](../story/act1/case_b_overturned_tables/upset_buyer.json) | [`../story/act1/case_b_overturned_tables/upset_buyer.ink`](../story/act1/case_b_overturned_tables/upset_buyer.ink) |
| Act I | `temple_cleansing` | `woman_cloak` | Woman Who Gave Her Cloak | `woman_cloak` | [`../story/act1/case_b_overturned_tables/woman_cloak.json`](../story/act1/case_b_overturned_tables/woman_cloak.json) | [`../story/act1/case_b_overturned_tables/woman_cloak.ink`](../story/act1/case_b_overturned_tables/woman_cloak.ink) |
| Act I | `triumphal_entry` | `eleazar` | Eleazar | `eleazar_sadducee` | [`../story/act1/case_a_missing_donkey/eleazar_sadducee.json`](../story/act1/case_a_missing_donkey/eleazar_sadducee.json) | [`../story/act1/case_a_missing_donkey/eleazar_sadducee.ink`](../story/act1/case_a_missing_donkey/eleazar_sadducee.ink) |
| Act I | `triumphal_entry` | `john` | John | `john_donkey` | [`../story/act1/case_a_missing_donkey/john_donkey.json`](../story/act1/case_a_missing_donkey/john_donkey.json) | [`../story/act1/case_a_missing_donkey/john_donkey.ink`](../story/act1/case_a_missing_donkey/john_donkey.ink) |
| Act I | `triumphal_entry` | `local_skeptic` | Jemimah | `jerusalem_local` | [`../story/act1/case_a_missing_donkey/jerusalem_local.json`](../story/act1/case_a_missing_donkey/jerusalem_local.json) | [`../story/act1/case_a_missing_donkey/jerusalem_local.ink`](../story/act1/case_a_missing_donkey/jerusalem_local.ink) |
| Act I | `triumphal_entry` | `owner` | Tobias | `galilean_pilgrim` | [`../story/act1/case_a_missing_donkey/galilean_pilgrim.json`](../story/act1/case_a_missing_donkey/galilean_pilgrim.json) | [`../story/act1/case_a_missing_donkey/galilean_pilgrim.ink`](../story/act1/case_a_missing_donkey/galilean_pilgrim.ink) |
| Act I | `triumphal_entry` | `peter` | Peter | `peter_donkey` | [`../story/act1/case_a_missing_donkey/peter_donkey.json`](../story/act1/case_a_missing_donkey/peter_donkey.json) | [`../story/act1/case_a_missing_donkey/peter_donkey.ink`](../story/act1/case_a_missing_donkey/peter_donkey.ink) |
| Act II | `authority_challenged` | `chief_priest` | Caiaphas | `chief_priest` | [`../story/act2/case_a_silenced_teacher/caiaphas_priest.json`](../story/act2/case_a_silenced_teacher/caiaphas_priest.json) | [`../story/act2/case_a_silenced_teacher/caiaphas_priest.ink`](../story/act2/case_a_silenced_teacher/caiaphas_priest.ink) |
| Act II | `authority_challenged` | `pharisee` | Nathanael | `pharisee_critique` | [`../story/act1/case_b_overturned_tables/pharisee_critique.json`](../story/act1/case_b_overturned_tables/pharisee_critique.json) | [`../story/act1/case_b_overturned_tables/pharisee_critique.ink`](../story/act1/case_b_overturned_tables/pharisee_critique.ink) |
| Act II | `authority_challenged` | `rich_young_ruler` | Thomas the Rich Young Ruler | `rich_young_ruler` | [`../story/act2/case_a_silenced_teacher/rich_young_ruler.json`](../story/act2/case_a_silenced_teacher/rich_young_ruler.json) | [`../story/act2/case_a_silenced_teacher/rich_young_ruler.ink`](../story/act2/case_a_silenced_teacher/rich_young_ruler.ink) |
| Act II | `authority_challenged` | `scribe` | Samuel | `scribe_intro` | [`../story/act2/case_a_silenced_teacher/scribe_intro.json`](../story/act2/case_a_silenced_teacher/scribe_intro.json) | [`../story/act2/case_a_silenced_teacher/scribe_intro.ink`](../story/act2/case_a_silenced_teacher/scribe_intro.ink) |
| Act II | `lazarus_plot` | `annas_patriarch` | Annas | `annas_patriarch` | [`../story/act2/case_b_lazarus_conspiracy/annas_patriarch.json`](../story/act2/case_b_lazarus_conspiracy/annas_patriarch.json) | [`../story/act2/case_b_lazarus_conspiracy/annas_patriarch.ink`](../story/act2/case_b_lazarus_conspiracy/annas_patriarch.ink) |
| Act II | `lazarus_plot` | `martha_bethany` | Martha | `martha_bethany` | [`../story/act2/case_b_lazarus_conspiracy/martha_bethany.json`](../story/act2/case_b_lazarus_conspiracy/martha_bethany.json) | [`../story/act2/case_b_lazarus_conspiracy/martha_bethany.ink`](../story/act2/case_b_lazarus_conspiracy/martha_bethany.ink) |
| Act II | `lazarus_plot` | `nicodemus` | Nicodemus | `nicodemus_conflicted` | [`../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.json`](../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.json) | [`../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.ink`](../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.ink) |
| Act II | `lazarus_plot` | `parable_meaning` | Thomas (Parable) | `parable_meaning` | [`../story/act2/case_a_silenced_teacher/parable_meaning.json`](../story/act2/case_a_silenced_teacher/parable_meaning.json) | [`../story/act2/case_a_silenced_teacher/parable_meaning.ink`](../story/act2/case_a_silenced_teacher/parable_meaning.ink) |
| Act II | `lazarus_plot` | `parable_vineyard` | Thomas (Vineyard) | `parable_vineyard` | [`../story/act2/case_a_silenced_teacher/parable_vineyard.json`](../story/act2/case_a_silenced_teacher/parable_vineyard.json) | [`../story/act2/case_a_silenced_teacher/parable_vineyard.ink`](../story/act2/case_a_silenced_teacher/parable_vineyard.ink) |
| Act II | `lazarus_plot` | `simon_leper` | Simon the Leper | `simon_leper` | [`../story/act2/case_b_lazarus_conspiracy/simon_leper.json`](../story/act2/case_b_lazarus_conspiracy/simon_leper.json) | [`../story/act2/case_b_lazarus_conspiracy/simon_leper.ink`](../story/act2/case_b_lazarus_conspiracy/simon_leper.ink) |
| Act II | `lazarus_plot` | `teaching_mount` | Mount Teacher | `teaching_mount` | [`../story/act2/case_a_silenced_teacher/teaching_mount.json`](../story/act2/case_a_silenced_teacher/teaching_mount.json) | [`../story/act2/case_a_silenced_teacher/teaching_mount.ink`](../story/act2/case_a_silenced_teacher/teaching_mount.ink) |
| Act II | `lazarus_plot` | `temple_spy` | Maluch | `temple_spy` | [`../story/act2/case_b_lazarus_conspiracy/temple_spy.json`](../story/act2/case_b_lazarus_conspiracy/temple_spy.json) | [`../story/act2/case_b_lazarus_conspiracy/temple_spy.ink`](../story/act2/case_b_lazarus_conspiracy/temple_spy.ink) |
| Act II | `lazarus_plot` | `trial_rumors` | Trial Rumors | `trial_rumors` | [`../story/act3/case_c_midnight_tribunal/trial_rumors.json`](../story/act3/case_c_midnight_tribunal/trial_rumors.json) | [`../story/act3/case_c_midnight_tribunal/trial_rumors.ink`](../story/act3/case_c_midnight_tribunal/trial_rumors.ink) |
| Act II | `lazarus_plot` | `witness_healed` | Bethesda Witness | `witness_healed` | [`../story/act2/case_a_silenced_teacher/witness_healed.json`](../story/act2/case_a_silenced_teacher/witness_healed.json) | [`../story/act2/case_a_silenced_teacher/witness_healed.ink`](../story/act2/case_a_silenced_teacher/witness_healed.ink) |
| Act II | `olivet_discourse` | `andrew_olivet` | Andrew | `andrew_olivet` | [`../story/act2/case_c_olivet_discourse/andrew_olivet.json`](../story/act2/case_c_olivet_discourse/andrew_olivet.json) | — |
| Act II | `olivet_discourse` | `john_olivet` | John | `john_olivet` | [`../story/act2/case_c_olivet_discourse/john_olivet.json`](../story/act2/case_c_olivet_discourse/john_olivet.json) | — |
| Act II | `olivet_discourse` | `peter_olivet` | Peter | `peter_olivet` | [`../story/act2/case_c_olivet_discourse/peter_olivet.json`](../story/act2/case_c_olivet_discourse/peter_olivet.json) | — |
| Act II | `olivet_discourse` | `thomas_olivet` | Thomas | `parable_meaning` | [`../story/act2/case_a_silenced_teacher/parable_meaning.json`](../story/act2/case_a_silenced_teacher/parable_meaning.json) | [`../story/act2/case_a_silenced_teacher/parable_meaning.ink`](../story/act2/case_a_silenced_teacher/parable_meaning.ink) |
| Act III | `barabbas_choice` | `barabbas_insurgent_trial` | Barabbas | `barabbas_insurgent` | [`../story/act1/case_b_overturned_tables/barabbas_insurgent.json`](../story/act1/case_b_overturned_tables/barabbas_insurgent.json) | [`../story/act1/case_b_overturned_tables/barabbas_insurgent.ink`](../story/act1/case_b_overturned_tables/barabbas_insurgent.ink) |
| Act III | `barabbas_choice` | `pontius_pilate_trial` | Pontius Pilate | `pontius_pilate_barabbas` | [`../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.json`](../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.json) | — |
| Act III | `crucifixion_site` | `centurion_longinus` | Centurion Longinus | `roman_assessment` | [`../story/act3/case_e_final_sacrifice/roman_assessment.json`](../story/act3/case_e_final_sacrifice/roman_assessment.json) | [`../story/act3/case_e_final_sacrifice/roman_assessment.ink`](../story/act3/case_e_final_sacrifice/roman_assessment.ink) |
| Act III | `crucifixion_site` | `execution_guard` | Crucifixion Guard | `guard_report_crucifixion` | [`../story/act3/case_e_final_sacrifice/guard_report_crucifixion.json`](../story/act3/case_e_final_sacrifice/guard_report_crucifixion.json) | — |
| Act III | `crucifixion_site` | `joseph_arimathea` | Joseph of Arimathea | `joseph_arimathea` | [`../story/act4/case_a_empty_tomb/joseph_arimathea.json`](../story/act4/case_a_empty_tomb/joseph_arimathea.json) | [`../story/act4/case_a_empty_tomb/joseph_arimathea.ink`](../story/act4/case_a_empty_tomb/joseph_arimathea.ink) |
| Act III | `crucifixion_site` | `peter_defense_simple` | Peter (Simple Defense) | `peter_defense_simple` | [`../story/act3/case_b_severed_ear/peter_defense_simple.json`](../story/act3/case_b_severed_ear/peter_defense_simple.json) | [`../story/act3/case_b_severed_ear/peter_defense_simple.ink`](../story/act3/case_b_severed_ear/peter_defense_simple.ink) |
| Act III | `crucifixion_site` | `peter_denial` | Peter (Denial) | `peter_denial` | [`../story/act3/case_c_midnight_tribunal/peter_denial.json`](../story/act3/case_c_midnight_tribunal/peter_denial.json) | [`../story/act3/case_c_midnight_tribunal/peter_denial.ink`](../story/act3/case_c_midnight_tribunal/peter_denial.ink) |
| Act III | `crucifixion_site` | `secret_visit` | Secret Visitor | `secret_visit` | [`../story/act3/case_b_severed_ear/secret_visit.json`](../story/act3/case_b_severed_ear/secret_visit.json) | [`../story/act3/case_b_severed_ear/secret_visit.ink`](../story/act3/case_b_severed_ear/secret_visit.ink) |
| Act III | `crucifixion_site` | `simon_cyrene` | Simon of Cyrene | `simon_cyrene` | [`../story/act3/case_e_final_sacrifice/simon_cyrene.json`](../story/act3/case_e_final_sacrifice/simon_cyrene.json) | [`../story/act3/case_e_final_sacrifice/simon_cyrene.ink`](../story/act3/case_e_final_sacrifice/simon_cyrene.ink) |
| Act III | `crucifixion_site` | `temple_curtain` | Temple Curtain Witness | `priest_objection_crucifixion` | [`../story/act3/case_e_final_sacrifice/priest_objection_crucifixion.json`](../story/act3/case_e_final_sacrifice/priest_objection_crucifixion.json) | — |
| Act III | `crucifixion_site` | `temple_priest_pashhur` | Pashhur | `temple_curtain` | [`../story/act3/case_e_final_sacrifice/temple_curtain.json`](../story/act3/case_e_final_sacrifice/temple_curtain.json) | [`../story/act3/case_e_final_sacrifice/temple_curtain.ink`](../story/act3/case_e_final_sacrifice/temple_curtain.ink) |
| Act III | `crucifixion_site` | `upper_room_prep` | Upper Room Prep | `upper_room_prep` | [`../story/act3/case_a_broken_cup/upper_room_prep.json`](../story/act3/case_a_broken_cup/upper_room_prep.json) | [`../story/act3/case_a_broken_cup/upper_room_prep.ink`](../story/act3/case_a_broken_cup/upper_room_prep.ink) |
| Act III | `gethsemane_arrest` | `malchus_servant` | Malchus | `malchus` | [`../story/act3/case_b_severed_ear/malchus.json`](../story/act3/case_b_severed_ear/malchus.json) | — |
| Act III | `gethsemane_arrest` | `roman_soldier` | Garrison Guard | `guard_report_gethsemane` | [`../story/act3/case_b_severed_ear/guard_report_gethsemane.json`](../story/act3/case_b_severed_ear/guard_report_gethsemane.json) | — |
| Act III | `gethsemane_arrest` | `simon_peter` | Simon Peter | `peter_defense` | [`../story/act3/case_b_severed_ear/peter_defense.json`](../story/act3/case_b_severed_ear/peter_defense.json) | [`../story/act3/case_b_severed_ear/peter_defense.ink`](../story/act3/case_b_severed_ear/peter_defense.ink) |
| Act III | `last_supper` | `john_mark` | John Mark | `john_disciple` | [`../story/act3/case_a_broken_cup/john_disciple.json`](../story/act3/case_a_broken_cup/john_disciple.json) | [`../story/act3/case_a_broken_cup/john_disciple.ink`](../story/act3/case_a_broken_cup/john_disciple.ink) |
| Act III | `last_supper` | `judas` | Judas Iscariot | `judas_iscariot` | [`../story/act3/case_a_broken_cup/judas_iscariot.json`](../story/act3/case_a_broken_cup/judas_iscariot.json) | [`../story/act3/case_a_broken_cup/judas_iscariot.ink`](../story/act3/case_a_broken_cup/judas_iscariot.ink) |
| Act III | `last_supper` | `servant` | Rhoda | `rhoda_servant` | [`../story/act3/case_a_broken_cup/rhoda_servant.json`](../story/act3/case_a_broken_cup/rhoda_servant.json) | [`../story/act3/case_a_broken_cup/rhoda_servant.ink`](../story/act3/case_a_broken_cup/rhoda_servant.ink) |
| Act III | `sanhedrin_trial` | `caiaphas_trial` | Caiaphas | `caiaphas_priest` | [`../story/act3/case_c_midnight_tribunal/caiaphas_priest.json`](../story/act3/case_c_midnight_tribunal/caiaphas_priest.json) | [`../story/act3/case_c_midnight_tribunal/caiaphas_priest.ink`](../story/act3/case_c_midnight_tribunal/caiaphas_priest.ink) |
| Act III | `sanhedrin_trial` | `false_witness_trial` | Ananias | `false_witness` | [`../story/act3/case_c_midnight_tribunal/false_witness.json`](../story/act3/case_c_midnight_tribunal/false_witness.json) | — |
| Act III | `sanhedrin_trial` | `peter_denial_trial` | Peter | `peter_denial` | [`../story/act3/case_c_midnight_tribunal/peter_denial.json`](../story/act3/case_c_midnight_tribunal/peter_denial.json) | [`../story/act3/case_c_midnight_tribunal/peter_denial.ink`](../story/act3/case_c_midnight_tribunal/peter_denial.ink) |
| Act IV | `peter_restoration` | `mary_magdalene` | Mary Magdalene | `mary_magdalene` | [`../story/act4/case_a_empty_tomb/mary_magdalene.json`](../story/act4/case_a_empty_tomb/mary_magdalene.json) | [`../story/act4/case_a_empty_tomb/mary_magdalene.ink`](../story/act4/case_a_empty_tomb/mary_magdalene.ink) |
| Act IV | `peter_restoration` | `nathanael` | Nathanael | `nathanael_disciple` | [`../story/act4/case_c_peters_restoration/nathanael_disciple.json`](../story/act4/case_c_peters_restoration/nathanael_disciple.json) | — |
| Act IV | `peter_restoration` | `peter` | Peter | `peter_restored` | [`../story/act4/case_c_peters_restoration/peter_restored.json`](../story/act4/case_c_peters_restoration/peter_restored.json) | [`../story/act4/case_c_peters_restoration/peter_restored.ink`](../story/act4/case_c_peters_restoration/peter_restored.ink) |
| Act IV | `peter_restoration` | `thomas` | Thomas | `parable_meaning` | [`../story/act2/case_a_silenced_teacher/parable_meaning.json`](../story/act2/case_a_silenced_teacher/parable_meaning.json) | [`../story/act2/case_a_silenced_teacher/parable_meaning.ink`](../story/act2/case_a_silenced_teacher/parable_meaning.ink) |
| Act IV | `resurrection` | `joseph` | Joseph of Arimathea | `joseph_arimathea` | [`../story/act4/case_a_empty_tomb/joseph_arimathea.json`](../story/act4/case_a_empty_tomb/joseph_arimathea.json) | [`../story/act4/case_a_empty_tomb/joseph_arimathea.ink`](../story/act4/case_a_empty_tomb/joseph_arimathea.ink) |
| Act IV | `resurrection` | `marcus` | Marcus | `execution_soldier` | [`../story/act4/case_a_empty_tomb/execution_soldier.json`](../story/act4/case_a_empty_tomb/execution_soldier.json) | [`../story/act4/case_a_empty_tomb/execution_soldier.ink`](../story/act4/case_a_empty_tomb/execution_soldier.ink) |
| Act IV | `resurrection` | `mary_magdalene` | Mary Magdalene | `mary_magdalene` | [`../story/act4/case_a_empty_tomb/mary_magdalene.json`](../story/act4/case_a_empty_tomb/mary_magdalene.json) | [`../story/act4/case_a_empty_tomb/mary_magdalene.ink`](../story/act4/case_a_empty_tomb/mary_magdalene.ink) |
| Act IV | `roman_inquiry` | `herods_servant` | Herod's Servant | `herods_servant` | [`../story/act4/case_b_guards_report/herods_servant.json`](../story/act4/case_b_guards_report/herods_servant.json) | [`../story/act4/case_b_guards_report/herods_servant.ink`](../story/act4/case_b_guards_report/herods_servant.ink) |
| Act IV | `roman_inquiry` | `judas_betrayal` | Judas (Betrayal) | `judas_betrayal` | [`../story/act4/case_b_guards_report/judas_betrayal.json`](../story/act4/case_b_guards_report/judas_betrayal.json) | [`../story/act4/case_b_guards_report/judas_betrayal.ink`](../story/act4/case_b_guards_report/judas_betrayal.ink) |
| Act IV | `roman_inquiry` | `mary_resurrection` | Mary (Resurrection) | `mary_resurrection` | [`../story/act4/case_b_guards_report/mary_resurrection.json`](../story/act4/case_b_guards_report/mary_resurrection.json) | [`../story/act4/case_b_guards_report/mary_resurrection.ink`](../story/act4/case_b_guards_report/mary_resurrection.ink) |
| Act IV | `roman_inquiry` | `peter_restored` | Peter (Restored) | `peter_restored` | [`../story/act4/case_c_peters_restoration/peter_restored.json`](../story/act4/case_c_peters_restoration/peter_restored.json) | [`../story/act4/case_c_peters_restoration/peter_restored.ink`](../story/act4/case_c_peters_restoration/peter_restored.ink) |
<!-- AUTO-GENERATED: DIALOGUE-ID-INDEX END -->


---
[Back to Top](#table-of-contents)


## Appendix: Emoji Reference

This table catalogs every emoji used directly in the game UI, narrative, or system code.
The **Phosphor Duotone** column provides the SVG filename from [phosphoricons.com](https://phosphoricons.com/?weight=duotone) where a matching icon exists.
Emojis without a match (`—`) currently have no Phosphor Duotone equivalent and remain as-is.

Phosphor Duotone Icon  are in the /assets/gfx/ folder

| Emoji | Phosphor Duotone Icon | Name / Description |
|-------|------------------------|-------------------|
| `🔄` | `arrow-clockwise-duotone.svg` | Arrow Clockwise |
| `⬇️` | `arrow-down-duotone.svg` | Arrow Down |
| `⬆️` | `arrow-up-duotone.svg` | Arrow Up |
| `🔊` | `audio.svg` | Audio |
| `🎒` | `backpack-duotone.svg` | Backpack |
| `⚖️` | `balance-scale-duotone.svg` | Balance Scale |
| `⛵` | `boat-duotone.svg` | Boat |
| `🦴` | `bone-duotone.svg` | Bone |
| `📖` | `book-open-duotone.svg` | Book Open |
| `📚` | `books-duotone.svg` | Books |
| `🥣` | `bowl-duotone.svg` | Bowl |
| `🥊` | `boxing-glove-duotone.svg` | Boxing Glove |
| `🍞` | `bread-duotone.svg` | Bread |
| `🏛️` | `building-columns-duotone.svg` | Building Columns |
| `📅` | `calendar-duotone.svg` | Calendar |
| `⛓` | `chain-duotone.svg` | Chain |
| `💬` | `chat-duotone.svg` | Chat |
| `✅` | `check-circle-duotone.svg` | Check Circle |
| `☐` | `check-square-empty.svg` | Check Square Empty |
| `☑️` | `check-square-full.svg` | Check Square Full |
| `⛪` | `church-duotone.svg` | Church |
| `⭕` | `circle-duotone.svg` | Circle |
| `⭕` | `circle.svg` | Circle |
| `📋` | `clipboard-duotone.svg` | Clipboard |
| `🪙` | `coins-duotone.svg` | Coins |
| `✝️` | `cross-duotone.svg` | Cross |
| `👑` | `crown-duotone.svg` | Crown |
| `☕` | `cup-duotone.svg` | Cup |
| `💵` | `currency-dollar-duotone.svg` | Currency Dollar |
| `🖱️` | `cursor-duotone.svg` | Cursor |
| `🗡` | `dagger-duotone.svg` | Dagger |
| `☀️` | `day.svg` | Day |
| `🎲` | `dice-duotone.svg` | Dice |
| `🟫` | `dirt.svg` | Dirt |
| `🦅` | `eagle-duotone.svg` | Eagle |
| `👂` | `ear-duotone.svg` | Ear |
| `🌍` | `earth-duotone.svg` | Earth |
| `✉️` | `envelope-duotone.svg` | Envelope |
| `👁️` | `eye-duotone.svg` | Eye |
| `🪶` | `feather-duotone.svg` | Feather |
| `🚑` | `first-aid.svg` | First Aid |
| `🐟` | `fish-duotone.svg` | Fish |
| `🔥` | `flame-duotone.svg` | Flame |
| `💾` | `floppy-disk-duotone.svg` | Floppy Disk |
| `💎` | `gem.svg` | Gem |
| `☝️` | `hand-pointer.svg` | Hand Pointer |
| `🪦` | `headstone-duotone.svg` | Headstone |
| `🐴` | `horse-duotone.svg` | Horse |
| `🏠` | `house-chimney-duotone.svg` | House Chimney |
| `🏠` | `house-duotone.svg` | House |
| `📦` | `inventory.svg` | Inventory |
| `🫙` | `jar-duotone.svg` | Jar |
| `💻` | `laptop-code.svg` | Laptop Code |
| `💻` | `laptop-duotone.svg` | Laptop |
| `🍃` | `leaf-duotone.svg` | Leaf |
| `🍂` | `leaves-duotone.svg` | Leaves |
| `🔗` | `link-duotone.svg` | Link |
| `📋` | `list.svg` | List |
| `⏳` | `loading.svg` | Loading |
| `🔒` | `lock-duotone.svg` | Lock |
| `🔓` | `lock-open-duotone.svg` | Lock Open |
| `🪵` | `log-duotone.svg` | Log |
| `🔍` | `magnifying-glass-duotone.svg` | Magnifying Glass |
| `📍` | `map-pin-duotone.svg` | Map Pin |
| `🧠` | `memory.svg` | Memory |
| `🔬` | `microscope-duotone.svg` | Microscope |
| `🌙` | `moon-duotone.svg` | Moon |
| `🎵` | `music.svg` | Music |
| `🔇` | `music_off.svg` | Music_Off |
| `🌙` | `night.svg` | Night |
| `📦` | `package-duotone.svg` | Package |
| `✏️` | `pencil-duotone.svg` | Pencil |
| `📌` | `pin-duotone.svg` | Pin |
| `▶️` | `play-duotone.svg` | Play |
| `➕` | `plus-duotone.svg` | Plus |
| `❓` | `quest.svg` | Quest |
| `❓` | `question-duotone.svg` | Question |
| `🪨` | `rock-duotone.svg` | Rock |
| `🐓` | `rooster-duotone.svg` | Rooster |
| `📏` | `ruler-duotone.svg` | Ruler |
| `📡` | `scan.svg` | Scan |
| `✂️` | `scissors-duotone.svg` | Scissors |
| `📜` | `scroll-duotone.svg` | Scroll |
| `🔍` | `search.svg` | Search |
| `🐑` | `sheep-duotone.svg` | Sheep |
| `🛡️` | `shield-duotone.svg` | Shield |
| `🚿` | `shower-duotone.svg` | Shower |
| `💀` | `skull-duotone.svg` | Skull |
| `✨` | `sparkles-duotone.svg` | Sparkles |
| `🔊` | `speaker-high-duotone.svg` | Speaker High |
| `🕵️` | `spy-duotone.svg` | Spy |
| `⭐` | `star-duotone.svg` | Star |
| `🌟` | `stars-duotone.svg` | Stars |
| `☀️` | `sun-duotone.svg` | Sun |
| `🌅` | `sunrise-duotone.svg` | Sunrise |
| `⚔️` | `sword-duotone.svg` | Sword |
| `📝` | `text-align-left-duotone.svg` | Text Align Left |
| `🎭` | `theater-masks-duotone.svg` | Theater Masks |
| `🌳` | `tree-duotone.svg` | Tree |
| `🏆` | `trophy-duotone.svg` | Trophy |
| `👤` | `user-duotone.svg` | User |
| `👥` | `users-duotone.svg` | Users |
| `💧` | `water-drop-duotone.svg` | Water Drop |
| `🥀` | `wilted-flower-duotone.svg` | Wilted Flower |
| `🍷` | `wine-duotone.svg` | Wine |
| `🔧` | `wrench.svg` | Wrench |
| `❌` | `x-circle-duotone.svg` | X Circle |
| `✖️` | `x-duotone.svg` | X |

<!-- AUTO-GENERATED: EMOJI-REFERENCE-APPENDIX END -->

---
[Back to Top](#table-of-contents)


# Appendix: Character Emoji & Icon Reference

This table maps each character to their representative emoji and the corresponding SVG icon file located in `/assets/character/`.

| Emoji | Character Name | SVG Icon File |
|:---:|---|---|
| `📜` | Senior Scribe | `senior_scribe.svg` |
| `🤔` | Thomas the Twin | `thomas.svg` |
| `🏛️` | Pashhur | `pashhur.svg` |
| `🧐` | Simon the Pharisee | `simon_pharisee.svg` |
| `🕍` | The Temple Priest | `temple_priest.svg` |
| `⛵` | Simon Peter | `peter.svg` |
| `🛡️` | Claudius the Centurion | `centurion_longinus.svg` |
| `💂` | The Garrison Guard | `garrison_guard.svg` |
| `💰` | Corrupt Seller | `temple_merchant.svg` |
| `🤫` | The Market Informant | `market_informant.svg` |
| `🧺` | The Market Vendor | `market_vendor.svg` |
| `😨` | The Nervous Citizen | `city_gossip.svg` |
| `🌾` | The Galilean Pilgrim | `galilean_pilgrim.svg` |
| `🏙️` | The Jerusalem Local | `jerusalem_local.svg` |
| `💸` | The Temple Money Changer | `money_changer.svg` |
| `👑` | Annas the Patriarch | `annas.svg` |
| `⚖️` | Caiaphas the High Priest | `caiaphas.svg` |
| `📖` | Eleazar | `eleazar.svg` |
| `⚰️` | Joseph of Arimathea | `joseph_arimathea.svg` |
| `😠` | Sadducee Opposer | `sadducee_authority.svg` |
| `🪙` | Judas Iscariot | `judas.svg` |
| `🕵️` | The Temple Spy | `temple_spy.svg` |
| `✍️` | John the Beloved Disciple | `john_apostle.svg` |
| `🍲` | Martha of Bethany | `martha.svg` |
| `💎` | Mary of Bethany | `mary_bethany.svg` |
| `💧` | Mary Magdalene | `mary_magdalene.svg` |
| `⚔️` | Centurion Longinus | `centurion_longinus.svg` |
| `💭` | Claudia Procula (Pilate’s Wife) | `claudia_procula.svg` |
| `🤵` | Herod’s Servant (Chuza) | `herods_servant.svg` |
| `✒️` | Pilate’s Secretary | `pilate_secretary.svg` |
| `🏛️` | Pontius Pilate | `pontius_pilate.svg` |
| `🤥` | Ananias the False Witness | `ananias_witness.svg` |
| `🦊` | Nathanael the Pharisee | `nathanael_pharisee.svg` |
| `❓` | Nicodemus | `nicodemus.svg` |
| `📝` | Hillel the Scribe | `hillel_scribe.svg` |
| `👨‍🏫` | Samuel the Scribe | `samuel_scribe.svg` |
| `🤝` | Andrew the Disciple | `andrew_disciple.svg` |
| `📝` | John Mark | `john_mark.svg` |
| `🗣️` | Mount Teacher | `mount_teacher.svg` |
| `🇮🇱` | Nathanael | `nathanael_disciple.svg` |
| `⛓️` | Barabbas | `barabbas.svg` |
| `😒` | Jemimah the Skeptic | `jemimah.svg` |
| `👮` | Lucas the Sentry | `lucas_sentry.svg` |
| `🤑` | Malachi the Money Changer | `malachi_moneychanger.svg` |
| `👂` | Malchus | `malchus.svg` |
| `👁️` | Maluch the Temple Spy | `maluch.svg` |
| `💂` | Marcus the Garrison Guard | `garrison_guard.svg` |
| `👨‍🌾` | Nathan the Gardener | `nathan_gardener.svg` |
| `🧹` | Preparation Servant | `upper_room_prep.svg` |
| `👧` | Rhoda the Servant | `rhoda.svg` |
| `💪` | Simon of Cyrene | `simon_cyrene.svg` |
| `🙌` | Simon the Leper | `simon_leper.svg` |
| `💂` | The Execution Detail Soldier | `execution_soldier.svg` |
| `🐴` | Tobias the Donkey Owner | `tobias_owner.svg` |
| `🧑‍🤝‍🧑` | Bethesda Witness | `bethesda_witness.svg` |
| `🚶` | Local Traveler | `local_traveler.svg` |
| `💰` | Rich Young Ruler | `rich_young_ruler.svg` |
| `🤫` | Secret Visitor | `secret_visit.svg` |
| `😡` | The Upset Pilgrim Buyer | `upset_buyer.svg` |
| `🗣️` | Trial Rumors | `trial_rumors.svg` |
| `😠` | Upset Temple Buyer | `displaced_merchant.svg` |
| `🧥` | Woman Who Gave Her Cloak | `devout_follower.svg` |

<!-- AUTO-GENERATED: EMOJI-REFERENCE-APPENDIX END -->

---
[Back to Top](#table-of-contents)

## Appendix: Location Emoji & Icon Reference

This table maps each key location in the game to its representative emoji and the corresponding SVG icon file located in `/assets/locations/`.

| Emoji | Location Name | SVG Icon File |
|:---:|---|---|
| `🏡` | Bethany | `bethany.svg` |
| `🫒` | Mount of Olives | `mount_of_olives.svg` |
| `🕍` | Jerusalem Temple | `temple.svg` |
| `🏛️` | The Praetorium | `praetorium.svg` |
| `🏠` | Palace of Caiaphas | `caiaphas_palace.svg` |
| `🚪` | The Upper Room | `upper_room.svg` |
| `🌳` | Garden of Gethsemane | `gethsemane.svg` |
| `🪦` | Golgotha / Garden Tomb | `golgotha.svg` |
| `🌊` | Sea of Galilee | `sea_of_galilee.svg` |
| `🏙️` | Jerusalem | `jerusalem.svg` |
| `🛤️` | Road to Emmaus | `emmaus_road.svg` |
| `🏺` | Pool of Bethesda | `pool_of_bethesda.svg` |
| `🌾` | Field of Blood (Akeldama) | `akeldama.svg` |


---
[Back to Top](#table-of-contents)


## Appendix: Location Emoji & Icon Reference

This table maps each key location in the game to its representative emoji and the corresponding SVG icon file located in `/assets/locations/`.

| Emoji | Location Name | SVG Icon File |
|:---:|---|---|
| `🏡` | Bethany | `bethany.svg` |
| `🫒` | Mount of Olives | `mount_of_olives.svg` |
| `🕍` | Jerusalem Temple | `temple.svg` |
| `🏛️` | The Praetorium | `praetorium.svg` |
| `🏠` | Palace of Caiaphas | `caiaphas_palace.svg` |
| `🚪` | The Upper Room | `upper_room.svg` |
| `🌳` | Garden of Gethsemane | `gethsemane.svg` |
| `🪦` | Golgotha / Garden Tomb | `golgotha.svg` |
| `🌊` | Sea of Galilee | `sea_of_galilee.svg` |
| `🏙️` | Jerusalem | `jerusalem.svg` |
| `🛤️` | Road to Emmaus | `emmaus_road.svg` |
| `🏺` | Pool of Bethesda | `pool_of_bethesda.svg` |
| `🌾` | Field of Blood (Akeldama) | `akeldama.svg` |

---
[Back to Top](#table-of-contents)


## Appendix: Act & Case Emoji & Icon Reference

This table maps each case to its representative emoji and the corresponding SVG icon file located in `assets/gfx/`.

| Emoji | Case Title | Act | SVG Icon File |
|:---:|---|---|---|
| 🐴 | The Missing Donkey | Act I | `horse-duotone.svg` |
| 🪑 | The Overturned Tables | Act I | `coins-duotone.svg` |
| 🌳 | The Barren Fig Tree | Act I | `tree-duotone.svg` |
| 📖 | The Silenced Teacher | Act II | `book-open-duotone.svg` |
| 💰 | The Price of Life | Act II | `coins-duotone.svg` |
| ☀️ | The End of the Age | Act II | `sun-duotone.svg` |
| 🫙 | The Anointing at Bethany | Act II | `jar-duotone.svg` |
| 🍷 | The Broken Cup | Act III | `cup-duotone.svg` |
| 👂 | The Severed Ear | Act III | `ear-duotone.svg` |
| ⚖️ | The Midnight Tribunal | Act III | `balance-scale-duotone.svg` |
| 👑 | The People's Choice | Act III | `crown-duotone.svg` |
| ✝️ | The Final Sacrifice | Act III | `cross-duotone.svg` |
| ⚰️ | The Empty Tomb | Act IV | `package-duotone.svg` |
| 📜 | The Guard's Report | Act IV | `scroll-duotone.svg` |
| 🐟 | Peter's Restoration | Act IV | `fish-duotone.svg` |
