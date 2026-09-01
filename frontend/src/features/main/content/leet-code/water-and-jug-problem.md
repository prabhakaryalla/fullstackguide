# 365. Water and Jug Problem

**Difficulty:** Medium
**Category:** Math, Brainteaser

## Problem

Given two jugs of capacities `x` and `y` liters and an unlimited water supply, determine whether it is possible to measure exactly `target` liters using the following operations: filling either jug completely, emptying either jug, or pouring water from one jug to the other until one is empty or the other is full.

### Example

```
Input: x = 3, y = 5, target = 4
Output: true
```

### Constraints

- `1 <= x, y, target <= 10^6`

## Approach

By Bézout's identity, any amount reachable through filling, emptying, and pouring between the two jugs must be an integer multiple of `gcd(x, y)`. The target is achievable exactly when it doesn't exceed the combined capacity and is divisible by `gcd(x, y)` (treating the degenerate case where one jug has zero capacity separately).

## C# Solution

```csharp
public class Solution
{
    public bool CanMeasureWater(int x, int y, int target)
    {
        if (target > x + y) return false;
        if (x == 0 || y == 0) return target == 0 || target == x + y;

        return target % Gcd(x, y) == 0;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(log(min(x, y)))` for the Euclidean algorithm.
- **Space:** `O(log(min(x, y)))` for the recursion stack.
