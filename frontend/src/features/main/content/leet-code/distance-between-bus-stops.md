# 1184. Distance Between Bus Stops

**Difficulty:** Easy
**Category:** Array

## Problem

Bus stops are arranged in a circle described by a `distance` array, where `distance[i]` is the distance between stop `i` and stop `i + 1` (wrapping from the last stop back to the first). Given a `start` and `destination` stop, return the shortest distance between them along the circle.

### Example

```
Input: distance = [1,2,3,4], start = 0, destination = 1
Output: 1
```

## Approach

Sum the distances along one direction of the circular route between the two stops (from the smaller index to the larger one), and compare it against the total circle length minus that sum, which represents the other direction. The smaller of the two is the answer.

## C# Solution

```csharp
public class Solution
{
    public int DistanceBetweenBusStops(int[] distance, int start, int destination)
    {
        int a = Math.Min(start, destination), b = Math.Max(start, destination);
        int clockwise = 0, total = 0;

        for (int i = 0; i < distance.Length; i++)
        {
            total += distance[i];
            if (i >= a && i < b) clockwise += distance[i];
        }

        return Math.Min(clockwise, total - clockwise);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
