// ============================================================
// CHARACTER: Lucas the Sentry
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: roman_inquiry
// SOURCE: NPC 'sentry_lucas'
// BIBLE REFERENCE: Matthew 28:11–15; Matthew 27:62–66
// ------------------------------------------------------------
// PURPOSE: Guard who took the bribe — truth emerges under pressure
// ============================================================

-> start
=== start ===
We fell asleep. The night was long. The Galilean's disciples came during the darkness and stole the body while we slumbered. That is our authorized statement, and that is what I will repeat to anyone who asks.
* [A Roman guard sleeping on post faces execution.] -> execution_threat
* [Where did those coins in your locker come from?] -> bribe_question

=== execution_threat ===
Which is why the High Priest has given his personal word to Pilate that our unit will not face the standard military penalty. The Sanhedrin covers our negligence. In return, we keep the official story. This is how the province functions.
* [That sounds like a bribe.] -> bribe_question
* [Pilate agreed to that arrangement?] -> pilate_arrangement

=== bribe_question ===
That silver is a security stipend. A goodwill payment for our cooperation in maintaining public order. The chief priests counted it out to us directly in the Sanhedrin chamber. It has nothing to do with the body.
* [Then tell me what you actually saw.] -> pressure
* [How much was paid?] -> pressure

=== pilate_arrangement ===
Pilate and Caiaphas have a working relationship. The Sanhedrin keeps the crowds under control during Passover. Pilate keeps his cohorts out of the Temple courts. One guard unit's negligence is a small price for that arrangement to continue.
* [So you are protected.] -> pressure

=== pressure ===
I cannot give you anything beyond the authorized narrative. I have a unit to protect. Soldiers who talk outside the chain of command have short careers and shorter lives in this province.
* [The seal was shattered from inside, not pried. Nothing human did that.] -> truth
* [You were awake when it happened. All of you were.] -> truth

=== truth ===
We did not close our eyes! No human thief could have bypassed our array without drawing steel. The earth groaned — the ground shook with a force that knocked every man flat. Then a light, white like lightning but silent, and the stone moved as if it weighed nothing. We woke up paralyzed. When our sight returned, the tomb was empty. We ran straight to the Temple because Pilate would have nailed us to a timber for it.
* [So you witnessed the impossible.] -> closing
* [You ran to the priests before you reported to your commanding officer.] -> closing

=== closing ===
We witnessed something that has no place in a Roman military report. So the priests gave us a story that does. Call me a liar — but understand that I am a liar because the truth is more terrifying than any court martial I have ever faced.
-> DONE
