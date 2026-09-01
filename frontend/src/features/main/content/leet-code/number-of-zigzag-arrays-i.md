# 3699. Number of ZigZag Arrays I

**Difficulty:** Hard
**Category:** Dynamic Programming, Prefix Sum

## Problem

You are given three integers `n`, `l`, and `r`.

A ZigZag array of length `n` is defined as follows:

- Each element lies in the range `[l, r]`.
- No two adjacent elements are equal.
- No three consecutive elements form a strictly increasing or strictly decreasing sequence.

Return the total number of valid ZigZag arrays, modulo `10^9 + 7`.

### Example

```
Input: n = 3, l = 4, r = 5
Output: 2
Explanation: The only valid arrays are [4,5,4] and [5,4,5].
```

### Constraints

- `3 <= n <= 2000`
- `1 <= l < r <= 2000`

## Approach

Let `m = r - l + 1` be the number of possible values. Track two DP arrays over value index `x` (`0`-indexed within `[l, r]`): `dpDown[x]` counts length-so-far zigzag prefixes ending at value `x` where the *next* element must be smaller, and `dpUp[x]` counts prefixes ending at `x` where the next element must be larger. Initialize both to 1 for every `x` at length 1 (a single element imposes no constraint yet). To extend by one element, `newDown[y]` accumulates `dpUp[x]` for all `x < y` (since going from an "expect larger" state and choosing a larger value `y` forces the next move to be smaller), and `newUp[y]` accumulates `dpDown[x]` for all `x > y`. Compute these sums efficiently using prefix sums of `dpUp` and suffix sums of `dpDown`, repeating for `n - 1` steps, then sum all final DP entries.

## C# Solution

```csharp
public class Solution
{
    public int ZigZagArrays(int n, int l, int r)
    {
        const int MOD = 1_000_000_007;
        int m = r - l + 1;

        long[] dpDown = new long[m];
        long[] dpUp = new long[m];

        for (int x = 0; x < m; x++)
        {
            dpDown[x] = 1;
            dpUp[x] = 1;
        }

        for (int step = 1; step < n; step++)
        {
            long[] prefixUp = new long[m + 1];
            for (int x = 0; x < m; x++)
            {
                prefixUp[x + 1] = (prefixUp[x] + dpUp[x]) % MOD;
            }

            long[] suffixDown = new long[m + 1];
            for (int x = m - 1; x >= 0; x--)
            {
                suffixDown[x] = (suffixDown[x + 1] + dpDown[x]) % MOD;
            }

            long[] newDown = new long[m];
            long[] newUp = new long[m];

            for (int y = 0; y < m; y++)
            {
                newDown[y] = prefixUp[y];
                newUp[y] = suffixDown[y + 1];
            }

            dpDown = newDown;
            dpUp = newUp;
        }

        long total = 0;
        for (int x = 0; x < m; x++)
        {
            total = (total + dpDown[x] + dpUp[x]) % MOD;
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n * m)`.
- **Space:** `O(m)`.
