# 3133. Minimum Array End

**Difficulty:** Medium
**Category:** Bit Manipulation

## Problem

You must construct a strictly increasing array of `n` positive integers such that the bitwise AND of every element equals `x`. Return the minimum possible value of the array's last element.

## Approach

The AND constraint forces every element to keep `x`'s set bits fixed as `1`; only `x`'s `0` bit positions are "free" to vary between elements. To get the smallest possible last element, treat those free bit positions as forming an ordinary counter: fill them, from least significant to most significant among `x`'s zero-bits, with the binary representation of `n - 1` (since the array's first element can use the all-zero filling, effectively counting from `0` to `n - 1` across those free slots). This produces the minimum last element satisfying both constraints.

## C# Solution

```csharp
public class Solution {
    public long MinEnd(int n, int x) {
        long k = n - 1;
        long ans = x;
        int kBinaryIndex = 0;

        for (int i = 0; i < 63; i++) {
            if (((ans >> i) & 1) == 0) {
                if (((k >> kBinaryIndex) & 1) == 1)
                    ans |= 1L << i;
                kBinaryIndex++;
            }
        }

        return ans;
    }
}
```

## Complexity

- Time: O(63) = O(1) — a fixed number of bit positions.
- Space: O(1).
