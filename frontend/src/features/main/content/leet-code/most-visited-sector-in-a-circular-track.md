# 1560. Most Visited Sector in a Circular Track

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

Given a circular track with `n` sectors labeled `1` to `n`, and a list `rounds` giving the sequence of start/checkpoint sectors visited (moving in increasing order, wrapping around from `n` to `1`), return the list of the most visited sector(s), in ascending order.

### Example

```
Input: n = 4, rounds = [1,3,1,2]
Output: [1,2]
```

## Approach

Rather than simulating every single sector step for every round (which could be slow), notice that every sector between two consecutive checkpoints gets visited exactly once, except the sectors between the very first and very last checkpoint, which get an extra visit if the marathon starts and ends partway through a lap. Since only the first and last checkpoint values matter for determining which sectors are "extra", increment a counter for every sector from `rounds[0]` to `rounds[^1]` inclusive (wrapping around if needed), then return every sector achieving the maximum count.

## C# Solution

```csharp
public class Solution
{
    public IList<int> MostVisited(int n, int[] rounds)
    {
        int[] count = new int[n + 1];
        int start = rounds[0];
        int end = rounds[^1];

        int sector = start;
        while (true)
        {
            count[sector]++;
            if (sector == end)
            {
                break;
            }
            sector = sector % n + 1;
        }

        int maxCount = 0;
        for (int i = 1; i <= n; i++)
        {
            maxCount = Math.Max(maxCount, count[i]);
        }

        var result = new List<int>();
        for (int i = 1; i <= n; i++)
        {
            if (count[i] == maxCount)
            {
                result.Add(i);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — marking the sectors between the first and last checkpoint, plus a scan for the maximum.
- **Space:** `O(n)` for the visit-count array.
