import { formatIntro } from './utils.js';

// ============================================================
// ACT: Act III
// CASE: The Broken Cup
// CASE ID: last_supper
// CASE EXPORT: act3CaseA
// SOURCE: act3_case.js
//
// LOCATION:
//   Upper Room, Jerusalem
//
// DIFFICULTY:
//   3
//
// BACKGROUND:
//   On the evening of Nisan 14, Jesus and His disciples gathered
//   in a borrowed upper room to celebrate the Passover. During
//   the preparations, investigators discover a broken clay cup,
//   spilled wine, missing bread, and evidence that someone was
//   acting nervously before the meal began. What initially appears
//   to be sabotage or theft becomes the setting for one of the
//   most significant moments in biblical history: Jesus institutes
//   the Lord's Supper, announces the New Covenant in His blood,
//   identifies His betrayer, and reveals that every event unfolding
//   has already been foretold in Scripture. :contentReference[oaicite:0]{index=0}
//
// BIBLE REFERENCES:
//   Matthew 26:17–30
//   Mark 14:12–26
//   Luke 22:7–23
//   John 13
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
//   • Exodus 12:1–14
//     Jesus is the true Passover Lamb whose blood delivers God's
//     people from judgment.
//
//   • Jeremiah 31:31–34
//     Jesus inaugurates the promised New Covenant through the cup.
//
//   • Psalm 41:9
//     Judas, who shared bread with Jesus, betrays Him exactly as
//     foretold.
//
//   • Zechariah 11:12–13
//     Judas receives thirty pieces of silver, the price foretold
//     for the rejected Shepherd.
//
//   • Isaiah 53:12
//     Jesus is numbered with transgressors and intercedes for
//     sinners, even while sharing the meal with His betrayer.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
//   Summary:
//   During the Passover meal Jesus transforms the traditional
//   Seder into the institution of the Lord's Supper. The bread
//   represents His body, the cup His blood of the New Covenant,
//   and Judas's betrayal is revealed as part of God's redemptive
//   plan rather than an unexpected tragedy.
//
//   Historical Context:
//   Passover commemorated Israel's deliverance from Egypt through
//   the blood of the lamb. The upper room was a prepared guest
//   chamber in Jerusalem where Peter and John made the necessary
//   arrangements. The meal followed the traditional Passover
//   pattern, allowing Jesus to reveal Himself as the fulfillment
//   of its symbols. :contentReference[oaicite:1]{index=1}
//
//   Spiritual Theme:
//   Redemption, covenant, sacrifice, betrayal, and God's sovereign
//   plan fulfilled through Christ.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
//   Crime:
//     Apparent sabotage of the Passover preparations involving a
//     broken cup, spilled wine, and missing bread.
//
//   Actual Event:
//     Judas, already committed to betraying Jesus, handled the
//     money bag before the meal, left in haste after being
//     identified by Jesus, while Jesus instituted the New Covenant
//     through the bread and the cup. :contentReference[oaicite:2]{index=2}
//
//   Culprit:
//     Judas Iscariot. :contentReference[oaicite:3]{index=3}
//
//   Motive:
//     Having accepted thirty pieces of silver from the chief
//     priests, Judas was preparing to betray Jesus and departed
//     the meal to complete his agreement. :contentReference[oaicite:4]{index=4}
//
//   Verdict:
//     The physical disturbances in the upper room were incidental
//     to Judas's betrayal. The true significance of the evening
//     was the fulfillment of multiple Messianic prophecies and the
//     establishment of the New Covenant through Jesus Christ. :contentReference[oaicite:5]{index=5}
//
// ============================================================

export const act3CaseA = {
  id: "last_supper",
  icon: '../assets/gfx/cup-duotone.svg',
  title: "The Broken Cup",
  subtitle: "The Passover preparations in the upper room have been disturbed — and someone is hiding what they know.",
  location: "upperroom",
  eventLocation: "Upper Room, Jerusalem",
  timeOfDay: "night",
  difficulty: 3,
  requires: "lazarus_plot",
  actLabel: "Act III - The Last Supper",
  color: 0x34d399,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Last Supper Investigation", task: "Find the bread and wine", cur: 0, tar: 7 },

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `On Thursday evening, Nisan 14, Jesus and His disciples gathered in a borrowed upper room in Jerusalem to celebrate the Passover meal. But this was no ordinary Passover — Jesus was about to transform a 1,500-year-old ceremony into something entirely new. He took the bread and wine that were already present for the Seder and reinterpreted them: the broken bread as His body, the wine as His blood — the New Covenant (Jeremiah 31:31–34). This meal, the Last Supper, ended with Judas slipping away into the night to betray Him.`,
    significance: `The Passover lamb had always pointed forward to something greater. In Exodus 12, God told the Israelites to sacrifice a lamb and mark their doorposts with its blood — death would 'pass over' every house protected by the blood. Paul later wrote: 'Christ, our Passover lamb, has been sacrificed' (1 Corinthians 5:7). Jesus was intentionally eating the Passover on the night He became it.`,
    historicalNote: `The 'upper room' (Greek: anagaion) was likely in the southwestern upper city of Jerusalem — the wealthier quarter where larger houses with guest rooms existed. Peter and John were sent ahead to prepare (Luke 22:8), following a man carrying a water jar as their sign — unusual, since water-carrying was women's work, making such a man easy to spot. The host is unnamed in Scripture, though later tradition associates the house with John Mark's family (see Acts 12:12).`,
  },

  prophecies: [
    {
      reference: "Exodus 12:1–14",
      id: "exodus_12_1_14",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"The blood shall be a sign for you, on the houses where you are... when I see the blood, I will pass over you, and no plague will befall you to destroy you."`,
      written: "~1400 BC",
      fulfilledBy: "Jesus, as the Passover Lamb, whose blood provides protection from judgement",
      gospelLink: "John 1:29; 1 Corinthians 5:7; Luke 22:15–20",
      insight: "The Passover lamb was to be 'without blemish' (Exodus 12:5). Jesus — declared righteous even by Pilate ('I find no fault in him', John 18:38) — perfectly fulfilled this requirement. The meal Jesus ate was the same meal that pointed to Him.",
      explanation: "Jesus, the sinless Lamb of God, became the fulfillment of the 1,500-year-old Passover ritual on the very night He celebrated it.",
    },
    {
      reference: "Jeremiah 31:31–34",
      id: "jeremiah_31_31_34",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Behold, the days are coming, declares the LORD, when I will make a new covenant with the house of Israel... I will put my law within them, and I will write it on their hearts."`,
      written: "~627 BC",
      fulfilledBy: "Jesus declaring 'This cup is the new covenant in my blood' at the Last Supper",
      gospelLink: "Luke 22:20; 1 Corinthians 11:25",
      insight: "Jeremiah prophesied a coming covenant that would be internal, not external — written on hearts, not stone tablets. Jesus announced its inauguration over a cup of wine at Passover. The old covenant was sealed with animal blood (Exodus 24:8); the new with His own.",
      explanation: "Jesus inaugurated this New Covenant, foretold 600 years earlier, when He took the cup of wine and declared, 'This is my blood of the new covenant.'",
    },
    {
      reference: "Psalm 41:9",
      id: "psalm_41_9",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Even my close friend in whom I trusted, who ate my bread, has lifted his heel against me."`,
      written: "~1000 BC",
      fulfilledBy: "Judas Iscariot betraying Jesus after eating with Him at the Last Supper",
      gospelLink: "John 13:18 — Jesus quotes this Psalm directly at the supper",
      insight: "Jesus explicitly quoted Psalm 41:9 at the table (John 13:18), identifying the betrayal as prophetic fulfilment — not a surprise. In quoting it, He showed that even His betrayal was within God's foreknowledge.",
      explanation: "Jesus quoted this Psalm at the table just before giving the dipped bread to Judas, showing that even the betrayal was part of God's foreknown plan.",
    },
    {
      reference: "Zechariah 11:12–13",
      id: "zechariah_11_12_13",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"So they weighed out as my wages thirty pieces of silver... and I threw it into the house of the LORD — to the potter."`,
      written: "~520 BC",
      fulfilledBy: "Judas receiving 30 silver coins for betraying Jesus, later thrown into the Temple",
      gospelLink: "Matthew 26:15; Matthew 27:3–10",
      insight: "Thirty silver pieces was the price of a slave (Exodus 21:32) — the religious leaders effectively valued Jesus as the lowest possible commodity. Matthew records this fulfilled Zechariah's prophecy to the detail of the coins being thrown into the temple treasury.",
      explanation: "Judas was paid exactly 30 pieces of silver, the price of a gored slave in the Old Testament, fulfilling Zechariah's prophecy about the rejected shepherd's paltry wages.",
    },
    {
      reference: "Isaiah 53:12",
      id: "isaiah_53_12",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"He poured out his soul to death and was numbered with the transgressors; yet he bore the sin of many, and makes intercession for the transgressors."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's prayer for His disciples and for those who would betray and crucify Him (John 17)",
      gospelLink: "John 17:1–26 (the High Priestly Prayer, delivered the same evening)",
      insight: "The farewell discourse (John 14–17), delivered after the meal, is the longest recorded prayer of Jesus. Isaiah described the Suffering Servant 'making intercession' — Jesus fulfilled this at the Last Supper by praying for His disciples, for future believers, and — as He would later do from the cross — even for His enemies.",
      explanation: "The Suffering Servant was prophesied to make 'intercession for the transgressors.' Jesus fulfilled this by praying for His disciples and His enemies during the Last Supper and on the cross.",
    },
    {
      reference: "Genesis 14:18-20",
      id: "typology_melchizedek",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"And Melchizedek king of Salem brought out bread and wine. (He was priest of God Most High.)"`,
      written: "~1400 BC",
      fulfilledBy: "Jesus, as the ultimate priest-king, using bread and wine to establish the New Covenant",
      gospelLink: "Hebrews 7; Luke 22:19-20",
      insight: "Melchizedek, the mysterious priest-king of Salem (Jerusalem), blessed Abraham with bread and wine. The book of Hebrews explains that Jesus is a high priest 'forever in the order of Melchizedek' (quoting Psalm 110), an eternal priesthood outside the Levitical line. Just as Melchizedek offered bread and wine, Jesus institutes the New Covenant with the same elements at the Last Supper.",
      explanation: "Jesus fulfilled the typology of Melchizedek, the priest-king who blessed Abraham with bread and wine, by using the same elements to establish the New Covenant at the Last Supper.",
    },
  ],

  intro: formatIntro(`It is the evening of Nisan 14. In a large upper room in Jerusalem's southwestern quarter, Peter and John have spent all afternoon preparing for the Passover Seder. The unleavened bread is set. The cups of wine are poured. The Passover lamb is ready. But when Jesus and the twelve arrive for the meal, something is wrong: a cup has been **broken**, the wine from one goblet has been **spilled**, and a portion of the unleavened bread is **missing**. Three people had access to the upper room that afternoon. Was this sabotage — or something _far more significant_?`),

  suspects: [
    { id: "john_mark", name: "John Mark", role: "Son of the House Owner", avatar: "john_mark.svg", bibleRef: "Acts 12:12 — later tradition links this house to Mary, John Mark's mother" },
    { id: "servant", name: "Rhoda", role: "Household Servant", avatar: "rhoda.svg", bibleRef: "Acts 12:13–15 — a servant named Rhoda is mentioned in the same household" },
    { id: "judas", name: "Judas Iscariot", role: "Disciple and Treasurer", avatar: "judas.svg", bibleRef: "John 13:29 — Judas kept the money bag; Luke 22:3–6 — already made his deal" },
  ],

  evidencePool: [

    {
      id: "bread_crumbs",
      name: "Unleavened Bread Crumbs",
      relatedProphecy: "exodus_12_1_14",
      type: "physical",
      icon: "../assets/gfx/bread-duotone.svg",
      location: "Upper Room Preparation Table",
      desc: "Crumbles of unleavened (matzah) bread found on the floor near the preparation table, as if a piece was broken and dropped in haste.",
      bibleRef: "Matthew 26:26 — 'Jesus took bread, and after blessing it broke it and gave it to the disciples.'",
      bibleLink: "matthew_26_26",
      propheticLink: "The breaking of the matzah is called the 'afikomen' in the Passover Seder — traditionally hidden and later 'found' again. Early Christians saw this as a picture of Jesus's death and resurrection: broken, buried, and found alive.",
      bibleRefs: [
        { ref: "Matthew 26:26", link: "matthew_2626" },
        { ref: "Exodus 12:1-14", link: "exodus_12114" }
      ],
      investigatorNote: "The crumbs suggest someone handled the bread before the meal. The question is whether they were testing its freshness, or hiding something.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "The first physical trace of the meal — sets up the wine stain and cup fragments that follow.",
        link: "Event — crumbs from the unleavened bread Jesus broke and blessed at the start of the meal.",
        timeline: "CHRONOLOGY: Left behind at the very start of the meal, when the bread was first broken.",
        contradict: "RELIABILITY: Consistent with the unleavened matzah required at a Passover table, not ordinary leavened bread."
      },
    }, {
      id: "wine_stain",
      name: "Spilled Wine on the Linen",
      type: "physical",
      relatedProphecy: ["jeremiah_31_31_34", "typology_melchizedek"],
      icon: "../assets/gfx/wine-duotone.svg",
      location: "Upper Room Dining Table",
      desc: "A dark red stain on the fine linen tablecloth, exactly where the third cup of wine — the 'Cup of Redemption' — was set. It was spilled, not drunk.",
      bibleRef: "Luke 22:20 — 'In the same way, after supper he took the cup, saying: This cup is the new covenant in my blood, which is poured out for you.'",
      bibleLink: "luke_22_20",
      propheticLink: "The third Passover cup — the Cup of Redemption — is the one Jesus transformed into the cup of the New Covenant (Jeremiah 31:31-34). This also fulfills the typology of Melchizedek, the priest-king of Salem who blessed Abraham with bread and wine (Genesis 14:18), an order of priesthood Jesus now embodies (Hebrews 7).",
      bibleRefs: [
        { ref: "Luke 22:20", link: "luke_2220" },
        { ref: "Jeremiah 31:31-34", link: "jeremiah_313134" },
        { ref: "Exodus 6:6-7", link: "exodus_667" }
      ],
      propheticRefs: [
        { ref: "Exodus 6:6-7", link: "exodus_6_6_7" },
        { ref: "Genesis 14:18-20", link: "genesis_14_18_20" }
      ],
      investigatorNote: "The stain is at the position of the third cup. Was this clumsiness, or deliberate disruption of this specific cup?",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "Marks the third cup position — pairs with the new covenant declaration to fix exactly which words were spoken over it.",
        link: "Event — wine spilled at the position of the Cup of Redemption, the third of the Seder's four cups.",
        timeline: "CHRONOLOGY: Occurred after the bread was broken, at the point in the Seder when the third cup is taken.",
        contradict: "RELIABILITY: The stain's position at the third cup, not a random spill, matches exactly where Jesus spoke of His blood."
      },
    }, {
      id: "cup_fragments",
      name: "Shattered Clay Cup",
      relatedProphecy: "",
      icon: "../assets/gfx/wine-duotone.svg",
      type: "physical",
      icon: "../assets/gfx/wine-duotone.svg",
      location: "Near the Serving Entrance to the Upper Room",
      desc: "Fragments of a small clay cup — one of the Passover cups — shattered near the doorway, as if dropped or thrown. The clay is Galilean-style, not local Jerusalem pottery.",
      bibleRef: "Matthew 26:27 — 'And he took a cup, and when he had given thanks he gave it to them, saying, Drink of it, all of you.'",
      bibleLink: "matthew_26_27",
      propheticLink: "Breaking pottery in the Jewish tradition was sometimes associated with mourning or the breaking of a covenant (see Jeremiah 19:10–11, where Jeremiah shattered a clay jar as a prophetic act of judgement). A broken cup at the Passover table carries heavy symbolic weight.",
      bibleRefs: [
        { ref: "Matthew 26:27", link: "matthew_2627" },
        { ref: "Jeremiah 19:10-11", link: "jeremiah_191011" }
      ],
      propheticRefs: [
        { ref: "Jeremiah 19:10-11", link: "jeremiah_19_10_11" }
      ],
      investigatorNote: "Galilean clay cup — not from Jerusalem. One of the disciples may have brought their own cup. Judas was from Kerioth in Judah; this cup isn't his.",
      fake: false,
      category: 'event',
      timelineOrder: 5,
      clues: {
        compare: "Found near the wine stain — together they narrow down whose cup was broken and when.",
        link: "Event — a shattered clay cup of Galilean make, not local Jerusalem pottery.",
        timeline: "CHRONOLOGY: Broken sometime after the third cup was poured, during or just after the meal.",
        contradict: "RELIABILITY: The Galilean clay rules out Judas, whose home was in Kerioth, Judea — narrowing the field of suspects."
      },
    }, {
      id: "water_jug",
      name: "Large Stone Water Jug",
      relatedProphecy: "",
      type: "physical",
      icon: "🫙",
      location: "Upper Room Entrance Landing",
      desc: "A large stone water jug used for ceremonial hand-washing before the Passover meal. Full to the brim. But there is a wet trail on the floor that suggests it was moved and replaced.",
      bibleRef: "John 13:4–5 — 'He rose from supper... then he poured water into a basin and began to wash the disciples' feet.'",
      bibleLink: "john_13_4_5",
      propheticLink: "Isaiah 52:13–15 describes the Servant who 'shall startle many nations' — and immediately before this, is described as one who acts in a way that astonishes because of His humility. Jesus washing feet with this water fulfilled the spirit of what Isaiah described: the exalted One taking the lowest role.",
      bibleRefs: [
        { ref: "John 13:4-5", link: "john_1345" },
        { ref: "Isaiah 52:13-15", link: "isaiah_521315" }
      ],
      propheticRefs: [
        { ref: "Isaiah 52:13-15", link: "isaiah_52_13_15" }
      ],
      investigatorNote: "Someone moved this jug. If it was Rhoda doing her preparation duties, the wet trail should lead to the washing basin. It leads toward the staircase instead.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Contradicts the expected route to the washing basin — its trail points somewhere else entirely.",
        link: "Event — the stone jug used to fill the basin for washing the disciples' feet.",
        timeline: "CHRONOLOGY: Moved early, before the meal itself, as preparations were being made.",
        contradict: "RELIABILITY: The wet trail leads toward the staircase, not the basin — inconsistent with routine servant duties."
      },
    }, {
      id: "money_bag_impression",
      name: "Imprint of a Money Bag",
      type: "physical",
      relatedProphecy: "zechariah_11_12_13",
      icon: "../assets/gfx/coins-duotone.svg",
      location: "Preparation Table Surface",
      desc: "A faint ring impression on the dusty preparation table surface — the outline of a leather drawstring bag, the kind used to carry coins. It was set down and picked up within the last few hours.",
      bibleRef: "John 13:29 — 'Since Judas had the money bag, some thought Jesus was telling him to buy what was needed for the feast, or give something to the poor.'",
      bibleLink: "john_13_29",
      propheticLink: "Judas carried the communal purse — and had recently agreed to betray Jesus for 30 silver coins (Matthew 26:14–16), fulfilling Zechariah 11:12. The presence of a money bag impression at the preparation table raises serious questions: what was Judas counting before the meal?",
      bibleRefs: [
        { ref: "John 13:29", link: "john_13_29" }
      ],
      propheticRefs: [
        { ref: "Matthew 26:14-16", link: "matthew_26_14_16" },
        { ref: "Zechariah 11:12", link: "zechariah_11_12" }
      ],
      investigatorNote: "The disciples' money bag was Judas's responsibility. Why was it here, in the food preparation area, before the meal?",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "Ties directly to the dipped bread — the same person who controlled this bag receives that morsel.",
        link: "Event — the imprint of the disciples' communal purse, left in the food preparation area before the meal.",
        timeline: "CHRONOLOGY: Left in the preparation area before the meal proper began, ahead of the dipped-bread moment.",
        contradict: "RELIABILITY: Judas alone held the money bag (John 13:29), placing him specifically at this spot beforehand."
      },
    }, {
      id: "betrayal_dipped_bread",
      name: "Fragment of Sop (Dipped Bread)",
      type: "physical",
      relatedProphecy: "psalm_41_9",
      icon: "🫓",
      location: "Floor beneath the seat nearest the door",
      desc: "A small piece of bread that has been dipped in the bitter herb paste (charoset) and then dropped or discarded. Found beneath the seat closest to the exit — the seat traditionally associated with the honoured guest.",
      bibleRef: "John 13:26–30 — 'Jesus answered, It is he to whom I will give this morsel of bread when I have dipped it. So when he had dipped the morsel, he gave it to Judas... After he received the morsel, Satan entered into him. Jesus said, What you are going to do, do quickly.'",
      bibleLink: "john_13_26_30",
      propheticLink: "The giving of the dipped sop to Judas is the fulfilment of Psalm 41:9 ('even my close friend... who ate my bread has lifted his heel against me'). Jesus quoted this Psalm earlier that evening (John 13:18), identifying the traitor through an act of table fellowship.",
      bibleRefs: [
        { ref: "John 13:26-30", link: "john_13_26_30" }
      ],
      propheticRefs: [
        { ref: "Psalm 41:9", link: "psalm_41_9" },
        { ref: "John 13:18", link: "john_13_18" }
      ],
      investigatorNote: "The dipped bread points to the seat of honour — and to one specific disciple. This is the most revealing piece of evidence in the room.",
      fake: false,
      category: 'people',
      timelineOrder: 6,
      clues: {
        compare: "The clearest identification in the room — read together with the money bag impression, it names the traitor.",
        link: "People — the morsel of bread Jesus Himself dipped and handed to His betrayer.",
        timeline: "CHRONOLOGY: Given partway through the meal, immediately after Jesus announced one of them would betray Him.",
        contradict: "RELIABILITY: A deliberate, singled-out act witnessed by the whole table — not an ambiguous or accidental gesture."
      },
    }, {
      id: "new_covenant_declaration",
      name: "Written Summary of Jesus's Words",
      type: "analytical",
      relatedProphecy: "jeremiah_31_31_34",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "John Mark's Writing Table, Downstairs",
      desc: "A partial written record in careful Aramaic script: 'This cup is the new covenant in my blood. Do this in remembrance of me.' The handwriting is young but educated. Someone was recording this meal.",
      bibleRef: "Luke 22:19–20; 1 Corinthians 11:24–25 — Paul records the same words, passed on 'from the Lord.'",
      bibleLink: "luke_22_19_20",
      propheticLink: "Jeremiah 31:31–34 promised a 'new covenant' that would supersede the Mosaic Law — written on hearts, not stone. Jesus announced its establishment at this very table. The young scribe recording His words was preserving the fulfilment of a 600-year-old prophecy.",
      bibleRefs: [
        { ref: "Luke 22:19-20", link: "luke_221920" },
        { ref: "Corinthians 11:24-25", link: "corinthians_112425" }
      ],
      propheticRefs: [
        { ref: "Jeremiah 31:31-34", link: "jeremiah_313134" }
      ],
      investigatorNote: "John Mark was present. He was watching, listening, and writing. He knew everything that happened in that room.",
      fake: false,
      category: 'people',
      timelineOrder: 7,
      clues: {
        compare: "Records the words spoken over the same cup marked by the wine stain.",
        link: "People — a young scribe's written record of Jesus's words over the bread and the cup.",
        timeline: "CHRONOLOGY: Recorded as Jesus spoke, late in the meal, establishing the new covenant.",
        contradict: "RELIABILITY: Independently corroborated by Paul's nearly identical wording in 1 Corinthians 11:24–25."
      },
    }, {
      id: "twelve_roll",
      name: "List of the Twelve",
      type: "analytical",
      relatedProphecy: "isaiah_53_12",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Upper Room",
      desc: "A roll call of the disciples present at the meal, including Judas Iscariot, a known transgressor.",
      bibleRef: "Luke 22:37",
      propheticLink: "Jesus explicitly applies Isaiah 53:12 ('numbered with the transgressors') to Himself during the Last Supper.",
      bibleRefs: [
        { ref: "Luke 22:37", link: "luke_22_37" }
      ],
      propheticRefs: [
        { ref: "Isaiah 53:12", link: "isaiah_53_12" }
      ],
      investigatorNote: "Jesus willingly associated with and ministered to His own betrayer, fulfilling the prophecy.",
      fake: false,
      category: 'people',
      timelineOrder: 8,
      clues: {
        compare: "Confirms who was present for every earlier piece of evidence in this room — all twelve, including the betrayer.",
        link: "People — a roll naming all twelve disciples seated at the table that night.",
        timeline: "CHRONOLOGY: Reflects the seating for the whole meal, from the first cup through Jesus's final words.",
        contradict: "RELIABILITY: Jesus knowingly kept His betrayer at the table and ministered to him regardless — a detail no fabricated account would need to include."
      },
    }

  ],

  lab: [
    {
      evidence: "cup_fragments",
      suspect: "john_mark",
      result: "**Witness to Agitation** (Observed the event, but did not cause it)",
      notes: "'This cup is the new covenant in my blood' (Luke 22:20) — the household saw the moment turn, but the words came from Jesus, not the boy watching."
    },
    {
      evidence: "water_jug",
      suspect: "servant",
      result: "**Witness to Haste** (Saw someone leaving in a hurry)",
      notes: "'You will meet a man carrying a jar of water' (Mark 14:13) — the sign that led the disciples here also marks Judas's exit as out of the ordinary."
    },
    {
      evidence: "betrayal_dipped_bread",
      suspect: "judas",
      result: "**Implicated by Prophecy** (Links him to the betrayal)",
      notes: "'He who shared my bread has turned against me' (John 13:18, Psalm 41:9). The dipped morsel named the betrayer before he moved."
    }
  ],

  npcs: [
    {
      id: "john_mark",
      name: "John Mark",
      role: "Son of the House Owner",
      faction: "scribes",
      unlocksSuspects: ["john_mark"],
      avatar: "john_mark.svg",
      profileFile: "john_mark",
      truthfulness: 0.75,
      bibleRef: "Acts 12:12; Mark 14:51–52 (possibly the young man who fled the garden)",
      hasDialogue: true,
      storyFile: "john_disciple",
      unlocksEvidence: ["bread_crumbs", "new_covenant_declaration", "betrayal_dipped_bread"],
      revealsProphecy: "jeremiah_31_31_34",
      background: "John Mark is the teenage son of Mary, the owner of this Jerusalem house. He is educated, observant, and later travels with Paul before writing the Gospel of Mark — which scholars believe contains Peter's eyewitness accounts. He was in and out of the upper room all afternoon.",
      dialogue: {
        neutral: "My mother's house was chosen for this meal. I was helping prepare the room all afternoon.",
        cautious: "I saw what happened at the table. But I'm not sure how much I should say — some of it felt... private. Sacred.",
        pressured: "I was recording some of what He said. I wanted to remember it. Jesus spoke about a new covenant. About His blood. I didn't fully understand it at the time.",
        exposed: "I saw Judas counting coins at the preparation table before the meal. He didn't know I was watching. He looked troubled — not guilty-troubled, more like someone trying to convince themselves they've made the right decision.",
        repeat: "I've told you what I saw. The rest is between those twelve men and their teacher.",
      },
      reactions: {
        bread_crumbs: { text: "I checked the bread myself — it was perfectly unleavened, as required. Those crumbs were from my own inspection. I broke a small corner to taste it.", isLie: true, revealedClue: "money_bag_impression" },
        wine_stain: { text: "The wine stain... that was during the meal itself. When Jesus took the third cup and said it was the new covenant in His blood — someone knocked their arm and spilled a little. It felt almost fitting, somehow.", isLie: false },
        new_covenant_declaration: { text: "Yes, that's my writing. I was sitting on the stairs and could hear through the doorway. I know it seems presumptuous to write down a private meal. But something told me these words mattered.", isLie: false },
        betrayal_dipped_bread: { text: "I saw Him give that bread to the man sitting closest to the door. After that, that man left immediately. Jesus looked... resigned. Like someone watching something inevitable.", isLie: false },
      },
      contradictions: {
        "bread_crumbs+money_bag_impression": { exposed: "Alright. I saw Judas at the preparation table before the others arrived. He wasn't inspecting bread — he was counting coins. Silver coins. Thirty, I think. I backed away before he saw me." },
      },
    },
    {
      id: "servant",
      name: "Rhoda",
      role: "Household Servant",
      faction: "local",
      avatar: "rhoda.svg",
      unlocksSuspects: ["servant"],
      profileFile: "rhoda",
      truthfulness: 0.9,
      bibleRef: "Acts 12:13–15",
      hasDialogue: true,
      storyFile: "rhoda_servant",
      unlocksEvidence: ["water_jug", "cup_fragments"],
      revealsProphecy: "exodus_12_1_14",
      background: "Rhoda is a young servant in the household — the same Rhoda who will later be so astonished at Peter's miraculous release from prison that she forgets to open the door (Acts 12:13–15). She is earnest, perceptive, and loyal to the household.",
      dialogue: {
        neutral: "I prepared the room from midday. Everything was in order when Jesus and his twelve arrived.",
        cautious: "I wouldn't touch the Passover elements — that's not my place. I brought in the water jug and kept the lamps trimmed. That's all.",
        pressured: "I did see something that troubled me. One of the disciples — the quiet one with the dark eyes — asked me where the nearest city gate was. Before the meal. Why would someone need to know that at Passover?",
        exposed: "He also asked about the temple treasury. Where it was kept. How late it was staffed. I thought it was an odd question for someone about to have Passover dinner. I told my mistress afterward.",
        repeat: "I've shared everything I observed. I'm just a servant. I only watch and listen.",
      },
      reactions: {
        water_jug: { text: "I filled that jug myself this morning. But yes — it was moved. I noticed the wet trail when I came up to check on the lamps. Someone moved it toward the staircase, then put it back. I don't know why.", isLie: false, revealedClue: "cup_fragments" },
        cup_fragments: { text: "Those fragments — I found them when I swept after the meal. The cup broke near the door. I assumed it was dropped when the men were leaving in a hurry. One man left very quickly, right in the middle of the meal.", isLie: false },
        betrayal_dipped_bread: { text: "I wasn't in the room for the meal itself. But I heard raised voices briefly — not angry, more like something solemn and painful — and then one man descended the stairs very fast and went into the night.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "judas",
      name: "Judas Iscariot",
      role: "Disciple and Treasurer",
      faction: "scribes",
      avatar: "judas.svg",
      unlocksSuspects: ["judas"],
      profileFile: "judas",
      truthfulness: 0.3,
      bibleRef: "Matthew 26:14–16; John 13:27–30; Matthew 27:3–5",
      hasDialogue: true,
      storyFile: "judas_iscariot",
      unlocksEvidence: ["money_bag_impression"],
      background: "Judas Iscariot — the only non-Galilean among the twelve, from Kerioth in Judah. He has carried the disciples' money bag for three years. Two days ago he approached the chief priests and agreed to hand Jesus over for 30 silver coins. Tonight he will complete that agreement. He is at the table, eating, knowing what he has done.",
      dialogue: {
        neutral: "The meal was sacred. I have nothing unusual to report about the preparations.",
        cautious: "I handle the group's finances. It's natural that I would be near the preparation area counting supplies.",
        pressured: "Jesus is a great teacher. Whatever questions you have about this evening, they would be better directed to Peter or John.",
        exposed: "I want to speak with the Temple authorities. I have nothing further to say to you.",
        repeat: "I've already said too much.",
      },
      reactions: {
        money_bag_impression: { text: "I count the money regularly. We needed to confirm we had funds for the Passover lamb and the room hire. Nothing unusual.", isLie: true },
        betrayal_dipped_bread: { text: "The teacher gave bread to several of us during the meal. That's what you do at Passover. Read nothing into it.", isLie: true },
        cup_fragments: { text: "I don't know anything about a broken cup. I left the meal before it concluded — I had an errand.", isLie: true },
        wine_stain: { text: "Wine spills. It means nothing.", isLie: true },
        new_covenant_declaration: { text: "Whatever that boy wrote down is his own interpretation. I won't comment on private religious discussions.", isLie: true },
      },
      contradictions: {
        "money_bag_impression+betrayal_dipped_bread": { exposed: "You want the truth? The truth is written in Psalm 41:9. 'My close friend, who ate my bread, has lifted his heel against me.' He quoted it. At the table. While I was sitting there. He knew. And he gave me the bread anyway. I don't expect you to understand that." },
        "cup_fragments+money_bag_impression": { exposed: "Thirty pieces of silver. That's what they gave me. I dropped the clay cup when I was leaving — my hands were shaking. Are you satisfied now? The chief priests are waiting." },
        "money_bag_impression+new_covenant_declaration": { exposed: "One is the price of a life, the other is a promise I no longer have a part in. He spoke of a New Covenant while I felt the weight of those thirty coins. I thought I was ending His movement, but He was writing its next chapter before my very eyes." }
      },
    },
  ],

  deductions: {
    "betrayal_dipped_bread+money_bag_impression": {
      compare: {
        text: "The dipped bread points to the seat of the honoured guest — who left immediately after receiving it. The money bag impression shows someone was counting coins at the preparation table earlier. Both point to the same disciple.",
        insight: "John 13:26–30 records that after receiving the dipped bread, Judas 'went out immediately. And it was night.' The money bag impression suggests he had already received his 30 silver coins before the meal began.",
        isKey: true,
        bibleRef: "John 13:26–30; Matthew 26:14–16",
      },
      link: {
        text: "The two pieces of evidence form a timeline: Judas received payment from the priests before the meal. He sat at the table with Jesus — who gave him the honoured sop, making his betrayal explicit. He then left.",
        insight: "Psalm 41:9, quoted by Jesus at the table, was written 1,000 years earlier. The entire sequence — eating together, the betrayal, the coins — was prophesied.",
        isKey: true,
        revealsProphecy: "psalm_41_9",
        bibleRef: "Psalm 41:9; John 13:18; Zechariah 11:12–13",
      },
    },
    "wine_stain+new_covenant_declaration": {
      link: {
        text: "The wine stain marks the precise position of the third Passover cup — the Cup of Redemption. John Mark's written record captures Jesus's words over this very cup: 'This is the new covenant in my blood.'",
        insight: "Jeremiah 31:31–34, written 600 years earlier, promised a new covenant. Jesus announced its arrival over spilled wine at a Passover table. The stain and the written words together document one of history's most significant moments.",
        isKey: true,
        bibleRef: "Luke 22:20; Jeremiah 31:31–34",
      },
      compare: {
        text: "The stain sits exactly where the words were recorded as being spoken — physical evidence lines up with the written testimony, not against it.",
        insight: "A spill in the wrong place would just be an accident. A spill in the exact spot the covenant declaration was written down is corroboration.",
        isKey: false,
        bibleRef: "Luke 22:20",
      },
    },
    "bread_crumbs+betrayal_dipped_bread": {
      compare: {
        text: "Bread crumbs near the preparation table, and a dipped piece of bread under the seat closest to the door. Two different bread moments — one from preparation, one from the meal itself.",
        insight: "The Passover Seder uses bread in multiple ways: the breaking of the matzah (which Jesus reinterpreted as His body), and the dipping of bread into bitter herbs (which Jesus used to identify the betrayer). Both bread items relate to different prophetic threads in the same evening.",
        isKey: false,
        bibleRef: "Matthew 26:26; John 13:26",
      },
      timeline: {
        text: "The broken matzah came first, shared with all twelve. The dipped morsel came later, given to one.",
        insight: "Jesus instituted the covenant meal for the whole table before He singled out His betrayer — the gift came before the exposure, not after.",
        isKey: false,
        bibleRef: "Matthew 26:26; John 13:26",
      },
    },
    "twelve_roll+betrayal_dipped_bread": {
      link: {
        text: "The roll call confirms Judas was one of the twelve at the table. The dipped morsel confirms Jesus knowingly served His betrayer to the end.",
        insight: "Isaiah 53:12 said the Suffering Servant would be 'numbered with the transgressors.' Jesus didn't just tolerate that association — He handed Judas the meal Himself, hours before the betrayal.",
        isKey: true,
        revealsProphecy: "isaiah_53_12",
        bibleRef: "Luke 22:37; John 13:26",
      },
    },
    "water_jug+cup_fragments": {
      timeline: {
        text: "The water jug was moved toward the staircase before the meal. The broken cup was found near the door after the meal. Something was carried up — or someone left in a hurry.",
        insight: "The water jug trail leads up, suggesting it was taken upstairs before being returned — perhaps for Jesus's foot-washing (John 13:4–5). The broken cup near the exit was shattered when Judas left abruptly. Two moments on the same evening, at the same doorway.",
        isKey: false,
        bibleRef: "John 13:4–5; John 13:30",
      },
    },
    "money_bag_impression+new_covenant_declaration": {
      contradict: {
        text: "The money bag impression on the preparation table and John Mark's written record of Jesus's words about a 'new covenant' sit in direct tension. One represents the 30 silver coins that bought a betrayal. The other records the covenant those coins were meant to destroy.",
        insight: "Zechariah 11:12–13 described 30 silver pieces thrown into the Temple treasury. Matthew 27:5 records this happening exactly. The money that passed through this table ultimately fulfilled both the betrayal prophecy and the covenant prophecy — pointing to one man: Judas Iscariot.",
        isKey: true,
        bibleRef: "Zechariah 11:12–13; Matthew 27:3–10; Jeremiah 31:31",
      },
    },
  },

  truth: {
    culprit: "judas",
    motive: "Judas Iscariot had already made his agreement with the chief priests for 30 silver coins. He came to the preparation area before the meal to count his payment, dropping the clay cup in his haste. The broken cup and spilled wine were caused by his agitated state — and by his abrupt departure after Jesus identified him through the dipped bread.",
    method: "Judas moved through the preparation room before the Passover meal began, handling the money bag containing his payment. His nervous energy caused the cup to be knocked and broken near the doorway. During the meal, Jesus gave him the honoured sop of dipped bread — publicly naming him as the betrayer, though only John fully understood. Judas left immediately into the night to alert the Temple guards.",
    lesson: "Even the betrayal was prophesied. Psalm 41:9, Zechariah 11:12–13, and Isaiah 53:12 all pointed toward this moment centuries in advance. Jesus did not merely endure the betrayal — He identified it from Scripture, gave Judas one final act of grace (the honoured bread), and then let the plan of God proceed.",
    prophesyFulfilled: ["Psalm 41:9", "Zechariah 11:12–13", "Jeremiah 31:31–34", "Exodus 12:1–14", "Isaiah 53:12"],
    furtherReading: ["Matthew 26:17–30", "Mark 14:12–26", "Luke 22:7–23", "John 13:1–30", "1 Corinthians 11:23–26"],
  },
};

// ============================================================
// ACT: Act III
// CASE: The Severed Ear
// CASE ID: gethsemane_arrest
// CASE EXPORT: act3CaseB
// SOURCE: act3_case.js
//
// LOCATION:
//   Gethsemane Garden, Mount of Olives
//
// DIFFICULTY:
//   3
//
// BACKGROUND:
//   Late on Thursday night, Judas Iscariot led a combined force
//   of Roman soldiers and Temple officers to the Garden of
//   Gethsemane to arrest Jesus. After identifying Him with a kiss,
//   Simon Peter drew a sword and struck Malchus, the High Priest's
//   servant, severing his ear. Instead of encouraging resistance,
//   Jesus immediately rebuked Peter, healed Malchus's wound, and
//   surrendered peacefully. What appears to be the beginning of an
//   armed rebellion instead becomes a demonstration of Christ's
//   complete authority, mercy, and willing obedience to the will
//   of the Father. :contentReference[oaicite:0]{index=0}
//
// BIBLE REFERENCES:
//   Matthew 26:47–56
//   Mark 14:43–52
//   Luke 22:47–53
//   John 18:1–12
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
//   • Zechariah 13:7
//     "Strike the shepherd, and the sheep will be scattered."
//     Jesus foretold that His disciples would flee when He was
//     arrested, and the prophecy was fulfilled that very night.
//
//   • Isaiah 53:7
//     "Like a lamb led to the slaughter..."
//     Jesus willingly submitted to arrest without resisting,
//     fulfilling Isaiah's portrait of the suffering Servant.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
//   Summary:
//   Judas betrays Jesus in Gethsemane, Peter attempts to defend
//   Him with a sword, but Jesus heals His enemy, commands peace,
//   protects His disciples, and voluntarily surrenders to those
//   sent to arrest Him.
//
//   Historical Context:
//   The arresting force consisted of Roman soldiers working
//   alongside Temple police, expecting violent resistance.
//   Instead, Jesus took complete control of the encounter,
//   preventing bloodshed and ensuring His disciples escaped while
//   He willingly fulfilled the Father's plan. :contentReference[oaicite:1]{index=1}
//
//   Spiritual Theme:
//   Obedience, peace, mercy, sacrificial submission, and the
//   fulfillment of God's sovereign plan.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
//   Crime:
//     Apparent armed resistance against the lawful arrest of Jesus.
//
//   Actual Event:
//     Peter attacked Malchus with a sword, but Jesus immediately
//     healed the injury, stopped further violence, and willingly
//     surrendered to the arresting authorities. :contentReference[oaicite:2]{index=2}
//
//   Culprit:
//     None. :contentReference[oaicite:3]{index=3}
//
//   Motive:
//     Jesus refused to establish His kingdom through violence,
//     choosing voluntary obedience to fulfill Scripture while
//     preventing His disciples from beginning an armed revolt. :contentReference[oaicite:4]{index=4}
//
//   Verdict:
//     No military uprising occurred. Jesus deliberately submitted
//     to arrest, healed His enemy, and fulfilled the Scriptures,
//     proving that His death was an act of willing sacrifice rather
//     than defeat. :contentReference[oaicite:5]{index=5}
//
// ============================================================

export const act3CaseB = {
  id: "gethsemane_arrest",
  icon: '../assets/gfx/ear-duotone.svg',
  title: "The Severed Ear",
  subtitle: "An armed mob entered Gethsemane under cover of darkness. A sword was drawn, yet the physical evidence makes no sense.",
  location: "gethsemane",
  eventLocation: "Gethsemane Garden, Mount of Olives",
  timeOfDay: "night",
  difficulty: 3,
  requires: "last_supper",
  actLabel: "Act III - The Last Supper",
  color: 0x34d399,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Garden Search", task: "Locate tactical anomalies", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Late Thursday night, Judas led a cohort of Roman soldiers and temple officers to a private olive grove called Gethsemane. After identifying Jesus with a kiss, a scuffle broke out. Peter drew a short sword and cut off the ear of Malchus, the High Priest’s servant. Jesus immediately commanded Peter to put away his weapon, healed Malchus, and surrendered peacefully.`,
    significance: `This case highlights Jesus's absolute control over His arrest. He prohibited violent revolution, healed His enemy, and protected His disciples from capture, fulfilling His own word that He would lose none of them.`,
    historicalNote: `A Roman cohort combined with temple police shows a massive, coordinated security operation. The authorities expected armed resistance from Jesus's followers, making His peaceful surrender highly unexpected to military tacticians.`,
  },

  prophecies: [
    {
      reference: "Zechariah 13:7",
      id: "zechariah_13_7",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Strike the shepherd, and the sheep will be scattered."`,
      written: "~520 BC",
      explanation: "Jesus quoted this prophecy just before His arrest, predicting that His disciples would flee in fear, which they did.",
    },
    {
      reference: "Isaiah 53:7",
      id: "isaiah_53_7",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"He was oppressed, and he was afflicted, yet he opened not his mouth; like a lamb that is led to the slaughter."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's silence and non-resistance during His arrest and trial",
      gospelLink: "Matthew 26:52–54",
      written: "~520 BC",
      explanation: "Jesus quoted this prophecy just before His arrest, predicting that His disciples would flee in fear, which they did.",
    }
  ],

  lab: [
    {
      evidence: "severed_ear_wrap",
      suspect: "malchus_servant",
      result: "**Identified as Victim** (He was healed, not an aggressor)",
      notes: "'He touched the man's ear and healed him' (Luke 22:51) — Malchus took the wound and, uniquely, Jesus's last free miracle."
    },
    {
      evidence: "abandoned_linen", // Using the disciple's sword evidence
      suspect: "simon_peter",
      result: "**Implicated as Assailant** (He drew the sword)",
      notes: "'Put your sword back... all who draw the sword will die by the sword' (Matthew 26:52) — Peter's blade contradicted everything he'd just watched Jesus surrender to."
    }
  ],
  evidencePool: [

    {
      id: "abandoned_linen",
      name: "Abandoned Linen Wrapper",
      type: "physical",
      relatedProphecy: "zechariah_13_7",
      icon: "../assets/gfx/shield-duotone.svg",
      pos: [3, 4, 0],
      snippet: "A fine linen garment left caught in an olive branch.",
      description: "A high-quality linen cloak dropped in the brush, consistent with someone fleeing in an extreme hurry.",
      bibleRef: "Mark 14:51-52",
      bibleLink: "mark_14_51_52",
      propheticLink: "Zechariah 13:7 — 'Strike the shepherd, and the sheep will be scattered' — was quoted by Jesus himself just hours earlier (Matthew 26:31) as a prediction of this exact moment. The unnamed young man fleeing naked into the night, abandoning even his clothing, is the most vivid single image of the disciples' scattering the prophecy foretold.",
      bibleRefs: [
        { ref: "Mark 14:51-52", link: "mark_145152" }
      ],
      propheticRefs: [
        { ref: "Zechariah 13:7", link: "zechariah_137" },
        { ref: "Matthew 26:31", link: "matthew_2631" }
      ],
      investigatorNote: "The high grade of the linen suggests the owner was from a wealthy Jerusalem family, potentially John Mark acting as a secret night observer.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "The clearest physical sign of the disciples scattering — pairs with the dropped torch to mark the chaos of the arrest.",
        link: "Event — a fine linen cloak snagged on an olive branch, left by someone fleeing in panic.",
        timeline: "CHRONOLOGY: Abandoned last, as the disciples scattered once the arrest was made.",
        contradict: "RELIABILITY: The fabric's quality points to a wealthy young man — plausibly Mark himself, an unnamed eyewitness (Mark 14:51–52)."
      },
    }, {
      id: "dropped_torch",
      name: "Extinguished Roman Torch",
      type: "physical",
      relatedProphecy: "",
      icon: "🪵",
      pos: [-6, -2, 0],
      snippet: "A heavy pitch-pine torch block stamped with legionary markings.",
      description: "A Roman military torch dropped and trampled into the mud. It was unlit when dropped, despite still having plenty of unburnt pitch.",
      bibleRef: "John 18:3",
      bibleLink: "john_18_3",
      propheticLink: "John 18:3 notes they arrived with torches and lanterns, expecting a deep-woods manhunt.",
      bibleRefs: [
        { ref: "John 18:3", link: "john_183" }
      ],
      propheticRefs: [
        { ref: "John 18:3", link: "john_183" }
      ],
      investigatorNote: "John 18:6 records that when Jesus stated 'I am he,' the entire detachment fell backward to the ground. This dropped torch marks the exact physical epicenter of that divine surge.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Marks the exact spot of the arresting party's advance — pairs with the severed ear wrap for what happened next.",
        link: "Event — a Roman military torch, trampled into the mud while still unlit, despite unused pitch remaining.",
        timeline: "CHRONOLOGY: Dropped first, at the moment the detachment fell backward when Jesus said 'I am he' (John 18:6).",
        contradict: "RELIABILITY: An unlit, unburnt torch dropped mid-approach is inconsistent with a routine handoff — consistent with a sudden shock."
      },
    }, {
      id: "severed_ear_wrap",
      name: "Bloodied Scarf Fragment",
      type: "physical",
      relatedProphecy: "",
      icon: "🩸",
      pos: [1, -1, 0],
      snippet: "A head cloth heavily soaked in arterial blood, but cleanly cut.",
      description: "A cloth bearing a distinct vertical slice from a sharp blade, heavily stained with blood, found directly on the garden path.",
      bibleRef: "John 18:10",
      bibleLink: "john_18_10",
      propheticLink: "Luke 22:50–51 and John 18:10 document Peter cutting off Malchus's ear, which Jesus immediately healed.",
      bibleRefs: [
        { ref: "John 18:10", link: "john_1810" }
      ],
      propheticRefs: [
        { ref: "Luke 22:50-51", link: "luke_225051" },
        { ref: "John 18:10", link: "john_1810" }
      ],
      investigatorNote: "This provides the supreme paradox: there is dynamic arterial blood indicating an amputation, but no victim at the scene lacks an ear.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Follows the dropped torch — the confrontation that happened in that same moment of confusion.",
        link: "Event — a blood-soaked cloth with a clean blade cut, found on the garden path.",
        timeline: "CHRONOLOGY: Left immediately after the torch was dropped, during Peter's strike at Malchus.",
        contradict: "RELIABILITY: Arterial blood loss with no victim missing an ear at the scene — explained only by Jesus's immediate healing (Luke 22:51)."
      },
    }, {
      id: "prisoner_cord",
      name: "Unresisting Prisoner's Cord",
      type: "physical",
      relatedProphecy: "isaiah_53_7",
      icon: "../assets/gfx/chain-duotone.svg",
      location: "Gethsemane Garden",
      desc: "A length of rope used to bind Jesus's hands, showing no signs of struggle or resistance.",
      bibleRef: "Matthew 26:52–54",
      propheticLink: "Jesus refuses armed resistance and willingly submits to arrest, embodying the silent Lamb led to slaughter as prophesied in Isaiah 53:7.",
      bibleRefs: [
        { ref: "Matthew 26:52-54", link: "matthew_26_52_54" }
      ],
      propheticRefs: [
        { ref: "Isaiah 53:7", link: "isaiah_53_7" }
      ],
      investigatorNote: "The lack of fraying on the cord indicates a willing submission, not a capture after a fight.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "The final piece — shows how the arrest actually ended, in contrast to the violence of the torch and the ear.",
        link: "Event — the binding cord used to lead Jesus away, unfrayed and unmarked by struggle.",
        timeline: "CHRONOLOGY: Used last, once Jesus stopped Peter and submitted to arrest.",
        contradict: "RELIABILITY: The absence of fraying rules out a physical fight — consistent with willing submission, not capture."
      },
    }

  ],

  suspects: [
    {
      id: "malchus_servant",
      name: "Malchus",
      role: "High Priest's Personal Assistant",
      avatar: "malchus.svg",
      color: 0xffaa44,
      pos: [0, 0, 0],
      bibleRef: "John 18:10",
      background: "The personal agent of Caiaphas, sent to oversee the temple police execution of the arrest warrant.",
      dialogue: {
        neutral: "The man surrendered cleanly. The arrest was successful. There is nothing more to discuss.",
        cautious: "I... I felt the cold blade hit my neck. I heard the blood pooling. But then His hand touched me, and the pain vanished. Look at me... my skin is unbroken. Explain that to your records.",
      },
      contradictions: {
        "dropped_torch+severed_ear_wrap": {
          exposed: "Alright! Peter struck me. I should be disfigured, but Jesus repaired what His own disciple broke. I came to chain Him, and He healed me instead. That's why I did not order the arrest of the rest of the disciples."
        },
      },
    },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "nicodemus.svg", bibleRef: null },
  ],

  npcs: [
    {
      id: "malchus_servant",
      name: "Malchus",
      role: "High Priest's Personal Assistant",
      faction: "temple",
      unlocksSuspects: ["malchus_servant"],
      avatar: "malchus.svg",
      profileFile: "malchus",
      truthfulness: 0.90,
      bibleRef: "John 18:10; Luke 22:51",
      hasDialogue: true,
      storyFile: "malchus",
      unlocksEvidence: ["abandoned_linen", "dropped_torch"],
      revealsProphecy: "zechariah_13_7",
      background: "The confidential agent of Caiaphas. He was at the front of the line holding the warrant when Simon Peter drawing a hidden blade ambushed him in the dark. He is dealing with acute cognitive dissonance after an enemy healed his wound.",
      dialogue: {
        neutral: "The tactical entry succeeded. The prisoner surrendered without demanding a siege.",
        cautious: "The blood on my tunic is real. The cut on my head covering is clean through. But my flesh... there isn't even a scar.",
        pressured: "Simon Peter came at me from the dark brush. I didn't see the steel until it caught me. I fell into the mud, holding the side of my face, expecting to bleed out in an oil grove.",
        exposed: "The Galilean didn't run. He touched the side of my face, and the burning cold turned into... skin. He rebuilt my flesh. I came to put iron bands on Him, and He mended my wound. Why didn't he let his men fight?",
        repeat: "My report to the high priest is concluded. Do not waste my time.",
      },
      reactions: {
        severed_ear_wrap: { text: "That is my head scarf. You can see where the blade sliced the linen cleanly from above. The blood soaked through completely before the touch occurred.", isLie: false },
        dropped_torch: { text: "When we asked for Him, He stepped forward and said 'I am He.' The air went thick, like a heavy gale hitting a wall. Half the line tumbled backward over the roots. That's when torches were trampled.", isLie: false },
        abandoned_linen: { text: "One of their younger followers was grabbed by a guard. He panicked, slipped right out of his white cloak, and bolted into the deep brush naked.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "simon_peter",
      name: "Simon Peter",
      role: "Galilean Disciple",
      faction: "scribes",
      avatar: "peter.svg",
      profileFile: "peter",
      truthfulness: 0.70,
      bibleRef: "John 18:10-11; Matthew 26:51-54",
      hasDialogue: true,
      storyFile: "peter_defense",
      unlocksEvidence: ["severed_ear_wrap"],
      background: "The informal leader of the inner circle. He is currently hidden in the shadows outside the high priest's courthouse, deeply traumatized, defensive, and swinging violently between raw panic and profound shame.",
      dialogue: {
        neutral: "They came with swords and clubs as if hunting an insurgent. What did they expect us to do? Sit there?",
        cautious: "The garden was dark. Torches were moving through the trees. Everything happened in seconds.",
        pressured: "I drew the blade because we said we would die with Him. I swung at the closest person holding a rope. I wanted to split his skull.",
        exposed: "I cut the ear clean off. I saw the blood hit the mud. But the teacher... He yelled at me. He told me those who take the sword die by the sword. He didn't want a war. He healed the man, then told me to sheath the iron. I don't understand His strategy.",
        repeat: "Leave me alone. I don't know the man you're talking about.",
      },
      reactions: {
        severed_ear_wrap: { text: "That blood belongs to Malchus. I dropped my defense when the teacher commanded me to put the blade away. The wound should still be open.", isLie: false },
        dropped_torch: { text: "The cohort fell backward when He spoke. They had lanterns and military weapons, but they were shaking like leaves when He stepped into the light.", isLie: false },
        abandoned_linen: { text: "That belongs to John Mark. He was tracking us from the upper city. When the temple police grabbed his shoulder, he just ran.", isLie: false },
      },
      contradictions: {
        "severed_ear_wrap+dropped_torch": { exposed: "I thought we were starting the rebellion! He told us to carry swords earlier. But when I actually used the steel, He fixed the enemy's wounds and surrendered willingly. I ran because... if He isn't fighting Rome, what are we doing?" },
      },
    },
    {
      id: "roman_soldier",
      name: "Garrison Guard",
      role: "Antonia Fortress Auxiliary",
      faction: "roman",
      avatar: "garrison_guard.svg",
      profileFile: "garrison_guard",
      truthfulness: 0.85,
      hasDialogue: true,
      storyFile: "guard_report_gethsemane",
      bibleRef: "John 18:3; Matthew 26:47",
      background: "A Roman commander of the cohort sent to Gethsemane to arrest Jesus. He views the regional religious dynamics with absolute cynical detachment.",
      dialogue: {
        neutral: "We were ordered to secure the perimeter of an olive orchard. We hold the fortress, not local theological opinions.",
        cautious: "The operation was a logistical mess. Night deployments in heavy brush are always unpredictable.",
        pressured: "The temple enforcers were nervous. They thought the Galilean had an armed cell waiting in the trees. Then one of the inner circle jumped from the shadows with a short sword.",
        exposed: "The old man Peter sliced Malchus. Standard tactical procedure would be to deploy lethal force against the entire cell. But the prisoner stopped it. He literally commanded His own rebel to stand down, touched the servant, and solved the injury. We just stood there with our spears low.",
        repeat: "My shift ends at dawn. Talk to the centurion if you want a dispatch report.",
      },
      reactions: {
        dropped_torch: { text: "That pine torch belongs to my unit. Stamped with the fortress mark. The frontline fell back like they hit a stone barrier when the target declared his identity. Clumsy line work.", isLie: false },
        severed_ear_wrap: { text: "I saw the strike. Messy swing, but it took the ear off. The servant should be dead or disfigured. Instead, he walked back to the city gates tracking our prisoner with his head intact.", isLie: false },
        abandoned_linen: { text: "One of the local kids left his cloak in our hands. He scampered off into the darkness. Not our target, so we let him clear the line.", isLie: false },
      },
      contradictions: {},
    },
  ],

  deductions: {
    "abandoned_linen+dropped_torch": {
      link: {
        text: "The placement of the dropped torch and the abandoned linen show a split path of panic.",
        insight: "While the arresting party was knocked off balance, the younger followers of Jesus scattered into the darkness in utter terror, leaving their belongings behind.",
        isKey: false,
        revealsProphecy: "zechariah_13_7",
        bibleRef: "Mark 14:50",
      },
      timeline: {
        text: "The torch went down first, in the same instant the arresting party fell back. The linen was abandoned moments later, once the young follower realized he'd been seen.",
        insight: "Both items mark the same few seconds of chaos, viewed from two different vantage points in the dark.",
        isKey: false,
        bibleRef: "John 18:6; Mark 14:51-52",
      },
    },
    "dropped_torch+severed_ear_wrap": {
      link: {
        text: "The proximity of the weapon strike to the fallen military hardware suggests a sudden collision of kingdoms.",
        insight: "Peter attempted a messy tactical defense, but Jesus immediately neutralized the violence by performing a medical miracle on the enemy commander.",
        isKey: true,
        bibleRef: "Luke 22:51",
      },
      contradict: {
        text: "A dropped, unlit torch from a detachment that fell backward in fear sits oddly against a freshly bloodied blade wound — one moment looks like surrender, the other looks like a fight.",
        insight: "Both are true at once: the arresting party's power failed first (John 18:6), and only after that did Peter draw a sword Jesus never asked him to draw.",
        isKey: false,
        bibleRef: "John 18:6; John 18:10",
      },
    },
    "prisoner_cord+severed_ear_wrap": {
      contradict: {
        text: "The unresisting cord and the bloodied blade wound point in opposite directions — one shows total submission, the other shows a violent struggle.",
        insight: "Only one person in the garden fought back, and it wasn't the prisoner. Jesus's silence under the rope (Isaiah 53:7) stands in direct contrast to Peter's sword.",
        isKey: true,
        revealsProphecy: "isaiah_53_7",
        bibleRef: "Isaiah 53:7; Matthew 26:52-54",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no military insurgency. Jesus submitted voluntarily, refusing to allow His disciples to mount an armed rebellion against the legal authorities.",
    method: "Judas betrayed the location, and an armed force arrived. Peter panicked and struck Malchus. Jesus miraculously healed Malchus's ear on the spot, demanded peace, and surrendered Himself willingly to fulfill the Scriptures.",
    lesson: "The kingdom of Jesus does not advance by carnal weapons. His voluntary surrender proves that His death was an act of deliberate obedience, not a tactical failure.",
    prophesyFulfilled: ["Zechariah 13:7"],
    furtherReading: ["John 18:1–12", "Luke 22:47–53"],
  },
};

// ============================================================
// ACT: Act III
// CASE: The Midnight Tribunal
// CASE ID: sanhedrin_trial
// CASE EXPORT: act3CaseC
// SOURCE: act3_case.js
//
// LOCATION:
//   High Priest's Courtyard, Jerusalem
//
// DIFFICULTY:
//   3
//
// BACKGROUND:
//   Following His arrest in Gethsemane, Jesus was brought before
//   Caiaphas and an illegally convened session of the Sanhedrin.
//   Under cover of darkness, false witnesses were recruited in an
//   attempt to secure a conviction. Their testimony repeatedly
//   contradicted itself until the High Priest directly questioned
//   Jesus concerning His identity. When Jesus affirmed that He was
//   the Messiah, Caiaphas tore his robes and declared Him guilty
//   of blasphemy. Meanwhile, outside in the courtyard, Peter denied
//   knowing Jesus three times before the rooster crowed, exactly as
//   Jesus had foretold.
//
// BIBLE REFERENCES:
//   Matthew 26:57–75
//   Mark 14:53–72
//   Luke 22:54–71
//   John 18:12–27
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
//   • Isaiah 50:6
//     "I offered my back to those who beat me... I did not hide
//     my face from mocking and spitting."
//     Fulfilled as Jesus endured abuse, mockery, and spitting
//     following the Sanhedrin's verdict.
//
//   • Micah 5:1
//     Israel's ruler would be struck and humiliated.
//     Fulfilled as Jesus remained silent before His accusers and
//     was mocked and beaten after His condemnation.
//
//   • Psalm 27:12
//     "False witnesses rise up against me."
//     Fulfilled through the conflicting testimony presented by
//     the Sanhedrin.
//
//   • Psalm 35:11
//     "Malicious witnesses rise up; they ask me of things that
//     I do not know."
//     Fulfilled through the fabricated accusations brought
//     against Jesus.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
//   Summary:
//   The Sanhedrin conducted an illegal night trial, relying on
//   false testimony to condemn Jesus. Although the witnesses
//   failed to agree, Caiaphas obtained the verdict by demanding
//   that Jesus declare His identity. Outside, Peter's three
//   denials marked the lowest point of the disciples' faithfulness.
//
//   Historical Context:
//   Jewish law prohibited capital trials at night and during
//   major feast periods. The hurried proceedings in the High
//   Priest's residence demonstrate that the outcome had already
//   been decided before evidence was heard.
//
//   Spiritual Theme:
//   False justice, fulfilled prophecy, human failure, and the
//   unwavering obedience of the Suffering Servant.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
//   Crime:
//     Illegal religious trial using false witnesses to secure a
//     charge of blasphemy.
//
//   Actual Event:
//     The Sanhedrin manufactured testimony, pressured Jesus into
//     declaring His identity, and condemned Him, while Peter
//     fulfilled Jesus's prediction by denying Him three times.
//
//   Culprit:
//     Caiaphas and the Sanhedrin leadership.
//
//   Motive:
//     To obtain a blasphemy charge that could be used as political
//     leverage to persuade the Romans to execute Jesus.
//
//   Verdict:
//     Jesus was unlawfully condemned through a procedurally
//     illegal trial built on contradictory testimony, fulfilling
//     multiple Messianic prophecies while demonstrating His
//     willing submission to the Father's plan.
//
// ============================================================

export const act3CaseC = {
  id: "sanhedrin_trial",
  icon: '../assets/gfx/balance-scale-duotone.svg',
  title: "The Midnight Tribunal",
  subtitle: "Inside the High Priest's residence, a legal sham is unfolding while a disciple waits in the cold courtyard.",
  location: "high_priest_palace",
  eventLocation: "High Priest's Courtyard, Jerusalem",
  timeOfDay: "night",
  difficulty: 3,
  requires: "gethsemane_arrest",
  actLabel: "Act III - The Last Supper",
  color: 0x991b1b,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Trial Investigation", task: "Expose the illegal proceedings", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Following the arrest in Gethsemane, Jesus was taken to the house of Caiaphas. In an illegal midnight session, the Sanhedrin sought false testimony to condemn Him. When Jesus affirmed His identity as the Son of God, Caiaphas tore his robes in a display of ritual outrage. Outside in the courtyard, Peter denied Jesus three times, punctuated by the crowing of the rooster.`,
    significance: `The trial fulfilled prophecies concerning the silence of the Lamb and the specific insults He would endure. Peter's denial serves as the low point of the disciples' faithfulness.`,
    historicalNote: `Jewish law forbade capital trials at night or on the eve of a Sabbath/Festival. The haste and location of this gathering highlight its procedural illegality.`,
  },

  prophecies: [
    {
      reference: "Isaiah 50:6",
      id: "isaiah_50_6",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"I offered my back to those who beat me, my cheeks to those who pulled out my beard; I did not hide my face from mocking and spitting."`,
      written: "~700 BC",
      fulfilledBy: "The guards and Sanhedrin members striking and spitting on Jesus after the verdict",
      gospelLink: "Matthew 26:67",
      insight: "The physical abuse was prophesied—the Suffering Servant would endure mockery and spitting as part of the redemptive plan.",
    },
    {
      reference: "Micah 5:1",
      id: "micah_5_1",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Out of you will come one ruler to rule over a people... Yet I will come to the firstborn of the exiles of Moab, to the one who has been spared among the dry bones."`,
      written: "~700 BC",
      fulfilledBy: "Jesus remaining silent during His false trial, fulfilling the role of the innocent sufferer",
      gospelLink: "Matthew 27:12-14",
      insight: "Though mocked as a criminal, Jesus fulfilled the prophecy of one who would rule from weakness.",
    },
    {
      reference: "Psalm 27:12",
      id: "psalm_27_12",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"For false witnesses rise up against me, breathing out violence."`,
      written: "~1000 BC",
      explanation: "The Sanhedrin's trial was a sham, relying on hired accusers whose testimonies contradicted each other, fulfilling the psalmist's prediction.",
    },
    {
      reference: "Psalm 35:11",
      id: "psalm_35_11",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Malicious witnesses rise up; they ask me of things that I do not know."`,
      written: "~1000 BC",
      explanation: "The Sanhedrin's trial was a sham, relying on hired accusers whose testimonies contradicted each other, fulfilling the psalmist's prediction.",
    }

  ],

  lab: [
    {
      evidence: "torn_robe",
      suspect: "chief_priest",
      result: "**Implicated by Action** (His own gesture reveals his orchestration)",
      notes: "'The high priest tore his clothes' (Matthew 26:65) — a ritual act of outrage that conveniently supplied the verdict he'd already decided on."
    },
    {
      evidence: "false_scroll",
      suspect: "false_witness",
      result: "**Discredited** (Revealed as a false witness)",
      notes: "'Many testified falsely against him, but their statements did not agree' (Mark 14:56) — the case needed manufactured testimony because none of it held together."
    },
    {
      evidence: "rooster_feather",
      suspect: "peter_denial",
      result: "**Motive Established** (Fear and denial, not conspiracy)",
      notes: "'Before the rooster crows, you will disown me three times' (Matthew 26:34) — foretold at the table, fulfilled in the courtyard."
    }
  ],

  intro: formatIntro(`The moon has set behind the Temple Mount. In the courtyard of the High Priest's residence, a surreal scene unfolds: Jesus stands before a hastily assembled tribunal, accused of blasphemy. Inside, false witnesses testify against Him. Outside, by a charcoal fire, a certain disciple warms himself—for the moment. **The rooster's crow will change everything.**`),

  suspects: [
    { id: "chief_priest", name: "Caiaphas", role: "High Priest", avatar: "caiaphas.svg", bibleRef: "Matthew 26:57" },
    { id: "false_witness", name: "Ananias", role: "Hired Accuser", avatar: "ananias_witness.svg", bibleRef: "Mark 14:56" },
    { id: "peter_denial", name: "Peter", role: "Denying Disciple",       avatar: "peter.svg", bibleRef: "Matthew 26:69-75" },
    { id: "none", name: "No One", role: "Not Guilty", avatar: "nicodemus.svg", bibleRef: null },
  ],

  evidencePool: [

    {
      id: "rooster_feather",
      name: "Rooster Feather",
      relatedProphecy: "-",
      type: "physical",
      icon: "🪶",
      location: "Courtyard Floor",
      desc: "A small feather found near the charcoal fire where Peter stood. The sound of the crowing still echoes in the air.",
      bibleRef: "Matthew 26:74-75",
      bibleLink: "matthew_26_74_75",
      propheticLink: "The third denial led to the third crowing, fulfilling Jesus's own prediction of Peter's failure (Matthew 26:34). Supporting/narrative evidence — not directly Codex-linkable to one of this case's four defined prophecies.",
      bibleRefs: [
        { ref: "Matthew 26:74-75", link: "matthew_267475" },
        { ref: "Zechariah 13:7", link: "zechariah_137" }
      ],
      propheticRefs: [
        { ref: "Matthew 26:34", link: "matthew_2634" }
      ],
      investigatorNote: "This feather marks the site of the most famous denial in history.",
      fake: false,
      category: 'event',
      timelineOrder: 6,
      clues: {
        compare: "Marks the exact moment and place of Peter's third denial, fulfilling what Jesus predicted at the Supper.",
        link: "Event — a feather from the rooster whose crowing marked Peter's third denial.",
        timeline: "CHRONOLOGY: Found at dawn, at the very end of the night's proceedings.",
        contradict: "RELIABILITY: The timing lines up exactly with Jesus's own prediction hours earlier (Matthew 26:34)."
      },
    }, {
      id: "torn_robe",
      name: "Priestly Robe Fragment",
      relatedProphecy: "isaiah_50_6",
      type: "physical",
      icon: "../assets/gfx/shield-duotone.svg",
      location: "Judgment Seat",
      desc: "A clean, white piece of high-grade linen torn from a priestly garment. It bears the tear marks of deliberate ripping.",
      bibleRef: "Matthew 26:65",
      bibleLink: "matthew_26_65",
      propheticLink: "Caiaphas tore his robes to signal blasphemy when Jesus affirmed His divinity.",
      bibleRefs: [
        { ref: "Matthew 26:65", link: "matthew_2665" },
        { ref: "Isaiah 50:6", link: "isaiah_506" }
      ],
      propheticRefs: [],
      investigatorNote: "The tear was ritual declaration that Jesus had committed the unforgivable offense.",
      fake: false,
      category: 'people',
      timelineOrder: 3,
      clues: {
        compare: "The turning point of the trial — pairs with the perjured testimony that came just before it collapsed the prosecution's case.",
        link: "People — Caiaphas's own robe, ritually torn the moment Jesus affirmed His divine identity.",
        timeline: "CHRONOLOGY: Torn partway through the night, once the witness testimony had already fallen apart.",
        contradict: "RELIABILITY: A public, ritual act performed by the High Priest himself — not a detail anyone could misremember."
      },
    }, {
      id: "false_scroll",
      name: "Conflicting Depositions",
      relatedProphecy: "psalm_27_12",
      type: "analytical",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Council Chamber",
      desc: "Scraps of parchment recording the claims of witnesses. The details about destroying the Temple do not match.",
      bibleRef: "Mark 14:56-59",
      bibleLink: "mark_14_56_59",
      propheticLink: "The lack of consistent testimony exposes the trial as a fabrication.",
      bibleRefs: [
        { ref: "Mark 14:56-59", link: "mark_145659" },
        { ref: "Psalm 27:12", link: "psalm_2712" }
      ],
      propheticRefs: [],
      investigatorNote: "No single witness could agree—so they had to manufacture testimony.",
      fake: false,
      category: 'people',
      timelineOrder: 2,
      clues: {
        compare: "Sets up the torn robe — the failed testimony is exactly why Caiaphas had to resort to a direct question.",
        link: "People — a record of the witness statements brought against Jesus, none of which agreed.",
        timeline: "CHRONOLOGY: Collected early in the night, before the council abandoned witnesses for a direct interrogation.",
        contradict: "RELIABILITY: Mark 14:56 explicitly states the testimony did not agree — the record documents the prosecution's own failure."
      },
    }, {
      id: "charcoal_remains",
      name: "Charcoal Briquette",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/flame-duotone.svg",
      location: "Courtyard Fire Pit",
      desc: "A charred piece of olive wood from the courtyard fire. Its arrangement suggests recent burning.",
      bibleRef: "John 18:18",
      bibleLink: "john_18_18",
      propheticLink: "Peter's denial by the fire fulfilled Jesus's prediction that he would deny three times.",
      bibleRefs: [
        { ref: "John 18:18", link: "john_1818" }
      ],
      propheticRefs: [],
      investigatorNote: "The fire was a place of warmth—and of betrayal.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "The setting for Peter's whole ordeal — ties together the rooster feather and Peter's presence in the courtyard.",
        link: "Event — the remains of the fire Peter warmed himself by while waiting in the courtyard.",
        timeline: "CHRONOLOGY: Burning from early in the night, throughout the entire trial happening inside.",
        contradict: "RELIABILITY: John 18:18 places Peter at exactly this fire, warming himself among the guards."
      },
    }, {
      id: "guard_reed",
      name: "Guard's Reed",
      type: "physical",
      relatedProphecy: "micah_5_1",
      icon: "../assets/gfx/leaf-duotone.svg",
      location: "Courtyard Floor",
      desc: "A reed, similar to a staff, used by the guards to strike Jesus on the head in mockery.",
      bibleRef: "Matthew 26:67–68",
      propheticLink: "Micah 5:1 prophesied that Israel's ruler would be struck. The guards' mockery with the reed is a literal fulfillment of this humiliation.",
      bibleRefs: [
        { ref: "Matthew 26:67-68", link: "matthew_26_67_68" }
      ],
      propheticRefs: [
        { ref: "Micah 5:1", link: "micah_5_1" }
      ],
      investigatorNote: "The reed was a symbol of kingship, used here to mock Jesus's claim to be a king.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "Follows the formal condemnation — the mockery that came once the council had already reached its verdict.",
        link: "Event — the reed used by the guards to mock Jesus as a false king after the verdict.",
        timeline: "CHRONOLOGY: Used after the council's judgement, as the guards began their mockery.",
        contradict: "RELIABILITY: A physical prop of humiliation, matching Matthew's account of a reed placed in His hand and used to strike Him."
      },
    },
    {
      id: "perjured_testimony",
      name: "Perjured Witness Statement",
      type: "analytical",
      relatedProphecy: "psalm_35_11",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Council Chamber",
      desc: "A statement from a witness whose testimony was inconsistent with others, revealing the fabricated nature of the charges.",
      bibleRef: "Mark 14:57–59",
      propheticLink: "'Ruthless witnesses come forward' precisely matches the false testimony at the trial, as prophesied in Psalm 35:11.",
      bibleRefs: [
        { ref: "Mark 14:57-59", link: "mark_14_57_59" }
      ],
      propheticRefs: [
        { ref: "Psalm 35:11", link: "psalm_35_11" }
      ],
      investigatorNote: "The desperation to find witnesses, any witnesses, shows the weakness of the prosecution's case.",
      fake: false,
      category: 'people',
      timelineOrder: 2,
      clues: {
        compare: "One of the individual statements that make up the false scroll's record of disagreement.",
        link: "People — a single false witness's statement, contradicted by every other account given that night.",
        timeline: "CHRONOLOGY: Given early in the proceedings, part of the failed attempt to build a case.",
        contradict: "RELIABILITY: The desperation to produce any usable testimony exposes the weakness of the prosecution's actual case."
      },
    }

  ],

  npcs: [
    {
      id: "caiaphas_trial",
      name: "Caiaphas",
      role: "High Priest",
      faction: "temple",
      unlocksSuspects: ["chief_priest"],
      avatar: "caiaphas.svg",
      profileFile: "caiaphas",
      color: 0xcc8888,
      pos: [0, 0, 0],
      truthfulness: 0.4,
      bibleRef: "Matthew 26:57-68; John 11:49-52",
      hasDialogue: true,
      storyFile: "caiaphas_priest",
      background: "Joseph ben Caiaphas presided over the late-night tribunal. Fearing Roman intervention, he orchestrated Jesus's condemnation.",
      dialogue: {
        neutral: "The council has spoken. The prisoner has condemned Himself.",
        cautious: "We asked legitimate questions. A teacher claiming divinity has obligations to the Law.",
        pressured: "He answered our questions with silence at first—then with blasphemy when pressed.",
        exposed: "When He said 'I am,' and 'you will see the Son of Man seated at the right hand of Power'—that was not silence anymore. That was the unforgivable claim.",
        repeat: "The decision is unanimous. There is nothing more to discuss.",
      },
      reactions: {
        torn_robe: { text: "I tore my robes when He said the words that confirmed His guilt. The Law demands this response.", isLie: false },
        false_scroll: { text: "The witnesses were... inconsistent on some details. But the verdict stands.", isLie: true },
        charcoal_remains: { text: "The courtyard was cold. The fire was for warmth, nothing more.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "peter_denial_trial",
      name: "Peter",
      role: "Denying Disciple",
      faction: "scribes",
      unlocksSuspects: ["peter_denial"],
      avatar: "peter.svg",
      profileFile: "peter",
      color: 0xffaa44,
      pos: [12, 0, 8],
      truthfulness: 0.7,
      bibleRef: "Matthew 26:69-75; Mark 14:66-72; John 18:15-27",
      hasDialogue: true,
      storyFile: "peter_denial",
      background: "Peter had boasted he would never deny the Master. Now, in the courtyard, fear has seized him.",
      dialogue: {
        neutral: "I tell you, I do not know the man!",
        cautious: "It was a dark courtyard. I was hardly paying attention to what they were saying.",
        pressured: "They kept asking, and I kept denying. Each time, my words felt heavier.",
        exposed: "The third time—the third time—he looked at me. And I remembered. And I went out and wept bitterly.",
        repeat: "I have nothing more to say. Leave me.",
      },
      reactions: {
        rooster_feather: { text: "That sound... that sound haunted me for the rest of the night. And for the rest of my life.", isLie: false, revealedClue: "torn_robe" },
        charcoal_remains: { text: "I was just warming myself. I was just... distancing myself.", isLie: true },
        torn_robe: { text: "I heard the tearing. I heard the outrage. I was relieved they had decided He was guilty.", isLie: false },
      },
      contradictions: {
        "rooster_feather+charcoal_remains": { exposed: "The fire was supposed to keep me warm. Instead, it became the place where my courage burned away." },
      },
    },
    {
      id: "false_witness_trial",
      name: "Ananias",
      role: "Hired Accuser",
      faction: "temple",
      unlocksSuspects: ["false_witness"],
      avatar: "ananias_witness.svg",
      profileFile: "ananias_witness",
      color: 0x94a3b8,
      pos: [-5, 0, -5],
      truthfulness: 0.2,
      hasDialogue: true,
      storyFile: "false_witness",
      bibleRef: "Mark 14:56-58",
      hasDialogue: true,
      background: "One of the men paid to testify against Jesus. His testimony was bought—and easily discredited.",
      dialogue: {
        neutral: "I heard Him say He would destroy the Temple. That was enough for me.",
        cautious: "They gave me instructions before I entered. Specific words to say.",
        pressured: "Yes, I was paid. The truth has to be flexible when the stakes are this high.",
        exposed: "The other witnesses and I could not agree on details. 'Destroy this Temple'—in what timeframe? It was embarrassing.",
        repeat: "The payment was sufficient. The message was sufficient.",
      },
      reactions: {
        false_scroll: { text: "That is my handwriting. I recorded what they told me to say.", isLie: false },
        torn_robe: { text: "When the High Priest tore his robes, I knew they had the answer they wanted.", isLie: false },
      },
      contradictions: {},
    },
  ],

  deductions: {
    "rooster_feather+torn_robe": {
      timeline: {
        text: "Peter's third denial coincided with the High Priest's dramatic tear of his robes—two moments of judgment on the same night.",
        insight: "While the tribunal pronounced condemnation on the Son of God, a disciple pronounced condemnation on himself through denial.",
        isKey: true,
        bibleRef: "Matthew 26:74-75; 26:65",
      },
    },
    "torn_robe+false_scroll": {
      link: {
        text: "The torn high-priestly robe and the conflicting witness testimonies together reveal the orchestrated nature of the trial.",
        insight: "Caiaphas's own actions—tearing his robes at the 'right' moment—combined with Ananias's paid testimony, expose the pre-planned condemnation of Jesus.",
        isKey: true,
        revealsProphecy: "isaiah_50_6",
        bibleRef: "Matthew 26:59-68; Isaiah 50:6",
      },
    },
    "false_scroll+torn_robe": {
      compare: {
        text: "The false scroll's contradictory testimonies are laid bare against the torn robe's evidence of the High Priest's emotional manipulation.",
        insight: "Psalm 27:12 and Psalm 35:11 both warn of malicious witnesses rising up. Ananias's paid testimony, exposed as inconsistent, is a direct fulfillment of these warnings.",
        isKey: true,
        revealsProphecy: "psalm_27_12",
        bibleRef: "Matthew 26:59-61; Psalm 27:12; Psalm 35:11",
      },
    },
    "false_scroll+charcoal_remains": {
      contradict: {
        text: "The conflicting witness testimony and the presence of the courtyard fire show the contrast between manufactured evidence and genuine human weakness.",
        insight: "While false witnesses could not agree, Peter's denials were uncomfortably consistent—confirming his presence and his failure.",
        isKey: true,
        bibleRef: "Matthew 26:56; 26:75",
      },
    },
    "guard_reed+torn_robe": {
      link: {
        text: "The mocking reed and the torn robe belong to the same verdict — one is the council's ritual outrage, the other the guards' physical contempt.",
        insight: "The reed used to strike a bound, silent prisoner is a mock scepter — soldiers making sport of a claim to kingship they'd just heard condemned as blasphemy.",
        isKey: true,
        revealsProphecy: "micah_5_1",
        bibleRef: "Matthew 26:65-68; Micah 5:1",
      },
    },
    "perjured_testimony+false_scroll": {
      compare: {
        text: "The perjured witness statement and the false scroll are two records of the same failure — every attempt to make the testimony agree falls apart on comparison.",
        insight: "'Even then their testimony did not agree' (Mark 14:59) — the prosecution needed two matching witnesses under the Law and never produced them.",
        isKey: false,
        bibleRef: "Mark 14:56-59; Psalm 35:11",
      },
    },
  },

  truth: {
    culprit: "caiaphas",
    motive: "Blasphemy charge used as political leverage to secure Roman execution.",
    method: "The Sanhedrin manufactured testimony and pressured Jesus to pronounce judgment on Himself through His own words.",
    lesson: "The trial was a collection of procedural illegalities. Peter's failure shows the human condition, while Jesus's silence shows divine resolve.",
    prophesyFulfilled: ["Isaiah 50:6", "Micah 5:1", "Psalm 27:12"],
    furtherReading: ["Matthew 26:57–68", "Mark 14:53–65", "Luke 22:54–71"],
  },
};

// ============================================================
// ACT: Act III
// CASE: The People's Choice
// CASE ID: barabbas_choice
// CASE EXPORT: act3CaseD
// SOURCE: act3_case.js
//
// LOCATION:
//   Praetorium, Jerusalem
//
// DIFFICULTY:
//   3
//
// BACKGROUND:
//   On the morning of Passover, Pontius Pilate sought a way to
//   release Jesus after repeatedly declaring that He had committed
//   no crime deserving death. Following the Passover custom,
//   Pilate offered the crowd a choice between Jesus and Barabbas,
//   a notorious insurrectionist, murderer, and robber. Stirred up
//   by the chief priests, the crowd demanded Barabbas's release
//   and called for Jesus to be crucified. Though warned by his
//   wife's troubling dream and convinced of Jesus's innocence,
//   Pilate yielded to public pressure, symbolically washing his
//   hands before authorizing the execution.
//
// BIBLE REFERENCES:
//   Matthew 27:15–26
//   Mark 15:6–15
//   Luke 23:13–25
//   John 18:38–40
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
//   • Isaiah 53:3
//     "He was despised and rejected by mankind..."
//     Fulfilled when the crowd publicly rejected the Messiah and
//     chose the release of Barabbas instead.
//
//   • Psalm 2:1–2
//     "The kings of the earth rise up and the rulers band
//     together against the LORD and against His Anointed."
//     Fulfilled as Pilate, Herod, and the Jewish authorities
//     united in condemning Jesus despite His innocence.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
//   Summary:
//   Pilate offered the people a choice between Jesus and
//   Barabbas. Influenced by the religious leaders, the crowd
//   demanded the freedom of a violent revolutionary while
//   rejecting the Prince of Peace.
//
//   Historical Context:
//   During Passover the Roman governor customarily released one
//   prisoner as an act of goodwill. Barabbas was imprisoned for
//   insurrection and murder, making the crowd's choice a striking
//   contrast between earthly revolution and God's Kingdom.
//   Pilate attempted to avoid responsibility but ultimately
//   surrendered justice to political pressure.
//
//   Spiritual Theme:
//   Rejection of the Messiah, substitution, political compromise,
//   and humanity's preference for worldly power over God's
//   salvation.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
//   Crime:
//     Apparent miscarriage of justice during the Roman trial.
//
//   Actual Event:
//     Religious leaders manipulated the crowd into demanding the
//     release of Barabbas while Pilate condemned an innocent Jesus
//     despite publicly acknowledging His innocence.
//
//   Culprit:
//     None.
//
//   Motive:
//     The crowd, influenced by the chief priests, preferred a
//     political revolutionary over the suffering Messiah, while
//     Pilate sacrificed justice to preserve public order.
//
//   Verdict:
//     No criminal conspiracy by Barabbas determined the outcome.
//     The rejection of Jesus fulfilled Messianic prophecy and
//     demonstrated humanity's willingness to exchange innocence
//     for violence.
//
// ============================================================

export const act3CaseD = {
  id: "barabbas_choice",
  icon: '../assets/gfx/crown-duotone.svg',
  title: "The People's Choice",
  subtitle: "Pilate offers a choice between a Prince of Peace and a man of violence. Who will the crowd choose?",
  location: "praetorium",
  timeOfDay: "day",
  difficulty: 3,
  requires: "sanhedrin_trial",
  actLabel: "Act III - The Last Supper",
  color: 0xa78bfa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Judgment Review", task: "Review the release of Barabbas", cur: 0, tar: 3 },

  biblicalContext: {
    summary: "During the Passover, the Roman governor released one prisoner. Pilate offered Jesus or Barabbas. The crowd, stirred by the priests, chose the insurgent.",
    significance: "This choice represents the rejection of God's Kingdom in favor of earthly revolution and power.",
    historicalNote: "Barabbas was an insurrectionist who had committed murder in a rebellion, making him the direct opposite of Jesus's peaceful message."
  },

  prophecies: [
    {
      reference: "Isaiah 53:3",
      id: "isaiah_53_3",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"He was despised and rejected by mankind, a man of suffering, and familiar with pain. Like one from whom people hide their faces he was despised, and we held him in low esteem."`,
      written: "~700 BC",
      fulfilledBy: "The crowd choosing a murderer over the Messiah",
      gospelLink: "Matthew 27:21-23",
      insight: "The prophecy of rejection was fulfilled in the most public way possible: the people literally voted for His death while sparing a criminal.",
    },
    {
      reference: "Psalm 2:1-2",
      id: "psalm_2_1_2",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Why do the nations conspire and the peoples plot in vain? The kings of the earth rise up and the rulers band together against the LORD and against his anointed."`,
      written: "~1000 BC",
      fulfilledBy: "The Roman Governor and Jewish leaders collaborating under public pressure",
      gospelLink: "Luke 23:12",
      insight: "Herod and Pilate became friends on this day, united in their handling of Jesus, fulfilling the pattern of rulers banding together against the Anointed One.",
    }
  ],

  lab: [
    {
      evidence: "barabbas_warrant",
      suspect: "barabbas_insurgent",
      result: "**Cleared** (He was the beneficiary, not the cause)",
      notes: "'Release Barabbas to us!' (Luke 23:18) — a guilty insurrectionist walked free while an innocent man took his sentence."
    },
    {
      evidence: "pilates_basin",
      suspect: "pontius_pilate_trial", // Suspect ID from npcs list
      result: "**Has Alibi** (Publicly washed his hands of the matter)",
      notes: "'I am innocent of this man's blood' (Matthew 27:24) — a gesture of denial, not the acquittal his own authority could have granted."
    }
  ],
  intro: formatIntro(`It is now early Friday morning. Pilate, seeking to avoid responsibility, has offered the crowd a Passover custom: the release of one prisoner. He presents them with Jesus, whom he has declared innocent, and **Barabbas**, a notorious insurrectionist and murderer. The chief priests stir up the crowd, and their choice will fulfill one of the most poignant prophecies about the Messiah.`),

  suspects: [
    { id: "barabbas_insurgent", name: "Barabbas", role: "Released Criminal", avatar: "barabbas.svg", bibleRef: "Matthew 27:16" },
    { id: "none", name: "No One", role: "Fulfillment", avatar: "nicodemus.svg", bibleRef: null }
  ],

  evidencePool: [

    {
      id: "pilates_basin",
      name: "The Governor's Silver Basin",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/bowl-duotone.svg",
      location: "The Praetorium Bema",
      desc: "A silver basin containing clouded water. Pilate used it to wash his hands in front of the crowd, a symbolic act of disavowal.",
      bibleRef: "Matthew 27:24 — 'I am innocent of this man’s blood; see to it yourselves.'",
      bibleRefs: [
        { ref: "Matthew 27:24", link: "matthew_2724" }
      ],
      propheticRefs: [],
      investigatorNote: "A Roman official using a Jewish ritual gesture. It shows his desperation to shift legal responsibility to the mob.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "Pilate's final act after ignoring both the warning scroll and the insurgent's dossier.",
        link: "Event — the basin Pilate used to wash his hands, borrowing a Jewish ritual gesture of innocence.",
        timeline: "CHRONOLOGY: Used last, once the crowd had made its choice and the verdict was set.",
        contradict: "RELIABILITY: A Roman governor invoking a Jewish purification rite is a highly unusual, deliberate act — not routine procedure."
      },
    }, {
      id: "wifes_letter",
      name: "Claudia's Warning Scroll",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/envelope-duotone.svg",
      location: "Pilate's Private Quarters",
      desc: "A small piece of parchment sent by Pilate's wife. It warns: 'Don’t have anything to do with that innocent man, for I have suffered a great deal today in a dream because of him.'",
      bibleRef: "Matthew 27:19",
      bibleRefs: [
        { ref: "Matthew 27:19", link: "matthew_2719" }
      ],
      propheticRefs: [],
      investigatorNote: "Divine warning reached the Roman household before the verdict. Pilate ignored the dream for political safety.",
      fake: false,
      category: 'people',
      timelineOrder: 1,
      clues: {
        compare: "The first warning Pilate received — and the first he chose to ignore, before the crowd was even offered a choice.",
        link: "People — Claudia's own written warning, sent to Pilate during the proceedings.",
        timeline: "CHRONOLOGY: Delivered early, while Pilate was still seated on the judgment seat.",
        contradict: "RELIABILITY: Matthew 27:19 records the warning arriving during the trial itself, not after the fact."
      },
    }, {
      id: "barabbas_warrant",
      name: "The Insurgent's Dossier",
      type: "analytical",
      relatedProphecy: "isaiah_53_3",
      icon: "../assets/gfx/barabbas.svg",
      location: "Antonia Fortress Record Room",
      desc: "A Roman arrest record for 'Jesus Barabbas.' Charges include insurrection, murder, and robbery. He is an ultra-nationalist zealot.",
      bibleRef: "Mark 15:7; John 18:40",
      bibleRefs: [
        { ref: "Mark 15:7", link: "mark_157" },
        { ref: "John 18:40", link: "john_1840" }
      ],
      propheticRefs: [],
      investigatorNote: "Barabbas was the very thing Rome feared—a violent rebel. Yet the crowd chose him to be set free.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Explains exactly who the crowd chose over Jesus — an arrest record for a convicted insurrectionist.",
        link: "Event — the Roman arrest record for Barabbas, listing insurrection, murder, and robbery.",
        timeline: "CHRONOLOGY: On file before the trial, describing the man already awaiting sentence when the choice was offered.",
        contradict: "RELIABILITY: An official Roman charge sheet, confirmed by both Mark 15:7 and John 18:40."
      },
    }
    ,
    {
      id: "joint_verdict",
      name: "Joint Verdict Scroll",
      type: "analytical",
      relatedProphecy: "psalm_2_1_2",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Praetorium Records",
      desc: "A record showing that Herod and Pilate, once enemies, conferred and agreed on the verdict for Jesus.",
      bibleRef: "Luke 23:12",
      propheticLink: "Herod and Pilate become allies against God's Anointed, fulfilling Psalm 2's prophecy of rulers banding together against the LORD.",
      bibleRefs: [
        { ref: "Luke 23:12", link: "luke_23_12" },
        { ref: "Psalm 2:1-2", link: "psalm_212" }
      ],
      propheticRefs: [
        { ref: "Psalm 2:1-2", link: "psalm_2_1_2" }
      ],
      investigatorNote: "The political alliance formed over this single judicial case highlights the threat Jesus posed to both Roman and Jewish power structures.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "Follows the warrant — records the crowd's actual choice between the two men described in it.",
        link: "Event — the scroll recording the crowd's demand and the political alliance it produced between Herod and Pilate.",
        timeline: "CHRONOLOGY: Drawn up as the crowd made its demand, shortly before Pilate's basin.",
        contradict: "RELIABILITY: Luke 23:12 independently notes Herod and Pilate became friends that very day, over this case."
      },
    }

  ],

  suspects: [
    { id: "barabbas_insurgent", name: "Barabbas", role: "Released Criminal", avatar: "barabbas.svg", bibleRef: "Matthew 27:16" },
    { id: "none", name: "No One", role: "Fulfillment", avatar: "nicodemus.svg", bibleRef: null }
  ],

  npcs: [
    {
      id: "pontius_pilate_trial",
      name: "Pontius Pilate",
      role: "Roman Prefect",
      faction: "roman",
      avatar: "pontius_pilate.svg",
      profileFile: "pontius_pilate",
      truthfulness: 0.5,
      bibleRef: "Luke 23:1-25; John 18:38-40",
      hasDialogue: true,
      storyFile: "pontius_pilate_barabbas",
      unlocksEvidence: ["pilates_basin", "wifes_letter"],
    },
    {
      id: "barabbas_insurgent_trial",
      name: "Barabbas",
      role: "Released Criminal",
      faction: "local",
      avatar: "barabbas.svg",
      profileFile: "barabbas",
      truthfulness: 0.3,
      bibleRef: "Mark 15:6-15",
      hasDialogue: true,
      storyFile: "barabbas_insurgent",
      unlocksSuspects: ["barabbas_insurgent"],
      unlocksEvidence: ["barabbas_warrant"],
    }
  ],

  deductions: {
    "pilates_basin+wifes_letter": {
      link: {
        text: "Pilate's hand-washing and his wife's warning show a man acting against his own conscience.",
        insight: "He knew the man was innocent, yet he used a ritual to try and 'wash away' a legal murder for the sake of political stability.",
        isKey: true,
        bibleRef: "Matthew 27:19, 24",
      },
      contradict: {
        text: "The warning arrived before the verdict; the basin came after it. Pilate had the information he needed to stop this in time, and used a ritual instead.",
        insight: "A private dream and a public washbowl can't both be read as innocence — one was an early chance to act, the other was a late attempt to look like he had.",
        isKey: false,
        bibleRef: "Matthew 27:19; 27:24",
      },
    },
    "barabbas_warrant+pilates_basin": {
      compare: {
        text: "Rome's dossier on Barabbas and Pilate's public disavowal reveal the ultimate legal irony.",
        insight: "The state released a proven enemy of Rome (Barabbas) while executing one they admitted was innocent (Jesus) to appease a crowd.",
        isKey: true,
        revealsProphecy: "isaiah_53_3",
        bibleRef: "Mark 15:7, 14",
      }
    },
    "barabbas_warrant+joint_verdict": {
      compare: {
        text: "The insurgent's dossier and the record of Herod and Pilate's new alliance sit side by side as the day's two verdicts: a guilty man released, an innocent man condemned by rulers who'd just become friends over Him.",
        insight: "Psalm 2:1-2 pictured the rulers of the earth banding together against the LORD's Anointed. Two rival governors did exactly that, on the same afternoon they freed a murderer instead.",
        isKey: true,
        revealsProphecy: "psalm_2_1_2",
        bibleRef: "Luke 23:12; Mark 15:7; Psalm 2:1-2",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "The crowd preferred a political savior who would fight Rome over a spiritual savior who would suffer for them.",
    method: "Pressure from the religious leadership manipulated the Roman legal process to release a known killer.",
    lesson: "The rejection of Jesus was a choice of the many, not just a few, highlighting the depth of human brokenness.",
    prophesyFulfilled: ["Isaiah 53:3"],
    furtherReading: ["Matthew 27:15-26"]
  }
};

// ============================================================
// ACT: III — The Passion
// CASE: The Final Sacrifice
// CASE ID: crucifixion_site
// CASE EXPORT: act3CaseE
// SOURCE: act3_case.js
//
// LOCATION:
// Golgotha (Calvary), outside the walls of Jerusalem
//
// DIFFICULTY:
// ★★★ (3/3)
//
// BACKGROUND:
// Following His condemnation by Pilate, Jesus was led to Golgotha and
// crucified between two criminals under Roman authority. During the
// crucifixion, extraordinary events occurred: darkness covered the land,
// Jesus died after several hours on the cross, the Temple veil was torn,
// the earth shook, rocks split, and His side was pierced instead of His
// legs being broken. Joseph of Arimathea then requested His body and
// buried Him in his own new tomb.
//
// BIBLE REFERENCES:
// Matthew 27:32–61
// Mark 15:21–47
// Luke 23:26–56
// John 19:16–42
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
// • Psalm 22:16–18 — Hands and feet pierced; soldiers cast lots for
//   His garments.
// • Amos 8:9 — Supernatural darkness at midday.
// • Isaiah 53:9 — Buried with the rich despite dying among criminals.
// • Zechariah 12:10 — His side was pierced.
// • Psalm 34:20 / Exodus 12:46 — None of His bones were broken.
// • Psalm 31:5 — "Into Your hands I commit My spirit."
// • Jeremiah 31:31–34 — The torn Temple veil symbolized the New Covenant.
// • Haggai 2:6–7 — Earthquake accompanying God's redemptive work.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
// Summary:
// Jesus willingly gave His life as the perfect sacrifice for humanity's
// sin. His death fulfilled numerous Messianic prophecies simultaneously,
// demonstrating that the crucifixion was not an accident of history but
// the culmination of God's redemptive plan.
//
// Historical Context:
// Roman crucifixion was reserved for the empire's worst criminals and
// rebels. Executions were public displays intended to deter rebellion.
// Because Passover Sabbath was approaching, the authorities hurried the
// process, leading to the spear thrust that confirmed Jesus' death
// without breaking His legs.
//
// Spiritual Theme:
// The Cross represents God's justice and mercy meeting together.
// Christ became the true Passover Lamb, opening direct access to God.
// The torn veil, darkness, earthquake, and fulfilled prophecies all
// testify that His death changed both history and eternity.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
// Crime:
// Crucifixion under Roman authority following an unjust conviction.
//
// Actual Event:
// Jesus voluntarily laid down His life on the cross, fulfilling numerous
// Old Testament prophecies while supernatural signs confirmed the
// significance of His death.
//
// Culprit:
// No human culprit alone. Roman authorities carried out the execution,
// Jewish leaders orchestrated the charges, but the crucifixion ultimately
// fulfilled God's redemptive plan.
//
// Motive:
// To accomplish humanity's redemption through the sacrificial death of
// the Messiah and establish the New Covenant.
//
// Verdict:
// The physical evidence—including the darkness, earthquake, torn Temple
// veil, unbroken bones, pierced side, soldiers casting lots, and burial
// in a rich man's tomb—consistently confirms the Gospel accounts and the
// fulfillment of multiple Messianic prophecies.
//
// ============================================================

export const act3CaseE = {

  id: "crucifixion_site",
  icon: '../assets/gfx/cross-duotone.svg',
  title: "The Final Sacrifice",
  subtitle: "The sky has turned to ink and the ground is groaning. On the hill of execution, the records of Rome and Jerusalem are being rewritten by the rocks themselves.",
  location: "golgotha",
  timeOfDay: "night",
  difficulty: 3,
  requires: "barabbas_choice",
  actLabel: "Act III - The Last Supper",
  color: 0xef4444,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Golgotha Forensics", task: "Analyze the seismic and cosmic anomalies", cur: 0, tar: 3 },

  biblicalContext: {
    summary: `On Friday morning, Nisan 14, Jesus was led out of Jerusalem to a rocky hill called Golgotha to be executed between two insurrectionists. For three hours, an eerie, supernatural darkness covered the entire land. At 3:00 PM, Jesus cried out and gave up His spirit. Instantly, a localized earthquake ripped through Judea, splitting rocks, opening tombs, and tearing the massive Temple veil clean in two from top to bottom. To accelerate burial before the Sabbath sunset, a Roman soldier pierced His side, yielding an unexpected flow of blood and water.`,
    significance: `This case records the ultimate paradox of the Passion Week: an execution meant to act as a public deterrent of Roman shame became the epic center of cosmic and theological transformation. The tearing of the heavy Temple curtain declared that the barrier between God and humanity had been permanently removed, while the unbroken bones identified Jesus as the true Passover Lamb.`,
    historicalNote: `Crucifixion squads under Pontius Pilate were highly efficient, professional units. The execution details were tightly managed, making the accompanying seismic rifts, sudden midday darkness, and structural Temple failures deeply disruptive anomalies to veteran legionaries and Temple priests alike.`,
  },

  prophecies: [
    {
      reference: "Psalm 22:16–18",
      id: "psalm_22_16_18",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"They have pierced my hands and my feet... they divide my garments among them and cast lots for my clothing."`,
      written: "~1000 BC",
      fulfilledBy: "Roman soldiers nailing Jesus to the cross and gambling for His seamless garment",
      gospelLink: "Matthew 27:35; John 19:23–24",
      insight: "Crucifixion did not exist as a method of execution when David penned this Psalm. Yet, the details match precisely down to the soldiers dividing His outer garments into four parts and casting lots for His single woven tunic.",
    },
    {
      reference: "Amos 8:9",
      id: "amos_8_9",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"'In that day,' declares the Sovereign LORD, 'I will make the sun go down at noon and darken the earth in broad daylight.'"`,
      written: "~750 BC",
      fulfilledBy: "The supernatural three-hour darkness blanketing Judea from noon until 3:00 PM",
      gospelLink: "Mark 15:33; Luke 23:44–45",
      insight: "Passover always occurs during a full moon, making a natural solar eclipse astronomically impossible. The historical record of this prolonged noon darkness was so widely documented that non-Christian historians like Thallos and Phlegon actively tried to find natural explanations for it.",
    },
    {
      reference: "Isaiah 53:9",
      id: "isaiah_53_9",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"He was assigned a grave with the wicked, and with the rich in his death, though he had done no violence."`,
      written: "~700 BC",
      fulfilledBy: "Jesus dying alongside criminals but being buried in the clean, private rock-cut tomb of wealthy Joseph of Arimathea",
      gospelLink: "Matthew 27:57–60; John 19:38–42",
      insight: "Executed criminals were routinely thrown into mass, unmarked graves or left to historical decay. The sudden intervention of a wealthy Sanhedrin member fulfilled Isaiah's binary paradox to the letter.",
    },
    {
      reference: "Zechariah 12:10",
      id: "zechariah_12_10",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"They will look on me, the one they have pierced, and they will mourn for him as one mourns for an only child."`,
      written: "~520 BC",
      fulfilledBy: "The legionary piercing Jesus's side with a spear, and the surrounding crowd departing in deep grief",
      gospelLink: "John 19:34–37; Luke 23:48",
      insight: "To ensure death without breaking His legs (which would violate the Passover lamb protocol), a soldier delivered a post-mortem spear thrust. The resulting discharge of blood and water clinically confirmed death by cardiac rupture or extreme physical trauma.",
    },
    {
      reference: "Psalm 34:20",
      id: "psalm_34_20",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"He protects all his bones; not one of them will be broken."`,
      written: "~1000 BC",
      explanation: "This prophecy, linked to the Passover lamb requirement (Exodus 12:46), was fulfilled when the soldiers pierced Jesus's side to confirm death instead of breaking His legs.",
    },
    {
      reference: "Psalm 31:5",
      id: "psalm_31_5",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Into your hand I commit my spirit."`,
      written: "~1000 BC",
      explanation: "Jesus's final words from the cross were a direct quote from this Psalm, showing His willing surrender of His life into the Father's hands.",
    }
    ,
    {
      reference: "Psalm 69:21",
      id: "psalm_69_21",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"They put gall in my food and gave me vinegar for my thirst."`,
      written: "~1000 BC",
      explanation: "This prophecy was fulfilled when Jesus was offered sour wine (vinegar) on a hyssop branch during His crucifixion.",
    },
    {
      reference: "Jeremiah 31:31–34",
      id: "jeremiah_31_31_34",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Behold, the days are coming, declares the LORD, when I will make a new covenant... I will put my law within them, and I will write it on their hearts."`,
      written: "~627 BC",
      fulfilledBy: "The tearing of the Temple veil, symbolizing direct access to God under a New Covenant",
      gospelLink: "Matthew 27:51; Hebrews 10:19-22",
      insight: "The thick veil separated humanity from the Holy of Holies. Its tearing from top to bottom at the moment of Jesus's death was a divine sign that the old system was finished and the New Covenant, prophesied by Jeremiah, had begun.",
    },
    {
      reference: "Haggai 2:6–7",
      id: "haggai_2_6_7",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"For thus says the LORD of hosts: Yet once more, in a little while, I am going to shake the heavens and the earth... and I will fill this house with glory."`,
      written: "~520 BC",
      fulfilledBy: "The earthquake that struck at the moment of Jesus's death",
      gospelLink: "Matthew 27:51",
      insight: "Haggai prophesied a great shaking that would accompany the coming of God's glory. The earthquake at the cross was a physical manifestation of this cosmic event, signifying a shift in spiritual authority.",
    }

  ],

  intro: formatIntro(`The air over Golgotha is heavy with dust. The supernatural darkness that choked out the midday sun for three hours has finally lifted, revealing a scene of utter devastation. A violent tremor has split the limestone rifts of the hill, throwing down old tombs. Down in the city, panic has erupted over a structural disaster inside the Temple sanctuary itself. Up here, the execution detail stands frozen. Something **unprecedented** has just occurred—and the physical evidence left on this hill holds the answers.`),

  suspects: [
    { id: "centurion_longinus", name: "Longinus", role: "Roman Centurion", avatar: "centurion_longinus.svg", bibleRef: "Matthew 27:54 — 'When the centurion... saw the earthquake and all that had happened, they were terrified, and said, \"Surely he was the Son of God!\"'" },
    { id: "temple_priest_pashhur", name: "Pashhur", role: "Temple Priest on Shift",       avatar: "pashhur.svg",
      bibleRef: "Matthew 27:51 — 'At that moment the curtain of the temple was torn in two from top to bottom.'" },
    { id: "joseph_arimathea", name: "Joseph of Arimathea", role: "Secret Disciple & Council Member", avatar: "senior_scribe.svg", bibleRef: "John 19:38 — 'Joseph of Arimathea asked Pilate for the body of Jesus... With Pilate's permission, he came and took the body away.'" },
    { id: "none", name: "No One", role: "Divine/Cosmic Event", avatar: "nicodemus.svg", bibleRef: "Amos 8:9; Matthew 27:51 — The signs were acts of God, not human subversion" }
  ],

  evidencePool: [

    {
      id: "split_dice",
      name: "Soldiers' Casting Dice",
      type: "physical",
      relatedProphecy: "psalm_22_16_18",
      icon: "../assets/gfx/dice-duotone.svg",
      location: "Foot of the Central Cross",
      desc: "Four crude bone gaming dice dropped in the dust near a pile of discarded ropes, right where the soldiers gambled for the victim's clothes.",
      bibleRef: "John 19:23–24 — 'Let’s not tear it,' they said to one another. 'Let’s decide by lot who will get it.' This happened that the scripture might be fulfilled...",
      propheticLink: "Directly fulfills Psalm 22:18. While the victim hung dying, the indifferent execution detail executed a routine lottery for a high-quality, seamless tunic woven from top to bottom.",
      bibleRefs: [
        { ref: "John 19:23-24", link: "john_192324" }
      ],
      propheticRefs: [
        { ref: "Psalm 22:18", link: "psalm_2218" }
      ],
      investigatorNote: "The dice indicate a standard, procedural execution routine—until the noon darkness disrupted their shifts.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Sets the tone of routine procedure at the start — a contrast to the split rocks and torn veil that follow.",
        link: "Event — the dice the execution detail used to gamble for Jesus's seamless tunic.",
        timeline: "CHRONOLOGY: Cast early in the crucifixion, while the detail treated the execution as routine duty.",
        contradict: "RELIABILITY: John 19:24 records the soldiers acting exactly as described, fulfilling Psalm 22:18 without any awareness of doing so."
      },
    }, {
      id: "split_rocks",
      name: "Split Rocks",
      type: "physical",
      relatedProphecy: "haggai_2_6_7",
      icon: "../assets/gfx/earth-duotone.svg",
      location: "Golgotha Basal Rift",
      desc: "A freshly sheared section of Jerusalem limestone showing a sharp, jagged vertical fracture path triggered by a massive, sudden seismic wave.",
      bibleRef: "Matthew 27:51 — 'The earth shook, the rocks split and the tombs broke open.'",
      bibleLink: "matthew_27_51",
      propheticLink: "The earthquake at the moment of death fulfilled Haggai's prophecy that God would 'shake the heavens and the earth,' signifying a world-altering divine event.",
      bibleRefs: [
        { ref: "Matthew 27:51", link: "matthew_2751" }
      ],
      propheticRefs: [
        { ref: "Haggai 2:6-7", link: "haggai_2_6_7" }
      ],
      investigatorNote: "The split is clean and deep, indicating a severe tectonic movement centered right through the execution hill.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "Occurs at the same moment as the torn veil — both mark the instant of death.",
        link: "Event — bedrock split clean through by a violent tremor centered on the execution site.",
        timeline: "CHRONOLOGY: Split at the moment of death, alongside the tearing of the Temple veil.",
        contradict: "RELIABILITY: A deep, clean fracture consistent with genuine seismic force, not surface damage from human activity."
      },
    }, {
      id: "pierced_spear",
      name: "Blood-Stained Roman Hasta",
      type: "physical",
      relatedProphecy: "zechariah_12_10",
      icon: "../assets/gfx/dagger-duotone.svg",
      location: "Golgotha Guard Station",
      desc: "A heavy Roman iron spearhead stained with a clear, separated residue of deep red blood crust and transparent pericardial fluid.",
      bibleRef: "John 19:34 — 'Instead, one of the soldiers pierced Jesus’s side with a spear, bringing a sudden flow of blood and water.'",
      propheticLink: "Fulfills Zechariah 12:10 ('the one they have pierced') and protects the Passover Lamb requirement of Exodus 12:46 ('not one bone shall be broken'). The spear thrust proved the victim was already dead, making the leg-breaking unnecessary.",
      bibleRefs: [
        { ref: "John 19:34", link: "john_1934" }
      ],
      propheticRefs: [
        { ref: "Zechariah 12:10", link: "zechariah_1210" },
        { ref: "Exodus 12:46", link: "exodus_1246" }
      ],
      investigatorNote: "The fluid separation proves severe internal trauma. The medical signature matches a ruptured heart or extreme pleural effusion.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "Follows the unbroken legs — the alternative the soldiers chose once they found Jesus already dead.",
        link: "Event — the Roman spear used to confirm death, still bearing traces of blood and fluid.",
        timeline: "CHRONOLOGY: Used after the two criminals' legs were broken, once the soldiers reached Jesus and found Him already dead.",
        contradict: "RELIABILITY: The blood-and-water separation is a specific physiological detail John records as an eyewitness, not a generic embellishment."
      },
    }, {
      id: "torn_temple_veil",
      name: "The Torn Temple Veil",
      type: "physical",
      relatedProphecy: "jeremiah_31_31_34",
      icon: "../assets/gfx/link-duotone.svg",
      location: "Temple Outer Courtyard Landing",
      desc: "A heavy twist of woven blue, purple, and scarlet threads, ripped violently apart. The weave is a palm-width thick and incredibly dense.",
      bibleRef: "Luke 23:45 — 'The sun stopped shining. And the curtain of the temple was torn in two.'",
      bibleLink: "luke_23_45",
      propheticLink: "The Parokhet curtain blocked access to the Holy of Holies. Its top-to-bottom tear, occurring at the moment of death, fulfilled Jeremiah's promise of a New Covenant, granting direct access to the presence of God for all.",
      bibleRefs: [
        { ref: "Luke 23:45", link: "luke_2345" }
      ],
      propheticRefs: [
        { ref: "Jeremiah 31:31-34", link: "jeremiah_31_31_34" }
      ],
      investigatorNote: "Brought out of the sanctuary by a panicked priest. No human hands could rip material this thick—and the tear started from the top down.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 3,
      clues: {
        compare: "Simultaneous with the split rocks — together they mark the moment of death with signs at both the Temple and the hill.",
        link: "Prophecy — a fragment of the sanctuary's inner curtain, torn top to bottom at the moment Jesus died.",
        timeline: "CHRONOLOGY: Torn at the exact moment of death, brought out by a priest who witnessed it firsthand.",
        contradict: "RELIABILITY: A curtain this thick could not be torn by human hands, and the top-down direction rules out anyone reaching it from below."
      },
    }, {
      id: "linen_shroud_receipt",
      name: "Joseph's Market Bill for Fine Linen",
      type: "analytical",
      relatedProphecy: "isaiah_53_9",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Downstairs Lower Market Quarter",
      desc: "A hurried commercial receipt matching a purchase from a wealthy merchant: 'One piece of premium fine linen shroud, paid in full by Joseph, counselor of Arimathea.' Signed just before the city gates closed for Sabbath.",
      bibleRef: "Mark 15:46 — 'So Joseph bought some linen cloth, took down the body, wrapped it in the linen, and placed it in a tomb...'",
      bibleLink: "mark_15_46",
      propheticLink: "Fulfills Isaiah 53:9. Instead of being cast into the criminal dirt pits of Hinnom, Jesus was instantly reassigned to a wealthy man's private, rock-hewn garden tomb.",
      bibleRefs: [
        { ref: "Mark 15:46", link: "mark_1546" }
      ],
      propheticRefs: [
        { ref: "Isaiah 53:9", link: "isaiah_539" }
      ],
      investigatorNote: "Joseph risked his entire aristocratic standing on the Sanhedrin by publicly claiming the body of a condemned man from Pilate.",
      fake: false,
      category: 'event',
      timelineOrder: 5,
      clues: {
        compare: "Follows the pierced spear — Joseph's action once death had been confirmed and the soldiers were done.",
        link: "Event — Joseph of Arimathea's market receipt for the fine linen used to wrap the body.",
        timeline: "CHRONOLOGY: Purchased after death was confirmed, as Joseph moved quickly to claim the body before sundown.",
        contradict: "RELIABILITY: A public market transaction, made in Joseph's own name — a considerable personal and political risk for a Sanhedrin member."
      },
    }, {
      id: "sour_wine_sponge",
      name: "Sponge Soaked in Sour Wine",
      type: "physical",
      relatedProphecy: "psalm_69_21",
      icon: "../assets/gfx/cup-duotone.svg",
      location: "Foot of the Central Cross",
      desc: "A common sponge, still damp with sour wine (posca), attached to a hyssop branch. It was used to offer Jesus a drink.",
      bibleRef: "John 19:28-29 — 'Later, knowing that everything had now been finished... a jar of wine vinegar was there, so they soaked a sponge in it, put the sponge on a stalk of the hyssop plant, and lifted it to Jesus's lips.'",
      bibleLink: "john_19_28",
      propheticLink: "This act directly fulfills Psalm 69:21 ('...for my thirst they gave me sour wine to drink'). The deliberate mention of a hyssop branch also powerfully evokes the Passover (Exodus 12:22), where hyssop was used to apply the lamb's blood for salvation, identifying Jesus as the true Passover Lamb.",
      bibleRefs: [
        { ref: "John 19:28-29", link: "john_19_28" }
      ],
      propheticRefs: [
        { ref: "Psalm 69:21", link: "psalm_69_21" },
        { ref: "Exodus 12:22", link: "exodus_12_22" }
      ],
      investigatorNote: "The use of hyssop is a profound theological link. A common plant used for purification becomes the instrument for fulfilling prophecy at the moment of ultimate sacrifice.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Comes just before the unbroken legs and the spear thrust — the last act of mercy offered before death was confirmed.",
        link: "Event — the sponge and hyssop branch used to offer Jesus a final drink before His death.",
        timeline: "CHRONOLOGY: Offered shortly before Jesus's final words, once He said 'I thirst.'",
        contradict: "RELIABILITY: John 19:28-29 records the detail of the hyssop branch specifically, tying the moment directly to the Passover lamb imagery of Exodus 12."
      },
    }, {
      id: "unbroken_legs",
      name: "Unbroken Tibiae Report",
      type: "analytical",
      relatedProphecy: "psalm_34_20",
      icon: "../assets/gfx/bone-duotone.svg",
      location: "Golgotha Guard Station",
      desc: "A Roman execution report noting that the legs of the central victim were not broken, as he was already confirmed dead by spear-thrust.",
      bibleRef: "John 19:31–36",
      propheticLink: "Jesus' legs were not broken, fulfilling the Passover Lamb imagery (Exodus 12:46) and the specific prophecy of Psalm 34:20.",
      bibleRefs: [
        { ref: "John 19:31-36", link: "john_19_31_36" }
      ],
      propheticRefs: [
        { ref: "Psalm 34:20", link: "psalm_34_20" }
      ],
      investigatorNote: "The decision to pierce His side instead of breaking His legs was a procedural choice by the soldiers that had immense prophetic significance.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 3,
      clues: {
        compare: "The reason the soldiers turned to the spear instead — this is why that piece of evidence exists at all.",
        link: "Prophecy — the soldiers' own report noting they broke the legs of both criminals, but not Jesus's.",
        timeline: "CHRONOLOGY: Decided in the same moment as the spear thrust, once the soldiers found Jesus already dead.",
        contradict: "RELIABILITY: John 19:31–36 explicitly connects this procedural choice to the Passover lamb requirement of Exodus 12:46."
      },
    }, {
      id: "final_words",
      name: "Final Words Scroll",
      type: "analytical",
      relatedProphecy: "psalm_31_5",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Foot of the Central Cross",
      desc: "A bystander's hurried transcription of Jesus's last words, spoken in a loud voice just before He breathed His last.",
      bibleRef: "Luke 23:46 — 'Jesus called out with a loud voice, \"Father, into your hands I commit my spirit.\" When he had said this, he breathed his last.'",
      bibleLink: "luke_23_46",
      propheticLink: "Jesus's final words from the cross are a direct quote from Psalm 31:5, a prayer of ultimate trust in God at the moment of death. He did not simply die — He willingly surrendered His life into the Father's hands, quoting Scripture with His last breath.",
      bibleRefs: [
        { ref: "Luke 23:46", link: "luke_23_46" }
      ],
      propheticRefs: [
        { ref: "Psalm 31:5", link: "psalm_31_5" }
      ],
      investigatorNote: "A dying man does not typically have the composure to quote Scripture with his last breath. The words weren't a cry of despair — they were a declaration of trust.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 3,
      clues: {
        compare: "Spoken in the same moment as the earthquake and the torn veil — the last thing Jesus said before He died.",
        link: "Prophecy — a bystander's transcription of Jesus's final words, quoted directly from Psalm 31:5.",
        timeline: "CHRONOLOGY: The last words spoken, immediately before Jesus breathed His last and the earth shook.",
        contradict: "RELIABILITY: Luke 23:46 records the words as a loud, deliberate cry, not a fading whisper — consistent with a willing surrender rather than a slow expiration."
      },
    }

  ],

  lab: [
    {
      evidence: "split_dice",
      result: "**Motive Questioned** (Was a participant, not an instigator)",
      notes: "'They divided up his clothes by casting lots' (Psalm 22:18, Matthew 27:35) — routine duty for the centurion, until 'Surely he was the Son of God' (Matthew 27:54) changed his mind."
    },
    {
      evidence: "torn_temple_veil",
      suspect: "temple_priest_pashhur",
      result: "**Identified as Witness** (Witnessed the divine event in the Temple)",
      notes: "'The curtain of the temple was torn in two, from top to bottom' (Matthew 27:51) — torn from above, not by human hands reaching up.",
    },
    {
      evidence: "linen_shroud_receipt",
      suspect: "joseph_arimathea",
      result: "**Motive Clarified** (Acted out of respect, not conspiracy)",
      notes: "'A rich man... who had himself become a disciple' (Matthew 27:57) asked Pilate for the body — an act of open devotion from a man who'd stayed secret."
    }
  ],

  npcs: [
    {
      id: "centurion_longinus",
      name: "Centurion Longinus",
      role: "Roman Centurion",
      faction: "roman",
      unlocksSuspects: ["centurion_longinus"],
      avatar: "centurion_longinus.svg",
      profileFile: "centurion_longinus",
      truthfulness: 0.95,
      bibleRef: "Mark 15:39 — 'And when the centurion... saw how he died, he said, \"Surely this man was the Son of God!\"'",
      hasDialogue: true,
      storyFile: "roman_assessment",
      unlocksEvidence: ["split_dice", "pierced_spear"],
      revealsProphecy: "psalm_34_20",
      background: "A battle-hardened Roman officer assigned to the Antonia Fortress. He has supervised dozens of routine public deterrence executions. He stood directly in front of the central cross all afternoon and ordered the final spear thrust.",
      dialogue: {
        neutral: "The execution details were carried out according to imperial protocols. The prisoner is dead.",
        cautious: "I have broken armies, citizen. I know when a man dies in despair. But this one... He didn't curse. He commanded His own spirit to depart. And then the sun vanished.",
        pressured: "When the ground sheared beneath our boots, the rock rifts split open. My men panicked. We have crucified a philosopher before, but never one whose death made the earth itself scream.",
        exposed: "I told the governor myself—this was no ordinary provincial insurgent. When I looked at how He died under that black sky, I knew it. We didn't execute a criminal; we executed the Son of God.",
        repeat: "The record stands. I gave the final verification report to Pilate.",
      },
      reactions: {
        split_dice: { text: "My men were playing tabs for the garments. It's an old garrison habit to pass the grueling hours. But when the darkness hit at noon, they dropped the bone dice and fell flat on their faces.", isLie: false },
        pierced_spear: { text: "Yes, that's my unit's hasta. I ordered the thrust because the priests wanted the legs smashed to clear the hill before Sabbath. But He was already gone. When the iron went in, blood and water came rushing out in distinct streams. No living body does that.", isLie: false },
        split_rocks: { text: "That limestone split right at the moment He breathed His last. The tectonic shock wave nearly knocked me off my feet.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "temple_priest_pashhur",
      name: "Pashhur",
      role: "Temple Priest on Shift",
      faction: "temple",
      avatar: "pashhur.svg",
      profileFile: "pashhur",
      truthfulness: 0.4,
      bibleRef: "Luke 23:45; Matthew 27:51",
      hasDialogue: true,
      storyFile: "temple_curtain",
      unlocksSuspects: ["temple_priest_pashhur"],
      unlocksEvidence: ["torn_temple_veil", "split_rocks"],
      revealsProphecy: "amos_8_9",
      background: "A serving priest from the course of Abijah, responsible for maintaining ritual protocols inside the Holy Place on the afternoon of Passover Eve. He was inside the Sanctuary when the earthquake struck at 3:00 PM.",
      dialogue: {
        neutral: "The Passover sacrifices proceeded in the inner court without structural delay. The Temple remains secure.",
        cautious: "There was a... minor structural shifting due to the afternoon tremor. A routine maintenance issue in the sanctuary, nothing more.",
        pressured: "You have no right to question the priesthood! The inner sanctuary is forbidden to outsiders. Whatever happened to the veil is an internal matter for the high priest to review.",
        exposed: "It was terrifying! At the exact hour of the evening sacrifice—3:00 PM—the great rifts shook the stone floor. Then, with a sound like a rushing wind, the massive inner curtain tore straight down the middle! It didn't wear out; it ripped from the top down, exposing the Holy of Holies to the open air! The doors swung open by themselves!",
        repeat: "The sanctuary is closed. Go back to the lower city.",
      },
      reactions: {
        torn_temple_veil: { text: "Where did you get that thread? Put it away! If the people find out the inner curtain split right down the center while that Galilean died, it will trigger an absolute religious panic!", isLie: true, revealedClue: "split_rocks" },
        split_rocks: { text: "The earthquake was a generic natural coincidence. Tectonic shifts happen in the Rift valley all the time. It has nothing to do with the execution outside the city walls.", isLie: true },
      },
      contradictions: {
        "torn_temple_veil+split_rocks": { exposed: "Fine! The earthquake rifts directly struck the Temple foundations at the exact moment the man died on Golgotha. The great doors slammed open, the massive veil split completely in two from top to bottom, and the sanctuary is left bare. Our old structural monopoly over the presence of God collapsed in three seconds." },
      },
    },
    {
      id: "joseph_arimathea",
      name: "Joseph of Arimathea",
      role: "Secret Disciple & Council Member",
      faction: "scribes",
      unlocksSuspects: ["joseph_arimathea"],
      avatar: "senior_scribe.svg",
      profileFile: "joseph_arimathea",
      truthfulness: 0.9,
      bibleRef: "Luke 23:50–53; John 19:38",
      hasDialogue: true,
      storyFile: "joseph_arimathea",
      unlocksEvidence: ["linen_shroud_receipt"],
      revealsProphecy: "isaiah_53_9",
      background: "A prominent, wealthy member of the Sanhedrin council who secretly looked for the Kingdom of God. He opposed the late-night illegal tribunal of Caiaphas but remained silent until the crucifixion forced him to act.",
      dialogue: {
        neutral: "I have provided a legal, clean resting place for the teacher's body in my own garden estate.",
        cautious: "I had to act quickly. The Sabbath sunset was approaching fast, and it is against our Law to leave a body exposed overnight.",
        pressured: "Yes, I went to Pilate directly. My colleagues on the council wanted Him thrown into the common criminal trenches to erase His memory. I could not let that happen. I bought the linens myself.",
        exposed: "I spent three years hiding my devotion because I feared losing my seat on the high council. But when I saw the darkness, the earthquake, and the way He died, my silence became an unbearable sin. I used my wealth to buy His dignity. I buried Him like a king in a clean, pristine rock tomb.",
        repeat: "He rests securely under a heavy stone seal.",
      },
      reactions: {
        linen_shroud_receipt: { text: "Yes, that is my commercial signature. I bought the finest linen available in the lower markets. Nicodemus joined me with a massive weight of myrrh and aloes. We buried Him with the honor due to royalty.", isLie: false },
        pierced_spear: { text: "When we took Him down from the timber, we saw the wound in His side. It was clean, deep, and already stopped bleeding. The sacrifice was completely finished.", isLie: false },
      },
      contradictions: {},
    },
    ,
    {
      id: "upper_room_prep",
      name: "Upper Room Prep",
      role: "Household Servant",
      avatar: "upper_room_prep.svg",
      truthfulness: 0.8,
      bibleRef: "Mark 14:12-16",
      hasDialogue: true,
      storyFile: "upper_room_prep",
      background: "Helped prepare the upper room for Passover. Observed unusual details.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "secret_visit",
      name: "Secret Visitor",
      role: "Night Visitor",
      avatar: "secret_visit.svg",
      truthfulness: 0.5,
      bibleRef: "John 18:1-14",
      hasDialogue: true,
      storyFile: "secret_visit",
      background: "A mysterious nighttime visit. Account of garden events differs from official narrative.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "peter_denial",
      name: "Peter (Denial)",
      role: "Broken Disciple",
      avatar: "peter.svg",
      truthfulness: 0.6,
      bibleRef: "Matthew 26:69-75; Mark 14:66-72; Luke 22:54-62; John 18:15-18,25-27",
      hasDialogue: true,
      storyFile: "peter_denial",
      background: "Denied Jesus three times before the rooster crowed. Hiding after public collapse.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "peter_defense_simple",
      name: "Peter (Simple Defense)",
      role: "Disciple",
      avatar: "peter.svg",
      truthfulness: 0.7,
      bibleRef: "John 18:15-18",
      hasDialogue: true,
      storyFile: "peter_defense_simple",
      background: "A simplified account of Peter defense after the arrest.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "simon_cyrene",
      name: "Simon of Cyrene",
      role: "Cross-Bearer",
      avatar: "simon_cyrene.svg",
      truthfulness: 0.8,
      bibleRef: "Matthew 27:32; Mark 15:21; Luke 23:26",
      hasDialogue: true,
      storyFile: "simon_cyrene",
      background: "Forced to carry Jesus cross. A foreign pilgrim caught in Roman enforcement.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "temple_curtain",
      name: "Temple Curtain Witness",
      role: "Temple Attendant",
      avatar: "pontius_pilate.svg",
      truthfulness: 0.9,
      hasDialogue: true,
      storyFile: "priest_objection_crucifixion",
      bibleRef: "Matthew 27:51",
      background: "A priest of the course of Abijah who witnessed the Temple curtain tearing at Jesus' death — the ultimate sign that the old covenant ended.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "execution_guard",
      name: "Crucifixion Guard",
      role: "Roman Execution Detail",
      faction: "roman",
      avatar: "garrison_guard.svg",
      truthfulness: 0.85,
      bibleRef: "Matthew 27:36; John 19:23-24",
      hasDialogue: true,
      storyFile: "guard_report_crucifixion",
      background: "A Roman soldier on the crucifixion detail at Golgotha. He executed many men but was shaken by what he witnessed at Jesus' death.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
  ],

  deductions: {
    "split_dice+pierced_spear": {
      link: {
        text: "The combination of the soldiers' gambling dice and the dynamic spear wound documents the calculated mechanical nature of Roman execution protocol running directly into a sudden medical paradox.",
        insight: "While the guards routinely parsed out His garments to fulfill Psalm 22:18, the sudden water and blood discharge clinically proved that Jesus died of a ruptured heart before His legs could be broken, preserving the Passover Lamb motif.",
        isKey: true,
        revealsProphecy: "psalm_22_16_18",
        bibleRef: "John 19:23–34; Psalm 22:18; Exodus 12:46",
      },
    },
    "split_rocks+torn_temple_veil": {
      compare: {
        text: "The split limestone on Golgotha and the torn threads of the inner sanctuary veil form a perfectly synchronized tectonic and theological timeline.",
        insight: "At exactly 3:00 PM, the localized seismic wave that fractured the rocks of Golgotha simultaneously struck the Temple foundations, ripping the palm-thick veil from top to bottom to signify that access to God's presence was now completely open.",
        isKey: true,
        revealsProphecy: "jeremiah_31_31_34",
        bibleRef: "Matthew 27:51; Luke 23:45; Mishnah Shekalim 8:5",
      },
      timeline: {
        text: "Both events land at the same recorded moment — the death on the cross, not a later aftershock or a separate incident.",
        insight: "Matthew and Luke both anchor the torn veil to the instant of death, not to the earthquake as an isolated natural disaster afterward.",
        isKey: false,
        bibleRef: "Matthew 27:50-51; Luke 23:45-46",
      },
    },
    "unbroken_legs+pierced_spear": {
      timeline: {
        text: "The spear thrust came first, confirming death. Because death was already certain, the soldiers never needed to break the legs at all.",
        insight: "Exodus 12:46 required the Passover lamb's bones stay unbroken. The soldiers weren't observing that law — they were simply following the spear's evidence — and fulfilled it anyway.",
        isKey: true,
        revealsProphecy: "psalm_34_20",
        bibleRef: "John 19:31-36; Psalm 34:20; Exodus 12:46",
      },
    },
    "linen_shroud_receipt+split_dice": {
      compare: {
        text: "The soldiers gambling for cheap garments at the foot of the cross sits in stark contrast with a wealthy counselor paying a premium price for a fine linen shroud.",
        insight: "This structural transition directly bridges the binary paradox of Isaiah 53:9—moving Jesus instantly from the lowest status of a disgraced criminal to the high-society burial honors of a rich man's private garden estate.",
        isKey: true,
        revealsProphecy: "isaiah_53_9",
        bibleRef: "Isaiah 53:9; Mark 15:46; Matthew 27:57",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "The crucifixion was not an unexpected strategic failure, but a calculated, voluntary act of redemption that explicitly leveraged cosmic, geological, and legal parameters to fulfill ancient prophecies.",
    method: "The Roman military machinery carried out the execution, and the Sanhedrin elite initiated the charges to secure political stability. However, the resulting three hours of darkness, the rock-splitting earthquake, the top-down tearing of the Temple veil, and the rich man's burial completely bypassed their control, structurally validating Jesus as the true Messiah and the ultimate Passover Lamb.",
    lesson: "The cross transformed a Roman instrument of shame into history's absolute center of restoration. Every physical detail—from the unbroken bones to the torn curtain—proved that old barriers were shattered, and a New Covenant was established.",
    prophesyFulfilled: ["Psalm 22:16-18", "Amos 8:9", "Isaiah 53:9", "Zechariah 12:10", "Exodus 12:46"],
    furtherReading: ["Matthew 27:32–56", "Mark 15:21–41", "Luke 23:26–49", "John 19:16–37", "Hebrews 10:19–22"],
  },
};