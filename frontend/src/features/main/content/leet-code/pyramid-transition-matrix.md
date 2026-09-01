# 756. Pyramid Transition Matrix

**Difficulty:** Medium
**Category:** Bit Manipulation, Depth-First Search, Hash Table, String

## Problem

Given a `bottom` row of colored blocks (as a string) and a list of `allowed` triples where the first two characters are a pair of adjacent blocks and the third character is the block that can be placed on top of them, determine whether a full pyramid can be built up to a single block at the top.

### Example

```
Input: bottom = "BCD", allowed = ["BCG","CDE","GEA","FFF"]
Output: true
```

## Approach

Group the allowed rules into a map from each adjacent pair to the list of blocks that can sit above them. Use backtracking DFS to build each row above the current one: for every adjacent pair in the current row, try every valid block that can be placed above it, recursing to try further pairs. Once a full new row is built, recurse on it as the new "bottom" row; success is reached when a row of length 1 is formed.

## C# Solution

```csharp
public class Solution
{
    public bool PyramidTransition(string bottom, IList<string> allowed)
    {
        var map = new Dictionary<string, List<char>>();
        foreach (var rule in allowed)
        {
            var key = rule.Substring(0, 2);
            if (!map.ContainsKey(key)) map[key] = new List<char>();
            map[key].Add(rule[2]);
        }

        return Dfs(bottom, new StringBuilder(), 0, map);
    }

    private bool Dfs(string bottom, StringBuilder current, int index, Dictionary<string, List<char>> map)
    {
        if (bottom.Length == 1) return true;

        if (index == bottom.Length - 1)
            return Dfs(current.ToString(), new StringBuilder(), 0, map);

        var key = bottom.Substring(index, 2);
        if (!map.ContainsKey(key)) return false;

        foreach (var c in map[key])
        {
            current.Append(c);
            if (Dfs(bottom, current, index + 1, map)) return true;
            current.Length--;
        }

        return false;
    }
}
```

## Complexity

- **Time:** Exponential in the worst case, bounded by the small fixed alphabet and row lengths in practice.
- **Space:** `O(n)` for the recursion stack, where `n` is the length of `bottom`.
