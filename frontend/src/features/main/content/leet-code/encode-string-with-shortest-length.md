# 471. Encode String with Shortest Length

**Difficulty:** Hard
**Category:** String, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s`, encode it so that its length becomes shorter, using the format `k[encoded_string]` to represent a substring repeated `k` times. Return the shortest possible encoding (if there are multiple, return any).

### Example

```
Input: s = "aaaaaaaaaa"
Output: "10[a]"
```

### Constraints

- `1 <= s.length <= 150`

## Approach

Use interval dynamic programming where `dp[i][j]` is the shortest encoding of the substring `s[i..j]`. For each substring, try every split point to combine the best encodings of the two halves, and separately check whether the whole substring itself is built from a repeating unit (found by searching for the substring within its own doubled copy, starting after position 0); if so, compare the compressed `count[encoding of the unit]` form against the best split-based encoding, keeping whichever is shorter.

## C# Solution

```csharp
public class Solution
{
    public string Encode(string s)
    {
        int n = s.Length;
        var dp = new string[n, n];

        for (int len = 1; len <= n; len++)
        {
            for (int i = 0; i + len - 1 < n; i++)
            {
                int j = i + len - 1;
                var substring = s.Substring(i, len);
                dp[i, j] = substring;

                for (int k = i; k < j; k++)
                {
                    if (dp[i, k].Length + dp[k + 1, j].Length < dp[i, j].Length)
                        dp[i, j] = dp[i, k] + dp[k + 1, j];
                }

                var encoded = TryCompress(substring);
                if (encoded.Length < dp[i, j].Length)
                    dp[i, j] = encoded;
            }
        }

        return dp[0, n - 1];
    }

    private string TryCompress(string s)
    {
        int index = (s + s).IndexOf(s, 1);
        if (index == -1 || index >= s.Length) return s;

        var repeatUnit = s.Substring(0, index);
        int repeatCount = s.Length / index;

        return repeatCount + "[" + Encode(repeatUnit) + "]";
    }
}
```

## Complexity

- **Time:** `O(n^3)` — `O(n^2)` substrings, each doing `O(n)` split and compression work.
- **Space:** `O(n^2)` for the DP table.
