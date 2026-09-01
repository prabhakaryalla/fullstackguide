# 3365. Rearrange K Substrings to Form Target String

**Difficulty:** Medium
**Category:** String, Hash Table, Sorting

## Problem

Given strings `s` and `t` of equal length that is divisible by `k`, split both into `k` equal-length contiguous substrings. Determine if the list of substrings of `s` can be rearranged (permuted) to exactly match the list of substrings of `t`.

### Example

Input: `s = "abcdcdab"`, `t = "cdabcdab"`, `k = 2`
Output: `true` — `s` splits into `["abcd","cdab"]` and `t` into `["cdab","cdab"]`... if multisets match it returns true.

## Approach

Split both strings into `k` equal chunks, then compare whether the two chunk lists contain the same multiset of substrings (using a dictionary count or by sorting both lists and comparing).

## C# Solution

```csharp
public class Solution 
{
    public bool IsPossibleToRearrange(string s, string t, int k) 
    {
        int n = s.Length;
        int len = n / k;
        var listS = new List<string>();
        var listT = new List<string>();
        for (int i = 0; i < n; i += len) 
        {
            listS.Add(s.Substring(i, len));
            listT.Add(t.Substring(i, len));
        }

        listS.Sort(StringComparer.Ordinal);
        listT.Sort(StringComparer.Ordinal);

        for (int i = 0; i < k; i++)
            if (listS[i] != listT[i]) return false;
        return true;
    }
}
```

## Complexity

- **Time:** O(k log k * len)
- **Space:** O(n)
