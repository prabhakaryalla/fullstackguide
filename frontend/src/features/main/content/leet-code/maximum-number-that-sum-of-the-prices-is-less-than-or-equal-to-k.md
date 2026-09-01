# 3007. Maximum Number That Sum of the Prices Is Less Than or Equal to K

**Difficulty:** Hard
**Category:** Binary Search, Bit Manipulation, Math

## Problem

The **price** of a positive integer is defined using its binary representation, where bit positions are 1-indexed from the least significant bit. Given an integer `x`, a bit at position `i` counts toward the price only if `i` is a multiple of `x`. The price of a number is the count of such set bits. Given integers `k` and `x`, return the greatest integer `num` such that the sum of prices of all integers from `1` to `num` is less than or equal to `k`.

### Example

```
Input: k = 9, x = 1
Output: 6
Explanation: Every bit position counts (since x = 1). The cumulative price of numbers 1..6 is 1+1+2+1+2+2 = 9,
while including 7 would push the price over 9.
```

## Approach

The total price of numbers `1..num` is monotonic in `num`, so binary search for the largest `num` whose cumulative price is `<= k`.

To compute the cumulative price for a candidate `num` efficiently (without iterating every number), use a digit-counting trick: for a bit position `i`, the number of integers in `[1, num]` with bit `i` set follows a repeating pattern of period `2^i` — a full block of `2^(i-1)` numbers have the bit set for every `2^i` consecutive numbers, plus a possible partial block at the end. Sum this contribution over every position `i` that is a multiple of `x`.

## C# Solution

```csharp
public class Solution {
    public long FindMaximumNumber(long k, int x) {
        long lo = 1, hi = (long)1e15;
        while (lo < hi) {
            long mid = lo + (hi - lo + 1) / 2;
            if (GetSumOfPrices(mid, x) <= k)
                lo = mid;
            else
                hi = mid - 1;
        }
        return lo;
    }

    // Returns the sum of prices of every integer from 1 to num (inclusive).
    private long GetSumOfPrices(long num, int x) {
        long sum = 0;
        long n = num + 1; // shift so we can reason about full/partial blocks cleanly.
        int bitWidth = 64 - System.Numerics.BitOperations.LeadingZeroCount((ulong)n);

        for (int i = bitWidth; i > 0; i--) {
            if (i % x != 0)
                continue;
            long groupSize = 1L << i;
            long halfGroupSize = 1L << (i - 1);
            sum += n / groupSize * halfGroupSize;
            sum += Math.Max(0L, (n % groupSize) - halfGroupSize);
        }
        return sum;
    }
}
```

## Complexity

- Time: O(log(1e15) * 50) — binary search over the answer range, each check doing O(bit width) work.
- Space: O(1).
