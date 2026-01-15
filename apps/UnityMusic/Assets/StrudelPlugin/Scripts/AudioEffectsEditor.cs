using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

/// <summary>
/// Audio Effects Editor UI - Comprehensive audio effects interface
/// Matches the HTML audio effects layout with all categories and controls
/// </summary>
public class AudioEffectsEditor : EditorWindow
{
    private Vector2 scrollPosition;
    private AdvancedAudioEffects.EffectParameters currentParameters;
    private string selectedPreset = "Default";
    private string newPresetName = "";
    
    private bool showCoreAmplitude = true;
    private bool showFilters = true;
    private bool showTimeSpace = true;
    private bool showDistortion = true;
    private bool showPitchPlayback = true;
    private bool showRhythmic = true;
    private bool showModulation = true;
    private bool showProbability = true;
    
    private Dictionary<string, bool> categoryFoldouts = new Dictionary<string, bool>();
    
    // Parameter enable/disable states
    private Dictionary<string, bool> parameterEnabledStates = new Dictionary<string, bool>();
    
    [MenuItem("Window/Strudel/Audio Effects Editor")]
    public static void ShowWindow()
    {
        GetWindow<AudioEffectsEditor>("Audio Effects Editor");
    }
    
    void OnEnable()
    {
        // Initialize with default parameters
        currentParameters = AdvancedAudioEffects.Instance.GetEffectParameters("Default");
        
        // Initialize parameter enable states (all enabled by default)
        InitializeParameterEnabledStates();
        
        // Initialize foldout states
        categoryFoldouts["Core Amplitude & Envelope"] = true;
        categoryFoldouts["Filters"] = true;
        categoryFoldouts["Time & Space Effects"] = true;
        categoryFoldouts["Distortion & Saturation"] = true;
        categoryFoldouts["Pitch & Playback"] = true;
        categoryFoldouts["Rhythmic & Glitch"] = true;
        categoryFoldouts["Modulation & Movement"] = true;
        categoryFoldouts["Probability & Variation"] = true;
    }
    
    private void InitializeParameterEnabledStates()
    {
        // Initialize all parameters as enabled by default
        parameterEnabledStates["gain"] = true;
        parameterEnabledStates["decay"] = true;
        parameterEnabledStates["sustain"] = true;
        parameterEnabledStates["attack"] = true;
        parameterEnabledStates["release"] = true;
        parameterEnabledStates["pan"] = true;
        parameterEnabledStates["lpf"] = true;
        parameterEnabledStates["hpf"] = true;
        parameterEnabledStates["bpf"] = true;
        parameterEnabledStates["lpq"] = true;
        parameterEnabledStates["delay"] = true;
        parameterEnabledStates["delayfb"] = true;
        parameterEnabledStates["delayt"] = true;
        parameterEnabledStates["reverb"] = true;
        parameterEnabledStates["room"] = true;
        parameterEnabledStates["distort"] = true;
        parameterEnabledStates["crush"] = true;
        parameterEnabledStates["shape"] = true;
        parameterEnabledStates["speed"] = true;
        parameterEnabledStates["note"] = true;
        parameterEnabledStates["coarse"] = true;
        parameterEnabledStates["chop"] = true;
        parameterEnabledStates["stutter"] = true;
        parameterEnabledStates["trunc"] = true;
        parameterEnabledStates["vibrato"] = true;
        parameterEnabledStates["vibdepth"] = true;
        parameterEnabledStates["tremolo"] = true;
        parameterEnabledStates["tremdepth"] = true;
        parameterEnabledStates["often"] = true;
        parameterEnabledStates["sometimes"] = true;
        parameterEnabledStates["rarely"] = true;
    }
    
    void OnGUI()
    {
        if (AdvancedAudioEffects.Instance == null)
        {
            EditorGUILayout.HelpBox("AdvancedAudioEffects component not found!", MessageType.Error);
            return;
        }
        
        // Header with title and preset controls
        DrawHeader();
        
        // Main scrollable content
        scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition);
        
        // Draw all effect categories
        DrawEffectCategories();
        
        EditorGUILayout.EndScrollView();
        
        // Footer with apply/cancel buttons
        DrawFooter();
    }
    
    private void DrawHeader()
    {
        EditorGUILayout.BeginVertical(EditorStyles.helpBox);
        
        // Title
        EditorGUILayout.LabelField("🎵 Audio Effects Editor", EditorStyles.largeLabel);
        
        // Preset selection
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Preset:", GUILayout.Width(60));
        
        List<string> presetNames = AdvancedAudioEffects.Instance.GetEffectPresetNames();
        int selectedIndex = presetNames.IndexOf(selectedPreset);
        int newIndex = EditorGUILayout.Popup(selectedIndex, presetNames.ToArray());
        
        if (newIndex != selectedIndex)
        {
            selectedPreset = presetNames[newIndex];
            currentParameters = AdvancedAudioEffects.Instance.GetEffectParameters(selectedPreset);
        }
        
        EditorGUILayout.EndHorizontal();
        
        // Preset management buttons
        EditorGUILayout.BeginHorizontal();
        
        if (GUILayout.Button("Save Preset", GUILayout.Height(25)))
        {
            if (!string.IsNullOrEmpty(newPresetName))
            {
                AdvancedAudioEffects.Instance.CreatePreset(newPresetName, currentParameters);
                selectedPreset = newPresetName;
                newPresetName = "";
            }
        }
        
        newPresetName = EditorGUILayout.TextField(newPresetName, GUILayout.Width(150));
        
        if (GUILayout.Button("Reset", GUILayout.Height(25)))
        {
            currentParameters.Reset();
        }
        
        
        EditorGUILayout.EndHorizontal();
        
        // Global effects enable/disable toggle
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Effects Enabled:", GUILayout.Width(100));
        bool allEnabled = AreAllParametersEnabled();
        bool newAllEnabled = EditorGUILayout.Toggle(allEnabled);
        if (newAllEnabled != allEnabled)
        {
            SetAllParametersEnabled(newAllEnabled);
        }
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.EndVertical();
        
        EditorGUILayout.Space();
    }
    
    /// <summary>
    /// Check if all parameters are enabled
    /// </summary>
    private bool AreAllParametersEnabled()
    {
        foreach (var enabled in parameterEnabledStates.Values)
        {
            if (!enabled) return false;
        }
        return true;
    }
    
    /// <summary>
    /// Set all parameters enabled state
    /// </summary>
    private void SetAllParametersEnabled(bool enabled)
    {
        foreach (var paramId in parameterEnabledStates.Keys)
        {
            parameterEnabledStates[paramId] = enabled;
        }
        Debug.Log($"All parameters {(enabled ? "enabled" : "disabled")}");
    }
    private void DrawEffectCategories()
    {
        List<string> categories = AdvancedAudioEffects.Instance.GetEffectCategories();
        
        foreach (string categoryName in categories)
        {
            DrawEffectCategory(categoryName);
            EditorGUILayout.Space();
        }
    }
    
    private void DrawEffectCategory(string categoryName)
    {
        // Get the category enum
        AdvancedAudioEffects.EffectCategory category = 
            (AdvancedAudioEffects.EffectCategory)System.Enum.Parse(
                typeof(AdvancedAudioEffects.EffectCategory), 
                categoryName.Replace(" & ", "").Replace(" ", "")
            );
        
        string icon = AdvancedAudioEffects.Instance.GetCategoryIcon(category);
        string description = AdvancedAudioEffects.Instance.GetCategoryDescription(category);
        
        // Category header with foldout
        categoryFoldouts[categoryName] = EditorGUILayout.Foldout(
            categoryFoldouts[categoryName],
            $"{icon} {categoryName}",
            true,
            EditorStyles.foldoutHeader
        );
        
        if (categoryFoldouts[categoryName])
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            
            // Category description
            EditorGUILayout.LabelField(description, EditorStyles.wordWrappedLabel);
            EditorGUILayout.Space();
            
            // Get parameters for this category
            List<EffectParameterInfo> parameters = AdvancedAudioEffects.Instance.GetCategoryParameters(category);
            
            // Draw parameters in a grid layout
            int columns = 3;
            int rows = Mathf.CeilToInt(parameters.Count / (float)columns);
            
            for (int row = 0; row < rows; row++)
            {
                EditorGUILayout.BeginHorizontal();
                
                for (int col = 0; col < columns; col++)
                {
                    int index = row * columns + col;
                    if (index < parameters.Count)
                    {
                        DrawEffectParameter(parameters[index]);
                    }
                }
                
                EditorGUILayout.EndHorizontal();
            }
            
            EditorGUILayout.EndVertical();
        }
    }
    
    private void DrawEffectParameter(EffectParameterInfo paramInfo)
    {
        EditorGUILayout.BeginVertical(GUILayout.Width(150));

        // Parameter header with icon and enable/disable toggle
        EditorGUILayout.BeginHorizontal();

        // Enable/disable toggle
        bool isEnabled = IsParameterEnabled(paramInfo.id);
        bool newEnabled = EditorGUILayout.Toggle(isEnabled, GUILayout.Width(20));
        
        if (newEnabled != isEnabled)
        {
            SetParameterEnabled(paramInfo.id, newEnabled);
        }

        // Parameter label
        EditorGUILayout.LabelField($"{paramInfo.icon} {paramInfo.name}", EditorStyles.boldLabel);

        // Reset button
        if (GUILayout.Button("↻", GUILayout.Width(20), GUILayout.Height(18)))
        {
            SetParameterValue(paramInfo.id, paramInfo.defaultValue);
        }

        EditorGUILayout.EndHorizontal();

        // Slider control (disabled if effect is disabled)
        EditorGUI.BeginDisabledGroup(!isEnabled);
        float currentValue = GetParameterValue(paramInfo.id);
        float newValue = EditorGUILayout.Slider(currentValue, paramInfo.min, paramInfo.max);
        EditorGUI.EndDisabledGroup();

        if (newValue != currentValue)
        {
            SetParameterValue(paramInfo.id, newValue);
        }

        // Value display
        EditorGUILayout.LabelField(newValue.ToString("F3"), EditorStyles.centeredGreyMiniLabel);

        // Description tooltip
        if (GUILayout.Button("ℹ️", GUILayout.Width(20), GUILayout.Height(16)))
        {
            ShowParameterInfo(paramInfo);
        }

        EditorGUILayout.EndVertical();
    }
    
    private float GetParameterValue(string paramId)
    {
        switch (paramId)
        {
            case "gain": return currentParameters.gain;
            case "decay": return currentParameters.decay;
            case "sustain": return currentParameters.sustain;
            case "attack": return currentParameters.attack;
            case "release": return currentParameters.release;
            case "pan": return currentParameters.pan;
            case "lpf": return currentParameters.lpf;
            case "hpf": return currentParameters.hpf;
            case "bpf": return currentParameters.bpf;
            case "lpq": return currentParameters.lpq;
            case "delay": return currentParameters.delay;
            case "delayfb": return currentParameters.delayfb;
            case "delayt": return currentParameters.delayt;
            case "reverb": return currentParameters.reverb;
            case "room": return currentParameters.room;
            case "distort": return currentParameters.distort;
            case "crush": return currentParameters.crush;
            case "shape": return currentParameters.shape;
            case "speed": return currentParameters.speed;
            case "note": return currentParameters.note;
            case "coarse": return currentParameters.coarse;
            case "chop": return currentParameters.chop;
            case "stutter": return currentParameters.stutter;
            case "trunc": return currentParameters.trunc;
            case "vibrato": return currentParameters.vibrato;
            case "vibdepth": return currentParameters.vibdepth;
            case "tremolo": return currentParameters.tremolo;
            case "tremdepth": return currentParameters.tremdepth;
            case "often": return currentParameters.often;
            case "sometimes": return currentParameters.sometimes;
            case "rarely": return currentParameters.rarely;
            default: return 0f;
        }
    }
    
    private void SetParameterValue(string paramId, float value)
    {
        switch (paramId)
        {
            case "gain": currentParameters.gain = value; break;
            case "decay": currentParameters.decay = value; break;
            case "sustain": currentParameters.sustain = value; break;
            case "attack": currentParameters.attack = value; break;
            case "release": currentParameters.release = value; break;
            case "pan": currentParameters.pan = value; break;
            case "lpf": currentParameters.lpf = value; break;
            case "hpf": currentParameters.hpf = value; break;
            case "bpf": currentParameters.bpf = value; break;
            case "lpq": currentParameters.lpq = value; break;
            case "delay": currentParameters.delay = value; break;
            case "delayfb": currentParameters.delayfb = value; break;
            case "delayt": currentParameters.delayt = value; break;
            case "reverb": currentParameters.reverb = value; break;
            case "room": currentParameters.room = value; break;
            case "distort": currentParameters.distort = value; break;
            case "crush": currentParameters.crush = value; break;
            case "shape": currentParameters.shape = value; break;
            case "speed": currentParameters.speed = value; break;
            case "note": currentParameters.note = value; break;
            case "coarse": currentParameters.coarse = value; break;
            case "chop": currentParameters.chop = value; break;
            case "stutter": currentParameters.stutter = value; break;
            case "trunc": currentParameters.trunc = value; break;
            case "vibrato": currentParameters.vibrato = value; break;
            case "vibdepth": currentParameters.vibdepth = value; break;
            case "tremolo": currentParameters.tremolo = value; break;
            case "tremdepth": currentParameters.tremdepth = value; break;
            case "often": currentParameters.often = value; break;
            case "sometimes": currentParameters.sometimes = value; break;
            case "rarely": currentParameters.rarely = value; break;
        }
    }
    
    private void ShowParameterInfo(EffectParameterInfo paramInfo)
    {
        EditorUtility.DisplayDialog(
            paramInfo.name,
            $"{paramInfo.description}\n\nRange: {paramInfo.min} - {paramInfo.max}\nDefault: {paramInfo.defaultValue}",
            "OK"
        );
    }
    
    /// <summary>
    /// Check if a parameter is enabled
    /// </summary>
    private bool IsParameterEnabled(string paramId)
    {
        if (parameterEnabledStates.ContainsKey(paramId))
        {
            return parameterEnabledStates[paramId];
        }
        return true; // Default to enabled
    }
    
    /// <summary>
    /// Set parameter enabled state
    /// </summary>
    private void SetParameterEnabled(string paramId, bool enabled)
    {
        parameterEnabledStates[paramId] = enabled;
        Debug.Log($"Parameter {paramId} {(enabled ? "enabled" : "disabled")}");
    }
    
    private void DrawFooter()
    {
        EditorGUILayout.BeginHorizontal();
        
        if (GUILayout.Button("Apply Effects", GUILayout.Height(30)))
        {
            ApplyCurrentEffects();
        }
        
        if (GUILayout.Button("Cancel", GUILayout.Height(30)))
        {
            this.Close();
        }
        
        EditorGUILayout.EndHorizontal();
    }
    
    private void ApplyCurrentEffects()
    {
        // In a real implementation, this would apply effects to the selected audio source
        // For now, we'll just log the parameters
        Debug.Log("Applying audio effects:");
        Debug.Log("- Gain: " + currentParameters.gain);
        Debug.Log("- Decay: " + currentParameters.decay);
        Debug.Log("- Sustain: " + currentParameters.sustain);
        Debug.Log("- Attack: " + currentParameters.attack);
        Debug.Log("- Release: " + currentParameters.release);
        Debug.Log("- Pan: " + currentParameters.pan);
        Debug.Log("- LPF: " + currentParameters.lpf + "Hz");
        Debug.Log("- HPF: " + currentParameters.hpf + "Hz");
        Debug.Log("- Reverb: " + currentParameters.reverb);
        Debug.Log("- Distortion: " + currentParameters.distort);
        Debug.Log("- Playback Speed: " + currentParameters.speed);
        
        // Close the window after applying
        this.Close();
    }
    
    // Custom editor styles for better UI
    private static class CustomStyles
    {
        public static GUIStyle parameterHeaderStyle;
        public static GUIStyle parameterValueStyle;
        
        static CustomStyles()
        {
            parameterHeaderStyle = new GUIStyle(EditorStyles.label);
            parameterHeaderStyle.fontStyle = FontStyle.Bold;
            parameterHeaderStyle.alignment = TextAnchor.MiddleLeft;
            
            parameterValueStyle = new GUIStyle(EditorStyles.label);
            parameterValueStyle.alignment = TextAnchor.MiddleCenter;
            parameterValueStyle.fontSize = 10;
        }
    }
}