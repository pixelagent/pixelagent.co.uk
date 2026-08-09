// ============================================================
// CHARACTER: Barabbas — Revolutionary Prisoner
// ACT: Act III
// CASE: The Roman Interrogation
// CASE ID: barabbas_choice
// SOURCE: NPC 'barabbas_insurgent'
// PURPOSE: Barabbas just released — processing the exchange, confronting what it means
// BACKGROUND: Jesus Barabbas, known insurrectionist and murderer, was the prisoner
//   Pilate offered for Passover release. The crowd, incited by the chief priests, chose
//   him over Jesus of Nazareth. He walked free from the Praetorium as a stranger was
//   led to the cross in his place — a substitution Barabbas cannot ignore.
// BIBLE REFERENCE: Matthew 27:15–26; Mark 15:6–15; John 18:39–40; Luke 23:18–25
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   The Passover amnesty was a Roman political custom. Pilate offered the crowd a choice:
//   Jesus Barabbas (a revolutionary), or Jesus of Nazareth. The crowd, primed by the
//   chief priests, shouted for Barabbas. Pilate, finding no fault in Jesus, released
//   Barabbas and delivered Jesus to crucifixion. Barabbas was a murderer associated
//   with an insurrection (possibly the same one Judas of Galilee had led).
// ============================================================

-> start
=== start ===
I've been standing here for an hour. I should be moving — a free man in Jerusalem on Passover morning with every reason to disappear before the garrison changes shifts. But I can't make myself move yet.
* [Why not?] -> why_not
* [You know what just happened.] -> know_what

=== why_not ===
Because the man they took instead of me is on a hill outside the city wall, and I put him there. Not with my own hands — with a crowd's voice and a governor's weakness. But I put him there.
* [You didn't ask to be released.] -> didnt_ask
* [You are free. He is dying.] -> he_is_dying

=== know_what ===
I know exactly what happened. I've been in that cell long enough to understand Roman process. The Passover amnesty. One prisoner released by crowd vote. They put my name against a teacher from Galilee and the crowd voted my life back to me. I do not know why.
* [The chief priests pushed the crowd.] -> chief_priests
* [Did you know the other man?] -> know_the_man

=== didnt_ask ===
No. I never asked. I was sitting in that cell calculating how long before they ran out of legal reasons to keep me alive. It was not a comfortable calculation. Then the guard came and said my name had been called. I thought they meant for execution.
* [Instead you walked out.] -> walked_out
* [What did you think when you saw the crowd?] -> saw_crowd

=== he_is_dying ===
Yes. And I've killed men before. I've watched men die who I put in the ground myself. This is different. I cannot explain why it is different. But the man going up that hill did not earn what I earned. He taught in the Temple and the crowd loved Him for it. I burned buildings and the crowd loved me for letting me go. That is not justice. That is not even politics. That is something I don't have a word for.
* [Substitution.] -> substitution
* [Why does it bother you?] -> why_bother

=== chief_priests ===
I heard it from the guards. Caiaphas's men worked the crowd the night before. The Galilean had supporters, but His support was scattered — pilgrims, fishermen, women. The priests know how to organize a crowd. They chose me because I am exactly what they needed: someone the Galilean's followers would not shout for.
* [They used you as a tool.] -> used_as_tool
* [And the governor agreed.] -> pilate_decision

=== know_the_man ===
By reputation. He drove the merchants out of the Temple courts. That took nerve, even for a Zealot. He healed people in public with no payment. The Sanhedrin was afraid of Him. That alone told me He was doing something right.
* [But you never met Him.] -> never_met
* [You respected Him.] -> respected

=== walked_out ===
Into the light, past the crowd, past Pilate standing there washing his hands in a bowl — I remember thinking that was strange. A governor washing his hands publicly. I walked through the gate and I turned around and I saw them bringing Him forward with the crown they had put on Him. And I understood immediately what the exchange was.
* [What did you understand?] -> understood

=== saw_crowd ===
They were shouting my name. People I did not know, in the voice people use for heroes. I killed a man in an alleyway during a street brawl over a tax dispute. I am not a hero. The crowd made me one in ten minutes because the priests needed my name to clear the board. I did not deserve that crowd.
* [And the man who did deserve it...] -> he_is_dying

=== substitution ===
I know that word. Theologically. The Passover lamb. The sacrifice that stands in the place of the one under judgment. I have been in enough courts to understand legal substitution — one penalty paid by a party who did not accrue it. I understand it in law. I understand it in Leviticus. I do not understand it when it has my name on it.
* [Then you understand more than you think.] -> deeper_meaning
* [An innocent man took your place.] -> innocent_exchange

=== why_bother ===
Because I owe him a debt I cannot repay. He is going to die on the Roman cross with my charges above his head — and I have not met him. I do not know if he knows my name. I do not know if this was an accident of Roman politics or something else entirely. But I owe him.
* [What will you do with the debt?] -> what_do
* [Something else entirely, you said.] -> something_else

=== used_as_tool ===
Yes. Caiaphas needed a name the crowd would choose to get rid of the Galilean. My name was convenient. I am a man who has spent his whole life being used as a tool by men who had more patience and less courage than me. Today was no different. Except this time, being the tool set me free and crucified someone else.
* [That changes the meaning of being a tool.] -> substitution

=== pilate_decision ===
Pilate found no fault in Him. He said so three times according to the soldiers. He offered Herod. He offered flogging as a lesser punishment. He offered the amnesty. He did everything except the one thing that mattered — he said no. He washed his hands instead. A governor who washes his hands is still a governor who decided.
* [And then there was you.] -> innocent_exchange

=== never_met ===
No. I know Him only by what He did and what the guards said about the night trial. They brought Him to the Praetorium before dawn, after a council session at the High Priest's house that they held in the dark. I was awake in the cell. I heard them bringing Him through. I did not see His face.
* [But His face replaced yours this morning.] -> innocent_exchange

=== respected ===
I respected anyone who frightened the Sanhedrin. In my business you learn quickly who the real power is by watching who makes the priests nervous. He made them nervous from the moment He arrived in this city. A man who can do that with parables and healings — yes, I respected Him. I just didn't expect to be walking out while He walked in.
* [To take your place.] -> innocent_exchange

=== understood ===
I understood that I was looking at the man who was going to die because the crowd chose me over him. I understood that this was not random. The priests had built this particular moment with precision. I was the instrument. He was the target. And the man who could have stopped it was standing there with wet hands and an expression I have only ever seen on men who know they have just made the worst decision of their lives.
* [What did you feel?] -> why_bother

=== deeper_meaning ===
Are you saying the man dying up there knew what He was doing? That this exchange was not a accident of Roman politics but something... intended?
* [What do you think?] -> what_do
* [He entered Jerusalem knowing it would come to this.] -> knowing_entry

=== innocent_exchange ===
An innocent man took my place. An innocent man is dying on a Roman cross with charges written for my crimes. I do not know what to do with that. I have seen injustice before. But injustice usually goes the other direction — the innocent man is forgotten and the guilty man escapes without acknowledgement. This is reversed. And the reversal has my name inside it.
* [What will you do with that?] -> what_do

=== something_else ===
The earthquake was felt in the city an hour ago. Then the darkness before it. I have been outside too long now. But I keep looking at that hill and I keep thinking: this was not arranged by Caiaphas. Caiaphas thought he was arranging it. But something larger than Caiaphas was running this schedule.
* [What was running the schedule?] -> deeper_meaning

=== what_do ===
I don't know yet. I'm standing here instead of running, which means something. I am a violent man by profession and I am standing here with no blade in my hand for the first time in years, watching a man die in my place, and I feel like I am supposed to do something with the rest of the life I just got back. I just don't know what that is yet.
* [Perhaps find out who He was.] -> closing
* [The rest of your life is a gift you did not earn.] -> closing

=== knowing_entry ===
I heard the story of His entry three days ago. The palm branches, the crowd from Bethany. He came down the hill on a donkey's colt like a king who knew exactly what crown He was coming to claim. I thought it was bravado. Now I wonder if it was schedule.
* [A schedule that included your freedom.] -> innocent_exchange

=== closing ===
Tell me His name. His full name. I know everyone calls him the Galilean — but tell me His name. If a man died in my place, I want to know his name before I walk out of this city.
-> DONE
