using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Scriptable Object for the Charli XCX - 360 example
/// Organized into separate components for easy management
/// </summary>
[CreateAssetMenu(fileName = "CharliXCX_360", menuName = "Strudel/Examples/CharliXCX_360", order = 3)]
public class CharliXCXExample : StrudelExample
{
    public  void OnEnable()
    {
        // Initialize with Charli XCX example data
        exampleTitle = "Charli XCX - 360 (cover / remix)";
        author = "KAIXI";
        description = "Brat and it's the same but we're live coding so it's not";
        beatsPerMinute = 120f;
        timeSignature = "4/4";
        
        // Initialize samples
        samples = new List<SampleDefinition>
        {
            new SampleDefinition
            {
                sampleName = "camera_flash",
                fileName = "360_camera_flash.wav",
                url = "https://raw.githubusercontent.com/kai-xi/360/main/samples/",
                bank = "RolandTR808",
                description = "Camera flash sound effect"
            },
            new SampleDefinition
            {
                sampleName = "vox",
                fileName = "360_vocals.wav",
                url = "https://raw.githubusercontent.com/kai-xi/360/main/samples/",
                bank = "default",
                description = "Vocal samples from Charli XCX"
            }
        };
        
        // Initialize instruments
        instruments = new List<InstrumentDefinition>
        {
            // Lead Synth
            new InstrumentDefinition
            {
                instrumentName = "lead_synth",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Sawtooth,
                scale = ScaleType.E_Major,
                octave = 3,
                patternType = PatternType.Melody,
                pattern = "[[e3,b3] - c4 -] [e3 - f3 c4] [- c4 a4 -] [- - - -], [- - [g3,b3] -] [g3 - a3 c4] [- c4 c5 -] [c4 - g4 -]",
                rhythm = "4 4 4 4, 4 4 4 4",
                attack = 0f,
                decay = 0.25f,
                sustain = 0f,
                release = 0.3f,
                lpf = 300f,
                lpq = 0f,
                lpenv = 3f,
                lpa = 0f,
                lpd = 0.15f,
                lps = 0f,
                description = "Main lead synth with filter envelope"
            },
            
            // Bass
            new InstrumentDefinition
            {
                instrumentName = "bass",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.SynthBass,
                scale = ScaleType.E_Major,
                octave = 1,
                patternType = PatternType.Bassline,
                pattern = "[e2 -] [- - e2 f2] [- f1] [-], [g2 -] [g2 - g2 a2] [-] [-]",
                rhythm = "4 4 4 4, 4 4 4 4",
                attack = 0f,
                decay = 0.5f,
                release = 0.3f,
                lpf = 1800f,
                description = "Main bass line"
            },
            
            // Sub Bass
            new InstrumentDefinition
            {
                instrumentName = "sub_bass",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.SynthBass,
                scale = ScaleType.E_Major,
                octave = 0, // One octave lower than bass
                patternType = PatternType.Bassline,
                pattern = "[e2 -] [- - e2 f2] [- f1] [-], [g2 -] [g2 - g2 a2] [-] [-]",
                rhythm = "4 4 4 4, 4 4 4 4",
                attack = 0f,
                decay = 0.5f,
                release = 0.3f,
                lpf = 1800f,
                description = "Sub bass one octave lower"
            },
            
            // Bass Drum
            new InstrumentDefinition
            {
                instrumentName = "bass_drum",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "RolandTR808",
                patternType = PatternType.Drum,
                pattern = "[bd -] [- - bd bd] [- bd] [-], [bd -] [bd - bd bd] [-] [-]",
                rhythm = "4 4 4 4, 4 4 4 4",
                gain = 1.5f,
                description = "Main bass drum pattern"
            },
            
            // Clap
            new InstrumentDefinition
            {
                instrumentName = "clap",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "RolandTR808",
                patternType = PatternType.Drum,
                pattern = "[-] [cp] [-] [cp]",
                rhythm = "4 4 4 4",
                gain = 1.15f,
                description = "Clap pattern"
            },
            
            // Lead Saw
            new InstrumentDefinition
            {
                instrumentName = "lead_saw",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Lead,
                scale = ScaleType.G_Major,
                octave = 4,
                patternType = PatternType.Melody,
                pattern = "[g4 - g4 g4] [g4 g4@2 g4] [g4 g4 g4@2] [g4@2 g4 g4]",
                rhythm = "4 4 4 4",
                attack = 0f,
                decay = 0.3f,
                sustain = 0f,
                release = 0.15f,
                lpf = 3000f,
                lpenv = 10f,
                lpa = 0f,
                lpd = 0.25f,
                lps = 0f,
                lpr = 0f,
                gain = 0.25f,
                description = "Lead saw synth"
            },
            
            // Camera Flash
            new InstrumentDefinition
            {
                instrumentName = "camera_flash",
                instrumentType = InstrumentType.Synth, // Using for samples
                soundType = SoundType.Drums,
                patternType = PatternType.Simple,
                pattern = "[- [- camera_flash] - -] [-]",
                rhythm = "4 4 4 4 4 4",
                description = "Camera flash sound effect"
            },
            
            // Modified Bass for Section 5
            new InstrumentDefinition
            {
                instrumentName = "bass_modified",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.SynthBass,
                scale = ScaleType.E_Major,
                octave = 1,
                patternType = PatternType.Bassline,
                pattern = "[e2 -] [- - e2 f2] [- f1] [-], [e2 -] [- - e2 f2] [- f1] [e2 e2 e2 -], [e2 e2] [- - e2 f2] [- f1] [-], [g2 -] [g2 - g2 a2] [-] [-]",
                rhythm = "4 4 4 4, 4 4 4 4, 4 4 4 4, 4 4 4 4",
                attack = 0f,
                decay = 0.5f,
                release = 0.3f,
                lpf = 1800f,
                description = "Modified bass for section 5"
            },
            
            // Modified Sub Bass for Section 5
            new InstrumentDefinition
            {
                instrumentName = "sub_bass_modified",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.SynthBass,
                scale = ScaleType.E_Major,
                octave = 0,
                patternType = PatternType.Bassline,
                pattern = "[e2 -] [- - e2 f2] [- f1] [-], [e2 -] [- - e2 f2] [- f1] [e2 e2 e2 -], [e2 e2] [- - e2 f2] [- f1] [-], [g2 -] [g2 - g2 a2] [-] [-]",
                rhythm = "4 4 4 4, 4 4 4 4, 4 4 4 4, 4 4 4 4",
                attack = 0f,
                decay = 0.5f,
                release = 0.3f,
                lpf = 1800f,
                description = "Modified sub bass for section 5"
            },
            
            // Modified Bass Drum for Section 5
            new InstrumentDefinition
            {
                instrumentName = "bass_drum_modified",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "RolandTR808",
                patternType = PatternType.Drum,
                pattern = "[bd -] [- - bd bd] [- bd] [-], [bd -] [- - bd bd] [- bd] [bd bd bd -], [bd bd] [- - bd bd] [- bd] [-], [bd -] [bd - bd bd] [-] [-]",
                rhythm = "4 4 4 4, 4 4 4 4, 4 4 4 4, 4 4 4 4",
                gain = 1.5f,
                description = "Modified bass drum for section 5"
            },
            
            // Hi-hats
            new InstrumentDefinition
            {
                instrumentName = "hihats",
                instrumentType = InstrumentType.Drum,
                soundType = SoundType.Drums,
                bank = "RolandTR808",
                patternType = PatternType.Drum,
                pattern = "[hh - hh hh] [hh hh@2 hh] [hh hh hh@2] [hh@2 hh hh]",
                rhythm = "4 4 4 4",
                gain = 0.85f,
                description = "Hi-hat pattern"
            },
            
            // Modified Bass 2 for Section 7
            new InstrumentDefinition
            {
                instrumentName = "bass_modified_2",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.SynthBass,
                scale = ScaleType.E_Major,
                octave = 3, // Transposed up 24 semitones
                patternType = PatternType.Bassline,
                pattern = "[e2 -] [- - e2 f2] [- - f1 -] [-], [g2 -] [g2 - g2 a2] [-] [-]",
                rhythm = "4 4 4 4, 4 4 4 4",
                attack = 0f,
                decay = 0.5f,
                release = 0.3f,
                lpf = 8000f,
                lpa = 0f,
                lpd = 0.08f,
                lpq = 10f,
                gain = 1.1f,
                description = "Modified bass for section 7"
            },
            
            // Modified Bass 3 for Section 8
            new InstrumentDefinition
            {
                instrumentName = "bass_modified_3",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.Lead,
                scale = ScaleType.E_Major,
                octave = 1,
                patternType = PatternType.Bassline,
                pattern = "[e2 -] [- - e2 f2] [- f1] [-], [e2 -] [- - e2 f2] [- f1] [e2 e2 e2 -], [e2 e2] [- - e2 f2] [- f1] [-], [g2 -] [g2 - g2 a2] [-] [-]",
                rhythm = "4 4 4 4, 4 4 4 4, 4 4 4 4, 4 4 4 4",
                attack = 0f,
                decay = 0.4f,
                release = 0.3f,
                lpf = 500f,
                lpa = 0f,
                lpd = 0.03f,
                lpq = 0f,
                description = "Modified bass for section 8"
            },
            
            // Vocal Chops
            new InstrumentDefinition
            {
                instrumentName = "vox_chop_1",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.vox,
                patternType = PatternType.Simple,
                slice = 32,
                pattern = "30 30 30 30",
                description = "First vocal chop"
            },
            
            new InstrumentDefinition
            {
                instrumentName = "vox_chop_2",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.vox,
                patternType = PatternType.Simple,
                begin = 0.84375f, // (27*4 + 1)/(32 *4)
                end = 0.89f,
                late = 0.25f, // 1/4
                gain = 0.8f,
                pattern = "- - - vox",
                description = "Second vocal chop"
            },
            
            new InstrumentDefinition
            {
                instrumentName = "vox_chop_3",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.vox,
                patternType = PatternType.Simple,
                pattern = "vox - - -",
                begin = 0.6171875f, // 79 / (32 * 4)
                end = 0.630f,
                gain = 0.5f,
                description = "Third vocal chop"
            },
            
            new InstrumentDefinition
            {
                instrumentName = "vox_chop_4",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.vox,
                patternType = PatternType.Simple,
                slice = 128, // 32 * 4
                pattern = "- 50 - 50 - 50 - 50",
                description = "Fourth vocal chop"
            },
            
            new InstrumentDefinition
            {
                instrumentName = "vox_chop_5",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.vox,
                patternType = PatternType.Simple,
                pattern = "- - - - vox@2 vox@2",
                begin = 0.7734375f, // 99 / (32 * 4)
                end = 0.7852f,
                delay = 0.2f,
                delayTime = 0.25f,
                delayFeedback = 0.1f,
                description = "Fifth vocal chop"
            },
            
            new InstrumentDefinition
            {
                instrumentName = "vox_chop_6",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.vox,
                patternType = PatternType.Simple,
                slice = 128, // 32 * 4
                pattern = "- - - - 89 90 91 92",
                gain = 0.8f,
                description = "Sixth vocal chop"
            }
        };
        
        // Initialize sections
        sections = new List<SectionDefinition>
        {
            // Section 1: Intro
            new SectionDefinition
            {
                sectionName = "section_1",
                cycleCount = 4,
                instrumentNames = new List<string> { "lead_synth" },
                description = "Intro section with lead synth"
            },
            
            // Section 2: Main section
            new SectionDefinition
            {
                sectionName = "section_2",
                cycleCount = 4,
                instrumentNames = new List<string> { "lead_synth", "bass", "sub_bass", "bass_drum", "clap" },
                description = "Main section with full instrumentation"
            },
            
            // Section 3: Drop down
            new SectionDefinition
            {
                sectionName = "section_3",
                cycleCount = 4,
                instrumentNames = new List<string> { "lead_synth", "bass", "sub_bass", "bass_drum", "clap", "lead_saw", "camera_flash" },
                patternMask = "1 [1 1 1 [1 0]]/4",
                description = "Drop down section with lead saw and camera flash"
            },
            
            // Section 4: Yeah, 360
            new SectionDefinition
            {
                sectionName = "section_4",
                cycleCount = 4,
                instrumentNames = new List<string> { "lead_synth", "bass", "sub_bass", "bass_drum", "clap" },
                patternMask = "1 [1 1 1 [1 0]]/4",
                description = "Yeah, 360 section"
            },
            
            // Section 5: Bumpin' that
            new SectionDefinition
            {
                sectionName = "section_5",
                cycleCount = 4,
                instrumentNames = new List<string> { "lead_synth", "bass_modified", "sub_bass_modified", "bass_drum_modified", "clap", "lead_saw" },
                patternMask = "1 [1 1 1 [1 0]]/4",
                description = "Bumpin' that section"
            },
            
            // Section 6: Extended section 5
            new SectionDefinition
            {
                sectionName = "section_5_ext",
                cycleCount = 4,
                instrumentNames = new List<string> { "lead_synth", "bass", "sub_bass", "bass_drum", "clap", "lead_saw" },
                lpf = 1500f,
                description = "Extended section 5 with remix vocals"
            },
            
            // Section 7: Hi-hats
            new SectionDefinition
            {
                sectionName = "section_6",
                cycleCount = 4,
                instrumentNames = new List<string> { "bass_modified", "sub_bass_modified", "bass_drum_modified", "clap", "hihats" },
                patternMask = "1 [1 1 1 [1 0]]/4",
                description = "Section with hi-hats"
            },
            
            // Section 8: Bass modified 2
            new SectionDefinition
            {
                sectionName = "section_7",
                cycleCount = 4,
                instrumentNames = new List<string> { "bass_modified_2", "sub_bass_modified", "clap" },
                patternMask = "1 [1 1 1 [1 0]]/4",
                description = "Section with modified bass 2"
            },
            
            // Section 9: Bass modified 3
            new SectionDefinition
            {
                sectionName = "section_8",
                cycleCount = 4,
                instrumentNames = new List<string> { "bass_modified_3", "sub_bass_modified", "clap" },
                lpf = 500f,
                patternMask = "1 1 1 0",
                description = "Section with modified bass 3"
            },
            
            // Section 10: Section 9 with hi-hats
            new SectionDefinition
            {
                sectionName = "section_9",
                cycleCount = 4,
                instrumentNames = new List<string> { "bass_modified", "sub_bass_modified", "bass_drum_modified", "clap", "hihats" },
                gain = 0.8f,
                patternMask = "1 [1 1 1 [1 0]]/4",
                description = "Section 9 with hi-hats"
            }
        };
        
        // Initialize arrangements
        arrangements = new List<ArrangementDefinition>
        {
            new ArrangementDefinition
            {
                arrangementName = "Instrumental",
                sections = new List<ArrangementSection>
                {
                    new ArrangementSection { sectionName = "section_1", cycleCount = 4 },
                    new ArrangementSection { sectionName = "section_2", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section_3", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section_4", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section_5", cycleCount = 4 }
                },
                description = "Instrumental arrangement"
            },
            
            new ArrangementDefinition
            {
                arrangementName = "FullSong",
                sections = new List<ArrangementSection>
                {
                    new ArrangementSection { sectionName = "section_1", cycleCount = 32 },
                    new ArrangementSection { sectionName = "section_5_ext", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section_6", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section_7", cycleCount = 4 },
                    new ArrangementSection { sectionName = "section_8", cycleCount = 4 },
                    new ArrangementSection { sectionName = "section_9", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section_5", cycleCount = 8 },
                    new ArrangementSection { sectionName = "section_1", cycleCount = 4 }
                },
                description = "Complete song arrangement with vocals"
            }
        };
        
        // Store the original Strudel code
        strudelCode = @"// Charli XCX - 360 (cover / remix)
// by KAIXI
// Brat and it's the same but we're live coding so it's not

let cpm = 120/4;

samples({
  camera_flash: '360_camera_flash.wav',
  vox: '360_vocals.wav'
}, 'https://raw.githubusercontent.com/kai-xi/360/main/samples/');

// section 1: intro
let lead_synth = arrange(
  [3, '<[[e3,b3] - c4 -] [e3 - f3 c4] [- c4 a4 -] [- - - -]>*4'],
  [1, '<[- - [g3,b3] -] [g3 - a3 c4] [- c4 c5 -] [c4 - g4 -]>*4']
)
  .note().sound('sawtooth')
  .attack(0).decay(.25).sustain(0).release(.3)
  .lpf(300).lpq(0).lpenv(3).lpa(0).lpd(.15).lps(0)
  .delay(.2).delaytime(.25).delayfeedback(.1);

let section_1 = lead_synth;

// section 2: i went my own way and i made it
let bass = arrange(
  [2, '<[e2 -] [- - e2 f2] [- f1] [-]>*4'],
  [1, '<[- e2] [e2 - e2 f2] [- f1] [-]>*4'],
  [1, '<[g2 -] [g2 - g2 a2] [-] [-]>*4'],
)
  .note().sound('gm_synth_bass_2:0')
  .attack(0).decay(.5).release(.3)
  .lpf(1800);

let sub_bass = bass.transpose(-12);

let bass_drum = arrange(
  [2, '<[bd -] [- - bd bd] [- bd] [-]>*4'],
  [1, '<[- bd] [bd - bd bd] [- bd] [-]>*4'],
  [1, '<[bd -] [bd - bd bd] [-] [-]>*4'],
)
  .sound().bank('RolandTR808').gain(1.5);

let clap = arrange(
  [4, '<[-] [cp] [-] [cp]>*4']
)
  .sound().bank('RolandTR808').gain(1.15);

let drums = stack(bass_drum, clap);
 
let section_2 = stack(lead_synth, bass, sub_bass, drums);

// section 3: drop down, yeah
let lead_saw = arrange(
  [4, '<[g4 - g4 g4] [g4 g4@2 g4] [g4 g4 g4@2] [g4@2 g4 g4]>*4']
)
  .note().sound('gm_lead_2_sawtooth:0')
  .attack(0).decay(.3).sustain(0).release(.15)
  .lpf(3000).lpenv(10).lpa(0).lpd(.25).lps(0).lpr(0)
  .gain(.25);

let camera_flash = s('<[- [- camera_flash] - -] [-]>/4');
let section_3 = stack(
  lead_synth, 
  bass,
  sub_bass,
  drums.mask('<[1 [1 0] 1 1] [1 1 1 [1 0]]>/4'),
  lead_saw.mask('<1 [1 1 1 [1 0]]>/4'),
  camera_flash
);

// section 4: yeah, 360
let section_4 = stack(
  lead_synth, 
  bass.lpf('<20000 [20000 20000 20000 500]>/4'), 
  sub_bass.lpf('<20000 [20000 20000 20000 500]>/4'), 
  drums.mask('<1 [1 1 1 [1 0]]>/4')
);

// section 5: bumpin' that
let bass_modified = arrange(
  [1, '<[e2 -] [- - e2 f2] [- f1] [-]>*4'],
  [1, '<[e2 -] [- - e2 f2] [- f1] [e2 e2 e2 -]>*4'],
  [1, '<[e2 e2] [- - e2 f2] [- f1] [-]>*4'],
  [1, '<[g2 -] [g2 - g2 a2] [-] [-]>*4'],
)
  .note().sound('gm_synth_bass_2:0')
  .attack(0).decay(.5).release(.3)
  .lpf(1800);

let sub_bass_modified = bass_modified.transpose(-12);

let bass_drum_modified = arrange(
  [1, '<[bd -] [- - bd bd] [- bd] [-]>*4'],
  [1, '<[bd -] [- - bd bd] [- bd] [bd bd bd -]>*4'],
  [1, '<[bd bd] [- - bd bd] [- bd] [-]>*4'],
  [1, '<[bd -] [bd - bd bd] [-] [-]>*4'],
)
  .sound().bank('RolandTR808').gain(1.5);

let section_5 = stack(
  lead_synth, 
  bass_modified,
  sub_bass_modified,
  bass_drum_modified,
  clap.mask('<1 [1 1 1 [1 0]]>/4'),
  lead_saw.mask('<[1 1 1 [1 0]]>/4')
);

// instrumental arrangement
let instrumental = arrange(
  [4, section_1],
  [8, section_2],
  [8, section_3],
  [8, section_4],
  [4, section_5]
).cpm(cpm);

// slicing the vocals so it stops playing after each cycle
let vocals = s('vox')
  .slice(32, 
         '<0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31>')
  .cpm(cpm);

// cover (1st half of the song)
let cover = stack(instrumental, vocals);

// WORKING IT OUT ON THE REMIX !!!
// extending section 5
let section_5_ext = stack(
  lead_synth, 
  bass,
  sub_bass,
  bass_drum,
  clap.mask('<1 [1 1 1 [1 0]]>/4'),
  lead_saw.mask('<1 [1 1 1 [1 0]]>/4')
);

// bumpin' that
let vox_chop_1 = s('vox').slice(32, '<30 30 30 30>');
// ah-ah ah-ah-ah
let vox_chop_2 = 
    s('<- - - vox>').begin((27*4 + 1)/(32 *4)).end('0.89').late(1/4).gain(.8);

let remix_vox = arrange(
  [4, stack(vox_chop_1.mask('<1 1 1 1 1 1 1 0>'), vox_chop_2.mask('<0 1>/4'))]
);

// section 6
let hihats = arrange(
  [4, '<[hh - hh hh] [hh hh@2 hh] [hh hh hh@2] [hh@2 hh hh]>*4']
)
  .sound().bank('RolandTR808').gain(.85);

let section_6 = stack(
  bass_modified, 
  sub_bass_modified, 
  bass_drum_modified,
  clap.mask('<1 [1 1 1 [1 0]]>/4'),
  hihats.mask('<1 [1 1 1 [1 0]]>/4')
);

// section 7
let bass_modified_2 = arrange(
  [1, '<[e2 -] [- - e2 f2] [- - f1 -] [-]>*4'],
  [1, '<[e2 -] [- - e2 f2] [- - f1 -] [e2 e2 e2 -]>*4'],
  [1, '<[e2 e2] [- - e2 f2] [- - f1 - ] [-]>*4'],
  [1, '<[g2 -] [g2 - g2 a2] [-] [-]>*4'],
).transpose(24).gain(1.1)
  .note().sound('gm_fx_brightness:4')
  .attack(0).decay(.5).release(.3)
  .lpf(8000).lpa(0).lpd(.08).lpq(10);

let section_7 = stack(
  bass_modified_2,
  sub_bass_modified,
  clap.mask('<1 [1 1 1 [1 0]]>/4')
);

// section 8
let bass_modified_3 = arrange(
  [1, '<[e2 -] [- - e2 f2] [- f1] [-]>*4'],
  [1, '<[e2 -] [- - e2 f2] [- f1] [e2 e2 e2 -]>*4'],
  [1, '<[e2 e2] [- - e2 f2] [- f1] [-]>*4'],
  [1, '<[g2 -] [g2 - g2 a2] [-] [-]>*4'],
).transpose(24)
  .note().sound('gm_lead_2_sawtooth:0')
  .attack(0).decay(.4).release(.3)
  .lpf(500).lpa(0).lpd(.03).lpq(0);

// 360
let vox_chop_3 = s('<vox - - ->*4').begin(79 / (32 * 4)).end((0.630)).gain(.5);

let section_8 = stack(
  bass_modified_3.lpf('<500 600 700 [[800 [1000 1200]] 1200]>'),
  sub_bass_modified,
  clap.mask('<1 [1 1 1 [1 0]]>/4')
);

// section 9
let section_9 = stack(section_5, hihats.gain(.8).mask('<1 [1 1 1 [1 0]]>/4'));

// down
let vox_chop_4 = s('vox').slice(32 * 4, '<- 50 - 50 - 50 - 50>*4');
// bumping that beat
let vox_chop_5 = s('<- - - - vox@2 vox@2>*4').begin(99 / (32 * 4)).end(0.7852)
  .delay(.2).delaytime(.25).delayfeedback(.1);
// i'm everwhere, i'm so julia
let vox_chop_6 = s('vox').slice(32 * 4, '<- - - - 89 90 91 92>*4').gain(.8);

arrange(
  [32, cover],
  [8, stack(section_5_ext, remix_vox.lpf('<1500 1500 1500 1500 1500 1500 1500 2000>'))],
  [8, stack(section_6)],
  [4, stack(section_7)],
  [4, stack(section_8, vox_chop_3.lpf('<600 1000 1350 0>').mask('<1 1 1 0>'))],
  [8, stack(
    section_9, 
    vox_chop_4.mask('<[1 0] [1 0] [1 0] [1 0]>/2'), 
    vox_chop_5.mask('<[0 1] [0 1] [0 1] [0 0]>/2'), 
    vox_chop_6.lpf(1500).lpa(.25).lpd(.25).pan(sine).mask('<[0 0] [0 0] [0 0] [0 1]>/2'), 
    vox_chop_2.mask('<0 1>/4')
  )],
  [8, stack(section_5, remix_vox.mask('<1 1 1 0 1 1 1 1>'))],
  [4, vox_chop_1.delay(.25).delayt(.5).dfb(.2).mask('<1 0 0 0>')]
)
  .cpm(cpm)
  .theme('<[greenText whitescreen] [blackscreen whitescreen]>/2')
  .color('<[#99CC3E #FFFFFF] [#99CC3E #000000]>')
  .fontFamily('x3270')
  .punchcard({
    vertical: 1, flipTime: 1, fold: 0, stroke: 1,
    playheadColor: 'rgba(0, 0, 0, 0)'
  });";
    }
}