using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Test Scriptable Object for testing play buttons
/// Simple example to verify the play functionality works
/// </summary>
[CreateAssetMenu(fileName = "TestExample", menuName = "Strudel/Examples/TestExample", order = 10)]
public class TestExample : StrudelExample
{
    public void OnEnable()
    {
        // Initialize with test data
        exampleTitle = "Test Example";
        author = "Test Author";
        description = "Simple test example for play buttons";
        beatsPerMinute = 120f;
        timeSignature = "4/4";
        
        // Initialize a simple instrument
        instruments = new List<InstrumentDefinition>
        {
            new InstrumentDefinition
            {
                instrumentName = "test_synth",
                instrumentType = InstrumentType.Synth,
                soundType = SoundType.Sawtooth,
                scale = ScaleType.C_Major,
                octave = 4,
                patternType = PatternType.Simple,
                pattern = "c d e f",
                rhythm = "1 1 1 1",
                attack = 0.1f,
                decay = 0.3f,
                sustain = 0.5f,
                release = 0.2f,
                lpf = 1000f,
                gain = 0.8f,
                description = "Simple test synth pattern"
            }
        };
        
        // Initialize a simple section
        sections = new List<SectionDefinition>
        {
            new SectionDefinition
            {
                sectionName = "test_section",
                cycleCount = 4,
                instrumentNames = new List<string> { "test_synth" },
                description = "Test section with simple synth"
            }
        };
        
        // Initialize a simple arrangement
        arrangements = new List<ArrangementDefinition>
        {
            new ArrangementDefinition
            {
                arrangementName = "TestArrangement",
                sections = new List<ArrangementSection>
                {
                    new ArrangementSection { sectionName = "test_section", cycleCount = 4 }
                },
                description = "Simple test arrangement"
            }
        };
        
        // Simple Strudel code
        strudelCode = @"// Simple test pattern
let test = s('c d e f').note().sound('sawtooth').gain(0.8);
test.cpm(30);";
    }
}