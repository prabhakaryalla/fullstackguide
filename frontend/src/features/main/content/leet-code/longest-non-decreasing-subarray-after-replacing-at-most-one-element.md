# 3738. Longest Non-Decreasing Subarray After Replacing at Most One Element

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an integer array `nums`, you may change the value of at most one element to any integer. Return the length of the longest subarray that can be made non-decreasing this way.

### Example

nums = [5,1,2,3,9,4] → changing the 9 merges [1,2,3,_,4] into a non-decreasing run of length 5.

## Approach

Precompute `left[i]`: the length of the longest non-decreasing run ending at `i`, and `right[i]`: the length of the longest non-decreasing run starting at `i`. For every position `i`, consider replacing `nums[i]`: it can bridge `left[i-1]` and `right[i+1]` whenever `nums[i-1] <= nums[i+1]`, giving a merged length of `left[i-1] + 1 + right[i+1]`. Also consider simply extending a single run by 1 for boundary cases. Take the maximum over all positions.

## C# Solution

```csharp
public class Solution 
{
    public int LongestNonDecreasingSubarray(int[] nums) 
    {
        int n = nums.Length;
        int[] left = new int[n];
        int[] right = new int[n];

        left[0] = 1;
        for (int i = 1; i < n; i++) 
        {
            left[i] = nums[i] >= nums[i - 1] ? left[i - 1] + 1 : 1;
        }

        right[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--) 
        {
            right[i] = nums[i] <= nums[i + 1] ? right[i + 1] + 1 : 1;
        }

        int best = 1;
        for (int i = 0; i < n; i++) 
        {
            int candidate = Math.Max(1, (i > 0 ? left[i - 1] : 0) + 1);
            candidate = Math.Max(candidate, (i < n - 1 ? right[i + 1] : 0) + 1);
            if (i > 0 && i < n - 1 && nums[i - 1] <= nums[i + 1]) 
            {
                candidate = Math.Max(candidate, left[i - 1] + 1 + right[i + 1]);
            }
            best = Math.Max(best, Math.Max(candidate, left[i]));
        }
        return Math.Min(best, n);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
