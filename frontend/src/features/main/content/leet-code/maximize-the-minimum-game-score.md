# 3449. Maximize the Minimum Game Score

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Prefix Sum

## Problem
You are given an array `points` of length `n`. You play a game where you start at index 0 with score 0. You may repeatedly move from your current index `i` to any index `j > i`, gaining `points[j]` added to the score of index `j` (each index's "score" accumulates independently based on how many times a move lands there, per the problem's rules of incrementing counts along the path). You must be able to reach the end. Return the maximum possible value of the minimum score among all indices after making moves optimally, given you may perform at most `m` total moves (per problem constraints on move budget).

## Approach
Binary search on the answer `x` (the minimum achievable score). For a candidate `x`, greedily simulate moving through the array: at each position, determine the minimum number of times you must "hit" (increment) this index using available moves to guarantee cumulative score at least `x`, given `points[i]` per hit, using a greedy/prefix-difference technique (similar to "range increment to satisfy minimum" problems). Use a difference array to propagate the effect of extra moves applied at earlier indices forward. If the total moves required to make every index reach at least `x` is within the allowed budget, `x` is feasible; otherwise it is not. Binary search over `x` to find the maximum feasible value.

## C# Solution

```csharp
public class Solution 
{
    public long MaxScore(int[] points, int m) 
    {
        int n = points.Length;
        long lo = 0, hi = (long)m * 100000 + 1; // generous upper bound based on constraints
        long ans = 0;

        while (lo <= hi)
        {
            long mid = lo + (hi - lo) / 2;
            if (CanAchieve(points, m, mid))
            {
                ans = mid;
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return ans;
    }

    private bool CanAchieve(int[] points, int m, long target)
    {
        int n = points.Length;
        long movesUsed = 0;
        long carry = 0; // accumulated bonus effect propagated from earlier double-visits
        long[] extra = new long[n + 1]; // difference array marking extra visits starting at index i

        for (int i = 0; i < n; i++)
        {
            carry += extra[i];
            long current = points[i] * (1 + carry);
            if (current >= target)
            {
                continue;
            }

            // need extra visits at index i to push its score to target
            long need = (target - current + points[i] - 1) / points[i];
            movesUsed += need;
            if (movesUsed > m) return false;

            carry += need;
            if (i + 1 <= n) extra[i + 1] -= need; // effect only benefits this index going forward via carry reduction is not needed since carry persists
        }

        return movesUsed <= m;
    }
}
```

## Complexity

- **Time:** O(n log(maxScore))
- **Space:** O(n) for the difference array
