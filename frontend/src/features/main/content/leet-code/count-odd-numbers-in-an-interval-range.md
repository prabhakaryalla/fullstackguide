# 1523. Count Odd Numbers in an Interval Range

**Difficulty:** Easy
**Category:** Math

## Problem

Given two non-negative integers `low` and `high`, return the count of odd numbers between `low` and `high` (inclusive).

### Example

```
Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers are 3, 5, and 7.
```

## Approach

The count of odd numbers from `0` to `n` is `(n + 1) / 2` using integer division. Apply this formula to `high` and to `low - 1`, and subtract to get the count within `[low, high]`.

## C# Solution

```csharp
public class Solution
{
    public int CountOdds(int low, int high)
    {
        return (high + 1) / 2 - low / 2;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
