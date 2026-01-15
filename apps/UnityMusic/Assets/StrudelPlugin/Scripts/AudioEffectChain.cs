using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// Audio effect processing chain for Strudel patterns
/// </summary>
public class AudioEffectChain : MonoBehaviour
{
    // Singleton instance
    private static AudioEffectChain instance;
    public static AudioEffectChain Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<AudioEffectChain>();
                if (instance == null)
                {
                    GameObject obj = new GameObject("AudioEffectChain");
                    instance = obj.AddComponent<AudioEffectChain>();
                }
            }
            return instance;
        }
    }
    
    // Available effect types
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
        EQ
    }
    
    // Effect chain for each audio source
    private Dictionary<AudioSource, List<AudioEffect>> effectChains = new Dictionary<AudioSource, List<AudioEffect>>();
    
    // Global effect presets
    private Dictionary<string, List<AudioEffect>> effectPresets = new Dictionary<string, List<AudioEffect>>();
    
    void Awake()
    {
        InitializeEffectPresets();
    }
    
    private void InitializeEffectPresets()
    {
        // Default preset - light reverb
        effectPresets["Default"] = new List<AudioEffect>
        {
            new ReverbEffect { mix = 0.3f, roomSize = 0.5f, decayTime = 1.0f }
        };
        
        // Drum preset - more reverb and compression
        effectPresets["Drum"] = new List<AudioEffect>
        {
            new ReverbEffect { mix = 0.4f, roomSize = 0.7f, decayTime = 1.2f },
            new CompressorEffect { threshold = -20f, ratio = 4f, attack = 0.01f, release = 0.1f }
        };
        
        // Synth preset - delay and filter
        effectPresets["Synth"] = new List<AudioEffect>
        {
            new DelayEffect { mix = 0.3f, delayTime = 0.25f, feedback = 0.4f },
            new FilterEffect { type = FilterEffect.FilterType.LowPass, cutoff = 10000f, resonance = 0.5f }
        };
        
        // Ambient preset - heavy reverb and delay
        effectPresets["Ambient"] = new List<AudioEffect>
        {
            new ReverbEffect { mix = 0.6f, roomSize = 0.9f, decayTime = 2.5f },
            new DelayEffect { mix = 0.4f, delayTime = 0.5f, feedback = 0.5f }
        };
    }
    
    /// <summary>
    /// Create an effect chain for an audio source
    /// </summary>
    public void CreateEffectChain(AudioSource source, string presetName = "Default")
    {
        if (effectChains.ContainsKey(source))
        {
            Debug.LogWarning("Effect chain already exists for this audio source");
            return;
        }
        
        // Create new effect chain
        List<AudioEffect> effects = new List<AudioEffect>();
        
        // Apply preset if available
        if (effectPresets.ContainsKey(presetName))
        {
            foreach (var effect in effectPresets[presetName])
            {
                effects.Add(effect.Clone());
            }
        }
        
        effectChains[source] = effects;
        Debug.Log("Created effect chain for audio source with preset: " + presetName);
    }
    
    /// <summary>
    /// Apply effects to an audio source
    /// </summary>
    public void ApplyEffects(AudioSource source, AudioClip clip)
    {
        if (!effectChains.ContainsKey(source))
        {
            CreateEffectChain(source);
        }
        
        // In a real implementation, this would apply the effects to the audio source
        // For now, we'll just log what effects would be applied
        Debug.Log("Applying effects to audio source:");
        
        foreach (var effect in effectChains[source])
        {
            Debug.Log("- " + effect.GetType().Name + ": " + effect.GetDescription());
        }
    }
    
    /// <summary>
    /// Add an effect to the chain
    /// </summary>
    public void AddEffect(AudioSource source, AudioEffect effect)
    {
        if (!effectChains.ContainsKey(source))
        {
            CreateEffectChain(source);
        }
        
        effectChains[source].Add(effect);
        Debug.Log("Added effect to chain: " + effect.GetType().Name);
    }
    
    /// <summary>
    /// Remove an effect from the chain
    /// </summary>
    public void RemoveEffect(AudioSource source, int index)
    {
        if (effectChains.ContainsKey(source) && index >= 0 && index < effectChains[source].Count)
        {
            var effect = effectChains[source][index];
            effectChains[source].RemoveAt(index);
            Debug.Log("Removed effect from chain: " + effect.GetType().Name);
        }
    }
    
    /// <summary>
    /// Clear all effects from a chain
    /// </summary>
    public void ClearEffects(AudioSource source)
    {
        if (effectChains.ContainsKey(source))
        {
            effectChains[source].Clear();
            Debug.Log("Cleared all effects from chain");
        }
    }
    
    /// <summary>
    /// Get effects for an audio source
    /// </summary>
    public List<AudioEffect> GetEffects(AudioSource source)
    {
        if (effectChains.ContainsKey(source))
        {
            return effectChains[source];
        }
        return new List<AudioEffect>();
    }
    
    /// <summary>
    /// Get available effect presets
    /// </summary>
    public List<string> GetEffectPresets()
    {
        return new List<string>(effectPresets.Keys);
    }
    
    /// <summary>
    /// Apply a preset to an audio source
    /// </summary>
    public void ApplyPreset(AudioSource source, string presetName)
    {
        if (!effectChains.ContainsKey(source))
        {
            CreateEffectChain(source);
        }
        
        if (effectPresets.ContainsKey(presetName))
        {
            effectChains[source].Clear();
            foreach (var effect in effectPresets[presetName])
            {
                effectChains[source].Add(effect.Clone());
            }
            Debug.Log("Applied preset to audio source: " + presetName);
        }
        else
        {
            Debug.LogWarning("Effect preset not found: " + presetName);
        }
    }
    
    /// <summary>
    /// Create a custom preset
    /// </summary>
    public void CreatePreset(string presetName, List<AudioEffect> effects)
    {
        effectPresets[presetName] = new List<AudioEffect>();
        foreach (var effect in effects)
        {
            effectPresets[presetName].Add(effect.Clone());
        }
        Debug.Log("Created custom effect preset: " + presetName);
    }
}

/// <summary>
/// Base class for audio effects
/// </summary>
public abstract class AudioEffect
{
    public bool enabled = true;
    public float mix = 1.0f; // Wet/dry mix (0 = dry, 1 = wet)
    
    public abstract string GetDescription();
    public abstract AudioEffect Clone();
}

/// <summary>
/// Reverb effect
/// </summary>
public class ReverbEffect : AudioEffect
{
    public float roomSize = 0.5f; // 0-1
    public float decayTime = 1.0f; // seconds
    public float damping = 0.5f; // 0-1
    
    public override string GetDescription()
    {
        return string.Format("Reverb (Room: {0}, Decay: {1}s, Mix: {2})", 
                           roomSize.ToString("0.0"), decayTime.ToString("0.0"), mix.ToString("0.0"));
    }
    
    public override AudioEffect Clone()
    {
        return new ReverbEffect 
        {
            enabled = this.enabled,
            mix = this.mix,
            roomSize = this.roomSize,
            decayTime = this.decayTime,
            damping = this.damping
        };
    }
}

/// <summary>
/// Delay effect
/// </summary>
public class DelayEffect : AudioEffect
{
    public float delayTime = 0.25f; // seconds
    public float feedback = 0.5f; // 0-1
    public float filter = 0.9f; // 0-1 (high pass filter)
    
    public override string GetDescription()
    {
        return string.Format("Delay (Time: {0}s, Feedback: {1}, Mix: {2})", 
                           delayTime.ToString("0.00"), feedback.ToString("0.0"), mix.ToString("0.0"));
    }
    
    public override AudioEffect Clone()
    {
        return new DelayEffect 
        {
            enabled = this.enabled,
            mix = this.mix,
            delayTime = this.delayTime,
            feedback = this.feedback,
            filter = this.filter
        };
    }
}

/// <summary>
/// Distortion effect
/// </summary>
public class DistortionEffect : AudioEffect
{
    public float drive = 0.5f; // 0-1
    public float tone = 0.5f; // 0-1
    public float volume = 0.8f; // 0-1
    
    public override string GetDescription()
    {
        return string.Format("Distortion (Drive: {0}, Tone: {1}, Mix: {2})", 
                           drive.ToString("0.0"), tone.ToString("0.0"), mix.ToString("0.0"));
    }
    
    public override AudioEffect Clone()
    {
        return new DistortionEffect 
        {
            enabled = this.enabled,
            mix = this.mix,
            drive = this.drive,
            tone = this.tone,
            volume = this.volume
        };
    }
}

/// <summary>
/// Filter effect
/// </summary>
public class FilterEffect : AudioEffect
{
    public enum FilterType { LowPass, HighPass, BandPass }
    public FilterType type = FilterType.LowPass;
    public float cutoff = 5000f; // Hz
    public float resonance = 0.5f; // 0-1
    
    public override string GetDescription()
    {
        return string.Format("Filter ({0}, Cutoff: {1}Hz, Resonance: {2}, Mix: {3})", 
                           type, cutoff.ToString("0"), resonance.ToString("0.0"), mix.ToString("0.0"));
    }
    
    public override AudioEffect Clone()
    {
        return new FilterEffect 
        {
            enabled = this.enabled,
            mix = this.mix,
            type = this.type,
            cutoff = this.cutoff,
            resonance = this.resonance
        };
    }
}

/// <summary>
/// Chorus effect
/// </summary>
public class ChorusEffect : AudioEffect
{
    public float rate = 1.0f; // Hz
    public float depth = 0.1f; // 0-1
    public float delay = 0.02f; // seconds
    
    public override string GetDescription()
    {
        return string.Format("Chorus (Rate: {0}Hz, Depth: {1}, Mix: {2})", 
                           rate.ToString("0.0"), depth.ToString("0.0"), mix.ToString("0.0"));
    }
    
    public override AudioEffect Clone()
    {
        return new ChorusEffect 
        {
            enabled = this.enabled,
            mix = this.mix,
            rate = this.rate,
            depth = this.depth,
            delay = this.delay
        };
    }
}

/// <summary>
/// Compressor effect
/// </summary>
public class CompressorEffect : AudioEffect
{
    public float threshold = -20f; // dB
    public float ratio = 4f; // 1-20
    public float attack = 0.01f; // seconds
    public float release = 0.1f; // seconds
    public float makeupGain = 0f; // dB
    
    public override string GetDescription()
    {
        return string.Format("Compressor (Threshold: {0}dB, Ratio: {1}:1, Mix: {2})", 
                           threshold.ToString("0"), ratio.ToString("0.0"), mix.ToString("0.0"));
    }
    
    public override AudioEffect Clone()
    {
        return new CompressorEffect 
        {
            enabled = this.enabled,
            mix = this.mix,
            threshold = this.threshold,
            ratio = this.ratio,
            attack = this.attack,
            release = this.release,
            makeupGain = this.makeupGain
        };
    }
}

/// <summary>
/// EQ effect (3-band)
/// </summary>
public class EQEffect : AudioEffect
{
    public float lowGain = 0f; // dB
    public float midGain = 0f; // dB
    public float highGain = 0f; // dB
    public float lowFreq = 200f; // Hz
    public float highFreq = 5000f; // Hz
    
    public override string GetDescription()
    {
        return string.Format("EQ (Low: {0}dB, Mid: {1}dB, High: {2}dB, Mix: {3})", 
                           lowGain.ToString("0.0"), midGain.ToString("0.0"), highGain.ToString("0.0"), mix.ToString("0.0"));
    }
    
    public override AudioEffect Clone()
    {
        return new EQEffect 
        {
            enabled = this.enabled,
            mix = this.mix,
            lowGain = this.lowGain,
            midGain = this.midGain,
            highGain = this.highGain,
            lowFreq = this.lowFreq,
            highFreq = this.highFreq
        };
    }
}