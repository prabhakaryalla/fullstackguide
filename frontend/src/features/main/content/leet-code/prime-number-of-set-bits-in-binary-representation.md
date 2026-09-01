# 762. Prime Number of Set Bits in Binary Representation

**Difficulty:** Easy
**Category:** Math, Bit Manipulation

## Problem

Given two integers `left` and `right`, return the count of numbers in the inclusive range `[left, right]` whose binary representation has a prime number of set bits (`1`s).

### Example

```
Input: left = 6, right = 10
Output: 4
```

## Approach

Since `right` is bounded well within 32-bit range, the number of set bits for any number in range is small (at most about 20). Precompute the small set of prime numbers that could represent a bit count, then for every number in `[left, right]`, count its set bits (using a popcount) and check membership in the prime set.

## C# Solution

```csharp
public class Solution
{
    public int CountPrimeSetBits(int left, int right)
    {
        var primes = new HashSet<int> { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31 };
        int count = 0;

        for (int num = left; num <= right; num++)
        {
            int bits = System.Numerics.BitOperations.PopCount((uint)num);
            if (primes.Contains(bits)) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O((right - left) * log(right))`.
- **Space:** `O(1)` extra.
