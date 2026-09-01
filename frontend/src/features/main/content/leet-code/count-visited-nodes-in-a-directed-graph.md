# 2876. Count Visited Nodes in a Directed Graph

**Difficulty:** Hard
**Category:** Array, Depth-First Search, Graph, Topological Sort

## Problem

There is a directed graph of `n` nodes, each with exactly one outgoing edge, given as an array `edges` where `edges[i]` is the node that node `i` points to. Starting from any node, a "walk" keeps following outgoing edges until it reaches a node that has already been visited during that walk. Return an array `answer` where `answer[i]` is the number of **distinct** nodes visited starting the walk at node `i`.

### Example

`edges = [1,2,0,0]` → starting at node `3`: `3 -> 0 -> 1 -> 2 -> 0` (repeat), visiting `{3,0,1,2}` = `4` distinct nodes.

## Approach

Since every node has exactly one outgoing edge, the graph is a "functional graph": a set of cycles with trees hanging off them. For a node on a cycle, the answer is simply the cycle's length. For a node on a tail leading into a cycle, the answer is `1 + answer[next node]`.

Process each unvisited node by walking forward and recording the path until reaching a node that is either currently being visited (a brand-new cycle is found) or already fully resolved (the path merges into an already-processed chain):

- If a new cycle is found, compute its length and assign that length to every node on the cycle, then walk the remaining tail backwards assigning `answer[node] = answer[next] + 1`.
- If the walk merges into an already-resolved node, walk the recorded path backwards from that resolved answer, adding `1` each step.

## C# Solution

```csharp
public class Solution 
{
    public int[] CountVisitedNodes(IList<int> edges) 
    {
        int n = edges.Count;
        int[] answer = new int[n];
        int[] color = new int[n]; // 0 = unvisited, 1 = in progress, 2 = resolved
        int[] posInPath = new int[n];

        for (int start = 0; start < n; start++)
        {
            if (color[start] != 0)
            {
                continue;
            }

            var path = new List<int>();
            int cur = start;
            while (color[cur] == 0)
            {
                color[cur] = 1;
                posInPath[cur] = path.Count;
                path.Add(cur);
                cur = edges[cur];
            }

            if (color[cur] == 1)
            {
                int idx = posInPath[cur];
                int cycleLen = path.Count - idx;
                for (int j = idx; j < path.Count; j++)
                {
                    answer[path[j]] = cycleLen;
                    color[path[j]] = 2;
                }
                for (int j = idx - 1; j >= 0; j--)
                {
                    answer[path[j]] = answer[path[j + 1]] + 1;
                    color[path[j]] = 2;
                }
            }
            else
            {
                long value = answer[cur];
                for (int j = path.Count - 1; j >= 0; j--)
                {
                    value++;
                    answer[path[j]] = (int)value;
                    color[path[j]] = 2;
                }
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
