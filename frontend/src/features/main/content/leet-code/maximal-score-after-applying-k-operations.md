# 2530. Maximal Score After Applying K Operations

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue)

## Problem

You are given an integer array `nums` and an integer `k`. In one operation, you can choose any element from `nums` and add it to your score, then replace that element with `ceil(nums[i] / 3)`.

Return the maximum possible score after applying exactly `k` operations.

### Example

```
Input: nums = [10,10,10,10,10], k = 5
Output: 50
Explanation: Pick the largest element (10) each time. Score = 10+10+10+10+10 = 50.
```

## Approach

Use a max heap (priority queue) to always select the largest element. Add it to the score, then push back `ceil(val / 3.0)` into the heap. Repeat k times.

## C# Solution

```csharp
public class Solution
{
    public long MaxKelements(int[] nums, int k)
    {
        PriorityQueue<long, long> pq = new PriorityQueue<long, long>(
            Comparer<long>.Create((a, b) => b.CompareTo(a))
        );
        
        foreach (int num in nums)
        {
            pq.Enqueue(num, num);
        }
        
        long score = 0;
        
        for (int i = 0; i < k; i++)
        {
            long maxVal = pq.Dequeue();
            score += maxVal;
            
            long newVal = (long)Math.Ceiling(maxVal / 3.0);
            pq.Enqueue(newVal, newVal);
        }
        
        return score;
    }
}
```

## Complexity

- **Time:** O(n + k × log n)
- **Space:** O(n) for the priority queue
