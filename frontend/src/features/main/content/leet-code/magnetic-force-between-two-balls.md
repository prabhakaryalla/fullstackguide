# 1552. Magnetic Force Between Two Balls

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting

## Problem

Given an array `position` representing basket positions, place `m` balls into `m` distinct baskets so that the minimum distance between any two balls is as large as possible. Return that maximum possible minimum distance.

### Example

```
Input: position = [1,2,3,4,7], m = 3
Output: 3
```

## Approach

Sort the positions. Binary search on the candidate answer `d` — the minimum allowed distance between placed balls. For a given `d`, greedily place a ball at the first (smallest) position, then repeatedly place the next ball at the first available position that is at least `d` away from the last placed one, counting how many balls fit. If the count reaches `m`, `d` is feasible. Binary search for the largest feasible `d`.

## C# Solution

```csharp
public class Solution
{
    public int MaxDistance(int[] position, int m)
    {
        Array.Sort(position);
        int lo = 1;
        int hi = position[^1] - position[0];
        int best = 0;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;

            if (CanPlace(position, m, mid))
            {
                best = mid;
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return best;
    }

    private bool CanPlace(int[] position, int m, int minDistance)
    {
        int count = 1;
        int lastPlaced = position[0];

        for (int i = 1; i < position.Length; i++)
        {
            if (position[i] - lastPlaced >= minDistance)
            {
                count++;
                lastPlaced = position[i];

                if (count >= m)
                {
                    return true;
                }
            }
        }

        return count >= m;
    }
}
```

## Complexity

- **Time:** `O(n log n + n log(maxDistance))` — sorting plus binary search, each feasibility check taking `O(n)`.
- **Space:** `O(log n)` for the sort.
