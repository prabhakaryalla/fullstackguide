# 1016. Binary String With Substrings Representing 1 To N

**Difficulty:** Medium
**Category:** String

## Problem

Given a binary string `s` and an integer `n`, return `true` if, for every integer `i` from `1` to `n`, the binary representation of `i` is a substring of `s`.

### Example

```
Input: s = "0110", n = 3
Output: true
```

## Approach

Since every required substring must be distinct (different numbers have different binary strings), `s` can only satisfy the condition if `n` doesn't exceed the total number of distinct substrings `s` can contain — at most `L * (L + 1) / 2` for a string of length `L`. Using that bound to short-circuit clearly impossible cases, check each integer `1..n` directly by converting it to binary and testing whether it appears in `s`.

## C# Solution

```csharp
public class Solution
{
    public bool QueryString(string s, int n)
    {
        int maxDistinctSubstrings = s.Length * (s.Length + 1) / 2;
        if (n > maxDistinctSubstrings) return false;

        for (int i = 1; i <= n; i++)
        {
            if (!s.Contains(Convert.ToString(i, 2))) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n * L)` bounded by the early-exit check, where `L` is the length of `s`.
- **Space:** `O(1)` extra beyond the binary string conversions.
