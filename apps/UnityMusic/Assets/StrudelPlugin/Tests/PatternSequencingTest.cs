using UnityEngine;
using UnityEditor;
using NUnit.Framework;
using System.Collections;

/// <summary>
/// Tests for the Pattern Sequencing functionality
/// </summary>
public class PatternSequencingTest
{
    [Test]
    public void TestPatternSchedulerInitialization()
    {
        // Test that the pattern scheduler can be initialized
        var scheduler = PatternScheduler.Instance;
        Assert.IsNotNull(scheduler, "Pattern scheduler should be created successfully");
    }
    
    [Test]
    public void TestSequenceCreation()
    {
        // Test that sequences can be created
        var scheduler = PatternScheduler.Instance;
        
        // Create a sequence
        var sequence = scheduler.CreateSequence("TestSequence");
        Assert.IsNotNull(sequence, "Sequence should be created");
        Assert.AreEqual("TestSequence", sequence.name, "Sequence name should match");
        Assert.AreEqual(120f, sequence.bpm, "Default BPM should be 120");
        Assert.AreEqual(1, sequence.loops, "Default loops should be 1");
        Assert.IsFalse(sequence.isPlaying, "Sequence should not be playing initially");
    }
    
    [Test]
    public void TestSequenceManagement()
    {
        // Test sequence management operations
        var scheduler = PatternScheduler.Instance;
        
        // Create sequences
        scheduler.CreateSequence("Sequence1");
        scheduler.CreateSequence("Sequence2");
        scheduler.CreateSequence("Sequence3");
        
        // Test getting sequence names
        var sequenceNames = scheduler.GetSequenceNames();
        Assert.IsNotNull(sequenceNames, "Sequence names list should not be null");
        Assert.IsTrue(sequenceNames.Contains("Sequence1"), "Should contain Sequence1");
        Assert.IsTrue(sequenceNames.Contains("Sequence2"), "Should contain Sequence2");
        Assert.IsTrue(sequenceNames.Contains("Sequence3"), "Should contain Sequence3");
        
        // Test getting specific sequence
        var seq = scheduler.GetSequence("Sequence1");
        Assert.IsNotNull(seq, "Should be able to get Sequence1");
        Assert.AreEqual("Sequence1", seq.name, "Sequence name should match");
        
        // Test deleting sequence
        scheduler.DeleteSequence("Sequence2");
        sequenceNames = scheduler.GetSequenceNames();
        Assert.IsFalse(sequenceNames.Contains("Sequence2"), "Sequence2 should be deleted");
        Assert.IsTrue(sequenceNames.Contains("Sequence1"), "Sequence1 should still exist");
        Assert.IsTrue(sequenceNames.Contains("Sequence3"), "Sequence3 should still exist");
    }
    
    [Test]
    public void TestPatternScheduling()
    {
        // Test adding patterns to sequences
        var scheduler = PatternScheduler.Instance;
        scheduler.CreateSequence("TestSeq");
        
        // Add patterns to sequence
        scheduler.AddPatternToSequence("TestSeq", "bd sd hh oh", "bd", null, 0f);
        scheduler.AddPatternToSequence("TestSeq", "<bd sd> hh*4", "bd", null, 4f);
        scheduler.AddPatternToSequence("TestSeq", "bd(3,8)", "bd", null, 8f);
        
        var seq = scheduler.GetSequence("TestSeq");
        Assert.IsNotNull(seq, "Sequence should exist");
        Assert.AreEqual(3, seq.patterns.Count, "Should have 3 patterns");
        
        // Test pattern ordering
        Assert.AreEqual(0f, seq.patterns[0].startTime, "First pattern should start at beat 0");
        Assert.AreEqual(4f, seq.patterns[1].startTime, "Second pattern should start at beat 4");
        Assert.AreEqual(8f, seq.patterns[2].startTime, "Third pattern should start at beat 8");
        
        // Test clearing sequence
        scheduler.ClearSequence("TestSeq");
        Assert.AreEqual(0, seq.patterns.Count, "Sequence should be empty after clearing");
    }
    
    [Test]
    public void TestSequenceFromPatterns()
    {
        // Test creating sequence from patterns list
        var scheduler = PatternScheduler.Instance;
        
        var patterns = new System.Collections.Generic.List<string>
        {
            "bd sd hh oh",
            "<bd sd> hh*4",
            "bd(3,8)",
            "hh*8"
        };
        
        var sequence = scheduler.CreateSequenceFromPatterns("PatternListSeq", patterns, "bd", null, 140f);
        
        Assert.IsNotNull(sequence, "Sequence should be created");
        Assert.AreEqual(140f, sequence.bpm, "BPM should be set to 140");
        Assert.AreEqual(4, sequence.patterns.Count, "Should have 4 patterns");
        
        // Test pattern timing
        Assert.AreEqual(0f, sequence.patterns[0].startTime, "First pattern should start at 0");
        Assert.AreEqual(4f, sequence.patterns[1].startTime, "Second pattern should start at 4");
        Assert.AreEqual(8f, sequence.patterns[2].startTime, "Third pattern should start at 8");
        Assert.AreEqual(12f, sequence.patterns[3].startTime, "Fourth pattern should start at 12");
    }
    
    [Test]
    public void TestBridgeIntegration()
    {
        // Test that pattern scheduler is accessible through the bridge
        var bridge = StrudelUnityBridge.Instance;
        Assert.IsNotNull(bridge, "Strudel bridge should be available");
        
        var scheduler = bridge.GetPatternScheduler();
        Assert.IsNotNull(scheduler, "Pattern scheduler should be available through bridge");
        
        // Test creating a sequence through the bridge
        var sequence = scheduler.CreateSequence("BridgeTestSeq");
        Assert.IsNotNull(sequence, "Sequence should be created through bridge");
        Assert.AreEqual("BridgeTestSeq", sequence.name, "Sequence name should match");
    }
    
    [Test]
    public void TestSequenceProperties()
    {
        // Test sequence property management
        var scheduler = PatternScheduler.Instance;
        var sequence = scheduler.CreateSequence("PropsTest");
        
        // Test default properties
        Assert.AreEqual(120f, sequence.bpm, "Default BPM should be 120");
        Assert.AreEqual(1, sequence.loops, "Default loops should be 1");
        
        // Test property changes
        sequence.bpm = 180f;
        sequence.loops = 3;
        
        Assert.AreEqual(180f, sequence.bpm, "BPM should be updated");
        Assert.AreEqual(3, sequence.loops, "Loops should be updated");
    }
    
    [Test]
    public void TestScheduledPatternProperties()
    {
        // Test scheduled pattern properties
        var scheduler = PatternScheduler.Instance;
        scheduler.CreateSequence("PatternPropsTest");
        scheduler.AddPatternToSequence("PatternPropsTest", "bd sd hh oh", "bd", "tr909", 0f, 8f);
        
        var seq = scheduler.GetSequence("PatternPropsTest");
        var pattern = seq.patterns[0];
        
        Assert.AreEqual("bd sd hh oh", pattern.pattern, "Pattern string should match");
        Assert.AreEqual("bd", pattern.instrument, "Instrument should match");
        Assert.AreEqual("tr909", pattern.bank, "Bank should match");
        Assert.AreEqual(0f, pattern.startTime, "Start time should match");
        Assert.AreEqual(8f, pattern.duration, "Duration should match");
    }
}