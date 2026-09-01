# 2413. Smallest Even Multiple

**Difficulty:** Easy
**Category:** Math, Number Theory

## Problem

Given a positive integer `n`, return the smallest positive integer that is a multiple of both 2 and `n`.

### Example

```
Input: n = 5
Output: 10
Explanation: The smallest multiple of both 5 and 2 is 10.
```

## Approach

If `n` is even, it's already a multiple of 2, so return `n`. If `n` is odd, the smallest even multiple is `2 * n`.

## C# Solution

```csharp
public class Solution
{
    public int SmallestEvenMultiple(int n)
    {
        return n % 2 == 0 ? n : 2 * n;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
