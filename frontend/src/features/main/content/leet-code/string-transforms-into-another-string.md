# 1153. String Transforms Into Another String

**Difficulty:** Hard
**Category:** Hash Table, String

## Problem

Given two strings `str1` and `str2` of the same length, determine if `str1` can be converted into `str2` by repeatedly replacing every occurrence of a character with another character (a global find-and-replace across the whole string, which can be applied multiple times).

### Example

```
Input: str1 = "aabcc", str2 = "ccdee"
Output: true
```

## Approach

Build a required mapping from each character of `str1` to the corresponding character of `str2`; if any source character would need to map to two different targets, conversion is impossible. If the mapping is consistent, conversion is always possible *unless* it requires a cyclic swap of characters (e.g. `a -> b` and `b -> a`) with no spare, unused letter available as a temporary staging character. Since there are 26 lowercase letters, having fewer than 26 distinct characters used in `str2` guarantees a free temporary letter exists to break any cycle.

## C# Solution

```csharp
public class Solution
{
    public bool CanConvert(string str1, string str2)
    {
        if (str1 == str2) return true;

        var mapping = new Dictionary<char, char>();

        for (int i = 0; i < str1.Length; i++)
        {
            char a = str1[i], b = str2[i];
            if (mapping.TryGetValue(a, out char mapped))
            {
                if (mapped != b) return false;
            }
            else
            {
                mapping[a] = b;
            }
        }

        return new HashSet<char>(str2).Count < 26;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` (bounded by the 26-letter alphabet).
