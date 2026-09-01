# 1987. Number of Unique Good Subsequences

**Difficulty:** Hard
**Category:** Array, String, Dynamic Programming

## Problem

Given a binary string `binary`, a "good" subsequence is a non-empty subsequence with no leading zeros (or exactly `"0"` itself). Return the number of unique good subsequences of `binary`, modulo `10^9 + 7`.

### Example

```
Input: binary = "001"
Output: 2
Explanation: The good subsequences are "0" and "1".
```

### Constraints

- `1 <= binary.length <= 10^5`
- `binary` consists of only `'0'`s and `'1'`s.

## Approach

Track `endsWith0` and `endsWith1`, the number of distinct good subsequences (ignoring leading-zero restrictions for now, tracked purely by their last-added-bit identity to avoid duplicate counting) ending in `0` or `1` respectively, built incrementally. For each character: if it's `'0'`, `endsWith0 = (endsWith0 + endsWith1) mod M` (appending this `0` to any existing subsequence, whether it ended in 0 or 1, creates a distinct new one, and duplicates from re-ending in the same char are automatically absorbed since we track just one aggregate count that represents "any subsequence ending in this digit," using the standard distinct-subsequence-counting technique). If it's `'1'`, `endsWith1 = (endsWith0 + endsWith1 + 1) mod M` (the `+1` accounts for starting fresh with just this `1`). At the end, add `endsWith0 + endsWith1`, plus `1` if the string contains at least one `'0'` (for the standalone good subsequence `"0"`).

## C# Solution

```csharp
public class Solution
{
    private const long Mod = 1_000_000_007;

    public int NumberOfUniqueGoodSubsequences(string binary)
    {
        long endsWith0 = 0, endsWith1 = 0;
        bool hasZero = false;

        foreach (char c in binary)
        {
            if (c == '0')
            {
                hasZero = true;
                endsWith0 = (endsWith0 + endsWith1) % Mod;
            }
            else
            {
                endsWith1 = (endsWith0 + endsWith1 + 1) % Mod;
            }
        }

        long total = (endsWith0 + endsWith1) % Mod;
        if (hasZero) total = (total + 1) % Mod;

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single linear pass.
- **Space:** `O(1)`.
