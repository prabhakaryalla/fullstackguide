# 3447. Assign Elements to Groups with Constraints

**Difficulty:** Medium
**Category:** Array, Hash Table, Math

## Problem

You are given an integer array `groups` and an integer array `elements`. For each `groups[i]`, find the smallest index `j` in `elements` such that `elements[j]` evenly divides `groups[i]`. If no such element exists, the answer for that group is `-1`. Return an array `assigned` where `assigned[i]` is this index for `groups[i]`.

### Example

`groups = [8,4,3], elements = [4,2]` → `[0,0,-1]`. `elements[0] = 4` divides both `8` and `4`, and no element divides `3`.

## Approach

Let `maxGroup` be the largest value in `groups`. For every element value (skipping non-positive values and values larger than `maxGroup`, since they cannot divide any group), sieve through all of its multiples up to `maxGroup` and record the element's index as the answer for that multiple, but only if no earlier (smaller-index) element has already claimed it. After the sieve, each group value can be answered with a direct array lookup.

## C# Solution

```csharp
public class Solution 
{
    public int[] AssignElements(int[] groups, int[] elements) 
    {
        int maxGroup = 0;
        foreach (int g in groups)
            maxGroup = Math.Max(maxGroup, g);

        int[] best = new int[maxGroup + 1];
        Array.Fill(best, -1);

        for (int j = 0; j < elements.Length; j++)
        {
            int val = elements[j];
            if (val <= 0 || val > maxGroup) continue;

            for (int m = val; m <= maxGroup; m += val)
            {
                if (best[m] == -1)
                    best[m] = j;
            }
        }

        int n = groups.Length;
        int[] result = new int[n];
        for (int i = 0; i < n; i++)
            result[i] = best[groups[i]];

        return result;
    }
}
```

## Complexity

- **Time:** O(maxGroup log(maxGroup)) for the sieve, plus O(n) for the lookups
- **Space:** O(maxGroup)
