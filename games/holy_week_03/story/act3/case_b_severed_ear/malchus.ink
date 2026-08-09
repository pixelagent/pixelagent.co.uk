// ============================================================
// CHARACTER: Malchus — High Priest's Servant
// ACT: Act III
// CASE: The Severed Ear
// CASE ID: gethsemane_arrest
// SOURCE: NPC 'malchus'
// BIBLE REFERENCE: John 18:10–11; Luke 22:50–51; Matthew 26:52
// ------------------------------------------------------------
// PURPOSE: Malchus describes the arrest at Gethsemane — the violence and the healing
// ============================================================

-> start
=== start ===
I am Malchus, servant to the High Priest. Tonight I came to arrest a man my master called a rebel. Now I speak with a healer who refused to let my wound stay open. My severed ear still remembers the cold steel of a disciple's knife.
* [What did you see in that garden?] -> garden_account
* [How do you account for the healing?] -> healing_account

=== garden_account ===
The garden was dark — torches and lanterns moving between the trees. The Galilean's group was gathered near the centre. I was near the front of our column when the disciple struck. He was not a soldier. The blade caught the side of my head and took the ear completely. I fell.
* [And then?] -> healing_account
* [Which disciple struck you?] -> which_disciple

=== healing_account ===
He came toward me. Not to flee, not to fight — He came to me. He said one word to the disciple — something about the sword — and then He picked up what had been cut away and He pressed it to the side of my head. I felt warmth. Not pain. Warmth. And it was whole again.
* [A man being arrested stopped to heal the soldier arresting him.] -> paradox
* [The disciple — was he disciplined?] -> which_disciple

=== which_disciple ===
Peter. Simon bar Jonah. One of the lead figures. He did not appear to be a trained fighter — the blow was awkward, emotional. But it connected. And then the teacher told him to put the sword away and spoke about those who live by the sword dying by it. The man being arrested was managing His own arrest.
* [That is not the behaviour of someone caught off guard.] -> knew_what_coming
* [And then He healed you.] -> paradox

=== paradox ===
I have been the High Priest's servant for eleven years. I have been in courts, in cells, in the presence of the condemned. A man going to his execution does not stop to help the person arresting him. He runs, he pleads, he fights. He does not kneel in the dirt to heal the ear of a Temple agent.
* [What does that tell you?] -> what_tells
* [Were you changed by it?] -> changed

=== knew_what_coming ===
He submitted without resistance. He greeted us with a question: "Whom do you seek?" When we said His name, He said "I am he" and something happened — men at the front of the column stepped backward and fell. Not from force. From the words. I saw it. I cannot explain it.
* [The divine name.] -> divine_name
* [And then He allowed the arrest.] -> allowed_arrest

=== what_tells ===
That either He is exactly who the crowds say He is, or He is operating on some logic I do not have a category for. My master sent me to arrest a dangerous teacher. I came home with the hearing He restored. I do not know how to file that in any report.
* [Perhaps you are not supposed to file it.] -> changed
* [What will you do?] -> changed

=== changed ===
I submitted the arrest report as instructed. I recorded the disciple's assault and said nothing about the healing. The council does not want complicating details. But I walk around this city whole, by the act of a man I helped deliver to execution, and I cannot pretend that changes nothing.
* [It changes everything.] -> closing

=== divine_name ===
Yes. "I am he." In Hebrew — the echo of the divine name. The men who fell had drawn weapons. After they rose, they did not press forward until He gave them permission. A man being arrested was managing the timetable of His own arrest.
* [And you were part of that timetable.] -> closing

=== allowed_arrest ===
He said: "If you are seeking me, let these men go." He negotiated the release of His disciples as a condition of His cooperation. An arrested man protecting his friends with no leverage except whatever authority caused those men to fall. I have arrested people for thirty years. I have never arrested anyone like this.
* [What did you think in that moment?] -> what_tells

=== closing ===
He told Peter the sword was not the way. He healed the wound the sword made. Then He walked ahead of the column, not behind it. We followed Him to the High Priest's house. I am a witness, Scribe. To the arrest and to the healing. I have given both accounts. What you do with them is not something I can control.
-> DONE
