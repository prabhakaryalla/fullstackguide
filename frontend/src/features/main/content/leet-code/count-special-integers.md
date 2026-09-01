# 2376. Count Special Integers

**Difficulty:** Hard
**Category:** Dynamic Programming, Math

## Problem

We call a positive integer special if all of its digits are distinct.

Given a positive integer `n`, return the number of special integers that belong to the interval `[1, n]`.

### Example

```
Input: n = 20
Output: 19
Explanation: All numbers from 1 to 20 except 11 have distinct digits
```

## Approach

Use digit DP. Track the current position, the bitmask of used digits, whether we're still bounded by n, and whether we've started placing non-zero digits. Count valid numbers recursively.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<(int, int, bool, bool), int> memo;
    private string numStr;
    
    public int CountSpecialNumbers(int n)
    {
        numStr = n.ToString();
        memo = new Dictionary<(int, int, bool, bool), int>();
        return DP(0, 0, true, false);
    }
    
    private int DP(int pos, int mask, bool tight, bool started)
    {
        if (pos == numStr.Length)
        {
            return started ? 1 : 0;
        }
        
        var key = (pos, mask, tight, started);
        if (memo.ContainsKey(key))
            return memo[key];
        
        int limit = tight ? (numStr[pos] - '0') : 9;
        int result = 0;
        
        for (int digit = 0; digit <= limit; digit++)
        {
            if (started && ((mask >> digit) & 1) == 1)
                continue;
            
            if (!started && digit == 0)
            {
                result += DP(pos + 1, mask, tight && (digit == limit), false);
            }
            else
            {
                result += DP(pos + 1, mask | (1 << digit), tight && (digit == limit), true);
            }
        }
        
        memo[key] = result;
        return result;
    }
}
```

## Complexity

- **Time:** O(d * 2^10 * 2 * 2) where d is number of digits
- **Space:** O(d * 2^10)
