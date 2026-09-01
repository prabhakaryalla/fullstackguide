# 1486. XOR Operation in an Array

**Difficulty:** Easy
**Category:** Math, Bit Manipulation

## Problem

Given integers `n` and `start`, form the array `nums[i] = start + 2 * i` for `i` in `[0, n - 1]`, and return the bitwise XOR of all elements.

### Example

```
Input: n = 5, start = 0
Output: 8
```

## Approach

Generate each element directly via the formula `start + 2 * i` and XOR them together in a single pass; no intermediate array is needed.

## C# Solution

```csharp
public class Solution
{
    public int XorOperation(int n, int start)
    {
        int result = 0;

        for (int i = 0; i < n; i++)
            result ^= start + 2 * i;

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
