# 1256. Encode Number

**Difficulty:** Medium
**Category:** Math, String, Bit Manipulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a non-negative integer `num`, encode it as a binary string using the compact bijective encoding where `0` maps to `""`, `1` maps to `"0"`, `2` maps to `"1"`, `3` maps to `"00"`, and so on — every non-negative integer has a unique representation without leading zero ambiguity.

### Example

```
Input: num = 23
Output: "1000"
```

## Approach

This bijective scheme corresponds exactly to writing `num + 1` in standard binary and dropping its leading `1` bit. Adding `1` shifts every value into the range where its binary form always starts with `1`, and stripping that fixed leading bit yields precisely the compact, leading-zero-free encoding the problem wants.

## C# Solution

```csharp
public class Solution
{
    public string Encode(int num)
    {
        return Convert.ToString(num + 1, 2).Substring(1);
    }
}
```

## Complexity

- **Time:** `O(log(num))`.
- **Space:** `O(log(num))` for the output string.
