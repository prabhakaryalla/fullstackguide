# 3718. Smallest Missing Multiple of K

**Difficulty:** Easy
**Category:** Hash Table, Math

## Problem

Given an integer array `nums` and a positive integer `k`, return the smallest positive multiple of `k` that does not appear in `nums`.

### Example

nums = [3,6,6,12], k = 3 → 3 and 6 are present, 9 is missing. Answer = 9.

## Approach

Put all values in a hash set, then check the multiples `k, 2k, 3k, ...` in order until one is not found in the set.

## C# Solution

```csharp
public class Solution 
{
    public int SmallestMissingMultiple(int[] nums, int k) 
    {
        var set = new HashSet<int>(nums);
        long multiple = k;
        while (set.Contains((int)multiple)) 
        {
            multiple += k;
        }
        return (int)multiple;
    }
}
```

## Complexity

- **Time:** O(n) expected
- **Space:** O(n)
