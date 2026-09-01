# 2285. Maximum Total Importance of Roads

**Difficulty:** Medium
**Category:** Graph, Greedy, Sorting

## Problem

You are given an integer `n` denoting the number of cities numbered from 0 to `n - 1`, and a 2D array `roads` where `roads[i] = [a[i], b[i]]` denotes a bidirectional road between cities `a[i]` and `b[i]`.

You must assign each city an integer value from 1 to `n` where each value can only be used once. The importance of a road is the sum of the values of the two cities it connects.

Return the maximum total importance of all roads possible after assigning the values optimally.

### Example

```
Input: n = 5, roads = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]
Output: 43
Explanation: Assign cities with higher degree higher values: city 2 (degree 4) → 5, city 1 (degree 3) → 4, etc.
```

## Approach

Calculate the degree of each city (number of roads connected). Sort cities by degree in descending order and assign values from `n` down to 1. The total importance is the sum of degrees weighted by their assigned values.

## C# Solution

```csharp
public class Solution
{
    public long MaximumImportance(int n, int[][] roads)
    {
        long[] degree = new long[n];
        
        foreach (var road in roads)
        {
            degree[road[0]]++;
            degree[road[1]]++;
        }
        
        Array.Sort(degree);
        
        long total = 0;
        for (int i = 0; i < n; i++)
        {
            total += degree[i] * (i + 1);
        }
        
        return total;
    }
}
```

## Complexity

- **Time:** O(m + n log n) where m is number of roads.
- **Space:** O(n) for degree array.
