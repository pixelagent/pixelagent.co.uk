using UnityEngine;
using System.Collections;

/// <summary>
/// Test script for the Strudel Unity plugin
/// </summary>
public class StrudelTest : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Starting Strudel Plugin Tests...");
        
        // Test 1: Basic initialization
        TestInitialization();
        
        // Test 2: Pattern parsing
        TestPatternParsing();
        
        // Test 3: Pattern validation
        TestPatternValidation();
        
        // Test 4: Method call parsing
        TestMethodCallParsing();
        
        // Test 5: Instrument management
        TestInstrumentManagement();
        
        Debug.Log("Strudel Plugin Tests Completed!");
    }

    void TestInitialization()
    {
        Debug.Log("\n=== Test 1: Initialization ===");
        
        // Get bridge instance
        StrudelUnityBridge bridge = StrudelUnityBridge.Instance;
        if (bridge != null)
        {
            Debug.Log("✓ StrudelUnityBridge initialized successfully");
        }
        else
        {
            Debug.LogError("✗ Failed to initialize StrudelUnityBridge");
        }
        
        // Get audio manager
        StrudelAudioManager audioManager = StrudelAudioManager.Instance;
        if (audioManager != null)
        {
            Debug.Log("✓ StrudelAudioManager initialized successfully");
        }
        else
        {
            Debug.LogError("✗ Failed to initialize StrudelAudioManager");
        }
        
        // Get instrument manager
        StrudelInstrumentManager instrumentManager = StrudelInstrumentManager.Instance;
        if (instrumentManager != null)
        {
            Debug.Log("✓ StrudelInstrumentManager initialized successfully");
        }
        else
        {
            Debug.LogError("✗ Failed to initialize StrudelInstrumentManager");
        }
    }

    void TestPatternParsing()
    {
        Debug.Log("\n=== Test 2: Pattern Parsing ===");
        
        StrudelPatternParser parser = new StrudelPatternParser();
        
        // Test simple pattern
        string simplePattern = "bd sd hh oh";
        StrudelPattern parsedSimple = parser.ParsePattern(simplePattern);
        Debug.Log("Simple pattern: " + simplePattern);
        Debug.Log("Parsed elements: " + parsedSimple.parsedElements.Count);
        foreach (PatternElement element in parsedSimple.parsedElements)
        {
            Debug.Log("  - " + element.type + ": " + element.value);
        }
        
        // Test pattern with operators
        string complexPattern = "bd*4 <sd hh> [oh, cr]";
        StrudelPattern parsedComplex = parser.ParsePattern(complexPattern);
        Debug.Log("\nComplex pattern: " + complexPattern);
        Debug.Log("Parsed elements: " + parsedComplex.parsedElements.Count);
        foreach (PatternElement element in parsedComplex.parsedElements)
        {
            Debug.Log("  - " + element.type + ": " + element.value + (element.amount > 0 ? " (" + element.amount + ")" : ""));
        }
        
        // Test nested patterns
        string nestedPattern = "<[bd sd] hh>";
        StrudelPattern parsedNested = parser.ParsePattern(nestedPattern);
        Debug.Log("\nNested pattern: " + nestedPattern);
        Debug.Log("Parsed elements: " + parsedNested.parsedElements.Count);
        if (parsedNested.parsedElements.Count > 0)
        {
            PatternElement firstElement = parsedNested.parsedElements[0];
            Debug.Log("  - " + firstElement.type + ": " + firstElement.value);
            if (firstElement.children != null)
            {
                Debug.Log("    Children: " + firstElement.children.Count);
                foreach (PatternElement child in firstElement.children)
                {
                    Debug.Log("      - " + child.type + ": " + child.value);
                }
            }
        }
    }

    void TestPatternValidation()
    {
        Debug.Log("\n=== Test 3: Pattern Validation ===");
        
        StrudelPatternParser parser = new StrudelPatternParser();
        
        // Test valid patterns
        string[] validPatterns = {
            "bd sd hh oh",
            "bd ~ sd ~",
            "<bd sd> hh*4",
            "[bd, hh*8]",
            "bd(3,8)"
        };
        
        foreach (string pattern in validPatterns)
        {
            bool isValid = parser.ValidatePattern(pattern);
            Debug.Log((isValid ? "✓ " : "✗ ") + "Pattern '" + pattern + "' is " + (isValid ? "valid" : "invalid"));
        }
        
        // Test invalid patterns (unbalanced brackets)
        string[] invalidPatterns = {
            "[bd sd",
            "<bd sd>",
            "bd(",
            "{bd sd}"
        };
        
        foreach (string pattern in invalidPatterns)
        {
            bool isValid = parser.ValidatePattern(pattern);
            Debug.Log((!isValid ? "✓ " : "✗ ") + "Pattern '" + pattern + "' is correctly identified as " + (!isValid ? "invalid" : "valid"));
        }
    }

    void TestMethodCallParsing()
    {
        Debug.Log("\n=== Test 4: Method Call Parsing ===");
        
        StrudelPatternParser parser = new StrudelPatternParser();
        
        // Test method calls
        string[] methodCalls = {
            "s('bd sd hh oh')",
            "n('0 1 2 3').s('piano')",
            "note('c4 e4 g4').room(0.5)",
            "s('bd').gain('<0.5 1>')"
        };
        
        foreach (string methodCall in methodCalls)
        {
            MethodCall parsedCall = parser.ParseMethodCall(methodCall);
            Debug.Log("Method call: " + methodCall);
            Debug.Log("  Method: " + parsedCall.methodName);
            Debug.Log("  Arguments: " + parsedCall.arguments.Count);
            foreach (MethodArgument arg in parsedCall.arguments)
            {
                Debug.Log("    - " + arg.type + ": " + arg.value);
            }
        }
    }

    void TestInstrumentManagement()
    {
        Debug.Log("\n=== Test 5: Instrument Management ===");
        
        StrudelInstrumentManager instrumentManager = StrudelInstrumentManager.Instance;
        
        // Test getting instruments
        string[] testInstruments = {"bd", "sd", "piano", "sawtooth", "bass0"};
        
        foreach (string instrumentId in testInstruments)
        {
            InstrumentDefinition instr = instrumentManager.GetInstrument(instrumentId);
            if (instr != null)
            {
                Debug.Log("✓ Instrument '" + instrumentId + "' found: " + instr.name);
            }
            else
            {
                Debug.Log("✗ Instrument '" + instrumentId + "' not found");
            }
        }
        
        // Test getting drum banks
        string[] testBanks = {"tr909", "tr808", "linn"};
        
        foreach (string bankName in testBanks)
        {
            DrumBank bank = instrumentManager.GetDrumBank(bankName);
            if (bank != null)
            {
                Debug.Log("✓ Drum bank '" + bankName + "' found: " + bank.description);
            }
            else
            {
                Debug.Log("✗ Drum bank '" + bankName + "' not found");
            }
        }
    }

    void Update()
    {
        // You can add runtime tests here if needed
    }
}