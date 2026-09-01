# 2485. Find the Pivot Integer

**Difficulty:** Easy
**Category:** Math, Prefix Sum

## Problem

Given a positive integer `n`, find the pivot integer `x` such that:
- The sum of all elements between 1 and `x` (inclusive) equals the sum of all elements between `x` and `n` (inclusive).

Return the pivot integer `x`. If no such integer exists, return -1.

### Example

```
Input: n = 8
Output: 6
Explanation: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21

Input: n = 1
Output: 1
```

## Approach

The sum from 1 to x is `x * (x + 1) / 2`, and the sum from x to n is `(n * (n + 1) / 2) - (x * (x - 1) / 2)`.

For these to be equal:
- `x * (x + 1) / 2 = (n * (n + 1) / 2) - (x * (x - 1) / 2)`
- Simplifying: `x² = n * (n + 1) / 2`
- So: `x = sqrt(n * (n + 1) / 2)`

We can directly compute this and check if it's a perfect square.

## C# Solution

```csharp
public class Solution
{
    public int PivotInteger(int n)
    {
        int sum = n * (n + 1) / 2;
        int x = (int)Math.Sqrt(sum);
        
        return x * x == sum ? x : -1;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
