# 2303. Calculate Amount Paid in Taxes

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You are given a 2D integer array `brackets` where `brackets[i] = [upper_i, percent_i]` means that the `i-th` tax bracket has an upper bound of `upper_i` and is taxed at a rate of `percent_i`. The brackets are sorted by upper bound.

Tax is calculated as follows:
- The first `upper_0` dollars earned are taxed at rate `percent_0`.
- The next `upper_1 - upper_0` dollars earned are taxed at rate `percent_1`.
- And so on.

You are also given an integer `income` representing the amount of money you earned. Return the amount of money that you have to pay in taxes. Answers within `10^-5` of the actual answer will be accepted.

### Example

```
Input: brackets = [[3,50],[7,10],[12,25]], income = 10
Output: 2.65000
Explanation: 
First 3 dollars taxed at 50%: 3 * 0.5 = 1.5
Next 4 dollars (7-3) taxed at 10%: 4 * 0.1 = 0.4
Next 3 dollars (10-7) taxed at 25%: 3 * 0.25 = 0.75
Total = 1.5 + 0.4 + 0.75 = 2.65
```

## Approach

Iterate through tax brackets in order. For each bracket, calculate the taxable amount (minimum of remaining income or the bracket width) and apply the tax rate. Sum all taxes.

## C# Solution

```csharp
public class Solution
{
    public double CalculateTax(int[][] brackets, int income)
    {
        double tax = 0.0;
        int prev = 0;
        
        foreach (var bracket in brackets)
        {
            int upper = bracket[0];
            int percent = bracket[1];
            
            int taxable = Math.Min(income, upper) - prev;
            if (taxable <= 0) break;
            
            tax += taxable * percent / 100.0;
            prev = upper;
            
            if (income <= upper) break;
        }
        
        return tax;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of brackets
- **Space:** O(1)
