# 3511. Make a Positive Array

**Difficulty:** Medium
**Category:** Array, Greedy, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` that may contain negative numbers. In one operation, you may choose an index and replace `nums[i]` with any value you like. Return the minimum number of operations needed so that every contiguous subarray of length 3 has a strictly positive sum.

### Example
Input: `nums = [1, -2, 1, -2, 1]`
Output: `1`
Explanation: The window `[1, -2, 1]` (indices 0-2) sums to 0, which is not positive, so index 2 must be fixed. Replacing `nums[2]` with a sufficiently large value makes every subsequent length-3 window (which all include this fixed index or are otherwise unaffected) automatically positive. One operation suffices.

## Approach
Scan the array while maintaining the sum of the current length-3 window, effectively treating any previously "fixed" index as an enormous value (since once fixed, its exact value is irrelevant — it only needs to guarantee positivity of every window it belongs to). Whenever the running window sum drops to zero or below, the current index must be fixed: count an operation, and conceptually set that index (and the tracked window sum) to a very large placeholder value so all following windows containing it are automatically satisfied.

## C# Solution

```csharp
public class Solution {
    public int MakeArrayPositive(int[] nums) {
        const long infinity = 1_000_000_000_000_000_000L;
        int n = nums.Length;
        long[] values = new long[n];
        for (int i = 0; i < n; i++) values[i] = nums[i];

        int operations = 0;
        long windowSum = n > 1 ? values[0] + values[1] : 0;

        for (int i = 2; i < n; i++) {
            long a = values[i - 2], b = values[i - 1], c = values[i];
            windowSum = Math.Min(windowSum + c, a + b + c);
            if (windowSum <= 0) {
                values[i] = infinity;
                windowSum = infinity;
                operations++;
            }
        }

        return operations;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
