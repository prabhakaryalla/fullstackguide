# 3094. Guess the Number Using Bitwise Questions II

**Difficulty:** Medium
**Category:** Bit Manipulation, Interactive

## Problem

This is an **interactive** problem. There is a hidden non-negative integer (fitting in 31 bits) that you must determine. You may call the provided API `CommonBits(num)`, which returns how many bit positions `num` and the hidden number **agree** on (both `0` or both `1`). Return the hidden number.

## Approach

First call `CommonBits(0)` to get a baseline: since `0` has every bit clear, this baseline equals the number of positions where the hidden number has a `0` bit. Then, for each bit position `i`, probe with `1 << i` (a number with only bit `i` set). Compared to the baseline, this probe flips agreement status only at position `i`: if the hidden number's bit `i` is `1`, agreement at that position improves by one (previously disagreeing with `0`, now agreeing with `1`), so the returned count goes **up** by one relative to baseline; if the hidden bit is `0`, the count goes **down** by one. So: bit `i` is set in the answer exactly when `CommonBits(1 << i) > CommonBits(0)`.

## C# Solution

```csharp
/**
 * The API interface is defined for you.
 * public abstract class GuessGame {
 *     public abstract int CommonBits(int num);
 * }
 */
public class Solution : GuessGame {
    public int FindNumber() {
        const int maxBit = 30;
        int baseline = CommonBits(0);
        int ans = 0;

        for (int i = 0; i <= maxBit; i++)
            if (CommonBits(1 << i) > baseline)
                ans |= 1 << i;

        return ans;
    }
}
```

## Complexity

- Time: O(30) — a constant number of API calls.
- Space: O(1).
