# 3031. Minimum Time to Revert Word to Initial State II

**Difficulty:** Hard
**Category:** String, String Matching, Hash Function

## Problem

This is the larger-constraints version of [Minimum Time to Revert Word to Initial State I](minimum-time-to-revert-word-to-initial-state-i.md): every second, remove the first `k` characters of `word` and append any `k` characters of your choosing to the end. Return the minimum number of seconds (at least `1`) needed for `word` to become equal to its original value again, where `word` can now be as long as `10^6` characters.

## Approach

The reasoning is identical to Part I — after `t` operations, the surviving suffix `word[t*k..n-1]` must already equal the corresponding prefix of the original `word`, which is exactly what the **Z-function** measures at index `t*k`. Since the Z-function is computed in linear time regardless of input size, the exact same algorithm already scales to the larger constraints.

## C# Solution

```csharp
public class Solution {
    public int MinimumTimeToInitialState(string word, int k) {
        int n = word.Length;
        int maxOps = (n - 1) / k + 1;
        int[] z = ZFunction(word);

        for (int ans = 1; ans < maxOps; ans++)
            if (z[ans * k] >= n - ans * k)
                return ans;
        return maxOps;
    }

    private int[] ZFunction(string s) {
        int n = s.Length;
        int[] z = new int[n];
        int l = 0, r = 0;
        for (int i = 1; i < n; i++) {
            if (i < r)
                z[i] = Math.Min(r - i, z[i - l]);
            while (i + z[i] < n && s[z[i]] == s[i + z[i]])
                z[i]++;
            if (i + z[i] > r) {
                l = i;
                r = i + z[i];
            }
        }
        return z;
    }
}
```

## Complexity

- Time: O(n) — the Z-function is computed in linear time.
- Space: O(n) — the Z-array.
