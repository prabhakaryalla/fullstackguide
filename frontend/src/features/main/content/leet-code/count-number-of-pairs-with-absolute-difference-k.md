# 2006. Count Number of Pairs With Absolute Difference K

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

Given an integer array `nums` and an integer `k`, return *the number of pairs* `(i, j)` where `i < j` such that `|nums[i] - nums[j]| == k`.

### Example

```
Input: nums = [1,2,2,1], k = 1
Output: 4
Explanation: The pairs with an absolute difference of 1 are: (0,1), (0,2), (1,3), (2,3).
```

## Approach

Scan the array once while maintaining a frequency map of values seen so far. When processing `nums[j]`, any previously seen value equal to `nums[j] - k` or `nums[j] + k` forms a valid pair with the current element as the later index, so add the counts of both to the running total before inserting `nums[j]` into the frequency map. This counts every pair exactly once since `i < j` is enforced by processing left to right.

## C# Solution

```csharp
public class Solution
{
    public int CountKDifference(int[] nums, int k)
    {
        var freq = new Dictionary<int, int>();
        int count = 0;

        foreach (var num in nums)
        {
            if (freq.TryGetValue(num - k, out var c1)) count += c1;
            if (freq.TryGetValue(num + k, out var c2)) count += c2;
            freq[num] = freq.GetValueOrDefault(num) + 1;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the frequency map.
