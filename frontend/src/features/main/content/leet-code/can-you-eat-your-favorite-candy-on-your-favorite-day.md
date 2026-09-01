# 1744. Can You Eat Your Favorite Candy on Your Favorite Day?

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

Given `candiesCount` (the count of each candy type) and `queries` where `queries[i] = [favoriteTypei, favoriteDayi, dailyCapi]`, determine for each query whether it is possible to eat a candy of type `favoriteTypei` on day `favoriteDayi` (0-indexed), assuming you eat at least `1` and at most `dailyCapi` candies per day, in type order.

### Example

```
Input: candiesCount = [7,4,5,3,8], queries = [[0,2,2],[4,2,4],[2,13,1000000000]]
Output: [true,false,true]
```

## Approach

Build prefix sums of `candiesCount` so the range of indices occupied by a given type is known. For a query, the number of candies eaten by the end of `favoriteDay` ranges from `favoriteDay + 1` (eating the minimum of one per day) to `(favoriteDay + 1) * dailyCap` (eating the maximum). The query is satisfiable if that range overlaps the index range occupied by `favoriteType`.

## C# Solution

```csharp
public class Solution
{
    public bool[] CanEat(int[] candiesCount, int[][] queries)
    {
        int n = candiesCount.Length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + candiesCount[i];

        bool[] result = new bool[queries.Length];
        for (int i = 0; i < queries.Length; i++)
        {
            int type = queries[i][0];
            long day = queries[i][1] + 1;
            long cap = queries[i][2];

            long minEaten = day;
            long maxEaten = day * cap;

            result[i] = minEaten <= prefix[type + 1] && maxEaten > prefix[type];
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + q)`.
- **Space:** `O(n)` for the prefix sums.
