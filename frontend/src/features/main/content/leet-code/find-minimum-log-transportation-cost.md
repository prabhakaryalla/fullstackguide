# 3560. Find Minimum Log Transportation Cost

**Difficulty:** Easy
**Category:** Math

## Problem
You are given integers `n`, `m`, and `k`. There are two logs of lengths `n` and `m` units, which need to be transported using three trucks where each truck can carry a log of length at most `k` units.

You may cut a log into two smaller logs; cutting a log of length `x` into logs of length `len1` and `len2` (with `len1 + len2 = x`) costs `len1 * len2`. Return the minimum total cost to distribute the two logs onto the three trucks. If no cuts are needed, the cost is `0`.

**Example 1:** `n = 6, m = 5, k = 5` → Output `5` (cut 6 into 1 and 5; now the three logs 1, 5, 5 each fit one truck)

**Example 2:** `n = 4, m = 4, k = 6` → Output `0` (both logs already fit)

**Constraints:**
- `2 <= k <= 10^5`
- `1 <= n, m <= 2 * k`
- The input is generated such that it is always possible to transport the logs.

## Approach
With only 3 trucks for 2 logs, at most one of the two logs can need cutting (the problem guarantees the input is always transportable, which rules out the case where both `n > k` and `m > k`, since that would require 4 truck slots).

- If both `n <= k` and `m <= k`, no cut is needed: cost `0`.
- Otherwise, exactly one log (say the one with length `L > k`) must be split into two pieces that each fit in a truck (`<= k`). Since `L <= 2k`, splitting as `(k, L - k)` satisfies both pieces `<= k` (because `L - k <= k`). To minimize the cost `len1 * len2` for a fixed sum `L`, the product is minimized by making the two parts as *unequal* as possible — and the most unequal split that still keeps both parts within the truck capacity `k` is exactly `(k, L - k)`. Hence the minimum cost is `k * (L - k)`.

## C# Solution

```csharp
public class Solution {
    public long MinCuttingCost(long n, long m, long k) {
        long cost = 0;
        if (n > k) cost += k * (n - k);
        if (m > k) cost += k * (m - k);
        return cost;
    }
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
