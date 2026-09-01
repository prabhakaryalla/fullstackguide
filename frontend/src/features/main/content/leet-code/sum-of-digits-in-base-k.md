# 1837. Sum of Digits in Base K

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `n` (given in base 10) and a base `k`, return the sum of the digits of `n` when written in base `k`.

### Example

```
Input: n = 34, k = 6
Output: 9
Explanation: 34 in base 6 is 54, and 5 + 4 = 9.
```

## Approach

Repeatedly take `n % k` to peel off the lowest base-`k` digit and accumulate it into a sum, then divide `n` by `k`, until `n` becomes `0`.

## C# Solution

```csharp
public class Solution
{
    public int SumBase(int n, int k)
    {
        int sum = 0;

        while (n > 0)
        {
            sum += n % k;
            n /= k;
        }

        return sum;
    }
}
```

## Complexity

- **Time:** `O(log_k(n))`.
- **Space:** `O(1)`.
