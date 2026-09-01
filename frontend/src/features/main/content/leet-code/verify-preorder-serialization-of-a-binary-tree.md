# 331. Verify Preorder Serialization of a Binary Tree

**Difficulty:** Medium
**Category:** Stack, Tree, Binary Tree

## Problem

Given a string of comma-separated values representing a preorder traversal of a binary tree, where `#` represents a null node, determine whether it is a valid preorder serialization without reconstructing the tree.

### Example

```
Input: preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#"
Output: true
```

### Constraints

- `1 <= preorder.length <= 10^4`
- `preorder` consists of non-negative integers, `'#'`, and `','`.

## Approach

Track available child "slots": the tree starts with one slot for the root. Each node consumed fills one slot; a non-null node then opens two new slots for its children, while a null node opens none. If slots ever go negative, or slots aren't exactly used up by the end, the serialization is invalid.

## C# Solution

```csharp
public class Solution
{
    public bool IsValidSerialization(string preorder)
    {
        var nodes = preorder.Split(',');
        int slots = 1;

        foreach (var node in nodes)
        {
            slots--;
            if (slots < 0) return false;

            if (node != "#")
                slots += 2;
        }

        return slots == 0;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the tokens.
- **Space:** `O(n)` for the split token array.
