# 3160. Find the Number of Distinct Colors Among the Balls

**Difficulty:** Medium
**Category:** Array, Hash Table, Simulation

## Problem
There are `limit + 1` balls, numbered `0` to `limit`, all initially uncolored. You are given a list of queries, where each query `[ball, color]` assigns the given color to the given ball (overwriting any previous color). After processing each query, report the number of distinct colors currently in use across all balls.

## Approach
Maintain a map from ball number to its current color, and a map from color to a count of how many balls currently have that color. For each query, if the ball already had a color, decrement that color's count (removing the color from the count map if it drops to zero). Then assign the new color to the ball and increment that color's count. After each query, the number of distinct colors is simply the size of the color-count map.

## C# Solution
```csharp
public class Solution {
    public int[] QueryResults(int limit, int[][] queries) {
        List<int> ans = new List<int>();
        Dictionary<int, int> ballToColor = new Dictionary<int, int>();
        Dictionary<int, int> colorCount = new Dictionary<int, int>();

        foreach (int[] query in queries) {
            int ball = query[0];
            int color = query[1];

            if (ballToColor.TryGetValue(ball, out int prevColor)) {
                colorCount[prevColor]--;
                if (colorCount[prevColor] == 0)
                    colorCount.Remove(prevColor);
            }

            ballToColor[ball] = color;
            colorCount[color] = colorCount.GetValueOrDefault(color, 0) + 1;
            ans.Add(colorCount.Count);
        }

        return ans.ToArray();
    }
}
```

## Complexity
- Time: O(q)
- Space: O(q)
