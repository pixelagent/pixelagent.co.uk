

// ============================================================
// CASE: The Empty Tomb  — difficulty 3 — Garden
// BIBLICAL FOCUS: Matthew 28:1–10, Mark 16:1–8, Luke 24:1–12, John 20:1–18
// PROPHECY: Psalm 16:10, Hosea 6:2, Jonah 1:17/Matt 12:40, Isaiah 53:10–11
// ============================================================

export const act4Case = {
  id: "resurrection",
  title: "The Empty Tomb",
  subtitle: "The sealed tomb is open. The body is gone. The guards have fled. What happened on the third day?",
  location: "garden",
  difficulty: 3,
  requires: "last_supper",

  biblicalContext: {
    summary: `Early on Sunday morning, Nisan 17, three days after the crucifixion, Mary Magdalene came to the tomb in the garden near Golgotha. She found the stone rolled away, the tomb empty, and — according to John's Gospel — initially thought the body had been stolen (John 20:2). But as the morning unfolded, multiple witnesses reported encounters with a risen Jesus: first Mary Magdalene alone (John 20:11–18), then the other women (Matthew 28:9–10), then Peter (1 Corinthians 15:5), then two disciples on the Emmaus road (Luke 24:13–35), and finally the eleven apostles in a locked room (John 20:19–23).`,
    significance: `The resurrection is the pivotal claim of Christianity. Paul wrote: 'If Christ has not been raised, your faith is futile' (1 Corinthians 15:17). But it was also the most precisely predicted event in the Passion narrative — Psalm 16:10, Hosea 6:2, Jonah 1:17, and Isaiah 53:10–11 all pointed toward it. Jesus himself predicted it three times (Matthew 16:21, 17:23, 20:19). The evidence at the tomb — the folded linens, the rolled stone, the guard report — all points toward something for which 'theft' is an inadequate explanation.`,
    historicalNote: `The tomb was a wealthy man's tomb — Joseph of Arimathea's, hewn from rock in the garden near Golgotha (John 19:41). This fulfilled Isaiah 53:9 ('buried with the rich'). A large stone (Greek: lithos) sealed the entrance — estimates suggest it weighed 1–2 tonnes. The Roman guard (koustodia) was a 4–16 man unit assigned to prevent exactly the situation they now had to report. Matthew 28:11–15 records that the chief priests bribed the soldiers to say the disciples stole the body while they slept — a story with obvious problems: soldiers asleep on duty faced execution; if they were asleep, how did they see what happened?`,
  },

  prophecies: [
    {
      reference: "Psalm 16:10",
      text: `"For you will not abandon my soul to Sheol, or let your holy one see corruption."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus rising before His body could decay, leaving only the burial linens",
      gospelLink: "Acts 2:27–31 — Peter quotes Psalm 16:10 at Pentecost and explicitly applies it to Jesus's resurrection",
      insight: "David wrote Psalm 16 in first person, but Acts 2:29–31 records Peter explaining that David was a prophet who 'seeing what was ahead, spoke about the resurrection of the Messiah, that he was not abandoned to the realm of the dead, nor did his body see decay.' The empty tomb is the physical evidence of this 1,000-year-old promise kept.",
    },
    {
      reference: "Hosea 6:2",
      text: `"After two days he will revive us; on the third day he will restore us, that we may live in his presence."`,
      written: "~750 BC",
      fulfilledBy: "Jesus rising on the third day after crucifixion",
      gospelLink: "1 Corinthians 15:4 — Paul writes the resurrection happened 'according to the Scriptures,' citing the third-day pattern",
      insight: "Jesus predicted His own third-day resurrection three times in the Gospels (Matthew 16:21, 17:23, 20:19). He drew on the pattern of Hosea 6:2 and the sign of Jonah (Jonah 1:17, Matthew 12:40). Paul's use of 'according to the Scriptures' (1 Corinthians 15:3–4) is the earliest written attestation that the church understood the resurrection as prophetic fulfilment.",
    },
    {
      reference: "Jonah 1:17 / Matthew 12:40",
      text: `"For just as Jonah was three days and three nights in the belly of the great fish, so will the Son of Man be three days and three nights in the heart of the earth."`,
      written: "~800 BC / AD 28",
      fulfilledBy: "Jesus's three days in the tomb, followed by resurrection",
      gospelLink: "Matthew 12:40 — Jesus explicitly identifies Himself with Jonah when challenged for a sign",
      insight: "This is one of the most precise self-fulfilling prophecies in Scripture — Jesus named His own death and resurrection timing using the Jonah metaphor when challenged by Pharisees for miraculous proof. The empty tomb on the third day was the 'sign of Jonah' He had promised.",
    },
    {
      reference: "Isaiah 53:10–11",
      text: `"Yet it was the will of the LORD to crush him; he has put him to grief; when his soul makes an offering for guilt, he shall see his offspring and prolong his days... After his anguish he shall see light and be satisfied."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's resurrection — 'prolonging his days' after the sacrifice; 'seeing light' after death",
      gospelLink: "John 20:11–18; Luke 24:13–35 — Jesus appears alive after the suffering",
      insight: "The Suffering Servant song of Isaiah 53 contains a remarkable internal paradox: the servant is 'cut off from the land of the living' (v.8), assigned a grave (v.9), and yet he 'shall see his offspring and prolong his days' (v.10). The only way to reconcile these statements is resurrection. Jesus's post-resurrection appearances fulfilled Isaiah's paradox.",
    },
    {
      reference: "Psalm 22:1–31",
      text: `"My God, my God, why have you forsaken me?... They will come and proclaim his righteousness, declaring to a people yet unborn: He has done it!"`,
      written: "~1000 BC",
      fulfilledBy: "Psalm 22 begins with the crucifixion cry (v.1, quoted by Jesus from the cross) and ends with resurrection proclamation (v.31)",
      gospelLink: "Matthew 27:46 (crucifixion); the closing verses of Psalm 22 look beyond the suffering to vindication",
      insight: "Psalm 22 is a remarkable document: it begins with abandonment and describes crucifixion details (hands and feet pierced, v.16; garments divided by lots, v.18) before ending in triumphant proclamation. The Psalm is both a lament and a resurrection song — which is why Jesus quoted its opening from the cross, perhaps pointing His listeners to its ending.",
    },
  ],

  intro: `It is early Sunday morning, Nisan 17. Three women — Mary Magdalene, Mary the mother of James, and Salome — have come to the garden tomb at first light to complete the anointing of Jesus's body. They were worried about who would roll the stone away. But when they arrive: the stone is already moved. The Roman guard post is abandoned. The tomb is open, and empty. Two strange figures in white are inside. And then — Mary Magdalene sees someone she mistakes for the gardener, until He speaks her name. You are the investigative scribe. What happened here? And can the evidence in this garden account for the most important claim in history?`,

  suspects: [
    { id: "mary_magdalene", name: "Mary Magdalene", role: "Disciple, First Witness", avatar: "👩", bibleRef: "John 20:1–18; Mark 16:9" },
    { id: "marcus", name: "Marcus", role: "Roman Soldier, Guard Detail", avatar: "🛡️", bibleRef: "Matthew 27:62–66; 28:11–15" },
    { id: "joseph", name: "Joseph of Arimathea", role: "Secret Disciple, Tomb Owner", avatar: "🧓", bibleRef: "Matthew 27:57–61; John 19:38–42" },
  ],

  evidencePool: [
    {
      id: "rolled_stone",
      name: "The Displaced Sealing Stone",
      type: "physical",
      icon: "🗿",
      location: "Tomb Entrance, Garden of Joseph",
      desc: "A massive circular limestone stone — estimated at 1–2 tonnes — has been rolled away from the tomb entrance and sits to the side, not rolled down the slope but resting beside it. The sealing wax from the Roman official seal is broken.",
      bibleRef: "Matthew 28:2 — 'There was a violent earthquake, for an angel of the Lord came down from heaven and, going to the tomb, rolled back the stone and sat on it.'",
      propheticLink: "Isaiah 26:19 — 'Your dead will live, LORD; their bodies will rise — let those who dwell in the dust wake up and shout for joy.' The removal of the stone was not to let Jesus out — a resurrected, glorified body passed through locked doors (John 20:19). The stone was rolled away so witnesses could look in.",
      investigatorNote: "A 2-tonne stone moved uphill, not downhill. No marks suggesting ropes or levers. The Roman guard seal is broken from outside the tomb.",
    },
    {
      id: "empty_tomb",
      name: "The Empty Burial Chamber",
      type: "physical",
      icon: "🕳️",
      location: "Interior of Joseph's Tomb",
      desc: "The tomb is completely empty except for the burial wrappings. No body, no signs of struggle, no disturbance of the surrounding grave goods. The shelf where Jesus lay is bare. The wall niches are untouched.",
      bibleRef: "Luke 24:3 — 'When they entered, they did not find the body of the Lord Jesus.'",
      propheticLink: "Psalm 16:10 — 'You will not let your holy one see corruption.' The empty tomb is the physical evidence that the Psalm's promise was kept. A body left long enough shows decomposition; no such evidence exists.",
      investigatorNote: "No disturbance to the grave goods. No signs of a struggle. No evidence of the organised haste a grave robbery would require. The space is orderly.",
    },
    {
      id: "burial_linen",
      name: "Folded Burial Linens",
      type: "physical",
      icon: "🧻",
      location: "Burial Shelf, Inside the Tomb",
      desc: "The linen strips that wrapped Jesus's body are still present, lying where the body was — not unwrapped and discarded, but apparently lying in the exact shape the body had been, as if it had simply passed through them. The face cloth is separately folded and placed to one side.",
      bibleRef: "John 20:6–8 — 'He saw the strips of linen lying there, as well as the cloth that had been wrapped around Jesus' head. The cloth was still lying in its place, separate from the linen.'",
      propheticLink: "John's Gospel records that the 'other disciple' (John) 'saw and believed' specifically because of how the linens were arranged. A body stolen hastily would leave disordered linens or none at all. The orderly, structured arrangement of the grave cloths pointed to something other than grave robbery.",
      investigatorNote: "If grave robbers unwrapped the body to carry it out more easily, why leave the wrappings so neatly? If they took the body still wrapped, why are the linens here at all? The linen arrangement defies theft as an explanation.",
    },
    {
      id: "angelic_witness",
      name: "The Angelic Proclamation",
      type: "testimonial",
      icon: "✨",
      location: "Inside the Tomb / Seated on the Stone",
      desc: "Multiple witnesses independently report seeing one or two figures in white — described as 'like lightning' in appearance — at or inside the tomb. Each gives a consistent message: 'He is not here. He has risen, just as he said. Come and see the place where he lay.'",
      bibleRef: "Matthew 28:2–7; Mark 16:5–7; Luke 24:4–7; John 20:12–13",
      propheticLink: "Psalm 103:20 describes angels as those who 'do his bidding.' The angelic announcement at the tomb echoes the angelic announcements at the nativity — both bookend Jesus's earthly life with heavenly proclamation. The consistency of the message across all four Gospel accounts, with slight variations in detail (one angel or two?), reflects the characteristics of independent eyewitness testimony.",
      investigatorNote: "Four independent accounts agree on the core message. The small variations (one angel/two angels; inside or outside) are consistent with the kind of variation seen in genuine eyewitness reports, not coordinated fabrication.",
    },
    {
      id: "guard_report",
      name: "The Soldiers' Broken Report",
      type: "analytical",
      icon: "📋",
      location: "Roman Guard Post, Outer Garden",
      desc: "A shattered wax tablet from the guard log — only partially legible: '...seismos... phos... ekphobothesan... nekroi...' ('earthquake... light... we became as dead men...'). The soldiers have fled their post. An official report was filed later — but the chief priests are paying the soldiers to alter their account.",
      bibleRef: "Matthew 28:2–4 — 'The guards shook for fear of him and became like dead men.' Matthew 28:11–15 — the chief priests bribed the guards to say the disciples had stolen the body.",
      propheticLink: "The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event.",
      investigatorNote: "Soldiers asleep on duty faced execution under Roman military law. If they were asleep, they couldn't know what happened. If they were awake, they witnessed something they couldn't explain. The bribery is itself evidence that the authorities knew the disciples hadn't stolen the body.",
    },
    {
      id: "spice_jars",
      name: "Unused Burial Spices",
      type: "physical",
      icon: "🧴",
      location: "Entrance to the Tomb Garden",
      desc: "Three clay jars of prepared burial spices — myrrh, aloe, and cinnamon — set down at the garden entrance, unopened. The women brought them to complete the anointing of the body, but they were never used.",
      bibleRef: "Mark 16:1 — 'Mary Magdalene, Mary the mother of James, and Salome bought spices so that they might go to anoint Jesus's body.'",
      propheticLink: "Nicodemus had already brought 75 pounds of myrrh and aloes for the burial (John 19:39–40), fulfilling the wealthy burial of Isaiah 53:9. The women's additional spices were for the anointing ritual completed after the Sabbath — but there was no body to anoint. The unused jars are a symbol of an interrupted mourning, halted by resurrection.",
      investigatorNote: "Women who had watched the crucifixion and burial now find the tomb empty. Their grief was real. Their testimony carries the weight of witnesses who had no reason to fabricate — and everything to lose by making the claim.",
    },
    {
      id: "mary_encounter",
      name: "Mary Magdalene's Testimony",
      type: "testimonial",
      icon: "👁️",
      location: "Garden, Near the Tomb Entrance",
      desc: "Mary Magdalene's first-person account, recorded by John: 'I saw the Lord.' She had initially mistaken the risen Jesus for the gardener. He said one word — her name: 'Mary.' She turned and recognised Him. 'Rabboni!' He told her not to cling to Him, for He had not yet ascended to the Father, and sent her to tell the disciples.",
      bibleRef: "John 20:11–18 — the most detailed and intimate resurrection appearance account in Scripture.",
      propheticLink: "Isaiah 43:1 — 'I have called you by name; you are mine.' The risen Christ's first post-resurrection act was to call a woman by name — the same woman from whom He had cast seven demons (Luke 8:2). His resurrection announcement went first to the most socially marginalised witness — deliberate and counter-cultural. In a Roman court, a woman's testimony was inadmissible. If the disciples were fabricating a resurrection, they would not have made a woman — and a former demoniac — the primary witness.",
      investigatorNote: "The fact that Mary Magdalene is the primary resurrection witness is powerful evidence of authenticity. No first-century Jewish or Roman author inventing a resurrection story would choose a woman as the lead witness. This detail is counterproductive to fabrication — which is exactly why it's credible.",
    },
  ],

  npcs: [
    {
      id: "mary_magdalene",
      name: "Mary Magdalene",
      avatar: "👩",
      truthfulness: 0.98,
      bibleRef: "John 20:1–18; Mark 16:9; Luke 8:1–3",
      background: "Mary Magdalene was from Magdala on the Sea of Galilee. Luke 8:2 records that Jesus had cast seven demons from her — making her one of the most dramatic examples of His healing ministry. She subsequently became one of His most devoted followers, one of the women who funded His ministry (Luke 8:3), and one of the few disciples present at the crucifixion (John 19:25). She is the first witness to the resurrection.",
      dialogue: {
        neutral: "I came to the tomb before dawn. I needed to be there. I had to finish what we couldn't do before the Sabbath.",
        cautious: "The stone was moved. I didn't wait — I ran to find Peter and John. I thought someone had taken Him.",
        pressured: "When I came back, I stayed at the tomb, weeping. I looked inside and saw two figures in white where His body had been. They asked me why I was weeping.",
        exposed: "Then I turned around and there was a man standing there. I thought He was the gardener. He asked me who I was looking for. And then He said my name — 'Mary.' Just like that. And I knew. I fell at His feet. He was alive.",
        repeat: "I saw Him. I spoke to Him. I don't expect everyone to believe me. But I know what I saw.",
      },
      reactions: {
        burial_linen: { text: "The grave cloths were lying there, shaped like a body but empty. Peter went straight in and stood there, confused. But John went in after him and he saw and believed. I think the cloths told him something the rest of us weren't ready to understand yet.", isLie: false },
        angelic_witness: { text: "Two figures — like bright light. They asked me, 'Woman, why are you weeping?' I said, 'They have taken my Lord, and I don't know where they have laid him.' And then I turned around.", isLie: false },
        spice_jars: { text: "I set them down when I saw the stone was moved. I didn't need them anymore — but I didn't know that yet. I just stood there staring.", isLie: false },
        mary_encounter: { text: "He called my name. That's all it took. 'Mary.' I knew His voice. I knew it the way I knew my own name. Three years I'd been with this man. He was dead — I watched Him die — and there He stood. What would you have done?", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "marcus",
      name: "Marcus",
      avatar: "🛡️",
      truthfulness: 0.6,
      bibleRef: "Matthew 27:62–66; 28:2–4; 28:11–15",
      background: "A Roman legionary assigned to the tomb guard detail — koustodia, a specialised guard unit. He was present at the supernatural event, has filed a report, and is now caught between his military duty to report accurately and the bribe from the chief priests to lie. He knows the official story is false. He is afraid.",
      dialogue: {
        neutral: "I was on duty. There was an earthquake. A light. And then... nothing. We were assigned elsewhere after that.",
        cautious: "The official report is that the disciples came while we slept and stole the body. That is the statement I have authorised.",
        pressured: "I would face military discipline if I contradicted my commanding officer's official statement. I have a family in Rome.",
        exposed: "We didn't sleep. What happened at that tomb — I have no words for it. The light was like nothing I have ever seen in fifteen years of military service. We fell like dead men. When we got up, the stone was moved and the tomb was open. We didn't touch anything. We ran.",
        repeat: "My official statement stands. Whatever you think you know, leave it alone.",
      },
      reactions: {
        rolled_stone: { text: "We didn't move the stone. No human being moved that stone. I was four metres away when it happened.", isLie: false },
        guard_report: { text: "That tablet is from my post. The legible words are accurate — earthquake, light, we became as dead men. The chief priests paid us afterward to change our account. I'm telling you this once, and then it never happened.", isLie: false, revealedClue: "burial_linen" },
        empty_tomb: { text: "The tomb was sealed when our watch began Friday evening. The seal was intact at the start of the final watch. And then it wasn't.", isLie: false },
        angelic_witness: { text: "I don't have a word for what I saw in the Roman tradition. In the Jewish tradition, I believe they call it an angel. Whatever it was — it was not human.", isLie: false },
      },
      contradictions: {
        "guard_report+rolled_stone": { exposed: "You want me to say it plainly? Nothing human moved that stone. Nothing human caused that light. Nothing human emptied that tomb. I've guarded crucifixion sites. I've handled bodies. The disciples? Twelve frightened men who scattered when he was arrested? They couldn't have done this. Whatever happened in that garden — I am going to spend the rest of my life trying to forget it." },
      },
    },
    {
      id: "joseph",
      name: "Joseph of Arimathea",
      avatar: "🧓",
      truthfulness: 0.9,
      bibleRef: "Matthew 27:57–61; Mark 15:43–47; Luke 23:50–56; John 19:38–42",
      background: "Joseph of Arimathea is a wealthy member of the Sanhedrin who had privately opposed the vote to condemn Jesus (Luke 23:51). He is described as 'waiting for the Kingdom of God' (Mark 15:43) — and after the crucifixion, he risked his reputation by going publicly to Pilate to ask for the body. He provided his own newly cut tomb in the garden. Nicodemus came with him, bringing 75 pounds of burial spices (John 19:39).",
      dialogue: {
        neutral: "I provided this tomb for Him. I have no regrets about that, regardless of what the council thinks of me.",
        cautious: "I was a member of the Sanhedrin. I know what the official position is. I also know what I put into that tomb and what the stone looked like when it was sealed.",
        pressured: "Nicodemus and I wrapped the body ourselves. We prepared it according to Jewish custom with myrrh and aloes. We placed Him in this tomb and watched the stone rolled shut. I know what was there.",
        exposed: "And now it is gone. The linens are there. The tomb is open. I walked inside this morning. I stood where I placed Him. And I find I am no longer grieving the way I expected to.",
        repeat: "What I believe about what happened — that is my own business. What I can tell you is what I saw with my own eyes.",
      },
      reactions: {
        burial_linen: { text: "I chose those linens myself. The finest cloth I could obtain quickly before the Sabbath began. I know how we wrapped Him. What remains in that tomb — the linens haven't been unwrapped. They're still in the shape He was in. I can't explain that.", isLie: false },
        spice_jars: { text: "Nicodemus brought seventy-five pounds of myrrh and aloes (John 19:39). That fulfilled Isaiah 53:9 — the rich burial the prophet described. These jars the women brought were additional. None of it was used this morning.", isLie: false },
        rolled_stone: { text: "I watched four men seal that stone and apply the Roman wax. It took all four of them to move it. This morning it's beside the entrance as if resting there, not rolled or fallen — placed. Something placed it there.", isLie: false },
        empty_tomb: { text: "I am a wealthy man with many resources at my disposal. I buried Him in my own tomb. I had every reason to know exactly what was in that tomb, and I had every resource to investigate if something had been moved. The body is gone. The linens remain. I do not believe it was stolen.", isLie: false },
      },
      contradictions: {
        "burial_linen+rolled_stone": { exposed: "You want to know what I think? I've read Psalm 16:10. 'You will not let your holy one see corruption.' I read it as poetry before. I was wrong. The linens are arranged as if a body simply passed through them. The stone is resting, not tumbled. And Joseph's testimony about the guard — no one slept through that. This tomb is empty. He said it would be. I am beginning to believe He was right." },
      },
    },
  ],

  deductions: {
    "rolled_stone+guard_report": {
      compare: {
        text: "The displaced 2-tonne stone and the soldiers' broken report ('earthquake... light... we became as dead men') both point to a single event: something of enormous power at the tomb entrance, in the middle of the night.",
        insight: "A stone that size cannot be moved silently by frightened men (the disciples) past an armed guard. The guards' own account — corroborated by the fact that the chief priests had to bribe them — confirms they witnessed something they could not explain, not an organised grave robbery.",
        isKey: true,
        bibleRef: "Matthew 28:2–4; Matthew 28:11–15",
      },
      link: {
        text: "The bribery of the guards (Matthew 28:12–15) is itself evidence that the authorities knew the disciples hadn't stolen the body. You don't pay soldiers to lie about sleeping unless the truth — that they saw something — would be worse.",
        insight: "The chief priests' response to the resurrection was not to produce the body (which would have ended Christianity immediately) — but to manufacture an alternative story. The inability to produce the body is the strongest institutional evidence for the resurrection.",
        isKey: true,
        bibleRef: "Matthew 28:11–15",
      },
    },
    "empty_tomb+burial_linen": {
      compare: {
        text: "An empty tomb and orderly, in-situ burial linens together rule out the most plausible alternative: theft. Grave robbers stealing a body would either leave the linens in disarray (if they unwrapped the body inside) or take the linens with the body (if they carried it wrapped).",
        insight: "John's Gospel specifically says that the 'beloved disciple' saw the burial cloths and 'believed' (John 20:8). The arrangement of the linens was itself a witness to something beyond grave robbery. Joseph of Arimathea's testimony confirms the linens are arranged as if the body passed through them.",
        isKey: true,
        bibleRef: "John 20:6–8; Psalm 16:10",
      },
    },
    "angelic_witness+mary_encounter": {
      compare: {
        text: "The angelic proclamation ('He is risen') and Mary Magdalene's personal encounter with the risen Jesus are independent reports of the same morning, converging on the same conclusion.",
        insight: "The choice of Mary Magdalene as the first resurrection witness is historically significant. Paul's 1 Corinthians 15 list of witnesses does not mention her — he is addressing a Roman legal context in which women's testimony was inadmissible. The Gospels record her testimony because it actually happened, not because it was strategically useful.",
        isKey: true,
        bibleRef: "John 20:11–18; Mark 16:9; 1 Corinthians 15:5–8",
      },
    },
    "spice_jars+burial_linen": {
      timeline: {
        text: "Timeline: Women prepared spices on Friday evening after the burial. Observed Sabbath Saturday. Arrived at dawn Sunday intending to anoint the body. Set spices down when they found the stone moved. Never used the spices.",
        insight: "The unused spices and untouched linens complete a picture: the body did not need to be anointed because it was no longer there. The linens did not need to be removed because whatever left them behind passed through them. The women's grief was real — their testimony carries the weight of people who had every emotional reason to want the body to still be there.",
        isKey: false,
        bibleRef: "Mark 16:1; John 19:39–40; Isaiah 53:9",
      },
    },
    "mary_encounter+guard_report": {
      contradict: {
        text: "The guard's account (supernatural light, earthquake, became as dead men) and Mary's account (mistook Jesus for the gardener, recognised Him by voice) are strikingly different experiences of the same morning — and together they are stronger evidence than either alone.",
        insight: "If the resurrection were fabricated, the disciples would likely have created a single, consistent, impressive account — not two wildly different experiences (terrifying supernatural power for the guards; a quiet garden conversation for Mary). The diversity of the accounts reflects genuine independent witnesses.",
        isKey: true,
        bibleRef: "Matthew 28:2–4; John 20:14–17",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no theft, no conspiracy, and no staged event. Jesus rose from the dead on the third day exactly as He had predicted, fulfilling centuries of prophetic writing. The evidence at the tomb — the orderly linens, the impossibly moved stone, the terrified guards, the independent witnesses, the inability of the authorities to produce a body — all points toward one conclusion.",
    method: "The resurrection was a supernatural act of God. The stone was moved not to release Jesus — who later appeared in locked rooms — but to allow witnesses to see the empty tomb. The burial linens remained in their position, undisturbed. Multiple independent witnesses encountered the risen Jesus across the day: Mary Magdalene in the garden, the other women on the road, Peter, the Emmaus disciples, and finally all the apostles in the locked room.",
    lesson: "The resurrection is the cornerstone of Christian faith — and the most prophetically anticipated event in the Bible. Psalm 16:10, Hosea 6:2, Isaiah 53:10–11, Jonah 1:17, and Jesus's own three predictions all pointed to this morning. The evidence is not that everyone immediately believed — Peter was confused, Thomas doubted, the guards lied — but that the tomb remained empty, the body was never produced, and witnesses continued to report encounters with a risen Jesus despite having no earthly incentive to do so under Roman persecution.",
    prophesyFulfilled: ["Psalm 16:10", "Hosea 6:2", "Jonah 1:17 / Matthew 12:40", "Isaiah 53:10–11", "Psalm 22:1–31", "Isaiah 26:19"],
    furtherReading: ["Matthew 28:1–20", "Mark 16:1–8", "Luke 24:1–53", "John 20:1–21:25", "1 Corinthians 15:1–58", "Acts 2:22–36"],
  },
};
