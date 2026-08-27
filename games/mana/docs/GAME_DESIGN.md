# Manna Collector: Core Gameplay Loop

## Core Concept

The player is a wanderer in a vast desert wilderness who must survive by gathering and selling mystical manna. Each day presents a new challenge: gather enough manna to maintain health and earn a living, but avoid the pitfalls of greed and waste.

The core loop is a delicate balance between exploration, resource management, and market economics. Success requires not just accumulation, but precision and foresight.

The challenge is managing a feedback loop where poor decisions today make survival harder tomorrow.

---

## Resources

### Manna (Daily)
- **Gathered Manna:** The total amount of manna collected during the day by exploring the wilderness. This contributes to the player's health calculation.
- **Collected Manna:** The player's current inventory of manna that can be sold at the market. This decreases as manna is sold.
- **Wasted Manna:** Any manna collected but not sold by the end of the day is considered wasted and negatively impacts health.

### Silver (Persistent)
- The primary currency, earned by selling manna at the market.
- Used to track wealth and contributes to the player's "Wealth" status bar.

### Health (Persistent)
- Represents the player's physical well-being, ranging from 0 to 100.
- Decreases from movement and is impacted by the amount of manna gathered and wasted at the end of each day.
- If health reaches 0, the game is over.

### Score (Persistent)
- An overall measure of the player's performance, increased by collecting manna and achieving daily bonuses.

---

## Daily Flow

### Step 1: Day Start
The day begins with a fixed amount of time on the clock. The market generates its prices and demand for the day.
- **Daily Demand:** The maximum amount of manna the traders will buy.
- **Sell Price:** The amount of silver paid per unit of manna.

### Step 2: Gathering Phase
The player explores the procedurally generated desert to find and collect manna pickups.
- Player movement drains a small amount of health.
- Collecting manna increases `dayManaGathered` and `dayManaCollected` counters.
- Collecting manna also increases the player's score.

### Step 3: Market Phase
The player can visit the market at any time to sell their collected manna.
- Selling manna converts it into Silver.
- The player cannot sell more manna than the `dailyDemand`.
- Strategic selling is required to maximize income without creating waste.

### Step 4: Day End
When the timer runs out, the day ends, and the player's performance is evaluated.
- **Health Calculation:** The player's health is adjusted based on the day's activities.
  - **Gathering too little:** Gathering less than a "healthy" amount of manna results in a health penalty.
  - **Gathering too much:** Gathering more than a "healthy" amount also results in a health penalty (overexertion).
  - **Wasting Manna:** Any manna collected but not sold results in a significant health penalty.
  - **Healthy Day:** Gathering within the optimal range provides a health bonus.
- **Score Calculation:** A score bonus is awarded for a "perfect" day: gathering a healthy amount of manna and having zero waste.

---

## Scoring

The player's score is a running total accumulated through:
- **Collecting Manna:** Each pickup adds a small number of points.
- **Perfect Day Bonus:** A significant score bonus is awarded for ending the day with a healthy amount of manna gathered and zero manna wasted.

The primary challenge is not just maximizing score, but ensuring long-term survival by managing health and wealth across many days.

---

## Win Condition

The game is an endless survival loop. The goal is to survive for as many days as possible while achieving the highest score. The game ends when the player's health reaches zero.

---

## Core Feedback Loop

The game is built on a "Goldilocks" feedback loop where both under- and over-performance are penalized.

1.  **Under-Gathering:** Leads to poor health, making it harder to explore and survive subsequent days.
2.  **Over-Gathering:** Leads to health penalties from overexertion and a high risk of wasted manna if it cannot be sold.
3.  **Wasted Manna:** Directly and significantly damages health, punishing poor market planning.
4.  **Optimal Gathering:** Gathering within the "healthy" range and selling all of it maximizes health, income, and score, setting the player up for success on the following day.

This design forces players to make strategic decisions every day, balancing the immediate need for income against the long-term need for sustainable health.

---

## Key Systems

1.  **Day/Night Cycle:** A simple timer that dictates the length of each day.
2.  **Procedural World:** An infinite, procedurally generated desert landscape ensures high replayability.
3.  **Market Economics:** A dynamic system of supply, demand, and pricing that drives the core economic challenge.
4.  **Health & Survival:** A persistent health system that creates consequences for daily actions.
5.  **UI & HUD:** Provides clear feedback on time, resources, health, and wealth.