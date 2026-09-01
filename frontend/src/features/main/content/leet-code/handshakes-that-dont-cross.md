# 1259. Handshakes That Don't Cross

**Difficulty:** Hard
**Category:** Math, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an even number `numPeople` standing in a circle, count the number of ways to pair everyone up for a handshake such that no two handshakes cross each other, modulo `10^9 + 7`.

### Example

```
Input: numPeople = 4
Output: 2
```

## Approach

This is exactly the definition of the Catalan numbers: the count of non-crossing pairings of `2n` points on a circle is the `n`th Catalan number, where `n = numPeople / 2`. Compute it with the standard Catalan recurrence `C(0) = 1`, `C(i) = sum_{j=0}^{i-1} C(j) * C(i-1-j)`, which reflects fixing one person's partner and splitting the remaining people into two independent non-crossing groups on either side of that handshake.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfWays(int numPeople)
    {
        const int Mod = 1_000_000_007;
        int n = numPeople / 2;
        var dp = new long[n + 1];
        dp[0] = 1;

        for (int i = 1; i <= n; i++)
        {
            long total = 0;
            for (int j = 0; j < i; j++)
                total = (total + dp[j] * dp[i - 1 - j]) % Mod;
            dp[i] = total;
        }

        return (int)dp[n];
    }
}
```

## Complexity

- **Time:** `O(n^2)`, where `n = numPeople / 2`.
- **Space:** `O(n)`.
