# 3096. Minimum Levels to Gain More Points

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

There are `n` levels, where level `i` is either "possible" (`possible[i] = 1`, worth `+1` point) or "impossible" (`possible[i] = 0`, worth `-1` point, since attempting it costs a point). Two players alternately clear a prefix and suffix of the levels (player 1 takes some prefix, player 2 takes the rest). Return the minimum number of levels player 1 must take so that player 1's total score is strictly greater than player 2's, or `-1` if impossible.

## Approach

Convert each level to `+1` or `-1` and build a prefix-sum array. Player 1 taking the first `i` levels scores `prefix[i]`, and player 2 scores the remainder `prefix[n] - prefix[i]`. Find the smallest `i` (from `1` to `n-1`) where `prefix[i] > prefix[n] - prefix[i]`.

## C# Solution

```csharp
public class Solution {
    public int MinimumLevels(int[] possible) {
        int n = possible.Length;
        int[] prefix = new int[n + 1];

        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + (possible[i] == 1 ? 1 : -1);

        for (int i = 1; i < n; i++)
            if (prefix[i] > prefix[n] - prefix[i])
                return i;

        return -1;
    }
}
```

## Complexity

- Time: O(n) — building the prefix sums and scanning once.
- Space: O(n) — the prefix-sum array.
