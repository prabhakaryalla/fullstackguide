# 2609. Find the Longest Balanced Substring of a Binary String

**Difficulty:** Easy
**Category:** String

## Problem

You are given a binary string `s` consisting only of zeroes and ones. A substring of `s` is considered balanced if all zeroes are before all ones and the number of zeroes is equal to the number of ones. Note that the empty substring is also balanced.

Return the length of the longest balanced substring of `s`.

### Example

```
Input: s = "01000111"
Output: 6
Explanation: The longest balanced substring is "000111", which has length 6.
```

## Approach

Scan the string, tracking consecutive runs of `0`s and `1`s. For each transition from `0` to `1`, the balanced length is `2 * min(zero_count, one_count)`. Keep track of the maximum balanced length encountered.

## C# Solution

```csharp
public class Solution
{
    public int FindTheLongestBalancedSubstring(string s)
    {
        int maxLen = 0;
        int zeros = 0;
        int ones = 0;
        
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == '0')
            {
                if (ones > 0)
                {
                    zeros = 1;
                    ones = 0;
                }
                else
                {
                    zeros++;
                }
            }
            else
            {
                ones++;
                maxLen = Math.Max(maxLen, 2 * Math.Min(zeros, ones));
            }
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n) — single pass through the string
- **Space:** O(1) — constant extra space
