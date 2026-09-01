# 1133. Largest Unique Number

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

Given an array of integers, return the largest value that appears exactly once. If no such value exists, return `-1`.

### Example

```
Input: nums = [5,7,3,9,4,9,8,3,1]
Output: 8
```

## Approach

Count how many times each value appears using a hash map, then scan the counts for values with a frequency of exactly `1`, tracking the largest one found.

## C# Solution

```csharp
public class Solution
{
    public int LargestUniqueNumber(int[] nums)
    {
        var count = new Dictionary<int, int>();
        foreach (int n in nums) count[n] = count.GetValueOrDefault(n) + 1;

        int result = -1;
        foreach (var kv in count)
        {
            if (kv.Value == 1) result = Math.Max(result, kv.Key);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the frequency map.
