# 967. Numbers With Same Consecutive Differences

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Depth-First Search

## Problem

Given integers `n` and `k`, return all non-negative integers with exactly `n` digits (no leading zero, unless `n == 1`) such that every pair of adjacent digits differs by exactly `k`.

### Example

```
Input: n = 3, k = 7
Output: [181,292,707,818,929]
```

## Approach

Depth-first search from each possible starting digit `1`-`9`, extending the number one digit at a time. At each step, the next digit must be `lastDigit + k` or `lastDigit - k`, kept only if it's a valid single digit (`0`-`9`); stop and record the number once it reaches `n` digits.

## C# Solution

```csharp
public class Solution
{
    public int[] NumsSameConsecDiff(int n, int k)
    {
        var result = new List<int>();
        for (int start = 1; start <= 9; start++) Dfs(start, n - 1, k, result);
        return result.ToArray();
    }

    private void Dfs(int num, int remaining, int k, List<int> result)
    {
        if (remaining == 0) { result.Add(num); return; }

        int last = num % 10;
        foreach (var next in new HashSet<int> { last + k, last - k })
        {
            if (next >= 0 && next <= 9) Dfs(num * 10 + next, remaining - 1, k, result);
        }
    }
}
```

## Complexity

- **Time:** `O(9 * 2^n)` worst case.
- **Space:** `O(n)` recursion depth.
