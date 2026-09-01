# 3275. K-th Nearest Obstacle Queries

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue)

## Problem

You start at the origin `(0, 0)` of an infinite 2D grid. Obstacles are added one at a time according to a list of `queries`, where `queries[i] = [x, y]` adds an obstacle at that coordinate. After each query, determine the distance (Manhattan distance from the origin) of the `k`-th nearest obstacle among all obstacles placed so far. If fewer than `k` obstacles have been placed, the answer for that query is `-1`. Return an array of these answers.

### Example

```
Input: queries = [[1,2],[3,4],[2,3],[-3,0]], k = 2
Output: [-1,7,5,3]
```

## Approach

Maintain a max-heap of size at most `k` containing the `k` smallest Manhattan distances seen so far. For each new obstacle's distance: if the heap has fewer than `k` elements, add it directly. Otherwise, if the new distance is smaller than the current maximum in the heap, replace the maximum with the new distance. After processing a query, if the heap holds exactly `k` elements, its maximum (the top of the max-heap) is the `k`-th nearest obstacle distance; otherwise the answer is `-1`.

## C# Solution

```csharp
public class Solution 
{
    public int[] ResultsArray(int[][] queries, int k) 
    {
        var maxHeap = new PriorityQueue<int, int>();
        int n = queries.Length;
        int[] result = new int[n];

        for (int i = 0; i < n; i++) 
        {
            int dist = Math.Abs(queries[i][0]) + Math.Abs(queries[i][1]);

            if (maxHeap.Count < k) 
            {
                maxHeap.Enqueue(dist, -dist);
            } 
            else 
            {
                maxHeap.TryPeek(out _, out int topPriority);
                int topDist = -topPriority;
                if (dist < topDist) 
                {
                    maxHeap.Dequeue();
                    maxHeap.Enqueue(dist, -dist);
                }
            }

            if (maxHeap.Count == k) 
            {
                maxHeap.TryPeek(out _, out int priority);
                result[i] = -priority;
            } 
            else 
            {
                result[i] = -1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n log k)
- **Space:** O(k)
