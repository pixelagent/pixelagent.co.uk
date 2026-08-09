// ============================================================
// CHARACTER: Pashhur — Temple Priest on Duty
// ACT: Act III
// CASE: The Final Sacrifice
// CASE ID: crucifixion_site
// SOURCE: NPC 'temple_priest_pashhur'
// PURPOSE: Witness to the tearing of the Temple veil at the moment of Jesus's death
// BACKGROUND: A serving priest who drew the lot to serve in the inner courts on the
//   Day of Preparation for Passover. He was present when the Temple veil — the enormous
//   curtain separating the Holy Place from the Most Holy — tore from top to bottom at
//   approximately the ninth hour, the moment Jesus died on Golgotha.
// BIBLE REFERENCE: Matthew 27:51; Mark 15:38; Luke 23:44–45; Hebrews 9:1–8; 10:19–20
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   The Temple veil was approximately 60 feet high, 30 feet wide, and several inches
//   thick. It was rewoven every year. It separated the inner sanctuary (accessible to
//   priests) from the Most Holy Place (accessible only to the High Priest, once a year,
//   on Yom Kippur). Its tearing was not a slow deterioration but an instantaneous split
//   from the top — a direction physically impossible for human hands.
//   The centurion who watched the crucifixion said: "Surely this was the Son of God."
//   The priests who witnessed the veil tearing had to decide what to say.
// ============================================================

-> start
=== start ===
I was serving in the inner courts when it happened. Third rotation of the day. The afternoon offerings. There was nothing unusual about the sky from where I stood — only the reports from outside that the hill had gone dark.
* [What did you see?] -> what_saw
* [Were you aware of the crucifixion?] -> aware_crucifixion

=== what_saw ===
At the ninth hour — the hour of the afternoon sacrifice — the whole building moved. Not the way the ground moves in the hills. The Temple has its own weight, its own presence. When it moved, every man in the courts felt it as something interior, not just structural.
* [The earthquake.] -> earthquake
* [Was there a sound?] -> the_sound

=== aware_crucifixion ===
Every priest on duty that morning knew. The Galilean had been condemned through the night and executed by the third hour. There had been debate in the service quarters about whether any of us should leave our posts to watch. We stayed. Attending the altar during Passover preparation is not optional.
* [So you were at your post when it happened.] -> what_saw
* [Did you know Jesus personally?] -> know_jesus

=== earthquake ===
The earthquake, yes. But that is not the primary thing I am telling you. The earthquake is a fact others will corroborate. What I am telling you is what I saw with my own eyes immediately after, while the trembling was still fading from the stones under my feet.
* [Tell me.] -> the_curtain

=== the_sound ===
Not a sound like fabric tears — not a ripping. More like the sound of the air changing. As if the room had been holding its breath for a thousand years and exhaled. Then I heard the other priests crying out from the direction of the veil.
* [The veil.] -> the_curtain

=== know_jesus ===
I heard Him teach in the outer courts twice. He quoted Isaiah 56 after He drove out the merchants — "My house shall be called a house of prayer for all nations." I knew the passage. Every priest knew it. Hearing it quoted by someone who then cleared the courts to make room for the words — that was not easy to dismiss.
* [So you were already uncertain.] -> already_uncertain
* [What happened at the ninth hour?] -> what_saw

=== the_curtain ===
The veil between the Holy Place and the Most Holy Place — sixty feet from floor to ceiling, woven so thick two horses could not pull it apart — tore from the top. Not from the bottom where a man could begin the cut. From the top. In one motion. The two panels fell to either side and the interior of the Most Holy Place was open for every priest in the complex to see.
* [What did you see inside?] -> inside
* [From top to bottom.] -> top_to_bottom

=== already_uncertain ===
I told myself that uncertainty was the scholar's privilege and the priest's professional hazard. Teachers come. Teachers argue. We manage the altar and let theology sort itself out over centuries. Then the centuries accelerated into one afternoon.
* [What happened at the ninth hour?] -> what_saw

=== inside ===
Empty. As it should be — we have no Ark since the Exile. But the room was not simply vacant. The air was different. A priest in the inner courts spends years learning the quality of the air near the holy objects. This was not the emptiness of an unused room. This was the emptiness of a presence that had departed.
* [The Shekinah.] -> shekinah
* [You believe something left.] -> presence_departed

=== top_to_bottom ===
No human could begin that cut at the top. The architects who built this complex took the height into account precisely because this curtain was never meant to be accessible. The motion was from above. Every priest who stood there knows it. And every priest who stood there has been instructed by the council to say nothing beyond the official incident report.
* [What does the official report say?] -> official_report
* [The council is suppressing your testimony.] -> suppressed

=== shekinah ===
The manifest presence of God in the Temple. Yes. That is the tradition. And yes — as a priest, what I felt in that moment was the absence of something that had been present since the dedication under Solomon. Three hundred years at most, before the Exile. And then gone again.
* [Gone to where?] -> gone_where
* [You believe this was God's act.] -> gods_act

=== presence_departed ===
A priest learns to distinguish the presence in a sacred space from simple vacancy. Every serving priest does. Some of us can feel it more precisely than others. What I felt in that room after the curtain fell was a departure. A finality. As if the purpose of this specific space had been fulfilled and was no longer needed.
* [No longer needed because access had been granted.] -> hebrews_insight
* [Fulfilled how?] -> gods_act

=== official_report ===
Structural instability. The earthquake caused stress fractures in the mounting points. A worn curtain under pressure. Age and seismic force. I wrote the report myself. I was instructed to write it. I wrote what I was told to write. And then I came here and I am telling you what I actually saw.
* [You are contradicting your own official testimony.] -> contradiction
* [Why?] -> why_speak

=== suppressed ===
The council cannot afford the implication. If the Temple veil tears at the moment a man condemned by the High Priest dies outside the city — the theological meaning is not obscure. It is catastrophic for the institution.
* [The access barrier between man and God was removed.] -> hebrews_insight
* [That is why you are speaking to me.] -> why_speak

=== gone_where ===
I have been asking that question since the ninth hour. Every scripture I know points in one direction. I am not prepared to say the full sentence yet. But I am no longer able to say it is not true.
* [The sentence is: the way to God was opened.] -> hebrews_insight

=== gods_act ===
What else? The measurement of that curtain was taken at the last reweaveing — sixty-two feet, two inches. No seismic event splits a curtain from the top in a clean bilateral tear. No seismic event chooses a sixty-foot textile and ignores the stone columns beside it. This was not geology. This was authorship.
* [Written from the top down, like a Torah scroll.] -> hebrews_insight
* [And now you must decide what to do with that.] -> why_speak

=== hebrews_insight ===
The High Priest enters the Most Holy Place once a year with blood, for his own sins and the people's. The Galilean entered it differently. Not once. Not with animal blood. And now the curtain is in two pieces on the floor of the sanctuary and the altar is still burning and I have absolutely no framework for what this afternoon has been.
* [Perhaps the framework is the point.] -> why_speak
* [The old framework ended at the ninth hour.] -> why_speak

=== contradiction ===
Yes. I wrote a false official report and I am telling you the truth. You can use whichever one serves your investigation. But you should know that every priest who stood in the inner courts this afternoon is doing exactly the same thing: filing the report they were told to file, and then spending their nights trying to reconcile it with what they saw.
* [Truth does not stay filed.] -> closing

=== why_speak ===
Because I am a priest. My function is to stand between the holy and the common and manage the access. The curtain was the architecture of that function. When it tore, the architecture changed. I cannot maintain the fiction of a structural fault when the stones under my feet know what happened here. Someone has to say it.
* [Then say it clearly.] -> closing

=== closing ===
The curtain tore. It tore from the top. At the exact hour of the afternoon sacrifice, at the exact moment a man outside the city who had driven merchants from these courts and quoted Isaiah about a house for all nations died on a Roman cross. I do not have a seismic explanation. I have only what I saw. And what I saw changed everything.
-> DONE
