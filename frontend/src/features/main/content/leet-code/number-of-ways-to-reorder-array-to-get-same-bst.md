# 1569. Number of Ways to Reorder Array to Get Same BST

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Math, Divide and Conquer, Tree, Binary Search Tree

## Problem

Given an array `nums` of distinct integers representing the order in which values are inserted into an initially empty binary search tree, return the number of *other* permutations of `nums` that would construct the exact same BST, modulo `10^9 + 7`.

### Example

```
Input: nums = [2,1,3]
Output: 1
```

## Approach

The BST's shape is fully determined by which elements land in the left subtree (those less than the root) versus the right subtree (those greater than the root); the root is always `nums[0]`. Recursively split the remaining elements into `left` (values `< nums[0]`) and `right` (values `> nums[0]`), preserving their relative order. The number of valid interleavings of the left and right subsequences that preserve each side's internal order is `C(leftSize + rightSize, leftSize)` (choosing which positions go to the left group). Multiply this by the number of valid reorderings of the left subtree and of the right subtree (each computed recursively), then subtract 1 at the very end to exclude the original array itself. Precompute Pascal's triangle for combination lookups.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;
    private long[,] pascal = null!;

    public int NumOfWays(int[] nums)
    {
        int n = nums.Length;
        pascal = new long[n + 1, n + 1];
        for (int i = 0; i <= n; i++)
        {
            pascal[i, 0] = 1;
            for (int j = 1; j <= i; j++)
            {
                pascal[i, j] = (pascal[i - 1, j - 1] + (j <= i - 1 ? pascal[i - 1, j] : 0)) % Mod;
            }
        }

        long result = CountWays(nums.ToList()) - 1;
        return (int)((result % Mod + Mod) % Mod);
    }

    private long CountWays(List<int> nums)
    {
        if (nums.Count <= 2)
        {
            return 1;
        }

        int root = nums[0];
        var left = new List<int>();
        var right = new List<int>();

        for (int i = 1; i < nums.Count; i++)
        {
            if (nums[i] < root)
            {
                left.Add(nums[i]);
            }
            else
            {
                right.Add(nums[i]);
            }
        }

        long waysLeft = CountWays(left);
        long waysRight = CountWays(right);
        long interleavings = pascal[left.Count + right.Count, left.Count];

        return interleavings % Mod * waysLeft % Mod * waysRight % Mod;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — each recursive split partitions the array in `O(n)`, across `O(n)` levels in the worst case.
- **Space:** `O(n^2)` for Pascal's triangle, plus `O(n)` for recursion.
