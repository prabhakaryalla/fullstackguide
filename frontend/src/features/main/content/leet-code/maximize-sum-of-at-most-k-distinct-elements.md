# 3684. Maximize Sum of At Most K Distinct Elements

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting, Greedy

## Problem

Given an integer array `nums` and an integer `k`, choose at most `k` distinct values from `nums` to maximize their sum.

### Example

Input: `nums = [1,2,2,3,5]`, `k = 2`
Output: `8`
Explanation: The distinct values are `{1,2,3,5}`. Choosing the two largest, `5` and `3`, gives the maximum sum `8`.

## Approach

Collect distinct values, sort them in descending order, and sum the first `min(k, distinctCount)` values greedily.

## C# Solution

```csharp
public class Solution 
{
    public long MaximizeSum(int[] nums, int k) 
    {
        HashSet<int> distinct = new HashSet<int>(nums);
        List<int> values = new List<int>(distinct);
        values.Sort((a, b) => b - a);
        long sum = 0;
        int count = Math.Min(k, values.Count);
        for (int i = 0; i < count; i++) 
        {
            sum += values[i];
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
