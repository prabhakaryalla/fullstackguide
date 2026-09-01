# 2955. Count the Substrings of Length Three With Distinct Characters

**Difficulty:** Easy
**Category:** String, Sliding Window, Hash Table

## Problem

Given a string `s`, return the number of substrings of length 3 that contain three distinct characters.

### Example

```
Input: s = "xyzzaz"
Output: 1
Explanation: The only substring of length 3 with distinct characters is "xyz"

Input: s = "aababcabc"
Output: 4
Explanation: "abc" appears at positions 1, 5, 6, 7 (indices 2-4, 5-7, 6-8, 7-9 have different chars)
```

## Approach

Use a sliding window of size 3. For each window, check if all three characters are distinct by comparing them or using a set.

## C# Solution

```csharp
public class Solution
{
    public int CountGoodSubstrings(string s)
    {
        if (s.Length < 3) return 0;

        int count = 0;

        for (int i = 0; i <= s.Length - 3; i++)
        {
            if (s[i] != s[i + 1] && s[i] != s[i + 2] && s[i + 1] != s[i + 2])
            {
                count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
