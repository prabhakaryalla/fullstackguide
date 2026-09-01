# 1342. Number of Steps to Reduce a Number to Zero

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem

Given an integer `num`, return the number of steps to reduce it to zero, where each step either halves it (if even) or subtracts one (if odd).

### Example

```
Input: num = 14
Output: 6
```

## Approach

Simulate the process directly: while `num` is positive, halve it if it's even, otherwise subtract one, counting each operation until it reaches zero.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfSteps(int num)
    {
        int steps = 0;

        while (num > 0)
        {
            num = num % 2 == 0 ? num / 2 : num - 1;
            steps++;
        }

        return steps;
    }
}
```

## Complexity

- **Time:** `O(log(num))`.
- **Space:** `O(1)`.
