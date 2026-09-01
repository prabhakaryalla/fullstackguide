# 1414. Find the Minimum Number of Fibonacci Numbers Whose Sum Is K

**Difficulty:** Medium
**Category:** Array, Math, Greedy

## Problem

Given a positive integer `k`, return the minimum number of Fibonacci numbers whose sum equals `k`. The same Fibonacci number can be used multiple times.

### Example

```
Input: k = 19
Output: 3
Explanation: 19 = 18 + 1 = 13 + 5 + 1
```

## Approach

By a greedy (and provably optimal) strategy, repeatedly subtract the largest Fibonacci number not exceeding the remaining value of `k`. Precompute all Fibonacci numbers up to `k`, then greedily consume the largest usable one at each step until `k` reaches zero.

## C# Solution

```csharp
public class Solution
{
    public int FindMinFibonacciNumbers(int k)
    {
        if (k == 0) return 0;

        var fibs = new List<int> { 1, 1 };
        while (fibs[^1] <= k)
            fibs.Add(fibs[^1] + fibs[^2]);

        int count = 0;
        int idx = fibs.Count - 1;

        while (k > 0)
        {
            while (fibs[idx] > k) idx--;
            k -= fibs[idx];
            count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(log k)` — Fibonacci numbers grow exponentially, so both the precomputation and consumption loops are logarithmic in `k`.
- **Space:** `O(log k)` for the stored Fibonacci numbers.
