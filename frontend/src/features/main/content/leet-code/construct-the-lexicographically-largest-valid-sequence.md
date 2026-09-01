# 1718. Construct the Lexicographically Largest Valid Sequence

**Difficulty:** Medium
**Category:** Array, Backtracking

## Problem

Given `n`, construct a sequence of length `2n - 1` containing `1` once and each of `2..n` exactly twice, such that for every `i` in `2..n`, the two occurrences of `i` are exactly `i` positions apart. Return the lexicographically largest such sequence.

### Example

```
Input: n = 3
Output: [3,1,2,3,2]
```

## Approach

Backtrack by filling positions left to right, at each empty slot trying the largest available number first (to maximize lexicographic order): place `1` in any single empty slot, or place `i` (`i > 1`) in the current slot and `i` positions later if both are free. Backtrack if a later placement becomes impossible.

## C# Solution

```csharp
public class Solution
{
    public int[] ConstructDistancedSequence(int n)
    {
        int size = 2 * n - 1;
        int[] result = new int[size];
        bool[] used = new bool[n + 1];
        Backtrack(result, used, 0, n);
        return result;
    }

    private bool Backtrack(int[] result, bool[] used, int pos, int n)
    {
        if (pos == result.Length) return true;
        if (result[pos] != 0) return Backtrack(result, used, pos + 1, n);

        for (int num = n; num >= 1; num--)
        {
            if (used[num]) continue;

            if (num == 1)
            {
                result[pos] = 1;
                used[1] = true;
                if (Backtrack(result, used, pos + 1, n)) return true;
                result[pos] = 0;
                used[1] = false;
            }
            else
            {
                int j = pos + num;
                if (j < result.Length && result[j] == 0)
                {
                    result[pos] = num;
                    result[j] = num;
                    used[num] = true;
                    if (Backtrack(result, used, pos + 1, n)) return true;
                    result[pos] = 0;
                    result[j] = 0;
                    used[num] = false;
                }
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n!)` worst case, but the greedy largest-first order prunes aggressively in practice.
- **Space:** `O(n)` for the recursion stack and used-set.
