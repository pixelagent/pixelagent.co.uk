using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;
using System.Text;

/// <summary>
/// Strudel Pattern Editor - Main UI for creating and editing musical patterns
/// </summary>
public class StrudelPatternEditor : EditorWindow
{
    private Vector2 scrollPosition;
    private string patternCode = "";
    private string patternName = "New Pattern";
    private bool showInstrumentSelector = false;
    private bool showAudioLibraryDownloader = false;
    private bool showPatternSettings = false;
    
    private AudioLibraryDownloader audioLibraryDownloader;
    private StrudelPatternParser patternParser;
    private StrudelAudioManager audioManager;
    
    private List<string> availableInstruments = new List<string>();
    private int selectedInstrumentIndex = 0;
    
    private List<AudioLibraryDownloader.AudioLibrary> availableLibraries = new List<AudioLibraryDownloader.AudioLibrary>();
    
    [MenuItem("Window/Strudel Pattern Editor")]
    public static void ShowWindow()
    {
        GetWindow<StrudelPatternEditor>("Strudel Pattern Editor");
    }
    
    void OnEnable()
    {
        // Initialize components
        audioLibraryDownloader = FindObjectOfType<AudioLibraryDownloader>();
        audioManager = FindObjectOfType<StrudelAudioManager>();
        
        if (audioLibraryDownloader == null)
        {
            GameObject downloaderObj = new GameObject("AudioLibraryDownloader");
            audioLibraryDownloader = downloaderObj.AddComponent<AudioLibraryDownloader>();
        }
        
        if (audioManager == null)
        {
            GameObject audioObj = new GameObject("StrudelAudioManager");
            audioManager = audioObj.AddComponent<StrudelAudioManager>();
        }
        
        // Initialize pattern parser (not a Unity component)
        patternParser = new StrudelPatternParser();
        
        // Load available libraries
        availableLibraries = audioLibraryDownloader.GetAvailableLibraries();
        
        // Initialize with some default instruments
        availableInstruments.Add("Piano");
        availableInstruments.Add("Guitar");
        availableInstruments.Add("Bass");
        availableInstruments.Add("Drums");
        availableInstruments.Add("Strings");
        availableInstruments.Add("Brass");
        availableInstruments.Add("Woodwinds");
        
        // Load default pattern
        LoadDefaultPattern();
    }
    
    void LoadDefaultPattern()
    {
        patternCode = "-- Simple Strudel Pattern Example\n";
        patternCode += "-- Use 'sound' function to play samples\n";
        patternCode += "-- Use 'n' for notes, 's' for samples\n\n";
        patternCode += "-- Basic melody pattern\n";
        patternCode += "melody = slow 2 $ sound \"piano\" | n \"c4 e4 g4 c5\" | # gain 0.8\n\n";
        patternCode += "-- Drum pattern\n";
        patternCode += "kick = sound \"drum\" | n \"c2\" | # gain 1.2\n";
        patternCode += "snare = sound \"drum\" | n \"d2\" | # gain 1.0\n";
        patternCode += "hihat = sound \"drum\" | n \"f#2\" | # gain 0.7\n\n";
        patternCode += "-- Combine patterns\n";
        patternCode += "drums = stack [\n";
        patternCode += "  every 4 (0, 1) $ kick,\n";
        patternCode += "  every 2 (0, 1) $ snare,\n";
        patternCode += "  fast 2 $ hihat\n";
        patternCode += "]\n\n";
        patternCode += "-- Main pattern\n";
        patternCode += "mainPattern = stack [\n";
        patternCode += "  melody,\n";
        patternCode += "  drums\n";
        patternCode += "]\n\n";
        patternCode += "-- Play the pattern\n";
        patternCode += "mainPattern";
    }
    
    void OnGUI()
    {
        // Main layout
        GUILayout.BeginVertical();
        
        // Header
        GUILayout.BeginHorizontal(EditorStyles.toolbar);
        GUILayout.Label("Strudel Pattern Editor", EditorStyles.largeLabel);
        
        if (GUILayout.Button("New", EditorStyles.toolbarButton, GUILayout.Width(60)))
        {
            patternCode = "";
            patternName = "New Pattern";
        }
        
        if (GUILayout.Button("Load", EditorStyles.toolbarButton, GUILayout.Width(60)))
        {
            LoadPattern();
        }
        
        if (GUILayout.Button("Save", EditorStyles.toolbarButton, GUILayout.Width(60)))
        {
            SavePattern();
        }
        
        if (GUILayout.Button("Play", EditorStyles.toolbarButton, GUILayout.Width(60)))
        {
            PlayPattern();
        }
        
        if (GUILayout.Button("Stop", EditorStyles.toolbarButton, GUILayout.Width(60)))
        {
            StopPattern();
        }
        
        GUILayout.EndHorizontal();
        
        // Pattern name
        GUILayout.BeginHorizontal();
        GUILayout.Label("Pattern Name:", GUILayout.Width(100));
        patternName = GUILayout.TextField(patternName);
        GUILayout.EndHorizontal();
        
        // Main buttons
        GUILayout.BeginHorizontal();
        
        if (GUILayout.Button("Instrument Selector", GUILayout.Height(30)))
        {
            showInstrumentSelector = !showInstrumentSelector;
            showAudioLibraryDownloader = false;
            showPatternSettings = false;
        }
        
        if (GUILayout.Button("Audio Libraries", GUILayout.Height(30)))
        {
            showAudioLibraryDownloader = !showAudioLibraryDownloader;
            showInstrumentSelector = false;
            showPatternSettings = false;
        }
        
        if (GUILayout.Button("Pattern Settings", GUILayout.Height(30)))
        {
            showPatternSettings = !showPatternSettings;
            showInstrumentSelector = false;
            showAudioLibraryDownloader = false;
        }
        
        GUILayout.EndHorizontal();
        
        // Instrument Selector
        if (showInstrumentSelector)
        {
            DrawInstrumentSelector();
        }
        
        // Audio Library Downloader
        if (showAudioLibraryDownloader)
        {
            DrawAudioLibraryDownloader();
        }
        
        // Pattern Settings
        if (showPatternSettings)
        {
            DrawPatternSettings();
        }
        
        // Pattern Editor
        GUILayout.Label("Pattern Code:", EditorStyles.boldLabel);
        
        scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.ExpandHeight(true));
        patternCode = GUILayout.TextArea(patternCode, GUILayout.ExpandHeight(true));
        GUILayout.EndScrollView();
        
        // Status bar
        GUILayout.BeginHorizontal(EditorStyles.toolbar);
        GUILayout.Label("Status: Ready", GUILayout.ExpandWidth(true));
        GUILayout.EndHorizontal();
        
        GUILayout.EndVertical();
    }
    
    void DrawInstrumentSelector()
    {
        GUILayout.BeginVertical("Instrument Selector", "window");
        
        GUILayout.Label("Available Instruments:", EditorStyles.boldLabel);
        
        selectedInstrumentIndex = EditorGUILayout.Popup("Selected Instrument:", selectedInstrumentIndex, availableInstruments.ToArray());
        
        if (GUILayout.Button("Add Instrument"))
        {
            availableInstruments.Add("New Instrument");
        }
        
        if (GUILayout.Button("Remove Instrument") && availableInstruments.Count > 0)
        {
            availableInstruments.RemoveAt(selectedInstrumentIndex);
            if (selectedInstrumentIndex >= availableInstruments.Count)
                selectedInstrumentIndex = availableInstruments.Count - 1;
        }
        
        GUILayout.Label("Instrument Settings:", EditorStyles.boldLabel);
        
        // Instrument-specific settings would go here
        if (availableInstruments.Count > 0)
        {
            string selectedInstrument = availableInstruments[selectedInstrumentIndex];
            GUILayout.Label("Selected: " + selectedInstrument);
            
            // Add instrument to pattern
            if (GUILayout.Button("Add to Pattern"))
            {
                patternCode += "\n\n-- " + selectedInstrument + " pattern\n" + 
                              selectedInstrument.ToLower() + " = sound \"" + selectedInstrument.ToLower() + "\" | n \"c4\" | # gain 0.8\n";
            }
        }
        
        GUILayout.EndVertical();
    }
    
    void DrawAudioLibraryDownloader()
    {
        GUILayout.BeginVertical("Audio Library Downloader", "window");
        
        GUILayout.Label("Available Audio Libraries:", EditorStyles.boldLabel);
        
        foreach (var library in availableLibraries)
        {
            GUILayout.BeginHorizontal();
            
            GUILayout.Label(library.name + " (", GUILayout.Width(150));
            
            if (library.status == AudioLibraryDownloader.DownloadStatus.NotStarted)
            {
                GUILayout.Label("Not Downloaded", GUILayout.Width(100));
                
                if (GUILayout.Button("Download", GUILayout.Width(80)))
                {
                    audioLibraryDownloader.StartDownload(library);
                }
            }
            else if (library.status == AudioLibraryDownloader.DownloadStatus.Downloading)
            {
                GUILayout.Label("Downloading...", GUILayout.Width(100));
            }
            else if (library.status == AudioLibraryDownloader.DownloadStatus.Completed)
            {
                GUILayout.Label("Downloaded", GUILayout.Width(100));
                
                if (GUILayout.Button("Use", GUILayout.Width(80)))
                {
                    UseLibraryInPattern(library);
                }
            }
            else if (library.status == AudioLibraryDownloader.DownloadStatus.Failed)
            {
                GUILayout.Label("Failed", GUILayout.Width(100));
                
                if (GUILayout.Button("Retry", GUILayout.Width(80)))
                {
                    audioLibraryDownloader.StartDownload(library);
                }
            }
            
            GUILayout.Label(")");
            GUILayout.EndHorizontal();
            
            GUILayout.Label(library.description, EditorStyles.miniLabel);
            GUILayout.Space(5);
        }
        
        GUILayout.Label("Add Custom Library:", EditorStyles.boldLabel);
        
        GUILayout.BeginHorizontal();
        string customLibName = GUILayout.TextField("Library Name");
        string customLibUrl = GUILayout.TextField("URL");
        
        if (GUILayout.Button("Add"))
        {
            audioLibraryDownloader.AddCustomLibrary(customLibName, customLibUrl, AudioLibraryDownloader.DownloadSource.DirectURL);
            availableLibraries = audioLibraryDownloader.GetAvailableLibraries();
        }
        
        GUILayout.EndHorizontal();
        
        GUILayout.EndVertical();
    }
    
    void DrawPatternSettings()
    {
        GUILayout.BeginVertical("Pattern Settings", "window");

        // Pattern Settings
        GUILayout.Label("Pattern Settings:", EditorStyles.boldLabel);

        // BPM setting
        float bpm = EditorGUILayout.FloatField("BPM:", 120f);

        // Swing setting
        float swing = EditorGUILayout.Slider("Swing:", 0.5f, 0f, 1f);

        // Volume setting
        float volume = EditorGUILayout.Slider("Volume:", 0.8f, 0f, 1f);

        // Pattern length
        int patternLength = EditorGUILayout.IntField("Pattern Length (beats):", 16);

        // Audio Effects Tab
        GUILayout.Label("Audio Effects", EditorStyles.boldLabel);

        // Core Amplitude & Envelope
        GUILayout.Label("Core Amplitude & Envelope", EditorStyles.boldLabel);
        GUILayout.BeginVertical("box");

        float gain = EditorGUILayout.Slider("Gain (Volume)", 1.0f, 0f, 2f);
        GUILayout.Label("1.0", EditorStyles.miniLabel);

        float decay = EditorGUILayout.Slider("Decay", 0.4f, 0f, 2f);
        GUILayout.Label("0.4", EditorStyles.miniLabel);

        float sustain = EditorGUILayout.Slider("Sustain", 0.2f, 0f, 1f);
        GUILayout.Label("0.2", EditorStyles.miniLabel);

        float attack = EditorGUILayout.Slider("Attack", 0.01f, 0f, 1f);
        GUILayout.Label("0.01", EditorStyles.miniLabel);

        float release = EditorGUILayout.Slider("Release", 0.2f, 0f, 2f);
        GUILayout.Label("0.2", EditorStyles.miniLabel);

        float pan = EditorGUILayout.Slider("Pan (Stereo)", 0f, -1f, 1f);
        GUILayout.Label("0", EditorStyles.miniLabel);

        GUILayout.EndVertical();

        // Filters
        GUILayout.Label("Filters", EditorStyles.boldLabel);
        GUILayout.BeginVertical("box");

        float lpf = EditorGUILayout.Slider("Low-Pass Filter (Hz)", 800f, 20f, 20000f);
        GUILayout.Label("800", EditorStyles.miniLabel);

        float hpf = EditorGUILayout.Slider("High-Pass Filter (Hz)", 200f, 20f, 20000f);
        GUILayout.Label("200", EditorStyles.miniLabel);

        float bpf = EditorGUILayout.Slider("Band-Pass Filter (Hz)", 1200f, 20f, 20000f);
        GUILayout.Label("1200", EditorStyles.miniLabel);

        float lpq = EditorGUILayout.Slider("Filter Resonance (Q)", 0.7f, 0f, 10f);
        GUILayout.Label("0.7", EditorStyles.miniLabel);

        GUILayout.EndVertical();

        // Time & Space Effects
        GUILayout.Label("Time & Space Effects", EditorStyles.boldLabel);
        GUILayout.BeginVertical("box");

        float delay = EditorGUILayout.Slider("Delay Time (cycles)", 0.25f, 0f, 1f);
        GUILayout.Label("0.25", EditorStyles.miniLabel);

        float delayfb = EditorGUILayout.Slider("Delay Feedback", 0.4f, 0f, 1f);
        GUILayout.Label("0.4", EditorStyles.miniLabel);

        float delayt = EditorGUILayout.Slider("Delay Triplet Feel", 0.33f, 0f, 1f);
        GUILayout.Label("0.33", EditorStyles.miniLabel);

        float reverb = EditorGUILayout.Slider("Reverb Amount", 0.3f, 0f, 1f);
        GUILayout.Label("0.3", EditorStyles.miniLabel);

        float room = EditorGUILayout.Slider("Room Size", 0.5f, 0f, 1f);
        GUILayout.Label("0.5", EditorStyles.miniLabel);

        GUILayout.EndVertical();

        // Distortion & Saturation
        GUILayout.Label("Distortion & Saturation", EditorStyles.boldLabel);
        GUILayout.BeginVertical("box");

        float distort = EditorGUILayout.Slider("Distortion", 0.3f, 0f, 1f);
        GUILayout.Label("0.3", EditorStyles.miniLabel);

        int crush = EditorGUILayout.IntSlider("Bitcrush", 4, 1, 16);
        GUILayout.Label("4", EditorStyles.miniLabel);

        float shape = EditorGUILayout.Slider("Waveshaper", 0.5f, 0f, 1f);
        GUILayout.Label("0.5", EditorStyles.miniLabel);

        GUILayout.EndVertical();

        // Pitch & Playback
        GUILayout.Label("Pitch & Playback", EditorStyles.boldLabel);
        GUILayout.BeginVertical("box");

        float speed = EditorGUILayout.Slider("Playback Speed", 1.0f, 0.1f, 2f);
        GUILayout.Label("1.0", EditorStyles.miniLabel);

        int note = EditorGUILayout.IntSlider("Pitch (semitones)", 0, -24, 24);
        GUILayout.Label("0", EditorStyles.miniLabel);

        int coarse = EditorGUILayout.IntSlider("Octave Shift", 0, -2, 2);
        GUILayout.Label("0", EditorStyles.miniLabel);

        GUILayout.EndVertical();

        // Rhythmic & Glitch
        GUILayout.Label("Rhythmic & Glitch", EditorStyles.boldLabel);
        GUILayout.BeginVertical("box");

        int chop = EditorGUILayout.IntSlider("Chop (slices)", 8, 1, 16);
        GUILayout.Label("8", EditorStyles.miniLabel);

        int stutter = EditorGUILayout.IntSlider("Stutter (repeats)", 2, 1, 8);
        GUILayout.Label("2", EditorStyles.miniLabel);

        float trunc = EditorGUILayout.Slider("Truncate (tail cut)", 0.5f, 0f, 1f);
        GUILayout.Label("0.5", EditorStyles.miniLabel);

        GUILayout.EndVertical();

        // Modulation
        GUILayout.Label("Modulation & Movement", EditorStyles.boldLabel);
        GUILayout.BeginVertical("box");

        int vibrato = EditorGUILayout.IntSlider("Vibrato (Hz)", 4, 1, 20);
        GUILayout.Label("4", EditorStyles.miniLabel);

        float vibdepth = EditorGUILayout.Slider("Vibrato Depth", 0.02f, 0f, 0.1f);
        GUILayout.Label("0.02", EditorStyles.miniLabel);

        int tremolo = EditorGUILayout.IntSlider("Tremolo (Hz)", 8, 1, 20);
        GUILayout.Label("8", EditorStyles.miniLabel);

        float tremdepth = EditorGUILayout.Slider("Tremolo Depth", 0.5f, 0f, 1f);
        GUILayout.Label("0.5", EditorStyles.miniLabel);

        GUILayout.EndVertical();

        // Probability & Variation
        GUILayout.Label("Probability & Variation", EditorStyles.boldLabel);
        GUILayout.BeginVertical("box");

        GUILayout.Label("Random Effects", EditorStyles.boldLabel);
        GUILayout.Label("These controls allow you to apply effects probabilistically to create variation in your sounds.", EditorStyles.miniLabel);

        float often = EditorGUILayout.Slider("Often Probability", 0.75f, 0f, 1f);
        GUILayout.Label("75%", EditorStyles.miniLabel);

        float sometimes = EditorGUILayout.Slider("Sometimes Probability", 0.5f, 0f, 1f);
        GUILayout.Label("50%", EditorStyles.miniLabel);

        float rarely = EditorGUILayout.Slider("Rarely Probability", 0.25f, 0f, 1f);
        GUILayout.Label("25%", EditorStyles.miniLabel);

        GUILayout.EndVertical();

        if (GUILayout.Button("Apply Settings"))
        {
            // Apply settings to pattern
            ApplyPatternSettings(bpm, swing, volume, patternLength, gain, decay, sustain, attack, release, pan, lpf, hpf, bpf, lpq, delay, delayfb, delayt, reverb, room, distort, crush, shape, speed, note, coarse, chop, stutter, trunc, vibrato, vibdepth, tremolo, tremdepth, often, sometimes, rarely);
        }

        GUILayout.Label("Pattern Tools:", EditorStyles.boldLabel);

        if (GUILayout.Button("Generate Random Pattern"))
        {
            GenerateRandomPattern();
        }

        if (GUILayout.Button("Clear Pattern"))
        {
            patternCode = "";
        }

        GUILayout.EndVertical();
    }
    
    void UseLibraryInPattern(AudioLibraryDownloader.AudioLibrary library)
    {
        // Add library usage to pattern
        patternCode += "\n\n-- Using " + library.name + " library\n";
        patternCode += "-- Samples available in: " + library.localPath + "\n";
        
        // Add example usage
        if (library.name.Contains("VCSL") || library.name.Contains("Organ"))
        {
            patternCode += "organ = sound \"organ\" | n \"c3 e3 g3 c4\" | # gain 0.7\n";
        }
        else if (library.name.Contains("VSCO") || library.name.Contains("Orchestra"))
        {
            patternCode += "strings = sound \"strings\" | n \"g3 a3 b3 c4\" | # gain 0.6\n";
        }
        else
        {
            patternCode += "custom = sound \"custom\" | n \"c4\" | # gain 0.8\n";
        }
    }
    
    void ApplyPatternSettings(float bpm, float swing, float volume, int patternLength, float gain = 1.0f, float decay = 0.4f, float sustain = 0.2f, float attack = 0.01f, float release = 0.2f, float pan = 0f, float lpf = 800f, float hpf = 200f, float bpf = 1200f, float lpq = 0.7f, float delay = 0.25f, float delayfb = 0.4f, float delayt = 0.33f, float reverb = 0.3f, float room = 0.5f, float distort = 0.3f, int crush = 4, float shape = 0.5f, float speed = 1.0f, int note = 0, int coarse = 0, int chop = 8, int stutter = 2, float trunc = 0.5f, int vibrato = 4, float vibdepth = 0.02f, int tremolo = 8, float tremdepth = 0.5f, float often = 0.75f, float sometimes = 0.5f, float rarely = 0.25f)
    {
        // Add settings to pattern code
        string settingsCode = $@"
-- Pattern Settings
bpm = {bpm}
swing = {swing}
volume = {volume}
patternLength = {patternLength}

-- Audio Effects
gain = {gain}
decay = {decay}
sustain = {sustain}
attack = {attack}
release = {release}
pan = {pan}
lpf = {lpf}
hpf = {hpf}
bpf = {bpf}
lpq = {lpq}
delay = {delay}
delayfb = {delayfb}
delayt = {delayt}
reverb = {reverb}
room = {room}
distort = {distort}
crush = {crush}
shape = {shape}
speed = {speed}
note = {note}
coarse = {coarse}
chop = {chop}
stutter = {stutter}
trunc = {trunc}
vibrato = {vibrato}
vibdepth = {vibdepth}
tremolo = {tremolo}
tremdepth = {tremdepth}
often = {often}
sometimes = {sometimes}
rarely = {rarely}

-- Apply settings
setcps (bpm / 60)
";

        patternCode = settingsCode + "\n" + patternCode;
    }
    
    void GenerateRandomPattern()
    {
        // Generate a random pattern
        string[] notes = { "c", "d", "e", "f", "g", "a", "b" };
        string[] octaves = { "3", "4", "5" };
        string[] instruments = { "piano", "guitar", "bass", "strings" };
        
        StringBuilder randomPattern = new StringBuilder();
        randomPattern.AppendLine("-- Random Generated Pattern");
        randomPattern.AppendLine();
        
        // Generate melody
        randomPattern.Append("melody = ");
        for (int i = 0; i < 8; i++)
        {
            string note = notes[Random.Range(0, notes.Length)];
            string octave = octaves[Random.Range(0, octaves.Length)];
            randomPattern.Append(note + octave);
            if (i < 7) randomPattern.Append(" ");
        }
        randomPattern.AppendLine(" | # gain 0.8");
        
        // Generate drums
        randomPattern.AppendLine("kick = sound \"drum\" | n \"c2\" | # gain 1.2");
        randomPattern.AppendLine("snare = sound \"drum\" | n \"d2\" | # gain 1.0");
        randomPattern.AppendLine("hihat = sound \"drum\" | n \"f#2\" | # gain 0.7");
        
        randomPattern.AppendLine("drums = stack [");
        randomPattern.AppendLine("  every 4 (0, 1) $ kick,");
        randomPattern.AppendLine("  every 2 (0, 1) $ snare,");
        randomPattern.AppendLine("  fast 2 $ hihat");
        randomPattern.AppendLine("]");
        
        randomPattern.AppendLine("mainPattern = stack [");
        randomPattern.AppendLine("  melody,");
        randomPattern.AppendLine("  drums");
        randomPattern.AppendLine("]");
        
        randomPattern.AppendLine("mainPattern");
        
        patternCode = randomPattern.ToString();
    }
    
    void LoadPattern()
    {
        // In a real implementation, this would load from a file
        Debug.Log("Load pattern functionality would be implemented here");
    }
    
    void SavePattern()
    {
        // In a real implementation, this would save to a file
        Debug.Log("Save pattern functionality would be implemented here");
    }
    
    void PlayPattern()
    {
        if (patternParser != null)
        {
            patternParser.ParsePattern(patternCode);
            Debug.Log("Playing pattern: " + patternName);
        }
        else
        {
            Debug.LogError("Pattern parser not initialized");
        }
    }
    
    void StopPattern()
    {
        if (audioManager != null)
        {
            audioManager.StopAll();
            Debug.Log("Stopped pattern playback");
        }
        else
        {
            Debug.LogError("Audio manager not initialized");
        }
    }
}