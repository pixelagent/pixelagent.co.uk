// ============================================================
// CHARACTER: Rhoda the Servant
// ACT: Act IV
// CASE: The Last Supper
// CASE ID: last_supper
// CASE EXPORT: last_supper
// SOURCE: Orphan file - household servant witness to Judas's silver transaction
// BIBLE REFERENCE: John 13:21-30 (indirect reference to household activities)
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 41:9
//     Gospel: John 13:18 — Jesus predicts betrayal by a close friend
//     Insight: Even servants noticed the exchange that night — the betrayal was not hidden.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Rhoda served in the upper room where Jesus celebrated Passover. She witnessed Judas handling the money bag and heard the clinking of high-purity silver.
//   Insight: The household servants saw more than recorded — Judas's transaction had witnesses beyond the disciples.
// ------------------------------------------------------------
//

=== start ===
I am Rhoda. I have been serving this household since I was a child. Preparing for Passover is always a rush, but this group... they were different. So quiet, yet the air felt heavy.
* [What did you hear while preparing the room?] -> clinking_coins
* [Tell me about the man who left early.] -> judas_exit

=== clinking_coins ===
I was bringing up the extra lamps. As I passed the preparation table, I heard the sharp, heavy clink of silver coins hitting the wood. One of the men was standing there, his hands inside a heavy bag. It didn't sound like the copper mites we usually see — it had the ring of high-purity Temple silver.
* [Which man was it?] -> judas_exit
* [And the water jug?] -> water_jug

=== judas_exit ===
He was the one carrying the purse. He looked pale, even in the torchlight. Later, right in the middle of the meal, he practically ran down the stairs. I heard a clay cup shatter against the stone floor near the landing as he fled.
* [Continue.] -> closing

=== water_jug ===
The stone jug is heavy, but someone moved it from the landing to the top of the stairs and back again. There was a wet trail on the floor. I assumed they were washing, but the basin was still in the corner when I checked.
* [Continue.] -> closing

=== closing ===
I just hope the Teacher is safe. They went to the garden, but the atmosphere in the city tonight... it feels like a storm is coming.-> DONE
