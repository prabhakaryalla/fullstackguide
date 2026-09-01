# 3591. Check if Any Element Has Prime Frequency

**Difficulty:** Easy
**Category:** Array, Hash Table, Math

## Problem

Given an integer array `nums`, return `true` if the frequency of any element in the array is a prime number, otherwise return `false`.

### Example

Input: `nums = [1,2,3,4,3]`
Output: `true`
Explanation: The frequencies are `1:1, 2:1, 3:2, 4:1`. The frequency of `3` is `2`, which is prime, so the answer is `true`.

## Approach

Count the frequency of every value using a hash map, then check whether any of the resulting frequencies is a prime number using a simple primality test.

## C# Solution

```csharp
public class Solution 
{
    public bool HasPrimeFrequency(int[] nums) 
    {
        var freq = new Dictionary<int, int>();
        foreach (var n in nums) 
        {
            freq[n] = freq.GetValueOrDefault(n, 0) + 1;
        }

        foreach (var count in freq.Values) 
        {
            if (IsPrime(count)) 
            {
                return true;
            }
        }

        return false;
    }

    private bool IsPrime(int n) 
    {
        if (n < 2) 
        {
            return false;
        }
        for (int i = 2; (long)i * i <= n; i++) 
        {
            if (n % i == 0) 
            {
                return false;
            }
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n * sqrt(max(freq)))
- **Space:** O(n)
