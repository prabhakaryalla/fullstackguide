# 1791. Find Center of Star Graph

**Difficulty:** Medium
**Category:** Graph

## Problem

A star graph has one center node connected to every other node. Given `edges` describing this star graph, return the center node.

### Example

```
Input: edges = [[1,2],[2,3],[4,2]]
Output: 2
```

## Approach

The center node must appear in every edge, so it necessarily appears in both of the first two edges. Compare the endpoints of the first edge against the second edge to find the common node.

## C# Solution

```csharp
public class Solution
{
    public int FindCenter(int[][] edges)
    {
        int[] e0 = edges[0];
        int[] e1 = edges[1];
        return (e0[0] == e1[0] || e0[0] == e1[1]) ? e0[0] : e0[1];
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
