# Wilderness Economy Systems --- Revised Implementation Reference

This revision incorporates design improvements after review.

## Key Improvements

### Tithe

-   Keep weekly 10% tithe.
-   Replace the hard surcharge threshold with progressive bands:

``` js
const surcharge =
    this.money > 300 ? 0.05 :
    this.money > 150 ? 0.02 :
    0;
```

-   Add a small (15%) chance after paying the tithe to receive a
    blessing:
    -   +10 Health
    -   or +15 Silver
    -   or +20% market demand next day

### Golden Calf

-   Activation cost remains 30 silver.
-   Market price bonus capped:

``` js
this.marketSellPrice = Math.min(12,
    Math.round(this.marketSellPrice * 1.5));
```

-   Replace fixed "3 uses = plague" with escalating daily plague chance.

    Wrath   Plague Chance
  ------- ---------------
        1              0%
        2             15%
        3             35%
        4             60%
       5+            100%

This keeps temptation uncertain.

### Bronze Serpent

-   Trigger still depends on wasted manna.
-   Heal remains +40 Health.
-   Also remove one temporary negative condition (fatigue or reduced
    health drain next day).
-   Use softer cost scaling:

    Use   Cost
  ----- ------
      1     15
      2     20
      3     28
      4     38
      5     50
      6     65
      7     80

### Presentation

Present all systems as narrative events rather than mechanics: - "The
Levites collect the Lord's portion." - "Travellers whisper of the Golden
Calf..." - "Fiery serpents enter the camp..."

### System Synergy

-   High lifetime tithe slightly reduces Bronze Serpent cost.
-   Recent idol use increases Bronze Serpent cost.
-   Never using the idol slightly increases blessing chance.
-   High wealth increases merchant prices.
-   Healthy streak increases market demand.

### New Weekly Rhythm

Consider making every seventh day a Sabbath: - No gathering. - No
movement health drain. - Tithe collected. - Small health recovery. -
Narrative camp event.

### End-of-Run Statistics

Track: - Silver Tithed - Golden Calf Uses - Plagues Endured - Bronze
Serpent Uses - Perfect Days - Mana Wasted - Faithfulness Rating
