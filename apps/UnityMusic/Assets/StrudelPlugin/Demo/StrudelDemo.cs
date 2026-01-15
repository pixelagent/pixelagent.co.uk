using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

/// <summary>
/// Demo script showing how to use the Strudel plugin in Unity
/// </summary>
public class StrudelDemo : MonoBehaviour
{
    public List<string> patterns = new List<string>
    {
        "bd sd hh oh",
        "<bd sd> hh*4",
        "[bd sd, hh*8]",
        "bd(3,8)", // Euclidean rhythm
        "bd*4 sd*2"  // Multiplication
    };
    
    public string instrument = "bd";
    public string bank = "tr909";
    public float volume = 0.8f;
    public float bpm = 120f;

    void Start()
    {
        // Initialize Strudel
        StrudelUnityBridge bridge = StrudelUnityBridge.Instance;
        
        // Set volume
        bridge.SetVolume(volume);
        
        Debug.Log("Strudel Demo Started");
        for (int i = 0; i < patterns.Count; i++)
        {
            Debug.Log("Pattern " + (i + 1) + ": " + patterns[i]);
        }
    }

    void Update()
    {
        // Play patterns when pressing 1-5
        for (int i = 0; i < Math.Min(patterns.Count, 5); i++)
        {
            if (Input.GetKeyDown(KeyCode.Alpha1 + i))
            {
                PlayPattern(patterns[i]);
            }
        }
        
        // Stop all when pressing space
        if (Input.GetKeyDown(KeyCode.Space))
        {
            StrudelUnityBridge.Instance.StopAll();
            Debug.Log("Stopped all audio");
        }
        
        // Increase BPM with +
        if (Input.GetKeyDown(KeyCode.Equals) || Input.GetKeyDown(KeyCode.Plus))
        {
            bpm += 10f;
            Debug.Log("BPM increased to: " + bpm);
        }
        
        // Decrease BPM with -
        if (Input.GetKeyDown(KeyCode.Minus))
        {
            bpm -= 10f;
            if (bpm < 20f) bpm = 20f;
            Debug.Log("BPM decreased to: " + bpm);
        }
        
        // Open pattern editor with P
        if (Input.GetKeyDown(KeyCode.P))
        {
            StrudelUnityBridge.Instance.OpenPatternEditor();
            Debug.Log("Opened Strudel Pattern Editor");
        }
    }

    void PlayPattern(string pattern)
    {
        int patternIndex = patterns.IndexOf(pattern);
        Debug.Log("Playing pattern " + (patternIndex + 1) + ": " + pattern + " at " + bpm + " BPM");
        StrudelUnityBridge.Instance.PlayPattern(pattern, instrument, bank, bpm);
    }

    // Example of using method calls
    void ExampleMethodCalls()
    {
        // These would be used in a real implementation
        // StrudelUnityBridge.Instance.ExecuteMethodCall("s('bd sd hh oh')");
        // StrudelUnityBridge.Instance.ExecuteMethodCall("n('0 1 2 3').s('piano')");
        // StrudelUnityBridge.Instance.ExecuteMethodCall("note('c4 e4 g4').room(0.5)");
    }

    void OnGUI()
    {
        GUILayout.BeginArea(new Rect(10, 10, 300, 200));
        
        GUILayout.Label("Strudel Unity Plugin Demo");
        GUILayout.Label("Press 1-" + Math.Min(patterns.Count, 5) + " to play patterns");
        GUILayout.Label("Press Space to stop all audio");
        
        GUILayout.Space(20);
        
        GUILayout.Label("Current Settings:");
        GUILayout.Label("Instrument: " + instrument);
        GUILayout.Label("Bank: " + bank);
        GUILayout.Label("Volume: " + volume.ToString("0.0"));
        GUILayout.Label("BPM: " + bpm.ToString("0"));
        
        GUILayout.Space(20);
        
        for (int i = 0; i < Math.Min(patterns.Count, 5); i++)
        {
            string buttonLabel = "Play Pattern " + (i + 1);
            if (i == 3) buttonLabel += " (Euclidean)";
            if (i == 4) buttonLabel += " (Multiplication)";
            
            if (GUILayout.Button(buttonLabel))
            {
                PlayPattern(patterns[i]);
            }
        }
        
        GUILayout.Space(10);
        
        if (GUILayout.Button("BPM +10"))
        {
            bpm += 10f;
        }
        
        if (GUILayout.Button("BPM -10"))
        {
            bpm -= 10f;
            if (bpm < 20f) bpm = 20f;
        }
        
        if (GUILayout.Button("Stop All"))
        {
            StrudelUnityBridge.Instance.StopAll();
        }
        
        GUILayout.Space(10);
        
        if (GUILayout.Button("Open Pattern Editor"))
        {
            StrudelUnityBridge.Instance.OpenPatternEditor();
        }
        
        GUILayout.EndArea();
    }
}