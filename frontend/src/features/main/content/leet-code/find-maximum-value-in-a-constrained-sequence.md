# 3796. Find Maximum Value in a Constrained Sequence

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Construct a sequence `a[0..n-1]` with `a[0] = 0`, all elements non-negative, `abs(a[i]-a[i+1]) <= diff[i]` for every `i`, and `a[idx] <= maxVal` for each `restrictions[i] = [idx, maxVal]`. Return the maximum value achievable anywhere in an optimal such sequence.

### Example

Input: `n = 10, restrictions = [[3,1],[8,1]], diff = [2,2,3,1,4,5,1,1,2]`
Output: `6`

## Approach

Initialize an upper bound array with `bound[0] = 0` and each restricted index capped at its `maxVal`. Propagate bounds forward (`bound[i] = min(bound[i], bound[i-1] + diff[i-1])`) then backward (`bound[i] = min(bound[i], bound[i+1] + diff[i])`), which correctly combines constraints from both directions. The answer is the maximum value in the final bound array.

## C# Solution

```csharp
public class Solution 
{
    public long MaxValue(int n, int[][] restrictions, int[] diff) 
    {
        const long INF = long.MaxValue / 2;
        var bound = new long[n];
        Array.Fill(bound, INF);
        bound[0] = 0;
        foreach (var r in restrictions)
        {
            bound[r[0]] = Math.Min(bound[r[0]], r[1]);
        }

        for (int i = 1; i < n; i++)
            bound[i] = Math.Min(bound[i], bound[i - 1] + diff[i - 1]);

        for (int i = n - 2; i >= 0; i--)
            bound[i] = Math.Min(bound[i], bound[i + 1] + diff[i]);

        long best = 0;
        for (int i = 0; i < n; i++) best = Math.Max(best, bound[i]);
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
