# 691. Stickers to Spell Word

**Difficulty:** Hard
**Category:** Array, Hash Table, String, Dynamic Programming, Backtracking, Bitmask

## Problem

Given an array of `stickers`, each containing lowercase letters, and a `target` string, return the minimum number of stickers needed to spell out `target` (letters from any sticker can be used, cutting individual letters and using each sticker as many times as needed). Return `-1` if impossible.

### Example

```
Input: stickers = ["with","example","science"], target = "thehat"
Output: 3
```

## Approach

Use bitmask dynamic programming where each bit represents whether a corresponding letter of `target` has been covered so far. `dp[mask]` is the minimum stickers needed to cover exactly the letters represented by `mask`. Starting from `dp[0] = 0`, for every reachable mask, try applying each sticker: greedily consume as many of the sticker's letters as possible toward filling in target positions not yet covered by `mask`, producing a new mask, and update that new mask's minimum sticker count if improved.

## C# Solution

```csharp
public class Solution
{
    public int MinStickers(string[] stickers, string target)
    {
        int n = target.Length;
        var dp = new int[1 << n];
        Array.Fill(dp, -1);
        dp[0] = 0;

        for (int mask = 0; mask < (1 << n); mask++)
        {
            if (dp[mask] == -1) continue;

            foreach (var sticker in stickers)
            {
                int newMask = mask;
                var counts = new int[26];
                foreach (var c in sticker)
                    counts[c - 'a']++;

                for (int i = 0; i < n; i++)
                {
                    if ((newMask & (1 << i)) != 0) continue;

                    int letter = target[i] - 'a';
                    if (counts[letter] > 0)
                    {
                        counts[letter]--;
                        newMask |= 1 << i;
                    }
                }

                if (dp[newMask] == -1 || dp[newMask] > dp[mask] + 1)
                    dp[newMask] = dp[mask] + 1;
            }
        }

        return dp[(1 << n) - 1];
    }
}
```

## Complexity

- **Time:** `O(2^n * stickers.Length * n)`.
- **Space:** `O(2^n)` for the DP array.
