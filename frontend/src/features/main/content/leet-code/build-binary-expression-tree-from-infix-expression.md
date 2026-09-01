# 1597. Build Binary Expression Tree From Infix Expression

**Difficulty:** Hard
**Category:** Stack, Tree, Design, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` representing an infix arithmetic expression (digits `1`-`9`, operators `+`, `-`, `*`, `/`, and parentheses), build and return the root of the binary expression tree representing it, where leaf nodes are digits and internal nodes are operators.

### Example

```
Input: s = "3*4-2*5"
Output: a tree evaluating to (3*4) - (2*5) = 2
```

## Approach

Use the classic shunting-yard-style two-stack approach: one stack of expression tree nodes (`nodes`) and one stack of pending operators (`ops`), respecting standard operator precedence (`*`/`/` bind tighter than `+`/`-`) and parentheses. Scan the expression left to right: push digit nodes directly onto `nodes`; push `(` onto `ops`; on `)`, repeatedly pop and apply operators until the matching `(` is removed; for any other operator, repeatedly pop and apply operators from `ops` that have equal or higher precedence before pushing the new operator. At the end, apply any remaining operators. Applying an operator means popping two nodes to become the new operator node's children (right, then left) and pushing the resulting node back onto `nodes`.

## C# Solution

```csharp
public class Solution
{
    public Node ExpTree(string s)
    {
        var nodes = new Stack<Node>();
        var ops = new Stack<char>();

        int Precedence(char op) => (op == '+' || op == '-') ? 1 : 2;

        void ApplyOp()
        {
            char op = ops.Pop();
            Node right = nodes.Pop();
            Node left = nodes.Pop();
            nodes.Push(new Node(op) { left = left, right = right });
        }

        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];

            if (char.IsDigit(c))
            {
                nodes.Push(new Node(c));
            }
            else if (c == '(')
            {
                ops.Push(c);
            }
            else if (c == ')')
            {
                while (ops.Peek() != '(')
                {
                    ApplyOp();
                }
                ops.Pop();
            }
            else
            {
                while (ops.Count > 0 && ops.Peek() != '(' && Precedence(ops.Peek()) >= Precedence(c))
                {
                    ApplyOp();
                }
                ops.Push(c);
            }
        }

        while (ops.Count > 0)
        {
            ApplyOp();
        }

        return nodes.Pop();
    }
}
```

## Complexity

- **Time:** `O(n)` — each character and each operator is pushed and popped at most once.
- **Space:** `O(n)` for the two stacks.
