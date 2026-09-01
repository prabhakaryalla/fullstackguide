# 745. Prefix and Suffix Search

**Difficulty:** Hard
**Category:** Design, Trie, String

## Problem

Design a `WordFilter` supporting `F(pref, suff)`, which returns the largest index of a word in the given dictionary that starts with `pref` and ends with `suff`, or `-1` if none matches.

### Example

```
Input:
["WordFilter", "f"]
[[["apple"]], ["a", "e"]]
Output:
[null, 0]
```

## Approach

Precompute, for every word and every combination of one of its prefixes and one of its suffixes, a combined key (e.g., `"prefix#suffix"`) mapping to that word's index. Since words are processed in increasing index order, simply overwriting the map entry for each key as later words are processed automatically leaves the largest matching index stored by the time construction finishes. `F` then becomes a single dictionary lookup on the combined key.

## C# Solution

```csharp
public class WordFilter
{
    private readonly Dictionary<string, int> weightByCombinedKey = new();

    public WordFilter(string[] words)
    {
        for (int index = 0; index < words.Length; index++)
        {
            var word = words[index];
            int n = word.Length;

            for (int prefixLen = 1; prefixLen <= n; prefixLen++)
            {
                for (int suffixLen = 1; suffixLen <= n; suffixLen++)
                {
                    var key = word.Substring(0, prefixLen) + "#" + word.Substring(n - suffixLen);
                    weightByCombinedKey[key] = index;
                }
            }
        }
    }

    public int F(string pref, string suff)
    {
        var key = pref + "#" + suff;
        return weightByCombinedKey.GetValueOrDefault(key, -1);
    }
}
```

## Complexity

- **Time:** `O(n * L^2)` construction, where `L` is the average word length; `O(1)` per `F` call.
- **Space:** `O(n * L^2)` for the combined-key map.
