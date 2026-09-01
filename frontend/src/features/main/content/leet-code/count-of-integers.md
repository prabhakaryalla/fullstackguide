# 2719. Count of Integers

**Difficulty:** Hard
**Category:** Math, String, Dynamic Programming

## Problem

You are given two numeric strings `num1` and `num2`, and two integers `min_sum` and `max_sum`. We call an integer x good if:
- `num1 <= x <= num2`
- `min_sum <= digit_sum(x) <= max_sum` where `digit_sum(x)` is the sum of digits of x

Return the number of good integers. Since the answer may be large, return it modulo 10^9 + 7.

### Example

```
Input: num1 = "1", num2 = "12", min_sum = 1, max_sum = 8
Output: 11
Explanation: Numbers 1-9 and 10,11 all have digit sums in range [1,8].

Input: num1 = "1", num2 = "5", min_sum = 1, max_sum = 5
Output: 5
Explanation: All numbers from 1 to 5 have digit sums in range [1,5].
```

## Approach

Use digit DP (dynamic programming on digits). We count numbers from 0 to num2 with valid digit sums, then subtract numbers from 0 to num1-1 with valid digit sums.

For digit DP, maintain state:
- Current position in the number
- Sum of digits so far
- Whether we're still bounded by the upper limit (tight constraint)

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1000000007;
    private Dictionary<(int, int, bool), long> memo;
    private string num;
    private int minSum;
    private int maxSum;
    
    public int Count(string num1, string num2, int min_sum, int max_sum) 
    {
        minSum = min_sum;
        maxSum = max_sum;
        
        long count2 = CountInRange(num2);
        long count1 = CountInRange(Decrement(num1));
        
        return (int)((count2 - count1 + MOD) % MOD);
    }
    
    private long CountInRange(string n)
    {
        num = n;
        memo = new Dictionary<(int, int, bool), long>();
        return Dp(0, 0, true);
    }
    
    private long Dp(int pos, int sum, bool tight)
    {
        if (sum > maxSum) return 0;
        if (pos == num.Length)
        {
            return (sum >= minSum && sum <= maxSum) ? 1 : 0;
        }
        
        var key = (pos, sum, tight);
        if (memo.ContainsKey(key)) return memo[key];
        
        int limit = tight ? (num[pos] - '0') : 9;
        long result = 0;
        
        for (int digit = 0; digit <= limit; digit++)
        {
            result = (result + Dp(pos + 1, sum + digit, tight && (digit == limit))) % MOD;
        }
        
        memo[key] = result;
        return result;
    }
    
    private string Decrement(string s)
    {
        char[] chars = s.ToCharArray();
        int i = chars.Length - 1;
        
        while (i >= 0 && chars[i] == '0')
        {
            chars[i] = '9';
            i--;
        }
        
        if (i >= 0)
        {
            chars[i]--;
        }
        
        string result = new string(chars);
        return result.TrimStart('0') == "" ? "0" : result.TrimStart('0');
    }
}
```

## Complexity

- **Time:** O(n * maxSum * 2) where n is the length of num2
- **Space:** O(n * maxSum) for memoization
