# 2281. Sum of Total Strength of Wizards

**Difficulty:** Hard
**Category:** Array, Stack, Monotonic Stack, Prefix Sum

## Problem

You are given a 0-indexed integer array `strength`, where `strength[i]` denotes the strength of the `ith` wizard. For a contiguous group of wizards, the total strength is defined as the product of:

- The strength of the weakest wizard in the group
- The sum of all the wizards' strengths in the group

Return the sum of the total strengths of all contiguous groups of wizards. Since the answer may be large, return it modulo `10^9 + 7`.

### Example

```
Input: strength = [1,3,1,2]
Output: 44
Explanation: All groups and their strengths:
[1]: 1 * 1 = 1
[3]: 3 * 3 = 9
[1]: 1 * 1 = 1
[2]: 2 * 2 = 4
[1,3]: 1 * (1+3) = 4
[3,1]: 1 * (3+1) = 4
[1,2]: 1 * (1+2) = 3
[1,3,1]: 1 * (1+3+1) = 5
[3,1,2]: 1 * (3+1+2) = 6
[1,3,1,2]: 1 * (1+3+1+2) = 7
Total: 44
```

## Approach

For each element as the minimum, find the range where it is the minimum using a monotonic stack. Calculate the contribution of all subarrays where this element is the minimum. Use prefix sums to efficiently compute range sums. The key is to find for each element the left and right boundaries where it's the minimum, then calculate the sum contribution.

## C# Solution

```csharp
public class Solution
{
    public int TotalStrength(int[] strength)
    {
        const long MOD = 1000000007;
        int n = strength.Length;
        long[] prefix = new long[n + 1];
        long[] prefixOfPrefix = new long[n + 2];
        
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = (prefix[i] + strength[i]) % MOD;
        }
        
        for (int i = 0; i <= n; i++)
        {
            prefixOfPrefix[i + 1] = (prefixOfPrefix[i] + prefix[i]) % MOD;
        }
        
        var left = new int[n];
        var right = new int[n];
        var stack = new Stack<int>();
        
        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && strength[stack.Peek()] >= strength[i])
            {
                stack.Pop();
            }
            left[i] = stack.Count == 0 ? -1 : stack.Peek();
            stack.Push(i);
        }
        
        stack.Clear();
        
        for (int i = n - 1; i >= 0; i--)
        {
            while (stack.Count > 0 && strength[stack.Peek()] > strength[i])
            {
                stack.Pop();
            }
            right[i] = stack.Count == 0 ? n : stack.Peek();
            stack.Push(i);
        }
        
        long result = 0;
        
        for (int i = 0; i < n; i++)
        {
            int l = left[i] + 1;
            int r = right[i] - 1;
            
            long leftSum = ((prefixOfPrefix[i + 1] - prefixOfPrefix[l] + MOD) % MOD - 
                           (l * (prefix[i + 1] - prefix[l] + MOD) % MOD + MOD) % MOD + MOD) % MOD;
            long rightSum = ((r - i + 1) * (prefix[i + 1] - prefix[l] + MOD) % MOD + MOD -
                            (prefixOfPrefix[r + 2] - prefixOfPrefix[i + 1] + MOD) % MOD + MOD) % MOD;
            
            result = (result + strength[i] * leftSum % MOD + strength[i] * rightSum % MOD) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n) using monotonic stack
- **Space:** O(n) for arrays and stack
