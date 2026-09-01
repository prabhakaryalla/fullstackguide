# 2741. Special Permutations

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Bit Manipulation, Bitmask

## Problem

You are given an array `nums` of n distinct positive integers. A permutation of `nums` is called special if for every index `i` from `0` to `n - 2`, either:
- `nums[i] % nums[i+1] == 0`, or
- `nums[i+1] % nums[i] == 0`

Return the total number of special permutations. Since the answer may be large, return it modulo 10^9 + 7.

### Example

```
Input: nums = [2,3,6]
Output: 2
Explanation: Special permutations are [2,6,3] and [3,6,2].

Input: nums = [1,4,3]
Output: 2
Explanation: Special permutations are [1,3,4] and [1,4,3] (1 divides everything).
```

## Approach

Use dynamic programming with bitmask to track which elements have been used.

State: `dp[mask][last]` = number of ways to arrange elements in the bitmask ending with element at index `last`.

Transition: For each state, try adding any unused element that is compatible (divisible relationship) with the last element.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1000000007;
    private Dictionary<(int, int), long> memo;
    private int[] nums;
    private int n;
    
    public int SpecialPerm(int[] nums) 
    {
        this.nums = nums;
        n = nums.Length;
        memo = new Dictionary<(int, int), long>();
        
        long result = 0;
        int fullMask = (1 << n) - 1;
        
        for (int i = 0; i < n; i++)
        {
            result = (result + Dfs(1 << i, i)) % MOD;
        }
        
        return (int)result;
    }
    
    private long Dfs(int mask, int last)
    {
        if (mask == (1 << n) - 1)
        {
            return 1;
        }
        
        var key = (mask, last);
        if (memo.ContainsKey(key))
        {
            return memo[key];
        }
        
        long count = 0;
        
        for (int i = 0; i < n; i++)
        {
            if ((mask & (1 << i)) == 0)
            {
                if (nums[i] % nums[last] == 0 || nums[last] % nums[i] == 0)
                {
                    count = (count + Dfs(mask | (1 << i), i)) % MOD;
                }
            }
        }
        
        memo[key] = count;
        return count;
    }
}
```

## Complexity

- **Time:** O(n² * 2^n) for all states and transitions
- **Space:** O(n * 2^n) for memoization
