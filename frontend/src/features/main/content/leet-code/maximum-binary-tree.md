# 654. Maximum Binary Tree

**Difficulty:** Medium
**Category:** Stack, Array, Depth-First Search, Divide and Conquer, Binary Tree, Monotonic Stack

## Problem

Given an integer array `nums` with no duplicates, construct a maximum binary tree recursively: the root is the maximum element, its left subtree is built from the elements to the left of that maximum, and its right subtree from the elements to the right.

### Example

```
Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]
```

### Constraints

- `1 <= nums.length <= 1000`

## Approach

Recursively find the index of the maximum element within the current subarray range, create a node for it, then recurse on the subarray to its left (for the left subtree) and to its right (for the right subtree).

## C# Solution

```csharp
public class Solution
{
    public TreeNode ConstructMaximumBinaryTree(int[] nums)
    {
        return Build(nums, 0, nums.Length - 1);
    }

    private TreeNode Build(int[] nums, int left, int right)
    {
        if (left > right) return null;

        int maxIndex = left;
        for (int i = left + 1; i <= right; i++)
            if (nums[i] > nums[maxIndex])
                maxIndex = i;

        var node = new TreeNode(nums[maxIndex]);
        node.left = Build(nums, left, maxIndex - 1);
        node.right = Build(nums, maxIndex + 1, right);

        return node;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case (a sorted array).
- **Space:** `O(n)` for the recursion stack.
