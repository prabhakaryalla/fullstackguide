# 2827. Number of Beautiful Integers in the Range

**Difficulty:** Hard
**Category:** Math, Dynamic Programming

## Problem

You are given positive integers low, high, and k.

A number is beautiful if the number of even digits in it equals the number of odd digits AND the number is divisible by k.

Return the number of beautiful integers in the range [low, high].

### Example

```
Input: low = 10, high = 20, k = 3
Output: 2
Explanation: 12 and 18 are beautiful (1 even, 1 odd digit each, both divisible by 3)
```

## Approach

This is a digit DP problem. We need to count numbers in a range with specific properties.

We use digit DP with states:
- Current position in the number
- Whether we're still bounded by the limit
- Whether we've started placing non-zero digits
- Current count of even digits
- Current count of odd digits
- Current remainder when divided by k

For a number to be beautiful:
- Count of even digits must equal count of odd digits
- The number must be divisible by k (remainder = 0)

We build numbers digit by digit and track these states using memoization.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<string, int> memo;
    private int k;
    
    public int NumberOfBeautifulIntegers(int low, int high, int k)
    {
        this.k = k;
        return Count(high.ToString()) - Count((low - 1).ToString());
    }
    
    private int Count(string num)
    {
        memo = new Dictionary<string, int>();
        return Dp(0, 0, 0, 0, true, false, num);
    }
    
    private int Dp(int pos, int evenCount, int oddCount, int remainder, bool tight, bool started, string num)
    {
        if (pos == num.Length)
        {
            if (!started)
                return 0;
            return (evenCount == oddCount && remainder == 0) ? 1 : 0;
        }
        
        string key = $"{pos},{evenCount},{oddCount},{remainder},{tight},{started}";
        if (memo.ContainsKey(key))
            return memo[key];
        
        int limit = tight ? num[pos] - '0' : 9;
        int result = 0;
        
        for (int digit = 0; digit <= limit; digit++)
        {
            if (!started && digit == 0)
            {
                result += Dp(pos + 1, evenCount, oddCount, remainder, tight && digit == limit, false, num);
            }
            else
            {
                int newEven = evenCount + (digit % 2 == 0 ? 1 : 0);
                int newOdd = oddCount + (digit % 2 == 1 ? 1 : 0);
                int newRem = (remainder * 10 + digit) % k;
                result += Dp(pos + 1, newEven, newOdd, newRem, tight && digit == limit, true, num);
            }
        }
        
        memo[key] = result;
        return result;
    }
}
```

## Complexity

- **Time:** O(n * n * n * k * 2 * 2 * 10) = O(n³ * k) where n is the number of digits
- **Space:** O(n * n * n * k * 2 * 2) = O(n³ * k) for memoization
