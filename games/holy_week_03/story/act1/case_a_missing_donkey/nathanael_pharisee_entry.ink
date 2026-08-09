// ============================================================
// CHARACTER: Nathanael the Pharisee (Nathanael bar Caleb)
// ACT: Act I
// CASE: The Missing Donkey / Triumphal Entry
// CASE ID: triumphal_entry
// SOURCE: NPC 'pharisee' / nathanael_pharisee
// PURPOSE: Pharisee alarmed by crowds hailing Jesus as King at the Triumphal Entry
// BACKGROUND: A Pharisee who studied under established masters and later aligned with
//   the Herodians to trap Jesus on the census tax question. His primary concern at the
//   Triumphal Entry is the political volatility of the crowd's messianic language —
//   specifically the cry of "Hosanna" and the waving of palm branches, which carry
//   strong nationalist-political overtones in the Passover context.
// BIBLE REFERENCE: Matthew 21:15–16; John 12:19; Zechariah 9:9; Psalm 118:25–26
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   As Jesus entered Jerusalem on a donkey, vast crowds spread cloaks and branches,
//   crying "Hosanna to the Son of David!" The Pharisees told each other: "Look how the
//   whole world has gone after him!" Some asked Jesus to rebuke the disciples. He replied
//   that if they were silent, the very stones would cry out (Luke 19:39–40).
// ============================================================

-> start
=== start ===
I have watched this city receive prophets before. They come at Passover, they excite the crowds, they disappear. This one is different. The palm branches concern me more than the man himself.
* [Why the palm branches?] -> palm_branches
* [You know who He is.] -> know_who

=== palm_branches ===
The last time Jerusalem waved palms in the streets was when Simon Maccabaeus liberated the city from the Seleucids. The crowd knows exactly what they are invoking. This is not a greeting — it is a coronation gesture. And the man on the donkey is letting them do it.
* [So you see this as a political act.] -> political_act
* [Is He claiming to be king?] -> king_claim

=== know_who ===
I know He is a teacher from Galilee who has accumulated a following large enough to change the mood of Jerusalem in a single afternoon. Whether He is who the crowd claims He is — I am not prepared to answer that today. I am a Pharisee. I deal in evidence.
* [What evidence do you have?] -> evidence_question
* [The entry itself is evidence.] -> entry_evidence

=== political_act ===
Every symbol is a political act in this city at Passover. But yes — He is framing this entrance with deliberate precision. The donkey colt. The road from Bethany. The crowd from the city meeting pilgrims from the north. He could have arrived quietly by the north gate at dawn. He chose this road, this crowd, this hour.
* [He is fulfilling prophecy.] -> prophecy_fulfil
* [That kind of staging implies intention.] -> intention

=== king_claim ===
He has not spoken a word of self-proclamation. He has done something more dangerous — He has let the crowd proclaim for Him. If the Romans arrest a man for sedition, the charge is his words. But if the crowd does the talking, the charge spreads across ten thousand people simultaneously.
* [Clever.] -> clever_reframe
* [Or He cannot stop the crowd.] -> cannot_stop

=== evidence_question ===
The raising of Lazarus in Bethany is four days old. The city has been talking of nothing else since it reached the pilgrimage camps. I was sent to interview witnesses. Every account is consistent. Every location is specific. The detail is not the detail of fabricated story.
* [You think the resurrection of Lazarus is real.] -> lazarus_real
* [Consistent testimony does not prove a miracle.] -> consistent_testimony

=== entry_evidence ===
Yes. He is riding a colt that has never been ridden before. Any Pharisee schooled in Zechariah 9 hears that and recognises the image immediately: "Your king comes to you... humble and mounted on a donkey." He is not just entering Jerusalem. He is citing the Prophet in motion.
* [So you believe He is fulfilling prophecy.] -> prophecy_fulfil
* [Or He has read Zechariah and is staging it.] -> staged_entry

=== prophecy_fulfil ===
That is the question I have been arguing with myself since the road from Bethphage. Zechariah's prophecy is not obscure. Any child who sat through Sabbath reading knows it. Did He choose the donkey because He knows the prophecy — or because He is the subject of it?
* [Which conclusion do you reach?] -> conclusion
* [The two options are very different.] -> two_options

=== intention ===
Which means He is either the most calculating political strategist this city has seen since Herod, or He is operating on a different kind of authority entirely. Both possibilities unsettle me in different ways.
* [Which unsettles you more?] -> which_unsettles

=== clever_reframe ===
It is not clever if He is who the crowd believes He is. Clever is a word for men who manoeuvre within the existing system. If there is a different authority at work here, clever is entirely the wrong word.
* [You are edging toward belief.] -> edge_belief
* [What would convince you?] -> convincing_evidence

=== cannot_stop ===
I watched Him not trying to stop them. That is meaningful. A man who wishes to avoid the political implication silences the crowd or takes a different road. He came down this hill with full knowledge of what the crowd would do. The donkey was arranged in advance. Nothing about this arrival was accidental.
* [Deliberate prophecy fulfilment.] -> prophecy_fulfil

=== lazarus_real ===
The evidence I gathered suggests yes. That puts me in a position I did not expect to occupy this week. A Pharisee who believes in resurrection — our school accepts that doctrine. A Pharisee who believes in the specific resurrection of a named man by a specific individual... that is a different theological category entirely.
* [One that points in a dangerous direction.] -> dangerous_direction

=== consistent_testimony ===
No. But the absence of contradictions across twelve independent accounts, with no shared connection between witnesses, in a case involving four days of documented death — that is not fabrication. I have interrogated fabricated testimony for twenty years. I know its shape. This does not have that shape.
* [What shape does it have?] -> truth_shape

=== staged_entry ===
The staging argument requires Him to have arranged the colt in advance in a village He may not have visited in years. It requires Him to have cultivated a crowd large enough to flood the road from two directions simultaneously. And it requires the crowd, spontaneously, to invoke the exact psalm — Hosanna, Son of David — that the prophecy demands. Stagecraft breaks down at some point. This does not break down.
* [You are building a case for something you are not ready to say.] -> edge_belief

=== two_options ===
A scholar cites the Prophet to demonstrate learning. The subject of a prophecy fulfils it because it is true. The first possibility explains everything except the miracles. The second possibility explains everything including the miracles.
* [And you cannot dismiss the miracles.] -> lazarus_real

=== conclusion ===
I have not reached one. And I am a man who builds conclusions for a living. That absence is itself data.
* [You are closer to faith than you admit.] -> edge_belief
* [What will you do?] -> what_do

=== which_unsettles ===
The strategist unsettles me because it means He is exploiting a suffering people's hope for political leverage. The second authority unsettles me because it means I have spent my entire career studying a text that is being fulfilled in real time, and I nearly missed it because I was looking for the wrong shape of arrival.
* [What shape were you expecting?] -> expected_shape

=== edge_belief ===
I went to Nicodemus last night. I am not the only member of the council who has been asking these questions after dark. We are not yet ready to say it in public. But the entry this morning has made silence feel more dangerous than speech.
* [Then speak.] -> closing
* [What would change that?] -> closing

=== convincing_evidence ===
A miracle I witness personally, in daylight, with no crowd to distort perception and no prior loyalty to the result. I am aware that is a high bar. I am also aware that men who set high bars for truth sometimes find themselves on the wrong side of history when the truth arrives.
* [The entry is happening in daylight.] -> closing

=== dangerous_direction ===
Yes. A direction my training gave me every tool to evaluate and no permission to act on. The council has made its position clear. But the council has never had to debate a man who raised a body from a four-day tomb. We do not have a precedent for this.
* [Then perhaps you need a new framework.] -> closing

=== truth_shape ===
It has the shape of something that happened. Not something manufactured to be believed — something reported because it could not be kept quiet. There is a difference. Fabrication wants to convince. Truth simply states.
* [And this testimony simply states.] -> closing

=== expected_shape ===
Power. A general. A priest-king like the Maccabees. Someone who took the city, not someone who arrived on a borrowed donkey surrounded by Galilean fishermen. I expected Rome to be afraid. Rome is not afraid. But I am. And that is worth examining.
* [Fear is not always the wrong response.] -> closing

=== what_do ===
Watch. Record everything. Go home and open Zechariah again from the beginning. And pray that my fear means something I am not yet prepared to say out loud.
* [That is a beginning.] -> closing

=== closing ===
The Pharisees said among themselves, "Look how the whole world has gone after him." We said it as a lament. I wonder now if we said it more truly than we knew.
-> DONE
