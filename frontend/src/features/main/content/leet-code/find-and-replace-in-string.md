# 833. Find And Replace in String

**Difficulty:** Medium
**Category:** Array, String, Sorting

## Problem

Given a string `s` and parallel arrays `indices`, `sources`, and `targets`, for each `i` check whether `s` starting at `indices[i]` matches `sources[i]`; if so, replace that matched substring with `targets[i]`. Replacements are guaranteed not to overlap. Return the resulting string.

### Example

```
Input: s = "abcd", indices = [0,2], sources = ["a","cd"], targets = ["eee","ffff"]
Output: "eeebffff"
```

## Approach

Sort the replacement operations by their starting index. Sweep through them in order, copying any untouched characters from the current position up to the next operation's index. At each operation's index, check whether the corresponding source string actually matches `s` at that position; if it matches, append the target string instead and advance past the matched source's length, otherwise leave that position untouched (it will be copied later). After processing all operations, append any remaining trailing characters.

## C# Solution

```csharp
public class Solution
{
    public string FindReplaceString(string s, int[] indices, string[] sources, string[] targets)
    {
        int n = indices.Length;
        var order = Enumerable.Range(0, n).OrderBy(i => indices[i]).ToArray();

        var result = new StringBuilder();
        int pos = 0;

        foreach (var i in order)
        {
            int index = indices[i];

            if (index > pos)
            {
                result.Append(s, pos, index - pos);
                pos = index;
            }

            if (index == pos && MatchesAt(s, index, sources[i]))
            {
                result.Append(targets[i]);
                pos += sources[i].Length;
            }
        }

        if (pos < s.Length)
            result.Append(s, pos, s.Length - pos);

        return result.ToString();
    }

    private bool MatchesAt(string s, int index, string source)
    {
        if (index + source.Length > s.Length) return false;
        return s.Substring(index, source.Length) == source;
    }
}
```

## Complexity

- **Time:** `O(n log n + total length)`.
- **Space:** `O(n)` for the sort order and result string.
