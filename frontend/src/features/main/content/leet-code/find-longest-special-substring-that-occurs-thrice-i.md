# 2981. Find Longest Special Substring That Occurs Thrice I

**Difficulty:** Medium
**Category:** String, Hash Table, Sliding Window, Counting

## Problem

A string is special if it consists of only one character repeated. You are given a string `s`. Return the length of the longest special substring that occurs at least three times, or -1 if no such substring exists.

### Example

```
Input: s = "aaaa"
Output: 2
Explanation: "aa" occurs 3 times (positions 0-1, 1-2, 2-3).

Input: s = "abcdef"
Output: -1
Explanation: No character repeats, so no special substring occurs thrice.

Input: s = "abcaba"
Output: 1
Explanation: "a" occurs 3 times.
```

## Approach

For each character, find all consecutive runs. For each run length, generate all possible special substrings and count their occurrences. Track the maximum length that appears at least 3 times.

## C# Solution

```csharp
public class Solution
{
    public int MaximumLength(string s)
    {
        var count = new Dictionary<string, int>();
        int n = s.Length;

        for (int i = 0; i < n; i++)
        {
            for (int len = 1; len <= n - i; len++)
            {
                string sub = s.Substring(i, len);

                // Check if special (all same character)
                bool isSpecial = true;
                for (int j = 1; j < sub.Length; j++)
                {
                    if (sub[j] != sub[0])
                    {
                        isSpecial = false;
                        break;
                    }
                }

                if (isSpecial)
                {
                    count[sub] = count.GetValueOrDefault(sub, 0) + 1;
                }
                else
                {
                    break; // No point checking longer substrings from this position
                }
            }
        }

        int maxLen = -1;
        foreach (var kvp in count)
        {
            if (kvp.Value >= 3)
            {
                maxLen = Math.Max(maxLen, kvp.Key.Length);
            }
        }

        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(n²) for the dictionary
