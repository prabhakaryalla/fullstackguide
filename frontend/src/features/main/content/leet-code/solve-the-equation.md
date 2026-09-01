# 640. Solve the Equation

**Difficulty:** Medium
**Category:** Math, String, Simulation

## Problem

Given a string `equation` of the form `"Ax+B=Cx+D"`, solve for `x` and return `"x=#value"` if there is a unique solution, `"No solution"` if there is none, or `"Infinite solutions"` if any value of `x` satisfies the equation.

### Example

```
Input: equation = "x+5-3+x=6+x-2"
Output: "x=2"
```

### Constraints

- `3 <= equation.length <= 1000`

## Approach

Split the equation on `'='` into a left and right side. Parse each side independently by scanning term by term (handling signs, digit runs, and an optional trailing `'x'`), accumulating a total coefficient of `x` and a total constant for that side. Move everything to one side algebraically: `(leftCoeff - rightCoeff) * x = rightConst - leftConst`. If the resulting coefficient is zero, the equation has infinite solutions (if the constants also match) or no solution; otherwise, divide to get `x`.

## C# Solution

```csharp
public class Solution
{
    public string SolveEquation(string equation)
    {
        var sides = equation.Split('=');
        var (leftCoeff, leftConst) = Parse(sides[0]);
        var (rightCoeff, rightConst) = Parse(sides[1]);

        int coeff = leftCoeff - rightCoeff;
        int constant = rightConst - leftConst;

        if (coeff == 0)
            return constant == 0 ? "Infinite solutions" : "No solution";

        return $"x={constant / coeff}";
    }

    private (int Coeff, int Constant) Parse(string side)
    {
        side = side.Replace("+-", "-").Replace("-+", "-");
        if (side[0] != '+' && side[0] != '-')
            side = "+" + side;

        int coeff = 0, constant = 0;
        int i = 0;

        while (i < side.Length)
        {
            int sign = side[i] == '-' ? -1 : 1;
            i++;

            int start = i;
            while (i < side.Length && char.IsDigit(side[i]))
                i++;

            var numberStr = side.Substring(start, i - start);

            if (i < side.Length && side[i] == 'x')
            {
                int value = numberStr.Length == 0 ? 1 : int.Parse(numberStr);
                coeff += sign * value;
                i++;
            }
            else
            {
                if (numberStr.Length > 0)
                    constant += sign * int.Parse(numberStr);
            }
        }

        return (coeff, constant);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the split sides.
