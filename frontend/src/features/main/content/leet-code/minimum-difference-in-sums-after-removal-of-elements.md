# 2163. Minimum Difference in Sums After Removal of Elements

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Heap (Priority Queue)

## Problem

You are given a 0-indexed integer array `nums` consisting of `3 * n` elements.

Remove exactly `n` elements from `nums` such that the sum of the first `n` elements is minimized and the sum of the last `n` elements is maximized.

Return the minimum possible value of the difference between the sums of the two resulting arrays.

### Example

```
Input: nums = [3,1,2]
Output: -1
Explanation: Remove middle element 1. First part: [3], last part: [2]. Diff = 3 - 2 = 1.
Actually this is for n=1. Let me reconsider.
```

## Approach

The key insight: after removing `n` elements, we have two non-overlapping groups of `n` elements each. We want to minimize the left sum and maximize the right sum.

Use prefix/suffix optimization with heaps:
1. For each possible split point, calculate:
   - Minimum sum of n elements from left side using a max heap
   - Maximum sum of n elements from right side using a min heap
2. The answer is the minimum difference across all valid split points

## C# Solution

```csharp
public class Solution
{
    public long MinimumDifference(int[] nums)
    {
        int n = nums.Length / 3;
        
        // Calculate minimum sum of first n elements for each prefix
        var minSumLeft = new long[nums.Length + 1];
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        long sum = 0;
        
        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];
            maxHeap.Enqueue(nums[i], nums[i]);
            
            if (maxHeap.Count > n)
            {
                sum -= maxHeap.Dequeue();
            }
            
            minSumLeft[i + 1] = (maxHeap.Count == n) ? sum : long.MaxValue;
        }
        
        // Calculate maximum sum of last n elements for each suffix
        var maxSumRight = new long[nums.Length + 1];
        var minHeap = new PriorityQueue<int, int>();
        sum = 0;
        
        for (int i = nums.Length - 1; i >= 0; i--)
        {
            sum += nums[i];
            minHeap.Enqueue(nums[i], nums[i]);
            
            if (minHeap.Count > n)
            {
                sum -= minHeap.Dequeue();
            }
            
            maxSumRight[i] = (minHeap.Count == n) ? sum : long.MinValue;
        }
        
        // Find minimum difference
        long result = long.MaxValue;
        
        for (int i = n; i <= 2 * n; i++)
        {
            result = Math.Min(result, minSumLeft[i] - maxSumRight[i]);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) for heap operations
- **Space:** O(n) for heaps and arrays
