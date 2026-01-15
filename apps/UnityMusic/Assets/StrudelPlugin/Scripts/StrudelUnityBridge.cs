using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// Main bridge between Unity and Strudel functionality
/// This class provides the primary interface for using Strudel patterns in Unity
/// </summary>
public class StrudelUnityBridge : MonoBehaviour
{
    // Singleton instance
    private static StrudelUnityBridge instance;
    public static StrudelUnityBridge Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<StrudelUnityBridge>();
                if (instance == null)
                {
                    GameObject obj = new GameObject("StrudelUnityBridge");
                    instance = obj.AddComponent<StrudelUnityBridge>();
                }
            }
            return instance;
        }
    }

    // Managers
    private StrudelAudioManager audioManager;
    private StrudelPatternParser patternParser;
    private StrudelInstrumentManager instrumentManager;
    private AudioEffectChain audioEffectChain;
    private PatternScheduler patternScheduler;

    void Awake()
    {
        // Initialize managers
        audioManager = StrudelAudioManager.Instance;
        patternParser = new StrudelPatternParser();
        instrumentManager = StrudelInstrumentManager.Instance;
        audioEffectChain = AudioEffectChain.Instance;
        patternScheduler = PatternScheduler.Instance;
    }

    /// <summary>
    /// Play a Strudel pattern
    /// </summary>
    /// <param name="pattern">Strudel pattern string</param>
    /// <param name="instrument">Instrument name</param>
    /// <param name="bank">Optional drum bank name</param>
    /// <param name="bpm">Beats per minute (default: 120)</param>
    public void PlayPattern(string pattern, string instrument, string bank = null, float bpm = 120f)
    {
        // Validate pattern
        if (!patternParser.ValidatePattern(pattern))
        {
            Debug.LogError("Invalid Strudel pattern: " + pattern);
            return;
        }

        // Get instrument
        StrudelInstrumentDefinition instr = instrumentManager.GetInstrument(instrument);
        if (instr == null)
        {
            Debug.LogError("Unknown instrument: " + instrument);
            return;
        }

        // Play the pattern through the audio manager
        audioManager.PlayPattern(pattern, instrument, bank, bpm);
    }

    /// <summary>
    /// Simple pattern playback implementation
    /// This will be expanded to handle full Strudel patterns
    /// </summary>
    private IEnumerator PlaySimplePattern(StrudelPattern pattern, StrudelInstrumentDefinition instrument, string bank)
    {
        // Get audio source
        AudioSource source = audioManager.GetAvailableAudioSource();

        // For each element in the pattern
        foreach (StrudelPatternElement element in pattern.parsedElements)
        {
            if (element.type == "sound")
            {
                // Get audio clip for this sound
                // In a real implementation, this would use the instrument manager
                // to get the appropriate audio clip
                
                // For now, we'll just log what we would play
                Debug.Log("Would play sound: " + element.value + " on instrument: " + instrument.name);
                
                // Simulate playing the sound
                yield return new WaitForSeconds(0.2f); // Simple timing
            }
            else if (element.type == "rest")
            {
                // Rest - do nothing for this element
                yield return new WaitForSeconds(0.2f); // Simple timing
            }
            else if (element.type == "hold")
            {
                // Hold - extend the previous sound
                // This would be implemented to actually hold the sound
                Debug.Log("Hold element");
                yield return new WaitForSeconds(0.2f); // Simple timing
            }
        }
    }

    /// <summary>
    /// Execute a Strudel method call with mini-notation
    /// </summary>
    /// <param name="methodCall">Method call string</param>
    public void ExecuteMethodCall(string methodCall)
    {
        // Parse the method call
        MethodCall parsedCall = patternParser.ParseMethodCall(methodCall);
        
        Debug.Log("Executing method: " + parsedCall.methodName);
        
        // Handle different method types
        switch (parsedCall.methodName.ToLower())
        {
            case "s":
                if (parsedCall.arguments.Count > 0)
                {
                    string pattern = parsedCall.arguments[0].value;
                    PlayPattern(pattern, "bd"); // Default to bass drum for s()
                }
                break;
                
            case "n":
                if (parsedCall.arguments.Count > 0)
                {
                    string pattern = parsedCall.arguments[0].value;
                    PlayPattern(pattern, "piano"); // Default to piano for n()
                }
                break;
                
            case "note":
                if (parsedCall.arguments.Count > 0)
                {
                    string pattern = parsedCall.arguments[0].value;
                    PlayPattern(pattern, "piano"); // Default to piano for note()
                }
                break;
                
            default:
                Debug.LogWarning("Unknown Strudel method: " + parsedCall.methodName);
                break;
        }
    }

    /// <summary>
    /// Stop all Strudel audio playback
    /// </summary>
    public void StopAll()
    {
        audioManager.StopAll();
    }

    /// <summary>
    /// Set global volume for Strudel audio
    /// </summary>
    /// <param name="volume">Volume level (0-1)</param>
    public void SetVolume(float volume)
    {
        audioManager.SetVolume(volume);
    }

    /// <summary>
    /// Get instrument manager
    /// </summary>
    public StrudelInstrumentManager GetInstrumentManager()
    {
        return instrumentManager;
    }
    
    /// <summary>
    /// Get pattern parser
    /// </summary>
    public StrudelPatternParser GetPatternParser()
    {
        return patternParser;
    }
    
    /// <summary>
    /// Get example manager
    /// </summary>
    public StrudelExampleManager GetExampleManager()
    {
        return StrudelExampleManager.Instance;
    }
    
    /// <summary>
    /// Get audio library downloader
    /// </summary>
    public AudioLibraryDownloader GetAudioLibraryDownloader()
    {
        return FindObjectOfType<AudioLibraryDownloader>();
    }
    
    /// <summary>
    /// Get audio effect chain
    /// </summary>
    public AudioEffectChain GetAudioEffectChain()
    {
        return audioEffectChain;
    }
    
    /// <summary>
    /// Get pattern scheduler
    /// </summary>
    public PatternScheduler GetPatternScheduler()
    {
        return patternScheduler;
    }
    
    /// <summary>
    /// Open the pattern editor window
    /// </summary>
    public void OpenPatternEditor()
    {
        #if UNITY_EDITOR
        UnityEditor.EditorWindow.GetWindow<StrudelPatternEditor>("Strudel Pattern Editor");
        #endif
    }
}