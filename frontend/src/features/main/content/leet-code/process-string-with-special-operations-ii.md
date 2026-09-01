# 3614. Process String with Special Operations II

**Difficulty:** Hard
**Category:** String, Simulation

## Problem
You are given a string `s` consisting of lowercase English letters and the special characters `*`, `#`, and `%`, and an integer `k`.

Build a new string `result` by processing `s` from left to right using the same rules as before:
- A lowercase letter is appended to `result`.
- `*` removes the last character of `result`, if one exists.
- `#` duplicates `result` and appends the duplicate to itself.
- `%` reverses `result`.

Return the `k`th character (0-indexed) of the final `result`. If `k` is out of bounds, return `'.'`.

### Example
Input: `s = "cd%#*#", k = 3`
Output: `"d"`
Explanation: `"c"` → `"cd"` → `"dc"` (reverse) → `"dcdc"` (duplicate) → `"dcd"` (remove last) → `"dcddcd"` (duplicate). Index 3 of `"dcddcd"` is `'d'`.

Constraints:
- `1 <= s.length <= 10^5`
- `0 <= k <= 10^15`
- The length of `result` never exceeds `10^15`.

## Approach
The result can grow exponentially, so it cannot be built directly. Instead, precompute the length of `result` after each prefix of `s` (capping the tracked length at a safe bound above `10^15` so it never overflows). If `k` is beyond the final length, return `'.'`.

Otherwise, walk backward through `s`, maintaining the target index `idx` and "undoing" each operation to find which earlier state it came from:
- Letter: if `idx` equals the last index of the string at this step, the letter itself is the answer; otherwise `idx` is unchanged and refers to the state before the letter was appended.
- `*`: the removed character does not affect earlier indices, so `idx` is unchanged.
- `#`: if `idx` falls in the second half (the duplicate), subtract the pre-duplication length from `idx`; otherwise leave it unchanged.
- `%`: mirror `idx` around the length of the string at this step (`idx = lenBefore - 1 - idx`).

The loop terminates the first time a letter step is identified as the source of `idx`.

## C# Solution

```csharp
public class Solution {
    public char ProcessQueries(string s, long k) {
        const long Cap = 2_000_000_000_000_00L; // 2e15, safely above any valid k
        int n = s.Length;
        long[] len = new long[n + 1];
        len[0] = 0;

        for (int i = 1; i <= n; i++) {
            char c = s[i - 1];
            if (char.IsLower(c)) {
                len[i] = len[i - 1] + 1;
            } else if (c == '*') {
                len[i] = Math.Max(0, len[i - 1] - 1);
            } else if (c == '#') {
                len[i] = len[i - 1] > Cap ? Cap : Math.Min(len[i - 1] * 2, Cap);
            } else { // '%'
                len[i] = len[i - 1];
            }
        }

        if (k >= len[n]) {
            return '.';
        }

        long idx = k;
        for (int i = n; i >= 1; i--) {
            char c = s[i - 1];
            if (char.IsLower(c)) {
                if (idx == len[i] - 1) {
                    return c;
                }
                // idx stays the same, referring to len[i - 1] state
            } else if (c == '*') {
                // idx unchanged; removing from the end doesn't shift earlier indices
            } else if (c == '#') {
                if (idx >= len[i - 1]) {
                    idx -= len[i - 1];
                }
            } else { // '%'
                idx = len[i - 1] - 1 - idx;
            }
        }

        return '.'; // unreachable given the length check above
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of s.
- **Space:** O(n)
