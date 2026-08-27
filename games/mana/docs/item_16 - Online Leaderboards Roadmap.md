# Online Leaderboards Roadmap

## Manna Collector – Competitive Survival Expansion

---

# Goal

Introduce global online leaderboards that allow players to compare their performance with others around the world.

The leaderboard system should reward multiple playstyles rather than a single "highest score" metric.

This feature becomes active when the game is published online.

---

# Current Status

## Existing Data Already Available

The game currently tracks:

* Score
* Day Survived
* Wealth (Silver)
* Mana Gathered
* Mana Sold
* Daily Performance
* Market Results

These systems provide nearly all data needed for competitive rankings.

---

# Phase 1 – Leaderboard Architecture

## Objective

Create a backend capable of storing and retrieving player scores.

### Backend Options

#### Firebase

Advantages:

* Fast setup
* Excellent documentation
* Realtime updates
* Large ecosystem

Best for:

```text
Rapid deployment
```

---

#### Supabase

Advantages:

* PostgreSQL database
* SQL queries
* Open source
* Lower long-term cost

Best for:

```text
Advanced statistics
```

---

## Recommendation

### Start With Supabase

Reasons:

* Easier leaderboard queries
* Better analytics
* Flexible ranking systems
* SQL support for future tournaments

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 2 – Player Identity System

## Objective

Give every player a recognizable profile.

### Features

#### Guest Accounts

```text
Anonymous Player
```

#### Username Selection

```text
Choose Your Wanderer Name
```

Examples:

```text
DesertWalker
MannaMaster
SilverTrader
```

### Validation Rules

* 3–20 characters
* Letters and numbers
* No offensive names
* Unique usernames

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 3 – Core Global Leaderboards

## Objective

Launch the first competitive rankings.

### Longest Survival

Tracks:

```text
Most days survived
```

Example:

```text
1. DesertKing     Day 87
2. MannaTrader    Day 75
3. PilgrimOne     Day 68
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

### Highest Wealth

Tracks:

```text
Total silver accumulated
```

Example:

```text
1. SilverLord      8,500
2. TraderKing      8,200
3. MarketWizard    7,950
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

### Highest Score

Tracks:

```text
Current score system
```

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 4 – Advanced Competitive Categories

## Objective

Reward different player strategies.

### Fastest Day Completion

Tracks:

```text
Shortest time to complete a day
```

Conditions:

* Minimum survival requirements met
* No exploits

### Priority

⭐⭐⭐⭐ High

---

### Most Mana Collected

Tracks:

```text
Highest total mana gathered
```

Rewards:

* Exploration
* Efficiency
* Risk-taking

### Priority

⭐⭐⭐⭐ High

---

### Most Mana Sold

Tracks:

```text
Highest total sales volume
```

Focus:

```text
Trading skill
```

### Priority

⭐⭐⭐⭐ High

---

### Perfect Market Awards

Tracks:

```text
Days where:
Gathered = Demand
Sold = 100%
Waste = 0
```

Example:

```text
Perfect Trades: 42
```

### Priority

⭐⭐⭐⭐⭐ High

---

# Phase 5 – Seasonal Rankings

## Objective

Keep competition fresh.

### Seasons

Duration:

```text
30 Days
```

or

```text
90 Days
```

### Seasonal Rewards

Examples:

```text
Desert Champion
Market Master
Manna Sage
```

### Reset System

Season rankings reset.

Lifetime rankings remain.

### Priority

⭐⭐⭐ Medium

---

# Phase 6 – Daily Challenges

## Objective

Create recurring competition.

### Examples

#### Wealth Rush

```text
Earn the most silver today
```

#### Survival Trial

```text
Reach Day 10 fastest
```

#### Market Genius

```text
Most Perfect Trades
```

### Priority

⭐⭐⭐ Medium

---

# Phase 7 – Statistics Tracking

## Objective

Store long-term player history.

### Track

#### Lifetime Statistics

```text
Days Survived
Games Played
Mana Gathered
Mana Sold
Silver Earned
Perfect Trades
Distance Traveled
```

### Benefits

* Deeper progression
* Player retention
* Achievement integration

### Priority

⭐⭐⭐⭐ High

---

# Phase 8 – Achievement System Integration

## Objective

Connect achievements to leaderboard data.

### Examples

#### Desert Survivor

```text
Survive 30 Days
```

#### Market Prophet

```text
10 Perfect Trades
```

#### Silver Tycoon

```text
Earn 10,000 Silver
```

#### Manna Collector

```text
Gather 5,000 Mana
```

### Priority

⭐⭐⭐⭐ High

---

# Phase 9 – Anti-Cheat Protection

## Objective

Protect leaderboard integrity.

### Client Validation

Verify:

* Score
* Wealth
* Survival time
* Market transactions

### Server Validation

Reject:

```text
Impossible Scores
Negative Times
Modified Save Data
```

### Additional Measures

* Rate limiting
* Submission cooldowns
* Replay verification (future)

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 10 – Community Features

## Objective

Increase player engagement.

### Friends Leaderboard

Compare against:

```text
Friends Only
```

### Weekly Highlights

Display:

```text
Top Survivor
Top Trader
Top Collector
```

### Hall of Fame

Permanent records:

```text
Best Survival Ever
Highest Wealth Ever
Most Perfect Markets Ever
```

### Priority

⭐⭐⭐ Medium

---

# Database Schema

## Players

```sql
players
--------
id
username
created_at
last_seen
```

---

## Scores

```sql
scores
--------
player_id
score
days_survived
wealth
mana_collected
mana_sold
perfect_markets
fastest_day
created_at
```

---

## Seasons

```sql
seasons
--------
season_id
start_date
end_date
active
```

---

# UI Design

## Main Menu

```text
Play
Leaderboards
Statistics
Achievements
Settings
```

---

## Leaderboard Screen

```text
Leaderboard Categories

[Longest Survival]
[Highest Wealth]
[Highest Score]
[Most Mana]
[Perfect Market]
[Fastest Day]
```

---

## Ranking Entry

```text
#1 DesertKing

Day 87
Wealth: 8,500
Perfect Trades: 42
```

---

# API Flow

## Submit Score

```text
Game Ends
      ↓
Validate Run
      ↓
Upload Statistics
      ↓
Save To Database
      ↓
Refresh Rankings
```

---

## Retrieve Rankings

```text
Open Leaderboard
      ↓
Request Top 100
      ↓
Display Rankings
```

---

# Suggested Development Order

## Sprint 1

* Supabase Setup
* Database Tables
* Username System

## Sprint 2

* Longest Survival Leaderboard
* Highest Wealth Leaderboard
* Highest Score Leaderboard

## Sprint 3

* Perfect Market Rankings
* Most Mana Rankings
* Statistics Tracking

## Sprint 4

* Seasonal Rankings
* Achievement Integration

## Sprint 5

* Friends Rankings
* Hall of Fame
* Daily Challenges

---

# Success Criteria

Players should be able to:

* Create a profile
* Submit scores automatically
* View global rankings
* Compete in multiple categories
* Track personal statistics
* Earn recognition for different playstyles

The system should encourage players to ask:

> "Can I survive one more day than the current leader?"

and

> "Can I achieve a perfect market run?"

---

# Future Enhancements

## Optional

### Replay Sharing

Upload and watch successful runs.

### Ghost Runs

Compete against leaderboard champions.

### Tournament Events

Limited-time competitive events.

### Guilds / Camps

Team-based leaderboards.

### Cross-Platform Rankings

Share rankings across:

```text
Web
Mobile
Desktop
```

---

**Status:** Planned
**Target Version:** v4.x
**Estimated Effort:** Medium
**Gameplay Impact:** High
**Retention Impact:** Extremely High
