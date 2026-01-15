using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Simple demo example scriptable object for testing Strudel functionality
/// This provides a basic example with instruments and patterns
/// </summary>
[CreateAssetMenu(fileName = "SimpleDemoExample", menuName = "Strudel/Examples/Simple Demo", order = 2)]
public class SimpleDemoExample : StrudelExample
{
    void OnEnable()
    {
        // Initialize with simple demo data
        exampleTitle = "Simple Demo";
        author = "Strudel Plugin";
        description = "A simple demo example with basic patterns";
        beatsPerMinute = 120f;
        timeSignature = "4/4";
        
        // Clear existing data
        samples.Clear();
        instruments.Clear();
        sections.Clear();
        arrangements.Clear();
        strudelCode = "";
        
        // Add a simple piano instrument
        InstrumentDefinition piano = new InstrumentDefinition();
        piano.instrumentName = "piano";
        piano.instrumentType = InstrumentType.Melodic;
        piano.soundType = SoundType.Piano;
        piano.scale = ScaleType.C_Major;
        piano.octave = 4;
        piano.pattern = "c d e f g a b c";
        piano.rhythm = "1 1 1 1 1 1 1 1";
        piano.velocity = "1 1 1 1 1 1 1 1";
        piano.description = "Simple ascending C major scale";
        
        // Set up basic instrument properties
        StrudelHelper.SetDefaultInstrumentValues(piano);
        
        instruments.Add(piano);
        
        // Add a simple drum instrument
        InstrumentDefinition drums = new InstrumentDefinition();
        drums.instrumentName = "drums";
        drums.instrumentType = InstrumentType.Drum;
        drums.soundType = SoundType.Drums;
        drums.pattern = "c2 ~ d2 ~";
        drums.rhythm = "1 1 1 1";
        drums.velocity = "1 0 1 0";
        drums.description = "Simple kick-snare pattern";
        
        StrudelHelper.SetDefaultInstrumentValues(drums);
        instruments.Add(drums);
        
        // Add a simple bass instrument
        InstrumentDefinition bass = new InstrumentDefinition();
        bass.instrumentName = "bass";
        bass.instrumentType = InstrumentType.Bass;
        bass.soundType = SoundType.Bass;
        bass.scale = ScaleType.C_Major;
        bass.octave = 2;
        bass.pattern = "c g a g";
        bass.rhythm = "2 2 2 2";
        bass.velocity = "1 1 1 1";
        bass.description = "Simple bass line";
        
        StrudelHelper.SetDefaultInstrumentValues(bass);
        instruments.Add(bass);
        
        // Add a section
        SectionDefinition mainSection = new SectionDefinition();
        mainSection.sectionName = "main";
        mainSection.cycleCount = 8;
        mainSection.instrumentNames = new List<string> { "piano", "drums", "bass" };
        mainSection.patternMask = "1 1 1 1 1 1 1 1";
        mainSection.description = "Main section with all instruments";
        
        sections.Add(mainSection);
        
        // Add an arrangement
        ArrangementDefinition mainArrangement = new ArrangementDefinition();
        mainArrangement.arrangementName = "Main Arrangement";
        mainArrangement.description = "Simple arrangement with main section";
        
        ArrangementSection arrangementSection = new ArrangementSection();
        arrangementSection.sectionName = "main";
        arrangementSection.cycleCount = 16;
        arrangementSection.tempoMultiplier = 1.0f;
        arrangementSection.transition = "cut";
        arrangementSection.description = "Play main section for 16 cycles";
        
        mainArrangement.sections.Add(arrangementSection);
        arrangements.Add(mainArrangement);
        
        // Add some Strudel code
        strudelCode = @"-- Simple Strudel Demo Code
-- This demonstrates basic pattern syntax

-- Define instruments
piano = sound ""piano"" | n ""c4 d4 e4 f4 g4 a4 b4 c5"" | # gain 0.8
bass = sound ""bass"" | n ""c2 g2 a2 g2"" | # gain 1.0
drums = sound ""drum"" | n ""c2 ~ d2 ~"" | # gain 1.2

-- Create patterns
melody = slow 2 $ piano
bassline = fast 2 $ bass
beat = drums

-- Combine patterns
mainPattern = stack [
  melody,
  bassline,
  beat
]

-- Play the pattern
mainPattern";
    }
    
    /// <summary>
    /// Get a simple pattern string for quick testing
    /// </summary>
    public string GetSimplePattern()
    {
        if (instruments.Count > 0)
        {
            return instruments[0].pattern;
        }
        return "c d e f";
    }
    
    /// <summary>
    /// Get the first instrument name for quick testing
    /// </summary>
    public string GetFirstInstrumentName()
    {
        if (instruments.Count > 0)
        {
            return instruments[0].instrumentName;
        }
        return "piano";
    }
    
    /// <summary>
    /// Reset to default demo values
    /// </summary>
    public void ResetToDemoDefaults()
    {
        OnEnable();
    }
}