# 1087. Brace Expansion

**Difficulty:** Medium
**Category:** String, Backtracking, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` representing a list of words with possible alternatives in braces (e.g. `"{a,b}c{d,e}f"`), return every possible resulting word, sorted lexicographically.

### Example

```
Input: s = "{a,b}c{d,e}f"
Output: ["acdf","acef","bcdf","bcef"]
```

## Approach

Parse `s` into an ordered list of "groups", where each group is either a single fixed character or a sorted list of alternative characters from a `{...}` block. Then backtrack across the groups in order, choosing one character from each group's alternatives (already sorted) and appending it to a running string; when all groups are consumed, record the completed word. Because each group's own options are pre-sorted and groups are combined in original left-to-right order, the results come out in lexicographic order automatically.

## C# Solution

```csharp
public class Solution
{
    public string[] Expand(string s)
    {
        var groups = new List<List<char>>();
        int i = 0;

        while (i < s.Length)
        {
            if (s[i] == '{')
            {
                var options = new List<char>();
                i++;
                while (s[i] != '}')
                {
                    if (s[i] != ',') options.Add(s[i]);
                    i++;
                }
                options.Sort();
                groups.Add(options);
                i++;
            }
            else
            {
                groups.Add(new List<char> { s[i] });
                i++;
            }
        }

        var results = new List<string>();
        Backtrack(groups, 0, new StringBuilder(), results);
        return results.ToArray();
    }

    private void Backtrack(List<List<char>> groups, int index, StringBuilder current, List<string> results)
    {
        if (index == groups.Count)
        {
            results.Add(current.ToString());
            return;
        }

        foreach (var c in groups[index])
        {
            current.Append(c);
            Backtrack(groups, index + 1, current, results);
            current.Length--;
        }
    }
}
```

## Complexity

- **Time:** `O(product of group sizes * word length)` for generating all combinations.
- **Space:** `O(groups)` recursion depth, plus output size.
