# 2060. Check if an Original String Exists Given Two Encoded Strings

**Difficulty:** Hard
**Category:** Hash Table, String, Dynamic Programming

## Problem
An original string, consisting of lowercase English letters, can be encoded by:
1. Arbitrarily splitting it into a sequence of non-empty substrings.
2. Arbitrarily choosing some elements (possibly none) of the sequence and replacing each with the numeric length of the substring (as a string of digits).
3. Concatenating the sequence to form the encoded string.

For example, `"abcdefghijklmnop"` could be encoded as `"ab121p"` by splitting it into `["ab", "cdefghijklmn", "o", "p"]` and replacing the 2nd and 3rd elements with their lengths (`"12"` and `"1"`).

Given two encoded strings `s1` and `s2` (containing lowercase letters and digits), return `true` if there exists a single original string that could have produced both `s1` and `s2` via this process. The test cases guarantee that no run of consecutive digits exceeds 3 characters in either string.

## Approach
Use a memoized recursion `Dfs(i, j, diff)` where `i` and `j` are pointers into `s1` and `s2`, and `diff` tracks how far one decoded string is "ahead" of the other because of a numeric run that hasn't been matched against actual characters yet (`diff > 0` means `s1` is ahead by `diff` unmatched characters, `diff < 0` means `s2` is ahead).

- If `diff == 0`: both pointers must line up on real characters or start a new numeric run.
  - If `s1[i]` is a digit, try every possible split of the digit run (1, 2, or up to 3 digits since runs are capped at length 3) as a candidate length, moving `i` forward and setting `diff` to that length.
  - Otherwise, symmetrically try numeric runs starting at `s2[j]`, setting `diff` to the negated length.
  - Otherwise, both must be literal letters: they must be equal, and both pointers advance by 1 with `diff` staying 0.
- If `diff > 0`: `s1` currently has `diff` "invisible" characters of credit. Consume real characters from `s2` one at a time (decrementing `diff`), or consume a digit run in `s2` (subtracting its numeric value from `diff`), whichever is available.
- If `diff < 0`: symmetric, consuming from `s1` instead.
- The base case is reached when both strings are exhausted; the recursion succeeds only if `diff == 0` at that point.

Memoize on `(i, j, diff)` to avoid recomputation, since the same state can be reached via different digit-run splits.

## C# Solution

```csharp
public class Solution
{
    private string s1 = string.Empty;
    private string s2 = string.Empty;
    private readonly Dictionary<(int, int, int), bool> memo = new();

    public bool PossiblyEquals(string s1, string s2)
    {
        this.s1 = s1;
        this.s2 = s2;
        return Dfs(0, 0, 0);
    }

    private bool Dfs(int i, int j, int diff)
    {
        var key = (i, j, diff);
        if (memo.TryGetValue(key, out bool cached))
        {
            return cached;
        }

        bool result;

        if (i == s1.Length && j == s2.Length)
        {
            result = diff == 0;
        }
        else if (diff == 0)
        {
            if (i < s1.Length && char.IsDigit(s1[i]))
            {
                result = TryNumericRun(s1, i, (nextI, num) => Dfs(nextI, j, num));
            }
            else if (j < s2.Length && char.IsDigit(s2[j]))
            {
                result = TryNumericRun(s2, j, (nextJ, num) => Dfs(i, nextJ, -num));
            }
            else if (i < s1.Length && j < s2.Length && s1[i] == s2[j])
            {
                result = Dfs(i + 1, j + 1, 0);
            }
            else
            {
                result = false;
            }
        }
        else if (diff > 0)
        {
            if (j < s2.Length && char.IsDigit(s2[j]))
            {
                result = TryNumericRun(s2, j, (nextJ, num) => Dfs(i, nextJ, diff - num));
            }
            else if (j < s2.Length)
            {
                result = Dfs(i, j + 1, diff - 1);
            }
            else
            {
                result = false;
            }
        }
        else
        {
            if (i < s1.Length && char.IsDigit(s1[i]))
            {
                result = TryNumericRun(s1, i, (nextI, num) => Dfs(nextI, j, diff + num));
            }
            else if (i < s1.Length)
            {
                result = Dfs(i + 1, j, diff + 1);
            }
            else
            {
                result = false;
            }
        }

        memo[key] = result;
        return result;
    }

    // Tries every prefix length of the digit run starting at `start` (capped at 3 digits).
    private bool TryNumericRun(string s, int start, Func<int, int, bool> onCandidate)
    {
        int num = 0;
        for (int k = start; k < s.Length && char.IsDigit(s[k]); k++)
        {
            num = num * 10 + (s[k] - '0');
            if (onCandidate(k + 1, num))
            {
                return true;
            }
        }
        return false;
    }
}
```

## Complexity

- **Time:** O(n1 · n2 · (n1 + n2)) — states are bounded by the two pointers and the bounded `diff` range, with each state trying a constant-bounded number of digit-run splits.
- **Space:** O(n1 · n2 · (n1 + n2)) for the memoization table.
