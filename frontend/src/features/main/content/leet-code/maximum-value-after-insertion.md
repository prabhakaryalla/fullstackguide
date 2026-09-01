# 1881. Maximum Value after Insertion

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

Given a numeric string `n` (which may start with `-`) and a digit `x`, insert `x` into `n` at the position that maximizes the resulting numeric value. Return the resulting string.

### Example

```
Input: n = "-13", x = 2
Output: "-123"
```

## Approach

For a positive number, inserting `x` right before the first digit smaller than `x` produces the largest possible value (placing it as far left as beneficial); if no such digit exists, append `x` at the end. For a negative number, the goal is a value as close to zero as possible (i.e., maximizing a negative number means minimizing its magnitude), so instead insert `x` right before the first digit **larger** than `x` (or at the end if none), mirroring the same greedy idea with the comparison flipped.

## C# Solution

```csharp
public class Solution
{
    public string MaxValue(string n, int x)
    {
        bool negative = n[0] == '-';
        int start = negative ? 1 : 0;
        char digitChar = (char)('0' + x);

        for (int i = start; i < n.Length; i++)
        {
            if ((!negative && n[i] < digitChar) || (negative && n[i] > digitChar))
            {
                return n.Substring(0, i) + digitChar + n.Substring(i);
            }
        }

        return n + digitChar;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the resulting string.
