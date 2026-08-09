
import { formatIntro } from './utils.js';

// ============================================================
// ACT: IV — Resurrection
// CASE: The Empty Tomb
// CASE ID: resurrection
// CASE EXPORT: act4CaseA
// SOURCE: act4_case.js
//
// LOCATION:
// Garden Tomb, near Golgotha, outside the walls of Jerusalem
//
// DIFFICULTY:
// ★★★ (3/3)
//
// BACKGROUND:
// Early on the first day of the week, after the Sabbath, Mary Magdalene,
// Mary the mother of James, Salome, and other women came to the tomb to
// complete the burial anointing of Jesus' body. Instead they found the
// stone rolled away, the Roman guard scattered, and the tomb empty.
// Angels announced that Jesus had risen, and throughout the day He
// appeared to numerous witnesses including Mary Magdalene, the women,
// Peter, two disciples on the road to Emmaus, and later the apostles.
//
// BIBLE REFERENCES:
// Matthew 28:1–20
// Mark 16:1–8
// Luke 24:1–53
// John 20:1–21:25
// 1 Corinthians 15:3–8
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
// • Psalm 16:10 — God's Holy One would not see decay.
// • Hosea 6:2 — Restoration and life on the third day.
// • Jonah 1:17 / Matthew 12:40 — The sign of Jonah fulfilled.
// • Isaiah 53:10–11 — The Suffering Servant lives after His sacrifice.
// • Psalm 22:1–31 — Suffering gives way to victory and worldwide proclamation.
// • Isaiah 26:19 — Death gives way to resurrection and rejoicing.
// • Ezekiel 37:12–13 — Opened graves foreshadow God's victory over death.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
// Summary:
// On the third day after His crucifixion, Jesus rose from the dead exactly
// as He had foretold. The empty tomb, the testimony of eyewitnesses, and
// the fulfillment of Old Testament prophecy became the foundation of the
// Christian message.
//
// Historical Context:
// Joseph of Arimathea's newly cut tomb had been secured with a Roman seal
// and guarded by soldiers at the request of the chief priests. When the
// tomb was discovered empty, the authorities attempted to suppress the
// event by bribing the guards to claim that the disciples had stolen the
// body while they slept.
//
// Spiritual Theme:
// The Resurrection proclaims Christ's victory over sin and death. It
// confirms Jesus as the promised Messiah, vindicates His sacrificial
// death, fulfills centuries of prophecy, and establishes the hope of
// eternal life for all who believe.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
// Crime:
// Apparent disappearance of Jesus' body from a sealed Roman tomb.
//
// Actual Event:
// Jesus Christ rose bodily from the dead on the third day. The stone was
// rolled away to reveal the empty tomb, and He subsequently appeared alive
// to numerous independent witnesses.
//
// Culprit:
// None. No theft, conspiracy, or human intervention explains the evidence.
// The resurrection was the supernatural work of God.
//
// Motive:
// To fulfill God's plan of redemption, conquer death, vindicate Jesus'
// identity as the Messiah, and fulfill the Scriptures.
//
// Verdict:
// The physical evidence—including the empty tomb, orderly burial linens,
// displaced sealing stone, frightened Roman guards, angelic testimony,
// multiple eyewitness accounts, and the inability of the authorities to
// produce Jesus' body—consistently supports the Gospel accounts and the
// fulfillment of multiple Messianic prophecies.
//
// ===================================================================================================================

export const act4CaseA = {
  id: "resurrection",
  icon: '../assets/gfx/package-duotone.svg',
  title: "The Empty Tomb",
  subtitle: "The sealed tomb is open. The body is gone. The guards have fled. What happened on the third day?",
  location: "garden",
  eventLocation: "Garden Tomb, Golgotha",
  timeOfDay: "day",
  difficulty: 3,
  requires: "crucifixion_site",
  actLabel: "Act IV - The Resurrection",
  color: 0xa78bfa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Garden Investigation", task: "Find the body", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Early on Sunday morning, Nisan 17, three days after the crucifixion, Mary Magdalene came to the tomb in the garden near Golgotha. She found the stone rolled away, the tomb empty, and — according to John's Gospel — initially thought the body had been stolen (John 20:2). But as the morning unfolded, multiple witnesses reported encounters with a risen Jesus: first Mary Magdalene alone (John 20:11–18), then the other women (Matthew 28:9–10), then Peter (1 Corinthians 15:5), then two disciples on the Emmaus road (Luke 24:13–35), and finally the eleven apostles in a locked room (John 20:19–23).`,
    significance: `The resurrection is the pivotal claim of Christianity. Paul wrote: 'If Christ has not been raised, your faith is futile' (1 Corinthians 15:17). But it was also the most precisely predicted event in the Passion narrative — Psalm 16:10, Hosea 6:2, Jonah 1:17, and Isaiah 53:10–11 all pointed toward it. Jesus himself predicted it three times (Matthew 16:21, 17:23, 20:19). The evidence at the tomb — the folded linens, the rolled stone, the guard report — all points toward something for which 'theft' is an inadequate explanation.`,
    historicalNote: `The tomb was a wealthy man's tomb — Joseph of Arimathea's, hewn from rock in the garden near Golgotha (John 19:41). This fulfilled Isaiah 53:9 ('buried with the rich'). A large stone (Greek: lithos) sealed the entrance — estimates suggest it weighed 1–2 tonnes. The Roman guard (koustodia) was a 4–16 man unit assigned to prevent exactly the situation they now had to report. Matthew 28:11–15 records that the chief priests bribed the soldiers to say the disciples stole the body while they slept — a story with obvious problems: soldiers asleep on duty faced execution; if they were asleep, how did they see what happened?`,
  },

  prophecies: [
    {
      reference: "Psalm 16:10",
      id: "psalm_16_10",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"For you will not abandon my soul to Sheol, or let your holy one see corruption."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus rising before His body could decay, leaving only the burial linens",
      gospelLink: "Acts 2:27–31 — Peter quotes Psalm 16:10 at Pentecost and explicitly applies it to Jesus's resurrection",
      insight: "David wrote Psalm 16 in first person, but Acts 2:29–31 records Peter explaining that David was a prophet who 'seeing what was ahead, spoke about the resurrection of the Messiah, that he was not abandoned to the realm of the dead, nor did his body see decay.' The empty tomb is the physical evidence of this 1,000-year-old promise kept.",
      explanation: "The resurrection on the third day, before the body could begin to decay, is the ultimate fulfillment of this promise. The empty tomb is its physical proof.",
    },
    {
      reference: "Hosea 6:2",
      id: "hosea_6_2",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"After two days he will revive us; on the third day he will restore us, that we may live in his presence."`,
      written: "~750 BC",
      fulfilledBy: "Jesus rising on the third day after crucifixion",
      gospelLink: "1 Corinthians 15:4 — Paul writes the resurrection happened 'according to the Scriptures,' citing the third-day pattern",
      insight: "Jesus predicted His own third-day resurrection three times in the Gospels (Matthew 16:21, 17:23, 20:19). He drew on the pattern of Hosea 6:2 and the sign of Jonah (Jonah 1:17, Matthew 12:40). Paul's use of 'according to the Scriptures' (1 Corinthians 15:3–4) is the earliest written attestation that the church understood the resurrection as prophetic fulfilment.",
      explanation: "Jesus explicitly identified His resurrection with the 'sign of Jonah.' The timing—on the third day—was a consistent prophetic pattern.",
    },
    {
      reference: "Jonah 1:17 / Matthew 12:40",
      id: "jonah_1_17___matthew_12_40",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"For just as Jonah was three days and three nights in the belly of the great fish, so will the Son of Man be three days and three nights in the heart of the earth."`,
      written: "~800 BC / AD 28",
      fulfilledBy: "Jesus's three days in the tomb, followed by resurrection",
      gospelLink: "Matthew 12:40 — Jesus explicitly identifies Himself with Jonah when challenged for a sign",
      insight: "This is one of the most precise self-fulfilling prophecies in Scripture — Jesus named His own death and resurrection timing using the Jonah metaphor when challenged by Pharisees for miraculous proof. The empty tomb on the third day was the 'sign of Jonah' He had promised.",
      explanation: "Jesus explicitly identified His resurrection with the 'sign of Jonah.' The timing—on the third day—was a consistent prophetic pattern.",
    },
    {
      reference: "Isaiah 53:10–11",
      id: "isaiah_53_10_11",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Yet it was the will of the LORD to crush him; he has put him to grief; when his soul makes an offering for guilt, he shall see his offspring and prolong his days... After his anguish he shall see light and be satisfied."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's resurrection — 'prolonging his days' after the sacrifice; 'seeing light' after death",
      gospelLink: "John 20:11–18; Luke 24:13–35 — Jesus appears alive after the suffering",
      insight: "The Suffering Servant song of Isaiah 53 contains a remarkable internal paradox: the servant is 'cut off from the land of the living' (v.8), assigned a grave (v.9), and yet he 'shall see his offspring and prolong his days' (v.10). The only way to reconcile these statements is resurrection. Jesus's post-resurrection appearances fulfilled Isaiah's paradox.",
      explanation: "This paradox within Isaiah's prophecy—a figure who is killed yet lives on—can only be resolved through resurrection.",
    },
    {
      reference: "Psalm 22:1–31",
      id: "psalm_22_1_31",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"My God, my God, why have you forsaken me?... They will come and proclaim his righteousness, declaring to a people yet unborn: He has done it!"`,
      written: "~1000 BC",
      fulfilledBy: "Psalm 22 begins with the crucifixion cry (v.1, quoted by Jesus from the cross) and ends with resurrection proclamation (v.31)",
      gospelLink: "Matthew 27:46 (crucifixion); the closing verses of Psalm 22 look beyond the suffering to vindication",
      insight: "Psalm 22 is a remarkable document: it begins with abandonment and describes crucifixion details (hands and feet pierced, v.16; garments divided by lots, v.18) before ending in triumphant proclamation. The Psalm is both a lament and a resurrection song — which is why Jesus quoted its opening from the cross, perhaps pointing His listeners to its ending.",
      explanation: "The crucifixion psalm ends not in defeat, but in a proclamation of victory to be declared to future generations.",
    },
    {
      reference: "Isaiah 26:19",
      id: "isaiah_26_19",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Your dead will live, LORD; their bodies will rise — let those who dwell in the dust wake up and shout for joy."`,
      written: "~700 BC",
      fulfilledBy: "The supernatural opening of the tomb allowing witnesses to see the resurrection result",
      insight: "The stone was not moved to let Jesus out, but to let the world look in. This fulfilled the promise of the dead rising to bring joy to those dwelling in the dust.",
      explanation: "The stone was not moved to let Jesus out, but to let the world look in. This fulfilled the promise of the dead rising to bring joy to those dwelling in the dust.",
    },
    {
      reference: "Ezekiel 37:12–13",
      id: "ezekiel_37_12_13",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Therefore prophesy and say to them: ‘This is what the Sovereign LORD says: My people, I am going to open your graves and bring you up from them... Then you, my people, will know that I am the LORD, when I open your graves and bring you up from them."`,
      written: "~570 BC",
      fulfilledBy: "The tombs breaking open at the moment of Jesus's death, and the dead being seen in the city after His resurrection.",
      gospelLink: "Matthew 27:52-53",
      insight: "Ezekiel's vision of the valley of dry bones was a promise of national and spiritual resurrection for Israel. The literal opening of tombs at the crucifixion was a dramatic, physical sign that this prophecy was being fulfilled in Christ.",
      explanation: "The earthquake at the crucifixion literally opened tombs, a direct and physical fulfillment of Ezekiel's prophecy that God would open the graves of His people.",
    }
  ],

  intro: formatIntro(`It is early Sunday morning, Nisan 17. Three women — Mary Magdalene, Mary the mother of James, and Salome — have come to the garden tomb at first light to complete the anointing of Jesus's body. They were worried about who would roll the stone away. But when they arrive: the stone is already moved. The Roman guard post is abandoned. The tomb is open, and **empty**. Two strange figures in white are inside. And then — Mary Magdalene sees someone she mistakes for the gardener, until He speaks her name. You are the investigative scribe. What happened here? And can the evidence in this garden account for the _most important claim in history_?`),

  suspects: [
    { id: "mary_magdalene", name: "Mary Magdalene", role: "Disciple, First Witness", avatar: "mary_magdalene.svg", bibleRef: "John 20:1–18; Mark 16:9" },
    { id: "marcus", name: "Marcus", role: "Roman Soldier, Guard Detail", avatar: "marcus.svg", bibleRef: "Matthew 27:62–66; 28:11–15" },
    { id: "joseph", name: "Joseph of Arimathea", role: "Secret Disciple, Tomb Owner", avatar: "joseph_arimathea.svg", bibleRef: "Matthew 27:57–61; John 19:38–42" },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "nicodemus.svg", bibleRef: null },

  ],

  evidencePool: [

    {
      id: "rolled_stone",
      name: "The Displaced Sealing Stone",
      type: "physical",
      relatedProphecy: "psalm_16_10",
      icon: "../assets/gfx/rock-duotone.svg",
      location: "Tomb Entrance, Garden of Joseph",
      desc: "A massive circular limestone stone — estimated at 1–2 tonnes — has been rolled away from the tomb entrance and sits to the side, not rolled down the slope but resting beside it. The sealing wax from the Roman official seal is broken.",
      bibleRef: "Matthew 28:2 — 'There was a violent earthquake, for an angel of the Lord came down from heaven and, going to the tomb, rolled back the stone and sat on it.'",
      propheticLink: "Psalm 16:10 — 'You will not abandon me to the realm of the dead, nor will you let your Holy One see decay.' The angel rolled away the stone not to free Jesus, but to reveal that the Holy One had already risen. The empty tomb became the visible evidence that this ancient prophecy had been fulfilled.",
      bibleRefs: [
        { ref: "Matthew 28:2", link: "matthew_28_2" }
      ],

      propheticRefs: [
        { ref: "Psalm 16:10", link: "psalm_16_10" },
        { ref: "Acts 2:25–32", link: "acts_2_25_32" },
        { ref: "Acts 13:35–37", link: "acts_13_35_37" },
        { ref: "John 20:19", link: "john_20_19" }
      ],
      investigatorNote: "A 2-tonne stone moved uphill, not downhill. No marks suggesting ropes or levers. The Roman guard seal is broken from outside the tomb.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "The first thing anyone noticed — sets up the empty tomb and burial linen found just inside.",
        link: "Event — the two-tonne sealing stone, displaced uphill rather than rolled down.",
        timeline: "CHRONOLOGY: Moved before dawn, ahead of anyone arriving at the tomb.",
        contradict: "RELIABILITY: No rope or lever marks, and a seal broken from the outside — physically inconsistent with grave robbers moving it from within."
      },
    }, {
      id: "empty_tomb",
      name: "The Empty Burial Chamber",
      revealsSuspect: "none",
      type: "physical",
      relatedProphecy: "psalm_16_10",
      icon: "../assets/gfx/magnifying-glass-duotone.svg",
      location: "Interior of Joseph's Tomb",
      desc: "The tomb is completely empty except for the burial wrappings. No body, no signs of struggle, no disturbance of the surrounding grave goods. The shelf where Jesus lay is bare. The wall niches are untouched.",
      bibleRef: "Luke 24:3 — 'When they entered, they did not find the body of the Lord Jesus.'",
      propheticLink: "Psalm 16:10 — 'You will not let your holy one see corruption.' The empty tomb is the physical evidence that the Psalm's promise was kept. A body left long enough shows decomposition; no such evidence exists. Psalm 22:1–31 opens with the cry of abandonment Jesus spoke from the cross ('My God, my God, why have you forsaken me?') and closes in resurrection proclamation — the same psalm that describes His hands and feet pierced and His garments divided by lot.",
      bibleRefs: [
        { ref: "Luke 24:3", link: "luke_24_3" }
      ],
      propheticRefs: [
        { ref: "Psalm 16:10", link: "psalm_16_10" },
        { ref: "Psalm 22:1-31", link: "psalm_22_1_31" }
      ],
      investigatorNote: "No disturbance to the grave goods. No signs of a struggle. No evidence of the organised haste a grave robbery would require. The space is orderly.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Follows the displaced stone — what was found once the tomb stood open.",
        link: "Event — the burial chamber itself, undisturbed and orderly, with the body simply gone.",
        timeline: "CHRONOLOGY: Discovered at first light, immediately after the stone was found rolled away.",
        contradict: "RELIABILITY: No signs of struggle or the haste a grave robbery would leave behind — the space is undisturbed."
      },
    }, {
      id: "burial_linen",
      name: "Folded Burial Linens",
      type: "physical",
      relatedProphecy: "psalm_16_10",
      icon: "../assets/gfx/package-duotone.svg",
      location: "Burial Shelf, Inside the Tomb",
      desc: "The linen strips that wrapped Jesus's body are still present, lying where the body was — not unwrapped and discarded, but apparently lying in the exact shape the body had been, as if it had simply passed through them. The face cloth is separately folded and placed to one side.",
      bibleRef: "John 20:6–8 — 'He saw the strips of linen lying there, as well as the cloth that had been wrapped around Jesus' head. The cloth was still lying in its place, separate from the linen.'",
      propheticLink: "John's Gospel records that the 'other disciple' (John) 'saw and believed' specifically because of how the linens were arranged. A body stolen hastily would leave disordered linens or none at all. The orderly, structured arrangement of the grave cloths pointed to something other than grave robbery.",
      bibleRefs: [
        { ref: "John 20:6-8", link: "john_2068" }
      ],
      propheticRefs: [],
      investigatorNote: "If grave robbers unwrapped the body to carry it out more easily, why leave the wrappings so neatly? If they took the body still wrapped, why are the linens here at all? The linen arrangement defies theft as an explanation.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "Found inside the empty tomb — the detail that convinced John before anyone else believed.",
        link: "Event — the grave wrappings, left neatly folded and separate from the head cloth.",
        timeline: "CHRONOLOGY: Found immediately after entering the empty chamber.",
        contradict: "RELIABILITY: Neither hasty thieves nor thieves who unwrapped the body would leave the linen this carefully arranged."
      },
    }, {
      id: "angelic_witness",
      name: "The Angelic Proclamation",
      type: "testimonial",
      relatedProphecy: "psalm_16_10",
      icon: "../assets/gfx/sparkles-duotone.svg",
      location: "Inside the Tomb / Seated on the Stone",
      desc: "Multiple witnesses independently report seeing one or two figures in white — described as 'like lightning' in appearance — at or inside the tomb. Each gives a consistent message: 'He is not here. He has risen, just as he said. Come and see the place where he lay.'",
      bibleRef: "Matthew 28:2–7; Mark 16:5–7; Luke 24:4–7; John 20:12–13",
      propheticLink: "Psalm 103:20 describes angels as those who 'do his bidding.' The angelic announcement at the tomb echoes the angelic announcements at the nativity — both bookend Jesus's earthly life with heavenly proclamation. The consistency of the message across all four Gospel accounts, with slight variations in detail (one angel or two?), reflects the characteristics of independent eyewitness testimony.",
      bibleRefs: [
        { ref: "Matthew 28:2-7", link: "matthew_28_2_7" },
        { ref: "Mark 16:5-7", link: "mark_16_5_7" },
        { ref: "Luke 24:4-7", link: "luke_24_4_7" },
        { ref: "John 20:12-13", link: "john_20_12_13" }
      ],
      propheticRefs: [
        { ref: "Psalm 103:20", link: "psalm_10320" }
      ],
      investigatorNote: "Four independent accounts agree on the core message. The small variations (one angel/two angels; inside or outside) are consistent with the kind of variation seen in genuine eyewitness reports, not coordinated fabrication.",
      fake: false,
      category: 'people',
      timelineOrder: 4,
      clues: {
        compare: "Explains what the empty tomb and folded linen meant to those who found them.",
        link: "People — the angelic proclamation, independently reported by all four Gospel accounts.",
        timeline: "CHRONOLOGY: Delivered to the women immediately upon their discovery of the empty tomb.",
        contradict: "RELIABILITY: Minor variations in detail across the four accounts (one angel or two) are consistent with independent eyewitness testimony, not coordinated fabrication."
      },
    }, {
      id: "guard_report",
      name: "The Soldiers' Broken Report",
      revealsSuspect: "none",
      type: "analytical",
      relatedProphecy: ["hosea_6_2", "jonah_1_17___matthew_12_40"],
      icon: "../assets/gfx/clipboard-duotone.svg",
      location: "Roman Guard Post, Outer Garden",
      desc: "A shattered wax tablet from the guard log — only partially legible: '...seismos... phos... ekphobothesan... nekroi...' ('earthquake... light... we became as dead men...'). The soldiers have fled their post. An official report was filed later — but the chief priests are paying the soldiers to alter their account.",
      bibleRef: "Matthew 28:2–4 — 'The guards shook for fear of him and became like dead men.' Matthew 28:11–15 — the chief priests bribed the guards to say the disciples had stolen the body.",
      propheticLink: "The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event. Jonah 1:17 / Matthew 12:40 — Jesus named His own third-day resurrection the 'sign of Jonah,' the three days in the tomb mirroring Jonah's three days in the great fish.",
      bibleRefs: [
        { ref: "Matthew 28:2-4", link: "matthew_28_2_4" },
        { ref: "Matthew 28:11-15", link: "matthew_28_11_15" }
      ],
      propheticRefs: [
        { ref: "Matthew 26:14-16", link: "matthew_26_14_16" },
        { ref: "Jonah 1:17", link: "jonah_1_17" },
        { ref: "Matthew 12:40", link: "matthew_12_40" }
      ],
      investigatorNote: "Soldiers asleep on duty faced execution under Roman military law. If they were asleep, they couldn't know what happened. If they were awake, they witnessed something they couldn't explain. The bribery is itself evidence that the authorities knew the disciples hadn't stolen the body.",
      fake: false,
      category: 'people',
      timelineOrder: 5,
      clues: {
        compare: "The guards' own account — pairs with the angelic witness to show even the soldiers saw something inexplicable.",
        link: "People — the guards' broken, contradictory report of what happened at their post.",
        timeline: "CHRONOLOGY: Given shortly after the resurrection, before the chief priests silenced them with a bribe.",
        contradict: "RELIABILITY: Soldiers risking execution for sleeping on duty had no reason to invent a story this dangerous to tell."
      },
    }, {
      id: "spice_jars",
      name: "Unused Burial Spices",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/jar-duotone.svg",
      location: "Entrance to the Tomb Garden",
      desc: "Three clay jars of prepared burial spices — myrrh, aloe, and cinnamon — set down at the garden entrance, unopened. The women brought them to complete the anointing of the body, but they were never used.",
      bibleRef: "Mark 16:1 — 'Mary Magdalene, Mary the mother of James, and Salome bought spices so that they might go to anoint Jesus's body.'",
      propheticLink: "Nicodemus had already brought 75 pounds of myrrh and aloes for the burial (John 19:39–40), fulfilling the wealthy burial of Isaiah 53:9. The women's additional spices were for the anointing ritual completed after the Sabbath — but there was no body to anoint. The unused jars are a symbol of an interrupted mourning, halted by resurrection.",
      bibleRefs: [
        { ref: "Mark 16:1", link: "mark_161" }
      ],
      propheticRefs: [
        { ref: "Psalm 16:10", link: "psalm_16_10" },
        { ref: "John 19:39-40", link: "john_19_39_40" },
        { ref: "Isaiah 53:9", link: "isaiah_53_9" },
        { ref: "Acts 2:25-32", link: "acts_2_25_32" }
      ],
      investigatorNote: "Women who had watched the crucifixion and burial now find the tomb empty. Their grief was real. Their testimony carries the weight of witnesses who had no reason to fabricate — and everything to lose by making the claim.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Shows the women's intent before they knew anything had happened — real grief, not staged discovery.",
        link: "Event — burial spices bought to anoint the body, never used.",
        timeline: "CHRONOLOGY: Purchased before dawn, in preparation for a task the resurrection made unnecessary.",
        contradict: "RELIABILITY: Women preparing spices for a dead body is not the behaviour of people expecting or staging a resurrection."
      },
    }, {
      id: "mary_encounter",
      name: "Mary Magdalene's Testimony",
      type: "testimonial",
      relatedProphecy: "isaiah_53_10_11",
      icon: "../assets/gfx/eye-duotone.svg",
      location: "Garden, Near the Tomb Entrance",
      desc: "Mary Magdalene's first-person account, recorded by John: 'I saw the Lord.' She had initially mistaken the risen Jesus for the gardener. He said one word — her name: 'Mary.' She turned and recognised Him. 'Rabboni!' He told her not to cling to Him, for He had not yet ascended to the Father, and sent her to tell the disciples.",
      bibleRef: "John 20:11–18 — the most detailed and intimate resurrection appearance account in Scripture. Isaiah 43:1 — 'I have called you by name; you are mine.'",
      propheticLink: "Isaiah 53:10–11 promised the Suffering Servant would 'see his offspring and prolong his days' after being crushed — a resurrection paradox. The risen Christ's first act was to call Mary by name (echoing Isaiah 43:1), sending her as the primary witness. In a Roman court a woman's testimony was inadmissible; making a former demoniac the lead witness is exactly the kind of counter-cultural detail that confirms authenticity rather than fabrication.",
      bibleRefs: [
        { ref: "John 20:11-18", link: "john_20_11_18" },
        { ref: "Isaiah 43:1", link: "isaiah_43_1" }
      ],
      propheticRefs: [
        { ref: "Isaiah 53:10-11", link: "isaiah_53_10_11" },
        { ref: "Isaiah 43:1", link: "isaiah_43_1" }
      ],
      investigatorNote: "The fact that Mary Magdalene is the primary resurrection witness is powerful evidence of authenticity. No first-century Jewish or Roman author inventing a resurrection story would choose a woman as the lead witness. This detail is counterproductive to fabrication — which is exactly why it's credible.",
      fake: false,
      category: 'people',
      timelineOrder: 6,
      clues: {
        compare: "The first personal encounter with the risen Jesus — follows the angelic proclamation chronologically.",
        link: "People — Mary Magdalene's own account of being called by name in the garden.",
        timeline: "CHRONOLOGY: The first appearance, shortly after the tomb was found empty.",
        contradict: "RELIABILITY: A first-century author inventing a resurrection account would not choose a woman, whose testimony was inadmissible in Roman courts, as the lead witness."
      },
    }, {
      id: "opened_tombs",
      name: "Opened Tombs Testimony",
      type: "testimonial",
      relatedProphecy: "ezekiel_37_12_13",
      icon: "🪦",
      location: "Jerusalem City Streets",
      desc: "Multiple reports from Jerusalem residents of seeing 'holy people who had died' walking in the city after Jesus's resurrection. This followed the earthquake at the crucifixion that broke open their tombs.",
      bibleRef: "Matthew 27:52-53",
      propheticLink: "Ezekiel 37 prophesied that God would open the graves of His people as a sign of His power to restore. The raising of these saints was a literal fulfillment and a powerful preview of the final resurrection.",
      bibleRefs: [
        { ref: "Matthew 27:52-53", link: "matthew_27_52_53" }
      ],
      propheticRefs: [
        { ref: "Ezekiel 37:12-13", link: "ezekiel_37_12_13" }
      ],
      investigatorNote: "This is one of the most mysterious and powerful signs. It confirms the resurrection was not an isolated event, but the start of a new creation, breaking the power of death itself.",
      fake: false,
      category: 'people',
      timelineOrder: 2,
      clues: {
        compare: "A separate, wider sign occurring alongside the main resurrection — reported independently of Mary's testimony.",
        link: "People — testimony that other tombs opened and the dead were seen in the city.",
        timeline: "CHRONOLOGY: Reported as occurring at the moment of the resurrection, tied to the same event.",
        contradict: "RELIABILITY: Matthew records this as witnessed by many in Jerusalem, not a private or easily-fabricated claim."
      },
    }
    ,
    {
      id: "psalm22_scroll",
      name: "Resurrection Psalm Scroll",
      type: "analytical",
      relatedProphecy: "psalm_22_1_31",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Emmaus Road",
      desc: "A scroll of Psalm 22, which begins with the cry of dereliction from the cross but ends in a proclamation of victory and vindication.",
      bibleRef: "Luke 24:26–27",
      propheticLink: "The Psalm that begins with suffering ends in worldwide proclamation and vindication, pointing beyond the cross to resurrection. Jesus explained these scriptures to the disciples on the road to Emmaus.",
      bibleRefs: [
        { ref: "Luke 24:26-27", link: "luke_24_26_27" }
      ],
      propheticRefs: [
        { ref: "Psalm 22:1-31", link: "psalm_22_1_31" }
      ],
      investigatorNote: "The structure of the Psalm itself is a prophecy: suffering followed by glory.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 7,
      clues: {
        compare: "Ties every piece of evidence in this case back to a single prophecy that predicted both the suffering and the outcome.",
        link: "Prophecy — the scroll of Psalm 22, explained by Jesus Himself to two disciples on the Emmaus road.",
        timeline: "CHRONOLOGY: Referenced after the resurrection, as the risen Jesus explained the Scriptures concerning Himself.",
        contradict: "RELIABILITY: The Psalm's own structure — suffering giving way to vindication — was written centuries before crucifixion existed as a punishment."
      },
    }

  ],

  lab: [
    {
      evidence: "burial_linen",
      suspect: "mary_magdalene",
      result: "**Identified as Witness** (Discovered the empty tomb)",
      notes: "'Early on the first day of the week, while it was still dark' (John 20:1) — Mary was first to the tomb and first to find it empty."
    },
    {
      evidence: "rolled_stone",
      suspect: "marcus",
      result: "**Implicated in Failure** (The seal he guarded was broken)",
      notes: "'They made the tomb secure by putting a seal on the stone and posting the guard' (Matthew 27:66) — a Roman guard, broken by an angel, not a grave robber."
    },
    {
      evidence: "spice_jars",
      suspect: "joseph",
      result: "**Cleared** (His intention was to anoint a body, not hide one)",
      notes: "'Joseph took the body, wrapped it in a clean linen cloth' (Matthew 27:59) — proper burial rites, not concealment."
    }
  ],

  npcs: [
    {
      id: "mary_magdalene",
      name: "Mary Magdalene",
      role: "Disciple, First Witness",
      avatar: "mary_magdalene.svg",
      unlocksSuspects: ["mary_magdalene"],
      profileFile: "mary_magdalene",
      truthfulness: 0.98,
      bibleRef: "John 20:1–18; Mark 16:9; Luke 8:1–3",
      hasDialogue: true,
      storyFile: "mary_magdalene",
      unlocksEvidence: ["mary_encounter", "angelic_witness", "empty_tomb", "burial_linen"],
      revealsProphecy: "psalm_16_10",
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
        angelic_witness: { text: "Two figures — like bright light. They asked me, 'Woman, why are you weeping?' I said, 'They have taken my Lord, and I don't know where they have laid him.' And then I turned around.", isLie: false, revealedClue: "burial_linen" },
        spice_jars: { text: "I set them down when I saw the stone was moved. I didn't need them anymore — but I didn't know that yet. I just stood there staring.", isLie: false, revealedClue: "empty_tomb" },
        rolled_stone: { text: "I was so worried about the stone. It's so heavy! But it was already pushed aside. That's when I saw the tomb was open and empty.", isLie: false, revealedClue: "empty_tomb" },
        mary_encounter: { text: "He called my name. That's all it took. 'Mary.' I knew His voice. I knew it the way I knew my own name. Three years I'd been with this man. He was dead — I watched Him die — and there He stood. What would you have done?", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "marcus",
      name: "Marcus",
      role: "Roman Soldier, Guard Detail",
      avatar: "marcus.svg",
      unlocksSuspects: ["marcus"],
      profileFile: "garrison_guard",
      truthfulness: 0.6,
      bibleRef: "Matthew 27:62–66; 28:2–4; 28:11–15",
      hasDialogue: true,
      storyFile: "execution_soldier",
      unlocksEvidence: ["guard_report", "rolled_stone"],
      revealsProphecy: "hosea_6_2",
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
      role: "Secret Disciple, Tomb Owner",
      unlocksSuspects: ["joseph"],
      avatar: "joseph_arimathea.svg",
      profileFile: "joseph_arimathea",
      truthfulness: 0.9,
      bibleRef: "Matthew 27:57–61; Mark 15:43–47; Luke 23:50–56; John 19:38–42",
      hasDialogue: true,
      storyFile: "joseph_arimathea",
      unlocksEvidence: ["spice_jars"],
      revealsProphecy: "isaiah_53_10_11",
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
        revealsProphecy: "psalm_16_10",
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
        revealsProphecy: "psalm_16_10",
        bibleRef: "John 20:6–8; Psalm 16:10",
      },
      link: {
        text: "The empty space and the undisturbed linens point to the same conclusion together: whatever happened here didn't involve anyone unwrapping or carrying a body.",
        insight: "A body doesn't leave its wrappings behind still arranged in their shape unless it passed through them, not out of them.",
        isKey: false,
        bibleRef: "John 20:6–8",
      },
    },
    "psalm22_scroll+mary_encounter": {
      link: {
        text: "The Psalm that opens with a cry of abandonment and ends in vindication is completed in real time by Mary's encounter — suffering giving way to a living voice saying her name.",
        insight: "Psalm 22 begins 'My God, my God, why have you forsaken me?' — quoted by Jesus from the cross (Matthew 27:46) — and ends in worldwide proclamation. Mary hearing 'Mary' from the risen Jesus (John 20:16) is the Psalm's turning point made personal.",
        isKey: true,
        bibleRef: "Psalm 22:1, 22–31; John 20:16; Luke 24:26–27",
      },
    },
    "angelic_witness+mary_encounter": {
      compare: {
        text: "The angelic proclamation ('He is risen') and Mary Magdalene's personal encounter with the risen Jesus are independent reports of the same morning, converging on the same conclusion.",
        insight: "The choice of Mary Magdalene as the first resurrection witness is historically significant. Paul's 1 Corinthians 15 list of witnesses does not mention her — he is addressing a Roman legal context in which women's testimony was inadmissible. The Gospels record her testimony because it actually happened, not because it was strategically useful.",
        isKey: true,
        revealsProphecy: "isaiah_53_10_11",
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
        revealsProphecy: "jonah_1_17___matthew_12_40",
        bibleRef: "Matthew 28:2–4; John 20:14–17",
      },
    },
    "opened_tombs+guard_report": {
      compare: {
        text: "The guards' report of a supernatural event at the tomb and the citizens' reports of the dead walking in the city are two independent lines of evidence for a reality-altering event.",
        insight: "The resurrection was not a quiet, private affair. It had public, cosmic consequences that were witnessed by both Roman soldiers and Jerusalem residents, fulfilling Ezekiel's prophecy of opened graves.",
        isKey: true,
        revealsProphecy: "ezekiel_37_12_13",
        bibleRef: "Matthew 27:52-53; Matthew 28:4",
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

// ============================================================
// ACT: IV — Resurrection
// CASE: The Guard's Report
// CASE ID: roman_inquiry
// CASE EXPORT: act4CaseB
// SOURCE: act4_case.js
//
// LOCATION:
// Garden Tomb, Golgotha, outside Jerusalem
//
// DIFFICULTY:
// ★★★ (3/3)
//
// BACKGROUND:
// After the angel rolled away the stone and Jesus rose from the dead,
// members of the Roman guard fled into Jerusalem. Rather than reporting
// directly to Pontius Pilate—as Roman military law required—they first
// reported everything that had happened to the chief priests. The chief
// priests and elders met together, paid the soldiers a large sum of
// money, and instructed them to spread the story that Jesus' disciples
// stole His body while the guards were asleep. They further promised to
// protect the soldiers if Pilate learned of the incident.
//
// BIBLE REFERENCES:
// Matthew 28:11–15
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
// • Psalm 2:1–2 — The rulers and authorities conspired together against
//   the LORD and His Anointed.
// • Psalm 2:4 — Despite their conspiracy, God's sovereign purposes
//   cannot be overthrown.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
// Summary:
// The empty tomb created a crisis for both the Jewish leadership and the
// Roman authorities. Rather than investigate the supernatural events
// reported by the guards, the religious leaders manufactured an official
// explanation through bribery and political influence.
//
// Historical Context:
// Roman soldiers faced severe punishment—including execution—for
// abandoning or sleeping at their assigned post. The willingness of the
// guards to admit such a failure only makes sense if they had received
// guarantees of protection from influential authorities. The priests'
// payment and promise to satisfy Pilate reveal the political cooperation
// behind the cover story.
//
// Spiritual Theme:
// Human authorities may attempt to suppress God's truth, but no earthly
// conspiracy can overturn His purposes. The resurrection became so
// undeniable that opponents resorted to deception rather than evidence,
// demonstrating the triumph of God's plan over human schemes.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
// Crime:
// Bribery, conspiracy, and the deliberate suppression of eyewitness
// testimony concerning the empty tomb.
//
// Actual Event:
// Jesus rose from the dead. Terrified Roman guards witnessed the
// supernatural events surrounding the opened tomb, reported them to the
// chief priests, and were subsequently bribed to spread a false account
// that the disciples had stolen the body.
//
// Culprit:
// The chief priests and elders orchestrated the cover-up by bribing the
// soldiers, while the guards participated by repeating the fabricated
// narrative under political protection.
//
// Motive:
// To preserve religious authority, prevent public acceptance of Jesus as
// the Messiah, and avoid political instability resulting from widespread
// belief in His resurrection.
//
// Verdict:
// The combination of the empty tomb, the guards' initial report, the
// financial bribe, and the logical impossibility of sleeping witnesses
// providing eyewitness testimony strongly indicates that the official
// theft narrative was a manufactured cover story. Instead of disproving
// the resurrection, the conspiracy itself provides indirect evidence that
// the tomb truly was empty.
//
// ============================================================

export const act4CaseB = {
  id: "roman_inquiry",
  icon: '../assets/gfx/scroll-duotone.svg',
  title: "The Guard's Report",
  subtitle: "A Roman guard detail has returned from the garden tomb with a story that breaks military law. What are they hiding?",
  location: "garden",
  eventLocation: "Garden Tomb, Golgotha",
  timeOfDay: "day",
  difficulty: 3,
  requires: "resurrection",
  actLabel: "Act IV - The Resurrection",
  color: 0xa78bfa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Interrogate the Legion", task: "Expose financial anomalies", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Following the supernatural opening of the tomb, members of the Roman guard detail rushed into the city. Instead of reporting directly to Pilate—which would mean immediate execution for losing a post—they went to the chief priests. The Sanhedrin gave the soldiers a large sum of money, instructing them to spread a cover story: "His disciples came during the night and stole him away while we were asleep."`,
    significance: `This case exposes the extreme lengths to which the political apparatus went to manufacture a counter-narrative. The absurdity of the official cover story (witnessing a theft while completely unconscious) historically validates that the tomb was undeniably empty.`,
    historicalNote: `Under Roman military discipline (*Disciplinam Militarem*), sleeping on watch or failing to guard a sealed state target carried the mandatory penalty of being beaten or executed by crucifixion. Soldiers would never confess to sleeping unless guaranteed absolute political immunity from the highest levels.`,
  },

  prophecies: [
    {
      reference: "Psalm 2:1–2",
      id: "psalm_2_1_2",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Why do the nations conspire and the peoples plot in vain? The kings of the earth rise up and the rulers band together against the LORD and against his anointed."`,
      written: "~1000 BC",
      fulfilledBy: "The Roman military and Jewish Sanhedrin combining forces to suppress the resurrection",
      gospelLink: "Matthew 28:12–14",
      insight: "Human institutions frequently coordinate their efforts to lock down the truth, yet God laughs their conspiracies to scorn.",
      explanation: "The Roman military and the Jewish Sanhedrin collaborating to create a cover-story for the empty tomb is a direct fulfillment of rulers conspiring to suppress God's truth.",
    },
  ],

  evidencePool: [

    {
      id: "bribe_shekels",
      name: "High-Grade Sanctuary Coins",
      relatedProphecy: "psalm_2_1_2",
      type: "physical",
      icon: "../assets/gfx/coins-duotone.svg",
      pos: [-2, 5, 0],
      snippet: "A heavy canvas pouch filled with pristine Temple shekels.",
      description: "A large sum of silver coins found hidden inside a Roman legionary's standard gear locker inside the fortress. Roman soldiers were paid in imperial denarii, making this Jewish religious currency completely irregular.",
      propheticLink: "Matthew 28:12 records that the chief priests met with the elders and devised a plan, giving the soldiers a 'large sum of money.'",
      bibleRefs: [
        { ref: "Matthew 28:12", link: "matthew_2812" }
      ],
      propheticRefs: [
        { ref: "Matthew 28:12", link: "matthew_2812" }
      ],
      investigatorNote: "The high transaction value indicates this wasn't common marketplace spending money. This is institutional hush money directly from the treasury.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Pairs with the Sanhedrin report to show money changing hands to buy silence.",
        link: "Event — Temple shekels found in a Roman soldier's locker, currency no legionary should be carrying.",
        timeline: "CHRONOLOGY: Hidden away shortly after the guards reported to the chief priests.",
        contradict: "RELIABILITY: The size and irregularity of the sum rules out ordinary spending money — this is institutional hush money."
      },
    }, {
      id: "broken_imperial_seal",
      name: "Snapped Clay Roman Seal",
      relatedProphecy: "psalm_2_1_2",
      type: "physical",
      icon: "../assets/gfx/pin-duotone.svg",
      pos: [4, -2, 0],
      snippet: "Hardened clay fragments showing the stamp of the Roman Governor.",
      description: "Pieces of the structural sealing clay that tied the chord across the tomb door, cleanly fractured and thrown into the dirt.",
      propheticLink: "Matthew 27:66 notes they went and made the tomb secure by 'putting a seal on the stone and posting the guard.'",
      bibleRefs: [
        { ref: "Matthew 27:66", link: "matthew_2766" }
      ],
      propheticRefs: [
        { ref: "Matthew 27:66", link: "matthew_2766" }
      ],
      investigatorNote: "To break this seal without authorization was a high treasonous offense against Caesar himself. No thief would carefully snap the clay and leave it behind; it bears signs of a violent, percussive structural displacement.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "The first sign something went wrong at the guard post — pairs with the shattered spear as physical evidence of shock, not theft.",
        link: "Event — the Roman governor's own seal, snapped off the tomb and left in the dirt.",
        timeline: "CHRONOLOGY: Broken at dawn, before the guards ever reached the chief priests.",
        contradict: "RELIABILITY: Breaking this seal without authorisation was a capital offence against Rome — no thief would risk it and then abandon the evidence."
      },
    }, {
      id: "shattered_spear",
      name: "Shattered Pilum Shaft",
      relatedProphecy: "psalm_2_1_2",
      type: "physical",
      icon: "../assets/gfx/dagger-duotone.svg",
      pos: [0, -4, 0],
      snippet: "An ash-wood Roman spear snapped cleanly down the middle.",
      description: "A heavy legionary spear fractured by clean kinetic force, left behind in the garden grass near the shifted rock.",
      propheticLink: "Matthew 28:2 states there was a violent earthquake, for an angel of the Lord came down from heaven and rolled back the stone.",
      bibleRefs: [
        { ref: "Matthew 28:2", link: "matthew_282" }
      ],
      propheticRefs: [
        { ref: "Matthew 28:2", link: "matthew_282" }
      ],
      investigatorNote: "This spear wasn't cut by a sword in combat; the wood fibers show high-impact compression failure, consistent with an external physical shockwave that knocked the sentries flat.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Found alongside the broken seal — physical proof of what overwhelmed the guards at the tomb.",
        link: "Event — a legionary spear shaft snapped by sudden kinetic force, not combat.",
        timeline: "CHRONOLOGY: Damaged at the same moment as the seal, during the guards' encounter at the tomb.",
        contradict: "RELIABILITY: Compression-fracture wood fibres point to an external shockwave, not a fight with intruders."
      },
    }, {
      id: "sanhedrin_report",
      name: "Official Sanhedrin Report",
      relatedProphecy: "psalm_2_1_2",
      type: "analytical",
      icon: "../assets/gfx/scroll-duotone.svg",
      desc: "The official report filed by the Sanhedrin, claiming the disciples stole the body while the guards slept.",
      bibleRef: "Matthew 28:11 — 'While the women were on their way, some of the guards went into the city and reported to the chief priests everything that had happened.'",
      propheticLink: "This report is the paper trail of the conspiracy itself — the Sanhedrin's own internal record of receiving the guards' account and choosing to suppress rather than investigate it, matching the pattern of rulers plotting against God's anointed described in Psalm 2:1–2.",
      bibleRefs: [
        { ref: "Matthew 28:11", link: "matthew_2811" }
      ],
      propheticRefs: [
        { ref: "Psalm 2:1-2", link: "psalm_212" }
      ],
      investigatorNote: "The existence of a formal, internal report proves the Sanhedrin knew the guards' true account before they paid for a false one.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "The paper trail connecting the bribe money to a cover-up the council had already decided on.",
        link: "Event — the Sanhedrin's own internal record of receiving the guards' account of the resurrection.",
        timeline: "CHRONOLOGY: Filed last, once the council had already chosen to pay for silence rather than investigate.",
        contradict: "RELIABILITY: Its existence proves the council knew the guards' true story before manufacturing a false one to spread instead."
      },
    },],
  lab: [
    {
      evidence: "bribe_shekels",
      suspect: "sentry_lucas",
      result: "**Implicated in Bribery** (Possession of the coins links him to the cover-up)",
      notes: "'They gave the soldiers a large sum of money' (Matthew 28:12) — silver bought silence, again."
    },
    {
      evidence: "broken_imperial_seal",
      suspect: "caiaphas",
      result: "**Implicated in Conspiracy** (Authored the false report)",
      notes: "'Say, His disciples came during the night and stole him away' (Matthew 28:13) — a story invented by the same council that condemned him."
    }
  ],
  suspects: [
    {
      id: "sentry_lucas",
      name: "Lucas of the Tenth Legion",
      role: "Tomb Guard Sentry",
      avatar: "garrison_guard.svg",
      color: 0xffaa44,
      pos: [0, 0, 0],
      bibleRef: "Matthew 28:13",
      background: "A seasoned auxiliary legionary assigned to the special security detail stationed at the garden tomb.",
      dialogue: {
        neutral: "We fell asleep. The night was long. The disciples sneaked in like ghosts and robbed the place. That is our statement.",
        cautious: "Look, if the Governor hears about this, my life is forfeit. But the High Priest promised that if this reaches Pilate's ears, they will satisfy him and keep us out of trouble. I'm just following orders.",
      },
      contradictions: {
        "bribe_shekels+broken_imperial_seal": {
          exposed: "You think a handful of unarmed galilean fishermen broke a Roman imperial seal while an elite unit slept right next to it? We didn't sleep! The ground split open, and a light like lightning blinded us. We woke up paralyzed, and the body was gone. The priests paid us to lie because the truth scares them to death!"
        },
      },
    },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "nicodemus.svg", bibleRef: null },
  ],

  npcs: [
    {
      id: "sentry_lucas",
      name: "Lucas of the Tenth Legion",
      role: "Tomb Guard Sentry",
      avatar: "garrison_guard.svg",
      unlocksSuspects: ["sentry_lucas"],
      profileFile: "garrison_guard",
      hasDialogue: true,
      storyFile: "sentry_lucas",
      truthfulness: 0.50,
      bibleRef: "Matthew 28:11–15",
      background: "A veteran legionary auxiliary from the Antonia Fortress garrison[cite: 1]. He was on the final pre-dawn watch when the tomb seal was breached. Caught between mandatory military execution for a failed post and a high-value religious payoff, his panic is extreme.",
      revealsProphecy: "psalm_2_1_2",
      dialogue: {
        neutral: "The shift was standard until the lapse occurred. We fell asleep under heavy exhaustion. The body vanished during our slumber.",
        cautious: "A soldier does not look for trouble in provincial courts. The high priest has given his word that our names are protected with the procurator.",
        pressured: "If I tell you anything else, the cohort will brand me a traitor to the legion standard. We slept. The disciples must have carried out the theft.",
        exposed: "We didn't close our eyes! No human thief could have bypassed our array without drawing steel. The earth groaned, the rock seal tore away with a dynamic concussive shock, and a flash like white lightning left us flat and frozen. When we came to, the chamber was empty. We ran straight to the Temple because Pilate would have nailed us to a timber for it.",
        repeat: "I have given my authorized narrative. Leave my barracks locker alone.",
      },
      reactions: {
        bribe_shekels: { text: "That pouch belongs to the Temple inner treasury, not Rome. The priests weighed it out to us directly in the Sanhedrin chamber. It’s... a security stipend. For our silence.", isLie: true },
        broken_imperial_seal: {
          text: "The Governor’s seal was snapped clear through. It wasn't chipped or pried off with tools; it exploded off the limestone face during the tremors.",
          isLie: false,
          revealedClue: { requiredDeduction: "Payoff", clueId: "bribe_shekels" }
        },
        shattered_spear: { text: "That is my primary pilum. The ash shaft split from extreme structural compression when the concussive shock knocked us down. No rebel sword made that fracture.", isLie: false, revealedClue: "broken_imperial_seal" },
      },
      contradictions: {},
    },
    {
      id: "chief_priest_caiaphas",
      name: "Caiaphas",
      role: "High Priest, Sadducee",
      avatar: "caiaphas.svg",
      profileFile: "caiaphas",
      truthfulness: 0.30,
      bibleRef: "Matthew 28:11-12; John 11:49-50",
      background: "Joseph ben Caiaphas, managing severe institutional damage control[cite: 1]. He must maintain the stability of the Temple state and protect the nation from an immediate Roman military crackdown by manufacturing an alternate narrative for the empty tomb.",
      revealsProphecy: "psalm_2_1_2",
      dialogue: {
        neutral: "The tomb is empty because of common grave-robbing. Frightened Galileans returned under cover of night to stage a dynamic event.",
        cautious: "The allocation of treasury funds is an internal administrative matter. We frequently compensate secular guards for civic peacekeeping actions.",
        pressured: "The rumor of resurrection is a contagious superstition designed to foster civil unrest. We have taken logical steps to stabilize public interpretation.",
        exposed: "Do you truly think I care about the testimony of a few terrified mercenaries? If the populace believes a dead man broke a Roman seal, a nationalist riot will level this city by sunset. The silver from our treasury buys the narrative that preserves the peace. The truth is whatever prevents an imperial legionary response.",
        repeat: "The Sanhedrin council session is locked. This inquiry is closed.",
      },
      reactions: {
        bribe_shekels: { text: "Tyrian sanctuary silver. We paid it out to secure the soldiers' protection from the Governor’s immediate wrath. It was an act of administrative diplomacy.", isLie: true },
        broken_imperial_seal: { text: "The disciples used precision levers to displace the stone and shatter the clay. A common strategy for ideological martyrs.", isLie: true },
        shattered_spear: { text: "A routine manufacturing flaw in auxiliary equipment. Roman supply chains are famously inconsistent in our province.", isLie: true },
      },
      contradictions: {
        "bribe_shekels+broken_imperial_seal": { exposed: "The soldiers came to us shaking, babbling about angels and lightning! If I let that report reach the streets, our authority collapses instantly. I spent the silver to purchase their story because an open grave robbery is a minor local felony, but a resurrected prophet is a direct threat to our entire system!" },
      },
    },
    {
      id: "pilates_secretary",
      name: "Pilate’s Secretary",
      role: "Administrative Bureaucrat",
      avatar: "senior_scribe.svg",
      profileFile: "pilate_secretary",
      truthfulness: 0.90,
      bibleRef: "Matthew 27:65-66; 28:14",
      background: "An educated Roman scribe responsible for auditing legal charges, guard dispatches, and official provincial records inside the Praetorium[cite: 1]. He approaches the entire situation with absolute bureaucratic detachment[cite: 1].",
      revealsProphecy: "psalm_2_1_2",
      dialogue: {
        neutral: "I process the garrison dockets and security ledgers. The official report filed by the sentries states a sleeping lapse occurred.",
        cautious: "The legal ledger contains major inconsistencies. An elite guard detail does not confess to sleeping on a capital assignment without a prior guarantee of executive immunity.",
        pressured: "The High Priest had a private meeting with the Governor this morning. Afterward, the formal misconduct charges against Lucas's unit were quietly struck from the execution log.",
        exposed: "The official theft narrative is an absolute structural farce. Under imperial law, if a guard unit falls completely unconscious on a state watch, they wake up on crosses, not with purses full of high-grade Tyrian silver. The Temple elite bought those men, and the Governor allowed the transaction to preserve provincial tax metrics.",
        repeat: "The docket has been signed and archived. The paperwork is finished.",
      },
      reactions: {
        bribe_shekels: { text: "This silver did not originate from our imperial mints. This is pure Temple coinage. It proves a financial transaction occurred between the Sanhedrin and our auxiliary line.", isLie: false },
        broken_imperial_seal: { text: "The structural fracture on this clay seal shows zero scrape marks from metal tools. It was sheared off by a singular percussive impact wave.", isLie: false },
        shattered_spear: {
          text: "A standard-issue pilum from our armory. The impact split the wood grains from top to bottom, indicating severe kinetic displacement.",
          isLie: false,
          revealedClue: { pressured: "bribe_shekels", exposed: "bribe_shekels" }
        },
      },
      contradictions: {},
    },
    {
      id: "mary_resurrection",
      name: "Mary (Resurrection)",
      role: "First Witness",
      avatar: "mary_magdalene.svg",
      truthfulness: 0.98,
      bibleRef: "John 20:1-18",
      hasDialogue: true,
      storyFile: "mary_resurrection",
      background: "Mary Magdalene, first witness to the risen Jesus. Her testimony became the foundation of the resurrection claim.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "judas_betrayal",
      name: "Judas (Betrayal)",
      role: "Betrayer",
      avatar: "judas.svg",
      truthfulness: 0.3,
      bibleRef: "Matthew 26:14-16,47-50; Mark 14:10-11,43-45",
      hasDialogue: true,
      storyFile: "judas_betrayal",
      background: "The disciple who betrayed Jesus for thirty pieces of silver. His motives remain debated — greed, disillusionment, or something darker.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "herods_servant",
      name: "Herod's Servant",
      role: "Royal Household",
      avatar: "annas.svg",
      truthfulness: 0.5,
      bibleRef: "Luke 23:6-12 (Herod and Pilate)",
      hasDialogue: true,
      storyFile: "herods_servant",
      background: "Served in Herod Antipas household. Saw the political maneuvering around Jesus — Herod wanted a miracle, got silence instead.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "peter_restored",
      name: "Peter (Restored)",
      role: "Restored Disciple",
      avatar: "peter.svg",
      truthfulness: 0.9,
      bibleRef: "John 21:15-19 (Restoration of Peter)",
      hasDialogue: true,
      storyFile: "peter_restored",
      background: "Peter after the resurrection. Restored by Jesus three times to match his three denials. Now a bold witness.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
  ],

  deductions: {
    "bribe_shekels+broken_imperial_seal": {
      link: {
        text: "The silver currency from the temple treasury directly connects to the broken security parameters of the Roman state.",
        insight: "The Sanhedrin is actively financing the cover-up of a Roman security failure. This proves that an event occurred which both factions desperately need to hide from the public record.",
        isKey: true,
        revealsProphecy: "psalm_2_1_2",
        bibleRef: "Matthew 28:11–12",
      },
    },
    "broken_imperial_seal+shattered_spear": {
      link: {
        id: "Payoff",
        text: "The physical damage at the scene points to structural and environmental trauma, not a stealthy grave robbery.",
        insight: "Thieves do not fracture weapons and shatter seals with concussive force while leaving the valuable burial linens perfectly intact inside.",
        isKey: false,
        revealsProphecy: "psalm_2_1_2",
        bibleRef: "John 20:6–7",
      },
      compare: {
        text: "Both items show the same signature of sudden, overwhelming force — not the quiet work of grave robbers trying not to be heard.",
        insight: "A snapped seal and a shattered spear shaft both fail the same way under a shockwave, not under a crowbar.",
        isKey: false,
        bibleRef: "Matthew 28:2",
      },
    },
    "sanhedrin_report+bribe_shekels": {
      contradict: {
        text: "The official report claims the guards were asleep when the body was taken — but sleeping men can't testify to what happened while they slept. The bribe money is what actually explains the story.",
        insight: "Matthew 28:13-14 records the priests' own instructions: 'say his disciples came during the night and stole him.' A report built on an impossible eyewitness claim, paid for in silver, is the fingerprint of a cover-up, not an investigation.",
        isKey: true,
        revealsProphecy: "psalm_2_1_2",
        bibleRef: "Matthew 28:11-15",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no grave robbery. The resurrection was a real, supernatural event that shattered the physical boundaries of the tomb, causing the guards to flee in terror.",
    method: "God raised Jesus on the third morning, accompanied by an earthquake and an angelic manifestation. The terrified guards ran to the chief priests, who chose to bribe the soldiers to distribute a fabricated theft narrative to prevent a total collapse of their religious authority.",
    lesson: "The existence of the bribe and the logical vulnerability of the official cover story serve as absolute legal confirmation of the empty tomb. The world's systems will spend any amount of silver to silence the reality of the resurrected King.",
    prophesyFulfilled: ["Psalm 2:1–4", "Matthew 12:40"],
    furtherReading: ["Matthew 28:11–15"],
  },
};

// ============================================================
// ACT: IV — Resurrection & Restoration
// CASE: Peter's Restoration
// CASE ID: peter_restoration
// CASE EXPORT: act4CaseC
// SOURCE: John 21:1–19
//
// LOCATION:
// Sea of Galilee (Shoreline at Dawn)
//
// DIFFICULTY:
// ★★★☆☆ (3/5)
//
// BACKGROUND:
// Following His resurrection, Jesus appeared to seven disciples who had
// returned to fishing on the Sea of Galilee. After an unsuccessful night,
// Jesus instructed them to cast their net on the right side of the boat,
// resulting in a miraculous catch of 153 large fish. Waiting on the shore
// beside a charcoal fire, Jesus shared breakfast with His disciples before
// restoring Peter through three questions that mirrored Peter's three
// denials. Rather than condemning Peter for his failure, Jesus recommissioned
// him to shepherd His followers.
//
// BIBLE REFERENCES:
// John 21:1–19
//
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//
// • Zechariah 13:7 — The Shepherd struck and the sheep scattered,
//   followed by the gathering and restoration of His flock.
//
// • Ezekiel 34:11–16 — God Himself seeks, rescues, feeds, and restores
//   His scattered sheep.
//
// • Psalm 16:10 — God's Holy One would not remain in the grave,
//   fulfilled through Christ's resurrection.
//
// • Isaiah 53:10–11 — After suffering and death, the Servant would
//   live again and see the fruit of His sacrifice.
//
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//
// Summary:
// The risen Jesus meets His disciples by the Sea of Galilee, performs
// another miraculous catch of fish, and restores Peter after his threefold
// denial. Peter is commissioned to feed Christ's sheep, demonstrating that
// God's grace transforms failure into faithful service.
//
// Historical Context:
// This appearance occurred after Jesus' resurrection during the forty days
// before His ascension. Many disciples had returned temporarily to their
// former occupation as fishermen. The events intentionally echo Peter's
// original calling (Luke 5), showing that Jesus was renewing, not replacing,
// His commission.
//
// Spiritual Theme:
// Restoration, forgiveness, grace, servant leadership, the Good Shepherd,
// second chances, faithful discipleship, and Christ's victory over failure.
//
// ------------------------------------------------------------
// CASE FACTS (Truth Object)
//
// Crime:
// None. This is a restoration rather than a criminal investigation.
//
// Actual Event:
// Jesus intentionally recreated familiar circumstances—a miraculous catch,
// a charcoal fire, and a shared meal—to confront Peter's past failure with
// grace. Through a threefold declaration of love and the command to
// "Feed my sheep," Peter was publicly restored and recommissioned as a
// leader of the early Church.
//
// Culprit:
// None.
//
// Motive:
// To restore Peter after his denial, reaffirm his calling, and demonstrate
// that Christ's forgiveness is greater than human failure.
//
// Verdict:
// Peter is fully restored by the risen Christ. His denial is not ignored
// but redeemed, and he is commissioned to shepherd God's people as a
// witness to the resurrection.
//
// ============================================================

export const act4CaseC = {
  id: "peter_restoration",
  icon: '../assets/gfx/fish-duotone.svg',
  title: "Peter's Restoration",
  subtitle: "By the Sea of Galilee, a disciple is confronted with his failures—and given a second chance.",
  location: "sea_of_galilee",
  eventLocation: "Sea of Galilee",
  timeOfDay: "dawn",
  difficulty: 3,
  requires: "roman_inquiry",
  actLabel: "Act IV - The Resurrection",
  color: 0xa78bfa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Restoration Inquiry", task: "Understand the commission", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `After His resurrection, Jesus appeared to seven disciples by the Sea of Galilee. They had returned to fishing—having caught nothing all night—when a voice from the shore told them to cast their nets on the right side. The catch was miraculous: 153 large fish. When they came ashore, they found Jesus waiting with a charcoal fire and bread. After breakfast, He singled out Peter for a threefold commission that mirrored his threefold denial.`,
    significance: `This scene shows the heart of the risen Christ—restoration, not condemnation. Peter, who had failed miserably, was not only forgiven but reinstated as the leader of the disciples. The threefold question 'Simon, son of John, do you love me?' corresponds to Peter's three denials, and each 'Feed my sheep' commission restores Peter's apostolic authority.`,
    historicalNote: `The charcoal fire is significant—the only time John mentions one in his Gospel. The other charcoal fire was where Peter denied Jesus (John 18:18). Jesus deliberately used fire and fish to trigger Peter's memory of his failure, then transformed that memory into restoration. The 153 fish has been interpreted by early commentators as representing the universal scope of the gospel—all nations would come to faith through Peter's commission.`,
  },

  prophecies: [
    {
      reference: "Zechariah 13:7",
      id: "zechariah_13_7",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Strike the shepherd, and the sheep will be scattered. I will turn my hand against the little ones."`,
      written: "~520 BC",
      fulfilledBy: "Peter's denial and scattering, followed by restoration",
      gospelLink: "Matthew 26:31; John 21:15-19",
      insight: "The scattering of the disciples after Jesus's arrest was prophesied. Peter's restoration shows that God's purposes stand even when human faithfulness fails.",
      explanation: "Peter's denial was a fulfillment of the 'scattered sheep' prophecy. His restoration by the Sea of Galilee, where Jesus commissions him to 'feed my sheep,' is the fulfillment of the Good Shepherd gathering His flock.",
    },
    {
      reference: "Ezekiel 34:11-16",
      id: "ezekiel_34_11-16",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"For thus says the Lord GOD: I will seek my sheep... I will rescue them... I will feed them... I will bind up the injured... I will bring back the strayed."`,
      written: "~580 BC",
      fulfilledBy: "Jesus seeking, rescuing, and commissioning Peter to feed His sheep",
      gospelLink: "John 21:15-17",
      insight: "The imagery of shepherding is central—Jesus seeks Peter, binds his wounds, and commissions him to shepherd others.",
      explanation: "Peter's denial was a fulfillment of the 'scattered sheep' prophecy. His restoration by the Sea of Galilee, where Jesus commissions him to 'feed my sheep,' is the fulfillment of the Good Shepherd gathering His flock.",
    },
    {
      reference: "Psalm 16:10",
      id: "psalm_16_10",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"For you will not abandon my soul to Sheol, or let your holy one see corruption."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus rising before His body could decay, leaving only the burial linens",
      gospelLink: "Acts 2:27–31 — Peter quotes Psalm 16:10 at Pentecost and explicitly applies it to Jesus's resurrection",
      insight: "David wrote Psalm 16 in first person, but Acts 2:29–31 records Peter explaining that David was a prophet who 'seeing what was ahead, spoke about the resurrection of the Messiah, that he was not abandoned to the realm of the dead, nor did his body see decay.' The empty tomb is the physical evidence of this 1,000-year-old promise kept.",
      explanation: "The resurrection on the third day, before the body could begin to decay, is the ultimate fulfillment of this promise. The empty tomb is its physical proof.",
    },
    {
      reference: "Isaiah 53:10–11",
      id: "isaiah_53_10_11",
      icon: "../assets/gfx/sparkles-duotone.svg",
      text: `"Yet it was the will of the LORD to crush him; he has put him to grief; when his soul makes an offering for guilt, he shall see his offspring and prolong his days... After his anguish he shall see light and be satisfied."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's resurrection — 'prolonging his days' after the sacrifice; 'seeing light' after death",
      gospelLink: "John 20:11–18; Luke 24:13–35 — Jesus appears alive after the suffering",
      insight: "The Suffering Servant song of Isaiah 53 contains a remarkable internal paradox: the servant is 'cut off from the land of the living' (v.8), assigned a grave (v.9), and yet he 'shall see his offspring and prolong his days' (v.10). The only way to reconcile these statements is resurrection. Jesus's post-resurrection appearances fulfilled Isaiah's paradox.",
      explanation: "This paradox within Isaiah's prophecy—a figure who is killed yet lives on—can only be resolved through resurrection.",
    },
  ],

  intro: formatIntro(`It is the third morning after the resurrection. Seven disciples—including Peter, Thomas, and Nathanael—have returned to Galilee and spent the night fishing on the Sea. As dawn breaks, a figure on the shore calls out: **'Cast the net on the right side, and you will find something.'** Reluctantly, they obeyed—and the catch was so large they could not haul it in. When they came ashore, they found the resurrected Jesus waiting with bread and fish. But this was not just breakfast—it was a divine appointment to _restore a broken disciple_.`),

  suspects: [
    { id: "peter", name: "Peter", role: "Restored Apostle", avatar: "peter.svg", bibleRef: "John 21:15-19" },
    { id: "none", name: "No One", role: "Forgiven", avatar: "nicodemus.svg", bibleRef: null },
  ],

  evidencePool: [

    {
      id: "charcoal_fire",
      name: "The Charcoal Fire",
      relatedProphecy: "zechariah_13_7",
      type: "physical",
      icon: "../assets/gfx/flame-duotone.svg",
      location: "Shoreline, Sea of Galilee",
      desc: "A small charcoal fire with coals still glowing, the only other charcoal fire mentioned in John's Gospel—the first was where Peter denied Jesus (John 18:18).",
      bibleRef: "John 21:9 — 'When they got out of the boat, they saw a fire of burning coals there with fish lying on it, and bread.'",
      propheticLink: "Zechariah 13:7 foretold that when the Shepherd was struck, His sheep would be scattered. Jesus applied this prophecy to His disciples on the night of His arrest (Matthew 26:31). Around one charcoal fire Peter denied his Lord; around another, the risen Shepherd restored him. The same setting that witnessed failure became the place of forgiveness and renewed calling.",
      bibleRefs: [
        { ref: "John 21:9", link: "john_219" }
      ],
      propheticRefs: [
        { ref: "Zechariah 13:7", link: "zechariah_13_7" },
        { ref: "Matthew 26:31", link: "matthew_26_31" },
        { ref: "John 18:18", link: "john_18_18" }
      ],
      investigatorNote: "Peter had warmed himself at a charcoal fire on the night of Jesus's arrest. When he recognized this fire, he knew exactly who stood before him.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "The setting that gives every other piece of evidence in this case its meaning — the same kind of fire as Peter's denial.",
        link: "Event — a charcoal fire on the Galilean shore, deliberately echoing the fire in Caiaphas's courtyard.",
        timeline: "CHRONOLOGY: Burning before the disciples came ashore from their night of fishing.",
        contradict: "RELIABILITY: John specifically notes the fire was charcoal — the same rare Greek word used only once before, at Peter's denial."
      },
    }, {
      id: "miraculous_catch",
      name: "The Miraculous Catch",
      relatedProphecy: "ezekiel_34_11-16",
      type: "physical",
      icon: "../assets/gfx/fish-duotone.svg",
      location: "Nets on the Beach",
      desc: "The disciples' nets still contained 153 large fish—the same number they had caught at Jesus's command. The nets had not torn despite the enormous weight.",
      bibleRef: "John 21:10-11 — 'Bring some of the fish you have just caught... There were so many that the fisherman was not able to haul in the net, for it was torn.'",
      propheticLink: "This echoes the original calling of the disciples (Luke 5:1-11) and demonstrates that obedience to Christ yields supernatural results.",
      bibleRefs: [
        { ref: "John 21:10-11", link: "john_211011" }
      ],
      propheticRefs: [
        { ref: "Luke 5:1-11", link: "luke_5111" }
      ],
      investigatorNote: "The number 153 has been interpreted as representing the universality of the gospel—how all nations would come to faith through Peter's commission.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Echoes Peter's original calling — the same miracle that first brought him to follow Jesus, now repeated.",
        link: "Event — a net torn under the weight of 153 fish, caught on Jesus's instruction alone.",
        timeline: "CHRONOLOGY: Happened at dawn, just before the disciples recognised who was calling to them from the shore.",
        contradict: "RELIABILITY: An unbroken net despite the enormous catch is consistent with the same kind of miracle recorded at Peter's first calling in Luke 5."
      },
    }, {
      id: "bread_breakfast",
      name: "Bread and Fish Breakfast",
      relatedProphecy: "ezekiel_34_11-16",
      type: "physical",
      icon: "../assets/gfx/bread-duotone.svg",
      location: "Shoreline Meal",
      desc: "Loaves of bread and grilled fish prepared by the risen Jesus Himself—simple fare for a divine meal.",
      bibleRef: "John 21:9 — 'Jesus said, \"Bring some of the fish you have just caught... and come and have breakfast.\"'",
      propheticLink: "Ezekiel 34:11–16 promised that the Lord Himself would seek, gather, and feed His scattered sheep. Psalm 23 declares that the Shepherd prepares a table for His people, while Isaiah 25:6–9 foretells the Messianic feast following God's victory over death. The risen Jesus fulfills these promises by preparing bread and fish for His disciples, demonstrating that the Good Shepherd still provides for His flock after conquering the grave.",
      bibleRefs: [
        { ref: "John 21:9", link: "john_219" }
      ],
      propheticRefs: [
        { ref: "Ezekiel 34:11-16", link: "ezekiel_34_11_16" },
        { ref: "Psalm 23:1-5", link: "psalm_23_1_5" },
        { ref: "Isaiah 25:6-9", link: "isaiah_25_6_9" }
      ],
      investigatorNote: "Jesus ate with Peter again, as He had many times before. The intimacy of the meal signals complete restoration.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "Follows the miraculous catch — Jesus feeding the disciples before the confrontation with Peter begins.",
        link: "Event — bread and fish Jesus Himself prepared and served at the charcoal fire.",
        timeline: "CHRONOLOGY: Served immediately after the disciples brought their catch ashore.",
        contradict: "RELIABILITY: An ordinary shared meal, consistent with the intimacy Jesus had shown His disciples throughout His ministry."
      },
    }, {
      id: "threefold_commission",
      name: "The Threefold Commission",
      revealsSuspect: "none",
      relatedProphecy: "ezekiel_34_11-16",
      type: "testimonial",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Dialogue with Peter",
      desc: "Peter's account of being asked three times by Jesus: 'Simon, son of John, do you love me?' Each time Peter answered, Jesus responded: 'Feed my sheep.'",
      bibleRef: "John 21:15-17 — 'Feed my lambs... Feed my sheep... Tend my sheep.'",
      propheticLink: "Peter's three denials (crow, cock, fire) are met with three commissions (feed, tend, shepherd) showing prophetic reversal.",
      bibleRefs: [
        { ref: "John 21:15-17", link: "john_211517" }
      ],
      propheticRefs: [
        { ref: "Ezekiel 34:11-16", link: "ezekiel_34_11_16" },
        { ref: "Jeremiah 3:15", link: "jeremiah_3_15" },
        { ref: "Isaiah 40:11", link: "isaiah_40_11" },
        { ref: "Zechariah 13:7", link: "zechariah_13_7" }
      ],
      investigatorNote: "The Greek words for 'love' and 'shepherd' carry deep theological weight—Jesus asks if Peter loves him with agape love, while Peter responds with phileo love. The commission transcends Peter's failure.",
      fake: false,
      category: 'people',
      timelineOrder: 4,
      clues: {
        compare: "Directly reverses Peter's three denials at the sanhedrin_trial fire — three questions answering three failures.",
        link: "People — Jesus's own threefold charge to Peter, asked and answered by the same fire.",
        timeline: "CHRONOLOGY: Spoken last, after breakfast was finished on the Galilean shore.",
        contradict: "RELIABILITY: The precise number and structure — three questions for three denials — is too exact to be coincidental."
      },
    },
    {
      id: "galilean_apparition",
      name: "Risen Appearance",
      type: "testimonial",
      relatedProphecy: "isaiah_53_10_11",
      icon: "../assets/gfx/eye-duotone.svg",
      location: "Shoreline Recognition",
      desc: "The disciples' recognition moment—how they knew this was Jesus. He had been dead, and now stood before them alive.",
      bibleRef: "John 21:12 — 'Jesus said to them, \"Come and have breakfast.\" None of the disciples dared ask him, \"Who are you?\" because they knew it was the Lord.'",
      propheticLink: "Isaiah 53:10–11 foretold that after His suffering the Servant would live again and \"see his offspring.\" Psalm 16:10 declared that God's Holy One would not remain in the grave. The disciples' recognition of Jesus on the shore was not merely a moment of faith—it was eyewitness confirmation that the crucified Messiah was alive, fulfilling the Scriptures.",
      bibleRefs: [
        { ref: "John 21:12", link: "john_2112" }
      ],
      propheticRefs: [
        { ref: "Isaiah 53:10-11", link: "isaiah_53_10_11" },
        { ref: "Psalm 16:10", link: "psalm_16_10" },
        { ref: "Acts 2:25-32", link: "acts_2_25_32" },
        { ref: "Acts 13:35-37", link: "acts_13_35_37" }
      ],
      investigatorNote: "Their recognition was immediate. No debate, no rational explanation—just the certainty that comes from intimate relationship.",
      fake: false,
      category: 'people',
      timelineOrder: 1,
      clues: {
        compare: "The moment that makes sense of everything else in this case — the disciples recognising Jesus before He said a word.",
        link: "People — the disciples' own account of instantly recognising the risen Jesus on the shore.",
        timeline: "CHRONOLOGY: The very first moment of this appearance, before the catch or the meal.",
        contradict: "RELIABILITY: John notes none of them dared ask who He was — an instinctive certainty, not a case built up over time."
      },
    },],

  lab: [
    {
      evidence: "charcoal_fire",
      suspect: "peter",
      result: "**Motive Clarified** (Links his restoration to his earlier denial)",
      notes: "One charcoal fire (John 18:18) saw three denials; a second (John 21:9) hears three declarations of love — 'Simon, do you love me?'"
    },
    {
      evidence: "miraculous_catch",
      suspect: "thomas",
      result: "**Identified as Witness** (His doubt led to physical proof)",
      notes: "'Unless I see the nail marks... I will not believe' (John 20:25) — Thomas's doubt is what makes his eventual confession, 'My Lord and my God,' count as evidence."
    }
  ],
  npcs: [
    {
      id: "peter",
      name: "Peter",
      role: "Restored Apostle",
      faction: "scribes",
      unlocksSuspects: ["peter"],
      avatar: "peter.svg",
      profileFile: "peter",
      color: 0xffaa44,
      pos: [0, 0, 0],
      truthfulness: 0.95,
      bibleRef: "John 21:15-19; 1 Corinthians 1:12",
      hasDialogue: true,
      storyFile: "peter_restored",
      unlocksEvidence: ["charcoal_fire", "threefold_commission"],
      revealsProphecy: "zechariah_13_7",
      background: "Simon Peter, once a bold fisherman, had denied knowing Jesus three times in the courtyard. Now restored, he would become the foundational apostle of the new church.",
      dialogue: {
        neutral: "I was ashamed. I had told everyone I would die for him—and then I couldn't even admit I knew him.",
        cautious: "When I saw that charcoal fire, I knew. It was the same place where I had warmed my hands and denied him.",
        pressured: "He asked me three times if I loved him. Each time, I said yes. Each time, he told me to feed his sheep. Do you understand what happened there?",
        exposed: "The first time he said 'Feed my lambs.' The second, 'Feed my sheep.' The third, 'Tend my sheep.' Three denials, three commissions. Three deaths, three resurrections of my calling.",
        repeat: "I am not who I was. I am still becoming who he says I am.",
      },
      reactions: {
        charcoal_fire: { text: "I knew immediately. That fire—it was the same kind as in the high priest's courtyard. My hands still trembled when I saw it.", isLie: false },
        miraculous_catch: { text: "We caught nothing all night. Then his voice from the shore: 'Cast the net on the right side.' Reluctantly, we obeyed. The net didn't tear—they never do with him.", isLie: false, revealedClue: "galilean_apparition" },
        threefold_commission: { text: "He asked me if I loved him. Three times. Each time, I answered. Each time, he commissioned me to feed his sheep. The third time, I was hurt—because I knew what he was doing.", isLie: false },
        bread_breakfast: { text: "He invited us to breakfast. The risen Lord—eating bread, eating fish. He could have appeared in glory, but he chose intimacy. That's who he is.", isLie: false },
        galilean_apparition: { text: "None of us asked who he was. We knew. We had seen him die, and yet we knew. It was like seeing your brother after thinking him dead.", isLie: false },
      },
      contradictions: {
        "charcoal_fire+threefold_commission": { exposed: "I wept when he asked me the third time. Not because I was offended—he was right. I had denied him out of fear, not lack of love. And yet he restored me anyway." },
      },
    },
    {
      id: "thomas",
      name: "Thomas",
      role: "Doubting Disciple",
      faction: "scribes",
      avatar: "thomas.svg",
      profileFile: "thomas",
      color: 0x66aaff,
      pos: [5, 0, 5],
      truthfulness: 0.9,
      bibleRef: "John 21:2; John 14:5, 20:24-29",
      hasDialogue: true,
      storyFile: "thomas_restoration",
      background: "Thomas, called 'the Twin,' would later be known as 'Doubting Thomas'—but here he stands as witness to the restoration.",
      revealsProphecy: "zechariah_13_7",
      dialogue: {
        neutral: "I was here. I saw it all. It's one thing to see him die. It's another to see him eat breakfast with us.",
        cautious: "The net was full—the fish were large. And when we came ashore, there he was. No mistaking. No doubt.",
        pressured: "Peter was pale. I've never seen him look like that—not even when he cut off the soldier's ear. He knew what was coming.",
        exposed: "After breakfast, he took Peter aside. We watched from a distance. Peter kept nodding. Finally, he broke down weeping. The rest of us understood—this was about more than fishing.",
        repeat: "Go ask Peter about what happened. He can tell you better than I.",
      },
      reactions: {
        charcoal_fire: { text: "Peter recognized it immediately. I didn't think about it until later—the same kind of fire where he denied him.", isLie: false },
        miraculous_catch: { text: "I counted them later—153 fish. Large ones, too. The net held, just like when we first followed him.", isLie: false },
        threefold_commission: { text: "Peter came back different. Not just restored—redefined. That was the moment he became the foundation.", isLie: false, revealedClue: "bread_breakfast" },
        bread_breakfast: { text: "He cooked for us. The risen Messiah—cooking breakfast on a charcoal fire. That's the kind of king he is.", isLie: false },
        galilean_apparition: { text: "I recognized him by his voice first. Then by what he did. He still does what he says.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "mary_magdalene",
      name: "Mary Magdalene",
      role: "First Witness",
      faction: "scribes",
      avatar: "mary_magdalene.svg",
      profileFile: "mary_magdalene",
      color: 0xdd44dd,
      pos: [8, 0, -3],
      truthfulness: 0.98,
      bibleRef: "John 21:1-14",
      hasDialogue: true,
      storyFile: "mary_magdalene",
      unlocksEvidence: ["miraculous_catch"],
      revealsProphecy: "ezekiel_34_11-16",
      background: "Mary had witnessed the empty tomb, and now stood by as Jesus restored Peter—the same Peter who had been so sure of his own loyalty.",
      dialogue: {
        neutral: "I was there at the tomb. I was there on the shore. I've seen what resurrection does to broken people.",
        cautious: "The women and I followed the disciples that morning. We watched from a distance as Jesus spoke to Peter.",
        pressured: "Peter wept when he understood. Not from shame now—but from being known. That's what he does—he knows us and loves us anyway.",
        exposed: "I've thought about this: the same man who denied him became the rock he builds his church on. What do you make of that?",
        repeat: "He knows every failure. He calls every name. He still builds his kingdom through cracked vessels.",
      },
      reactions: {
        threefold_commission: { text: "Peter had boasted he would die for Jesus. He couldn't even confess him. But the risen Lord knew his heart beyond his failure.", isLie: false },
        galilean_apparition: { text: "When you've seen the empty tomb, you learn to recognize him anywhere. Even cooking breakfast on a beach.", isLie: false },
        charcoal_fire: { text: "Peter's hands—those same hands that had warmed themselves at the courtyard fire—now warmed at this one. Full circle.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "nathanael",
      name: "Nathanael",
      role: "Honest Disciple",
      faction: "local",
      avatar: "nathan_gardener.svg",
      profileFile: "nathanael_disciple",
      color: 0x88cc88,
      pos: [-5, 0, 7],
      truthfulness: 0.9,
      bibleRef: "John 21:2; John 1:47",
      hasDialogue: true,
      storyFile: "nathanael_disciple",
      background: "Nathanael, whom Jesus called 'an Israelite in whom there is no guile,' was present as a witness to this restoration.",
      revealsProphecy: "ezekiel_34_11-16",
      dialogue: {
        neutral: "I came from Cana that morning. They told me about the catch, about the fire. I saw Peter's face.",
        cautious: "Peter was different after. Not just healed—redefined. He carried himself like a man who'd been given back his soul.",
        pressured: "I've known him since the beginning. He was always impulsive. But that morning—he was shaken in a way that became strength.",
        exposed: "He had denied the man standing before him. Now he was being asked to lead his people. That's grace.",
        repeat: "Ask him about the commission. I can only tell you what I observed.",
      },
      reactions: {
        miraculous_catch: { text: "I helped haul the net. 153 fish—large ones. The miracle wasn't just in catching them, but that the net held at all.", isLie: false },
        threefold_commission: { text: "I heard the exchange. Peter was pale. Jesus was gentle. It was the kindest confrontation I've ever witnessed.", isLie: false },
        bread_breakfast: { text: "He made them breakfast. The Son of God—making us breakfast. That's the kind of king who restores.", isLie: false },
      },
      contradictions: {},
    },
  ],

  deductions: {
    "charcoal_fire+threefold_commission": {
      compare: {
        text: "The charcoal fire where Peter denied Jesus becomes the fire of his restoration—same element, different outcome.",
        insight: "Jesus doesn't erase our failures; he transforms them into testimony. The place of shame became the place of grace.",
        isKey: true,
        revealsProphecy: "zechariah_13_7",
        bibleRef: "John 18:18; 21:9-17",
      },
      link: {
        text: "Each denial (by fire, by crow, by man) meets its antidote in each commission (by fire, by voice, by Christ).",
        insight: "This is prophetic reversal—the curse replaced with blessing, the fall with restoration.",
        isKey: true,
        bibleRef: "Zechariah 13:7; Ezekiel 34:11-16",
      },
    },
    "miraculous_catch+threefold_commission": {
      timeline: {
        text: "First: obedience to Christ's command yields the catch. Then: obedience to Christ's commission yields the calling.",
        insight: "Peter's failure came during his independent action (denying). His restoration came through submitting to Christ's word.",
        isKey: true,
        revealsProphecy: "ezekiel_34_11-16",
        bibleRef: "John 21:3, 15-17",
      },
      link: {
        text: "The net full of fish and the threefold charge to 'feed my sheep' are the same calling in two pictures — one about catching, one about tending.",
        insight: "Jesus first called Peter as a fisherman with a miraculous catch (Luke 5:1-11) and now recommissions him the same way, before handing him a shepherd's task instead of a fisherman's one.",
        isKey: false,
        bibleRef: "Luke 5:1-11; John 21:15-17",
      },
    },
    "galilean_apparition+bread_breakfast": {
      compare: {
        text: "The risen Christ eats with his disciples—God incarnate sharing a meal with human witnesses.",
        insight: "This confirms the physical resurrection. The appearances were not visions or dreams but real encounters with a bodily raised Jesus.",
        isKey: true,
        revealsProphecy: "ezekiel_34_11-16",
        bibleRef: "Luke 24:38-43; John 21:12",
      },
    },
    "galilean_apparition+miraculous_catch": {
      compare: {
        text: "The disciples' recognition of the risen Jesus on the shore and the miraculous catch of fish are two separate but connected proofs of His identity.",
        insight: "Isaiah 53:10-11 prophesied that the Servant would 'see his offspring' after his suffering. This appearance, confirmed by a miracle reminiscent of His initial calling of the disciples, is a direct fulfillment.",
        isKey: true,
        revealsProphecy: "isaiah_53_10_11",
        bibleRef: "John 21:12; Isaiah 53:10-11",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no crime to investigate. This was a divine restoration—Peter's threefold denial met with threefold commission, his shame replaced with grace.",
    method: "Jesus appeared to the disciples after resurrection, used the familiar details of fishing and fire to trigger recognition, then privately restored Peter through the threefold dialogue of love and commission.",
    lesson: "Jesus's restoration of Peter shows that failure never disqualifies us from grace. The same hands that warmed at the courtyard fire now warmed at the shoreline fire—receive mercy, then become mercy.",
    prophesyFulfilled: ["Zechariah 13:7", "Ezekiel 34:11-16", "Jeremiah 3:14"],
    furtherReading: ["John 21:1-19", "1 Corinthians 1:12-14", "Galatians 2:9-21"],
  },
};
