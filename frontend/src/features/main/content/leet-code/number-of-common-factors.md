# 2427. Number of Common Factors

**Difficulty:** Easy
**Category:** Math, Number Theory

## Problem

Given two positive integers `a` and `b`, return the number of common factors of `a` and `b`.

An integer `x` is a common factor of `a` and `b` if `x` divides both `a` and `b`.

### Example

```
Input: a = 12, b = 6
Output: 4
Explanation: The common factors of 12 and 6 are 1, 2, 3, and 6.
```

## Approach

Find the GCD of `a` and `b`. Then count all divisors of the GCD, since the common factors of `a` and `b` are exactly the divisors of their GCD.

## C# Solution

```csharp
public class Solution
{
    public int CommonFactors(int a, int b)
    {
        int gcd = GCD(a, b);
        int count = 0;
        
        for (int i = 1; i * i <= gcd; i++)
        {
            if (gcd % i == 0)
            {
                count++; // i is a factor
                if (i != gcd / i)
                {
                    count++; // gcd/i is also a factor
                }
            }
        }
        
        return count;
    }
    
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(√g + log(min(a,b))) where g is the GCD
- **Space:** O(1)
