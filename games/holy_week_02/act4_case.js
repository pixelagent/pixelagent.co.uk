// ============================================================
// CASE: The Missing Body  — difficulty 3 — Garden
// ============================================================

export const act4Case = {
   id:"resurrection",title:"The Missing Body",subtitle:"Jesus' body has vanished from the tomb.",location:"garden",difficulty:3,requires:"last_supper",
   intro:"Jesus was buried in Joseph of Arimathea's tomb on Friday evening, but when Mary Magdalene and the other women arrived early Sunday morning, the body was gone and the stone had been rolled away. Three people were seen near the tomb that morning.",
   suspects:[{id:"mary_magdalene",name:"Mary Magdalene",role:"Disciple",avatar:"👩"},{id:"peter",name:"Peter",role:"Disciple",avatar:"👨‍🦰"},{id:"guard",name:"Marcus",role:"Roman Guard",avatar:"🛡️"}],
   evidencePool:[
     {id:"rolled_stone",name:"Rolled Away Stone",type:"physical",desc:"The large stone that sealed the tomb has been moved to the side of the entrance.",location:"Tomb Entrance",icon:"🗿"},
     {id:"empty_tomb",name:"Empty Tomb Interior",type:"physical",desc:"The tomb chamber is completely empty except for the burial linens.",location:"Tomb Chamber",icon:"🕳️"},
     {id:"burial_linen",name:"Folded Burial Linens",type:"physical",desc:"The linen cloths that wrapped Jesus' body are found neatly folded where his body lay.",location:"Tomb Chamber",icon:"🧻"},
     {id:"angelic_message",name:"Angelic Message",type:"testimonial",desc:"A radiant being announced that Jesus has risen from the dead.",location:"Tomb Garden",icon:"👼"},
     {id:"guard_report",name:"Guard Report Fragment",type:"analytical",desc:"A broken tablet from the guard's log mentioning an earthquake and bright light.",location:"Guard Outpost",icon:"📜"},
     {id:"gardener_tool",name:"Gardener's Trowel",type:"environmental",desc:"A small trowel discarded near the tomb, possibly dropped by someone working in the garden.",location:"Tomb Garden",icon:"🌱"},
   ],
   npcs:[
     {id:"mary_magdalene",name:"Mary Magdalene",avatar:"👩",truthfulness:0.9,
      dialogue:{neutral:"I came to the tomb early to finish anointing Jesus' body.",cautious:"I was so worried about what happened to his body.",pressured:"I saw the stone rolled away and the tomb empty - I thought someone had taken the body!",exposed:"Then I saw Jesus himself! He called me by name and told me to go tell the disciples he was alive.",repeat:"I've told you everything I saw and heard at the tomb."},
      reactions:{rolled_stone:{text:"Of course the stone was moved - how else would anyone get in or out?",isLie:false},empty_tomb:{text:"Yes, the tomb is empty. I don't know who took the body.",isLie:true},angelic_message:{text:"That being told me Jesus was risen - I fell at his feet in worship!",isLie:false}},
      contradictions:{"empty_tomb+angelic_message":{exposed:"Yes, the tomb was empty. And yes, I did see a heavenly being who told me Jesus had risen."}}},
     {id:"peter",name:"Peter",avatar:"👨‍🦰",truthfulness:0.8,
      dialogue:{neutral:"I ran to the tomb when Mary Magdalene told me it was empty.",cautious:"John and I both went to see for ourselves.",pressured:"I saw the empty tomb and the folded linens, but I didn't see Jesus yet.",exposed:"Later that day, Jesus appeared to us in the locked room and showed us his wounds.",repeat:"I believe I've shared everything I witnessed."},
      reactions:{burial_linen:{text:"Yes, the linens were folded neatly. That doesn't happen if someone stole the body in a hurry.",isLie:false},gardener_tool:{text:"I don't know anything about a trowel - we were focused on the tomb itself.",isLie:true,revealedClue:"rolled_stone"}},
      contradictions:{}},
     {id:"guard",name:"Marcus",avatar:"🛡️",truthfulness:0.6,
      dialogue:{neutral:"We were guarding the tomb to make sure no one stole the body.",cautious:"We saw something we can't explain - an earthquake and a bright light.",pressured:"We told the truth about what we saw, even though it got us in trouble.",exposed:"An angel came down from heaven, rolled back the stone, and we became like dead men from fear.",repeat:"I've said all I intend to say about what we witnessed."},
      reactions:{guard_report:{text:"Yes, we filed a report about the earthquake and the light we saw.",isLie:false},rolled_stone:{text:"We didn't roll the stone - something supernatural moved it!",isLie:true},angelic_message:{text:"We did see a heavenly being, but we don't know if it was an angel or something else.",isLie:true}},
      contradictions:{"guard_report+rolled_stone":{exposed:"Yes, we reported the earthquake. And yes, we saw the stone moved by supernatural power."}}},
   ],
   deductions:{
     "rolled_stone+guard_report":{compare:{text:"The rolled stone and the guard report both point to supernatural intervention at the tomb.",insight:"Physical evidence and eyewitness testimony agree on what happened.",isKey:true},link:{text:"The stone was moved by power beyond human strength, confirming the extraordinary nature of the event.",isKey:true}},
     "empty_tomb+burial_linen":{compare:{text:"The empty tomb with folded linens suggests the body didn't simply decay or get stolen.",insight:"If thieves had taken the body, they would likely have left the linens in disarray or taken them too.",isKey:true}},
     "angelic_message+gardener_tool":{compare:{text:"The angelic message and the gardener's tool both suggest activity in the tomb garden area.",insight:"Someone or something was active in the garden around the time of the resurrection.",isKey:true}},
   },
   truth:{culprit:"none",motive:"There was no theft - Jesus rose from the dead by the power of God, as he had predicted.",method:"Jesus' body was supernaturally resurrected, leaving the tomb empty with only the burial linens remaining. Angelic beings announced the resurrection to witnesses.",lesson:"The resurrection is the cornerstone of Christian faith - proving Jesus' victory over sin and death."},
 };