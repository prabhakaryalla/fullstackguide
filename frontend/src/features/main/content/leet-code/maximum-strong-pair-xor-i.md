# 2932. Maximum Strong Pair XOR I

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem

You are given an array `nums`. A pair (x, y) is strong if `|x - y| <= min(x, y)`. Return the maximum XOR of any strong pair.

### Example

```
Input: nums = [1,2,3,4,5]
Output: 7
Explanation: The pair (3,4) is strong since |3-4|=1 <= min(3,4)=3, and 3 XOR 4 = 7.
```

## Approach

Use brute force to check all pairs. For each pair, verify if it's strong, then compute XOR and track the maximum.

## C# Solution

```csharp
public class Solution 
{
    public int MaximumStrongPairXor(int[] nums) 
    {
        int maxXor = 0;
        int n = nums.Length;
        
        for (int i = 0; i < n; i++) 
        {
            for (int j = i; j < n; j++) 
            {
                int x = nums[i], y = nums[j];
                if (Math.Abs(x - y) <= Math.Min(x, y)) 
                {
                    maxXor = Math.Max(maxXor, x ^ y);
                }
            }
        }
        
        return maxXor;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(1)
