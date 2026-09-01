# 3668. Restore Finishing Order

**Difficulty:** Easy
**Category:** Array, Sorting, Simulation

## Problem
You are given two arrays, `names` and `positions`, of the same length `n`, where `names[i]` is the name of the competitor who finished at rank `positions[i]` (ranks are a permutation of `1` to `n`).

Return an array of the names ordered by their finishing position, from first place to last place.

## Approach
Since `positions` is guaranteed to be a permutation of `1..n`, we can directly place each name into a result array at index `positions[i] - 1`. This avoids any need for sorting.

## C# Solution

```csharp
public class Solution
{
    public string[] RestoreOrder(string[] names, int[] positions)
    {
        int n = names.Length;
        string[] result = new string[n];

        for (int i = 0; i < n; i++)
        {
            result[positions[i] - 1] = names[i];
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
