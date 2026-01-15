using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Scriptable Object for organizing Strudel music examples
/// Each example can contain multiple components like samples, instruments, sections, etc.
/// </summary>
[CreateAssetMenu(fileName = "NewStrudelExample", menuName = "Strudel/Example", order = 1)]
public class StrudelExample : ScriptableObject
{
    [Header("Example Metadata")]
    public string exampleTitle = "New Example";
    public string author = "Unknown";
    public string description = "Description of the example";
    public float beatsPerMinute = 120f;
    public string timeSignature = "4/4";
    
    [Header("Components")]
    public List<SampleDefinition> samples = new List<SampleDefinition>();
    public List<InstrumentDefinition> instruments = new List<InstrumentDefinition>();
    public List<SectionDefinition> sections = new List<SectionDefinition>();
    public List<ArrangementDefinition> arrangements = new List<ArrangementDefinition>();
    
    [Header("Strudel Code")]
    [TextArea(10, 20)]
    public string strudelCode = "";
    
    /// <summary>
    /// Get the cycles per minute (cpm) from BPM
    /// </summary>
    public float GetCyclesPerMinute()
    {
        return beatsPerMinute / 4f; // Assuming 4/4 time signature
    }
    
    /// <summary>
    /// Find a sample by name
    /// </summary>
    public SampleDefinition GetSample(string name)
    {
        return samples.Find(s => s.sampleName == name);
    }
    
    /// <summary>
    /// Find an instrument by name
    /// </summary>
    public InstrumentDefinition GetInstrument(string name)
    {
        return instruments.Find(i => i.instrumentName == name);
    }
    
    /// <summary>
    /// Find a section by name
    /// </summary>
    public SectionDefinition GetSection(string name)
    {
        return sections.Find(s => s.sectionName == name);
    }
}

/// <summary>
/// Sample definition for audio files
/// </summary>
[System.Serializable]
public class SampleDefinition
{
    public string sampleName;
    public string fileName;
    public string url;
    public string bank = "default";
    public float defaultGain = 1.0f;
    public string description = "";
}

/// <summary>
/// Instrument definition for synthesized sounds
/// </summary>
[System.Serializable]
public class InstrumentDefinition
{
    public string instrumentName;
    public InstrumentType instrumentType = InstrumentType.Synth;
    public SoundType soundType = SoundType.Sawtooth;
    public string bank = "default";
    
    // Note properties
    public ScaleType scale = ScaleType.C_Major;
    public int octave = 4;
    public float noteDuration = 1.0f;
    
    // Envelope properties
    public float attack = 0.01f;
    public float decay = 0.4f;
    public float sustain = 0.2f;
    public float release = 0.2f;
    
    // Filter properties
    public float lpf = 20000f;
    public float hpf = 20f;
    public float lpq = 0.7f;
    public float lpenv = 0f;
    public float lpa = 0f;
    public float lps = 0f;
    public float lpd = 0f;
    
    // Sample slicing properties
    public int slice = 0;
    public float begin = 0f;
    public float end = 1f;
    public float late = 0f;
    
    // Effects
    public float delay = 0f;
    public float delayTime = 0.25f;
    public float delayFeedback = 0.4f;
    public float room = 0f;
    public float roomSize = 0.5f;
    public float gain = 1.0f;
    public float pan = 0f;
    public float lpr = 0f; // Release parameter for filter envelope
    public float slow = 1.0f; // Slow down factor for patterns

    public float clip = 1.0f; // Clip level for the instrument
    
    // Pattern properties
    public PatternType patternType = PatternType.Simple;
    public string pattern = "c d e f";
    public string rhythm = "1 1 1 1";
    public string velocity = "1 1 1 1";

    // other properties
    public float shape = 0.5f;

    public string detune = "";
    
    // Node-based pattern properties (alternative to string patterns)
    public PatternSequence nodePattern = new PatternSequence();
    public bool useNodePattern = false;
    
    // Advanced pattern properties
    public bool useAdvancedPattern = false;
    public List<NotePattern> notes = new List<NotePattern>();
    public List<NotePattern> rhythms = new List<NotePattern>();
    public List<NotePattern> velocities = new List<NotePattern>();
    
    public string description = "";
}

/// <summary>
/// Sound types for instruments
/// </summary>
public enum SoundType
{
    Sawtooth,
    Square,
    Triangle,
    Sine,
    Noise,
    Piano,
    Guitar,
    Bass,
    Drums,
    Pad,
    Lead,
    Organ,
    SynthBass,
    ElectricGuitar,
    AcousticGuitar,
    ChurchOrgan,
    Kalimba,
    EPIano,
    EPiano1,
    Bandoneon,
    ElectricBassPick,
    ElectricBassFinger,
    AcousticBass,
    Violin,
    Cello,
    Flute,
    Saxophone,
    Trumpet,
    Trombone,
    Church_Organ,
    vox
}

/// <summary>
/// Musical scales
/// </summary>
public enum ScaleType
{
    C_Major, C_Minor, C_Sharp_Major, C_Sharp_Minor,
    D_Major, D_Minor, D_Sharp_Major, D_Sharp_Minor,
    E_Major, E_Minor,
    F_Major, F_Minor, F_Sharp_Major, F_Sharp_Minor,
    G_Major, G_Minor, G_Sharp_Major, G_Sharp_Minor,
    A_Major, A_Minor, A_Sharp_Major, A_Sharp_Minor,
    B_Major, B_Minor
}

/// <summary>
/// Pattern types
/// </summary>
public enum PatternType
{
    Simple,
    Advanced,
    Arpeggio,
    Chord,
    Bassline,
    Melody,
    Drum
}

/// <summary>
/// Note pattern for advanced pattern editing
/// </summary>
[System.Serializable]
public class NotePattern
{
    public string note = "C";
    public int octave = 4;
    public float duration = 1.0f;
    public float velocity = 1.0f;
    public bool isRest = false;
    public bool isChord = false;
    public List<string> chordNotes = new List<string>();
}

public enum InstrumentType
{
    Synth,
    Drum,
    Bass,
    Lead,
    Pad,
    FX,
    Melodic
}

/// <summary>
/// Section definition for organizing parts of a song
/// </summary>
[System.Serializable]
public class SectionDefinition
{
    public string sectionName;
    public int cycleCount = 8;
    public List<string> instrumentNames = new List<string>();
    public List<string> sampleNames = new List<string>();
    public List<EffectLayer> effects = new List<EffectLayer>();
    public string patternMask = "1 1 1 1";
    public float lpf = 20000f; // Low pass filter for section
    public float gain = 1.0f; // Gain for section
    public string description = "";
}

/// <summary>
/// Effect layer for applying effects to sections
/// </summary>
[System.Serializable]
public class EffectLayer
{
    public string effectName;
    public EffectType effectType = EffectType.Reverb;
    public float amount = 0.5f;
    public float frequency = 1000f;
    public float resonance = 0.7f;
    public float time = 0.25f;
    public float feedback = 0.4f;
    public bool enabled = true;
}

public enum EffectType
{
    Reverb,
    Delay,
    Distortion,
    Filter,
    Chorus,
    Phaser,
    Flanger,
    Compressor,
    EQ,
    LFO
}

/// <summary>
/// Arrangement definition for organizing sections in time
/// </summary>
[System.Serializable]
public class ArrangementDefinition
{
    public string arrangementName;
    public List<ArrangementSection> sections = new List<ArrangementSection>();
    public string description = "";
}

/// <summary>
/// Individual section in an arrangement
/// </summary>
[System.Serializable]
public class ArrangementSection
{
    public string sectionName;
    public int cycleCount = 8;
    public float tempoMultiplier = 1.0f;
    public string transition = "cut";
    public string description = "";
}