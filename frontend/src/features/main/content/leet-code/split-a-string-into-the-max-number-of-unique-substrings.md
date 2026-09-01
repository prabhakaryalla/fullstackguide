# 1593. Split a String Into the Max Number of Unique Substrings

**Difficulty:** Medium
**Category:** Hash Table, String, Backtracking

## Problem

Given a string `s`, split it into a maximum number of unique (non-repeating) substrings. Return that maximum count.

### Example

```
Input: s = "ababccc"
Output: 5
Explanation: One way to split is ["a", "b", "ab", "c", "cc"], but the strings "a" and "ab" are substrings that overlap with the reused "a"/"b" pieces used elsewhere. A valid maximal split with all-unique pieces is ["a", "ba", "b", "c", "cc"], giving 5 unique substrings.
```

## Approach

Since `s` is short (at most 16 characters per the constraints), use backtracking: at each position, try every possible next substring length, and if that substring hasn't been used yet, add it to a "used" set and recurse on the remainder; track the maximum count of substrings achieved across all branches, backtracking (removing the substring from the set) after each attempt.

## C# Solution

```csharp
public class Solution
{
    private int best = 0;

    public int MaxUniqueSplit(string s)
    {
        Backtrack(s, 0, new HashSet<string>());
        return best;
    }

    private void Backtrack(string s, int start, HashSet<string> used)
    {
        if (start == s.Length)
        {
            best = Math.Max(best, used.Count);
            return;
        }

        for (int end = start + 1; end <= s.Length; end++)
        {
            string piece = s.Substring(start, end - start);

            if (used.Add(piece))
            {
                Backtrack(s, end, used);
                used.Remove(piece);
            }
        }
    }
}
```

## Complexity

- **Time:** `O(2^n * n)` in the worst case — exponential branching over substring boundaries, bounded by the small input size (`n <= 16`).
- **Space:** `O(n)` for the recursion stack and the set of used substrings.
