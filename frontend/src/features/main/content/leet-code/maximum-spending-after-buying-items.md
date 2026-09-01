# 2931. Maximum Spending After Buying Items

**Difficulty:** Hard
**Category:** Array, Greedy, Heap (Priority Queue)

## Problem

You are given an `m x n` matrix `values` representing shops with items, where `values[i]` is sorted in non-increasing order. You can only buy the last item from each row. Each day d (starting from 1), if you buy an item with value v, you gain `v * d` points. Return the maximum total points you can obtain by buying all items.

### Example

```
Input: values = [[8,5,2],[6,4,1],[9,7,3]]
Output: 285
Explanation: Buy items in optimal order to maximize points.
```

## Approach

Use a min-heap to always buy the smallest available item each day (to save larger values for later days with higher multipliers). Initially, add the last item from each row to the heap. After buying an item from row i, add the next item from that row to the heap. Continue for m*n days.

## C# Solution

```csharp
public class Solution 
{
    public long MaxSpending(int[][] values) 
    {
        int m = values.Length;
        int n = values[0].Length;
        var heap = new PriorityQueue<(int val, int row, int col), int>();
        
        for (int i = 0; i < m; i++) 
        {
            heap.Enqueue((values[i][n - 1], i, n - 1), values[i][n - 1]);
        }
        
        long total = 0;
        int day = 1;
        
        while (heap.Count > 0) 
        {
            var (val, row, col) = heap.Dequeue();
            total += (long)val * day;
            day++;
            
            if (col > 0) 
            {
                heap.Enqueue((values[row][col - 1], row, col - 1), values[row][col - 1]);
            }
        }
        
        return total;
    }
}
```

## Complexity

- **Time:** O(m*n * log m)
- **Space:** O(m)
