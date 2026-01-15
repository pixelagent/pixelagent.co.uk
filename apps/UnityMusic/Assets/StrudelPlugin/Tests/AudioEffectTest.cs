using UnityEngine;
using UnityEditor;
using NUnit.Framework;
using System.Collections;

/// <summary>
/// Tests for the Audio Effect Chain functionality
/// </summary>
public class AudioEffectTest
{
    [Test]
    public void TestAudioEffectChainInitialization()
    {
        // Test that the audio effect chain can be initialized
        var effectChain = AudioEffectChain.Instance;
        Assert.IsNotNull(effectChain, "Audio effect chain should be created successfully");
    }
    
    [Test]
    public void TestEffectPresets()
    {
        // Test that effect presets are available
        var effectChain = AudioEffectChain.Instance;
        var presets = effectChain.GetEffectPresets();
        
        Assert.IsNotNull(presets, "Effect presets list should not be null");
        Assert.IsTrue(presets.Count > 0, "Should have at least one effect preset");
        Assert.IsTrue(presets.Contains("Default"), "Should contain Default preset");
        Assert.IsTrue(presets.Contains("Drum"), "Should contain Drum preset");
        Assert.IsTrue(presets.Contains("Synth"), "Should contain Synth preset");
        Assert.IsTrue(presets.Contains("Ambient"), "Should contain Ambient preset");
    }
    
    [Test]
    public void TestEffectCreation()
    {
        // Test that different effect types can be created
        var reverb = new ReverbEffect();
        Assert.IsNotNull(reverb, "Reverb effect should be created");
        Assert.AreEqual(0.5f, reverb.roomSize, "Default room size should be 0.5");
        
        var delay = new DelayEffect();
        Assert.IsNotNull(delay, "Delay effect should be created");
        Assert.AreEqual(0.25f, delay.delayTime, "Default delay time should be 0.25");
        
        var distortion = new DistortionEffect();
        Assert.IsNotNull(distortion, "Distortion effect should be created");
        Assert.AreEqual(0.5f, distortion.drive, "Default drive should be 0.5");
        
        var filter = new FilterEffect();
        Assert.IsNotNull(filter, "Filter effect should be created");
        Assert.AreEqual(FilterEffect.FilterType.LowPass, filter.type, "Default filter type should be LowPass");
    }
    
    [Test]
    public void TestEffectCloning()
    {
        // Test that effects can be cloned properly
        var original = new ReverbEffect
        {
            roomSize = 0.8f,
            decayTime = 2.0f,
            mix = 0.7f
        };
        
        var clone = (ReverbEffect)original.Clone();
        
        Assert.IsNotNull(clone, "Clone should not be null");
        Assert.AreEqual(original.roomSize, clone.roomSize, "Room size should be cloned");
        Assert.AreEqual(original.decayTime, clone.decayTime, "Decay time should be cloned");
        Assert.AreEqual(original.mix, clone.mix, "Mix should be cloned");
        
        // Verify it's a deep clone by modifying the clone
        clone.roomSize = 0.3f;
        Assert.AreNotEqual(original.roomSize, clone.roomSize, "Clone should be independent");
    }
    
    [Test]
    public void TestEffectChainOperations()
    {
        // Test effect chain operations
        var effectChain = AudioEffectChain.Instance;
        AudioSource testSource = null; // Would be a real audio source in a real test
        
        // Create effect chain
        effectChain.CreateEffectChain(testSource, "Default");
        var effects = effectChain.GetEffects(testSource);
        Assert.IsNotNull(effects, "Effects list should not be null");
        Assert.AreEqual(1, effects.Count, "Default preset should have 1 effect");
        
        // Add an effect
        var reverb = new ReverbEffect();
        effectChain.AddEffect(testSource, reverb);
        effects = effectChain.GetEffects(testSource);
        Assert.AreEqual(2, effects.Count, "Should have 2 effects after adding one");
        
        // Clear effects
        effectChain.ClearEffects(testSource);
        effects = effectChain.GetEffects(testSource);
        Assert.AreEqual(0, effects.Count, "Should have 0 effects after clearing");
    }
    
    [Test]
    public void TestEffectDescriptions()
    {
        // Test that effects provide proper descriptions
        var reverb = new ReverbEffect
        {
            roomSize = 0.7f,
            decayTime = 1.5f,
            mix = 0.6f
        };
        
        string description = reverb.GetDescription();
        Assert.IsNotNull(description, "Description should not be null");
        Assert.IsTrue(description.Contains("Reverb"), "Description should contain effect type");
        Assert.IsTrue(description.Contains("0.7"), "Description should contain room size");
        Assert.IsTrue(description.Contains("1.5"), "Description should contain decay time");
        Assert.IsTrue(description.Contains("0.6"), "Description should contain mix");
    }
    
    [Test]
    public void TestPresetApplication()
    {
        // Test that presets can be applied
        var effectChain = AudioEffectChain.Instance;
        AudioSource testSource = null;
        
        // Apply drum preset
        effectChain.ApplyPreset(testSource, "Drum");
        var effects = effectChain.GetEffects(testSource);
        Assert.AreEqual(2, effects.Count, "Drum preset should have 2 effects");
        
        // Apply synth preset
        effectChain.ApplyPreset(testSource, "Synth");
        effects = effectChain.GetEffects(testSource);
        Assert.AreEqual(2, effects.Count, "Synth preset should have 2 effects");
        
        // Apply ambient preset
        effectChain.ApplyPreset(testSource, "Ambient");
        effects = effectChain.GetEffects(testSource);
        Assert.AreEqual(2, effects.Count, "Ambient preset should have 2 effects");
    }
    
    [Test]
    public void TestBridgeIntegration()
    {
        // Test that audio effect chain is accessible through the bridge
        var bridge = StrudelUnityBridge.Instance;
        Assert.IsNotNull(bridge, "Strudel bridge should be available");
        
        var effectChain = bridge.GetAudioEffectChain();
        Assert.IsNotNull(effectChain, "Audio effect chain should be available through bridge");
        
        var presets = effectChain.GetEffectPresets();
        Assert.IsNotNull(presets, "Effect presets should be available");
        Assert.IsTrue(presets.Count > 0, "Should have effect presets");
    }
}