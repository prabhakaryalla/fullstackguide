# 3264. Final Array State After K Multiplication Operations I

**Difficulty:** Easy
**Category:** Array, Heap (Priority Queue), Math, Simulation

## Problem
Given an integer array, a number of operations `k`, and a multiplier, repeatedly perform this operation `k` times: find the smallest value in the array (breaking ties by choosing the leftmost occurrence), and multiply it by the multiplier. Return the final state of the array after all operations.

## Approach
Use a min-heap (priority queue) storing pairs of `(value, originalIndex)`, initialized with all array elements. For each of the `k` operations, pop the smallest-valued pair from the heap, multiply its value by the multiplier, and push it back in. After all operations, drain the heap and place each remaining `(value, index)` pair back into its original index in the result array.

## C# Solution
```csharp
public class Solution {
    public int[] GetFinalState(int[] nums, int k, int multiplier) {
        int[] ans = new int[nums.Length];
        PriorityQueue<(int num, int i), (int, int)> minHeap = new PriorityQueue<(int, int), (int, int)>();

        for (int i = 0; i < nums.Length; i++)
            minHeap.Enqueue((nums[i], i), (nums[i], i));

        while (k-- > 0) {
            var (num, i) = minHeap.Dequeue();
            int newNum = num * multiplier;
            minHeap.Enqueue((newNum, i), (newNum, i));
        }

        while (minHeap.Count > 0) {
            var (num, i) = minHeap.Dequeue();
            ans[i] = num;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n + k log n)
- Space: O(n)
