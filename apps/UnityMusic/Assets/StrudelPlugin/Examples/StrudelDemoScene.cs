using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Simple demo scene controller that demonstrates how to use Strudel with scriptable objects
/// This creates a basic UI with a play button that plays a simple pattern
/// </summary>
public class StrudelDemoScene : MonoBehaviour
{
    [Header("UI Elements")]
    [Tooltip("Play button in the scene")]
    public Button playButton;
    
    [Tooltip("Stop button in the scene")]
    public Button stopButton;
    
    [Tooltip("Text to display status")]
    public Text statusText;
    
    [Header("Demo Configuration")]
    [Tooltip("The StrudelExample scriptable object to use")]
    public StrudelExample demoExample;
    
    [Tooltip("Pattern to play when button is clicked")]
    public string demoPattern = "c d e f";
    
    [Tooltip("Instrument to use for the pattern")]
    public string demoInstrument = "piano";
    
    [Tooltip("BPM for the pattern")]
    public float demoBPM = 120f;
    
    [Header("Audio Settings")]
    [Tooltip("Volume level for playback")]
    public float volume = 0.8f;
    
    private StrudelUnityBridge strudelBridge;
    private bool isPlaying = false;
    
    void Start()
    {
        // Initialize the Strudel bridge
        strudelBridge = StrudelUnityBridge.Instance;
        
        // Set up UI buttons
        SetupUI();
        
        // Update status text
        UpdateStatus("Ready to play pattern: " + demoPattern);
        
        Debug.Log("Strudel Demo Scene initialized");
    }
    
    void SetupUI()
    {
        // Set up play button
        if (playButton != null)
        {
            playButton.onClick.RemoveAllListeners();
            playButton.onClick.AddListener(OnPlayButtonClicked);
        }
        
        // Set up stop button
        if (stopButton != null)
        {
            stopButton.onClick.RemoveAllListeners();
            stopButton.onClick.AddListener(OnStopButtonClicked);
        }
    }
    
    void UpdateStatus(string message)
    {
        if (statusText != null)
        {
            statusText.text = message;
        }
        
        Debug.Log("Status: " + message);
    }
    
    public void OnPlayButtonClicked()
    {
        if (isPlaying)
        {
            UpdateStatus("Pattern already playing");
            return;
        }
        
        try
        {
            // Set volume
            strudelBridge.SetVolume(volume);
            
            // Play the pattern
            strudelBridge.PlayPattern(demoPattern, demoInstrument, null, demoBPM);
            
            isPlaying = true;
            UpdateStatus($"Playing: {demoPattern} on {demoInstrument} at {demoBPM} BPM");
            
            Debug.Log($"Started playing pattern: {demoPattern}");
        }
        catch (System.Exception e)
        {
            UpdateStatus("Error playing pattern: " + e.Message);
            Debug.LogError("Error playing pattern: " + e.Message);
        }
    }
    
    public void OnStopButtonClicked()
    {
        try
        {
            strudelBridge.StopAll();
            isPlaying = false;
            UpdateStatus("Pattern stopped");
            
            Debug.Log("Stopped pattern playback");
        }
        catch (System.Exception e)
        {
            UpdateStatus("Error stopping pattern: " + e.Message);
            Debug.LogError("Error stopping pattern: " + e.Message);
        }
    }
    
    /// <summary>
    /// Example method to load and play a StrudelExample scriptable object
    /// </summary>
    public void LoadAndPlayExample()
    {
        if (demoExample == null)
        {
            UpdateStatus("No example selected");
            return;
        }
        
        try
        {
            // Set the current example
            if (strudelBridge.GetExampleManager() != null)
            {
                strudelBridge.GetExampleManager().SetCurrentExample(demoExample);
                strudelBridge.GetExampleManager().LoadExampleSamples();
                strudelBridge.GetExampleManager().CreateExampleInstruments();
                
                UpdateStatus($"Loaded example: {demoExample.exampleTitle}");
                
                // Play the first instrument's pattern if available
                if (demoExample.instruments.Count > 0)
                {
                    var firstInstrument = demoExample.instruments[0];
                    strudelBridge.PlayPattern(firstInstrument.pattern, firstInstrument.instrumentName, firstInstrument.bank, demoExample.beatsPerMinute);
                    UpdateStatus($"Playing example: {demoExample.exampleTitle} - {firstInstrument.instrumentName}");
                }
            }
        }
        catch (System.Exception e)
        {
            UpdateStatus("Error loading example: " + e.Message);
            Debug.LogError("Error loading example: " + e.Message);
        }
    }
    
    /// <summary>
    /// Example method to execute Strudel code from an example
    /// </summary>
    public void ExecuteExampleCode()
    {
        if (demoExample == null)
        {
            UpdateStatus("No example selected");
            return;
        }
        
        if (!string.IsNullOrEmpty(demoExample.strudelCode))
        {
            try
            {
                if (strudelBridge.GetExampleManager() != null)
                {
                    strudelBridge.GetExampleManager().SetCurrentExample(demoExample);
                    strudelBridge.GetExampleManager().ExecuteStrudelCode();
                    UpdateStatus($"Executing code from: {demoExample.exampleTitle}");
                }
            }
            catch (System.Exception e)
            {
                UpdateStatus("Error executing code: " + e.Message);
                Debug.LogError("Error executing code: " + e.Message);
            }
        }
        else
        {
            UpdateStatus("No Strudel code in selected example");
        }
    }
    
    void Update()
    {
        // Optional: Add any real-time updates here
        // For example, visual feedback when audio is playing
    }
    
    void OnDestroy()
    {
        // Clean up when the scene is destroyed
        if (strudelBridge != null)
        {
            strudelBridge.StopAll();
        }
    }
}