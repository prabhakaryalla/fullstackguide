# 1938. Maximum Genetic Difference Query

**Difficulty:** Hard
**Category:** Bit Manipulation, Trie

## Problem

There is a rooted tree of `n` nodes labeled `0` to `n-1`, given as `parents` where `parents[i]` is the parent of node `i` (root has parent `-1`). For each query `[node_i, val_i]`, find the maximum value of `val_i XOR ancestor` over all ancestors of `node_i` (including `node_i` itself), and return the answers in query order.

### Example

```
Input: parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]
Output: [2,3,7]
Explanation: For query [0,2], the only ancestor is node 0 with value 0, and 2 XOR 0 = 2.
```

### Constraints

- `2 <= parents.length <= 10^5`
- `0 <= parents[i] < parents.length` for `i != 0`
- `parents[0] == -1`
- `1 <= queries.length <= 3 * 10^4`
- `0 <= nodei <= parents.length - 1`
- `0 <= vali <= 2 * 10^5`

## Approach

Group queries by the node they target, then perform a DFS from the root, maintaining a binary trie of the node values on the current root-to-node path (insert on entering a node, remove on leaving — backtracking). When the DFS visits a node that has pending queries, answer each by walking the trie greedily to maximize the XOR with the query value (at each bit, prefer the child bit that differs from the query bit if it exists). This answers each query in `O(bits)` using only the ancestors currently on the trie.

## C# Solution

```csharp
public class Solution
{
    private class TrieNode
    {
        public TrieNode[] Children = new TrieNode[2];
        public int Count = 0;
    }

    private const int Bits = 18;
    private TrieNode _root = new TrieNode();

    public int[] MaxGeneticDifference(int[] parents, int[][] queries)
    {
        int n = parents.Length;
        var children = new List<int>[n];
        int rootIdx = -1;
        for (int i = 0; i < n; i++)
        {
            children[i] = new List<int>();
        }
        for (int i = 0; i < n; i++)
        {
            if (parents[i] == -1) rootIdx = i;
            else children[parents[i]].Add(i);
        }

        var queriesByNode = new List<(int idx, int val)>[n];
        for (int i = 0; i < n; i++) queriesByNode[i] = new List<(int, int)>();
        for (int i = 0; i < queries.Length; i++)
        {
            queriesByNode[queries[i][0]].Add((i, queries[i][1]));
        }

        int[] answers = new int[queries.Length];
        var stack = new Stack<(int node, bool entering)>();
        stack.Push((rootIdx, true));

        while (stack.Count > 0)
        {
            var (node, entering) = stack.Pop();
            if (entering)
            {
                Insert(node);
                foreach (var (idx, val) in queriesByNode[node])
                {
                    answers[idx] = QueryMax(val);
                }
                stack.Push((node, false));
                foreach (int child in children[node])
                {
                    stack.Push((child, true));
                }
            }
            else
            {
                Remove(node);
            }
        }

        return answers;
    }

    private void Insert(int value)
    {
        var node = _root;
        for (int b = Bits; b >= 0; b--)
        {
            int bit = (value >> b) & 1;
            if (node.Children[bit] == null) node.Children[bit] = new TrieNode();
            node = node.Children[bit];
            node.Count++;
        }
    }

    private void Remove(int value)
    {
        var node = _root;
        for (int b = Bits; b >= 0; b--)
        {
            int bit = (value >> b) & 1;
            node = node.Children[bit];
            node.Count--;
        }
    }

    private int QueryMax(int value)
    {
        var node = _root;
        int result = 0;
        for (int b = Bits; b >= 0; b--)
        {
            int bit = (value >> b) & 1;
            int want = 1 - bit;
            if (node.Children[want] != null && node.Children[want].Count > 0)
            {
                result |= (1 << b);
                node = node.Children[want];
            }
            else
            {
                node = node.Children[bit];
            }
        }
        return result;
    }
}
```

## Complexity

- **Time:** `O((n + q) * Bits)` — one trie insert/remove per node and one query walk per question.
- **Space:** `O(n * Bits)` for the trie nodes.
