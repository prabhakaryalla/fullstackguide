# 3008. Find Beautiful Indices in the Given Array II

**Difficulty:** Hard
**Category:** String, String Matching, Two Pointers

## Problem

This is the harder-constraints version of [Find Beautiful Indices in the Given Array I](find-beautiful-indices-in-the-given-array-i.md): given strings `s`, `a`, `b`, and integer `k`, an index `i` is **beautiful** if `s.Substring(i, a.Length) == a` and there exists `j` with `s.Substring(j, b.Length) == b` and `|j - i| <= k`. Return all beautiful indices sorted in increasing order. `s` can now be as long as `5 * 10^5`, so a quadratic search is too slow.

### Example

```
Input: s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
Output: [16,33]
```

## Approach

The size increase changes nothing algorithmically: KMP already finds every occurrence of `a` and `b` in linear time, and the two-pointer merge is linear too, so the exact same O(|s|) approach from Part I already meets the tighter constraints.

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
- Space: O(|s| + |a| + |b|).
