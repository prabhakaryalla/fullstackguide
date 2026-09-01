# 67. Add Binary

**Difficulty:** Easy
**Category:** Math, String, Bit Manipulation, Simulation

## Problem

Given two binary strings `a` and `b`, return their sum as a binary string.

### Example 1

```
Input: a = "11", b = "1"
Output: "100"
```

### Example 2

```
Input: a = "1010", b = "1011"
Output: "10101"
```

### Constraints

- `1 <= a.length, b.length <= 10^4`
- `a` and `b` consist only of `'0'` or `'1'` characters.
- Each string does not contain leading zeros except for the zero itself.

## Approach

Simulate elementary-school binary addition from the least significant bit: walk both strings from the end, adding corresponding bits plus any carry, appending `sum % 2` to the result and carrying `sum / 2` forward. Continue until both strings and the carry are exhausted, then reverse the accumulated result.

## C# Solution

```csharp
public class Solution
{
    public string AddBinary(string a, string b)
    {
        var sb = new StringBuilder();
        int i = a.Length - 1, j = b.Length - 1, carry = 0;

        while (i >= 0 || j >= 0 || carry != 0)
        {
            int sum = carry;
            if (i >= 0) sum += a[i--] - '0';
            if (j >= 0) sum += b[j--] - '0';

            sb.Append(sum % 2);
            carry = sum / 2;
        }

        var chars = sb.ToString().ToCharArray();
        Array.Reverse(chars);
        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(max(m, n))` — one pass over the longer string.
- **Space:** `O(max(m, n))` — for the result string.
