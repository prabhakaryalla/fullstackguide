# 2801. Count Stepping Numbers in Range

**Difficulty:** Hard
**Category:** Dynamic Programming, Math, String

## Problem

A stepping number is an integer where all adjacent digits have an absolute difference of exactly 1. For example, 321 is a stepping number (|3-2|=1, |2-1|=1), while 421 is not (|4-2|=2).

Given two positive integers low and high represented as strings, return the count of stepping numbers in the inclusive range [low, high].

Since the answer may be large, return it modulo 10^9 + 7.

### Example

```
Input: low = "1", high = "11"
Output: 10
Explanation: The stepping numbers in [1,11] are 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

## Approach

This is a digit DP problem. We need to count valid stepping numbers in a range, which can be solved by computing count(0, high) - count(0, low - 1).

The key insight is to build numbers digit by digit, ensuring each new digit differs from the previous by exactly 1. We use memoization to cache results based on current position, previous digit, whether we're still bounded by the limit, and whether we've started placing non-zero digits.

For each position, if we haven't started yet (leading zeros), we can either continue with zero or start with any digit 1-9. Once started, we can only place digits that differ by 1 from the previous digit.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    private Dictionary<string, long> memo;
    
    public int CountSteppingNumbers(string low, string high)
    {
        long countHigh = Count(high);
        long countLow = SubtractOne(low) == "" ? 0 : Count(SubtractOne(low));
        return (int)((countHigh - countLow + MOD) % MOD);
    }
    
    private long Count(string num)
    {
        memo = new Dictionary<string, long>();
        return Dp(0, -1, true, false, num);
    }
    
    private long Dp(int pos, int prev, bool tight, bool started, string num)
    {
        if (pos == num.Length)
            return started ? 1 : 0;
        
        string key = $"{pos},{prev},{tight},{started}";
        if (memo.ContainsKey(key))
            return memo[key];
        
        int limit = tight ? num[pos] - '0' : 9;
        long result = 0;
        
        for (int digit = 0; digit <= limit; digit++)
        {
            if (!started)
            {
                if (digit == 0)
                    result = (result + Dp(pos + 1, -1, tight && digit == limit, false, num)) % MOD;
                else
                    result = (result + Dp(pos + 1, digit, tight && digit == limit, true, num)) % MOD;
            }
            else
            {
                if (Math.Abs(digit - prev) == 1)
                    result = (result + Dp(pos + 1, digit, tight && digit == limit, true, num)) % MOD;
            }
        }
        
        memo[key] = result;
        return result;
    }
    
    private string SubtractOne(string num)
    {
        char[] arr = num.ToCharArray();
        int i = arr.Length - 1;
        
        while (i >= 0 && arr[i] == '0')
        {
            arr[i] = '9';
            i--;
        }
        
        if (i < 0)
            return "";
        
        arr[i]--;
        
        int start = 0;
        while (start < arr.Length - 1 && arr[start] == '0')
            start++;
        
        return new string(arr, start, arr.Length - start);
    }
}
```

## Complexity

- **Time:** O(n * 10 * 2 * 2 * 10) = O(n) where n is the length of the input strings, since we have at most n positions, 10 possible previous digits, and boolean flags
- **Space:** O(n * 10 * 2 * 2) = O(n) for memoization
