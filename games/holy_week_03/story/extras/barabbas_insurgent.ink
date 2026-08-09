
// ============================================================
// CHARACTER: Barabbas
ACT: Act III
CASE: The People's Choice
CASE ID: barabbas_choice
SOURCE: js/act3_case.js -> NPC 'barabbas_insurgent' / 'barabbas_insurgent_trial' (Released Criminal)
// ------------------------------------------------------------
// ============================================================
//



-> start
=== start ===
(A heavy chain rattles against the stone floor of the lower cell as he laughs roughly.)
The crowd wants an assassin, scribe! They do not want a teacher who tells them to love the legions.
Rome only understands the edge of a curved blade, and the people out there know it. My hands are stained with Roman blood, and today, that makes me a hero.
* [Do you think the crowd truly chose you, or were they manipulated?] -> mob
* [What happens to the movement when you walk free?] -> freedom

=== mob ===
Who cares who pulled the strings? The bars are opening. The priests needed a riot to force Pilate's signature, and I am the best riot money can buy.
-> closing

=== freedom ===
I go back to the hills. The knives are already sharpened. The Galilean goes to the hill of execution, and I return to the war. Let history decide who was useful.
-> closing

=== closing ===
-> DONE