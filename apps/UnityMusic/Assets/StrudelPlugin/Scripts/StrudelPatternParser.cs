using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;

/// <summary>
/// Parser for Strudel mini-notation patterns
/// </summary>
public class StrudelPatternParser
{
    // Supported operators and their precedence
    private Dictionary<string, int> operatorPrecedence = new Dictionary<string, int>
    {
        {"rest", 1},
        {"hold", 1},
        {"fastcat", 1},
        {"replicate", 2},
        {"multiply", 3},
        {"divide", 3},
        {"elongate", 3},
        {"probability", 3},
        {"degradeBy", 3},
        {"euclidean", 4},
        {"bjorklund", 4},
        {"range", 6},
        {"polymeter", 7},
        {"alternate", 8},
        {"grouping", 10}
    };

    /// <summary>
    /// Parse a Strudel pattern string into a structured format
    /// </summary>
    /// <param name="pattern">Strudel pattern string</param>
    /// <returns>Parsed pattern structure</returns>
    public StrudelPattern ParsePattern(string pattern)
    {
        StrudelPattern result = new StrudelPattern();
        result.rawPattern = pattern;
        result.parsedElements = new List<StrudelPatternElement>();

        // Enhanced parsing that handles more complex patterns
        List<string> tokens = TokenizePattern(pattern);
        
        foreach (string token in tokens)
        {
            StrudelPatternElement pe = ParseToken(token);
            if (pe != null)
            {
                result.parsedElements.Add(pe);
            }
        }

        return result;
    }

    /// <summary>
    /// Tokenize a Strudel pattern into individual elements
    /// </summary>
    /// <param name="pattern">Pattern string</param>
    /// <returns>List of tokens</returns>
    private List<string> TokenizePattern(string pattern)
    {
        List<string> tokens = new List<string>();
        string currentToken = "";
        bool inGroup = false;
        bool inAlternate = false;
        bool inEuclidean = false;
        char groupChar = ' ';
        
        for (int i = 0; i < pattern.Length; i++)
        {
            char c = pattern[i];
            
            // Handle grouping
            if (c == '[' || c == '<' || c == '(' || c == '{')
            {
                if (inGroup)
                {
                    currentToken += c;
                }
                else
                {
                    if (!string.IsNullOrEmpty(currentToken))
                    {
                        tokens.Add(currentToken);
                        currentToken = "";
                    }
                    currentToken += c;
                    inGroup = true;
                    groupChar = GetMatchingCloseChar(c);
                }
            }
            else if (c == groupChar && inGroup)
            {
                currentToken += c;
                tokens.Add(currentToken);
                currentToken = "";
                inGroup = false;
            }
            else if (inGroup)
            {
                currentToken += c;
            }
            // Handle operators
            else if (c == '~' || c == '_' || c == '*' || c == '/' || c == '!' || c == '@' || c == '?' || c == ':')
            {
                if (!string.IsNullOrEmpty(currentToken))
                {
                    tokens.Add(currentToken);
                    currentToken = "";
                }
                
                // Handle multi-character operators
                if (c == '*' || c == '/' || c == '!' || c == '@' || c == '?' || c == ':')
                {
                    // Look ahead for numbers after operator
                    string op = c.ToString();
                    if (i + 1 < pattern.Length && char.IsDigit(pattern[i + 1]))
                    {
                        op += pattern[i + 1];
                        i++; // Skip next character
                        if (i + 1 < pattern.Length && char.IsDigit(pattern[i + 1]))
                        {
                            op += pattern[i + 1];
                            i++; // Skip next character
                        }
                    }
                    tokens.Add(op);
                }
                else
                {
                    tokens.Add(c.ToString());
                }
            }
            else if (c == ' ')
            {
                if (!string.IsNullOrEmpty(currentToken))
                {
                    tokens.Add(currentToken);
                    currentToken = "";
                }
            }
            else
            {
                currentToken += c;
            }
        }
        
        if (!string.IsNullOrEmpty(currentToken))
        {
            tokens.Add(currentToken);
        }
        
        return tokens;
    }

    private char GetMatchingCloseChar(char openChar)
    {
        switch (openChar)
        {
            case '[': return ']';
            case '<': return '>';
            case '(': return ')';
            case '{': return '}';
            default: return ' ';
        }
    }

    /// <summary>
    /// Parse a single token into a pattern element
    /// </summary>
    /// <param name="token">Token string</param>
    /// <returns>Pattern element</returns>
    private StrudelPatternElement ParseToken(string token)
    {
        StrudelPatternElement pe = new StrudelPatternElement();
        pe.raw = token;
        
        // Check for operators
        if (token == "~")
        {
            pe.type = "rest";
        }
        else if (token == "_")
        {
            pe.type = "hold";
        }
        else if (token.StartsWith("<") && token.EndsWith(">"))
        {
            pe.type = "alternate";
            pe.value = token.Substring(1, token.Length - 2);
            // Parse nested pattern
            pe.children = ParsePattern(pe.value).parsedElements;
        }
        else if (token.StartsWith("[") && token.EndsWith("]"))
        {
            pe.type = "group";
            pe.value = token.Substring(1, token.Length - 2);
            // Parse nested pattern
            pe.children = ParsePattern(pe.value).parsedElements;
        }
        else if (token.StartsWith("(") && token.EndsWith(")"))
        {
            pe.type = "euclidean";
            pe.value = token.Substring(1, token.Length - 2);
            // Parse euclidean parameters
            string[] paramsStr = pe.value.Split(',');
            if (paramsStr.Length >= 2)
            {
                pe.amount = int.Parse(paramsStr[0].Trim());
                int steps = int.Parse(paramsStr[1].Trim());
                // Additional parameters would be handled here
            }
        }
        else if (token.Contains("*"))
        {
            pe.type = "multiply";
            string[] parts = token.Split('*');
            pe.value = parts[0];
            pe.amount = int.Parse(parts[1]);
        }
        else if (token.Contains("/"))
        {
            pe.type = "divide";
            string[] parts = token.Split('/');
            pe.value = parts[0];
            pe.amount = int.Parse(parts[1]);
        }
        else if (token.EndsWith("!"))
        {
            pe.type = "replicate";
            pe.value = token.Substring(0, token.Length - 1);
            pe.amount = int.Parse(token.Substring(token.Length - 1));
        }
        else if (token.EndsWith("@"))
        {
            pe.type = "elongate";
            pe.value = token.Substring(0, token.Length - 1);
            pe.amount = int.Parse(token.Substring(token.Length - 1));
        }
        else if (token.EndsWith("?"))
        {
            pe.type = "probability";
            pe.value = token.Substring(0, token.Length - 1);
            // Parse probability value
            if (token.Length > 1)
            {
                pe.amount = (int)(float.Parse(pe.value) * 100);
            }
        }
        else if (token.EndsWith(":"))
        {
            pe.type = "degrade";
            pe.value = token.Substring(0, token.Length - 1);
            // Parse degrade amount
            if (token.Length > 1)
            {
                pe.amount = (int)(float.Parse(pe.value) * 100);
            }
        }
        else
        {
            pe.type = "sound";
            pe.value = token;
        }
        
        return pe;
    }

    /// <summary>
    /// Validate a Strudel pattern
    /// </summary>
    /// <param name="pattern">Pattern to validate</param>
    /// <returns>True if pattern is valid</returns>
    public bool ValidatePattern(string pattern)
    {
        // Check for balanced brackets
        if (!HasBalancedBrackets(pattern))
        {
            Debug.LogError("Unbalanced brackets in pattern: " + pattern);
            return false;
        }

        // Check for valid operators
        // This will be expanded with more validation rules

        return true;
    }

    private bool HasBalancedBrackets(string pattern)
    {
        Stack<char> stack = new Stack<char>();
        Dictionary<char, char> bracketPairs = new Dictionary<char, char>
        {
            {'[', ']'},
            {'<', '>'},
            {'(', ')'},
            {'{', '}'}
        };

        foreach (char c in pattern)
        {
            if (bracketPairs.ContainsKey(c))
            {
                stack.Push(c);
            }
            else if (bracketPairs.ContainsValue(c))
            {
                if (stack.Count == 0 || bracketPairs[stack.Pop()] != c)
                {
                    return false;
                }
            }
        }

        return stack.Count == 0;
    }

    /// <summary>
    /// Parse mini-notation within method arguments
    /// </summary>
    /// <param name="methodCall">Method call string</param>
    /// <returns>Parsed method call with mini-notation resolved</returns>
    public MethodCall ParseMethodCall(string methodCall)
    {
        MethodCall call = new MethodCall();
        
        // Extract method name and arguments
        int parenStart = methodCall.IndexOf('(');
        int parenEnd = methodCall.LastIndexOf(')');
        
        if (parenStart > 0 && parenEnd > parenStart)
        {
            call.methodName = methodCall.Substring(0, parenStart);
            string argsStr = methodCall.Substring(parenStart + 1, parenEnd - parenStart - 1);
            
            // Split arguments (simple comma split for now)
            string[] args = argsStr.Split(',');
            foreach (string arg in args)
            {
                string trimmedArg = arg.Trim();
                
                // Check if argument contains mini-notation
                if (trimmedArg.StartsWith("'" ) && trimmedArg.EndsWith("'") && 
                    (trimmedArg.Contains("<") || trimmedArg.Contains("[") || 
                     trimmedArg.Contains("*") || trimmedArg.Contains("~") || 
                     trimmedArg.Contains("_")))
                {
                    // Parse mini-notation
                    string notation = trimmedArg.Substring(1, trimmedArg.Length - 2);
                    StrudelPattern parsed = ParsePattern(notation);
                    call.arguments.Add(new MethodArgument
                    {
                        type = "pattern",
                        value = notation,
                        parsedPattern = parsed
                    });
                }
                else
                {
                    // Regular argument
                    call.arguments.Add(new MethodArgument
                    {
                        type = "value",
                        value = trimmedArg
                    });
                }
            }
        }
        
        return call;
    }
}

/// <summary>
/// Represents a parsed Strudel pattern
/// </summary>
public class StrudelPattern
{
    public string rawPattern;
    public List<StrudelPatternElement> parsedElements;
}

/// <summary>
/// Represents an element in a Strudel pattern (specific to Strudel parsing)
/// </summary>
public class StrudelPatternElement
{
    public string type; // "sound", "rest", "hold", "group", "alternate", "multiply", etc.
    public string raw; // Original string
    public string value; // Main value
    public int amount; // For operators like multiply
    public List<StrudelPatternElement> children; // For nested patterns
}

/// <summary>
/// Represents a parsed method call with mini-notation
/// </summary>
public class MethodCall
{
    public string methodName;
    public List<MethodArgument> arguments = new List<MethodArgument>();
}

/// <summary>
/// Represents an argument in a method call
/// </summary>
public class MethodArgument
{
    public string type; // "value" or "pattern"
    public string value; // Raw value
    public StrudelPattern parsedPattern; // Parsed pattern if type is "pattern"
}