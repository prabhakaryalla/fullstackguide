# 3215. Count Triplets with Even XOR Set Bits II

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem
This is the larger-constraints version of "Count Triplets with Even XOR Set Bits I": given three integer arrays `a`, `b`, and `c`, count the number of triplets `(i, j, k)` (one index from each array) such that the bitwise XOR of `a[i]`, `b[j]`, and `c[k]` has an even number of set bits, now with much larger array sizes.

## Approach
The identical parity-counting technique from the smaller version scales fine here since it already runs in linear time overall. For each array, count how many elements have an even popcount versus an odd popcount. The XOR of three numbers has an even total popcount precisely when either all three operands have even popcount, or exactly two have odd popcount and one has even popcount. Sum the products of counts for these four valid combinations across the three arrays, using 64-bit arithmetic to avoid overflow given the larger array sizes.

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
