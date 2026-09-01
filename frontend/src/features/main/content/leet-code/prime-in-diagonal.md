# 2614. Prime In Diagonal

**Difficulty:** Easy
**Category:** Array, Math, Matrix, Number Theory

## Problem

You are given a 0-indexed two-dimensional integer array `nums`. Return the largest prime number that lies on at least one of the diagonals of `nums`. In case no prime is present on any of the diagonals, return `0`.

Note that:
- An integer is prime if it is greater than `1` and has no positive integer divisors other than `1` and itself.
- An integer `val` is on one of the diagonals of `nums` if there exists an integer `i` for which `nums[i][i] = val` or an `i` for which `nums[i][nums.length - i - 1] = val`.

### Example

```
Input: nums = [[1,2,3],[5,6,7],[9,10,11]]
Output: 11
Explanation: The numbers on the diagonals are 1, 6, 11, and 3, 7. 11 is the largest prime.
```

## Approach

Traverse both diagonals (main and anti-diagonal) to collect all values. Check each value for primality and track the maximum prime found. A number is prime if it's greater than 1 and has no divisors other than 1 and itself.

## C# Solution

```csharp
public class Solution
{
    public int DiagonalPrime(int[][] nums)
    {
        int n = nums.Length;
        int maxPrime = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (IsPrime(nums[i][i]))
                maxPrime = Math.Max(maxPrime, nums[i][i]);
            
            if (IsPrime(nums[i][n - 1 - i]))
                maxPrime = Math.Max(maxPrime, nums[i][n - 1 - i]);
        }
        
        return maxPrime;
    }
    
    private bool IsPrime(int num)
    {
        if (num <= 1)
            return false;
        if (num <= 3)
            return true;
        if (num % 2 == 0 || num % 3 == 0)
            return false;
        
        for (int i = 5; i * i <= num; i += 6)
        {
            if (num % i == 0 || num % (i + 2) == 0)
                return false;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n × √m) — where n is the matrix dimension and m is the maximum diagonal value
- **Space:** O(1) — constant extra space
