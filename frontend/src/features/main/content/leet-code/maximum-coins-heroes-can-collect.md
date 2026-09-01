# 2838. Maximum Coins Heroes Can Collect

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two 0-indexed arrays `heroes` and `monsters` of length `n` and `m` representing the powers of heroes and monsters, and a 0-indexed array `coins` where `coins[i]` is the reward for defeating `monsters[i]`. A hero can defeat a monster if the hero's power is greater than or equal to the monster's power. For each hero, return the maximum total coins they can collect by defeating any subset of monsters they are able to beat.

### Example

Input: heroes = [1,4,2], monsters = [1,1,5,2,3], coins = [2,3,4,5,6]
Output: [5,16,10]
Explanation: Hero with power 1 can defeat monsters of power <= 1 (both power-1 monsters), collecting 2+3=5 coins. Hero with power 4 can defeat monsters with power <=4 (all except the power-5 monster), collecting 2+3+5+6=16. Hero with power 2 can defeat monsters of power <=2, collecting 2+3+5=10.

## Approach

Sort the monsters by power, keeping their coin values paired, and build a prefix-sum array of coins in that sorted order. For each hero, binary search for the number of monsters with power at most the hero's power, then read the corresponding prefix sum directly.

## C# Solution

```csharp
public class Solution 
{
    public long[] MaximumCoins(int[] heroes, int[] monsters, int[] coins) 
    {
        int m = monsters.Length;
        var order = new int[m];
        for (int i = 0; i < m; i++) order[i] = i;
        Array.Sort(order, (a, b) => monsters[a].CompareTo(monsters[b]));

        var sortedPower = new int[m];
        var prefixCoins = new long[m + 1];
        for (int i = 0; i < m; i++) 
        {
            sortedPower[i] = monsters[order[i]];
            prefixCoins[i + 1] = prefixCoins[i] + coins[order[i]];
        }

        int n = heroes.Length;
        var result = new long[n];
        for (int i = 0; i < n; i++) 
        {
            int lo = 0, hi = m;
            while (lo < hi) 
            {
                int mid = (lo + hi) / 2;
                if (sortedPower[mid] <= heroes[i]) lo = mid + 1;
                else hi = mid;
            }
            result[i] = prefixCoins[lo];
        }

        return result;
    }
}
```

## Complexity

- **Time:** O((n + m) log m)
- **Space:** O(m)
