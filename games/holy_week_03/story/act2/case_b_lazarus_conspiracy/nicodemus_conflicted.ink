// ============================================================
// CHARACTER: Nicodemus (Conflicted Pharisee)
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// CASE EXPORT: lazarus_plot
// SOURCE: nicodemus_conflicted.ink
// BACKGROUND: A member of the Sanhedrin who seeks the truth in secret. He is torn between his position and his growing conviction.
// BIBLE REFERENCE: John 3:1-21; John 7:50-52; John 19:39
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Jeremiah 29:13
//     Gospel: John 3:1-2
//     Insight: Nicodemus's search in the night fulfills the promise that those who seek with all their heart will find Him.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Nicodemus questions the legality of the Sanhedrin's actions and seeks the Truth personally during a secret night visit.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: none
//   Motive: Seeking truth amidst institutional corruption and political fear.
// ============================================================

-> start
=== start ===
I prefer the shadows of the evening. The Sanhedrin is a bright, loud place where truth is often shouted down. I have been watching the Nazarene. I have spoken to him when the city was asleep. He doesn't speak like a revolutionary... he speaks like the Law itself.
* [Why did you go to him at night?] -> night_visit
* [What is the mood of the Council regarding Lazarus?] -> council_mood
=== night_visit ===
Because I am a teacher of Israel, and I had questions that daylight could not answer. He told me I must be born again. I am still trying to understand what that means for a man of my age and standing.
* [Does the 'Secret Decree' worry you?] -> probe_decree
=== council_mood ===
They are in a panic. Caiaphas sees only the Romans. Annas sees only power. The miracle at Bethany has forced their hand. They cannot argue with a man who was dead, so they intend to silence him.
* [What about the decree?] -> probe_decree
=== probe_decree ===
The decree is a stain on our history. It targets Lazarus specifically. They want to eliminate the witness to the miracle before the Passover begins. I have seen the draft in Annas's study.
* [Continue.] -> closing
=== closing ===
I am trying to work from within, but the walls are closing in. At some point, one must choose between the scroll and the Light.
-> DONE