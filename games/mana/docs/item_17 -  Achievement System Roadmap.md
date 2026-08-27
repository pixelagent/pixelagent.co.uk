# Achievement System Roadmap

## Manna Collector – Wilderness Achievements Expansion

---

# Goal

Introduce a lightweight achievement system that rewards exploration, survival, trading mastery, and efficient resource management.

Achievements should:

* Encourage replayability
* Reward different playstyles
* Provide long-term goals
* Create memorable milestones
* Integrate naturally with existing game systems

The system should feel like a collection of personal wilderness legends earned over many journeys.

---

# Current Status

## Existing Systems Already Track

The game already tracks much of the data needed:

* Days survived
* Health
* Wealth
* Mana gathered
* Mana sold
* Locations visited
* Score
* Movement
* Market activity

Most achievements can be implemented with minimal additional infrastructure.

---

# Phase 1 – Achievement Framework

## Objective

Create a reusable achievement system.

### Core Structure

Each achievement should contain:

```javascript id="hj7zy6"
{
    id: "desert_survivor",
    name: "Desert Survivor",
    description: "Reach Day 10",
    icon: "🏆",
    unlocked: false
}
```

### Achievement Manager

Responsibilities:

* Track progress
* Unlock achievements
* Save progress
* Display notifications
* Prevent duplicate unlocks

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 2 – Survival Achievements

## Objective

Reward players for enduring the wilderness.

---

## 🏆 Desert Survivor

### Requirement

```text id="3f98dc"
Reach Day 10
```

### Trigger

```javascript id="qlp7r9"
if (day >= 10)
```

### Theme

A seasoned traveler who has learned the rhythm of the wilderness.

### Priority

⭐⭐⭐⭐⭐ Critical

---

## 🏆 Enduring Soul

### Requirement

```text id="cggqfb"
Reach Day 25
```

### Priority

⭐⭐⭐⭐ High

---

## 🏆 Legend of the Wilderness

### Requirement

```text id="50s6o4"
Reach Day 50
```

### Priority

⭐⭐⭐⭐ Medium

---

# Phase 3 – Wealth Achievements

## Objective

Reward economic success.

---

## 🏆 Merchant

### Requirement

```text id="n6b77s"
Earn 1,000 Silver
```

### Trigger

```javascript id="88h96v"
if (money >= 1000)
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

## 🏆 Wealthy Trader

### Requirement

```text id="5m97mk"
Earn 5,000 Silver
```

### Priority

⭐⭐⭐⭐ High

---

## 🏆 Silver Tycoon

### Requirement

```text id="sx0hhv"
Earn 10,000 Silver
```

### Priority

⭐⭐⭐⭐ Medium

---

# Phase 4 – Efficiency Achievements

## Objective

Reward careful resource management.

---

## 🏆 Miser

### Requirement

```text id="5yyn7q"
Waste 0 Mana during an entire day
```

### Trigger

Conditions:

```text id="r43grg"
Mana Wasted = 0
Day Completed
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

## 🏆 Provider

### Requirement

```text id="f4pdzs"
Sell every piece of gathered mana
```

### Conditions

```text id="v8qqs8"
Gathered > 0
Sold = Gathered
Waste = 0
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

## 🏆 Market Sage

### Requirement

```text id="jwukof"
Achieve 10 Perfect Market Days
```

### Priority

⭐⭐⭐⭐ High

---

# Phase 5 – Health Achievements

## Objective

Reward healthy and efficient play.

---

## 🏆 Blessed

### Requirement

```text id="f00um8"
Finish a day with 100 Health
```

### Trigger

```javascript id="5hzm85"
if (health === 100)
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

## 🏆 Unbroken

### Requirement

```text id="z3jlwm"
Survive 10 Days without dropping below 75 Health
```

### Priority

⭐⭐⭐⭐ Medium

---

# Phase 6 – Exploration Achievements

## Objective

Encourage players to explore the world.

---

## 🏆 Pilgrim

### Requirement

Visit every landmark.

### Current Locations

```text id="hf1e8i"
Camp
Oasis
Split Rock
Temple
Wilderness
```

### Trigger

```javascript id="8ej4r1"
allLocationsVisited === true
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

## 🏆 Pathfinder

### Requirement

```text id="0hv2u6"
Discover every landmark in a single day
```

### Priority

⭐⭐⭐⭐ High

---

# Phase 7 – Movement Achievements

## Objective

Reward exploration and persistence.

---

## 🏆 Wanderer

### Requirement

```text id="kcrvri"
Walk 10,000 steps
```

### Implementation

Track total movement distance:

```javascript id="p0kzlc"
totalSteps += movementDistance;
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

## 🏆 Nomad

### Requirement

```text id="gksp0c"
Walk 50,000 steps
```

### Priority

⭐⭐⭐⭐ Medium

---

## 🏆 Desert Wind

### Requirement

```text id="pbf75t"
Walk 100,000 steps
```

### Priority

⭐⭐⭐ Low

---

# Phase 8 – Hidden Achievements

## Objective

Create surprises for dedicated players.

---

## 🏆 Early Riser

### Requirement

```text id="udk5wm"
Gather manna within 5 seconds of day start
```

---

## 🏆 Empty Basket

### Requirement

```text id="4rhg5m"
Complete a day with zero mana collected
```

---

## 🏆 Last Moment

### Requirement

```text id="uqnqug"
Sell all mana with less than 1 second remaining
```

---

## 🏆 Lucky Trader

### Requirement

```text id="4dhz0u"
Sell all mana on a maximum-price market day
```

### Priority

⭐⭐⭐ Medium

---

# Phase 9 – Achievement Notifications

## Objective

Celebrate accomplishments.

### Unlock Popup

Display:

```text id="aevmga"
🏆 Achievement Unlocked

Desert Survivor

Reach Day 10
```

### Animation

* Slide in
* Gold glow
* Sound effect
* Fade away

### Recommended Duration

```text id="4w2l7p"
3–5 seconds
```

### Priority

⭐⭐⭐⭐ High

---

# Phase 10 – Achievement Menu

## Objective

Allow players to review progress.

### Menu Layout

```text id="wnpf5s"
Achievements

✔ Desert Survivor
✔ Merchant
✖ Pilgrim
✖ Wanderer
✔ Blessed
```

### Display

For each achievement:

* Icon
* Name
* Description
* Unlock date
* Progress (optional)

### Priority

⭐⭐⭐⭐ High

---

# Save System Integration

## Objective

Persist achievements across sessions.

### Local Storage

```javascript id="pnxh48"
localStorage.setItem(
    "achievements",
    JSON.stringify(data)
);
```

### Saved Data

```javascript id="hdd5a2"
{
    unlocked: [],
    progress: {},
    statistics: {}
}
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Statistics Tracking

## Objective

Support future achievements.

### Track

```text id="wz0bbn"
Total Days Survived
Total Silver Earned
Total Mana Gathered
Total Mana Sold
Total Mana Wasted
Perfect Market Days
Landmarks Visited
Total Steps Walked
Highest Wealth
Highest Health
```

### Benefits

* Easier future achievement additions
* Leaderboard compatibility
* Analytics

### Priority

⭐⭐⭐⭐ High

---

# UI Integration

## Main Menu

Add:

```text id="gzpgux"
Play
Achievements
Settings
About
```

---

## Achievement Card Example

```text id="x6cnkg"
🏆 Desert Survivor

Reach Day 10

Unlocked
```

---

## Locked Card Example

```text id="nbck8r"
❓ Unknown Achievement

Keep exploring...
```

---

# Suggested Development Order

## Sprint 1

* Achievement Manager
* Save System
* Statistics Tracking

## Sprint 2

* Desert Survivor
* Merchant
* Miser
* Provider
* Blessed

## Sprint 3

* Pilgrim
* Wanderer
* Exploration Tracking

## Sprint 4

* Achievement Notifications
* Achievement Menu

## Sprint 5

* Hidden Achievements
* Advanced Achievements
* Polish

---

# Success Criteria

Players should naturally begin setting personal goals such as:

> "Can I survive ten days?"

> "Can I complete a run without wasting any manna?"

> "Can I visit every landmark?"

> "Can I become a perfect trader?"

The achievement system should create reasons to replay the game long after players understand the core mechanics.

---

# Future Enhancements

## Optional

### Achievement Points

```text id="v6h11l"
Bronze = 10
Silver = 25
Gold = 50
Legendary = 100
```

### Achievement Showcase

Display rarest achievements.

### Seasonal Achievements

Special limited-time objectives.

### Leaderboard Integration

Track:

```text id="xkz11h"
Most Achievements Unlocked
Fastest Completion
Completion Percentage
```

### Steam Integration

Future support for:

```text id="m0i2es"
Steam Achievements
Epic Achievements
Google Play Achievements
Apple Game Center
```

---

**Status:** Planned
**Target Version:** v4.x
**Estimated Effort:** Low–Medium
**Gameplay Impact:** High
**Replayability Impact:** Extremely High
