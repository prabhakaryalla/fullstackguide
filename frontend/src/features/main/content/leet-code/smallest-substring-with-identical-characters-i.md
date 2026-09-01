# 3398. Smallest Substring With Identical Characters I

**Difficulty:** Hard
**Category:** Array, Binary Search, Enumeration

## Problem
You are given a binary string `s` of length `n` and an integer `numOps`.

You may perform the following operation at most `numOps` times: select any index `i` (`0 <= i < n`) and flip `s[i]` (`'0'` becomes `'1'` and vice versa).

You need to minimize the length of the longest substring of `s` whose characters are all identical. Return that minimum possible length after performing at most `numOps` flips.

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
- `1 <= n == s.length <= 1000`
- `s` consists only of `'0'` and `'1'`.
- `0 <= numOps <= n`

## Approach
"Minimize the maximum run length" is a classic binary-search-on-the-answer setup: as the allowed maximum run length `k` increases, the minimum number of flips needed to enforce it monotonically decreases. So binary search over `k` (the answer), and for each candidate `k` compute the minimum number of flips required to break every run of identical characters down to length `<= k`; keep the smallest `k` whose requirement is `<= numOps`.

For `k >= 2`: scan `s` and measure each maximal run of identical characters. A run of length `L` needs exactly `floor(L / (k + 1))` flips to be broken into pieces of length at most `k` (placing a flip every `k + 1` characters is optimal and independent between runs).

For `k = 1` (no two adjacent characters may match), the only way to satisfy this globally is to make `s` alternate, i.e. equal to either `"0101..."` or `"1010..."`. Count how many positions already mismatch each alternating pattern (`s[i] - '0' != i % 2` for one pattern, and its complement for the other) and take the smaller of the two flip counts.

## C# Solution

```csharp
public class Solution 
{
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
