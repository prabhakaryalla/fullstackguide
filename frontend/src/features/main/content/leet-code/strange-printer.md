# 664. Strange Printer

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

A strange printer prints a sequence of the same character each time, and can overwrite any existing printed characters with a new character over a contiguous range. Given a string `s`, return the minimum number of print operations needed to produce it.

### Example

```
Input: s = "aba"
Output: 2
Explanation: Print "aaa", then overwrite the middle 'a' with 'b'.
```

### Constraints

- `1 <= s.length <= 100`

## Approach

Use interval dynamic programming where `dp[i][j]` is the minimum operations to print `s[i..j]`. As a baseline, printing `s[i..j-1]` and then separately printing `s[j]` costs `dp[i][j-1] + 1`. But if some earlier character `s[k]` (for `i <= k < j`) matches `s[j]`, that same print stroke used for `s[k]` can be extended to also cover `s[j]` without an extra operation, giving a potentially cheaper `dp[i][k] + dp[k+1][j-1]` (merging the stroke that produces `s[k]` and `s[j]` together).

## C# Solution

```csharp
public class Solution
{
    public int StrangePrinter(string s)
    {
        int n = s.Length;
        var dp = new int[n, n];

        for (int i = 0; i < n; i++)
            dp[i, i] = 1;

        for (int len = 2; len <= n; len++)
        {
            for (int i = 0; i + len - 1 < n; i++)
            {
                int j = i + len - 1;
                dp[i, j] = dp[i, j - 1] + 1;

                for (int k = i; k < j; k++)
                {
                    if (s[k] == s[j])
                        dp[i, j] = Math.Min(dp[i, j], dp[i, k] + (k + 1 <= j - 1 ? dp[k + 1, j - 1] : 0));
                }
            }
        }

        return dp[0, n - 1];
    }
}
```

## Complexity

- **Time:** `O(n^3)`.
- **Space:** `O(n^2)` for the DP table.
