// ============================================================
// CASE: The Missing Donkey  — difficulty 1 — School
// ============================================================

export const act1Case = {
   id:"triumphal_entry",title:"The Missing Donkey",subtitle:"The promised donkey for Jesus' entry has gone missing.",location:"jerusalem",difficulty:1,requires:null,
   intro:"Jesus needs a donkey to ride into Jerusalem as prophesied, but the borrowed donkey has vanished from Bethphage. Two disciples were sent to find it, and several people were seen near the area.",
   suspects:[{id:"peter",name:"Peter",role:"Disciple",avatar:"👨‍🦰"},{id:"john",name:"John",role:"Disciple",avatar:"👨‍🦰"},{id:"owner",name:"Donkey Owner",role:"Villager",avatar:"👴"}],
   evidencePool:[
     {id:"cloaks",name:"Disciple Cloaks",type:"physical",desc:"Two cloaks found near the donkey's usual tethering spot.",location:"Bethphage Road",icon:"👕"},
     {id:"donkey_tracks",name:"Donkey Tracks",type:"physical",desc:"Fresh hoofprints leading toward Jerusalem from Bethphage.",location:"Mount of Olives Path",icon:"👣"},
     {id:"witness_account",name:"Witness Account",type:"testimonial",desc:"A villager reports seeing two men untying a donkey colt this morning.",location:"Bethphage Village Square",icon:"👂"},
     {id:"prophecy_scroll",name:"Prophecy Scroll Fragment",type:"analytical",desc:"A scrap of parchment with Zechariah 9:9 written on it.",location:"Donkey Owner's Tent",icon:"📜"},
     {id:"palm_branch",name:"Palm Branch",type:"environmental",desc:"A fresh palm branch, not native to Bethphage but common near Jerusalem.",location:"Road to Jerusalem",icon:"🌴"},
     {id:"rope_fibers",name:"Rope Fibers",type:"physical",desc:"Fibers from the rope used to tether the donkey, cut cleanly.",location:"Tethering Post",icon:"🧵"},
   ],
   npcs:[
     {id:"peter",name:"Peter",avatar:"👨‍🦰",truthfulness:0.7,
      dialogue:{neutral:"We were sent by Jesus to find a donkey.",cautious:"Why do you question our mission? We're following orders.",pressured:"We found the donkey exactly where Jesus said it would be!",exposed:"We brought the donkey colt to Jesus just as He instructed. The owner knew about the prophecy.",repeat:"I've already told you what we saw and heard."},
      reactions:{cloaks:{text:"Those aren't ours. We left our cloaks with Jesus.",isLie:true},donkey_tracks:{text:"Of course there are tracks - we led the donkey here!",isLie:false},witness_account:{text:"That must have been someone else. We were with the donkey the whole time.",isLie:true,revealedClue:"prophecy_scroll"},prophecy_scroll:{text:"Jesus showed us that prophecy before we left.",isLie:false}},
      contradictions:{"witness_account+prophecy_scroll":{exposed:"Okay, we did show the owner the prophecy scroll. He was happy to lend the donkey for such a special purpose."}}},
     {id:"john",name:"John",avatar:"👨‍🦰",truthfulness:0.8,
      dialogue:{neutral:"Peter and I went together to fetch the donkey.",cautious:"Are you doubting Jesus' word? He knew exactly where it would be.",pressured:"We didn't steal it - the owner gave it freely after we explained.",exposed:"The owner was actually excited when we told him Jesus needed it. He blessed us as we left.",repeat:"I believe I've shared everything relevant."},
      reactions:{witness_account:{text:"I don't know who that villager is, but I saw Peter talking to the donkey owner.",isLie:false},prophecy_scroll:{text:"Yes, we had that scripture fragment. Jesus quoted it to us before we departed.",isLie:false},palm_branch:{text:"People were already cutting palm branches when we arrived with the donkey.",isLie:false,revealedClue:"cloaks"}},
      contradictions:{}},
     {id:"owner",name:"Donkey Owner",avatar:"👴",truthfulness:0.9,
      dialogue:{neutral:"Someone came asking for my donkey colt this morning.",cautious:"I lent it to them willingly after they explained why Jesus needed it.",pressured:"They seemed like honest followers of Jesus. I don't suspect them of anything wrong.",exposed:"Two of Jesus' disciples came, quoted Scripture about the Messiah coming on a donkey, and I gladly lent them my colt.",repeat:"I've already told you everything I know about this matter."},
      reactions:{rope_fibers:{text:"I cut that rope myself to tether the donkey more securely after they left.",isLie:true},cloaks:{text:"I saw them leave their cloaks with Jesus as they rode toward Jerusalem.",isLie:false},prophecy_scroll:{text:"They showed me that prophecy - how could I refuse after seeing it fulfilled?",isLie:false}},
      contradictions:{"cloaks+palm_branch":{exposed:"Yes, they left their cloaks with Jesus. And yes, people were waving palm branches - what a glorious sight!"}}},
   ],
   deductions:{
     "cloaks+prophecy_scroll":{compare:{text:"The cloaks found match the typical garment of Jesus' disciples. The prophecy fragment confirms they knew Scripture.",insight:"The disciples were acting under Jesus' direct instruction.",isKey:true},link:{text:"The cloaks place the disciples at the scene, and the prophecy shows their purpose.",insight:"This was a divinely appointed mission, not random theft.",isKey:true}},
     "donkey_tracks+witness_account":{compare:{text:"The fresh tracks align with the timing of the witness account.",insight:"Someone was leading a donkey toward Jerusalem when seen.",isKey:true},timeline:{text:"First: Witness sees men with donkey. Then: Fresh tracks leading to Jerusalem.",insight:"Timeline confirms the donkey was taken toward Jerusalem as intended.",isKey:true}},
     "prophecy_scroll+palm_branch":{link:{text:"The prophecy about the donkey and the palm branches of praise go together perfectly.",insight:"These evidences show both the fulfillment of prophecy and the people's recognition.",isKey:true}},
   },
   truth:{culprit:"none",motive:"There was no theft - the donkey was lent willingly by its owner after the disciples explained Jesus needed it to fulfill prophecy.",method:"The disciples borrowed the donkey colt with the owner's permission, used cloaks as a saddle, and brought it to Jesus for His triumphal entry.",lesson:"Sometimes what appears suspicious is actually a beautiful fulfillment of God's plan when we have all the facts."},
 };