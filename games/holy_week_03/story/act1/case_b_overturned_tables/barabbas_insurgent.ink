// ============================================================
// CHARACTER: Barabbas the Insurgent
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: barabbas_choice
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
(A heavy chain rattles against the stone floor of the lower cell as he laughs roughly.) The crowd wants an assassin, scribe! They do not want a teacher who tells them to love the legions. Rome only understands the edge of a curved blade, and the people out there know it. My hands are stained with Roman blood, and today, that makes me a hero.
* [You killed Romans?] -> kiling_record
* [Why do the priests want you released?] -> priest_deal
=== kiling_record ===
I killed seven. With my own hands. The governor put a price on my head three years ago. The Sicarii use my tactics. The Zealots bring me targets. Tonight, the High Priest needed a riot to force Pilate's signature on an execution — and I am the best riot money can buy.
* [And today's crowd chose you.] -> crowd_choice
=== priest_deal ===
The priests needed a crowd to demand a prisoner's release — any prisoner — to satisfy the mob and get their man executed. Barabbas the insurgent was already in their calculations before I arrived this morning.
* [So this was political theatre.] -> closing
=== crowd_choice ===
The crowd chose me. Not because I am innocent — because I am useful. The priests whispered in the right ears. The Galilean stood silent before Pilate while this city screamed for blood. I return to the hills. The knives are already sharpened.
* [And the Galilean goes to the hill of execution.] -> closing
=== closing ===
I go back to the hills. The Galilean goes to the hill of execution, and I return to the war. Let history decide who was useful.
-> DONE
