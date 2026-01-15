using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.Linq;

// Import the StrudelHelper for pattern conversion

/// <summary>
/// Manager for Strudel Examples using Scriptable Objects
/// Handles loading, organizing, and playing example patterns
/// </summary>
public class StrudelExampleManager : MonoBehaviour
{
    // Singleton instance
    private static StrudelExampleManager instance;
    public static StrudelExampleManager Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<StrudelExampleManager>();
                if (instance == null)
                {
                    GameObject obj = new GameObject("StrudelExampleManager");
                    instance = obj.AddComponent<StrudelExampleManager>();
                }
            }
            return instance;
        }
    }
    
    [Header("Example Management")]
    public List<StrudelExample> loadedExamples = new List<StrudelExample>();
    public StrudelExample currentExample;
    
    [Header("Runtime Configuration")]
    public bool autoLoadExamples = true;
    public bool enableDebugLogging = true;
    
    private StrudelAudioManager audioManager;
    private StrudelInstrumentManager instrumentManager;
    private StrudelPatternParser patternParser;
    
    void Awake()
    {
        if (instance != null && instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        instance = this;
        DontDestroyOnLoad(gameObject);
        
        // Initialize dependencies
        InitializeDependencies();
        
        if (autoLoadExamples)
        {
            LoadAllExamples();
        }
    }
    
    void InitializeDependencies()
    {
        audioManager = FindObjectOfType<StrudelAudioManager>();
        instrumentManager = FindObjectOfType<StrudelInstrumentManager>();
        
        if (audioManager == null)
        {
            GameObject audioObj = new GameObject("StrudelAudioManager");
            audioManager = audioObj.AddComponent<StrudelAudioManager>();
        }
        
        if (instrumentManager == null)
        {
            GameObject instrumentObj = new GameObject("StrudelInstrumentManager");
            instrumentManager = instrumentObj.AddComponent<StrudelInstrumentManager>();
        }
        
        // StrudelPatternParser is not a Unity component, so we create it directly
        patternParser = new StrudelPatternParser();
    }
    
    /// <summary>
    /// Load all StrudelExample assets from the project
    /// </summary>
    public void LoadAllExamples()
    {
        loadedExamples.Clear();
        
        #if UNITY_EDITOR
        string[] guids = AssetDatabase.FindAssets("t:StrudelExample");
        foreach (string guid in guids)
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            StrudelExample example = AssetDatabase.LoadAssetAtPath<StrudelExample>(path);
            if (example != null)
            {
                loadedExamples.Add(example);
                if (enableDebugLogging)
                {
                    Debug.Log($"Loaded example: {example.exampleTitle} by {example.author}");
                }
            }
        }
        #endif
        
        if (enableDebugLogging)
        {
            Debug.Log($"Total examples loaded: {loadedExamples.Count}");
        }
    }
    
    /// <summary>
    /// Set the current example to work with
    /// </summary>
    public void SetCurrentExample(StrudelExample example)
    {
        currentExample = example;
        if (enableDebugLogging)
        {
            Debug.Log($"Current example set to: {example.exampleTitle}");
        }
    }
    
    /// <summary>
    /// Get all examples by a specific author
    /// </summary>
    public List<StrudelExample> GetExamplesByAuthor(string author)
    {
        return loadedExamples.FindAll(e => e.author.Equals(author, System.StringComparison.OrdinalIgnoreCase));
    }
    
    /// <summary>
    /// Get all examples with a specific tag in the title
    /// </summary>
    public List<StrudelExample> GetExamplesByTag(string tag)
    {
        return loadedExamples.FindAll(e => e.exampleTitle.Contains(tag, System.StringComparison.OrdinalIgnoreCase));
    }
    
    /// <summary>
    /// Load samples from the current example
    /// </summary>
    public void LoadExampleSamples()
    {
        if (currentExample == null)
        {
            Debug.LogError("No current example set");
            return;
        }
        
        foreach (var sample in currentExample.samples)
        {
            LoadSample(sample);
        }
    }
    
    /// <summary>
    /// Load a single sample
    /// </summary>
    private void LoadSample(SampleDefinition sample)
    {
        // In a real implementation, this would load the sample from the URL
        // For now, we'll just log the sample information
        Debug.Log($"Loading sample: {sample.sampleName} from {sample.url}{sample.fileName}");
        
        // This would integrate with the existing audio system
        if (audioManager != null)
        {
            // audioManager.LoadSample(sample.sampleName, sample.url + sample.fileName);
        }
    }
    
    /// <summary>
    /// Create instruments from the current example
    /// </summary>
    public void CreateExampleInstruments()
    {
        if (currentExample == null)
        {
            Debug.LogError("No current example set");
            return;
        }
        
        foreach (var instrument in currentExample.instruments)
        {
            CreateInstrument(instrument);
        }
    }
    
    /// <summary>
    /// Create a single instrument
    /// </summary>
    private void CreateInstrument(InstrumentDefinition instrument)
    {
        if (instrumentManager != null)
        {
            // Add the instrument definition to the instrument manager
            // Convert SoundType to StrudelInstrumentType for compatibility
            StrudelInstrumentType instrumentType = ConvertSoundTypeToInstrumentType(instrument.soundType);
            instrumentManager.AddInstrument(instrument.instrumentName, instrument.instrumentName, instrumentType);
            
            // Apply instrument properties
            ApplyInstrumentProperties(instrument);
        }
    }
    
    /// <summary>
    /// Convert SoundType enum to StrudelInstrumentType enum
    /// </summary>
    private StrudelInstrumentType ConvertSoundTypeToInstrumentType(SoundType soundType)
    {
        switch (soundType)
        {
            case SoundType.Sawtooth:
            case SoundType.Square:
            case SoundType.Triangle:
            case SoundType.Sine:
            case SoundType.Noise:
            case SoundType.Pad:
            case SoundType.Lead:
            case SoundType.Organ:
            case SoundType.SynthBass:
            case SoundType.EPIano:
            case SoundType.EPiano1:
            case SoundType.Bandoneon:
                return StrudelInstrumentType.Synth;
                
            case SoundType.Piano:
            case SoundType.Kalimba:
            case SoundType.Violin:
            case SoundType.Cello:
            case SoundType.Flute:
            case SoundType.Saxophone:
            case SoundType.Trumpet:
            case SoundType.Trombone:
            case SoundType.ChurchOrgan:
            case SoundType.ElectricGuitar:
            case SoundType.AcousticGuitar:
            case SoundType.ElectricBassPick:
            case SoundType.ElectricBassFinger:
            case SoundType.AcousticBass:
                return StrudelInstrumentType.Melodic;
                
            case SoundType.Bass:
                return StrudelInstrumentType.Bass;
                
            case SoundType.Drums:
                return StrudelInstrumentType.Drum;
                
            case SoundType.Guitar:
                return StrudelInstrumentType.Percussion;
                
            default:
                return StrudelInstrumentType.Other;
        }
    }
    
    /// <summary>
    /// Apply properties to an instrument
    /// </summary>
    private void ApplyInstrumentProperties(InstrumentDefinition instrument)
    {
        // Convert enum values to string representations for the audio system
        string soundTypeStr = StrudelHelper.GetSoundTypeString(instrument.soundType);
        string scaleStr = StrudelHelper.GetScaleString(instrument.scale);
        
        // Convert patterns if using advanced pattern editor
        string patternStr = instrument.pattern;
        string rhythmStr = instrument.rhythm;
        string velocityStr = instrument.velocity;
        
        if (instrument.useAdvancedPattern)
        {
            patternStr = StrudelHelper.ConvertAdvancedPatternToSimple(instrument.notes);
            rhythmStr = StrudelHelper.ConvertAdvancedPatternToSimple(instrument.rhythms);
            velocityStr = StrudelHelper.ConvertAdvancedPatternToSimple(instrument.velocities);
        }
        
        // This would apply all the instrument properties like:
        // - Scale and octave
        // - Envelope settings
        // - Filter settings
        // - Effects
        // - Pattern and rhythm
        
        Debug.Log($"Applying properties to instrument: {instrument.instrumentName}");
        Debug.Log($"  Sound Type: {soundTypeStr}");
        Debug.Log($"  Scale: {scaleStr}");
        Debug.Log($"  Pattern: {patternStr}");
        Debug.Log($"  Rhythm: {rhythmStr}");
        Debug.Log($"  Velocity: {velocityStr}");
    }
    
    /// <summary>
    /// Play a specific section from the current example
    /// </summary>
    public void PlaySection(string sectionName)
    {
        if (currentExample == null)
        {
            Debug.LogError("No current example set");
            return;
        }
        
        var section = currentExample.GetSection(sectionName);
        if (section != null)
        {
            PlaySection(section);
        }
        else
        {
            Debug.LogError($"Section '{sectionName}' not found in current example");
        }
    }
    
    /// <summary>
    /// Play a section definition
    /// </summary>
    private void PlaySection(SectionDefinition section)
    {
        Debug.Log($"Playing section: {section.sectionName} for {section.cycleCount} cycles");
        
        // This would:
        // 1. Activate the instruments for this section
        // 2. Apply any section-specific effects
        // 3. Start the pattern playback
        // 4. Handle the timing for the specified number of cycles
        
        foreach (var instrumentName in section.instrumentNames)
        {
            // Activate instrument
            Debug.Log($"Activating instrument: {instrumentName}");
        }
        
        foreach (var effect in section.effects)
        {
            // Apply effect
            Debug.Log($"Applying effect: {effect.effectName}");
        }
    }
    
    /// <summary>
    /// Play the full arrangement of the current example
    /// </summary>
    public void PlayFullArrangement()
    {
        if (currentExample == null)
        {
            Debug.LogError("No current example set");
            return;
        }
        
        if (currentExample.arrangements.Count > 0)
        {
            PlayArrangement(currentExample.arrangements[0]);
        }
        else
        {
            Debug.LogError("No arrangements found in current example");
        }
    }
    
    /// <summary>
    /// Play a specific arrangement
    /// </summary>
    public void PlayArrangement(ArrangementDefinition arrangement)
    {
        Debug.Log($"Playing arrangement: {arrangement.arrangementName}");
        
        foreach (var section in arrangement.sections)
        {
            // This would handle the timing and transitions between sections
            Debug.Log($"Playing section: {section.sectionName} for {section.cycleCount} cycles");
            
            // In a real implementation, this would:
            // 1. Calculate the timing based on BPM and cycle count
            // 2. Handle transitions between sections
            // 3. Apply any arrangement-specific effects
            // 4. Manage the overall song flow
        }
    }
    
    /// <summary>
    /// Parse and execute the Strudel code from the current example
    /// </summary>
    public void ExecuteStrudelCode()
    {
        if (currentExample == null)
        {
            Debug.LogError("No current example set");
            return;
        }
        
        if (!string.IsNullOrEmpty(currentExample.strudelCode))
        {
            if (patternParser != null)
            {
                patternParser.ParsePattern(currentExample.strudelCode);
                Debug.Log("Executing Strudel code from current example");
            }
            else
            {
                Debug.LogError("Pattern parser not available");
            }
        }
        else
        {
            Debug.LogWarning("No Strudel code found in current example");
        }
    }
    
    /// <summary>
    /// Get a formatted string representation of the current example
    /// </summary>
    public string GetExampleInfo()
    {
        if (currentExample == null)
        {
            return "No current example selected";
        }
        
        string info = $"Title: {currentExample.exampleTitle}\n";
        info += $"Author: {currentExample.author}\n";
        info += $"BPM: {currentExample.beatsPerMinute}\n";
        info += $"Time Signature: {currentExample.timeSignature}\n";
        info += $"Description: {currentExample.description}\n\n";
        
        info += $"Samples ({currentExample.samples.Count}):\n";
        foreach (var sample in currentExample.samples)
        {
            info += $"  - {sample.sampleName}: {sample.fileName}\n";
        }
        
        info += $"\nInstruments ({currentExample.instruments.Count}):\n";
        foreach (var instrument in currentExample.instruments)
        {
            info += $"  - {instrument.instrumentName} ({instrument.instrumentType})\n";
        }
        
        info += $"\nSections ({currentExample.sections.Count}):\n";
        foreach (var section in currentExample.sections)
        {
            info += $"  - {section.sectionName} ({section.cycleCount} cycles)\n";
        }
        
        return info;
    }
    
    /// <summary>
    /// Stop all currently playing audio
    /// </summary>
    public void StopAllAudio()
    {
        if (audioManager != null)
        {
            audioManager.StopAll();
        }
    }
    
    #if UNITY_EDITOR
    /// <summary>
    /// Editor utility to create a new example asset
    /// </summary>
    [MenuItem("Assets/Create/Strudel/New Example Asset")]
    public static void CreateExampleAsset()
    {
        string path = EditorUtility.SaveFilePanelInProject(
            "Save Strudel Example",
            "NewStrudelExample",
            "asset",
            "Please enter a file name to save the example to"
        );
        
        if (!string.IsNullOrEmpty(path))
        {
            StrudelExample example = ScriptableObject.CreateInstance<StrudelExample>();
            AssetDatabase.CreateAsset(example, path);
            AssetDatabase.SaveAssets();
            EditorUtility.FocusProjectWindow();
            Selection.activeObject = example;
        }
    }
    #endif
}