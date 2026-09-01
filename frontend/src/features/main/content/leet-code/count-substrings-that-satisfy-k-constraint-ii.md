# 3261. Count Substrings That Satisfy K-Constraint II

**Difficulty:** Hard
**Category:** Array, Binary Search, Prefix Sum, Sliding Window, String

## Problem
This is the query-based version of "Count Substrings That Satisfy K-Constraint I": given a binary string `s`, an integer `k`, and a list of range queries `[l, r]`, for each query count the number of substrings within `s[l..r]` (inclusive) that satisfy the K-constraint (count of 0s or count of 1s in the substring is at most `k`).

## Approach
Precompute two arrays using sliding-window techniques: `rightToLeft[r]`, the minimum left index such that `s[left..r]` satisfies the constraint, and `leftToRight[l]`, the maximum right index such that `s[l..right]` satisfies the constraint (computed via forward and backward sliding windows respectively). Also precompute a prefix-sum array where `prefix[i]` represents the total count of valid (constraint-satisfying) substrings ending anywhere within `s[0..i-1]`, using `rightToLeft` to determine each individual right endpoint's contribution. For each query `[l, r]`: if `r` extends beyond `leftToRight[l]` (meaning the whole substring can't trivially satisfy the constraint as one block), split into two parts — the substrings entirely within `[l, leftToRight[l]]` (counted via a triangular-number style closed form based on that segment's length) plus the valid substrings ending in `(leftToRight[l], r]` (retrieved via the prefix-sum array difference); otherwise, if `r` is within `leftToRight[l]`, the entire range `[l, r]` trivially satisfies the constraint for every substring within it, so the count is simply the triangular number for that range's length.

## C# Solution
```csharp
public class Solution {
    public long[] CountKConstraintSubstrings(string s, int k, int[][] queries) {
        int n = s.Length;
        long[] ans = new long[queries.Length];
        int[] count = new int[2];
        int[] leftToRight = new int[n];
        int[] rightToLeft = new int[n];
        long[] prefix = new long[n + 1];

        int l = 0;
        for (int r = 0; r < n; r++) {
            count[s[r] - '0']++;
            while (count[0] > k && count[1] > k)
                count[s[l++] - '0']--;
            rightToLeft[r] = l;
        }

        count = new int[2];
        int rr = n - 1;
        for (int ll = n - 1; ll >= 0; ll--) {
            count[s[ll] - '0']++;
            while (count[0] > k && count[1] > k)
                count[s[rr--] - '0']--;
            leftToRight[ll] = rr;
        }

        for (int r = 0; r < n; r++)
            prefix[r + 1] = prefix[r] + (r - rightToLeft[r] + 1);

        for (int idx = 0; idx < queries.Length; idx++) {
            int ql = queries[idx][0];
            int qr = queries[idx][1];
            long numValidSubstrings;

            if (qr > leftToRight[ql]) {
                long sz = leftToRight[ql] - ql + 1;
                numValidSubstrings = sz * (sz + 1) / 2 + (prefix[qr + 1] - prefix[leftToRight[ql] + 1]);
            } else {
                long sz = qr - ql + 1;
                numValidSubstrings = sz * (sz + 1) / 2;
            }

            ans[idx] = numValidSubstrings;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n + q)
- Space: O(n)
