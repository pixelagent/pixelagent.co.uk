using UnityEngine;
using UnityEngine.UI;
using System.Collections;

/// <summary>
/// Simple UI controller for Strudel demo scenes
/// Creates a basic UI with play/stop buttons and status display
/// </summary>
public class StrudelDemoUI : MonoBehaviour
{
    [Header("UI Prefabs")]
    public GameObject uiCanvasPrefab;
    public GameObject buttonPrefab;
    public GameObject textPrefab;
    
    [Header("Demo Configuration")]
    public StrudelExample exampleToUse;
    public string patternToPlay = "c d e f";
    public string instrumentToUse = "piano";
    public float bpm = 120f;
    
    private GameObject uiCanvas;
    private Button playButton;
    private Button stopButton;
    private Button loadExampleButton;
    private Button executeCodeButton;
    private Text statusText;
    private StrudelUnityBridge strudelBridge;
    
    void Start()
    {
        // Initialize Strudel bridge
        strudelBridge = StrudelUnityBridge.Instance;
        
        // Create UI if prefab is provided
        if (uiCanvasPrefab != null)
        {
            CreateUI();
        }
        else
        {
            Debug.LogWarning("No UI prefab provided. Please assign a UI Canvas prefab.");
        }
    }
    
    void CreateUI()
    {
        // Instantiate the UI canvas
        uiCanvas = Instantiate(uiCanvasPrefab, Vector3.zero, Quaternion.identity);
        uiCanvas.name = "StrudelDemoUI";
        
        // Create main panel
        GameObject mainPanel = CreatePanel("MainPanel", new Vector2(400, 300));
        mainPanel.transform.SetParent(uiCanvas.transform, false);
        
        // Create title text
        Text titleText = CreateText("TitleText", "Strudel Demo Controller", 24);
        titleText.transform.SetParent(mainPanel.transform, false);
        titleText.rectTransform.anchoredPosition = new Vector2(0, 120);
        
        // Create status text
        statusText = CreateText("StatusText", "Ready to play", 16);
        statusText.transform.SetParent(mainPanel.transform, false);
        statusText.rectTransform.anchoredPosition = new Vector2(0, 80);
        statusText.color = Color.green;
        
        // Create play button
        playButton = CreateButton("PlayButton", "Play Pattern");
        playButton.transform.SetParent(mainPanel.transform, false);
        RectTransform playRect = playButton.GetComponent<RectTransform>();
        playRect.anchoredPosition = new Vector2(-100, 20);
        playButton.onClick.AddListener(OnPlayButtonClicked);
        
        // Create stop button
        stopButton = CreateButton("StopButton", "Stop");
        stopButton.transform.SetParent(mainPanel.transform, false);
        RectTransform stopRect = stopButton.GetComponent<RectTransform>();
        stopRect.anchoredPosition = new Vector2(100, 20);
        stopButton.onClick.AddListener(OnStopButtonClicked);
        
        // Create load example button
        loadExampleButton = CreateButton("LoadExampleButton", "Load Example");
        loadExampleButton.transform.SetParent(mainPanel.transform, false);
        RectTransform loadRect = loadExampleButton.GetComponent<RectTransform>();
        loadRect.anchoredPosition = new Vector2(-100, -20);
        loadExampleButton.onClick.AddListener(OnLoadExampleClicked);
        
        // Create execute code button
        executeCodeButton = CreateButton("ExecuteCodeButton", "Execute Code");
        executeCodeButton.transform.SetParent(mainPanel.transform, false);
        RectTransform execRect = executeCodeButton.GetComponent<RectTransform>();
        execRect.anchoredPosition = new Vector2(100, -20);
        executeCodeButton.onClick.AddListener(OnExecuteCodeClicked);
        
        // Create info text
        Text infoText = CreateText("InfoText", $"Pattern: {patternToPlay}\nInstrument: {instrumentToUse}\nBPM: {bpm}", 12);
        infoText.transform.SetParent(mainPanel.transform, false);
        infoText.rectTransform.anchoredPosition = new Vector2(0, -80);
        infoText.color = Color.white;
        
        UpdateStatus("Demo UI created successfully");
    }
    
    GameObject CreatePanel(string name, Vector2 size)
    {
        GameObject panel = new GameObject(name);
        RectTransform rectTransform = panel.AddComponent<RectTransform>();
        rectTransform.sizeDelta = size;
        rectTransform.anchoredPosition = Vector2.zero;
        
        // Add panel background
        Image panelImage = panel.AddComponent<Image>();
        panelImage.color = new Color(0.2f, 0.2f, 0.2f, 0.8f);
        
        return panel;
    }
    
    Button CreateButton(string name, string text)
    {
        GameObject buttonObj = new GameObject(name);
        RectTransform rectTransform = buttonObj.AddComponent<RectTransform>();
        rectTransform.sizeDelta = new Vector2(160, 40);
        
        Button button = buttonObj.AddComponent<Button>();
        
        // Add button background
        Image buttonImage = buttonObj.AddComponent<Image>();
        buttonImage.color = new Color(0.3f, 0.5f, 0.8f);
        
        // Add text to button
        Text buttonText = CreateText("ButtonText", text, 14);
        buttonText.transform.SetParent(buttonObj.transform, false);
        buttonText.rectTransform.anchoredPosition = Vector2.zero;
        
        return button;
    }
    
    Text CreateText(string name, string text, int fontSize)
    {
        GameObject textObj = new GameObject(name);
        RectTransform rectTransform = textObj.AddComponent<RectTransform>();
        rectTransform.sizeDelta = new Vector2(300, 40);
        
        Text textComponent = textObj.AddComponent<Text>();
        textComponent.text = text;
        textComponent.fontSize = fontSize;
        textComponent.color = Color.white;
        textComponent.alignment = TextAnchor.MiddleCenter;
        
        // Use default font
        textComponent.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
        
        return textComponent;
    }
    
    void UpdateStatus(string message)
    {
        if (statusText != null)
        {
            statusText.text = message;
        }
        
        Debug.Log("Strudel Demo: " + message);
    }
    
    public void OnPlayButtonClicked()
    {
        try
        {
            // Set volume
            strudelBridge.SetVolume(0.8f);
            
            // Play the pattern
            strudelBridge.PlayPattern(patternToPlay, instrumentToUse, null, bpm);
            
            UpdateStatus($"Playing: {patternToPlay} on {instrumentToUse}");
            statusText.color = Color.green;
            
            Debug.Log($"Started playing pattern: {patternToPlay}");
        }
        catch (System.Exception e)
        {
            UpdateStatus("Error: " + e.Message);
            statusText.color = Color.red;
            Debug.LogError("Error playing pattern: " + e.Message);
        }
    }
    
    public void OnStopButtonClicked()
    {
        try
        {
            strudelBridge.StopAll();
            UpdateStatus("Pattern stopped");
            statusText.color = Color.yellow;
            
            Debug.Log("Stopped pattern playback");
        }
        catch (System.Exception e)
        {
            UpdateStatus("Error stopping: " + e.Message);
            statusText.color = Color.red;
            Debug.LogError("Error stopping pattern: " + e.Message);
        }
    }
    
    public void OnLoadExampleClicked()
    {
        if (exampleToUse == null)
        {
            UpdateStatus("No example assigned");
            statusText.color = Color.red;
            return;
        }
        
        try
        {
            var exampleManager = strudelBridge.GetExampleManager();
            if (exampleManager != null)
            {
                exampleManager.SetCurrentExample(exampleToUse);
                exampleManager.LoadExampleSamples();
                exampleManager.CreateExampleInstruments();
                
                UpdateStatus($"Loaded: {exampleToUse.exampleTitle}");
                statusText.color = Color.cyan;
                
                // Play first instrument if available
                if (exampleToUse.instruments.Count > 0)
                {
                    var firstInstrument = exampleToUse.instruments[0];
                    strudelBridge.PlayPattern(firstInstrument.pattern, firstInstrument.instrumentName, firstInstrument.bank, exampleToUse.beatsPerMinute);
                    UpdateStatus($"Playing: {exampleToUse.exampleTitle} - {firstInstrument.instrumentName}");
                }
            }
        }
        catch (System.Exception e)
        {
            UpdateStatus("Error loading: " + e.Message);
            statusText.color = Color.red;
            Debug.LogError("Error loading example: " + e.Message);
        }
    }
    
    public void OnExecuteCodeClicked()
    {
        if (exampleToUse == null)
        {
            UpdateStatus("No example assigned");
            statusText.color = Color.red;
            return;
        }
        
        if (string.IsNullOrEmpty(exampleToUse.strudelCode))
        {
            UpdateStatus("No Strudel code in example");
            statusText.color = Color.yellow;
            return;
        }
        
        try
        {
            var exampleManager = strudelBridge.GetExampleManager();
            if (exampleManager != null)
            {
                exampleManager.SetCurrentExample(exampleToUse);
                exampleManager.ExecuteStrudelCode();
                
                UpdateStatus($"Executing code from: {exampleToUse.exampleTitle}");
                statusText.color = Color.magenta;
            }
        }
        catch (System.Exception e)
        {
            UpdateStatus("Error executing: " + e.Message);
            statusText.color = Color.red;
            Debug.LogError("Error executing code: " + e.Message);
        }
    }
    
    void OnDestroy()
    {
        // Clean up UI when destroyed
        if (uiCanvas != null)
        {
            Destroy(uiCanvas);
        }
        
        if (strudelBridge != null)
        {
            strudelBridge.StopAll();
        }
    }
}