# 3146. Permutation Difference between Two Strings

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

You are given two strings `s` and `t`, each a permutation of the same set of distinct characters. The "permutation difference" is the sum, over every character, of the absolute difference between its index in `s` and its index in `t`. Return this value.

### Example

```
Input: s = "abc", t = "bac"
Output: 2
Explanation: 'a' is at index 0 in s and 1 in t (diff 1); 'b' is at index 1 in s and 0 in t (diff 1);
'c' is at index 2 in both (diff 0). Total = 2.
```

## Approach

Record the index of every character in `s` using a 26-slot array. Then scan `t`, and for each character sum the absolute difference between its recorded index from `s` and its current index in `t`.

## C# Solution

```csharp
public class Solution {
    public int FindPermutationDifference(string s, string t) {
        int ans = 0;
        int[] indices = new int[26];

        for (int i = 0; i < s.Length; i++)
            indices[s[i] - 'a'] = i;

        for (int i = 0; i < t.Length; i++)
            ans += Math.Abs(indices[t[i] - 'a'] - i);

        return ans;
    }
}
```

## Complexity

- Time: O(n) — two linear passes over the strings.
- Space: O(1) — a fixed 26-slot index array.
