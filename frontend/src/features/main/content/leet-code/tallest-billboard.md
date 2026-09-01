# 956. Tallest Billboard

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given a collection of steel rod lengths, you must weld some into one support and the rest into another support of a billboard, requiring both supports to have equal total height. Any leftover rods are discarded. Return the maximum possible height of the two equal supports, or `0` if no positive height is achievable.

### Example

```
Input: rods = [1,2,3,6]
Output: 6
```

## Approach

Track a map from `diff` (difference between the taller and shorter support) to the maximum achievable "taller support" total sum for that difference. For each rod, it can be added to the taller support (increasing the difference) or to the shorter support (decreasing, or possibly flipping, the difference); update the map with whichever choice yields a larger taller-side sum for the resulting difference. The answer is the best taller-side sum recorded for `diff == 0`.

## C# Solution

```csharp
public class Solution
{
    public int TallestBillboard(int[] rods)
    {
        var dp = new Dictionary<int, int> { [0] = 0 };

        foreach (var rod in rods)
        {
            var next = new Dictionary<int, int>(dp);

            foreach (var (diff, taller) in dp)
            {
                int shorter = taller - diff;

                int newDiff1 = diff + rod;
                int newTaller1 = taller + rod;
                if (!next.ContainsKey(newDiff1) || next[newDiff1] < newTaller1) next[newDiff1] = newTaller1;

                int newShorter2 = shorter + rod;
                int newDiff2 = Math.Abs(newShorter2 - taller);
                int newTaller2 = Math.Max(newShorter2, taller);
                if (!next.ContainsKey(newDiff2) || next[newDiff2] < newTaller2) next[newDiff2] = newTaller2;
            }

            dp = next;
        }

        return dp.GetValueOrDefault(0, 0);
    }
}
```

## Complexity

- **Time:** `O(n * D)` where `D` is the number of distinct achievable differences.
- **Space:** `O(D)`.
