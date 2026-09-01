# 276. Paint Fence

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

There is a fence with `n` posts and `k` colors of paint available. Paint all the posts so that no more than two adjacent fence posts have the same color, and return the number of ways to paint the fence.

### Example

```
Input: n = 3, k = 2
Output: 6
```

### Constraints

- `1 <= n <= 50`
- `1 <= k <= 10^5`

## Approach

Track two running totals: `same` (ways to paint post `i` the same color as post `i-1`) and `diff` (ways to paint post `i` a different color than post `i-1`). A post can only match the previous one if the previous post itself differs from the one before it, so `same[i] = diff[i-1]`, and `diff[i] = (same[i-1] + diff[i-1]) * (k - 1)`, since any color other than the previous one can be chosen.

## C# Solution

```csharp
public class Solution
{
    public int NumWays(int n, int k)
    {
        if (n == 0) return 0;
        if (n == 1) return k;

        int same = k;
        int diff = k * (k - 1);

        for (int i = 3; i <= n; i++)
        {
            int prevDiff = diff;
            diff = (same + diff) * (k - 1);
            same = prevDiff;
        }

        return same + diff;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the fence posts.
- **Space:** `O(1)` — only two running totals are tracked.
