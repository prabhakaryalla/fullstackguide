# 2331. Evaluate Boolean Binary Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

You are given the `root` of a full binary tree with the following properties:

- Leaf nodes have either the value `0` or `1`, where `0` represents `False` and `1` represents `True`.
- Non-leaf nodes have either the value `2` or `3`, where `2` represents the boolean `OR` and `3` represents the boolean `AND`.

The evaluation of a node is as follows:

- If the node is a leaf node, the evaluation is the value of the node, i.e. `True` or `False`.
- Otherwise, evaluate the node's two children and apply the boolean operation of its value with the children's evaluations.

Return the boolean result of evaluating the `root` node.

### Example

```
Input: root = [2,1,3,null,null,0,1]
Output: true
Explanation: Evaluates to (True OR (False AND True)) = True
```

## Approach

Perform a post-order traversal (recursively evaluate children first). For leaf nodes, return their boolean value. For internal nodes, apply the OR/AND operation on the evaluated children.

## C# Solution

```csharp
public class Solution
{
    public bool EvaluateTree(TreeNode root)
    {
        if (root.left == null && root.right == null)
        {
            return root.val == 1;
        }
        
        bool leftVal = EvaluateTree(root.left);
        bool rightVal = EvaluateTree(root.right);
        
        if (root.val == 2)
            return leftVal || rightVal;
        else
            return leftVal && rightVal;
    }
}
```

## Complexity

- **Time:** O(n) where n is number of nodes
- **Space:** O(h) where h is height (recursion stack)
