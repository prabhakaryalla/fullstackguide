# 504. Base 7

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `num`, return a string representing its base-7 representation.

### Example

```
Input: num = 100
Output: "202"
```

### Constraints

- `-10^7 <= num <= 10^7`

## Approach

Handle the sign separately by working with the absolute value, then repeatedly divide by 7, prepending each remainder digit, until the value reaches zero.

## C# Solution

```csharp
public class Solution
{
    public string ConvertToBase7(int num)
    {
        if (num == 0) return "0";

        bool negative = num < 0;
        num = Math.Abs(num);

        var sb = new StringBuilder();
        while (num > 0)
        {
            sb.Insert(0, num % 7);
            num /= 7;
        }

        return negative ? "-" + sb : sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(log₇ n)`.
- **Space:** `O(log₇ n)` for the result string.
