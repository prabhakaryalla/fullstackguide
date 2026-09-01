# 1960. Maximum Product of the Length of Two Palindromic Substrings

**Difficulty:** Hard
**Category:** String, Hash Function, Rolling Hash, Suffix Array

## Problem

Given a 0-indexed string `s`, find two disjoint (non-overlapping) palindromic substrings whose lengths multiply to the maximum possible value, and return that maximum product. Each chosen substring must have odd... actually any length is allowed, but both must be non-empty and not overlap.

### Example

```
Input: s = "ababbb"
Output: 9
Explanation: "aba" (length 3) and "bbb" (length 3) are disjoint palindromes; 3*3=9.
```

### Constraints

- `2 <= s.length <= 10^5`
- `s` consists of lowercase English letters only.

## Approach

For each index `i`, compute `oddLeft[i]` = the length of the longest odd-length palindrome centered such that it ends at or before `i` and lies entirely within `s[0..i]`, and similarly `oddRight[i]` = longest odd-length palindrome starting at or after `i` within `s[i..n-1]`. These can be computed using Manacher's algorithm to get palindrome radius at every center, then a running maximum sweep from the left (for the "ending by index i" longest palindrome) and from the right (for "starting at index i"). Finally, iterate over the split point `i` from `0` to `n-2` and take the maximum of `oddLeft[i] * oddRight[i+1]`.

## C# Solution

```csharp
public class Solution
{
    public long MaxProduct(string s)
    {
        int n = s.Length;
        int[] radius = Manacher(s);

        int[] leftMax = new int[n];
        int[] lenEndingAt = new int[n];
        for (int i = 0; i < n; i++)
        {
            int len = 2 * radius[i] - 1;
            int end = i + radius[i] - 1;
            if (end < n) lenEndingAt[end] = Math.Max(lenEndingAt[end], len);
        }
        leftMax[0] = lenEndingAt[0];
        for (int i = 1; i < n; i++)
        {
            leftMax[i] = Math.Max(leftMax[i - 1], lenEndingAt[i]);
        }

        int[] lenStartingAt = new int[n];
        for (int i = 0; i < n; i++)
        {
            int len = 2 * radius[i] - 1;
            int start = i - radius[i] + 1;
            if (start >= 0) lenStartingAt[start] = Math.Max(lenStartingAt[start], len);
        }
        int[] rightMax = new int[n];
        rightMax[n - 1] = lenStartingAt[n - 1];
        for (int i = n - 2; i >= 0; i--)
        {
            rightMax[i] = Math.Max(rightMax[i + 1], lenStartingAt[i]);
        }

        long best = 0;
        for (int i = 0; i < n - 1; i++)
        {
            best = Math.Max(best, (long)leftMax[i] * rightMax[i + 1]);
        }

        return best;
    }

    private int[] Manacher(string s)
    {
        int n = s.Length;
        var t = new System.Text.StringBuilder();
        t.Append('^');
        foreach (char c in s) { t.Append('#'); t.Append(c); }
        t.Append('#'); t.Append('$');
        string str = t.ToString();
        int m = str.Length;
        int[] p = new int[m];
        int center = 0, right = 0;

        for (int i = 1; i < m - 1; i++)
        {
            if (i < right) p[i] = Math.Min(right - i, p[2 * center - i]);
            while (str[i + p[i] + 1] == str[i - p[i] - 1]) p[i]++;
            if (i + p[i] > right) { center = i; right = i + p[i]; }
        }

        int[] radius = new int[n];
        for (int i = 0; i < n; i++)
        {
            int transformedIndex = 2 * i + 2;
            radius[i] = (p[transformedIndex] + 1) / 2;
        }

        return radius;
    }
}
```

## Complexity

- **Time:** `O(n)` — Manacher's algorithm plus linear prefix/suffix sweeps.
- **Space:** `O(n)` for the transformed string and auxiliary arrays.
