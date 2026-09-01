# 1798. Maximum Number of Consecutive Values You Can Make

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given an array `coins` of coin values, return the maximum number `x` such that every integer value from `0` to `x` (inclusive) can be formed using some subset of the coins.

### Example

```
Input: coins = [1,4,10,3,1]
Output: 20
```

## Approach

Sort the coins ascending and greedily track the largest value `reach` currently guaranteed to be fully constructible from `0` to `reach`. If the next coin's value exceeds `reach + 1`, there is a gap that can never be filled, so stop; otherwise the coin extends the guaranteed range by its value.

## C# Solution

```csharp
public class Solution
{
    public int GetMaximumConsecutive(int[] coins)
    {
        Array.Sort(coins);
        int reach = 0;

        foreach (int c in coins)
        {
            if (c > reach + 1) break;
            reach += c;
        }

        return reach + 1;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` (excluding the sort).
