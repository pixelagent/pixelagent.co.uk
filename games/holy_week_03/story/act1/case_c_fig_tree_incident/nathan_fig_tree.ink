// ============================================================
// CHARACTER: Nathan the Gardener
// ACT: Act I
// CASE: The Barren Fig Tree
// CASE ID: fig_tree_incident
// SOURCE: NPC 'nathan_fig_tree'
// BIBLE REFERENCE: Mark 11:12–14, 20–25; Matthew 21:18–22
// ------------------------------------------------------------
// PURPOSE: Nathan witnesses the cursed fig tree — immediate withering from roots up
// ============================================================

-> start
=== start ===
I don't understand it, Scribe. That tree was lush yesterday morning when I passed it at first light. Now? It looks like it hasn't seen water in a decade.
* [Did you see anyone approach it?] -> witness_detail
* [Is this a common blight?] -> blight_denial

=== witness_detail ===
The Nazarene and His followers passed by on the road from Bethany. He looked for fruit — the leaves were full so the tree should have had early figs — and found none. He spoke to the tree. I thought He was frustrated. Then the disciples moved on and I stayed to look, and I watched the leaves turn grey before my eyes.
* [He spoke to it? What did He say?] -> what_said
* [The leaves turned while you watched.] -> immediate_wither

=== blight_denial ===
No blight works this fast. I tend orchards on both sides of this road. Fig blight is slow — you see yellowing over weeks, then brown margins, then the branch dies back over a season. This was not gradual. This was a command. It withered from the roots up.
* [You saw that — from the roots?] -> root_wither
* [What could cause roots to fail overnight?] -> root_wither

=== what_said ===
I was too far to hear the words clearly. But the tone was not that of a frustrated man. It was a pronouncement. Deliberate, calm. Like a verdict rather than a complaint. He was not venting. He was speaking something that then happened.
* [The word had authority over the tree.] -> immediate_wither
* [And then?] -> immediate_wither

=== immediate_wither ===
Within the time it took them to walk to the first bend in the road, the colour had gone from the leaves. By the time I reached the tree myself — perhaps thirty seconds after — the small branches were dry to the touch. No heat. No flame. Simply... removed.
* [Withered from the roots up.] -> root_wither

=== root_wither ===
I pulled at the base to check. The root system had not simply dried — it had collapsed. As if the life had been withdrawn rather than killed. A fig tree this age has roots going down three cubits. All of it, simultaneously. One sentence and then silence and then a dead tree.
* [What does that mean to you?] -> meaning

=== meaning ===
I am a gardener, not a theologian. What it means to me is that He has authority I cannot explain with soil or water or disease. What it means beyond that — why this tree, why today, why publicly — I leave to the people who read the prophets for a living.
* [The fig tree is used as a symbol of Israel in several prophets.] -> symbolic_judgment
* [Thank you, Nathan.] -> closing

=== symbolic_judgment ===
I have heard that. A vine and a fig tree representing the nation — Micah, I think. If the Teacher was speaking to more than the tree, then what I saw this morning is heavier than I want to carry on a Tuesday. I will stick to my orchards and leave the symbols to people better equipped.
* [Be careful with that one.] -> closing

=== closing ===
Be careful with that one. His words have weight. I have been tending these trees for twenty years. I have never seen a word do what His word did this morning. Write that down carefully.
-> DONE
