// ============================================================
// CASE: Jesus's Authority Challenged  — difficulty 2 — Temple
// ============================================================

export const act3Case = {
   id:"authority_challenged",title:"The Challenged Teacher",subtitle:"Jesus' authority is questioned by religious leaders in the Temple courts.",location:"temple",difficulty:2,requires:"triumphal_entry",
   intro:"Jesus is teaching in the Temple courts when the chief priests, scribes, and elders confront Him, demanding to know by what authority He does these things. Three religious leaders were seen engaging Jesus in debate that morning.",
   suspects:[{id:"chief_priest",name:"Caiaphas",role:"Chief Priest",avatar:"👨‍⚖️"},{id:"scribe",name:"Samuel",role:"Temple Scribe",avatar:"👨‍💼"},{id:"elder",name:"Levi",role:"Temple Elder",avatar:"👨‍🦰"}],
   evidencePool:[
     {id:"question_scroll",name:"Question Scroll Fragment",type:"analytical",desc:"A parchment with the religious leaders' challenge to Jesus' authority written on it.",location:"Temple East Court",icon:"📜"},
     {id:"parable_fragments",name:"Parable Fragments on Ground",type:"physical",desc:"Pieces of broken pottery with parable teachings sketched on them.",location:"Temple West Court",icon:"🏺"},
     {id:"stone_inscription",name:"Stone Carving Fragment",type:"physical",desc:"A piece of limestone with a cornerstone carving, possibly from Temple renovations.",location:"Temple South Wall",icon:"🪨"},
     {id:"coin_offering",name:"Coin Offering in Treasury",type:"physical",desc:"A special coin offering left in the Temple treasury that day.",location:"Temple Treasury",icon:"🪙"},
     {id:"fig_leaf",name:"Fig Tree Leaf Sample",type:"environmental",desc:"A fresh fig leaf from the barren fig tree Jesus cursed earlier that morning.",location:"Mount of Olives Path",icon:"🍃"},
     {id:"witness_scroll",name:"Witness Scroll Testimony",type:"testimonial",desc:"A scroll recording what a bystander heard during the authority challenge.",location:"Temple North Court",icon:"📜"},
   ],
   npcs:[
     {id:"chief_priest",name:"Caiaphas",avatar:"👨‍⚖️",truthfulness:0.6,
      dialogue:{neutral:"This Galilean teacher thinks he can come into OUR Temple and teach?",cautious:"I have served in the Temple for forty years. My authority is beyond question.",pressured:"Are you questioning MY authority in God's house?",exposed:"We asked Him by what authority He does these things - it's a reasonable question for the Temple leadership.",repeat:"I've already stated what I know about the Temple authority structure."},
      reactions:{question_scroll:{text:"Yes, that's our official challenge. We needed to know His source of authority.",isLie:false},parable_fragments:{text:"Those parables confuse the people - they need clear teaching from the Law.",isLie:false,revealedClue:"stone_inscription"}},
      contradictions:{"question_scroll+witness_scroll":{exposed:"Yes, we questioned His authority. And yes, several witnesses heard our exchange."}}},
     {id:"scribe",name:"Samuel",avatar:"👨‍💼",truthfulness:0.8,
      dialogue:{neutral:"I was recording Temple proceedings when the confrontation began.",cautious:"I write down what happens - I don't make the rules.",pressured:"I was just doing my job as scribe. Don't blame me for recording what happened.",exposed:"I noticed Jesus answered their question with a question of His own - about John's baptism. That was quite clever.",repeat:"I believe I've shared everything I witnessed as the Temple scribe."},
      reactions:{coin_offering:{text:"Yes, I saw that unusual coin offering in the treasury today.",isLie:false},fig_leaf:{text:"I saw someone with a fig leaf earlier - strange for this time of year.",isLie:false,revealedClue:"parable_fragments"}},
      contradictions:{}},
     {id:"elder",name:"Levi",avatar:"👨‍🦰",truthfulness:0.4,
      dialogue:{neutral:"I've been an elder in this Temple since before Jesus was born.",cautious:"You youngsters don't understand the weight of Tradition and authority.",pressured:"Those priests think they know everything just because they wear fancy robes.",exposed:"I want to consult with the Sanhedrin before saying anything more about Temple authority matters.",repeat:"I've said all I intend to say on this matter."},
      reactions:{stone_inscription:{text:"Yes, I helped carve that cornerstone fragment during recent repairs.",isLie:false},witness_scroll:{text:"The witness testimony matches what I heard - Jesus handled Himself well.",isLie:true}},
      contradictions:{"coin_offering+fig_leaf":{exposed:"Alright, I did see that special coin offering. And yes, I noticed someone with a fig leaf from the cursed tree."}}},
   ],
    deductions:{
      'question_scroll+witness_scroll':{compare:{text:'The question scroll and witness testimony both confirm the religious leaders challenged Jesus\' authority.',insight:'Multiple sources verify the confrontation took place as described.',isKey:true},link:{text:'The challenge happened publicly in the Temple courts where many could witness it.',isKey:true}},
      'parable_fragments+stone_inscription':{link:{text:'The parable fragments and cornerstone carving both relate to Jesus\' teaching about Himself as the \'cornerstone\'.',insight:'Jesus quoted Psalm 118:22 about the cornerstone during this exchange.',isKey:true}},
      'fig_leaf+coin_offering':{compare:{text:'The fig leaf from the cursed tree and the special Temple offering both occurred on this significant day.',insight:'These items connect the morning\'s fig tree cursing with the afternoon\'s Temple teachings.',isKey:true}},
    },
   truth:{culprit:"none",motive:"There was no crime - the religious leaders legitimately questioned Jesus' authority, which He answered with wisdom that exposed their hypocrisy.",method:"Jesus responded to their authority question with a question about John's baptism, then taught parables revealing their rejection of God's plan.",lesson:"Sometimes questioning authority is appropriate when done with the right heart and willingness to accept the answer."},
 };