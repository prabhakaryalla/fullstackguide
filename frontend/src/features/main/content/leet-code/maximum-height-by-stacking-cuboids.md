# 1691. Maximum Height by Stacking Cuboids

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Sorting

## Problem

Given `cuboids[i] = [width, length, height]`, you may reorient each cuboid arbitrarily and stack cuboids on top of each other, but a cuboid can only be placed on another if its width, length, and height are each less than or equal to the corresponding dimension of the one below. Return the maximum total height achievable.

### Example

```
Input: cuboids = [[50,45,20],[95,37,53],[45,23,12]]
Output: 190
```

## Approach

Sort each cuboid's three dimensions ascending internally — this is safe because reorientation is free, and using the smallest dimension as "width," middle as "length," and largest as "height" is always at least as good for stacking flexibility. Then sort the cuboids lexicographically by their sorted dimensions. With this ordering, cuboid `j` can rest on cuboid `i` (`i` before `j`) exactly when every one of cuboid `i`'s sorted dimensions is `<=` the corresponding dimension of cuboid `j`. This reduces the problem to a longest-increasing-subsequence-style DP where `dp[i]` is the tallest stack ending with cuboid `i`, built from any valid earlier cuboid `dp[j]` plus cuboid `i`'s height (its largest dimension after sorting).

## C# Solution

```csharp
public class Solution
{
    public int MaxHeight(int[][] cuboids)
    {
        foreach (var cuboid in cuboids)
        {
            Array.Sort(cuboid);
        }

        Array.Sort(cuboids, (a, b) =>
        {
            if (a[0] != b[0]) return a[0] - b[0];
            if (a[1] != b[1]) return a[1] - b[1];
            return a[2] - b[2];
        });

        int n = cuboids.Length;
        int[] dp = new int[n];
        int best = 0;

        for (int i = 0; i < n; i++)
        {
            dp[i] = cuboids[i][2];

            for (int j = 0; j < i; j++)
            {
                if (cuboids[j][0] <= cuboids[i][0] && cuboids[j][1] <= cuboids[i][1] && cuboids[j][2] <= cuboids[i][2])
                {
                    dp[i] = Math.Max(dp[i], dp[j] + cuboids[i][2]);
                }
            }

            best = Math.Max(best, dp[i]);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)`.
