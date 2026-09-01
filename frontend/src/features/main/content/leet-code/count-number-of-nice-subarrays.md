# 1248. Count Number of Nice Subarrays

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window, Prefix Sum

## Problem

Given an integer array `nums` and an integer `k`, return the number of contiguous subarrays that contain exactly `k` odd numbers.

### Example

```
Input: nums = [1,1,2,1,1], k = 3
Output: 2
```

## Approach

Reduce the problem to the familiar "subarray sum equals k" pattern: track a running count of odd numbers seen so far as a prefix count, and store in a dictionary how many prefixes have produced each count value. For each new element, if the running odd-count minus `k` has been seen `c` times before, there are exactly `c` subarrays ending here with precisely `k` odd numbers, since removing that earlier prefix leaves a subarray with the desired count.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfSubarrays(int[] nums, int k)
    {
        var prefixCount = new Dictionary<int, int> { { 0, 1 } };
        int oddCount = 0, result = 0;

        foreach (int num in nums)
        {
            if (num % 2 != 0) oddCount++;

            if (prefixCount.TryGetValue(oddCount - k, out int count))
                result += count;

            prefixCount[oddCount] = prefixCount.GetValueOrDefault(oddCount) + 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `nums`.
- **Space:** `O(n)` for the prefix-count map.
