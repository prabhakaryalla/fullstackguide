# 2558. Take Gifts From the Richest Pile

**Difficulty:** Easy
**Category:** Array, Heap (Priority Queue), Simulation

## Problem

You are given an integer array `gifts` denoting the number of gifts in various piles. Every second, you do the following:

- Choose the pile with the maximum number of gifts
- If there is more than one pile with the maximum, choose any
- Leave behind `floor(sqrt(gifts[i]))` gifts in that pile and take the rest

Return the number of gifts remaining after `k` seconds.

### Example

```
Input: gifts = [25,64,9,4,100], k = 4
Output: 29
Explanation:
After 1 sec: Take from pile with 100, leave floor(sqrt(100))=10 → [25,64,9,4,10]
After 2 sec: Take from pile with 64, leave 8 → [25,8,9,4,10]
After 3 sec: Take from pile with 25, leave 5 → [5,8,9,4,10]
After 4 sec: Take from pile with 10, leave 3 → [5,8,9,4,3]
Sum = 29
```

## Approach

Use a max-heap (priority queue) to efficiently find and update the pile with the maximum gifts each second.

For each of the `k` seconds:
1. Extract the maximum element from the heap
2. Compute `floor(sqrt(max))`
3. Add this value back to the heap

After `k` operations, sum all remaining elements in the heap.

## C# Solution

```csharp
public class Solution
{
    public long PickGifts(int[] gifts, int k)
    {
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b - a));
        
        foreach (int gift in gifts)
            maxHeap.Enqueue(gift, gift);
        
        for (int i = 0; i < k; i++)
        {
            int maxGift = maxHeap.Dequeue();
            int remaining = (int)Math.Floor(Math.Sqrt(maxGift));
            maxHeap.Enqueue(remaining, remaining);
        }
        
        long sum = 0;
        while (maxHeap.Count > 0)
            sum += maxHeap.Dequeue();
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(n log n + k log n) for heap operations
- **Space:** O(n) for the heap
