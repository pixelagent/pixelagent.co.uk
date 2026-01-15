# Strudel Demo Scene Setup - Complete Guide

This guide shows you how to add scriptable objects to a Unity scene and create a working demo with play buttons.

## What You'll Get

✅ **Complete demo setup** with UI and audio playback  
✅ **Scriptable object integration** showing how to use them in scenes  
✅ **StrudelUnityBridge usage** with real examples  
✅ **Multiple demo options** - manual UI or auto-generated UI  

## Files Created

### 1. StrudelDemoScene.cs
- Main scene controller
- Manual UI setup (buttons, text)
- Direct StrudelUnityBridge integration
- Play/Stop functionality

### 2. StrudelDemoUI.cs  
- Auto-generating UI system
- Creates buttons and text at runtime
- More flexible, no manual UI setup needed
- Multiple demo functions (play pattern, load example, execute code)

### 3. SimpleDemoExample.cs
- Example scriptable object you can use
- Pre-configured with instruments and patterns
- Can be loaded and played in the demo
- Shows how scriptable objects work

### 4. README_DemoSetup.md
- Step-by-step setup instructions
- Troubleshooting guide
- Pattern examples to try
- Best practices

## Quick Start (30 seconds)

### Option 1: Auto UI (Easiest)
1. Create new scene
2. Add empty GameObject → "DemoController"  
3. Add `StrudelDemoUI` component
4. Assign `SimpleDemoExample` to the example field
5. Click Play! ✨

### Option 2: Manual UI (More Control)
1. Create new scene
2. Add empty GameObject → "DemoController"
3. Add `StrudelDemoScene` component
4. Create UI Canvas + Button + Text manually
5. Assign UI elements to the controller
6. Assign `SimpleDemoExample` to the demo example field
7. Click Play! 🎵

## How Scriptable Objects Work in Scenes

### Adding to Scene
```csharp
// 1. Create scriptable object asset
// Right-click → Create → Strudel → Example

// 2. Configure in Inspector
// Set title, instruments, patterns, etc.

// 3. Reference in scene
public StrudelExample myExample; // Drag asset here

// 4. Use in code
strudelBridge.GetExampleManager().SetCurrentExample(myExample);
```

### Using StrudelUnityBridge
```csharp
// Get the bridge instance
StrudelUnityBridge bridge = StrudelUnityBridge.Instance;

// Play a simple pattern
bridge.PlayPattern("c d e f", "piano", null, 120f);

// Stop all audio
bridge.StopAll();

// Set volume
bridge.SetVolume(0.8f);
```

## Demo Features

### Basic Pattern Playback
- Play simple note patterns
- Change instruments and BPM
- Real-time volume control

### Scriptable Object Loading
- Load complete examples with multiple instruments
- Automatic sample and instrument setup
- Section and arrangement playback

### Strudel Code Execution
- Execute complex Strudel patterns
- Use advanced syntax and effects
- Real-time pattern generation

## Common Patterns to Try

```csharp
// Simple melody
"c d e f g a b c"

// Drum pattern  
"c2 ~ d2 ~"

// Arpeggio
"[c e g] [d f a] [e g b]"

// With modifiers
"c@2 d e!2 f"  // Hold c for 2 beats, repeat e twice
```

## Troubleshooting

### No Sound?
- Check audio mixer settings
- Verify instrument names are correct
- Ensure StrudelAudioManager exists in scene

### Scriptable Object Not Found?
- Make sure asset exists in project
- Check file path and naming
- Verify scriptable object has correct script

### UI Not Appearing?
- Check Canvas settings (render mode, sorting)
- Verify UI elements are properly parented
- Look for errors in Console

## Next Steps

1. **Experiment with patterns** - Try different note sequences
2. **Create your own examples** - Use SimpleDemoExample as template  
3. **Add more instruments** - Expand the instrument library
4. **Build complex UIs** - Create custom interfaces
5. **Integrate with game logic** - Trigger patterns from gameplay

## Example Usage Code

```csharp
// In your scene controller
public class MyGameController : MonoBehaviour
{
    public StrudelExample levelMusic;
    public Button playMusicButton;
    
    void Start()
    {
        playMusicButton.onClick.AddListener(PlayLevelMusic);
    }
    
    void PlayLevelMusic()
    {
        var bridge = StrudelUnityBridge.Instance;
        var manager = bridge.GetExampleManager();
        
        manager.SetCurrentExample(levelMusic);
        manager.LoadExampleSamples();
        manager.CreateExampleInstruments();
        
        // Play the main section
        manager.PlaySection("main");
    }
}
```

This gives you a complete, working Strudel demo system that you can build upon!