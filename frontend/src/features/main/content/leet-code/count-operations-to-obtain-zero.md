# 2169. Count Operations to Obtain Zero

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

You are given two non-negative integers `num1` and `num2`.

In one operation, if `num1 >= num2`, subtract `num2` from `num1`. Otherwise, subtract `num1` from `num2`.

Return the number of operations required to make either `num1` or `num2` equal to 0.

### Example

```
Input: num1 = 2, num2 = 3
Output: 3
Explanation: 
- Operation 1: num1 = 2, num2 = 3. Since num2 > num1, subtract num1 from num2: num2 = 1.
- Operation 2: num1 = 2, num2 = 1. Since num1 > num2, subtract num2 from num1: num1 = 1.
- Operation 3: num1 = 1, num2 = 1. Since they're equal, subtract: num1 = 0.
Total: 3 operations.
```

## Approach

Simulate the process. In each step, subtract the smaller from the larger until one becomes zero. This is essentially computing the GCD using subtraction (similar to Euclidean algorithm but less efficient).

## C# Solution

```csharp
public class Solution
{
    public int CountOperations(int num1, int num2)
    {
        int count = 0;
        
        while (num1 > 0 && num2 > 0)
        {
            if (num1 >= num2)
                num1 -= num2;
            else
                num2 -= num1;
            
            count++;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(max(num1, num2)) in worst case
- **Space:** O(1)
