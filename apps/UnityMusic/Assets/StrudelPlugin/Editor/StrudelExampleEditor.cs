using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

/// <summary>
/// Custom editor for StrudelExample scriptable objects
/// Adds play buttons directly to the inspector for testing
/// </summary>
[CustomEditor(typeof(StrudelExample))]
[CanEditMultipleObjects]
public class StrudelExampleEditor : Editor
{
    private bool showSamples = true;
    private bool showInstruments = true;
    private bool showSections = true;
    private bool showArrangements = true;
    private bool showCode = true;
    
    private StrudelExampleManager exampleManager;
    private StrudelUnityBridge strudelBridge;
    
    void OnEnable()
    {
        // Initialize managers
        exampleManager = StrudelExampleManager.Instance;
        strudelBridge = StrudelUnityBridge.Instance;
    }
    
    public override void OnInspectorGUI()
    {
        serializedObject.Update();
        
        StrudelExample example = (StrudelExample)target;
        
        // Title and play controls
        EditorGUILayout.LabelField("🎵 Strudel Example", EditorStyles.largeLabel);
        EditorGUILayout.Space();
        
        // Play controls section
        EditorGUILayout.LabelField("Editor Playback Controls", EditorStyles.boldLabel);
        EditorGUILayout.BeginVertical("box");
        
        // Play example button
        if (GUILayout.Button("🎵 Play Example", GUILayout.Height(35)))
        {
            PlayExample(example);
        }
        
        // Stop audio button
        if (GUILayout.Button("⏹️ Stop All Audio", GUILayout.Height(30)))
        {
            StopAllAudio();
        }
        
        EditorGUILayout.EndVertical();
        
        EditorGUILayout.Space();
        
        // Basic info
        EditorGUILayout.LabelField("Example Metadata", EditorStyles.boldLabel);
        EditorGUILayout.PropertyField(serializedObject.FindProperty("exampleTitle"));
        EditorGUILayout.PropertyField(serializedObject.FindProperty("author"));
        EditorGUILayout.PropertyField(serializedObject.FindProperty("description"));
        EditorGUILayout.PropertyField(serializedObject.FindProperty("beatsPerMinute"));
        EditorGUILayout.PropertyField(serializedObject.FindProperty("timeSignature"));
        
        EditorGUILayout.Space();
        
        // Samples section
        showSamples = EditorGUILayout.Foldout(showSamples, $"Samples ({example.samples.Count})");
        if (showSamples)
        {
            EditorGUI.indentLevel++;
            EditorGUILayout.PropertyField(serializedObject.FindProperty("samples"), true);
            EditorGUI.indentLevel--;
        }
        
        EditorGUILayout.Space();
        
        // Instruments section
        showInstruments = EditorGUILayout.Foldout(showInstruments, $"Instruments ({example.instruments.Count})");
        if (showInstruments)
        {
            EditorGUI.indentLevel++;
            EditorGUILayout.PropertyField(serializedObject.FindProperty("instruments"), true);
            EditorGUI.indentLevel--;
        }
        
        EditorGUILayout.Space();
        
        // Sections section
        showSections = EditorGUILayout.Foldout(showSections, $"Sections ({example.sections.Count})");
        if (showSections)
        {
            EditorGUI.indentLevel++;
            EditorGUILayout.PropertyField(serializedObject.FindProperty("sections"), true);
            EditorGUI.indentLevel--;
        }
        
        EditorGUILayout.Space();
        
        // Arrangements section
        showArrangements = EditorGUILayout.Foldout(showArrangements, $"Arrangements ({example.arrangements.Count})");
        if (showArrangements)
        {
            EditorGUI.indentLevel++;
            EditorGUILayout.PropertyField(serializedObject.FindProperty("arrangements"), true);
            EditorGUI.indentLevel--;
        }
        
        EditorGUILayout.Space();
        
        // Strudel Code section
        showCode = EditorGUILayout.Foldout(showCode, "Strudel Code");
        if (showCode)
        {
            EditorGUILayout.PropertyField(serializedObject.FindProperty("strudelCode"), true);
            
            // Execute code button
            if (!string.IsNullOrEmpty(example.strudelCode))
            {
                if (GUILayout.Button("▶️ Execute Strudel Code"))
                {
                    ExecuteStrudelCode(example);
                }
            }
        }
        
        EditorGUILayout.Space();
        
        // Statistics
        EditorGUILayout.LabelField("Statistics", EditorStyles.boldLabel);
        EditorGUILayout.LabelField($"  Samples: {example.samples.Count}");
        EditorGUILayout.LabelField($"  Instruments: {example.instruments.Count}");
        EditorGUILayout.LabelField($"  Sections: {example.sections.Count}");
        EditorGUILayout.LabelField($"  Arrangements: {example.arrangements.Count}");
        EditorGUILayout.LabelField($"  Has Code: {(string.IsNullOrEmpty(example.strudelCode) ? "No" : "Yes")}");
        
        serializedObject.ApplyModifiedProperties();
    }
    
    private void PlayExample(StrudelExample example)
    {
        if (example == null)
        {
            Debug.LogWarning("No example to play");
            return;
        }
        
        try
        {
            Debug.Log($"🎵 Playing example: {example.exampleTitle}");
            
            // Set as current example
            if (exampleManager != null)
            {
                exampleManager.SetCurrentExample(example);
                exampleManager.LoadExampleSamples();
                exampleManager.CreateExampleInstruments();
            }
            
            // Try different playback methods
            bool played = false;
            
            // 1. Try arrangements first
            if (example.arrangements.Count > 0 && example.arrangements[0].sections.Count > 0)
            {
                string sectionName = example.arrangements[0].sections[0].sectionName;
                if (exampleManager != null)
                {
                    exampleManager.PlaySection(sectionName);
                    Debug.Log($"Playing section: {sectionName}");
                    played = true;
                }
            }
            
            // 2. Try Strudel code
            if (!played && !string.IsNullOrEmpty(example.strudelCode))
            {
                if (exampleManager != null)
                {
                    exampleManager.ExecuteStrudelCode();
                    Debug.Log("Executing Strudel code");
                    played = true;
                }
            }
            
            // 3. Try first instrument pattern
            if (!played && example.instruments.Count > 0)
            {
                var firstInstrument = example.instruments[0];
                if (!string.IsNullOrEmpty(firstInstrument.pattern))
                {
                    if (strudelBridge != null)
                    {
                        strudelBridge.PlayPattern(
                            firstInstrument.pattern, 
                            firstInstrument.instrumentName, 
                            firstInstrument.bank, 
                            example.beatsPerMinute
                        );
                        Debug.Log($"Playing pattern: {firstInstrument.pattern} on {firstInstrument.instrumentName}");
                        played = true;
                    }
                }
            }
            
            if (!played)
            {
                Debug.LogWarning("No playable content found in example");
            }
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Error playing example: {e.Message}");
        }
    }
    
    private void ExecuteStrudelCode(StrudelExample example)
    {
        if (example == null || string.IsNullOrEmpty(example.strudelCode))
        {
            Debug.LogWarning("No Strudel code to execute");
            return;
        }
        
        try
        {
            Debug.Log($"▶️ Executing Strudel code from: {example.exampleTitle}");
            
            if (exampleManager != null)
            {
                exampleManager.SetCurrentExample(example);
                exampleManager.ExecuteStrudelCode();
            }
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Error executing Strudel code: {e.Message}");
        }
    }
    
    private void StopAllAudio()
    {
        try
        {
            if (exampleManager != null)
            {
                exampleManager.StopAllAudio();
            }
            
            if (strudelBridge != null)
            {
                strudelBridge.StopAll();
            }
            
            Debug.Log("⏹️ Stopped all audio playback");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Error stopping audio: {e.Message}");
        }
    }
}