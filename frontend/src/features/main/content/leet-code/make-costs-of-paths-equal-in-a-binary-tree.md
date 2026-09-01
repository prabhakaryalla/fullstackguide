# 2673. Make Costs of Paths Equal in a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Dynamic Programming, Greedy, Binary Tree

## Problem

You are given an integer `n` representing a perfect binary tree with `2^n - 1` nodes. The nodes are numbered from `1` to `2^n - 1`. The tree is rooted at node `1`, and each node `i` has two children: `2*i` and `2*i + 1`.

You are also given a 0-indexed integer array `cost` of length `n` where `cost[i]` is the cost of the `i`-th node (1-indexed).

You can increment the cost of any node any number of times. The goal is to make the cost of all paths from the root to any leaf node equal.

Return the minimum number of increments needed.

### Example

```
Input: n = 7, cost = [1,5,2,2,3,3,1]
Output: 6
Explanation: Increment node 4 by 1, node 5 by 1, node 6 by 1, node 7 by 3.
All root-to-leaf paths now have cost 9.

Input: n = 3, cost = [5,3,3]
Output: 0
Explanation: All paths already have equal cost.
```

## Approach

Use a bottom-up approach. For each internal node, calculate the maximum cost among paths in its left and right subtrees. The number of increments needed at this level is the difference between the two subtree max costs. Propagate the maximum cost upward.

## C# Solution

```csharp
public class Solution
{
    public int MinIncrements(int n, int[] cost)
    {
        int increments = 0;
        
        for (int i = (n / 2) - 1; i >= 0; i--)
        {
            int leftChild = 2 * i + 1;
            int rightChild = 2 * i + 2;
            
            int leftCost = leftChild < n ? cost[leftChild] : 0;
            int rightCost = rightChild < n ? cost[rightChild] : 0;
            
            increments += Math.Abs(leftCost - rightCost);
            cost[i] += Math.Max(leftCost, rightCost);
        }
        
        return increments;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) excluding the input array
