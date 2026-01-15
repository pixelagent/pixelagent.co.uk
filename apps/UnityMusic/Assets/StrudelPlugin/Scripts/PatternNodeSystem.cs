using UnityEngine;
using System.Collections.Generic;
using System.Text.RegularExpressions;

/// <summary>
/// Represents a single pattern element like "0", "1", "2", "3", "4", "~", etc.
/// </summary>
[System.Serializable]
public class PatternNode
{
    [Tooltip("The pattern element (e.g., 0, 1, 2, 3, 4, ~)")]
    public string element = "0";
    
    [Tooltip("Optional modifiers like @2, !3, etc.")]
    public string modifiers = "";
    
    [Tooltip("Optional duration multiplier")]
    public float duration = 1.0f;
    
    [Tooltip("Optional velocity/level")]
    public float velocity = 1.0f;
    
    [Tooltip("Optional probability (0-1)")]
    public float probability = 1.0f;
    
    public PatternNode(string element = "0", string modifiers = "", float duration = 1.0f, float velocity = 1.0f, float probability = 1.0f)
    {
        this.element = element;
        this.modifiers = modifiers;
        this.duration = duration;
        this.velocity = velocity;
        this.probability = probability;
    }
    
    public override string ToString()
    {
        string result = element;
        if (!string.IsNullOrEmpty(modifiers))
            result += modifiers;
        return result;
    }
}

/// <summary>
/// Represents a group of pattern elements like [0,1] or [0,3]
/// </summary>
[System.Serializable]
public class PatternGroup
{
    [Tooltip("List of nodes within this group")]
    public List<PatternNode> nodes = new List<PatternNode>();
    
    [Tooltip("Group modifiers like @2, !3, etc.")]
    public string groupModifiers = "";
    
    [Tooltip("Whether this group should be played as a chord (all notes simultaneously)")]
    public bool isChord = false;
    
    public PatternGroup()
    {
        nodes = new List<PatternNode>();
    }
    
    public PatternGroup(List<PatternNode> nodes, bool isChord = false, string groupModifiers = "")
    {
        this.nodes = nodes;
        this.isChord = isChord;
        this.groupModifiers = groupModifiers;
    }
    
    public void AddNode(PatternNode node)
    {
        nodes.Add(node);
    }
    
    public override string ToString()
    {
        string result = "";
        if (isChord)
        {
            // For chords, join with commas
            for (int i = 0; i < nodes.Count; i++)
            {
                if (i > 0) result += ",";
                result += nodes[i].ToString();
            }
        }
        else
        {
            // For sequences, join with spaces
            for (int i = 0; i < nodes.Count; i++)
            {
                if (i > 0) result += " ";
                result += nodes[i].ToString();
            }
        }
        
        if (!string.IsNullOrEmpty(groupModifiers))
            result += groupModifiers;
            
        return result;
    }
}

/// <summary>
/// Represents a complete pattern with nodes and groups
/// </summary>
[System.Serializable]
public class PatternSequence
{
    [Tooltip("List of pattern elements - can be individual nodes or groups")]
    public List<PatternElement> elements = new List<PatternElement>();
    
    [Tooltip("Global pattern modifiers")]
    public string globalModifiers = "";
    
    public PatternSequence()
    {
        elements = new List<PatternElement>();
    }
    
    public void AddElement(PatternElement element)
    {
        elements.Add(element);
    }
    
    public void AddNode(PatternNode node)
    {
        elements.Add(new PatternElement(node));
    }
    
    public void AddGroup(PatternGroup group)
    {
        elements.Add(new PatternElement(group));
    }
    
    public override string ToString()
    {
        string result = "";
        for (int i = 0; i < elements.Count; i++)
        {
            if (i > 0) result += " ";
            result += elements[i].ToString();
        }
        
        if (!string.IsNullOrEmpty(globalModifiers))
            result += globalModifiers;
            
        return result;
    }
}

/// <summary>
/// Union type that can be either a PatternNode or PatternGroup
/// </summary>
[System.Serializable]
public class PatternElement
{
    public enum ElementType
    {
        Node,
        Group
    }
    
    public ElementType type = ElementType.Node;
    
    [SerializeReference]
    public PatternNode node;
    
    [SerializeReference]
    public PatternGroup group;
    
    public PatternElement()
    {
        type = ElementType.Node;
        node = new PatternNode();
    }
    
    public PatternElement(PatternNode node)
    {
        type = ElementType.Node;
        this.node = node;
    }
    
    public PatternElement(PatternGroup group)
    {
        type = ElementType.Group;
        this.group = group;
    }
    
    public override string ToString()
    {
        switch (type)
        {
            case ElementType.Node:
                return node.ToString();
            case ElementType.Group:
                return "[" + group.ToString() + "]";
            default:
                return "";
        }
    }
}

/// <summary>
/// Utility class for parsing and converting between string patterns and node-based patterns
/// </summary>
public static class PatternConverter
{
    /// <summary>
    /// Converts a string pattern to a PatternSequence
    /// </summary>
    public static PatternSequence ParsePattern(string patternString)
    {
        PatternSequence sequence = new PatternSequence();
        
        if (string.IsNullOrEmpty(patternString))
            return sequence;
        
        // Remove outer brackets if present
        string cleanPattern = patternString.Trim();
        if (cleanPattern.StartsWith("<") && cleanPattern.EndsWith(">"))
            cleanPattern = cleanPattern.Substring(1, cleanPattern.Length - 2);
        
        // Split by spaces, but be careful with groups
        List<string> tokens = TokenizePattern(cleanPattern);
        
        foreach (string token in tokens)
        {
            if (string.IsNullOrEmpty(token))
                continue;
                
            if (token.StartsWith("[") && token.EndsWith("]"))
            {
                // Parse as group
                PatternGroup group = ParseGroup(token);
                sequence.AddGroup(group);
            }
            else
            {
                // Parse as individual node
                PatternNode node = ParseNode(token);
                sequence.AddNode(node);
            }
        }
        
        return sequence;
    }
    
    /// <summary>
    /// Converts a PatternSequence back to a string
    /// </summary>
    public static string PatternToString(PatternSequence sequence)
    {
        return sequence.ToString();
    }
    
    /// <summary>
    /// Tokenizes a pattern string, respecting groups
    /// </summary>
    public static List<string> TokenizePattern(string pattern)
    {
        List<string> tokens = new List<string>();
        int i = 0;
        
        while (i < pattern.Length)
        {
            char c = pattern[i];
            
            if (c == '[')
            {
                // Find matching closing bracket
                int start = i;
                int bracketCount = 1;
                i++;
                
                while (i < pattern.Length && bracketCount > 0)
                {
                    if (pattern[i] == '[') bracketCount++;
                    else if (pattern[i] == ']') bracketCount--;
                    i++;
                }
                
                if (bracketCount == 0)
                {
                    tokens.Add(pattern.Substring(start, i - start));
                }
            }
            else if (char.IsWhiteSpace(c))
            {
                // Skip whitespace
                i++;
            }
            else
            {
                // Find the end of this token
                int start = i;
                while (i < pattern.Length && !char.IsWhiteSpace(pattern[i]) && pattern[i] != '[')
                {
                    i++;
                }
                
                if (i > start)
                {
                    tokens.Add(pattern.Substring(start, i - start));
                }
            }
        }
        
        return tokens;
    }
    
    /// <summary>
    /// Parses a single node token like "0", "1@2", "2!3", "~"
    /// </summary>
    public static PatternNode ParseNode(string token)
    {
        string element = "";
        string modifiers = "";
        
        // Find the first modifier character
        int modifierIndex = token.IndexOfAny(new char[] { '@', '!', '*' });
        
        if (modifierIndex >= 0)
        {
            element = token.Substring(0, modifierIndex);
            modifiers = token.Substring(modifierIndex);
        }
        else
        {
            element = token;
        }
        
        return new PatternNode(element, modifiers);
    }
    
    /// <summary>
    /// Parses a group token like "[0,1]", "[0,3]@2"
    /// </summary>
    public static PatternGroup ParseGroup(string token)
    {
        // Remove brackets
        string content = token.Substring(1, token.Length - 2);
        
        // Check for group modifiers
        int modifierIndex = content.IndexOfAny(new char[] { '@', '!', '*' });
        string groupModifiers = "";
        
        if (modifierIndex >= 0)
        {
            groupModifiers = content.Substring(modifierIndex);
            content = content.Substring(0, modifierIndex);
        }
        
        // Check if it's a chord (contains commas) or sequence (contains spaces)
        bool isChord = content.Contains(",");
        List<PatternNode> nodes = new List<PatternNode>();
        
        string[] parts;
        if (isChord)
        {
            parts = content.Split(',');
        }
        else
        {
            parts = content.Split(new char[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
        }
        
        foreach (string part in parts)
        {
            if (!string.IsNullOrEmpty(part))
            {
                nodes.Add(ParseNode(part.Trim()));
            }
        }
        
        return new PatternGroup(nodes, isChord, groupModifiers);
    }
}