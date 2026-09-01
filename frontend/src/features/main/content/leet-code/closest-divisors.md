# 1362. Closest Divisors

**Difficulty:** Medium
**Category:** Math

## Problem

Given an integer `num`, find the two integers whose product equals `num + 1` or `num + 2` and whose absolute difference is minimized; return them in ascending order.

### Example

```
Input: num = 8
Output: [3,3]
```

## Approach

For each candidate `num + 1` and `num + 2`, scan divisors downward from the integer square root until one divides evenly, which gives the closest possible pair for that candidate (since divisors closer to the square root are closer together). Compare the best pairs found for both candidates and keep the one with the smaller gap.

## C# Solution

```csharp
public class Solution
{
    public int[] ClosestDivisors(int num)
    {
        int[] best = null;

        foreach (int candidate in new[] { num + 1, num + 2 })
        {
            for (int a = (int)Math.Sqrt(candidate); a >= 1; a--)
            {
                if (candidate % a == 0)
                {
                    int b = candidate / a;
                    if (best == null || (b - a) < (best[1] - best[0]))
                    {
                        best = new[] { a, b };
                    }
                    break;
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(sqrt(num))`.
- **Space:** `O(1)`.
