using UnityEngine;
using System.Collections;

/// <summary>
/// Sets up a test scene for the Strudel plugin
/// </summary>
public class TestSceneSetup : MonoBehaviour
{
    public GameObject testObject;
    public GameObject demoObject;

    void Start()
    {
        Debug.Log("Setting up Strudel Plugin Test Scene...");
        
        // Create test object if not assigned
        if (testObject == null)
        {
            testObject = new GameObject("StrudelTest");
            testObject.AddComponent<StrudelTest>();
        }
        
        // Create demo object if not assigned
        if (demoObject == null)
        {
            demoObject = new GameObject("StrudelDemo");
            demoObject.AddComponent<StrudelDemo>();
        }
        
        Debug.Log("Test scene setup complete!");
        Debug.Log("Press Play to run tests and see the demo UI.");
    }
}