// ============================================================
// CHARACTER: Centurion Longinus
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE ID: crucifixion_site
// CASE EXPORT: crucifixion_det
// SOURCE: act3_case_2d.js → NPC 'centurion_longinus'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Claudius, centurion of the Antonia fortress. I was the commanding officer at the execution site. You have questions about what I witnessed. Ask them.
*   [Tell me about the soldiers casting dice.] -> dice
*   [What happened when you pierced his side?] -> spear
*   [What about the sour wine on the hyssop stalk?] -> hyssop

=== dice ===
Standard procedure for a valuable garment. A seamless tunic is a rare find. We cast lots for it. Nothing unusual there.
*   [What else happened?] -> closing

=== spear ===
The flow of blood and water... that was unexpected. I've seen many crucifixions. I have never seen that. It was... clean.
*   [What else happened?] -> closing

=== hyssop ===
"He said 'I thirst.' One of the men lifted a sponge of sour wine to his lips on a hyssop branch. It's a common pain-duller. But the hyssop... that's what the Jews use for their Passover rituals, isn't it? Seemed... intentional."
*   [What else happened?] -> closing

=== closing ===
I've executed many men. This was different. When he died, the ground shook and the sky went black. I have never seen anything like it. I reported what I saw: 'Surely this was the Son of God.'
-> DONE
