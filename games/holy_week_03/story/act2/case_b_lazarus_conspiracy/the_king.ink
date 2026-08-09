// ============================================================
// CHARACTER: Lazarus
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// CASE EXPORT: lazarus_plot
// SOURCE: Central Figure
// PURPOSE: To provide a firsthand account of being raised from the dead, and the subsequent threat to his life.
// BACKGROUND: Raised from the dead by Jesus after four days in the tomb, Lazarus is now a living miracle and a target of the Sanhedrin, who see him as dangerous evidence of Jesus's power.
// BIBLE REFERENCE: John 11:1-44; John 12:1-2, 9-11
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 25:8
//     Gospel: John 11:25
//     Insight: Lazarus’s revival was a tactical, localized preview of the ultimate cosmic victory over death that was about to occur on Easter morning.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Jesus's miracle of raising Lazarus from the dead galvanizes both faith in Him and a deadly plot against Him. The Sanhedrin, fearing a popular uprising and Roman retaliation, decides He must die.
//   Historicalnote: The event takes place in Bethany, a village near Jerusalem, just before Passover, ensuring maximum visibility and impact, which accelerates the conflict with the authorities.
//   Significance: This case demonstrates Jesus's identity as "the resurrection and the life" and exposes the moral and spiritual bankruptcy of the religious leaders who choose to murder rather than believe.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: caiaphas
//   motive: The high priests feared that the massive public following caused by Lazarus's resurrection would spark a Roman military crackdown, destroying their temple and nation.
//   method: Caiaphas and his inner circle bypassed standard judicial procedures to authorize a shadow assassination plot against Lazarus of Bethany, aiming to eliminate the physical evidence of Jesus's greatest miracle.
// ============================================================
//

-> start

=== start ===
I was gone. I remember the sickness, the darkness... and then, nothing. The next thing I remember is His voice. Just my name. 'Lazarus, come out.' And I did. Now I sit here, eating bread, and they say the High Priest wants me dead again.
* [What was it like? To be dead?] -> what_was_it_like
* [Are you afraid they will succeed?] -> are_you_afraid
* [Why do you think He did it?] -> why_he_did_it

=== what_was_it_like ===
It was... quiet. A deep, dreamless sleep. There was no pain, no memory. It is the waking that is the shock. To feel the sun again, to taste water, to hear my sisters weeping for joy. His voice... it reached where no other sound could.
-> closing

=== are_you_afraid ===
Afraid? I have already been through the worst that can happen to a man. They can take this body, but they cannot take the life He gave me. The one who called me from the tomb is sitting at my table. What is there to fear?
* [But they plot against Him, too.] -> plot_against_him

=== why_he_did_it ===
My sister Martha believed He was the one. My sister Mary knew it. He told Martha, 'I am the resurrection and the life.' I think... I think I was the proof. He did it so that all could see His words are true.
-> closing

=== plot_against_him ===
That is the only thing that frightens me. They hate me because I am the evidence. They hate Him because He is the truth. I would go back to the tomb a hundred times if it would keep Him safe.
-> closing

=== closing ===
I am a living man, and for that, they want to kill me. Make sense of that if you can. All I know is I was dead, and now I live because He called my name.
-> DONE