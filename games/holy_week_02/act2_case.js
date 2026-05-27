// ============================================================
// CASE: The Missing Bread and Wine  — difficulty 3 — Harbour
// ============================================================

export const act2Case = {
   id:"last_supper",title:"The Missing Bread and Wine",subtitle:"The preparations for the Passover meal have been disturbed.",location:"upperroom",difficulty:3,requires:"authority_challenged",
   intro:"Jesus and his disciples are preparing to share the Passover meal in the upper room, but the bread and wine have gone missing from where they were prepared. Three people were seen in the vicinity of the upper room that afternoon.",
   suspects:[{id:"john_mark",name:"John Mark",role:"House Owner's Son",avatar:"👨‍🦰"},{id:"servant",name:"Rhoda",role:"Female Servant",avatar:"👧"},{id:"jerusalem_jew",name:"Ezra",role:"Devout Jerusalem Jew",avatar:"👨‍🎓"}],
   evidencePool:[
     {id:"bread_crumbs",name:"Unleavened Bread Crumbs",type:"physical",desc:"Crumbles of unleavened bread found on the floor near the preparation table.",location:"Upper Room Kitchen",icon:"🍞"},
     {id:"wine_stain",name:"Wine Stain on Tablecloth",type:"physical",desc:"A dark red stain on the linen tablecloth where the wine cups were placed.",location:"Upper Room Dining Table",icon:"🍷"},
     {id:"cup_fragments",name:"Broken Clay Cup Fragments",type:"physical",desc:"Pieces of a small clay cup that would have held wine for the ceremony.",location:"Upper Room Serving Area",icon:"🥃"},
     {id:"passover_lamb",name:"Passover Lamb Bones",type:"environmental",desc:"Bones from a lamb prepared for the Passover sacrifice, found outside the city gate.",location:"Sheep Gate",icon:"🐑"},
     {id:"water_jug",name:"Large Water Jug",type:"physical",desc:"A stone water jug used for ceremonial washing before the meal.",location:"Upper Room Entrance",icon:"🫙"},
     {id:"reservation_mark",name:"Room Reservation Mark",type:"analytical",desc:"A wax seal showing the upper room was reserved for Jesus and his disciples.",location:"House Owner's Office",icon:"🔖"},
   ],
   npcs:[
     {id:"john_mark",name:"John Mark",avatar:"👨‍🦰",truthfulness:0.7,
      dialogue:{neutral:"My father allowed Jesus to use our upper room for the Passover.",cautious:"I was helping prepare the room earlier today.",pressured:"I didn't take anything! I was just checking on the preparations.",exposed:"I saw Peter and John carefully arranging the bread and wine just before sunset. Everything was in place when I left.",repeat:"I've told you everything I saw that afternoon."},
      reactions:{bread_crumbs:{text:"Those crumbs are from when I was checking if the bread was fresh enough.",isLie:true},wine_stain:{text:"That stain looks like it's from spilled wine - maybe during preparation?",isLie:false},cup_fragments:{text:"I don't know anything about broken cups - we were using nice pottery.",isLie:true,revealedClue:"reservation_mark"}},
      contradictions:{"wine_stain+reservation_mark":{exposed:"Yes, I saw the wine stain from earlier preparation. And yes, the room was definitely reserved for Jesus' group."}}},
     {id:"servant",name:"Rhoda",avatar:"👧",truthfulness:0.8,
      dialogue:{neutral:"I was tasked with keeping the upper room clean and ready.",cautious:"I would never steal from Jesus and his disciples - they're honored guests!",pressured:"I was in and out all afternoon getting things ready.",exposed:"I noticed Judas Iscariot acting strangely earlier today, asking odd questions about the meal preparations.",repeat:"I believe I've shared everything relevant about the preparations."},
      reactions:{water_jug:{text:"Yes, I filled that jug myself this morning for the washing ceremony.",isLie:false},passover_lamb:{text:"The lamb was prepared at the temple and brought here just before sunset.",isLie:false,revealedClue:"bread_crumbs"}},
      contradictions:{}},
     {id:"jerusalem_jew",name:"Ezra",avatar:"👨‍🎓",truthfulness:0.4,
      dialogue:{neutral:"I came to Jerusalem early for Passover and was looking for a place to stay.",cautious:"I heard there was room available in a friend's upper room.",pressured:"Those disciples seemed secretive about their meal - what were they hiding?",exposed:"I want to speak with the religious authorities before saying anything more.",repeat:"I've said all I intend to say on this matter."},
      reactions:{reservation_mark:{text:"That wax seal is definitely from a friend of mine - he rents out rooms during festivals.",isLie:true},bread_crumbs:{text:"There are always crumbs when people are eating bread - means nothing.",isLie:true},water_jug:{text:"Everyone uses water jugs for washing before meals - it's standard.",isLie:true}},
      contradictions:{"passover_lamb+john_mark":{exposed:"Alright, I did ask about the lamb preparations. And yes, John Mark seemed nervous when I asked about the room."}}},
   ],
   deductions:{
     "bread_crumbs+passover_lamb":{compare:{text:"The bread crumbs and lamb bones both relate to the Passover meal preparation.",insight:"These items show the meal was being prepared as intended.",isKey:true},link:{text:"The bread was being prepared in the upper room while the lamb was being prepared elsewhere.",insight:"All elements of the Passover meal were coming together as planned.",isKey:true}},
     "wine_stain+cup_fragments":{link:{text:"The wine stain and broken cup fragments suggest the wine cups were used and then damaged.",insight:"Something interrupted the meal preparations after the wine was poured.",isKey:true}},
     "water_jug+reservation_mark":{compare:{text:"The water jug was filled for ceremonial washing, and the reservation mark shows the room was set aside for this specific group.",insight:"The preparations were being made for Jesus and his disciples specifically.",isKey:true}},
   },
   truth:{culprit:"jerusalem_jew",motive:"Ezra, fearing ritual contamination from associating with Jesus' group, tried to disrupt the meal to prevent the gathering.",method:"Ezra entered the upper room unnoticed and scattered the bread, spilled the wine, and broke a cup, hoping to make the preparations unusable.",lesson:"Sometimes people try to obstruct God's work out of misunderstanding or fear."},
 };