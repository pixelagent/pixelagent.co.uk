using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// Pattern menu system for building Strudel patterns
/// Similar to the JavaScript menu loader but adapted for Unity
/// </summary>
public class PatternMenuSystem
{
    // Menu data structure
    public class MenuItem
    {
        public string id;
        public string label;
        public string value;
        public string nodeType;
        public string color;
    }
    
    public class MenuGroup
    {
        public string id;
        public string label;
        public string nodeType;
        public string color;
        public List<MenuItem> items = new List<MenuItem>();
    }
    
    public class MenuCategory
    {
        public string id;
        public string label;
        public List<MenuGroup> groups = new List<MenuGroup>();
    }
    
    private List<MenuCategory> menuData;
    private string currentCategory = "instruments";
    
    public PatternMenuSystem()
    {
        LoadMenuData();
    }
    
    private void LoadMenuData()
    {
        menuData = new List<MenuCategory>
        {
            CreateInstrumentsMenu(),
            CreatePatternFunctionsMenu(),
            CreateCombinatorsMenu()
        };
    }
    
    private MenuCategory CreateInstrumentsMenu()
    {
        return new MenuCategory
        {
            id = "instruments",
            label = "Instruments",
            groups = new List<MenuGroup>
            {
                new MenuGroup
                {
                    id = "drums",
                    label = "Drum Kit",
                    nodeType = "DrumSymbol",
                    color = "#00d9ff",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "bd", label = "Bass Drum", value = "bd" },
                        new MenuItem { id = "sd", label = "Snare Drum", value = "sd" },
                        new MenuItem { id = "hh", label = "Hi-Hat", value = "hh" },
                        new MenuItem { id = "oh", label = "Open Hat", value = "oh" },
                        new MenuItem { id = "rim", label = "Rimshot", value = "rim" }
                    }
                },
                new MenuGroup
                {
                    id = "percussion",
                    label = "Percussion",
                    nodeType = "Instrument",
                    color = "#00d9ff",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "clap", label = "Clap", value = "clap" },
                        new MenuItem { id = "conga", label = "Conga", value = "conga" },
                        new MenuItem { id = "bongo", label = "Bongo", value = "bongo" },
                        new MenuItem { id = "cowbell", label = "Cowbell", value = "cowbell" },
                        new MenuItem { id = "shaker_large", label = "Large Shaker", value = "shaker_large" },
                        new MenuItem { id = "shaker_small", label = "Small Shaker", value = "shaker_small" }
                    }
                },
                new MenuGroup
                {
                    id = "melodic",
                    label = "Melodic Instruments",
                    nodeType = "Instrument",
                    color = "#00ff41",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "piano", label = "Piano", value = "piano" },
                        new MenuItem { id = "kalimba", label = "Kalimba", value = "kalimba" },
                        new MenuItem { id = "sawtooth", label = "Sawtooth Synth", value = "sawtooth" },
                        new MenuItem { id = "sine", label = "Sine Wave Synth", value = "sine" },
                        new MenuItem { id = "square", label = "Square Wave Synth", value = "square" }
                    }
                }
            }
        };
    }
    
    private MenuCategory CreatePatternFunctionsMenu()
    {
        return new MenuCategory
        {
            id = "patternFunctions",
            label = "Pattern Functions",
            groups = new List<MenuGroup>
            {
                new MenuGroup
                {
                    id = "soundFunctions",
                    label = "Sound Functions",
                    nodeType = "s",
                    color = "#8b5cf6",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "bd", label = "Bass Drum", value = "bd" },
                        new MenuItem { id = "sd", label = "Snare Drum", value = "sd" },
                        new MenuItem { id = "hh", label = "Hi-Hat", value = "hh" },
                        new MenuItem { id = "oh", label = "Open Hat", value = "oh" },
                        new MenuItem { id = "rim", label = "Rimshot", value = "rim" },
                        new MenuItem { id = "custom", label = "Custom Sound", value = "custom" }
                    }
                },
                new MenuGroup
                {
                    id = "noteFunctions",
                    label = "Note Functions",
                    nodeType = "note",
                    color = "#00ff41",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "c4", label = "C4", value = "c4" },
                        new MenuItem { id = "d4", label = "D4", value = "d4" },
                        new MenuItem { id = "e4", label = "E4", value = "e4" },
                        new MenuItem { id = "f4", label = "F4", value = "f4" },
                        new MenuItem { id = "g4", label = "G4", value = "g4" },
                        new MenuItem { id = "a4", label = "A4", value = "a4" },
                        new MenuItem { id = "b4", label = "B4", value = "b4" },
                        new MenuItem { id = "custom_note", label = "Custom Note", value = "custom" }
                    }
                },
                new MenuGroup
                {
                    id = "bankFunctions",
                    label = "Bank Selection",
                    nodeType = "bank",
                    color = "#ff006e",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "tr909", label = "Roland TR-909", value = "tr909" },
                        new MenuItem { id = "tr808", label = "Roland TR-808", value = "tr808" },
                        new MenuItem { id = "tr707", label = "Roland TR-707", value = "tr707" },
                        new MenuItem { id = "linn", label = "Akai Linn", value = "linn" }
                    }
                }
            }
        };
    }
    
    private MenuCategory CreateCombinatorsMenu()
    {
        return new MenuCategory
        {
            id = "combinators",
            label = "Combinators",
            groups = new List<MenuGroup>
            {
                new MenuGroup
                {
                    id = "structural",
                    label = "Structural Combinators",
                    nodeType = "stack",
                    color = "#8b5cf6",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "stack", label = "Stack (Parallel)", value = "stack" },
                        new MenuItem { id = "cat", label = "Cat (Sequence)", value = "cat" },
                        new MenuItem { id = "group", label = "Group", value = "group" }
                    }
                },
                new MenuGroup
                {
                    id = "rhythmic",
                    label = "Rhythmic Combinators",
                    nodeType = "struct",
                    color = "#ff006e",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "struct", label = "Structure", value = "struct" }
                    }
                },
                new MenuGroup
                {
                    id = "temporal",
                    label = "Temporal Combinators",
                    nodeType = "slow",
                    color = "#00d9ff",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "slow", label = "Slow Down", value = "slow" },
                        new MenuItem { id = "fast", label = "Speed Up", value = "fast" },
                        new MenuItem { id = "off", label = "Offset", value = "off" }
                    }
                },
                new MenuGroup
                {
                    id = "pitch",
                    label = "Pitch Combinators",
                    nodeType = "add",
                    color = "#9400d3",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "add", label = "Add Value", value = "add" },
                        new MenuItem { id = "scale", label = "Musical Scale", value = "scale" }
                    }
                },
                new MenuGroup
                {
                    id = "conditional",
                    label = "Conditional Combinators",
                    nodeType = "every",
                    color = "#00ff41",
                    items = new List<MenuItem>
                    {
                        new MenuItem { id = "every", label = "Every N Cycles", value = "every" },
                        new MenuItem { id = "whenmod", label = "When Modulo", value = "whenmod" }
                    }
                }
            }
        };
    }
    
    public List<string> GetCategoryNames()
    {
        List<string> names = new List<string>();
        foreach (var category in menuData)
        {
            names.Add(category.label);
        }
        return names;
    }
    
    public List<string> GetGroupNames(string categoryId)
    {
        List<string> names = new List<string>();
        MenuCategory category = menuData.Find(c => c.id == categoryId);
        if (category != null)
        {
            foreach (var group in category.groups)
            {
                names.Add(group.label);
            }
        }
        return names;
    }
    
    public List<MenuItem> GetItems(string categoryId, string groupId)
    {
        List<MenuItem> items = new List<MenuItem>();
        MenuCategory category = menuData.Find(c => c.id == categoryId);
        if (category != null)
        {
            MenuGroup group = category.groups.Find(g => g.id == groupId);
            if (group != null)
            {
                items = group.items;
            }
        }
        return items;
    }
    
    public string GetCurrentCategory()
    {
        return currentCategory;
    }
    
    public void SetCurrentCategory(string categoryId)
    {
        currentCategory = categoryId;
    }
    
    public string GetItemValue(string categoryId, string groupId, string itemId)
    {
        MenuCategory category = menuData.Find(c => c.id == categoryId);
        if (category != null)
        {
            MenuGroup group = category.groups.Find(g => g.id == groupId);
            if (group != null)
            {
                MenuItem item = group.items.Find(i => i.id == itemId);
                if (item != null)
                {
                    return item.value;
                }
            }
        }
        return itemId; // Fallback to itemId if not found
    }
    
    public string GetItemLabel(string categoryId, string groupId, string itemId)
    {
        MenuCategory category = menuData.Find(c => c.id == categoryId);
        if (category != null)
        {
            MenuGroup group = category.groups.Find(g => g.id == groupId);
            if (group != null)
            {
                MenuItem item = group.items.Find(i => i.id == itemId);
                if (item != null)
                {
                    return item.label;
                }
            }
        }
        return itemId; // Fallback to itemId if not found
    }
    
    public string GetGroupColor(string categoryId, string groupId)
    {
        MenuCategory category = menuData.Find(c => c.id == categoryId);
        if (category != null)
        {
            MenuGroup group = category.groups.Find(g => g.id == groupId);
            if (group != null)
            {
                return group.color;
            }
        }
        return "#00d9ff"; // Default color
    }
    
    public string GetItemColor(string categoryId, string groupId, string itemId)
    {
        MenuCategory category = menuData.Find(c => c.id == categoryId);
        if (category != null)
        {
            MenuGroup group = category.groups.Find(g => g.id == groupId);
            if (group != null)
            {
                MenuItem item = group.items.Find(i => i.id == itemId);
                if (item != null && !string.IsNullOrEmpty(item.color))
                {
                    return item.color;
                }
                return group.color; // Use group color if item doesn't have one
            }
        }
        return "#00d9ff"; // Default color
    }
    
    public string GetGroupIcon(string nodeType)
    {
        switch (nodeType)
        {
            case "DrumSymbol": return "🥁";
            case "Instrument": return "🎵";
            case "s": return "🔊";
            case "note": return "🎼";
            case "bank": return "🗄";
            case "stack": return "📦";
            case "struct": return "🏗";
            case "slow": return "🐢";
            case "fast": return "⚡";
            case "add": return "➕";
            case "every": return "📅";
            case "whenmod": return "🔢";
            default: return "🎵";
        }
    }
    
    public string GetItemIcon(string instrumentId)
    {
        switch (instrumentId)
        {
            // Drums
            case "bd": return "🥁";
            case "sd": return "🪘";
            case "hh": return "🎩";
            case "oh": return "🎩";
            case "rim": return "🪘";
            
            // Percussion
            case "clap": return "👏";
            case "conga": return "🥁";
            case "bongo": return "🥁";
            case "cowbell": return "🔔";
            case "shaker_large": return "🎵";
            case "shaker_small": return "🎵";
            
            // Melodic
            case "piano": return "🎹";
            case "kalimba": return "🎵";
            case "sawtooth": return "🔊";
            case "sine": return "🔊";
            case "square": return "🔊";
            
            // Notes
            case "c4": return "🎵";
            case "d4": return "🎵";
            case "e4": return "🎵";
            case "f4": return "🎵";
            case "g4": return "🎵";
            case "a4": return "🎵";
            case "b4": return "🎵";
            
            // Banks
            case "tr909": return "🥁";
            case "tr808": return "🥁";
            case "tr707": return "🥁";
            case "linn": return "🥁";
            
            // Combinators
            case "stack": return "📦";
            case "cat": return "📦";
            case "group": return "📦";
            case "struct": return "🏗";
            case "slow": return "🐢";
            case "fast": return "⚡";
            case "off": return "🕒";
            case "add": return "➕";
            case "scale": return "🎵";
            case "every": return "📅";
            case "whenmod": return "🔢";
            
            default: return "🎵";
        }
    }
    
    public string InsertPatternElement(string currentPattern, string element, string position = "end")
    {
        if (string.IsNullOrEmpty(currentPattern))
        {
            return element;
        }
        
        switch (position)
        {
            case "start":
                return element + " " + currentPattern;
            case "end":
                return currentPattern + " " + element;
            case "replace":
                return element;
            default:
                return currentPattern + " " + element;
        }
    }
    
    public string WrapPattern(string pattern, string wrapper, string position = "outside")
    {
        switch (wrapper)
        {
            case "group":
                return "[" + pattern + "]";
            case "alternate":
                return "<" + pattern + ">";
            case "euclidean":
                return pattern + "(3,8)"; // Default euclidean rhythm
            case "multiply":
                return pattern + "*2"; // Multiply by 2
            case "divide":
                return pattern + "/2"; // Divide by 2
            case "probability":
                return pattern + "?0.5"; // 50% probability
            case "degrade":
                return pattern + ":0.5"; // 50% degrade
            default:
                return pattern;
        }
    }
}