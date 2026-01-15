using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

/// <summary>
/// Custom editor for StrudelExample that provides a visual pattern editor
/// </summary>
[CustomEditor(typeof(StrudelExample))]
public class StrudelExamplePatternEditor : Editor
{
    private bool showPatternEditor = false;
    private int selectedInstrumentIndex = -1;
    private Vector2 scrollPosition = Vector2.zero;
    
    public override void OnInspectorGUI()
    {
        serializedObject.Update();
        
        DrawDefaultInspector();
        
        EditorGUILayout.Space();
        EditorGUILayout.LabelField("Pattern Editor", EditorStyles.boldLabel);
        
        // Instrument selection
        StrudelExample example = (StrudelExample)target;
        
        if (example.instruments.Count > 0)
        {
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.LabelField("Select Instrument:", GUILayout.Width(120));
            
            string[] instrumentNames = new string[example.instruments.Count];
            for (int i = 0; i < example.instruments.Count; i++)
            {
                instrumentNames[i] = example.instruments[i].instrumentName;
            }
            
            selectedInstrumentIndex = EditorGUILayout.Popup(selectedInstrumentIndex, instrumentNames);
            EditorGUILayout.EndHorizontal();
            
            if (selectedInstrumentIndex >= 0 && selectedInstrumentIndex < example.instruments.Count)
            {
                DrawInstrumentPatternEditor(example.instruments[selectedInstrumentIndex]);
            }
        }
        else
        {
            EditorGUILayout.HelpBox("No instruments defined. Add instruments to use the pattern editor.", MessageType.Info);
        }
        
        serializedObject.ApplyModifiedProperties();
    }
    
    private void DrawInstrumentPatternEditor(InstrumentDefinition instrument)
    {
        EditorGUILayout.Space();
        EditorGUILayout.LabelField($"Editing: {instrument.instrumentName}", EditorStyles.boldLabel);
        
        // Pattern type selection
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Pattern Type:", GUILayout.Width(100));
        instrument.patternType = (PatternType)EditorGUILayout.EnumPopup(instrument.patternType);
        EditorGUILayout.EndHorizontal();
        
        // Pattern mode selection
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Pattern Mode:", GUILayout.Width(100));
        bool useNodePattern = EditorGUILayout.ToggleLeft("Use Node Pattern", instrument.useNodePattern);
        EditorGUILayout.EndHorizontal();
        
        if (useNodePattern != instrument.useNodePattern)
        {
            instrument.useNodePattern = useNodePattern;
            if (useNodePattern)
            {
                // Convert string pattern to node pattern
                if (!string.IsNullOrEmpty(instrument.pattern))
                {
                    instrument.nodePattern = PatternConverter.ParsePattern(instrument.pattern);
                }
            }
            else
            {
                // Convert node pattern to string
                instrument.pattern = PatternConverter.PatternToString(instrument.nodePattern);
            }
        }
        
        if (instrument.useNodePattern)
        {
            DrawNodePatternEditor(instrument);
        }
        else
        {
            DrawStringPatternEditor(instrument);
        }
    }
    
    private void DrawStringPatternEditor(InstrumentDefinition instrument)
    {
        EditorGUILayout.LabelField("String Pattern Editor", EditorStyles.boldLabel);
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Pattern:", GUILayout.Width(80));
        instrument.pattern = EditorGUILayout.TextField(instrument.pattern);
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Rhythm:", GUILayout.Width(80));
        instrument.rhythm = EditorGUILayout.TextField(instrument.rhythm);
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Velocity:", GUILayout.Width(80));
        instrument.velocity = EditorGUILayout.TextField(instrument.velocity);
        EditorGUILayout.EndHorizontal();
        
        if (GUILayout.Button("Convert to Node Pattern"))
        {
            instrument.useNodePattern = true;
            if (!string.IsNullOrEmpty(instrument.pattern))
            {
                instrument.nodePattern = PatternConverter.ParsePattern(instrument.pattern);
            }
        }
    }
    
    private void DrawNodePatternEditor(InstrumentDefinition instrument)
    {
        EditorGUILayout.LabelField("Node Pattern Editor", EditorStyles.boldLabel);
        
        // Global modifiers
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Global Modifiers:", GUILayout.Width(120));
        instrument.nodePattern.globalModifiers = EditorGUILayout.TextField(instrument.nodePattern.globalModifiers);
        EditorGUILayout.EndHorizontal();
        
        // Pattern elements
        EditorGUILayout.LabelField("Pattern Elements:", EditorStyles.boldLabel);
        
        scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition, GUILayout.Height(200));
        
        for (int i = 0; i < instrument.nodePattern.elements.Count; i++)
        {
            DrawPatternElement(instrument.nodePattern.elements[i], i, instrument);
        }
        
        EditorGUILayout.EndScrollView();
        
        // Add element buttons
        EditorGUILayout.BeginHorizontal();
        if (GUILayout.Button("Add Node"))
        {
            instrument.nodePattern.AddNode(new PatternNode());
        }
        if (GUILayout.Button("Add Group"))
        {
            instrument.nodePattern.AddGroup(new PatternGroup());
        }
        EditorGUILayout.EndHorizontal();
        
        // Convert to string button
        if (GUILayout.Button("Convert to String Pattern"))
        {
            instrument.useNodePattern = false;
            instrument.pattern = PatternConverter.PatternToString(instrument.nodePattern);
        }
        
        // Preview
        EditorGUILayout.LabelField("Preview:", EditorStyles.boldLabel);
        EditorGUILayout.LabelField(PatternConverter.PatternToString(instrument.nodePattern), EditorStyles.helpBox);
    }
    
    private void DrawPatternElement(PatternElement element, int index, InstrumentDefinition instrument)
    {
        EditorGUILayout.BeginVertical("box");
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField($"Element {index + 1}:", EditorStyles.boldLabel);
        
        // Element type selection
        PatternElement.ElementType newType = (PatternElement.ElementType)EditorGUILayout.EnumPopup(element.type, GUILayout.Width(100));
        if (newType != element.type)
        {
            if (newType == PatternElement.ElementType.Node)
            {
                element = new PatternElement(new PatternNode());
            }
            else
            {
                element = new PatternElement(new PatternGroup());
            }
            instrument.nodePattern.elements[index] = element;
        }
        
        if (GUILayout.Button("Remove", GUILayout.Width(80)))
        {
            instrument.nodePattern.elements.RemoveAt(index);
            return;
        }
        EditorGUILayout.EndHorizontal();
        
        if (element.type == PatternElement.ElementType.Node)
        {
            DrawPatternNodeEditor(element.node, index);
        }
        else
        {
            DrawPatternGroupEditor(element.group, index);
        }
        
        EditorGUILayout.EndVertical();
    }
    
    private void DrawPatternNodeEditor(PatternNode node, int index)
    {
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Element:", GUILayout.Width(80));
        node.element = EditorGUILayout.TextField(node.element, GUILayout.Width(60));
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Modifiers:", GUILayout.Width(80));
        node.modifiers = EditorGUILayout.TextField(node.modifiers, GUILayout.Width(100));
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Duration:", GUILayout.Width(80));
        node.duration = EditorGUILayout.FloatField(node.duration, GUILayout.Width(60));
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Velocity:", GUILayout.Width(80));
        node.velocity = EditorGUILayout.Slider(node.velocity, 0f, 1f, GUILayout.Width(100));
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Probability:", GUILayout.Width(80));
        node.probability = EditorGUILayout.Slider(node.probability, 0f, 1f, GUILayout.Width(100));
        EditorGUILayout.EndHorizontal();
    }
    
    private void DrawPatternGroupEditor(PatternGroup group, int index)
    {
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Is Chord:", GUILayout.Width(80));
        group.isChord = EditorGUILayout.Toggle(group.isChord);
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Group Modifiers:", GUILayout.Width(120));
        group.groupModifiers = EditorGUILayout.TextField(group.groupModifiers, GUILayout.Width(100));
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.LabelField("Nodes in Group:", EditorStyles.boldLabel);
        
        for (int i = 0; i < group.nodes.Count; i++)
        {
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.LabelField($"  Node {i + 1}:", GUILayout.Width(80));
            group.nodes[i].element = EditorGUILayout.TextField(group.nodes[i].element, GUILayout.Width(60));
            group.nodes[i].modifiers = EditorGUILayout.TextField(group.nodes[i].modifiers, GUILayout.Width(80));
            
            if (GUILayout.Button("Remove", GUILayout.Width(80)))
            {
                group.nodes.RemoveAt(i);
                i--; // Adjust index after removal
            }
            EditorGUILayout.EndHorizontal();
        }
        
        EditorGUILayout.BeginHorizontal();
        if (GUILayout.Button("Add Node", GUILayout.Width(80)))
        {
            group.nodes.Add(new PatternNode());
        }
        EditorGUILayout.EndHorizontal();
    }
}