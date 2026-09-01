# 3745. Maximize Expression of Three Elements

**Difficulty:** Easy
**Category:** Array, Dynamic Programming

## Problem

Given an integer array `nums`, choose three indices `i < j < k` to maximize the value of `nums[i] - nums[j] + nums[k]`. Return the maximum possible value.

### Example

nums = [5,1,9,2,8] → choosing i=2(9), j=3(2), k=4(8) gives 9-2+8=15, which is best.

## Approach

Precompute `maxLeft[j]`: the maximum value among `nums[0..j-1]`, and `maxRight[j]`: the maximum value among `nums[j+1..n-1]`. For every middle index `j`, the best achievable value is `maxLeft[j] - nums[j] + maxRight[j]`. Take the maximum over all valid `j`.

## C# Solution

```csharp
public class Solution 
{
    public int MaximizeExpression(int[] nums) 
    {
        int n = nums.Length;
        int[] maxLeft = new int[n];
        int[] maxRight = new int[n];

        maxLeft[0] = int.MinValue;
        for (int i = 1; i < n; i++) 
        {
            maxLeft[i] = Math.Max(maxLeft[i - 1], nums[i - 1]);
        }

        maxRight[n - 1] = int.MinValue;
        for (int i = n - 2; i >= 0; i--) 
        {
            maxRight[i] = Math.Max(maxRight[i + 1], nums[i + 1]);
        }

        int best = int.MinValue;
        for (int j = 1; j < n - 1; j++) 
        {
            best = Math.Max(best, maxLeft[j] - nums[j] + maxRight[j]);
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
