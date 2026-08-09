import { formatIntro } from './utils.js';

// ============================================================
// ACT: II — Authority Challenged
// CASE: The Silenced Teacher
// CASE ID: authority_challenged
// CASE EXPORT: act2CaseA
// SOURCE: Matthew 21:23–22:46; Mark 11:27–12:44; Luke 20:1–21:4
//
// LOCATION:
// Temple Courts, Jerusalem
//
// DIFFICULTY:
// ★★☆☆☆ (2/5)
//
// BACKGROUND:
// On the Tuesday of Passion Week, Jesus returned to the Temple after
// cleansing it the previous day. The chief priests, elders, Pharisees,
// Sadducees, Herodians, and scribes launched a coordinated series of
// public challenges designed to discredit Him before the crowds.
// Instead, every trap was answered with perfect wisdom, exposing the
// hypocrisy of His opponents while affirming His divine authority.
// By the end of the day, no one dared question Him further.
//
// BIBLE REFERENCES:
// Matthew 21:23–22:46
// Mark 11:27–12:44
// Luke 20:1–21:4
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
// • Psalm 118:22–23 — The rejected stone becomes the cornerstone.
//
// • Isaiah 5:1–7 — The Song of the Vineyard fulfilled through the
//   Parable of the Wicked Tenants.
//
// • Daniel 7:13–14 — The Son of Man possesses everlasting authority
//   and dominion.
//
// • Malachi 3:1 — The Lord comes suddenly to His Temple after His
//   messenger prepares the way.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
// Summary:
// Religious leaders publicly challenged Jesus's authority, hoping to
// trap Him into making a statement that could justify His arrest.
// Jesus answered every challenge with wisdom, exposed their motives,
// taught several parables of judgment, and revealed Himself as the
// rejected Cornerstone foretold in Scripture.
//
// Historical Context:
// This confrontation took place during Passion Week in the Temple
// courts of Jerusalem, where thousands of pilgrims had gathered for
// Passover. Public debates between rabbis were common, but this was
// an organised attempt by the Sanhedrin and allied religious groups
// to undermine Jesus before the crowds.
//
// Spiritual Theme:
// Divine authority, truth confronting hypocrisy, wisdom, judgment,
// the rejection of God's Messiah, and the fulfilment of prophecy.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
// Crime:
// Conspiracy to publicly discredit and undermine Jesus's authority.
//
// Actual Event:
// Religious leaders coordinated a series of theological and political
// traps concerning authority, taxation, resurrection, and the Law.
// Jesus answered every question flawlessly, revealed their hypocrisy,
// and declared Himself to be the rejected Cornerstone promised in
// Scripture.
//
// Culprit:
// Caiaphas and the religious leadership of the Sanhedrin.
//
// Motive:
// To preserve their religious authority, political influence, and
// control over the people while preventing the crowds from accepting
// Jesus as the Messiah.
//
// Verdict:
// The conspiracy failed completely. Jesus's wisdom silenced every
// challenger, confirmed His divine authority, and fulfilled multiple
// Old Testament prophecies concerning the Messiah.
//
// ============================================================

export const act2CaseA = {
  id: "authority_challenged",
  icon: '../assets/gfx/book-open-duotone.svg',
  title: "The Silenced Teacher",
  subtitle: "Three religious leaders have attempted to trap Jesus in His words — but who holds the real authority?",
  location: "temple",
  eventLocation: "Temple Courts, Jerusalem",
  timeOfDay: "day",
  difficulty: 2,
  requires: "temple_cleansing",
  actLabel: "Act II - The Temple Courts",
  color: 0xf59e0b,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Authority Investigation", task: "Collect all evidence", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `On Tuesday morning, Nisan 12, Jesus returned to the Temple courts for His most intensive day of public teaching. The religious leadership — stung by the Temple cleansing the day before and alarmed by the growing crowds — mounted a coordinated series of challenges designed to discredit Him publicly. They sent Pharisees, Sadducees, Herodians, and scribes in waves. Each trap backfired. Each time, Jesus's answer not only escaped the trap but turned the tables, exposing the questioner's hypocrisy, ignorance, or bad faith. By afternoon, 'no one dared ask him any more questions' (Matthew 22:46).`,
    significance: `The authority question ('By what authority do you do these things?') was the most direct challenge. Jesus answered with a counter-question about John the Baptist's authority that left them publicly paralysed — they couldn't say divine, because they hadn't believed John; they couldn't say human, because the crowd would be furious. Their own trap snapped shut on them. Jesus then delivered three devastating parables against them (the Two Sons, the Wicked Tenants, the Wedding Banquet) followed by the Parable of the Cornerstone — quoting Psalm 118:22 directly at them.`,
    historicalNote: `The 'Temple courts' (Greek: hieron) referred to the vast outer courts of Herod's Temple complex — particularly the Court of the Gentiles. This was a public, noisy, commercially active space where teachers would gather disciples and debate. Jesus taught here daily during Passion Week. The size of the audience made public defeats deeply humiliating for the religious leaders.`,
  },

  prophecies: [
    {
      reference: "Psalm 118:22–23",
      id: "psalm_118_22_23",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"The stone the builders rejected has become the cornerstone; the LORD has done this, and it is marvellous in our eyes."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus quoting this Psalm directly against the religious leaders after the Parable of the Wicked Tenants",
      gospelLink: "Matthew 21:42–44; Mark 12:10–11",
      insight: "The 'builders' were Israel's religious leaders, entrusted with building God's community. The 'stone' was Jesus, whom they were rejecting. Jesus used their own Scripture to declare their judgement — He was the very stone they were trying to remove, and His rejection would become the cornerstone of something entirely new: the Church.",
      explanation: "Jesus quoted this coronation psalm directly at the religious leaders ('the builders'), identifying Himself as the cornerstone of God's new work, which they were in the process of rejecting.",
    },
    {
      reference: "Isaiah 5:1–7",
      id: "isaiah_5_1_7",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"My beloved had a vineyard on a very fertile hill... He looked for it to yield grapes, but it yielded wild grapes... The vineyard of the LORD Almighty is the nation of Israel."`,
      written: "~700 BC",
      fulfilledBy: "The Parable of the Wicked Tenants (Matthew 21:33–46), which deliberately echoed Isaiah's Song of the Vineyard",
      gospelLink: "Matthew 21:33–45; Mark 12:1–12",
      insight: "When Jesus began His parable 'There was a landowner who planted a vineyard, set a hedge around it, dug a winepress...' — He was quoting Isaiah 5 almost word-for-word. Every Pharisee in the crowd recognised it immediately. The tenants who killed the owner's son were unmistakably them. Matthew records: 'When the chief priests and the Pharisees heard his parables, they perceived that he was speaking about them' (Matthew 21:45).",
      explanation: "Jesus's Parable of the Wicked Tenants deliberately quoted Isaiah's 'Song of the Vineyard.' The religious leaders immediately recognized themselves as the unfaithful tenants.",
    },
    {
      reference: "Daniel 7:13–14",
      id: "daniel_7_13_14",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"There before me was one like a son of man, coming with the clouds of heaven... He was given authority, glory and sovereign power; all nations and peoples of every language worshipped him."`,
      written: "~550 BC",
      fulfilledBy: "Jesus's implicit claim to be the 'Son of Man' with divine authority — the title He used throughout the Gospels",
      gospelLink: "Mark 14:62 — Jesus explicitly quotes Daniel 7:13 at His trial before Caiaphas",
      insight: "The title 'Son of Man' was Jesus's preferred self-designation — it is used over 80 times in the Gospels. It came from Daniel 7:13 and carried unmistakable divine authority claims. The religious leaders understood exactly what He was claiming — which is why the high priest tore his robes at Jesus's trial when He quoted it (Mark 14:62–64).",
      explanation: "'Son of Man' was Jesus's preferred title for Himself. It was a direct claim to the divine authority described in Daniel's vision, a claim the High Priest understood as blasphemy.",
    },
    {
      reference: "Malachi 3:1",
      id: "malachi_3_1",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"I will send my messenger, who will prepare the way before me. Then suddenly the Lord you are seeking will come to his temple; the messenger of the covenant, whom you desire, will come."`,
      written: "~430 BC",
      fulfilledBy: "Jesus's presence and teaching authority in the Temple",
      gospelLink: "Matthew 11:10 (Jesus identifies John the Baptist as the 'messenger'); Mark 1:2",
      insight: "The authority challenge asked where Jesus's authority came from. Jesus's counter-question about John's authority was strategic — if John was God's messenger (Malachi 3:1), and John had publicly identified Jesus as the Coming One (John 1:29–34), then Jesus's authority derived from the very God who had sent His messenger ahead. The leaders were trapped.",
      explanation: "Jesus's authority is linked to John the Baptist, the prophesied messenger who would prepare the way for the Lord's arrival at His temple.",
    },
  ],

  intro: formatIntro(`It is Tuesday morning, Nisan 12. The Temple courts are packed with Passover pilgrims and local worshippers. Jesus is teaching when a delegation of chief priests, scribes, and elders arrives — formally and deliberately. Their challenge is direct: **'By what authority do you do these things? Who gave you this authority?'** Three religious leaders were the primary challengers that morning, each representing a different faction. But as you gather evidence from the scene, a question emerges: _who is really on trial here_ — Jesus, or them?`),

  suspects: [
    { id: "chief_priest", name: "Caiaphas", role: "High Priest, Sadducee", avatar: "caiaphas.svg", bibleRef: "Matthew 21:23; John 11:49–52" },
    { id: "scribe", name: "Samuel", role: "Temple Scribe, Pharisee", avatar: "senior_scribe.svg", bibleRef: "Mark 12:28–34 — a scribe who asks about the greatest commandment" },
    { id: "pharisee", name: "Nathanael", role: "Pharisee, Herodian ally", avatar: "simon_pharisee.svg", bibleRef: "Matthew 22:15–22 — the Pharisees and Herodians on the tax question" },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "nicodemus.svg", bibleRef: null },

  ],

  evidencePool: [

    {
      id: "question_scroll",
      name: "The Formal Authority Challenge",
      type: "analytical",
      relatedProphecy: "malachi_3_1",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Temple East Portico",
      pos: [10, 0, 10],
      snippet: "A formal scroll bearing three official priestly seals.",
      description: "A written record of the formal challenge: 'By what authority do you do these things? Who gave you this authority?' Signed with three priestly seals. This was an official delegated challenge, not a spontaneous question.",
      bibleRef: "Matthew 21:23 — 'When he entered the temple, the chief priests and the elders of the people came up to him as he was teaching.'",
      propheticLink: "Malachi 3:1 predicted the Lord coming to His temple with authority. The irony of the challenge is that they were asking for credentials from the very One whose authority derived directly from God.",
      bibleRefs: [
        { ref: "Matthew 21:23", link: "matthew_2123" },
        { ref: "Malachi 3:1", link: "malachi_31" }
      ],
      propheticRefs: [
        { ref: "Malachi 3:1", link: "malachi_31" }
      ],
      investigatorNote: "Three seals: the High Priest, the Chief Scribe, the Council Elder. This was planned, not spontaneous.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Pairs with the witness scroll to show the formal challenge was answered publicly and completely.",
        link: "Event — the official written challenge that opened the day's confrontations.",
        timeline: "CHRONOLOGY: Presented first, as Jesus began teaching in the Temple courts that morning.",
        contradict: "RELIABILITY: Three priestly seals confirm this was a planned, sanctioned delegation, not a spontaneous question."
      },
    }, {
      id: "parable_fragments",
      name: "Sketch of the Vineyard Parable",
      type: "physical",
      relatedProphecy: "isaiah_5_1_7",
      icon: "../assets/gfx/jar-duotone.svg",
      location: "Temple West Portico, Ground",
      pos: [-10, 0, 15],
      snippet: "Broken pottery fragments with rough agricultural sketches.",
      description: "Pieces of broken pottery with rough sketches scratched into them — a vineyard, a watchtower, figures being thrown out. A bystander was illustrating what they were hearing to someone who couldn't see. The Isaiah 5 imagery is unmistakable.",
      bibleRef: "Matthew 21:33–45 — the Parable of the Wicked Tenants",
      propheticLink: "Isaiah 5:1–7 is the Song of the Vineyard — God's lament over Israel's unfaithfulness. Jesus deliberately echoed it. The bystander sketching this recognised the connection immediately.",
      bibleRefs: [
        { ref: "Matthew 21:33-45", link: "matthew_213345" },
        { ref: "Isaiah 5:1-7", link: "isaiah_517" }
      ],
      propheticRefs: [
        { ref: "Isaiah 5:1-7", link: "isaiah_517" }
      ],
      investigatorNote: "These fragments show a bystander who understood the parable's OT reference. The religious leaders would have recognised it instantly — and been publicly shamed.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 2,
      clues: {
        compare: "Connects to the cornerstone carving as the second of Jesus's three parables against the leadership that morning.",
        link: "Prophecy — a bystander's sketch showing they recognised Jesus was echoing Isaiah's Song of the Vineyard.",
        timeline: "CHRONOLOGY: Sketched during the Parable of the Wicked Tenants, after the authority question had already failed.",
        contradict: "RELIABILITY: Matthew records the chief priests and Pharisees themselves realised the parable was about them."
      },
    }, {
      id: "cornerstone_carving",
      name: "Rejected Cornerstone Fragment",
      type: "physical",
      relatedProphecy: "psalm_118_22_23",
      icon: "../assets/gfx/rock-duotone.svg",
      location: "Temple South Wall, Construction Debris",
      pos: [5, 0, -20],
      snippet: "A discarded limestone fragment with a single Hebrew word.",
      description: "A piece of rejected limestone — the kind cut, shaped, and discarded during the Temple's renovation. Workers have been leaving such stones for years. But on this piece, someone has carved the Hebrew word 'pinnah' — 'cornerstone.' It is from Psalm 118:22.",
      bibleRef: "Matthew 21:42 — 'Jesus said to them, Have you never read in the Scriptures: The stone the builders rejected has become the cornerstone?'",
      propheticLink: "Psalm 118:22–23 was a coronation Psalm, used at Temple dedications. Jesus quoted it at the very Temple whose builders were rejecting Him. The rejected stone lying in the construction debris became a powerful object lesson for anyone listening.",
      bibleRefs: [
        { ref: "Matthew 21:42", link: "matthew_2142" },
        { ref: "Psalm 118:22-23", link: "psalm_1182223" }
      ],
      propheticRefs: [
        { ref: "Psalm 118:22-23", link: "psalm_1182223" }
      ],
      investigatorNote: "Someone scratched 'pinnah' onto a discarded stone and left it here. A disciple? A bystander who understood? Or was it already there — providentially?",
      fake: false,
      category: 'prophecy',
      timelineOrder: 3,
      clues: {
        compare: "Follows the parable fragments — the cornerstone quotation was Jesus's punchline to the Wicked Tenants parable.",
        link: "Prophecy — a discarded Temple stone carved with the Hebrew word for 'cornerstone,' quoting Psalm 118.",
        timeline: "CHRONOLOGY: Carved immediately after Jesus quoted Psalm 118:22 at the religious leaders.",
        contradict: "RELIABILITY: The word 'pinnah' is unambiguous Hebrew, not a coincidental scratch on discarded masonry."
      },
    }, {
      id: "coin_of_caesar",
      name: "Denarius of Tiberius Caesar",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/coins-duotone.svg",
      location: "Temple Court Floor, Near Treasury Entrance",
      pos: [-5, 0, -10],
      snippet: "A Roman silver coin bearing the face of the Emperor.",
      description: "A silver denarius coin bearing the image of Tiberius Caesar and the inscription 'TIBERIUS CAESAR, SON OF THE DIVINE AUGUSTUS.' A Pharisee dropped it — or left it deliberately — near the treasury entrance.",
      bibleRef: "Matthew 22:19–21 — 'Show me the coin used for paying the tax... Whose image is this? And whose inscription? Caesar's, he replied. Then he said to them, Give back to Caesar what is Caesar's, and to God what is God's.'",
      propheticLink: "The coin bore Caesar's image (imago). Jesus's answer pointed to something deeper: humanity bears God's image (Genesis 1:26–27, imago Dei). The coin question about taxation became a profound statement about identity and allegiance — Caesar's image on metal; God's image on people.",
      bibleRefs: [
        { ref: "Matthew 22:19-21", link: "matthew_221921" },
        { ref: "Genesis 1:26-27", link: "genesis_12627" }
      ],
      propheticRefs: [
        { ref: "Genesis 1:26-27", link: "genesis_12627" }
      ],
      investigatorNote: "The Pharisees and Herodians brought this coin specifically to trap Him. They never expected His answer to turn the image question back onto every human being.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "Distinct from the cornerstone incident — a separate trap, laid by a different faction (Pharisees and Herodians).",
        link: "Event — the denarius produced specifically to trap Jesus on the tax question.",
        timeline: "CHRONOLOGY: Brought forward after the parables, as the Pharisees regrouped with a new line of attack.",
        contradict: "RELIABILITY: Caesar's image on the coin is undisputed physical fact, which is exactly what made Jesus's answer inescapable."
      },
    }, {
      id: "fig_leaf_withered",
      name: "Withered Fig Leaf",
      type: "environmental",
      relatedProphecy: "",
      icon: "../assets/gfx/leaves-duotone.svg",
      location: "Jerusalem-Bethany Road, Near the Temple Gate",
      pos: [20, 0, 0],
      snippet: "A brittle, blackened leaf that appears to have died instantly.",
      description: "A withered, blackened fig leaf — from the tree Jesus cursed the previous morning. Peter had pointed it out earlier: 'Rabbi, look! The fig tree you cursed has withered.' The leaf has been kept as a testimony to what was seen.",
      bibleRef: "Mark 11:20–21 — 'In the morning, as they went along, they saw the fig tree withered from the roots.'",
      propheticLink: "Micah 7:1 and Jeremiah 8:13 both use a barren fig tree as a symbol for Israel's spiritual fruitlessness. Hosea 9:10 says 'Like grapes in the wilderness, I found Israel.' The withered tree was a living parable — the judgement Jesus described in His Temple parables had already begun in miniature on the roadside.",
      bibleRefs: [
        { ref: "Mark 11:20-21", link: "mark_112021" }
      ],
      propheticRefs: [
        { ref: "Micah 7:1", link: "micah_71" },
        { ref: "Jeremiah 8:13", link: "jeremiah_813" },
        { ref: "Hosea 9:10", link: "hosea_910" }
      ],
      investigatorNote: "The withered fig tree and the Temple parables interpret each other. Both speak of outward religious appearance with no real fruit.",
      fake: false,
      category: 'event',
      timelineOrder: 5,
      clues: {
        compare: "Links back to Monday's cursing of the fig tree — Peter's own testimony ties this leaf to that event.",
        link: "Event — physical remnant of the fig tree Jesus cursed the previous morning, kept as a testimony.",
        timeline: "CHRONOLOGY: Discovered withered this same morning, before the authority challenge began.",
        contradict: "RELIABILITY: Peter's own exclamation ('Rabbi, look!') is recorded as an eyewitness reaction, not hearsay."
      },
    }, {
      id: "widow_two_coins",
      name: "Two Leptons (Widow's Mites)",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/currency-dollar-duotone.svg",
      location: "Temple Treasury Contribution Chests",
      pos: [0, 0, 12],
      snippet: "Two tiny bronze coins, the smallest possible currency.",
      description: "Two tiny bronze lepton coins — the smallest denomination in circulation, worth a fraction of a penny. They were deposited in the Treasury by a widow, observed by Jesus and several disciples. The treasurer has logged them alongside substantial gifts from wealthy donors.",
      bibleRef: "Mark 12:41–44 — 'Calling his disciples to him, Jesus said, Truly I tell you, this poor widow has put more into the treasury than all the others.'",
      propheticLink: "1 Samuel 16:7 — 'Man looks at the outward appearance, but the LORD looks at the heart.' The widow's offering is the practical demonstration of everything Jesus had been teaching against the religious leaders' showy piety. She gave all she had (100%); the wealthy gave from their surplus.",
      bibleRefs: [
        { ref: "Mark 12:41-44", link: "mark_124144" }
      ],
      propheticRefs: [
        { ref: "Samuel 16:7", link: "samuel_167" }
      ],
      investigatorNote: "The widow's two coins appear after the Seven Woes against the Pharisees (Matthew 23). Jesus used her as a living counter-example: this is what genuine faith looks like, next to the performance the religious leaders were offering.",
      fake: false,
      category: 'event',
      timelineOrder: 7,
      clues: {
        compare: "Stands in direct contrast to the coin of Caesar — one coin was a trap, these two were an offering.",
        link: "Event — the treasury's own ledger, logging the widow's gift beside far larger, showier donations.",
        timeline: "CHRONOLOGY: Observed late in the day, after the public teaching had wound down.",
        contradict: "RELIABILITY: The treasurer's log is a routine administrative record, not a claim open to exaggeration."
      },
    }, {
      id: "witness_scroll",
      name: "Temple Bystander's Written Account",
      type: "testimonial",
      relatedProphecy: "",
      icon: "../assets/gfx/clipboard-duotone.svg",
      location: "Temple North Portico",
      pos: [-15, 0, -5],
      snippet: "A detailed testimonial from a visitor from Alexandria.",
      description: "A written eyewitness account from a devout Jew who was present: 'He answered every question. The Pharisees about taxes. The Sadducees about resurrection. The scribes about the Law. At the end, He asked them whose son is the Christ — and not one of them could answer. Then no man dared question him again.' Signed: 'A God-fearer from Alexandria.'",
      bibleRef: "Matthew 22:46 — 'No one could say a word in reply, and from that day on no one dared to ask him any more questions.'",
      propheticLink: "Isaiah 11:2 promised the Messiah would have the 'Spirit of wisdom and understanding, the Spirit of counsel and might' — He would answer every challenge with perfect insight. The progressive silencing of each religious faction across one morning is the fulfilment of this promise made 700 years earlier. Daniel 7:13–14 foretold 'one like a son of man' coming with the clouds of heaven to receive an everlasting dominion — the title 'Son of Man' Jesus used for Himself throughout these exchanges.",
      bibleRefs: [
        { ref: "Matthew 22:46", link: "matthew_2246" }
      ],
      propheticRefs: [
        { ref: "Isaiah 11:2", link: "isaiah_112" },
        { ref: "Daniel 7:13-14", link: "daniel_71314" }
      ],
      investigatorNote: "The witness is from Alexandria — an educated diaspora Jew well-versed in both Scripture and rhetoric. His assessment is clear: Jesus did not evade their questions. He answered them and won.",
      fake: false,
      category: 'people',
      timelineOrder: 6,
      clues: {
        compare: "Summarises the entire day's exchanges — ties together the authority question, the tax trap, and the resurrection question.",
        link: "People — a signed eyewitness account from a visiting God-fearer who watched the whole day unfold.",
        timeline: "CHRONOLOGY: Written at the close of the day's teaching, once no one dared ask another question.",
        contradict: "RELIABILITY: An outside observer with no stake in either faction, describing events that match the Gospel record exactly."
      },
    },],

  lab: [
    {
      evidence: "parable_fragments",
      suspect: "scribe",
      result: "**Identified as Witness** (His record implicates the priests)",
      notes: "The tenants who kill the son (Mark 12:1-9) — even Samuel's own notes read as an indictment of the men he serves."
    },
    {
      evidence: "question_scroll",
      suspect: "chief_priest",
      result: "**Implicated by Parable** (The teaching was aimed at him)",
      notes: "'They knew he had spoken the parable against them' (Mark 12:12). Caiaphas heard the accusation and couldn't answer it."
    }
  ],

  npcs: [
    {
      id: "chief_priest",
      name: "Caiaphas",
      role: "High Priest, Sadducee",
      avatar: "caiaphas.svg",
      pos: [15, 0, 5],
      unlocksSuspects: ["chief_priest"],
      hasDialogue: true,
      storyFile: "chief_priest",
      profileFile: "caiaphas",
      truthfulness: 0.55,
      bibleRef: "Matthew 21:23; John 11:49–52; Matthew 26:57–68",
      background: "Joseph ben Caiaphas has been High Priest since AD 18 — appointed by the Roman prefect, dependent on Roman goodwill to remain in office. He is theologically Sadducean (denies resurrection, angels, and spirits — Acts 23:8) and politically calculating. He famously said it was 'better for one man to die for the people than for the whole nation to perish' (John 11:50) — not realising he was prophesying.",
      dialogue: {
        neutral: "The Temple is the domain of the priesthood. Any teacher claiming this level of authority has an obligation to present credentials.",
        cautious: "The Temple is the domain of the priesthood, established by Mosaic Law. Anyone teaching here is subject to our oversight.",
        pressured: "He answered our question with a question — typical rabbinic evasion. We could hardly say John's authority was from God or from men without a public spectacle.",
        exposed: "He trapped us. I'll admit it. If we said John was divine, He'd ask why we didn't believe him. If we said John was merely human, the crowd would stone us. We were paralysed.",
        repeat: "I have a council session to attend. This interview is concluded.",
      },
      reactions: {
        question_scroll: { text: "That is an official Temple challenge. Signed by three representatives of the Sanhedrin. This was procedure, not persecution.", isLie: false },
        parable_fragments: { text: "Those parables were deeply offensive. He compared us to tenants who murder the landowner's son. The crowd understood exactly what He meant.", isLie: false, revealedClue: "cornerstone_carving" },
        cornerstone_carving: { text: "He quoted Psalm 118:22 at us. In the Temple. He was calling us 'the builders who rejected the stone.' I found that stone fragment myself — I've kept it as a reminder.", isLie: true },
        widow_two_coins: { text: "The Temple treasury receives all offerings, large and small. I fail to see what a widow's coins have to do with our authority challenge.", isLie: false },
      },
      contradictions: {
        "question_scroll+witness_scroll": { exposed: "The witness from Alexandria is correct. No one could answer His final question. He asked us who the Christ is — is He David's son or David's Lord? Psalm 110:1 says David called him 'my Lord.' How can He be both son and Lord? We had no answer. We still don't." },
      },
    },
    {
      id: "scribe",
      name: "Samuel",
      role: "Temple Scribe, Pharisee",
      avatar: "senior_scribe.svg",
      pos: [-15, 0, 10],
      unlocksSuspects: ["scribe"],
      hasDialogue: true,
      storyFile: "scribe_intro",
      profileFile: "samuel_scribe",
      revealsProphecy: "isaiah_5_1_7",
      truthfulness: 0.85,
      bibleRef: "Mark 12:28–34",
      background: "A Temple scribe trained in meticulous recording of legal proceedings and scriptural interpretation. Pharisaic background — unlike the Sadducean priests, he believes in resurrection and angels. He actually asked Jesus about the greatest commandment and received an answer that genuinely moved him.",
      dialogue: {
        neutral: "I was tasked with recording the morning's proceedings. I was also, I confess, listening with more than professional interest.",
        cautious: "The authority challenge was politically motivated. I'm a scribe — I deal in words, not politics. What He said about the commandments was... remarkable.",
        pressured: "When I asked about the greatest commandment, I was testing Him — as the others were. But His answer stopped me. 'Love God with all your heart, soul, mind, and strength, and your neighbour as yourself.' He said: 'All the Law and the Prophets hang on these two commandments.'",
        exposed: "I told Him he answered wisely. He said to me: 'You are not far from the kingdom of God.' I've thought about nothing else since.",
        repeat: "I believe I've shared all that is relevant to your inquiry.",
      },
      reactions: {
        coin_of_caesar: { text: "That was the Herodians' question — about paying taxes to Caesar. His answer was remarkable: 'Give to Caesar what is Caesar's, and to God what is God's.' He split the trap perfectly.", isLie: false },
        witness_scroll: { text: "The Alexandrian's account is accurate. I was there for all of it. By the end, the crowd was silent and the leaders were defeated. Verse by verse, question by question.", isLie: false, revealedClue: "fig_leaf_withered" },
        parable_fragments: { text: "The vineyard parable was Isaiah 5 rewritten for the present day. Anyone schooled in Scripture recognised the source. The leaders certainly did — Matthew records they wanted to arrest Him immediately.", isLie: false },
        cornerstone_carving: { text: "Psalm 118:22. 'The stone the builders rejected.' He quoted it while standing in the Temple the builders were maintaining. The irony was devastating.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "pharisee",
      name: "Nathanael",
      role: "Pharisee, Herodian ally",
      avatar: "simon_pharisee.svg",
      pos: [0, 0, -15],
      unlocksSuspects: ["pharisee"],
      hasDialogue: true,
      storyFile: "simon_pharisee_authority",
      profileFile: "nathanael_pharisee",
      truthfulness: 0.4,
      bibleRef: "Matthew 22:15–22 — the Pharisee-Herodian coalition",
      background: "A Pharisee who has formed an unlikely alliance with the Herodians — normally political rivals — specifically to trap Jesus on the tax question. The Pharisees hated Roman taxation on nationalist grounds; the Herodians supported it. Normally they would never cooperate. The threat Jesus posed united them.",
      dialogue: {
        neutral: "We asked a straightforward legal question about taxation. Any teacher should be able to answer a question about Roman law.",
        cautious: "My political affiliations are my own business. I came here as a representative of the Pharisaic council.",
        pressured: "If He said don't pay taxes, we had Him on sedition against Rome. If He said pay taxes, He'd alienate the nationalists in the crowd. It was the perfect trap.",
        exposed: "He asked to see a coin. We showed him the denarius. He looked at Caesar's face and said 'Render to Caesar what is Caesar's, and to God what is God's.' And that was it. The crowd fell silent. We had nothing to say.",
        repeat: "I have already discussed this with the Sanhedrin. I won't repeat myself.",
      },
      reactions: {
        coin_of_caesar: { text: "We brought that coin deliberately. You can't pay the Temple tax with a denarius — it has a graven image on it. We thought bringing it would humiliate him.", isLie: false },
        widow_two_coins: { text: "The widow's offering has nothing to do with the taxation question. He used it to embarrass us — look, a poor widow gives everything while you Pharisees give from your wealth. Typical.", isLie: true },
        fig_leaf_withered: { text: "The cursed fig tree — yes, I heard about it. Another staged prophetic act. Nothing but theatrics.", isLie: false },
        question_scroll: { text: "I did not sign that scroll. My challenge was separate — about taxes. Not about Temple authority.", isLie: false },
      },
      contradictions: {
        "coin_of_caesar+widow_two_coins": { exposed: "You want to know what broke the coalition? His answer about the coin. We expected a political answer. Instead He talked about image — Caesar's image on the coin, God's image on people. The Herodians thought He'd sided with Rome. I thought He'd sidestepped completely. Neither of us could attack the answer. We just... walked away." },
      },
    },
    {
      id: "rich_young_ruler",
      name: "Thomas the Rich Young Ruler",
      role: "Wealthy Seeker",
      faction: "local",
      avatar: "temple_merchant.svg",
      profileFile: "rich_young_ruler",
      truthfulness: 0.7,
      bibleRef: "Matthew 19:16-22; Mark 10:17-22; Luke 18:18-23",
      hasDialogue: true,
      storyFile: "rich_young_ruler",
      background: "A young man of great wealth who ran up to Jesus and asked what he must do to inherit eternal life. He left grieving, unable to give up his riches.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
  ],

  deductions: {
    "question_scroll+witness_scroll": {
      compare: {
        text: "The formal authority challenge and the eyewitness account together confirm the scope of what happened: three separate factions (priests, Pharisees-Herodians, Sadducees) attempted coordinated challenges across one morning — and all were silenced.",
        insight: "Isaiah 11:2 promised the Messiah would have wisdom to answer all challenges. The witness account documents this happening: 'no one dared ask him any more questions.' The fulfilment was public, documented, and witnessed by a diverse crowd.",
        isKey: true,
        bibleRef: "Matthew 22:46; Isaiah 11:2",
      },
      link: {
        text: "The official challenge and the independent witness point to the same outcome from two different angles — one records what was asked, the other what happened when it was answered.",
        insight: "A formal Temple challenge and a bystander's account rarely agree this closely unless both are describing the same real event, not two separate rumors.",
        isKey: false,
        bibleRef: "Matthew 22:46",
      },
    },
    "parable_fragments+cornerstone_carving": {
      link: {
        text: "The vineyard parable fragments (echoing Isaiah 5) and the cornerstone carving (Psalm 118:22) both relate to Jesus's teaching against the religious leaders — drawn from the same block of Scripture.",
        insight: "Jesus was doing deliberate intertextual theology: Isaiah 5's rejected vineyard + Psalm 118's rejected stone = the same prophetic story told two ways. The religious leaders were the unfaithful tenants and the builders who rejected the cornerstone simultaneously.",
        isKey: true,
        revealsProphecy: "psalm_118_22_23",
        bibleRef: "Matthew 21:33–42; Isaiah 5:1–7; Psalm 118:22",
      },
      compare: {
        text: "Set against each other, the two images make the same accusation twice — once as a story about tenants, once as a single line about a stone.",
        insight: "A parable can be argued with; a direct quotation of Psalm 118:22 to a Scripture-literate audience cannot. Jesus escalated from implication to citation.",
        isKey: false,
        bibleRef: "Matthew 21:42; Psalm 118:22",
      },
    },
    "coin_of_caesar+widow_two_coins": {
      compare: {
        text: "The denarius (brought to trap Him) and the widow's two leptons (observed and highlighted by Him) form a deliberate contrast on the theme of worth, image, and allegiance.",
        insight: "The denarius bore Caesar's image — Jesus pointed to the deeper truth that people bear God's image (Genesis 1:26). The widow's two coins had no image of anyone — just her complete surrender. The two coin stories bracket the day's teaching on what genuine devotion looks like.",
        isKey: true,
        bibleRef: "Matthew 22:20–21; Mark 12:44; Genesis 1:26",
      },
    },
    "fig_leaf_withered+parable_fragments": {
      link: {
        text: "The withered fig tree (seen Tuesday morning) and the vineyard parable (taught Tuesday morning in the Temple) are two expressions of the same prophetic message.",
        insight: "Both use agricultural imagery to describe Israel's religious failure: a tree with leaves but no fruit (the fig tree); a vineyard that produces nothing for the owner (Isaiah 5's vineyard). Jesus was teaching the same lesson in action on the road and in words in the Temple.",
        isKey: false,
        bibleRef: "Mark 11:20–21; Matthew 21:33–45; Isaiah 5:1–7; Micah 7:1",
      },
    },
  },

  truth: {
    culprit: "caiaphas",
    motive: "The religious leaders sought to discredit Jesus publicly to protect their institutional authority and prevent the crowds from following Him as the true King of Israel.",
    method: "A coordinated series of intellectual traps using representatives from different factions (Pharisees, Sadducees, Herodians) to catch Jesus in a blasphemous or seditious statement.",
    lesson: "Human attempts to trap divine wisdom only serve to reveal human hypocrisy. Jesus's authority as the cornerstone is established even through the rejection of the builders.",
    prophesyFulfilled: ["Psalm 118:22–23", "Isaiah 5:1–7", "Daniel 7:13–14"],
    furtherReading: ["Matthew 21:23–22:46", "Mark 11:27–12:44"],
  },
};

// ============================================================
// ACT: II — Growing Opposition
// CASE: The Price of Life
// CASE ID: lazarus_plot
// CASE EXPORT: act2CaseB
// SOURCE: John 11:45–57; John 12:9–11
//
// LOCATION:
// Bethany & Temple Courts, Jerusalem
//
// DIFFICULTY:
// ★★☆☆☆ (2/5)
//
// BACKGROUND:
// After Jesus raised Lazarus from the dead following four days in the
// tomb, news spread rapidly throughout Jerusalem during Passover.
// Instead of celebrating the miracle, the chief priests and Pharisees
// feared that the growing crowds would strengthen belief in Jesus and
// provoke Roman intervention. The Sanhedrin secretly agreed that both
// Jesus and Lazarus had become threats to their authority, leading to
// an unprecedented conspiracy to eliminate not only the miracle worker,
// but also the living evidence of the miracle itself.
//
// BIBLE REFERENCES:
// John 11:45–57
// John 12:9–11
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
// • Isaiah 25:8 — God would swallow up death forever, previewed by the
//   raising of Lazarus from the grave.
//
// • Psalm 16:10 — God's Holy One would not ultimately remain under the
//   power of death, foreshadowed through Jesus's authority over the tomb.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
// Summary:
// The resurrection of Lazarus became the turning point that convinced
// the religious leaders they must act against Jesus. Rather than denying
// the miracle, they sought to silence its evidence by plotting the deaths
// of both Jesus and Lazarus.
//
// Historical Context:
// Bethany lay less than two miles from Jerusalem, making Lazarus easily
// accessible to the thousands of Passover pilgrims entering the city.
// His public resurrection generated enormous attention, creating intense
// political anxiety among the Temple leadership, who feared Roman
// retaliation if the crowds proclaimed Jesus as Messiah.
//
// Spiritual Theme:
// Victory over death, unbelief despite overwhelming evidence, fear versus
// faith, corruption of power, and God's sovereign plan unfolding through
// human opposition.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
// Crime:
// Secret conspiracy to murder an innocent witness and suppress evidence
// of a divine miracle.
//
// Actual Event:
// Following Lazarus's resurrection, the Sanhedrin secretly resolved to
// eliminate both Jesus and Lazarus. Their objective was to destroy the
// living testimony that was leading many people to believe in Christ.
//
// Culprit:
// Caiaphas and the chief priests of the Sanhedrin.
//
// Motive:
// To preserve political stability, protect their religious authority,
// and prevent the growing influence of Jesus from provoking Roman
// intervention and weakening their control.
//
// Verdict:
// The conspiracy confirmed the hardness of the religious leaders' hearts.
// Rather than accepting God's power over death, they chose to oppose it,
// setting in motion the events leading to Jesus's crucifixion while
// unknowingly advancing God's plan of salvation.
//
// ============================================================

export const act2CaseB = {
  id: "lazarus_plot",
  icon: '../assets/gfx/coins-duotone.svg',
  title: "The Price of Life",
  subtitle: "Rumors fly through the Temple that the high priests have issued an unlisted execution order for a man who committed no crime.",
  location: "bethany",
  eventLocation: "Bethany & Temple Courts, Jerusalem",
  timeOfDay: "day",
  difficulty: 2,
  requires: "authority_challenged",
  actLabel: "Act II - The Temple Courts",
  color: 0xf59e0b,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Track Sanhedrin Orders", task: "Intercept shadow documents", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Following the resurrection of Lazarus after four days in the tomb, a massive theological shift occurred in Jerusalem. Instead of celebrating, the chief priests and Pharisees called a council meeting, fearing Roman intervention. John 12:10 explicitly records that the chief priests made plans to put Lazarus to death as well, because on account of him, many Jews were putting their faith in Jesus.`,
    significance: `This case exposes the moral bankruptcy of the corrupt religious leadership. To protect their political positions, they were willing to murder a living monument to God's resurrection power.`,
    historicalNote: `The raising of Lazarus took place in Bethany, less than two miles from Jerusalem. Because it happened right before Passover, the city was filled with thousands of eyewitnesses and curious pilgrims trying to catch a glimpse of the resurrected man.`,
  },

  prophecies: [
    {
      reference: "Isaiah 25:8",
      id: "isaiah_25_8",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"He will swallow up death forever; and the Lord GOD will wipe away tears from all faces, and the reproach of his people he will take away from all the earth."`,
      written: "~700 BC",
      fulfilledBy: "Jesus demonstrating complete authority over the grave at Bethany",
      gospelLink: "John 11:25",
      insight: "Lazarus’s revival was a tactical, localized preview of the ultimate cosmic victory over death that was about to occur on Easter morning.",
      explanation: "The resurrection of Lazarus served as a powerful, localized preview of the ultimate cosmic victory over death that this prophecy describes.",
    },
  ],

  evidencePool: [

    {
      id: "crowd_report",
      name: "Bethany Pilgrim Manifest",
      type: "analytical",
      relatedProphecy: "",
      icon: "../assets/gfx/scroll-duotone.svg",
      pos: [2, -6, 0],
      snippet: "A watchman's tally book monitoring the eastern gate traffic.",
      description: "A log recording unprecedented human crowds leaving the city gates toward Bethany after dusk, specifically asking for the house of Simon the Leper.",
      bibleRef: "John 12:9 notes that a large crowd found out Jesus was there and came not only because of Him, but also to see Lazarus, whom He had raised.",
      bibleRefs: [
        { ref: "John 12:9", link: "john_129" }
      ],
      propheticRefs: [],
      investigatorNote: "The exponential growth of these crowd tallies explains the absolute state of panic inside the Sanhedrin chambers.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Explains why the Sanhedrin reacted so fast — this is the surveillance record that triggered their panic.",
        link: "Event — a watchman's gate log tracking unprecedented crowds heading to Bethany.",
        timeline: "CHRONOLOGY: Logged over several evenings as word of Lazarus spread, before the secret decree was drafted.",
        contradict: "RELIABILITY: A routine gate tally, kept for administrative reasons, not written to make a case either way."
      },
    }, {
      id: "grave_dirt",
      name: "Bethany Limestone Dust",
      relatedProphecy: "isaiah_25_8",
      type: "physical",
      icon: "../assets/gfx/rock-duotone.svg",
      pos: [-3, 3, 0],
      snippet: "Trace white dust contaminated with heavy burial aloes.",
      description: "Powdery white limestone scrapings mixed with residual traces of heavy myrrh and aloe resins, found dropped outside the high priest's council room.",
      bibleRef: "John 11:39 records Martha's objection that after four days there would already be a bad odor — the natural expectation of decay this deep into a Judean burial, against which the raising of Lazarus stands out as a reversal.",
      bibleRefs: [
        { ref: "John 11:39", link: "john_1139" }
      ],
      propheticRefs: [],
      investigatorNote: "This dust indicates that witnesses from the actual tomb site in Bethany have been brought into the inner chambers of the Sanhedrin for intense interrogation.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Physically ties a Bethany eyewitness to the inside of the Sanhedrin's own council chamber.",
        link: "Event — limestone and burial-spice residue tracked in from Lazarus's actual tomb.",
        timeline: "CHRONOLOGY: Left behind during an interrogation, after the crowd reports had already alarmed the council.",
        contradict: "RELIABILITY: The specific mix of limestone and burial aloes matches a real tomb, not a fabricated story."
      },
    }, {
      id: "secret_decree",
      name: "Intercepted Sadducean Memorandum",
      type: "analytical",
      relatedProphecy: "",
      icon: "../assets/gfx/envelope-duotone.svg",
      pos: [0, 0, 0],
      snippet: "A sealed tablet bearing the administrative mark of the House of Annas.",
      description: "A secure internal brief detailing political damage control. It outlines plans to quietly eliminate a 'destabilizing living asset' currently residing in Bethany.",
      bibleRef: "John 12:10–11 explicitly validates this conspiracy: 'So the chief priests made plans to put Lazarus to death as well.'",
      bibleRefs: [
        { ref: "John 12:10-11", link: "john_121011" }
      ],
      propheticRefs: [],
      investigatorNote: "Murdering a resurrected man is a fascinating logical absurdity. It reveals that the leadership doesn't doubt the miracle occurred—they simply care more about their institutional control than God's reality.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "The council's response to the two pieces of evidence above — panic escalating into a concrete plan.",
        link: "Event — a sealed internal memo from the House of Annas outlining a plan to eliminate Lazarus.",
        timeline: "CHRONOLOGY: Drafted last, once the crowd numbers and eyewitness questioning made the threat undeniable.",
        contradict: "RELIABILITY: John 12:10–11 independently confirms the plot in the Gospel text itself."
      },
    },],

  lab: [
    {
      evidence: "secret_decree",
      suspect: "caiaphas",
      result: "**Implicated in Conspiracy** (Directly links him to the plot)",
      notes: "'Better that one man die for the people' (John 11:50) — Caiaphas meant it as policy. He didn't know it was prophecy."
    },
    {
      evidence: "secret_decree", // Note: same evidence can affect multiple suspects
      suspect: "nicodemus_secret",
      result: "**Cleared** (Shows he was a dissenting voice)",
      notes: "The same council that condemned Jesus once heard Nicodemus ask, 'Does our law condemn a man without a hearing?' (John 7:51). He hadn't changed."
    }
  ],

  suspects: [
    {
      id: "nicodemus_secret",
      name: "Nicodemus",
      role: "Conflicted Sanhedrin Member",
      avatar: "nicodemus.svg",
      color: 0x88cc88,
      pos: [15, 0, 5],
      bibleRef: "John 7:50–51, John 19:39",
      background: "A ruler of the Jews who originally approached Jesus by night, now watching the legal framework collapse from within.",
      dialogue: {
        neutral: "Our council is supposed to be a vanguard of justice and Mosaic law. Yet, fear makes men blind to the light.",
        cautious: "The decree is real. Caiaphas argued that it is better for one man to die for the nation. But they aren't stopping at one man anymore. They are trying to cover up the resurrection itself.",
      },
      contradictions: {
        "crowd_report+secret_decree": {
          exposed: "The more the people see Lazarus, the more our authority crumbles. The decree was rushed through without a full legal trial. I spoke against it, but they are driven by sheer preservation of power. Take that document and warn the family."
        },
      },
    },
    { id: "caiaphas", name: "Caiaphas", role: "High Priest, Sadducee", avatar: "caiaphas.svg", color: 0xcc8888, pos: [-15, 0, 5], bibleRef: "John 11:49–52; Matthew 26:57–68" },

  ],

  npcs: [
    {
      id: "temple_spy",
      name: "Maluch",
      role: "Temple Informant / Spy",
      avatar: "maluch.svg",
      profileFile: "maluch",
      truthfulness: 0.60,
      bibleRef: "John 18:10; Luke 22:52",
      pos: [10, 0, -10],
      hasDialogue: true,
      storyFile: "temple_spy",
      unlocksSuspects: ["caiaphas"],
      unlocksEvidence: ["crowd_report"],
      background: "An administrative operative and courier under the payroll of the high priest's household, tasked with logging suspicious crowd densities, tracking routes, and profiling revolutionary movement between Jerusalem and Bethany.",
      dialogue: {
        neutral: "I look at movements, routes, and numbers. My job is to ensure the Passover crowds do not aggregate into an uncontrollable nationalist front.",
        cautious: "Bethany has become a major intelligence blindspot. The road is constantly jammed with pilgrims who are bypassing our official checkpoints.",
        pressured: "The elders wanted specific confirmation from the tomb itself. They didn't want hearsay; they wanted structural verification before taking action.",
        exposed: "Fine. I tracked the family. The crowds aren't visiting a gravesite; they are eating dinner with a man who was rotting last week. It's an operational nightmare.",
        repeat: "The streets are crowded. Keep moving if you don't have business with the guard.",
      },
      reactions: {
        crowd_report: { text: "That is my gate tally. Look at the dusk trajectory toward the eastern gate. That isn't standard holiday traffic; those people are marching to a single house.", isLie: false },
        grave_dirt: { text: "I may have tracked some residue into the courthouse corridors after my sweep of the cave. The smell of burial spice doesn't wash off easily.", isLie: false },
        secret_decree: { text: "I don't sign political policies. I just gather the logistical data that makes those policies necessary.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "annas_patriarch",
      name: "Annas",
      role: "High Priest Emeritus",
      avatar: "annas.svg",
      profileFile: "annas",
      truthfulness: 0.35,
      bibleRef: "John 18:13; Luke 3:2; Acts 4:6",
      pos: [-10, 0, -10],
      hasDialogue: true,
      storyFile: "annas_patriarch",
      unlocksEvidence: ["secret_decree"],
      background: "The elderly patriarch of the ruling Sadducean family. Though Rome formally deposed him years ago, he remains the true systemic power behind the high priesthood, controlling his sons and son-in-law Caiaphas. He values political continuity and institutional risk management above all else.",
      dialogue: {
        neutral: "True governance is quiet, indirect, and economical. Populist enthusiasm fades, but the temple infrastructure must endure.",
        cautious: "When a crowd begins to look past the priesthood to find a king, it is no longer a religious debate. It is a crisis of regional stability.",
        pressured: "Caiaphas looks at the immediate problem. I look at the long-term mechanics of Roman occupation. If the governor senses an unpoliced movement, his legions will destroy our nation.",
        exposed: "You think a dynamic miracle justifies civic chaos? If a man is raised from the dead but his existence sparks a war that levels Jerusalem, his life is an unacceptable expense. The security of the temple requires the eradication of the asset.",
        repeat: "Our conversation has reached its logical conclusion. Guard, show this investigator out.",
      },
      reactions: {
        secret_decree: { text: "A routine security memorandum from my house. It outlines proactive containment protocols for a severe socio-political disruption.", isLie: false },
        grave_dirt: { text: "Judean soil. The temple floor is swept daily; your forensic parameters are irrelevant to council business.", isLie: true },
        crowd_report: { text: "Pilgrim metrics fluctuate every Passover. These counts are highly exaggerated by nationalist sympathizers.", isLie: true },
      },
      contradictions: {
        "grave_dirt+secret_decree": { exposed: "The legal trial is a tool for ordinary criminals. In matters of national survival, we do not wait for a court to verify what our own spies have confirmed by the smell of burial cloth. The threat will be neutralized quietly." },
      },
    },
    {
      id: "martha_bethany",
      name: "Martha",
      role: "Sister of Lazarus",
      avatar: "market_vendor.svg",
      profileFile: "martha",
      truthfulness: 0.95,
      bibleRef: "John 11:1–44; John 12:1–2",
      pos: [0, 0, 15],
      hasDialogue: true,
      storyFile: "martha_bethany",
      unlocksSuspects: ["nicodemus_secret"],
      unlocksEvidence: ["grave_dirt"],
      revealsProphecy: "isaiah_25_8",
      background: "The practical, protective head of the Bethany household. Having witnessed her brother's descent into death and subsequent revival, she is now trapped in a terrifying surveillance grid, managing family survival while shadow operatives monitor her home.",
      dialogue: {
        neutral: "We were a quiet household before the illness. Now, strange men stand at the edge of our fields, watching who enters and leaves.",
        cautious: "My brother is inside. He is alive, he is eating, and yet the temple officials treat him like he has committed a capital crime.",
        pressured: "They brought our neighbors in for questioning. They asked about the linen, the stones, the exact hour. They aren't looking for a miracle; they are hunting for a reason.",
        exposed: "I found a dropped seal near our garden wall. They want to put him back in the earth. How can you look at a man given back to his family by God and plan his murder?",
        repeat: "I must prepare food for the household. Please, if you are followed, do not stay near our door.",
      },
      reactions: {
        crowd_report: { text: "The pilgrims have been so kind, but their presence draws the eyes of the guard. We never asked for these massive crowds.", isLie: false },
        grave_dirt: { text: "That is the white dust from our family tomb. The oils... it smells like the morning Jesus stood outside and commanded the stone to be moved.", isLie: false },
        secret_decree: { text: "This writing bears the seal of the high priest's family. They want to take my brother away. Please, you have to help us warn the disciples.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "parable_meaning",
      name: "Thomas (Parable)",
      role: "Analytical Disciple",
      avatar: "thomas.svg",
      profileFile: "thomas",
      truthfulness: 0.9,
      bibleRef: "Matthew 13:10-17",
      hasDialogue: true,
      storyFile: "parable_meaning",
      background: "An inner-circle follower distinguished by analytical, skeptical mindset. Asks hard questions about parables.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "parable_vineyard",
      name: "Thomas (Vineyard)",
      role: "Analytical Disciple",
      avatar: "simon_pharisee.svg",
      profileFile: "thomas",
      truthfulness: 0.9,
      bibleRef: "Mark 12:1-12 (Parable of the Tenants)",
      hasDialogue: true,
      storyFile: "parable_vineyard",
      background: "Thomas wrestling with the Vineyard Parable. Sees the dangerous implications for religious authorities.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "trial_rumors",
      name: "Trial Rumors",
      role: "Court Observer",
      avatar: "maluch.svg",
      profileFile: "trial_rumors",
      truthfulness: 0.4,
      bibleRef: "Matthew 26:59-68",
      hasDialogue: true,
      storyFile: "trial_rumors",
      background: "Present at or near the trial. Part accurate, part distorted version of events.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "witness_healed",
      name: "Bethesda Witness",
      role: "Eyewitness",
      avatar: "maluch.svg",
      profileFile: "bethesda_witness",
      truthfulness: 0.85,
      bibleRef: "John 5:1-15",
      hasDialogue: true,
      storyFile: "witness_healed",
      background: "Witnessed the healing at Bethesda. Confirms Jesus power.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "teaching_mount",
      name: "Mount Teacher",
      role: "Disciple",
      avatar: "mount_teacher.svg",
      profileFile: "mount_teacher",
      truthfulness: 0.8,
      bibleRef: "Matthew 5-7 (Sermon on the Mount)",
      hasDialogue: true,
      storyFile: "teaching_mount",
      background: "Heard Jesus teaching on the Mount of Olives. Shares wisdom from the gatherings.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "nicodemus",
      name: "Nicodemus",
      role: "Conflicted Pharisee",
      avatar: "nicodemus.svg",
      profileFile: "nicodemus",
      truthfulness: 0.8,
      bibleRef: "John 3:1-21; John 7:50-52; John 19:39",
      hasDialogue: true,
      storyFile: "nicodemus_conflicted",
      background: "A member of the Sanhedrin who seeks the truth in secret. He is torn between his position and his growing conviction.",
      dialogue: {
        neutral: "Tell me what you know about the events.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "simon_leper",
      name: "Simon the Leper",
      role: "Healed Host",
      avatar: "simon_leper.svg",
      profileFile: "simon_leper",
      truthfulness: 0.9,
      bibleRef: "Matthew 26:6-13; Mark 14:3-9",
      hasDialogue: true,
      storyFile: "simon_leper",
      background: "Once an outcast, now a host. His house in Bethany became a refuge for Jesus and a place where the preparation for His burial began.",
      dialogue: {
        neutral: "Tell me what you know about the events.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
  ],

  deductions: {
    "crowd_report+secret_decree": {
      link: {
        text: "The surge in pilgrim interest matches the exact timeline of the secret execution order.",
        insight: "Lazarus didn't do anything political; his mere existence as a living miracle is the threat. The Sanhedrin must destroy the evidence of the miracle to neutralize the prophet.",
        isKey: true,
        bibleRef: "John 12:11",
      },
    },
    "grave_dirt+secret_decree": {
      link: {
        text: "The forensic presence of burial scents inside the courthouse exposes their hypocrisy.",
        insight: "The council knows the miracle was genuine. They verified the grave scents, yet chose to fight against the Author of Life to protect their alliance with Rome.",
        isKey: false,
        bibleRef: "John 11:48",
      },
    },
  },

  truth: {
    culprit: "caiaphas",
    motive: "The high priests feared that the massive public following caused by Lazarus's resurrection would spark a Roman military crackdown, destroying their temple and nation.",
    method: "Caiaphas and his inner circle bypassed standard judicial procedures to authorize a shadow assassination plot against Lazarus of Bethany, aiming to eliminate the physical evidence of Jesus's greatest miracle before the Passover feast ended.",
    lesson: "When humans value their religious systems over God's living truth, they end up trying to suppress and destroy the very life God creates. The plot against Lazarus mirrors the impending attempt to seal the tomb of Jesus.",
    prophesyFulfilled: ["Isaiah 25:8", "Psalm 16:10"],
    furtherReading: ["John 11:45–57", "John 12:9–11"],
  },
};

// ============================================================
// ACT: II — Prophecy & Preparation
// CASE: The End of the Age
// CASE ID: olivet_discourse
// CASE EXPORT: act2CaseC
// SOURCE: Matthew 24–25; Mark 13; Luke 21
//
// LOCATION:
// Mount of Olives, overlooking Jerusalem
//
// DIFFICULTY:
// ★★★☆☆ (3/5)
//
// BACKGROUND:
// On Tuesday afternoon of Passion Week, Jesus departed the Temple and
// crossed the Kidron Valley to the Mount of Olives. Looking back at the
// magnificent Temple, He foretold its complete destruction. Privately,
// Peter, James, John, and Andrew asked when these events would occur
// and what signs would announce His coming and the end of the age.
// Jesus responded with His longest prophetic discourse, describing false
// messiahs, wars, persecution, worldwide evangelism, the destruction of
// Jerusalem, His future return, and the need for constant spiritual
// readiness through parables such as the Ten Virgins and the Talents.
//
// BIBLE REFERENCES:
// Matthew 24–25
// Mark 13
// Luke 21
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
// • Daniel 9:27 — Jesus identifies the "abomination of desolation"
//   spoken of by Daniel as a future sign connected with Jerusalem.
//
// • Joel 2:30–31 — Cosmic disturbances preceding the Day of the Lord
//   are echoed in Jesus's description of His return.
//
// • Isaiah 13:10 — The darkening of the heavenly bodies is repeated by
//   Jesus as part of His end-times prophecy.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
// Summary:
// Jesus answered His disciples' questions concerning the destruction of
// the Temple, the signs preceding His return, and the end of the age.
// His discourse combines near-term prophecy, fulfilled in the destruction
// of Jerusalem in AD 70, with future events surrounding His second coming,
// urging believers to remain faithful and watchful.
//
// Historical Context:
// The Mount of Olives provided a panoramic view of Jerusalem and the
// Temple. Jesus's prediction that not one stone would remain upon another
// shocked His disciples, prompting one of the most significant prophetic
// conversations recorded in the Gospels.
//
// Spiritual Theme:
// Watchfulness, perseverance, faithful stewardship, prophecy, judgment,
// hope, and readiness for Christ's return.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
// Crime:
// None. This case investigates prophetic teaching rather than a criminal
// act.
//
// Actual Event:
// Jesus revealed future events concerning Jerusalem, the end of the age,
// and His return. Through prophecy and parables He instructed His
// followers to remain spiritually prepared, discerning, and faithful
// until He comes again.
//
// Culprit:
// None.
//
// Motive:
// To prepare His disciples for coming persecution, strengthen their
// faith, and reveal God's sovereign plan for history while warning
// against deception and spiritual complacency.
//
// Verdict:
// Jesus's prophecy accurately foretold the destruction of Jerusalem and
// continues to point believers toward His future return. The evidence
// calls for vigilance, endurance, and faithful obedience rather than
// speculation about dates.
//
// ============================================================

export const act2CaseC = {
  id: "olivet_discourse",
  icon: '../assets/gfx/sun-duotone.svg',
  title: "The End of the Age",
  subtitle: "Overlooking Jerusalem, Jesus delivers a profound prophecy about the Temple's destruction and the signs of His return.",
  location: "mount_of_olives",
  eventLocation: "Mount of Olives, overlooking Jerusalem",
  timeOfDay: "day",
  difficulty: 3,
  requires: "lazarus_plot",
  actLabel: "Act II - The Temple Courts",
  color: 0x8b5cf6, // A deep blue/purple color
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "End Times Prophecy", task: "Understand the signs of the end", cur: 0, tar: 7 },

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `On Tuesday afternoon, after leaving the Temple courts, Jesus sat on the Mount of Olives with His disciples, overlooking Jerusalem. They asked Him about the destruction of the Temple and the signs of His coming and the end of the age. In response, Jesus delivered a lengthy and complex discourse, warning them of false messiahs, wars, famines, earthquakes, and persecutions, and urging them to be watchful and ready. He also taught parables like the Ten Virgins and the Talents, emphasizing preparedness and faithful stewardship.`,
    significance: `The Olivet Discourse is Jesus's most extensive teaching on eschatology (the study of end times). It provides crucial insights into the future, blending prophecies about the destruction of Jerusalem (fulfilled in AD 70) with prophecies about His second coming. It emphasizes the need for spiritual vigilance and perseverance amidst tribulation.`,
    historicalNote: `The Mount of Olives offered a panoramic view of the Temple and Jerusalem, providing a dramatic backdrop for Jesus's prophecies about its destruction. The disciples' questions were likely prompted by Jesus's earlier declaration that not one stone of the Temple would be left upon another (Matthew 24:2).`,
  },

  prophecies: [
    {
      reference: "Daniel 9:27",
      id: "daniel_9_27",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"He will confirm a covenant with many for one 'seven.' In the middle of the 'seven' he will put an end to sacrifice and offering. And at the temple he will set up an abomination that causes desolation."`,
      written: "~530 BC",
      fulfilledBy: "Jesus's prophecy of the Temple's destruction and the 'abomination that causes desolation'",
      gospelLink: "Matthew 24:15",
      insight: "Jesus directly referenced Daniel's prophecy, linking it to the future destruction of the Temple and the desecration that would precede it, a warning to His disciples about the coming tribulation.",
      explanation: "Jesus directly quoted Daniel's prophecy, applying it to the future destruction of the Temple in Jerusalem as a warning to His disciples.",
    },
    {
      reference: "Joel 2:30–31",
      id: "joel_2_30_31",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"I will show wonders in the heavens and on the earth, blood and fire and billows of smoke. The sun will be turned to darkness and the moon to blood before the coming of the great and dreadful day of the LORD."`,
      written: "~800 BC",
      fulfilledBy: "Jesus's prophecy of cosmic signs preceding His return",
      gospelLink: "Matthew 24:29",
      insight: "Jesus incorporated ancient prophetic imagery of cosmic disturbances into His discourse, indicating that His return would be heralded by dramatic celestial events, fulfilling Joel's vision.",
      explanation: "Jesus incorporated this classic prophetic imagery of cosmic disturbances to describe the unmistakable signs that would herald His return.",
    },
    {
      reference: "Isaiah 13:10",
      id: "isaiah_13_10",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"The stars of heaven and their constellations will not show their light. The rising sun will be darkened and the moon will not give its light."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's description of the darkening of the sun and moon as signs of the end",
      gospelLink: "Mark 13:24–25",
      insight: "Isaiah's prophecy of cosmic darkness is echoed by Jesus, emphasizing the dramatic and unmistakable nature of the signs that will precede the end of the age and His glorious return.",
      explanation: "Jesus incorporated this classic prophetic imagery of cosmic disturbances to describe the unmistakable signs that would herald His return.",
    },
  ],

  intro: formatIntro(`It is Tuesday afternoon. Jesus has left the Temple, and as He sits on the Mount of Olives, His disciples approach Him privately. They are troubled by His words about the Temple's destruction and eager to know **when** these things will happen, and what signs will precede His coming and the end of the age. The air is thick with anticipation as Jesus begins to unveil future events, a complex tapestry of _prophecy and warning_.`),

  suspects: [
    { id: "none", name: "No One", role: "Divine Teaching", avatar: "nicodemus.svg", bibleRef: null },
  ],

  evidencePool: [

    {
      id: "temple_overlook_view",
      name: "View of the Temple from Olivet",
      type: "environmental",
      relatedProphecy: "",
      icon: "../assets/gfx/building-columns-duotone.svg",
      location: "Mount of Olives",
      pos: [0, 5, -15],
      snippet: "A panoramic view of the gleaming Temple from the high ridge.",
      description: "The majestic view of the Jerusalem Temple complex, gleaming in the afternoon sun. Its grandeur makes Jesus's prophecy of its destruction all the more startling.",
      bibleRef: "Matthew 24:1–2",
      propheticLink: "The physical setting directly inspired the disciples' questions about the Temple's fate, linking Jesus's words to the tangible structure before them.",
      bibleRefs: [
        { ref: "Matthew 24:1-2", link: "matthew_24_1_2" }
      ],
      propheticRefs: [],
      investigatorNote: "The disciples' awe of the Temple's stones and buildings contrasts sharply with Jesus's prediction of its utter demolition.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Sets the physical stage that provokes the disciples' questions recorded in the next piece of evidence.",
        link: "Event — the literal view from the Mount of Olives that prompted the whole discourse.",
        timeline: "CHRONOLOGY: The vantage point Jesus and the disciples shared as they left the Temple that evening.",
        contradict: "RELIABILITY: A fixed, verifiable location — the Temple's visibility from Olivet is not in dispute."
      },
    }, {
      id: "disciples_questions_notes",
      name: "Disciples' Questions (Written Notes)",
      type: "analytical",
      relatedProphecy: "daniel_9_27",
      icon: "../assets/gfx/text-align-left-duotone.svg",
      location: "Mount of Olives",
      pos: [8, 1, 8],
      snippet: "Quickly scribbled notes detailing three specific questions.",
      description: "Notes scribbled by a disciple, detailing the three main questions posed to Jesus: 'When will these things be? What will be the sign of your coming? And of the end of the age?'",
      bibleRef: "Matthew 24:3",
      propheticLink: "These questions frame the entire discourse, revealing the disciples' immediate concerns about timing and signs, which Jesus then addresses with detailed prophecies.",
      bibleRefs: [
        { ref: "Matthew 24:3", link: "matthew_243" }
      ],
      propheticRefs: [],

      investigatorNote: "The disciples' questions show their expectation of a clear timeline and visible indicators for future events.",
      fake: false,
      category: 'people',
      timelineOrder: 2,
      clues: {
        compare: "Directly follows the Temple view — these are the three questions that view provoked.",
        link: "People — a disciple's own scribbled notes recording the three questions put to Jesus.",
        timeline: "CHRONOLOGY: Written down as the questions were asked, immediately after Jesus predicted the Temple's fall.",
        contradict: "RELIABILITY: A contemporaneous note, not a later reconstruction — it matches Matthew 24:3 nearly word for word."
      },
    }, {
      id: "parable_of_virgins_notes",
      name: "Parable of the Ten Virgins (Notes)",
      type: "analytical",
      relatedProphecy: "",
      icon: "../assets/gfx/flame-duotone.svg",
      location: "Mount of Olives",
      pos: [-8, 1, 8],
      snippet: "A summary of a story involving lamps and oil.",
      description: "A summary of the Parable of the Ten Virgins, emphasizing the need for preparedness and vigilance for the bridegroom's (Jesus's) return.",
      bibleRef: "Matthew 25:1–13",
      propheticLink: "This parable underscores the theme of watchfulness, a recurring motif in eschatological prophecies, urging believers to be ready for the unexpected timing of the Lord's return.",
      bibleRefs: [
        { ref: "Matthew 25:1-13", link: "matthew_25_1_13" }
      ],
      propheticRefs: [],

      investigatorNote: "The parable highlights the personal responsibility of each individual to be spiritually prepared.",
      fake: false,
      category: 'people',
      timelineOrder: 5,
      clues: {
        compare: "Closes out the discourse's teaching arc — moves from 'what are the signs' to 'how then should you live'.",
        link: "People — a listener's summary of the Parable of the Ten Virgins, told near the end of the discourse.",
        timeline: "CHRONOLOGY: The last major parable of the Olivet Discourse, after the cosmic signs had been described.",
        contradict: "RELIABILITY: A straightforward retelling consistent with Matthew 25:1–13, with no embellishment."
      },
    }, {
      id: "cosmic_signs_references",
      name: "Old Testament Cosmic Sign References",
      type: "analytical",
      relatedProphecy: "joel_2_30_31",
      icon: "../assets/gfx/stars-duotone.svg",
      location: "Mount of Olives",
      pos: [0, 2, 12],
      snippet: "A list of ancient prophecies regarding the sun and moon.",
      description: "A collection of Old Testament verses (e.g., Joel 2:30-31, Isaiah 13:10) that speak of the sun darkening, the moon turning to blood, and stars falling, which Jesus referenced in His discourse.",
      bibleRef: "Matthew 24:29",
      propheticLink: "Jesus's use of these ancient prophecies demonstrates the continuity of God's plan and the fulfillment of long-foretold cosmic disturbances as signs of the end.",
      bibleRefs: [
        { ref: "Matthew 24:29", link: "matthew_2429" }
      ],
      propheticRefs: [],
      investigatorNote: "The consistency between Jesus's words and ancient prophecies reinforces the divine origin of His message.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 3,
      clues: {
        compare: "Grounds the darkened sun record — this is the wider set of prophecies Jesus was drawing from.",
        link: "Prophecy — a compiled list of Old Testament passages describing cosmic upheaval as a sign of judgement.",
        timeline: "CHRONOLOGY: Compiled to cross-reference Jesus's teaching as He described the signs of the end.",
        contradict: "RELIABILITY: These are established Old Testament texts, not a listener's later embellishment."
      },
    }, {
      id: "darkened_sun_record",
      name: "Darkened Sun Record",
      type: "analytical",
      relatedProphecy: "isaiah_13_10",
      icon: "../assets/gfx/sun-duotone.svg",
      location: "Mount of Olives",
      desc: "A record of Jesus's prophecy that the sun will be darkened and the moon will not give its light, quoting from Old Testament prophets.",
      bibleRef: "Matthew 24:29",
      propheticLink: "Isaiah 13:10 foretells the darkening of the heavenly lights. Jesus quotes this same imagery when describing the signs preceding His return.",
      bibleRefs: [
        { ref: "Matthew 24:29", link: "matthew_24_29" }
      ],
      propheticRefs: [
        { ref: "Isaiah 13:10", link: "isaiah_13_10" }
      ],
      investigatorNote: "This direct quotation links Jesus's teaching to ancient prophetic tradition, showing a continuity of divine revelation.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 4,
      clues: {
        compare: "The specific fulfilment case within the wider cosmic-signs list — the sun-darkening image Jesus quoted directly.",
        link: "Prophecy — Isaiah 13:10's darkened-sun language, quoted almost verbatim in Jesus's own words.",
        timeline: "CHRONOLOGY: Referenced partway through the discourse, alongside the other cosmic signs.",
        contradict: "RELIABILITY: A direct quotation match to Isaiah 13:10, not a loose paraphrase."
      },
    }

  ],

  lab: [
    {
      evidence: "disciples_questions_notes",
      suspect: "peter_olivet",
      result: "**Identified as Primary Witness** (He asked the initial question about the Temple's destruction)",
      notes: "'Tell us, when will this happen?' (Matthew 24:3) — the whole discourse traces back to a question asked in private, on the mountain."
    }
  ],

  npcs: [
    {
      id: "peter_olivet",
      name: "Peter",
      role: "Disciple, Questioner",
      faction: "scribes",
      avatar: "peter.svg",
      profileFile: "peter",
      color: 0xffaa44,
      pos: [-10, 0, -5],
      truthfulness: 0.8,
      bibleRef: "Matthew 24:3",
      hasDialogue: true,
      storyFile: "peter_olivet",
      unlocksSuspects: ["peter_olivet"],
      unlocksEvidence: ["disciples_questions_notes"],
      background: "Simon Peter, ever eager for answers, was one of the disciples who privately asked Jesus about the timing of the Temple's destruction and the signs of His coming.",
      dialogue: {
        neutral: "We had just left the Temple. He said not one stone would be left. How could we not ask when?",
        cautious: "He spoke of wars, famines, earthquakes... it sounded terrifying. But also of the gospel being preached to all nations.",
        pressured: "He warned us about false prophets and deceivers. It makes you wonder who to trust in these last days.",
        exposed: "He told us to be ready, like the wise virgins. To keep watch. It's a heavy burden, but a necessary one.",
        repeat: "The future is in His hands. Our job is to be faithful.",
      },
      reactions: {
        temple_overlook_view: { text: "Look at it! So grand, so solid. And He said it would all come down. It's hard to imagine.", isLie: false },
        disciples_questions_notes: { text: "Yes, those were our questions. We wanted to know the 'when' and the 'how'. He gave us much more than we expected.", isLie: false },
        parable_of_virgins_notes: { text: "The oil for our lamps... it's about being prepared, isn't it? Not just for the end, but for every day.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "john_olivet",
      name: "John",
      role: "Disciple, Observer",
      faction: "scribes",
      avatar: "john_apostle.svg",
      profileFile: "john_apostle",
      color: 0x66aaff,
      pos: [10, 0, -8],
      truthfulness: 0.9,
      bibleRef: "Matthew 24:3",
      hasDialogue: true,
      storyFile: "john_olivet",
      unlocksSuspects: ["john_olivet"],
      unlocksEvidence: ["temple_overlook_view"],
      revealsProphecy: "isaiah_13_10",
      background: "John, son of Zebedee, was among the inner circle who heard Jesus's Olivet Discourse. His Gospel often emphasizes themes of light, darkness, and the coming of Christ.",
      dialogue: {
        neutral: "He spoke of the end, but also of hope. The gospel must be proclaimed to all the world before the end comes.",
        cautious: "The signs He described... wars, earthquakes, famines. These things have always happened. But He said they would intensify.",
        pressured: "He spoke of a time of great tribulation, unlike any before. But also that those who endure to the end will be saved.",
        exposed: "The destruction of the Temple was a warning. A physical sign of a spiritual reality. The end of one age, the beginning of another.",
        repeat: "We must watch and pray. That was His command.",
      },
      reactions: {
        temple_overlook_view: { text: "It's beautiful, isn't it? But He said its beauty would be shattered. A sobering thought.", isLie: false },
        disciples_questions_notes: { text: "We wanted to understand. He gave us wisdom, not just dates.", isLie: false },
        cosmic_signs_references: { text: "The sun darkened, the moon not giving its light... these are ancient prophecies. He confirmed they would come to pass.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "thomas_olivet",
      name: "Thomas",
      role: "Disciple, Analytical",
      faction: "scribes",
      avatar: "thomas.svg",
      profileFile: "thomas",
      color: 0x99ccff,
      pos: [0, 0, 5],
      truthfulness: 0.85,
      bibleRef: "Matthew 24:3",
      hasDialogue: true,
      storyFile: "parable_meaning",
      unlocksSuspects: ["thomas_olivet"],
      unlocksEvidence: ["parable_of_virgins_notes", "cosmic_signs_references"],
      background: "Thomas, known for his analytical mind, would have carefully considered Jesus's prophecies, seeking to understand the practical implications of such profound teachings.",
      dialogue: {
        neutral: "He spoke of many things. The destruction of the Temple, the signs of His coming, the judgment of the nations.",
        cautious: "The parables He told, like the Ten Virgins and the Talents, were about being prepared. It's not enough to just hear the words.",
        pressured: "He said no one knows the day or hour, not even the angels. Only the Father. That makes planning difficult.",
        exposed: "The most important thing is not to predict the exact moment, but to live faithfully in the present, doing what He has commanded, until He returns.",
        repeat: "We must be ready. That is the essence of it.",
      },
      reactions: {
        disciples_questions_notes: { text: "We wanted a clear timeline. He gave us principles for living in the meantime.", isLie: false },
        parable_of_virgins_notes: { text: "The oil in the lamps... it's about our spiritual readiness, our inner life. Not just outward show.", isLie: false },
        cosmic_signs_references: { text: "These signs are not for us to fear, but to recognize. To know that His coming is near.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "andrew_olivet",
      name: "Andrew",
      role: "Disciple, Watcher",
      avatar: "nathan_gardener.svg",
      truthfulness: 0.9,
      hasDialogue: true,
      storyFile: "andrew_olivet",
      bibleRef: "Mark 13:3",
      background: "Andrew sat with Peter, James, and John on the Mount of Olives. He is focused on the signs of the end.",
      dialogue: {
        neutral: "He said the stones would fall... look at them, they seem so solid.",
      },
      reactions: {
        default: { text: "The future is in His hands.", isLie: false },
      },
    }
  ],

  deductions: {
    "temple_overlook_view+disciples_questions_notes": {
      link: {
        text: "The physical view of the Temple from the Mount of Olives directly prompted the disciples' questions about its destruction and the end of the age.",
        insight: "Jesus used the immediate context of the magnificent Temple to launch into profound prophecies about its future demolition and the broader eschatological timeline, connecting the visible present with the unseen future.",
        isKey: true,
        revealsProphecy: "daniel_9_27",
        bibleRef: "Matthew 24:1–3",
      },
    },
    "parable_of_virgins_notes+cosmic_signs_references": {
      compare: {
        text: "Jesus's parables emphasize preparedness and faithful living, while His references to cosmic signs highlight the dramatic, undeniable nature of His return.",
        insight: "The discourse balances two aspects of end-times teaching: the personal responsibility to be ready (parables) and the grand, cosmic events that will signal the culmination of history (prophecies).",
        isKey: true,
        bibleRef: "Matthew 25:1–13; Matthew 24:29",
      },
    },
    "cosmic_signs_references+darkened_sun_record": {
      compare: {
        text: "The Old Testament source texts and Jesus's own record of them line up almost word for word — He wasn't inventing new imagery, He was quoting.",
        insight: "Isaiah 13:10 and Joel 2:30–31 already described a darkened sun and moon centuries earlier. Jesus placed His own coming inside that established prophetic pattern rather than starting a new one.",
        isKey: false,
        bibleRef: "Matthew 24:29; Isaiah 13:10",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "The Olivet Discourse was Jesus's comprehensive teaching to His disciples, preparing them for future events, including the destruction of Jerusalem and His second coming, and urging them to live in constant readiness and faithfulness.",
    method: "Sitting on the Mount of Olives, Jesus responded to His disciples' questions by delivering a detailed prophecy that interwove predictions about the fall of Jerusalem with signs of the end of the age. He used parables to illustrate the importance of vigilance, perseverance, and wise stewardship.",
    lesson: "The Olivet Discourse teaches that while the timing of the end is unknown, the signs will be clear, and believers are called to be watchful, faithful, and productive. It underscores Jesus's authority as a prophet who accurately foretold future events, providing both warning and hope.",
    prophesyFulfilled: ["Daniel 9:27", "Joel 2:30–31", "Isaiah 13:10"],
    furtherReading: ["Matthew 24:1–51", "Matthew 25:1–46", "Mark 13:1–37", "Luke 21:5–36"],
  },
};

// ============================================================
// ACT: II — The Temple Courts
// CASE: The Anointing at Bethany
// CASE ID: passover_lamb_chain
// SOURCE: John 12:1–8; Matthew 26:6–13; Mark 14:3–9; Mark 11:27–33
//
// LOCATION:
// Bethany (the house of Simon the Leper) & the Temple Courts, Jerusalem
//
// DIFFICULTY:
// ★★☆☆☆ (2/5)
//
// Actual Event:
// Six days before Passover, Mary of Bethany anoints Jesus's feet with
// a pound of pure nard — perfume worth a year's wages — and wipes them
// with her hair. Days later, at Simon the Leper's house, a woman
// (traditionally identified with the same act, though Matthew and Mark
// place it nearer the Supper) breaks an alabaster jar of ointment over
// Jesus's head. Read together with His public inspection in the Temple
// courts, the sequence traces the same four-stage pattern God gave
// Israel for the Passover lamb in Exodus 12: Selection, Inspection,
// Anointing, Sacrifice.
//
// Culprit:
// None — this is an act of worship, not a crime. The tension in the
// case is Judas's objection to the "waste," which John's Gospel
// reveals was self-interest rather than concern for the poor.
//
// Motive:
// Mary and the woman at Simon's house acted out of extravagant,
// unguarded devotion. Judas's complaint exposes the contrast between
// worship that costs something and religion that merely calculates.
//
// Verdict:
// Jesus receives both anointings as preparation for His burial,
// identifying Himself as the true Passover Lamb — set apart, publicly
// examined and found without fault, anointed for consecration, and
// finally offered as the sacrifice.
//
// ============================================================

export const act2CaseD = {
  id: "passover_lamb_chain",
  icon: '../assets/gfx/jar-duotone.svg',
  title: "The Anointing at Bethany",
  subtitle: "A costly jar is broken over Jesus in an act of worship — and Judas isn't the only one asking why.",
  location: "bethany",
  eventLocation: "Bethany & the Temple Courts, Jerusalem",
  timeOfDay: "night",
  difficulty: 2,
  requires: "olivet_discourse",
  actLabel: "Act II - The Temple Courts",
  color: 0xd946ef,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "The Passover Lamb Pattern", task: "Trace the anointing and inspection sequence", cur: 0, tar: 4 },

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `In the days before Passover, at a dinner in Bethany, a woman broke open a flask of pure nard — perfume worth a full year's wages — and anointed Jesus, first at His feet and again at His head, wiping His feet with her own hair. Judas Iscariot objected loudly to the "waste." Jesus silenced the complaint: she had done it to prepare His body for burial. Meanwhile, in the Temple courts, Jesus was being publicly cross-examined by the chief priests, scribes, and elders — questioned, tested, and found without fault (Mark 11:27–33; Luke 20:1–8).`,
    significance: `Exodus 12 gave Israel a precise four-day sequence for the Passover lamb: it was selected on the 10th of Nisan, kept and inspected for blemishes until the 14th, then slaughtered at twilight. Read together, the anointing at Bethany and the public inspection in the Temple trace that same sequence over Jesus: Selection (His entry into Jerusalem), Inspection (the Temple questioning), Anointing (Bethany), and — days later — Sacrifice (the cross).`,
    historicalNote: `Spikenard (nard) was an imported aromatic oil from the Himalayas, sold in sealed alabaster flasks precisely because breaking the seal meant using the whole thing at once — there was no resealing it. A pound of it, as John 12:3 specifies, was worth roughly 300 denarii, close to a full year's wages for a laborer. Simon the Leper, the dinner's host, was likely someone Jesus had healed; his willingness to host a public dinner suggests he was no longer considered ceremonially unclean.`,
  },

  prophecies: [
    {
      reference: "Exodus 12:1–14",
      id: "typology_passover_lamb",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Your lamb shall be without blemish... you shall keep it until the fourteenth day of this month, when the whole assembly of the congregation of Israel shall kill their lambs at twilight."`,
      written: "~1400 BC",
      fulfilledBy: "Jesus being selected, publicly inspected in the Temple, anointed at Bethany, and offered as the final sacrifice",
      gospelLink: "Mark 11:27–33; John 12:1–8; Matthew 26:6–13",
      insight: "The Passover lamb was chosen four days before it was killed and kept under close watch to be certain it was flawless. Jesus entered Jerusalem, was cross-examined at length by every faction of Jewish leadership and found without fault, was anointed for burial at a dinner in Bethany, and was crucified days later — the same sequence, over the same span of days, fulfilled in a person rather than an animal.",
      explanation: "The anointing at Bethany and the public Temple inspection together complete the Passover lamb's Selection-Inspection-Anointing-Sacrifice pattern, fulfilled in Jesus over the final days before His death.",
    },
  ],

  intro: formatIntro(`It is evening in Bethany, and the house of Simon the Leper is full of guests, lamplight, and the smell of roasting food. Jesus reclines at the table with His disciples — including a very much alive Lazarus. Then, without warning, a woman kneels at His feet with a sealed alabaster flask. She breaks it open. The scent of pure nard fills the entire house. Some at the table are moved to silence. One man is furious. **Why would anyone waste something so valuable?** And in the days before this, in the Temple courts across the valley, Jesus had already faced a very different kind of scrutiny — question after question, trap after trap, testing whether He could be found at fault. Two scenes, two kinds of examination. Only one investigator in the room seems to sense they're connected.`),

  suspects: [
    { id: "judas_bethany", name: "Judas Iscariot", role: "Disciple and Treasurer", avatar: "judas.svg", bibleRef: "John 12:4-6 — 'He did not say this because he cared about the poor but because he was a thief.'" },
    { id: "mary_bethany", name: "Mary of Bethany", role: "Sister of Lazarus and Martha", avatar: "market_vendor.svg", bibleRef: "John 12:3 — 'Mary took about a pint of pure nard, an expensive perfume; she poured it on Jesus's feet and wiped his feet with her hair.'" },
    { id: "simon_leper", name: "Simon the Leper", role: "Dinner Host", avatar: "simon_leper.svg", bibleRef: "Matthew 26:6 — 'While Jesus was in Bethany in the home of Simon the Leper...'" },
  ],

  evidencePool: [

    {
      id: "lamb_records",
      name: "Passover Lamb Market Records",
      type: "analytical",
      relatedProphecy: "",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Jerusalem Livestock Market",
      desc: "A merchant's ledger recording the selection and inspection dates for festival lambs sold ahead of Passover — each animal marked, penned, and examined daily for blemishes until the fourteenth of Nisan.",
      bibleRef: "Exodus 12:3–6 — 'On the tenth day of this month each man is to take a lamb... take care of it until the fourteenth day of the month.'",
      bibleLink: "exodus_1236",
      propheticLink: "This ledger is the background pattern the whole case is built on: every Passover lamb in the city was selected days in advance and kept under watch, inspected daily, before being sacrificed at twilight on the fourteenth. It's the template the investigator needs before the rest of the evidence makes sense.",
      bibleRefs: [
        { ref: "Exodus 12:3-6", link: "exodus_1236" }
      ],
      propheticRefs: [],
      investigatorNote: "An ordinary commercial record — but it lays out, in administrative detail, the exact sequence the rest of this case's evidence seems to be tracing.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "The background pattern for everything that follows — read this first to see why the timing of the other evidence matters.",
        link: "Event — a livestock merchant's routine record of the Passover lamb selection and inspection schedule.",
        timeline: "CHRONOLOGY: Standard yearly practice, running from the tenth to the fourteenth of Nisan, the same days this case's other evidence unfolds within.",
        contradict: "RELIABILITY: A mundane market ledger with no theological agenda — it simply documents how Passover lambs were always handled."
      },
    }, {
      id: "inspection_notes",
      name: "Temple Inspection Notes",
      type: "analytical",
      relatedProphecy: "typology_passover_lamb",
      icon: "../assets/gfx/text-align-left-duotone.svg",
      location: "Temple Courts, Jerusalem",
      desc: "A scribe's notes from the Temple courts, recording round after round of formal questioning from chief priests, Pharisees, Sadducees, and Herodians — each trying, and failing, to catch Jesus in His words.",
      bibleRef: "Mark 11:27–33 — 'They arrived again in Jerusalem, and while Jesus was walking in the temple courts, the chief priests, the teachers of the law and the elders came to him.'",
      bibleLink: "mark_11_27",
      propheticLink: "The Passover lamb was inspected for blemishes for four days before it was sacrificed (Exodus 12:5). Jesus's public cross-examination in the Temple courts served the same function: every faction of religious authority took their turn testing Him, and none could find a fault to charge Him with.",
      bibleRefs: [
        { ref: "Mark 11:27-33", link: "mark_11_27" }
      ],
      propheticRefs: [
        { ref: "Exodus 12:5", link: "exodus_125" }
      ],
      investigatorNote: "Four separate factions, four separate lines of attack, and not one of them lands. Read alongside the lamb records, the pattern is hard to miss.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 2,
      clues: {
        compare: "The 'Inspection' stage of the pattern the lamb records laid out — this is Jesus being examined in public, the same way a lamb was examined before Passover.",
        link: "Prophecy — a scribe's notes on the repeated public interrogations Jesus faced and answered without fault.",
        timeline: "CHRONOLOGY: Took place across the days leading up to Passover, overlapping with the dinner at Bethany.",
        contradict: "RELIABILITY: A contemporaneous record of a public event witnessed by a large Temple crowd, not a later retelling."
      },
    }, {
      id: "nard_flask",
      name: "Flask of Pure Nard",
      type: "physical",
      relatedProphecy: "typology_passover_lamb",
      icon: "../assets/gfx/jar-duotone.svg",
      location: "Bethany, House of Simon the Leper",
      desc: "A broken alabaster flask, its seal shattered, still carrying the powerful fragrance of pure spikenard — an imported perfume worth close to a year's wages.",
      bibleRef: "John 12:3 — 'Mary took about a pint of pure nard, an expensive perfume; she poured it on Jesus's feet and wiped his feet with her hair. And the house was filled with the fragrance of the perfume.'",
      bibleLink: "john_12_3",
      propheticLink: "The anointing of Jesus's feet with expensive perfume was an act of profound worship. In the Old Testament, anointing with oil consecrated kings (1 Samuel 16:13) and priests (Exodus 30:30) for service. This act sets Jesus apart as the Messiah (the \"Anointed One\") and, as Jesus Himself stated, prepares His body \"beforehand for burial\" (Mark 14:8).",
      bibleRefs: [
        { ref: "John 12:1-3", link: "john_12_1" },
        { ref: "Mark 14:8", link: "mark_14_8" }
      ],
      propheticRefs: [
        { ref: "1 Samuel 16:13", link: "1_samuel_16_13" },
        { ref: "Exodus 30:30", link: "exodus_30_30" }
      ],
      investigatorNote: "Once the seal on a flask like this was broken, there was no saving the rest for later. Mary emptied the whole thing — nothing held back.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "The 'Anointing' stage of the pattern — an act of worship that, read prophetically, doubles as consecration for a king and priest.",
        link: "Event — the broken flask of nard Mary used to anoint Jesus's feet at Bethany.",
        timeline: "CHRONOLOGY: Six days before Passover, at a dinner honouring Jesus and the newly-raised Lazarus.",
        contradict: "RELIABILITY: John's Gospel names the woman, the cost, and the objector by name — the marks of an eyewitness account, not a vague legend."
      },
    }, {
      id: "alabaster_jar",
      name: "Broken Alabaster Jar",
      type: "physical",
      relatedProphecy: "typology_passover_lamb",
      icon: "../assets/gfx/cup-duotone.svg",
      location: "Bethany, House of Simon the Leper",
      desc: "Shattered fragments of a second, separate alabaster jar, its contents poured out entirely over the head of the guest of honour rather than His feet.",
      bibleRef: "Matthew 26:6–7 — 'While Jesus was in Bethany in the home of Simon the Leper, a woman came to him with an alabaster jar of very expensive perfume, which she poured on his head as he was reclining at the table.'",
      bibleLink: "matthew_26_6",
      propheticLink: "The anointing of Jesus's head directly mirrors the way kings like Saul and David were anointed, signifying His royal authority. It also serves as a prophetic act of consecration, setting Him apart as the ultimate High Priest and King who would offer Himself as the final sacrifice.",
      bibleRefs: [
        { ref: "Matthew 26:6-7", link: "matthew_26_6" }
      ],
      propheticRefs: [
        { ref: "1 Samuel 16:13", link: "1_samuel_16_13" }
      ],
      investigatorNote: "Where the nard at the feet was an act of humble devotion, this pouring over the head carries an unmistakably royal weight — the same gesture Samuel used to anoint Israel's kings.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "A second anointing, at the head rather than the feet — completing the royal and priestly weight of the pattern the nard flask began.",
        link: "Event — the shattered jar used to anoint Jesus's head at the same Bethany dinner.",
        timeline: "CHRONOLOGY: The same days before Passover, at Simon the Leper's table.",
        contradict: "RELIABILITY: Recorded independently in Matthew and Mark, both naming the same house and the same objection from those at the table."
      },
    }

  ],

  lab: [
    {
      evidence: "nard_flask",
      suspect: "mary_bethany",
      result: "**Cleared** (An act of costly, unguarded worship, not waste)",
      notes: "'She has done a beautiful thing to me' (Matthew 26:10) — Jesus reframed the 'waste' Judas condemned as an act He would be remembered for."
    },
    {
      evidence: "nard_flask",
      suspect: "judas_bethany",
      result: "**Motive Exposed** (Objection was self-interest, not charity)",
      notes: "'He did not say this because he cared about the poor but because he was a thief' (John 12:6) — the treasurer's complaint hid a habit of skimming the money bag."
    },
    {
      evidence: "alabaster_jar",
      suspect: "simon_leper",
      result: "**Cleared** (A gracious host, willing to be associated with a costly act of devotion)",
      notes: "A man once cast out for leprosy now hosts the dinner where Jesus is anointed for burial — mercy remembered by making room for more mercy."
    }
  ],

  npcs: [
    {
      id: "mary_bethany",
      name: "Mary of Bethany",
      role: "Sister of Lazarus and Martha",
      faction: "disciples",
      avatar: "market_vendor.svg",
      profileFile: "mary_bethany",
      truthfulness: 0.98,
      bibleRef: "John 12:1–8; John 11:1–2",
      hasDialogue: true,
      storyFile: "mary_bethany_anointing",
      unlocksSuspects: ["mary_bethany"],
      unlocksEvidence: ["nard_flask"],
      revealsProphecy: "typology_passover_lamb",
      background: "Sister of Lazarus and Martha, present when Jesus raised her brother from the dead. That miracle reshaped how she saw everything, including what she was willing to give up.",
      dialogue: {
        neutral: "I had been saving that nard for a long time. I didn't save it for a special occasion. I saved it for Him.",
        cautious: "Judas asked why I didn't sell it and give the money to the poor. As if I hadn't thought about the cost before I broke the seal.",
        pressured: "My brother was dead four days. I watched Jesus weep, and then I watched him walk out of the tomb. What is a flask of oil, next to that?",
        exposed: "He said I was preparing His body for burial. I didn't fully understand what that meant. I just knew I had to give Him everything I had, before it was too late to give it.",
        repeat: "The house still smells of it. I don't think I'll ever forget that scent.",
      },
      reactions: {
        nard_flask: { text: "I broke the seal before I could talk myself out of it. Once it's open, there's no keeping any of it back — that's rather the point.", isLie: false },
        alabaster_jar: { text: "That jar was not mine. But I understood exactly why she did it.", isLie: false },
        inspection_notes: { text: "They've been testing Him for days in the Temple, trying to find a single fault. They won't find one. I know that better than most.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "judas_bethany",
      name: "Judas Iscariot",
      role: "Disciple and Treasurer",
      faction: "disciples",
      avatar: "judas.svg",
      profileFile: "judas",
      truthfulness: 0.4,
      bibleRef: "John 12:4–6",
      hasDialogue: true,
      storyFile: "judas_bethany_objection",
      unlocksEvidence: ["alabaster_jar"],
      background: "Keeper of the disciples' communal purse. Publicly framed his objection to the anointing as concern for the poor — privately, he had been helping himself to the money bag for some time.",
      dialogue: {
        neutral: "That perfume could have been sold for three hundred denarii. Do you understand what that money could have done for the poor?",
        cautious: "I manage the funds for this entire group. Someone has to think practically while everyone else is swept up in sentiment.",
        pressured: "I'm not the only one who thought it was wasteful. I was simply the only one who said it out loud.",
        exposed: "Fine. I keep the bag. What of it? Someone has to.",
        repeat: "Three hundred denarii. Poured out on the floor. Think about that.",
      },
      reactions: {
        nard_flask: { text: "A criminal waste. That much perfume, gone, in a single evening.", isLie: false },
        alabaster_jar: { text: "Another one. As if the first wasn't excessive enough.", isLie: false },
        lamb_records: { text: "Lambs are inspected because money is on the line. I understand markets. I don't understand pouring profit onto the floor.", isLie: false },
      },
      contradictions: {
        "nard_flask+lamb_records": {
          exposed: "You want to know why I really objected? Fine. It wasn't the poor. It was the bag. Three hundred denarii would have passed through my hands, and none of it would have poured out onto a floor.",
        },
      },
    },
    {
      id: "simon_leper",
      name: "Simon the Leper",
      role: "Dinner Host",
      faction: "disciples",
      avatar: "simon_leper.svg",
      profileFile: "simon_leper",
      truthfulness: 0.9,
      bibleRef: "Matthew 26:6–7; Mark 14:3",
      hasDialogue: true,
      storyFile: "simon_leper_host",
      unlocksSuspects: ["simon_leper", "judas_bethany"],
      unlocksEvidence: ["alabaster_jar"],
      background: "Once known only by his disease, likely healed by Jesus at some point unrecorded in the Gospels. Now hosts a dinner in his own home, in his own name, for the man who gave him his life back.",
      dialogue: {
        neutral: "They still call me 'the Leper,' even now. I don't mind it. It reminds everyone at my table what was done for me.",
        cautious: "I didn't know what she was going to do when she came in. None of us did. The whole house filled with that scent in a moment.",
        pressured: "Judas made his complaint loudly enough for the whole table to hear. Jesus's answer was quieter, but it was the one that stayed with me.",
        exposed: "I have very little left to give that would embarrass me to give. Let my house be remembered for what happened at my table, not for what I once was.",
        repeat: "Please, eat. There is more than enough.",
      },
      reactions: {
        alabaster_jar: { text: "It happened right there, at my own table. I've never seen a room go so silent, so quickly.", isLie: false },
        nard_flask: { text: "I understand why Mary gave what she gave. I was given far more than I could ever repay, once.", isLie: false },
        inspection_notes: { text: "The Temple leaders keep testing Him in public. My table is a much friendlier place to be examined.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "temple_scribe_hillel",
      name: "Hillel",
      role: "Temple Court Scribe",
      faction: "scribes",
      avatar: "senior_scribe.svg",
      profileFile: "hillel_scribe",
      truthfulness: 0.85,
      bibleRef: "Mark 11:27–33",
      hasDialogue: true,
      storyFile: "temple_inspection_scribe",
      unlocksEvidence: ["inspection_notes", "lamb_records"],
      background: "A court scribe tasked with recording the formal questioning of Jesus in the Temple courts — and, separately, the routine business of the livestock markets ahead of Passover.",
      dialogue: {
        neutral: "I record what is said, not what I believe. My notes are the same either way.",
        cautious: "Four factions questioned Him this week. Chief priests, Pharisees, Sadducees, Herodians. None of them left satisfied.",
        pressured: "I also keep the market's Passover lamb records, if you're interested. The inspection schedule is public record.",
        exposed: "Read the two ledgers side by side, if you like. I only write down what happens. I don't decide what it means.",
        repeat: "I have more scrolls to file before the festival begins.",
      },
      reactions: {
        inspection_notes: { text: "Every question was designed to trap Him. Every answer left the questioners with nothing to charge Him with.", isLie: false },
        lamb_records: { text: "Selected on the tenth, watched until the fourteenth. It's the same schedule every year — I've copied it a hundred times.", isLie: false },
      },
      contradictions: {},
    }
  ],

  deductions: {
    "lamb_records+inspection_notes": {
      compare: {
        text: "The lamb selection and inspection schedule from the livestock market lines up, almost day for day, with the public questioning Jesus faced in the Temple courts.",
        insight: "A Passover lamb was chosen four days before Passover and examined the whole time for any blemish. Jesus was publicly cross-examined by every faction of religious leadership across those same days — and, like the lamb, was found without fault.",
        isKey: true,
        revealsProphecy: "typology_passover_lamb",
        bibleRef: "Exodus 12:3–6; Mark 11:27–33",
      },
    },
    "nard_flask+alabaster_jar": {
      link: {
        text: "Two separate acts of anointing — one at the feet, one at the head — both poured out over Jesus in the same handful of days before Passover.",
        insight: "Anointing with oil consecrated both kings (1 Samuel 16:13) and priests (Exodus 30:30) in the Old Testament. Together, the two anointings at Bethany mark Jesus out as both — the Anointed King and the ultimate High Priest — just before He offers Himself as the sacrifice.",
        isKey: true,
        bibleRef: "John 12:1–3; Matthew 26:6–7",
      },
    },
    "inspection_notes+nard_flask": {
      compare: {
        text: "Public scrutiny in the Temple and private worship at Bethany happened in the very same days — one testing Jesus, the other honouring Him.",
        insight: "Selection, Inspection, Anointing, Sacrifice — the full Passover lamb sequence of Exodus 12, traced across a single week, is completed only once the crucifixion evidence from Golgotha is linked in as well.",
        isKey: false,
        bibleRef: "Exodus 12:1–14",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "Mary of Bethany, and separately the woman at Simon's table, gave the most costly thing they owned in an act of worship — anointing Jesus at both feet and head in the days before Passover. Judas's objection revealed his own self-interest rather than a genuine concern for the poor.",
    method: "The anointing at Bethany, read together with Jesus's public inspection in the Temple courts, traces the same Selection-Inspection-Anointing-Sacrifice sequence God gave Israel for the Passover lamb in Exodus 12 — fulfilled not in an animal, but in a person.",
    lesson: "Worship that costs nothing is not the same as worship at all. Jesus received the anointing as both an act of devotion and prophetic preparation for His burial, identifying Himself as the true Passover Lamb in the days before He was sacrificed.",
    prophesyFulfilled: ["Exodus 12:1–14"],
    furtherReading: ["John 12:1–8", "Matthew 26:6–13", "Mark 14:3–9", "Mark 11:27–33"],
  },
};
