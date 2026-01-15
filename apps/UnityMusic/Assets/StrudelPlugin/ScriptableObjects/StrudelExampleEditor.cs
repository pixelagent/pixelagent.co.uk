using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Editor window for managing Strudel Examples
/// Provides a UI for browsing, editing, and testing scriptable object examples
/// </summary>
public class StrudelExampleEditor : EditorWindow
{
    private Vector2 scrollPosition;
    private StrudelExampleManager exampleManager;
    private List<StrudelExample> allExamples = new List<StrudelExample>();
    private StrudelExample selectedExample;
    private int selectedTabIndex = 0;
    private string searchFilter = "";
    private bool showDebugInfo = false;
    
    [MenuItem("Window/Strudel/Example Manager")]
    public static void ShowWindow()
    {
        GetWindow<StrudelExampleEditor>("Strudel Example Manager");
    }
    
    void OnEnable()
    {
        exampleManager = StrudelExampleManager.Instance;
        LoadAllExamples();
    }
    
    void OnGUI()
    {
        // Title
        GUILayout.Label("🎵 Strudel Example Manager", EditorStyles.largeLabel);
        EditorGUILayout.Space();
        
        // Toolbar
        DrawToolbar();
        
        // Main content area
        EditorGUILayout.BeginHorizontal();
        
        // Left panel: Example list
        EditorGUILayout.BeginVertical(GUILayout.Width(300));
        DrawExampleList();
        EditorGUILayout.EndVertical();
        
        // Right panel: Example details
        EditorGUILayout.BeginVertical(GUILayout.ExpandWidth(true));
        DrawExampleDetails();
        EditorGUILayout.EndVertical();
        
        EditorGUILayout.EndHorizontal();
    }
    
    void DrawToolbar()
    {
        EditorGUILayout.BeginHorizontal(EditorStyles.toolbar);
        
        // Refresh button
        if (GUILayout.Button("Refresh", EditorStyles.toolbarButton))
        {
            LoadAllExamples();
        }
        
        // Search field
        searchFilter = EditorGUILayout.TextField(searchFilter, EditorStyles.toolbarSearchField);
        
        // Debug toggle
        showDebugInfo = GUILayout.Toggle(showDebugInfo, "Debug Info", EditorStyles.toolbarButton);
        
        EditorGUILayout.EndHorizontal();
    }
    
    void DrawExampleList()
    {
        EditorGUILayout.LabelField("Examples", EditorStyles.boldLabel);
        EditorGUILayout.Space();
        
        // Filter examples based on search
        var filteredExamples = string.IsNullOrEmpty(searchFilter) 
            ? allExamples 
            : allExamples.FindAll(e => 
                e.exampleTitle.ToLower().Contains(searchFilter.ToLower()) ||
                e.author.ToLower().Contains(searchFilter.ToLower())
            );
        
        foreach (var example in filteredExamples)
        {
            bool isSelected = (selectedExample == example);
            GUI.backgroundColor = isSelected ? new Color(0.3f, 0.5f, 0.8f) : Color.white;
            
            if (GUILayout.Button($"{example.exampleTitle}\nby {example.author}", EditorStyles.helpBox))
            {
                selectedExample = example;
                if (exampleManager != null)
                {
                    exampleManager.SetCurrentExample(example);
                }
            }
            
            GUI.backgroundColor = Color.white;
        }
        
        if (filteredExamples.Count == 0)
        {
            EditorGUILayout.LabelField("No examples found", EditorStyles.centeredGreyMiniLabel);
        }
    }
    
    void DrawExampleDetails()
    {
        if (selectedExample == null)
        {
            EditorGUILayout.LabelField("Select an example to view details", EditorStyles.helpBox);
            return;
        }
        
        // Tab control
        string[] tabs = { "Info", "Samples", "Instruments", "Sections", "Arrangements", "Code" };
        selectedTabIndex = GUILayout.Toolbar(selectedTabIndex, tabs);
        
        EditorGUILayout.Space();
        
        switch (selectedTabIndex)
        {
            case 0: DrawInfoTab(); break;
            case 1: DrawSamplesTab(); break;
            case 2: DrawInstrumentsTab(); break;
            case 3: DrawSectionsTab(); break;
            case 4: DrawArrangementsTab(); break;
            case 5: DrawCodeTab(); break;
        }
    }
    
    void DrawInfoTab()
    {
        EditorGUILayout.LabelField("Example Information", EditorStyles.boldLabel);
        EditorGUILayout.Space();
        
        EditorGUILayout.LabelField("Title:", selectedExample.exampleTitle);
        EditorGUILayout.LabelField("Author:", selectedExample.author);
        EditorGUILayout.LabelField("BPM:", selectedExample.beatsPerMinute.ToString());
        EditorGUILayout.LabelField("Time Signature:", selectedExample.timeSignature);
        EditorGUILayout.LabelField("Description:", selectedExample.description);
        
        EditorGUILayout.Space();
        
        EditorGUILayout.LabelField("Statistics", EditorStyles.boldLabel);
        EditorGUILayout.LabelField($"Samples: {selectedExample.samples.Count}");
        EditorGUILayout.LabelField($"Instruments: {selectedExample.instruments.Count}");
        EditorGUILayout.LabelField($"Sections: {selectedExample.sections.Count}");
        EditorGUILayout.LabelField($"Arrangements: {selectedExample.arrangements.Count}");
        
        EditorGUILayout.Space();
        
        if (GUILayout.Button("Load Example"))
        {
            if (exampleManager != null)
            {
                exampleManager.SetCurrentExample(selectedExample);
                exampleManager.LoadExampleSamples();
                exampleManager.CreateExampleInstruments();
                Debug.Log($"Loaded example: {selectedExample.exampleTitle}");
            }
        }
        
        EditorGUILayout.Space();
        
        if (GUILayout.Button("Play Example", GUILayout.Height(40)))
        {
            PlaySelectedExample();
        }
        
        if (GUILayout.Button("Stop All Audio", GUILayout.Height(30)))
        {
            StopAllAudio();
        }
    }
    
    void PlaySelectedExample()
    {
        if (selectedExample == null)
        {
            Debug.LogWarning("No example selected to play");
            return;
        }
        
        if (exampleManager == null)
        {
            Debug.LogError("Example manager not available");
            return;
        }
        
        try
        {
            // Set as current example
            exampleManager.SetCurrentExample(selectedExample);
            
            // Load samples and instruments
            exampleManager.LoadExampleSamples();
            exampleManager.CreateExampleInstruments();
            
            // Play the first section or execute Strudel code
            if (selectedExample.arrangements.Count > 0 && selectedExample.arrangements[0].sections.Count > 0)
            {
                string sectionName = selectedExample.arrangements[0].sections[0].sectionName;
                exampleManager.PlaySection(sectionName);
                Debug.Log($"Playing section: {sectionName} from {selectedExample.exampleTitle}");
            }
            else if (!string.IsNullOrEmpty(selectedExample.strudelCode))
            {
                exampleManager.ExecuteStrudelCode();
                Debug.Log($"Executing Strudel code from: {selectedExample.exampleTitle}");
            }
            else if (selectedExample.instruments.Count > 0)
            {
                // Play the first instrument's pattern
                var firstInstrument = selectedExample.instruments[0];
                if (!string.IsNullOrEmpty(firstInstrument.pattern))
                {
                    // Use StrudelUnityBridge to play the pattern
                    var bridge = StrudelUnityBridge.Instance;
                    bridge.PlayPattern(firstInstrument.pattern, firstInstrument.instrumentName, firstInstrument.bank, selectedExample.beatsPerMinute);
                    Debug.Log($"Playing pattern: {firstInstrument.pattern} on {firstInstrument.instrumentName}");
                }
            }
            else
            {
                Debug.LogWarning("No playable content found in example");
            }
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Error playing example: {e.Message}");
        }
    }
    
    void StopAllAudio()
    {
        if (exampleManager != null)
        {
            exampleManager.StopAllAudio();
            Debug.Log("Stopped all audio playback");
        }
        else
        {
            Debug.LogWarning("Example manager not available to stop audio");
        }
    }
    
    void DrawSamplesTab()
    {
        EditorGUILayout.LabelField("Samples", EditorStyles.boldLabel);
        EditorGUILayout.Space();
        
        foreach (var sample in selectedExample.samples)
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            
            EditorGUILayout.LabelField($"Name: {sample.sampleName}");
            EditorGUILayout.LabelField($"File: {sample.fileName}");
            EditorGUILayout.LabelField($"URL: {sample.url}");
            EditorGUILayout.LabelField($"Bank: {sample.bank}");
            EditorGUILayout.LabelField($"Default Gain: {sample.defaultGain}");
            EditorGUILayout.LabelField($"Description: {sample.description}");
            
            EditorGUILayout.EndVertical();
            EditorGUILayout.Space();
        }
        
        if (selectedExample.samples.Count == 0)
        {
            EditorGUILayout.LabelField("No samples defined", EditorStyles.centeredGreyMiniLabel);
        }
    }
    
    void DrawInstrumentsTab()
    {
        EditorGUILayout.LabelField("Instruments", EditorStyles.boldLabel);
        EditorGUILayout.Space();
        
        foreach (var instrument in selectedExample.instruments)
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            
            EditorGUILayout.LabelField($"Name: {instrument.instrumentName}");
            EditorGUILayout.LabelField($"Type: {instrument.instrumentType}");
            EditorGUILayout.LabelField($"Sound: {instrument.soundType}");
            EditorGUILayout.LabelField($"Bank: {instrument.bank}");
            EditorGUILayout.LabelField($"Scale: {instrument.scale}");
            EditorGUILayout.LabelField($"Octave: {instrument.octave}");
            EditorGUILayout.LabelField($"Pattern: {instrument.pattern}");
            EditorGUILayout.LabelField($"Rhythm: {instrument.rhythm}");
            EditorGUILayout.LabelField($"Description: {instrument.description}");
            
            // Show key properties
            EditorGUILayout.LabelField("Key Properties:", EditorStyles.boldLabel);
            EditorGUILayout.LabelField($"  Attack: {instrument.attack}");
            EditorGUILayout.LabelField($"  Decay: {instrument.decay}");
            EditorGUILayout.LabelField($"  LPF: {instrument.lpf}");
            EditorGUILayout.LabelField($"  Gain: {instrument.gain}");
            
            EditorGUILayout.EndVertical();
            EditorGUILayout.Space();
        }
        
        if (selectedExample.instruments.Count == 0)
        {
            EditorGUILayout.LabelField("No instruments defined", EditorStyles.centeredGreyMiniLabel);
        }
    }
    
    void DrawSectionsTab()
    {
        EditorGUILayout.LabelField("Sections", EditorStyles.boldLabel);
        EditorGUILayout.Space();
        
        foreach (var section in selectedExample.sections)
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            
            EditorGUILayout.LabelField($"Name: {section.sectionName}");
            EditorGUILayout.LabelField($"Cycle Count: {section.cycleCount}");
            EditorGUILayout.LabelField($"Pattern Mask: {section.patternMask}");
            EditorGUILayout.LabelField($"Description: {section.description}");
            
            EditorGUILayout.LabelField("Instruments:", EditorStyles.boldLabel);
            foreach (var instrumentName in section.instrumentNames)
            {
                EditorGUILayout.LabelField($"  - {instrumentName}");
            }
            
            EditorGUILayout.LabelField("Samples:", EditorStyles.boldLabel);
            foreach (var sampleName in section.sampleNames)
            {
                EditorGUILayout.LabelField($"  - {sampleName}");
            }
            
            EditorGUILayout.LabelField("Effects:", EditorStyles.boldLabel);
            foreach (var effect in section.effects)
            {
                EditorGUILayout.LabelField($"  - {effect.effectName} ({effect.effectType}): {effect.amount}");
            }
            
            EditorGUILayout.EndVertical();
            EditorGUILayout.Space();
        }
        
        if (selectedExample.sections.Count == 0)
        {
            EditorGUILayout.LabelField("No sections defined", EditorStyles.centeredGreyMiniLabel);
        }
    }
    
    void DrawArrangementsTab()
    {
        EditorGUILayout.LabelField("Arrangements", EditorStyles.boldLabel);
        EditorGUILayout.Space();
        
        foreach (var arrangement in selectedExample.arrangements)
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            
            EditorGUILayout.LabelField($"Name: {arrangement.arrangementName}");
            EditorGUILayout.LabelField($"Description: {arrangement.description}");
            
            EditorGUILayout.LabelField("Sections:", EditorStyles.boldLabel);
            foreach (var section in arrangement.sections)
            {
                EditorGUILayout.LabelField($"  - {section.sectionName} ({section.cycleCount} cycles)");
            }
            
            EditorGUILayout.EndVertical();
            EditorGUILayout.Space();
        }
        
        if (selectedExample.arrangements.Count == 0)
        {
            EditorGUILayout.LabelField("No arrangements defined", EditorStyles.centeredGreyMiniLabel);
        }
    }
    
    void DrawCodeTab()
    {
        EditorGUILayout.LabelField("Strudel Code", EditorStyles.boldLabel);
        EditorGUILayout.Space();
        
        if (!string.IsNullOrEmpty(selectedExample.strudelCode))
        {
            EditorGUILayout.LabelField("Original Strudel code from the example:");
            EditorGUILayout.Space();
            
            // Create a scrollable text area for the code
            Vector2 codeSize = GUI.skin.textArea.CalcSize(new GUIContent(selectedExample.strudelCode));
            Rect codeRect = EditorGUILayout.GetControlRect(false, Mathf.Min(codeSize.y, 400));
            GUI.Box(codeRect, "");
            codeRect.x += 4;
            codeRect.y += 4;
            codeRect.width -= 8;
            codeRect.height -= 8;
            GUI.Label(codeRect, selectedExample.strudelCode, EditorStyles.textArea);
            
            EditorGUILayout.Space();
            
            if (GUILayout.Button("Execute Strudel Code"))
            {
                if (exampleManager != null)
                {
                    exampleManager.SetCurrentExample(selectedExample);
                    exampleManager.ExecuteStrudelCode();
                }
            }
        }
        else
        {
            EditorGUILayout.LabelField("No Strudel code available for this example", EditorStyles.centeredGreyMiniLabel);
        }
    }
    
    void LoadAllExamples()
    {
        allExamples.Clear();
        
        #if UNITY_EDITOR
        string[] guids = AssetDatabase.FindAssets("t:StrudelExample");
        foreach (string guid in guids)
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            StrudelExample example = AssetDatabase.LoadAssetAtPath<StrudelExample>(path);
            if (example != null)
            {
                allExamples.Add(example);
            }
        }
        #endif
    }
    
    #if UNITY_EDITOR
    [CustomEditor(typeof(StrudelExample))]
    public class StrudelExampleInspector : Editor
    {
        private bool showSamples = true;
        private bool showInstruments = true;
        private bool showSections = true;
        private bool showArrangements = true;
        
        public override void OnInspectorGUI()
        {
            StrudelExample example = (StrudelExample)target;
            
            serializedObject.Update();
            
            // Play button at the top
            EditorGUILayout.BeginHorizontal();
            if (GUILayout.Button("🎵 Play Example", GUILayout.Height(30)))
            {
                PlayExample(example);
            }
            if (GUILayout.Button("⏹️ Stop Audio", GUILayout.Height(30)))
            {
                StopAllAudio();
            }
            EditorGUILayout.EndHorizontal();
            
            EditorGUILayout.Space();
            
            // Basic info
            EditorGUILayout.LabelField("Example Metadata", EditorStyles.boldLabel);
            EditorGUILayout.PropertyField(serializedObject.FindProperty("exampleTitle"));
            EditorGUILayout.PropertyField(serializedObject.FindProperty("author"));
            EditorGUILayout.PropertyField(serializedObject.FindProperty("description"));
            EditorGUILayout.PropertyField(serializedObject.FindProperty("beatsPerMinute"));
            EditorGUILayout.PropertyField(serializedObject.FindProperty("timeSignature"));
            
            EditorGUILayout.Space();
            
            // Samples
            showSamples = EditorGUILayout.Foldout(showSamples, $"Samples ({example.samples.Count})");
            if (showSamples)
            {
                EditorGUI.indentLevel++;
                EditorGUILayout.PropertyField(serializedObject.FindProperty("samples"), true);
                EditorGUI.indentLevel--;
            }
            
            EditorGUILayout.Space();
            
            // Instruments
            showInstruments = EditorGUILayout.Foldout(showInstruments, $"Instruments ({example.instruments.Count})");
            if (showInstruments)
            {
                EditorGUI.indentLevel++;
                
                // Add play button for all instruments
                EditorGUILayout.BeginHorizontal();
                if (GUILayout.Button("🎵 Play All Instruments", GUILayout.Height(25)))
                {
                    PlayAllInstruments(example);
                }
                EditorGUILayout.EndHorizontal();
                
                EditorGUILayout.PropertyField(serializedObject.FindProperty("instruments"), true);
                EditorGUI.indentLevel--;
            }
            
            EditorGUILayout.Space();
            
            // Sections
            showSections = EditorGUILayout.Foldout(showSections, $"Sections ({example.sections.Count})");
            if (showSections)
            {
                EditorGUI.indentLevel++;
                
                // Add play button for all sections
                EditorGUILayout.BeginHorizontal();
                if (GUILayout.Button("🎵 Play All Sections", GUILayout.Height(25)))
                {
                    PlayAllSections(example);
                }
                EditorGUILayout.EndHorizontal();
                
                EditorGUILayout.PropertyField(serializedObject.FindProperty("sections"), true);
                EditorGUI.indentLevel--;
            }
            
            EditorGUILayout.Space();
            
            // Arrangements
            showArrangements = EditorGUILayout.Foldout(showArrangements, $"Arrangements ({example.arrangements.Count})");
            if (showArrangements)
            {
                EditorGUI.indentLevel++;
                EditorGUILayout.PropertyField(serializedObject.FindProperty("arrangements"), true);
                EditorGUI.indentLevel--;
            }
            
            EditorGUILayout.Space();
            
            // Strudel Code
            EditorGUILayout.LabelField("Strudel Code", EditorStyles.boldLabel);
            
            // Add play button for Strudel code
            EditorGUILayout.BeginHorizontal();
            if (GUILayout.Button("🎵 Execute Strudel Code", GUILayout.Height(25)))
            {
                ExecuteStrudelCode(example);
            }
            EditorGUILayout.EndHorizontal();
            
            EditorGUILayout.PropertyField(serializedObject.FindProperty("strudelCode"), true);
            
            serializedObject.ApplyModifiedProperties();
        }
        
        private void PlayExample(StrudelExample example)
        {
            try
            {
                // Get the example manager
                var exampleManager = StrudelExampleManager.Instance;
                if (exampleManager == null)
                {
                    Debug.LogError("StrudelExampleManager not found in the scene");
                    return;
                }
                
                // Set as current example
                exampleManager.SetCurrentExample(example);
                
                // Load samples and instruments
                exampleManager.LoadExampleSamples();
                exampleManager.CreateExampleInstruments();
                
                // Play the first section or execute Strudel code
                if (example.arrangements.Count > 0 && example.arrangements[0].sections.Count > 0)
                {
                    string sectionName = example.arrangements[0].sections[0].sectionName;
                    exampleManager.PlaySection(sectionName);
                    Debug.Log($"Playing section: {sectionName} from {example.exampleTitle}");
                }
                else if (!string.IsNullOrEmpty(example.strudelCode))
                {
                    exampleManager.ExecuteStrudelCode();
                    Debug.Log($"Executing Strudel code from: {example.exampleTitle}");
                }
                else if (example.instruments.Count > 0)
                {
                    // Play the first instrument's pattern
                    var firstInstrument = example.instruments[0];
                    if (!string.IsNullOrEmpty(firstInstrument.pattern))
                    {
                        // Use StrudelUnityBridge to play the pattern
                        var bridge = StrudelUnityBridge.Instance;
                        bridge.PlayPattern(firstInstrument.pattern, firstInstrument.instrumentName, firstInstrument.bank, example.beatsPerMinute);
                        Debug.Log($"Playing pattern: {firstInstrument.pattern} on {firstInstrument.instrumentName}");
                    }
                }
                else
                {
                    Debug.LogWarning("No playable content found in example");
                }
            }
            catch (System.Exception e)
            {
                Debug.LogError($"Error playing example: {e.Message}");
            }
        }
        
        private void StopAllAudio()
        {
            var exampleManager = StrudelExampleManager.Instance;
            if (exampleManager != null)
            {
                exampleManager.StopAllAudio();
                Debug.Log("Stopped all audio playback");
            }
            else
            {
                Debug.LogWarning("Example manager not available to stop audio");
            }
        }
        
        private void PlayAllInstruments(StrudelExample example)
        {
            try
            {
                // Get the example manager
                var exampleManager = StrudelExampleManager.Instance;
                if (exampleManager == null)
                {
                    Debug.LogError("StrudelExampleManager not found in the scene");
                    return;
                }
                
                // Set as current example
                exampleManager.SetCurrentExample(example);
                
                // Load samples and instruments
                exampleManager.LoadExampleSamples();
                exampleManager.CreateExampleInstruments();
                
                // Play each instrument's pattern
                foreach (var instrument in example.instruments)
                {
                    if (!string.IsNullOrEmpty(instrument.pattern))
                    {
                        // Use StrudelUnityBridge to play the pattern
                        var bridge = StrudelUnityBridge.Instance;
                        bridge.PlayPattern(instrument.pattern, instrument.instrumentName, instrument.bank, example.beatsPerMinute);
                        Debug.Log($"Playing pattern: {instrument.pattern} on {instrument.instrumentName}");
                    }
                }
            }
            catch (System.Exception e)
            {
                Debug.LogError($"Error playing instruments: {e.Message}");
            }
        }
        
        private void PlayAllSections(StrudelExample example)
        {
            try
            {
                // Get the example manager
                var exampleManager = StrudelExampleManager.Instance;
                if (exampleManager == null)
                {
                    Debug.LogError("StrudelExampleManager not found in the scene");
                    return;
                }
                
                // Set as current example
                exampleManager.SetCurrentExample(example);
                
                // Load samples and instruments
                exampleManager.LoadExampleSamples();
                exampleManager.CreateExampleInstruments();
                
                // Play each section
                foreach (var section in example.sections)
                {
                    exampleManager.PlaySection(section.sectionName);
                    Debug.Log($"Playing section: {section.sectionName}");
                }
            }
            catch (System.Exception e)
            {
                Debug.LogError($"Error playing sections: {e.Message}");
            }
        }
        
        private void ExecuteStrudelCode(StrudelExample example)
        {
            try
            {
                // Get the example manager
                var exampleManager = StrudelExampleManager.Instance;
                if (exampleManager == null)
                {
                    Debug.LogError("StrudelExampleManager not found in the scene");
                    return;
                }
                
                // Set as current example
                exampleManager.SetCurrentExample(example);
                
                // Execute the Strudel code
                exampleManager.ExecuteStrudelCode();
                Debug.Log($"Executing Strudel code from: {example.exampleTitle}");
            }
            catch (System.Exception e)
            {
                Debug.LogError($"Error executing Strudel code: {e.Message}");
            }
        }
    }
    
    // Note: InstrumentDefinition is not a ScriptableObject, so we can't create a custom editor for it
    // The default Unity inspector will be used for serializable classes
    #endif
}