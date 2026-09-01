# 1834. Single-Threaded CPU

**Difficulty:** Medium
**Category:** Array, Sorting, Heap (Priority Queue)

## Problem

Given `tasks[i] = [enqueueTime, processingTime]`, a single-threaded CPU processes one task at a time. Whenever it is idle, it selects the available task (already enqueued) with the shortest processing time, breaking ties by the smallest original index. Return the order in which tasks are processed (by original index).

### Example

```
Input: tasks = [[1,2],[2,4],[3,2],[4,1]]
Output: [0,2,3,1]
```

## Approach

Sort task indices by enqueue time. Simulate time forward: whenever the CPU is free, push every task that has become available (enqueue time `<=` current time) into a min-heap keyed by `(processingTime, index)`. If the heap is empty but tasks remain, jump the clock forward to the next task's enqueue time. Otherwise, pop the best available task, advance the clock by its processing time, and record it in the output order.

## C# Solution

```csharp
public class Solution
{
    public int[] GetOrder(int[][] tasks)
    {
        int n = tasks.Length;
        var indices = Enumerable.Range(0, n).OrderBy(i => tasks[i][0]).ToArray();
        var heap = new PriorityQueue<int, (int proc, int idx)>();
        var result = new int[n];
        int resultIndex = 0;
        int taskPointer = 0;
        long currentTime = 0;

        while (resultIndex < n)
        {
            while (taskPointer < n && tasks[indices[taskPointer]][0] <= currentTime)
            {
                int idx = indices[taskPointer];
                heap.Enqueue(idx, (tasks[idx][1], idx));
                taskPointer++;
            }

            if (heap.Count == 0)
            {
                currentTime = tasks[indices[taskPointer]][0];
                continue;
            }

            int next = heap.Dequeue();
            currentTime += tasks[next][1];
            result[resultIndex++] = next;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting and heap operations.
- **Space:** `O(n)` for the heap and index array.
