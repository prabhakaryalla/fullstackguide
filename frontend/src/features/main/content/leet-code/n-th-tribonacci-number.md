# 1137. N-th Tribonacci Number

**Difficulty:** Easy
**Category:** Math, Dynamic Programming, Memoization

## Problem

The Tribonacci sequence is defined as `T(0) = 0`, `T(1) = 1`, `T(2) = 1`, and `T(n+3) = T(n) + T(n+1) + T(n+2)`. Given `n`, return `T(n)`.

### Example

```
Input: n = 4
Output: 4
```

## Approach

Handle the three base cases directly, then iteratively roll three running variables forward one step at a time, avoiding the need for an array or recursion.

## C# Solution

```csharp
public class Solution
{
    public int Tribonacci(int n)
    {
        if (n == 0) return 0;
        if (n == 1 || n == 2) return 1;

        int a = 0, b = 1, c = 1;

        for (int i = 3; i <= n; i++)
        {
            int next = a + b + c;
            a = b;
            b = c;
            c = next;
        }

        return c;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
