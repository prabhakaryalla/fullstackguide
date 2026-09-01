# 1482. Minimum Number of Days to Make m Bouquets

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given `bloomDay[i]` (the day flower `i` blooms), and integers `m` and `k`, you must make exactly `m` bouquets, each using `k` **adjacent** already-bloomed flowers. Return the minimum number of days needed to make all `m` bouquets, or `-1` if impossible.

### Example

```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
```

## Approach

If `m * k` exceeds the total number of flowers, it's immediately impossible. Otherwise, binary search on the number of days `d`: for a candidate `d`, greedily scan the flowers left to right, counting consecutive already-bloomed flowers (bloom day `<= d`) and forming a bouquet every time `k` consecutive bloomed flowers accumulate, resetting the streak on any unbloomed flower. If the resulting bouquet count reaches `m`, `d` days are sufficient; binary search for the smallest such `d`.

## C# Solution

```csharp
public class Solution
{
    public int MinDays(int[] bloomDay, int m, int k)
    {
        if ((long)m * k > bloomDay.Length) return -1;

        int lo = bloomDay.Min(), hi = bloomDay.Max();

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (CanMake(bloomDay, m, k, mid)) hi = mid;
            else lo = mid + 1;
        }

        return lo;
    }

    private bool CanMake(int[] bloomDay, int m, int k, int day)
    {
        int bouquets = 0, consecutive = 0;

        foreach (var b in bloomDay)
        {
            if (b <= day)
            {
                consecutive++;
                if (consecutive == k)
                {
                    bouquets++;
                    consecutive = 0;
                }
            }
            else
            {
                consecutive = 0;
            }
        }

        return bouquets >= m;
    }
}
```

## Complexity

- **Time:** `O(n log(max(bloomDay)))`.
- **Space:** `O(1)`.
