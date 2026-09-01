# 1434. Number of Ways to Wear Different Hats to Each Other

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bitmask

## Problem

There are `n` people (`n <= 10`) and `40` hats. `hats[i]` lists the hats person `i` likes. Return the number of ways to assign a distinct hat to every person such that each person receives a hat they like, modulo `10^9 + 7`.

### Example

```
Input: hats = [[3,4],[4,5],[5]]
Output: 1
```

## Approach

Since there are at most 10 people, represent the set of people who already have a hat as a bitmask. Group people by the hats they like, then process hats `1` through `40` one at a time in a DP over `(hat index, mask)`: for each hat, either skip it, or give it to exactly one currently-unassigned person who likes it, transitioning from the mask without that person to the mask with them included. The answer is the number of ways to reach the full mask after considering all 40 hats.

## C# Solution

```csharp
public class Solution
{
    public int NumberWays(IList<IList<int>> hats)
    {
        const int MOD = 1_000_000_007;
        int n = hats.Count;

        var hatToPeople = new List<int>[41];
        for (int h = 0; h <= 40; h++) hatToPeople[h] = new List<int>();
        for (int p = 0; p < n; p++)
            foreach (var h in hats[p])
                hatToPeople[h].Add(p);

        int fullMask = (1 << n) - 1;
        long[,] dp = new long[41, 1 << n];
        dp[0, 0] = 1;

        for (int h = 1; h <= 40; h++)
        {
            for (int mask = 0; mask <= fullMask; mask++)
            {
                dp[h, mask] = dp[h - 1, mask];

                foreach (var p in hatToPeople[h])
                {
                    if ((mask & (1 << p)) != 0)
                        dp[h, mask] = (dp[h, mask] + dp[h - 1, mask ^ (1 << p)]) % MOD;
                }
            }
        }

        return (int)dp[40, fullMask];
    }
}
```

## Complexity

- **Time:** `O(40 * 2^n * n)`.
- **Space:** `O(40 * 2^n)` for the DP table.
