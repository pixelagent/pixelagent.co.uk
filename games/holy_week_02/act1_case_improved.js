// ============================================================
// CASE: The Missing Donkey  — difficulty 1 — Triumphal Entry
// BIBLICAL FOCUS: Matthew 21:1–11, Mark 11:1–11, Luke 19:28–44, John 12:12–19
// PROPHECY: Zechariah 9:9 | Psalm 118:25–26 | Genesis 49:10–11
// ============================================================

export const act1Case = {
  id: "triumphal_entry",
  title: "The Missing Donkey",
  subtitle: "A borrowed donkey has gone missing from Bethphage — but is it theft, or something far greater?",
  location: "jerusalem",
  difficulty: 1,
  requires: null,

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `On Nisan 10 (Palm Sunday), Jesus sent two disciples ahead to Bethphage to collect a donkey colt that had never been ridden. This was no coincidence — it was the precise fulfilment of a 500-year-old prophecy from Zechariah 9:9. The crowds who lined the road were waving palm branches (a symbol of Jewish national victory, last used during the Maccabean revolt), spreading cloaks on the road — royal carpet treatment — and crying "Hosanna!" (meaning "Save us now!"), quoting directly from Psalm 118:25–26.`,
    significance: `The triumphal entry deliberately echoed how King Solomon entered Jerusalem for his coronation (1 Kings 1:33–35), riding on a donkey down the Mount of Olives. Every Jewish bystander would have understood the royal claim being made. The Pharisees were alarmed: "Look, the whole world has gone after him!" (John 12:19).`,
    historicalNote: `Bethphage was a small priestly village on the Mount of Olives, roughly 1km from Jerusalem. It sat on the boundary of Jerusalem's sacred precincts. Jesus's knowledge of where the donkey was — and the pre-arranged answer for anyone who questioned the disciples ("The Lord needs it") — suggests either divine foreknowledge or a pre-arrangement with a sympathiser, though Scripture presents it as prophetic foreknowledge.`,
  },

  prophecies: [
    {
      reference: "Zechariah 9:9",
      text: `"Rejoice greatly, O daughter of Zion! Shout aloud, O daughter of Jerusalem! Behold, your king is coming to you; righteous and having salvation is he, humble and mounted on a donkey, on a colt, the foal of a donkey."`,
      written: "~520 BC",
      fulfilledBy: "Jesus riding a donkey colt into Jerusalem",
      gospelLink: "Matthew 21:4–5; John 12:14–15",
      insight: "The donkey was not a practical choice — Roman rulers rode horses. The donkey was a deliberate symbol of peace and humility, contrasted with conquering kings on warhorses.",
    },
    {
      reference: "Psalm 118:25–26",
      text: `"Save us, we pray, O LORD! O LORD, we pray, give us success! Blessed is he who comes in the name of the LORD!"`,
      written: "~1000 BC",
      fulfilledBy: "The crowds shouting 'Hosanna! Blessed is he who comes in the name of the Lord!'",
      gospelLink: "Matthew 21:9; Mark 11:9–10",
      insight: "'Hosanna' is the Greek transliteration of the Hebrew 'Hoshana' — a cry for salvation, not merely praise. The crowd was quoting this Psalm as a messianic greeting.",
    },
    {
      reference: "Genesis 49:10–11",
      text: `"The scepter shall not depart from Judah... binding his foal to the vine and his donkey's colt to the choice vine."`,
      written: "~1400 BC",
      fulfilledBy: "A king from Judah arriving on a donkey colt",
      gospelLink: "Matthew 21:1–9",
      insight: "Jacob's blessing over Judah, over 1,400 years before the event, described a royal figure arriving on a donkey colt. Early Jewish readers interpreted this as messianic.",
    },
    {
      reference: "Malachi 3:1",
      text: `"Behold, I send my messenger, and he will prepare the way before me. And the Lord whom you seek will suddenly come to his temple."`,
      written: "~430 BC",
      fulfilledBy: "Jesus's arrival in Jerusalem preceding His Temple visit (Mark 11:11)",
      gospelLink: "Mark 11:11",
      insight: "The 'coming to the temple' link connects the triumphal entry with the Temple cleansing the following day — two acts that together announced prophetic fulfilment.",
    },
  ],

  intro: `It is Palm Sunday morning, Nisan 10. Jesus and His disciples have spent the night in Bethany and are now walking toward Jerusalem. Two disciples were sent ahead to the village of Bethphage with specific instructions: untie a donkey colt they would find there, and if anyone challenged them, say only "The Lord needs it." But when you arrive at the tethering post — the colt is gone, a rope has been cut, and three people were seen in the area. Was it stolen? Or is something else entirely happening here?`,

  suspects: [
    { id: "peter", name: "Peter", role: "Disciple of Jesus", avatar: "👨‍🦰", bibleRef: "Mark 11:1–6" },
    { id: "john", name: "John", role: "Disciple of Jesus", avatar: "👨‍🦰", bibleRef: "Luke 19:29–35" },
    { id: "owner", name: "Tobias", role: "Donkey Owner / Sympathiser", avatar: "👴", bibleRef: "Mark 11:3–6 (unnamed owner)" },
  ],

  evidencePool: [
    {
      id: "cloaks",
      name: "Two Disciples' Cloaks",
      type: "physical",
      icon: "👕",
      location: "Tethering Post, Bethphage Road",
      desc: "Two travelling cloaks left folded near the tethering post. The style matches garments worn by Galilean disciples.",
      bibleRef: "Mark 11:7 — 'They brought the colt to Jesus and threw their cloaks over it.'",
      propheticLink: "This mirrors 2 Kings 9:13 where cloaks were spread before King Jehu — a royal gesture the disciples repeated on the road to Jerusalem.",
      investigatorNote: "If the cloaks belong to the disciples, they were here. Why leave them behind?",
    },
    {
      id: "donkey_tracks",
      name: "Fresh Hoofprints",
      type: "physical",
      icon: "👣",
      location: "Mount of Olives Path, heading west toward Jerusalem",
      desc: "Clear hoofprints of a small donkey — a colt's prints, lighter than an adult's — lead down the western slope of the Mount of Olives toward Jerusalem.",
      bibleRef: "Luke 19:35–36 — 'As he rode along, people spread their cloaks on the road.'",
      propheticLink: "The route from the Mount of Olives into Jerusalem through the eastern gate mirrors the processional route described in Ezekiel 44:1–3, associated with the glory of God entering the city.",
      investigatorNote: "The prints are heading directly toward the road that pilgrims take into the city for Passover.",
    },
    {
      id: "witness_account",
      name: "Villager's Testimony",
      type: "testimonial",
      icon: "👂",
      location: "Bethphage Village Square",
      desc: "A local villager reports seeing two men untying the colt at dawn. When challenged — 'Why are you untying it?' — they answered: 'The Lord needs it.' The owner then nodded and let them go.",
      bibleRef: "Mark 11:3–6 — 'They answered as Jesus had told them to, and the people let them go.'",
      propheticLink: "Jesus's foreknowledge of the exact response to give is consistent with His omniscience, and mirrors how the Passover lamb was 'set apart' by divine instruction (Exodus 12:3–6).",
      investigatorNote: "Both the gospel accounts of Mark and Luke confirm this exchange happened exactly as predicted. This is not a theft.",
    },
    {
      id: "prophecy_scroll",
      name: "Zechariah 9:9 Scroll Fragment",
      type: "analytical",
      icon: "📜",
      location: "Tobias the Owner's Tent",
      desc: "A worn parchment scroll fragment with the text of Zechariah 9:9 — the prophecy of the king coming on a donkey. It has been marked, re-read, and shows signs of use over many years.",
      bibleRef: "Matthew 21:4–5 — 'This took place to fulfil what was spoken through the prophet.'",
      propheticLink: "Zechariah 9:9 was written around 520 BC. Zechariah himself arrived back in Judah after the Babylonian exile — a people who desperately needed a king. His vision of a humble, donkey-riding king was a hope that Jesus publicly claimed.",
      investigatorNote: "The owner kept this scroll. He knew this day might come. He was waiting.",
    },
    {
      id: "palm_branch",
      name: "Fresh-Cut Palm Branch",
      type: "environmental",
      icon: "🌴",
      location: "Road descending toward Jerusalem Gate",
      desc: "A freshly cut palm branch, still supple and green. Palms grew near Jericho, not on the Mount of Olives — someone carried this branch specifically for this occasion.",
      bibleRef: "John 12:13 — 'They took palm branches and went out to meet him, shouting, Hosanna! Blessed is the king of Israel!'",
      propheticLink: "In the Maccabean revolt (165 BC), palm branches were used to celebrate the Jewish people's liberation (1 Maccabees 13:51). The crowd was making a political and spiritual statement — this man is our king and deliverer.",
      investigatorNote: "The crowd was prepared. This was not a spontaneous moment — it had been anticipated.",
    },
    {
      id: "rope_fibers",
      name: "Cut Rope at the Tethering Post",
      type: "physical",
      icon: "🧵",
      location: "Stone Tethering Post, Bethphage",
      desc: "The rope used to tie the colt has been cut cleanly — not frayed or broken, suggesting deliberate untying or cutting with a tool. The knot style is a simple shepherd's hitch.",
      bibleRef: "Mark 11:2 — 'You will find a colt tied there, which no one has ever ridden. Untie it and bring it here.'",
      propheticLink: "Jesus specified it must be a colt 'no one has ever ridden' — in Jewish law, an animal used for sacred purposes must be one that has not been used for common work (Numbers 19:2; Deuteronomy 21:3). This detail proves the act was religiously intentional, not criminal.",
      investigatorNote: "A thief would cut a rope. A disciple would untie it carefully. The clean cut could go either way — unless you know the context.",
    },
    {
      id: "crowd_testimony",
      name: "Pharisee's Written Complaint",
      type: "analytical",
      icon: "⚖️",
      location: "Temple Authority Notice Board",
      desc: "A formal written complaint from the Pharisees: 'The Galilean has stirred up the whole city. The crowds are out of control. We can do nothing.' It references the donkey procession and the cries of 'Hosanna to the Son of David.'",
      bibleRef: "Luke 19:39–40 — The Pharisees said, 'Teacher, rebuke your disciples!' Jesus replied, 'If they keep quiet, the stones will cry out.'",
      propheticLink: "The Pharisees recognised the messianic implication of the palm branches and shouts. John 12:19 records their panic: 'Look how the whole world has gone after him!'",
      investigatorNote: "If the religious authorities were alarmed, this event was unmistakably public and significant. A stolen donkey doesn't cause this kind of reaction.",
    },
  ],

  npcs: [
    {
      id: "peter",
      name: "Peter",
      avatar: "👨‍🦰",
      truthfulness: 0.7,
      bibleRef: "Mark 11:1–7",
      background: "Simon Peter, a fisherman from Galilee, is one of the inner circle of three disciples (along with James and John). Passionate and impulsive, he speaks before thinking. He was one of the two sent to find the donkey.",
      dialogue: {
        neutral: "Jesus sent us to Bethphage. He told us exactly where to find the colt and what to say if anyone questioned us.",
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
        "witness_account+rope_fibers": { exposed: "Alright — I cut the rope. Not to steal anything, but the knot had been tied extra tight and I was in a hurry. We were supposed to be back before the main crowd arrived. Everything else happened exactly as Jesus said." },
        "prophecy_scroll+crowd_testimony": { exposed: "The owner knew. The Pharisees knew. The whole city knew what this meant. Jesus wasn't being subtle — He was making a public claim to be the prophesied king." },
      },
    },
    {
      id: "john",
      name: "John",
      avatar: "👨‍🦰",
      truthfulness: 0.9,
      bibleRef: "Luke 19:29–35",
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
      avatar: "👴",
      truthfulness: 0.95,
      bibleRef: "Mark 11:3–6 (the unnamed owner who releases the colt)",
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
  ],

  deductions: {
    "cloaks+prophecy_scroll": {
      compare: {
        text: "The disciples' cloaks were used as a saddle for the colt — an act of royal honour. The Zechariah scroll confirms this wasn't impulsive; it was a deliberate fulfilment of a written prophecy.",
        insight: "Zechariah 9:9 predicted a king arriving on a donkey. The disciples' actions — providing the colt, laying cloaks — were a conscious participation in prophecy fulfilment.",
        isKey: true,
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
