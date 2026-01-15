using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// Manages instrument definitions and sound banks for Strudel
/// </summary>
public class StrudelInstrumentManager : MonoBehaviour
{
    // Singleton instance
    private static StrudelInstrumentManager instance;
    public static StrudelInstrumentManager Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<StrudelInstrumentManager>();
                if (instance == null)
                {
                    GameObject obj = new GameObject("StrudelInstrumentManager");
                    instance = obj.AddComponent<StrudelInstrumentManager>();
                }
            }
            return instance;
        }
    }

    // Instrument definitions
    public Dictionary<string, StrudelInstrumentDefinition> instruments = new Dictionary<string, StrudelInstrumentDefinition>();
    public Dictionary<string, DrumBank> drumBanks = new Dictionary<string, DrumBank>();

    void Awake()
    {
        // Initialize default instruments and drum banks
        InitializeDefaultInstruments();
        InitializeDefaultDrumBanks();
    }

    private void InitializeDefaultInstruments()
    {
        // Basic instrument definitions
        // These would be expanded with actual audio clips in a real implementation
        
        // Drums
        AddInstrument("bd", "Bass Drum", StrudelInstrumentType.Drum);
        AddInstrument("sd", "Snare Drum", StrudelInstrumentType.Drum);
        AddInstrument("hh", "Hi-Hat (Closed)", StrudelInstrumentType.Drum);
        AddInstrument("oh", "Hi-Hat (Open)", StrudelInstrumentType.Drum);
        AddInstrument("rim", "Rimshot", StrudelInstrumentType.Drum);
        AddInstrument("lt", "Low Tom", StrudelInstrumentType.Drum);
        AddInstrument("mt", "Mid Tom", StrudelInstrumentType.Drum);
        AddInstrument("ht", "High Tom", StrudelInstrumentType.Drum);
        AddInstrument("rd", "Ride Cymbal", StrudelInstrumentType.Drum);
        AddInstrument("cr", "Crash Cymbal", StrudelInstrumentType.Drum);

        // Melodic instruments
        AddInstrument("piano", "Acoustic Piano", StrudelInstrumentType.Melodic);
        AddInstrument("kalimba", "Kalimba", StrudelInstrumentType.Melodic);
        AddInstrument("sawtooth", "Sawtooth Synth", StrudelInstrumentType.Melodic);
        AddInstrument("sine", "Sine Wave Synth", StrudelInstrumentType.Melodic);
        AddInstrument("square", "Square Wave Synth", StrudelInstrumentType.Melodic);
        AddInstrument("triangle", "Triangle Wave Synth", StrudelInstrumentType.Melodic);

        // Bass
        AddInstrument("bass0", "Bass Synth 0", StrudelInstrumentType.Bass);
        AddInstrument("bass1", "Bass Synth 1", StrudelInstrumentType.Bass);
        AddInstrument("bass2", "Bass Synth 2", StrudelInstrumentType.Bass);
        AddInstrument("bass3", "Bass Synth 3", StrudelInstrumentType.Bass);
    }

    private void InitializeDefaultDrumBanks()
    {
        // Roland TR-909
        DrumBank tr909 = new DrumBank("RolandTR909", "Classic 909 drum machine");
        tr909.AddDrumMapping("bd", "TR909_BassDrum");
        tr909.AddDrumMapping("sd", "TR909_SnareDrum");
        tr909.AddDrumMapping("hh", "TR909_HiHatClosed");
        tr909.AddDrumMapping("oh", "TR909_HiHatOpen");
        tr909.AddDrumMapping("rim", "TR909_Rimshot");
        tr909.AddDrumMapping("lt", "TR909_LowTom");
        tr909.AddDrumMapping("mt", "TR909_MidTom");
        tr909.AddDrumMapping("ht", "TR909_HighTom");
        tr909.AddDrumMapping("rd", "TR909_RideCymbal");
        tr909.AddDrumMapping("cr", "TR909_CrashCymbal");
        drumBanks.Add("RolandTR909", tr909);
        drumBanks.Add("tr909", tr909);

        // Roland TR-808
        DrumBank tr808 = new DrumBank("RolandTR808", "Classic 808 drum machine");
        tr808.AddDrumMapping("bd", "TR808_BassDrum");
        tr808.AddDrumMapping("sd", "TR808_SnareDrum");
        tr808.AddDrumMapping("hh", "TR808_HiHatClosed");
        tr808.AddDrumMapping("oh", "TR808_HiHatOpen");
        tr808.AddDrumMapping("rim", "TR808_Rimshot");
        tr808.AddDrumMapping("lt", "TR808_LowTom");
        tr808.AddDrumMapping("mt", "TR808_MidTom");
        tr808.AddDrumMapping("ht", "TR808_HighTom");
        tr808.AddDrumMapping("rd", "TR808_RideCymbal");
        tr808.AddDrumMapping("cr", "TR808_CrashCymbal");
        drumBanks.Add("RolandTR808", tr808);
        drumBanks.Add("tr808", tr808);
    }

    public void AddInstrument(string id, string name, StrudelInstrumentType type)
    {
        instruments.Add(id, new StrudelInstrumentDefinition(id, name, type));
    }

    public StrudelInstrumentDefinition GetInstrument(string id)
    {
        if (instruments.ContainsKey(id))
        {
            return instruments[id];
        }
        return null;
    }

    public DrumBank GetDrumBank(string name)
    {
        if (drumBanks.ContainsKey(name))
        {
            return drumBanks[name];
        }
        return null;
    }

    public AudioClip GetAudioClipForInstrument(string instrumentId, string bankName = null)
    {
        // In a real implementation, this would return actual audio clips
        // For now, we'll return null as we don't have actual audio assets
        return null;
    }
}

/// <summary>
/// Instrument types (specific to StrudelInstrumentManager)
/// </summary>
public enum StrudelInstrumentType
{
    Drum,
    Melodic,
    Bass,
    Synth,
    Percussion,
    Other
}

/// <summary>
/// Definition of an instrument (specific to StrudelInstrumentManager)
/// </summary>
public class StrudelInstrumentDefinition
{
    public string id;
    public string name;
    public StrudelInstrumentType type;

    public StrudelInstrumentDefinition(string id, string name, StrudelInstrumentType type)
    {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

/// <summary>
/// Definition of a drum bank/kit
/// </summary>
public class DrumBank
{
    public string name;
    public string description;
    public Dictionary<string, string> drumMappings = new Dictionary<string, string>();

    public DrumBank(string name, string description)
    {
        this.name = name;
        this.description = description;
    }

    public void AddDrumMapping(string drumId, string audioClipName)
    {
        drumMappings.Add(drumId, audioClipName);
    }

    public string GetAudioClipName(string drumId)
    {
        if (drumMappings.ContainsKey(drumId))
        {
            return drumMappings[drumId];
        }
        return null;
    }
}