# 3399. Smallest Substring With Identical Characters II

**Difficulty:** Hard
**Category:** String, Binary Search

## Problem
You are given a binary string `s` of length `n` and an integer `numOps`.

You may perform the following operation at most `numOps` times: select any index `i` (`0 <= i < n`) and flip `s[i]` (`'0'` becomes `'1'` and vice versa).

You need to minimize the length of the longest substring of `s` whose characters are all identical. Return that minimum possible length after performing at most `numOps` flips.

This is the same problem as "Smallest Substring With Identical Characters I", but with a much larger `n`, requiring the same asymptotically efficient solution rather than any approach with worse than `O(n log n)` complexity.

### Example
```
Input: s = "000001", numOps = 1
Output: 2
Explanation: Changing s[2] to '1' makes s = "001001". The longest runs of
identical characters now have length 2.
```
```
Input: s = "0000", numOps = 2
Output: 1
Explanation: Changing s[0] and s[2] to '1' makes s = "1010", where every run
has length 1.
```
```
Input: s = "0101", numOps = 0
Output: 1
```

### Constraints
- `1 <= n == s.length <= 10^5`
- `s` consists only of `'0'` and `'1'`.
- `0 <= numOps <= n`

## Approach
Identical to "Smallest Substring With Identical Characters I": binary search over the candidate maximum run length `k` (monotonic -- larger `k` never needs more flips), and for each candidate compute the minimum flips required.

For `k >= 2`, every maximal run of identical characters of length `L` needs `floor(L / (k + 1))` flips (one flip placed every `k + 1` characters). For `k = 1`, `s` must become fully alternating, so compare against both alternating patterns (`"0101..."` and `"1010..."`) and take the cheaper one. Only the input size differs from part I, so the same `O(n log n)` algorithm is required to stay within limits.

## C# Solution

```csharp
public class Solution 
{
    // Same algorithm as 3398. Smallest Substring With Identical Characters I.
    public int MinLength(string s, int numOps)
    {
        int l = 1, r = s.Length;
        while (l < r)
        {
            int m = (l + r) / 2;
            if (GetMinOps(s, m) <= numOps)
                r = m;
            else
                l = m + 1;
        }
        return l;
    }

    // Returns the minimum number of flips needed so every run of identical
    // characters in `s` has length at most `k`.
    private int GetMinOps(string s, int k)
    {
        if (k == 1)
        {
            int mismatches = 0;
            for (int i = 0; i < s.Length; i++)
                if (s[i] - '0' == i % 2)
                    mismatches++;
            return Math.Min(mismatches, s.Length - mismatches);
        }

        int total = 0;
        int runLength = 1;
        for (int i = 1; i < s.Length; i++)
        {
            if (s[i] == s[i - 1])
            {
                runLength++;
            }
            else
            {
                total += runLength / (k + 1);
                runLength = 1;
            }
        }
        return total + runLength / (k + 1);
    }
}
```

## Complexity

- **Time:** O(n log n), binary search over O(log n) candidate lengths, each verified in O(n).
- **Space:** O(1) extra space.
