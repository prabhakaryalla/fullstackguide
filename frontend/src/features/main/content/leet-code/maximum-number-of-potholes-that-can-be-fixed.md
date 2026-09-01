# 3119. Maximum Number of Potholes That Can Be Fixed

**Difficulty:** Medium
**Category:** Array, String, Greedy, Sorting

## Problem

You are given a string `road` made of `'x'` (pothole) and `'.'` (smooth road) characters, and an integer `budget`. Repairing a maximal contiguous run of potholes of length `L` costs `L + 1` "units" of budget (fixing all of it), or `min(L, budget - 1)` potholes can be partially repaired with whatever budget remains. Return the maximum total number of potholes ('x' characters) you can repair.

## Approach

Split `road` on `'.'` to get the lengths of each maximal pothole run, and sort them descending — it's always better to fully fix the biggest runs first since a full fix only "wastes" 1 extra unit of budget (for the boundary), while partial fixes waste nothing extra. Greedily go through runs largest to smallest: if the remaining budget (minus 1, the fixed overhead) can't cover the whole run, spend everything on a partial fix of that run and stop; otherwise fully repair it and move to the next run.

## C# Solution

```csharp
public class Solution {
    public int MaxPotholes(string road, int budget) {
        int ans = 0;

        foreach (int length in GetSortedPotholeLengths(road)) {
            int canRepair = Math.Max(0, budget - 1);
            if (length > canRepair)
                return ans + canRepair;
            ans += length;
            budget -= length + 1;
        }

        return ans;
    }

    private List<int> GetSortedPotholeLengths(string road) {
        var lengths = road.Split('.').Select(p => p.Length).ToList();
        lengths.Sort((a, b) => b - a);
        return lengths;
    }
}
```

## Complexity

- Time: O(n log n) — dominated by sorting the pothole run lengths.
- Space: O(n) — the list of run lengths.
