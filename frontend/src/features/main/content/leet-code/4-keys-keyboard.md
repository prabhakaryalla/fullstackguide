# 651. 4 Keys Keyboard

**Difficulty:** Medium
**Category:** Math, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a keyboard with 4 keys — `A`, `Ctrl-A` (select all), `Ctrl-C` (copy), and `Ctrl-V` (paste) — and an integer `n` representing the number of allowed key presses, return the maximum number of `'A'`s that can be displayed.

### Example

```
Input: n = 7
Output: 9
Explanation: A, A, A, Ctrl-A, Ctrl-C, Ctrl-V, Ctrl-V
```

### Constraints

- `1 <= n <= 50`

## Approach

Use dynamic programming where `dp[i]` is the maximum `'A'`s achievable with `i` key presses. The baseline is just pressing `'A'` `i` times. For any earlier press count `j` at least 3 steps before `i` (leaving room for `Ctrl-A`, `Ctrl-C`, and at least one `Ctrl-V`), consider selecting-all-and-copying at step `j`, then spending the remaining `i - j - 1` presses all as pastes, each multiplying the current count by the same copied amount: `dp[j] * (i - j - 1)`.

## C# Solution

```csharp
public class Solution
{
    public int MaxA(int n)
    {
        var dp = new int[n + 1];
        for (int i = 0; i <= n; i++)
            dp[i] = i;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i - 3; j++)
            {
                dp[i] = Math.Max(dp[i], dp[j] * (i - j - 1));
            }
        }

        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the DP array.
