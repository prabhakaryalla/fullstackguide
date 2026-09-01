# 2091. Removing Minimum and Maximum From Array

**Difficulty:** Medium
**Category:** Array, Greedy, Two Pointers

## Problem

Given a 0-indexed integer array `nums`, you may repeatedly remove either the first or the last element of the array (each removal counts as one "deletion"). Return *the minimum number of deletions needed so that both the minimum and the maximum value of the original array have been removed*.

## Approach

Find the index of the minimum value and the index of the maximum value. There are exactly three efficient strategies to remove both:
1. Remove everything from the front up to and including whichever of the two indices is farther from the start (a single front-truncation covering both).
2. Remove everything from the back up to and including whichever of the two indices is farther from the end (a single back-truncation covering both).
3. Remove one from the front (up to the smaller index, whichever needs fewer front-removals) and one from the back (up to the other index, whichever needs fewer back-removals) — i.e., "pinch" from both ends.

Compute the deletion count for all three strategies and return the minimum.

## C# Solution

```csharp
public class Solution
{
    public int MinimumDeletions(int[] nums)
    {
        int n = nums.Length;
        int minIdx = 0, maxIdx = 0;

        for (int i = 1; i < n; i++)
        {
            if (nums[i] < nums[minIdx]) minIdx = i;
            if (nums[i] > nums[maxIdx]) maxIdx = i;
        }

        int lo = Math.Min(minIdx, maxIdx);
        int hi = Math.Max(minIdx, maxIdx);

        int fromFront = hi + 1;
        int fromBack = n - lo;
        int fromBoth = (lo + 1) + (n - hi);

        return Math.Min(fromFront, Math.Min(fromBack, fromBoth));
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
