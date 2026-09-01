# 3200. Maximum Height of a Triangle

**Difficulty:** Easy
**Category:** Array, Enumeration, Math

## Problem
You want to arrange colored balls into a triangle shape, where row 1 has 1 ball, row 2 has 2 balls, row 3 has 3 balls, and so on, with each row alternating strictly in color from the row before it (no two adjacent rows share a color). Given a count of red balls and blue balls, and the constraint that all balls used in any single row must be the same color, determine the maximum possible height of such a triangle (using at most the given counts of each color, and not needing to use all balls).

## Approach
Try both possible starting colors: starting with red on odd rows (1st, 3rd, 5th, ...) and blue on even rows, or vice versa. For a fixed assignment of "odd rows get color with count n1" and "even rows get color with count n2", compute the maximum achievable height greedily: find the largest `h` such that the total balls needed for odd rows up to height `h` doesn't exceed `n1`, and separately the largest `h` such that even rows up to height `h` doesn't exceed `n2` (each derivable via closed-form sum-of-arithmetic-series formulas solved for `h`, using square roots). The overall maximum row height achievable for this color assignment is the minimum of the two, plus one extra row if the difference between the two bounds is at least 1 (since one color can extend one row further if it has enough balls left while the other has just been exhausted). Take the best result over both starting-color assignments.

## C# Solution
```csharp
public class Solution {
    public int MaxHeightOfTriangle(int red, int blue) {
        return Math.Max(MaxHeight(red, blue), MaxHeight(blue, red));
    }

    private int MaxHeight(int n1, int n2) {
        int oddHeight = (int)Math.Sqrt(4.0 * n1) - 1;
        int evenHeight = (int)Math.Sqrt(4.0 * n2 + 1) - 1;
        return Math.Min(oddHeight, evenHeight) + (Math.Abs(oddHeight - evenHeight) >= 1 ? 1 : 0);
    }
}
```

## Complexity
- Time: O(log(max(red, blue))) due to the square root computation
- Space: O(1)
