# 2311. Longest Binary Subsequence Less Than or Equal to K

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Greedy, Memoization

## Problem

You are given a binary string `s` and a positive integer `k`.

Return the length of the longest subsequence of `s` that makes up a binary number less than or equal to `k`.

Note that the subsequence can contain leading zeroes.

### Example

```
Input: s = "1001010", k = 5
Output: 5
Explanation: The longest subsequence is "00010" which represents 2 in decimal.
```

## Approach

Greedily select characters from right to left. Include all '0's as they don't increase the value. For '1's, add them only if the resulting binary number doesn't exceed `k`. Track the current value as we build from right to left, considering only the positions we've included. Count the total number of characters included.

## C# Solution

```csharp
public class Solution
{
    public int LongestSubsequence(string s, int k)
    {
        int n = s.Length;
        int count = 0;
        int value = 0;
        int power = 1;
        
        for (int i = n - 1; i >= 0 && power <= k; i--)
        {
            if (s[i] == '0')
            {
                count++;
            }
            else if (value + power <= k)
            {
                value += power;
                count++;
            }
            
            if (power <= k / 2)
            {
                power *= 2;
            }
            else
            {
                power = k + 1;
            }
        }
        
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '0' && power > k)
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(1)
