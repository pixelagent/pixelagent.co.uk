using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// Advanced audio effects system with detailed controls
/// Similar to the HTML audio effects layout
/// </summary>
public class AdvancedAudioEffects : MonoBehaviour
{
    // Singleton instance
    private static AdvancedAudioEffects instance;
    public static AdvancedAudioEffects Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<AdvancedAudioEffects>();
                if (instance == null)
                {
                    GameObject obj = new GameObject("AdvancedAudioEffects");
                    instance = obj.AddComponent<AdvancedAudioEffects>();
                }
            }
            return instance;
        }
    }
    
    // Effect categories matching the HTML layout
    public enum EffectCategory
    {
        CoreAmplitude,
        Filters,
        TimeSpace,
        Distortion,
        PitchPlayback,
        Rhythmic,
        Modulation,
        Probability
    }
    
    // Detailed effect parameters
    public class EffectParameters
    {
        // Core Amplitude & Envelope
        public float gain = 1.0f;
        public float decay = 0.4f;
        public float sustain = 0.2f;
        public float attack = 0.01f;
        public float release = 0.2f;
        public float pan = 0.0f;
        
        // Filters
        public float lpf = 800f;
        public float hpf = 200f;
        public float bpf = 1200f;
        public float lpq = 0.7f;
        
        // Time & Space Effects
        public float delay = 0.25f;
        public float delayfb = 0.4f;
        public float delayt = 0.33f;
        public float reverb = 0.3f;
        public float room = 0.5f;
        
        // Distortion & Saturation
        public float distort = 0.3f;
        public float crush = 4f;
        public float shape = 0.5f;
        
        // Pitch & Playback
        public float speed = 1.0f;
        public float note = 0f;
        public float coarse = 0f;
        
        // Rhythmic & Glitch
        public float chop = 8f;
        public float stutter = 2f;
        public float trunc = 0.5f;
        
        // Modulation
        public float vibrato = 4f;
        public float vibdepth = 0.02f;
        public float tremolo = 8f;
        public float tremdepth = 0.5f;
        
        // Probability & Variation
        public float often = 0.75f;
        public float sometimes = 0.5f;
        public float rarely = 0.25f;
        
        public void Reset()
        {
            // Reset all parameters to defaults
            gain = 1.0f;
            decay = 0.4f;
            sustain = 0.2f;
            attack = 0.01f;
            release = 0.2f;
            pan = 0.0f;
            
            lpf = 800f;
            hpf = 200f;
            bpf = 1200f;
            lpq = 0.7f;
            
            delay = 0.25f;
            delayfb = 0.4f;
            delayt = 0.33f;
            reverb = 0.3f;
            room = 0.5f;
            
            distort = 0.3f;
            crush = 4f;
            shape = 0.5f;
            
            speed = 1.0f;
            note = 0f;
            coarse = 0f;
            
            chop = 8f;
            stutter = 2f;
            trunc = 0.5f;
            
            vibrato = 4f;
            vibdepth = 0.02f;
            tremolo = 8f;
            tremdepth = 0.5f;
            
            often = 0.75f;
            sometimes = 0.5f;
            rarely = 0.25f;
        }
        
        public EffectParameters Clone()
        {
            EffectParameters clone = new EffectParameters();
            
            // Copy all parameters
            clone.gain = this.gain;
            clone.decay = this.decay;
            clone.sustain = this.sustain;
            clone.attack = this.attack;
            clone.release = this.release;
            clone.pan = this.pan;
            
            clone.lpf = this.lpf;
            clone.hpf = this.hpf;
            clone.bpf = this.bpf;
            clone.lpq = this.lpq;
            
            clone.delay = this.delay;
            clone.delayfb = this.delayfb;
            clone.delayt = this.delayt;
            clone.reverb = this.reverb;
            clone.room = this.room;
            
            clone.distort = this.distort;
            clone.crush = this.crush;
            clone.shape = this.shape;
            
            clone.speed = this.speed;
            clone.note = this.note;
            clone.coarse = this.coarse;
            
            clone.chop = this.chop;
            clone.stutter = this.stutter;
            clone.trunc = this.trunc;
            
            clone.vibrato = this.vibrato;
            clone.vibdepth = this.vibdepth;
            clone.tremolo = this.tremolo;
            clone.tremdepth = this.tremdepth;
            
            clone.often = this.often;
            clone.sometimes = this.sometimes;
            clone.rarely = this.rarely;
            
            return clone;
        }
    }
    
    // Effect presets matching the HTML layout
    private Dictionary<string, EffectParameters> effectPresets = new Dictionary<string, EffectParameters>();
    
    void Awake()
    {
        InitializeEffectPresets();
    }
    
    private void InitializeEffectPresets()
    {
        // Default preset
        effectPresets["Default"] = new EffectParameters();
        
        // Drum preset - punchy with some reverb
        EffectParameters drumPreset = new EffectParameters();
        drumPreset.gain = 1.2f;
        drumPreset.attack = 0.001f;
        drumPreset.release = 0.1f;
        drumPreset.lpf = 10000f;
        drumPreset.reverb = 0.2f;
        drumPreset.room = 0.3f;
        effectPresets["Drum"] = drumPreset;
        
        // Synth preset - with delay and filter
        EffectParameters synthPreset = new EffectParameters();
        synthPreset.gain = 0.9f;
        synthPreset.attack = 0.1f;
        synthPreset.release = 0.5f;
        synthPreset.lpf = 5000f;
        synthPreset.delay = 0.5f;
        synthPreset.delayfb = 0.6f;
        synthPreset.reverb = 0.4f;
        effectPresets["Synth"] = synthPreset;
        
        // Ambient preset - heavy reverb and delay
        EffectParameters ambientPreset = new EffectParameters();
        ambientPreset.gain = 0.7f;
        ambientPreset.attack = 0.5f;
        ambientPreset.release = 2.0f;
        ambientPreset.lpf = 3000f;
        ambientPreset.delay = 0.75f;
        ambientPreset.delayfb = 0.7f;
        ambientPreset.reverb = 0.8f;
        ambientPreset.room = 0.9f;
        effectPresets["Ambient"] = ambientPreset;
        
        // Distorted preset - with distortion and filtering
        EffectParameters distortedPreset = new EffectParameters();
        distortedPreset.gain = 0.8f;
        distortedPreset.distort = 0.7f;
        distortedPreset.lpf = 3000f;
        distortedPreset.hpf = 500f;
        distortedPreset.reverb = 0.3f;
        effectPresets["Distorted"] = distortedPreset;
    }
    
    /// <summary>
    /// Get all effect preset names
    /// </summary>
    public List<string> GetEffectPresetNames()
    {
        return new List<string>(effectPresets.Keys);
    }
    
    /// <summary>
    /// Get effect parameters for a preset
    /// </summary>
    public EffectParameters GetEffectParameters(string presetName)
    {
        if (effectPresets.ContainsKey(presetName))
        {
            return effectPresets[presetName].Clone();
        }
        return new EffectParameters();
    }
    
    /// <summary>
    /// Create a custom preset
    /// </summary>
    public void CreatePreset(string presetName, EffectParameters parameters)
    {
        effectPresets[presetName] = parameters.Clone();
    }
    
    /// <summary>
    /// Get all effect categories
    /// </summary>
    public List<string> GetEffectCategories()
    {
        return new List<string> {
            "Core Amplitude & Envelope",
            "Filters",
            "Time & Space Effects",
            "Distortion & Saturation",
            "Pitch & Playback",
            "Rhythmic & Glitch",
            "Modulation & Movement",
            "Probability & Variation"
        };
    }
    
    /// <summary>
    /// Get effect parameters for a category
    /// </summary>
    public List<EffectParameterInfo> GetCategoryParameters(EffectCategory category)
    {
        List<EffectParameterInfo> parameters = new List<EffectParameterInfo>();
        
        switch (category)
        {
            case EffectCategory.CoreAmplitude:
                parameters.Add(new EffectParameterInfo("Gain", "gain", 0f, 2f, 1.0f, "🔊", "Volume control"));
                parameters.Add(new EffectParameterInfo("Decay", "decay", 0f, 2f, 0.4f, "📉", "Decay time"));
                parameters.Add(new EffectParameterInfo("Sustain", "sustain", 0f, 1f, 0.2f, "🔄", "Sustain level"));
                parameters.Add(new EffectParameterInfo("Attack", "attack", 0f, 1f, 0.01f, "📈", "Attack time"));
                parameters.Add(new EffectParameterInfo("Release", "release", 0f, 2f, 0.2f, "📉", "Release time"));
                parameters.Add(new EffectParameterInfo("Pan", "pan", -1f, 1f, 0f, "🔊", "Stereo position"));
                break;
                
            case EffectCategory.Filters:
                parameters.Add(new EffectParameterInfo("Low-Pass Filter", "lpf", 20f, 20000f, 800f, "🔽", "Low-pass cutoff frequency"));
                parameters.Add(new EffectParameterInfo("High-Pass Filter", "hpf", 20f, 20000f, 200f, "🔼", "High-pass cutoff frequency"));
                parameters.Add(new EffectParameterInfo("Band-Pass Filter", "bpf", 20f, 20000f, 1200f, "🔄", "Band-pass center frequency"));
                parameters.Add(new EffectParameterInfo("Filter Resonance", "lpq", 0f, 10f, 0.7f, "🔊", "Filter resonance (Q)"));
                break;
                
            case EffectCategory.TimeSpace:
                parameters.Add(new EffectParameterInfo("Delay Time", "delay", 0f, 1f, 0.25f, "🕒", "Delay time in cycles"));
                parameters.Add(new EffectParameterInfo("Delay Feedback", "delayfb", 0f, 1f, 0.4f, "🔄", "Delay feedback amount"));
                parameters.Add(new EffectParameterInfo("Delay Triplet", "delayt", 0f, 1f, 0.33f, "🎵", "Triplet feel"));
                parameters.Add(new EffectParameterInfo("Reverb Amount", "reverb", 0f, 1f, 0.3f, "🏔", "Reverb wet/dry mix"));
                parameters.Add(new EffectParameterInfo("Room Size", "room", 0f, 1f, 0.5f, "🏠", "Room size"));
                break;
                
            case EffectCategory.Distortion:
                parameters.Add(new EffectParameterInfo("Distortion", "distort", 0f, 1f, 0.3f, "🔥", "Distortion amount"));
                parameters.Add(new EffectParameterInfo("Bitcrush", "crush", 1f, 16f, 4f, "💻", "Bit depth reduction"));
                parameters.Add(new EffectParameterInfo("Waveshaper", "shape", 0f, 1f, 0.5f, "🌊", "Wave shaping"));
                break;
                
            case EffectCategory.PitchPlayback:
                parameters.Add(new EffectParameterInfo("Playback Speed", "speed", 0.1f, 2f, 1.0f, "🏃", "Playback speed multiplier"));
                parameters.Add(new EffectParameterInfo("Pitch", "note", -24f, 24f, 0f, "🎵", "Pitch in semitones"));
                parameters.Add(new EffectParameterInfo("Octave Shift", "coarse", -2f, 2f, 0f, "🎹", "Octave shift"));
                break;
                
            case EffectCategory.Rhythmic:
                parameters.Add(new EffectParameterInfo("Chop", "chop", 1f, 16f, 8f, "🔪", "Number of slices"));
                parameters.Add(new EffectParameterInfo("Stutter", "stutter", 1f, 8f, 2f, "🔄", "Number of repeats"));
                parameters.Add(new EffectParameterInfo("Truncate", "trunc", 0f, 1f, 0.5f, "✂️", "Tail cut amount"));
                break;
                
            case EffectCategory.Modulation:
                parameters.Add(new EffectParameterInfo("Vibrato", "vibrato", 1f, 20f, 4f, "🌊", "Vibrato frequency"));
                parameters.Add(new EffectParameterInfo("Vibrato Depth", "vibdepth", 0f, 0.1f, 0.02f, "📊", "Vibrato depth"));
                parameters.Add(new EffectParameterInfo("Tremolo", "tremolo", 1f, 20f, 8f, "🌊", "Tremolo frequency"));
                parameters.Add(new EffectParameterInfo("Tremolo Depth", "tremdepth", 0f, 1f, 0.5f, "📊", "Tremolo depth"));
                break;
                
            case EffectCategory.Probability:
                parameters.Add(new EffectParameterInfo("Often Probability", "often", 0f, 1f, 0.75f, "🎲", "High probability"));
                parameters.Add(new EffectParameterInfo("Sometimes Probability", "sometimes", 0f, 1f, 0.5f, "🎲", "Medium probability"));
                parameters.Add(new EffectParameterInfo("Rarely Probability", "rarely", 0f, 1f, 0.25f, "🎲", "Low probability"));
                break;
        }
        
        return parameters;
    }
    
    /// <summary>
    /// Get the icon for an effect category
    /// </summary>
    public string GetCategoryIcon(EffectCategory category)
    {
        switch (category)
        {
            case EffectCategory.CoreAmplitude: return "🔊";
            case EffectCategory.Filters: return "🔽";
            case EffectCategory.TimeSpace: return "🕒";
            case EffectCategory.Distortion: return "🔥";
            case EffectCategory.PitchPlayback: return "🏃";
            case EffectCategory.Rhythmic: return "🔪";
            case EffectCategory.Modulation: return "🌊";
            case EffectCategory.Probability: return "🎲";
            default: return "🎵";
        }
    }
    
    /// <summary>
    /// Get the description for an effect category
    /// </summary>
    public string GetCategoryDescription(EffectCategory category)
    {
        switch (category)
        {
            case EffectCategory.CoreAmplitude: return "Core amplitude envelope and stereo positioning";
            case EffectCategory.Filters: return "Frequency filtering and resonance controls";
            case EffectCategory.TimeSpace: return "Delay, reverb, and spatial effects";
            case EffectCategory.Distortion: return "Distortion, bitcrushing, and waveshaping";
            case EffectCategory.PitchPlayback: return "Pitch shifting and playback speed controls";
            case EffectCategory.Rhythmic: return "Rhythmic manipulation and glitch effects";
            case EffectCategory.Modulation: return "Vibrato, tremolo, and modulation effects";
            case EffectCategory.Probability: return "Probabilistic effects and variation";
            default: return "Audio effects";
        }
    }
    
    /// <summary>
    /// Apply effect parameters to an audio source
    /// </summary>
    public void ApplyEffectParameters(AudioSource source, EffectParameters parameters)
    {
        // In a real implementation, this would apply the effects to the audio source
        // For now, we'll just log what would be applied
        Debug.Log("Applying effect parameters to audio source:");
        Debug.Log("- Gain: " + parameters.gain);
        Debug.Log("- Decay: " + parameters.decay);
        Debug.Log("- Sustain: " + parameters.sustain);
        Debug.Log("- Attack: " + parameters.attack);
        Debug.Log("- Release: " + parameters.release);
        Debug.Log("- Pan: " + parameters.pan);
        Debug.Log("- LPF: " + parameters.lpf + "Hz");
        Debug.Log("- HPF: " + parameters.hpf + "Hz");
        Debug.Log("- Reverb: " + parameters.reverb);
        Debug.Log("- Distortion: " + parameters.distort);
        Debug.Log("- Playback Speed: " + parameters.speed);
    }
}

/// <summary>
/// Information about an effect parameter for UI display
/// </summary>
public class EffectParameterInfo
{
    public string name;
    public string id;
    public float min;
    public float max;
    public float defaultValue;
    public string icon;
    public string description;
    
    public EffectParameterInfo(string name, string id, float min, float max, float defaultValue, string icon, string description)
    {
        this.name = name;
        this.id = id;
        this.min = min;
        this.max = max;
        this.defaultValue = defaultValue;
        this.icon = icon;
        this.description = description;
    }
}