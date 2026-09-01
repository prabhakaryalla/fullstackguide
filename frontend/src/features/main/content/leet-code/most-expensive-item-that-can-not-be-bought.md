# 2979. Most Expensive Item That Can Not Be Bought

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Number Theory

## Problem

You are given two distinct prime numbers `primeOne` and `primeTwo`. Return the largest integer that cannot be expressed as a sum of multiples of `primeOne` and `primeTwo`.

This is known as the Frobenius number for two coprime integers.

### Example

```
Input: primeOne = 2, primeTwo = 5
Output: 3
Explanation: 3 cannot be expressed as 2*a + 5*b for non-negative a, b.

Input: primeOne = 3, primeTwo = 7
Output: 11
```

## Approach

For two coprime integers `a` and `b`, the Frobenius number is `a * b - a - b`. Since the inputs are always distinct primes, they are guaranteed to be coprime.

## C# Solution

```csharp
public class Solution
{
    public int MostExpensiveItem(int primeOne, int primeTwo)
    {
        return primeOne * primeTwo - primeOne - primeTwo;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
