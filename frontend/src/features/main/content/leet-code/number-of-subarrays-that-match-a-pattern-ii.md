# 3036. Number of Subarrays That Match a Pattern II

**Difficulty:** Hard
**Category:** Array, String Matching

## Problem

This is the larger-constraints version of [Number of Subarrays That Match a Pattern I](number-of-subarrays-that-match-a-pattern-i.md): given `nums` and a `pattern` of `-1`/`0`/`1` values describing required rises, falls, or ties between consecutive elements, count how many subarrays of `nums` match `pattern`, where both arrays can now be much larger.

## Approach

Nothing changes algorithmically — converting `nums` into a trend sequence and running Knuth–Morris–Pratt to count exact occurrences of `pattern` is already linear time, so the same approach from Part I scales directly to the larger constraints.

## C# Solution

```csharp
public class Solution {
    public int CountMatchingSubarrays(int[] nums, int[] pattern) {
        int[] numsPattern = GetNumsPattern(nums);
        return Kmp(numsPattern, pattern);
    }

    private int GetNum(int a, int b) {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    private int[] GetNumsPattern(int[] nums) {
        int[] numsPattern = new int[nums.Length - 1];
        for (int i = 1; i < nums.Length; i++)
            numsPattern[i - 1] = GetNum(nums[i - 1], nums[i]);
        return numsPattern;
    }

    private int Kmp(int[] nums, int[] pattern) {
        int[] lps = GetLps(pattern);
        int res = 0, i = 0, j = 0;
        while (i < nums.Length) {
            if (nums[i] == pattern[j]) {
                i++;
                j++;
                if (j == pattern.Length) {
                    res++;
                    j = lps[j - 1];
                }
            } else if (j > 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
        return res;
    }

    private int[] GetLps(int[] pattern) {
        int[] lps = new int[pattern.Length];
        for (int i = 1, j = 0; i < pattern.Length; i++) {
            while (j > 0 && pattern[j] != pattern[i])
                j = lps[j - 1];
            if (pattern[i] == pattern[j])
                lps[i] = ++j;
        }
        return lps;
    }
}
```

## Complexity

- Time: O(n + m) — building the trend sequence plus a linear KMP search.
- Space: O(n + m) — the trend sequence and the LPS table.
