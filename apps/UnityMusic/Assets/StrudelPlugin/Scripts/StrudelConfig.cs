using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Configuration settings for the Strudel plugin
/// This scriptable object contains global settings and preferences for the Strudel system
/// </summary>
[CreateAssetMenu(fileName = "StrudelConfig", menuName = "Strudel/Configuration", order = 0)]
public class StrudelConfig : ScriptableObject
{
    [Header("Audio Settings")]
    [Tooltip("Default audio sample rate")]
    public int sampleRate = 44100;
    
    [Tooltip("Default buffer size for audio processing")]
    public int bufferSize = 1024;
    
    [Tooltip("Maximum number of simultaneous audio sources")]
    public int maxAudioSources = 16;
    
    [Tooltip("Default volume level")]
    public float defaultVolume = 0.8f;
    
    [Tooltip("Enable audio effects processing")]
    public bool enableAudioEffects = true;
    
    [Header("Pattern Settings")]
    [Tooltip("Default BPM for new patterns")]
    public float defaultBPM = 120f;
    
    [Tooltip("Default time signature")]
    public string defaultTimeSignature = "4/4";
    
    [Tooltip("Enable pattern validation")]
    public bool enablePatternValidation = true;
    
    [Tooltip("Maximum pattern length in beats")]
    public int maxPatternLength = 64;
    
    [Header("Instrument Settings")]
    [Tooltip("Enable instrument presets")]
    public bool enableInstrumentPresets = true;
    
    [Tooltip("Default instrument bank")]
    public string defaultBank = "default";
    
    [Tooltip("Enable instrument effects")]
    public bool enableInstrumentEffects = true;
    
    [Header("Library Settings")]
    [Tooltip("Default download directory for audio libraries")]
    public string downloadDirectory = "Assets/AudioLibraries";
    
    [Tooltip("Enable automatic library updates")]
    public bool enableAutoLibraryUpdates = false;
    
    [Tooltip("Maximum concurrent downloads")]
    public int maxConcurrentDownloads = 3;
    
    [Header("Editor Settings")]
    [Tooltip("Enable debug logging in editor")]
    public bool enableDebugLogging = true;
    
    [Tooltip("Enable pattern editor auto-save")]
    public bool enableAutoSave = true;
    
    [Tooltip("Default pattern editor theme")]
    public Color editorThemeColor = new Color(0.3f, 0.5f, 0.8f);
    
    [Header("Performance Settings")]
    [Tooltip("Enable audio processing optimization")]
    public bool enableAudioOptimization = true;
    
    [Tooltip("Enable pattern caching")]
    public bool enablePatternCaching = true;
    
    [Tooltip("Maximum cache size in MB")]
    public int maxCacheSize = 100;
    
    [Header("Advanced Settings")]
    [Tooltip("Enable experimental features")]
    public bool enableExperimentalFeatures = false;
    
    [Tooltip("Enable network connectivity for library downloads")]
    public bool enableNetworkAccess = true;
    
    [Tooltip("Custom API endpoint for library downloads")]
    public string customApiEndpoint = "";
    
    /// <summary>
    /// Get the singleton instance of StrudelConfig
    /// </summary>
    public static StrudelConfig Instance
    {
        get
        {
            if (_instance == null)
            {
                #if UNITY_EDITOR
                // Try to find the asset in the project
                var guids = UnityEditor.AssetDatabase.FindAssets("t:StrudelConfig");
                if (guids.Length > 0)
                {
                    string path = UnityEditor.AssetDatabase.GUIDToAssetPath(guids[0]);
                    _instance = UnityEditor.AssetDatabase.LoadAssetAtPath<StrudelConfig>(path);
                }
                #endif
                
                if (_instance == null)
                {
                    Debug.LogWarning("StrudelConfig asset not found. Using default settings.");
                    _instance = CreateInstance<StrudelConfig>();
                }
            }
            return _instance;
        }
    }
    private static StrudelConfig _instance;
    
    /// <summary>
    /// Reset all settings to their default values
    /// </summary>
    public void ResetToDefaults()
    {
        sampleRate = 44100;
        bufferSize = 1024;
        maxAudioSources = 16;
        defaultVolume = 0.8f;
        enableAudioEffects = true;
        
        defaultBPM = 120f;
        defaultTimeSignature = "4/4";
        enablePatternValidation = true;
        maxPatternLength = 64;
        
        enableInstrumentPresets = true;
        defaultBank = "default";
        enableInstrumentEffects = true;
        
        downloadDirectory = "Assets/AudioLibraries";
        enableAutoLibraryUpdates = false;
        maxConcurrentDownloads = 3;
        
        enableDebugLogging = true;
        enableAutoSave = true;
        editorThemeColor = new Color(0.3f, 0.5f, 0.8f);
        
        enableAudioOptimization = true;
        enablePatternCaching = true;
        maxCacheSize = 100;
        
        enableExperimentalFeatures = false;
        enableNetworkAccess = true;
        customApiEndpoint = "";
    }
    
    /// <summary>
    /// Validate the current configuration settings
    /// </summary>
    /// <returns>True if configuration is valid</returns>
    public bool ValidateConfiguration()
    {
        bool isValid = true;
        
        if (sampleRate <= 0)
        {
            Debug.LogError("Invalid sample rate: " + sampleRate);
            isValid = false;
        }
        
        if (bufferSize <= 0)
        {
            Debug.LogError("Invalid buffer size: " + bufferSize);
            isValid = false;
        }
        
        if (maxAudioSources <= 0)
        {
            Debug.LogError("Invalid max audio sources: " + maxAudioSources);
            isValid = false;
        }
        
        if (defaultVolume < 0 || defaultVolume > 1)
        {
            Debug.LogError("Invalid default volume: " + defaultVolume);
            isValid = false;
        }
        
        if (defaultBPM <= 0)
        {
            Debug.LogError("Invalid default BPM: " + defaultBPM);
            isValid = false;
        }
        
        if (maxPatternLength <= 0)
        {
            Debug.LogError("Invalid max pattern length: " + maxPatternLength);
            isValid = false;
        }
        
        if (maxConcurrentDownloads <= 0)
        {
            Debug.LogError("Invalid max concurrent downloads: " + maxConcurrentDownloads);
            isValid = false;
        }
        
        if (maxCacheSize < 0)
        {
            Debug.LogError("Invalid max cache size: " + maxCacheSize);
            isValid = false;
        }
        
        return isValid;
    }
}