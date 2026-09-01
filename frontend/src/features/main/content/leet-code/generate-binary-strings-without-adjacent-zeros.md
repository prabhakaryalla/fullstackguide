# 3211. Generate Binary Strings Without Adjacent Zeros

**Difficulty:** Medium
**Category:** Backtracking, Bit Manipulation, String

## Problem
Given an integer `n`, generate all binary strings of length `n` that do not contain two consecutive `'0'` characters anywhere in the string. Return the list of all such valid strings, in any order.

## Approach
Use backtracking (depth-first search) to build the string character by character. At each step, you may always append `'1'` freely, since it never creates two consecutive zeros. You may only append `'0'` if the string built so far is empty or its last character is `'1'` (preventing an adjacent-zero violation). Once the string reaches length `n`, add it to the results list.

## C# Solution
```csharp
public class Solution {
    public IList<string> ValidStrings(int n) {
        List<string> ans = new List<string>();
        Dfs(n, new System.Text.StringBuilder(), ans);
        return ans;
    }

    private void Dfs(int n, System.Text.StringBuilder s, List<string> ans) {
        if (n == 0) {
            ans.Add(s.ToString());
            return;
        }

        if (s.Length == 0 || s[s.Length - 1] == '1') {
            s.Append('0');
            Dfs(n - 1, s, ans);
            s.Length--;
        }
        s.Append('1');
        Dfs(n - 1, s, ans);
        s.Length--;
    }
}
```

## Complexity
- Time: O(2^n) in the worst case
- Space: O(n * 2^n) for storing all resulting strings
