# 996. Number of Squareful Arrays

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Backtracking, Bitmask

## Problem

Given an integer array `nums` (may contain duplicates), return the number of distinct permutations of `nums` such that the sum of every pair of adjacent elements is a perfect square.

### Example

```
Input: nums = [1,17,8]
Output: 2
```

## Approach

Sort the array first so identical values are adjacent, enabling duplicate-skipping in backtracking (skip a value if the identical previous value wasn't used yet, at the same recursion depth). Build permutations one element at a time, only extending the current sequence with a value whose sum with the last placed value is a perfect square; count complete permutations.

## C# Solution

```csharp
public class Solution
{
    private int count;

    public int NumSquarefulPerms(int[] nums)
    {
        Array.Sort(nums);
        var used = new bool[nums.Length];
        count = 0;
        Dfs(nums, used, new List<int>());
        return count;
    }

    private void Dfs(int[] nums, bool[] used, List<int> current)
    {
        if (current.Count == nums.Length) { count++; return; }

        for (int i = 0; i < nums.Length; i++)
        {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
            if (current.Count > 0 && !IsPerfectSquare(current[^1] + nums[i])) continue;

            used[i] = true;
            current.Add(nums[i]);
            Dfs(nums, used, current);
            current.RemoveAt(current.Count - 1);
            used[i] = false;
        }
    }

    private bool IsPerfectSquare(int x)
    {
        int root = (int)Math.Sqrt(x);
        return root * root == x || (root + 1) * (root + 1) == x;
    }
}
```

## Complexity

- **Time:** `O(n!)` worst case, pruned heavily by the perfect-square and duplicate checks.
- **Space:** `O(n)` for the recursion stack.
