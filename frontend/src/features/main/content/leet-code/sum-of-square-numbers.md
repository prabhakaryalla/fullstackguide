# 633. Sum of Square Numbers

**Difficulty:** Medium
**Category:** Math, Binary Search, Two Pointers

## Problem

Given a non-negative integer `c`, return `true` if there exist two integers `a` and `b` such that `a^2 + b^2 == c`.

### Example

```
Input: c = 5
Output: true
Explanation: 1 * 1 + 2 * 2 = 5
```

### Constraints

- `0 <= c <= 2^31 - 1`

## Approach

Use two pointers starting at `0` and `⌊√c⌋`. If the sum of their squares equals `c`, a solution is found; if it's too small, increase the lower pointer to increase the sum; if too large, decrease the upper pointer. This works because as one pointer increases and the other decreases, the sum of squares changes monotonically within each direction of adjustment.

## C# Solution

```csharp
public class Solution
{
    public bool JudgeSquareSum(int c)
    {
        long left = 0, right = (long)Math.Sqrt(c);

        while (left <= right)
        {
            long sum = left * left + right * right;

            if (sum == c) return true;
            if (sum < c) left++;
            else right--;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(√c)`.
- **Space:** `O(1)`.
