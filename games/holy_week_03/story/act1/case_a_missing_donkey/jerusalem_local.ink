// ============================================================
// CHARACTER: Jemimah (Jerusalem Local)
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// CASE EXPORT: triumphal_entry
// SOURCE: act1_case_2d.js → NPC 'local_skeptic'
// BIBLE REFERENCE: Matthew 21:10-11
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Zechariah 9:9
//     Gospel: Matthew 21:4–5; John 12:14–15
//     Insight: The donkey was not a practical choice — Roman rulers rode horses. The donkey was a deliberate symbol of peace and humility, contrasted with ...
//   - Psalm 118:25–26
//     Gospel: Matthew 21:9; Mark 11:9–10
//     Insight: 'Hosanna' is the Greek transliteration of the Hebrew 'Hoshana' — a cry for salvation, not merely praise. The crowd was quoting this Psalm as...
//   - Genesis 49:10–11
//     Gospel: Matthew 21:1–9
//     Insight: Jacob's blessing over Judah, over 1,400 years before the event, described a royal figure arriving on a donkey colt. Early Jewish readers int...
//   - Malachi 3:1
//     Gospel: Mark 11:11
//     Insight: The 'coming to the temple' link connects the triumphal entry with the Temple cleansing the following day — two acts that together announced ...
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Nisan 10 (Palm Sunday), Jesus sent two disciples ahead to Bethphage to collect a donkey colt that had never been ridden. This was no coincidence — it was the precise fulfilment of a 500-year-old prophecy from Zecharia...
//   Historicalnote: Bethphage was a small priestly village on the Mount of Olives, roughly 1km from Jerusalem. It sat on the boundary of Jerusalem's sacred precincts. Jesus's knowledge of where the donkey was — and the pre-arranged answer f...
//   Significance: The triumphal entry deliberately echoed how King Solomon entered Jerusalem for his coronation (1 Kings 1:33–35), riding on a donkey down the Mount of Olives. Every Jewish bystander would have understood the royal claim b...
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no crime. The donkey was lent willingly by a sympathetic owner who recognised the fulfilment of Zechariah 9:9. The disciples had been given authorised access by Jesus, who foreknew the entire situation.
//   method: Jesus gave His disciples precise instructions, including a pre-arranged phrase ('The Lord needs it') that would signal the owner to release the colt. The colt — which had never been ridden, meeting the Jewish requirement...
// ============================================================
//

-> start
=== start ===
The whole city is in an uproar because of these country pilgrims. They're tracking mud everywhere and throwing their clothes in the middle of the road!
* [Who do you think this Galilean is?] -> who_is_he
* [The crowds are very devoted.] -> crowd_reaction
=== who_is_he ===
Everyone is yelling "Hosanna" like the Romans aren't watching from the Antonia tower. This Galilean teacher — who does He think He is? David? Nothing good comes from Nazareth, I'll tell you that much.
* [You think this is dangerous?] -> danger_path
* [At least people have hope.] -> closing
=== crowd_reaction ===
People were hacking palm branches off the trees out toward Jericho and dragging them all the way up the path. It's a miracle someone wasn't blinded by them. And the cloaks — whose garments are those? Left right in the dirt! They were laying thier clocks on the ground. Welocmeing the kinginto the city. This was a man who had raised a man from the dead. Who as ever done such a thing before!
* [That seems disrespectful.] -> closing
* [Maybe it's intentional.] -> who_is_he
=== danger_path ===
Look, I just want to buy my grain without a mob blocking the eastern valley gate. They're calling Him a prophet, but prophets don't usually ride into town with an unauthorised parade. The noise was deafening. If the crowd doesn't calm down, the Roman garrison will come down from the walls to quiet us themselves.
* [So the Pharisees do have reason to worry.] -> closing
=== closing ===
Go ask the pilgrims with the green hands. I have work to do. The Passover crowds always bring trouble — this year just seems worse than usual.
-> DONE
