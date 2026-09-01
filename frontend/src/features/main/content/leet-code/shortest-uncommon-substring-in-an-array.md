# 3076. Shortest Uncommon Substring in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

You are given an array of strings `arr`. For each string `arr[i]`, find its shortest substring that does **not** appear as a substring of any **other** string in `arr` (ties broken by lexicographic order); if no such substring exists, use the empty string. Return an array of these answers, one per input string.

## Approach

Maintain a global frequency map of every substring across all strings in `arr`. For each string `arr[i]`: temporarily remove its own substrings' contributions (so we don't count a string's substring as "shared" with itself), then scan all its substrings looking for the shortest one whose global count is now `0` (meaning no other string contains it), breaking ties by length then lexicographic order. Restore its contribution afterward before moving to the next string.

## C# Solution

```csharp
public class Solution {
    public string[] ShortestSubstrings(string[] arr) {
        var count = new Dictionary<string, int>();
        foreach (string s in arr)
            Add(s, count);

        string[] ans = new string[arr.Length];
        for (int i = 0; i < arr.Length; i++) {
            Remove(arr[i], count);
            ans[i] = GetMinSub(arr[i], count);
            Add(arr[i], count);
        }

        return ans;
    }

    private List<string> GetSubstrings(string s) {
        var substrings = new List<string>();
        for (int i = 0; i < s.Length; i++)
            for (int j = i + 1; j <= s.Length; j++)
                substrings.Add(s.Substring(i, j - i));
        return substrings;
    }

    private void Add(string s, Dictionary<string, int> count) {
        foreach (string sub in GetSubstrings(s))
            count[sub] = count.GetValueOrDefault(sub) + 1;
    }

    private void Remove(string s, Dictionary<string, int> count) {
        foreach (string sub in GetSubstrings(s))
            count[sub] = count[sub] - 1;
    }

    private string GetMinSub(string s, Dictionary<string, int> count) {
        string minSub = "";
        foreach (string sub in GetSubstrings(s)) {
            if (count.GetValueOrDefault(sub) > 0)
                continue;
            if (minSub.Length == 0 || sub.Length < minSub.Length ||
                (sub.Length == minSub.Length && string.CompareOrdinal(sub, minSub) < 0))
                minSub = sub;
        }
        return minSub;
    }
}
```

## Complexity

- Time: O(n * L^2) — each string of length L generates O(L^2) substrings.
- Space: O(n * L^2) — the global substring frequency map.
