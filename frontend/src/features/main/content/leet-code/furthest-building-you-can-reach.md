# 1642. Furthest Building You Can Reach

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue)

## Problem

Given `heights`, and a supply of `bricks` and `ladders`, you climb buildings left to right: moving to a taller next building costs bricks equal to the height difference, or consumes one ladder for free. Return the furthest building index (0-indexed) you can reach.

### Example

```
Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
```

## Approach

Greedily use ladders on the largest climbs encountered so far and pay bricks for the smaller ones. Maintain a min-heap of the climb costs where a ladder was tentatively "spent"; whenever the heap exceeds the ladder count, evict the smallest cost from it (converting that ladder usage into a brick payment) since ladders are best reserved for the biggest climbs. Stop and return the current index once bricks run out.

## C# Solution

```csharp
public class Solution
{
    public int FurthestBuilding(int[] heights, int bricks, int ladders)
    {
        var minHeap = new PriorityQueue<int, int>();

        for (int i = 0; i < heights.Length - 1; i++)
        {
            int diff = heights[i + 1] - heights[i];

            if (diff <= 0)
            {
                continue;
            }

            minHeap.Enqueue(diff, diff);

            if (minHeap.Count > ladders)
            {
                bricks -= minHeap.Dequeue();

                if (bricks < 0)
                {
                    return i;
                }
            }
        }

        return heights.Length - 1;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(ladders)` for the heap.
