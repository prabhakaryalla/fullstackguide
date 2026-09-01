# 335. Self Crossing

**Difficulty:** Hard
**Category:** Array, Math, Geometry

## Problem

Given an array of integers `distance` where you walk north, then west, then south, then east, repeating in that order and turning counterclockwise 90 degrees after each move (walking `distance[i]` units on the `i`th move), return `true` if the path self-intersects.

### Example

```
Input: distance = [2,1,1,2]
Output: true
```

### Constraints

- `1 <= distance.length <= 10^5`
- `1 <= distance[i] <= 10^5`

## Approach

Rather than simulating full geometry, classify every new segment against the three most recent prior segments using three known crossing patterns: the current segment hitting the segment three moves back, the current segment overlapping the segment four moves back due to equal lengths, and the current segment crossing the segment five moves back in a spiral. Checking these three fixed-lookback conditions at each step covers every possible self-crossing case.

## C# Solution

```csharp
public class Solution
{
    public bool IsSelfCrossing(int[] distance)
    {
        int n = distance.Length;
        for (int i = 3; i < n; i++)
        {
            if (distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3])
                return true;

            if (i >= 4 && distance[i - 1] == distance[i - 3]
                && distance[i] + distance[i - 4] >= distance[i - 2])
                return true;

            if (i >= 5 && distance[i - 2] >= distance[i - 4]
                && distance[i] + distance[i - 4] >= distance[i - 2]
                && distance[i - 1] <= distance[i - 3]
                && distance[i - 1] + distance[i - 5] >= distance[i - 3])
                return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass checking a constant number of prior segments.
- **Space:** `O(1)`.
