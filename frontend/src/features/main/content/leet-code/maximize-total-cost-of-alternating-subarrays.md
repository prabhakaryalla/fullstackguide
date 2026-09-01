# 3196. Maximize Total Cost of Alternating Subarrays

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem
Given an integer array `nums`, partition it into one or more contiguous subarrays. The "cost" of a subarray is computed by taking its elements and alternately adding and subtracting them from left to right (first element added, second subtracted, third added, and so on). Maximize the sum of costs across all subarrays in the partition.

## Approach
Use dynamic programming while scanning left to right, tracking two running values: `keep`, the maximum total cost achievable ending at the current position when treating the current number as continuing the alternating pattern (added) from the previous subarray, and `flip`, the maximum achievable when the current number instead starts as the second ("subtracted") position of an alternating pattern relative to the running total. At each step, update `keep` to be the best of the previous `keep` or `flip` plus the current number (since starting fresh at this position always allows adding the number as a new subarray's first, positive term), and update `flip` to be the previous `keep` minus the current number (continuing the alternating pattern by subtracting). The final answer is the maximum of `keep` and `flip` after processing all elements.

## C# Solution
```csharp
public class Solution {
    public long MaximumTotalCost(int[] nums) {
        long keep = nums[0];
        long flip = nums[0];

        for (int i = 1; i < nums.Length; i++) {
            long keepCurr = Math.Max(keep, flip) + nums[i];
            long flipCurr = keep - nums[i];
            keep = keepCurr;
            flip = flipCurr;
        }

        return Math.Max(keep, flip);
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
