# 1359. Count All Valid Pickup and Delivery Options

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Combinatorics

## Problem

Given `n` orders, each with a pickup and delivery event where the pickup must occur before its corresponding delivery, return the number of valid ways to arrange all `2n` events, modulo `10^9 + 7`.

### Example

```
Input: n = 3
Output: 90
```

## Approach

Build the sequence order by order. Placing the `i`-th order into a sequence that already has `2(i-1)` events means choosing 1 of `2i - 1` open slots for its pickup, and the delivery must go somewhere after it among the remaining slots, giving `i` valid choices for the delivery position. Multiplying `i * (2i - 1)` across `i = 1..n` gives the total count.

## C# Solution

```csharp
public class Solution
{
    public int CountOrders(int n)
    {
        const long MOD = 1_000_000_007;
        long result = 1;

        for (int i = 1; i <= n; i++)
        {
            result = result * i % MOD;
            result = result * (2 * i - 1) % MOD;
        }

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
