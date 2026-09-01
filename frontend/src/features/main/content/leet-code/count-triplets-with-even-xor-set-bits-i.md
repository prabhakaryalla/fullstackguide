# 3199. Count Triplets with Even XOR Set Bits I

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem
Given three integer arrays `a`, `b`, and `c`, count the number of triplets `(i, j, k)` (one index from each array) such that the bitwise XOR of `a[i]`, `b[j]`, and `c[k]` has an even number of set bits (an even popcount).

## Approach
For each array, precompute how many of its elements have an even popcount versus an odd popcount. The XOR of three numbers has an even total popcount (mod 2, since XOR's popcount parity is the sum of each number's popcount parity, mod 2) precisely when the number of odd-popcount operands among the three is even: either all three have even popcount, or exactly two have odd popcount and one even. Sum the products of counts for each of these four valid parity combinations across the three arrays.

## C# Solution
```csharp
public class Solution {
    public long TripletCount(int[] a, int[] b, int[] c) {
        (long evenA, long oddA) = GetEvenOddBitCount(a);
        (long evenB, long oddB) = GetEvenOddBitCount(b);
        (long evenC, long oddC) = GetEvenOddBitCount(c);
        return evenA * oddB * oddC + oddA * evenB * oddC + oddA * oddB * evenC +
               evenA * evenB * evenC;
    }

    private (long, long) GetEvenOddBitCount(int[] nums) {
        long even = 0;
        long odd = 0;
        foreach (int num in nums)
            if (System.Numerics.BitOperations.PopCount((uint)num) % 2 == 0)
                even++;
            else
                odd++;
        return (even, odd);
    }
}
```

## Complexity
- Time: O(na + nb + nc)
- Space: O(1)
