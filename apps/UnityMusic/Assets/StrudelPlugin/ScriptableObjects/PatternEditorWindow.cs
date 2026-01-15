using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

/// <summary>
/// Advanced Pattern Editor Window for Strudel Instruments
/// Provides a user-friendly interface for editing musical patterns
/// </summary>
public class PatternEditorWindow : EditorWindow
{
    private InstrumentDefinition currentInstrument;
    private Vector2 scrollPosition;
    private bool showNoteEditor = true;
    private bool showRhythmEditor = false;
    private bool showVelocityEditor = false;
    
    private string simplePattern = "";
    private string simpleRhythm = "";
    private string simpleVelocity = "";
    
    [MenuItem("Window/Strudel/Pattern Editor")]
    public static void ShowWindow()
    {
        GetWindow<PatternEditorWindow>("Pattern Editor");
    }
    
    void OnEnable()
    {
        // Note: InstrumentDefinition is not a ScriptableObject, so we can't select it directly
        // The user needs to manually assign the instrument in the inspector or create a new one
    }
    
    void OnGUI()
    {
        if (currentInstrument == null)
        {
            EditorGUILayout.HelpBox("No instrument selected. Select an InstrumentDefinition to edit patterns.", MessageType.Info);
            
            // Show selection button
            if (GUILayout.Button("Select Instrument"))
            {
                Selection.activeObject = null;
            }
            return;
        }
        
        // Title
        EditorGUILayout.LabelField($"Pattern Editor - {currentInstrument.instrumentName}", EditorStyles.largeLabel);
        EditorGUILayout.Space();
        
        // Mode selection
        EditorGUILayout.BeginHorizontal();
        GUI.backgroundColor = showNoteEditor ? Color.cyan : Color.white;
        if (GUILayout.Button("Notes", GUILayout.Height(30)))
        {
            showNoteEditor = true;
            showRhythmEditor = false;
            showVelocityEditor = false;
        }
        
        GUI.backgroundColor = showRhythmEditor ? Color.yellow : Color.white;
        if (GUILayout.Button("Rhythm", GUILayout.Height(30)))
        {
            showNoteEditor = false;
            showRhythmEditor = true;
            showVelocityEditor = false;
        }
        
        GUI.backgroundColor = showVelocityEditor ? Color.magenta : Color.white;
        if (GUILayout.Button("Velocity", GUILayout.Height(30)))
        {
            showNoteEditor = false;
            showRhythmEditor = false;
            showVelocityEditor = true;
        }
        
        GUI.backgroundColor = Color.white;
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.Space();
        
        // Pattern Type selection
        EditorGUILayout.LabelField("Pattern Type:", EditorStyles.boldLabel);
        currentInstrument.patternType = (PatternType)EditorGUILayout.EnumPopup(currentInstrument.patternType);
        
        EditorGUILayout.Space();
        
        // Use Advanced Pattern toggle
        currentInstrument.useAdvancedPattern = EditorGUILayout.Toggle("Use Advanced Pattern Editor", currentInstrument.useAdvancedPattern);
        
        EditorGUILayout.Space();
        
        if (currentInstrument.useAdvancedPattern)
        {
            DrawAdvancedPatternEditor();
        }
        else
        {
            DrawSimplePatternEditor();
        }
        
        EditorGUILayout.Space();
        
        // Actions
        EditorGUILayout.BeginHorizontal();
        
        if (GUILayout.Button("Convert to Advanced"))
        {
            ConvertSimpleToAdvanced();
        }
        
        if (GUILayout.Button("Convert to Simple"))
        {
            ConvertAdvancedToSimple();
        }
        
        if (GUILayout.Button("Clear Pattern"))
        {
            ClearPattern();
        }
        
        EditorGUILayout.EndHorizontal();
    }
    
    void DrawSimplePatternEditor()
    {
        EditorGUILayout.LabelField("Simple Pattern Editor", EditorStyles.boldLabel);
        EditorGUILayout.HelpBox("Use Strudel pattern syntax: c d e f, [chord notes], ~ for rests", MessageType.Info);
        
        EditorGUILayout.LabelField("Pattern:");
        simplePattern = EditorGUILayout.TextArea(simplePattern, GUILayout.Height(60));
        
        EditorGUILayout.LabelField("Rhythm:");
        simpleRhythm = EditorGUILayout.TextArea(simpleRhythm, GUILayout.Height(60));
        
        EditorGUILayout.LabelField("Velocity:");
        simpleVelocity = EditorGUILayout.TextArea(simpleVelocity, GUILayout.Height(60));
        
        // Update instrument with simple pattern values
        if (GUI.changed)
        {
            currentInstrument.pattern = simplePattern;
            currentInstrument.rhythm = simpleRhythm;
            currentInstrument.velocity = simpleVelocity;
        }
    }
    
    void DrawAdvancedPatternEditor()
    {
        EditorGUILayout.LabelField("Advanced Pattern Editor", EditorStyles.boldLabel);
        EditorGUILayout.HelpBox("Click '+' to add notes, use the table to edit individual notes", MessageType.Info);
        
        if (showNoteEditor)
        {
            DrawNoteEditor();
        }
        else if (showRhythmEditor)
        {
            DrawRhythmEditor();
        }
        else if (showVelocityEditor)
        {
            DrawVelocityEditor();
        }
    }
    
    void DrawNoteEditor()
    {
        EditorGUILayout.LabelField("Notes", EditorStyles.boldLabel);
        
        // Add note button
        EditorGUILayout.BeginHorizontal();
        if (GUILayout.Button("+ Add Note", GUILayout.Width(100)))
        {
            currentInstrument.notes.Add(new NotePattern { note = "C", octave = 4, duration = 1.0f });
        }
        
        if (GUILayout.Button("Add Rest", GUILayout.Width(100)))
        {
            currentInstrument.notes.Add(new NotePattern { isRest = true, duration = 1.0f });
        }
        
        if (GUILayout.Button("Add Chord", GUILayout.Width(100)))
        {
            var chord = new NotePattern { isChord = true, chordNotes = new List<string> { "C", "E", "G" } };
            currentInstrument.notes.Add(chord);
        }
        
        EditorGUILayout.EndHorizontal();
        
        EditorGUILayout.Space();
        
        // Notes table
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Note", GUILayout.Width(80));
        EditorGUILayout.LabelField("Octave", GUILayout.Width(60));
        EditorGUILayout.LabelField("Duration", GUILayout.Width(80));
        EditorGUILayout.LabelField("Rest", GUILayout.Width(60));
        EditorGUILayout.LabelField("Chord", GUILayout.Width(60));
        EditorGUILayout.LabelField("Actions", GUILayout.Width(100));
        EditorGUILayout.EndHorizontal();
        
        for (int i = 0; i < currentInstrument.notes.Count; i++)
        {
            var note = currentInstrument.notes[i];
            EditorGUILayout.BeginHorizontal();
            
            // Note selection dropdown
            int noteIndex = System.Array.IndexOf(StrudelHelper.GetNoteNames(), note.note);
            if (noteIndex == -1) noteIndex = 0;
            
            noteIndex = EditorGUILayout.Popup(noteIndex, StrudelHelper.GetNoteNames(), GUILayout.Width(80));
            note.note = StrudelHelper.GetNoteNames()[noteIndex];
            
            // Octave slider
            note.octave = EditorGUILayout.IntSlider(note.octave, 0, 8, GUILayout.Width(60));
            
            // Duration slider
            note.duration = EditorGUILayout.Slider(note.duration, 0.1f, 4f, GUILayout.Width(80));
            
            // Rest toggle
            bool wasRest = note.isRest;
            note.isRest = EditorGUILayout.Toggle(note.isRest, GUILayout.Width(60));
            
            // Chord toggle
            bool wasChord = note.isChord;
            note.isChord = EditorGUILayout.Toggle(note.isChord, GUILayout.Width(60));
            
            // Actions
            if (GUILayout.Button("Edit", GUILayout.Width(50)))
            {
                EditNoteDetails(i);
            }
            
            if (GUILayout.Button("X", GUILayout.Width(30)))
            {
                currentInstrument.notes.RemoveAt(i);
                i--; // Adjust index after removal
            }
            
            EditorGUILayout.EndHorizontal();
            
            // Handle rest/chord state changes
            if (wasRest != note.isRest && note.isRest)
            {
                note.isChord = false;
                note.chordNotes.Clear();
            }
            else if (wasChord != note.isChord && note.isChord)
            {
                note.isRest = false;
                if (note.chordNotes.Count == 0)
                {
                    note.chordNotes.Add("C");
                    note.chordNotes.Add("E");
                    note.chordNotes.Add("G");
                }
            }
        }
    }
    
    void DrawRhythmEditor()
    {
        EditorGUILayout.LabelField("Rhythm", EditorStyles.boldLabel);
        
        // Add rhythm button
        if (GUILayout.Button("+ Add Rhythm", GUILayout.Width(120)))
        {
            currentInstrument.rhythms.Add(new NotePattern { duration = 1.0f });
        }
        
        EditorGUILayout.Space();
        
        // Rhythms table
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Duration", GUILayout.Width(100));
        EditorGUILayout.LabelField("Actions", GUILayout.Width(100));
        EditorGUILayout.EndHorizontal();
        
        for (int i = 0; i < currentInstrument.rhythms.Count; i++)
        {
            var rhythm = currentInstrument.rhythms[i];
            EditorGUILayout.BeginHorizontal();
            
            rhythm.duration = EditorGUILayout.Slider(rhythm.duration, 0.1f, 4f, GUILayout.Width(100));
            
            if (GUILayout.Button("X", GUILayout.Width(30)))
            {
                currentInstrument.rhythms.RemoveAt(i);
                i--; // Adjust index after removal
            }
            
            EditorGUILayout.EndHorizontal();
        }
    }
    
    void DrawVelocityEditor()
    {
        EditorGUILayout.LabelField("Velocity", EditorStyles.boldLabel);
        
        // Add velocity button
        if (GUILayout.Button("+ Add Velocity", GUILayout.Width(120)))
        {
            currentInstrument.velocities.Add(new NotePattern { velocity = 1.0f });
        }
        
        EditorGUILayout.Space();
        
        // Velocities table
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Velocity", GUILayout.Width(100));
        EditorGUILayout.LabelField("Actions", GUILayout.Width(100));
        EditorGUILayout.EndHorizontal();
        
        for (int i = 0; i < currentInstrument.velocities.Count; i++)
        {
            var velocity = currentInstrument.velocities[i];
            EditorGUILayout.BeginHorizontal();
            
            velocity.velocity = EditorGUILayout.Slider(velocity.velocity, 0f, 1f, GUILayout.Width(100));
            
            if (GUILayout.Button("X", GUILayout.Width(30)))
            {
                currentInstrument.velocities.RemoveAt(i);
                i--; // Adjust index after removal
            }
            
            EditorGUILayout.EndHorizontal();
        }
    }
    
    void EditNoteDetails(int index)
    {
        var note = currentInstrument.notes[index];
        
        // Create a dialog for editing chord notes
        if (note.isChord)
        {
            string chordNotes = string.Join(" ", note.chordNotes);
            chordNotes = EditorUtility.DisplayDialogComplex("Edit Chord Notes",
                "Enter chord notes separated by spaces:",
                "OK", "Cancel", "") == 0 ? chordNotes : chordNotes;
            
            // For now, we'll use a simple text field approach instead
            // This will be handled in the main editor UI
        }
    }
    
    void ConvertSimpleToAdvanced()
    {
        currentInstrument.notes = StrudelHelper.ConvertSimpleToAdvancedPattern(currentInstrument.pattern);
        currentInstrument.rhythms = StrudelHelper.ConvertSimpleToAdvancedPattern(currentInstrument.rhythm);
        currentInstrument.velocities = StrudelHelper.ConvertSimpleToAdvancedPattern(currentInstrument.velocity);
        
        UpdateSimplePatternFromAdvanced();
    }
    
    void ConvertAdvancedToSimple()
    {
        currentInstrument.pattern = StrudelHelper.ConvertAdvancedPatternToSimple(currentInstrument.notes);
        currentInstrument.rhythm = StrudelHelper.ConvertAdvancedPatternToSimple(currentInstrument.rhythms);
        currentInstrument.velocity = StrudelHelper.ConvertAdvancedPatternToSimple(currentInstrument.velocities);
        
        simplePattern = currentInstrument.pattern;
        simpleRhythm = currentInstrument.rhythm;
        simpleVelocity = currentInstrument.velocity;
    }
    
    void UpdateSimplePatternFromAdvanced()
    {
        simplePattern = StrudelHelper.ConvertAdvancedPatternToSimple(currentInstrument.notes);
        simpleRhythm = StrudelHelper.ConvertAdvancedPatternToSimple(currentInstrument.rhythms);
        simpleVelocity = StrudelHelper.ConvertAdvancedPatternToSimple(currentInstrument.velocities);
    }
    
    void ClearPattern()
    {
        currentInstrument.notes.Clear();
        currentInstrument.rhythms.Clear();
        currentInstrument.velocities.Clear();
        currentInstrument.pattern = "";
        currentInstrument.rhythm = "";
        currentInstrument.velocity = "";
        simplePattern = "";
        simpleRhythm = "";
        simpleVelocity = "";
    }
    
    void OnSelectionChange()
    {
        // Note: InstrumentDefinition is not a ScriptableObject, so we can't select it directly
        // This method is kept for potential future use if InstrumentDefinition becomes a ScriptableObject
    }
}