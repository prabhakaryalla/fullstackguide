# 3370. Smallest Number With All Set Bits

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem

Given a positive integer `n`, return the smallest number `x >= n` such that all bits of `x`'s binary representation are `1` (i.e., `x` is of the form $2^m - 1$).

### Example

Input: `n = 5`
Output: `7` — binary `111`, the smallest all-ones number `>= 5`.

## Approach

Find the smallest `m` such that $2^m - 1 \ge n$ by repeatedly doubling a running value starting at 1 until it is at least `n`, then subtract 1.

## C# Solution

```csharp
public class Solution 
{
    public int SmallestNumber(int n) 
    {
        int x = 1;
        while (x < n) x = x * 2 + 1;
        return x;
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
