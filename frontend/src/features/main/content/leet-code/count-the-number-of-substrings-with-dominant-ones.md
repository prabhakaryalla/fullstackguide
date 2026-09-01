# 3234. Count the Number of Substrings With Dominant Ones

**Difficulty:** Medium
**Category:** Enumeration, String

## Problem
Given a binary string, count the number of substrings where the number of `'1'`s is greater than or equal to the square of the number of `'0'`s in that substring.

## Approach
Iterate over every possible count of zeros `z` such that `z + z*z` does not exceed the string length (since beyond that, no valid substring can exist with that many zeros while satisfying the dominance condition). For each fixed `z`, use a sliding window technique: expand the right boundary through the string while maintaining counts of 0s and 1s in the current window, and greedily shrink the window from the left whenever it's possible to remove a redundant 0 (exceeding the target `z`) or a redundant 1 (more than needed to satisfy `1s >= z*z`), tracking the position where shrinking was last blocked. Whenever the window's zero count equals exactly `z` and its one count is at least `z*z`, all its valid left-shrunk variants (from just after the last blocked position up to the current left boundary) represent valid substrings ending at the current right boundary, so add that count to the answer.

## C# Solution
```csharp
public class Solution {
    public int NumberOfSubstrings(string s) {
        int ans = 0;
        int n = s.Length;

        for (int zero = 0; zero + (long)zero * zero <= n; zero++) {
            int lastInvalidPos = -1;
            int[] count = new int[2];
            int l = 0;
            for (int r = 0; r < n; r++) {
                count[s[r] - '0']++;
                while (l < r) {
                    if (s[l] == '0' && count[0] > zero) {
                        count[0]--;
                        lastInvalidPos = l;
                        l++;
                    } else if (s[l] == '1' && count[1] - 1 >= (long)zero * zero) {
                        count[1]--;
                        l++;
                    } else {
                        break;
                    }
                }
                if (count[0] == zero && count[1] >= (long)zero * zero)
                    ans += l - lastInvalidPos;
            }
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n * sqrt(n))
- Space: O(1)
