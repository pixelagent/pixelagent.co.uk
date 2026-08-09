// ============================================================
// CHARACTER: Judas Iscariot (Betrayal Context)
// ACT: Act III/IV
// CASE: The Empty Tomb (Resurrection Investigation)
// CASE ID: roman_inquiry
// CASE EXPORT: resurrection
// SOURCE: act4_case_2d.js → NPC 'judas' (dialogueId: judas_betrayal)
// BIBLE REFERENCE: Matthew 26:14-16; Matthew 27:3-10
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Zechariah 11:12–13
//     Gospel: Matthew 26:15; Matthew 27:3–10
//     Insight: Thirty silver pieces was the price of a slave (Exodus 21:32) — the religious leaders effectively valued Jesus as the lowest possible commodity. The amount was prophetic, not coincidental.
//   - Psalm 41:9
//     Gospel: John 13:18 — Jesus quotes this Psalm directly at the supper
//     Insight: "Even my close friend, in whom I trusted, who ate my bread, has lifted up his heel against me." Jesus explicitly quoted this Psalm and said it was being fulfilled.
//   - Isaiah 53:12
//     Gospel: John 17:1–26 (the High Priestly Prayer)
//     Insight: After the betrayal, Jesus prayed for Judas — showing that even this act of evil served the larger purpose of prophetic fulfillment.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: After betraying Jesus for thirty pieces of silver, Judas was overcome with remorse when he saw the consequences of his action. He returned the money and took his own life.
//   Historical Note: The field of blood (Akeldama) was purchased with Judas's blood money — fulfilling prophecy about the potter's field (Zechariah 11:13).
//   Significance: Judas's betrayal was not an accident but prophetic fulfillment. Jesus told him "What you have done, do quickly" (John 13:27), showing predetermined purpose.
// ------------------------------------------------------------
//

-> start
=== start ===
You trace my steps with your ink and your parchment, little scribe. You think you are tracking a simple exchange of silver. You have no understanding of what it means to watch three years of momentum evaporate into poetry and feet-washing. We were supposed to hold the gates of the city! Now he speaks of tombs and broken bread. Someone must force his hand to action.
* [You sold Him for thirty pieces.] -> motives
* [You regret it.] -> regret
=== motives ===
Thirty pieces of silver. The price of a slave. That is what the Temple assessed the Son of God to be worth. And they paid me to deliver Him.
* [The money bag seems heavy tonight.] -> bag_heavy
* [Jesus spoke of a new covenant.] -> new_covenant
=== bag_heavy ===
The money bag seems heavy tonight. Thirty silver coins is the weight of a life in this city. A slave's price. I did what was necessary for the group.
# reveal:money_bag_impression
/#
Jesus told us to be prepared. I am merely ensuring we are.
-> closing
=== new_covenant ===
He speaks of many things. Blood, wine, bread. I look at the silver and I see reality. He is walking into a trap he won't avoid.
-> closing
=== regret ===
I watched three years of expectation curdle into disappointment. The Messiah was supposed to be a king. Instead He washed feet. Instead He spoke of dying. The Zealots wanted a general. I wanted a winner. I was wrong.
* [What happened to the money?] -> closing
=== closing ===
Silver is a ledger entry. Disappointment is a fire. The Temple priests counted it out. I took it. And then I saw Him look at me from across the courtyard. I threw the silver at them and ran.
-> DONE