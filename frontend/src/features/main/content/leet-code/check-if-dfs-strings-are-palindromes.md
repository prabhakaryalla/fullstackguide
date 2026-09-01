# 3327. Check if DFS Strings Are Palindromes

**Difficulty:** Hard
**Category:** Array, Hash Table, String, Tree, Depth-First Search, Hash Function

## Problem

You are given a tree rooted at node 0 with `n` nodes, represented by array `parent` (`parent[0] == -1`), and a string `s` where `s[i]` is the character assigned to node `i`.

Define `dfs(x)`: iterate over each child `y` of `x` in increasing order, recursively call `dfs(y)`, then append `s[x]` to a shared string `dfsStr`.

For each node `i`, clear `dfsStr`, call `dfs(i)`, and set `answer[i] = true` if the resulting `dfsStr` is a palindrome.

Return the array `answer`.

### Example

Input: `parent = [-1,0,0,1,1,2], s = "aababa"`

Output: `[true,true,false,true,true,true]`

## Approach

`dfs(x)` produces the post-order string of the subtree rooted at `x`. Crucially, the subtree of any node corresponds to a **contiguous range** in the single global post-order traversal string, since all descendants are emitted before the node itself, and post-order visits an entire subtree before moving on.

1. Build the children lists (naturally sorted ascending since we iterate node indices in increasing order).
2. Perform one iterative post-order DFS from the root to build the global string `P`, recording for each node its `startIdx` (position of the first character emitted while inside its subtree) and `endIdx` (position of its own character, the last of its subtree).
3. Precompute Manacher-style palindrome-radius arrays `d1` (odd-length palindromes) and `d2` (even-length palindromes) for `P` in O(n).
4. For each node, check whether `P[startIdx..endIdx]` is a palindrome in O(1) using `d1`/`d2`.

## C# Solution

```csharp
public class Solution 
{
    public bool[] FindAnswer(int[] parent, string s) 
    {
        int n = parent.Length;
        List<int>[] children = new List<int>[n];
        for (int i = 0; i < n; i++) children[i] = new List<int>();
        for (int i = 1; i < n; i++) children[parent[i]].Add(i);

        int[] startIdx = new int[n];
        int[] endIdx = new int[n];
        char[] p = new char[n];
        int[] childPtr = new int[n];
        bool[] started = new bool[n];
        int pos = 0;
        var stack = new Stack<int>();
        stack.Push(0);
        while (stack.Count > 0)
        {
            int node = stack.Peek();
            if (!started[node])
            {
                started[node] = true;
                startIdx[node] = pos;
            }
            if (childPtr[node] < children[node].Count)
            {
                stack.Push(children[node][childPtr[node]++]);
            }
            else
            {
                p[pos] = s[node];
                endIdx[node] = pos;
                pos++;
                stack.Pop();
            }
        }

        int[] d1 = new int[n];
        for (int i = 0, l = 0, r = -1; i < n; i++)
        {
            int k = i > r ? 1 : Math.Min(d1[l + r - i], r - i + 1);
            while (i - k >= 0 && i + k < n && p[i - k] == p[i + k]) k++;
            d1[i] = k;
            k--;
            if (i + k > r) { l = i - k; r = i + k; }
        }

        int[] d2 = new int[n];
        for (int i = 0, l = 0, r = -1; i < n; i++)
        {
            int k = i > r ? 0 : Math.Min(d2[l + r - i + 1], r - i + 1);
            while (i - k - 1 >= 0 && i + k < n && p[i - k - 1] == p[i + k]) k++;
            d2[i] = k;
            k--;
            if (i + k > r) { l = i - k - 1; r = i + k; }
        }

        bool[] answer = new bool[n];
        for (int node = 0; node < n; node++)
        {
            int l = startIdx[node], r = endIdx[node];
            int len = r - l + 1;
            if (len == 1) { answer[node] = true; continue; }
            if (len % 2 == 1)
            {
                int center = (l + r) / 2;
                int need = (len + 1) / 2;
                answer[node] = d1[center] >= need;
            }
            else
            {
                int center = (l + r + 1) / 2;
                int need = len / 2;
                answer[node] = d2[center] >= need;
            }
        }
        return answer;
    }
}
```

## Complexity

- **Time:** O(n) for the DFS and Manacher preprocessing, plus O(n) for answering all nodes.
- **Space:** O(n) for the traversal string and auxiliary arrays.
