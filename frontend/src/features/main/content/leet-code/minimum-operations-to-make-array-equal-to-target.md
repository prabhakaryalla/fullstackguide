# 3229. Minimum Operations to Make Array Equal to Target

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Greedy, Monotonic Stack, Stack

## Problem
Given two integer arrays `nums` and `target` of the same length, in one operation you may select any contiguous subarray of `nums` and either increment every element in it by 1, or decrement every element in it by 1. Return the minimum number of operations needed to transform `nums` into `target`.

## Approach
Consider the array of required differences `diff[i] = target[i] - nums[i]`. The minimum number of range increment/decrement operations needed to achieve a target difference array is a classic problem solvable by processing differences left to right and accumulating cost based on transitions between consecutive difference values, similar to painting fences with minimum brush strokes. Start with the absolute value of the first difference as the base cost. Then, for each subsequent position, compare the current and previous differences: if both are non-negative, add the extra positive amount needed beyond what the previous difference already covered; if both are non-positive, add the extra negative amount needed beyond what was already covered; if they have opposite signs (one requires increasing, the other decreasing), the full absolute difference must be added fresh, since the ranges can't overlap constructively across a sign change.

## C# Solution
```csharp
public class Solution {
    public long MinimumOperations(int[] nums, int[] target) {
        long ans = Math.Abs(nums[0] - target[0]);

        for (int i = 1; i < nums.Length; i++) {
            int currDiff = target[i] - nums[i];
            int prevDiff = target[i - 1] - nums[i - 1];
            if (currDiff >= 0 && prevDiff >= 0)
                ans += Math.Max(0, currDiff - prevDiff);
            else if (currDiff <= 0 && prevDiff <= 0)
                ans += Math.Max(0, Math.Abs(currDiff) - Math.Abs(prevDiff));
            else
                ans += Math.Abs(currDiff);
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
