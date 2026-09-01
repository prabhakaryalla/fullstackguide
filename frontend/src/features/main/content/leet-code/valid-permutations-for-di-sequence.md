# 903. Valid Permutations for DI Sequence

**Difficulty:** Hard
**Category:** Array, String, Dynamic Programming

## Problem

Given a string `s` of length `n` consisting only of characters `'D'` (decrease) and `'I'` (increase), count the permutations of `[0, 1, ..., n]` that match the pattern, where `s[i] == 'I'` requires `perm[i] < perm[i + 1]` and `s[i] == 'D'` requires `perm[i] > perm[i + 1]`. Return the answer modulo `10^9 + 7`.

### Example

```
Input: s = "DID"
Output: 5
```

## Approach

Use a DP where `dp[j]` represents the number of valid arrangements of the numbers used so far such that the last placed value has rank `j` among them. For `'I'`, the new rank's count is the prefix sum of the previous `dp` up to `j`; for `'D'`, it's the suffix sum from `j + 1` onward. Rebuild the array each step since the number of valid ranks shrinks by one.

## C# Solution

```csharp
public class Solution
{
    public int NumPermsDISequence(string s)
    {
        const int MOD = 1_000_000_007;
        int n = s.Length;
        var dp = new int[n + 1];
        Array.Fill(dp, 1);

        for (int i = 0; i < n; i++)
        {
            var next = new int[n - i];

            if (s[i] == 'I')
            {
                long sum = 0;
                for (int j = 0; j < next.Length; j++)
                {
                    sum = (sum + dp[j]) % MOD;
                    next[j] = (int)sum;
                }
            }
            else
            {
                long sum = 0;
                for (int j = next.Length - 1; j >= 0; j--)
                {
                    sum = (sum + dp[j + 1]) % MOD;
                    next[j] = (int)sum;
                }
            }

            dp = next;
        }

        return dp[0];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)`.
