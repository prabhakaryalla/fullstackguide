# 1573. Number of Ways to Split a String

**Difficulty:** Medium
**Category:** Math, String

## Problem

Given a binary string `s`, count the number of ways to split it into three non-empty contiguous parts such that each part contains the same number of `'1'` characters, modulo `10^9 + 7`.

### Example

```
Input: s = "10101"
Output: 4
```

## Approach

Count the total number of `'1'`s in `s`. If that count isn't divisible by 3, there's no valid split, so return `0`. If the total is `0` (no ones at all), any split point works, so the answer is the number of ways to choose 2 distinct split points among `n - 1` gaps, which is `C(n - 1, 2)`. Otherwise, each part must contain exactly `total / 3` ones; find the range of possible positions for the first split (right after the `total/3`-th one, up to just before the `(total/3 + 1)`-th one) and similarly for the second split (right after the `2*total/3`-th one, up to just before the next one). The number of valid combinations is the product of the sizes of those two ranges.

## C# Solution

```csharp
public class Solution
{
    public int NumWays(string s)
    {
        const int Mod = 1_000_000_007;
        int n = s.Length;
        int totalOnes = s.Count(c => c == '1');

        if (totalOnes % 3 != 0)
        {
            return 0;
        }

        if (totalOnes == 0)
        {
            long ways = (long)(n - 1) * (n - 2) / 2 % Mod;
            return (int)ways;
        }

        int onesPerPart = totalOnes / 3;
        var onePositions = new List<int>();
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '1')
            {
                onePositions.Add(i);
            }
        }

        long firstCutOptions = onePositions[onesPerPart] - onePositions[onesPerPart - 1];
        long secondCutOptions = onePositions[2 * onesPerPart] - onePositions[2 * onesPerPart - 1];

        return (int)(firstCutOptions * secondCutOptions % Mod);
    }
}
```

## Complexity

- **Time:** `O(n)` — a linear scan to count and locate ones.
- **Space:** `O(n)` for storing the positions of `'1'` characters (or `O(1)` if counted without storing).
