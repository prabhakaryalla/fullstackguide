# 829. Consecutive Numbers Sum

**Difficulty:** Hard
**Category:** Math, Enumeration

## Problem

Given an integer `n`, return the number of ways it can be written as the sum of one or more consecutive positive integers.

### Example

```
Input: n = 5
Output: 2
```

## Approach

For a run of `k` consecutive integers starting at some positive integer `a`, the sum is `k*a + k*(k-1)/2 = n`, so `a = (n - k*(k-1)/2) / k`. For each candidate length `k` (starting from `1`, while `k*(k-1)/2 < n` so the remaining amount is still positive), check whether the remainder `n - k*(k-1)/2` divides evenly by `k` — if so, a valid starting value `a` exists, giving one valid decomposition.

## C# Solution

```csharp
public class Solution
{
    public int ConsecutiveNumbersSum(int n)
    {
        int count = 0;

        for (int k = 1; k * (k - 1) / 2 < n; k++)
        {
            int remainder = n - k * (k - 1) / 2;

            if (remainder % k == 0)
                count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(sqrt(n))`.
- **Space:** `O(1)` extra.
