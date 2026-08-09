// ============================================================
// CHARACTER: Rumor Whisperer (City Gossip)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: js/act1_case.js -> NPC 'rumor_whisper' (City Gossip)
// ------------------------------------------------------------
// ============================================================
//
-> start
=== start ===
(A nervous citizen glances sideways before leaning close.)
Last Sabbath a man blind from birth walked out of the Pool of Bethesda and now says he sees.
The Pharisees asked for details. He said, 'I was blind. Now I can see.'
I will not say my name, but you should find him and ask.
* [I will speak to the man who now sees.] -> seeker
* [Tell me exactly what happened.] -> reluctant

=== seeker ===
* [I will speak to the man who now sees.] -> closing

=== reluctant ===
* [Tell me exactly what happened.] -> closing

=== closing ===
-> DONE