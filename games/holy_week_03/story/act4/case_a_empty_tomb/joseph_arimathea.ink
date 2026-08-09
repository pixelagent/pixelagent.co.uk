// ============================================================
// CHARACTER: Joseph of Arimathea
// ACT: Act III
// CASE: The Empty Tomb Witness
// CASE ID: resurrection
// CASE EXPORT: resurrection_det
// SOURCE: ORPHAN FILE - Witness to the resurrection
// BIBLE REFERENCE: Matthew 27:57-61; 28:1-10; Mark 16:1-7; Luke 24:1-6; John 20:1-10
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 53:9
//     Gospel: Matthew 27:57-61 — buried with the rich
//     Insight: The suffering servant was laid in a wealthy man's tomb, fulfilling the prophecy of being buried with the rich.
//   - Psalm 16:10
//     Gospel: The linen wrappings left behind
//     Insight: Peter examined the empty grave clothes, noting the head cloth folded separately — the body was not stolen but translated.
//   - Job 19:25-27
//     Gospel: The imprinted face cloth
//     Insight: "I know my Redeemer lives... I shall see God with my own flesh." The face cloth preserves His countenance beyond death.
// ------------------------------------------------------------
//
 
-> start
=== start ===
I went to the tomb early on the first day of the week. The stone was rolled away, and the grave clothes lay there — but the body was gone. After Peter had examined the linen wrappings, I took them. I could not leave them exposed.
* [This was your tomb?] -> my_tomb
* [You kept the grave clothes?] -> examination
* [What did you see?] -> empty_tomb

=== my_tomb ===
It was my new tomb. Never used. Cut from solid rock in my own garden, close to Golgotha — the kind of resting place only a wealthy man could commission for himself. When I asked for His body, I broke ranks with the council. I was a secret disciple — but I could not let them leave Him to the criminals' burial pits at Hinnom, thrown among the condemned like refuse. That tomb had never held the dead before His body entered it.
* [Why take the risk?] -> risk_taken
* [Why does the tomb itself matter?] -> tomb_prophecy

=== tomb_prophecy ===
Isaiah wrote it centuries before any of us were born: the Servant would make His grave with the wicked, yet be with a rich man in His death. He died condemned between two criminals — the wicked man's grave. And then He was carried to my tomb — the rich man's grave. I was not thinking of Isaiah when I offered it. I was only thinking that I had a tomb and He did not. God apparently was thinking of Isaiah.
* [You fulfilled it without meaning to.] -> risk_taken

=== risk_taken ===
The soldiers knew Pilate's permission was secured. They had no choice but to let me take the corpse. I brought fine linens and the spices we had prepared. Nicodemus came too — he who had visited Him by night. We wrapped Him together, two men who had hidden their faith now exposed by love.
* [After the burial?] -> examination

=== examination ===
Peter entered first, stooping to look inside. We saw the strips of linen, the face cloth — but no body. The bindings were not undone. They lay as if He had simply passed through them. Peter counted the grave clothes separately, noting the sudarium was not with the main wrappings but rolled up by itself.
* [What did you take?] -> shroud_kept

=== shroud_kept ===
I took them all. The main burial cloths, the face cloth. I wrapped them carefully. But when I unfolded the sudarium later... His image was there. Forged into the linen itself. Not painted, not pressed. The very countenance of the Lord, imprinted as if by some power beyond dying flesh.
* [His image on the cloth?] -> image_revealed

=== empty_tomb ===
The tomb was open. The stone rolled away. The guards had fled. And there, in the burial niche — the linen wrappings lay empty. This was no theft. No grave robber would unwrap a body with such reverence, leaving the clothes in precise folds.
* [Peter examined them?] -> examination

=== image_revealed ===
I saw His face. The thorn marks circling His brow. The scars from the whip. I thought the grave clothes were empty, but this — this retained His very form. The image does not fade, and I have kept it wrapped in secrecy. Who would believe such a thing?
* [Continue.] -> closing

=== closing ===
The shroud I kept hidden. But I have examined it many times since. The image does not fade. He is not here. He has risen. And the cloth that once covered His face now bears His likeness for all to see.
-> DONE