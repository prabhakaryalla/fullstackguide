# 1933. Check if String Is Decomposable Into Value-Equal Substrings

**Difficulty:** Easy
**Category:** String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A "value-equal" string has all characters equal and length either 3 or 4. Given a digit string `s`, return `true` if it can be split into consecutive substrings that are each value-equal, with exactly one of those substrings having length 4 and all others having length 3.

### Example

```
Input: s = "000111000"
Output: false
Explanation: The runs are "000" (len 3), "111" (len 3), "000" (len 3) — no run of length 4 exists.
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of digits only.

## Approach

Split `s` into maximal runs of identical consecutive characters (run-length encoding). Every run's length must be expressible using only groups of 3 (since a run can only be decomposed using value-equal blocks of the same repeated character, i.e., blocks of length 3 or 4 all matching that run's character) — meaning `runLength % 3` must be `0` (all blocks of 3) or the run must supply exactly one block of length 4 and the remainder divisible by 3. Track whether the single length-4 block has already been used across all runs; each run of length `L` needs `L % 3 == 0` (using only 3-blocks) or, if the "used the 4" flag isn't set yet, `(L - 4) % 3 == 0` and `L >= 4` (use one 4-block from this run). Exactly one run overall must use the length-4 block.

## C# Solution

```csharp
public class Solution
{
    public bool IsDecomposable(string s)
    {
        int n = s.Length;
        int i = 0;
        bool usedFour = false;

        while (i < n)
        {
            int j = i;
            while (j < n && s[j] == s[i]) j++;
            int runLength = j - i;

            if (runLength % 3 == 0)
            {
                // Fully decomposable using length-3 blocks only.
            }
            else if (!usedFour && runLength % 3 == 1 && runLength >= 4)
            {
                usedFour = true;
            }
            else
            {
                return false;
            }

            i = j;
        }

        return usedFour;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass to identify runs.
- **Space:** `O(1)`.
