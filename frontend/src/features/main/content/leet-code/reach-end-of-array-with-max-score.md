# 3282. Reach End of Array With Max Score

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

You are given a 0-indexed integer array `nums` of length `n`. Your goal is to start at index `0` and reach index `n - 1`. From index `i`, you can jump to any index `j > i`, and this jump adds `(j - i) * nums[i]` to your score. Return the maximum possible total score to reach the last index.

### Example

```
Input: nums = [4,3,1,3,2]
Output: 16
```

## Approach

A jump of length `(j - i)` at value `nums[i]` contributes the same total as taking `(j - i)` unit steps each contributing `nums[i]`. Therefore, the maximum total score equals the sum, for every index from `0` to `n - 2`, of the maximum value seen so far (inclusive of the current index). Track a running maximum while scanning left to right and accumulate it at every position except the last.

## C# Solution

```csharp
public class Solution 
{
    public long FindMaximumScore(IList<int> nums) 
    {
        long score = 0;
        int maxSoFar = nums[0];

        for (int i = 0; i < nums.Count - 1; i++) 
        {
            if (nums[i] > maxSoFar) maxSoFar = nums[i];
            score += maxSoFar;
        }

        return score;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
