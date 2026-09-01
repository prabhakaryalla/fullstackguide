# 1553. Minimum Number of Days to Eat N Oranges

**Difficulty:** Hard
**Category:** Dynamic Programming, Memoization

## Problem

You start with `n` oranges. Each day you may eat one orange, or (if `n` is divisible by 2) eat half of the oranges, or (if `n` is divisible by 3) eat two-thirds of the oranges. Return the minimum number of days needed to eat all `n` oranges.

### Example

```
Input: n = 10
Output: 4
```

## Approach

Use memoized recursion on `n`. The key insight to avoid exponential blowup: rather than eating oranges one at a time down to a multiple of 2 or 3, directly account for the "waste" via the remainder — `dp(n) = min(n % 2 + 1 + dp(n / 2), n % 3 + 1 + dp(n / 3))`, where the remainder oranges are eaten one per day before halving/thirding the rest. Base case `dp(0) = 0`, and `dp(1) = 1`. This reduces the state space to `O(log n)` distinct values reachable through repeated division.

## C# Solution

```csharp
public class Solution
{
    private readonly Dictionary<int, int> memo = new Dictionary<int, int>();

    public int MinDays(int n)
    {
        if (n <= 1)
        {
            return n;
        }

        if (memo.TryGetValue(n, out int cached))
        {
            return cached;
        }

        int viaTwo = (n % 2) + 1 + MinDays(n / 2);
        int viaThree = (n % 3) + 1 + MinDays(n / 3);

        int result = Math.Min(viaTwo, viaThree);
        memo[n] = result;
        return result;
    }
}
```

## Complexity

- **Time:** `O(log^2 n)` — the recursion explores `O(log n)` distinct values, each doing `O(log n)` work overall due to shared sub-results.
- **Space:** `O(log n)` for the memoization cache and recursion stack.
