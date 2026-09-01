# 3628. Maximum Number of Subsequences After One Inserting

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Greedy, Prefix Sum

## Problem
You are given a string `s` consisting of uppercase English letters. You may insert at most one uppercase English letter anywhere in the string (including the beginning or end).

Return the maximum number of `"LCT"` subsequences that can be formed in the resulting string.

### Example
Input: `s = "LCCT"`
Output: `4`
Explanation: Inserting `"L"` at the beginning gives `"LLCCT"`, which has 4 `"LCT"` subsequences.

Constraints:
- `1 <= s.length <= 10^5`
- `s` consists of uppercase English letters.

## Approach
Precompute, for every split position `i` (0 to n): `preL[i]` = number of `'L'` in `s[0..i-1]`, `preLC[i]` = number of `"LC"` subsequences in `s[0..i-1]`, `sufT[i]` = number of `'T'` in `s[i..n-1]`, and `sufCT[i]` = number of `"CT"` subsequences in `s[i..n-1]`.

The base count of `"LCT"` subsequences already in `s` equals the sum of `preLC[i]` over every index `i` where `s[i] == 'T'`.

Inserting a single character at position `i` can only add new `"LCT"` subsequences that use the inserted character:
- Inserting `'L'` at `i` adds `sufCT[i]` new subsequences (pairs with every `"CT"` after it).
- Inserting `'C'` at `i` adds `preL[i] * sufT[i]` new subsequences.
- Inserting `'T'` at `i` adds `preLC[i]` new subsequences.

The answer is the base count plus the best achievable gain over all positions and letters.

## C# Solution

```csharp
public class Solution {
    public long NumOfSubsequences(string s) {
        int n = s.Length;
        long[] preL = new long[n + 1];
        long[] preLC = new long[n + 1];
        long[] sufT = new long[n + 2];
        long[] sufCT = new long[n + 2];

        for (int i = 0; i < n; i++) {
            preL[i + 1] = preL[i] + (s[i] == 'L' ? 1 : 0);
            preLC[i + 1] = preLC[i] + (s[i] == 'C' ? preL[i] : 0);
        }

        for (int i = n - 1; i >= 0; i--) {
            sufT[i] = sufT[i + 1] + (s[i] == 'T' ? 1 : 0);
            sufCT[i] = sufCT[i + 1] + (s[i] == 'C' ? sufT[i + 1] : 0);
        }

        long baseCount = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == 'T') {
                baseCount += preLC[i];
            }
        }

        long best = 0;
        for (int i = 0; i <= n; i++) {
            long gainL = sufCT[i];
            long gainC = preL[i] * sufT[i];
            long gainT = preLC[i];
            best = Math.Max(best, Math.Max(gainL, Math.Max(gainC, gainT)));
        }

        return baseCount + best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
