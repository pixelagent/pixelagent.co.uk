// ============================================================
// CHARACTER: Pontius Pilate — Roman Prefect
// ACT: Act III
// CASE: The Roman Interrogation / Barabbas Choice
// CASE ID: barabbas_choice
// SOURCE: NPC 'pontius_pilate'
// BIBLE REFERENCE: Matthew 27:11–26; Mark 15:1–15; John 18:28–19:16; Luke 23:1–25
// ------------------------------------------------------------
// PURPOSE: Pilate's account — the trial, the choice, the failure
// (Ink version of pontius_pilate_barabbas.json — condensed for branching play)
// ============================================================

-> start
=== start ===
I am Pontius Pilate, Prefect of Judea. The priests brought this Galilean before dawn. They accused Him of sedition, of claiming to be a king. I examined Him privately. He spoke of a kingdom not of this world. I found no Roman crime in Him. None. And then I sentenced Him anyway.
* [So why are you sentencing Him?] -> sentence
* [What does the crowd want?] -> crowd_wants

=== sentence ===
I am not the one sentencing Him. The crowd is. I offered them a choice under the Passover amnesty: Barabbas — a murderer, an insurrectionist — or this Galilean prophet. They chose Barabbas. They demanded crucifixion. I have been governor of difficult provinces. I have never seen anything like that crowd.
* [What about your wife's warning?] -> wife
* [You could have refused.] -> could_refuse

=== crowd_wants ===
The crowd wants blood. The priests have spent three days turning the Passover pilgrims against the man they were celebrating at the beginning of the week. The same crowd that spread cloaks on the road shouted "Crucify Him" five days later. Crowds are not the same thing twice.
* [You could have stopped it.] -> could_refuse
* [What did you do?] -> what_pilate_did

=== wife ===
My wife sent a note to the judgment seat while I was trying to find a legal exit. "Have nothing to do with that innocent man — I suffered greatly in a dream about Him last night." Even my household saw what I refused to act on. But a governor who takes instruction from dreams cannot govern.
* [You knew He was innocent.] -> knew_innocent
* [You chose politics over your wife's warning.] -> chose_politics

=== could_refuse ===
With what authority? My cohorts are in Caesarea. The Antonia fortress holds two cohorts at the feast — to manage a crowd this size, I would need a military confrontation that would reach Rome by the next ship. The priests had calculated their move. They made refusal more costly than compliance.
* [You made a political calculation.] -> political_calc
* [A coward's arithmetic.] -> political_calc

=== what_pilate_did ===
I offered Barabbas. When they chose Barabbas, I offered flogging as a lesser penalty. I brought Him out — the crown of thorns, the purple robe — and said "Behold the man." Hoping the sight of a beaten, mocked prisoner would satisfy them. It did not. They wanted the cross. I gave it to them.
* [You mocked Him to try to save Him.] -> paraded_him
* [And washed your hands.] -> hands

=== knew_innocent ===
I said so three times publicly: "I find no fault in this man." Three times. Then I washed my hands in front of the crowd and said "I am innocent of this man's blood." I am not sure which is worse — the man who kills from conviction or the man who kills while announcing his own innocence.
* [The hands do not wash.] -> hands
* [You failed the most basic test of the office.] -> closing

=== chose_politics ===
I chose the province. I chose my career. I chose the path that led away from a riot and toward a morning I could survive. Yes. I chose politics over justice over the weeping of my own wife in the next room. I know exactly what I chose.
* [Then own the decision.] -> closing

=== political_calc ===
Yes. One innocent man against the stability of Judea. The priests made sure the equation had only one answer, and they made sure I would be the one to sign the order. I lacked the courage to write a different equation. I know what that makes me.
* [What does it make you?] -> closing

=== paraded_him ===
I thought pity would work. I thought the crowd would see a broken man and decide the point had been made. They saw a threat and they screamed louder. By then the verdict was written. I had already decided. I just hadn't signed the order yet.
* [You had decided before you washed your hands.] -> hands

=== hands ===
I washed them in a basin in front of the crowd. A Jewish ritual — disavowing their verdict. They said, "His blood be on us and on our children." They did not care about my gesture. But the gesture mattered to me. It was the only protest I could make from behind the decision I had already made.
* [It was not enough.] -> closing
* [Nothing washes it.] -> closing

=== closing ===
Go. Write your reports. But know this for the record: I found no fault in Him. The choice was mine. The failure was mine. And the blood — whatever basin I fill — the blood is on my hands.
-> DONE
