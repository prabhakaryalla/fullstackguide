# 1031. Maximum Sum of Two Non-Overlapping Subarrays

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Sliding Window

## Problem

Given an integer array `nums` and two integers `firstLen` and `secondLen`, return the maximum sum of elements in two non-overlapping subarrays, one of length `firstLen` and the other of length `secondLen`. The subarrays may appear in either order within `nums`.

### Example

```
Input: nums = [0,6,5,2,2,5,1,9,4], firstLen = 1, secondLen = 2
Output: 20
```

## Approach

Build a prefix sum array so any window sum is `O(1)`. Because the two subarrays can appear in either order, compute the best answer twice — once assuming the length-`firstLen` window comes before the length-`secondLen` window, and once for the reverse — and take the max. For a fixed order (window `L` of length `lenL` before window `M` of length `lenM`), slide `M`'s window across valid end positions while tracking the best `L`-window sum seen so far to its left, adding it to the current `M`-window sum at each step.

## C# Solution

```csharp
public class Solution
{
    public int MaxSumTwoNoOverlap(int[] nums, int firstLen, int secondLen)
    {
        int n = nums.Length;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

        return Math.Max(
            Best(prefix, firstLen, secondLen),
            Best(prefix, secondLen, firstLen));
    }

    private int Best(int[] prefix, int lenL, int lenM)
    {
        int n = prefix.Length - 1;
        int maxL = 0;
        int result = 0;

        for (int i = lenL + lenM; i <= n; i++)
        {
            int lWindowEnd = i - lenM;
            maxL = Math.Max(maxL, prefix[lWindowEnd] - prefix[lWindowEnd - lenL]);

            int mWindowSum = prefix[i] - prefix[i - lenM];
            result = Math.Max(result, maxL + mWindowSum);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — a constant number of linear passes.
- **Space:** `O(n)` for the prefix sum array.
