# 233. Number of Digit One

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Recursion

## Problem

Given an integer `n`, count the total number of digit `1` appearing in all non-negative integers less than or equal to `n`.

### Example 1

```
Input: n = 13
Output: 6
```

### Example 2

```
Input: n = 0
Output: 0
```

### Constraints

- `0 <= n <= 10^9`

## Approach

Process the number digit by digit from the least significant position, using a place value `p` (1, 10, 100, ...). For each digit position, split `n` into `high` (digits above the current one), `cur` (the current digit), and `low` (digits below). The count of `1`s contributed at that position is: `high * p` if `cur > 1`, `high * p + low + 1` if `cur == 1`, or `high * p` if `cur == 0`. Sum the contribution over every position.

## C# Solution

```csharp
public class Solution
{
    public int CountDigitOne(int n)
    {
        long count = 0;
        for (long p = 1; p <= n; p *= 10)
        {
            long high = n / (p * 10);
            long cur = (n / p) % 10;
            long low = n % p;

            if (cur == 0) count += high * p;
            else if (cur == 1) count += high * p + low + 1;
            else count += (high + 1) * p;
        }

        return (int)count;
    }
}
```

## Complexity

- **Time:** `O(log10 n)` — one iteration per decimal digit position.
- **Space:** `O(1)`.
