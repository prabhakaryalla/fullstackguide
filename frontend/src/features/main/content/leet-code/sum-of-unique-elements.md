# 1748. Sum of Unique Elements

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an integer array `nums`, return the sum of all elements that appear exactly once in the array.

### Example

```
Input: nums = [1,2,3,2]
Output: 4
```

## Approach

Count the frequency of each value with a hash map, then sum the values whose frequency equals `1`.

## C# Solution

```csharp
public class Solution
{
    public int SumOfUnique(int[] nums)
    {
        var count = new Dictionary<int, int>();
        foreach (int x in nums) count[x] = count.GetValueOrDefault(x, 0) + 1;

        int sum = 0;
        foreach (var kv in count)
            if (kv.Value == 1) sum += kv.Key;

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the frequency map.
