// ============================================================
// CHARACTER: Chuza (Herod's Servant)
// ACT: Act III
// CASE: The Tetrarch's Court
// CASE ID: roman_inquiry
// SOURCE: js/act4_case.js -> NPC 'herods_servant' (Royal Household)
// BIBLE REFERENCE: Luke 23:6-12; Matthew 14:1-12; Luke 8:3
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 2:1-2
//     Gospel: Luke 23:12
//     Insight: Herod and Pilate, formerly enemies, became friends that day—the rulers of the earth banding together against the Anointed.
//   - Isaiah 53:7
//     Gospel: Luke 23:9
//     Insight: Jesus 'opened not his mouth' before Herod's questioning, fulfilling the prophecy of the silent Lamb.
// ------------------------------------------------------------
//

-> start
=== start ===
I have served in the house of Antipas long enough to know when the air turns sour. My master is a man haunted by ghosts. Ever since the business with the Baptist in the dungeon of Machaerus, he jumps at every shadow.
* [The Baptist's beheading?] -> baptist
* [He met the Nazarene?] -> jesus_meeting

=== baptist ===
A grim night. A dance, a drunken promise, and a head on a platter. Herod didn't want to do it—he feared the man—but he feared his guests more. Now he thinks Jesus is John come back from the grave to claim his own.
* [And when Jesus arrived?] -> jesus_meeting

=== jesus_meeting ===
They sent Him from Pilate like a gift. Herod was delighted. He wanted a miracle—a magic trick to entertain the court. He asked a hundred questions, shouting, demanding, pleading.
* [How did Jesus respond?] -> silence

=== silence ===
Silence. Absolute, crushing silence. The King of the Jews didn't say a word. He stood there in a royal robe they threw on Him for a joke, looking at Herod as if He were the judge and the Tetrarch the prisoner.
* [Herod didn't like that.] -> reaction

=== reaction ===
He mocked Him. The soldiers joined in. But beneath the laughter, I saw Herod's hands shaking. You don't mock a man who carries that kind of silence unless you are terrified of what He represents.
* [Continue.] -> closing

=== closing ===
My wife, Joanna, is out there somewhere following Him. She saw the healing power Herod so desperately wanted to consume for sport. I stay here, in a palace built on blood and regret, recording the end of an era. Go quickly—the guards are returning.
-> DONE