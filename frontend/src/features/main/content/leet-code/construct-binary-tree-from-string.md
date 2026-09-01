# 536. Construct Binary Tree from String

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, String, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` of the form `"value(left)(right)"` representing a binary tree, where a child subtree is omitted entirely if empty, construct and return the binary tree.

### Example

```
Input: s = "4(2(3)(1))(6(5))"
Output: [4,2,6,3,1,5]
```

### Constraints

- `0 <= s.length <= 3 * 10^4`
- `s` consists of digits, `'('`, `')'`, and `'-'`.

## Approach

Recursively parse the string: first read an optional leading `'-'` sign followed by digits to form the current node's value. If the next character is `'('`, recursively parse the enclosed substring as the left child, then consume the matching `')'`; repeat for a possible right child. Since each recursive call advances a shared position index, the string is fully consumed in a single left-to-right pass.

## C# Solution

```csharp
public class Solution
{
    public TreeNode Str2tree(string s)
    {
        int index = 0;
        return Parse(s, ref index);
    }

    private TreeNode Parse(string s, ref int index)
    {
        int sign = 1;
        if (s[index] == '-')
        {
            sign = -1;
            index++;
        }

        int start = index;
        while (index < s.Length && char.IsDigit(s[index]))
            index++;

        int val = sign * int.Parse(s.Substring(start, index - start));
        var node = new TreeNode(val);

        if (index < s.Length && s[index] == '(')
        {
            index++;
            node.left = Parse(s, ref index);
            index++;
        }

        if (index < s.Length && s[index] == '(')
        {
            index++;
            node.right = Parse(s, ref index);
            index++;
        }

        return node;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
