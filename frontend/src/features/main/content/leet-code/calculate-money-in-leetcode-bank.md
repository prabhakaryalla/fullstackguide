# 1716. Calculate Money in Leetcode Bank

**Difficulty:** Easy
**Category:** Math

## Problem

Hercy saves money daily starting with $1 on Monday of week one, increasing by $1 each day through Sunday, then $2 on the following Monday (one more than the previous week's Monday), and so on. Given the number of days `n`, return the total money saved.

### Example

```
Input: n = 10
Output: 37
```

## Approach

Split `n` into complete weeks and a remainder. Each complete week `w` (0-indexed) contributes `7*(w+1) + 21` dollars (Monday amount repeated across 7 days plus the fixed `1+2+...+6` increments). Add the partial week's contribution starting from the next Monday's value.

## C# Solution

```csharp
public class Solution
{
    public int TotalMoney(int n)
    {
        int weeks = n / 7;
        int remainingDays = n % 7;
        int total = 0;

        for (int w = 0; w < weeks; w++)
            total += 7 * (w + 1) + 21;

        int start = weeks + 1;
        for (int d = 0; d < remainingDays; d++)
            total += start + d;

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
