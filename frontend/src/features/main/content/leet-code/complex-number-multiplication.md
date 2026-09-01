# 537. Complex Number Multiplication

**Difficulty:** Medium
**Category:** Math, String, Simulation

## Problem

Given two strings representing complex numbers in the form `"real+imaginaryi"`, return a string representing their multiplication in the same format.

### Example

```
Input: num1 = "1+1i", num2 = "1+1i"
Output: "0+2i"
```

### Constraints

- Both operands and the result follow the format `"real+imaginaryi"`.
- Real and imaginary parts are integers in the range `[-100, 100]`.

## Approach

Parse each string into its real and imaginary integer components by splitting on `'+'` (after removing the trailing `'i'`). Apply the standard complex multiplication formula: `(a + bi)(c + di) = (ac - bd) + (ad + bc)i`, then format the result back into the required string form.

## C# Solution

```csharp
public class Solution
{
    public string ComplexNumberMultiply(string num1, string num2)
    {
        var (real1, imag1) = Parse(num1);
        var (real2, imag2) = Parse(num2);

        int real = real1 * real2 - imag1 * imag2;
        int imag = real1 * imag2 + imag1 * real2;

        return $"{real}+{imag}i";
    }

    private (int Real, int Imag) Parse(string num)
    {
        var parts = num.Substring(0, num.Length - 1).Split('+');
        return (int.Parse(parts[0]), int.Parse(parts[1]));
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
