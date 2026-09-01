# 3084. Count Substrings Starting and Ending with Given Character

**Difficulty:** Medium
**Category:** Math, String, Counting

## Problem

Given a string `s` and a character `c`, return the total number of substrings of `s` that both start and end with `c` (including single-character substrings equal to `c`).

### Example

```
Input: s = "abada", c = "a"
Output: 6
Explanation: 'a' occurs at indices 0, 2, 4. Any pair (including a letter paired with itself) forms a
valid substring starting and ending with 'a': C(3,2) pairs + 3 singles = 3 + 3 = 6.
```

## Approach

If `c` occurs `freq` times in `s`, any pair of occurrences (including pairing an occurrence with itself) defines a valid substring starting and ending with `c`. The count of such pairs (with repetition, unordered by position since start <= end is implied by picking two occurrences in order) is `freq * (freq + 1) / 2`.

## C# Solution

```csharp
public class Solution {
    public long CountSubstrings(string s, char c) {
        long freq = s.Count(x => x == c);
        return freq * (freq + 1) / 2;
    }
}
```

## Complexity

- Time: O(n) — one pass to count occurrences of `c`.
- Space: O(1).
