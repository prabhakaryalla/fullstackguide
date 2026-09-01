# 2952. Minimum Number of Coins to be Added

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You are given a 0-indexed integer array `coins` representing available coin values and an integer `target`. You can add coins of any value. Return the minimum number of coins that need to be added so that every integer in the range `[1, target]` can be obtained as a sum of some coins.

### Example

```
Input: coins = [1, 4, 10], target = 19
Output: 2
Explanation: Add coins 2 and 8. Now we can form all values 1-19.

Input: coins = [1, 4, 10, 5, 7, 19], target = 19
Output: 1
```

## Approach

Sort the coins. Track the maximum obtainable sum. For each coin, if it's greater than `obtainable + 1`, we must add `obtainable + 1` to extend our range. Otherwise, add the coin value to the obtainable sum. Repeat until we reach the target.

## C# Solution

```csharp
public class Solution
{
    public int MinimumAddedCoins(int[] coins, int target)
    {
        Array.Sort(coins);
        int added = 0;
        int obtainable = 0;
        int i = 0;

        while (obtainable < target)
        {
            if (i < coins.Length && coins[i] <= obtainable + 1)
            {
                obtainable += coins[i];
                i++;
            }
            else
            {
                obtainable += obtainable + 1;
                added++;
            }
        }

        return added;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1)
