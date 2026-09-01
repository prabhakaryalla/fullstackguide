# 1492. The kth Factor of n

**Difficulty:** Medium
**Category:** Math, Number Theory

## Problem

Given two integers `n` and `k`, return the `k`-th smallest factor of `n`, or `-1` if `n` has fewer than `k` factors.

### Example

```
Input: n = 12, k = 3
Output: 3
```

## Approach

Scan integers from `1` to `n` in increasing order, testing divisibility. Every divisor found is, by construction, encountered in increasing order, so decrementing `k` on each divisor found and returning as soon as `k` reaches `0` yields the `k`-th smallest factor directly.

## C# Solution

```csharp
public class Solution
{
    public int KthFactor(int n, int k)
    {
        for (int i = 1; i <= n; i++)
        {
            if (n % i == 0)
            {
                k--;
                if (k == 0) return i;
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
