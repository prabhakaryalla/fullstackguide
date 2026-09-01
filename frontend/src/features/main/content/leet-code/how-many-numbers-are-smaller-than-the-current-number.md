# 1365. How Many Numbers Are Smaller Than the Current Number

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting, Counting

## Problem

Given an array `nums`, return an array `answer` where `answer[i]` is the number of elements smaller than `nums[i]`.

### Example

```
Input: nums = [8,1,2,2,3]
Output: [4,0,1,1,3]
```

## Approach

Since values are bounded (`0` to `100`), count how many times each value occurs, then build a running total so `prefix[v]` holds the count of numbers strictly smaller than `v`. Look up each element's answer directly from that prefix table.

## C# Solution

```csharp
public class Solution
{
    public int[] SmallerNumbersThanCurrent(int[] nums)
    {
        var count = new int[101];
        foreach (var num in nums) count[num]++;

        var prefix = new int[101];
        for (int i = 1; i <= 100; i++) prefix[i] = prefix[i - 1] + count[i - 1];

        var result = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++) result[i] = prefix[nums[i]];

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + 101)`.
- **Space:** `O(101)` for the counting arrays.
