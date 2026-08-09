// ============================================================
// CHARACTER: Pontius Pilate (Temple Variant)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: ORPHAN/VARIANT FILE - Act I Temple cleansing assessment (not wired into linear case)
// ------------------------------------------------------------
// ============================================================
//
{
  "inkVersion": 21,
  "_comments": {
    "story": "Act I - Pontius Pilate's assessment of the Temple cleansing disturbance.",
    "characters": ["Pontius Pilate"],
    "bible_verses": "John 2:13-17; Psalm 69:9",
    "prophecies": "Psalm 69:9 - 'Zeal for your house will consume me'"
  },
  "root": [
    [
      {
        "->": "start"
      },
      [
        "done",
        {
          "#f": 5,
          "#n": "g-0"
        }
      ],
      null
    ],
    "done",
    {
      "start": [
        [
          "^I am Pontius Pilate, governor of Judea. I have no interest in your Jewish temple disputes. I deal in order, not theology.",
          "\n",
          "^But a disturbance in the Court of the Gentiles is a Roman concern. The priests came to me this morning, pale-faced, claiming insurrection.",
          "\n",
          "^I investigated personally. What I found was not rebellion. It was a single man with a whip of rushes and a message.",
          "\n",
          {
            "ev": "str",
            "^": "What did you find at the scene?",
            "/str": "/ev",
            "*": ".^.c-0",
            "flg": 20
          },
          {
            "ev": "str",
            "^": "Did you see the Galilean?",
            "/str": "/ev",
            "*": ".^.c-1",
            "flg": 20
          },
          {
            "c-0": [
              "^ ",
              {
                "->": "scene"
              },
              "\n",
              {
                "#f": 5
              }
            ],
            "c-1": [
              "^ ",
              {
                "->": "galilean"
              },
              "\n",
              {
                "#f": 5
              }
            ]
          }
        ],
        {
          "#f": 1
        }
      ],
      "scene": [
        [
          "^The money tables were overturned. Dove cages broken. But the silver — the Tyrian shekels — was scattered, not stolen. The birds were released, not captured.",
          "\n",
          "^A thief takes. A zealot destroys. This man... discarded the instruments of corruption and left the merchants standing there, unharmed.",
          "\n",
          "^That is not insurrection. That is contempt.",
          "\n",
          "* [Why didn't you arrest Him?] -> justice",
          "* [What did the priests say?] -> priests",
          {
            "#f": 1
          }
        ]
      ],
      "galilean": [
        [
          "^I saw Him from the parapet. He stood in the middle of the court, surrounded by merchants cowering on the ground. He said nothing. Just looked at them.",
          "\n",
          "^When He left, the crowd followed Him like sheep. Not a weapon among them. Not a threat to Rome. Just... a man on a mission.",
          "\n",
          "* [What mission?] -> mission",
          "* [That sounds dangerous.] -> dangerous",
          {
            "#f": 1
          }
        ]
      ],
      "mission": [
        [
          "^His disciples quoted a Psalm afterward. 'Zeal for your house will consume me.' Psalm 69. David wrote it about the temple. This man... He lived it.",
          "\n",
          "^I have crucified men for less. But this one... He has a fire in Him that does not come from Rome.",
          "\n",
          "* [That fire could burn your province.] -> burning",
          "* [Then He is a prophet, not a rebel.] -> prophet",
          {
            "#f": 1
          }
        ]
      ],
      "dangerous": [
        [
          "^Dangerous? A man who destroys property without shedding blood is not dangerous to Rome. He is dangerous to the priesthood.",
          "\n",
          "^And the priests know it. That is why they are so angry. Not because of the shekels. Because He exposed their system for what it is: a profit margin dressed in incense.",
          "\n",
          "* [Will they try to arrest Him?] -> arrest",
          "* [And your role?] -> role",
          {
            "#f": 1
          }
        ]
      ],
      "justice": [
        [
          "^Arrest Him for what? Cleaning up a market? The Romans do not execute men for disturbing Jewish commerce. That is their problem. Their sacred business.",
          "\n",
          "^Unless... unless the priests make it my problem. They are already framing this as sedition. They will say the Galilean incited the crowd to violence.",
          "\n",
          "* [Did He?] -> violence",
          "* [Will you believe them?] -> believe",
          {
            "#f": 1
          }
        ]
      ],
      "priests": [
        [
          "^The high priest's household came to me personally. They used the word 'insurrection.' They showed me overturned tables and scattered coins.",
          "\n",
          "^I asked them: where are the dead? Where are the wounded? Where is the Roman damage? They had no answer.",
          "\n",
          "^Because there was none. This was a domestic theological dispute. Not a Roman concern. Not yet.",
          "\n",
          "* [Not yet?] -> yet",
          "* [So you dismissed them?] -> dismissed",
          {
            "#f": 1
          }
        ]
      ],
      "burning": [
        [
          "^Let it burn. The temple system is rotten. The priests line their pockets with temple tax while the poor bring doves they cannot afford. I have watched this for years.",
          "\n",
          "^But a province that burns is a province Rome must pacify. And pacification is ugly. I have crucified entire villages for less than this.",
          "\n",
          "* [And yet you did nothing.] -> nothing",
          "* [You fear what He might become.] -> become",
          {
            "#f": 1
          }
        ]
      ],
      "prophet": [
        [
          "^A prophet. Yes. That is what He claims to be. And prophets are more dangerous than rebels. Rebels can be crucified. Prophets... cannot be killed so easily.",
          "\n",
          "^The priests understand this. That is why they are so afraid. They can deal with a military messiah. They cannot deal with a man who quotes their own Scriptures and turns their own courts against them.",
          "\n",
          "* [What will you do?] -> closing",
          "* [This will end badly.] -> badly",
          {
            "#f": 1
          }
        ]
      ],
      "arrest": [
        [
          "^They are already plotting. I have informants in the Sanhedrin. They want Him arrested for blasphemy — their charge, not mine.",
          "\n",
          "^But they cannot execute Him without Roman approval. And I will not sign a death warrant for a man who has committed no crime against Rome.",
          "\n",
          "* [Not yet.] -> closing",
          "* [You sound uncertain.] -> uncertain",
          {
            "#f": 1
          }
        ]
      ],
      "role": [
        [
          "^My role is to keep the peace. If the Galilean continues to disrupt the temple courts, the priests will incite the crowd. The crowd will turn on Rome.",
          "\n",
          "^And I will have no choice but to send in the cohorts. Not to protect the priests. To protect the Pax Romana.",
          "\n",
          "* [And if the crowd turns on the priests instead?] -> crowd",
          "* [Then you will crucify an innocent man.] -> innocent",
          {
            "#f": 1
          }
        ]
      ],
      "violence": [
        [
          "^Did He? I watched from the Antonia fortress. I saw the dove cages break. I saw the coins scatter. I did not see a single sword. Not a single stone thrown.",
          "\n",
          "^The priests will say there was violence. They will fabricate witnesses. They always do. But my record will say: a man with a whip of rushes and a Psalm on his lips.",
          "\n",
          "* [That record may not save Him.] -> save",
          "* [And your conscience?] -> conscience",
          {
            "#f": 1
          }
        ]
      ],
      "believe": [
        [
          "^Believe the priests? They are the ones who run the temple tax racket. They are the ones who profit from the poor bringing doves. Of course they want Him silenced.",
          "\n",
          "^But I am a Roman. I do not take sides in Jewish theological wars. I take orders. And my orders are to prevent sedition. Not to protect corrupt priests from prophets.",
          "\n",
          "* [So you will protect the Galilean?] -> protect",
          "* [For now.] -> fornow",
          {
            "#f": 1
          }
        ]
      ],
      "yet": [
        [
          "^Not yet. But the priests will not let this go. They will find a way to make it my problem. They will fabricate a Roman charge. They will bring Him to my praetorium.",
          "\n",
          "^And when they do... I will have to choose. Between a prophet and a province. Between justice and peace.",
          "\n",
          "* [Choose justice.] -> justice_choice",
          "* [Choose peace.] -> peace_choice",
          {
            "#f": 1
          }
        ]
      ],
      "dismissed": [
        [
          "^I dismissed them. Politely. I told them the disturbance was domestic. I told them to handle their own prophet.",
          "\n",
          "^But they will not stop. They are already planning. I can see it in their eyes. They want Him dead. And they will use my court to do it.",
          "\n",
          "* [Will you let them?] -> let_them",
          "* [You are a pawn in their game.] -> pawn",
          {
            "#f": 1
          }
        ]
      ],
      "nothing": [
        [
          "^I did nothing. Because there was nothing to do. A man cleansed a market. He did not burn a fortress. He did not kill a centurion.",
          "\n",
          "^If I had arrested Him, I would have been the tool of corrupt priests. And I will not be anyone's tool.",
          "\n",
          "* [Not even Rome's?] -> rome",
          "* [So you let Him go.] -> closing",
          {
            "#f": 1
          }
        ]
      ],
      "become": [
        [
          "^I do not fear what He is. I fear what the priests will make Him. They will turn this cleansing into a revolution. They will use the crowd to force my hand.",
          "\n",
          "^And when they do, I will have to choose. Between a man who quotes Psalms and a province that burns.",
          "\n",
          "* [Choose the Psalm.] -> psalm_choice",
          "* [Choose the province.] -> province_choice",
          {
            "#f": 1
          }
        ]
      ],
      "crowd": [
        [
          "^Then the priests will look like the oppressors. And the Galilean will look like a liberator. That is the danger. Not to Rome. To the temple establishment.",
          "\n",
          "^But the crowd is fickle. Today they welcome Him with palms. Tomorrow they will demand His death. I have seen it before. I will see it again.",
          "\n",
          "* [And you will do nothing?] -> closing",
          "* [History will judge your inaction.] -> history",
          {
            "#f": 1
          }
        ]
      ],
      "innocent": [
        [
          "^Innocent? By Roman law, yes. By Jewish law... that is not my jurisdiction. I govern Judea. I do not interpret their Torah.",
          "\n",
          "^But I am not a monster. If the priests bring me a man who has committed no crime against Rome, I will not crucify Him. Not for them. Not for anyone.",
          "\n",
          "* [Promise me.] -> promise",
          "* [That is not good enough.] -> not_enough",
          {
            "#f": 1
          }
        ]
      ],
      "save": [
        [
          "^That record is all I have. A man with a whip of rushes. A temple full of scattered coins. A crowd of terrified merchants.",
          "\n",
          "^It will not save Him from the Sanhedrin. But it might save Him from Rome. And in this province, that is the only salvation that matters.",
          "\n",
          "* [You are a better man than you pretend.] -> closing",
          "* [That is not the same as saving Him.] -> closing",
          {
            "#f": 1
          }
        ]
      ],
      "conscience": [
        [
          "^My conscience is a Roman governor's conscience. It sleeps soundly as long as the legions are paid and the taxes are collected.",
          "\n",
          "^But even a Roman conscience has limits. I will not sign a death warrant for a man who has done nothing to Rome. That is my limit.",
          "\n",
          "* [That is not much of a limit.] -> closing",
          "* [It is enough.] -> closing",
          {
            "#f": 1
          }
        ]
      ],
      "protect": [
        [
          "^Protect Him? I do not protect Jewish prophets. I maintain Roman order. As long as He does not threaten the Pax Romana, He is not my concern.",
          "\n",
          "^But if the priests make Him my concern... if they fabricate a sedition charge... then I will have to act. And I will act according to Roman law, not Jewish hysteria.",
          "\n",
          "* [And what does Roman law say?] -> closing",
          "* [You are walking a fine line.] -> closing",
          {
            "#f": 1
          }
        ]
      ],
      "fornow": [
        [
          "^For now. But the priests will not let this go. They will bring Him to me. They will demand crucifixion for a crime that does not exist.",
          "\n",
          "^And I will have to decide whether to be a Roman or a pawn.",
          "\n",
          "* [Be a Roman.] -> closing",
          "* [Be a man.] -> closing",
          {
            "#f": 1
          }
        ]
      ],
      "closing": [
        [
          "^Investigate all you want. The Galilean disturbed the temple courts. He scattered the priests' silver. He released their birds.",
          "\n",
          "^But He did not commit a Roman crime. And I will not execute a man for quoting Psalms.",
          "\n",
          "-> DONE"
        ],
        {
          "#f": 1
        }
      ],
      "justice_choice": [
        [
          "^Justice. You ask a Roman governor to choose justice. In this province, justice is a luxury. Peace is a necessity.",
          "\n",
          "^But you are right. If I choose peace over justice, I am no better than the priests I despise.",
          "\n",
          "^I will wait. I will see what charges they bring. And I will judge according to Roman law, not their religious fury.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "peace_choice": [
        [
          "^Peace. Always peace. A dead prophet is a martyr. A living prophet is a problem. But a dead prophet can ignite a province.",
          "\n",
          "^I will choose peace. I will give them Barabbas. I will wash my hands. And I will go back to Caesarea knowing I sent an innocent man to the cross.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "let_them": [
        [
          "^Let them bring Him. I will judge according to Roman law. And Roman law does not execute men for cleaning up corrupt markets.",
          "\n",
          "^Unless... unless they fabricate a sedition charge. Then I will have no choice.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "pawn": [
        [
          "^I am always a pawn. The emperor sends me to Judea to keep the peace. The priests use me to legitimize their murders. The crowds use me to satisfy their bloodlust.",
          "\n",
          "^A Roman governor is never a man. He is a function. A tool. A basin of water for washing hands that are never clean.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "rome": [
        [
          "^Rome wants taxes. Rome wants order. Rome does not care which prophet the priests kill, as long as the silver keeps flowing.",
          "\n",
          "^But I do care. Not because I am a good man. Because I am a Roman. And Romans do not execute innocent men for the convenience of corrupt priests.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "history": [
        [
          "^History is written by the victors. And in this province, the victors are always the ones with the legions.",
          "\n",
          "^Let history judge. I have a province to govern. And a prophet to watch.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "promise": [
        [
          "^I cannot promise you anything. The priests will bring Him to me. They will demand His blood. And I will face a crowd the size of a legion.",
          "\n",
          "^But I will not crucify a man for quoting Isaiah. That is my promise. Not to you. To myself.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "not_enough": [
        [
          "^Nothing is ever good enough for a prophet's followers. You want a guarantee. I can give you only a probability.",
          "\n",
          "^The probability is this: I will not execute a man who has committed no Roman crime. That is the best a governor can offer in this province.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "save_him": [
        [
          "^That record — the whip of rushes, the scattered coins, the unharmed merchants — it is the only thing that might save Him.",
          "\n",
          "^If the priests bring Him to me on a Roman charge, I will judge. But if they bring Him on a Jewish charge... I will wash my hands.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "psalm_choice": [
        [
          "^Choose the Psalm. You ask a Roman governor to choose a Jewish Psalm over Roman peace. You have more faith in this province than I do.",
          "\n",
          "^But perhaps you are right. A man who quotes Psalms and cleanses temples is not a rebel. He is a reformer. And Rome needs reformers, not martyrs.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "province_choice": [
        [
          "^Choose the province. A thousand dead Jews is a statistical error. One dead prophet is a theological earthquake.",
          "\n",
          "^I will choose the province. I will choose peace. I will choose to forget that I ever saw a man with a whip of rushes and a fire in His eyes.",
          "\n",
          "-> closing"
        ],
        {
          "#f": 1
        }
      ],
      "#f": 1
    }
  ],
  "listDefs": {}
}
