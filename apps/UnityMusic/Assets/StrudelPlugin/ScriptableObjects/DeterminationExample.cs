using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Scriptable Object for the Determination · Toby Fox (cover) example
/// Organized into separate components for easy management
/// </summary>
[CreateAssetMenu(fileName = "Determination_TobyFox_Cover", menuName = "Strudel/Examples/Determination_TobyFox_Cover", order = 5)]
public class DeterminationExample : StrudelExample
{
    public  void OnEnable()
    {
        // Initialize with Determination example data
        exampleTitle = "Determination · Toby Fox (cover)";
        author = "Claffystic";
        description = "UNDERTALE Determination cover using Strudel";
        beatsPerMinute = 115f;
        timeSignature = "4/4";
        
        // Initialize instruments
        instruments = new List<InstrumentDefinition>
        {
            // Lead melody
            new InstrumentDefinition
            {
                instrumentName = "lead",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Square,
                scale = ScaleType.F_Major,
                octave = 4,
                patternType = PatternType.Melody,
                pattern = "<[F#5 F5 D#5 C#5 D#5 A#4 C5 ~], [G#4 ~ D#5 F5 F#5 ~ G#5 ~], [C#6 ~ A#5@5 ~], [F#5 F5 D#5 C#5 D#5 A#4 C5 ~], [G#4 ~ D#4 F4 F#4 ~ F4 ~], [C#4 ~ D#4@5 ~], [F#5 F5 D#5 C#5 D#5 A#4 C5 ~], [G#4 ~ D#5 F5 F#5 ~ G#5 ~], [C#6 ~ A#5@5 ~], [F#5 F5 D#5 C#5 D#5 A#4 C5 ~], [G#4 ~ D#4 F4 F#4 ~ F4 ~], [C#4 ~ D#4@5 ~], [[G#5,F5] [F#5,D#5] [E5,C#5] [D#5,B4] [C#5,A#4] [E5,C#5] [D#5,A#4] ~], [[A#4,F#4] ~ [A#4,F#4] [D#5,A#4] [G#5,E5] [F#5,D#5] [E5,C#5] [D#5,B4]], [[C#5,A#4] [E5,C#5] [D#5,A#4]@3 ~ [D#4,A#3] [G#4,D#4]], [[C#5,A#4] [C5,G#4] [A#4,F#4] [G#4,F4] [A#4,F#4] [C5,G#4] [A#4,F#4] ~], [[D#4,A#3] ~ [D#4,A#3] [F4,C#4] [F#4,D#4] ~ [B4,F#4] ~], [[D#5,B4]@2 [D5,A#4]@4 ~@2], [[G#5,F5] [F#5,D#5] [E5,C#5] [D#5,B4] [C#5,A#4] [E5,C#5] [D#5,A#4] ~], [[A#4,F#4] ~ [A#4,F#4] [D#5,A#4] [G#5,E5] [F#5,D#5] [E5,C#5] [D#5,B4]], [[C#5,A#4] [E5,C#5] [D#5,A#4]@3 ~ [D#4,A#3] [G#4,D#4]], [[C#5,A#4] [C5,G#4] [A#4,F#4] [G#4,F4] [A#4,F#4] [C5,G#4] [A#4,F#4] ~], [[D#4,A#3] ~ [D#4,A#3] [F4,C#4] [F#4,D#4] ~ [F4,C#4] ~], [[C#4,G#3]@2 [D#4,A#3]@4 ~@2], [~@8]>",
                rhythm = "1",
                room = 0.5f,
                roomSize = 6f,
                gain = 0.25f,
                detune = "[-5, 5]",
                description = "Main lead melody with square wave"
            },
            
            // Harmony
            new InstrumentDefinition
            {
                instrumentName = "harmony",
                instrumentType = InstrumentType.Pad,
                soundType = SoundType.Triangle,
                scale = ScaleType.F_Major,
                octave = 3,
                patternType = PatternType.Simple,
                pattern = "<[~ D#4 F#4 G#4 A#4 F#4 ~ G#4], [C5 D#5 C5 G#4 ~ D#4 F4 D#4], [G#4 F4 F#4 F4 D#4 C#4 D#4 A#3], [~ D#4 F#4 G#4 A#4 F#4 ~ D#4], [F#4 G#4 A#4 F#4 ~ D#4 F4 A#4], [F4 C#4 F#4 F4 D#4 C#4 D#4 F4], [~ D#4 F#4 G#4 A#4 F#4 ~ G#4], [C5 D#5 C5 G#4 ~ D#4 F4 D#4], [G#4 F4 F#4 F4 D#4 C#4 D#4 A#3], [~ D#4 F#4 G#4 A#4 F#4 ~ D#4], [F#4 G#4 A#4 F#4 ~ D#4 F4 A#4], [F4 C#4 F#4 F4 D#4 C#4 D#4 A#3], [G#3 D#4 G#4 F#4 A#4 G#4 F#4 G#4], [D#4 F#4 C#4 D#4 G#3 D#4 G#4 F#4], [A#4 G#4 F#4@3 ~@3], [~ D#3 C#4 A#3 G#4 F4 D#4 F4], [F#4 F4 d#4 F4 F#4 ~@3], [C#4@2 D#4@4 ~@2], [~@8]>",
                rhythm = "1",
                gain = 0.35f,
                shape = 0.2f,
                description = "Harmony with triangle wave"
            },
            
            // Bass
            new InstrumentDefinition
            {
                instrumentName = "bass",
                instrumentType = InstrumentType.Bass,
                soundType = SoundType.Square,
                scale = ScaleType.F_Major,
                octave = 1,
                patternType = PatternType.Bassline,
                pattern = "<[D#2@4 F#2@2 G#2@2], [G#2@2 G#1@2 B1@2 C#2@2], [F#2@2 D#2@4 C#2@2], [D#2@4 F#2@2 G#2@2], [G#2@2 D#2@2 F#2@2 F2@2], [C#2@2 D#2@4 C#2@2], [D#2@4 F#2@2 G#2@2], [G#2@2 G#1@2 B1@2 C#2@2], [F#2@2 D#2@4 C#2@2], [D#2@4 F#2@2 G#2@2], [G#2@2 D#2@2 F#2@2 F2@2], [C#2@2 D#2@4 ~@2], [F2@4 C#2@2 D#2@2], [D#2 ~ D#2@2 E2@4], [C#2@2 D#2@3 ~@3], [A#1@4 C#2@2 D#2@2], [D#2@2 C#2@2 B1@2 ~@2], [D#3 ~ D3@2 B2@2 A#2@2], [E2@4 C#2@2 D#2@2], [D#2 ~ D#2@2 E2@4], [C#2@2 D#2@3 ~@3], [G#2@4 ~@2 D#2@2], [D#2@2 ~@2 F#2 ~ F2 ~], [C#2@2 D#2@6], [~@8]>",
                rhythm = "1",
                gain = 0.3f,
                description = "Bass line with square wave"
            },
            
            // Beast samples (for the bird section)
            new InstrumentDefinition
            {
                instrumentName = "beast_samples",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.Drums,
                patternType = PatternType.Simple,
                pattern = "<~@2 0 ~@3 1 0 ~@3 2 1 0 ~@3 3 2 1 0 ~@3 4 3 2 1 0 ~@2>",
                description = "Bird samples for the beast section"
            },
            
            // Chords for beast section
            new InstrumentDefinition
            {
                instrumentName = "beast_chords",
                instrumentType = InstrumentType.Pad,
                soundType = SoundType.Square,
                scale = ScaleType.F_Major,
                octave = 4,
                patternType = PatternType.Simple,
                pattern = "[[0,3] [0,1] 2 0!2 [0,1] [2,1] 2 0!2 [0,1] [2,1]!2 2 0!2 [0,1] [2,1]!3 2 0!2 [0,1] [2,1]!4 2 [0@7 ~] ~]",
                rhythm = "2",
                clip = 0.9f,
                description = "Chords for the beast section"
            },
            
            // Piano melody for beast section
            new InstrumentDefinition
            {
                instrumentName = "beast_piano",
                instrumentType = InstrumentType.Lead,
                soundType = SoundType.Square,
                scale = ScaleType.F_Major,
                octave = 4,
                patternType = PatternType.Melody,
                pattern = "F5*2 [F5 C5] D5*2 C5 A5*2 G5*2 F5@2",
                rhythm = "2",
                clip = 0.8f,
                description = "Piano melody for the beast section"
            },
            
            // Sample preload trick
            new InstrumentDefinition
            {
                instrumentName = "samples_preload",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.Drums,
                patternType = PatternType.Simple,
                pattern = "0,1,2,3,4,5",
                gain = 0f,
                description = "Samples preload trick"
            }
        };
        
        // Initialize sections
        sections = new List<SectionDefinition>
        {
            new SectionDefinition
            {
                sectionName = "main_theme",
                cycleCount = 16,
                instrumentNames = new List<string> { "lead", "harmony", "bass" },
                description = "Main theme section"
            },
            
            new SectionDefinition
            {
                sectionName = "beast_section",
                cycleCount = 8,
                instrumentNames = new List<string> { "beast_piano", "beast_chords", "beast_samples" },
                description = "Beast section with bird samples"
            },
            
            new SectionDefinition
            {
                sectionName = "transition",
                cycleCount = 4,
                instrumentNames = new List<string> { "lead", "harmony", "bass" },
                description = "Transition section"
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
                    new ArrangementSection { sectionName = "main_theme", cycleCount = 16 },
                    new ArrangementSection { sectionName = "beast_section", cycleCount = 8 },
                    new ArrangementSection { sectionName = "transition", cycleCount = 4 }
                },
                description = "Complete song arrangement"
            }
        };
        
        // Store the original Strudel code
        strudelCode = @"// @Determination · Toby Fox(cover)";
    }

}