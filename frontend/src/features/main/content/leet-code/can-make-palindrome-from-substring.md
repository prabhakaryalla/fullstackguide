# 1177. Can Make Palindrome from Substring

**Difficulty:** Medium
**Category:** Array, Hash Table, Bit Manipulation, String, Prefix Sum

## Problem

Given a string `s` and a list of `queries[i] = [left, right, k]`, for each query determine whether the characters of `s[left..right]` can be rearranged (after changing at most `k` of them to any character) to form a palindrome. Return a boolean answer for each query.

### Example

```
Input: s = "abcda", queries = [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]]
Output: [true,false,false,true,true]
```

## Approach

A string can be rearranged into a palindrome if at most one character has an odd frequency. Track a running XOR bitmask over the 26 letters as a prefix array, where flipping the bit for a character toggles its odd/even parity. XOR-ing two prefix masks gives the parity bitmask for any range in `O(1)`, and its popcount is the number of letters with odd frequency in that range. The number of replacements needed to fix that range is `oddCount / 2` (one letter is always allowed to remain unpaired as the palindrome's center), so the query answer is `oddCount / 2 <= k`.

## C# Solution

```csharp
public class Solution
{
    public IList<bool> CanMakePaliQueries(string s, int[][] queries)
    {
        int n = s.Length;
        int[] prefixMask = new int[n + 1];

        for (int i = 0; i < n; i++)
        {
            prefixMask[i + 1] = prefixMask[i] ^ (1 << (s[i] - 'a'));
        }

        var result = new List<bool>();

        foreach (var q in queries)
        {
            int left = q[0], right = q[1], k = q[2];
            int mask = prefixMask[right + 1] ^ prefixMask[left];
            int oddCount = System.Numerics.BitOperations.PopCount((uint)mask);
            result.Add(oddCount / 2 <= k);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + q)`.
- **Space:** `O(n)` for the prefix mask array.
