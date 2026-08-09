// ============================================================
// CHARACTER: Caiaphas — High Priest
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: roman_inquiry
// SOURCE: NPC 'caiaphas' / 'chief_priest'
// PURPOSE: Reveal Caiaphas managing the cover story after resurrection reports
// BACKGROUND: Three days after the crucifixion, the tomb guard unit returned to the
//   Sanhedrin in a state of terror, reporting something they could not file in any
//   Roman military record. Caiaphas orchestrated the bribe and authorized the
//   "sleeping disciples stole the body" narrative — a story he knew was false.
// BIBLE REFERENCE: Matthew 28:11–15
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   When the soldiers came to the chief priests reporting the earthquake, the angel,
//   and the empty tomb, Caiaphas convened the elders immediately. They distributed
//   a substantial bribe to the guards and promised to shield them from Pilate's
//   punishment if the cover story became public. Matthew notes the soldiers took the
//   money and spread the false report — and it was still circulating at his writing.
// ------------------------------------------------------------
// CASE FACTS:
//   culprit: caiaphas (with elders)
//   motive: Suppress resurrection evidence; protect the authority and verdict of the
//     Sanhedrin's trial; prevent mass defection from the Temple system
//   method: Bribery of the tomb guard; fabricated narrative; Pilate's complicity secured
// ============================================================

-> start
=== start ===
I will speak plainly, Scribe. The body is gone. The tomb is empty. The guard reported phenomena I will not repeat in official record. What I will say is this: the disciples came by night and stole Him while the soldiers slept. That is the statement.
* [A Roman guard sleeping on post faces execution.] -> execution_issue
* [You witnessed what the soldiers reported?] -> soldier_report
* [That narrative has obvious problems.] -> narrative_problems

=== execution_issue ===
Which is why we went directly to Pilate. He is a practical man. We assured him the soldiers' negligence would not reach the Emperor's ear. In return, the soldiers keep their story straight and their heads attached. Everyone benefits. This is how Judea functions.
* [Pilate agreed to suppress a military incident.] -> pilate_deal
* [That is institutional corruption.] -> corruption_charge

=== soldier_report ===
What the soldiers reported is not relevant to governance. Frightened men see things at night. The official record will reflect what the Sanhedrin determines, not what four terrified auxiliaries claim to have witnessed outside an empty sepulchre before dawn.
* [You are erasing eyewitness testimony.] -> erase_testimony
* [But the tomb is still empty.] -> empty_tomb

=== narrative_problems ===
Every narrative has problems. What you call obvious, I call manageable. The crowd wants a simple story. Grieving disciples, a stolen body, a deluded following. People who want to believe a resurrection will believe it. People who need order will take the official explanation. Both groups exist in large numbers. This is sufficient.
* [And the disciples themselves?] -> disciples_problem
* [What about the appearances reports?] -> appearances

=== pilate_deal ===
Pilate and I have a working relationship built on mutual necessity. He needs the Temple authorities to keep Passover pilgrimages peaceful. We need Roman tolerance to continue our judicial authority. This arrangement is nothing unusual. The Empire is built on exactly these accommodations.
* [You are protecting each other from the truth.] -> truth_buried
* [And the soldiers will stay silent?] -> soldiers_silence

=== corruption_charge ===
The institution functions, Scribe. That is what matters. A functional institution serves the people better than a transparent one that cannot maintain order. Every legal system makes compromises. The question is whether those compromises preserve the greater good.
* [Suppressing a resurrection is not a compromise.] -> truth_buried
* [The greater good has a dead innocent man in it.] -> wrong_man

=== erase_testimony ===
The testimony was erased at the moment the soldiers accepted the silver. They made their choice. Military men understand the cost of inconvenient truths. I simply provided them with a more survivable alternative.
* [You bought their silence.] -> silence_bought
* [Four men know what they saw.] -> four_men

=== empty_tomb ===
A tomb is always empty eventually. Stone, time, and human hands have disposed of more bodies than resurrection theology ever accounts for. The question is not what is in the tomb but what the public believes is in it.
* [You are betting the institution on a story that will collapse.] -> closing
* [The disciples believe He rose.] -> disciples_believe

=== disciples_problem ===
Frightened men who ran at the arrest, who slept through Gethsemane, who denied the man three times before cockcrow. Now they claim to have seen Him risen. Yes. Clearly a credible coalition.
* [Their fear became courage overnight.] -> courage_shift
* [Peter publicly preached the resurrection days later.] -> peter_preaching

=== appearances ===
Rumours. Collective grief. Wishful interpretation of broken sleep and survivor guilt. Hundreds of people claiming to have seen the risen man in the weeks after an execution is a grief response, not an event.
* [Five hundred people at once?] -> mass_appearance
* [Mary Magdalene first, then the disciples.] -> mary_first

=== truth_buried ===
No truth stays buried. I know that. I am not attempting to bury it forever. I am attempting to slow its spread long enough for the city to stabilise after Passover, for the Roman garrison to stand down, and for the institutional voice to regain credibility before this movement claims it entirely.
* [You will not succeed.] -> closing
* [The movement already has credibility you cannot match.] -> closing

=== soldiers_silence ===
A Roman soldier given large sums and a formal guarantee of Pilate's protection and a simple story to repeat has every incentive to stay silent. Only a man with a guilty conscience would speak. And we have ensured the soldiers' consciences are financially compensated.
* [Money does not silence what they actually saw.] -> four_men

=== wrong_man ===
I tried every procedure available. Jesus was given legal representation at council. Witnesses were called. The charge of blasphemy was adjudicated according to our law. What more do you want?
* [You tried Him in secret, at night, with paid witnesses.] -> closing
* [You condemned an innocent man.] -> closing

=== silence_bought ===
Everything has a price. The soldiers know the price of speaking. They know the price of silence. I simply made sure the silence was more valuable. That is administration. You could find it in every governor's ledger in the province.
* [Not every governor bribes guards to hide a resurrection.] -> closing

=== four_men ===
Four men who will be stationed in Caesarea within the month, separated, reassigned, and gradually forgotten. The story will outlast the soldiers. It always does.
* [The truth will outlast the story.] -> closing

=== disciples_believe ===
Let them. A small sect of Galilean fishermen and tax collectors announcing a resurrection in a city that just watched the crucifixion — that is not a threat. That is grief finding a narrative. It will fade by the next Passover.
* [It will not fade.] -> closing

=== courage_shift ===
Fear to courage in seventy-two hours after the death of their leader. That is not transformation — that is fabrication. Men who run from soldiers in gardens do not emerge three days later claiming divine mandate. Not without a story to protect themselves.
* [Or without a resurrection to explain it.] -> closing

=== peter_preaching ===
Peter is preaching in the same city where we executed his teacher. If that man had stolen a body and invented a resurrection, he would be in Galilee by now. He is not. He is in the Temple courts. I find that... inconvenient.
* [Then investigate what you cannot explain.] -> closing
* [The inconvenience is the point.] -> closing

=== mass_appearance ===
If five hundred people saw something that cannot be explained, that is a matter for the Sanhedrin to investigate, not for a scribe's inquiry. I will manage it through the proper channels when the city has calmed.
* [Those channels are the very ones that fabricated the story.] -> closing

=== mary_first ===
A woman's testimony. You know the weight our legal system places on that.
* [A woman whose testimony changed history.] -> closing

=== closing ===
The investigation is closed. The record stands. Whatever you believe in private about what occurred in that tomb, you will reflect the Sanhedrin's official position in everything you file. The alternative is not a record I would advise writing under your own name.
-> DONE
