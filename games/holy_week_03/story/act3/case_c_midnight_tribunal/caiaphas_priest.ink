// ============================================================
// CHARACTER: Pashhur (Temple Priest on Shift)
// ACT: Act III/IV
// CASE: The Curtain and the Cross
// CASE ID: sanhedrin_trial
// CASE EXPORT: crucifixion_det
// SOURCE: act3_case_2d.js → NPC 'temple_priest_pashhur'
// BIBLE" Matthew 21:42–46, Mark 12:10–12, and Luke 20:17–19.
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Joseph ben Caiaphas. I have served as High Priest since the eighteenth year of Tiberius. The Romans appointed me; I serve at their pleasure. The man from Galilee is testing everything that keeps this city from burning.
* [He claims authority over the Temple.] -> authority_challenge
* [The crowd follows Him everywhere.] -> crowd_threat
=== authority_challenge ===
We challenged Him this morning — formally. "By what authority do you do these things?" He answered with a question about John the Baptist. We couldn't respond without inciting the crowd or admitting John was a fraud and not a prophet. He trapped us completely.
* [You were outmanoeuvred.] -> exposed
=== crowd_threat ===
The Pharisees are panicking. They think the crowds are about to crown Him king. I look at the Antonia fortress and I see four legions that will flatten this city if there's any hint of sedition. One man's life is not worth Jerusalem distruction.
* [So you're protecting the city?] -> exposed
=== exposed ===
He answered the Herodians about the tax with one sentence: "Render to Caesar what is Caesar's, and to God what is God's." He split our coalition in half. The crowd went silent. We had nothing left.
* [That sounds brilliant.] -> parable_reveal
=== parable_reveal ===
He told parables about tenants murdering the landowner's son. Anyone schooled in Isaiah 5 recognised it immediately. He was quoting Scripture and pointing at us. The crowd understood. We understood. And then He asked us about the cornerstone stone from Psalm 118.
* [The builders rejected the stone.] -> closing
=== closing ===
He was fullillging the prophecy.
-> DONE
