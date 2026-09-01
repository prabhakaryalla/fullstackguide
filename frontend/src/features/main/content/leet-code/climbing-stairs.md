# 70. Climbing Stairs

**Difficulty:** Easy
**Category:** Math, Dynamic Programming, Memoization

## Problem

You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

### Example 1

```
Input: n = 2
Output: 2
Explanation: There are two ways: 1 step + 1 step, or 2 steps.
```

### Example 2

```
Input: n = 3
Output: 3
Explanation: 1+1+1, 1+2, or 2+1.
```

### Constraints

- `1 <= n <= 45`

## Approach

The number of ways to reach step `n` equals the ways to reach step `n-1` (then take one more step) plus the ways to reach step `n-2` (then take two steps) — this is exactly the Fibonacci recurrence. Track only the last two values to compute it iteratively in constant space.

## C# Solution

```csharp
public class Solution
{
    public int ClimbStairs(int n)
    {
        if (n <= 2) return n;

        int prev2 = 1, prev1 = 2;

        for (int i = 3; i <= n; i++)
        {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass building up the Fibonacci sequence.
- **Space:** `O(1)`.
