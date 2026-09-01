# 3639. Minimum Time to Activate String

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem
You are given a string `s` of length `n` and an integer array `order`, a permutation of `[0, n - 1]`. Starting at time `t = 0`, at each time step, the character at index `order[t]` in `s` is replaced with `'*'`.

A substring is valid if it contains at least one `'*'`. A string is active if the number of valid substrings is at least `k`.

Return the minimum time `t` at which the string becomes active, or `-1` if it is impossible.

### Example
Input: `s = "cat", order = [0,2,1], k = 6`
Output: `2`
Explanation: At `t=0`: `"*at"` has 3 valid substrings (`"*"`, `"*a"`, `"*at"`) — not enough. At `t=1`: `"*a*"` has 5 valid substrings — not enough. At `t=2`: `"***"` has all 6 substrings valid — active. The answer is 2.

Constraints:
- `1 <= n <= 10^5`
- `1 <= k <= 10^9`

## Approach
The total number of substrings of a string of length `n` is `n * (n + 1) / 2`. A substring is invalid only if it lies entirely within a maximal run of characters that have not yet been replaced by `'*'`; a run of length `L` contributes `L * (L + 1) / 2` invalid substrings. So the number of valid substrings at time `t` equals `n*(n+1)/2` minus the sum of `L*(L+1)/2` over every maximal run of un-replaced characters.

As `t` increases, more characters become `'*'`, so the number of valid substrings is monotonically non-decreasing. Binary search on `t`: for each candidate `t`, mark the first `t + 1` positions from `order` as active, scan for maximal inactive runs to compute the valid substring count, and check if it is at least `k`.

## C# Solution

```csharp
public class Solution {
    public int MinTime(string s, int[] order, int k) {
        int n = s.Length;
        long totalPossible = (long)n * (n + 1) / 2;
        if (totalPossible < k) return -1;

        bool[] active = new bool[n];
        int lo = 0, hi = n - 1, ans = -1;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            Array.Clear(active, 0, n);
            for (int i = 0; i <= mid; i++) active[order[i]] = true;

            long invalid = 0;
            int run = 0;
            for (int i = 0; i < n; i++) {
                if (!active[i]) {
                    run++;
                } else {
                    invalid += (long)run * (run + 1) / 2;
                    run = 0;
                }
            }
            invalid += (long)run * (run + 1) / 2;

            long validCount = totalPossible - invalid;
            if (validCount >= k) {
                ans = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
