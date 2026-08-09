// ============================================================
// CHARACTER: Malachi (Temple Money Changer)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: js/act1_case.js -> NPC 'money_changer' (Temple Money Changer)
// ------------------------------------------------------------
// ============================================================
//
-> start
=== start ===
Look at this mess! Ink spilled everywhere, ledgers torn, Tyrian shekels scattered into the filth!
We operate under a legal lease signed by the high priest himself. Our weights are fair, our rates are posted!
He calls this a den of thieves, but without us, no traveler could buy an unblemished sacrifice!
* [Why must it be Tyrian coinage specifically?] -> ritual
* [Where did the crowd go after the tables fell?] -> fallout

=== ritual ===
The Law forbids images of foreign kings in the inner house. Tyrian silver is pure—it has no emperor's face on it. It is logistics, not greed!
-> closing

=== fallout ===
They scattered toward the outer gates, singing like madmen. The priests are inside meeting right now. This will not stand.
-> closing

=== closing ===
-> DONE