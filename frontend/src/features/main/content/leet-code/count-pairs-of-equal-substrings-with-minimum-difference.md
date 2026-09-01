# 1794. Count Pairs of Equal Substrings With Minimum Difference

**Difficulty:** Medium
**Category:** Hash Table, String, Prefix Sum

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `firstString` and `secondString`, a "good" quadruple `(i, j, a, b)` picks a non-empty substring `firstString[i..a]` equal to `secondString[j..b]`. Return the number of good quadruples whose value `(a - i) - (b - j)` is the minimum possible.

### Example

```
Input: firstString = "abcd", secondString = "bccda"
Output: 1
```

## Approach

Because the metric `(a - i) - (b - j)` can always be minimized using single-character substrings (shrinking a longer match never increases this value), only individual matching letters need to be considered. For each letter, record its *last* occurrence index in `firstString` and its *first* occurrence index in `secondString` — using the last occurrence in the first string and first occurrence in the second string minimizes the corresponding difference for that letter. Compute this difference for every letter present in both strings, keep the minimum, and count how many letters achieve it.

## C# Solution

```csharp
public class Solution
{
    public int CountQuadruples(string firstString, string secondString)
    {
        int[] lastInFirst = new int[26];
        Array.Fill(lastInFirst, -1);
        for (int i = firstString.Length - 1; i >= 0; i--)
            lastInFirst[firstString[i] - 'a'] = i;

        int[] firstInSecond = new int[26];
        Array.Fill(firstInSecond, -1);
        for (int i = 0; i < secondString.Length; i++)
            if (firstInSecond[secondString[i] - 'a'] == -1)
                firstInSecond[secondString[i] - 'a'] = i;

        int result = 0;
        int minDiff = int.MaxValue;

        for (int c = 0; c < 26; c++)
        {
            if (lastInFirst[c] == -1 || firstInSecond[c] == -1) continue;

            int diff = lastInFirst[c] - firstInSecond[c];
            if (diff < minDiff)
            {
                minDiff = diff;
                result = 0;
            }
            if (diff == minDiff) result++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(1)` (fixed-size 26-letter arrays).
