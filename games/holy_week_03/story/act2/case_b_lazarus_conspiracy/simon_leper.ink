// ============================================================
// CHARACTER: Simon the Leper
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// CASE EXPORT: lazarus_plot
// SOURCE: NPC 'simon_leper'
// PURPOSE: To provide a firsthand account of the dinner in Bethany, the anointing by Mary, and the presence of the resurrected Lazarus, highlighting the tension between the disciples and the looming threat from the priests.
// BACKGROUND: Once a leper and a social outcast, Simon was healed by Jesus. His gratitude is immense, and he hosts a dinner for Jesus and His disciples at his home in Bethany. This dinner becomes a pivotal event, attended by the recently resurrected Lazarus and marked by Mary's anointing of Jesus with expensive perfume.
// BIBLE REFERENCE: Matthew 26:6-13; Mark 14:3-9; John 12:1-8
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 25:8
//     Gospel: John 11:25
//     Insight: Lazarus’s revival was a tactical, localized preview of the ultimate cosmic victory over death that was about to occur on Easter morning.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: At a dinner in Bethany, Mary, sister of Lazarus, anoints Jesus's feet with costly perfume. Judas objects to the waste, but Jesus defends her action as a preparation for His burial. The event underscores the growing tension and the plot against both Jesus and Lazarus.
//   Historicalnote: The dinner takes place in the home of Simon, previously a leper. The presence of Lazarus, a man raised from the dead, draws a large crowd, further alarming the chief priests who are already plotting to kill Jesus.
//   Significance: This scene contrasts extravagant love and devotion (Mary) with greed and betrayal (Judas), all under the shadow of the Sanhedrin's death plot against the Giver of Life and the evidence of His power.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: caiaphas
//   motive: The high priests feared that the massive public following caused by Lazarus's resurrection would spark a Roman military crackdown, destroying their temple and nation.
//   method: Caiaphas and his inner circle bypassed standard judicial procedures to authorize a shadow assassination plot against Lazarus, aiming to eliminate the physical evidence of Jesus's greatest miracle.
// ============================================================
//


-> start

=== start ===
My house was a place of exclusion once. The Law declared me unclean. Now, it is a place where the Son of God eats bread. Lazarus, another man who has defeated a tomb, sits at my table. And Mary... she has just filled the air with the scent of a king's burial.
* [Tell me about the anointing.] -> anointing
* [Lazarus is here as well?] -> lazarus

=== anointing ===
The disciples saw the cost. I saw the courage. To bring something so valuable and break it for Him... it was an act of total surrender. The Teacher said it was to prepare Him for burial. The mood in the room changed after He said that.
* [How did the disciples react?] -> disciples_reaction

=== lazarus ===
He sits there, eating and breathing. A living miracle. He is the reason the chief priests are so afraid. They cannot deny a man who was dead for four days. So they plot to kill him again. My house is full of life, and the city is full of death warrants.
-> closing

=== disciples_reaction ===
Judas was angry. He spoke of the poor, but his hands are always near the money bag. The others were quiet, but you could see them doing the math in their heads. They do not yet understand the economy of His kingdom.
* [And Jesus?] -> jesus_reaction

=== jesus_reaction ===
He looked at Mary with such kindness. He honored her gift above all their objections. He saw her heart, not the price of the perfume. In my own house, I saw a man who was once unclean be honored, a man who was dead be welcomed, and a woman's love be treasured. This is the kingdom He speaks of.
-> closing

=== closing ===
They can watch my house. They can send their spies. But what happened in here tonight... it cannot be undone.
-> DONE