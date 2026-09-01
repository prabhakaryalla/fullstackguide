# 3320. Count The Number of Winning Sequences

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Alice and Bob play a game over `n` rounds, each summoning a Fire Dragon (`'F'`), Water Serpent (`'W'`), or Earth Golem (`'E'`). Rules per round:
- Fire beats Earth, Water beats Fire, Earth beats Water (a point to the winner); same creature means no point.

Alice's sequence is given as string `s`. Bob's moves are unknown, but he never repeats the same creature in two consecutive rounds. Bob wins if his total points strictly exceed Alice's.

Return the number of distinct sequences Bob can use to beat Alice, modulo `10^9 + 7`.

### Example

Input: `s = "FFF"`

Output: `3`

## Approach

Use DP over `dp[j][k]` = number of ways for a prefix of moves such that the running score difference (Bob's points minus Alice's) is `j`, and Bob's last move was `k`. The difference `j` ranges over `[-n, n]`, so offset it by `n` to index into an array.

For each new round `i`, for every previous state `(j, k)`, try every next Bob move `k' != k`, update the score difference using the win/lose/tie rule against `s[i]`, and accumulate into the new DP layer.

The final answer sums all states where the score difference is strictly positive, over all last moves.

## C# Solution

```csharp
public class Solution 
{
    private static readonly char[] Moves = { 'F', 'W', 'E' };
    private const int MOD = 1_000_000_007;

    private int Delta(char bob, char alice)
    {
        if (bob == alice) return 0;
        bool bobWins = (bob == 'F' && alice == 'E') ||
                       (bob == 'W' && alice == 'F') ||
                       (bob == 'E' && alice == 'W');
        return bobWins ? 1 : -1;
    }

    public int CountWinningSequences(string s) 
    {
        int n = s.Length;
        int offset = n;
        int size = 2 * n + 1;

        long[,] dp = new long[size, 3];
        for (int k = 0; k < 3; k++)
        {
            int d = Delta(Moves[k], s[0]);
            dp[offset + d, k] = (dp[offset + d, k] + 1) % MOD;
        }

        for (int i = 1; i < n; i++)
        {
            long[,] ndp = new long[size, 3];
            char a = s[i];
            for (int j = 0; j < size; j++)
            {
                for (int k = 0; k < 3; k++)
                {
                    long val = dp[j, k];
                    if (val == 0) continue;
                    for (int k2 = 0; k2 < 3; k2++)
                    {
                        if (k2 == k) continue;
                        int d = Delta(Moves[k2], a);
                        int nj = j + d;
                        if (nj < 0 || nj >= size) continue;
                        ndp[nj, k2] = (ndp[nj, k2] + val) % MOD;
                    }
                }
            }
            dp = ndp;
        }

        long ans = 0;
        for (int j = offset + 1; j < size; j++)
        {
            for (int k = 0; k < 3; k++) ans = (ans + dp[j, k]) % MOD;
        }
        return (int)ans;
    }
}
```

## Complexity

- **Time:** O(n^2) — for each of the n rounds, iterate over O(n) score-difference states and O(1) move transitions.
- **Space:** O(n) for the DP layer.
