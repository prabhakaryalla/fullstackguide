# 1399. Count Largest Group

**Difficulty:** Easy
**Category:** Hash Table, Math, Counting

## Problem

Given an integer `n`, group every number from `1` to `n` by the sum of its digits, and return the number of groups that have the largest size.

### Example

```
Input: n = 13
Output: 4
```

## Approach

Compute the digit sum of every number from `1` to `n` and tally how many numbers fall into each digit-sum bucket. Find the maximum bucket size, then count how many buckets reach that maximum.

## C# Solution

```csharp
public class Solution
{
    public int CountLargestGroup(int n)
    {
        var groupSize = new Dictionary<int, int>();

        for (int i = 1; i <= n; i++)
        {
            int digitSum = 0, x = i;
            while (x > 0)
            {
                digitSum += x % 10;
                x /= 10;
            }
            groupSize[digitSum] = groupSize.GetValueOrDefault(digitSum, 0) + 1;
        }

        int maxSize = groupSize.Values.Max();
        return groupSize.Values.Count(v => v == maxSize);
    }
}
```

## Complexity

- **Time:** `O(n log n)` for computing digit sums.
- **Space:** `O(log n)` for the group-size map (bounded by max possible digit sum).
