# 793. Preimage Size of Factorial Zeroes Function

**Difficulty:** Hard
**Category:** Math, Binary Search

## Problem

Given the function `f(x)` that returns the number of trailing zeroes in `x!`, and an integer `k`, return how many non-negative integers `x` satisfy `f(x) == k`.

### Example

```
Input: k = 0
Output: 5
```

## Approach

`f(x)` is non-decreasing in `x` and increases roughly every 5 numbers. Binary search for the smallest `x` such that `f(x) >= k`. If `f(x) == k` at that point, then because the number of trailing zeroes only ever "jumps" (never plateaus for more than 5 consecutive values before increasing), exactly 5 consecutive integers achieve that same value `k` — so the answer is `5`. If `f(x) > k` (meaning `k` is skipped entirely), the answer is `0`.

## C# Solution

```csharp
public class Solution
{
    public int PreimageSizeFZF(int k)
    {
        long lo = 0, hi = 5L * (k + 1);

        while (lo < hi)
        {
            long mid = lo + (hi - lo) / 2;

            if (TrailingZeroes(mid) < k)
                lo = mid + 1;
            else
                hi = mid;
        }

        return TrailingZeroes(lo) == k ? 5 : 0;
    }

    private long TrailingZeroes(long n)
    {
        long count = 0;
        for (long p = 5; p <= n; p *= 5)
            count += n / p;
        return count;
    }
}
```

## Complexity

- **Time:** `O(log(k) * log(k))`.
- **Space:** `O(1)` extra.
