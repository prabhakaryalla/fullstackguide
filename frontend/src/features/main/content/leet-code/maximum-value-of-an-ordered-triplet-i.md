# 2873. Maximum Value of an Ordered Triplet I

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 0-indexed integer array `nums`. Return the maximum value over all triplets of indices `(i, j, k)` such that `i < j < k`. The value of a triplet is `(nums[i] - nums[j]) * nums[k]`.

If all possible triplets have a negative value, return 0.

### Example

```
Input: nums = [12,6,1,2,7]
Output: 77
Explanation:
Triplet (0, 2, 4): (12 - 1) * 7 = 77
This is the maximum value.
```

## Approach

Brute force: Try all possible triplets with three nested loops. For each valid `(i, j, k)` with `i < j < k`, compute `(nums[i] - nums[j]) * nums[k]` and track the maximum.

For small arrays, this O(n³) approach is acceptable.

## C# Solution

```csharp
public class Solution
{
    public long MaximumTripletValue(int[] nums)
    {
        int n = nums.Length;
        long maxValue = 0;
        
        for (int i = 0; i < n - 2; i++)
        {
            for (int j = i + 1; j < n - 1; j++)
            {
                for (int k = j + 1; k < n; k++)
                {
                    long value = (long)(nums[i] - nums[j]) * nums[k];
                    maxValue = Math.Max(maxValue, value);
                }
            }
        }
        
        return maxValue;
    }
}
```

## Complexity

- **Time:** `O(n^3)` — three nested loops.
- **Space:** `O(1)`.
