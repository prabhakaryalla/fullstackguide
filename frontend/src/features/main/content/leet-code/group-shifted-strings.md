# 249. Group Shifted Strings

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given an array of strings `strings`, group together all strings that belong to the same shifting sequence (each letter is shifted by the same amount, cyclically, to obtain the next string, e.g. `"abc" -> "bcd" -> ... -> "xyz"`). Return the groups in any order.

### Example

```
Input: strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]
```

### Constraints

- `1 <= strings.length <= 200`
- `strings[i]` consists of lowercase English letters.

## Approach

Two strings belong to the same group if and only if the cyclic difference between consecutive characters is identical throughout. Compute a normalized key for each string by subtracting the first character's value (mod 26) from every character, then group strings that produce the same key using a hash map.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<string>> GroupStrings(string[] strings)
    {
        var groups = new Dictionary<string, List<string>>();

        foreach (var s in strings)
        {
            var key = new char[s.Length];
            for (int i = 0; i < s.Length; i++)
            {
                int diff = (s[i] - s[0] + 26) % 26;
                key[i] = (char)('a' + diff);
            }

            var keyStr = new string(key);
            if (!groups.TryGetValue(keyStr, out var list))
                groups[keyStr] = list = new List<string>();
            list.Add(s);
        }

        return groups.Values.Cast<IList<string>>().ToList();
    }
}
```

## Complexity

- **Time:** `O(n * k)` — where `n` is the number of strings and `k` is the average string length.
- **Space:** `O(n * k)` — for the grouping map.
