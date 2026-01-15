using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Scriptable Object for the Grimes - Music 4 Machines example
/// Organized into separate components for easy management
/// </summary>
[CreateAssetMenu(fileName = "Grimes_Music4Machines", menuName = "Strudel/Examples/Grimes_Music4Machines", order = 2)]
public class GrimesExample : StrudelExample
{
    public  void OnEnable()
    {
        // Initialize with Grimes example data
        exampleTitle = "Grimes - Music 4 Machines (cover)";
        author = "KAIXI";
        description = "THIS IS MUSIC FOR MACHINES - an intro to live coding on strudel";
        beatsPerMinute = 135f;
        timeSignature = "4/4";
        
        // Initialize samples
        samples = new List<SampleDefinition>
        {
            new SampleDefinition
            {
                sampleName = "vox",
                fileName = "vox_chorus.wav",
                url = "https://raw.githubusercontent.com/kai-xi/music4machines/main/samples/",
                bank = "RolandTR909",
                description = "Vocal samples from the original Grimes song"
            }
        };
        
        // Initialize instruments
        instruments = new List<InstrumentDefinition>
        {
            // Drums
            new InstrumentDefinition
            {
                instrumentName = "drums",
                instrumentType = InstrumentType.Drum,
                patternType = PatternType.Drum,
                pattern = "bd bd bd bd, - sd - sd, - cp - cp, - hh - hh - hh - hh",
                rhythm = "1 1 1 1, 1 1 1 1, 1 1 1 1, 1 1 1 1 1 1 1 1",
                gain = 1.0f,
                description = "Main drum pattern with kick, snare, clap, and hi-hat"
            },
            
            // Bass
            new InstrumentDefinition
            {
                instrumentName = "bass",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.SynthBass,
                scale = ScaleType.C_Major,
                octave = 1,
                patternType = PatternType.Bassline,
                pattern = "c2 g1 eb1 f1 c2 g1 eb1 f1",
                rhythm = "4 4 4 4 4 4 4 4",
                lpf = 200f,
                lpenv = 5f,
                lpa = 0.5f,
                lps = 0.8f,
                lpd = 0.1f,
                description = "Bass line with filter envelope"
            },
            
            // Synth Arpeggio
            new InstrumentDefinition
            {
                instrumentName = "synth_arpeggio",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Pad,
                scale = ScaleType.C_Major,
                octave = 2,
                patternType = PatternType.Arpeggio,
                pattern = "c3 c4 eb5 c3 c4 d5 c3 bb4, g2 g3 bb4 g2 g3 a4 g2 g4, eb2 eb3 g4 eb2 eb3 f4 eb2 g4, f2 f3 g4 f2 f3 a4 f2 a4",
                rhythm = "8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8",
                decay = 0.95f,
                lpf = 5000f,
                lpenv = -3f,
                lpa = 0.2f,
                delay = 0.3f,
                delayTime = 0.225f,
                delayFeedback = 0.45f,
                room = 0.8f,
                roomSize = 2f,
                description = "Arpeggiated synth with delay and reverb"
            },
            
            // Synth Bass
            new InstrumentDefinition
            {
                instrumentName = "synth_bass",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.SynthBass,
                scale = ScaleType.C_Major,
                octave = 0,
                patternType = PatternType.Bassline,
                pattern = "c3 c4 - c3 c4 - c3 -, g2 g3 - g2 g3 - g2 -, eb2 eb3 - eb2 eb3 - eb2 -, f2 f3 - f2 f3 - f2 -",
                rhythm = "8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8",
                attack = 0.1f,
                decay = 0.25f,
                release = 0.25f,
                lpf = 2250f,
                lpenv = 2f,
                lpa = 0.03f,
                lpr = 0.2f,
                lpd = 0.3f,
                gain = 0.5f,
                description = "Synth bass with filter envelope"
            },
            
            // Synth Lead
            new InstrumentDefinition
            {
                instrumentName = "synth_lead",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Pad,
                scale = ScaleType.C_Major,
                octave = 1,
                patternType = PatternType.Melody,
                pattern = "- - eb5 - - d5 - bb4, - - bb4 - - a4 - g4, - - g4 - - f4 - g4, - - g4 - - a4 - a4",
                rhythm = "8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8, 8 8 8 8 8 8 8 8",
                decay = 0.95f,
                delay = 0.3f,
                delayTime = 0.225f,
                delayFeedback = 0.45f,
                room = 0.4f,
                roomSize = 2f,
                gain = 0.6f,
                description = "Lead synth with delay and reverb"
            },
            
            // Vocals
            new InstrumentDefinition
            {
                instrumentName = "intro_vocals",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.Drums, // Using drums type for samples
                room = 0.3f,
                roomSize = 2f,
                patternType = PatternType.Simple,
                pattern = "1 0 0 0 0 0 0 0",
                description = "Intro vocal sample"
            },
            
            new InstrumentDefinition
            {
                instrumentName = "vocals01",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.Drums,
                begin = 0f,
                end = 0.3125f, // 0.25 + (0.25 * 0.25 * 0.5)
                attack = 0.25f,
                delay = 0.25f,
                delayTime = 0.45f,
                delayFeedback = 0.4f,
                room = 0.2f,
                roomSize = 2f,
                patternType = PatternType.Simple,
                pattern = "1 0 0 0 0 0 0 0",
                description = "First vocal line"
            },
            
            new InstrumentDefinition
            {
                instrumentName = "vocals02",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.Drums,
                begin = 0.25f,
                end = 0.625f, // 0.5 + (0.25 * 0.25 * 0.5)
                attack = 0.25f,
                delay = 0.25f,
                delayTime = 0.45f,
                delayFeedback = 0.4f,
                room = 0.2f,
                roomSize = 2f,
                patternType = PatternType.Simple,
                pattern = "0 0 0 0 1 0 0 0",
                description = "Second vocal line"
            }
        };
        
        // Initialize sections
        sections = new List<SectionDefinition>
        {
            new SectionDefinition
            {
                sectionName = "section00",
                cycleCount = 8,
                instrumentNames = new List<string> { "intro_vocals" },
                patternMask = "1 0 0 0 0 0 0 0",
                description = "Intro section with vocal sample"
            },
            
            new SectionDefinition
            {
                sectionName = "section01",
                cycleCount = 8,
                instrumentNames = new List<string> { "drums", "bass", "synth_arpeggio", "synth_bass", "synth_lead" },
                description = "Main section with full instrumentation"
            },
            
            new SectionDefinition
            {
                sectionName = "section02",
                cycleCount = 8,
                instrumentNames = new List<string> { "drums", "bass", "synth_arpeggio", "synth_bass", "synth_lead", "vocals01", "vocals02" },
                patternMask = "1 0 0 0 0 0 0 0, 0 0 0 0 1 0 0 0",
                description = "Section with vocals added"
            },
            
            new SectionDefinition
            {
                sectionName = "end",
                cycleCount = 8,
                instrumentNames = new List<string> { "vocals01" },
                patternMask = "1 0 0 0 0 0 0 0",
                description = "Ending section"
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
                    new ArrangementSection { sectionName = "section00", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section01", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section02", cycleCount = 8 },
                    new ArrangementSection { sectionName = "end", cycleCount = 8 }
                },
                description = "Complete song arrangement"
            }
        };
        
        // Store the original Strudel code
        strudelCode = @"// Grimes - Music 4 Machines (cover)
// by KAIXI
// THIS IS MUSIC FOR MACHINES

let cpm = 135/4;

samples({
  vox: 'vox_chorus.wav',
}, 'https://raw.githubusercontent.com/kai-xi/music4machines/main/samples/');

let drums = stack(
  sound(`
    <bd>*4,
    <- sd>*4,
    <- cp:3>*4
  `).bank(""RolandTR909""),
  sound(""<- hh>*8"").bank(""RolandTR909"").gain(.2),
  sound(""<sh>*8"").bank(""RolandTR808"").gain(.25)
);

let bass = cat(
  ""<c2>*4"",
  ""<g1>*4"",
  ""<eb1>*4"",
  ""<eb1!2 f1!2>*4"",
  ""<c2>*4"",
  ""<g1!2 bb1!2>*4"",
  ""<eb1>*4"",
  ""<f1>*4""
).note()
  .n(3).sound(""gm_synth_bass_1"")
  .lpf(200).lpenv(5).lpa(.5).lps(.8).lpd(.1);

let synth_arpeggio = cat(
  ""<c3 c4 eb5 c3 c4 d5 c3 bb4>*8"",
  ""<g2 g3 bb4 g2 g3 a4 g2 g4>*8"",
  ""<eb2 eb3 g4 eb2 eb3 f4 eb2 g4>*8"",
  ""<eb2 eb3 g4 eb2 eb3 f4 f2 g4>*8"",
  ""<c3 c4 eb5 c3 c4 d5 c3 bb4>*8"",
  ""<g2 g3 bb4 g2 bb4 c5 bb2 g4>*8"",
  ""<eb2 eb3 g4 eb2 eb3 f4 eb2 g4>*8"",
  ""<f2 f3 g4 f2 f3 a4 f2 a4>*8"",
).note()
  .n(1).sound(""gm_pad_poly"")
  .decay(.95).lpf(5000).lpenv(-3).lpa(.2)
  .delay("".3:.225:.45"")
  .room(.8).rsize(2);

let synth_bass = cat(
  ""<c3 c4 - c3 c4 - c3 ->*8"",
  ""<g2 g3 - g2 g3 - g2 ->*8"",
  ""<eb2 eb3 - eb2 eb3 - eb2 ->*8"",
  ""<eb2 eb3 - eb2 eb3 - f2 ->*8"",
  ""<c3 c4 - c3 c4 - c3 ->*8"",
  ""<g2 g3 - g2 g3 - bb2 ->*8"",
  ""<eb2 eb3 - eb2 eb3 - eb2 ->*8"",
  ""<f2 f3 - f2 f3 - f2 ->*8""
).note()
  .n(0).sound(""gm_synth_bass_1"")
  .attack(.1).decay(.25).release(.25)
  .lpf(2250).lpenv(2).lpa(.03).lpr(.2).lpd(.3)
  .gain(.5);

let synth_lead = cat(
  ""<- - eb5 - - d5 - bb4>*8"",
  ""<- - bb4 - - a4 - g4>*8"",
  ""<- - g4 - - f4 - g4>*8"",
  ""<- - g4 - - a4 - a4>*8"",
).note()
  .n(1).sound(""gm_pad_metallic"")
  .decay(.95).delay("".3:.225:.45"")
  .room(.4).rsize(2).gain(.6);

let intro_vocals = s(""vox"").room(.3).rsize(2);
let vocals01 = s(""vox"").begin(0).end(.25 + (.25 * .25 * .5))
  .attack(.25).delay("".25:.45:.4"").room(.2).rsize(2);
let vocals02 = s(""vox"").begin(.25).end(.5 + (.25 * .25 * .5))
  .attack(.25).delay("".25:.45:.4"").room(.2).rsize(2);

let section00 = stack(intro_vocals.mask(""<1 0 0 0 0 0 0 0>""));
let section01 = stack(drums, bass, synth_arpeggio, synth_bass, synth_lead);
let section02 = stack(drums, bass, synth_arpeggio, synth_bass, synth_lead,
  vocals01.mask(""<1 0 0 0 0 0 0 0>""),
  vocals02.mask(""<0 0 0 0 1 0 0 0>""));
let end = stack(vocals01.mask(""<1 0 0 0 0 0 0 0>""));

arrange(
  [8, section00],
  [8, section01],
  [8, section02],
  [8, end]
).cpm(cpm);";
    }
}