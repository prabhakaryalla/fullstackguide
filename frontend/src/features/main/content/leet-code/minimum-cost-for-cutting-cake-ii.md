# 3219. Minimum Cost for Cutting Cake II

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting

## Problem
This is the larger-constraints version of "Minimum Cost for Cutting Cake I": given a rectangular cake and lists of horizontal and vertical cut costs, determine the minimum total cost to fully cut the cake into unit pieces, now for much larger input sizes.

## Approach
The identical greedy strategy from the smaller-constraints version applies, since it already runs efficiently at O(m log m + n log n): always perform whichever remaining cut (horizontal or vertical) currently has the higher cost, since doing the more expensive cut earlier means fewer subsequent pieces get multiplied by that cost. Sort both cut cost lists in descending order and use two pointers to greedily select the more expensive available cut at each step, using 64-bit arithmetic throughout since the totals can be very large for bigger inputs.

## C# Solution
```csharp
public class Solution {
    public long MinimumCost(int m, int n, int[] horizontalCut, int[] verticalCut) {
        long cost = 0;
        long sumH = 0, sumV = 0;
        foreach (int h in horizontalCut) sumH += h;
        foreach (int v in verticalCut) sumV += v;

        Array.Sort(horizontalCut);
        Array.Reverse(horizontalCut);
        Array.Sort(verticalCut);
        Array.Reverse(verticalCut);

        int i = 0, j = 0;
        while (i < m - 1 && j < n - 1) {
            if (horizontalCut[i] > verticalCut[j]) {
                cost += horizontalCut[i] + sumV;
                sumH -= horizontalCut[i++];
            } else {
                cost += verticalCut[j] + sumH;
                sumV -= verticalCut[j++];
            }
        }

        return cost + sumH + sumV;
    }
}
```

## Complexity
- Time: O(m log m + n log n)
- Space: O(1) extra (ignoring sort's internal space)
