# 3387. Maximize Amount After Two Days of Conversions

**Difficulty:** Medium
**Category:** Graph, Depth-First Search, Array

## Problem

Given an `initialCurrency`, and two days of currency conversion pairs/rates (`pairs1`/`rates1` for day 1, `pairs2`/`rates2` for day 2, with inverse conversion always at rate `1/rate`), starting with `1.0` unit of `initialCurrency`, convert through any chain of day-1 rates, then through any chain of day-2 rates (in reverse, back toward `initialCurrency`), maximizing the final amount of `initialCurrency`.

### Example

Converting `initialCurrency -> A` on day 1 (multiplying rates along the path) then finding the best path from `A` back to `initialCurrency` using day-2 rates maximizes the final amount.

## Approach

Build a graph for each day (including inverse edges with reciprocal rates). DFS from `initialCurrency` on day 1 to get, for every reachable currency `c`, the best amount obtainable (`amount1[c]`). DFS from `initialCurrency` on day 2 similarly to get `amount2[c]` (the rate to convert 1 unit of `initialCurrency` into `c`); since conversions are invertible, converting `c` back to `initialCurrency` costs `1/amount2[c]`. The answer is the max over all currencies `c` of `amount1[c] / amount2[c]`.

## C# Solution

```csharp
public class Solution 
{
    public double MaxAmount(string initialCurrency, IList<IList<string>> pairs1, double[] rates1, IList<IList<string>> pairs2, double[] rates2) 
    {
        var graph1 = BuildGraph(pairs1, rates1);
        var graph2 = BuildGraph(pairs2, rates2);

        var amount1 = new Dictionary<string, double>();
        Dfs(graph1, initialCurrency, 1.0, amount1);

        var amount2 = new Dictionary<string, double>();
        Dfs(graph2, initialCurrency, 1.0, amount2);

        double best = 1.0;
        foreach (var kvp in amount1) 
        {
            if (amount2.TryGetValue(kvp.Key, out double rate2))
                best = Math.Max(best, kvp.Value / rate2);
        }
        return best;
    }

    private Dictionary<string, List<(string to, double rate)>> BuildGraph(IList<IList<string>> pairs, double[] rates) 
    {
        var graph = new Dictionary<string, List<(string, double)>>();
        for (int i = 0; i < pairs.Count; i++) 
        {
            string a = pairs[i][0], b = pairs[i][1];
            double r = rates[i];
            if (!graph.ContainsKey(a)) graph[a] = new List<(string, double)>();
            if (!graph.ContainsKey(b)) graph[b] = new List<(string, double)>();
            graph[a].Add((b, r));
            graph[b].Add((a, 1.0 / r));
        }
        return graph;
    }

    private void Dfs(Dictionary<string, List<(string to, double rate)>> graph, string cur, double amount, Dictionary<string, double> visited) 
    {
        if (visited.ContainsKey(cur)) return;
        visited[cur] = amount;
        if (!graph.ContainsKey(cur)) return;
        foreach (var (to, rate) in graph[cur])
            Dfs(graph, to, amount * rate, visited);
    }
}
```

## Complexity

- **Time:** O(n) where n is total pairs across both days
- **Space:** O(n)
