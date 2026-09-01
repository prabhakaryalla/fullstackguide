# 2818. Apply Operations to Maximize Score

**Difficulty:** Hard
**Category:** Array, Math, Stack, Greedy, Sorting, Number Theory, Monotonic Stack

## Problem

You are given an array nums of n positive integers and an integer k.

Initially, you have a score of 1. You can apply the following operation at most k times:
- Choose an index i such that 0 <= i < n, and increase your score by nums[i] to the power of the count of its prime factors (with repetition).
- After applying the operation, remove nums[i] from the array.

Return the maximum possible score you can achieve after applying at most k operations.

### Example

```
Input: nums = [8,3,9,3,8], k = 2
Output: 81
Explanation: 
- Choose 9 (2 prime factors: 3*3), score *= 9^2 = 81
- Choose 8 (3 prime factors: 2*2*2), score *= 8^3 = 512
Maximum is 81 after first operation
```

## Approach

This is a greedy problem combined with efficient prime factorization and range queries.

First, compute the prime factor count for each number. A key insight is that we want to maximize the contribution, which is `nums[i]^primeCount[i]`. However, we need to consider the "contribution range" of each element - how many operations we can perform on it.

Using a monotonic stack, we can find for each element the range [left, right] where it is the maximum. The number of subarrays where nums[i] is maximum is `(i - left) * (right - i)`.

We then greedily select elements with highest contribution values, considering how many times we can use each element based on its range contribution.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int MaximumScore(List<int> nums, int k)
    {
        int n = nums.Count;
        int[] primeCount = new int[n];
        
        for (int i = 0; i < n; i++)
            primeCount[i] = CountPrimeFactors(nums[i]);
        
        int[] left = new int[n];
        int[] right = new int[n];
        Stack<int> stack = new Stack<int>();
        
        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && primeCount[stack.Peek()] < primeCount[i])
                stack.Pop();
            left[i] = stack.Count == 0 ? -1 : stack.Peek();
            stack.Push(i);
        }
        
        stack.Clear();
        
        for (int i = n - 1; i >= 0; i--)
        {
            while (stack.Count > 0 && primeCount[stack.Peek()] <= primeCount[i])
                stack.Pop();
            right[i] = stack.Count == 0 ? n : stack.Peek();
            stack.Push(i);
        }
        
        var pairs = new List<(long val, int count, long contrib)>();
        
        for (int i = 0; i < n; i++)
        {
            long count = (long)(i - left[i]) * (right[i] - i);
            pairs.Add((nums[i], primeCount[i], count));
        }
        
        pairs.Sort((a, b) => {
            if (a.val != b.val) return b.val.CompareTo(a.val);
            return b.count.CompareTo(a.count);
        });
        
        long result = 1;
        
        foreach (var (val, cnt, contrib) in pairs)
        {
            long times = Math.Min(k, contrib);
            result = (result * Power(val, cnt * times, MOD)) % MOD;
            k -= (int)times;
            if (k == 0) break;
        }
        
        return (int)result;
    }
    
    private int CountPrimeFactors(int n)
    {
        int count = 0;
        
        for (int i = 2; i * i <= n; i++)
        {
            while (n % i == 0)
            {
                count++;
                n /= i;
            }
        }
        
        if (n > 1)
            count++;
        
        return count;
    }
    
    private long Power(long x, long y, long mod)
    {
        long result = 1;
        x %= mod;
        
        while (y > 0)
        {
            if ((y & 1) == 1)
                result = (result * x) % mod;
            x = (x * x) % mod;
            y >>= 1;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n + n√max(nums)) where n is the length of nums, for sorting and prime factorization
- **Space:** O(n) for auxiliary arrays and stack
