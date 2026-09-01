# 3335. Total Characters in String After Transformations I

**Difficulty:** Medium
**Category:** Hash Table, Math, String, Dynamic Programming, Counting

## Problem

Given a string `s` and an integer `t`, perform `t` transformations. In each transformation, every character is replaced: `'z'` becomes `"ab"`, and any other character becomes the next character in the alphabet.

Return the length of the resulting string after exactly `t` transformations, modulo `10^9 + 7`.

### Example

Input: `s = "abcyy", t = 2`

Output: `7`

## Approach

Track only the count of each letter (`freq[0..25]`), not the actual string. In one transformation:
- A non-`'z'` letter `c` contributes its count entirely to letter `c + 1`.
- `'z'` contributes its count to **both** `'a'` and `'b'` (since it becomes 2 characters).

Simulate this for `t` rounds — since `t <= 10^5`, this is only O(26 * t) work. After all rounds, sum the counts for the final length.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int LengthAfterTransformations(string s, int t) 
    {
        long[] freq = new long[26];
        foreach (char c in s) freq[c - 'a']++;

        for (int step = 0; step < t; step++)
        {
            long[] nf = new long[26];
            for (int c = 0; c < 26; c++)
            {
                if (freq[c] == 0) continue;
                if (c == 25)
                {
                    nf[0] = (nf[0] + freq[c]) % MOD;
                    nf[1] = (nf[1] + freq[c]) % MOD;
                }
                else
                {
                    nf[c + 1] = (nf[c + 1] + freq[c]) % MOD;
                }
            }
            freq = nf;
        }

        long ans = 0;
        for (int c = 0; c < 26; c++) ans = (ans + freq[c]) % MOD;
        return (int)ans;
    }
}
```

## Complexity

- **Time:** O(26 * t).
- **Space:** O(1) — fixed-size 26-element arrays.
