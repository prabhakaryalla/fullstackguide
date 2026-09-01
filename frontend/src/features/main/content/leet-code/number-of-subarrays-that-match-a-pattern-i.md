# 3034. Number of Subarrays That Match a Pattern I

**Difficulty:** Medium
**Category:** Array, String Matching

## Problem

You are given a 0-indexed integer array `nums` of size `n`, and a 0-indexed integer array `pattern` of size `m` consisting of values `-1`, `0`, and `1`. A subarray `nums[i..i+m]` (of size `m + 1`) matches `pattern` if, for every `k` from `0` to `m - 1`:

- `pattern[k] == 1` requires `nums[i+k+1] > nums[i+k]`.
- `pattern[k] == 0` requires `nums[i+k+1] == nums[i+k]`.
- `pattern[k] == -1` requires `nums[i+k+1] < nums[i+k]`.

Return the number of matching subarrays.

## Approach

Convert `nums` into a "trend" sequence of the same three symbols (`1`, `0`, `-1`) by comparing every adjacent pair — this collapses the matching condition into an exact substring match problem: count how many times `pattern` occurs as a contiguous subsequence of the trend sequence. Use the Knuth–Morris–Pratt (KMP) algorithm for a linear-time exact count.

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

    // Returns the number of occurrences of `pattern` in `nums`.
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
