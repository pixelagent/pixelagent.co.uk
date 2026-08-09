
// ============================================================
// CHARACTER: Thomas
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// SOURCE: js/act2_case.js -> NPC 'parable_meaning' (Analytical Disciple)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===


VAR speaker = "Thomas"

I am Thomas. Ask more questions than I answer. The honest ones. Jesus told a story about tenants who kept killing the servants the owner sent. Eventually they killed the owner's son. I heard it in the Temple courtyard.

*   [The crowd heard it too.]
    The crowd was silent after that. When someone tells a story about murderous tenants and the owner's son, and then looks at the chief priests while saying it — the silence is the answer.
    -> stone_knot

*   [What is the vineyard?]
    The vineyard is Israel. The owner is God. The tenants are the chief priests and elders. The servants are the prophets. The son — that is where the story ends in the telling.
    -> stone_knot

== stone_knot ==
*   [And the builders' rejected stone?]
    The stone the builders rejected becomes the cornerstone. That is Psalm 118. The crowd did not look where He was pointing. They were too busy watching the priests turn pale.
    -> closing_knot

== closing_knot ==
*   [Thomas, you understand the parables.]
    I ask questions. That is my trade. But some answers are so clear, even a questioner has to pause. The man from Nazareth speaks truth in a way that makes the comfortable very uncomfortable.
    -> END