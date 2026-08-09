// ============================================================
// CHARACTER: Market Vendor
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: js/act1_case.js -> NPC 'market_rumors' (Street Merchant)
// ------------------------------------------------------------
// ============================================================
//
-> start
=== start ===
Good day! The market moves faster than news. People are saying strange things.
What draws you to my stall?
* [I am here for the news, not the figs.] -> start
* [What are people saying about the man?] -> rumours

=== rumours ===
* [What are people saying about the man?] -> closing

=== closing ===
-> DONE