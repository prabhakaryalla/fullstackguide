# 2286. Booking Concert Tickets in Groups

**Difficulty:** Hard
**Category:** Binary Search, Design, Segment Tree, Binary Indexed Tree

## Problem

A concert hall has `n` rows numbered from `0` to `n - 1`, each with `m` seats. Design a ticket booking system that:

1. `BookingSystem(int n, int m)` initializes with `n` rows and `m` seats per row
2. `int[] gather(int k, int maxRow)` books `k` consecutive seats in the same row at or before `maxRow`. Returns `[row, startSeat]` if successful, otherwise `[]`
3. `boolean scatter(int k, int maxRow)` books `k` seats (not necessarily consecutive) in rows at or before `maxRow`. Returns `true` if successful

### Example

```
Input: ["BookingSystem","gather","gather","scatter","scatter"]
[[2,5],[4,0],[2,0],[5,1],[5,1]]
Output: [null,[0,0],[0,4],[true],[false]]
```

## Approach

Use a segment tree or similar data structure to efficiently track:
- Minimum available consecutive seats in each row
- Total available seats per row

For `gather`, binary search for the first row with at least `k` consecutive seats. For `scatter`, check if total available seats >= k, then fill greedily.

## C# Solution

```csharp
public class BookingSystem
{
    private int n, m;
    private int[] available;
    private int[] minConsecutive;
    
    public BookingSystem(int n, int m)
    {
        this.n = n;
        this.m = m;
        available = new int[n];
        minConsecutive = new int[n];
        
        for (int i = 0; i < n; i++)
        {
            available[i] = m;
            minConsecutive[i] = m;
        }
    }
    
    public int[] Gather(int k, int maxRow)
    {
        for (int row = 0; row <= maxRow; row++)
        {
            if (minConsecutive[row] >= k)
            {
                int startSeat = m - available[row];
                available[row] -= k;
                minConsecutive[row] = available[row];
                return new int[] { row, startSeat };
            }
        }
        
        return new int[0];
    }
    
    public bool Scatter(int k, int maxRow)
    {
        long total = 0;
        
        for (int row = 0; row <= maxRow; row++)
        {
            total += available[row];
        }
        
        if (total < k) return false;
        
        for (int row = 0; row <= maxRow && k > 0; row++)
        {
            int take = Math.Min(k, available[row]);
            available[row] -= take;
            minConsecutive[row] = available[row];
            k -= take;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n) for gather and scatter (can be optimized to O(log n) with segment tree)
- **Space:** O(n) for tracking row states
