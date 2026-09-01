# 1057. Campus Bikes

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `workers` and `bikes` positions on a 2D grid, assign each worker exactly one bike using Manhattan distance, such that the assignment is unique and minimizes distances in priority order: repeatedly pick the pair with the smallest distance (breaking ties by smaller worker index, then smaller bike index) among all still-unassigned worker/bike pairs. Return an array where the `i`-th entry is the bike index assigned to worker `i`.

### Example

```
Input: workers = [[0,0],[2,1]], bikes = [[1,2],[3,3]]
Output: [1,0]
```

## Approach

Generate every `(distance, workerIndex, bikeIndex)` triple, then sort them by distance, then worker index, then bike index — exactly matching the required tie-breaking priority. Walk the sorted list and greedily assign a bike to a worker the first time both are still free; this greedy approach is correct because processing in this exact sorted order always resolves the highest-priority pending assignment first.

## C# Solution

```csharp
public class Solution
{
    public int[] AssignBikes(int[][] workers, int[][] bikes)
    {
        var triples = new List<(int dist, int worker, int bike)>();

        for (int w = 0; w < workers.Length; w++)
        {
            for (int b = 0; b < bikes.Length; b++)
            {
                int dist = Math.Abs(workers[w][0] - bikes[b][0]) + Math.Abs(workers[w][1] - bikes[b][1]);
                triples.Add((dist, w, b));
            }
        }

        triples.Sort((x, y) =>
        {
            if (x.dist != y.dist) return x.dist.CompareTo(y.dist);
            if (x.worker != y.worker) return x.worker.CompareTo(y.worker);
            return x.bike.CompareTo(y.bike);
        });

        var result = new int[workers.Length];
        Array.Fill(result, -1);
        var bikeUsed = new bool[bikes.Length];
        int assignedCount = 0;

        foreach (var (dist, worker, bike) in triples)
        {
            if (result[worker] == -1 && !bikeUsed[bike])
            {
                result[worker] = bike;
                bikeUsed[bike] = true;
                assignedCount++;

                if (assignedCount == workers.Length) break;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(w * b * log(w * b))` for generating and sorting all pairs.
- **Space:** `O(w * b)`.
