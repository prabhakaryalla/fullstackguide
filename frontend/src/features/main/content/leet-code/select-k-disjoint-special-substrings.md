# 3458. Select K Disjoint Special Substrings

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Greedy

## Problem
A substring is called "special" if it contains only one distinct character, and that character does not appear anywhere in `s` outside the substring's boundaries (i.e., all occurrences of that character in the entire string `s` are confined within the substring's index range). Given a string `s` and an integer `k`, determine whether it is possible to select `k` disjoint (non-overlapping) special substrings.

## Approach
For each character, find the first and last occurrence index in `s`; if all occurrences of that character fall within `[first, last]` contiguously with no "gap" character interleaved differently, the maximal special substring for that character is `s[first..last]`, but only if within that range the character truly spans exactly those occurrences (any special substring must be a run where the character's full occurrence range doesn't overlap differently with another character's range). Compute, for each character, its first and last occurrence; treat these as intervals `[first, last]`; a substring is "special" precisely on such intervals where the interval doesn't properly overlap partially with another character's interval (nesting is allowed if fully contained, used as smaller disjoint pieces). Use an interval scheduling / greedy approach: sort all valid special intervals by their right endpoint, and greedily select the maximum number of non-overlapping ones; return whether that count is at least `k`.

## C# Solution

```csharp
public class Solution 
{
    public bool MaxSubstringLength(string s, int k) 
    {
        if (k == 0) return true;

        int n = s.Length;
        int[] first = new int[26];
        int[] last = new int[26];
        System.Array.Fill(first, -1);

        for (int i = 0; i < n; i++)
        {
            int c = s[i] - 'a';
            if (first[c] == -1) first[c] = i;
            last[c] = i;
        }

        // Expand each character's interval to fully contain any other character's interval
        // that partially overlaps with it (merge overlapping ranges), since such regions
        // cannot be split into independent special substrings.
        var intervals = new System.Collections.Generic.List<(int l, int r)>();
        for (int c = 0; c < 26; c++)
        {
            if (first[c] == -1) continue;
            int l = first[c], r = last[c];
            bool changed = true;
            while (changed)
            {
                changed = false;
                for (int oc = 0; oc < 26; oc++)
                {
                    if (oc == c || first[oc] == -1) continue;
                    // if other char's range partially overlaps (not fully outside, not fully inside)
                    if (first[oc] <= r && last[oc] >= l)
                    {
                        int newL = System.Math.Min(l, first[oc]);
                        int newR = System.Math.Max(r, last[oc]);
                        if (newL != l || newR != r)
                        {
                            l = newL;
                            r = newR;
                            changed = true;
                        }
                    }
                }
            }
            intervals.Add((l, r));
        }

        // Remove duplicate merged intervals, keep only maximal/valid ones excluding full string trivial case
        var distinct = new System.Collections.Generic.HashSet<(int, int)>(intervals);
        var candidates = new System.Collections.Generic.List<(int l, int r)>();
        foreach (var iv in distinct)
        {
            if (iv.Item2 - iv.Item1 + 1 < n) candidates.Add(iv);
        }

        candidates.Sort((a, b) => a.r.CompareTo(b.r));

        int count = 0;
        int lastEnd = -1;
        foreach (var (l, r) in candidates)
        {
            if (l > lastEnd)
            {
                count++;
                lastEnd = r;
            }
        }

        return count >= k;
    }
}
```

## Complexity

- **Time:** O(26^2 * n) in the worst case for interval merging, dominated by O(n) with small constant factor from the fixed alphabet size
- **Space:** O(26) for interval bookkeeping
