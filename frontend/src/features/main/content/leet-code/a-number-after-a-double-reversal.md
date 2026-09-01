# 2119. A Number After a Double Reversal

**Difficulty:** Easy
**Category:** Math

## Problem

Reversing an integer means reversing its digits. A double reversal means reversing twice. Given an integer `num`, return `true` if it equals its double reversal, `false` otherwise. Note that reversed numbers with leading zeros drop those zeros.

### Example

```
Input: num = 526
Output: true
Explanation: Reverse to 625, reverse again to 526.

Input: num = 1800
Output: false  
Explanation: Reverse to 81 (leading zeros dropped), reverse to 18.
```

## Approach

A number equals its double reversal if and only if it has no trailing zeros (or is 0 itself). Trailing zeros are lost on the first reversal as they become leading zeros.

## C# Solution

```csharp
public class Solution
{
    public bool IsSameAfterReversals(int num)
    {
        return num == 0 || num % 10 != 0;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
