// ============================================================
// CHARACTER: Corrupt Animal Seller (Temple Market)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// CASE EXPORT: temple_cleansing
// SOURCE: Orphan file - new character for temple cleansing scene
// BIBLE REFERENCE: Mark 11:15-18; John 2:13-21
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Malachi 3:1-3
//     Gospel: Matthew 21:12 — Jesus purifies the Temple
//     Insight: Malachi prophesied the Messiah would come as a refiner's fire — purifying the Temple commerce was prophetic judgment.
//   - Isaiah 56:7
//     Gospel: Mark 11:17 — "My house shall be called a house of prayer for all nations"
//     Insight: The sacrificial animal sellers had blocked non-Jews from worship by monopolizing the Court of the Gentiles.
//   - Jeremiah 7:11
//     Gospel: Matthew 21:13 — "Have you not stolen the house of the Lord?"
//     Insight: The Temple had become a den of thieves through exploitative commerce.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: The temple courts were filled with sellers of doves, oxen, and sheep — animals that pilgrims needed for sacrifices. These merchants charged exorbitant prices and used dishonest weights.
//   Historical Note: The animals were required to be without blemish (Exodus 12:5), but corrupt sellers passed off diseased or disabled offerings as acceptable.
//   Significance: Jesus's anger was righteous — this commercialization excluded the poor and defiled God's house.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none (the sellers were performing a legitimate function, but greed corrupted their practices)
//   motive: The corruption of the Temple market represented the spiritual decay of the religious leadership.
// ------------------------------------------------------------

-> start
=== start ===
You think this is about birds and coins? Look around you! I provide what the Law requires — unblemished offerings for the pilgrims. Without me, how would a woman from Alexandria bring her dove?
* [Your scales are dishonest.] -> scales
* [The animals have blemishes.] -> blemish
=== scales ===
My scales are tested! The priests themselves have approved my weights. What — you think I would cheat the altar of God? The prices reflect the seasonal cost of transport from the hill country.
* [So you admit to high prices.] -> high_price
* [The buyer over there says you cheated him.] -> buyer_upset
=== blemish ===
Every animal has minor flaws — that's why they're sacrificial! The Law speaks of blemish, not perfection. A blind eye, a limp — these are acceptable offerings for the poor.
* [But not for the wealthy pilgrim.] -> closing
=== high_price ===
I have overhead! The temple tax on each animal, the cost of keeping them in the sacred precincts, the guards for security. I take my due — as any businessman would.
* [The Teacher calls this theft.] -> closing
=== buyer_upset ===
The woman complains? She brought coins of clay and expected premium lambs! I showed her what her money could afford — a dove, acceptable under the Law.
* [She says you shortchanged her.] -> closing
=== closing ===
Go in peace. Offer your sacrifice. Let those who manage God's house worry about the rest.
-> DONE