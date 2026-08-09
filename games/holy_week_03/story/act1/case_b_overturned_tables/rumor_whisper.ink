// ============================================================
// CHARACTER: Rumor Whisperer
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// SOURCE: ORPHAN FILE (not referenced in any case file)
// Healing of the blind man Gospel of John 9:1–12
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
(A nervous citizen glances sideways before leaning close.) Last Sabbath a man blind from birth walked out of the Pool of Bethesda and now says he sees. The Pharisees asked for details. He said, "I was blind. Now I can see." I will not say my name, but you should find him and ask.
* [Why are you telling me this?] -> nervous_tell
* [The Pharisees didn't believe him?] -> pharisee_response
=== nervous_tell ===
Jesus put mud of his eyes and when it came off he could see.Because what happened at that pool was not natural. The man had been blind since birth — the disciples themselves had asked Jesus about him once. Now he's seeing. The Pharisees want the story buried.
* [What did they do?] -> pharisee_response
=== pharisee_response ===
They questioned him closely. Not about the healing — about the voice. They wanted to know who spoke to him. He said "the man they call Jesus." They didn't like that answer. How was he healed? 
* [Talk to the blind man?] -> pharisee_response
* [How was he healed?] -> pharisee_response
=== blindman ===
(An older man stands near the pool. His eyes wander across the city as though he is seeing everything for the first time.)

"You've come to ask about what happened to me, haven't you? I understand. Everyone is asking."

"I was blind from birth. Not injured. Not sick and then healed. Blind from the day I was born. I knew the streets by touch and sound. I knew voices better than faces because I had never seen a face."

"That morning a man named Jesus approached. He spat on the ground, made mud, and spread it over my eyes. Then he told me, 'Go and wash in the Pool of Siloam.'"

"I did not understand why, but I obeyed."

"When I washed the mud away, light rushed in. Colors. Shapes. Faces. For the first time in my life I could see."

(The man pauses, looking around in wonder.)

"My neighbors scarcely recognized me. Some said, 'This is the man who used to beg.' Others said, 'No, he only looks like him.' I kept telling them, 'I am the man.'"

"They asked how it happened. I told them exactly what I have told you: Jesus put mud on my eyes, I washed, and now I see."

"The Pharisees questioned me afterward. They wanted explanations I could not give. They asked who Jesus was. I told them only what I knew."

(He shrugs.)

"I cannot explain the miracle. I only know this: I was blind. Now I can see."

[What happened after the Pharisees questioned you?] -> pharisee_after
[Where is Jesus now?] -> jesus_where
[Thank you for your testimony.] -> closing

=== pharisee_after ===
"They argued among themselves. Some said a man who heals cannot be a sinner. Others said no sinner could do such signs. They could not agree."

[Return] -> blindman

=== jesus_where ===
"I do not know where he is. When I first received my sight, he had already gone."

[Return] -> blindman
-> start

* [And then?] -> closing
=== closing ===
The conversation is over. Go in peace.
-> DONE
