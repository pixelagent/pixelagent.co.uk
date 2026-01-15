using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

/// <summary>
/// Pattern sequencing and scheduling system for Strudel
/// </summary>
public class PatternScheduler : MonoBehaviour
{
    // Singleton instance
    private static PatternScheduler instance;
    public static PatternScheduler Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<PatternScheduler>();
                if (instance == null)
                {
                    GameObject obj = new GameObject("PatternScheduler");
                    instance = obj.AddComponent<PatternScheduler>();
                }
            }
            return instance;
        }
    }
    
    // Sequence data structure
    public class Sequence
    {
        public string name;
        public List<ScheduledPattern> patterns = new List<ScheduledPattern>();
        public float bpm = 120f;
        public int loops = 1;
        public bool isPlaying = false;
        public Coroutine playRoutine;
    }
    
    // Scheduled pattern data structure
    public class ScheduledPattern
    {
        public string pattern;
        public string instrument;
        public string bank;
        public float startTime; // in beats
        public float duration; // in beats (0 = use pattern length)
        public List<AudioEffect> effects = new List<AudioEffect>();
    }
    
    // Active sequences
    private Dictionary<string, Sequence> sequences = new Dictionary<string, Sequence>();
    private Sequence currentSequence = null;
    
    // Scheduling state
    private float currentBeat = 0f;
    private float lastBeatTime = 0f;
    private float beatDuration = 0.5f; // 120 BPM default
    
    void Awake()
    {
        // Initialize with default sequence
        CreateSequence("Default");
    }
    
    void Update()
    {
        // Update beat timing for scheduling
        if (currentSequence != null && currentSequence.isPlaying)
        {
            float timeSinceLastBeat = Time.time - lastBeatTime;
            float beatsElapsed = timeSinceLastBeat / beatDuration;
            
            if (beatsElapsed >= 1f)
            {
                currentBeat += beatsElapsed;
                lastBeatTime = Time.time;
            }
        }
    }
    
    /// <summary>
    /// Create a new sequence
    /// </summary>
    public Sequence CreateSequence(string name)
    {
        if (sequences.ContainsKey(name))
        {
            Debug.LogWarning("Sequence already exists: " + name);
            return sequences[name];
        }
        
        Sequence newSequence = new Sequence
        {
            name = name,
            bpm = 120f,
            loops = 1
        };
        
        sequences[name] = newSequence;
        Debug.Log("Created sequence: " + name);
        return newSequence;
    }
    
    /// <summary>
    /// Get a sequence by name
    /// </summary>
    public Sequence GetSequence(string name)
    {
        if (sequences.ContainsKey(name))
        {
            return sequences[name];
        }
        return null;
    }
    
    /// <summary>
    /// Delete a sequence
    /// </summary>
    public void DeleteSequence(string name)
    {
        if (sequences.ContainsKey(name))
        {
            Sequence seq = sequences[name];
            
            // Stop if playing
            if (seq.isPlaying)
            {
                StopSequence(name);
            }
            
            sequences.Remove(name);
            Debug.Log("Deleted sequence: " + name);
        }
    }
    
    /// <summary>
    /// Add a pattern to a sequence
    /// </summary>
    public void AddPatternToSequence(string sequenceName, string pattern, string instrument, 
                                   string bank = null, float startTime = 0f, float duration = 0f)
    {
        if (sequences.ContainsKey(sequenceName))
        {
            Sequence seq = sequences[sequenceName];
            
            ScheduledPattern scheduledPattern = new ScheduledPattern
            {
                pattern = pattern,
                instrument = instrument,
                bank = bank,
                startTime = startTime,
                duration = duration
            };
            
            seq.patterns.Add(scheduledPattern);
            
            // Sort patterns by start time
            seq.patterns.Sort((a, b) => a.startTime.CompareTo(b.startTime));
            
            Debug.Log("Added pattern to sequence " + sequenceName + " at beat " + startTime);
        }
        else
        {
            Debug.LogError("Sequence not found: " + sequenceName);
        }
    }
    
    /// <summary>
    /// Remove a pattern from a sequence
    /// </summary>
    public void RemovePatternFromSequence(string sequenceName, int index)
    {
        if (sequences.ContainsKey(sequenceName))
        {
            Sequence seq = sequences[sequenceName];
            
            if (index >= 0 && index < seq.patterns.Count)
            {
                seq.patterns.RemoveAt(index);
                Debug.Log("Removed pattern from sequence " + sequenceName);
            }
        }
    }
    
    /// <summary>
    /// Clear all patterns from a sequence
    /// </summary>
    public void ClearSequence(string sequenceName)
    {
        if (sequences.ContainsKey(sequenceName))
        {
            sequences[sequenceName].patterns.Clear();
            Debug.Log("Cleared sequence: " + sequenceName);
        }
    }
    
    /// <summary>
    /// Play a sequence
    /// </summary>
    public void PlaySequence(string sequenceName)
    {
        if (sequences.ContainsKey(sequenceName))
        {
            Sequence seq = sequences[sequenceName];
            
            // Stop current sequence if playing
            if (currentSequence != null && currentSequence.isPlaying)
            {
                StopSequence(currentSequence.name);
            }
            
            // Set up timing
            currentSequence = seq;
            currentBeat = 0f;
            lastBeatTime = Time.time;
            beatDuration = 60f / seq.bpm;
            
            // Start playback
            seq.isPlaying = true;
            seq.playRoutine = StartCoroutine(PlaySequenceCoroutine(seq));
            
            Debug.Log("Playing sequence: " + sequenceName);
        }
        else
        {
            Debug.LogError("Sequence not found: " + sequenceName);
        }
    }
    
    /// <summary>
    /// Stop the current sequence
    /// </summary>
    public void StopSequence(string sequenceName)
    {
        if (sequences.ContainsKey(sequenceName))
        {
            Sequence seq = sequences[sequenceName];
            
            if (seq.isPlaying)
            {
                seq.isPlaying = false;
                
                if (seq.playRoutine != null)
                {
                    StopCoroutine(seq.playRoutine);
                    seq.playRoutine = null;
                }
                
                // Stop all audio
                StrudelUnityBridge.Instance.StopAll();
                
                Debug.Log("Stopped sequence: " + sequenceName);
            }
        }
    }
    
    /// <summary>
    /// Stop all sequences
    /// </summary>
    public void StopAllSequences()
    {
        foreach (var seq in sequences.Values)
        {
            if (seq.isPlaying)
            {
                StopSequence(seq.name);
            }
        }
        
        currentSequence = null;
    }
    
    /// <summary>
    /// Get all sequence names
    /// </summary>
    public List<string> GetSequenceNames()
    {
        return new List<string>(sequences.Keys);
    }
    
    /// <summary>
    /// Get the current sequence
    /// </summary>
    public Sequence GetCurrentSequence()
    {
        return currentSequence;
    }
    
    /// <summary>
    /// Coroutine for playing a sequence
    /// </summary>
    private IEnumerator PlaySequenceCoroutine(Sequence sequence)
    {
        // Calculate total duration in beats
        float totalDuration = 0f;
        foreach (var pattern in sequence.patterns)
        {
            float patternEnd = pattern.startTime + (pattern.duration > 0 ? pattern.duration : 4f); // Default 4 beats
            if (patternEnd > totalDuration)
            {
                totalDuration = patternEnd;
            }
        }
        
        // Play for the specified number of loops
        for (int loop = 0; loop < sequence.loops && sequence.isPlaying; loop++)
        {
            Debug.Log("Starting sequence loop " + (loop + 1) + "/" + sequence.loops);
            
            // Play each scheduled pattern
            foreach (var scheduledPattern in sequence.patterns)
            {
                // Wait until the pattern's start time
                while (currentBeat < scheduledPattern.startTime && sequence.isPlaying)
                {
                    yield return null;
                }
                
                if (!sequence.isPlaying) break;
                
                // Play the pattern
                Debug.Log("Playing pattern at beat " + currentBeat + ": " + scheduledPattern.pattern);
                StrudelUnityBridge.Instance.PlayPattern(
                    scheduledPattern.pattern,
                    scheduledPattern.instrument,
                    scheduledPattern.bank,
                    sequence.bpm
                );
                
                // Wait for pattern duration (or default 4 beats)
                float waitDuration = scheduledPattern.duration > 0 ? scheduledPattern.duration : 4f;
                float waitTime = waitDuration * beatDuration;
                
                yield return new WaitForSeconds(waitTime);
                
                // Update current beat
                currentBeat += waitDuration;
            }
            
            // Reset beat counter for next loop
            currentBeat = 0f;
            lastBeatTime = Time.time;
        }
        
        // Sequence completed
        sequence.isPlaying = false;
        currentSequence = null;
        
        Debug.Log("Sequence completed: " + sequence.name);
    }
    
    /// <summary>
    /// Schedule a pattern to play at a specific time
    /// </summary>
    public void SchedulePattern(string pattern, string instrument, string bank = null, 
                              float delaySeconds = 0f, int loops = 1)
    {
        StartCoroutine(SchedulePatternCoroutine(pattern, instrument, bank, delaySeconds, loops));
    }
    
    /// <summary>
    /// Coroutine for scheduling a single pattern
    /// </summary>
    private IEnumerator SchedulePatternCoroutine(string pattern, string instrument, string bank,
                                               float delaySeconds, int loops)
    {
        // Wait for the specified delay
        if (delaySeconds > 0)
        {
            yield return new WaitForSeconds(delaySeconds);
        }
        
        // Play the pattern for the specified number of loops
        for (int i = 0; i < loops; i++)
        {
            StrudelUnityBridge.Instance.PlayPattern(pattern, instrument, bank);
            
            // Wait for pattern to complete (simplified - would use actual pattern duration in real implementation)
            yield return new WaitForSeconds(2f); // Assume 2 seconds per pattern for now
        }
    }
    
    /// <summary>
    /// Create a sequence from a list of patterns
    /// </summary>
    public Sequence CreateSequenceFromPatterns(string sequenceName, List<string> patterns,
                                             string instrument, string bank = null, float bpm = 120f)
    {
        CreateSequence(sequenceName);
        Sequence seq = sequences[sequenceName];
        seq.bpm = bpm;
        
        // Add each pattern to the sequence, starting each after the previous one
        float currentTime = 0f;
        foreach (string pattern in patterns)
        {
            AddPatternToSequence(sequenceName, pattern, instrument, bank, currentTime);
            currentTime += 4f; // 4 beats per pattern
        }
        
        return seq;
    }
}