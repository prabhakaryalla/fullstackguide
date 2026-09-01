# 2598. Smallest Missing Non-negative Integer After Operations

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy

## Problem

You are given a 0-indexed integer array `nums` and an integer `value`. In one operation, you can add or subtract `value` from any element of `nums`.

Return the minimum possible value of the smallest missing non-negative integer after performing any number of operations on `nums`.

### Example

```
Input: nums = [1,2,3,4], value = 2
Output: 0
Explanation: 
We can make [1,0,3,2] by subtracting value from nums[1] and nums[3]
Or make [1,0,1,2] by subtracting value from nums[1] and changing nums[2] to 1
The MEX is 0
```

## Approach

An element `x` can be transformed to any number of the form `x + k * value` where `k` is any integer. Group numbers by their remainder when divided by `value`. For each remainder group, sort the values and greedily assign them to the smallest available MEX positions starting from 0.

The key insight is that elements with the same remainder modulo `value` can be transformed into each other, so we treat them as equivalent.

## C# Solution

```csharp
public class Solution
{
    public int FindSmallestInteger(int[] nums, int value)
    {
        var remainder = new Dictionary<int, int>();
        
        foreach (int num in nums)
        {
            int r = ((num % value) + value) % value;
            remainder[r] = remainder.GetValueOrDefault(r) + 1;
        }
        
        int mex = 0;
        
        while (true)
        {
            int r = mex % value;
            
            if (!remainder.ContainsKey(r) || remainder[r] == 0)
            {
                return mex;
            }
            
            remainder[r]--;
            mex++;
        }
    }
}
```

## Complexity

- **Time:** O(n + mex)
- **Space:** O(value)
