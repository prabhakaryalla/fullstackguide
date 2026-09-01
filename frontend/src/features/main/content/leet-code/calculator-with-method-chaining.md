# 2726. Calculator with Method Chaining

**Difficulty:** Medium
**Category:** Design, Closure

## Problem
Design a `Calculator` class that is initialized with a starting numeric `value` and supports method chaining. Implement `Add`, `Subtract`, `Multiply`, `Divide`, and `Power`, each of which applies the operation to the stored value and returns the calculator instance itself so calls can be chained. `GetResult` returns the final value. Calling `Divide` with `0` must throw an error with the message `"Division by zero is not allowed"`.

### Example
```
Input: new Calculator(10).Add(5).Subtract(7).GetResult()
Output: 8
```

## Approach
Store the running value as an instance field. Every operation method mutates that field in place and returns `this`, which is what enables chaining. `Divide` validates the divisor before performing the division.

## C# Solution

```csharp
public class Calculator
{
    private double value;

    public Calculator(double value)
    {
        this.value = value;
    }

    public Calculator Add(double v)
    {
        value += v;
        return this;
    }

    public Calculator Subtract(double v)
    {
        value -= v;
        return this;
    }

    public Calculator Multiply(double v)
    {
        value *= v;
        return this;
    }

    public Calculator Divide(double v)
    {
        if (v == 0)
        {
            throw new DivideByZeroException("Division by zero is not allowed");
        }

        value /= v;
        return this;
    }

    public Calculator Power(double v)
    {
        value = Math.Pow(value, v);
        return this;
    }

    public double GetResult()
    {
        return value;
    }
}
```

## Complexity

- **Time:** O(1) per operation.
- **Space:** O(1).
