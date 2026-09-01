# 201. Bitwise AND of Numbers Range

**Difficulty:** Medium
**Category:** Bit Manipulation

## Problem

Given two integers `left` and `right` that represent the range `[left, right]`, return the bitwise AND of all numbers in this range, inclusive.

### Example

```
left = 5, right = 7 -> 4   (5 & 6 & 7 = 4)
left = 0, right = 0 -> 0
```

## Approach

ANDing a long run of consecutive numbers together clears every bit position where the numbers disagree. The result is simply the common binary prefix shared by `left` and `right` (with the differing trailing bits zeroed out) — found by right-shifting both numbers together until they're equal, then shifting the result back left by the same amount.

## C# Solution

```csharp
public class Solution
{
    public int RangeBitwiseAnd(int left, int right)
    {
        int shift = 0;

        while (left != right)
        {
            left >>= 1;
            right >>= 1;
            shift++;
        }

        return left << shift;
    }
}
```

## Complexity

- **Time:** `O(log(right))` — bounded by the number of bits.
- **Space:** `O(1)`.
