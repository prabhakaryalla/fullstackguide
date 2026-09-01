# 2208. Minimum Operations to Halve Array Sum

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue)

## Problem

You are given an array `nums` of positive integers. In one operation, you can choose any number from `nums` and reduce it to exactly half its value. Note that you may choose this reduced number in future operations.

Return the minimum number of operations to reduce the sum of `nums` by at least half.

### Example

```
Input: nums = [5,19,8,1]
Output: 3
Explanation:
Initial sum = 33
Operation 1: 19 -> 9.5, sum = 23.5
Operation 2: 9.5 -> 4.75, sum = 19.25
Operation 3: 8 -> 4, sum = 15.25 (less than half of 33)
```

## Approach

Use a greedy strategy: always halve the largest number. This maximizes the reduction in each step.

Use a max heap to efficiently get and update the largest number.

## C# Solution

```csharp
public class Solution
{
    public int HalveArray(int[] nums)
    {
        PriorityQueue<double, double> maxHeap = new PriorityQueue<double, double>(
            Comparer<double>.Create((a, b) => b.CompareTo(a))
        );
        
        double totalSum = 0;
        foreach (int num in nums)
        {
            totalSum += num;
            maxHeap.Enqueue(num, num);
        }
        
        double targetSum = totalSum / 2;
        double currentSum = totalSum;
        int operations = 0;
        
        while (currentSum > targetSum)
        {
            double largest = maxHeap.Dequeue();
            double half = largest / 2;
            
            currentSum -= half;
            maxHeap.Enqueue(half, half);
            operations++;
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(n log n), where n is the number of elements
- **Space:** O(n), for the heap
