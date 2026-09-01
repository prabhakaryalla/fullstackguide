# 3579. Minimum Steps to Convert String with Operations

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem
You are given two strings `word1` and `word2` of equal length. You need to transform `word1` into `word2`.

Divide `word1` into one or more contiguous substrings. For each substring `substr`, you may perform:
1. **Replace**: replace the character at any one index with another lowercase letter.
2. **Swap**: swap any two characters in `substr`.
3. **Reverse**: reverse the whole substring.

Each of these counts as one operation. Return the minimum number of operations required to transform `word1` into `word2`.

### Example

```
Input: word1 = "abcdef", word2 = "fedabc"
Output: 2
Explanation: Reverse the whole string to get "fedcba", then swap indices 3 and 5 to get "fedabc".
```

**Constraints:**
- `1 <= word1.length == word2.length <= 100`

## Approach
Use interval dynamic programming over disjoint partitions of `word1`: `dp[i]` is the minimum cost to convert `word1[i..n-1]` into `word2[i..n-1]`, with `dp[n] = 0` and `dp[i] = min over j > i of dp[j] + cost(i, j-1)`.

For a fixed substring range `[l, r]`, computing `cost(l, r)` tries both the substring as-is and its reversed form (adding 1 for the reverse), then for each variant: count mismatched positions between the (possibly reversed) `word1` substring and the corresponding `word2` substring. Among mismatches, a pair of positions `(p, q)` can be fixed with a single swap instead of two replaces whenever the mismatch at `p` is the "opposite" of the mismatch at `q` — i.e. `word1[p]` should become `word2[q]`'s pairing and vice versa (tracked via a hashmap counting `(a[i], b[i])` mismatch-key pairs and matching each key with its reverse key). Each such pair saves one operation, so `cost = (reversed ? 1 : 0) + mismatchCount - pairCount`. Take the minimum over the reversed/non-reversed variants for each substring.

## C# Solution

```csharp
public class Solution 
{
    public int MinOperations(string word1, string word2) 
    {
        int n = word1.Length;
        long[] dp = new long[n + 1];
        for (int i = 0; i < n; i++) dp[i] = int.MaxValue;
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--)
        {
            for (int j = i + 1; j <= n; j++)
            {
                long costNoRev = SubstringCost(word1, word2, i, j - 1, false);
                long costRev = SubstringCost(word1, word2, i, j - 1, true);
                long best = Math.Min(costNoRev, costRev);
                if (dp[j] + best < dp[i]) dp[i] = dp[j] + best;
            }
        }

        return (int)dp[0];
    }

    private long SubstringCost(string word1, string word2, int l, int r, bool reversed)
    {
        int len = r - l + 1;
        char[] a = new char[len];
        for (int idx = 0; idx < len; idx++)
        {
            a[idx] = reversed ? word1[r - idx] : word1[l + idx];
        }

        int mismatchCount = 0;
        Dictionary<(char, char), int> keyCount = new Dictionary<(char, char), int>();
        for (int idx = 0; idx < len; idx++)
        {
            char b = word2[l + idx];
            if (a[idx] != b)
            {
                mismatchCount++;
                var key = (a[idx], b);
                keyCount[key] = keyCount.GetValueOrDefault(key, 0) + 1;
            }
        }

        int pairCount = 0;
        HashSet<(char, char)> processed = new HashSet<(char, char)>();
        foreach (var key in keyCount.Keys)
        {
            if (processed.Contains(key)) continue;
            var complement = (key.Item2, key.Item1);
            if (keyCount.TryGetValue(complement, out int compCount))
            {
                pairCount += Math.Min(keyCount[key], compCount);
                processed.Add(key);
                processed.Add(complement);
            }
        }

        return (reversed ? 1 : 0) + (mismatchCount - pairCount);
    }
}
```

## Complexity

- **Time:** O(n^3), for the interval DP with an O(n) cost computation per substring.
- **Space:** O(n), for the DP array and per-substring hashmap.
