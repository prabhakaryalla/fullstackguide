# 887. Super Egg Drop

**Difficulty:** Hard
**Category:** Math, Binary Search, Dynamic Programming

## Problem

Given `k` identical eggs and a building with `n` floors, where an egg breaks if dropped from a floor at or above some unknown critical floor `f` (and survives below it), return the minimum number of moves needed to determine `f` with certainty in the worst case.

### Example

```
Input: k = 1, n = 2
Output: 2
```

## Approach

Instead of the usual "floors and moves" DP (which is too slow for large `n`), flip the formulation: let `dp[eggs]` be the maximum number of floors that can be conclusively resolved using a given number of moves and `eggs` eggs. With one additional move, dropping an egg from some floor either breaks it (leaving `eggs - 1` eggs to resolve the floors below, contributing `dp[eggs - 1]` more floors) or it survives (keeping all `eggs`, contributing `dp[eggs]`'s previous value worth of floors above), plus the floor just tested itself — giving the update `dp[eggs] += dp[eggs - 1] + 1`. Keep incrementing the move count and updating `dp` (iterating eggs from high to low to avoid using this round's already-updated smaller values) until `dp[k]` reaches at least `n`.

## C# Solution

```csharp
public class Solution
{
    public int SuperEggDrop(int k, int n)
    {
        var dp = new int[k + 1];
        int moves = 0;

        while (dp[k] < n)
        {
            moves++;

            for (int eggs = k; eggs >= 1; eggs--)
            {
                dp[eggs] = dp[eggs] + dp[eggs - 1] + 1;
            }
        }

        return moves;
    }
}
```

## Complexity

- **Time:** `O(k * sqrt(n))` roughly, since the number of moves needed grows on the order of `sqrt(n)`.
- **Space:** `O(k)` for the DP array.
