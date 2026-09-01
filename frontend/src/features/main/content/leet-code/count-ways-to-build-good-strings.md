# 2466. Count Ways To Build Good Strings

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

Given integers `low`, `high`, `zero`, and `one`, you can build strings by:
- Appending `zero` consecutive '0's
- Appending `one` consecutive '1's

Return the number of different strings of length between `low` and `high` (inclusive) that can be constructed, modulo 10^9 + 7.

### Example

```
Input: low = 3, high = 3, zero = 1, one = 1
Output: 8
Explanation: Valid strings of length 3: "000", "001", "010", "011", "100", "101", "110", "111"
```

## Approach

Use dynamic programming where `dp[i]` represents the number of ways to build a string of length `i`. 

Base case: `dp[0] = 1` (empty string).

Transition: `dp[i] = dp[i - zero] + dp[i - one]` (if those indices are valid).

Sum `dp[low]` through `dp[high]` for the final answer.

## C# Solution

```csharp
public class Solution
{
    public int CountGoodStrings(int low, int high, int zero, int one)
    {
        const int Mod = 1_000_000_007;
        int[] dp = new int[high + 1];
        dp[0] = 1;
        
        for (int i = 1; i <= high; i++)
        {
            if (i >= zero)
            {
                dp[i] = (dp[i] + dp[i - zero]) % Mod;
            }
            
            if (i >= one)
            {
                dp[i] = (dp[i] + dp[i - one]) % Mod;
            }
        }
        
        int result = 0;
        for (int i = low; i <= high; i++)
        {
            result = (result + dp[i]) % Mod;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(high) where high is the upper bound
- **Space:** O(high) for the dp array
