# 2386. Find the K-Sum of an Array

**Difficulty:** Hard
**Category:** Array, Sorting, Heap (Priority Queue)

## Problem

You are given an integer array `nums` and a positive integer `k`. You can choose any subsequence of the array and sum all of its elements together.

We define the K-Sum of the array as the `k-th` largest subsequence sum that can be obtained (not necessarily distinct).

Return the K-Sum of the array.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

### Example

```
Input: nums = [2,4,-2], k = 5
Output: 2
Explanation: The subsequence sums are: [], [2], [4], [-2], [2,4], [2,-2], [4,-2], [2,4,-2]
Sorted: 4, 6, 2, 2, 0, -2, -4
The 5th largest is 2
```

## Approach

Convert all negatives to positives. The maximum sum is the sum of all positive numbers. Use a min-heap to generate the next k-1 largest sums by subtracting elements (similar to finding kth smallest in a sorted matrix).

## C# Solution

```csharp
public class Solution
{
    public long KSum(int[] nums, int k)
    {
        long maxSum = 0;
        var absNums = new List<long>();
        
        foreach (int num in nums)
        {
            if (num >= 0)
            {
                maxSum += num;
                absNums.Add(num);
            }
            else
            {
                absNums.Add(-num);
            }
        }
        
        absNums.Sort();
        
        var pq = new PriorityQueue<(long sum, int idx), long>();
        pq.Enqueue((0, 0), 0);
        
        for (int i = 1; i < k; i++)
        {
            var (currSum, idx) = pq.Dequeue();
            
            if (idx < absNums.Count)
            {
                pq.Enqueue((currSum + absNums[idx], idx + 1), currSum + absNums[idx]);
                
                if (idx > 0)
                {
                    pq.Enqueue((currSum + absNums[idx] - absNums[idx - 1], idx + 1), 
                              currSum + absNums[idx] - absNums[idx - 1]);
                }
            }
        }
        
        return maxSum - pq.Peek().sum;
    }
}
```

## Complexity

- **Time:** O(n log n + k log k)
- **Space:** O(n + k)
