# 3723. Maximize Sum of Squares of Digits

**Difficulty:** Medium
**Category:** Greedy, Heap (Priority Queue), Math

## Problem

You are given an array `digits` where each value is between 0 and 9, and an integer `k` representing the total number of increment operations available. Each operation adds 1 to any single digit, as long as the digit does not exceed 9. Return the maximum possible sum of squares of the digits after using at most `k` operations.

### Example

digits = [1,2], k = 3 → best use: increment the 2 three times to 5 → squares 1 + 25 = 26, beats spreading increments out (e.g. 1→2,2→4 gives 4+16=20).

## Approach

Since `(x+1)^2 - x^2 = 2x + 1` grows with `x`, each increment yields the most benefit when applied to the currently largest digit. Use a max-heap: repeatedly pop the largest digit, increment it (stop once it reaches 9), and push it back, for up to `k` operations. Finally sum the squares.

## C# Solution

```csharp
public class Solution 
{
    public long MaximizeSumOfSquares(int[] digits, int k) 
    {
        var heap = new PriorityQueue<int, int>();
        foreach (int d in digits) heap.Enqueue(d, -d);

        for (int op = 0; op < k && heap.Count > 0; op++) 
        {
            int top = heap.Dequeue();
            if (top < 9) 
            {
                heap.Enqueue(top + 1, -(top + 1));
            } 
            else 
            {
                heap.Enqueue(top, -top);
                break;
            }
        }

        long sum = 0;
        while (heap.Count > 0) 
        {
            int d = heap.Dequeue();
            sum += (long)d * d;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O((n + k) log n)
- **Space:** O(n)
