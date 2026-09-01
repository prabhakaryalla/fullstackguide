# 3712. Sum of Elements With Frequency Divisible by K

**Difficulty:** Easy
**Category:** Hash Table, Array

## Problem

Given an integer array `nums` and an integer `k`, return the sum of all elements whose frequency of occurrence in `nums` is divisible by `k`.

### Example

nums = [2,2,2,3,3], k = 3 → 2 occurs 3 times (divisible by 3), contributing 2*3=6; 3 occurs 2 times (not divisible). Answer = 6.

## Approach

Count the frequency of every value with a hash map, then sum `value * count` for every value whose count is divisible by `k`.

## C# Solution

```csharp
public class Solution 
{
    public long SumOfElements(int[] nums, int k) 
    {
        var freq = new Dictionary<int, int>();
        foreach (int x in nums) 
        {
            freq[x] = freq.GetValueOrDefault(x, 0) + 1;
        }
        long sum = 0;
        foreach (var kv in freq) 
        {
            if (kv.Value % k == 0) sum += (long)kv.Key * kv.Value;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
