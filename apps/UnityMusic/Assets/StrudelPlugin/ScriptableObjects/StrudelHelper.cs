using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Helper class for Strudel scriptable objects
/// Provides dropdown options and conversion methods
/// </summary>
public static class StrudelHelper
{
    // Sound type mappings
    private static readonly Dictionary<SoundType, string> soundTypeMappings = new Dictionary<SoundType, string>
    {
        { SoundType.Sawtooth, "sawtooth" },
        { SoundType.Square, "square" },
        { SoundType.Triangle, "triangle" },
        { SoundType.Sine, "sine" },
        { SoundType.Noise, "noise" },
        { SoundType.Piano, "gm_piano_1" },
        { SoundType.Guitar, "gm_acoustic_guitar_steel" },
        { SoundType.Bass, "gm_synth_bass_1" },
        { SoundType.Drums, "bd" },
        { SoundType.Pad, "gm_pad_poly" },
        { SoundType.Lead, "gm_lead_2_sawtooth" },
        { SoundType.Organ, "gm_church_organ" },
        { SoundType.SynthBass, "gm_synth_bass_1" },
        { SoundType.ElectricGuitar, "gm_electric_guitar_jazz" },
        { SoundType.AcousticGuitar, "gm_acoustic_guitar_steel" },
        { SoundType.ElectricBassPick, "gm_electric_bass_pick" },
        { SoundType.ElectricBassFinger, "gm_electric_bass_finger" },
        { SoundType.AcousticBass, "gm_acoustic_bass" },
        { SoundType.Violin, "gm_violin" },
        { SoundType.Cello, "gm_cello" },
        { SoundType.Flute, "gm_flute" },
        { SoundType.Saxophone, "gm_saxophone" },
        { SoundType.Trumpet, "gm_trumpet" },
        { SoundType.Trombone, "gm_trombone" },
        { SoundType.Kalimba, "gm_kalimba" },
        { SoundType.EPIano, "gm_epiano" },
        { SoundType.EPiano1, "gm_epiano1" },
        { SoundType.Bandoneon, "gm_bandoneon" },
        { SoundType.ChurchOrgan, "gm_church_organ" },
        { SoundType.vox, "vox" }
    };
    
    // Scale mappings
    private static readonly Dictionary<ScaleType, string> scaleMappings = new Dictionary<ScaleType, string>
    {
        { ScaleType.C_Major, "C:major" },
        { ScaleType.C_Minor, "C:minor" },
        { ScaleType.C_Sharp_Major, "C#:major" },
        { ScaleType.C_Sharp_Minor, "C#:minor" },
        { ScaleType.D_Major, "D:major" },
        { ScaleType.D_Minor, "D:minor" },
        { ScaleType.D_Sharp_Major, "D#:major" },
        { ScaleType.D_Sharp_Minor, "D#:minor" },
        { ScaleType.E_Major, "E:major" },
        { ScaleType.E_Minor, "E:minor" },
        { ScaleType.F_Major, "F:major" },
        { ScaleType.F_Minor, "F:minor" },
        { ScaleType.F_Sharp_Major, "F#:major" },
        { ScaleType.F_Sharp_Minor, "F#:minor" },
        { ScaleType.G_Major, "G:major" },
        { ScaleType.G_Minor, "G:minor" },
        { ScaleType.G_Sharp_Major, "G#:major" },
        { ScaleType.G_Sharp_Minor, "G#:minor" },
        { ScaleType.A_Major, "A:major" },
        { ScaleType.A_Minor, "A:minor" },
        { ScaleType.A_Sharp_Major, "A#:major" },
        { ScaleType.A_Sharp_Minor, "A#:minor" },
        { ScaleType.B_Major, "B:major" },
        { ScaleType.B_Minor, "B:minor" }
    };
    
    // Note mappings for advanced pattern editor
    private static readonly string[] noteNames = { "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" };
    
    /// <summary>
    /// Get the string representation of a sound type
    /// </summary>
    public static string GetSoundTypeString(SoundType soundType)
    {
        return soundTypeMappings.ContainsKey(soundType) ? soundTypeMappings[soundType] : "sawtooth";
    }
    
    /// <summary>
    /// Get the string representation of a scale
    /// </summary>
    public static string GetScaleString(ScaleType scale)
    {
        return scaleMappings.ContainsKey(scale) ? scaleMappings[scale] : "C:major";
    }
    
    /// <summary>
    /// Get all available note names for dropdown
    /// </summary>
    public static string[] GetNoteNames()
    {
        return noteNames;
    }
    
    /// <summary>
    /// Convert advanced pattern to simple pattern string
    /// </summary>
    public static string ConvertAdvancedPatternToSimple(List<NotePattern> notes)
    {
        if (notes == null || notes.Count == 0)
            return "";
        
        List<string> patternParts = new List<string>();
        
        foreach (var note in notes)
        {
            if (note.isRest)
            {
                patternParts.Add("~");
            }
            else if (note.isChord && note.chordNotes.Count > 0)
            {
                patternParts.Add($"[{string.Join(" ", note.chordNotes)}]");
            }
            else
            {
                string noteStr = note.note;
                if (note.octave > 0)
                {
                    noteStr += note.octave;
                }
                patternParts.Add(noteStr);
            }
        }
        
        return string.Join(" ", patternParts);
    }
    
    /// <summary>
    /// Convert simple pattern string to advanced pattern
    /// </summary>
    public static List<NotePattern> ConvertSimpleToAdvancedPattern(string patternString)
    {
        List<NotePattern> notes = new List<NotePattern>();
        
        if (string.IsNullOrEmpty(patternString))
            return notes;
        
        string[] parts = patternString.Split(' ');
        
        foreach (string part in parts)
        {
            NotePattern notePattern = new NotePattern();
            
            if (part == "~")
            {
                notePattern.isRest = true;
            }
            else if (part.StartsWith("[") && part.EndsWith("]"))
            {
                // Chord
                notePattern.isChord = true;
                string chordContent = part.Substring(1, part.Length - 2);
                notePattern.chordNotes = new List<string>(chordContent.Split(' '));
            }
            else
            {
                // Single note
                string noteStr = part;
                int octave = 4; // Default octave
                
                // Extract octave from note string
                int octaveIndex = noteStr.Length - 1;
                while (octaveIndex >= 0 && char.IsDigit(noteStr[octaveIndex]))
                {
                    octaveIndex--;
                }
                
                if (octaveIndex < noteStr.Length - 1)
                {
                    string octaveStr = noteStr.Substring(octaveIndex + 1);
                    if (int.TryParse(octaveStr, out int parsedOctave))
                    {
                        octave = parsedOctave;
                        noteStr = noteStr.Substring(0, octaveIndex + 1);
                    }
                }
                
                notePattern.note = noteStr;
                notePattern.octave = octave;
            }
            
            notes.Add(notePattern);
        }
        
        return notes;
    }
    
    /// <summary>
    /// Get default values for instrument properties
    /// </summary>
    public static void SetDefaultInstrumentValues(InstrumentDefinition instrument)
    {
        if (instrument == null) return;
        
        instrument.attack = 0.01f;
        instrument.decay = 0.4f;
        instrument.sustain = 0.2f;
        instrument.release = 0.2f;
        instrument.lpf = 20000f;
        instrument.hpf = 20f;
        instrument.lpq = 0.7f;
        instrument.delay = 0f;
        instrument.delayTime = 0.25f;
        instrument.delayFeedback = 0.4f;
        instrument.room = 0f;
        instrument.roomSize = 0.5f;
        instrument.gain = 1.0f;
        instrument.pan = 0f;
        instrument.noteDuration = 1.0f;
        instrument.useAdvancedPattern = false;
    }
    
    /// <summary>
    /// Get suggested pattern types for different instrument types
    /// </summary>
    public static PatternType[] GetSuggestedPatternTypes(InstrumentType instrumentType)
    {
        switch (instrumentType)
        {
            case InstrumentType.Drum:
                return new[] { PatternType.Drum, PatternType.Simple };
            case InstrumentType.Bass:
                return new[] { PatternType.Bassline, PatternType.Simple };
            case InstrumentType.Lead:
                return new[] { PatternType.Melody, PatternType.Simple, PatternType.Arpeggio };
            case InstrumentType.Pad:
                return new[] { PatternType.Chord, PatternType.Simple };
            default:
                return new[] { PatternType.Simple, PatternType.Melody, PatternType.Arpeggio };
        }
    }
    
    /// <summary>
    /// Get suggested scales for different instrument types
    /// </summary>
    public static ScaleType[] GetSuggestedScales(InstrumentType instrumentType)
    {
        switch (instrumentType)
        {
            case InstrumentType.Drum:
                return new ScaleType[0]; // Drums don't use scales
            case InstrumentType.Bass:
                return new[] { ScaleType.C_Major, ScaleType.C_Minor, ScaleType.G_Major, ScaleType.G_Minor };
            case InstrumentType.Lead:
                return new[] { ScaleType.C_Major, ScaleType.C_Minor, ScaleType.A_Major, ScaleType.A_Minor };
            case InstrumentType.Pad:
                return new[] { ScaleType.C_Major, ScaleType.C_Minor, ScaleType.F_Major, ScaleType.F_Minor };
            default:
                return new[] { ScaleType.C_Major, ScaleType.C_Minor };
        }
    }
}