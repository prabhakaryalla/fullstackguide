# 3238. Find the Number of Winning Players

**Difficulty:** Easy
**Category:** Array, Counting, Hash Table

## Problem
There are `n` players (numbered 0 to n-1), each picking balls of various colors over time, recorded as a list of `[player, color]` pairs. A player is a "winner" if, for at least one color, they have picked strictly more balls of that color than their own player index (player `i` needs more than `i` balls of some single color to win). Count the number of winning players.

## Approach
Maintain a 2D frequency table counting, for each player and each possible color, how many times that player picked that color. After processing all picks, for every player, find the maximum count across all colors they've picked; if that maximum exceeds the player's own index, they qualify as a winner.

## C# Solution
```csharp
public class Solution {
    public int WinnerCount(int n, int[][] pick) {
        const int kMaxColor = 10;
        int ans = 0;
        int[,] counts = new int[n, kMaxColor + 1];

        foreach (int[] p in pick) {
            int player = p[0];
            int color = p[1];
            counts[player, color]++;
        }

        for (int i = 0; i < n; i++) {
            int maxCount = 0;
            for (int c = 0; c <= kMaxColor; c++)
                maxCount = Math.Max(maxCount, counts[i, c]);
            if (maxCount > i)
                ans++;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n + |pick|)
- Space: O(n)
