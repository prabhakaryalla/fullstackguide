# 2945. Find Maximum Non-decreasing Array Length

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming, Monotonic Stack

## Problem

You are given an array `nums`. You can perform operations to merge adjacent elements by replacing them with their sum. Return the maximum length of the resulting non-decreasing array after any number of operations.

### Example

```
Input: nums = [5,2,2]
Output: 1
Explanation: Merge all elements into one: [9].
```

## Approach

Use dynamic programming where `dp[i]` represents the maximum length achievable ending at position i with a certain sum. For each position, try extending from previous positions by checking if the sum from previous position to current maintains non-decreasing order. Use binary search or monotonic structures to optimize.

## C# Solution

```csharp
public class Solution 
{
    public int FindMaximumLength(int[] nums) 
    {
        int n = nums.Length;
        long[] prefix = new long[n + 1];
        int[] dp = new int[n + 1];
        long[] last = new long[n + 1];
        
        for (int i = 0; i < n; i++) 
        {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        
        int j = 0;
        for (int i = 1; i <= n; i++) 
        {
            while (j < i && last[j] <= prefix[i]) 
            {
                j++;
            }
            j--;
            
            dp[i] = dp[j] + 1;
            last[i] = prefix[i] + (prefix[i] - prefix[j]);
        }
        
        return dp[n];
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
