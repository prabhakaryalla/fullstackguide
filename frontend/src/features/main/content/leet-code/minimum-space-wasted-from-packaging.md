# 1889. Minimum Space Wasted From Packaging

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Sorting, Prefix Sum

## Problem

Given `packages[i]` sizes and a list of suppliers, each offering a set of box sizes (`boxes[j]`), choose a single supplier and assign every package to the smallest available box from that supplier that can fit it. Return the minimum possible total wasted space (sum of box sizes minus sum of package sizes) across all suppliers capable of packing every package, modulo `1e9 + 7`, or `-1` if no supplier can pack everything.

### Example

```
Input: packages = [2,3,5], boxes = [[4,8],[2,8]]
Output: 6
```

## Approach

Sort `packages` and precompute their prefix sum. For each supplier, sort their box sizes; if even the largest box can't fit the largest package, that supplier is disqualified. Otherwise, walk the sorted boxes in increasing order: for each box size, binary search (`UpperBound`) how many not-yet-assigned packages (starting from the smallest unassigned) fit into it, and add `boxSize * count` to that supplier's total used space. Track the minimum total used space across all valid suppliers, and subtract the total package size to get the minimum waste.

## C# Solution

```csharp
public class Solution
{
    public int MinWastedSpace(int[] packages, int[][] boxes)
    {
        const int Mod = 1_000_000_007;
        Array.Sort(packages);
        int n = packages.Length;
        var prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + packages[i];

        long best = long.MaxValue;

        foreach (var supplierBoxes in boxes)
        {
            var sortedBoxes = (int[])supplierBoxes.Clone();
            Array.Sort(sortedBoxes);

            if (sortedBoxes[^1] < packages[^1]) continue;

            long used = 0;
            int prevIndex = 0;

            foreach (int box in sortedBoxes)
            {
                int idx = UpperBound(packages, box, prevIndex);
                if (idx > prevIndex)
                {
                    long count = idx - prevIndex;
                    used += count * box;
                    prevIndex = idx;
                }
            }

            best = Math.Min(best, used);
        }

        if (best == long.MaxValue) return -1;

        long waste = (best - prefix[n]) % Mod;
        return (int)waste;
    }

    private int UpperBound(int[] arr, int value, int from)
    {
        int lo = from, hi = arr.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] <= value) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O((n + b) log n)` where `b` is the total number of boxes across all suppliers.
- **Space:** `O(n)` for the prefix sums.
