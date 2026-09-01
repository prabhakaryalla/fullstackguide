# 3649. Number of Perfect Pairs

**Difficulty:** Medium
**Category:** Array, Two Pointers, Sorting

## Problem
You are given an integer array `nums`. A pair of indices `(i, j)` is called a "perfect pair" if, letting `a = |nums[i]|` and `b = |nums[j]|` with `a <= b` (WLOG), the condition `b - a <= min(a, b)` — equivalently `|nums[i]| <= 2 * min(|nums[i]|, |nums[j]|)`-type constraint derived from the original problem: for every pair, `|nums[i] - nums[j]| <= min(|nums[i]|, |nums[j]|)` and `|nums[i] + nums[j]| >= max(|nums[i]|, |nums[j]|)` — holds. Count the number of index pairs `(i, j)` with `i < j` that are perfect pairs.

## Approach
Replace every value with its absolute value and sort the resulting array. For sorted absolute values, the condition `|a - b| <= min(a, b)` simplifies (since after sorting `a <= b`) to `b - a <= a`, i.e., `b <= 2a`. The other condition `a + b >= b` is always true for non-negative values. So after sorting absolute values, for each index `i`, use two pointers / binary search to count how many indices `j > i` satisfy `nums[j] <= 2 * nums[i]`. Use a sliding window (two pointers) since the array is sorted: as `i` increases, the valid right boundary for `2 * nums[i]` also moves monotonically, so a two-pointer sweep runs in O(n log n) total (due to sort) plus O(n) for the sweep.

## C# Solution

```csharp
public class Solution 
{
    public long CountPerfectPairs(int[] nums) 
    {
        int n = nums.Length;
        long[] abs = new long[n];
        for (int i = 0; i < n; i++) abs[i] = Math.Abs((long)nums[i]);
        Array.Sort(abs);

        long count = 0;
        int right = 0;
        for (int i = 0; i < n; i++)
        {
            if (right < i + 1) right = i + 1;
            while (right < n && abs[right] <= 2 * abs[i]) right++;
            count += right - (i + 1);
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
