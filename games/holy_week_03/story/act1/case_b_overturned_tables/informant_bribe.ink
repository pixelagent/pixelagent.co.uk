// ============================================================
// CHARACTER: Market Informant / Bribe-Taker
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: barabbas_choice
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
Information has a price. Names have a price. Silence also has a price. The Galilean's gathering had a ledger before the sun went down. One of the twelve.
* [You are selling information?] -> selling
* [Tell me about the Galilean.] -> galilean
=== selling ===
I sell what people are willing to pay for. The Sanhedrin pays for surveillance data. The Zealots pay for safe house locations. You pay for this conversation.
* [What does the Sanhedrin want?] -> sanhedrin_pay
=== galilean ===
The Galilean draws crowds like a fire draws moths. The priests want to know who, where, when — not why. Understanding is not their métier. Control is.
* [Do you know who the informant is?] -> sanhedrin_pay
=== sanhedrin_pay ===
One of the twelve disciples. The one who keeps the purse. He has... concerns. Concerns that translate well into the seventy pieces of silver the inner council values at precisely the price of a slave's life.
* [Judas Iscariot.] -> closing
=== closing ===
The one who walks with shadows and counts silver. I have said too much already.
-> DONE
