// ============================================================
// CHARACTER: Local Traveler
// ACT: Act I
// CASE: The Barren Fig Tree
// CASE ID: fig_tree_incident
// CASE EXPORT: fig_tree_incident
// SOURCE: act1_case.js → NPC 'local_traveler'
// BACKGROUND: A common traveler on the road between Bethany and Jerusalem, who observed the fig tree both on Monday and Tuesday morning.
// BIBLE REFERENCE: Mark 11:12-14, 20-21
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: This traveler witnessed the fig tree with leaves but no fruit on Monday, and its withered state on Tuesday, without understanding the prophetic significance.
//   Significance: Provides an unbiased, purely observational account of the tree's rapid change.
// ============================================================

-> start
=== start ===
I walk this road every day between Bethany and Jerusalem. I saw that fig tree yesterday morning, full of leaves. And this morning... well, you wouldn't believe it.

* [What did it look like yesterday?] -> yesterday
* [What did it look like this morning?] -> this_morning
* [Press: Did you see anyone near it?] -> pressure

=== yesterday ===
It was a fine-looking tree, lots of leaves. But no figs. Not a single one. A bit early in the season, perhaps, but still, a shame. All show, no substance.

* [Continue.] -> this_morning

=== this_morning ===
Withered. Completely. From the roots up. Blackened leaves, brittle branches. Like it had been struck by lightning, but there was no storm. It happened overnight.

* [Continue.] -> pressure

=== pressure ===
I saw the Galilean teacher and his disciples pass by both mornings. Yesterday, he stopped and looked at it. This morning, one of his men pointed it out, astonished. They seemed to know something about it.

* [Accept: They were involved.] -> closing
* [Challenge: Did you see them do anything?] -> exposed

=== exposed ===
No, I didn't see them do anything. Just look. But the way the teacher looked at it yesterday... it was a look that could curdle milk. And then today, it was dead. Coincidence? I don't know. But it was strange.

* [Move forward.] -> closing

=== closing ===
-> DONE