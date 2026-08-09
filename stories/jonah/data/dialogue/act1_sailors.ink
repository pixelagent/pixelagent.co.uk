// act1_sailors.ink
// Compile with inklecate to data/dialogue/act1_sailors.json before shipping.
// -> npx inklecate -o data/dialogue/act1_sailors.json data/dialogue/act1_sailors.ink

-> storm_deck

=== storm_deck ===
The sailors cry out, each to his own god. The captain finds Jonah asleep below deck.
"What meanest thou, O sleeper? Arise, call upon thy God."
* [Stay silent]
    -> silent_response
* [Confess who you are]
    -> honest_response
* [Deflect]
    -> evasive_response

=== silent_response ===
Jonah says nothing. The storm answers for him.
-> lots_cast

=== honest_response ===
"I am an Hebrew; and I fear the Lord, the God of heaven, which hath made the sea and the dry land."
-> lots_cast

=== evasive_response ===
Jonah mutters something about the weather. No one believes him.
-> lots_cast

=== lots_cast ===
The lot falls on Jonah.
-> END
