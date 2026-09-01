# 3429. Paint House IV

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem
There are `n` houses (n is even) in a row, numbered `0` to `n - 1`. Each house must be painted with one of 3 colors, given by `cost`, an `n x 3` array where `cost[i][c]` is the cost of painting house `i` with color `c`. The painting must satisfy:

- No two adjacent houses have the same color.
- For every `i`, house `i` and its mirror house `n - 1 - i` have different colors.

Return the minimum total cost to paint all houses satisfying these constraints.

## Approach
Process the houses in mirrored pairs `(i, n-1-i)` for `i = 0 .. n/2 - 1`. For each pair, track a DP state `dp[cl][cr]` = minimum cost to paint pair `i` such that house `i` uses color `cl` and its mirror `n-1-i` uses color `cr`, with `cl != cr` (since they must differ).

Transitioning from pair `i-1` to pair `i` requires that the new left color `cl` differs from the previous pair's left color `pl` (adjacency on the left side), the new right color `cr` differs from the previous pair's right color `pr` (adjacency on the right side, since houses `n-1-i` and `n-i` are also adjacent), and `pl != pr` (mirror constraint of the previous pair, already enforced when that state was built). Since there are only 3 colors, each transition only needs to scan at most 9 previous states.

The base case (`i = 0`) is simply `cost[0][cl] + cost[n-1][cr]` for `cl != cr`. The final answer is the minimum over all valid `(cl, cr)` in the last pair's DP table.

## C# Solution

```csharp
public class Solution 
{
    public int MinCost(int n, int[][] cost) 
    {
        int pairs = n / 2;
        const int inf = int.MaxValue / 2;

        int[,] dp = new int[3, 3];
        for (int cl = 0; cl < 3; cl++) 
        {
            for (int cr = 0; cr < 3; cr++) 
            {
                dp[cl, cr] = cl == cr ? inf : cost[0][cl] + cost[n - 1][cr];
            }
        }

        for (int i = 1; i < pairs; i++) 
        {
            int[,] next = new int[3, 3];
            for (int cl = 0; cl < 3; cl++) 
            {
                for (int cr = 0; cr < 3; cr++) 
                {
                    if (cl == cr) 
                    {
                        next[cl, cr] = inf;
                        continue;
                    }

                    int best = inf;
                    for (int pl = 0; pl < 3; pl++) 
                    {
                        for (int pr = 0; pr < 3; pr++) 
                        {
                            if (pl == pr || pl == cl || pr == cr) continue;
                            best = Math.Min(best, dp[pl, pr]);
                        }
                    }
                    next[cl, cr] = best + cost[i][cl] + cost[n - 1 - i][cr];
                }
            }
            dp = next;
        }

        int answer = inf;
        for (int cl = 0; cl < 3; cl++) 
        {
            for (int cr = 0; cr < 3; cr++) 
            {
                if (cl != cr) answer = Math.Min(answer, dp[cl, cr]);
            }
        }
        return answer;
    }
}
```

## Complexity

- **Time:** O(n), since each of the `n/2` pairs does O(1) work (constant 3×3×3×3 transitions).
- **Space:** O(1) extra space beyond the fixed 3×3 DP tables.
