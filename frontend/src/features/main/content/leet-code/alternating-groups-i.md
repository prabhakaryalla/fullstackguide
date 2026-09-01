# 3206. Alternating Groups I

**Difficulty:** Easy
**Category:** Array, Sliding Window

## Problem
Balls arranged in a circle are colored either red or blue. A ball is part of an "alternating group" if it and both of its immediate neighbors (previous and next, wrapping around the circle) form a strict alternating pattern of colors (i.e., the ball differs in color from both its left and right neighbor). Count how many balls belong to such an alternating group of exactly size 3.

## Approach
Iterate through every ball in the circular array (using modular arithmetic to wrap around at the boundaries), and check whether its color differs from both its immediate left neighbor and its immediate right neighbor. If both conditions hold, increment the counter.

## C# Solution
```csharp
public class Solution {
    public int NumberOfAlternatingGroups(int[] colors) {
        int n = colors.Length;
        int ans = 0;

        for (int i = 0; i < n; i++)
            if (colors[i] != colors[(i - 1 + n) % n] && colors[i] != colors[(i + 1) % n])
                ans++;

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
