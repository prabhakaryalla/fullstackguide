# 1067. Digit Count in Range

**Difficulty:** Hard
**Category:** Math, Dynamic Programming

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a digit `d` (`0-9`) and a range `[low, high]`, return how many times `d` appears as a digit across all integers in that range.

### Example

```
Input: d = 1, low = 1, high = 13
Output: 6
```

## Approach

Compute `count(n, d)` — the number of times digit `d` appears in all integers from `1` to `n` — and the answer is `count(high, d) - count(low - 1, d)`. For `count(n, d)`, process each decimal place value independently: split `n` around that place into `higher`, `current`, and `lower` parts. The number of full cycles contributed by the higher part is `higher * place` (or `(higher - 1) * place` when `d == 0`, since a leading position can't count as digit `0`). Then add a correction based on whether `current` is less than, equal to, or greater than `d`, accounting for the remaining `lower` digits.

## C# Solution

```csharp
public class Solution
{
    public int DigitsCount(int d, int low, int high)
    {
        return CountDigit(high, d) - CountDigit(low - 1, d);
    }

    private int CountDigit(int n, int d)
    {
        if (n < 0) return 0;

        int count = 0;

        for (long place = 1; place <= n; place *= 10)
        {
            long higher = n / (place * 10);
            long current = (n / place) % 10;
            long lower = n % place;

            if (d == 0)
            {
                if (higher == 0) continue;
                count += (int)((higher - 1) * place);
                if (current > 0) count += (int)place;
                else count += (int)(lower + 1);
            }
            else
            {
                count += (int)(higher * place);
                if (current > d) count += (int)place;
                else if (current == d) count += (int)(lower + 1);
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(log high)`.
- **Space:** `O(1)`.
