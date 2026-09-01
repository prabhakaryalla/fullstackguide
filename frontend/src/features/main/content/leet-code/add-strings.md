# 415. Add Strings

**Difficulty:** Easy
**Category:** Math, String, Simulation

## Problem

Given two non-negative integers `num1` and `num2` represented as strings, return the sum of `num1` and `num2` as a string, without converting either input directly to an integer type.

### Example

```
Input: num1 = "11", num2 = "123"
Output: "134"
```

### Constraints

- `1 <= num1.length, num2.length <= 10^4`
- Both consist of only digits and do not have leading zeros, except for the number `0` itself.

## Approach

Simulate elementary-school addition from the least significant digit of each string, tracking a running carry. Prepend each computed digit to the result, continuing until both strings and any remaining carry are exhausted.

## C# Solution

```csharp
public class Solution
{
    public string AddStrings(string num1, string num2)
    {
        var sb = new StringBuilder();
        int i = num1.Length - 1, j = num2.Length - 1, carry = 0;

        while (i >= 0 || j >= 0 || carry > 0)
        {
            int sum = carry;
            if (i >= 0) sum += num1[i--] - '0';
            if (j >= 0) sum += num2[j--] - '0';

            sb.Insert(0, (char)(sum % 10 + '0'));
            carry = sum / 10;
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(max(n, m))`.
- **Space:** `O(max(n, m))` for the result string.
