# 1936. Add Minimum Number of Rungs

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Given a sorted array `rungs` of distances from the floor for existing ladder rungs and an integer `dist`, the maximum safe step between consecutive rungs (or from the floor, position 0, to the first rung) is `dist`. Return the minimum number of extra rungs needed to insert so that no gap between consecutive reachable positions (including the floor) exceeds `dist`.

### Example

```
Input: rungs = [1,3,5,10], dist = 2
Output: 2
Explanation: Add a rung at 7 and 8 (or 7 and 9) to bridge the gap from 5 to 10.
```

### Constraints

- `1 <= rungs.length <= 10^5`
- `1 <= rungs[i] <= 10^9`
- `rungs` is sorted in strictly increasing order.
- `1 <= dist <= 10^9`

## Approach

Track the previous reachable height, starting at `0` (the floor). For each rung, if the gap between it and the previous height exceeds `dist`, the number of extra rungs needed to fill that gap is `ceil(gap / dist) - 1`, computed as `(gap - 1) / dist` using integer division. Sum these up while advancing the previous-height pointer to the current rung after each step.

## C# Solution

```csharp
public class Solution
{
    public int AddRungs(int[] rungs, int dist)
    {
        long prev = 0;
        long added = 0;

        foreach (int rung in rungs)
        {
            long gap = rung - prev;
            if (gap > dist)
            {
                added += (gap - 1) / dist;
            }
            prev = rung;
        }

        return (int)added;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over `rungs`.
- **Space:** `O(1)`.
