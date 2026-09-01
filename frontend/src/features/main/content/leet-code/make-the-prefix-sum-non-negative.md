# 2599. Make the Prefix Sum Non-negative

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue)

## Problem

You are given a 0-indexed integer array `nums`. You can apply the following operation any number of times:

- Pick any element from `nums` and put it at the end of `nums`.

Return the minimum number of operations required to make the prefix sum array of `nums` non-negative at every index.

### Example

```
Input: nums = [2,-3,-1,3]
Output: 2
Explanation: 
Move -3 to end: [2,-1,3,-3]
Move -1 to end: [2,3,-3,-1]
Prefix sums: [2,5,2,1] - all non-negative
```

## Approach

Use a greedy approach with a min-heap. Traverse the array while maintaining a running prefix sum. When the prefix sum becomes negative, we need to postpone some negative elements. Use a min-heap to track negative elements we've seen so far. When the prefix sum goes negative, remove the most negative element (top of heap) and add it to a postponed count.

## C# Solution

```csharp
public class Solution
{
    public int MakePrefSumNonNegative(int[] nums)
    {
        var minHeap = new PriorityQueue<int, int>();
        long prefixSum = 0;
        int operations = 0;
        
        foreach (int num in nums)
        {
            prefixSum += num;
            
            if (num < 0)
            {
                minHeap.Enqueue(num, num);
            }
            
            while (prefixSum < 0 && minHeap.Count > 0)
            {
                int smallest = minHeap.Dequeue();
                prefixSum -= smallest;
                operations++;
            }
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n) for the heap
