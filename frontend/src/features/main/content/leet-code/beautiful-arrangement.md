# 526. Beautiful Arrangement

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Backtracking, Bitmask

## Problem

Given an integer `n`, count how many "beautiful arrangements" exist: permutations `perm` of the numbers `1` to `n` such that for every position `i` (1-indexed), either `perm[i]` is divisible by `i` or `i` is divisible by `perm[i]`.

### Example

```
Input: n = 2
Output: 2
```

### Constraints

- `1 <= n <= 15`

## Approach

Use backtracking, filling positions from `1` to `n` one at a time. At each position, only try numbers not yet used that satisfy the divisibility constraint with the current position, pruning invalid branches immediately rather than generating full permutations and checking them afterward.

## C# Solution

```csharp
public class Solution
{
    public int CountArrangement(int n)
    {
        var used = new bool[n + 1];
        return Backtrack(1, n, used);
    }

    private int Backtrack(int position, int n, bool[] used)
    {
        if (position > n) return 1;

        int count = 0;
        for (int num = 1; num <= n; num++)
        {
            if (used[num]) continue;
            if (num % position != 0 && position % num != 0) continue;

            used[num] = true;
            count += Backtrack(position + 1, n, used);
            used[num] = false;
        }

        return count;
    }
}
```

## Complexity

- **Time:** Bounded by the number of valid arrangements explored, far smaller than `O(n!)` due to pruning.
- **Space:** `O(n)` for the recursion stack and used-tracking array.
