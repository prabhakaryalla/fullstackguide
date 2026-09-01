# 851. Loud and Rich

**Difficulty:** Medium
**Category:** Depth-First Search, Graph, Topological Sort, Array

## Problem

Given `richer` pairs (`[a, b]` meaning person `a` has more money than person `b`) and a `quiet` array giving each person's quietness, return an array `answer` where `answer[x]` is the least quiet person among all people who are known to have at least as much money as person `x`.

### Example

```
Input: richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], quiet = [3,2,5,4,6,1,7,0]
Output: [5,5,2,5,4,5,6,7]
```

## Approach

Build a graph with an edge from each richer person to each poorer person they're compared against (`richer[1]` is poorer than `richer[0]`, edge from poorer to richer to represent "reachable wealthier people"). For each person, recursively find the least-quiet person among everyone reachable (people with equal-or-more money), memoizing results to avoid recomputation, since the same subproblem can be reached from multiple starting people.

## C# Solution

```csharp
public class Solution
{
    public int[] LoudAndRich(int[][] richer, int[] quiet)
    {
        int n = quiet.Length;
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int>();

        foreach (var pair in richer)
            graph[pair[1]].Add(pair[0]);

        var answer = new int[n];
        Array.Fill(answer, -1);

        for (int i = 0; i < n; i++)
            Dfs(i, graph, quiet, answer);

        return answer;
    }

    private int Dfs(int person, List<int>[] graph, int[] quiet, int[] answer)
    {
        if (answer[person] != -1) return answer[person];

        answer[person] = person;

        foreach (var richerPerson in graph[person])
        {
            int candidate = Dfs(richerPerson, graph, quiet, answer);
            if (quiet[candidate] < quiet[answer[person]])
                answer[person] = candidate;
        }

        return answer[person];
    }
}
```

## Complexity

- **Time:** `O(n + e)`, where `e` is the number of richer pairs.
- **Space:** `O(n + e)` for the graph and recursion stack.
