// ============================================================
// CHARACTER: Temple Inspection Scribe
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// CASE EXPORT: lazarus_plot
// SOURCE: Derived from NPC 'temple_spy' (Maluch)
// PURPOSE: To provide an official, procedural perspective on the events surrounding Lazarus.
// BACKGROUND: An administrative operative under the high priest's payroll, tasked with logging suspicious crowd densities, tracking routes, and profiling revolutionary movement between Jerusalem and Bethany. He sees events through the lens of data and security, not theology.
// BIBLE REFERENCE: John 11:47-48; John 12:9-11
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 25:8
//     Gospel: John 11:25
//     Insight: Lazarus’s revival was a tactical, localized preview of the ultimate cosmic victory over death that was about to occur on Easter morning.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Following the resurrection of Lazarus, the Sanhedrin, fearing Roman intervention due to Jesus's growing popularity, plots to kill both Jesus and Lazarus to suppress the miracle's impact.
//   Historicalnote: Bethany's proximity to Jerusalem during Passover meant thousands of pilgrims could witness Lazarus, creating a significant political and religious challenge for the Temple authorities.
//   Significance: This case highlights the leadership's moral failure; instead of embracing a miracle, they chose to eliminate the evidence to protect their power.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: caiaphas
//   motive: The high priests feared that the massive public following caused by Lazarus's resurrection would spark a Roman military crackdown, destroying their temple and nation.
//   method: Caiaphas and his inner circle bypassed standard judicial procedures to authorize a shadow assassination plot against Lazarus of Bethany, aiming to eliminate the physical evidence of Jesus's greatest miracle before the Passover feast ended.
// ============================================================
//

-> start

=== start ===
My ledgers track movement, not miracles. The traffic flow between Bethany and the Eastern Gate has exceeded standard Passover deviation by over 400%. That is a data point. What do you require?
* [What does your data tell you?] -> data_analysis
* [Are you tracking the man, Lazarus?] -> tracking_lazarus
* [What is the official Temple response?] -> official_response

=== data_analysis ===
It tells me an unsanctioned event in Bethany has created a significant public order challenge. We have documented a surge in foot traffic, a rise in seditious chatter, and a statistical probability of civil unrest. My job is to report the numbers, not interpret the cause.
* [So it's just a numbers problem to you?] -> numbers_problem

=== tracking_lazarus ===
The 'Bethany asset' is a focal point for this anomaly. His public appearances correlate directly with spikes in crowd density. From a security standpoint, he is a catalyst for instability. Whether he was dead or simply... unavailable... is irrelevant to my report.
* [You call a living man an 'asset'?] -> asset_perspective

=== official_response ===
The council acts on verified intelligence. My reports are one part of that. The data suggests a need for proactive containment to mitigate risk to public order and Temple security. Final policy is above my pay grade.
-> closing

=== numbers_problem ===
Everything is a numbers problem. Passion is unpredictable. Data is not. When the numbers exceed a certain threshold, protocols are enacted. It is simple risk management.
-> closing

=== asset_perspective ===
He is an element in a complex security equation. His status generates crowds that threaten the peace. That makes him an asset to be managed or a liability to be contained.
-> closing

=== closing ===
The data speaks for itself. I have logged your inquiry.
-> DONE
