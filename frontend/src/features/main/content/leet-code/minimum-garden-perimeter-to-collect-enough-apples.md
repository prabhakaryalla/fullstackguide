# 1954. Minimum Garden Perimeter to Collect Enough Apples

**Difficulty:** Medium
**Category:** Math, Binary Search

## Problem

An infinite apple orchard is laid out on integer coordinates, where the tree at `(i, j)` has `|i| + |j|` apples. You build a square garden centered at `(0, 0)` with corners at `(x, x)`, `(x, -x)`, `(-x, x)`, `(-x, -x)` for some non-negative integer `x`, collecting apples from every tree strictly inside or on the garden's boundary. Given `neededApples`, return the minimum perimeter of a garden that can collect at least that many apples.

### Example

```
Input: neededApples = 1
Output: 8
Explanation: A garden with corners (1,1),(1,-1),(-1,1),(-1,-1) has perimeter 8 and collects enough apples.
```

### Constraints

- `1 <= neededApples <= 10^15`

## Approach

For a garden of half-side `x`, the total apples collected is a closed-form function `f(x) = 2x(x+1)(2x+1)` (derived by summing `|i|+|j|` over the `(2x+1) x (2x+1)` grid, which factors into `2 * (sum of 1..x doubled appropriately)`). Since `f` is strictly increasing in `x`, binary search for the smallest `x` with `f(x) >= neededApples`, then return the perimeter `8x`.

## C# Solution

```csharp
public class Solution
{
    public long MinimumPerimeter(long neededApples)
    {
        long lo = 1, hi = 100000;

        while (lo < hi)
        {
            long mid = lo + (hi - lo) / 2;
            if (Apples(mid) >= neededApples)
            {
                hi = mid;
            }
            else
            {
                lo = mid + 1;
            }
        }

        return 8 * lo;
    }

    private long Apples(long x)
    {
        return 2 * x * (x + 1) * (2 * x + 1);
    }
}
```

## Complexity

- **Time:** `O(log(maxX))` — binary search over the garden half-side length.
- **Space:** `O(1)`.
