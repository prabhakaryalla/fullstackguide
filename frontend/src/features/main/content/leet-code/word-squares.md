# 425. Word Squares

**Difficulty:** Hard
**Category:** String, Backtracking, Trie
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a set of words (without duplicates), return all word squares that can be built from them. A word square is a sequence of words where the `k`th row and `k`th column read the same string, for every `k`.

### Example

```
Input: words = ["area","lead","wall","lady","ball"]
Output: [["wall","area","lead","lady"],["ball","area","lead","lady"]]
```

### Constraints

- `1 <= words.length <= 1000`
- All words have the same length.

## Approach

Precompute a map from every possible prefix to the list of words starting with that prefix, enabling fast lookup of candidates. Build each square incrementally with backtracking: at each step, the next word must start with the prefix formed by the corresponding column-index character of every word placed so far, so look up that prefix's candidate list and try each one in turn.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<string, List<string>> prefixMap;

    public IList<IList<string>> WordSquares(string[] words)
    {
        prefixMap = new Dictionary<string, List<string>>();

        foreach (var word in words)
        {
            for (int i = 0; i <= word.Length; i++)
            {
                var prefix = word.Substring(0, i);
                if (!prefixMap.TryGetValue(prefix, out var list))
                {
                    list = new List<string>();
                    prefixMap[prefix] = list;
                }
                list.Add(word);
            }
        }

        var result = new List<IList<string>>();
        int n = words[0].Length;

        foreach (var word in words)
        {
            var square = new List<string> { word };
            Backtrack(square, n, result);
        }

        return result;
    }

    private void Backtrack(List<string> square, int n, List<IList<string>> result)
    {
        if (square.Count == n)
        {
            result.Add(new List<string>(square));
            return;
        }

        int index = square.Count;
        var prefix = new string(square.Select(word => word[index]).ToArray());

        if (!prefixMap.TryGetValue(prefix, out var candidates)) return;

        foreach (var candidate in candidates)
        {
            square.Add(candidate);
            Backtrack(square, n, result);
            square.RemoveAt(square.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** Bounded by the number of valid prefix-matching candidates explored at each depth; efficient in practice due to the prefix map pruning.
- **Space:** `O(words.Length * wordLength)` for the prefix map.
