# 1736. Latest Time by Replacing Hidden Digits

**Difficulty:** Easy
**Category:** String, Greedy, Enumeration

## Problem

Given a string `time` in the 12-hour format `"hh:mm"` where some digits are hidden as `'?'`, replace the hidden digits so that the resulting time is a valid time and is as late as possible.

### Example

```
Input: time = "1?:?4"
Output: "11:54"
```

## Approach

Since the search space is tiny (`12 * 60` combinations), enumerate every valid hour `00..11` and minute `00..59`, skip any candidate that conflicts with a fixed (non-`'?'`) digit in `time`, and keep the lexicographically largest candidate — which is also chronologically latest for same-length zero-padded times.

## C# Solution

```csharp
public class Solution
{
    public string MaximumTime(string time)
    {
        string best = null;

        for (int h = 0; h < 12; h++)
        {
            string hh = h.ToString("D2");
            if (time[0] != '?' && time[0] != hh[0]) continue;
            if (time[1] != '?' && time[1] != hh[1]) continue;

            for (int m = 0; m < 60; m++)
            {
                string mm = m.ToString("D2");
                if (time[3] != '?' && time[3] != mm[0]) continue;
                if (time[4] != '?' && time[4] != mm[1]) continue;

                string candidate = hh + ":" + mm;
                if (best == null || string.Compare(candidate, best, StringComparison.Ordinal) > 0)
                    best = candidate;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(1)` (bounded search space of `720` combinations).
- **Space:** `O(1)`.
