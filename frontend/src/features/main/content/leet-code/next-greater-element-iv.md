# 2454. Next Greater Element IV

**Difficulty:** Hard
**Category:** Array, Binary Search, Stack, Heap (Priority Queue), Monotonic Stack

## Problem

Given a 0-indexed array `nums` of non-negative integers, return an array `answer` where `answer[i]` is the second greater element to the right of `nums[i]`. If there is no such element, `answer[i]` is -1.

The second greater element is the first element to the right that is greater than the first greater element.

### Example

```
Input: nums = [2,4,0,9,6]
Output: [9,6,9,-1,-1]
Explanation:
Index 0: first greater = 4, second greater = 9
Index 1: first greater = 9, second greater = 6
Index 2: first greater = 9, second greater = -1
```

## Approach

Use two data structures:
1. A monotonic stack to track elements waiting for their first greater element
2. A min-heap to track elements that found their first greater element and are waiting for their second

Process elements left to right. For each element, pop from the heap all elements smaller than it (these find their second greater). Then, pop from the stack all elements smaller than it (these find their first greater and move to the heap).

## C# Solution

```csharp
public class Solution
{
    public int[] SecondGreaterElement(int[] nums)
    {
        int n = nums.Length;
        int[] result = new int[n];
        Array.Fill(result, -1);
        
        var stack = new Stack<int>(); // Waiting for first greater
        var heap = new PriorityQueue<int, int>(); // Waiting for second greater
        
        for (int i = 0; i < n; i++)
        {
            // Process elements waiting for second greater
            while (heap.Count > 0 && nums[heap.Peek()] < nums[i])
            {
                int idx = heap.Dequeue();
                result[idx] = nums[i];
            }
            
            // Process elements waiting for first greater
            var temp = new List<int>();
            while (stack.Count > 0 && nums[stack.Peek()] < nums[i])
            {
                temp.Add(stack.Pop());
            }
            
            // Move to heap (waiting for second greater)
            foreach (int idx in temp)
            {
                heap.Enqueue(idx, nums[idx]);
            }
            
            stack.Push(i);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) where n is the length of nums
- **Space:** O(n) for the stack and heap
