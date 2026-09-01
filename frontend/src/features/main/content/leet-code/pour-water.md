# 755. Pour Water

**Difficulty:** Medium
**Category:** Array, Simulation, Two Pointers
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given terrain `heights` and a position `k` where water drops fall one at a time, simulate `volume` drops of water: each drop first tries to flow as far left as possible while going downhill (settling at the lowest point of the first dip found), otherwise as far right as possible under the same rule, otherwise it stays at `k`. Return the final terrain heights.

### Example

```
Input: heights = [2,1,1,2,1,2,2], volume = 4, k = 3
Output: [2,2,2,3,2,2,2]
```

## Approach

For each drop, scan left from `k` while the terrain is non-increasing, tracking the last position where a strictly lower point was found (the deepest reachable dip); stop scanning as soon as the terrain rises. If such a dip exists, place the water drop there. Otherwise, perform the same scan to the right. If neither direction has a dip, the water settles at `k` itself, raising its height by one.

## C# Solution

```csharp
public class Solution
{
    public int[] PourWater(int[] heights, int volume, int k)
    {
        for (int drop = 0; drop < volume; drop++)
        {
            int bestLeft = -1;
            int i = k;
            while (i > 0 && heights[i - 1] <= heights[i])
            {
                if (heights[i - 1] < heights[i]) bestLeft = i - 1;
                i--;
            }

            if (bestLeft != -1)
            {
                heights[bestLeft]++;
                continue;
            }

            int bestRight = -1;
            i = k;
            while (i < heights.Length - 1 && heights[i + 1] <= heights[i])
            {
                if (heights[i + 1] < heights[i]) bestRight = i + 1;
                i++;
            }

            if (bestRight != -1)
                heights[bestRight]++;
            else
                heights[k]++;
        }

        return heights;
    }
}
```

## Complexity

- **Time:** `O(volume * n)`.
- **Space:** `O(1)` extra.
