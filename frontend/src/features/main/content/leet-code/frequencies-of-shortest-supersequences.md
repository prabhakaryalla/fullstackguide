# 3435. Frequencies of Shortest Supersequences

**Difficulty:** Hard
**Category:** Graph, Topological Sort, Strongly Connected Components, Backtracking

## Problem
You are given an array of strings `words`, where every word consists of distinct lowercase English letters (no character repeats within a single word). A string `seq` is a supersequence of `words` if every word appears in `seq` as a subsequence. Among all supersequences of the shortest possible length built only from letters appearing in `words`, return the letter-frequency array (`int[26]`, counts for `'a'..'z'`) of every distinct shortest supersequence.

## Approach
Each word imposes ordering constraints between consecutive letters: if a word contains `...xy...`, then `x` must appear before `y` in any supersequence. Build a directed graph with an edge `x -> y` for every such consecutive pair across all words.

- If this graph is a DAG restricted to some set of letters, each of those letters needs to appear exactly once — any topological order works.
- If a set of letters forms a **strongly connected component (SCC)** of size greater than 1, the precedence constraints form a cycle, so at least one letter in that component must be repeated to "close the loop"; repeating any single letter in the component once (frequency 2 for that letter, 1 for the rest) is sufficient to realize a valid ordering of minimum total length for that component.

So: compute SCCs (via Tarjan's algorithm) over the letters that actually appear in `words`. Singleton SCCs always get frequency 1. For every SCC of size `m > 1`, there are `m` distinct choices for which letter gets the extra occurrence, and each choice yields a different shortest supersequence's frequency profile. Since SCCs involve disjoint sets of letters, the full collection of shortest-supersequence frequency arrays is the Cartesian product of the independent choices across all multi-letter SCCs — generated here via backtracking.

## C# Solution

```csharp
public class Solution 
{
    public IList<int[]> SupersequenceFrequencies(string[] words) 
    {
        var adj = new HashSet<int>[26];
        for (int i = 0; i < 26; i++) adj[i] = new HashSet<int>();
        var used = new bool[26];

        foreach (var w in words) 
        {
            foreach (char c in w) used[c - 'a'] = true;
            for (int i = 0; i + 1 < w.Length; i++) 
            {
                adj[w[i] - 'a'].Add(w[i + 1] - 'a');
            }
        }

        int[] index = new int[26];
        Array.Fill(index, -1);
        int[] low = new int[26];
        bool[] onStack = new bool[26];
        var stack = new Stack<int>();
        int counter = 0;
        var sccs = new List<List<int>>();

        void StrongConnect(int v) 
        {
            index[v] = low[v] = counter++;
            stack.Push(v);
            onStack[v] = true;

            foreach (int w in adj[v]) 
            {
                if (!used[w]) continue;
                if (index[w] == -1) 
                {
                    StrongConnect(w);
                    low[v] = Math.Min(low[v], low[w]);
                } 
                else if (onStack[w]) 
                {
                    low[v] = Math.Min(low[v], index[w]);
                }
            }

            if (low[v] == index[v]) 
            {
                var comp = new List<int>();
                int w;
                do 
                {
                    w = stack.Pop();
                    onStack[w] = false;
                    comp.Add(w);
                } while (w != v);
                sccs.Add(comp);
            }
        }

        for (int c = 0; c < 26; c++) 
        {
            if (used[c] && index[c] == -1) StrongConnect(c);
        }

        var baseFreq = new int[26];
        var branchingSccs = new List<List<int>>();
        foreach (var comp in sccs) 
        {
            foreach (var c in comp) baseFreq[c] = 1;
            if (comp.Count > 1) branchingSccs.Add(comp);
        }

        var result = new List<int[]>();

        void Backtrack(int idx, int[] current) 
        {
            if (idx == branchingSccs.Count) 
            {
                result.Add((int[])current.Clone());
                return;
            }
            foreach (var doubled in branchingSccs[idx]) 
            {
                current[doubled]++;
                Backtrack(idx + 1, current);
                current[doubled]--;
            }
        }

        Backtrack(0, baseFreq);
        return result;
    }
}
```

## Complexity

- **Time:** O(L + P), where `L` is the total length of all words (graph construction and SCC detection over at most 26 nodes), plus `P`, the total number of shortest supersequence variants produced (bounded by the product of cyclic component sizes).
- **Space:** O(P) to store all resulting frequency arrays, plus O(1) for the graph (at most 26 nodes).
