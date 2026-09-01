# 1296. Divide Array in Sets of K Consecutive Numbers

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Sorting

## Problem

Given an integer array `nums` and an integer `k`, return `true` if `nums` can be partitioned into groups of `k` consecutive numbers, where each group consists of `k` distinct consecutive integers (duplicates in `nums` are allowed and go into different groups).

### Example

```
Input: nums = [1,2,3,3,4,4,5,6], k = 4
Output: true
```

## Approach

If the total length isn't divisible by `k`, no valid partition exists. Otherwise, count occurrences of every value in a sorted map. Repeatedly take the smallest remaining value as the start of a new group of `k` consecutive numbers; that starting value must be the head of some group (since it can't be part of a group starting smaller — none remain), so greedily consume `k` consecutive values from the counts, failing immediately if any required value is missing or has insufficient count.

## C# Solution

```csharp
public class Solution
{
    public bool IsPossibleDivide(int[] nums, int k)
    {
        if (nums.Length % k != 0) return false;

        var counts = new SortedDictionary<int, int>();
        foreach (int num in nums)
            counts[num] = counts.GetValueOrDefault(num) + 1;

        while (counts.Count > 0)
        {
            int first = counts.Keys.First();
            int count = counts[first];

            for (int i = 0; i < k; i++)
            {
                int value = first + i;
                if (!counts.TryGetValue(value, out int available) || available < count)
                    return false;

                counts[value] -= count;
                if (counts[value] == 0) counts.Remove(value);
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n log n)`, where `n` is the length of `nums`.
- **Space:** `O(n)` for the sorted count map.
