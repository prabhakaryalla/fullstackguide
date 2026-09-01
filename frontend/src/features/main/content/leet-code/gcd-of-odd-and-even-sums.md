# 3658. GCD of Odd and Even Sums

**Difficulty:** Easy
**Category:** Math

## Problem

Given a positive integer `n`, consider the sum of the first `n` odd numbers and the sum of the first `n` even numbers. Return the greatest common divisor of these two sums.

### Example

`n = 3`: odd sum = `1+3+5 = 9`, even sum = `2+4+6 = 12`, `gcd(9,12) = 3 = n`.

## Approach

The sum of the first `n` odd numbers is always `n^2`, and the sum of the first `n` even numbers is always `n(n+1)`. Since `n` and `n+1` are coprime, `gcd(n^2, n(n+1)) = n`, so the answer is simply `n`.

## C# Solution

```csharp
public class Solution 
{
    public int GcdOfOddEvenSums(int n) 
    {
        return n;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
