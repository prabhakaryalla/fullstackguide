# 3443. Maximum Manhattan Distance After K Changes

**Difficulty:** Medium
**Category:** String, Greedy, Prefix Sum

## Problem

You are given a string `s` consisting of the characters `'N'`, `'S'`, `'E'`, and `'W'`, representing moves on an infinite grid starting from `(0, 0)`, and an integer `k`. You may change up to `k` characters of `s` to any of the four directions before performing all the moves. Return the maximum possible Manhattan distance from the origin after performing all `n` moves.

### Example

`s = "NSWWEE", k = 1` → changing one character optimally lets the walk drift further in one consistent direction than the unmodified string would allow, maximizing `|x| + |y|` at the end of the walk.

## Approach

The Manhattan distance `|x| + |y|` equals `max` over the four sign combinations `(sx, sy) ∈ {+1,-1}²` of `sx * x + sy * y`. For a fixed sign combination, every character contributes exactly `+1` (if it already matches the preferred direction for its axis) or `-1` (otherwise) to that combination's score — changing a "wrong" character to the preferred direction flips its contribution from `-1` to `+1`. So for each of the 4 combinations, count how many characters already contribute `+1` versus `-1`, then greedily convert up to `k` of the `-1` contributions into `+1`. Take the best result across all 4 combinations.

## C# Solution

```csharp
public class Solution 
{
    public int MaxDistance(string s, int k) 
    {
        int n = s.Length;
        int best = 0;
        char[] vertPrefs = { 'N', 'N', 'S', 'S' };
        char[] horizPrefs = { 'E', 'W', 'E', 'W' };

        for (int c = 0; c < 4; c++)
        {
            char vp = vertPrefs[c];
            char hp = horizPrefs[c];
            int minus = 0;

            foreach (char ch in s)
            {
                bool isVertical = ch == 'N' || ch == 'S';
                bool matches = isVertical ? ch == vp : ch == hp;
                if (!matches) minus++;
            }

            int plus = n - minus;
            int total = k >= minus ? n : plus - minus + 2 * k;
            best = Math.Max(best, total);
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
