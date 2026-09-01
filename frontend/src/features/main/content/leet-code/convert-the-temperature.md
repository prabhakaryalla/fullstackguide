# 2469. Convert the Temperature

**Difficulty:** Easy
**Category:** Math

## Problem

You are given a non-negative floating point number `celsius` representing temperature in Celsius. Convert it to Kelvin and Fahrenheit and return it as an array `[kelvin, fahrenheit]`.

Conversion formulas:
- Kelvin = Celsius + 273.15
- Fahrenheit = Celsius * 1.80 + 32.00

### Example

```
Input: celsius = 36.50
Output: [309.65000, 97.70000]
Explanation: 
Kelvin = 36.50 + 273.15 = 309.65
Fahrenheit = 36.50 * 1.80 + 32.00 = 97.70
```

## Approach

Directly apply the conversion formulas and return the results in an array.

## C# Solution

```csharp
public class Solution
{
    public double[] ConvertTemperature(double celsius)
    {
        double kelvin = celsius + 273.15;
        double fahrenheit = celsius * 1.80 + 32.00;
        
        return new double[] { kelvin, fahrenheit };
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
