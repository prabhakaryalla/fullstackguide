# 1049. Last Stone Weight II

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an array of stone weights, repeatedly choose any two stones and smash them: if equal, both vanish; otherwise the lighter vanishes and the heavier becomes the difference. Return the smallest possible weight of the last remaining stone (or `0`).

### Example

```
Input: stones = [2,7,4,1,8,1]
Output: 1
```

## Approach

Smashing stones is equivalent to partitioning them into two groups and taking the absolute difference of the two groups' sums — the goal is to make the two groups as close in sum as possible. This is the classic subset-sum problem: find the subset with sum closest to (but not exceeding) `total / 2`. Use a boolean DP array over achievable sums up to `total / 2`, then the answer is `total - 2 * bestAchievableSum`.

## C# Solution

```csharp
public class Solution
{
    public int LastStoneWeightII(int[] stones)
    {
        int total = stones.Sum();
        int target = total / 2;
        var reachable = new bool[target + 1];
        reachable[0] = true;

        foreach (var stone in stones)
        {
            for (int sum = target; sum >= stone; sum--)
            {
                if (reachable[sum - stone]) reachable[sum] = true;
            }
        }

        int closest = 0;
        for (int sum = target; sum >= 0; sum--)
        {
            if (reachable[sum]) { closest = sum; break; }
        }

        return total - 2 * closest;
    }
}
```

## Complexity

- **Time:** `O(n * total)` — classic 0/1 knapsack.
- **Space:** `O(total)` for the reachable-sums array.
