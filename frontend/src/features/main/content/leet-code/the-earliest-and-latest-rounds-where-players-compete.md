# 1900. The Earliest and Latest Rounds Where Players Compete

**Difficulty:** Hard
**Category:** Dynamic Programming, Math, Memoization

## Problem

`n` players (numbered `1` to `n`) compete in a single-elimination tournament. In each round, the `i`-th remaining player (from the front) plays the `i`-th remaining player from the end; if a round has an odd number of players, the middle player advances automatically without playing. Given the positions of two specific players, `firstPlayer` and `secondPlayer`, return the earliest and latest possible rounds in which they could face each other, assuming all other match outcomes are chosen adversarially/favorably to make each extreme happen.

### Example

```
Input: n = 11, firstPlayer = 2, secondPlayer = 4
Output: [3,4]
```

## Approach

Represent the state as `(l, r, k)`: `l` is the first player's position from the front, `r` is the second player's position counted from the **end**, and `k` is the number of players remaining this round. They face each other this round exactly when `l == r` (their front/end positions coincide at the same pairing slot), which is the base case returning `(1, 1)`. Otherwise, recursively enumerate every combinatorially valid pair `(i, j)` describing the two players' front/end-relative positions in the **next** round of `ceil(k/2)` players — bounded by inequalities that ensure the choice is consistent with a valid arrangement of the other `k-2` players' eliminations — and recurse, taking the minimum (earliest) and maximum (latest) round-plus-one over every valid branch. Memoize on `(l, r, k)` (normalizing `l <= r`) since the branching factor is large and states repeat.

## C# Solution

```csharp
public class Solution
{
    private (int min, int max)[,,] _memo;

    public int[] EarliestAndLatest(int n, int firstPlayer, int secondPlayer)
    {
        _memo = new (int, int)[n + 1, n + 1, n + 1];
        var (earliest, latest) = Solve(firstPlayer, n - secondPlayer + 1, n);
        return new[] { earliest, latest };
    }

    private (int min, int max) Solve(int l, int r, int k)
    {
        if (l == r) return (1, 1);
        if (l > r) (l, r) = (r, l);

        if (_memo[l, r, k] != (0, 0)) return _memo[l, r, k];

        int best = int.MaxValue;
        int worst = int.MinValue;

        for (int i = 1; i <= l; i++)
        {
            for (int j = l - i + 1; j <= r - i; j++)
            {
                if (i + j > (k + 1) / 2 || i + j < l + r - k / 2) continue;

                var (x, y) = Solve(i, j, (k + 1) / 2);
                best = Math.Min(best, x + 1);
                worst = Math.Max(worst, y + 1);
            }
        }

        _memo[l, r, k] = (best, worst);
        return (best, worst);
    }
}
```

## Complexity

- **Time:** `O(n^4)` — `O(n^2)` states each considering up to `O(n^2)` branch combinations.
- **Space:** `O(n^3)` for the memoization table.
