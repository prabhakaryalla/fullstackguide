# 2533. Number of Good Binary Strings

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

You are given four integers `minLength`, `maxLength`, `oneGroup`, and `zeroGroup`.

A binary string is good if it satisfies the following conditions:
- The length of the string is in the range `[minLength, maxLength]`
- The number of consecutive `0`s is divisible by `zeroGroup`
- The number of consecutive `1`s is divisible by `oneGroup`

Return the number of good binary strings. Since the answer may be very large, return it modulo `10^9 + 7`.

### Example

```
Input: minLength = 2, maxLength = 3, oneGroup = 1, zeroGroup = 2
Output: 5
Explanation: Good strings: "00", "11", "001", "100", "111"

Input: minLength = 4, maxLength = 4, oneGroup = 4, zeroGroup = 4
Output: 2
Explanation: "0000" and "1111"
```

## Approach

Use dynamic programming where `dp[i][last]` represents the count of valid strings of length `i` ending with `last` (0 for ending in 0s, 1 for ending in 1s).

Transitions:
- From a state ending in 0s, we can append `zeroGroup` more 0s, or switch to `oneGroup` 1s
- From a state ending in 1s, we can append `oneGroup` more 1s, or switch to `zeroGroup` 0s

Base case: empty string

Sum all valid strings with lengths in `[minLength, maxLength]`.

## C# Solution

```csharp
public class Solution
{
    public int GoodBinaryStrings(int minLength, int maxLength, int oneGroup, int zeroGroup)
    {
        const int MOD = 1_000_000_007;
        long[] dp = new long[maxLength + 1];
        dp[0] = 1; // Empty string
        
        for (int i = 1; i <= maxLength; i++)
        {
            if (i >= oneGroup)
                dp[i] = (dp[i] + dp[i - oneGroup]) % MOD;
            
            if (i >= zeroGroup)
                dp[i] = (dp[i] + dp[i - zeroGroup]) % MOD;
        }
        
        long result = 0;
        for (int i = minLength; i <= maxLength; i++)
        {
            result = (result + dp[i]) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(maxLength)
- **Space:** O(maxLength)
