# 2233. Maximum Product After K Increments

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue)

## Problem

You are given an array of non-negative integers `nums` and an integer `k`. In each operation, you may choose any element from `nums` and increment it by 1. Return the maximum product of `nums` after at most `k` operations.

### Example

```
Input: nums = [0,4], k = 5
Output: 20
Explanation: Increment nums[0] 5 times: [5,4], product = 20
```

## Approach

Use a min-heap to always increment the smallest element. This greedy strategy maximizes the product because incrementing smaller values has a larger multiplicative impact. After k increments, compute the product of all elements modulo 10^9+7.

## C# Solution

```csharp
public class Solution
{
    public int MaximumProduct(int[] nums, int k)
    {
        var heap = new PriorityQueue<int, int>();
        foreach (var num in nums)
        {
            heap.Enqueue(num, num);
        }
        
        for (int i = 0; i < k; i++)
        {
            int min = heap.Dequeue();
            heap.Enqueue(min + 1, min + 1);
        }
        
        long product = 1;
        const int MOD = 1_000_000_007;
        while (heap.Count > 0)
        {
            product = (product * heap.Dequeue()) % MOD;
        }
        
        return (int)product;
    }
}
```

## Complexity

- **Time:** O((n + k) log n)
- **Space:** O(n)
