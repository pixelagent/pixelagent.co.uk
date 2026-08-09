// ============================================================
// CHARACTER: Ananias (False Witness)
// ACT: Act III
// CASE: The Midnight Tribunal
// CASE ID: sanhedrin_trial
// SOURCE: NPC 'false_witness'
// BIBLE REFERENCE: Matthew 26:59–61; Mark 14:55–59; Deuteronomy 19:15–21
// ------------------------------------------------------------
// PURPOSE: Cross-examine the hired accuser at the Sanhedrin trial
// ============================================================

-> start
=== start ===
I heard him say it myself! "I will destroy this Temple and rebuild it in three days!" I was standing three cubits away. Both my colleague and I heard the same words.
* [He spoke of the Temple of His body.] -> body_clarification
* [Why did your story change between hearings?] -> story_changed

=== body_clarification ===
He spoke of stone and mortar! The Great Temple — the one behind us! A direct threat to the sacred institution. Caiaphas agrees with me. So does the second witness.
* [Your second witness gave a different version.] -> story_changed
* [Threatening the Temple carries a death sentence.] -> death_implications

=== story_changed ===
The room is noisy! It is difficult to keep every word perfectly straight under pressure. But the substance is the same — He is a threat to the Law. The High Priest has affirmed that.
* [The Law requires two witnesses with identical testimony.] -> law_requirement
* [You are improvising under cross-examination.] -> improvising

=== law_requirement ===
The High Priest has the authority to proceed on the spirit of the charge! The letter of the procedure—
* [The letter is the procedure. Without it you have no case.] -> exposed
* [Your testimony is legally invalid.] -> exposed

=== death_implications ===
A man who threatens Rome's most valued institution in this city during Passover is a threat to everyone. The High Priest is protecting the people.
* [By using testimony that does not align.] -> story_changed

=== improvising ===
I am stating what I heard! The acoustics of the outer courts are difficult. Perhaps I paraphrased. But the meaning was clear — He is dangerous.
* [Paraphrase is not testimony. Testimony is exact.] -> exposed
* [You were paid to be here.] -> payment_question

=== payment_question ===
I— that is a serious accusation. My presence here is voluntary, as a civic-minded member of—
* [Your presence was arranged through the Temple steward two days ago.] -> exposed

=== exposed ===
He is a blasphemer. That is all you need to record, Scribe. The High Priest knows the truth. Whatever procedural objections you raise, the council has already made its determination.
* [A determination built on contradicted testimony.] -> closing
* [The procedure is not an obstacle. It is the justice.] -> closing

=== closing ===
Write what you like. The verdict will not change. Caiaphas has spoken. He is a blasphemer. That is sufficient.
-> DONE
