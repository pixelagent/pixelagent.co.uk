// ============================================================
// CASE: The Silenced Teacher  — difficulty 2 — Temple Courts
// BIBLICAL FOCUS: Matthew 21:23–22:46, Mark 11:27–12:44, Luke 20:1–21:4
// PROPHECY: Psalm 118:22–23, Malachi 3:1, Isaiah 5:1–7, Daniel 7:13–14
// ============================================================

export const act3Case = {
  id: "authority_challenged",
  title: "The Silenced Teacher",
  subtitle: "Three religious leaders have attempted to trap Jesus in His words — but who holds the real authority?",
  location: "Temple",
  difficulty: 2,
  requires: "triumphal_entry",

  biblicalContext: {
    summary: `On Tuesday morning, Nisan 12, Jesus returned to the Temple courts for His most intensive day of public teaching. The religious leadership — stung by the Temple cleansing the day before and alarmed by the growing crowds — mounted a coordinated series of challenges designed to discredit Him publicly. They sent Pharisees, Sadducees, Herodians, and scribes in waves. Each trap backfired. Each time, Jesus's answer not only escaped the trap but turned the tables, exposing the questioner's hypocrisy, ignorance, or bad faith. By afternoon, 'no one dared ask him any more questions' (Matthew 22:46).`,
    significance: `The authority question ('By what authority do you do these things?') was the most direct challenge. Jesus answered with a counter-question about John the Baptist's authority that left them publicly paralysed — they couldn't say divine, because they hadn't believed John; they couldn't say human, because the crowd would be furious. Their own trap snapped shut on them. Jesus then delivered three devastating parables against them (the Two Sons, the Wicked Tenants, the Wedding Banquet) followed by the Parable of the Cornerstone — quoting Psalm 118:22 directly at them.`,
    historicalNote: `The 'Temple courts' (Greek: hieron) referred to the vast outer courts of Herod's Temple complex — particularly the Court of the Gentiles. This was a public, noisy, commercially active space where teachers would gather disciples and debate. Jesus taught here daily during Passion Week. The size of the audience made public defeats deeply humiliating for the religious leaders.`,
  },

  prophecies: [
    {
      reference: "Psalm 118:22–23",
      text: `"The stone the builders rejected has become the cornerstone; the LORD has done this, and it is marvellous in our eyes."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus quoting this Psalm directly against the religious leaders after the Parable of the Wicked Tenants",
      gospelLink: "Matthew 21:42–44; Mark 12:10–11",
      insight: "The 'builders' were Israel's religious leaders, entrusted with building God's community. The 'stone' was Jesus, whom they were rejecting. Jesus used their own Scripture to declare their judgement — He was the very stone they were trying to remove, and His rejection would become the cornerstone of something entirely new: the Church.",
    },
    {
      reference: "Isaiah 5:1–7",
      text: `"My beloved had a vineyard on a very fertile hill... He looked for it to yield grapes, but it yielded wild grapes... The vineyard of the LORD Almighty is the nation of Israel."`,
      written: "~700 BC",
      fulfilledBy: "The Parable of the Wicked Tenants (Matthew 21:33–46), which deliberately echoed Isaiah's Song of the Vineyard",
      gospelLink: "Matthew 21:33–45; Mark 12:1–12",
      insight: "When Jesus began His parable 'There was a landowner who planted a vineyard, set a hedge around it, dug a winepress...' — He was quoting Isaiah 5 almost word-for-word. Every Pharisee in the crowd recognised it immediately. The tenants who killed the owner's son were unmistakably them. Matthew records: 'When the chief priests and the Pharisees heard his parables, they perceived that he was speaking about them' (Matthew 21:45).",
    },
    {
      reference: "Daniel 7:13–14",
      text: `"There before me was one like a son of man, coming with the clouds of heaven... He was given authority, glory and sovereign power; all nations and peoples of every language worshipped him."`,
      written: "~550 BC",
      fulfilledBy: "Jesus's implicit claim to be the 'Son of Man' with divine authority — the title He used throughout the Gospels",
      gospelLink: "Mark 14:62 — Jesus explicitly quotes Daniel 7:13 at His trial before Caiaphas",
      insight: "The title 'Son of Man' was Jesus's preferred self-designation — it is used over 80 times in the Gospels. It came from Daniel 7:13 and carried unmistakable divine authority claims. The religious leaders understood exactly what He was claiming — which is why the high priest tore his robes at Jesus's trial when He quoted it (Mark 14:62–64).",
    },
    {
      reference: "Malachi 3:1",
      text: `"I will send my messenger, who will prepare the way before me. Then suddenly the Lord you are seeking will come to his temple; the messenger of the covenant, whom you desire, will come."`,
      written: "~430 BC",
      fulfilledBy: "Jesus's presence and teaching authority in the Temple",
      gospelLink: "Matthew 11:10 (Jesus identifies John the Baptist as the 'messenger'); Mark 1:2",
      insight: "The authority challenge asked where Jesus's authority came from. Jesus's counter-question about John's authority was strategic — if John was God's messenger (Malachi 3:1), and John had publicly identified Jesus as the Coming One (John 1:29–34), then Jesus's authority derived from the very God who had sent His messenger ahead. The leaders were trapped.",
    },
  ],

  intro: `It is Tuesday morning, Nisan 12. The Temple courts are packed with Passover pilgrims and local worshippers. Jesus is teaching when a delegation of chief priests, scribes, and elders arrives — formally and deliberately. Their challenge is direct: 'By what authority do you do these things? Who gave you this authority?' Three religious leaders were the primary challengers that morning, each representing a different faction. But as you gather evidence from the scene, a question emerges: who is really on trial here — Jesus, or them?`,

  suspects: [
    { id: "chief_priest", name: "Caiaphas", role: "High Priest, Sadducee", avatar: "👨‍⚖️", bibleRef: "Matthew 21:23; John 11:49–52" },
    { id: "scribe", name: "Samuel", role: "Temple Scribe, Pharisee", avatar: "📜", bibleRef: "Mark 12:28–34 — a scribe who asks about the greatest commandment" },
    { id: "pharisee", name: "Nathanael", role: "Pharisee, Herodian ally", avatar: "🧣", bibleRef: "Matthew 22:15–22 — the Pharisees and Herodians on the tax question" },
  ],

  evidencePool: [
    {
      id: "question_scroll",
      name: "The Formal Authority Challenge",
      type: "analytical",
      icon: "📜",
      location: "Temple East Portico",
      desc: "A written record of the formal challenge: 'By what authority do you do these things? Who gave you this authority?' Signed with three priestly seals. This was an official delegated challenge, not a spontaneous question.",
      bibleRef: "Matthew 21:23 — 'When he entered the temple, the chief priests and the elders of the people came up to him as he was teaching.'",
      propheticLink: "Malachi 3:1 predicted the Lord coming to His temple with authority. The irony of the challenge is that they were asking for credentials from the very One whose authority derived directly from God.",
      investigatorNote: "Three seals: the High Priest, the Chief Scribe, the Council Elder. This was planned, not spontaneous.",
    },
    {
      id: "parable_fragments",
      name: "Sketch of the Vineyard Parable",
      type: "physical",
      icon: "🏺",
      location: "Temple West Portico, Ground",
      desc: "Pieces of broken pottery with rough sketches scratched into them — a vineyard, a watchtower, figures being thrown out. A bystander was illustrating what they were hearing to someone who couldn't see. The Isaiah 5 imagery is unmistakable.",
      bibleRef: "Matthew 21:33–45 — the Parable of the Wicked Tenants",
      propheticLink: "Isaiah 5:1–7 is the Song of the Vineyard — God's lament over Israel's unfaithfulness. Jesus deliberately echoed it. The bystander sketching this recognised the connection immediately.",
      investigatorNote: "These fragments show a bystander who understood the parable's OT reference. The religious leaders would have recognised it instantly — and been publicly shamed.",
    },
    {
      id: "cornerstone_carving",
      name: "Rejected Cornerstone Fragment",
      type: "physical",
      icon: "🪨",
      location: "Temple South Wall, Construction Debris",
      desc: "A piece of rejected limestone — the kind cut, shaped, and discarded during the Temple's renovation. Workers have been leaving such stones for years. But on this piece, someone has carved the Hebrew word 'pinnah' — 'cornerstone.' It is from Psalm 118:22.",
      bibleRef: "Matthew 21:42 — 'Jesus said to them, Have you never read in the Scriptures: The stone the builders rejected has become the cornerstone?'",
      propheticLink: "Psalm 118:22–23 was a coronation Psalm, used at Temple dedications. Jesus quoted it at the very Temple whose builders were rejecting Him. The rejected stone lying in the construction debris became a powerful object lesson for anyone listening.",
      investigatorNote: "Someone scratched 'pinnah' onto a discarded stone and left it here. A disciple? A bystander who understood? Or was it already there — providentially?",
    },
    {
      id: "coin_of_caesar",
      name: "Denarius of Tiberius Caesar",
      type: "physical",
      icon: "🪙",
      location: "Temple Court Floor, Near Treasury Entrance",
      desc: "A silver denarius coin bearing the image of Tiberius Caesar and the inscription 'TIBERIUS CAESAR, SON OF THE DIVINE AUGUSTUS.' A Pharisee dropped it — or left it deliberately — near the treasury entrance.",
      bibleRef: "Matthew 22:19–21 — 'Show me the coin used for paying the tax... Whose image is this? And whose inscription? Caesar's, he replied. Then he said to them, Give back to Caesar what is Caesar's, and to God what is God's.'",
      propheticLink: "The coin bore Caesar's image (imago). Jesus's answer pointed to something deeper: humanity bears God's image (Genesis 1:26–27, imago Dei). The coin question about taxation became a profound statement about identity and allegiance — Caesar's image on metal; God's image on people.",
      investigatorNote: "The Pharisees and Herodians brought this coin specifically to trap Him. They never expected His answer to turn the image question back onto every human being.",
    },
    {
      id: "fig_leaf_withered",
      name: "Withered Fig Leaf",
      type: "environmental",
      icon: "🍂",
      location: "Jerusalem-Bethany Road, Near the Temple Gate",
      desc: "A withered, blackened fig leaf — from the tree Jesus cursed the previous morning. Peter had pointed it out earlier: 'Rabbi, look! The fig tree you cursed has withered.' The leaf has been kept as a testimony to what was seen.",
      bibleRef: "Mark 11:20–21 — 'In the morning, as they went along, they saw the fig tree withered from the roots.'",
      propheticLink: "Micah 7:1 and Jeremiah 8:13 both use a barren fig tree as a symbol for Israel's spiritual fruitlessness. Hosea 9:10 says 'Like grapes in the wilderness, I found Israel.' The withered tree was a living parable — the judgement Jesus described in His Temple parables had already begun in miniature on the roadside.",
      investigatorNote: "The withered fig tree and the Temple parables interpret each other. Both speak of outward religious appearance with no real fruit.",
    },
    {
      id: "widow_two_coins",
      name: "Two Leptons (Widow's Mites)",
      type: "physical",
      icon: "💵",
      location: "Temple Treasury Contribution Chests",
      desc: "Two tiny bronze lepton coins — the smallest denomination in circulation, worth a fraction of a penny. They were deposited in the Treasury by a widow, observed by Jesus and several disciples. The treasurer has logged them alongside substantial gifts from wealthy donors.",
      bibleRef: "Mark 12:41–44 — 'Calling his disciples to him, Jesus said, Truly I tell you, this poor widow has put more into the treasury than all the others.'",
      propheticLink: "1 Samuel 16:7 — 'Man looks at the outward appearance, but the LORD looks at the heart.' The widow's offering is the practical demonstration of everything Jesus had been teaching against the religious leaders' showy piety. She gave all she had (100%); the wealthy gave from their surplus.",
      investigatorNote: "The widow's two coins appear after the Seven Woes against the Pharisees (Matthew 23). Jesus used her as a living counter-example: this is what genuine faith looks like, next to the performance the religious leaders were offering.",
    },
    {
      id: "witness_scroll",
      name: "Temple Bystander's Written Account",
      type: "testimonial",
      icon: "📋",
      location: "Temple North Portico",
      desc: "A written eyewitness account from a devout Jew who was present: 'He answered every question. The Pharisees about taxes. The Sadducees about resurrection. The scribes about the Law. At the end, He asked them whose son is the Christ — and not one of them could answer. Then no man dared question him again.' Signed: 'A God-fearer from Alexandria.'",
      bibleRef: "Matthew 22:46 — 'No one could say a word in reply, and from that day on no one dared to ask him any more questions.'",
      propheticLink: "Isaiah 11:2 promised the Messiah would have the 'Spirit of wisdom and understanding, the Spirit of counsel and might' — He would answer every challenge with perfect insight. The progressive silencing of each religious faction across one morning is the fulfilment of this promise made 700 years earlier.",
      investigatorNote: "The witness is from Alexandria — an educated diaspora Jew well-versed in both Scripture and rhetoric. His assessment is clear: Jesus did not evade their questions. He answered them and won.",
    },
  ],

  npcs: [
    {
      id: "chief_priest",
      name: "Caiaphas",
      avatar: "👨‍⚖️",
      truthfulness: 0.55,
      bibleRef: "Matthew 21:23; John 11:49–52; Matthew 26:57–68",
      background: "Joseph ben Caiaphas has been High Priest since AD 18 — appointed by the Roman prefect, dependent on Roman goodwill to remain in office. He is theologically Sadducean (denies resurrection, angels, and spirits — Acts 23:8) and politically calculating. He famously said it was 'better for one man to die for the people than for the whole nation to perish' (John 11:50) — not realising he was prophesying.",
      dialogue: {
        neutral: "We asked a legitimate question. A teacher claiming this level of authority in the Temple has an obligation to present his credentials.",
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
      avatar: "📜",
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
      avatar: "🧣",
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
  ],

  deductions: {
    "question_scroll+witness_scroll": {
      compare: {
        text: "The formal authority challenge and the eyewitness account together confirm the scope of what happened: three separate factions (priests, Pharisees-Herodians, Sadducees) attempted coordinated challenges across one morning — and all were silenced.",
        insight: "Isaiah 11:2 promised the Messiah would have wisdom to answer all challenges. The witness account documents this happening: 'no one dared ask him any more questions.' The fulfilment was public, documented, and witnessed by a diverse crowd.",
        isKey: true,
        bibleRef: "Matthew 22:46; Isaiah 11:2",
      },
    },
    "parable_fragments+cornerstone_carving": {
      link: {
        text: "The vineyard parable fragments (echoing Isaiah 5) and the cornerstone carving (Psalm 118:22) both relate to Jesus's teaching against the religious leaders — drawn from the same block of Scripture.",
        insight: "Jesus was doing deliberate intertextual theology: Isaiah 5's rejected vineyard + Psalm 118's rejected stone = the same prophetic story told two ways. The religious leaders were the unfaithful tenants and the builders who rejected the cornerstone simultaneously.",
        isKey: true,
        bibleRef: "Matthew 21:33–42; Isaiah 5:1–7; Psalm 118:22",
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
    culprit: "none",
    motive: "There was no crime. Three religious factions — the priestly establishment, the Pharisee-Herodian coalition, and the Sadducees — mounted coordinated attempts to trap Jesus in His words. Each attempt failed. Jesus's responses revealed His authority, their hypocrisy, and the depth of His scriptural knowledge.",
    method: "Jesus responded to the authority challenge with a counter-question that paralysed the delegation. He then taught three parables (Two Sons, Wicked Tenants, Wedding Banquet) that placed judgement on the religious establishment. Each subsequent question — taxes, resurrection, the greatest commandment, and finally whose son the Christ is — was answered with such precision that by midday 'no one dared ask him any more questions.'",
    lesson: "The Temple challenges show that Jesus's authority was not human — it was divine. He quoted Psalm 118:22 at the very people who were rejecting Him, Isaiah 5 at the people who considered themselves God's faithful caretakers, and Daniel 7:13 at His trial. Every challenge became an opportunity for prophetic fulfilment. The question was never whether Jesus had authority. The question was whether they would accept it.",
    prophesyFulfilled: ["Psalm 118:22–23", "Isaiah 5:1–7", "Daniel 7:13–14", "Malachi 3:1", "Isaiah 11:2"],
    furtherReading: ["Matthew 21:23–22:46", "Mark 11:27–12:44", "Luke 20:1–21:4"],
  },
};

