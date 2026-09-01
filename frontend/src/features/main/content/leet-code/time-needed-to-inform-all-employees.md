# 1376. Time Needed to Inform All Employees

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search

## Problem

Given `n` employees organized under a `headID` with each employee's `manager` and how long (`informTime`) it takes them to inform their direct subordinates, return the total time needed for the entire company to be informed.

### Example

```
Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
Output: 1
```

## Approach

Build a tree of direct reports from the manager array, rooted at `headID`. The total time to inform everyone is the length of the longest root-to-leaf path, where each edge's weight is the informing manager's `informTime`; compute this with a depth-first traversal that accumulates elapsed time along each path and tracks the maximum.

## C# Solution

```csharp
public class Solution
{
    public int NumOfMinutes(int n, int headID, int[] manager, int[] informTime)
    {
        var reports = new List<int>[n];
        for (int i = 0; i < n; i++) reports[i] = new List<int>();

        for (int i = 0; i < n; i++)
        {
            if (manager[i] != -1) reports[manager[i]].Add(i);
        }

        return Dfs(headID, reports, informTime);
    }

    private int Dfs(int id, List<int>[] reports, int[] informTime)
    {
        if (reports[id].Count == 0) return 0;

        int maxSubTime = 0;
        foreach (int sub in reports[id])
        {
            maxSubTime = Math.Max(maxSubTime, Dfs(sub, reports, informTime));
        }

        return informTime[id] + maxSubTime;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the reports tree and recursion stack.
