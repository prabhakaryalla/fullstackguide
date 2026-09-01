# 3563. Lexicographically Smallest String After Adjacent Removals

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem
You are given a string `s` consisting of lowercase English letters.

You can perform the following operation any number of times (including zero): remove any pair of adjacent characters that are consecutive in the alphabet, in either order (e.g. `'a'` and `'b'`, or `'b'` and `'a'`), then shift the remaining characters left to fill the gap. Consider the alphabet circular, so `'a'` and `'z'` are also consecutive.

Return the lexicographically smallest string obtainable after performing the operations optimally.

### Example

```
Input: s = "abc"
Output: "a"
Explanation: Remove "bc", leaving "a".
```

```
Input: s = "zdce"
Output: "zdce"
Explanation: Remove "dc", leaving "ze". But "zdce" is lexicographically smaller than "ze", so no removal is performed.
```

**Constraints:**
- `1 <= s.length <= 250`

## Approach
First compute, via interval dynamic programming, `canRemove[i][j]` (over half-open range `[i, j)`): whether the substring `s[i..j-1]` can be fully erased down to nothing. A range of even length `[i, j)` is fully removable if there exists a split point `k` such that `s[i]` and `s[k]` are alphabet-adjacent, the inner range `[i+1, k)` is fully removable, and the remainder `[k+1, j)` is fully removable.

Then build the answer from right to left: `ans[n] = ""`, and for each `i`, consider every `j >= i` such that the prefix range `[i, j)` is fully removable — meaning we can erase everything from `i` up to (but not including) `j`, keep `s[j]`, and append the already-computed optimal suffix `ans[j+1]`. Take the lexicographically smallest candidate across all valid `j` (string comparison naturally favors shorter strings when one is a prefix of another, matching how deleting more characters can beat keeping them).

## C# Solution

```csharp
public class Solution 
{
    public string LexicographicallySmallestString(string s) 
    {
        int n = s.Length;
        bool[,] canRemove = new bool[n + 1, n + 1];
        for (int i = 0; i <= n; i++) canRemove[i, i] = true;

        for (int len = 2; len <= n; len += 2)
        {
            for (int i = 0; i + len <= n; i++)
            {
                int j = i + len;
                for (int k = i + 1; k < j; k += 2)
                {
                    if (IsAdjacent(s[i], s[k]) && canRemove[i + 1, k] && canRemove[k + 1, j])
                    {
                        canRemove[i, j] = true;
                        break;
                    }
                }
            }
        }

        string[] ans = new string[n + 1];
        ans[n] = "";
        for (int i = n - 1; i >= 0; i--)
        {
            string best = null;
            for (int j = i; j < n; j++)
            {
                if (canRemove[i, j])
                {
                    string candidate = s[j] + ans[j + 1];
                    if (best == null || string.CompareOrdinal(candidate, best) < 0)
                    {
                        best = candidate;
                    }
                }
            }
            ans[i] = best;
        }

        return ans[0];
    }

    private bool IsAdjacent(char a, char b)
    {
        int diff = Math.Abs(a - b);
        return diff == 1 || diff == 25;
    }
}
```

## Complexity

- **Time:** O(n^3), for the interval DP and answer reconstruction.
- **Space:** O(n^2), for the `canRemove` table.
