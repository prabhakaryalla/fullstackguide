# 670. Maximum Swap

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

Given a non-negative integer `num`, swap at most two digits (once) to get the maximum possible resulting number, and return that number.

### Example

```
Input: num = 2736
Output: 7236
```

### Constraints

- `0 <= num <= 10^8`

## Approach

Record the last occurrence index of every digit `0`-`9`. Scan the number's digits left to right, and at each position, look for the largest digit greater than the current one that appears later in the number (using the recorded last-occurrence indices) — swapping the current position with that later, larger digit's position produces the maximum possible increase, and doing this at the leftmost possible position maximizes the overall value.

## C# Solution

```csharp
public class Solution
{
    public int MaximumSwap(int num)
    {
        var digits = num.ToString().ToCharArray();
        var lastIndex = new int[10];

        for (int i = 0; i < digits.Length; i++)
            lastIndex[digits[i] - '0'] = i;

        for (int i = 0; i < digits.Length; i++)
        {
            for (int d = 9; d > digits[i] - '0'; d--)
            {
                if (lastIndex[d] > i)
                {
                    (digits[i], digits[lastIndex[d]]) = (digits[lastIndex[d]], digits[i]);
                    return int.Parse(new string(digits));
                }
            }
        }

        return num;
    }
}
```

## Complexity

- **Time:** `O(d)`, where `d` is the number of digits.
- **Space:** `O(d)` for the digit array.
