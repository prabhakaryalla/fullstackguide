# 3331. Find Subtree Sizes After Changes

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Tree, Depth-First Search

## Problem

You are given a tree rooted at node 0 with `n` nodes, represented by array `parent`, and a string `s` where `s[i]` is the character assigned to node `i`.

Simultaneously, for every node `x` from 1 to `n - 1`: find the closest ancestor `y` of `x` such that `s[x] == s[y]`. If such `y` exists, re-parent `x` to `y` (removing the edge to its old parent).

Return an array `answer` where `answer[i]` is the size of the subtree rooted at node `i` in the final tree.

### Example

Input: `parent = [-1,0,0,1,1,1], s = "abaabc"`

Output: `[6,3,1,1,1,1]`

## Approach

1. Perform an iterative DFS from the root (following the **original** tree structure) while maintaining, for each character `'a'`–`'z'`, a stack of ancestor node indices currently on the path with that character.
2. When visiting node `x` (for `x != 0`), if the stack for `s[x]` is non-empty, the top of that stack is the closest matching ancestor `y`; set `newParent[x] = y`. Otherwise keep `x`'s original parent.
3. Push `x` onto its character's stack, recurse into its (original) children, then pop `x` from the stack upon exiting — this correctly reflects the "closest ancestor" relationship at the time each node is visited.
4. Build the new tree from `newParent`, then compute subtree sizes with a straightforward iterative post-order DFS (`size[node] = 1 + sum of size[child]`).

## C# Solution

```csharp
public class Solution 
{
    public int[] FindSubtreeSizes(int[] parent, string s) 
    {
        int n = parent.Length;
        List<int>[] children = new List<int>[n];
        for (int i = 0; i < n; i++) children[i] = new List<int>();
        for (int i = 1; i < n; i++) children[parent[i]].Add(i);

        int[] newParent = (int[])parent.Clone();
        List<int>[] charStack = new List<int>[26];
        for (int i = 0; i < 26; i++) charStack[i] = new List<int>();

        int[] childPtr = new int[n];
        bool[] entered = new bool[n];
        var stack = new Stack<int>();
        stack.Push(0);
        while (stack.Count > 0)
        {
            int node = stack.Peek();
            if (!entered[node])
            {
                entered[node] = true;
                int ci = s[node] - 'a';
                if (node != 0 && charStack[ci].Count > 0)
                {
                    newParent[node] = charStack[ci][charStack[ci].Count - 1];
                }
                charStack[ci].Add(node);
            }

            if (childPtr[node] < children[node].Count)
            {
                stack.Push(children[node][childPtr[node]++]);
            }
            else
            {
                int ci = s[node] - 'a';
                charStack[ci].RemoveAt(charStack[ci].Count - 1);
                stack.Pop();
            }
        }

        List<int>[] newChildren = new List<int>[n];
        for (int i = 0; i < n; i++) newChildren[i] = new List<int>();
        for (int i = 1; i < n; i++) newChildren[newParent[i]].Add(i);

        int[] size = new int[n];
        int[] childPtr2 = new int[n];
        var stack2 = new Stack<int>();
        stack2.Push(0);
        while (stack2.Count > 0)
        {
            int node = stack2.Peek();
            if (childPtr2[node] < newChildren[node].Count)
            {
                stack2.Push(newChildren[node][childPtr2[node]++]);
            }
            else
            {
                int sz = 1;
                foreach (int c in newChildren[node]) sz += size[c];
                size[node] = sz;
                stack2.Pop();
            }
        }

        return size;
    }
}
```

## Complexity

- **Time:** O(n) for both DFS passes.
- **Space:** O(n) for children lists and auxiliary arrays.
