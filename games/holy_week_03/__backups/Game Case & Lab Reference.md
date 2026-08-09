# **Game Case & Lab Reference Update**

< [Back to Main Document](Miracle Maker.md)

## Table of Contents

- [System Mechanics & UI Specifications](#1-system-mechanics--ui-specifications)
- [Lab Action Table](#2-lab-action-table)
- [Difficulty Scaling Settings](#3-difficulty-scaling-settings)
- [State Variables & Code Data Blueprint](#4-state-variables--code-data-blueprint)
- [Holy Week Case File Database](#holy-week-case-file-database)

# **Lab Actions & Case Reference Manual — Master Specification**

This document serves as the master source-of-truth reference manual for all Lab Section mechanics, UI specifications, retry policies, and case evidence databases across the investigation system, featuring full coverage for **Act IV**.

## Typology vs. Predictive Prophecy

The Codex now distinguishes between:
1.  **Fulfilled Prophecy:** Direct predictive Old Testament statements fulfilled in the New Testament.
2.  **Typological Fulfilments (Types & Shadows):** Events where an earlier biblical pattern (e.g., Exodus 12) intentionally foreshadows Christ rather than predicting Him in a single prophetic text.

## **1\. System Mechanics & UI Specifications**

### **Retry Policy Matrix**

| Condition | Retry Allowed? | Items Consumed? | Notes |
| :---- | :---- | :---- | :---- |
| **Wrong answer submitted** | Yes | No | Increments lab try counter; triggers Helping Hand eligibility. |
| **Correct answer submitted** | No | Yes | Evidence marked used in shared pool (usedEvidence). |
| **Timeline submit (any)** | Yes | No | Per-slot visual feedback (green/red); retry immediately. |
| **Contradict submit (any)** | Yes | No | Evaluates false positives/negatives; retry immediately. |

### **Helping Hand Mechanic**

> * **Activation Trigger**: Unlocks only after at least one failed submission on a specific lab tab (helped\[tab\] \=== true).  
> * **Cost**: Consumes Evidence points based on difficulty (easy: 2, medium: 5, hard: 8).  
> * **Credit Penalty**: Resolving a lab after using Helping Hand grants **reduced credit** (halved points). Resets helped and helpActive upon lab completion.  
> * **Independence**: Hint and Helping Hand operate independently; both can be used on the same lab task.

### **Info Button ("i") & Solving-Clue System**

Every evidence item's **Info Button** opens a modal containing two distinct sections:

> 1. **Detail**: General narrative, flavor, and contextual historical text (consistent across all lab tabs).  
> 2. **\<Lab\> Clue**: Specific analytical guidance customized for the active lab tab (compare, link, timeline, contradict). Passed via openDetail(ev, tabName).

**Answer-Leak Prevention Rule**: The detail modal must **never** explicitly print an item's fake status (no "Status: FAKE/REAL" text). Contradict analysis must be derived strictly through the reasoning provided in clues.contradict.

### **Button-Group UI Pattern**

> * **Grid Cards** (2-column layout for Compare and Contradict banks):  
>   \<div class="ev-card \[selected|used\]"\>  
>     \<div class="ev-card-main"\>...icon \+ name (click to select)...\</div\>  
>     \<div class="info-btn" onclick="openDetail(ev, currentTab)"\>i\</div\>  
>   \</div\>

> * **List Chips / Slots** (Link bank and Timeline drop-zones):  
>   \<div class="slot \[selected-link|used\]"\>  
>     \<div class="slot-main"\>...icon \+ name (click or drag to place)...\</div\>  
>     \<div class="info-btn" onclick="openDetail(ev, currentTab)"\>i\</div\>  
>   \</div\>

## **2\. Lab Action Table**

# **Lab Actions & Clue Analysis Reference Guide**

This document serves as the master forensic reference for all investigative acts.

## **Lab Mechanics Overview**

> 1. **Category Assignment**: Items classified under event, people, or prophecy.  
> 2. **Timeline Ordering**: Items placed in chronological sequence.  
> 3. **Clue Generation**: Analytical vectors including Compare, Link, Timeline, and Contradict.

## **Act I: Early Ministry Events**

### **Case A: The Missing Donkey (triumphal\_entry)**

**Prophecies**: Zechariah 9:9, Psalm 118:25–26, Genesis 49:10–11.

| ID | Cat | Order | Primary Clue |
| :---- | :---- | :---- | :---- |
| cloaks | people | 1 | Connects disciples' cloaks to the colt. |
| donkey\_tracks | event | 1 | Confirms single animal presence. |

**Lab Outcomes**: cloaks \+ peter (Motive Clarified).

## **Act II: Authority & Teaching**

### **Case A: The Silenced Teacher (authority\_challenged)**

**Prophecies**: Psalm 118:22, Isaiah 5:1–7, Malachi 3:1.

| ID | Cat | Order | Primary Clue |
| :---- | :---- | :---- | :---- |
| question\_scroll | event | 1 | Official written challenge from priests. |
| cornerstone | prophecy | 3 | Inscribed stone fulfilling Psalm 118\. |

## **Act III: Passion & Arrest**

### **Case A: The Midnight Arrest (gethsemane\_arrest)**

**Prophecies**: Zechariah 11:12–13, Psalm 41:9, Isaiah 53:7.

| ID | Cat | Order | Primary Clue |
| :---- | :---- | :---- | :---- |
| thirty\_silver | event | 1 | Silver payment issued to Judas. |
| ear\_cloth | people | 3 | Bloodied wrap from healed servant. |

## **Act IV: Resurrection Victory**

### **Case A: The Empty Tomb (empty\_tomb)**

**Prophecies**: Psalm 16:10, Hosea 6:2, Isaiah 53:9.

| ID | Cat | Order | Primary Clue |
| :---- | :---- | :---- | :---- |
| grave\_clothes | event | 1 | Intact linens disprove body theft. |
| bribe\_pouch | people | 5 | Exposes cover-up conspiracy. |

**Lab Outcomes**: bribe\_pouch \+ roman\_guard (Exposed cover-up).

| Action | Task | Correct Solution | Success Feedback | Success Scoring | Failure Feedback | Failure Scoring | Helping Hand Assist |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Compare** | Select 2 evidence items that share a direct connection or prophecy fulfillment. | Valid matched pair (e.g., folded\_grave\_clothes \+ face\_cloth\_napkin) | Reasoning-based explanation with biblical cross-reference. | \+10 Deduction \+3 Evidence | Reasoning-based feedback stating why items do not correlate. | \+5 Doubt (× penalty multiplier) | Auto-selects one correct pairing partner into Slot A. |
| **Link** | Classify **every** active evidence card into one of 3 categories: People & Suspects, Prophecy & Scripture, Event Trail. | Correct group assignment for all cards via evidenceGroupMap. | Explains the role of each category within the case context. | \+10 Evidence \+10 Deduction | Highlights incorrect cards in red and correct cards in green. Cards are retained for retry. | \+5 Doubt (× penalty multiplier) | Auto-places one unassigned card into its correct group. |
| **Timeline** | Drag/place all **real** evidence cards into exact chronological order. | Sequential array matching realTimelineOrder. | Confirms the true historical sequence of events. | \+10 Deduction | Per-slot visual indicators (green \= correct position, red \= incorrect position). | \+5 Doubt (× penalty multiplier) | Auto-places one item into its correct timeline slot. |
| **Contradict** | Select all fabricated, misleading, or bribed evidence items. | All items where fake \=== true. | Names the identified fake items with specific reasons for their falsity. | \+15 Challenge (full) \+8 Challenge (partial) | Indicates if false positives were included or remaining fakes exist. | \+10 Doubt (× penalty multiplier) | Auto-selects one fake item. |

## **3\. Difficulty Scaling Settings**

| Setting Key | Easy | Medium | Hard |
| :---- | :---- | :---- | :---- |
| hintCost | 0 | 3 | 5 |
| helpCost | 2 | 5 | 8 |
| penaltyMul | 0.5x | 1.0x | 1.5x |
| timelineSlots | 3 | 5 | All real items |
| linkIncludeFakes | false | true | true |
| linkShowDesc | true | true | false |
| contradictFinds | 1 (any fake) | 2 (all fakes) | 2 (all fakes) |

## **4\. State Variables & Code Data Blueprint**

// State Schema  
let difficulty \= 'medium';  
let scores \= { deduction: 0, evidence: 25, challenge: 0, doubt: 0 };  
let currentTab \= 'compare';  
let compareSelected \= \[\];  
let linkGroupAssignments \= {};      // { evidenceId: groupId }  
let contradictSelected \= new Set();  
let timelineSlots \= \[\];             // Array of evidenceId | null  
let usedEvidence \= new Set();       // Retired items pool  
let tries \= { compare: 0, link: 0, timeline: 0, contradict: 0 };  
let helped \= { compare: false, link: false, timeline: false, contradict: false };  
let helpActive \= { compare: false, link: false, timeline: false, contradict: false };

// Standard Group Definitions for Link Lab  
const groupDefinitions \= \[  
  { id: 'people',   name: '👥 People & Suspects',   desc: 'Disciples, Roman guards, rulers, and key witnesses' },  
  { id: 'prophecy', name: '📜 Prophecy & Scripture', desc: 'Old Testament scrolls and fulfilled Messianic passages' },  
  { id: 'event',    name: '🐾 Event Trail',          desc: 'Physical artifacts, ground traces, and official records' }  
\];

# Holy Week Case File Database

## ACT I: The Arrival

### Case: `triumphal_entry` (The Missing Donkey)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Zechariah 9:9 | `zechariah_9_9` | Prophecy |
| Psalm 118:25–26 | `psalm_118_25_26` | Prophecy |
| Genesis 49:10–11 | `genesis_49_10_11` | Prophecy |
| Malachi 3:1 | `malachi_3_1` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Two Disciples' Cloaks (`cloaks`) | `genesis_49_10_11` | Mark 11:7; 2 Kings 9:13 | Mirrors 2 Kings 9:13 — royal gesture repeated on the road to Jerusalem. |
| Fresh Hoofprints (`donkey_tracks`) | - | Luke 19:35–36 | Route into Jerusalem through the eastern gate mirrors Ezekiel 44:1–3. |
| Villager's Testimony (`witness_account`) | - | Mark 11:3–6 | Echoes how the Passover lamb was 'set apart' by divine instruction (Exodus 12:3–6). |
| Zechariah 9:9 Scroll Fragment (`prophecy_scroll`) | `zechariah_9_9` | Matthew 21:4–5 | Written c. 520 BC; vision of a humble, donkey-riding king. |
| Fresh-Cut Palm Branch (`palm_branch`) | `psalm_118_25_26` | John 12:13 | Symbol of Jewish national liberation (1 Maccabees 13:51). |
| Cut Rope at Tethering Post (`rope_fibers`) | - | Mark 11:2 | Unridden colt reserved for sacred purposes (Numbers 19:2; Deuteronomy 21:3). |
| Pharisee's Written Complaint (`crowd_testimony`) | `malachi_3_1` | Luke 19:39–40 | Pharisees recognised the messianic implications of the crowd's praise. |

---

### Case: `temple_cleansing` (The Overturned Tables)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Malachi 3:1 | `malachi_3_1` | Prophecy |
| Isaiah 56:7 | `isaiah_56_7` | Prophecy |
| Psalm 69:9 | `psalm_69_9` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Scattered Tyrian Shekels (`scattered_shekels`) | `malachi_3_1` | Luke 19:45 | The scattered coins are the physical result of the prophesied 'refiner's fire' purifying the Temple. |
| Shattered Dove Cages (`shattered_cages`) | `isaiah_56_7` | Mark 11:15-17 | The broken cages symbolize the disruption of a system that had turned a 'house of prayer for all nations' into a marketplace. |
| Discarded Whip of Cords (`whip_of_cords`) | `psalm_69_9` | John 2:15-17 | The disciples remembered Psalm 69:9 ('Zeal for your house will consume me') when they saw Jesus act with such authority. |

---

### Case: `fig_tree_incident` (The Barren Fig Tree)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Micah 7:1 | `micah_7_1` | Prophecy |
| Jeremiah 8:13 | `jeremiah_8_13` | Prophecy |
| Psalm 33:8–9 | `psalm_33_8_9` | Prophecy |
| Zechariah 4:6–7 | `zechariah_4_6_7` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Description of the Fig Tree (Monday) (`cursed_fig_tree_desc`) | `micah_7_1` | Mark 11:12–14 | The tree's appearance—leaves but no fruit—symbolized Israel's outward show of religiosity without genuine spiritual fruit, echoing prophetic laments like Micah 7:1. |
| The Withered Fig Tree (Tuesday) (`withered_fig_tree_state`) | `jeremiah_8_13` | Mark 11:20–21 | The rapid, complete withering fulfilled prophecies of judgment on unfruitfulness, such as Jeremiah 8:13, where God threatens to remove fruit and wither leaves. |
| Peter's Astonished Reaction (`peter_astonishment`) | `psalm_33_8_9` | Mark 11:21 | Psalm 33:8-9 declares that all should stand in awe of Him because 'He spoke, and it came to be.' Peter's reaction is the physical fulfillment of this reverence when confronted with divine command. |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | `zechariah_4_6_7` | Mark 11:22–24 | Zechariah 4:7 speaks of a 'mighty mountain' becoming 'level ground' by the Spirit. Jesus adopts this imagery to show that faith connects the believer to that same mountain-moving power. |

---

## ACT II: The Teacher

### Case: `authority_challenged` (The Silenced Teacher)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Psalm 118:22–23 | `psalm_118_22_23` | Prophecy |
| Isaiah 5:1–7 | `isaiah_5_1_7` | Prophecy |
| Daniel 7:13–14 | `daniel_7_13_14` | Prophecy |
| Malachi 3:1 | `malachi_3_1` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Formal Authority Challenge (`question_scroll`) | `malachi_3_1` | Matthew 21:23 | Malachi 3:1 predicted the Lord coming to His temple with authority. The irony of the challenge is that they were asking for credentials from the very One whose authority derived directly from God. |
| Sketch of the Vineyard Parable (`parable_fragments`) | `isaiah_5_1_7` | Matthew 21:33–45 | Isaiah 5:1–7 is the Song of the Vineyard — God's lament over Israel's unfaithfulness. Jesus deliberately echoed it. The bystander sketching this recognised the connection immediately. |
| Rejected Cornerstone Fragment (`cornerstone_carving`) | `psalm_118_22_23` | Matthew 21:42 | Psalm 118:22–23 was a coronation Psalm, used at Temple dedications. Jesus quoted it at the very Temple whose builders were rejecting Him. The rejected stone lying in the construction debris became a powerful object lesson for anyone listening. |
| Denarius of Tiberius Caesar (`coin_of_caesar`) | - | Matthew 22:19–21 | The coin bore Caesar's image (imago). Jesus's answer pointed to something deeper: humanity bears God's image (Genesis 1:26–27, imago Dei). The coin question about taxation became a profound statement about identity and allegiance — Caesar's image on metal; God's image on people. |
| Withered Fig Leaf (`fig_leaf_withered`) | - | Mark 11:20–21 | Micah 7:1 and Jeremiah 8:13 both use a barren fig tree as a symbol for Israel's spiritual fruitlessness. Hosea 9:10 says 'Like grapes in the wilderness, I found Israel.' The withered tree was a living parable — the judgement Jesus described in His Temple parables had already begun in miniature on the roadside. |
| Two Leptons (Widow's Mites) (`widow_two_coins`) | - | Mark 12:41–44 | 1 Samuel 16:7 — 'Man looks at the outward appearance, but the LORD looks at the heart.' The widow's offering is the practical demonstration of everything Jesus had been teaching against the religious leaders' showy piety. She gave all she had (100%); the wealthy gave from their surplus. |
| Temple Bystander's Written Account (`witness_scroll`) | `daniel_7_13_14` | Matthew 22:46 | Isaiah 11:2 promised the Messiah would have the 'Spirit of wisdom and understanding, the Spirit of counsel and might' — He would answer every challenge with perfect insight. The progressive silencing of each religious faction across one morning is the fulfilment of this promise made 700 years earlier. Daniel 7:13–14 foretold 'one like a son of man' coming with the clouds of heaven to receive an everlasting dominion — the title 'Son of Man' Jesus used for Himself throughout these exchanges. |

---

### Case: `lazarus_plot` (The Price of Life)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Isaiah 25:8 | `isaiah_25_8` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Bethany Pilgrim Manifest (`crowd_report`) | - | John 12:9 | John 12:9 notes that a large crowd found out Jesus was there and came not only because of Him, but also to see Lazarus, whom He had raised. |
| Bethany Limestone Dust (`grave_dirt`) | `isaiah_25_8` | John 11:39 | John 11:39 records Martha's objection that after four days there would already be a bad odor — the natural expectation of decay this deep into a Judean burial, against which the raising of Lazarus stands out as a reversal. |
| Intercepted Sadducean Memorandum (`secret_decree`) | - | John 12:10–11 | John 12:10–11 explicitly validates this conspiracy: 'So the chief priests made plans to put Lazarus to death as well.' |

---

### Case: `passover_lamb_chain` (The Passover Lamb)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Exodus 12:1–14 | `typology_passover_lamb` | Typological Fulfilment |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Flask of Pure Nard (`nard_flask`) | `typology_passover_lamb` | John 12:1–3 | The anointing of Jesus's feet with expensive perfume was an act of profound worship. In the Old Testament, anointing with oil consecrated kings (1 Samuel 16:13) and priests (Exodus 30:30) for service. This act sets Jesus apart as the Messiah (the "Anointed One") and, as Jesus Himself stated, prepares His body "beforehand for burial" (Mark 14:8). |
| Broken Alabaster Jar (`alabaster_jar`) | `typology_passover_lamb` | Matthew 26:6–7 | The anointing of Jesus's head directly mirrors the way kings like Saul and David were anointed, signifying His royal authority. It also serves as a prophetic act of consecration, setting Him apart as the ultimate High Priest and King who would offer Himself as the final sacrifice. |
| Hyssop Branch (`hyssop_branch`) | `typology_passover_lamb` | John 19:29; Exodus 12:22 | Used to offer wine on the cross — direct echo of hyssop applying the lamb's blood to the doorframe so death passes over. |
| Temple Inspection Notes (`inspection_notes`) | `typology_passover_lamb` | Mark 11:27–33; Exodus 12:5 | Public questioning in the Temple where Jesus is examined and declared without fault ("I find no basis for a charge"). |
| Passover Lamb Market Records (`lamb_records`) | - | Exodus 12:3–6 | Historical records detailing the selection and inspection dates for festival lambs in Jerusalem. |

---

### Case: `olivet_discourse` (The End of the Age)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Daniel 9:27 | `daniel_9_27` | Prophecy |
| Joel 2:30–31 | `joel_2_30_31` | Prophecy |
| Isaiah 13:10 | `isaiah_13_10` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| View of the Temple from Olivet (`temple_overlook_view`) | - | Matthew 24:1–2 | The physical setting directly inspired the disciples' questions about the Temple's fate, linking Jesus's words to the tangible structure before them. |
| Disciples' Questions (Written Notes) (`disciples_questions_notes`) | `daniel_9_27` | Matthew 24:3 | These questions frame the entire discourse, revealing the disciples' immediate concerns about timing and signs, which Jesus then addresses with detailed prophecies. |
| Parable of the Ten Virgins (Notes) (`parable_of_virgins_notes`) | - | Matthew 25:1–13 | This parable underscores the theme of watchfulness, a recurring motif in eschatological prophecies, urging believers to be ready for the unexpected timing of the Lord's return. |
| Old Testament Cosmic Sign References (`cosmic_signs_references`) | `joel_2_30_31` | Matthew 24:29 | Jesus's use of these ancient prophecies demonstrates the continuity of God's plan and the fulfillment of long-foretold cosmic disturbances as signs of the end. |
| Darkened Sun Record (`darkened_sun_record`) | `isaiah_13_10` | Matthew 24:29 | Isaiah 13:10 foretells the darkening of the heavenly lights. Jesus quotes this same imagery when describing the signs preceding His return. |

---

## ACT III: The Pressure Builds

### Case: `last_supper` (The Broken Cup)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Exodus 12:1–14 | `exodus_12_1_14` | Prophecy |
| Jeremiah 31:31–34 | `jeremiah_31_31_34` | Prophecy |
| Psalm 41:9 | `psalm_41_9` | Prophecy |
| Zechariah 11:12–13 | `zechariah_11_12_13` | Prophecy |
| Isaiah 53:12 | `isaiah_53_12` | Prophecy |
| Exodus 24:8 | `exodus_24_8` | Prophecy |
| Genesis 14:18-20 | `typology_melchizedek` | Typological Fulfilment |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Unleavened Bread Crumbs (`bread_crumbs`) | `exodus_12_1_14` | Matthew 26:26 | The breaking of the matzah is called the 'afikomen' in the Passover Seder — traditionally hidden and later 'found' again. Early Christians saw this as a picture of Jesus's death and resurrection: broken, buried, and found alive. |
| Spilled Wine on the Linen (`wine_stain`) | `jeremiah_31_31_34` | Luke 22:20 | The Passover Seder uses four cups of wine (Exodus 6:6–7). The third cup — the Cup of Redemption — is the one Jesus transformed into the cup of the New Covenant. The spilled wine at this cup's position is theologically charged: 'blood poured out' was exactly the language He used. |
| Shattered Clay Cup (`cup_fragments`) | - | Matthew 26:27 | Breaking pottery in the Jewish tradition was sometimes associated with mourning or the breaking of a covenant (see Jeremiah 19:10–11, where Jeremiah shattered a clay jar as a prophetic act of judgement). A broken cup at the Passover table carries heavy symbolic weight. |
| Large Stone Water Jug (`water_jug`) | - | John 13:4–5 | Isaiah 52:13–15 describes the Servant who 'shall startle many nations' — and immediately before this, is described as one who acts in a way that astonishes because of His humility. Jesus washing feet with this water fulfilled the spirit of what Isaiah described: the exalted One taking the lowest role. |
| Imprint of a Money Bag (`money_bag_impression`) | `zechariah_11_12_13` | John 13:29 | Judas carried the communal purse — and had recently agreed to betray Jesus for 30 silver coins (Matthew 26:14–16), fulfilling Zechariah 11:12. The presence of a money bag impression at the preparation table raises serious questions: what was Judas counting before the meal? |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | `psalm_41_9` | John 13:26–30 | The giving of the dipped sop to Judas is the fulfilment of Psalm 41:9 ('even my close friend... who ate my bread has lifted his heel against me'). Jesus quoted this Psalm earlier that evening (John 13:18), identifying the traitor through an act of table fellowship. |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | `jeremiah_31_31_34` | Luke 22:19–20; 1 Corinthians 11:24–25 | Jeremiah 31:31–34 promised a 'new covenant' that would supersede the Mosaic Law — written on hearts, not stone. Jesus announced its establishment at this very table. The young scribe recording His words was preserving the fulfilment of a 600-year-old prophecy. |
| List of the Twelve (`twelve_roll`) | `isaiah_53_12` | Luke 22:37 | Jesus explicitly applies Isaiah 53:12 to Himself during the Last Supper, explaining that His association with the twelve, including a traitor, fulfills the prophecy of being counted among criminals. |
| Covenant Seal Mark (`covenant_seal`) | `exodus_24_8` | Exodus 24:8; Luke 22:20 | Exodus 24:8 — 'This is the blood of the covenant that the LORD has made with you.' Jesus's declaration over the cup directly echoes Moses's covenant ratification at Sinai, establishing the New Covenant with His own blood. |
| Spilled Wine on the Linen (`wine_stain`) | `typology_melchizedek` | Genesis 14:18 | Melchizedek, the mysterious priest-king of Salem (Jerusalem), blessed Abraham with bread and wine. This act is seen as a "type" or foreshadowing of Christ. The book of Hebrews explains that Jesus is a high priest "forever in the order of Melchizedek" (quoting Psalm 110), an eternal priesthood outside the Levitical line. Just as Melchizedek offered bread and wine, Jesus institutes the New Covenant with the same elements at the Last Supper. |

---

### Case: `gethsemane_arrest` (The Severed Ear)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Isaiah 53:7 | `isaiah_53_7` | Prophecy |
| Zechariah 13:7 | `zechariah_13_7` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Abandoned Linen Wrapper (`abandoned_linen`) | `zechariah_13_7` | Mark 14:51-52 | Zechariah 13:7 — 'Strike the shepherd, and the sheep will be scattered' — was quoted by Jesus himself just hours earlier (Matthew 26:31) as a prediction of this exact moment. The unnamed young man fleeing naked into the night, abandoning even his clothing, is the most vivid single image of the disciples' scattering the prophecy foretold. |
| Extinguished Roman Torch (`dropped_torch`) | - | John 18:3 | John 18:3 notes they arrived with torches and lanterns, expecting a deep-woods manhunt. |
| Bloodied Scarf Fragment (`severed_ear_wrap`) | - | John 18:10 | Luke 22:50–51 and John 18:10 document Peter cutting off Malchus's ear, which Jesus immediately healed. |
| Unresisting Prisoner's Cord (`prisoner_cord`) | `isaiah_53_7` | Matthew 26:52–54 | Jesus refuses armed resistance and willingly submits to arrest, embodying the silent Lamb led to slaughter as prophesied in Isaiah 53:7: "He was oppressed and afflicted, yet he did not open his mouth." |

---

### Case: `sanhedrin_trial` (The Midnight Tribunal)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Isaiah 50:6 | `isaiah_50_6` | Prophecy |
| Isaiah 53:7 | `isaiah_53_7` | Prophecy |
| Micah 5:1 | `micah_5_1` | Prophecy |
| Psalm 27:12 | `psalm_27_12` | Prophecy |
| Psalm 35:11 | `psalm_35_11` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Rooster Feather (`rooster_feather`) | - | Matthew 26:74-75 | The third denial led to the third crowing, fulfilling Jesus's own prediction of Peter's failure (Matthew 26:34). This is supporting/narrative evidence, not directly Codex-linkable to one of this case's four defined prophecies. |
| Priestly Robe Fragment (`torn_robe`) | - | Matthew 26:65 | Caiaphas tore his robes to signal the charge of blasphemy when Jesus affirmed His identity. This action forms part of the trial narrative but is not itself a direct fulfilment of one of this case's defined prophecies. |
| Conflicting Depositions (`false_scroll`) | `psalm_27_12` | Mark 14:56-59 | The lack of consistent testimony exposes the trial as a fabrication, fulfilling Psalm 27:12: "For false witnesses rise up against me, breathing out violence." |
| Mocking Guards' Reed and Spittle (`mocking_guards`) | `isaiah_50_6` | Matthew 26:67–68 | Isaiah 50:6 declares, 'I gave my back to those who beat me, my cheeks to those who pulled out my beard; I did not hide my face from mocking and spitting.' The abuse inflicted by the Temple guards immediately after the trial is a direct fulfilment of the Suffering Servant prophecy. |
| Guard's Reed (`guard_reed`) | `micah_5_1` | Matthew 26:67–68 | The guards struck Israel's ruler on the cheek with a reed, exactly as Micah 5:1 foretold. |
| Charcoal Briquette (`charcoal_remains`) | - | John 18:18 | Peter's denial by the fire fulfilled Jesus's prediction that he would deny three times. |
| Perjured Witness Statement (`perjured_testimony`) | `psalm_35_11` | Mark 14:57–59 | 'Ruthless witnesses come forward; they question me on things I know nothing about' precisely matches the false testimony at the trial. |
| Silent Witness Account (`silent_account`) | `isaiah_53_7` | Matthew 26:57–68; Mark 14:56–65 | Jesus remained silent before His accusers — the silent Lamb led to slaughter, fulfilling Isaiah 53:7: "He was oppressed and afflicted, yet he did not open his mouth." |

---

### Case: `barabbas_choice` (The People's Choice)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Isaiah 53:3 | `isaiah_53_3` | Prophecy |
| Psalm 2:1-2 | `psalm_2_1_2` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Governor's Silver Basin (`pilates_basin`) | - | Matthew 27:24 | 'I am innocent of this man's blood; see to it yourselves.' |
| Claudia's Warning Scroll (`wifes_letter`) | - | Matthew 27:19 | - |
| The Insurgent's Dossier (`barabbas_warrant`) | `isaiah_53_3` | Mark 15:7; John 18:40 | The crowd's rejection of Jesus in favor of a murderer fulfills Isaiah 53:3: "He was despised and rejected by mankind." |
| Joint Verdict Scroll (`joint_verdict`) | `psalm_2_1_2` | Luke 23:12 | Herod and Pilate, once enemies, became allies on that day in their joint condemnation of Jesus, fulfilling Psalm 2: "The kings of the earth set themselves, and the rulers take counsel together, against the LORD and against his Anointed." |

---

### Case: `crucifixion_site` (The Final Sacrifice)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Psalm 22:1 | `psalm_22_1` | Prophecy |
| Psalm 22:7–8 | `psalm_22_7_8` | Prophecy |
| Psalm 22:16 | `psalm_22_16` | Prophecy |
| Psalm 22:18 | `psalm_22_18` | Prophecy |
| Psalm 22:1–31 | `psalm_22_1_31` | Prophecy |
| Exodus 12:46 | `exodus_12_46` | Prophecy |
| Numbers 19 (Red Heifer) | `typology_red_heifer` | Typological Fulfilment |
| Genesis 22 (Isaac Carrying the Wood) | `typology_isaac_wood` | Typological Fulfilment ||

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Soldiers' Casting Dice (`split_dice`) | `psalm_22_18` | John 19:23–24 | Directly fulfils Psalm 22:18. While the victim hung dying, the execution detail cast lots for a high-quality, seamless tunic woven from top to bottom. |
| Crucifixion Nails (`crucifixion_nails`) | `psalm_22_16` | Luke 24:39–40; John 20:27 | Psalm 22:16 prophesied the piercing of hands and feet — the nail wounds that would mark the risen Christ's identification. |
| Mocking Crown of Thorns (`mockery_crown`) | `psalm_22_7_8` | Matthew 27:29–31; Mark 15:16–20 | Psalm 22:7–8 — "All who see me mock at me; they wag their heads." The soldiers mocked, struck, and spat upon Him, fulfilling the psalmist's description of the suffering servant. |
| Cry of Abandonment (`last_cry_abandonment`) | `psalm_22_1` | Matthew 27:46; Mark 15:34 | Psalm 22:1 — "My God, my God, why have you forsaken me?" The opening verse of the crucifixion psalm, quoted by Jesus in His darkest hour, initiates the entire chain of fulfillment. |
| Blood-Stained Roman Hasta (`pierced_spear`) | `zechariah_12_10` | John 19:34 | Fulfils Zechariah 12:10 ('the one they have pierced'). The spear thrust proved the victim was already dead, making the leg-breaking unnecessary. |
| Shattered Limestone Fragment (`shattered_limestone`) | `typology_red_heifer` | Matthew 27:51 | The Red Heifer was sacrificed and its blood carried outside the camp. Jesus, the perfect sacrifice, suffered outside the city gates — the earthquake and rocksplit testify to the cosmic significance. |
| Thick Blue and Scarlet Threads (`torn_veil_thread`) | `amos_8_9` | Luke 23:45 | The Parokhet curtain blocked access to the Holy of Holies. Its top-to-bottom tear structurally verified that the old covenant system had split wide open, granting direct access to the presence of God. |
| Joseph's Market Bill for Fine Linen (`linen_shroud_receipt`) | `isaiah_53_9` | Mark 15:46 | Fulfils Isaiah 53:9. Instead of being cast into the criminal dirt pits of Hinnom, Jesus was instantly reassigned to a wealthy man's private, rock-hewn garden tomb. |
| Unbroken Tibiae Report (`unbroken_legs`) | `exodus_12_46` | John 19:31–36 | Jesus' legs were not broken, fulfilling the Passover Lamb imagery (Exodus 12:46) and Psalm 34:20: "He protects all his bones, not one of them will be broken." |
| Final Words Scroll (`final_words`) | `psalm_31_5` | Luke 23:46 | Jesus's final words from the cross are a direct quote from Psalm 31:5, a prayer of ultimate trust in God at the moment of death. |
| Sponge Soaked in Sour Wine (`sour_wine_sponge`) | `psalm_69_21` | John 19:28-29 | This act directly fulfills Psalm 69:21 ("...for my thirst they gave me sour wine to drink"). The deliberate mention of a hyssop branch also powerfully evokes the Passover (Exodus 12:22), where hyssop was used to apply the lamb's blood for salvation, identifying Jesus as the true Passover Lamb. |
| Simon of Cyrene's Burden (`simon_cyrene_burden`) | `typology_isaac_wood` | Genesis 22:6; Luke 23:26 | Isaac carried the wood on which he would be sacrificed. Jesus carries the cross — the instrument of His own sacrifice. Both willingly bore their burden. |

---

## ACT IV: The New Beginning

### Case: `resurrection` (The Empty Tomb)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Psalm 16:10 | `psalm_16_10` | Prophecy |
| Hosea 6:2 | `hosea_6_2` | Prophecy |
| Jonah 1:17 / Matthew 12:40 | `jonah_1_17___matthew_12_40` | Prophecy |
| Isaiah 53:10–11 | `isaiah_53_10_11` | Prophecy |
| Psalm 22:1–31 | `psalm_22_1_31` | Prophecy |
| Isaiah 26:19 | `isaiah_26_19` | Prophecy |
| Leviticus 23:9–14 | `leviticus_23_firstfruits` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Displaced Sealing Stone (`rolled_stone`) | `isaiah_26_19` | Matthew 28:2 | Isaiah 26:19 — 'Your dead will live, LORD; their bodies will rise — let those who dwell in the dust wake up and shout for joy.' The removal of the stone was not to let Jesus out — a resurrected, glorified body passed through locked doors (John 20:19). The stone was rolled away so witnesses could look in. |
| The Empty Burial Chamber (`empty_tomb`) | `psalm_16_10` | Luke 24:3 | Psalm 16:10 — 'You will not let your holy one see corruption.' The empty tomb is the physical evidence that the Psalm's promise was kept. A body left long enough shows decomposition; no such evidence exists. |
| Folded Burial Linens (`burial_linen`) | - | John 20:6–8 | John's Gospel records that the 'other disciple' (John) 'saw and believed' specifically because of how the linens were arranged. A body stolen hastily would leave disordered linens or none at all. The orderly, structured arrangement of the grave cloths pointed to something other than grave robbery. |
| The Angelic Proclamation (`angelic_witness`) | - | Matthew 28:2–7; Mark 16:5–7; Luke 24:4–7; John 20:12–13 | Psalm 103:20 describes angels as those who 'do his bidding.' The angelic announcement at the tomb echoes the angelic announcements at the nativity — both bookend Jesus's earthly life with heavenly proclamation. The consistency of the message across all four Gospel accounts, with slight variations in detail (one angel or two?), reflects the characteristics of independent eyewitness testimony. |
| The Soldiers' Broken Report (`guard_report`) | `hosea_6_2` | Matthew 28:2–4; Matthew 28:11–15 | The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event. |
| Unused Burial Spices (`spice_jars`) | - | Mark 16:1 | Nicodemus had already brought 75 pounds of myrrh and aloes for the burial (John 19:39–40), fulfilling the wealthy burial of Isaiah 53:9. The women's additional spices were for the anointing ritual completed after the Sabbath — but there was no body to anoint. The unused jars are a symbol of an interrupted mourning, halted by resurrection. |
| Mary Magdalene's Testimony (`mary_encounter`) | `isaiah_53_10_11` | John 20:11–18; Isaiah 43:1 | Isaiah 53:10–11 promised the Suffering Servant would 'see his offspring and prolong his days' after being crushed — a resurrection paradox. The risen Christ's first act was to call Mary by name (echoing Isaiah 43:1), sending her as the primary witness. In a Roman court a woman's testimony was inadmissible; making a former demoniac the lead witness is exactly the kind of counter-cultural detail that confirms authenticity rather than fabrication. |
| Resurrection Psalm Scroll (`psalm22_scroll`) | `psalm_22_1_31` | Luke 24:26–27 | The Psalm that begins with suffering ends in worldwide proclamation and vindication, pointing beyond the cross to resurrection. |
| Sign of Jonah (`sign_of_jonah`) | `jonah_1_17___matthew_12_40` | Matthew 12:40 | Jesus named His own third-day resurrection the 'sign of Jonah,' the three days in the tomb mirroring Jonah's three days in the great fish. |
| Firstfruits Offering (`firstfruits_offering`) | `leviticus_23_firstfruits` | Leviticus 23:9–14; 1 Corinthians 15:20 | The Feast of Firstfruits required bringing the first sheaf of the barley harvest on the day after the Sabbath. Christ's resurrection is the ultimate firstfruits — the guarantee that all who belong to Him will be raised. |

---

### Case: `roman_inquiry` (The Guard's Report)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Psalm 2:1–2 | `psalm_2_1_2` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| High-Grade Sanctuary Coins (`bribe_shekels`) | `psalm_2_1_2` | Matthew 28:12 | The bribe money is itself the physical evidence of Psalm 2:1–2's 'rulers take counsel together against the LORD and against his anointed' — Israel's own religious leaders conspiring to suppress the resurrection they could not disprove. |
| Snapped Clay Roman Seal (`broken_imperial_seal`) | `psalm_2_1_2` | Matthew 27:66 | The broken imperial seal is physical proof that Rome's own security measures — meant to make any resurrection claim impossible to fake — were the very thing overcome, undercutting the guards' cover story. |
| Shattered Pilum Shaft (`shattered_spear`) | `psalm_2_1_2` | Matthew 28:2 | A soldier's dropped and shattered weapon speaks to the guards' terror described in Matthew 28:4 ('the guards were so afraid... that they shook and became like dead men') — the earthly power structure the conspirators relied on was overwhelmed in an instant. |
| Official Sanhedrin Report (`sanhedrin_report`) | `psalm_2_1_2` | Matthew 28:11 | This report is the paper trail of the conspiracy itself — the Sanhedrin's own internal record of receiving the guards' account and choosing to suppress rather than investigate it, matching the pattern of rulers plotting against God's anointed described in Psalm 2:1–2. |

---

### Case: `peter_restoration` (Peter's Restoration)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Zechariah 13:7 | `zechariah_13_7` | Prophecy |
| Ezekiel 34:11-16 | `ezekiel_34_11-16` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Charcoal Fire (`charcoal_fire`) | `zechariah_13_7` | John 21:9 | The fire triggers Peter's memory of his denial, but now transforms that shame into restoration around the risen Christ. The scattered sheep (Zechariah 13:7) is now being gathered by the Shepherd. |
| The Miraculous Catch (`miraculous_catch`) | `ezekiel_34_11-16` | John 21:10–11 | This echoes the original calling of the disciples (Luke 5:1-11) and demonstrates that obedience to Christ yields supernatural results. It's a living parable of Ezekiel 34, where God promises to search for His sheep and bring them out from the nations. |
| Bread and Fish Breakfast (`bread_breakfast`) | - | John 21:9 | The 'bread of life' (John 6) now eats bread with Peter — the broken bread that once condemned him now nourishes him. |
| The Threefold Commission (`threefold_commission`) | `ezekiel_34_11-16` | John 21:15-17 | Peter's three denials are met with three commissions to shepherd God's flock, directly fulfilling the role of the good shepherd described in Ezekiel 34. |
| Risen Appearance (`galilean_apparition`) | - | John 21:12 | Despite seeing Him die, the disciples knew — supernaturally — who stood before them. Faith recognized its Author. |

---

## Hidden Detective Chains

| Chain Name | Codex Reward | Cases Spanned | Evidence Required | Points | Faith |
|---|---|---|---|---|---|
| The Psalm 22 Chain | *The Perfect Sacrifice* | `gethsemane_arrest` → `sanhedrin_trial` → `crucifixion_site` | `last_cry_abandonment` + `mockery_crown` + `crucifixion_nails` + `split_dice` | +25 | +10 |
| The True Passover Lamb | *The True Passover Lamb* | `last_supper` → `crucifixion_site` | `sour_wine_sponge` → `typology_passover_lamb` + `unbroken_legs` → `exodus_12_46` + `bread_crumbs` → `exodus_12_1_14` | +25 | +10 |
| The Greater Atonement | *The Greater Atonement* | `sanhedrin_trial` → `barabbas_choice` → `crucifixion_site` | `silent_account` + `barabbas_warrant` + `crucifixion_nails` + `mockery_crown` | +25 | +10 |
| The New Covenant | *The New Covenant* | `last_supper` only | `bread_crumbs` → `exodus_12_1_14` + `wine_stain` → `jeremiah_31_31_34` + `covenant_seal` → `exodus_24_8` + `new_covenant_declaration` → `jeremiah_31_31_34` | +25 | +10 |
| Death Defeated | *The Firstfruits of Resurrection* | `crucifixion_site` → `resurrection` → `roman_inquiry` | `sign_of_jonah` + `firstfruits_offering` + `empty_tomb` + `mary_encounter` | +25 | +10 |

### Cross-Case Chain Notes

- **Psalm 22 Chain:** The `Crucifixion Nails` evidence is unlocked during `crucifixion_site` but its prophecy mapping (`psalm_22_16`) must be linked with the `Mocking Crown of Thorns` (`psalm_22_7_8`), `Cry of Abandonment` (`psalm_22_1`), and `Soldiers' Casting Dice` (`psalm_22_18`) across three cases to complete the chain.

- **True Passover Lamb:** The `Unbroken Tibiae Report` (`unbroken_legs`) evidence, mapped to `exodus_12_46`, must be linked with the `Sponge Soaked in Sour Wine` (`sour_wine_sponge`) and the Last Supper's `Unleavened Bread Crumbs` (`bread_crumbs`) → `exodus_12_1_14` to form the complete typological arc.

- **Greater Atonement:** The `Silent Witness Account` (`silent_account`) evidence in `sanhedrin_trial` represents the high priest's role; the `Joint Verdict Scroll` (`joint_verdict`) in `barabbas_choice` represents the scapegoat; the piercing evidence in `crucifixion_site` represents the blood atonement.

- **New Covenant:** All four Last Supper evidence items must be linked to complete the chain: bread (Melchizedek), wine (Jeremiah), covenant seal (Exodus 24:8), and declaration (Jeremiah 31:31–34).

- **Death Defeated:** The `Firstfruits Offering` (`firstfruits_offering`) evidence, mapped to `leviticus_23_firstfruits`, must be linked with the `Sign of Jonah` (`sign_of_jonah`), `Empty Burial Chamber` (`empty_tomb`), and `Mary Magdalene's Testimony` (`mary_encounter`) across resurrection-related cases.
