# 656. Coin Path

**Difficulty:** Hard
**Category:** Array, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `coins` where `coins[i]` is the cost to land on index `i` (or `-1` if that index is unreachable), and a maximum jump length `maxJump`, find the cheapest path of indices from the first to the last index (jumping forward by at most `maxJump` positions each time). Return the lexicographically smallest such path, or an empty list if none exists.

### Example

```
Input: coins = [1,2,4,-1,2], maxJump = 2
Output: [1,3,5]
```

## Approach

Work backward from the last index using dynamic programming: `minCost[i]` is the cheapest total cost to reach the end starting from index `i`. For each index (processed right to left), try every reachable jump distance up to `maxJump`, and pick whichever destination yields the lowest total cost — trying smaller jump distances first when costs tie ensures the reconstructed path is lexicographically smallest. Track each index's chosen next-hop, then reconstruct the full path by following those next-hops from index `0`.

## C# Solution

```csharp
public class Solution
{
    public IList<int> CheapestJump(int[] coins, int maxJump)
    {
        int n = coins.Length;
        var minCost = new long[n];
        var nextIndex = new int[n];
        Array.Fill(minCost, long.MaxValue);
        minCost[n - 1] = coins[n - 1];

        for (int i = n - 2; i >= 0; i--)
        {
            if (coins[i] == -1) continue;

            for (int jump = 1; jump <= maxJump && i + jump < n; jump++)
            {
                int next = i + jump;
                if (minCost[next] == long.MaxValue) continue;

                long cost = coins[i] + minCost[next];
                if (cost < minCost[i])
                {
                    minCost[i] = cost;
                    nextIndex[i] = next;
                }
            }
        }

        var result = new List<int>();
        if (minCost[0] == long.MaxValue) return result;

        int current = 0;
        result.Add(1);
        while (current != n - 1)
        {
            current = nextIndex[current];
            result.Add(current + 1);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n * maxJump)`.
- **Space:** `O(n)` for the DP arrays.
