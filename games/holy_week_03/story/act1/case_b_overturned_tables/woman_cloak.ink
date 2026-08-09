// ============================================================
// CHARACTER: The Woman with the Issue of Blood
// ACT: Act II
// CASE: The Healing in the Crowd
// CASE ID: temple_cleansing
// SOURCE: js/act1_case.js -> NPC 'woman_cloak' (Devout Follower)
// BIBLE REFERENCE: Matthew 9:20-22; Mark 5:25-34; Luke 8:43-48
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 43:18-19
//     Gospel: "The woman... was healed in that instant"
//     Insight: Jesus declared His identity as the Creator who makes all things new, turning the bitter waters of suffering into healing streams.
//   - Jeremiah 30:17
//     Gospel: Physical healing from chronic affliction
//     Insight: The restoration of health itself was foretold as a sign of future redemption.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: A woman suffering from chronic bleeding for twelve years touched Jesus's cloak in faith. Her condition made her ritually unclean, yet she pushed through the crowd hoping to remain unseen.
//   Historical Note: She spent all she had on physicians and grew worse, until she heard reports of this Teacher's healings.
//   Significance: Her faith in touching even the hem of His garment was rewarded with complete restoration.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: bloodline ritual uncleanness (isolated by Levitical law)
//   motive: Desperation after twelve years of suffering
//   method: Pushing through the crowd to touch the hem of His cloak
// ============================================================

-> start
=== start ===
I had bled for twelve years. Not a woman's course, but a constant, wasting flow that made me an outcast. I heard He was passing through the crowd, and I thought — if I could just touch the hem of His garment...
* [You touched His cloak?] -> touch
* [What happened when you did?] -> healing

=== healing ===
TBC
* [Were you afraid?] -> afraid

=== touch ===
I pushed through men with their eyes fixed ahead, not caring who brushed against them. My fingers found the fringe of His tallit — the blue cord woven through the corner. I scarcely made contact when I felt the flow stop. Not slow, not easing... but stopping. Like a spring dammed in an instant.
* [Did He know?] -> jesus_feels
* [Were you afraid?] -> afraid

=== afraid ===
Of course I trembled! To be touched by a woman in public — the crowd would have stoned me. But He turned. His eyes found mine through that sea of faces. Not with anger, but... recognition. As if He had been waiting for me.
* [What did He say?] -> jesus_feels

=== jesus_feels ===
'Who touched Me?' He asked — not harshly, but clearly. His disciples looked around bewildered. 'Why ask?' they said. 'All touch You, and the crowd presses in.' But He insisted. Then His gaze landed on me.
* [What happened next?] -> confession

=== confession ===
I fell at His feet, quaking. I told Him the truth — all of it. The physicians, the expenses, the growing worse. And how in that single moment of touching His garment, I felt the power go out from Him. I was healed. Completely.
* [What did He say to you?] -> grace

=== grace ===
He didn't rebuke me. He called me 'daughter.' As if I were clean. As if I were whole. 'Your faith has healed you,' He said. 'Go in peace.' And I felt what I had not felt in twelve years — truly whole. Not just the bleeding stopped, but my very soul.
* [Continue.] -> closing

=== closing ===
I am no one remarkable. Just a woman who touched a thread of His cloak. Yet He stopped for me. He saw me. If He notices a broken woman in a crowd of thousands, what might He do for those who seek Him openly?
-> DONE
