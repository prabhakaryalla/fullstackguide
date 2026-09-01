# 2982. Find Longest Special Substring That Occurs Thrice II

**Difficulty:** Medium
**Category:** String, Binary Search, Sliding Window, Counting

## Problem

Same as problem 2981, but with larger constraints requiring an optimized O(n log n) or O(n) solution.

A string is special if it consists of only one character repeated. Return the length of the longest special substring that occurs at least three times, or -1 if no such substring exists.

### Example

```
Input: s = "aaaa"
Output: 2

Input: s = "abcdef"
Output: -1
```

## Approach

Group consecutive characters. For each character, collect all run lengths. Use binary search on the answer. For a candidate length `len`, count how many special substrings of that length exist for each character group.

## C# Solution

```csharp
public class Solution
{
    public int MaximumLength(string s)
    {
        var runs = new Dictionary<char, List<int>>();
        int n = s.Length;

        // Find all runs
        int i = 0;
        while (i < n)
        {
            char c = s[i];
            int count = 0;
            while (i < n && s[i] == c)
            {
                count++;
                i++;
            }

            if (!runs.ContainsKey(c))
            {
                runs[c] = new List<int>();
            }
            runs[c].Add(count);
        }

        int maxLen = -1;

        foreach (var kvp in runs)
        {
            var lengths = kvp.Value;

            for (int len = 1; len <= lengths.Max(); len++)
            {
                int occurrences = 0;

                foreach (int runLen in lengths)
                {
                    if (runLen >= len)
                    {
                        occurrences += runLen - len + 1;
                    }
                }

                if (occurrences >= 3)
                {
                    maxLen = Math.Max(maxLen, len);
                }
            }
        }

        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n * maxRunLength)
- **Space:** O(n)
