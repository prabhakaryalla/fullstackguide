# 1561. Maximum Number of Coins You Can Get

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Sorting, Game Theory

## Problem

There are `3n` piles of coins. In each of `n` rounds, you choose any 3 remaining piles, and: Alice always takes the pile with the maximum number of coins, you always take the pile with the second-maximum, and Bob always takes the last (smallest) pile. Return the maximum number of coins you can end up with by choosing piles optimally each round.

### Example

```
Input: piles = [2,4,1,2,7,8]
Output: 9
```

## Approach

Sort the piles ascending. The optimal strategy always groups the smallest remaining pile with the largest two remaining piles: the largest goes to Alice, the smallest goes to Bob, and you get the second-largest of that trio. Repeating this for every group means the first `n / 3` (smallest) piles all go to Bob, and among the remaining `2n / 3` piles (sorted ascending), every other one starting right after Bob's share goes to you.

## C# Solution

```csharp
public class Solution
{
    public int MaxCoins(int[] piles)
    {
        Array.Sort(piles);
        int n = piles.Length;
        int total = 0;

        for (int i = n / 3; i < n; i += 2)
        {
            total += piles[i];
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting.
- **Space:** `O(log n)` for the sort.
