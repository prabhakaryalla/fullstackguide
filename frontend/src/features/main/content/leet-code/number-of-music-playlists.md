# 920. Number of Music Playlists

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Combinatorics

## Problem

Given `n` songs, a playlist length `goal`, and an integer `k`, count playlists of length `goal` such that every song is played at least once, and a song can only repeat after at least `k` other different songs have played. Return the count modulo `10^9 + 7`.

### Example

```
Input: n = 3, goal = 3, k = 1
Output: 6
```

## Approach

Let `dp[i][j]` be the number of playlists of length `i` using exactly `j` distinct songs. Each new slot is either a brand-new song (`n - j + 1` choices from `dp[i-1][j-1]`) or a previously used song that isn't one of the last `k` played (`j - k` choices from `dp[i-1][j]`, valid only when `j > k`).

## C# Solution

```csharp
public class Solution
{
    public int NumMusicPlaylists(int n, int goal, int k)
    {
        const long MOD = 1_000_000_007;
        var dp = new long[goal + 1, n + 1];
        dp[0, 0] = 1;

        for (int i = 1; i <= goal; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                dp[i, j] = dp[i - 1, j - 1] * (n - j + 1) % MOD;
                if (j > k) dp[i, j] = (dp[i, j] + dp[i - 1, j] * (j - k)) % MOD;
            }
        }

        return (int)dp[goal, n];
    }
}
```

## Complexity

- **Time:** `O(goal * n)`.
- **Space:** `O(goal * n)`.
