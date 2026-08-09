// ============================================================
// CHARACTER: Eleazar ben Simon (Sadducean Aristocrat)
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// CASE EXPORT: triumphal_entry
// SOURCE: act1_case_2d.js → SUSPECT 'sadducee_noble' (Eleazar ben Simon)
// BIBLE REFERENCE: Acts 5:17 (Sadducean opposition context)
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 2:2
//     Gospel: Luke 22:66-71 — The Sanhedrin's conspiracy against Jesus
//     Insight: The psalmist foresaw the rulers of this earth taking counsel against the Lord and His anointed. Eleazar represents this opposition, using legal maneuvers to create a security threat.
//   - Isaiah 53:9
//     Gospel: Matthew 27:12-26 — Jesus's trial before the Sanhedrin
//     Insight: The suffering servant was to be 'numbered with the transgressors' and 'buried with the rich.' The Sadducean opposition played their part in fulfilling prophecy.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Eleazar ben Simon, a wealthy Sadducean aristocrat, witnessed the triumphal entry and filed a perjured deposition claiming the donkey was stolen. This created legal grounds for Roman intervention.
//   Insight: The deposition conflicts with physical evidence (the Shepherd's hitch knot was untied, not hacked). Eleazar's false testimony reveals the depth of opposition to Jesus's kingly claims.
// ------------------------------------------------------------
//

-> start
=== start ===
Look at the state of these streets. Palm branches, mud, and Galileans shouting enough to wake the Governor in Caesarea.
* [You seem displeased with the procession.] -> disdain
* [I'm investigating the missing donkey from Bethphage.] -> donkey_claim
=== disdain ===
Displeased? It's a security tinderbox! And the "King" they're following? He's riding a stolen animal.
* [Stolen? The owner says he lent it.] -> donkey_claim
=== donkey_claim ===
Lent it? Hah! I saw two rough-looking men hacking at the tether with rusted knives. They practically dragged the poor beast over the wall while the owner cried out.
* [The rope fibers don't show marks of hacking.] -> pressure
* [The owner had a scroll of Zechariah.] -> fanatical
=== pressure ===
The light was poor at dawn! But I heard the owner shouting for help!
* [The villager says he nodded and let them go.] -> exposed
=== fanatical ===
The owner is a dreamer. He probably thinks every bird that flies over his field is an angel. His testimony is worthless.
* [Continue.] -> pressure
=== exposed ===
Fine! The owner is a fool who gave his property away. But we cannot have people claiming royal titles unvetted. I told the guards it was theft to ensure they would intervene. Order is more important than your "truth."
-> closing
=== closing ===
I have a meeting at the Temple. Do not block my way.
-> DONE