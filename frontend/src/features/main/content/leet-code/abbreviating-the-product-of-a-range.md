# 2117. Abbreviating the Product of a Range

**Difficulty:** Hard
**Category:** Math

## Problem

Given two positive integers `left` and `right`, find the product of all integers in the range [left, right]. Return a string representing either the product (if it has ≤10 digits) or an abbreviation showing the first 5 digits, the number of trailing zeros removed, and the last 5 digits.

### Example

```
Input: left = 1, right = 4
Output: "24"
Explanation: 1 * 2 * 3 * 4 = 24
```

## Approach

Count trailing zeros by counting factors of 5 (and 2). Maintain first 5 digits using modular arithmetic with a large modulus, and last 5 digits using mod 10^10. Use logarithms to track magnitude. Handle edge cases for small products.

## C# Solution

```csharp
public class Solution
{
    public string AbbreviateProduct(int left, int right)
    {
        long product = 1;
        bool overflow = false;
        int zeros = 0;
        
        for (int i = left; i <= right; i++)
        {
            if (product > 1e10)
                overflow = true;
            product *= i;
            while (product % 10 == 0)
            {
                product /= 10;
                zeros++;
            }
        }
        
        if (!overflow)
            return product.ToString() + "e" + zeros;
        
        string str = product.ToString();
        if (str.Length > 10)
            return str.Substring(0, 5) + "..." + str.Substring(str.Length - 5) + "e" + zeros;
        return str + "e" + zeros;
    }
}
```

## Complexity

- **Time:** O(n) where n = right - left
- **Space:** O(1)
