using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Scriptable Object for the BIRDS OF A FEATHER (REMAKE) example
/// Organized into separate components for easy management
/// </summary>
[CreateAssetMenu(fileName = "BirdsOfAFeather_Remake", menuName = "Strudel/Examples/BirdsOfAFeather_Remake", order = 4)]
public class BirdsOfAFeatherExample : StrudelExample
{
    public  void OnEnable()
    {
        // Initialize with Birds of a Feather example data
        exampleTitle = "BIRDS OF A FEATHER (REMAKE)";
        author = "saga_3k";
        description = "Birds of a Feather remake using Strudel";
        beatsPerMinute = 105f;
        timeSignature = "4/4";
        
        // Initialize instruments
        instruments = new List<InstrumentDefinition>
        {
            // Melody 1 (kalimba)
            new InstrumentDefinition
            {
                instrumentName = "m1",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Kalimba,
                scale = ScaleType.D_Major,
                octave = 2,
                patternType = PatternType.Melody,
                pattern = "[D@3 A@2 ~ D@2] [Cs@2 ~ A@2 ~ Cs@2]",
                rhythm = "12,24",
                noteDuration = 1.5f,
                attack = 0.025f,
                release = 0.2f,
                lpf = 1000f,
                room = 0.6f,
                roomSize = 2f,
                gain = 1.5f,
                description = "Main melody with kalimba sound"
            },
            
            // Melody 2 (kalimba + guitar layer)
            new InstrumentDefinition
            {
                instrumentName = "m2",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Kalimba,
                scale = ScaleType.D_Major,
                octave = 2,
                patternType = PatternType.Melody,
                pattern = "[D@3 A@2 ~ D@2] [Cs@2 ~ A@2 ~ Cs@2]",
                rhythm = "12,24",
                noteDuration = 1.5f,
                attack = 0.025f,
                release = 0.2f,
                lpf = 1000f,
                room = 0.6f,
                roomSize = 2f,
                gain = 2f,
                description = "Melody with kalimba and guitar layers"
            },
            
            // Guitar layer for m2
            new InstrumentDefinition
            {
                instrumentName = "m2_guitar",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.AcousticGuitar,
                scale = ScaleType.D_Major,
                octave = 2,
                patternType = PatternType.Melody,
                pattern = "[D@3 A@2 ~ D@2] [Cs@2 ~ A@2 ~ Cs@2]",
                rhythm = "12,24",
                release = 0.2f,
                room = 0.6f,
                roomSize = 2f,
                gain = 1f,
                description = "Guitar layer for melody 2"
            },
            
            // Drum pattern
            new InstrumentDefinition
            {
                instrumentName = "dr",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "LinnDrum",
                patternType = PatternType.Drum,
                pattern = "bd:<1 0>(<3 1>,8,<0 2>:1.3), ~ sd:<15>:2.5",
                rhythm = "2",
                decay = 0.3f,
                room = 0.3f,
                roomSize = 2f,
                description = "Main drum pattern with kick and snare"
            },
            
            // Hi-hats
            new InstrumentDefinition
            {
                instrumentName = "dr_hh",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "LinnDrum",
                patternType = PatternType.Drum,
                pattern = "LinnDrum_hh(<3 2>,8)",
                hpf = 1000f,
                lpf = 9000f,
                decay = 0.3f,
                velocity = ".8 .6",
                room = 0.3f,
                roomSize = 2f,
                description = "Hi-hat pattern"
            },
            
            // Shaker
            new InstrumentDefinition
            {
                instrumentName = "dr_sh",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "RolandTR808",
                patternType = PatternType.Drum,
                pattern = "sh*8",
                rhythm = "8",
                room = 0.6f,
                roomSize = 2f,
                velocity = ".8 .5",
                gain = 1.5f,
                description = "Shaker pattern"
            },
            
            // Chord progression
            new InstrumentDefinition
            {
                instrumentName = "chord",
                instrumentType = InstrumentType.Pad,
                soundType = SoundType.EPiano1,
                scale = ScaleType.D_Major,
                patternType = PatternType.Chord,
                pattern = "[[0,2,4,6] ~!3] ~ ~ ~, [-1,0,2,4] ~!3] ~ ~ ~, [1,3,5,7] ~!3]  ~ ~ ~, [-2,0,1,3] ~!3]  ~ [[-2,-1,1,3] ~!3] ~",
                decay = 1.5f,
                release = 0.25f,
                lpf = 2500f,
                delay = 0.45f,
                delayTime = 0.1f,
                delayFeedback = 0.3f,
                room = 0.6f,
                roomSize = 2f,
                gain = 1.5f,
                description = "Chord progression with piano"
            },
            
            // Bass root note
            new InstrumentDefinition
            {
                instrumentName = "bass1note",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.SynthBass,
                scale = ScaleType.D_Major,
                octave = 1, // D1:major
                patternType = PatternType.Bassline,
                pattern = "<0 -1 1 -2>/2",
                lpf = 800f,
                attack = 0.2f,
                release = 0.12f,
                delay = 0.45f,
                delayTime = 0.1f,
                delayFeedback = 0.3f,
                room = 0.6f,
                roomSize = 2f,
                gain = 1.3f,
                description = "Bass root note progression"
            },
            
            // Bassline fast guitar
            new InstrumentDefinition
            {
                instrumentName = "bassline",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.ElectricBassPick,
                scale = ScaleType.D_Major,
                octave = 2, // D2:major
                patternType = PatternType.Bassline,
                pattern = "<[D2!28 Cs2!4] B1*32 [E2!28 D2!4] A1*32>/2",
                decay = 0.5f,
                velocity = "rand.range(.7,1)",
                lpf = 1000f,
                attack = 0.2f,
                release = 0.12f,
                delay = 0.45f,
                delayTime = 0.1f,
                delayFeedback = 0.3f,
                room = 0.6f,
                roomSize = 2f,
                gain = 1.5f,
                description = "Fast bassline with guitar"
            },
            
            // Chord progression organ layer
            new InstrumentDefinition
            {
                instrumentName = "chordOrg",
                instrumentType = InstrumentType.Pad,
                soundType = SoundType.Church_Organ,
                scale = ScaleType.D_Major,
                octave = 2, // D2:major
                patternType = PatternType.Chord,
                pattern = "<[0,2,4,6], [-1,0,2,4], [1,3,5,7], [-2,0,1,3]>/2",
                noteDuration = 1f,
                delay = 0.45f,
                delayTime = 0.1f,
                delayFeedback = 0.3f,
                room = 0.6f,
                roomSize = 2f,
                gain = 0.6f,
                description = "Chord progression with organ"
            },
            
            // Chord progression arp layer
            new InstrumentDefinition
            {
                instrumentName = "chordArp",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.ElectricGuitar,
                scale = ScaleType.D_Major,
                octave = 4, // D4:major
                patternType = PatternType.Melody,
                pattern = "<[0 2 4 6]*8, [-1 0 2 4]*8, [1 3 5 7]*8, [-2 0 1 3]*8>/2",
                noteDuration = 0.08f,
                delay = 0.45f,
                delayTime = 0.1f,
                delayFeedback = 0.3f,
                room = 0.6f,
                roomSize = 2f,
                velocity = "saw.range(.8,1)",
                gain = 1.8f,
                description = "Chord arpeggio with guitar"
            }
        };
        
        // Initialize sections
        sections = new List<SectionDefinition>
        {
            new SectionDefinition
            {
                sectionName = "intro",
                cycleCount = 2,
                instrumentNames = new List<string> { "m1", "dr" },
                description = "Intro section with melody and drums"
            },
            
            new SectionDefinition
            {
                sectionName = "verse1",
                cycleCount = 8,
                instrumentNames = new List<string> { "m1", "dr", "chord", "bass1note" },
                description = "Verse 1 with full harmony"
            },
            
            new SectionDefinition
            {
                sectionName = "verse2",
                cycleCount = 8,
                instrumentNames = new List<string> { "m1", "dr", "chord", "bass1note", "bassline" },
                description = "Verse 2 with added bassline"
            },
            
            new SectionDefinition
            {
                sectionName = "chorus1",
                cycleCount = 8,
                instrumentNames = new List<string> { "m2", "dr", "chord", "bass1note", "bassline", "chordArp" },
                description = "Chorus 1 with melody 2 and arpeggio"
            },
            
            new SectionDefinition
            {
                sectionName = "chorus2",
                cycleCount = 8,
                instrumentNames = new List<string> { "m2", "dr", "chord", "bass1note", "bassline", "chordOrg", "chordArp" },
                description = "Chorus 2 with organ layer"
            },
            
            new SectionDefinition
            {
                sectionName = "bridge",
                cycleCount = 4,
                instrumentNames = new List<string> { "m2", "dr", "chord", "bass1note", "bassline", "chordOrg", "chordArp" },
                description = "Bridge section"
            },
            
            new SectionDefinition
            {
                sectionName = "outro",
                cycleCount = 4,
                instrumentNames = new List<string> { "m2", "dr", "bass1note", "bassline", "chordOrg" },
                description = "Outro section"
            }
        };
        
        // Initialize arrangements
        arrangements = new List<ArrangementDefinition>
        {
            new ArrangementDefinition
            {
                arrangementName = "FullSong",
                sections = new List<ArrangementSection>
                {
                    new ArrangementSection { sectionName = "intro", cycleCount = 2 },
                    new ArrangementSection { sectionName = "verse1", cycleCount = 8 },
                    new ArrangementSection { sectionName = "verse2", cycleCount = 8 },
                    new ArrangementSection { sectionName = "chorus1", cycleCount = 8 },
                    new ArrangementSection { sectionName = "chorus2", cycleCount = 8 },
                    new ArrangementSection { sectionName = "bridge", cycleCount = 4 },
                    new ArrangementSection { sectionName = "outro", cycleCount = 4 }
                },
                description = "Complete song arrangement"
            }
        };
        
        // Store the original Strudel code
        strudelCode = @"// BIRDS OF A FEATHER (REMAKE)
// by saga_3k
// @license CC BY-NC-SA

setcps(105/60/4) 

// melody (1 bar loop)
let m1 = 
note('<[D@3 A@2 ~ D@2] [Cs@2 ~ A@2 ~ Cs@2]>'.add('12,24')).s('gm_kalimba:3').legato(1.5).fast(2)
.attack(.025).release(.2).lp(1000)
.room('.6:2').postgain(1.5).color('#4dbcf4')._pitchwheel({edo:12,hapRadius:3,thickness:3,circle:1})

// melody with guitar layer (1 bar loop)
let m2 = 
note('<[D@3 A@2 ~ D@2] [Cs@2 ~ A@2 ~ Cs@2]>'.add('12,24'))
.layer(
x=>x.s('gm_kalimba:3').legato(1.5).attack(.025).release(.2).lp(1000).room('.6:2').postgain(2),
x=>x.s('gm_acoustic_guitar_steel:6').clip(1.5).release(.2).room('.6:2').postgain(1)
).fast(2)

// drum pattern (1 bar loop)
let dr =
stack( s('[bd:<1 0>(<3 1>,8,<0 2>:1.3)] , [~ sd:<15>:2.5]').note('B1').bank('LinnDrum')
.decay(.3).room('.3:2').fast(2),

s('[LinnDrum_hh(<3 2>,8)]').hp('1000').lp('9000').decay(.3).velocity(['.8 .6']).room('.3:2').fast(2),
s('sh*8').note('B1').bank('RolandTR808').room('.6:2').velocity('[.8 .5]!4').postgain(1.5).fast(2))._pianoroll({vertical:0,flipTime:1,fill:0,labels:1})

// chord progression (8 bar loop)
let chord =
n('<[[0,2,4,6] ~!3] ~ ~ ~
[[-1,0,2,4] ~!3] ~ ~ ~ 
[[1,3,5,7] ~!3]  ~ ~ ~
[[-2,0,1,3] ~!3]  ~ [[-2,-1,1,3] ~!3] ~ 
>').scale('D:major').s('gm_epiano1:6')  //gm_epiano1:6 or gm_bandoneon:6
.decay(1.5).release(.25).lp(2500).delay('.45:.1:.3').room('.6:2')
.postgain(1.5).fast(2)

// bass root note (8 bar loop)
let bass1note =
n('<0 -1 1 -2>/2').scale('D1:major').s('gm_lead_8_bass_lead:1')
.lp(800).clip(.1).attack(.2).release(.12)
.delay('.45:.1:.3').room('.6:2')
.postgain(1.3)._pianoroll({labels:1})

// bassline fast guitar (8 bar loop)
let bassline =
note('<[D2!28 Cs2!4] B1*32 [E2!28 D2!4] A1*32>/2').s('gm_electric_bass_pick')
.decay(.5).velocity(rand.range(.7,1).fast(4))
.lp(1000).compressor('-20:20:10:.002:.02').room('.6:2')
.postgain(1.5).color('white')._scope({thickness:2})

// chord progession organ layer (8 bar loop)
let chordOrg =
n('<[0,2,4,6]
[-1,0,2,4]
[1,3,5,7]
[-2,0,1,3]
>/2').scale('D2:major').s('gm_church_organ:4')
.legato(1).delay('.45:.1:.3').room('.6:2')
.postgain(.6)._pianoroll({labels:1,fill:0,strikeActive:1})

// chord progession arp layer (8 bar loop)
let chordArp =
n('<[0 2 4 6]*8
[-1 0 2 4]*8
[1 3 5 7]*8
[-2 0 1 3]*8
>/2').scale('D4:major').s('gm_electric_guitar_jazz:<2 3>')
.legato(.08).delay('.45:.1:.3').room('.6:2').velocity(saw.range(.8,1).fast(4))
.juxBy(1,rev())
.postgain(1.8)

// arrangement
$:arrange(
  [2,stack(m1,dr)],
  [8,s_polymeter(m1,dr,chord,bass1note)],
  [8,s_polymeter(m1,dr,chord,bass1note,bassline)],
  [8,s_polymeter(m2,dr,chord,bass1note,bassline,chordArp)],
  [8,s_polymeter(m2,dr,chord,bass1note,bassline,chordOrg,chordArp)],
  [4,s_polymeter(m2,dr,chord,bass1note,bassline,chordOrg,chordArp)],
  [4,s_polymeter(m2,arrange([2,dr],[2,silence]).fast(4),bass1note,bassline,chordOrg)]
  )
//.color('<pink cyan green orange>').punchcard({labels:1,vertical:1,flipTime:1,fill:0,strokeActive:1,filpValue:1,fontFamily:'teletext'})";
    }
}