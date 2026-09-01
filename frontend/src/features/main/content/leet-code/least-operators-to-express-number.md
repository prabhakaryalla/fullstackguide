# 964. Least Operators to Express Number

**Difficulty:** Hard
**Category:** Math, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a positive integer `x`, build an expression using only `x`, `+`, `-`, `*`, `/`, and parentheses that evaluates to `target`. Return the minimum number of operators used.

### Example

```
Input: x = 3, target = 19
Output: 5
Explanation: 3 * 3 + 3 * 3 + 3 / 3 = 19 uses 5 operators.
```

## Approach

Express `target` in base `x`: `target = sum(cur[k] * x^k)`. Represent each digit `cur[k]` either by adding `cur[k]` copies of `x^k` (cost `cur[k]` operators to build, each needing a `+`), or by "overshooting" — using `x^(k+1)` and subtracting `(x - cur[k])` copies of `x^k`. Track, level by level from the least significant digit up, the minimum operator count for both the "using the digit as-is" (`positive`) and "borrowing from the next level" (`negative`) strategies, since consecutive levels interact.

## C# Solution

```csharp
public class Solution
{
    public int LeastOpsExpressTarget(int x, int target)
    {
        int k = 0;
        long positive = 0, negative = 0;

        while (target > 0)
        {
            int cur = target % x;
            target /= x;

            if (k > 0)
            {
                long newPositive = Math.Min(cur * (long)k + positive, (cur + 1) * (long)k + negative);
                long newNegative = Math.Min((x - cur) * (long)k + positive, (x - cur - 1) * (long)k + negative);
                positive = newPositive;
                negative = newNegative;
            }
            else
            {
                positive = cur * 2L;
                negative = (x - cur) * 2L;
            }

            k++;
        }

        return (int)(Math.Min(positive, negative) - 1);
    }
}
```

## Complexity

- **Time:** `O(log_x(target))`.
- **Space:** `O(1)`.
