# 1316. Distinct Echo Substrings

**Difficulty:** Hard
**Category:** String, Hash Function, Rolling Hash, Suffix Array

## Problem

Return the number of distinct non-empty substrings of `text` that can be written as the concatenation of some string with itself (i.e., `T + T` for some non-empty string `T`).

### Example

```
Input: text = "abcabcabc"
Output: 3
```

## Approach

An "echo" substring always has even length `2 * half`. For every even length, slide a window across the text and use a rolling hash to compare the two halves in constant time. When the hashes match, confirm with a direct substring comparison to guard against hash collisions, then record the substring in a set to keep only distinct results.

## C# Solution

```csharp
public class Solution
{
    public int DistinctEchoSubstrings(string text)
    {
        int n = text.Length;
        const long BASE = 131, MOD = 1_000_000_007L;
        var hash = new long[n + 1];
        var power = new long[n + 1];
        power[0] = 1;

        for (int i = 0; i < n; i++)
        {
            hash[i + 1] = (hash[i] * BASE + text[i]) % MOD;
            power[i + 1] = (power[i] * BASE) % MOD;
        }

        long GetHash(int l, int r)
        {
            long h = (hash[r] - hash[l] * power[r - l]) % MOD;
            return h < 0 ? h + MOD : h;
        }

        var distinct = new HashSet<string>();

        for (int len = 2; len <= n; len += 2)
        {
            int half = len / 2;
            for (int i = 0; i + len <= n; i++)
            {
                if (GetHash(i, i + half) == GetHash(i + half, i + len) &&
                    string.CompareOrdinal(text, i, text, i + half, half) == 0)
                {
                    distinct.Add(text.Substring(i, len));
                }
            }
        }

        return distinct.Count;
    }
}
```

## Complexity

- **Time:** `O(n^2)` for the hash comparisons, with occasional `O(n)` verification on matches.
- **Space:** `O(n^2)` in the worst case for the distinct substring set.
