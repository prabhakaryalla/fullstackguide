# 2532. Time to Cross a Bridge

**Difficulty:** Hard
**Category:** Array, Simulation, Heap (Priority Queue)

## Problem

There are `k` workers who want to move boxes from the old warehouse on the right bank to the new warehouse on the left bank using a bridge. Each worker has different efficiencies. Only one person can cross the bridge at a time.

Return the time needed for all workers to move all boxes.

### Example

```
Input: n = 1, k = 3, time = [[1,1,2,1],[1,1,3,1],[1,1,4,1]]
Output: 6
Explanation: The optimal strategy results in 6 total time units.
```

## Approach

Use priority queues to manage workers on both sides of the bridge. Simulate the process: workers pick up boxes, cross the bridge, put down boxes, and return. Track who is available and when, using heaps to efficiently find the next available worker based on efficiency and availability time.

## C# Solution

```csharp
public class Solution
{
    public int FindCrossingTime(int n, int k, int[][] time)
    {
        PriorityQueue<(int id, int availTime), (int, int)> leftWait = new PriorityQueue<(int, int), (int, int)>(
            Comparer<(int, int)>.Create((a, b) => {
                if (b.Item2 != a.Item2) return b.Item2.CompareTo(a.Item2);
                return b.Item1.CompareTo(a.Item1);
            })
        );
        
        PriorityQueue<(int id, int availTime), (int, int)> rightWait = new PriorityQueue<(int, int), (int, int)>(
            Comparer<(int, int)>.Create((a, b) => {
                if (b.Item2 != a.Item2) return b.Item2.CompareTo(a.Item2);
                return b.Item1.CompareTo(a.Item1);
            })
        );
        
        PriorityQueue<(int id, int availTime), int> leftWork = new PriorityQueue<(int, int), int>();
        PriorityQueue<(int id, int availTime), int> rightWork = new PriorityQueue<(int, int), int>();
        
        for (int i = 0; i < k; i++)
        {
            leftWait.Enqueue((i, 0), (time[i][0] + time[i][2], i));
        }
        
        int currentTime = 0;
        int boxesMoved = 0;
        
        while (boxesMoved < n || rightWait.Count > 0 || rightWork.Count > 0)
        {
            while (leftWork.Count > 0 && leftWork.Peek().availTime <= currentTime)
            {
                var worker = leftWork.Dequeue();
                leftWait.Enqueue(worker, (time[worker.id][0] + time[worker.id][2], worker.id));
            }
            
            while (rightWork.Count > 0 && rightWork.Peek().availTime <= currentTime)
            {
                var worker = rightWork.Dequeue();
                rightWait.Enqueue(worker, (time[worker.id][0] + time[worker.id][2], worker.id));
            }
            
            if (rightWait.Count > 0)
            {
                var worker = rightWait.Dequeue();
                currentTime += time[worker.id][2];
                leftWork.Enqueue((worker.id, currentTime + time[worker.id][3]), currentTime + time[worker.id][3]);
            }
            else if (boxesMoved < n && leftWait.Count > 0)
            {
                var worker = leftWait.Dequeue();
                currentTime += time[worker.id][0];
                rightWork.Enqueue((worker.id, currentTime + time[worker.id][1]), currentTime + time[worker.id][1]);
                boxesMoved++;
            }
            else
            {
                currentTime++;
            }
        }
        
        return currentTime;
    }
}
```

## Complexity

- **Time:** O(n × k × log k)
- **Space:** O(k) for priority queues
