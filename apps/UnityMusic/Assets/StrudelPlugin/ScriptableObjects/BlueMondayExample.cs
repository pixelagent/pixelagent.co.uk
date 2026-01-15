using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Scriptable Object for the New Order - Blue Monday (cover / remix) example
/// Organized into separate components for easy management
/// </summary>
[CreateAssetMenu(fileName = "BlueMonday_NewOrder_Cover", menuName = "Strudel/Examples/BlueMonday_NewOrder_Cover", order = 6)]
public class BlueMondayExample : StrudelExample
{
    public  void OnEnable()
    {
        // Initialize with Blue Monday example data
        exampleTitle = "New Order - Blue Monday (cover / remix)";
        author = "Lewis";
        description = "Blue Monday cover/remix using Strudel";
        beatsPerMinute = 130f;
        timeSignature = "4/4";
        
        // Initialize instruments
        instruments = new List<InstrumentDefinition>
        {
            // Kick 1
            new InstrumentDefinition
            {
                instrumentName = "kick1",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "linn",
                patternType = PatternType.Drum,
                pattern = "<[bd bd [bd*4] [bd*4]] [bd*4]>",
                decay = 0.15f,
                description = "Main kick pattern 1"
            },
            
            // Kick 2
            new InstrumentDefinition
            {
                instrumentName = "kick2",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "linn",
                patternType = PatternType.Drum,
                pattern = "[bd*4]",
                decay = 0.15f,
                description = "Main kick pattern 2"
            },
            
            // Hats 1
            new InstrumentDefinition
            {
                instrumentName = "hats1",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "dmx",
                patternType = PatternType.Drum,
                pattern = "[oh oh*2]*4",
                decay = 0.1f,
                sustain = 0.1f,
                gain = 0.12f,
                description = "Open hi-hat pattern 1"
            },
            
            // Hats 2
            new InstrumentDefinition
            {
                instrumentName = "hats2",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "dmx",
                patternType = PatternType.Drum,
                pattern = "[- oh]*4",
                decay = 0.2f,
                sustain = 0.1f,
                gain = 0.12f,
                description = "Open hi-hat pattern 2"
            },
            
            // Snare
            new InstrumentDefinition
            {
                instrumentName = "snare",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "linn",
                patternType = PatternType.Drum,
                pattern = "[- sd]*2",
                gain = 0.5f,
                description = "Snare pattern"
            },
            
            // Clap
            new InstrumentDefinition
            {
                instrumentName = "clap",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "linn",
                patternType = PatternType.Drum,
                pattern = "[- cp]*2",
                gain = 0.1f,
                description = "Clap pattern"
            },
            
            // Drums 1
            new InstrumentDefinition
            {
                instrumentName = "drums1",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                patternType = PatternType.Drum,
                pattern = "kick1 + hats1 + snare",
                room = 0.1f,
                description = "Full drum pattern 1"
            },
            
            // Drums 2
            new InstrumentDefinition
            {
                instrumentName = "drums2",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                patternType = PatternType.Drum,
                pattern = "kick2 + hats2 + snare",
                room = 0.1f,
                description = "Full drum pattern 2"
            },
            
            // Drums 3
            new InstrumentDefinition
            {
                instrumentName = "drums3",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                patternType = PatternType.Drum,
                pattern = "bd bd bd bd -, oh oh oh oh -",
                bank = "linn",
                decay = 0.15f,
                description = "Drum pattern 3"
            },
            
            // Bass 1
            new InstrumentDefinition
            {
                instrumentName = "bass1",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.Sine,
                scale = ScaleType.F_Major,
                octave = 1,
                patternType = PatternType.Bassline,
                pattern = "<<[f1 f2*2]*2 [g1 g2*2]*2> [c1 c2*2]*2 [d1 d2*2]*2 [d1 d2*2]*2>*2",
                decay = 0.2f,
                sustain = 0.1f,
                description = "Main bass pattern 1"
            },
            
            // Bass 2
            new InstrumentDefinition
            {
                instrumentName = "bass2",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.Sine,
                scale = ScaleType.F_Major,
                octave = 1,
                patternType = PatternType.Bassline,
                pattern = "<<[f1 f2]*2 [g1 g2]*2> [c1 c2]*2 [d1 d2]*2 [d1 d2]*2>*2",
                decay = 0.2f,
                sustain = 0.4f,
                description = "Main bass pattern 2"
            },
            
            // Synth
            new InstrumentDefinition
            {
                instrumentName = "synth",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Lead,
                scale = ScaleType.D_Minor,
                octave = 4,
                patternType = PatternType.Melody,
                pattern = "<[[2 ~] [2 ~] 2 3] [[3 ~] [3 ~] 3 3]>@4 [-1 ~] -1 -1 [0 ~] 0 0 [0 ~] 0 0 [0 ~] 0 0",
                slow = 2f,
                attack = 0.05f,
                hpf = 1000f,
                gain = 0.4f,
                room = 0.05f,
                description = "Main synth melody"
            }
        };
        
        // Initialize sections
        sections = new List<SectionDefinition>
        {
            new SectionDefinition
            {
                sectionName = "intro",
                cycleCount = 16,
                instrumentNames = new List<string> { "kick1" },
                description = "Intro section with kick only"
            },
            
            new SectionDefinition
            {
                sectionName = "verse1",
                cycleCount = 16,
                instrumentNames = new List<string> { "drums1" },
                description = "Verse 1 with full drums"
            },
            
            new SectionDefinition
            {
                sectionName = "break",
                cycleCount = 2,
                instrumentNames = new List<string> { "drums3" },
                description = "Break section"
            },
            
            new SectionDefinition
            {
                sectionName = "verse2",
                cycleCount = 16,
                instrumentNames = new List<string> { "drums2" },
                description = "Verse 2 with different drum pattern"
            },
            
            new SectionDefinition
            {
                sectionName = "silence",
                cycleCount = 1,
                instrumentNames = new List<string>(),
                description = "Silence section"
            },
            
            new SectionDefinition
            {
                sectionName = "synth_section",
                cycleCount = 24,
                instrumentNames = new List<string> { "synth" },
                description = "Synth section"
            },
            
            new SectionDefinition
            {
                sectionName = "bass_section1",
                cycleCount = 16,
                instrumentNames = new List<string> { "bass1" },
                description = "Bass section 1"
            },
            
            new SectionDefinition
            {
                sectionName = "bass_section2",
                cycleCount = 16,
                instrumentNames = new List<string> { "bass2" },
                description = "Bass section 2"
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
                    new ArrangementSection { sectionName = "intro", cycleCount = 16 },
                    new ArrangementSection { sectionName = "verse1", cycleCount = 16 },
                    new ArrangementSection { sectionName = "break", cycleCount = 2 },
                    new ArrangementSection { sectionName = "verse2", cycleCount = 16 },
                    new ArrangementSection { sectionName = "silence", cycleCount = 1 },
                    new ArrangementSection { sectionName = "synth_section", cycleCount = 24 },
                    new ArrangementSection { sectionName = "bass_section1", cycleCount = 16 },
                    new ArrangementSection { sectionName = "bass_section2", cycleCount = 16 }
                },
                description = "Complete Blue Monday arrangement"
            }
        };
        
        // Store the original Strudel code
        strudelCode = @"// New Order - Blue Monday (cover / remix)
// by Lewis

setcpm(130/4)

const kick1 = sound('<[bd bd [bd*4] [bd*4]] [bd*4]>').bank('linn').decay(0.15)
const kick2 = sound('[bd*4]').bank('linn').decay(.15)

const hats1 = sound('[oh oh*2]*4').bank('dmx').decay(.1).gain(.12)
const hats2 = sound('[- oh]*4').bank('dmx').decay(.2).sustain(0.1).gain(.12)

const snare = stack(
  sound('[- sd]*2').bank('linn').gain(.5),
  sound('[- cp]*2').bank('linn').gain(.1)
)

const drums1 = stack(kick1,hats1,snare)
const drums2 = stack(kick2,hats2,snare)

const drums3 = stack(
  sound('bd bd bd bd -').bank('linn').decay(0.15),
  sound('oh oh oh oh -').bank('dmx').decay(0.2).sustain(0.1).gain(0.2)
)

const bass1 = stack(
  note('<<[f1 f2*2]*2 [g1 g2*2]*2> [c1 c2*2]*2 [d1 d2*2]*2 [d1 d2*2]*2>*2'),
).sound('<sine, gm_synth_bass_1>').decay(.2).sustain(.1)

const bass2 = stack(
  note('<<[f1 f2]*2 [g1 g2]*2> [c1 c2]*2 [d1 d2]*2 [d1 d2]*2>*2'),
).sound('<sine, gm_synth_bass_1>').decay(.2).sustain(.4)

const synth = stack(
  n('<[[2 ~] [2 ~] 2 3] [[3 ~] [3 ~] 3 3]>@4 [-1 ~] -1 -1 [0 ~] 0 0 [0 ~] 0 0 [0 ~] 0 0'),
).sound('<gm_lead_2_sawtooth>').slow(2).scale('d4:minor').attack(.05).hpf('<1000 2000>*12').gain('.4')

stack(
  arrange([16,kick1],[16,drums1],[2,drums3],[16,drums2],[1,silence]).room(0.1),
  arrange([8,silence],[24,synth],[19,silence]).room(0.05),
  arrange([16,silence],[16,bass1],[2,silence],[16,bass2],[1,silence])
  )._pianoroll()";
    }
}