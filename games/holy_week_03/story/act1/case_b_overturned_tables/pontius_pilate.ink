// ============================================================
// CHARACTER: Pontius Pilate (and the warning of Claudia Procula)
// ACT: Act IV
// CASE: The Imperial Legality
// CASE ID: roman_trial
// SOURCE: js/act1_case.js -> NPC 'pontius_pilate' (Roman Prefect)
// BIBLE REFERENCE: Matthew 27:11-26; John 18:28-40
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 53:7
//     Gospel: Matthew 27:12-14
//     Insight: The silence of the prisoner before his accusers unnerved Pilate, fulfilling the description of the Lamb led to slaughter.
// ============================================================
//

-> start
=== start ===
Am I an expert in your laws, Judean? Your priests drag this man to my praetorium at dawn and expect me to sign a death warrant for words. But the disturbance is not only in the streets; it has entered my own sleeping chambers. 
* [Your wife sent a message?] -> wifes_warning
* [You don't see Him as a threat?] -> threat
* [The crowd wants Barabbas.] -> barabbas

=== wifes_warning ===
She is a Roman of noble blood, not given to the superstitions of this province. Yet she sent a frantic note to the judgement seat: 'Have nothing to do with that righteous man.' She has suffered a great deal in a dream today because of him. She sees a guilt in this room that my ledgers cannot account for.
* [Does her dream worry you?] -> truth_question

=== truth_question ===
What is truth to a man holding three legions? I asked him the same. He spoke of a kingdom not of this world. My wife sees a righteous man; the Sanhedrin sees a rebel. I see a man who makes the silence heavier than a shield wall.
* [But you will execute Him.] -> crowd_response

=== threat ===
What is truth to a man holding three legions? A man who heals the blind and raises the dead is not a military threat. He is a philosophical problem. And Rome does not execute philosophers.
* [But you will execute Him.] -> crowd_response
=== barabbas ===
The crowd wants Barabbas — an actual murderer. Give them what they want. It satisfies the feast custom, and it gets this theological dispute off my docket.
* [You are washing your hands.] -> crowd_response
=== crowd_response ===
Mobs are volatile. Give them Barabbas if they want a thief. I will wash my hands of this local dispute. The sentence stands.
* [And the inscription on the cross?] -> writing
=== writing ===
"Jesus of Nazareth, King of the Jews." That is the titulus I authorised — in Latin, Greek, and Hebrew for every traveller on the road to read. The priests complained. I told them: what is written, is written. The Prefect does not take edits from the Sanhedrin.
* [That is defiance.] -> closing
=== closing ===
I have no further comments for your investigation. The matter is concluded.
-> DONE
