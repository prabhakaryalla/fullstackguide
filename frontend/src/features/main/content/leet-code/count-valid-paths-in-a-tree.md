# 2867. Count Valid Paths in a Tree

**Difficulty:** Hard
**Category:** Tree, Union Find, Math, Number Theory

## Problem

There is an undirected tree with `n` nodes labeled from `1` to `n`, given as an edge list. Return the number of paths `(u, v)` with `u <= v` such that the number of prime-numbered nodes on the path between `u` and `v` (inclusive) is **exactly one**.

### Example

`n = 5`, `edges = [[1,2],[1,3],[2,4],[2,5]]` → answer `4`. Node `2`, `3`, `5` are prime. The valid paths are `(1,2), (1,3), (2,4), (3,4)`.

## Approach

Remove every prime node from the tree; the remaining non-prime nodes split into several connected components. For a path to contain exactly one prime node `p`, it must start at `p` (or pass through `p`) and can extend into at most two of `p`'s neighboring non-prime components, since crossing into a further component would require passing through another prime node.

1. Sieve primality for `1..n`.
2. Union-Find (or DFS) the components formed only by edges between two non-prime nodes; record each component's size.
3. For every prime node `p`, look at each neighbor `v`: the "branch size" contributed by that neighbor is `0` if `v` is prime, otherwise the size of `v`'s component.
4. For prime `p` with branch sizes `s1..sk`, the number of valid paths having `p` as their only prime node is `1 (p alone) + sum(si) (p paired with one branch node) + sum over pairs si*sj (paths crossing p through two different branches)`, where the pairwise sum equals `((sum)^2 - sum(si^2)) / 2`.
5. Sum this over all prime nodes.

## C# Solution

```csharp
public class Solution 
{
    public long CountPaths(int n, int[][] edges) 
    {
        bool[] isComposite = new bool[n + 1];
        for (int p = 2; (long)p * p <= n; p++)
        {
            if (!isComposite[p])
            {
                for (int multiple = p * p; multiple <= n; multiple += p)
                {
                    isComposite[multiple] = true;
                }
            }
        }

        bool[] isPrime = new bool[n + 1];
        for (int i = 2; i <= n; i++)
        {
            isPrime[i] = !isComposite[i];
        }

        int[] parent = new int[n + 1];
        int[] size = new int[n + 1];
        for (int i = 1; i <= n; i++)
        {
            parent[i] = i;
            size[i] = 1;
        }

        int Find(int x)
        {
            while (parent[x] != x)
            {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        void Union(int a, int b)
        {
            int rootA = Find(a);
            int rootB = Find(b);
            if (rootA == rootB)
            {
                return;
            }
            if (size[rootA] < size[rootB])
            {
                (rootA, rootB) = (rootB, rootA);
            }
            parent[rootB] = rootA;
            size[rootA] += size[rootB];
        }

        var adj = new List<int>[n + 1];
        for (int i = 1; i <= n; i++)
        {
            adj[i] = new List<int>();
        }

        foreach (int[] edge in edges)
        {
            int u = edge[0];
            int v = edge[1];
            adj[u].Add(v);
            adj[v].Add(u);
            if (!isPrime[u] && !isPrime[v])
            {
                Union(u, v);
            }
        }

        long answer = 0;
        for (int p = 1; p <= n; p++)
        {
            if (!isPrime[p])
            {
                continue;
            }

            long sum = 0;
            long sumSquares = 0;
            foreach (int v in adj[p])
            {
                long s = isPrime[v] ? 0 : size[Find(v)];
                sum += s;
                sumSquares += s * s;
            }

            long pairs = (sum * sum - sumSquares) / 2;
            answer += 1 + sum + pairs;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O((n + edges) * α(n))
- **Space:** O(n)
