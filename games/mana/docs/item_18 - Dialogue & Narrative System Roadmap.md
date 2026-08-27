# Dialogue & Narrative System Roadmap

## Manna Collector – Wilderness Stories Expansion

---

# Goal

Transform Manna Collector from a survival-and-trading game into a living wilderness journey filled with stories, encounters, choices, and unexpected events.

The narrative system should:

* Create variety between days
* Increase replayability
* Deepen immersion
* Reinforce the biblical wilderness theme
* Avoid hardcoded content
* Allow rapid expansion through data files

The system should feel like the player is experiencing an unfolding wilderness chronicle rather than repeating the same day forever.

---

# Current Status

## Existing Gameplay Loop

Current loop:

```text
Start Day
    ↓
Gather Manna
    ↓
Visit Locations
    ↓
Market
    ↓
Day Ends
```

### Opportunity

Inject narrative moments into the loop:

```text
Start Day
    ↓
Narrative Event
    ↓
Gather Manna
    ↓
Encounter
    ↓
Market
    ↓
Camp Story
    ↓
Day Ends
```

---

# Phase 1 – Narrative Event Framework

## Objective

Create a lightweight event system.

### Recommended Approaches

#### Option A – JSON Event Engine

Best for:

```text
Simple implementation
Easy expansion
Designer-friendly content
```

Example:

```json
{
  "id": "traveler",
  "title": "A Weary Traveler",
  "text": "A stranger approaches your camp seeking food.",
  "choices": [
    {
      "text": "Share your manna",
      "reward": {
        "health": 5
      }
    },
    {
      "text": "Refuse",
      "reward": {
        "wealth": 10
      }
    }
  ]
}
```

### Advantages

* Easy to author
* Fast to expand
* No scripting required

---

#### Option B – Ink Integration

Ideal for:

```text
Branching stories
Character conversations
Long-term consequences
```

Examples:

* Camp companions
* Multi-day story arcs
* Moral decisions

### Recommendation

Start with JSON events.

Add Ink later if narrative complexity grows.

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 2 – Daily Wilderness Events

## Objective

Ensure every day feels different.

### Event Frequency

Recommended:

```text
25–40% chance per day
```

### Categories

#### Blessings

Positive outcomes.

Examples:

```text
Unexpected manna abundance
Helpful traveler
Cool weather
Found silver
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

#### Hardships

Negative outcomes.

Examples:

```text
Sandstorm
Drought
Lost supplies
Heat exhaustion
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

#### Neutral Encounters

Flavor-focused events.

Examples:

```text
Camp gossip
Passing pilgrims
Ancient ruins
Strange footprints
```

### Priority

⭐⭐⭐⭐ High

---

# Phase 3 – Choice-Based Events

## Objective

Give players meaningful decisions.

### Example

## The Thirsty Family

```text
You meet a family struggling to survive.
```

### Choices

#### Share Mana

Reward:

```text
+Health
```

---

#### Give Silver

Reward:

```text
Future blessing chance
```

---

#### Walk Away

Reward:

```text
Keep resources
```

Possible consequence:

```text
Lose future reputation
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 4 – Camp Conversations

## Objective

Create atmosphere between days.

### Timing

After market close.

### Examples

#### Elder's Wisdom

```text
"Gather enough for today, but trust tomorrow."
```

#### Merchant Rumors

```text
"The market may be strong tomorrow."
```

#### Traveler Tales

```text
"They say water lies beyond Split Rock."
```

### Benefits

* Worldbuilding
* Foreshadowing
* Storytelling without cutscenes

### Priority

⭐⭐⭐⭐ High

---

# Phase 5 – Landmark Narratives

## Objective

Give locations identity.

### Camp

Stories:

```text
Community
Rest
Reflection
```

---

### Oasis

Stories:

```text
Recovery
Travelers
Blessings
```

---

### Split Rock

Stories:

```text
Miracles
History
Mystery
```

---

### Temple

Stories:

```text
Prayer
Offerings
Wisdom
```

---

### Wilderness

Stories:

```text
Danger
Exploration
Discovery
```

### Priority

⭐⭐⭐⭐ High

---

# Phase 6 – Dynamic World Events

## Objective

Create larger-scale events affecting multiple days.

### Drought

Effects:

```text
Less manna
Higher prices
More hardships
```

Duration:

```text
3–5 days
```

### Priority

⭐⭐⭐⭐ High

---

### Festival

Effects:

```text
Higher demand
Higher prices
More traders
```

### Priority

⭐⭐⭐⭐ High

---

### Pilgrim Caravan

Effects:

```text
Special encounters
Unique rewards
```

### Priority

⭐⭐⭐ Medium

---

# Phase 7 – Narrative Consequences

## Objective

Allow choices to matter.

### Reputation System

Track:

```text
Generosity
Greed
Faithfulness
Wisdom
```

### Example

Helping travelers repeatedly unlocks:

```text
Blessing Events
Rare Encounters
Special Rewards
```

Ignoring people may unlock:

```text
Merchant Advantages
Higher Wealth
Different Story Paths
```

### Priority

⭐⭐⭐⭐ Medium

---

# Phase 8 – Story Arcs

## Objective

Create longer narratives spanning many days.

### Example Arc

## The Lost Pilgrim

Day 3:

```text
Meet a lost traveler.
```

Day 6:

```text
Hear rumors about them.
```

Day 10:

```text
Find them again.
```

Day 15:

```text
Resolve the storyline.
```

### Rewards

* Silver
* Health
* Achievements
* Unique endings

### Priority

⭐⭐⭐ Medium

---

# Phase 9 – Rare Legendary Events

## Objective

Create memorable moments.

### Example

## Manna From Heaven

Chance:

```text
Extremely Rare
```

Effect:

```text
Maximum manna spawn
Perfect health
Bonus score
```

---

## Hidden Oasis

Effect:

```text
Large wealth reward
```

---

## Desert Prophet

Effect:

```text
Unique dialogue
Rare blessing
```

### Priority

⭐⭐⭐ Medium

---

# Phase 10 – Narrative UI

## Objective

Present events elegantly.

### Event Modal

```text
─────────────────────────

The Thirsty Family

A family approaches your camp
asking for help.

[Share Mana]
[Give Silver]
[Walk Away]

─────────────────────────
```

### Features

* Illustrated icons
* Typewriter effect
* Choice buttons
* Event history

### Priority

⭐⭐⭐⭐ High

---

# Content Organization

## JSON Structure

```text
events/
├── blessings.json
├── hardships.json
├── encounters.json
├── camp_dialogue.json
├── landmarks.json
├── story_arcs.json
└── legendary_events.json
```

### Benefits

* No code changes required
* Easy expansion
* Community mod support

---

# Event Selection System

## Daily Flow

```text
New Day
    ↓
Roll Event Chance
    ↓
Select Category
    ↓
Apply Conditions
    ↓
Present Event
    ↓
Apply Outcome
```

### Conditions

Examples:

```text
Health < 50
Day > 5
Visited Oasis
Money > 100
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Save System Integration

## Objective

Persist narrative progress.

### Save Data

```javascript
{
  completedEvents: [],
  activeStoryArcs: [],
  reputation: {},
  discoveredLore: []
}
```

### Benefits

* Persistent consequences
* Ongoing storylines
* Replay support

### Priority

⭐⭐⭐⭐ High

---

# Future Ink Integration

## Objective

Support deeper storytelling.

### Potential Uses

#### Character Stories

```text
Camp Elder
Merchant
Pilgrim
Traveler
```

#### Branching Narratives

```text
Multiple endings
Companion stories
Moral choices
```

#### Seasonal Story Content

```text
Special events
Holiday narratives
Limited-time stories
```

### Priority

⭐⭐ Medium

---

# Suggested Development Order

## Sprint 1

* Event Framework
* Event Modal UI
* JSON Loader

## Sprint 2

* Blessings
* Hardships
* Encounter Events

## Sprint 3

* Choice System
* Consequences
* Reputation Tracking

## Sprint 4

* Camp Conversations
* Landmark Narratives

## Sprint 5

* Story Arcs
* Legendary Events

## Sprint 6

* Ink Integration (Optional)

---

# Success Criteria

Players should begin every day wondering:

> "What will happen today?"

and finish each run with stories such as:

> "I survived a drought."

> "I helped a lost pilgrim."

> "A caravan changed my fortunes."

> "A blessing saved my final day."

The narrative system should make every wilderness journey feel unique while remaining lightweight and easy to expand.

---

# Future Enhancements

## Optional

### Companion Characters

Travelers can join the player's journey.

### Procedural Story Generation

Combine events into emergent narratives.

### Lore Journal

Unlock story entries and wilderness history.

### Narrative Achievements

```text
Prophet's Friend
Merciful Trader
Desert Sage
Faithful Wanderer
```

### Community Story Packs

Allow custom JSON story expansions.

---

**Status:** Planned
**Target Version:** v4.x
**Estimated Effort:** Medium–High
**Gameplay Impact:** Very High
**Replayability Impact:** Extremely High
**Narrative Impact:** Transformational
