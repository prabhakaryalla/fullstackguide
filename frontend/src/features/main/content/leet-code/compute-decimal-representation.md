# 3697. Compute Decimal Representation

**Difficulty:** Easy
**Category:** Math, Array, Simulation

## Problem

Given a positive integer `n`, decompose it into its non-zero place-value components (e.g., `282` becomes `[200, 80, 2]`) and return them ordered from most significant to least significant.

### Example

Input: `n = 282`
Output: `[200,80,2]`
Explanation: `282 = 200 + 80 + 2`, and each part corresponds to a non-zero digit's place value.

## Approach

Repeatedly extract the least significant digit and multiply it by the current place value (starting at 1, multiplying by 10 each step). Skip zero digits, then reverse the collected parts so the most significant part comes first.

## C# Solution

```csharp
public class Solution 
{
    public long[] DecimalRepresentation(int n) 
    {
        List<long> parts = new List<long>();
        long place = 1;
        int remaining = n;
        while (remaining > 0) 
        {
            int digit = remaining % 10;
            if (digit != 0) 
            {
                parts.Add((long)digit * place);
            }
            place *= 10;
            remaining /= 10;
        }
        parts.Reverse();
        return parts.ToArray();
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(log n)
