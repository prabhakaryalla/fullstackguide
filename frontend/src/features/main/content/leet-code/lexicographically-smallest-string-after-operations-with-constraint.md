# 3106. Lexicographically Smallest String After Operations With Constraint

**Difficulty:** Medium
**Category:** Greedy, String

## Problem

You are given a string `s` of lowercase letters and an integer `k`. In one "step," you may cyclically shift any single character forward or backward by one letter (e.g., `'a'` can become `'z'` or `'b'`); the cost to fully change a character `c` to a target character `t` is the minimum number of steps around the cyclic alphabet. You may spend a total budget of `k` steps across the whole string (distributed however you like) to minimize the resulting string lexicographically. Return the lexicographically smallest string achievable.

## Approach

Process the string left to right (since earlier positions matter most for lexicographic order). For each character, compute the cheapest distance to `'a'` (the smaller of going forward or backward cyclically). If the remaining budget `k` covers that full distance, spend it and set the character to `'a'`; otherwise, spend all remaining budget shifting the character as close to `'a'` as it can get, then stop (no budget left for the rest of the string).

## C# Solution

```csharp
public class Solution {
    public string GetSmallestString(string s, int k) {
        char[] ans = s.ToCharArray();

        for (int i = 0; i < ans.Length; i++) {
            if (k == 0)
                break;
            int distToA = Math.Min(ans[i] - 'a', 'z' - ans[i] + 1);
            if (k >= distToA) {
                k -= distToA;
                ans[i] = 'a';
            } else {
                ans[i] = (char)(ans[i] - k);
                k = 0;
            }
        }

        return new string(ans);
    }
}
```

## Complexity

- Time: O(n) — one pass over the string.
- Space: O(n) — the character array being built.
