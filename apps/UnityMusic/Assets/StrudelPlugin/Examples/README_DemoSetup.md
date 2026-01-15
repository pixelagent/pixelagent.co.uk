# Strudel Demo Setup Guide

This guide explains how to set up a simple Unity scene with Strudel scriptable objects and a play button.

## Quick Setup

### 1. Create a New Scene
1. In Unity, create a new scene: `File > New Scene`
2. Save the scene: `File > Save Scene As...` (e.g., "StrudelDemo.unity")

### 2. Add Strudel Demo Controller
1. Create an empty GameObject: `GameObject > Create Empty`
2. Name it "StrudelDemoController"
3. Add the `StrudelDemoScene` component: `Add Component > Scripts > StrudelDemoScene`

### 3. Set Up UI (Manual Method)
1. Create a UI Canvas: `GameObject > UI > Canvas`
2. Create a Button: `GameObject > UI > Button`
3. Create a Text element: `GameObject > UI > Text`
4. Arrange them in your scene

### 4. Configure the Demo Controller
In the Inspector for "StrudelDemoController":
- **Play Button**: Drag your Play Button here
- **Stop Button**: Drag your Stop Button here  
- **Status Text**: Drag your Text element here
- **Demo Pattern**: Set to "c d e f" (or any pattern)
- **Demo Instrument**: Set to "piano" (or any instrument)
- **Demo BPM**: Set to 120

### 5. Add a Scriptable Object (Optional)
1. In Project window, right-click → Create → Strudel → Example
2. Name it "MyDemoExample"
3. Configure the example with instruments and patterns
4. Drag it to the "Demo Example" field in the controller

### 6. Test Your Setup
1. Click Play in Unity
2. Click the Play button in your scene
3. You should hear the pattern playing!

## Using the Auto-UI Version

Instead of manual UI setup, you can use `StrudelDemoUI`:

1. Create an empty GameObject
2. Add the `StrudelDemoUI` component
3. Configure the fields in the Inspector
4. The UI will be created automatically when the scene starts

## Common Patterns to Try

### Simple Melody
```
Pattern: "c d e f g a b c"
Instrument: "piano"
BPM: 120
```

### Drum Pattern
```
Pattern: "c2 d2 f#2 c2"
Instrument: "bd" (bass drum)
BPM: 140
```

### Arpeggio
```
Pattern: "[c e g] [d f a] [e g b] [f a c]"
Instrument: "synth"
BPM: 100
```

## Troubleshooting

### No Sound?
- Check that audio is not muted
- Verify the instrument name is correct
- Make sure StrudelAudioManager is in the scene

### Scriptable Object Not Found?
- Ensure the scriptable object exists in your project
- Check the file path is correct
- Verify the scriptable object has the right script attached

### Compilation Errors?
- Make sure all Strudel scripts are in the correct folders
- Check that the project compiles without errors first

## Advanced Usage

### Loading Examples
Use the "Load Example" button to load a complete StrudelExample scriptable object with multiple instruments and patterns.

### Executing Strudel Code
If your example has Strudel code in the "strudelCode" field, use the "Execute Code" button to run it.

### Custom Patterns
Experiment with different pattern syntax:
- Notes: "c d e f"
- Rhythms: "1 2 3 4"
- Groups: "[c e g]"
- Modifiers: "c@2" (hold for 2 beats)
- Alternates: "<c d>" (alternate between c and d)

## Example Scriptable Object Structure

```csharp
// Example configuration for a simple melody
Example Title: "Simple Demo"
Author: "Your Name"
BPM: 120
Time Signature: "4/4"

Instruments:
- Name: "piano"
  Type: "Melodic"
  Pattern: "c d e f g a b c"
  Rhythm: "1 1 1 1 1 1 1 1"
  Velocity: "1 1 1 1 1 1 1 1"

Sections:
- Name: "main"
  Cycle Count: 8
  Instruments: ["piano"]
```

This creates a complete, working Strudel demo that you can expand upon!