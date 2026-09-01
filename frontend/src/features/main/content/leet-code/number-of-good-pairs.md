# 1512. Number of Good Pairs

**Difficulty:** Easy
**Category:** Array, Hash Table, Math, Counting

## Problem

Given an array of integers `nums`, return the number of "good pairs". A pair `(i, j)` is good if `nums[i] == nums[j]` and `i < j`.

### Example

```
Input: nums = [1,2,3,1,1,3]
Output: 4
```

## Approach

Count the frequency of each value while scanning. For each occurrence of a value already seen `count` times before, it forms `count` new good pairs with the previous occurrences, so accumulate that as we go.

## C# Solution

```csharp
public class Solution
{
    public int NumIdenticalPairs(int[] nums)
    {
        var counts = new Dictionary<int, int>();
        int pairs = 0;

        foreach (int num in nums)
        {
            counts.TryGetValue(num, out int seen);
            pairs += seen;
            counts[num] = seen + 1;
        }

        return pairs;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(n)` for the frequency map.
