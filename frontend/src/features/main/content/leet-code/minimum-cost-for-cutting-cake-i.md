# 3218. Minimum Cost for Cutting Cake I

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy, Sorting

## Problem
You have a rectangular cake of dimensions `m x n`. You must fully cut it into 1x1 pieces using a sequence of horizontal and vertical cuts, where each possible horizontal cut position and vertical cut position has an associated cost. Cutting through a piece costs the cost of that cut line, and cutting a piece that spans multiple rows/columns simultaneously incurs the cut cost multiplied by however many pieces the cut currently passes through. Return the minimum total cost to fully cut the cake into unit pieces.

## Approach
The key greedy insight is that whichever cut (horizontal or vertical) has the higher cost should always be performed first, before the cake is subdivided further in that direction, since performing the more expensive cut early means it multiplies across fewer already-separated pieces. Sort both the horizontal and vertical cut costs in descending order. Use two pointers into these sorted lists, always choosing the currently larger available cut cost to apply next: paying that cut's cost multiplied by the number of pieces the perpendicular direction has already been divided into (tracked via running remaining sums). Continue until all cuts of one direction are exhausted, then apply any remaining cuts of the other direction (each multiplied by the full width/height, since no more subdivisions remain in the exhausted direction).

## C# Solution
```csharp
public class Solution {
    public int MinimumCost(int m, int n, int[] horizontalCut, int[] verticalCut) {
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

        return (int)(cost + sumH + sumV);
    }
}
```

## Complexity
- Time: O(m log m + n log n)
- Space: O(1) extra (ignoring sort's internal space)
