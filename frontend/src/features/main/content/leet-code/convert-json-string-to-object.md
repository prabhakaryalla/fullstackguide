# 2759. Convert JSON String to Object

**Difficulty:** Hard
**Category:** Closure, Stack, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Implement `JSONParse(s)` that parses a valid JSON string `s` into its corresponding value — a nested combination of objects, arrays, strings, numbers, booleans, and `null` — without relying on a built-in JSON parser.

### Example
```
Input: '{"a":1,"b":[true,null,"x"]}'
Output: an object equivalent to { a: 1, b: [true, null, "x"] }
```

## Approach
Implemented as a hand-written recursive-descent parser. At each position, peek at the current character to decide whether to parse an object, array, string, boolean, `null`, or number, recursing into nested structures and advancing a shared index as each token is consumed. Objects map to `Dictionary<string, object>` and arrays map to `List<object>`.

## C# Solution

```csharp
public class Solution
{
    public static object JsonParse(string s)
    {
        int i = 0;
        return ParseValue(s, ref i);
    }

    private static object ParseValue(string s, ref int i)
    {
        SkipWhitespace(s, ref i);
        char c = s[i];

        if (c == '{') return ParseObject(s, ref i);
        if (c == '[') return ParseArray(s, ref i);
        if (c == '"') return ParseString(s, ref i);
        if (c == 't' || c == 'f') return ParseBool(s, ref i);
        if (c == 'n') { i += 4; return null; }
        return ParseNumber(s, ref i);
    }

    private static Dictionary<string, object> ParseObject(string s, ref int i)
    {
        var result = new Dictionary<string, object>();
        i++; // consume '{'
        SkipWhitespace(s, ref i);
        if (s[i] == '}') { i++; return result; }

        while (true)
        {
            SkipWhitespace(s, ref i);
            string key = ParseString(s, ref i);
            SkipWhitespace(s, ref i);
            i++; // consume ':'
            result[key] = ParseValue(s, ref i);
            SkipWhitespace(s, ref i);
            if (s[i] == ',') { i++; continue; }
            i++; // consume '}'
            break;
        }

        return result;
    }

    private static List<object> ParseArray(string s, ref int i)
    {
        var result = new List<object>();
        i++; // consume '['
        SkipWhitespace(s, ref i);
        if (s[i] == ']') { i++; return result; }

        while (true)
        {
            result.Add(ParseValue(s, ref i));
            SkipWhitespace(s, ref i);
            if (s[i] == ',') { i++; continue; }
            i++; // consume ']'
            break;
        }

        return result;
    }

    private static string ParseString(string s, ref int i)
    {
        i++; // consume opening quote
        var sb = new StringBuilder();

        while (s[i] != '"')
        {
            if (s[i] == '\\')
            {
                i++;
                sb.Append(s[i] switch
                {
                    'n' => '\n',
                    't' => '\t',
                    'r' => '\r',
                    '"' => '"',
                    '\\' => '\\',
                    _ => s[i],
                });
            }
            else
            {
                sb.Append(s[i]);
            }
            i++;
        }

        i++; // consume closing quote
        return sb.ToString();
    }

    private static bool ParseBool(string s, ref int i)
    {
        if (s[i] == 't') { i += 4; return true; }
        i += 5;
        return false;
    }

    private static double ParseNumber(string s, ref int i)
    {
        int start = i;
        while (i < s.Length && (char.IsDigit(s[i]) || s[i] is '-' or '+' or '.' or 'e' or 'E'))
        {
            i++;
        }
        return double.Parse(s[start..i], CultureInfo.InvariantCulture);
    }

    private static void SkipWhitespace(string s, ref int i)
    {
        while (i < s.Length && char.IsWhiteSpace(s[i])) i++;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the input string.
- **Space:** O(n).
