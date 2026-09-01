# 1540. Can Convert String in K Moves

**Difficulty:** Medium
**Category:** String, Greedy, Counting

## Problem

Given two strings `s` and `t` of the same length and an integer `k`, you may perform up to `k` moves. In the `i`-th move (1-indexed), you may choose any index not yet changed and shift its character forward in the alphabet (cyclically) by exactly `i` positions. Return `true` if `s` can be transformed into `t` within `k` moves.

### Example

```
Input: s = "input", t = "ouput", k = 9
Output: true
```

## Approach

For every position where `s[i] != t[i]`, compute the required forward shift `diff = (t[i] - s[i] + 26) % 26` (a value from 1 to 25). Group positions by this `diff` value. Within a group of size `m`, the moves used must be distinct move-numbers all congruent to `diff` modulo 26 (since re-using the same move number `i` twice is not allowed, but any future move number `diff + 26 * j` — for `j = 0, 1, 2, ...` — also produces the same net shift). So the `j`-th occurrence (0-indexed) of a given `diff` requires a move number of at least `diff + 26 * j`. The transformation is feasible if and only if, for every `diff` group, the largest such required move number does not exceed `k`.

## C# Solution

```csharp
public class Solution
{
    public bool CanConvertString(string s, string t, int k)
    {
        if (s.Length != t.Length)
        {
            return false;
        }

        int[] diffCounts = new int[26];

        for (int i = 0; i < s.Length; i++)
        {
            int diff = (t[i] - s[i] + 26) % 26;
            if (diff != 0)
            {
                int occurrence = diffCounts[diff];
                int requiredMove = diff + 26 * occurrence;
                if (requiredMove > k)
                {
                    return false;
                }
                diffCounts[diff]++;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the strings.
- **Space:** `O(1)` — a fixed-size array of 26 counters.
