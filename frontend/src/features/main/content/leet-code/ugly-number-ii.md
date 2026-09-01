# 264. Ugly Number II

**Difficulty:** Medium
**Category:** Hash Table, Math, Dynamic Programming, Heap (Priority Queue)

## Problem

An ugly number is a positive integer whose prime factors are limited to `2`, `3`, and `5`. Given an integer `n`, return the `n`-th ugly number.

### Example

```
Input: n = 10
Output: 12
```

### Constraints

- `1 <= n <= 1690`

## Approach

Build the sequence of ugly numbers in increasing order using dynamic programming. Maintain three pointers `i2`, `i3`, `i5` into the sequence built so far, each representing the next ugly number to multiply by 2, 3, or 5 respectively. At each step, the next ugly number is the minimum of `ugly[i2]*2`, `ugly[i3]*3`, `ugly[i5]*5`; advance whichever pointer(s) produced that minimum.

## C# Solution

```csharp
public class Solution
{
    public int NthUglyNumber(int n)
    {
        var ugly = new int[n];
        ugly[0] = 1;

        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++)
        {
            int next2 = ugly[i2] * 2;
            int next3 = ugly[i3] * 3;
            int next5 = ugly[i5] * 5;

            int next = Math.Min(next2, Math.Min(next3, next5));
            ugly[i] = next;

            if (next == next2) i2++;
            if (next == next3) i3++;
            if (next == next5) i5++;
        }

        return ugly[n - 1];
    }
}
```

## Complexity

- **Time:** `O(n)` — one constant-time step per generated ugly number.
- **Space:** `O(n)` — for the sequence array.
