# 3557. Find Maximum Number of Non Intersecting Substrings

**Difficulty:** Medium
**Category:** Hash Table, String, Dynamic Programming, Greedy

## Problem
You are given a string `word`. Return the maximum number of non-intersecting substrings of `word` that are at least four characters long and start and end with the same letter.

**Example 1:**
Input: `word = "abcdeafdef"` → Output: `2` (`"abcdea"` and `"fdef"`)

**Example 2:**
Input: `word = "bcdaaaab"` → Output: `1` (only `"aaaa"`, since it intersects any other candidate)

**Constraints:**
- `1 <= word.length <= 2 * 10^5`
- `word` consists only of lowercase English letters.

## Approach
Process the string left to right while tracking, for each letter, the index of its first unmatched occurrence (`first[c]`). Maintain a "candidate interval" `[curStart, i]` that grows to encompass any repeated letters seen so far in the still-open interval:

- When we see a letter `c` for the first time (since the last reset), record `first[c] = i`.
- When we see `c` again, we know a valid substring could end at `i` starting anywhere back to `first[c]`. Merge this into the current candidate by setting `curStart = min(curStart, first[c])` (or `first[c]` if no candidate is open yet).
- If the current candidate interval `[curStart, i]` has length `>= 4`, we greedily finalize it as one substring, increment the answer, and reset all tracking (`first` map and `curStart`) because everything before index `i` is now "consumed" and future substrings cannot overlap it.

This greedy strategy is optimal: finalizing as soon as a valid interval of length `>= 4` is found never hurts, because any *smaller* substring found "now" leaves the maximum remaining string available for subsequent substrings, and delaying only risks entangling more characters without any benefit (extra length beyond the requirement is never useful for a second substring anyway).

## C# Solution

```csharp
public class Solution {
    public int MaxSubstrings(string word) {
        int n = word.Length;
        int[] first = new int[26];
        Array.Fill(first, -1);
        int curStart = -1;
        int count = 0;

        for (int i = 0; i < n; i++) {
            int c = word[i] - 'a';
            if (first[c] == -1) {
                first[c] = i;
            } else {
                curStart = curStart == -1 ? first[c] : Math.Min(curStart, first[c]);
                if (i - curStart + 1 >= 4) {
                    count++;
                    Array.Fill(first, -1);
                    curStart = -1;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n · 26) in the worst case due to the array resets, effectively O(n) amortized in practice since resets happen at most O(n) times overall and each reset is O(26).
- **Space:** O(1) — a fixed-size array of 26 letters.
