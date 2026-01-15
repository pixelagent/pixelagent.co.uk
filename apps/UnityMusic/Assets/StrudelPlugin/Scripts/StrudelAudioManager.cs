using UnityEngine;
using System.Collections;

/// <summary>
/// Main audio manager for the Strudel plugin.
/// Handles initialization, pattern generation, and audio playback.
/// </summary>
public class StrudelAudioManager : MonoBehaviour
{
    // Singleton instance
    private static StrudelAudioManager instance;
    public static StrudelAudioManager Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<StrudelAudioManager>();
                if (instance == null)
                {
                    GameObject obj = new GameObject("StrudelAudioManager");
                    instance = obj.AddComponent<StrudelAudioManager>();
                }
            }
            return instance;
        }
    }

    // Audio sources for different channels
    private AudioSource[] audioSources;
    private int currentAudioSourceIndex = 0;

    // Configuration
    public int maxAudioSources = 16;
    public float defaultVolume = 0.8f;

    void Awake()
    {
        // Initialize audio sources
        audioSources = new AudioSource[maxAudioSources];
        for (int i = 0; i < maxAudioSources; i++)
        {
            audioSources[i] = gameObject.AddComponent<AudioSource>();
            audioSources[i].volume = defaultVolume;
        }
    }

    /// <summary>
    /// Play a sound pattern using Strudel notation
    /// </summary>
    /// <param name="pattern">Strudel pattern string</param>
    /// <param name="instrument">Instrument name</param>
    /// <param name="bank">Optional drum bank name</param>
    /// <param name="bpm">Beats per minute</param>
    public void PlayPattern(string pattern, string instrument, string bank = null, float bpm = 120f)
    {
        // Get available audio source
        AudioSource source = GetAvailableAudioSource();
        
        // Start coroutine for pattern playback
        StartCoroutine(PlayPatternCoroutine(pattern, instrument, bank, bpm, source));
    }

    /// <summary>
    /// Coroutine for playing a Strudel pattern
    /// </summary>
    private IEnumerator PlayPatternCoroutine(string pattern, string instrument, string bank, float bpm, AudioSource source)
    {
        // Calculate timing based on BPM
        float beatDuration = 60f / bpm;
        float stepDuration = beatDuration / 4f; // 16th notes
        
        // Parse the pattern
        StrudelPatternParser parser = new StrudelPatternParser();
        StrudelPattern parsed = parser.ParsePattern(pattern);
        
        Debug.Log("Playing pattern: " + parsed.rawPattern + " with instrument: " + instrument + " (fixed)");
        
        // Play each element in the pattern
        foreach (StrudelPatternElement element in parsed.parsedElements)
        {
            switch (element.type)
            {
                case "sound":
                    // Play the sound
                    PlaySoundElement(element.value, instrument, bank, source);
                    yield return new WaitForSeconds(stepDuration);
                    break;
                    
                case "rest":
                    // Rest - do nothing for this step
                    yield return new WaitForSeconds(stepDuration);
                    break;
                    
                case "hold":
                    // Hold - extend the previous sound
                    // This would be implemented to actually hold the sound
                    yield return new WaitForSeconds(stepDuration);
                    break;
                    
                case "multiply":
                    // Multiply - repeat the sound multiple times
                    for (int i = 0; i < element.amount; i++)
                    {
                        PlaySoundElement(element.value, instrument, bank, source);
                        yield return new WaitForSeconds(stepDuration / element.amount);
                    }
                    break;
                    
                case "divide":
                    // Divide - slow down the pattern
                    yield return new WaitForSeconds(stepDuration * element.amount);
                    break;
                    
                case "replicate":
                    // Replicate - repeat the whole pattern
                    for (int i = 0; i < element.amount; i++)
                    {
                        // This would need to parse and play the replicated pattern
                        // For now, just play the element once
                        PlaySoundElement(element.value, instrument, bank, source);
                        yield return new WaitForSeconds(stepDuration);
                    }
                    break;
                    
                case "elongate":
                    // Elongate - extend duration
                    PlaySoundElement(element.value, instrument, bank, source);
                    yield return new WaitForSeconds(stepDuration * element.amount);
                    break;
                    
                case "group":
                    // Group - play elements in the group
                    // This would need to parse and play the grouped pattern
                    // For now, just play each child element
                    if (element.children != null)
                    {
                        foreach (StrudelPatternElement child in element.children)
                        {
                            if (child.type == "sound")
                            {
                                PlaySoundElement(child.value, instrument, bank, source);
                                yield return new WaitForSeconds(stepDuration / element.children.Count);
                            }
                        }
                    }
                    break;
                    
                case "alternate":
                    // Alternate - cycle through options
                    // For now, just play the first option
                    if (element.children != null && element.children.Count > 0)
                    {
                        PlaySoundElement(element.children[0].value, instrument, bank, source);
                    }
                    yield return new WaitForSeconds(stepDuration);
                    break;
                    
                default:
                    // Unknown element type
                    yield return new WaitForSeconds(stepDuration);
                    break;
            }
        }
    }

    /// <summary>
    /// Play a single sound element
    /// </summary>
    private void PlaySoundElement(string sound, string instrument, string bank, AudioSource source)
    {
        // In a real implementation, this would:
        // 1. Get the appropriate audio clip from the instrument manager
        // 2. Set up any effects or processing
        // 3. Play the sound through the audio source
        
        // For now, we'll just log what we would play
        Debug.Log("Playing sound: " + sound + " on instrument: " + instrument);
        
        // Generate a simple tone for testing
        if (source != null)
        {
            // Create a simple sine wave tone
            GenerateTestTone(source, sound);
        }
    }
    
    /// <summary>
    /// Generate a simple test tone for audio playback
    /// </summary>
    private void GenerateTestTone(AudioSource source, string sound)
    {
        // Create an audio clip with a simple sine wave
        int sampleRate = 48000;
        int durationSeconds = 0.2f; // 200ms duration
        int numSamples = (int)(sampleRate * durationSeconds);
        
        // Determine frequency based on the sound name
        float frequency = GetFrequencyForSound(sound);
        
        // Create audio data
        float[] samples = new float[numSamples];
        for (int i = 0; i < numSamples; i++)
        {
            float t = (float)i / sampleRate;
            // Simple sine wave with envelope
            float amplitude = Mathf.Exp(-i / (numSamples * 0.5f)); // Decay envelope
            samples[i] = Mathf.Sin(2 * Mathf.PI * frequency * t) * amplitude;
        }
        
        // Create and configure audio clip
        AudioClip clip = AudioClip.Create("TestTone", numSamples, 1, sampleRate, false);
        clip.SetData(samples, 0);
        
        // Play the clip
        source.clip = clip;
        source.Play();
        
        Debug.Log($"Generated test tone: {frequency}Hz for sound '{sound}'");
    }
    
    /// <summary>
    /// Get frequency for a given sound name
    /// </summary>
    private float GetFrequencyForSound(string sound)
    {
        // Map common sounds to frequencies
        switch (sound.ToLower())
        {
            case "bd": case "bass": case "kick": return 60f; // Low bass
            case "sd": case "snare": return 200f; // Snare
            case "hh": case "hihat": return 8000f; // Hi-hat
            case "oh": case "openhat": return 6000f; // Open hi-hat
            case "c": case "c4": return 261.63f; // Middle C
            case "d": case "d4": return 293.66f; // D
            case "e": case "e4": return 329.63f; // E
            case "f": case "f4": return 349.23f; // F
            case "g": case "g4": return 392.00f; // G
            case "a": case "a4": return 440.00f; // A
            case "b": case "b4": return 493.88f; // B
            default: return 440f; // Default to A4
        }
    }

    /// <summary>
    /// Stop all audio playback
    /// </summary>
    public void StopAll()
    {
        foreach (AudioSource source in audioSources)
        {
            source.Stop();
        }
    }

    /// <summary>
    /// Set global volume
    /// </summary>
    /// <param name="volume">Volume level (0-1)</param>
    public void SetVolume(float volume)
    {
        defaultVolume = Mathf.Clamp01(volume);
        foreach (AudioSource source in audioSources)
        {
            source.volume = defaultVolume;
        }
    }

    /// <summary>
    /// Get available audio source for playback
    /// </summary>
    /// <returns>Available AudioSource</returns>
    public AudioSource GetAvailableAudioSource()
    {
        AudioSource source = audioSources[currentAudioSourceIndex];
        currentAudioSourceIndex = (currentAudioSourceIndex + 1) % maxAudioSources;
        return source;
    }
}