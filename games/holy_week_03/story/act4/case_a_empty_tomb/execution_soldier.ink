// ============================================================
// CHARACTER: Marcus (Execution Soldier)
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE ID: resurrection
// CASE EXPORT: crucifixion_det
// SOURCE: act4_case_2d.js → NPC 'marcus'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Marcus. I was on duty. I have seen men die, but this day was unlike any other. Outside the city, on Golgotha, three crosses cast long shadows. One man in the center drew every eye — condemned, silent, yet commanding attention.

* [What happened first?] -> crucifixion_begins
* [How did the crowd behave?] -> crowd_behavior

=== crowd_behavior ===
Crowds are predictable.

Some came for justice.

Some came for entertainment.

Some simply followed everyone else.

The priests stood close enough to watch but far enough to avoid association. They mocked Him openly.

Passersby joined in. They pointed at the sign above His head and repeated the accusations from the trial.

Yet not everyone mocked.

A group of women remained nearby despite the danger. They wept openly.

A few men stood with them, saying very little.

As the hours passed, the crowd changed.

Mockery is easy in daylight.

Silence comes more naturally when the sky turns black.

* [The sky turned black?] -> darkness
* [What were the priests saying?] -> priests

=== priests ===
The chief priests seemed pleased at first.

They called out:

"He saved others; let Him save Himself."

They demanded a sign while standing beneath one.

When the darkness came, the shouting became less frequent.

By the time the earth began to shake, many had already started moving toward the city.

* [What happened when darkness fell?] -> darkness


=== crucifixion_begins ===
They brought Him forward.

The nails went through hands and feet.

I held the hammer; another held His arms. I had seen this before. Only this time, I noticed His calm. Not a struggle. Not a curse.

The robbers on either side jeered. One cursed. The other rebuked him and asked for mercy from this man in the middle.

* [What did the robbers say?] -> criminals
* [Did He respond?] -> words

=== criminals ===
One mocked: "If You are the Messiah, save Yourself and us."

The other said quietly: "Do you not fear God? We are punished rightly, but this man has done nothing wrong."

Even from my perch, I could see His eyes turn toward him.

* [What did He say?] -> words

=== words ===
He said nothing to the mocker.

He spoke to the penitent one: "Today you will be with Me in Paradise."

I did not understand how words so few could silence a man, calm a thief, and enrage priests all at once.

* [What about the soldiers?] -> vinegar

=== vinegar ===
Later, they offered Him sour wine.

He tasted it. He refused it at first, then drank.

Some soldiers joked about mercy. I did not. I held my spear ready.

When He cried out, "It is finished," I did not move. Then, as the others prepared for Him to be taken down, I thrust the spear into His side. Blood and water poured out.

Even hardened soldiers murmured.

* [What happened then?] -> darkness

=== darkness ===
The sky grew black. Midday, and yet the sun hid its face.

The ground shook. Stones cracked. The Temple curtain tore from top to bottom.

Even the priests fled to safe distance. A few, perhaps, wondered what they had done.

* [What did you record officially?] -> report

=== report ===
I reported: "Three men executed. Middle victim silent. Witnesses among criminals: one justified, one mocking. Darkness and earthquake observed. Curtain torn. Soldier used spear; blood and water observed."

I wrote it plainly. I do not interpret miracles. I note facts.

* [Anything else extraordinary?] -> extraordinary

=== extraordinary ===
The centurion near me fell to his knees. He said, "Surely this was the Son of God."

Some in the crowd wept. Some ran. The darkness lasted hours. The ground still trembled long after the crosses were removed.

I have never seen death wear such majesty.

* [Closing statement] -> closing

=== closing ===
I am Marcus. I held the hammer. I held the spear. I watched the sky go dark.

The man on the center cross commanded the attention of all — criminals, soldiers, priests, and the crowd alike.

I record only what I saw. What it means belongs to those who follow Him.

-> DONE
