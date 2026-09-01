# 1247. Minimum Swaps to Make Strings Equal

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

Given two strings `s1` and `s2` of equal length containing only `'x'` and `'y'`, in one operation you may swap `s1[i]` with `s2[j]` for any indices `i, j`. Return the minimum number of swaps to make `s1 == s2`, or `-1` if impossible.

### Example

```
Input: s1 = "xx", s2 = "yy"
Output: 1
```

## Approach

Only mismatched positions matter. Classify each mismatch as `xy` (s1 has `'x'`, s2 has `'y'`) or `yx` (s1 has `'y'`, s2 has `'x'`). Two mismatches of the *same* type can always be fixed with one swap (swap the two `s1` characters, or equivalently the two `s2` characters). If both `xy` and `yx` counts are odd, one leftover pair (one of each type) needs two swaps instead of one. If the total mismatch count is odd, no valid pairing exists at all, so return `-1`.

## C# Solution

```csharp
public class Solution
{
    public int MinimumSwap(string s1, string s2)
    {
        int xy = 0, yx = 0;

        for (int i = 0; i < s1.Length; i++)
        {
            if (s1[i] == s2[i]) continue;
            if (s1[i] == 'x') xy++;
            else yx++;
        }

        if ((xy + yx) % 2 != 0) return -1;

        return xy / 2 + yx / 2 + (xy % 2 == 1 ? 2 : 0);
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of the strings.
- **Space:** `O(1)`.
