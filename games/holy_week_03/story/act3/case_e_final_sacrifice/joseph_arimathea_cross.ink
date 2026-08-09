// ============================================================
// CHARACTER: Joseph of Arimathea — Secret Disciple
// ACT: Act III
// CASE: The Final Sacrifice
// CASE ID: crucifixion_site
// SOURCE: NPC 'joseph_arimathea'
// PURPOSE: Secret disciple at Golgotha — the moment of decision to act
// BACKGROUND: A wealthy and prominent Sanhedrin member who had voted against the
//   condemnation but was outnumbered. He watched the crucifixion from a distance
//   until the moment Jesus died — at which point he made a decision that would cost
//   him his position and possibly his life: he would go to Pilate personally.
// BIBLE REFERENCE: Mark 15:43–46; Luke 23:50–53; John 19:38–42; Isaiah 53:9
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Joseph had kept his discipleship secret because he feared the Sanhedrin (John 19:38).
//   After the death, he went boldly to Pilate and requested the body. This act made his
//   allegiance public and irreversible. He provided his own newly-cut tomb — fulfilling
//   Isaiah 53:9 ("with a rich man in his death"). Nicodemus assisted with the burial spices.
// ============================================================

-> start
=== start ===
I was there. I stood where the crowd was thinnest, on the east side of the hill, where the road curves away. I watched from the moment they raised the cross until the moment the sky changed.
* [Why were you there at all?] -> why_there
* [You are a Sanhedrin member.] -> sanhedrin_member

=== why_there ===
Because I believed in Him. Quietly, carefully, in secret — the way cowardice disguises itself as prudence. I had listened to every teaching I could manage without being seen listening. I voted against the condemnation. I was outnumbered and I said nothing public. Today I am paying the price of that silence in a different currency.
* [You watched the man you believed in die.] -> watching_die
* [You could have spoken at the trial.] -> spoken_at_trial

=== sanhedrin_member ===
A Sanhedrin member watching his teacher crucified by a decision he voted against and did not have the courage to contest openly. Yes. That is exactly what I am. Let the record note it clearly.
* [Why the secrecy until now?] -> secrecy_reason
* [What changed today?] -> what_changed

=== watching_die ===
I watched Him speak from the cross. He asked the Father to forgive the crowd. He spoke to a man dying beside Him — a criminal — with the same authority He used in every teaching. Even at the end, He was the Rabbi.
* [Did He see you?] -> eye_contact
* [What happened at the ninth hour?] -> darkness_sign

=== spoken_at_trial ===
I know. That question will follow me until I die. What could one vote have changed? The decision was made before the trial began. Caiaphas had built the consensus over weeks. My dissent was noted in the record and dismissed. It was not courage I lacked — it was enough votes.
* [You tell yourself that.] -> self_justification
* [What will you do now?] -> what_changed

=== secrecy_reason ===
Because a Sanhedrin member who is openly a follower of a Galilean teacher does not remain a Sanhedrin member. I convinced myself I was more useful inside the institution than martyred on its steps. Today I am no longer convinced.
* [What changed your mind?] -> what_changed

=== what_changed ===
He died at the ninth hour. The sky had been dark since noon. Then — and I will state this in any record you choose — the earth shook, stones split, and a report came from two of the younger priests on duty in the inner courts that the curtain in the Temple was torn. From top to bottom. By no human hand.
* [The curtain between the Holy Place and the Most Holy.] -> curtain_meaning
* [You believe these reports?] -> believe_reports

=== eye_contact ===
Once. When they lifted the cross into position and He scanned the crowd. I do not know if He saw me specifically. But the look He gave the whole crowd — there was no accusation in it. Only grief. And something that looked like love.
* [A man being executed for love.] -> curtain_meaning
* [Then what?] -> darkness_sign

=== darkness_sign ===
At the sixth hour the sky darkened. Not a cloud — a darkness that had no ordinary explanation. It lasted three hours. The soldiers stopped speaking. Even the priests who had come to mock fell silent. When He gave up his spirit the earth moved. I had never felt the ground move in Jerusalem. I felt it then.
* [The curtain tore.] -> curtain_meaning
* [And then you decided.] -> decision

=== self_justification ===
Every coward has a justification. Mine was more architecturally detailed than most. But yes — that is what it is. I had the wealth, the access, the standing. What I did not have was the willingness to spend them.
* [Until now.] -> decision

=== curtain_meaning ===
Sixty feet of double-woven fabric, as thick as a man's fist. Hanging from floor to ceiling in the most restricted chamber in the known world. Torn from the ceiling downward — the direction no human arm could begin. That curtain was not an accident. It was the end of a system.
* [You intend to act on that.] -> decision

=== believe_reports ===
The priests who reported it were shaking. One of them — Pashhur, a man I know — could barely speak. He kept repeating that the air had changed inside the sanctuary. You can dismiss one frightened priest. You cannot dismiss all of them simultaneously, in an institution that has suppressed every unusual report for thirty years.
* [The evidence is accumulating.] -> decision

=== decision ===
I have asked my servant to prepare materials for burial. Before sunset — before the Sabbath — I will go to Pilate personally and request the body. I will use my name. My title. My tomb. And I will bury Him properly, with the honour the institution denied Him.
* [That will end your position on the council.] -> cost_of_decision
* [Nicodemus?] -> nicodemus_joining

=== cost_of_decision ===
I know exactly what it costs. I calculated it standing on that hill while the darkness lasted. If I had spoken sooner, the cost would have been smaller. But I did not speak sooner. This is the bill I owe. I will pay it.
* [Why tell me this at all?] -> why_tell

=== nicodemus_joining ===
He came to me during the darkness. He had already arranged the spices — myrrh and aloes, a hundred litras. He had made his decision before I made mine. We will do this together.
* [Two Sanhedrin members publicly burying Jesus.] -> cost_of_decision

=== why_tell ===
Because a decision made in secret has the weight of a secret. If I speak it aloud to a witness, I am bound to it. You are my witness, Scribe. Write what I have said and note the time. I am going to Pilate now.
* [Go. And go boldly.] -> closing
* [I will record it.] -> closing

=== closing ===
Isaiah wrote that the Servant would be with a rich man in his death. I read that passage a hundred times in my library and never imagined I would be the mechanism of its fulfilment. God has a severe sense of irony. And a longer memory than any of us.
-> DONE
