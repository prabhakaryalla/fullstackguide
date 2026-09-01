# 1898. Maximum Number of Removable Characters

**Difficulty:** Medium
**Category:** Array, String, Binary Search, Greedy

## Problem

Given strings `s` and `p` (a subsequence of `s`) and an array `removable` of indices into `s`, find the maximum `k` such that removing the characters at the first `k` indices of `removable` still leaves `p` as a subsequence of the resulting string.

### Example

```
Input: s = "abcacb", p = "ab", removable = [3,1,0]
Output: 2
```

## Approach

Feasibility (whether `p` remains a subsequence after removing the first `k` indices) is monotonic in `k` — if it holds for `k`, it also holds for any smaller `k`. This allows binary searching for the largest feasible `k`. For a candidate `k`, mark the first `k` indices in `removable` as removed, then greedily scan `s` left to right skipping removed positions and matching characters against `p` in order; if all of `p` is matched, the candidate is feasible.

## C# Solution

```csharp
public class Solution
{
    public int MaximumRemovals(string s, string p, int[] removable)
    {
        int lo = 0, hi = removable.Length;
        int best = 0;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (IsSubsequenceAfterRemoval(s, p, removable, mid))
            {
                best = mid;
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return best;
    }

    private bool IsSubsequenceAfterRemoval(string s, string p, int[] removable, int k)
    {
        var removed = new bool[s.Length];
        for (int i = 0; i < k; i++) removed[removable[i]] = true;

        int j = 0;
        for (int i = 0; i < s.Length && j < p.Length; i++)
        {
            if (!removed[i] && s[i] == p[j]) j++;
        }

        return j == p.Length;
    }
}
```

## Complexity

- **Time:** `O(n log(removable.Length))` where `n` is the length of `s`.
- **Space:** `O(n)` for the removed-index marker array.
