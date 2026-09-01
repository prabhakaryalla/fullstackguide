# 1563. Stone Game V

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Game Theory

## Problem

There are `n` stones in a row, each with a value in `stoneValue`. Alice repeatedly splits the current row into two non-empty contiguous parts, and the part with the strictly smaller sum is added to Alice's score (if the two parts have equal sums, either can be chosen, and it is added to her score); the other part is discarded and play continues on the kept part until only one stone remains. Alice plays optimally to maximize her total score. Return that maximum score.

### Example

```
Input: stoneValue = [6,2,3,4,5,5]
Output: 18
```

## Approach

Use interval DP with prefix sums for `O(1)` range-sum queries. `dp[i][j]` is the maximum score obtainable from the subarray `stoneValue[i..j]`. For every split point `k` between `i` and `j`, compare the sum of the left part `[i..k]` and the right part `[k+1..j]`: if one is strictly smaller, Alice keeps that smaller side's sum plus the optimal continuation `dp` of that half; if the two sums are equal, she may choose either side (so consider both, plus their respective `dp` continuations). Take the maximum over every split point.

## C# Solution

```csharp
public class Solution
{
    public int StoneGameV(int[] stoneValue)
    {
        int n = stoneValue.Length;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + stoneValue[i];
        }

        int[,] dp = new int[n, n];
        int Sum(int i, int j) => prefix[j + 1] - prefix[i];

        for (int length = 2; length <= n; length++)
        {
            for (int i = 0; i + length - 1 < n; i++)
            {
                int j = i + length - 1;
                int best = 0;

                for (int k = i; k < j; k++)
                {
                    int leftSum = Sum(i, k);
                    int rightSum = Sum(k + 1, j);

                    if (leftSum < rightSum)
                    {
                        best = Math.Max(best, leftSum + (k == i ? 0 : dp[i, k]));
                    }
                    else if (rightSum < leftSum)
                    {
                        best = Math.Max(best, rightSum + (k + 1 == j ? 0 : dp[k + 1, j]));
                    }
                    else
                    {
                        int fromLeft = leftSum + (k == i ? 0 : dp[i, k]);
                        int fromRight = rightSum + (k + 1 == j ? 0 : dp[k + 1, j]);
                        best = Math.Max(best, Math.Max(fromLeft, fromRight));
                    }
                }

                dp[i, j] = best;
            }
        }

        return dp[0, n - 1];
    }
}
```

## Complexity

- **Time:** `O(n^3)` — interval DP over all `O(n^2)` subarrays, each trying `O(n)` split points.
- **Space:** `O(n^2)` for the DP table.
