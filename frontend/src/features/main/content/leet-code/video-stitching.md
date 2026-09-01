# 1024. Video Stitching

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy

## Problem

Given clips `clips[i] = [starti, endi]` describing sub-clips of a video and an integer `time`, return the minimum number of clips needed to cover the entire range `[0, time]`. Return `-1` if it's impossible.

### Example

```
Input: clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10
Output: 3
```

## Approach

This mirrors the "Jump Game II" pattern. For each integer second `s` in `[0, time)`, precompute the farthest end reachable by any clip that starts at or before `s`. Then greedily extend coverage: track the farthest reachable point overall, and whenever the scan reaches the current covered boundary, "use" a clip to jump to the farthest reachable point (or fail if no progress can be made).

## C# Solution

```csharp
public class Solution
{
    public int VideoStitching(int[][] clips, int time)
    {
        int[] maxReach = new int[time + 1];

        foreach (var clip in clips)
        {
            int start = clip[0], end = clip[1];
            if (start <= time) maxReach[start] = Math.Max(maxReach[start], end);
        }

        int clipsUsed = 0;
        int currentEnd = 0;
        int farthest = 0;

        for (int i = 0; i < time; i++)
        {
            farthest = Math.Max(farthest, maxReach[i]);
            if (i == currentEnd)
            {
                if (farthest <= i) return -1;
                clipsUsed++;
                currentEnd = farthest;
            }
        }

        return clipsUsed;
    }
}
```

## Complexity

- **Time:** `O(time + clips.Length)`.
- **Space:** `O(time)` for the reach array.
