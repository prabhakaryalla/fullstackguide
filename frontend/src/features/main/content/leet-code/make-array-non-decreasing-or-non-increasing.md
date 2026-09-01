# 2263. Make Array Non-decreasing or Non-increasing

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given an integer array `nums` and an integer `k`. In one operation, you can change any element to any value. Return the minimum number of operations to make the array either non-decreasing or non-increasing.

### Example

```
Input: nums = [3,2,4,5,0], k = 3
Output: 2
```

## Approach

This is a complex DP problem. For each position, try to determine the optimal value to transform it to, considering the constraint that at most k operations can change elements. Use dynamic programming to track the minimum operations needed to reach each state.

## C# Solution

```csharp
public class Solution
{
    public int ConvertArray(int[] nums)
    {
        return Math.Min(MakeNonDecreasing(nums), MakeNonIncreasing(nums));
    }
    
    private int MakeNonDecreasing(int[] nums)
    {
        var pq = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        int operations = 0;
        
        foreach (int num in nums)
        {
            if (pq.Count > 0 && pq.Peek() > num)
            {
                operations += pq.Dequeue() - num;
                pq.Enqueue(num, num);
            }
            pq.Enqueue(num, num);
        }
        
        return operations;
    }
    
    private int MakeNonIncreasing(int[] nums)
    {
        var pq = new PriorityQueue<int, int>();
        int operations = 0;
        
        foreach (int num in nums)
        {
            if (pq.Count > 0 && pq.Peek() < num)
            {
                operations += num - pq.Dequeue();
                pq.Enqueue(num, num);
            }
            pq.Enqueue(num, num);
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
