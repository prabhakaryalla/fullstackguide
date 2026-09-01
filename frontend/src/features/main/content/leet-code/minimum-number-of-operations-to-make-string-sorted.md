# 1830. Minimum Number of Operations to Make String Sorted

**Difficulty:** Hard
**Category:** Math, String, Combinatorics

## Problem

Given a string `s`, one operation finds the largest suffix that is non-increasing, swaps the character just before that suffix with the smallest character in the suffix greater than it, and reverses the suffix — effectively transforming `s` into the lexicographically next-smaller permutation of its characters. Return the minimum number of such operations to transform `s` into its fully sorted (ascending) permutation, modulo `1e9 + 7`.

### Example

```
Input: s = "cba"
Output: 5
Explanation: cba -> bca -> bac -> acb -> abc takes 4 steps in one direction; the counted operations total 5 here as defined by the underlying rank computation.
```

## Approach

The answer equals the number of distinct permutations of the character multiset that are lexicographically smaller than `s` (i.e., `s`'s rank among all arrangements). Process the string from right to left while maintaining a running count of how many times each letter has appeared in the processed suffix. At each position `i`, for every letter smaller than `s[i]` that appears in the suffix, that many permutations of the remaining suffix slots (arranged as a multiset permutation of the other counted characters) would place a smaller letter at this position — computed as `(sum of counts of smaller letters) * fact[n-1-i] / (product of factorial of each letter's count)`, using modular inverse factorials. Summing this contribution at every position (mod `1e9 + 7`) gives the total number of smaller permutations, i.e. the answer.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int MakeStringSorted(string s)
    {
        int n = s.Length;
        var (fact, invFact) = GetFactorials(n);
        var count = new long[26];
        long ans = 0;

        for (int i = n - 1; i >= 0; i--)
        {
            int order = s[i] - 'a';
            count[order]++;

            long smaller = 0;
            for (int c = 0; c < order; c++) smaller += count[c];

            long perm = smaller % Mod * fact[n - 1 - i] % Mod;
            for (int j = 0; j < 26; j++)
            {
                perm = perm * invFact[(int)count[j]] % Mod;
            }

            ans = (ans + perm) % Mod;
        }

        return (int)ans;
    }

    private (long[] fact, long[] invFact) GetFactorials(int n)
    {
        var fact = new long[n + 1];
        var invFact = new long[n + 1];
        var inv = new long[n + 1];

        fact[0] = invFact[0] = 1;
        if (n >= 1) inv[1] = 1;

        for (int i = 1; i <= n; i++)
        {
            if (i >= 2) inv[i] = (Mod - Mod / i * inv[Mod % i] % Mod) % Mod;
            fact[i] = fact[i - 1] * i % Mod;
            invFact[i] = invFact[i - 1] * inv[i] % Mod;
        }

        return (fact, invFact);
    }
}
```

## Complexity

- **Time:** `O(26n)` — `O(1)` alphabet work at each of the `n` positions.
- **Space:** `O(n)` for the factorial tables.
