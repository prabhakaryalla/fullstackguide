# 3064. Guess the Number Using Bitwise Questions I

**Difficulty:** Medium
**Category:** Bit Manipulation, Interactive

## Problem

This is an **interactive** problem. There is a hidden non-negative integer `number` that you must determine. You may call the provided API `CommonSetBits(num)`, which returns the count of bit positions where `num` and the hidden `number` both have a set bit (i.e., the population count of `num & number`). The hidden number fits within 31 bits. Return the hidden `number` using at most 30 calls to the API.

## Approach

Test each bit position `i` from `0` to `30` individually by calling `CommonSetBits(1 << i)`. Since `1 << i` has exactly one set bit, the result can only be `0` or `1`: a result of `1` means bit `i` is set in the hidden number, `0` means it isn't. Accumulate the discovered bits into the answer.

## C# Solution

```csharp
/**
 * The API interface is defined for you.
 * public abstract class GuessGame {
 *     public abstract int CommonSetBits(int num);
 * }
 */
public class Solution : GuessGame {
    public int FindNumber() {
        const int maxBit = 30;
        int ans = 0;

        for (int i = 0; i <= maxBit; i++)
            if (CommonSetBits(1 << i) == 1)
                ans |= 1 << i;

        return ans;
    }
}
```

## Complexity

- Time: O(30) — a constant number of API calls, one per bit position.
- Space: O(1).
