# 849. Maximize Distance to Closest Person

**Difficulty:** Medium
**Category:** Array

## Problem

Given an array `seats` where `1` means occupied and `0` means empty, you must sit in an empty seat to maximize the distance to the closest occupied seat. Return that maximum possible distance.

### Example

```
Input: seats = [1,0,0,0,1,0,1]
Output: 2
```

## Approach

Track the position of the previously seen occupied seat while scanning left to right. For each occupied seat found, update the best distance: if it's the first occupied seat encountered, the best possible distance sitting before it is simply its index (sitting at position 0); otherwise, the best distance between two occupied seats is half the gap between them. After the scan, also consider the distance from the last occupied seat to the end of the row.

## C# Solution

```csharp
public class Solution
{
    public int MaxDistToClosest(int[] seats)
    {
        int n = seats.Length;
        int maxDist = 0;
        int prevSeat = -1;

        for (int i = 0; i < n; i++)
        {
            if (seats[i] == 1)
            {
                if (prevSeat == -1)
                    maxDist = i;
                else
                    maxDist = Math.Max(maxDist, (i - prevSeat) / 2);

                prevSeat = i;
            }
        }

        maxDist = Math.Max(maxDist, n - 1 - prevSeat);

        return maxDist;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
