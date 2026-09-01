# 2593. Find Score of an Array After Marking All Elements

**Difficulty:** Medium
**Category:** Array, Sorting, Heap (Priority Queue), Simulation

## Problem

You are given an array `nums` consisting of positive integers. Starting with a score of 0, apply the following algorithm:

1. Choose the smallest unmarked integer. If there's a tie, choose the one with the smallest index.
2. Add the value to your score.
3. Mark the chosen element and its two adjacent elements.
4. Repeat until all elements are marked.

Return the score you get after applying the algorithm.

### Example

```
Input: nums = [2,1,3,4,5,2]
Output: 7
Explanation: 
Choose 1 at index 1, score = 1, mark indices 0,1,2
Choose 2 at index 5, score = 3, mark indices 4,5
Choose 4 at index 3, score = 7, mark index 3
```

## Approach

Create a min-heap containing all elements with their indices. Also maintain a boolean array to track marked elements. Repeatedly extract the minimum unmarked element, add it to the score, and mark it along with its neighbors.

## C# Solution

```csharp
public class Solution
{
    public long FindScore(int[] nums)
    {
        int n = nums.Length;
        var marked = new bool[n];
        var pq = new PriorityQueue<(int value, int index), (int, int)>();
        
        for (int i = 0; i < n; i++)
        {
            pq.Enqueue((nums[i], i), (nums[i], i));
        }
        
        long score = 0;
        
        while (pq.Count > 0)
        {
            var (value, index) = pq.Dequeue();
            
            if (marked[index]) continue;
            
            score += value;
            marked[index] = true;
            
            if (index > 0) marked[index - 1] = true;
            if (index < n - 1) marked[index + 1] = true;
        }
        
        return score;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
