# 2481. Minimum Cuts to Divide a Circle

**Difficulty:** Easy
**Category:** Math, Geometry

## Problem

A valid cut in a circle can be:
- A cut passing through two points on the circle such that the cut divides the circle into two equal parts, or
- A cut passing through a single point on the circle that divides the circle into two equal parts.

Given an integer `n`, return the minimum number of cuts needed to divide a circle into `n` equal slices.

### Example

```
Input: n = 4
Output: 2

Input: n = 3
Output: 3
```

## Approach

This problem follows a simple mathematical pattern:
- If `n` is even, we can make cuts that pass through two points on opposite sides of the circle (diameter cuts). Each such cut divides the circle into 2 parts, so we need `n/2` cuts.
- If `n` is odd, we cannot use diameter cuts alone. We need cuts from the center to each division point on the circumference, requiring `n` cuts.

The key insight is recognizing this even/odd distinction in how circles can be divided.

## C# Solution

```csharp
public class Solution
{
    public int MinimumCuts(int n)
    {
        if (n == 1) return 0;
        return n % 2 == 0 ? n / 2 : n;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
