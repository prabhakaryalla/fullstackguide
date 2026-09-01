# 43. Multiply Strings

**Difficulty:** Medium
**Category:** Math, String, Simulation

## Problem

Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string. You must not use any built-in big-integer library or convert the inputs directly to integers.

### Example 1

```
Input: num1 = "2", num2 = "3"
Output: "6"
```

### Example 2

```
Input: num1 = "123", num2 = "456"
Output: "56088"
```

### Constraints

- `1 <= num1.length, num2.length <= 200`
- `num1` and `num2` consist of digits only.
- Both `num1` and `num2` do not contain any leading zero, except the number 0 itself.

## Approach

Simulate long multiplication (as taught on paper): multiplying a digit at position `i` in `num1` with a digit at position `j` in `num2` contributes to positions `i + j` and `i + j + 1` in the result array. Accumulate all partial products into an `int[]` of size `num1.Length + num2.Length`, handle carries once at the end, then convert to a string (trimming leading zeros).

## C# Solution

```csharp
public class Solution
{
    public string Multiply(string num1, string num2)
    {
        if (num1 == "0" || num2 == "0") return "0";

        int m = num1.Length, n = num2.Length;
        int[] result = new int[m + n];

        for (int i = m - 1; i >= 0; i--)
        {
            for (int j = n - 1; j >= 0; j--)
            {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int sum = mul + result[i + j + 1];

                result[i + j + 1] = sum % 10;
                result[i + j] += sum / 10;
            }
        }

        var sb = new StringBuilder();
        foreach (int digit in result)
        {
            if (!(sb.Length == 0 && digit == 0))
            {
                sb.Append(digit);
            }
        }

        return sb.Length == 0 ? "0" : sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(m * n)` — every digit pair is multiplied once.
- **Space:** `O(m + n)` — for the result buffer.
