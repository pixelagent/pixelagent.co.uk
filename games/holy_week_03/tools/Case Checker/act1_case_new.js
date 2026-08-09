import { formatIntro } from './utils.js';

// ============================================================
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// CASE EXPORT: act1CaseA
// SOURCE: act1_case.js
//
// LOCATION:
//   Bethphage, Mount of Olives
//
// DIFFICULTY:
//   1
//
// BACKGROUND:
//   Jesus approaches Jerusalem during Passover and sends two
//   disciples to collect a donkey colt. To bystanders the animal
//   appears to have been taken without permission, creating the
//   appearance of theft. Investigation reveals the owner willingly
//   released the colt after hearing the pre-arranged words
//   "The Lord needs it." The entire event forms the opening of
//   Jesus's public presentation as Israel's Messiah.
//
// BIBLE REFERENCE:
//   Matthew 21:1–11
//   Mark 11:1–11
//   Luke 19:28–44
//   John 12:12–19
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//
//   • Zechariah 9:9
//     The King enters Jerusalem riding a donkey.
//
//   • Psalm 118:25–26
//     The crowds proclaim "Hosanna" and bless the coming King.
//
//   • Genesis 49:10–11
//     Judah's ruler associated with a donkey's colt.
//
//   • Malachi 3:1
//     The Lord suddenly comes to His Temple.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
//   Summary:
//   Jesus deliberately fulfils multiple Messianic prophecies by
//   entering Jerusalem on a donkey. What initially appears to be
//   a missing animal is revealed to be a willing act supporting
//   God's prophetic plan.
//
//   Historical Context:
//   Palm branches symbolised national victory after the Maccabean
//   revolt. Riding a donkey echoed Solomon's coronation and
//   announced peaceful kingship rather than military conquest.
//
//   Spiritual Theme:
//   Recognition of the Messiah.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
//   Crime:
//     Apparent theft
//
//   Actual Event:
//     Prophetic fulfilment
//
//   Culprit:
//     none
//
//   Motive:
//     Fulfilment of Messianic prophecy.
//
//   Verdict:
//     No crime committed.
//
// ============================================================

export const act1CaseA = {
  id: "triumphal_entry",
  icon: '../assets/gfx/horse-duotone.svg',
  title: "The Missing Donkey",
  subtitle: "A borrowed donkey has gone missing from Bethphage — but is it theft, or something far greater?",
  location: "jerusalem",
  eventLocation: "Bethphage, Mount of Olives",
  timeOfDay: "day",
  difficulty: 1,
  requires: null,
  actLabel: "Act I - The Triumphal Entry",
  color: 0x60a5fa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Missing Donkey Investigation", task: "Find the donkey colt", cur: 0, tar: 7 },

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `On Nisan 10 (Palm Sunday), Jesus sent two disciples ahead to Bethphage to collect a donkey colt that had never been ridden. This was no coincidence — it was the precise fulfilment of a 500-year-old prophecy from Zechariah 9:9. The crowds who lined the road were waving palm branches (a symbol of Jewish national victory, last used during the Maccabean revolt), spreading cloaks on the road — royal carpet treatment — and crying "Hosanna!" (meaning "Save us now!"), quoting directly from Psalm 118:25–26.`,
    significance: `The triumphal entry deliberately echoed how King Solomon entered Jerusalem for his coronation (1 Kings 1:33–35), riding on a donkey down the Mount of Olives. Every Jewish bystander would have understood the royal claim being made. The Pharisees were alarmed: "Look, the whole world has gone after him!" (John 12:19).`,
    historicalNote: `Bethphage was a small priestly village on the Mount of Olives, roughly 1km from Jerusalem. It sat on the boundary of Jerusalem's sacred precincts. Jesus's knowledge of where the donkey was — and the pre-arranged answer for anyone who questioned the disciples ("The Lord needs it") — suggests either divine foreknowledge or a pre-arrangement with a sympathiser, though Scripture presents it as prophetic foreknowledge.`,
  },

  prophecies: [
    {
      reference: "Zechariah 9:9",
      id: "zechariah_9_9",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"Rejoice greatly, O daughter of Zion! Shout aloud, O daughter of Jerusalem! Behold, your king is coming to you; righteous and having salvation is he, humble and mounted on a donkey, on a colt, the foal of a donkey."`,
      written: "~520 BC",
      fulfilledBy: "Jesus riding a donkey colt into Jerusalem",
      gospelLink: "Matthew 21:4–5; John 12:14–15",
      insight: "The donkey was not a practical choice — Roman rulers rode horses. The donkey was a deliberate symbol of peace and humility, contrasted with conquering kings on warhorses.",
      explanation: "This prophecy foretold that Israel's true king would arrive not as a conquering general on a warhorse, but as a humble servant of peace on a simple donkey.",
    },
    {
      reference: "Psalm 118:25–26",
      id: "psalm_118_25_26",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"Save us, we pray, O LORD! O LORD, we pray, give us success! Blessed is he who comes in the name of the LORD!"`,
      written: "~1000 BC",
      fulfilledBy: "The crowds shouting 'Hosanna! Blessed is he who comes in the name of the Lord!'",
      gospelLink: "Matthew 21:9; Mark 11:9–10",
      insight: "'Hosanna' is the Greek transliteration of the Hebrew 'Hoshana' — a cry for salvation, not merely praise. The crowd was quoting this Psalm as a messianic greeting.",
      explanation: "The crowd's cry of 'Hosanna!' was a direct quote from this messianic psalm. 'Hosanna' is a plea for salvation, meaning 'Save us now!', showing they saw Jesus as a deliverer.",
    },
    {
      reference: "Genesis 49:10–11",
      id: "genesis_49_10_11",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"The scepter shall not depart from Judah... binding his foal to the vine and his donkey's colt to the choice vine."`,
      written: "~1400 BC",
      fulfilledBy: "A king from Judah arriving on a donkey colt",
      gospelLink: "Matthew 21:1–9",
      insight: "Jacob's blessing over Judah, over 1,400 years before the event, described a royal figure arriving on a donkey colt. Early Jewish readers interpreted this as messianic.",
      explanation: "Over 1,400 years earlier, Jacob's blessing over the tribe of Judah described a royal figure associated with a donkey colt, establishing an ancient precedent for this messianic entry.",
    },
    {
      reference: "Malachi 3:1",
      id: "malachi_3_1",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"Behold, I send my messenger, and he will prepare the way before me. And the Lord whom you seek will suddenly come to his temple."`,
      written: "~430 BC",
      fulfilledBy: "Jesus's arrival in Jerusalem preceding His Temple visit (Mark 11:11)",
      gospelLink: "Mark 11:11",
      insight: "The 'coming to the temple' link connects the triumphal entry with the Temple cleansing the following day — two acts that together announced prophetic fulfilment.",
      explanation: "This prophecy connects the Triumphal Entry directly to the subsequent Temple visit, framing them as a single, authoritative act of the Messiah arriving at His house.",
    },
  ],

  intro: formatIntro(`It is Palm Sunday morning, Nisan 10. Jesus and His disciples have spent the night in Bethany and are now walking toward Jerusalem. Two disciples were sent ahead to the village of Bethphage with specific instructions: untie a donkey colt they would find there, and if anyone challenged them, say only **"The Lord needs it."** But when you arrive at the tethering post — the colt is gone, a rope has been cut, and three people were seen in the area. Was it stolen? Or is something else _entirely_ happening here?`),

  suspects: [
    { id: "peter", name: "Peter", role: "Disciple of Jesus", avatar: "peter.svg", bibleRef: "Mark 11:1–6" },
    { id: "john", name: "John", role: "Disciple of Jesus", avatar: "john_apostle.svg", bibleRef: "Luke 19:29–35" },
    { id: "owner", name: "Tobias", role: "Donkey Owner / Sympathiser", avatar: "tobias_owner.svg", bibleRef: "Mark 11:3–6 (unnamed owner)" },
    { id: "villager", name: "Local Villager", role: "Eyewitness", avatar: "local_traveler.svg", bibleRef: "Mark 11:3–6 (unnamed villager who witnessed the exchange)" },
    { id: "pharisee", name: "Pharisee", role: "Religious Authority", avatar: "simon_pharisee.svg", bibleRef: "Luke 19:39–40; John 12:19" },
    { id: "local_skeptic", name: "Jemimah", role: "Jerusalem Local", avatar: "jemimah.svg", bibleRef: "Matthew 21:10-11" },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "question-duotone.svg", bibleRef: null },
  ],

  evidencePool: [
    {
      id: "cloaks",
      name: "Two Disciples' Cloaks",
      relatedProphecy: "genesis_49_10_11",
      revealsSuspect: "peter",
      type: "physical",
      icon: "../assets/gfx/user-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-shirt",
      pos: [-15, 0, -10],
      location: "Tethering Post, Bethphage Road",
      desc: "Two travelling cloaks left folded near the tethering post. The style matches garments worn by Galilean disciples.",
      bibleRef: "Mark 11:7 — 'They brought the colt to Jesus and threw their cloaks over it.'; 2 Kings 9:13 — cloaks spread before King Jehu as a royal honour",
      bibleLink: "mark_11_7",
      propheticLink: "This mirrors 2 Kings 9:13 where cloaks were spread before King Jehu — a royal gesture the disciples repeated on the road to Jerusalem.",
      bibleRefs: [
        { ref: "Mark 11:7", link: "mark_117" },
        { ref: "2 Kings 9:13", link: "2kings_913" },
        { ref: "Genesis 49:10-11", link: "genesis_491011" }
      ],
      propheticRefs: [
        { ref: "2 Kings 9:13", link: "2 kings_913" }
      ],
      investigatorNote: "If the cloaks belong to the disciples, they were here. Why leave them behind?",
      fake: false,
      category: 'people',
      timelineOrder: 1,
      clues: {
        compare: "Connects the disciples' cloaks to the donkey colt as a saddle.",
        link: "People — the cloaks belong to the disciples, linking them physically to the scene.",
        timeline: "CHRONOLOGY: The cloaks were gathered first, before the colt was untied.",
        contradict: "RELIABILITY: The disciples' own testimony confirms these were their cloaks."
      }
    },

    {
      id: "donkey_tracks",
      name: "Fresh Hoofprints",
      type: "physical",
      icon: "../assets/gfx/horse-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-shoe-prints",
      pos: [-8, 0, -15],
      location: "Mount of Olives Path, heading west toward Jerusalem",
      desc: "Clear hoofprints of a small donkey — a colt's prints, lighter than an adult's — lead down the western slope of the Mount of Olives toward Jerusalem.",
      bibleRef: "Luke 19:35–36 — 'As he rode along, people spread their cloaks on the road.'",
      bibleLink: "luke_19_35_36",
      propheticLink: "The route from the Mount of Olives into Jerusalem through the eastern gate mirrors the processional route described in Ezekiel 44:1–3, associated with the glory of God entering the city.",
      bibleRefs: [
        { ref: "Luke 19:35-36", link: "luke_193536" },
        { ref: "Ezekiel 44:1-3", link: "ezekiel_4413" }
      ],
      propheticRefs: [
        { ref: "Ezekiel 44:1-3", link: "ezekiel_4413" }
      ],
      investigatorNote: "The prints are heading directly toward the road that pilgrims take into the city for Passover.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Connects directly with Villager's Testimony to confirm only one animal was present at the gate.",
        link: "This represents physical evidence left on the ground, fitting the Event Trail category.",
        timeline: "CHRONOLOGY: These tracks were made 1st, before any disciples arrived or touched the colt.",
        contradict: "RELIABILITY: Physical track impression matches normal, undisturbed walking tracks."
      }
    },

    {
      id: "witness_account",
      name: "Villager's Testimony",
      type: "testimonial",
      icon: "../assets/gfx/ear-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-ear",
      pos: [-5, 0, -20],
      location: "Bethphage Village Square",
      desc: "A local villager reports seeing two men untying the colt at dawn. When challenged — 'Why are you untying it?' — they answered: 'The Lord needs it.' The owner then nodded and let them go.",
      revealsSuspect: "none",
      bibleRef: "Mark 11:3–6 — 'They answered as Jesus had told them to, and the people let them go.'",
      bibleLink: "mark_11_3_6",
      propheticLink: "Jesus's foreknowledge of the exact response to give is consistent with His omniscience, and mirrors how the Passover lamb was 'set apart' by divine instruction (Exodus 12:3–6).",
      bibleRefs: [
        { ref: "Mark 11:3-6", link: "mark_11_3_6" },
        { ref: "Exodus 12:3-6", link: "exodus_12_3_6" }
      ],
      propheticRefs: [
        { ref: "Exodus 12:3-6", link: "exodus_12_3_6" }
      ],
      investigatorNote: "Both the gospel accounts of Mark and Luke confirm this exchange happened exactly as predicted. This is not a theft.",
      fake: false,
      category: 'people',
      timelineOrder: 2,
      clues: {
        compare: "Corroborates the donkey tracks and rope fibers as part of the same sequence.",
        link: "People — a witness account about what the disciples said and did.",
        timeline: "CHRONOLOGY: The villager witnessed the exchange after the disciples arrived but before the colt was led away.",
        contradict: "RELIABILITY: Corroborated by both Mark and Luke accounts."
      }
    },

    {
      id: "prophecy_scroll",
      relatedProphecy: "zechariah_9_9",
      revealsSuspect: "none",
      name: "Zechariah 9:9 Scroll Fragment",
      type: "analytical",
      icon: "../assets/gfx/scroll-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-scroll",
      pos: [5, 0, -12],
      location: "Tobias the Owner's Tent",
      desc: "A worn parchment scroll fragment with the text of Zechariah 9:9 — the prophecy of the king coming on a donkey. It has been marked, re-read, and shows signs of use over many years.",
      bibleRef: "Matthew 21:4–5 — 'This took place to fulfil what was spoken through the prophet.'",
      bibleLink: "matthew_21_4_5",
      propheticLink: "Zechariah 9:9 was written around 520 BC. Zechariah himself arrived back in Judah after the Babylonian exile — a people who desperately needed a king. His vision of a humble, donkey-riding king was a hope that Jesus publicly claimed.",
      bibleRefs: [
        { ref: "Matthew 21:4-5", link: "matthew_21_4_5" },
        { ref: "Zechariah 9:9", link: "zechariah_9_9" }
      ],
      propheticRefs: [
        { ref: "Zechariah 9:9", link: "zechariah_99" }
      ],
      investigatorNote: "The owner kept this scroll. He knew this day might come. He was waiting.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 3,
      clues: {
        compare: "Links the owner's knowledge to the prophecy fulfilled by the donkey colt.",
        link: "Prophecy — the scroll contains Zechariah 9:9, directly fulfilled by the event.",
        timeline: "CHRONOLOGY: The scroll was prepared long before the event, showing the owner's anticipation.",
        contradict: "RELIABILITY: The owner's willingness to release the colt confirms the scroll's influence."
      }
    },

    {
      id: "palm_branch",
      relatedProphecy: "psalm_118_25_26",
      name: "Fresh-Cut Palm Branch",
      type: "environmental",
      icon: "../assets/gfx/tree-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-seedling",
      pos: [-12, 0, -18],
      location: "Road descending toward Jerusalem Gate",
      desc: "A freshly cut palm branch, still supple and green. Palms grew near Jericho, not on the Mount of Olives — someone carried this branch specifically for this occasion.",
      bibleRef: "John 12:13 — 'They took palm branches and went out to meet him, shouting, Hosanna! Blessed is the king of Israel!'",
      bibleLink: "john_12_13",
      propheticLink: "In the Maccabean era, palm branches became a symbol of Jewish national liberation and celebration (1 Maccabees 13:51 — Simon Maccabeus's entry into the Jerusalem citadel, 141 BC). The crowd was making a political and spiritual statement — this man is our king and deliverer.",
      bibleRefs: [
        { ref: "John 12:13", link: "john_12_13" },
        { ref: "Psalm 118:25-26", link: "psalm_118_25_26" }
      ],
      propheticRefs: [
        { ref: "1 Maccabees 13:51", link: "maccabees_13_51", note: "Palm branches were already a Jewish symbol of national victory and messianic hope." }
      ],
      investorNote: "The crowd was prepared. This was not a spontaneous moment — it had been anticipated.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "Connects the crowd's celebration to the prophetic entry described in Zechariah 9:9.",
        link: "Event — a physical object from the procession route.",
        timeline: "CHRONOLOGY: Palms were carried during the procession, after the colt was mounted.",
        contradict: "RELIABILITY: The branch was freshly cut and carried from Jericho, consistent with the Gospel account."
      }
    },

    {
      id: "rope_fibers",
      name: "Cut Rope at the Tethering Post",
      type: "physical",
      icon: "../assets/gfx/link-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-link",
      pos: [-2, 0, -5],
      location: "Stone Tethering Post, Bethphage",
      desc: "The rope used to tie the colt has been cut cleanly — not frayed or broken, suggesting deliberate untying or cutting with a tool. The knot style is a simple shepherd's hitch.",
      bibleRef: "Mark 11:2 — 'You will find a colt tied there, which no one has ever ridden. Untie it and bring it here.'",
      bibleLink: "mark_11_2",
      propheticLink: "Jesus specified it must be a colt 'no one has ever ridden' — in Jewish law, an animal used for sacred purposes must be one that has not been used for common work (Numbers 19:2; Deuteronomy 21:3). This detail proves the act was religiously intentional, not criminal.",
      bibleRefs: [
        { ref: "Mark 11:2", link: "mark_112" },
        { ref: "Numbers 19:2", link: "numbers_192" },
        { ref: "Deuteronomy 21:3", link: "deuteronomy_213" }
      ],
      propheticRefs: [
        { ref: "Numbers 19:2", link: "numbers_192" },
        { ref: "Deuteronomy 21:3", link: "deuteronomy_213" }
      ],
      investigatorNote: "A thief would cut a rope. A disciple would untie it carefully. The clean cut could go either way — unless you know the context.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Pairs with the witness account to confirm the colt was untied, not stolen.",
        link: "Event — physical evidence from the tethering post.",
        timeline: "CHRONOLOGY: The rope was cut early in the sequence, before the colt was led away.",
        contradict: "RELIABILITY: The clean cut is consistent with careful untying, not criminal cutting."
      }
    },

    {
      id: "crowd_testimony",
      name: "Pharisee's Written Complaint",
      relatedProphecy: "malachi_3_1",
      type: "analytical",
      icon: "../assets/gfx/balance-scale-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-gavel",
      pos: [8, 0, -12],
      location: "Temple Authority Notice Board",
      desc: "A formal written complaint from the Pharisees: 'The Galilean has stirred up the whole city. The crowds are out of control. We can do nothing.' It references the donkey procession and the cries of 'Hosanna to the Son of David.'",
      revealsSuspect: "pharisee",
      bibleRef: "Luke 19:39–40 — The Pharisees said, 'Teacher, rebuke your disciples!' Jesus replied, 'If they keep quiet, the stones will cry out.'",
      bibleLink: "luke_19_39_40",
      propheticLink: "The Pharisees recognised the messianic implication of the palm branches and shouts. John 12:19 records their panic: 'Look how the whole world has gone after him!'",
      bibleRefs: [
        { ref: "Luke 19:39-40", link: "luke_193940" },
        { ref: "Malachi 3:1", link: "malachi_31" },
        { ref: "John 12:19", link: "john_1219" }
      ],
      propheticRefs: [
        { ref: "John 12:19", link: "john_1219" }
      ],
      investigatorNote: "If the religious authorities were alarmed, this event was unmistakably public and significant. A stolen donkey doesn't cause this kind of reaction.",
      fake: false,
      category: 'event',
      timelineOrder: 5,
      clues: {
        compare: "Confirms the public reaction to the entry, showing it was widely recognized as significant.",
        link: "Event — a written record of the Pharisees' reaction to the procession.",
        timeline: "CHRONOLOGY: The complaint was written during or immediately after the procession.",
        contradict: "RELIABILITY: The Pharisees' alarm confirms the event was real and impactful."
      }
    }
  ],

  lab: [
    {
      evidence: "cloaks",
      suspect: "peter",
      result: "**Motive Clarified** (Acted on instruction, not as a thief)",
      notes: "Zechariah 9:9 — the king comes 'lowly, riding on a donkey.' Peter was fulfilling a word, not stealing a ride."
    },
    {
      evidence: "prophecy_scroll",
      suspect: "owner",
      result: "**Cleared** (Confirmed he willingly lent the colt)",
      notes: "'The Lord needs it' (Luke 19:31) was recognition, not requisition. The owner released the colt the moment he understood."
    }
  ],
  npcs: [
    {
      id: "peter",
      name: "Peter",
      role: "Disciple of Jesus",
      faction: "scribes",
      avatar: "peter.svg",
      profileFile: "peter",
      color: 0xffaa44,
      pos: [-10, 0, -5],
      truthfulness: 0.7,
      bibleRef: "Mark 11:1–7",
      hasDialogue: true,
      storyFile: "peter_donkey",
      unlocksSuspects: ["peter"],
      unlocksEvidence: ["cloaks", "rope_fibers"],
      revealsProphecy: "genesis_49_10_11",
      background: "Simon Peter, a fisherman from Galilee, is one of the inner circle of three disciples (along with James and John). Passionate and impulsive, he speaks before thinking. He was one of the two sent to find the donkey.",
      dialogue: {
        neutral: {
          text: "Peter and I untied the rope carefully, just as the owner asked. Everything was done according to the Law.",
          isLie: true,
          correction: "I'll be honest—the knot was tight and I was in a hurry to get back to the Teacher, so I cut the rope with my fish-knife."
        },
        cautious: "We weren't stealing anything! The Lord had authorised this. It's all perfectly within the Law.",
        pressured: "Alright — yes, we showed the owner a scroll of Zechariah. He understood immediately. He was actually glad to help.",
        exposed: "The owner had been waiting for this day his whole life. We untied the colt, draped our cloaks over it as a saddle, and led it to Jesus. The crowds came from everywhere. It was like the whole Mount of Olives was alive.",
        repeat: "I've already told you what happened. Everything went exactly as Jesus said it would.",
      },
      reactions: {
        cloaks: { text: "Those are mine and John's cloaks. We used them as a saddle for the colt because it had never been ridden — we didn't want it to bolt on the road.", isLie: false },
        donkey_tracks: { text: "Of course there are tracks — we led the colt along the western road into Jerusalem. Hundreds of people walked with us!", isLie: false },
        witness_account: { text: "That account is entirely accurate. The owner let us go without hesitation once we said 'The Lord needs it.' That phrase — Jesus told us to say exactly that.", isLie: false, revealedClue: "prophecy_scroll" },
        prophecy_scroll: { text: "We had a copy of Zechariah 9:9 with us. When we said 'The Lord needs it,' the owner recognised what was happening. He'd been reading that scripture for years.", isLie: false },
        rope_fibers: { text: "John untied the rope — he didn't cut it. I don't know how it ended up cut. Maybe someone else came along later.", isLie: true },
        crowd_testimony: { text: "The Pharisees were furious. Jesus told them if the crowd went silent, the stones themselves would cry out. You can't stop prophecy being fulfilled.", isLie: false },
      },
      contradictions: {
        "witness_account+rope_fibers": { exposed: "Alright — I cut the rope. Not to steal anything, but the knot had been tied extra tight and I was in a hurry.", corrects: "neutral" },
        "prophecy_scroll+crowd_testimony": { exposed: "The owner knew. The Pharisees knew. The whole city knew what this meant. Jesus wasn't being subtle — He was making a public claim to be the prophesied king." },
      },
    },
    {
      id: "john",
      name: "John",
      role: "Disciple of Jesus",
      faction: "scribes",
      avatar: "john_apostle.svg",
      profileFile: "john_apostle",
      color: 0x66aaff,
      pos: [10, 0, -8],
      truthfulness: 0.9,
      bibleRef: "Luke 19:29–35",
      hasDialogue: true,
      storyFile: "john_donkey",
      unlocksSuspects: ["john", "villager"],
      unlocksEvidence: ["donkey_tracks", "crowd_testimony", "witness_account"],
      background: "John son of Zebedee — later called 'the disciple Jesus loved' — is meticulous, observant, and the most likely to recall precise details. He would later write a Gospel account of this very event (John 12:12–19).",
      dialogue: {
        neutral: "Peter and I went together. Jesus gave us exact instructions — even the words to say if challenged.",
        cautious: "I'm telling you everything. There was nothing secret about this. When the crowd started gathering, it felt like something long-awaited had finally arrived.",
        pressured: "I actually wrote about this day. John 12. I recorded that the disciples didn't fully understand its significance until after the resurrection — then we realised the scriptures had predicted it all along.",
        exposed: "The most striking thing was the colt had never been ridden. For a royal or sacred purpose in Jewish law, that's required. Jesus knew that. Every detail was intentional.",
        repeat: "I believe I've shared all that I recall. It was a day I'll never forget.",
      },
      reactions: {
        witness_account: { text: "Yes — that's exactly what happened. We were challenged, we gave the answer Jesus told us, and the owner let us go. He seemed... expectant, actually. Like he'd been waiting.", isLie: false },
        prophecy_scroll: { text: "The owner had Zechariah 9:9 written on a scroll. When he heard our words, he looked at that scroll and nodded. He understood the connection immediately.", isLie: false, revealedClue: "cloaks" },
        palm_branch: { text: "The palm branches came from people who had come from Jericho for Passover — they'd carried them up the road. It wasn't organised, but it felt entirely right. John 12:13 records it.", isLie: false },
        crowd_testimony: { text: "The Pharisees were appalled. 'The whole world has gone after him!' they said. That's in my Gospel — John 12:19. They recognised what was happening, even if they refused to accept it.", isLie: false },
        donkey_tracks: { text: "Those tracks lead straight down the western slope — the same route Solomon's servants took when they brought him to Gihon to be anointed king. That parallel wasn't lost on anyone in the crowd.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "owner",
      name: "Tobias",
      role: "Donkey Owner / Sympathiser",
      faction: "local",
      avatar: "tobias_owner.svg",
      profileFile: "tobias_owner",
      color: 0x88cc88,
      pos: [-5, 0, -12],
      truthfulness: 0.95,
      bibleRef: "Mark 11:3–6 (the unnamed owner who releases the colt)",
      hasDialogue: true,
      storyFile: "galilean_pilgrim",
      unlocksSuspects: ["owner", "villager"],
      unlocksEvidence: ["prophecy_scroll", "palm_branch"],
      revealsProphecy: "psalm_118_25_26",
      background: "An unnamed man in Scripture — here called Tobias — who owns the colt. Mark 11:6 simply records that he let the disciples go without resistance. His ownership of the Zechariah scroll suggests he was a devout Jew who had been watching for the Messiah.",
      dialogue: {
        neutral: "Two men came for my donkey colt this morning. They said 'The Lord needs it.' I knew exactly what that meant.",
        cautious: "I've had that colt set apart since it was born. Never let anyone ride it. Some things you hold in reserve for the right moment.",
        pressured: "I've had Zechariah 9:9 on my wall for twenty years. 'Your king comes, riding on a donkey.' You think I was going to say no?",
        exposed: "When they said those words, I felt it in my chest. This was the day. I told them: 'Take him. Give him whatever he needs.' Then I walked down to the road to watch, and I wept.",
        repeat: "I've told you everything I know. This was not a theft. This was the fulfilment of what I've been waiting for my entire life.",
      },
      reactions: {
        prophecy_scroll: { text: "That scroll is mine. My grandfather gave it to me. Zechariah 9:9 — we always believed that a day would come when those words walked off the page and into history. I believe today was that day.", isLie: false },
        cloaks: { text: "I saw those cloaks go by — they used them as a saddle. That's also from the old accounts. When kings are anointed, people give what they have. It's an act of honour.", isLie: false },
        rope_fibers: { text: "The rope was cut. I didn't cut it — I untied the knot myself and handed the colt to them. Someone else must have cut it after. I wasn't watching the post after they left.", isLie: false },
        palm_branch: { text: "The palms — that brought tears to my eyes. In the days of the Maccabees, palms meant liberation. Those people understood the language of what was happening.", isLie: false },
        crowd_testimony: { text: "The Pharisees' complaint says 'the whole world has gone after him.' If even they say that — perhaps they're right. Perhaps they just don't know what to do with it.", isLie: false },
      },
      contradictions: {
        "cloaks+palm_branch": { exposed: "Yes, the cloaks used as a saddle, the palm branches, the crowd quoting Psalm 118 — these things didn't happen by accident. Every element connects back to Scripture. That's what made it extraordinary." },
      },
    },
    {
      id: "local_skeptic",
      name: "Jemimah",
      role: "Jerusalem Local",
      faction: "local",
      avatar: "jemimah.svg",
      profileFile: "jemimah",
      color: 0xba93db,
      pos: [12, 0, -15],
      truthfulness: 0.8,
      bibleRef: "Matthew 21:10-11 (The city asking 'Who is this?')",
      hasDialogue: true,
      storyFile: "jerusalem_local",
      unlocksSuspects: ["local_skeptic"],
      unlocksEvidence: [],
      background: "A local city resident managing her household. Irritated by the Passover overcrowding, she is naturally suspicious of Galilean zeal and views the disruptive procession with typical urban cynicism.",
      dialogue: {
        neutral: {
          text: "I saw those Galileans hacking at the rope and dragging the poor beast away. Plain theft in broad daylight!",
          isLie: true,
          correction: "Fine, the owner Tobias was standing right there and he let them take it. But hacking at a tethering post is no way for a 'prophet' to behave."
        },
        cautious: "Everyone is yelling 'Hosanna' like the Romans aren't watching from the Antonia tower. This Galilean teacher—who does He think He is? David?",
        pressured: "Look, I just want to buy my grain without a mob blocking the eastern valley gate. They're calling Him a prophet, but prophets don't usually ride into town with an unauthorized parade.",
        exposed: "I asked the people next to me, 'Who is this?' and they just looked at me like I was blind. They said, 'This is Jesus, the prophet from Nazareth!' Nazareth! Nothing good comes from there.",
        repeat: "Go ask the pilgrims with the green hands. I have work to do.",
      },
      reactions: {
        palm_branch: { text: "People were hacking these off the trees out toward Jericho and dragging them all the way up the path. It's a miracle someone wasn't blinded by them.", isLie: false },
        cloaks: { text: "Whose garments are those? Left right in the dirt! If they wanted to build a carpet for a king, they should use proper tapestry, not smelly travel cloaks.", isLie: false },
        donkey_tracks: { text: "Hoofprints? Yes, right down the Mount of Olives path. The animal was small—practically a baby. It could barely handle the weight, let alone the shouting.", isLie: false },
        crowd_testimony: { text: "The Pharisees aren't the only ones complaining. The noise was deafening. If the crowd doesn't calm down, the Roman garrison will come down from the walls to quiet us themselves.", isLie: false },
        witness_account: { text: "Tobias let them take it? He's a fool. He's always reading old scrolls and staring at the hills. He probably thought they were angels.", isLie: false }
      },
      contradictions: {
        "witness_account+donkey_tracks": { exposed: "Alright, the owner didn't seem to mind them taking it. But that donkey was too small for a man to ride through those crowds.", corrects: "neutral" }
      },
    },
    {
      id: "eleazar",
      name: "Eleazar",
      role: "Sadducean Aristocrat",
      faction: "temple",
      avatar: "eleazar.svg",
      profileFile: "eleazar",
      color: 0x94a3b8,
      pos: [5, 0, -5],
      truthfulness: 0.3,
      bibleRef: "Acts 5:17 (Sadducees filled with jealousy)",
      hasDialogue: true,
      storyFile: "eleazar_sadducee",
      unlocksSuspects: ["pharisee"],
      unlocksEvidence: [],
      revealsProphecy: "malachi_3_1",
      background: "A wealthy member of the priestly aristocracy. He views the Galilean movement as a threat to the status quo and his own influence.",
      dialogue: {
        neutral: {
          text: "I saw those Galileans hacked through the ropes with a sword and dragged the beast away while the owner was distracted. It was a theft, plain and simple.",
          isLie: true,
          correction: "The owner didn't protest; he seemed to expect them. But such displays of royal pretension only invite Roman intervention."
        },
        cautious: "We maintain the peace with Rome through diplomacy. This 'prophet' and his crowd are a threat to that peace.",
        pressured: "They were laying clothes on the road — a royal claim. It is sedition against both the Temple and Caesar.",
        exposed: "I wanted them stopped. I told the guards they were thieves to trigger an arrest. Our authority cannot survive a populist king.",
      },
      reactions: {
        rope_fibers: { text: "Those fibers prove they hacked the rope. A violent act from a violent group.", isLie: true },
        witness_account: { text: "The villager is likely a sympathizer. His word means nothing compared to a member of the Sanhedrin.", isLie: false }
      },
      contradictions: {
        "rope_fibers+witness_account": {
          exposed: "Fine. The rope wasn't hacked. And the owner Tobias practically handed it to them. But don't you see? This 'fulfillment' is a match to a tinderbox.",
          corrects: "neutral"
        }
      }
    }
  ],

  deductions: {
    "cloaks+prophecy_scroll": {
      compare: {
        text: "The disciples' cloaks were used as a saddle for the colt — an act of royal honour. The Zechariah scroll confirms this wasn't impulsive; it was a deliberate fulfilment of a written prophecy.",
        insight: "Zechariah 9:9 predicted a king arriving on a donkey. The disciples' actions — providing the colt, laying cloaks — were a conscious participation in prophecy fulfilment.",
        isKey: true,
        revealsProphecy: "zechariah_9_9",
        bibleRef: "Matthew 21:4–5; Mark 11:7",
      },
      link: {
        text: "The cloaks connect the disciples physically to the scene. The scroll connects the scene spiritually to 520 years of prophetic anticipation.",
        insight: "Together these pieces of evidence show this was a coordinated royal entry, not a theft.",
        isKey: true,
        bibleRef: "Zechariah 9:9; Matthew 21:4",
      },
    },
    "donkey_tracks+witness_account": {
      compare: {
        text: "The hoofprints confirm a small donkey colt was led west toward Jerusalem. The witness testimony confirms two men untied it with the owner's permission after giving a specific pre-arranged phrase.",
        insight: "The disciples knew what to say before they arrived — Jesus had given them the exact words. This level of foreknowledge is either miraculous or points to pre-arrangement with a sympathiser.",
        isKey: true,
        bibleRef: "Mark 11:1–6; Luke 19:31–34",
      },
      timeline: {
        text: "First: the owner released the colt after the disciples gave the authorised phrase. Then: the disciples led it toward Jerusalem. The crowd gathered around Jesus on the Mount of Olives.",
        insight: "The timeline rules out theft — the colt was released voluntarily. Everything moved in a deliberate sequence.",
        isKey: true,
        bibleRef: "Mark 11:6–9",
      },
    },
    "prophecy_scroll+palm_branch": {
      link: {
        text: "The Zechariah scroll describes a king on a donkey. The palm branches are the crowd's response — celebrating exactly the kind of royal arrival Zechariah described.",
        insight: "Palms were used in the Maccabean liberation celebration (1 Maccabees 13:51). The crowd was saying: 'You are our liberating king.' The prophecy and the crowd response form two halves of one moment.",
        isKey: true,
        bibleRef: "John 12:12–13; Zechariah 9:9",
      },
      compare: {
        text: "Set side by side, the written prophecy and the crowd's action match almost line for line — this wasn't a coincidence read backward into the text.",
        insight: "Zechariah 9:9 was five centuries old by this point. The crowd wasn't fulfilling it on purpose; they were simply responding to a king who was.",
        isKey: false,
        bibleRef: "Zechariah 9:9; John 12:12–13",
      },
    },
    "crowd_testimony+witness_account": {
      compare: {
        text: "The Pharisees' complaint confirms the event was public, loud, and unmistakably messianic. The villager's testimony confirms the disciples had pre-authorised access to the colt.",
        insight: "The religious authorities' alarm is itself evidence of how the crowd interpreted the entry. This was not an ambiguous moment — everyone present understood the claim being made.",
        isKey: true,
        bibleRef: "John 12:19; Luke 19:39–40",
      },
    },
    "rope_fibers+cloaks": {
      contradict: {
        text: "The rope was cut, but the cloaks were left — neatly folded. A thief would take whatever was useful and flee. Someone who cut the rope had a reason to be there and no reason to hide.",
        insight: "The cut rope points to haste, not criminal intent. The folded cloaks point to the disciples — who left them behind when they used them as a saddle for the colt.",
        isKey: false,
        bibleRef: "Mark 11:7",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no crime. The donkey was lent willingly by a sympathetic owner who recognised the fulfilment of Zechariah 9:9. The disciples had been given authorised access by Jesus, who foreknew the entire situation.",
    method: "Jesus gave His disciples precise instructions, including a pre-arranged phrase ('The Lord needs it') that would signal the owner to release the colt. The colt — which had never been ridden, meeting the Jewish requirement for sacred or royal purposes — was led down the Mount of Olives to Jesus. The crowd gathered spontaneously, waving palm branches and quoting Psalm 118:25–26 in a public messianic declaration.",
    lesson: "The triumphal entry was a carefully orchestrated prophetic event, not a random arrival. Every detail — the donkey colt, the phrase given to the disciples, the unridden animal, the route, the crowd's response — connected to centuries of Scripture. What looked suspicious to an outsider was actually one of the most precisely predicted moments in history being fulfilled in real time.",
    prophesyFulfilled: ["Zechariah 9:9", "Psalm 118:25–26", "Genesis 49:10–11", "Malachi 3:1"],
    furtherReading: ["Matthew 21:1–11", "Mark 11:1–11", "Luke 19:28–44", "John 12:12–19"],
  },
};

// ============================================================
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// CASE EXPORT: act1CaseB
// SOURCE: act1_case.js
//
// LOCATION:
//   Temple Courts, Jerusalem
//
// DIFFICULTY:
//   2
//
// BACKGROUND:
//   The day after His triumphal entry, Jesus entered the Temple
//   courts and found the Court of the Gentiles filled with money
//   changers and merchants selling sacrificial animals. He drove
//   them out, overturned their tables, and scattered their coins.
//   To many witnesses the scene appeared to be a riot or an act
//   of vandalism, but investigation reveals it was a deliberate
//   prophetic judgment against corruption and the commercial
//   exploitation of God's house. Rather than stealing anything,
//   Jesus condemned a system that had turned worship into profit
//   and restored the Temple's purpose as a place of prayer.
//
// BIBLE REFERENCES:
//   Matthew 21:12–17
//   Mark 11:15–19
//   Luke 19:45–48
//   John 2:13–22
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//
//   • Malachi 3:1
//     The Lord suddenly comes to His Temple to purify it.
//
//   • Isaiah 56:7
//     "My house shall be called a house of prayer for all nations."
//
//   • Psalm 69:9
//     "Zeal for your house will consume me."
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
//   Summary:
//   Jesus deliberately cleanses the Temple by driving out the
//   merchants and money changers, restoring God's house as a
//   place of worship and prayer while publicly condemning the
//   corruption of the Temple system.
//
//   Historical Context:
//   Pilgrims were required to exchange their currency for Tyrian
//   shekels to pay the Temple tax, while approved merchants sold
//   sacrificial animals at inflated prices. These businesses
//   occupied the Court of the Gentiles, preventing the nations
//   from worshipping as Isaiah had foretold.
//
//   Spiritual Theme:
//   Judgment, holiness, and the purification of true worship.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
//   Crime:
//     Apparent vandalism and public disorder
//
//   Actual Event:
//     Prophetic cleansing of the Temple
//
//   Culprit:
//     none
//
//   Motive:
//     To expose corruption, restore God's house as a place of
//     prayer, and fulfil Messianic prophecy.
//
//   Verdict:
//     No crime committed.
//
// ============================================================

export const act1CaseB = {
  id: "temple_cleansing",
  icon: '../assets/gfx/coins-duotone.svg',
  title: "The Overturned Tables",
  subtitle: "The Court of the Gentiles is in chaos. Merchant stands have been upended—was it a riot or a message?",
  location: "jerusalem",
  eventLocation: "Temple Courts, Jerusalem",
  timeOfDay: "day",
  difficulty: 2,
  requires: "triumphal_entry",
  actLabel: "Act I - The Triumphal Entry",
  color: 0x60a5fa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Temple Forensic Search", task: "Collect all evidence", cur: 0, tar: 7 },

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `On Monday morning, Jesus entered the Temple courts and forcefully drove out those who were buying and selling. He overturned the tables of the moneychangers and the benches of those selling doves, declaring: "My house will be called a house of prayer, but you are making it a den of robbers."`,
    significance: `By halting the commercial exploitation in the Court of the Gentiles, Jesus disrupted the high-priestly financial monopoly. More importantly, He acted out a prophetic sign of judgment against an institutional temple system that had locked out the nations from genuine prayer.`,
    historicalNote: `The moneychangers exchanged common Roman and Greek coins for high-purity Tyrian shekels—the only currency accepted for the mandatory temple tax. The currency exchange rates and high costs of sacrificial animals created massive revenue for the Sadducean family of Annas.`,
  },

  prophecies: [
    {
      reference: "Malachi 3:1",
      id: "malachi_3_1",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"And the Lord whom you seek will suddenly come to his temple; and the messenger of the covenant in whom you delight, behold, he is coming, says the LORD of hosts."`,
      written: "~430 BC",
      fulfilledBy: "Jesus unexpectedly arriving to judge the temple's sacrificial practices",
      gospelLink: "Matthew 21:12",
      insight: "Malachi predicted the Messiah would come not as a political puppet for the temple establishment, but as a refining fire to purify it.",
      explanation: "Malachi predicted the Messiah would come not to endorse the Temple system, but to purify it with judgment, like a fire refining metal.",
    },
    {
      reference: "Isaiah 56:7",
      id: "isaiah_56_7",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"These I will bring to my holy mountain... for my house shall be called a house of prayer for all nations."`,
      written: "~700 BC",
      fulfilledBy: "Jesus clearing the outer court—the only area open to non-Jews",
      gospelLink: "Mark 11:17",
      insight: "By converting the Court of the Gentiles into a noisy, crowded marketplace, the leaders made it impossible for non-Jewish seekers to worship.",
      explanation: "By turning the Court of the Gentiles (the only area for non-Jews) into a marketplace, the leaders had blocked the nations from worship. Jesus's action restored the court to its intended purpose.",
    },
    {
      reference: "Psalm 69:9",
      id: "psalm_69_9",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"Zeal for your house will consume me; the insults of those who insult you have fallen on me."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus's passionate action in the Temple, driving out those who had turned prayer into profit",
      gospelLink: "John 2:17 — John explicitly notes that Jesus's disciples remembered this Psalm when He cleared the temple",
      insight: "The disciples recognised the action as scriptural fulfillment. The Temple was meant to be a house of prayer, and Jesus's 'zeal' was not violent rage but covenant faithfulness — the same zeal that burned in David's heart for God's honour.",
      explanation: "The disciples recognized that Jesus's action was not uncontrolled anger but a righteous, covenantal 'zeal' for God's honor, just as David had.",
    },
  ],

  evidencePool: [
    {
      id: "broken_cages",
      name: "Shattered Dove Cages",
      relatedProphecy: "isaiah_56_7",
      type: "physical",
      icon: "../assets/gfx/feather-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-dove",
      label: "Dove Cages",
      pos: [5, 0, -3],
      desc: "Splintered wood and feathers littering the stone floor.",
      description: "Benches belonging to dove-sellers were completely upended. Doves were the required offering for the poor who could not afford livestock.",
      bibleRef: "Leviticus 5:7",
      bibleLink: "leviticus_5_7",
      propheticLink: "Isaiah 56:7 — 'My house shall be called a house of prayer for all nations' — is the prophecy Jesus explicitly quoted as He drove out the sellers. The dove trade was the clearest abuse of it: Leviticus 5:7 allows doves as a concession for poverty, yet the priests exploited this legal requirement with exorbitant commercial markups, locking the poor and the nations out of the very prayer court Isaiah said was for them. That exploitation directly triggered Jesus's anger.",
      bibleRefs: [
        { ref: "Leviticus 5:7", link: "leviticus_57" },
        { ref: "Isaiah 56:7", link: "isaiah_567" }
      ],
      propheticRefs: [
        { ref: "Isaiah 56:7", link: "isaiah_567" },
        { ref: "Leviticus 5:7", link: "leviticus_57" }
      ],
      investigatorNote: "The destruction was targeted. Only the commercial apparatus was overturned; the text notes He told the dove-sellers to 'take these things away,' showing controlled fury, not an out-of-control tantrum.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Pairs with the scattered shekels to show the cleansing was targeted, not a robbery.",
        link: "Event — physical destruction of commercial apparatus in the Temple.",
        timeline: "CHRONOLOGY: The cages were overturned first, before the money was scattered.",
        contradict: "RELIABILITY: The targeted destruction shows controlled action, not random violence."
      }
    },

    {
      id: "scattered_shekels",
      name: "Scattered Tyrian Shekels",
      relatedProphecy: "malachi_3_1",
      type: "analytical",
      icon: "../assets/gfx/coins-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-coins",
      label: "Silver Coins",
      pos: [-4, 0, 8],
      desc: "Dozens of high-purity silver coins left abandoned in the dirt near the overturned tables of the moneychangers.",
      description: "Silver coins stamped with the face of Melqart.",
      bibleRef: "Exodus 30:13",
      bibleLink: "exodus_30_13",
      propheticLink: "Exodus 30:13 required a half-shekel temple offering. The priests exploited this by mandating Tyrian shekels, forcing pilgrims to pay massive exchange fees.",
      bibleRefs: [
        { ref: "Exodus 30:13", link: "exodus_3013" },
        { ref: "Malachi 3:1", link: "malachi_31" }
      ],
      propheticRefs: [
        { ref: "Exodus 30:13", link: "exodus_3013" }
      ],
      investigatorNote: "The fact that merchants left this silver behind in their rush to escape proves the authority and commanding presence Jesus exuded during the clearing.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Pairs with broken cages to confirm the cleansing was targeted, not a robbery.",
        link: "Event — physical evidence of money left behind.",
        timeline: "CHRONOLOGY: The shekels were scattered after the tables were overturned.",
        contradict: "RELIABILITY: No coins were taken, confirming this was a prophetic act, not theft."
      }
    },

    {
      id: "whip_of_cords",
      name: "Discarded Whip of Cords",
      relatedProphecy: "malachi_3_1",
      type: "environmental",
      icon: "../assets/gfx/link-duotone.svg",
      emoji: "", // Retaining for reference, but icon is now SVG
      iconFA: "fa-solid fa-wand-sparkles",
      label: "Whip of Cords",
      pos: [0, 0, 2],
      desc: "A small, crudely fashioned whip woven from the floor-rushes used as bedding for cattle in the courtyard.",
      description: "A makeshift scourge braided out of common rushes.",
      bibleRef: "John 2:15",
      bibleLink: "john_2_15",
      propheticLink: "John 2:15 specifically details Him weaving this instrument on the spot before initiating the cleansing.",
      bibleRefs: [
        { ref: "John 2:15", link: "john_215" },
        { ref: "Malachi 3:1", link: "malachi_31" }
      ],
      propheticRefs: [
        { ref: "John 2:15", link: "john_215" }
      ],
      investigatorNote: "A weapon made from reeds could not seriously injure a grown man. It was used as a symbolic driving tool for the livestock, signaling prophetic exile from the sacred space.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "Connects to the broken cages as part of the same cleansing action.",
        link: "Event — a physical instrument used in the Temple cleansing.",
        timeline: "CHRONOLOGY: The whip was woven on the spot and used during the clearing of the courts.",
        contradict: "RELIABILITY: A reed whip could not seriously injure, confirming the symbolic nature of the act."
      }
    }
  ],

  lab: [
    {
      evidence: "scattered_shekels",
      suspect: "money_changer",
      result: "**Identified as Victim** (Business was disrupted)",
      notes: "Not a coin was pocketed — even Malachi admits it. Overturned tables (Mark 11:15), not a robbery."
    },
    {
      evidence: "broken_cages",
      suspect: "merchant_jadan",
      result: "**Identified as Victim** (Wares were destroyed)",
      notes: "'You have made it a den of robbers' (Mark 11:17) — the outrage was at the trade itself, not aimed at Jadan personally."
    }
  ],
  suspects: [
    {
      id: "merchant_jadan",
      name: "Jadan of Bethphage",
      role: "Temple Dove Vendor",
      avatar: "temple_merchant.svg",
      bibleRef: "Matthew 21:12",
      background: "A local trader licensed directly by the Sanhedrin to operate a booth inside the royal stOA.",
      dialogue: {
        neutral: "My entire inventory flew away into the rafters! Who is going to pay for my ruined cages?",
        unlocksSuspects: ["merchant_jadan"],
        cautious: "The guards did nothing to stop Him. He had an intensity in His eyes that made the bravest men back away. No one dared raise a hand.",
      },
      contradictions: {
        "broken_cages+whip_of_cords": {
          exposed: "He didn't strike me with that whip. He used it to drive out the sheep and oxen. But when He looked at my table, He said I had turned His Father's house into a den of thieves. My conscience stung worse than any lash."
        },
      },
    },
    { id: "none", name: "No One", role: "Not Stolen", avatar:  "question-duotone.svg", bibleRef: null },
  ],

  npcs: [
    {
      id: "money_changer",
      name: "Malachi",
      role: "Temple Money Changer",
      faction: "temple",
      avatar: "malachi_moneychanger.svg",
      profileFile: "malachi_moneychanger",
      color: 0xffdd66,
      pos: [-6, 0, 6],
      truthfulness: 0.5,
      bibleRef: "Mark 11:15",
      hasDialogue: true,
      storyFile: "money_changer",
      unlocksEvidence: ["scattered_shekels", "broken_cages"],
      revealsProphecy: "malachi_3_1",
      background: "A licensed merchant operating under high-priestly authorization. His business scales on demanding steep transaction rates to exchange foreign pilgrim coins into Tyrian shekels.",
      dialogue: {
        neutral: {
          text: "The Galilean is a common thief! He upended my table and made off with a heavy bag of Tyrian silver shekels!",
          isLie: true,
          correction: "He didn't take a single coin. He just scattered the silver in the dirt like it was nothing but common gravel. It was an insult to the Sanctuary tax itself."
        },
        cautious: "The man is dangerous. He speaks about the Temple as if He owns the deeds. The crowd was backing Him up, that's the only reason we ran.",
        pressured: "Alright, look—our markup rates are set by the families of Annas. We don't keep all the profits. We just enforce the exchange standard.",
        exposed: "He didn't steal a single coin. That's what unnerves me. A zealot or a thief takes the silver. He just scattered it, like it was nothing but dirt under His feet.",
        repeat: "I am still counting my structural losses. Go bother the dove merchants.",
      },
      reactions: {
        scattered_shekels: { text: "Those are high-purity Tyrian silvers. The only legal currency for the Sanctuary tax. He dumped them right into the courtyard dust!", isLie: false },
        whip_of_cords: { text: "He was waving that thing around like a madman! He struck my ledger table directly. I nearly lost an eye to the flying splinters.", isLie: true },
        broken_cages: { text: "Jadan's birds? Good riddance. The noise in this court was already intolerable before the Galilean started a riot.", isLie: false }
      },
      contradictions: {
        "scattered_shekels+whip_of_cords": { exposed: "Fine! He didn't use the whip on us. He didn't even touch the moneychangers.", corrects: "neutral" }
      }
    },
    {
      id: "garrison_guard",
      name: "Marcus",
      role: "Antonia Fortress Guard",
      faction: "roman",
      avatar: "garrison_guard.svg",
      profileFile: "garrison_guard",
      color: 0xdd4444,
      pos: [0, 0, 12],
      truthfulness: 0.85,
      bibleRef: "Luke 19:47-48",
      hasDialogue: true,
      storyFile: "guard_report_temple",
      unlocksEvidence: ["whip_of_cords"],
      background: "A working-class Roman auxiliary stationed on the high outer wall walkways. He views the regional theological squabbles with complete military detachment.",
      dialogue: {
        neutral: "He called it 'My Father's House.' The merchants called it their living. I called it my afternoon duty shift.",
        cautious: "Our orders from the Centurion were clear: do not intervene unless a full political rebellion begins. Flipped tables don't violate Roman civil law.",
        pressured: "The temple priests were furious that we didn't send in the cohorts. But why should Roman blood protect their currency exchange booths?",
        exposed: "I watched the whole thing from the parapet. The Galilean had total control over that crowd. One word from Him, and they would have taken the fortress gates.",
        repeat: "Shift's almost over. Talk to the merchants if you want complaints.",
      },
      reactions: {
        whip_of_cords: { text: "I saw Him braided that out of livestock bedding. Clever, really. It wouldn't stop a legionary, but it scared the sheep out of the gates fast enough.", isLie: false },
        scattered_shekels: { text: "I watched the locals diving into the dirt to grab those coins. Surprising the merchants didn't fight back, but they were paralyzed by His presence.", isLie: false },
        broken_cages: { text: "Those feathers are going to be floating around the stOA for a week. A total mess, but not our tactical concern.", isLie: false }
      },
      contradictions: {
        "broken_cages+scattered_shekels": { exposed: "The priests tried to frame this as an armed insurrection to Pilate. But we logged it as a domestic religious cleanup. The Galilean wasn't fighting Rome; He was fighting the merchants' corruption." }
      }
    }
    ,
    {
      id: "barabbas_insurgent",
      name: "Barabbas",
      role: "Insurgent",
      avatar: "barabbas.svg",
      truthfulness: 0.3,
      bibleRef: "Mark 15:6-15; Luke 23:18-19; John 18:40",
      hasDialogue: true,
      storyFile: "barabbas_insurgent",
      background: "A revolutionary zealot imprisoned for violent insurrection. The crowd chooses him over Jesus — a commentary on popular hopes for a military messiah vs the reality of a spiritual kingdom.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "informant_bribe",
      name: "Market Informant",
      role: "Street Informant",
      avatar: "market_informant.svg",
      truthfulness: 0.4,
      bibleRef: "Matthew 26:14-16; John 13:29",
      hasDialogue: true,
      storyFile: "informant_bribe",
      background: "A street-level informant who sells information. He knows the inner circle movements and can be bought.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "market_rumors",
      name: "Market Vendor",
      role: "Street Merchant",
      avatar: "market_vendor.svg",
      truthfulness: 0.7,
      bibleRef: "Mark 11:15-19 (Temple market)",
      hasDialogue: true,
      storyFile: "market_rumors",
      background: "A merchant in the Court of the Gentiles. He sees everyone and hears everything — useful for gathering rumors.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "pontius_pilate",
      name: "Pontius Pilate",
      role: "Roman Prefect",
      avatar: "pontius_pilate.svg",
      truthfulness: 0.5,
      bibleRef: "Luke 23:1-25; John 18:28-19:16",
      hasDialogue: true,
      storyFile: "pontius_pilate_temple",
      background: "The Roman governor of Judea. Politically ruthless but personally conflicted — finds no fault in Jesus but yields to the crowd.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "pilates_secretary",
      name: "Pilate's Secretary",
      role: "Administrative Recorder",
      avatar: "pilates_secretary.svg",
      truthfulness: 0.6,
      bibleRef: "John 19:19-22 (INRI inscription)",
      hasDialogue: true,
      storyFile: "pilates_secretary",
      background: "An educated Roman clerk who drafted the charge hung on the cross. He records official documents.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "pharisee_critique",
      name: "Simon the Pharisee",
      role: "Local Civic Judge",
      avatar: "simon_pharisee.svg",
      truthfulness: 0.6,
      bibleRef: "Luke 18:9-14 (Pharisee and Tax Collector); Luke 7:36-50",
      hasDialogue: true,
      storyFile: "pharisee_critique",
      background: "A Pharisee who trusted in his own righteousness. His critique of Jesus reveals his own spiritual blindness. Invited Jesus to dinner but was horrified when a sinful woman anointed Him.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "priest_objection",
      name: "Temple Priest Objector",
      role: "Sadducean Aristocrat",
      avatar: "temple_priest.svg",
      truthfulness: 0.5,
      bibleRef: "Acts 4:1-3; Acts 5:17-42",
      hasDialogue: true,
      storyFile: "priest_objection_temple",
      background: "An elite Sadducean priest who views any popular religious movement as a threat. Objects to teaching on resurrection.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "rumor_whisper",
      name: "Rumor Whisperer",
      role: "City Gossip",
      avatar: "city_gossip.svg",
      truthfulness: 0.3,
      bibleRef: "Luke 4:22 (Initially spoke well of Him...)",
      hasDialogue: true,
      storyFile: "rumor_whisper",
      background: "An ordinary resident spreading whispers. Partly informed, mostly distorted. Reflects popular confusion.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "upset_buyer",
      name: "Upset Temple Buyer",
      role: "Displaced Merchant",
      avatar: "displaced_merchant.svg",
      truthfulness: 0.7,
      bibleRef: "Mark 11:15-18 (Jesus drives out merchants)",
      hasDialogue: true,
      storyFile: "upset_buyer",
      background: "A dove or livestock seller ejected from the Temple courts. Resentful but not entirely without cause.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "woman_cloak",
      name: "Woman Who Gave Her Cloak",
      role: "Devout Follower",
      avatar: "devout_follower.svg",
      truthfulness: 0.9,
      bibleRef: "Luke 8:1-3 (Women who supported Jesus)",
      hasDialogue: true,
      storyFile: "woman_cloak",
      background: "A woman from the crowd who spread her cloak on the road. Spontaneous devotion — part of the Hosanna movement.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "sadducee_opposition",
      name: "Sadducee Opposer",
      role: "Sadducean Authority",
      avatar: "sadducee_authority.svg",
      truthfulness: 0.4,
      bibleRef: "Acts 23:6-8 (Sadducees deny resurrection)",
      hasDialogue: true,
      storyFile: "sadducee_opposition",
      background: "An elite Sadducean who denies resurrection, angels, and spirits. Opposes the movement.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "corrupt_seller",
      name: "Corrupt Seller",
      role: "Temple Merchant",
      avatar: "temple_merchant.svg",
      truthfulness: 0.4,
      bibleRef: "Mark 11:15-19",
      hasDialogue: true,
      storyFile: "corrupt_seller",
      background: "A Temple merchant who sold sacrificial animals. Profited from the Temple system. Ejected by Jesus during the cleansing.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
  ],

  deductions: {
    "broken_cages+whip_of_cords": {
      link: {
        text: "The makeshift whip matches the scattered debris of the marketplace floor.",
        insight: "Jesus manufactured the tool using the raw environment of the corruption itself—the bedding of the livestock—turning their own system against them.",
        isKey: true,
        bibleRef: "John 2:15",
      },
    },
    "scattered_shekels+whip_of_cords": {
      link: {
        text: "The financial loss was immediate, yet no legal charges have been pressed by the victims.",
        insight: "The merchants cannot complain to Roman law because their operation inside the Court of the Gentiles was legally dubious and religiously scandalous to the general public.",
        isKey: false,
        bibleRef: "Luke 19:47–48",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no crime. Jesus acted within His rightful authority as the Son of God purifying His Father's house, executing a calculated prophetic sign.",
    method: "Jesus entered the Court of the Gentiles, manufactured a symbolic whip out of local rushes, and cleared out the illegal and predatory commercial stands. The religious authorities were too paralyzed by His moral clarity and the support of the common crowds to arrest Him on the spot.",
    lesson: "The temple cleansing showed that God values genuine, accessible worship for all people over cold, corrupt religious performance. It sealed Jesus's fate with the religious elite, who immediately began plotting His death.",
    prophesyFulfilled: ["Malachi 3:1", "Isaiah 56:7", "Jeremiah 7:11"],
    furtherReading: ["Mark 11:15–19", "John 2:13–22"],
  },
};

// ============================================================
// ACT: Act I
// CASE: The Withered Fig Tree
// CASE ID: withered_fig_tree
// CASE EXPORT: act1CaseC
// SOURCE: act1_case.js
//
// LOCATION:
//   Road between Bethany and Jerusalem
//
// DIFFICULTY:
//   3
//
// BACKGROUND:
//   On the morning after cleansing the Temple, Jesus approached
//   a leafy fig tree looking for fruit. Finding only leaves, He
//   pronounced a judgment upon it: "May no one ever eat fruit
//   from you again." By the following morning the tree had
//   withered from the roots. To observers it appeared to be an
//   inexplicable act of destruction against an innocent tree,
//   but investigation reveals it was a prophetic sign against
//   spiritual hypocrisy. The tree displayed every appearance of
//   life yet produced no fruit, mirroring Israel's religious
//   leadership and preparing the disciples for lessons on faith,
//   prayer, and judgment.
//
// BIBLE REFERENCES:
//   Matthew 21:18–22
//   Mark 11:12–14, 20–25
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//
//   • Jeremiah 8:13
//     "There are no figs on the fig tree..."
//
//   • Hosea 9:10,16
//     Israel is compared to a fig tree that has become fruitless.
//
//   • Micah 7:1
//     The prophet laments the absence of the first ripe figs,
//     symbolising the lack of righteousness in Israel.
//
//   • Psalm 33:8–9
//     "He spoke, and it came to be; He commanded, and it stood firm."
//     Jesus demonstrates the divine authority of God's spoken word
//     by commanding the fig tree, which immediately begins to wither.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
//   Summary:
//   Jesus uses the barren fig tree as a living parable of
//   judgment. Although covered in leaves, it bears no fruit,
//   illustrating outward religion without genuine faith or
//   righteousness.
//
//   Historical Context:
//   Fig trees commonly produced small early figs before their
//   full crop. A tree covered in leaves should normally have
//   contained edible early fruit. Its barrenness made it a
//   fitting symbol of the Temple establishment, which appeared
//   spiritually healthy while failing to produce the fruit God
//   desired.
//
//   Spiritual Theme:
//   Fruitfulness, authentic faith, and divine judgment against
//   hypocrisy.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
//   Crime:
//     Apparent destruction of private property
//
//   Actual Event:
//     Prophetic sign of judgment
//
//   Culprit:
//     none
//
//   Motive:
//     To demonstrate God's judgment on fruitless religion and
//     teach the disciples about genuine faith, prayer, and
//     spiritual fruitfulness.
//
//   Verdict:
//     No crime committed.
//
// ============================================================

export const act1CaseC = {
  id: "fig_tree_incident",
  icon: '../assets/gfx/tree-duotone.svg',
  title: "The Barren Fig Tree",
  subtitle: "A fig tree cursed for its unfruitfulness withers overnight, a stark lesson for the disciples.",
  location: "jerusalem",
  eventLocation: "Bethany Road, Mount of Olives",
  timeOfDay: "morning",
  difficulty: 2,
  requires: "temple_cleansing",
  actLabel: "Act I - The Triumphal Entry",
  color: 0x4ade80, // A muted green/brown color
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Fig Tree Investigation", task: "Understand the prophetic sign", cur: 0, tar: 7 },

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `On Monday morning, as Jesus and His disciples walked from Bethany to Jerusalem, Jesus saw a fig tree with leaves but no fruit. He cursed it, saying, "May no one ever eat fruit from you again." The next morning, Tuesday, as they passed by, the disciples noticed the fig tree had withered from the roots. This acted as a living parable, a prophetic sign of judgment on unfruitful Israel and a powerful lesson on the authority of faith and prayer.`,
    significance: `The fig tree, often a symbol for Israel in the Old Testament, represented outward religious appearance without inward spiritual fruit. Jesus's action was a dramatic visual sermon, foreshadowing judgment on a religious system that had become barren. It also taught the disciples about the power of faith-filled prayer.`,
    historicalNote: `Fig trees typically produce fruit before leaves. A tree with leaves but no fruit was deceptive, promising what it could not deliver. This made it a perfect symbol for the religious establishment of the day, which had the outward appearance of piety but lacked genuine spiritual fruit.`,
  },

  prophecies: [
    {
      reference: "Micah 7:1",
      id: "micah_7_1",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"What misery is mine! I am like one who gathers summer fruit at the close of the grape harvest; there is no cluster of grapes to eat, no early fig I crave."`,
      written: "~700 BC",
      fulfilledBy: "Jesus finding no fruit on the fig tree, symbolizing Israel's spiritual barrenness",
      gospelLink: "Mark 11:12–14",
      insight: "Micah lamented Israel's spiritual emptiness, comparing it to a harvest with no fruit. Jesus's action with the fig tree visually enacted this ancient prophetic lament, demonstrating God's disappointment with His people's unfruitfulness.",
      explanation: "The prophet Micah used the image of a fruitless harvest to lament Israel's spiritual emptiness. Jesus's action with the fig tree was a living enactment of this prophetic disappointment.",
    },
    {
      reference: "Jeremiah 8:13",
      id: "jeremiah_8_13",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"I will take away their harvest, declares the LORD. There will be no grapes on the vine, no figs on the tree, and their leaves will wither."`,
      written: "~600 BC",
      fulfilledBy: "The fig tree withering after Jesus's curse, signifying judgment",
      gospelLink: "Mark 11:20–21",
      insight: "Jeremiah prophesied a time when God would remove the fruit and cause the leaves to wither as a sign of judgment. The fig tree's immediate withering after Jesus's word was a direct fulfillment, a visible sign of the spiritual judgment coming upon an unfruitful religious system.",
      explanation: "Jeremiah prophesied that God would cause leaves to wither as a sign of judgment. The tree's immediate withering was a direct, visible fulfillment of this.",
    },
    {
      reference: "Psalm 33:8–9",
      id: "psalm_33_8_9",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"Let all the earth fear the LORD; let all the inhabitants of the world stand in awe of him. For he spoke, and it came to be; he commanded, and it stood firm."`,
      written: "~1000 BC",
      fulfilledBy: "The disciples witnessing the immediate and absolute power of Jesus's spoken word over creation",
      insight: "Peter's shock at the withered tree highlights the transition from seeing Jesus as a teacher to recognizing Him as the Author of Creation. The Psalm explicitly links God's command to the immediate response of the physical world.",
      explanation: "The event demonstrated Jesus's absolute authority over creation, where His spoken word has immediate physical effect, fulfilling the Psalmist's description of God's power.",
    },
    {
      reference: "Zechariah 4:6–7",
      id: "zechariah_4_6_7",
      icon: "../assets/gfx/star-duotone.svg",
      text: `"‘Not by might nor by power, but by my Spirit,’ says the LORD Almighty. ‘What are you, mighty mountain? Before Zerubbabel you will become level ground.’"`,
      written: "~520 BC",
      fulfilledBy: "Jesus teaching that faith in God provides authority to move mountains and overcome any obstacle",
      insight: "When Jesus spoke of moving mountains into the sea, He was using a familiar prophetic metaphor. Zechariah used the mountain to represent seemingly impossible obstacles to God's work that are removed through divine power, not human effort.",
      explanation: "Jesus used the 'mountain-moving' metaphor, familiar from Zechariah, to teach that faith connects the believer to this same divine power that overcomes impossible obstacles.",
    },
  ],

  intro: formatIntro(`It is Tuesday morning. As Jesus and His disciples walk from Bethany back to Jerusalem, Peter points to a fig tree they had passed yesterday. It was full of leaves then, but now it is **completely withered** from the roots. The disciples are astonished. Was this a mere coincidence, a natural phenomenon, or something _far more profound_? The withered tree stands as a silent witness, demanding an explanation.`),

  suspects: [
    { id: "peter_fig_tree", name: "Peter", role: "Disciple, Witness to the Withering", avatar: "peter.svg", bibleRef: "Mark 11:21" },
    { id: "none", name: "No One", role: "Prophetic Act", avatar:  "question-duotone.svg", bibleRef: null },
  ],

  evidencePool: [
    {
      id: "cursed_fig_tree_desc",
      name: "Description of the Fig Tree (Monday)",
      type: "analytical",
      relatedProphecy: "micah_7_1",
      icon: "../assets/gfx/tree-duotone.svg",
      location: "Bethany Road",
      desc: "Eyewitness accounts describe the fig tree on Monday morning: full of leaves, but bearing no fruit. Jesus approached it, found nothing, and spoke a curse upon it.",
      bibleRef: "Mark 11:12–14",
      bibleLink: "mark_11_12_14",
      propheticLink: "The tree's appearance—leaves but no fruit—symbolized Israel's outward show of religiosity without genuine spiritual fruit, echoing prophetic laments like Micah 7:1.",
      bibleRefs: [
        { ref: "Mark 11:12-14", link: "mark_111214" },
        { ref: "Micah 7:1", link: "micah_71" }
      ],
      propheticRefs: [
        { ref: "Micah 7:1", link: "micah_71" }
      ],
      investigatorNote: "The tree's barrenness was noted before the curse, establishing the context for Jesus's action.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Pairs with the withered tree state to show the full sequence of the fig tree incident.",
        link: "Event — the initial observation of the barren fig tree.",
        timeline: "CHRONOLOGY: Observed on Monday morning before the Temple cleansing.",
        contradict: "RELIABILITY: Multiple disciples witnessed the tree's condition before the curse."
      }
    },

    {
      id: "withered_fig_tree_state",
      name: "The Withered Fig Tree (Tuesday)",
      type: "physical",
      relatedProphecy: "jeremiah_8_13",
      icon: "../assets/gfx/leaves-duotone.svg",
      location: "Bethany Road",
      desc: "The fig tree, observed on Tuesday morning, is completely withered from its roots. Its leaves are shriveled and branches brittle, as if suddenly struck by a severe blight.",
      bibleRef: "Mark 11:20–21",
      bibleLink: "mark_11_20_21",
      propheticLink: "The rapid, complete withering fulfilled prophecies of judgment on unfruitfulness, such as Jeremiah 8:13, where God threatens to remove fruit and wither leaves.",
      bibleRefs: [
        { ref: "Mark 11:20-21", link: "mark_112021" },
        { ref: "Jeremiah 8:13", link: "jeremiah_813" }
      ],
      propheticRefs: [
        { ref: "Jeremiah 8:13", link: "jeremiah_813" }
      ],
      investigatorNote: "The speed and totality of the withering are highly unusual for natural causes, especially overnight.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Pairs with Peter's astonishment to confirm the miracle was witnessed immediately.",
        link: "Event — physical evidence of the withered fig tree.",
        timeline: "CHRONOLOGY: Discovered Tuesday morning, the day after the curse.",
        contradict: "RELIABILITY: The complete withering from the roots is consistent with the Gospel accounts."
      }
    },

    {
      id: "peter_astonishment",
      name: "Peter's Astonished Reaction",
      type: "testimonial",
      relatedProphecy: "psalm_33_8_9",
      icon: "../assets/gfx/user-duotone.svg",
      location: "Bethany Road",
      desc: "Peter's exclamation to Jesus: 'Rabbi, look! The fig tree you cursed has withered!' His tone suggests genuine surprise and awe at the immediate and powerful effect of Jesus's words.",
      bibleRef: "Mark 11:21",
      bibleLink: "mark_11_21",
      propheticLink: "Psalm 33:8-9 declares that all should stand in awe of Him because 'He spoke, and it came to be.' Peter’s reaction is the physical fulfillment of this reverence when confronted with divine command.",
      bibleRefs: [
        { ref: "Mark 11:21", link: "mark_1121" },
        { ref: "Psalm 33:8-9", link: "psalm_3389" }
      ],
      propheticRefs: [
        { ref: "Psalm 33:8-9", link: "psalm_3389" }
      ],
      investigatorNote: "Peter specifically links the withering to Jesus's curse, indicating he understood it as a direct consequence.",
      fake: false,
      category: 'people',
      timelineOrder: 3,
      clues: {
        compare: "Connects the withered tree to Jesus's teaching on faith.",
        link: "People — Peter's testimony about the withered fig tree.",
        timeline: "CHRONOLOGY: Peter's reaction occurred Tuesday morning when they saw the withered tree.",
        contradict: "RELIABILITY: Peter's astonishment is consistent with his character as an impulsive, observant disciple."
      }
    },

    {
      id: "disciples_faith_lesson",
      name: "Jesus's Teaching on Faith",
      type: "analytical",
      relatedProphecy: "zechariah_4_6_7",
      icon: "../assets/gfx/book-open-duotone.svg",
      location: "Bethany Road",
      desc: "Jesus's response to Peter's astonishment: 'Have faith in God... Truly I tell you, if anyone says to this mountain, 'Go, throw yourself into the sea,' and does not doubt in their heart but believes that what they say will happen, it will be done for them.'",
      bibleRef: "Mark 11:22–24",
      bibleLink: "mark_11_22_24",
      propheticLink: "Zechariah 4:7 speaks of a 'mighty mountain' becoming 'level ground' by the Spirit. Jesus adopts this imagery to show that faith connects the believer to that same mountain-moving power.",
      bibleRefs: [
        { ref: "Mark 11:22-24", link: "mark_112224" },
        { ref: "Zechariah 4:6-7", link: "zechariah_467" }
      ],
      propheticRefs: [
        { ref: "Zechariah 4:7", link: "zechariah_4_7" }
      ],
      investigatorNote: "The lesson immediately following the miracle underscores its dual purpose: judgment and a call to radical faith.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 4,
      clues: {
        compare: "Connects the fig tree withering to the broader theme of faith and prophetic authority.",
        link: "Prophecy — Jesus's teaching on faith links to Zechariah 4:7 and the mountain-moving metaphor.",
        timeline: "CHRONOLOGY: The teaching was given Tuesday morning after Peter noticed the withered tree.",
        contradict: "RELIABILITY: The teaching is recorded in multiple Gospel accounts, confirming its authenticity."
      }
    }
  ],

  lab: [
    {
      evidence: "withered_fig_tree_state",
      suspect: "peter_fig_tree",
      result: "**Identified as Witness** (Observed the event, did not cause it)",
      notes: "'How did the fig tree wither so quickly?' (Matthew 21:20). Peter only found the aftermath — the word was spoken the day before."
    }
  ],
  npcs: [
    {
      id: "peter_fig_tree",
      name: "Peter",
      role: "Disciple, Witness to the Withering",
      faction: "scribes",
      avatar: "peter.svg",
      profileFile: "peter",
      color: 0xffaa44,
      pos: [-10, 0, -5],
      truthfulness: 0.8,
      bibleRef: "Mark 11:20–21",
      hasDialogue: true,
      storyFile: "peter_fig_tree",
      unlocksSuspects: ["peter_fig_tree"],
      unlocksEvidence: ["peter_astonishment", "disciples_faith_lesson"],
      revealsProphecy: "jeremiah_8_13",
      background: "Simon Peter, one of Jesus's closest disciples. He was present when Jesus cursed the fig tree on Monday and was the first to point out its withered state on Tuesday.",
      dialogue: {
        neutral: "I couldn't believe my eyes! One day it's green, the next it's dead. Just like He said.",
        cautious: "He looked at that tree yesterday, and it was like... He saw right through it. Saw its emptiness.",
        pressured: "He told us to have faith. To believe that what we ask for will be done. It makes you wonder what else we could do if we truly believed.",
        exposed: "It wasn't just a tree, was it? It was a sign. For us. For Jerusalem. For anyone who looks good on the outside but has no fruit.",
        repeat: "The lesson was clear. Faith. And fruit.",
      },
      reactions: {
        cursed_fig_tree_desc: { text: "It looked healthy enough yesterday, full of leaves. But when He looked for fruit, there was none. He was hungry, and it offered nothing.", isLie: false },
        withered_fig_tree_state: { text: "From the roots up! Completely withered overnight. I've never seen anything like it.", isLie: false },
        disciples_faith_lesson: { text: "He told us that if we have faith, we can tell a mountain to move, and it will. If His word can wither a tree, what can our faith do?", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "john_fig_tree",
      name: "John",
      role: "Disciple, Observer",
      faction: "scribes",
      avatar: "john_apostle.svg",
      profileFile: "john_apostle",
      color: 0x66aaff,
      pos: [10, 0, -8],
      truthfulness: 0.9,
      bibleRef: "Mark 11:20–21",
      hasDialogue: true,
      storyFile: "john_fig_tree",
      unlocksSuspects: ["john_fig_tree"],
      unlocksEvidence: ["cursed_fig_tree_desc"],
      revealsProphecy: "zechariah_4_6_7",
      background: "John, son of Zebedee, was present with Jesus and Peter during the fig tree incident. He observed the events and heard Jesus's teaching on faith.",
      dialogue: {
        neutral: "It was a powerful lesson. The tree had leaves, but no fruit. It promised something it couldn't deliver.",
        cautious: "Jesus often taught in parables. Sometimes, He acted them out. This was one of those times.",
        pressured: "The Temple, too, had many leaves—many rituals and traditions. But was it bearing the fruit God desired?",
        exposed: "The withering was a sign of judgment. But His teaching on faith was a sign of hope. We are to be fruitful, and to believe.",
        repeat: "The tree spoke volumes without saying a word.",
      },
      reactions: {
        cursed_fig_tree_desc: { text: "It was deceptive. All outward appearance, no substance. Jesus saw through it.", isLie: false },
        withered_fig_tree_state: { text: "The speed of it was astonishing. It was a clear demonstration of His authority.", isLie: false },
        peter_astonishment: { text: "Peter was right to be amazed. It was a visible, undeniable miracle.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "nathan_gardener",
      name: "Nathan",
      role: "Local Landowner",
      faction: "local",
      avatar: "nathan_gardener.svg",
      profileFile: "nathan_gardener",
      color: 0x888877,
      pos: [5, 0, 2], // Example position, adjust as needed
      truthfulness: 0.8,
      bibleRef: "Mark 11:12-14, 20-25",
      hasDialogue: true,
      storyFile: "nathan_fig_tree",
      unlocksSuspects: ["nathan_gardener"],
      unlocksEvidence: ["withered_fig_tree_state"],
      revealsProphecy: "micah_7_1",
      background: "A bewildered gardener who maintains the orchards along the path from Bethany. He witnessed the sudden transition of the fig tree.",
      dialogue: {
        neutral: "I don't understand it, Scribe. That tree was lush yesterday morning. Now? It looks like it hasn't seen water in a decade.",
        cautious: "The Nazarene and his followers passed by. He looked for fruit, found none, and spoke to it. I thought he was just frustrated... until I saw the leaves turn gray before my very eyes.",
        pressured: "No blight works this fast. This wasn't nature taking its course. This was... a command. It withered from the roots up.",
        exposed: "Be careful with that one. His words have weight. I saw it with my own eyes.",
        repeat: "I've told you all I know about that tree."
      },
      reactions: {},
      contradictions: {},
    },
    {
      id: "local_traveler_fig_tree", // Unique ID for this specific local traveler
      name: "Local Traveler",
      role: "Roadside Witness",
      faction: "local",
      avatar: "local_traveler.svg",
      profileFile: "local_traveler", // Assuming a generic local_traveler profile exists
      color: 0x9ca3af,
      pos: [0, 0, 5],
      truthfulness: 0.8,
      bibleRef: "Mark 11:12-14, 20-21",
      hasDialogue: true,
      storyFile: "local_traveler", // Assuming a generic local_traveler story exists
      unlocksSuspects: ["local_traveler_fig_tree"],
      unlocksEvidence: ["withered_fig_tree_state"],
      revealsProphecy: "psalm_33_8_9",
      background: "A common traveler on the road between Bethany and Jerusalem, who observed the fig tree both on Monday and Tuesday morning.",
      dialogue: {
        neutral: "I walk this road every day. I saw that fig tree yesterday, full of leaves. And this morning... well, you wouldn't believe it.",
        cautious: "It was a fine-looking tree yesterday, but no figs. A bit early, perhaps. But today, it's dead. Completely.",
        pressured: "I saw the Galilean teacher and his men pass by both mornings. He looked at it yesterday. Today, one of his men pointed it out, astonished.",
        exposed: "I didn't see them do anything to it. Just look. But the way the teacher looked at it yesterday... it was a look that could curdle milk. And then today, it was dead. Strange, isn't it?",
        repeat: "It's a mystery to me. One day alive, the next dead. Just like that.",
      },
      reactions: {
        cursed_fig_tree_desc: { text: "Yes, that's how it looked yesterday. Lots of leaves, but no fruit. All show, no substance.", isLie: false },
        withered_fig_tree_state: { text: "That's it exactly! Withered from the roots. It happened overnight. No storm, no axe. Just... dead.", isLie: false },
        peter_astonishment: { text: "One of his men, a big, loud one, pointed it out. He was truly amazed. They all were.", isLie: false },
      },
      contradictions: {},
    },
  ],

  deductions: {
    "cursed_fig_tree_desc+withered_fig_tree_state": {
      link: {
        text: "The fig tree's rapid transformation from leafy but barren to completely withered overnight is a direct consequence of Jesus's curse.",
        insight: "This event serves as a powerful visual parable, demonstrating Jesus's authority over nature and symbolizing judgment on spiritual unfruitfulness, particularly within the religious establishment.",
        isKey: true,
        bibleRef: "Mark 11:12–14, 20–21",
      },
    },
    "peter_astonishment+disciples_faith_lesson": {
      compare: {
        text: "Peter's astonishment at the withered tree directly prompts Jesus's teaching on the power of faith and prayer.",
        insight: "The miracle was not just a display of power, but a catalyst for a crucial lesson: genuine faith can achieve the impossible, and unfruitfulness leads to judgment.",
        isKey: true,
        bibleRef: "Mark 11:21–24",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "The fig tree incident was a prophetic act by Jesus, symbolizing judgment on Israel's spiritual barrenness and teaching His disciples about the power of faith.",
    method: "Jesus cursed the fig tree on Monday morning for its lack of fruit despite its appearance. Overnight, His word caused the tree to wither completely from the roots, which the disciples observed on Tuesday morning. This served as a living parable and a direct lesson on faith and prayer.",
    lesson: "The barren fig tree represents outward religiosity without inward spiritual fruit, foreshadowing judgment on the Temple and the religious leaders. Simultaneously, Jesus used the event to teach His disciples about the transformative power of faith in God and the effectiveness of prayer.",
    prophesyFulfilled: ["Micah 7:1", "Jeremiah 8:13"],
    furtherReading: ["Matthew 21:18–22", "Mark 11:12–14, 20–25"],
  },
};