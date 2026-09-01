# 3386. Button with Longest Push Time

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

Given `events` where each entry `[index, time]` records that button `index` was pressed, finishing at cumulative time `time` (events sorted by time), the duration of a press is `time - previousTime`. Return the index of the button with the longest total press duration; break ties by the smallest index.

### Example

Input: `events = [[1,2],[2,5],[3,9]]`
Output: `3` — durations are `2,3,4` for buttons `1,2,3` respectively; button 3 has the longest press.

## Approach

Track the previous event's time (starting at 0). For each event, compute its duration as the difference from the previous time, and update the best (index, duration) pair using duration greater than current best, or equal duration with a smaller index.

## C# Solution

```csharp
public class Solution 
{
    public int ButtonWithLongestTime(int[][] events) 
    {
        int bestIndex = events[0][0];
        int bestDuration = events[0][1];
        int prevTime = events[0][1];

        for (int i = 1; i < events.Length; i++) 
        {
            int idx = events[i][0], time = events[i][1];
            int duration = time - prevTime;
            if (duration > bestDuration || (duration == bestDuration && idx < bestIndex)) 
            {
                bestDuration = duration;
                bestIndex = idx;
            }
            prevTime = time;
        }
        return bestIndex;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
