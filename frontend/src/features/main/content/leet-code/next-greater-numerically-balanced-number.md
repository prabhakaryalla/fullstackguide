# 2048. Next Greater Numerically Balanced Number

**Difficulty:** Medium
**Category:** Math, Backtracking, Enumeration

## Problem

An integer `x` is **numerically balanced** if, for every digit `d` that appears in `x`, it appears **exactly `d` times** (note this means digit `0` may never appear, since it would need to appear zero times). Given an integer `n`, return *the smallest numerically balanced number strictly greater than `n`*.

## Approach

Numerically balanced numbers are quite sparse, and it's known that one always exists reasonably close to any `n` within the problem's constraints. So simply brute-force check every integer starting at `n + 1`, counting digit occurrences and verifying that each digit `d` present appears exactly `d` times, until a balanced number is found.

## C# Solution

```csharp
public class Solution
{
    public int NextBeautifulNumber(int n)
    {
        for (int x = n + 1; ; x++)
            if (IsBalanced(x)) return x;
    }

    private bool IsBalanced(int x)
    {
        var counts = new int[10];
        int temp = x;

        while (temp > 0)
        {
            counts[temp % 10]++;
            temp /= 10;
        }

        for (int d = 0; d < 10; d++)
            if (counts[d] != 0 && counts[d] != d)
                return false;

        return true;
    }
}
```

## Complexity

- **Time:** In the worst case, checks a bounded number of candidates before finding a balanced one (balanced numbers occur with known small gaps within the problem's constraints).
- **Space:** `O(1)`.
