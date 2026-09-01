# 3258. Count Substrings That Satisfy K-Constraint I

**Difficulty:** Easy
**Category:** Sliding Window, String

## Problem
Given a binary string `s` and an integer `k`, a substring satisfies the "K-constraint" if the count of `'0'`s in it is at most `k`, OR the count of `'1'`s in it is at most `k` (at least one of the two conditions must hold). Count the number of substrings of `s` that satisfy this constraint.

## Approach
Use a sliding window with two pointers. Expand the right boundary through the string, maintaining running counts of 0s and 1s within the window. Whenever both counts exceed `k` simultaneously (violating the constraint for the current window), shrink the window from the left until the constraint is satisfied again. At every valid right boundary position, add `r - l + 1` to the answer, since every substring ending at `r` and starting anywhere from `l` to `r` is guaranteed to satisfy the constraint (a shorter window is always at least as constrained-satisfying as a longer one containing it, since counts only decrease).

## C# Solution
```csharp
public class Solution {
    public int CountKConstraintSubstrings(string s, int k) {
        int ans = 0;
        int[] count = new int[2];
        int l = 0;

        for (int r = 0; r < s.Length; r++) {
            count[s[r] - '0']++;
            while (count[0] > k && count[1] > k)
                count[s[l++] - '0']--;
            ans += r - l + 1;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
