# 1467. Probability of a Two Boxes Having The Same Number of Distinct Balls

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Backtracking, Combinatorics, Probability and Statistics

## Problem

There are `2n` balls of `k` distinct colors, with `balls[i]` balls of color `i`. All balls are randomly split into two boxes of `n` balls each. Return the probability that both boxes end up with the same number of distinct colors.

### Example

```
Input: balls = [1,1]
Output: 1.00000
```

## Approach

Enumerate, color by color, how many balls of that color go to box one (`x`, from `0` to `balls[i]`), tracking the running difference between the two boxes' distinct-color counts (incrementing when box one gets at least one ball of that color, decrementing when box two does) and the number of ways to realize that split — `C(balls[i], x)` — since each physical ball is distinguishable. A complete assignment is valid once all colors are processed and box one has received exactly `n` balls total; among valid assignments, those with a final distinct-color difference of `0` are "favorable". The answer is the ratio of favorable to total ways.

## C# Solution

```csharp
public class Solution
{
    private double totalWays = 0;
    private double favorableWays = 0;

    public double GetProbability(int[] balls)
    {
        int half = balls.Sum() / 2;
        Dfs(balls, 0, half, 0, 1.0);
        return favorableWays / totalWays;
    }

    private void Dfs(int[] balls, int color, int box1Remaining, int distinctDiff, double waysSoFar)
    {
        if (color == balls.Length)
        {
            if (box1Remaining == 0)
            {
                totalWays += waysSoFar;
                if (distinctDiff == 0) favorableWays += waysSoFar;
            }
            return;
        }

        for (int x = 0; x <= balls[color] && x <= box1Remaining; x++)
        {
            double ways = waysSoFar * Combination(balls[color], x);
            int diff = distinctDiff;
            if (x > 0) diff++;
            if (balls[color] - x > 0) diff--;

            Dfs(balls, color + 1, box1Remaining - x, diff, ways);
        }
    }

    private double Combination(int n, int r)
    {
        double result = 1;
        for (int i = 0; i < r; i++) result = result * (n - i) / (i + 1);
        return result;
    }
}
```

## Complexity

- **Time:** `O(product of (balls[i] + 1))`, bounded since `k <= 8` and each `balls[i] <= 6`.
- **Space:** `O(k)` for the recursion depth.
