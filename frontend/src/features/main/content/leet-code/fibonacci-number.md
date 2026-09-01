# 509. Fibonacci Number

**Difficulty:** Easy
**Category:** Math, Dynamic Programming, Recursion, Memoization

## Problem

The Fibonacci numbers form a sequence where `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n - 1) + F(n - 2)` for `n > 1`. Given `n`, return `F(n)`.

### Example

```
Input: n = 4
Output: 3
```

### Constraints

- `0 <= n <= 30`

## Approach

Compute the sequence iteratively using two rolling variables for the previous two values, avoiding the exponential blowup of naive recursion and the extra memory of storing the whole sequence.

## C# Solution

```csharp
public class Solution
{
    public int Fib(int n)
    {
        if (n < 2) return n;

        int prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++)
        {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
