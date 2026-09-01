# 1636. Sort Array by Increasing Frequency

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting

## Problem

Given an integer array `nums`, sort it in increasing order of frequency; if multiple values share a frequency, sort those values in decreasing numeric order.

### Example

```
Input: nums = [1,1,2,2,2,3]
Output: [3,1,1,2,2,2]
```

## Approach

Count the frequency of every value with a hash map, then sort the original array using a comparator that orders primarily by ascending frequency and, for ties, by descending value.

## C# Solution

```csharp
public class Solution
{
    public int[] FrequencySort(int[] nums)
    {
        var frequency = new Dictionary<int, int>();

        foreach (int num in nums)
        {
            frequency[num] = frequency.GetValueOrDefault(num) + 1;
        }

        return nums
            .OrderBy(num => frequency[num])
            .ThenByDescending(num => num)
            .ToArray();
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)`.
