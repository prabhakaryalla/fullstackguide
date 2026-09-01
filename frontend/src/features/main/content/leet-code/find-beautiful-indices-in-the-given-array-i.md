# 3006. Find Beautiful Indices in the Given Array I

**Difficulty:** Medium
**Category:** String, String Matching, Two Pointers

## Problem

You are given strings `s`, `a`, `b`, and an integer `k`. An index `i` is **beautiful** if:

- `0 <= i <= s.Length - a.Length` and `s.Substring(i, a.Length) == a`.
- There exists an index `j` with `0 <= j <= s.Length - b.Length`, `s.Substring(j, b.Length) == b`, and `|j - i| <= k`.

Return all beautiful indices in `s`, sorted in increasing order.

### Example

```
Input: s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
Output: [16,33]
Explanation: At index 16 "my" occurs, and "squirrel" occurs at index 4 (within k) — wait, and at index 18
too; both 16 and 33 have a matching occurrence of b within distance k.
```

## Approach

Use the Knuth–Morris–Pratt (KMP) algorithm to find every starting index of `a` and every starting index of `b` in `s`, each in linear time. Then merge the two sorted index lists with a two-pointer sweep: for every occurrence `i` of `a`, advance a pointer over the occurrences of `b` until finding one, if any, within distance `k`.

## C# Solution

```csharp
public class Solution {
    public IList<int> BeautifulIndices(string s, string a, string b, int k) {
        List<int> ans = new List<int>();
        List<int> indicesA = Kmp(s, a);
        List<int> indicesB = Kmp(s, b);

        int j = 0;
        foreach (int i in indicesA) {
            while (j < indicesB.Count && indicesB[j] - i < -k)
                j++;
            if (j < indicesB.Count && indicesB[j] - i <= k)
                ans.Add(i);
        }
        return ans;
    }

    // Returns every starting index at which `pattern` occurs in `text`.
    private List<int> Kmp(string text, string pattern) {
        List<int> res = new List<int>();
        int[] lps = GetLps(pattern);
        int i = 0, p = 0;
        while (i < text.Length) {
            if (text[i] == pattern[p]) {
                i++;
                p++;
                if (p == pattern.Length) {
                    res.Add(i - p);
                    p = lps[p - 1];
                }
            } else if (p > 0) {
                p = lps[p - 1];
            } else {
                i++;
            }
        }
        return res;
    }

    // Builds the "longest proper prefix that is also a suffix" table for `pattern`.
    private int[] GetLps(string pattern) {
        int[] lps = new int[pattern.Length];
        for (int i = 1, j = 0; i < pattern.Length; i++) {
            while (j > 0 && pattern[j] != pattern[i])
                j = lps[j - 1];
            if (pattern[i] == pattern[j])
                lps[i] = ++j;
        }
        return lps;
    }
}
```

## Complexity

- Time: O(|s| + |a| + |b|) — linear KMP searches plus a linear merge.
- Space: O(|s| + |a| + |b|) — for the LPS tables and the occurrence lists.
