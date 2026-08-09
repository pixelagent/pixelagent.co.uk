// ============================================================
// CHARACTER: Caiaphas — High Priest
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// SOURCE: NPC 'caiaphas' / 'chief_priest'
// PURPOSE: Reveal the Sanhedrin's emergency meeting following Lazarus's resurrection
// BACKGROUND: Joseph ben Caiaphas, High Priest since AD 18. Theologically Sadducean,
//   politically pragmatic. Faced with a resurrection miracle he cannot deny, he
//   concludes that one man must die to protect the nation — unknowingly prophecying.
// BIBLE REFERENCE: John 11:47–53; John 18:14
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   After Jesus raised Lazarus from the dead in Bethany, the Sanhedrin convened an
//   emergency session. Many Jews were defecting. The chief priests and Pharisees feared
//   Roman intervention if the movement escalated. Caiaphas cut through the debate with a
//   single blunt pronouncement: it was better for one man to die than for the whole nation
//   to perish. John notes he was unwittingly prophesying the atonement.
// ------------------------------------------------------------
// CASE FACTS:
//   culprit: caiaphas
//   motive: Political self-preservation under Roman occupation
//   method: Authorised assassination plot; moved to arrest Jesus before Passover crowd peaked
// ============================================================

-> start
=== start ===
I am Caiaphas. We called an emergency session of the council this morning. The raising of Lazarus in Bethany has spread through every pilgrim camp in the city. The crowds are out of control.
* [What exactly happened?] -> what_happened
* [What does the council intend to do?] -> council_plan

=== what_happened ===
Four days dead, sealed in a tomb, bound in burial linen — and then walking out at the command of this Galilean. I do not dismiss it. I cannot. Even our own sources in Bethany confirm it. That is exactly the problem.
* [You accept the miracle happened?] -> accept_miracle
* [Yet you still plan to stop Him.] -> stop_anyway

=== accept_miracle ===
Accepting it as fact does not change my position. If anything, it hardens it. A man who can reverse death commands the loyalty of every person in this city who has ever lost someone. You understand what that means for Rome? For us?
* [It means you lose control.] -> lose_control
* [So the miracle itself is the threat.] -> miracle_threat

=== council_plan ===
The council is divided between fear and argument. Some want to wait. Some want to question Him publicly. I ended that discussion. There is only one calculation that matters: if we let Him continue, the Romans come, and both our Temple and our nation are destroyed.
* [One man's life for the nation's survival.] -> utilitarian_logic
* [You have already decided He must die.] -> already_decided

=== stop_anyway ===
A man who can raise the dead poses a threat proportional to his power. We have built order in this city through Roman tolerance and our own authority. He erodes both with every miracle. He must be stopped before Passover crowds turn this into a revolution.
* [That sounds like murder dressed as policy.] -> murder_policy
* [What is your plan?] -> already_decided

=== lose_control ===
We have managed Judea by occupying the space between the people and Rome. We translate, we moderate, we contain. If the people crown this Galilean king, Rome will crush the city and there will be nothing left for anyone to manage. I am not the villain. I am the only adult in the room.
* [Even if the adult commits murder.] -> murder_policy
* [And if He truly is who the people think?] -> if_true

=== miracle_threat ===
Precisely. Lazarus is not a symbol — Lazarus is evidence. Living, breathing, recognizable evidence. As long as he walks around Bethany, our counter-narrative has no ground to stand on. We cannot argue against a man who was dead and is now serving dinner at Simon the Leper's house.
* [So you intend to kill Lazarus too.] -> lazarus_death
* [The truth will not be silenced by one death.] -> truth_unsilenced

=== utilitarian_logic ===
It is not cruelty. It is governance. You cannot preserve a community by sacrificing the community for the sake of one individual — however extraordinary that individual may be. Better one man than thousands.
* [You do not understand what you are saying.] -> unaware_prophecy
* [That logic would justify any execution.] -> justify_anything

=== already_decided ===
Since before this morning's council finished. The question was never whether — only when and how. We cannot move during the feast without causing a riot. But He will not leave Jerusalem without giving us an opportunity.
* [And if He does leave?] -> if_he_leaves
* [You are planning an assassination.] -> murder_policy

=== murder_policy ===
Call it what you like. I call it the preservation of the covenant community. Moses killed when necessary. The prophets endorsed judgment. A nation that cannot defend its own existence has no future to defend.
* [You invoke Moses to justify what Moses would condemn.] -> closing
* [History will not be kind to this decision.] -> closing

=== if_true ===
If He is the Messiah? Then we are living inside a moment I am not equipped to manage with the tools I have. But I am the High Priest. I have an institution, a city, and a people to protect. I will do what the office demands. I must.
* [And if the office demands the wrong thing?] -> closing

=== lazarus_death ===
We have discussed it. Yes. If Lazarus survives, his very existence is a sermon. Every Passover pilgrim who meets him will become a convert. We cannot allow that. The council will take the appropriate steps.
* [You would kill a man to suppress a miracle.] -> suppress_miracle

=== truth_unsilenced ===
One truth can be managed. Two truths — the healing and the raising — become a theology. A theology becomes a movement. A movement becomes an army. I have seen it with the Zealots. I am not watching it happen again in my city.
* [And yet here we are.] -> closing

=== unaware_prophecy ===
What do you mean?
* [You are saying more than you know.] -> closing

=== justify_anything ===
Every government that has ever existed has made that calculation. Rome makes it every day. We make it when we select who receives Temple patronage and who does not. I am not innovating. I am simply being honest about what all rulers already do in secret.
* [Honesty about sin is still sin.] -> closing

=== if_he_leaves ===
He will not leave. He came to Jerusalem for Passover with the full weight of that entry behind him — palm branches, cloaks in the road, the people calling him Son of David. A man who stages that kind of entrance has not come to leave quietly. He has come for something. And we will be there when He reaches for it.
* [Then you are both headed toward the same end.] -> closing

=== suppress_miracle ===
We are not suppressing a miracle. We are managing the civic consequences of an event that the population has misinterpreted. There is a difference.
* [There is no difference.] -> closing

=== closing ===
The council has made its decision. Whoever is found responsible for this investigation — whether scribe, spy, or sympathiser — would do well to remember which side of the Temple gate protects them.
-> DONE
