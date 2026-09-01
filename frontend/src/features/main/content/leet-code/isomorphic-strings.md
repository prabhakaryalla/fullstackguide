# 205. Isomorphic Strings

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given two strings `s` and `t`, determine if they are isomorphic — every character in `s` can be replaced to get `t`, with a consistent one-to-one mapping (no two characters map to the same character, and the mapping must hold in both directions).

### Example

```
s = "egg", t = "add" -> true
s = "foo", t = "bar" -> false
```

## Approach

Maintain two dictionaries, one mapping `s` characters to `t` characters and one mapping `t` characters back to `s` characters. Walk both strings together; at each position, if a mapping already exists for either character, it must match the current pairing exactly, otherwise a new mapping is recorded.

## C# Solution

```csharp
public class Solution
{
    public bool IsIsomorphic(string s, string t)
    {
        if (s.Length != t.Length) return false;

        var mapST = new Dictionary<char, char>();
        var mapTS = new Dictionary<char, char>();

        for (int i = 0; i < s.Length; i++)
        {
            char a = s[i], b = t[i];

            if (mapST.TryGetValue(a, out char mappedB) && mappedB != b) return false;
            if (mapTS.TryGetValue(b, out char mappedA) && mappedA != a) return false;

            mapST[a] = b;
            mapTS[b] = a;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)` — bounded by the character set size.
