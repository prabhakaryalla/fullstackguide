# 1040. Moving Stones Until Consecutive II

**Difficulty:** Medium
**Category:** Array, Math, Sorting, Sliding Window

## Problem

Given the positions of `n` stones on a number line, in one move pick up an endpoint stone and move it to any unoccupied position such that it's no longer an endpoint. Return `[minimumMoves, maximumMoves]` needed to make the stones occupy `n` consecutive positions.

### Example

```
Input: stones = [7,4,9]
Output: [1,2]
```

## Approach

Sort the stones. The maximum moves come from whichever endpoint has the larger internal gap: `max(stones[n-1] - stones[1] - (n-2), stones[n-2] - stones[0] - (n-2))`, since one endpoint can be repeatedly refilled while the other stays fixed. For the minimum, slide a window of width `n` (in position value) across the sorted stones to find the largest count of stones already inside some window of `n` consecutive integers; the rest need `n - count` moves to fill in — except when exactly `n - 1` stones already occupy a solid consecutive run with no internal gaps, which needs `2` moves instead of `1` because the sole missing slot can't be filled from the lone outside stone in a single move without violating the endpoint rule.

## C# Solution

```csharp
public class Solution
{
    public int[] NumMovesStonesII(int[] stones)
    {
        Array.Sort(stones);
        int n = stones.Length;

        int maxMoves = Math.Max(
            stones[n - 1] - stones[1] - (n - 2),
            stones[n - 2] - stones[0] - (n - 2));

        int minMoves = int.MaxValue;
        int left = 0;

        for (int right = 0; right < n; right++)
        {
            while (stones[right] - stones[left] >= n) left++;

            int count = right - left + 1;

            if (count == n - 1 && stones[right] - stones[left] == n - 2)
            {
                minMoves = Math.Min(minMoves, 2);
            }
            else
            {
                minMoves = Math.Min(minMoves, n - count);
            }
        }

        return new[] { minMoves, maxMoves };
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort, `O(n)` for the sliding window.
- **Space:** `O(1)` extra.
