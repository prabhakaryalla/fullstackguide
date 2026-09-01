# 3029. Minimum Time to Revert Word to Initial State I

**Difficulty:** Medium
**Category:** String, String Matching, Hash Function

## Problem

You are given a string `word` and an integer `k`. Every second, you must remove the first `k` characters of `word` and append any `k` characters (of your choosing) to the end, keeping the length constant. Return the minimum number of seconds needed for `word` to become equal to its **original** value again (you must perform at least one operation).

### Example

```
Input: word = "abacaba", k = 3
Output: 2
Explanation: After 1 second: word could become "cababac" -> not equal to original after appending
any 3 chars, but after 2 seconds the remaining prefix ("acaba") plus 2*3=6 removed chars means we
just need the suffix "acaba" to already match a prefix of the original "abacaba", which it does
starting at index 2 — so 2 operations suffice with the right appended characters.
```

## Approach

After `t` operations, the first `t * k` characters have been discarded and replaced with arbitrary new characters (which we get to choose freely). So `word` can be restored to its original value after `t` seconds **if and only if** the surviving suffix `word[t*k .. n-1]` already matches the corresponding prefix of the original `word` — i.e., `word[t*k..n-1]` is itself a prefix of `word` (the freely-chosen appended characters can fill in the rest to complete the match).

Compute the **Z-function** of `word`, where `z[i]` is the length of the longest substring starting at `i` that matches a prefix of `word`. Then for the smallest `t >= 1` such that `t * k < n` and `z[t*k] >= n - t*k` (meaning the whole remaining suffix matches the prefix), `t` is the answer. If no such `t` exists before the whole string would need replacing, the answer is `ceil(n / k)` (replace everything, which trivially restores the original after enough operations, since eventually the whole word is overwritten and there's an implicit guarantee that the final full replacement always works).

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

    // Returns the Z-array, where z[i] is the length of the longest prefix of s[i..n)
    // that is also a prefix of s. See https://cp-algorithms.com/string/z-function.html
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
