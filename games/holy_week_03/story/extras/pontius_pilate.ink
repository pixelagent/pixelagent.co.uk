// ============================================================
// CHARACTER: Pontius Pilate
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: js/act1_case.js -> NPC 'pontius_pilate' (Roman Prefect)
// ------------------------------------------------------------
// ============================================================
//
-> start
=== start ===
Am Am I an expert in your laws, Judean? Your priests drag this man to my praetorium at dawn and expect me to sign a death warrant for words.
They say he claims to be a king. If he is a king without an army, he is a fool. If he has an army, let him show his banners.
What is truth to a man holding three legions?
* [Does Roman law allow execution without clear sedition?] -> crime
* [The crowd outside is becoming violent...] -> pressure

=== crime ===
My duty is to ensure the peace. If executing an eccentric philosopher prevents a provincial rebellion, the choice is simple arithmetic.
-> closing

=== pressure ===
Mobs are volatile. Give them Barabbas if they want a thief. I will wash my hands of this local dispute.
-> closing

=== closing ===
-> DONE