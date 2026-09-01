# 2462. Total Cost to Hire K Workers

**Difficulty:** Medium
**Category:** Array, Two Pointers, Heap (Priority Queue), Simulation

## Problem

You are given a 0-indexed integer array `costs` where `costs[i]` is the cost of hiring the ith worker. You need to hire exactly `k` workers. The hiring process follows these rules:

- In each hiring round, choose either the cheapest worker from the first `candidates` workers or from the last `candidates` workers
- If there are fewer than `candidates` workers left, choose from all remaining workers

Return the total cost to hire exactly `k` workers.

### Example

```
Input: costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
Output: 11
Explanation:
Round 1: First 4 = [17,12,10,2], Last 4 = [2,11,20,8]. Hire worker at cost 2.
Round 2: First 4 = [17,12,10,7], Last 4 = [11,20,8]. Hire worker at cost 2.
Round 3: First 4 = [17,12,10,7], Last 4 = [11,20,8]. Hire worker at cost 7.
Total = 2 + 2 + 7 = 11.
```

## Approach

Use two min-heaps: one for the first `candidates` workers and one for the last `candidates` workers. In each round, pop the minimum from both heaps, hire the cheaper one, and refill the heap from the remaining workers.

## C# Solution

```csharp
public class Solution
{
    public long TotalCost(int[] costs, int k, int candidates)
    {
        int n = costs.Length;
        var leftHeap = new PriorityQueue<int, int>();
        var rightHeap = new PriorityQueue<int, int>();
        
        int left = 0;
        int right = n - 1;
        
        // Initialize heaps
        for (int i = 0; i < candidates && left <= right; i++)
        {
            leftHeap.Enqueue(costs[left], costs[left]);
            left++;
        }
        
        for (int i = 0; i < candidates && left <= right; i++)
        {
            rightHeap.Enqueue(costs[right], costs[right]);
            right--;
        }
        
        long totalCost = 0;
        
        for (int i = 0; i < k; i++)
        {
            int leftMin = leftHeap.Count > 0 ? leftHeap.Peek() : int.MaxValue;
            int rightMin = rightHeap.Count > 0 ? rightHeap.Peek() : int.MaxValue;
            
            if (leftMin <= rightMin)
            {
                totalCost += leftMin;
                leftHeap.Dequeue();
                
                if (left <= right)
                {
                    leftHeap.Enqueue(costs[left], costs[left]);
                    left++;
                }
            }
            else
            {
                totalCost += rightMin;
                rightHeap.Dequeue();
                
                if (left <= right)
                {
                    rightHeap.Enqueue(costs[right], costs[right]);
                    right--;
                }
            }
        }
        
        return totalCost;
    }
}
```

## Complexity

- **Time:** O((k + candidates) log candidates)
- **Space:** O(candidates) for the heaps
