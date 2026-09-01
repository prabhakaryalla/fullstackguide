# 1703. Minimum Adjacent Swaps for K Consecutive Ones

**Difficulty:** Hard
**Category:** Array, Greedy, Prefix Sum

## Problem

Given a binary array `nums` and an integer `k`, return the minimum number of adjacent swaps required to move `k` ones together into a contiguous block (in any position).

### Example

```
Input: nums = [1,0,0,1,0,1], k = 2
Output: 1
```

## Approach

Take the positions of all ones and adjust each by subtracting its index (`p[i] = pos[i] - i`), which converts the swap-cost into the classic "minimize sum of absolute deviations from the median" problem for every window of `k` consecutive ones. Using prefix sums of the adjusted positions, evaluate each window in O(1) by comparing the middle element (median) against the left and right halves.

## C# Solution

```csharp
public class Solution
{
    public int MinMoves(int[] nums, int k)
    {
        var ones = new List<int>();
        for (int i = 0; i < nums.Length; i++)
            if (nums[i] == 1) ones.Add(i);

        int n = ones.Count;
        long[] p = new long[n];
        for (int i = 0; i < n; i++) p[i] = ones[i] - i;

        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + p[i];

        long best = long.MaxValue;
        for (int i = 0; i + k <= n; i++)
        {
            int mid = i + k / 2;
            long medianVal = p[mid];
            long left = medianVal * (mid - i) - (prefix[mid] - prefix[i]);
            long right = (prefix[i + k] - prefix[mid + 1]) - medianVal * (i + k - 1 - mid);
            best = Math.Min(best, left + right);
        }

        return (int)best;
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the number of ones.
- **Space:** `O(n)` for the position and prefix-sum arrays.
