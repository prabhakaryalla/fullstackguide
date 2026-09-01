# 1415. The k-th Lexicographical String of All Happy Strings of Length n

**Difficulty:** Medium
**Category:** String, Backtracking

## Problem

A "happy string" of length `n` uses only characters `'a'`, `'b'`, `'c'` with no two adjacent characters equal. Considering all happy strings of length `n` sorted lexicographically, return the `k`-th one (1-indexed), or an empty string if fewer than `k` exist.

### Example

```
Input: n = 1, k = 3
Output: "c"
```

## Approach

There are exactly `3 * 2^(n-1)` happy strings of length `n`: 3 choices for the first character, and 2 choices (any letter different from the previous one) for each subsequent character. This means the strings can be indexed directly without generating them all: divide the (zero-indexed) rank `k` by the number of strings sharing each prefix to pick each character in turn, narrowing the remaining choices at every step.

## C# Solution

```csharp
public class Solution
{
    public string GetHappyString(int n, int k)
    {
        long total = 3L << (n - 1);
        if (k > total) return "";

        char[] alphabet = { 'a', 'b', 'c' };
        var sb = new StringBuilder();
        long branch = 1L << (n - 1);
        long rank = k - 1;

        int firstIndex = (int)(rank / branch);
        sb.Append(alphabet[firstIndex]);
        rank %= branch;
        char prev = alphabet[firstIndex];

        for (int i = 1; i < n; i++)
        {
            branch /= 2;
            int choiceIndex = (int)(rank / branch);
            rank %= branch;

            char chosen = ' ';
            int seen = 0;
            foreach (var c in alphabet)
            {
                if (c == prev) continue;
                if (seen == choiceIndex) { chosen = c; break; }
                seen++;
            }

            sb.Append(chosen);
            prev = chosen;
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output string.
