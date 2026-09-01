# 1628. Design an Expression Tree With Evaluate Function

**Difficulty:** Medium
**Category:** Stack, Tree, Design, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a binary expression tree where leaf nodes hold operand digits and internal nodes hold one of `+`, `-`, `*`, `/`, and implement a `TreeBuilder` that constructs such a tree from a postfix token array, plus an `Evaluate()` method on the tree returning the expression's value.

### Example

```
Input: postfix = ["3","4","+","2","*","7","/"]
Output: 2
```

## Approach

Model an abstract `Node` with an `Evaluate()` method, and two concrete subclasses: `NumberNode` (returns its stored value) and `OperatorNode` (recursively evaluates its two children and applies the operator). `TreeBuilder` processes postfix tokens with a stack: numeric tokens push a `NumberNode`, operator tokens pop the two most recent nodes as operands and push a new `OperatorNode` wrapping them.

## C# Solution

```csharp
public abstract class Node
{
    public abstract int Evaluate();
}

public class TreeBuilder
{
    public Node BuildTree(string[] postfix)
    {
        Stack<Node> stack = new Stack<Node>();

        foreach (string token in postfix)
        {
            if (int.TryParse(token, out int value))
            {
                stack.Push(new NumberNode(value));
            }
            else
            {
                Node right = stack.Pop();
                Node left = stack.Pop();
                stack.Push(new OperatorNode(token[0], left, right));
            }
        }

        return stack.Pop();
    }
}

public class NumberNode : Node
{
    private readonly int value;

    public NumberNode(int value)
    {
        this.value = value;
    }

    public override int Evaluate() => value;
}

public class OperatorNode : Node
{
    private readonly char op;
    private readonly Node left;
    private readonly Node right;

    public OperatorNode(char op, Node left, Node right)
    {
        this.op = op;
        this.left = left;
        this.right = right;
    }

    public override int Evaluate()
    {
        int leftValue = left.Evaluate();
        int rightValue = right.Evaluate();

        return op switch
        {
            '+' => leftValue + rightValue,
            '-' => leftValue - rightValue,
            '*' => leftValue * rightValue,
            '/' => leftValue / rightValue,
            _ => throw new InvalidOperationException("Unsupported operator")
        };
    }
}
```

## Complexity

- **Time:** `O(n)` to build the tree and `O(n)` to evaluate it.
- **Space:** `O(n)` for the tree and stack.
