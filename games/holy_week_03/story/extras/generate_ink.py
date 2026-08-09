import os

story_dir = "/Users/nigelmorris/Documents/GitHub/Miracle Maker/tests/example_01/story"

if not os.path.exists(story_dir):
    os.makedirs(story_dir)

ink_contents = {}

# --- CASE B: BETHANY / LAZARUS CONSPIRACY NPCs ---

ink_contents["annas_patriarch.ink"] = """\
// ============================================================
// CHARACTER: Annas (High Priest Emeritus)
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'annas_patriarch'
// BACKGROUND: Former High Priest and patriarch of the family controlling the Temple. He views Jesus' miracles not as divine signs, but as political threats to the fragile peace with Rome.
// BIBLE REFERENCE: John 11:45-53; John 18:13-24
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 2:1-2
//     Insight: Annas embodies the conspiracy of rulers against the Lord's Anointed, prioritizing institutional stability over the manifest power of God.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: After the raising of Lazarus, the chief priests and Pharisees called a meeting of the Sanhedrin. They feared that Jesus' popularity would lead to Roman intervention.
//   Historical Note: The 'Price of Life' refers to the decision that it was 'expedient that one man should die for the people' to save the nation from Roman wrath.
//   Significance: This miracle was the catalyst for the final decision to execute Jesus, as it proved He could not be ignored or easily discredited.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: The Sanhedrin (Caiaphas/Annas)
//   motive: Political expediency and fear of Roman reprisal.
//   method: Issuing a secret decree to eliminate the witness (Lazarus) and arrest the Healer (Jesus) before the Passover crowds gathered.
// ============================================================

-> start
=== start ===
Governments are not built on passion, scribe. They are built on stone and historical continuity. I have watched procurators come and go, but the Temple remains. This Lazarus business is a theological contamination we cannot ignore. A man who stops being dead is a monument to a power we do not control.

* [Why bring him in at midnight instead of open day?] -> mechanics
* [Do you fear his popularity after the Bethany miracle?] -> popularity
* [What evidence did your spies gather at Simon's house?] -> evidence_request
* [Press: The 'Price of Life' decree was your idea.] -> pressure
* [Change angle: Nicodemus seems divided.] -> pivot

=== mechanics ===
Daylight belongs to the crowds. Silence allows for careful administrative evaluation. We needed a verdict on the Lazarus 'incident' before the city woke for Passover.

* [Press harder: Who sleeps while a miracle breathes?] -> pressure
* [Soften: I understand the need for order.] -> popularity

=== popularity ===
A crowd that shouts 'Hosanna' for a healer will shout something entirely different by Friday if the narrative shifts. Popularity is water. We simply redirected the flow.

* [Accept: You are redirecting history.] -> closing
* [Challenge: That makes you a manipulator.] -> exposed

=== evidence_request ===
My household reported that when the Galilean called him out, not a single witness called for the legions. They called for the priests. That tells me where authority truly lives.

* [Continue.] -> mechanics

=== pressure ===
Caiaphas said it was expedient. One man dies, the nation survives. We all understood the arithmetic. The 'Price of Life' was decided at sunset. We needed the tomb closed again.

* [Acknowledge: You voted for a second death.] -> closing
* [Challenge: History will judge this calculation.] -> exposed

=== pivot ===
Nicodemus likes to walk in the dark and ask about 'mercy.' He forgets that procedure is the shield of the weak. He is a seeker of signs; I am a guardian of the Law.

* [Continue.] -> pressure

=== exposed ===
You want the full truth? The evidence of the resurrection was undeniable. That is exactly why it was dangerous. A living miracle ruins a political consensus. We had to manufacture a contradiction before the truth burned the Temple down.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

ink_contents["martha_bethany.ink"] = """\
// ============================================================
// CHARACTER: Martha of Bethany
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'martha_bethany'
// BACKGROUND: A practical and devoted follower who witnessed the resurrection of her brother in Bethany. She now guards her household against growing Temple surveillance.
// BIBLE REFERENCE: John 11:17-44; Luke 10:38-42
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 26:19
//     Insight: 'Your dead will live, LORD; their bodies will rise.' Martha witnessed the literal fulfillment of the promise of resurrection power through Jesus.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Martha's brother Lazarus had been dead four days when Jesus arrived. Her profession of faith—'I know he will rise again in the resurrection at the last day'—was met with the revelation 'I am the resurrection and the life.'
//   Historical Note: Bethany was close enough to Jerusalem (about 2 miles) that word of the miracle reached the Sanhedrin almost immediately, sparking the final plot.
//   Significance: Martha's testimony provides the intimate family perspective on a miracle that terrified the religious establishment.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: The Sanhedrin (Caiaphas/Annas)
//   motive: Political expediency and fear of Roman reprisal.
//   method: Issuing a secret decree to eliminate the witness (Lazarus) and arrest the Healer (Jesus) before the Passover crowds gathered.
// ============================================================

-> start
=== start ===
The kitchen is full, the road is watched, and my brother is a target. I saw the stone roll away. I smelled the spices of burial on him as he walked out. I do not need a scribe to tell me what my own eyes have seen.

* [What was Lazarus like when he first came out?] -> the_miracle
* [Are the High Priest's spies watching this house?] -> spies
* [Press: Tell me about the 'Price of Life' decree.] -> pressure
* [Soften: You have carried a heavy burden.] -> comfort

=== the_miracle ===
He was wrapped in linen, blinking at the sun like a newborn. He didn't speak for an hour. He just looked at Jesus. There was a peace in the yard that the Temple guards could never understand.

* [Accept: It was a divine moment.] -> closing
* [Ask follow-up: What did the crowd do?] -> spies

=== spies ===
They sit at the edge of the olive grove. They think they are invisible, but I see them every time I draw water. They aren't looking for Jesus; they are looking for Lazarus. They want to bury the evidence.

* [Accept: You are protecting the proof.] -> closing
* [Challenge: Why not run?] -> pressure

=== pressure ===
They sent a scroll. A 'Secret Decree.' It said the presence of Lazarus was 'theological contamination.' That's a fancy way of saying they want my brother back in the ground.

* [Acknowledge: The conspiracy is real.] -> closing
* [Challenge: Will you testify?] -> exposed

=== comfort ===
I do what I must. Mary listens, I serve, and Lazarus lives. That is enough for today. But the shadows on the road are growing longer.

* [Move forward.] -> closing

=== exposed ===
I saw Nicodemus come here at midnight. He warned us. He said the vote in the Sanhedrin was already weighted. He risked his life to tell us to hide Lazarus. If a man like Nicodemus is afraid, we should all be.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

ink_contents["nicodemus_conflicted.ink"] = """\
// ============================================================
// CHARACTER: Nicodemus (The Pharisee)
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'nicodemus'
// BACKGROUND: A Pharisee and member of the Sanhedrin who seeks the truth in secret. He is torn between his position in the Council and his growing conviction that Jesus is from God.
// BIBLE REFERENCE: John 3:1-21; John 7:50-52; John 19:39
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Jeremiah 29:13
//     Insight: 'You will seek me and find me when you seek me with all your heart.' Nicodemus' nighttime search represents the honest seeker within a corrupt system.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Nicodemus first came to Jesus by night. Later, he attempted to defend Jesus' right to a fair hearing before the Sanhedrin, facing ridicule from his peers.
//   Historical Note: As a 'ruler of the Jews,' Nicodemus risked his entire social and political standing by associating with the Nazarene.
//   Significance: Nicodemus provides the 'insider' view of the Sanhedrin's deliberations and the growing legal conspiracy against Jesus.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: The Sanhedrin (Caiaphas/Annas)
//   motive: Political expediency and fear of Roman reprisal.
//   method: Issuing a secret decree to eliminate the witness (Lazarus) and arrest the Healer (Jesus) before the Passover crowds gathered.
// ============================================================

-> start
=== start ===
I prefer the shadows of the evening. The Sanhedrin is a bright, loud place where truth is often shouted down. I have been watching the Nazarene. I have spoken to him when the city was asleep. He doesn't speak like a revolutionary... he speaks like the Law itself.

* [Why did you go to him at night?] -> night_visit
* [What is the mood of the Council regarding Lazarus?] -> council_mood
* [Press: You are afraid to stand for him openly.] -> pressure
* [Probe: What is the 'Secret Decree'?] -> probe_decree

=== night_visit ===
Because I am a teacher of Israel, and I had questions that daylight could not answer. He told me I must be born again. I am still trying to understand what that means for a man of my age and standing.

* [Accept: It is a difficult teaching.] -> closing
* [Ask follow-up: Did he mention the Temple?] -> council_mood

=== council_mood ===
They are in a panic. Caiaphas sees only the Romans. Annas sees only power. The miracle at Bethany has forced their hand. They cannot argue with a man who was dead, so they intend to silence him.

* [Acknowledge: The conspiracy is deep.] -> closing
* [Challenge: You are part of that Council.] -> exposed

=== pressure ===
I am a coward, is that what you think? Perhaps. I have my position, my family, my reputation. But I have also seen the light in his eyes. I am trying to work from within, but the walls are closing in.

* [Acknowledge: You are in a difficult position.] -> closing
* [Challenge: At some point, you must choose.] -> exposed

=== probe_decree ===
The decree is a stain on our history. It targets Lazarus specifically. They want to eliminate the witness to the miracle before the Passover begins. I have seen the draft in Annas's study.

* [Move forward.] -> pressure

=== exposed ===
I was the one who leaked the location of the guards to Martha. I couldn't let them take him in the dark. I am a member of the Sanhedrin, yes, but I am first a seeker of the Truth. And the Truth is currently eating bread in Bethany.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

ink_contents["simon_leper.ink"] = """\
// ============================================================
// CHARACTER: Simon the Leper
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'simon_leper'
// BACKGROUND: Once an outcast, now a host. His house in Bethany became a refuge for Jesus and a place where the preparation for His burial began through Mary's anointing.
// BIBLE REFERENCE: Matthew 26:6-13; Mark 14:3-9
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 53:3-4
//     Insight: 'Surely he took up our pain and bore our suffering.' Simon's healing from leprosy is a direct manifestation of the Messiah's role as the Great Physician.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Six days before the Passover, Jesus arrived in Bethany. A dinner was given in His honor at the home of Simon the Leper. During the meal, Mary anointed Jesus' feet with expensive perfume.
//   Historical Note: Hosting a dinner for Jesus and Lazarus made Simon's house a focal point for Temple spies tracking the movement.
//   Significance: Simon represents those restored from the margins of society who offer hospitality to the King, contrasting with the hostility of the elites.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: The Sanhedrin (Caiaphas/Annas)
//   motive: Political expediency and fear of Roman reprisal.
//   method: Issuing a secret decree to eliminate the witness (Lazarus) and arrest the Healer (Jesus) before the Passover crowds gathered.
// ============================================================

-> start
=== start ===
My house was a place of exclusion once. Now, it is a place where the Son of God eats. The perfume Mary poured on him... the scent is still in the rafters. The disciples grumbled about the cost, but Jesus saw it as a preparation.

* [Why do the disciples grumble?] -> grumbling
* [What happened to your leprosy?] -> healing
* [Press: Was the High Priest's man here?] -> pressure
* [Probe: What did Jesus say about his burial?] -> probe_burial

=== grumbling ===
They think in coins. They see a year's wages spilled on the floor. They don't see that he is giving a life's worth of love in return. Judas was the loudest. He has a ledger where his heart should be.

* [Accept: Love cannot be measured in silver.] -> closing
* [Challenge: Judas has a point about the poor.] -> exposed

=== healing ===
He touched me. Nobody touches a leper. The Law says I am unclean, but his touch made the Law irrelevant. I am clean because he willed it. My house is his house now.

* [Continue.] -> grumbling

=== pressure ===
A man in a Temple robe came to the door yesterday. He didn't come to eat. He came to count the guests. He asked if Lazarus was here. I told him the King's table is open to all, but his eyes were cold.

* [Acknowledge: The Temple is monitoring you.] -> closing
* [Challenge: You should have turned him away.] -> exposed

=== probe_burial ===
He said she was anointing him for his burial. He said it so calmly, while we were all laughing and eating. It was as if he was already looking past the cross.

* [Move forward.] -> pressure

=== exposed ===
The Temple spy left a silver coin on the table. A bribe to tell them when Jesus leaves for the Garden. I threw it into the street. I have been clean long enough to know the smell of corruption.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

ink_contents["teaching_mount.ink"] = """\
// ============================================================
// CHARACTER: Teacher from the Mount
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'teaching_mount'
// BACKGROUND: A teacher from the Mount of Olives area who heard Jesus's direct teaching. They share wisdom from the gatherings.
// BIBLE REFERENCE: Matthew 5-7 (Sermon on the Mount)
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 118:22–23
//     Insight: The stone the builders rejected has become the cornerstone.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Jesus taught on the Mount of Olives, often using parables to challenge the religious status quo.
//   Historical Note: The Mount of Olives provided a natural amphitheater for large crowds.
//   Significance: These teachings established Jesus's authority over the Law.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: The Sanhedrin (Caiaphas/Annas)
//   motive: Political expediency and fear of Roman reprisal.
//   method: Issuing a secret decree to eliminate the witness (Lazarus) and arrest the Healer (Jesus) before the Passover crowds gathered.
// ============================================================

-> start
=== start ===
You walked up Mount Olivet. Most people approach Jerusalem and see only walls. He spoke in parables. People laughed, left, or argued. Then He asked the question.

* [What question?] -> question
* [The crowd's reaction?] -> crowd_reaction

=== question ===
He asked about the stone the builders rejected. The stone that becomes the cornerstone. The crowd was silent after that. Some looked confused. Some looked... afraid.

* [Afraid of what?] -> closing

=== crowd_reaction ===
People laughed, then left, or argued. The parables were not comfortable. They were mirrors. Each person saw themselves — and didn't always like what they saw.

* [And then?] -> closing

=== closing ===
He spoke as someone who owned the Law, not merely interpreted it. That was the most unsettling thing of all.
-> DONE
"""

# --- UTILITY TO WRITE ALL FILES ---
for filename, content in ink_contents.items():
    filepath = os.path.join(story_dir, filename)
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Generated: {filepath}")