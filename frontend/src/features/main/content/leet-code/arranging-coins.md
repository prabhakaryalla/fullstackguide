# 441. Arranging Coins

**Difficulty:** Easy
**Category:** Math, Binary Search

## Problem

You have `n` coins to form a staircase, where the `k`th row must have exactly `k` coins. Given `n`, return the number of complete rows of the staircase that can be formed.

### Example

```
Input: n = 8
Output: 3
Explanation: Rows 1, 2, and 3 use 1+2+3=6 coins; row 4 needs 4 more but only 2 remain.
```

### Constraints

- `1 <= n <= 2^31 - 1`

## Approach

The number of coins used to build `k` complete rows is `k * (k + 1) / 2`. Binary search for the largest `k` such that this triangular number does not exceed `n`.

## C# Solution

```csharp
public class Solution
{
    public int ArrangeCoins(int n)
    {
        long left = 0, right = n;

        while (left <= right)
        {
            long mid = left + (right - left) / 2;
            long coinsUsed = mid * (mid + 1) / 2;

            if (coinsUsed == n) return (int)mid;
            if (coinsUsed < n) left = mid + 1;
            else right = mid - 1;
        }

        return (int)right;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
