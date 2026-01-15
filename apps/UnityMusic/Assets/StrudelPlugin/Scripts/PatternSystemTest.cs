using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

/// <summary>
/// Test script to verify the pattern node system works correctly
/// </summary>
public class PatternSystemTest : MonoBehaviour
{
    [Header("Test Patterns")]
    public string testPattern1 = "<~@2 0 ~@3 1 0 ~@3 2 1 0 ~@3 3 2 1 0 ~@3 4 3 2 1 0 ~@2>";
    public string testPattern2 = "[[0,3] [0,1] 2 0!2 [0,1] [2,1] 2 0!2 [0,1] [2,1]!2 2 0!2 [0,1] [2,1]!3 2 0!2 [0,1] [2,1]!4 2 [0@7 ~] ~]";
    public string testPattern3 = "<[D#2@4 F#2@2 G#2@2], [G#2@2 G#1@2 B1@2 C#2@2], [F#2@2 D#2@4 C#2@2], [D#2@4 F#2@2 G#2@2], [G#2@2 D#2@2 F#2@2 F2@2], [C#2@2 D#2@4 C#2@2], [D#2@4 F#2@2 G#2@2], [G#2@2 G#1@2 B1@2 C#2@2], [F#2@2 D#2@4 C#2@2], [D#2@4 F#2@2 G#2@2], [G#2@2 D#2@2 F#2@2 F2@2], [C#2@2 D#2@4 ~@2], [F2@4 C#2@2 D#2@2], [D#2 ~ D#2@2 E2@4], [C#2@2 D#2@3 ~@3], [A#1@4 C#2@2 D#2@2], [D#2@2 C#2@2 B1@2 ~@2], [D#3 ~ D3@2 B2@2 A#2@2], [E2@4 C#2@2 D#2@2], [D#2 ~ D#2@2 E2@4], [C#2@2 D#2@3 ~@3], [G#2@4 ~@2 D#2@2], [D#2@2 ~@2 F#2 ~ F2 ~], [C#2@2 D#2@6], [~@8]>";
    
    [Header("Test Results")]
    public bool test1Passed = false;
    public bool test2Passed = false;
    public bool test3Passed = false;
    
    void Start()
    {
        RunPatternTests();
    }
    
    [ContextMenu("Run Pattern Tests")]
    public void RunPatternTests()
    {
        Debug.Log("=== Pattern System Tests ===");
        
        // Test 1: Simple pattern with modifiers
        Debug.Log("\n--- Test 1: Simple pattern with modifiers ---");
        Debug.Log($"Input: {testPattern1}");
        
        PatternSequence seq1 = PatternConverter.ParsePattern(testPattern1);
        string output1 = PatternConverter.PatternToString(seq1);
        
        Debug.Log($"Output: {output1}");
        test1Passed = testPattern1.Trim() == output1.Trim();
        Debug.Log($"Test 1 Passed: {test1Passed}");
        
        // Test 2: Complex pattern with groups
        Debug.Log("\n--- Test 2: Complex pattern with groups ---");
        Debug.Log($"Input: {testPattern2}");
        
        PatternSequence seq2 = PatternConverter.ParsePattern(testPattern2);
        string output2 = PatternConverter.PatternToString(seq2);
        
        Debug.Log($"Output: {output2}");
        test2Passed = testPattern2.Trim() == output2.Trim();
        Debug.Log($"Test 2 Passed: {test2Passed}");
        
        // Test 3: Very complex pattern
        Debug.Log("\n--- Test 3: Very complex pattern ---");
        Debug.Log($"Input: {testPattern3}");
        
        PatternSequence seq3 = PatternConverter.ParsePattern(testPattern3);
        string output3 = PatternConverter.PatternToString(seq3);
        
        Debug.Log($"Output: {output3}");
        test3Passed = testPattern3.Trim() == output3.Trim();
        Debug.Log($"Test 3 Passed: {test3Passed}");
        
        // Summary
        Debug.Log("\n=== Test Summary ===");
        Debug.Log($"Test 1 (Simple): {test1Passed}");
        Debug.Log($"Test 2 (Groups): {test2Passed}");
        Debug.Log($"Test 3 (Complex): {test3Passed}");
        
        bool allPassed = test1Passed && test2Passed && test3Passed;
        Debug.Log($"All Tests Passed: {allPassed}");
        
        if (allPassed)
        {
            Debug.Log("✅ Pattern system is working correctly!");
        }
        else
        {
            Debug.Log("❌ Pattern system has issues that need to be fixed.");
        }
    }
    
    [ContextMenu("Test Pattern Parsing")]
    public void TestPatternParsing()
    {
        Debug.Log("=== Pattern Parsing Details ===");
        
        // Test individual components
        PatternNode node = PatternConverter.ParseNode("0@2");
        Debug.Log($"Parsed node '0@2': {node.element} + {node.modifiers}");
        
        PatternGroup group = PatternConverter.ParseGroup("[0,1]");
        Debug.Log($"Parsed group '[0,1]': {group.nodes.Count} nodes, isChord: {group.isChord}");
        
        PatternGroup seqGroup = PatternConverter.ParseGroup("[0 1 2]");
        Debug.Log($"Parsed sequence '[0 1 2]': {seqGroup.nodes.Count} nodes, isChord: {seqGroup.isChord}");
        
        // Test tokenization
        List<string> tokens = PatternConverter.TokenizePattern(testPattern2);
        Debug.Log($"Tokens for testPattern2:");
        foreach (string token in tokens)
        {
            Debug.Log($"  '{token}'");
        }
    }
}

#if UNITY_EDITOR
[CustomEditor(typeof(PatternSystemTest))]
public class PatternSystemTestEditor : Editor
{
    public override void OnInspectorGUI()
    {
        DrawDefaultInspector();
        
        PatternSystemTest test = (PatternSystemTest)target;
        
        if (GUILayout.Button("Run Pattern Tests"))
        {
            test.RunPatternTests();
        }
        
        if (GUILayout.Button("Test Pattern Parsing"))
        {
            test.TestPatternParsing();
        }
        
        EditorGUILayout.Space();
        EditorGUILayout.LabelField("Test Results:", EditorStyles.boldLabel);
        EditorGUILayout.LabelField($"Test 1 (Simple): {(test.test1Passed ? "✅ PASS" : "❌ FAIL")}");
        EditorGUILayout.LabelField($"Test 2 (Groups): {(test.test2Passed ? "✅ PASS" : "❌ FAIL")}");
        EditorGUILayout.LabelField($"Test 3 (Complex): {(test.test3Passed ? "✅ PASS" : "❌ FAIL")}");
        
        bool allPassed = test.test1Passed && test.test2Passed && test.test3Passed;
        EditorGUILayout.LabelField($"Overall: {(allPassed ? "✅ ALL PASS" : "❌ SOME FAIL")}", 
            allPassed ? EditorStyles.boldLabel : EditorStyles.helpBox);
    }
}
#endif