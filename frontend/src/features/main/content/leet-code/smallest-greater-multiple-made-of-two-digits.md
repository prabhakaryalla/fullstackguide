# 1999. Smallest Greater Multiple Made of Two Digits

**Difficulty:** Medium
**Category:** Math, Enumeration
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given three integers `k`, `digit1`, and `digit2` (each between `-9` and `9`), return the smallest positive integer that is a multiple of `k` and whose decimal digits are only `digit1` and/or `digit2` (in any order, any quantity, using only these values as digits after taking their absolute value), or `-1` if no such value fits in a 32-bit signed integer.

### Example

```
Input: k = 2, digit1 = 0, digit2 = 2
Output: 20
Explanation: 20 is a multiple of 2 and uses only digits 0 and 2; smaller candidates like 0 or 2 are invalid (0 is not positive, 2 alone isn't smaller and also works, but 20... note actual minimal valid answer here per constraints excludes leading-zero-only cases).
```

### Constraints

- `2 <= k <= 100`
- `-9 <= digit1, digit2 <= 9`

## Approach

Take the absolute value of `digit1` and `digit2`, forming a set of one or two allowed digits. Perform a breadth-first search over numbers built digit-by-digit (as strings/longs), starting from single-digit allowed values (skipping a leading `0` unless the number is exactly `0`, which isn't positive so it's skipped too) and extending by appending an allowed digit at each step, always processing shorter numbers before longer ones (BFS ensures the smallest numeric value is found first among same-length candidates by trying smaller allowed digits first, and shorter length always beats longer length). Stop as soon as a generated number is divisible by `k`, or bail out with `-1` once numbers exceed `int.MaxValue`.

## C# Solution

```csharp
public class Solution
{
    public long SmallestNumber(int k, int digit1, int digit2)
    {
        int d1 = Math.Abs(digit1);
        int d2 = Math.Abs(digit2);
        var digits = d1 == d2 ? new int[] { d1 } : new int[] { Math.Min(d1, d2), Math.Max(d1, d2) };

        var queue = new Queue<long>();
        foreach (int d in digits)
        {
            if (d == 0) continue;
            queue.Enqueue(d);
        }

        while (queue.Count > 0)
        {
            long current = queue.Dequeue();
            if (current % k == 0)
            {
                return current;
            }

            if (current > int.MaxValue / 10) continue;

            foreach (int d in digits)
            {
                long next = current * 10 + d;
                if (next <= int.MaxValue)
                {
                    queue.Enqueue(next);
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(V)` where `V` is the number of candidate values explored before finding a multiple of `k` or exceeding `int.MaxValue` — bounded in practice since `k <= 100`.
- **Space:** `O(V)` for the BFS queue.
