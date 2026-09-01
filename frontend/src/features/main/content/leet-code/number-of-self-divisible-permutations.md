# 2992. Number of Self-Divisible Permutations

**Difficulty:** Medium
**Category:** Array, Math, Bit Manipulation, Backtracking
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer `n`, return the number of **self-divisible permutations** of `[1, 2, ..., n]`. A permutation `perm` of `[1..n]` is self-divisible if for every `1 <= i <= n`, `gcd(perm[i], i) == 1`.

### Example

`n = 2` → answer `1` (only `[1,2]` works, since `gcd(2,2)=2` rules out `[2,1]`).

## Approach

`n` is small, so use backtracking: try to place each unused value at position `1, 2, ..., n` in turn. A value can be placed at a position only if it hasn't been used yet and its `gcd` with the position is `1`. Count all complete valid placements.

## C# Solution

```csharp
public class Solution 
{
    public int SelfDivisiblePermutationCount(int n) 
    {
        bool[] used = new bool[n + 1];
        return Backtrack(1, n, used);
    }

    private int Backtrack(int position, int n, bool[] used)
    {
        if (position > n)
        {
            return 1;
        }

        int count = 0;
        for (int value = 1; value <= n; value++)
        {
            if (!used[value] && Gcd(value, position) == 1)
            {
                used[value] = true;
                count += Backtrack(position + 1, n, used);
                used[value] = false;
            }
        }
        return count;
    }

    private int Gcd(int a, int b)
    {
        while (b != 0)
        {
            (a, b) = (b, a % b);
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n!) worst case, heavily pruned by the gcd constraint in practice
- **Space:** O(n) recursion depth
