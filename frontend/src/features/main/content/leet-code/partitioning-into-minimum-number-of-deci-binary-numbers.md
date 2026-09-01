# 1689. Partitioning Into Minimum Number Of Deci-Binary Numbers

**Difficulty:** Medium
**Category:** Math, Greedy, String

## Problem

A "deci-binary" number uses only digits `0` and `1`. Given a numeric string `n`, return the minimum number of deci-binary numbers that sum to `n`.

### Example

```
Input: n = "32"
Output: 3
```

## Approach

Since each deci-binary addend can contribute at most `1` to any digit position, the minimum count needed equals the largest digit appearing in `n` (that digit position alone requires that many addends contributing a `1` there, and this bound is always achievable).

## C# Solution

```csharp
public class Solution
{
    public int MinPartitions(string n)
    {
        int maxDigit = 0;

        foreach (char c in n)
        {
            maxDigit = Math.Max(maxDigit, c - '0');
        }

        return maxDigit;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of the string.
- **Space:** `O(1)`.
