# 367. Valid Perfect Square

**Difficulty:** Easy
**Category:** Math, Binary Search

## Problem

Given a positive integer `num`, return `true` if `num` is a perfect square, without using any built-in library function such as `sqrt`.

### Example

```
Input: num = 16
Output: true
```

### Constraints

- `1 <= num <= 2^31 - 1`

## Approach

Binary search for an integer `mid` whose square equals `num`, narrowing the search range `[1, num]` based on whether `mid * mid` is too small or too large. Using `long` for the intermediate product avoids integer overflow for large inputs.

## C# Solution

```csharp
public class Solution
{
    public bool IsPerfectSquare(int num)
    {
        long left = 1, right = num;
        while (left <= right)
        {
            long mid = left + (right - left) / 2;
            long square = mid * mid;

            if (square == num) return true;
            if (square < num) left = mid + 1;
            else right = mid - 1;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(log num)`.
- **Space:** `O(1)`.
