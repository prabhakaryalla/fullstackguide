# 1962. Remove Stones to Minimize the Total

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue)

## Problem

Given an array `piles` where `piles[i]` is the number of stones in pile `i`, and an integer `k`, perform exactly `k` operations where each operation picks a pile and removes `floor(piles[i] / 2)` stones from it. Return the minimum possible total number of stones remaining after `k` operations.

### Example

```
Input: piles = [5,4,9], k = 2
Output: 12
Explanation: Halve pile 9 -> 4 remaining removed 5 (pile becomes 5)? Actually pick pile with 9: removes floor(9/2)=4, leaving 5; then pick pile with 5 (either): removes floor(5/2)=2, leaving 3. Total = 5+4+3=12 in optimal order.
```

### Constraints

- `1 <= piles.length <= 10^5`
- `1 <= piles[i] <= 10^4`
- `1 <= k <= 10^5`

## Approach

Greedily always halve the currently largest pile, since removing `floor(x/2)` from the largest value gives the biggest absolute reduction. Use a max-heap: repeat `k` times, pop the largest pile, subtract `floor(value/2)`, and push the new value back. After `k` operations, sum all remaining values.

## C# Solution

```csharp
public class Solution
{
    public int MinStoneSum(int[] piles, int k)
    {
        var maxHeap = new PriorityQueue<int, int>();
        foreach (int p in piles)
        {
            maxHeap.Enqueue(p, -p);
        }

        for (int i = 0; i < k; i++)
        {
            int largest = maxHeap.Dequeue();
            int reduced = largest - largest / 2;
            maxHeap.Enqueue(reduced, -reduced);
        }

        int total = 0;
        while (maxHeap.Count > 0)
        {
            total += maxHeap.Dequeue();
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O((n + k) log n)` — heap operations for the initial build and each of the `k` operations.
- **Space:** `O(n)` for the heap.
