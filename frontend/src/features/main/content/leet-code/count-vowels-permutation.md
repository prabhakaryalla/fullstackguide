# 1220. Count Vowels Permutation

**Difficulty:** Hard
**Category:** Dynamic Programming

## Problem

Given an integer `n`, count how many strings of length `n` can be formed using only vowels (`a`, `e`, `i`, `o`, `u`) such that: `a` may only be followed by `e`; `e` may only be followed by `a` or `i`; `i` may be followed by any vowel except `i`; `o` may only be followed by `i` or `u`; and `u` may only be followed by `a`. Return the count modulo `10^9 + 7`.

### Example

```
Input: n = 2
Output: 10
```

## Approach

Track five running counts, one per vowel, representing the number of valid strings of the current length ending in that vowel (all start at `1` for length `1`). At each step, derive the next length's counts from the transition rules in reverse — for example, a string can end in `a` only if the previous character was `e`, `i`, or `u`, so `newA = e + i + u`. Repeat `n - 1` times and sum all five final counts.

## C# Solution

```csharp
public class Solution
{
    public int CountVowelPermutation(int n)
    {
        const int Mod = 1_000_000_007;
        long a = 1, e = 1, i = 1, o = 1, u = 1;

        for (int len = 2; len <= n; len++)
        {
            long newA = (e + i + u) % Mod;
            long newE = (a + i) % Mod;
            long newI = (e + o) % Mod;
            long newO = i % Mod;
            long newU = (i + o) % Mod;

            a = newA; e = newE; i = newI; o = newO; u = newU;
        }

        return (int)((a + e + i + o + u) % Mod);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
