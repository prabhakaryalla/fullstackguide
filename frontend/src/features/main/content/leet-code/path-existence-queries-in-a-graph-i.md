# 3532. Path Existence Queries in a Graph I

**Difficulty:** Medium
**Category:** Array, Union Find, Sorting

## Problem

You are given an integer `n`, a 0-indexed integer array `nums` of length `n` sorted in non-decreasing order, an integer `maxDiff`, and a 2D integer array `queries`.

There is an undirected edge between indices `i` and `i + 1` (for `0 <= i < n - 1`) if `nums[i + 1] - nums[i] <= maxDiff`.

For each `queries[i] = [u, v]`, determine whether there is a path between node `u` and node `v` in this graph. Return a boolean array `answer` where `answer[i]` is the result for `queries[i]`.

### Example

`nums = [1,2,5,10,11]`, `maxDiff = 2`, `queries = [[0,1],[0,2],[3,4]]`.

Edges: `(0,1)` since `2-1=1<=2`; `(1,2)` fails since `5-2=3>2`; `(2,3)` fails since `10-5=5>2`; `(3,4)` since `11-10=1<=2`. Connected groups: `{0,1}`, `{2}`, `{3,4}`. So `answer = [true, false, true]`.

## Approach

Because edges only ever connect consecutive indices, the graph naturally splits into contiguous groups of indices. Do a single pass assigning each index a group id, incrementing the group id whenever the gap to the previous element exceeds `maxDiff`. Answering a query then reduces to comparing the group ids of `u` and `v`.

## C# Solution

```csharp
public class Solution 
{
    public bool[] PathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries) 
    {
        int[] group = new int[n];
        group[0] = 0;
        for (int i = 1; i < n; i++)
        {
            group[i] = group[i - 1] + (nums[i] - nums[i - 1] > maxDiff ? 1 : 0);
        }

        bool[] answer = new bool[queries.Length];
        for (int i = 0; i < queries.Length; i++)
        {
            int u = queries[i][0], v = queries[i][1];
            answer[i] = group[u] == group[v];
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n + q)
- **Space:** O(n)
