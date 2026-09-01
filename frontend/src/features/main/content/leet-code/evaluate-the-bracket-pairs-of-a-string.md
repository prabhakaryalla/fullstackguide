# 1807. Evaluate the Bracket Pairs of a String

**Difficulty:** Medium
**Category:** Hash Table, String

## Problem

Given a string `s` containing `(key)` tokens and a list `knowledge` of `[key, value]` pairs, replace every `(key)` in `s` with its corresponding `value`, or `"?"` if the key is not present in `knowledge`.

### Example

```
Input: s = "(name)is(age)yearsold", knowledge = [["name","bob"],["age","two"]]
Output: "bobistwoyearsold"
```

## Approach

Build a dictionary from `knowledge` for O(1) lookups. Scan `s` once: when a `(` is found, locate the matching `)` and look up the enclosed key, appending its value or `"?"`; otherwise, append the current character unchanged.

## C# Solution

```csharp
public class Solution
{
    public string Evaluate(string s, IList<IList<string>> knowledge)
    {
        var map = new Dictionary<string, string>();
        foreach (var pair in knowledge) map[pair[0]] = pair[1];

        var sb = new StringBuilder();
        int i = 0, n = s.Length;

        while (i < n)
        {
            if (s[i] == '(')
            {
                int close = s.IndexOf(')', i);
                string key = s.Substring(i + 1, close - i - 1);
                sb.Append(map.TryGetValue(key, out var value) ? value : "?");
                i = close + 1;
            }
            else
            {
                sb.Append(s[i]);
                i++;
            }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n + m)` where `n` is the length of `s` and `m` is the total length of `knowledge`.
- **Space:** `O(m)` for the dictionary plus `O(n)` for the output.
