# 3228. Maximum Number of Operations to Move Ones to the End

**Difficulty:** Medium
**Category:** Counting, Greedy, String

## Problem
Given a binary string, an operation selects a `'1'` that is immediately followed by a `'0'`, and moves that `'1'` to any later position in the string that is currently a `'0'` (shifting characters as needed). Return the maximum number of such operations that can be performed on the string.

## Approach
Scan through the string tracking a running count of `'1'`s encountered so far. Whenever a `'0'` is encountered that is either the last character of the string or immediately followed by a `'1'` (marking the end of a maximal block of consecutive zeros), all `'1'`s counted so far can each perform one valid operation using that "boundary" position, so add the running ones-count to the answer at that point. This effectively counts, for every maximal run of zeros in the string, how many ones precede it (each contributing one valid move opportunity).

## C# Solution
```csharp
public class Solution {
    public int MaxOperations(string s) {
        int ans = 0;
        int ones = 0;

        for (int i = 0; i < s.Length; i++) {
            if (s[i] == '1') {
                ones++;
            } else if (i + 1 == s.Length || s[i + 1] == '1') {
                ans += ones;
            }
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
