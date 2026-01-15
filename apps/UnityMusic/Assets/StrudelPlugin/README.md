# Strudel Unity Plugin

A Unity plugin for integrating the Strudel live coding music environment with Unity's audio system.

## Overview

This plugin allows you to use Strudel's powerful pattern language and audio processing capabilities within Unity games and applications. It provides a bridge between Strudel's functional pattern composition and Unity's audio system.

## Features

- **Strudel Pattern Parsing**: Parse and execute Strudel mini-notation patterns
- **Instrument Management**: Manage instruments, drum banks, and sound samples
- **Audio Playback**: Play Strudel patterns through Unity's audio system
- **Method Chaining**: Support for Strudel's method chaining syntax
- **Extensible Architecture**: Easy to extend with additional Strudel features
- **Pattern Editor UI**: Visual editor for creating and testing Strudel patterns
- **Audio Library Download**: Download and import audio libraries from various sources
- **Instrument Setup**: Automatic instrument setup from downloaded libraries

## Installation

1. Copy the `Assets/StrudelPlugin` folder into your Unity project's Assets directory
2. The plugin will automatically initialize when your game starts

## Basic Usage

```csharp
using UnityEngine;
using StrudelPlugin;

public class MyGameAudio : MonoBehaviour
{
    void Start()
    {
        // Get the Strudel bridge instance
        StrudelUnityBridge bridge = StrudelUnityBridge.Instance;
        
        // Set volume
        bridge.SetVolume(0.8f);
        
        // Play a simple pattern
        bridge.PlayPattern("bd sd hh oh", "bd");
        
        // Play a more complex pattern
        bridge.PlayPattern("<bd sd> hh*4", "bd");
        
        // Stop all audio
        bridge.StopAll();
        
        // Open the pattern editor (Editor only)
        bridge.OpenPatternEditor();
    }
}
```

## Strudel Pattern Examples

### Basic Patterns

```csharp
// Simple sequence
bridge.PlayPattern("bd sd hh oh", "bd");

// With rests
bridge.PlayPattern("bd ~ sd ~", "bd");

// Alternation
bridge.PlayPattern("<bd sd> hh*4", "bd");

// Parallel (simultaneous)
bridge.PlayPattern("[bd, hh*4]", "bd");
```

### Advanced Patterns

```csharp
// Euclidean rhythms
bridge.PlayPattern("bd(3,8)", "bd");

// Probability
bridge.PlayPattern("bd?0.5", "bd");

// Complex nested patterns
bridge.PlayPattern("<[x*<1 2> [~@3 x]] x>", "bd");
```

## Architecture

The plugin consists of several key components:

1. **StrudelUnityBridge**: Main interface for using Strudel in Unity
2. **StrudelAudioManager**: Manages audio sources and playback
3. **StrudelPatternParser**: Parses Strudel mini-notation patterns
4. **StrudelInstrumentManager**: Manages instruments and drum banks
5. **StrudelPatternEditor**: Visual editor for creating and testing patterns
6. **AudioLibraryDownloader**: Downloads and imports audio libraries

## Method Chaining

The plugin supports Strudel's method chaining syntax:

```csharp
// These method calls would be parsed and executed
bridge.ExecuteMethodCall("s('bd sd hh oh').room(0.5).gain(0.8)");
bridge.ExecuteMethodCall("n('0 1 2 3').s('piano').attack(0.1)");
bridge.ExecuteMethodCall("note('c4 e4 g4').vowel('a')");
```

## Configuration

Create a `StrudelConfig.asset` file to customize plugin settings:

- `maxAudioSources`: Maximum number of concurrent audio sources
- `defaultVolume`: Default volume level (0-1)
- `defaultInstrument`: Default instrument for playback
- `defaultBank`: Default drum bank
- `debugMode`: Enable debug logging

## Supported Strudel Features

### Mini-Notation Operators

- `~`: Rest (silence)
- `_`: Hold (extend previous event)
- `[ ]`: Group (subdivision)
- `< >`: Alternate (cycle through options)
- `*`: Multiply (repeat)
- `/`: Divide (slow down)
- `!`: Replicate (repeat whole pattern)
- `@`: Elongate (extend duration)
- `(pulses,steps)`: Euclidean rhythm
- `?`: Probability
- `:`: Degrade (randomly remove events)

### Methods

- `s()`: Sound pattern
- `n()`: Number/note pattern
- `note()`: Musical note pattern
- `bank()`: Set drum bank
- `room()`: Set reverb room size
- `gain()`: Set volume
- `pan()`: Set stereo position
- `speed()`: Set playback speed
- `lpf()`: Low-pass filter
- `hpf()`: High-pass filter
- `delay()`: Delay effect
- `reverb()`: Reverb effect
- `vowel()`: Vowel filter
- `crush()`: Bit crush effect
- `shape()`: Wave shaping
- `struct()`: Apply rhythmic structure
- `slow()`: Slow down pattern
- `fast()`: Speed up pattern
- `every()`: Apply every N cycles
- `whenmod()`: Apply when modulo matches
- `jux()`: Stereo split
- `rev()`: Reverse pattern
- `palindrome()`: Play forward then backward
- `shuffle()`: Randomly reorder

## Pattern Editor

The Strudel Pattern Editor provides a visual interface for creating and testing Strudel patterns:

- **Pattern Input**: Text area for entering Strudel mini-notation patterns
- **Instrument Selection**: Dropdown to select from available instruments
- **Bank Selection**: Dropdown to choose drum banks
- **BPM Control**: Slider to adjust beats per minute
- **Pattern Examples**: Quick access to common pattern examples
- **Play/Stop Controls**: Test patterns directly in the editor

To open the pattern editor:
```csharp
StrudelUnityBridge.Instance.OpenPatternEditor();
```

## Audio Library Download

The plugin supports downloading audio libraries from various sources:

- **GitHub Repositories**: Download entire sound libraries from GitHub
- **FreeSound**: Download individual samples from FreeSound.org
- **Shabda**: Download Indian classical music samples
- **Raw GitHub Files**: Download individual audio files

Supported sources:
- `https://github.com/*` - GitHub repositories
- `https://raw.githubusercontent.com/*` - Raw GitHub files
- `https://freesound.org/*` / `https://cdn.freesound.org/*` - FreeSound samples
- `https://shabda.ndre.gr/.*` - Shabda samples

## Future Development

- Integration with FMOD for advanced audio features
- Real-time pattern editing and live coding
- Visual node-based editor for Strudel patterns
- MIDI input/output support
- Audio effect processing chain
- Pattern sequencing and scheduling
- Enhanced audio library management with tagging and search

## License

This plugin is provided as-is for educational and experimental purposes. For commercial use, please check the licensing requirements of the Strudel library.

## References

- [Strudel Workshop](https://strudel.cc/workshop/getting-started/)
- [Strudel GitHub](https://github.com/tidalcycles/strudel)
- [TidalCycles Documentation](https://tidalcycles.org/docs/)

## Support

For questions or issues, please refer to the Strudel documentation or community resources.