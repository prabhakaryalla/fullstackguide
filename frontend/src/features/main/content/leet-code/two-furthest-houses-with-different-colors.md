# 2078. Two Furthest Houses With Different Colors

**Difficulty:** Easy
**Category:** Array, Greedy, Two Pointers

## Problem

There are `n` houses in a line, each painted a color given in the array `colors`. Return *the maximum distance `|i - j|`* between two houses `i` and `j` such that `colors[i] != colors[j]`.

## Approach

The optimal pair always includes either the very first or the very last house (since extending to an endpoint can only increase the distance, and there's always a house somewhere with a different color from a given endpoint as long as not all houses share the same color). So it suffices to check two candidates: the farthest house from the front with a color different from `colors[0]`, and the farthest house from the back with a color different from `colors[n - 1]`. Take the maximum distance found across both checks.

## C# Solution

```csharp
public class Solution
{
    public int MaxDistance(int[] colors)
    {
        int n = colors.Length;
        int best = 0;

        for (int j = n - 1; j >= 0; j--)
        {
            if (colors[j] != colors[0])
            {
                best = Math.Max(best, j);
                break;
            }
        }

        for (int i = 0; i < n; i++)
        {
            if (colors[i] != colors[n - 1])
            {
                best = Math.Max(best, n - 1 - i);
                break;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
