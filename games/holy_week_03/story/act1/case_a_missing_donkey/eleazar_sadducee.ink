// ============================================================
// CHARACTER: Eleazar ben Simon (Sadducee Noble)
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// CASE EXPORT: triumphal_entry
// SOURCE: Orphan file - referenced in act1_case_2d.js as suspect 'sadducee_noble'
// BIBLE REFERENCE: Acts 5:17 (Sadducean opposition context)
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 2:2
//     Gospel: Luke 22:66-71 — The Sanhedrin's conspiracy against Jesus
//     Insight: The psalmist foresaw the rulers of this earth taking counsel against the Lord and His anointed.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Eleazar ben Simon, a wealthy Sadducean aristocrat, witnessed the triumphal entry and filed a false deposition claiming the donkey was stolen.
//   Insight: His perjured testimony created legal grounds for Roman intervention, showing the depth of opposition to Jesus's kingly claims.
// ------------------------------------------------------------
//

->start
=== start ===
You are wasting your time with these questions, scribe. I am Eleazar. I saw the whole 'procession' from my villa's upper terrace. It was nothing more than a band of lawless Galileans causing a disturbance.
* [What exactly did you see at the tethering post?] -> theft_claim
* [The people were celebrating, not rioting.] -> aristocrat_view

=== theft_claim ===
I saw two of them — likely the ones they call the 'sons of thunder' given the noise they were making. They drew a blade, hacked through the rope, and made off with the colt. The owner was clearly terrified.
* [The rope fibers don't look hacked.] -> rope_evasion

=== aristocrat_view ===
They went toward the gate, dragging the beast along. They were throwing their dirty cloaks in the mud as if the street were a palace floor. It is an insult to the dignity of Jerusalem.
* [Why do you dislike this teacher so much?] -> threat_path

=== rope_evasion ===
Hacked, cut, untied — what does it matter? The animal was removed without a proper transaction. In the eyes of the Law, that is theft.
* [Continue.] -> closing

=== threat_path ===
-> closing

=== closing ===
Keep your notes, scribe. But remember: a movement built on a borrowed donkey will not last the week. The Sanhedrin will handle this.

-> DONE
