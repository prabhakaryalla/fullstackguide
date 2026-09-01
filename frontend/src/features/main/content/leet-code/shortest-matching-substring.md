# 3455. Shortest Matching Substring

**Difficulty:** Medium
**Category:** String, String Matching, Hash Function, Two Pointers

## Problem
You are given a string `s` and a pattern `p` that contains exactly two `*` wildcard characters (each `*` matches any sequence of characters, including empty). The pattern splits into three literal parts `p1`, `*`, `p2`, `*`, `p3` (some parts possibly empty). Return the length of the shortest substring of `s` that matches the pattern (i.e., contains `p1` then `p2` then `p3` in order, non-overlapping and in that sequence), or -1 if no match exists.

## Approach
Split the pattern on `*` to get three literal segments `p1`, `p2`, `p3`. Find all starting positions where `p1` occurs in `s` (using an efficient substring search like Z-function or KMP), all positions where `p2` occurs, and all positions where `p3` occurs. Then, for every occurrence of `p1` ending at position `e1`, find the earliest occurrence of `p2` starting at or after `e1`, then the earliest occurrence of `p3` starting at or after the end of that `p2` occurrence, using binary search over sorted occurrence lists. Track the minimum total substring length `(p3_start + p3.Length) - p1_start` across all valid combinations.

## C# Solution

```csharp
public class Solution 
{
    public int ShortestMatchingSubstring(string s, string p) 
    {
        var parts = p.Split('*');
        string p1 = parts[0], p2 = parts[1], p3 = parts[2];

        var occ1 = FindAllOccurrences(s, p1);
        var occ2 = FindAllOccurrences(s, p2);
        var occ3 = FindAllOccurrences(s, p3);

        if (occ1.Count == 0 || occ2.Count == 0 || occ3.Count == 0) return -1;

        int best = int.MaxValue;

        foreach (int start1 in occ1)
        {
            int end1 = start1 + p1.Length;

            int idx2 = LowerBound(occ2, end1);
            if (idx2 == occ2.Count) continue;
            int start2 = occ2[idx2];
            int end2 = start2 + p2.Length;

            int idx3 = LowerBound(occ3, end2);
            if (idx3 == occ3.Count) continue;
            int start3 = occ3[idx3];
            int end3 = start3 + p3.Length;

            int length = end3 - start1;
            if (length < best) best = length;
        }

        return best == int.MaxValue ? -1 : best;
    }

    private System.Collections.Generic.List<int> FindAllOccurrences(string s, string pattern)
    {
        var result = new System.Collections.Generic.List<int>();
        if (pattern.Length == 0)
        {
            for (int i = 0; i <= s.Length; i++) result.Add(i);
            return result;
        }

        int idx = 0;
        while (true)
        {
            int found = s.IndexOf(pattern, idx, System.StringComparison.Ordinal);
            if (found == -1) break;
            result.Add(found);
            idx = found + 1;
        }

        return result;
    }

    private int LowerBound(System.Collections.Generic.List<int> list, int value)
    {
        int lo = 0, hi = list.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (list[mid] < value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(n * m) for substring search in the worst case (using built-in IndexOf), plus O(n log n) for binary searches; can be improved to O(n) using KMP/Z-function
- **Space:** O(n) for storing occurrence lists
