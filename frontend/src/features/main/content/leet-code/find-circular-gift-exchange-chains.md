# 3401. Find Circular Gift Exchange Chains

**Difficulty:** Medium
**Category:** Array, Graph, Depth-First Search, Union Find
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
There are `n` people, numbered `0` to `n - 1`, taking part in a gift exchange. You are given a 0-indexed integer array `recipient` of length `n`, where `recipient[i]` is the person that person `i` gives a gift to. Every person gives exactly one gift and receives exactly one gift, so `recipient` is a permutation of `[0, n - 1]`. This naturally partitions the people into disjoint circular exchange chains (cycles). Return the total number of circular gift exchange chains.

## Approach
`recipient` describes a functional graph where every node has out-degree 1 and in-degree 1, so it decomposes entirely into disjoint cycles. Walk through each unvisited person, follow the `recipient` pointers marking everyone visited until the walk returns to the starting person, and count that as one chain. Repeat for all remaining unvisited people.

## C# Solution

```csharp
public class Solution 
{
    public int CountCircularChains(int[] recipient) 
    {
        int n = recipient.Length;
        bool[] visited = new bool[n];
        int chains = 0;

        for (int i = 0; i < n; i++)
        {
            if (visited[i]) continue;

            chains++;
            int cur = i;
            while (!visited[cur])
            {
                visited[cur] = true;
                cur = recipient[cur];
            }
        }

        return chains;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
