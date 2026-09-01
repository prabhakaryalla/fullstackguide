# 727. Minimum Window Subsequence

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given strings `s1` and `s2`, return the minimum contiguous substring `W` of `s1` such that `s2` is a subsequence of `W`. If no such substring exists, return an empty string.

### Example

```
Input: s1 = "abcdebdde", s2 = "bde"
Output: "bcde"
```

## Approach

Use a two-pointer forward-then-backward scan. Scan `s1` forward from each starting position, greedily matching characters of `s2` in order until all of `s2` is matched (or `s1` runs out); this finds a window ending point where `s2` is fully matched as a subsequence. Then scan backward from that ending point, matching `s2` in reverse, to find the tightest possible starting point for that same window — since the forward match might have used more characters than strictly necessary near the start. Track the best (shortest) window found across all starting positions.

## C# Solution

```csharp
public class Solution
{
    public string MinWindow(string s1, string s2)
    {
        int n = s1.Length, m = s2.Length;
        int bestStart = -1, bestLength = int.MaxValue;

        int i = 0;
        while (i < n)
        {
            int j = 0;
            int start = i;

            while (i < n && j < m)
            {
                if (s1[i] == s2[j]) j++;
                i++;
            }

            if (j == m)
            {
                int end = i;
                j = m - 1;
                i--;

                while (j >= 0)
                {
                    if (s1[i] == s2[j]) j--;
                    i--;
                }

                i++;

                if (end - i < bestLength)
                {
                    bestLength = end - i;
                    bestStart = i;
                }

                i = start + 1;
            }
        }

        return bestStart == -1 ? "" : s1.Substring(bestStart, bestLength);
    }
}
```

## Complexity

- **Time:** `O(n * m)` in the worst case.
- **Space:** `O(1)` extra.
