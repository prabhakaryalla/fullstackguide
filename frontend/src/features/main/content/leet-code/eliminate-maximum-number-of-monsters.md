# 1921. Eliminate Maximum Number of Monsters

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

There are `n` monsters, each at distance `dist[i]` from you, approaching at speed `speed[i]`. Each minute you can eliminate at most one monster (with your weapon that shoots instantly), and at the end of every minute, each surviving monster moves `speed[i]` units closer; you lose the game if any monster reaches distance `0`. Return the maximum number of monsters you can eliminate before you lose (or `n` if you can eliminate them all).

### Example

```
Input: dist = [1,3,4], speed = [1,1,1]
Output: 3
Explanation: Arrival times are 1, 3, 4 minutes; eliminate one each minute in order, none arrive before being shot.
```

### Constraints

- `n == dist.length == speed.length`
- `1 <= n <= 10^5`
- `1 <= dist[i], speed[i] <= 10^5`

## Approach

Compute each monster's arrival time `dist[i] / speed[i]` (time until it reaches you, as a real number, but since you act at the start of each integer minute, using integer division works out with the correct comparison semantics: monster arrives strictly at minute `ceil` boundary; using `dist[i] / (double)speed[i]` sorted works cleanly). Sort the arrival times ascending, then greedily process them in order using the current minute counter `t` (starting at 0): if the monster's arrival time is strictly greater than `t`, you can eliminate it this minute (increment count and `t`); otherwise it reaches you first and you must stop.

## C# Solution

```csharp
public class Solution
{
    public int EliminateMaximum(int[] dist, int[] speed)
    {
        int n = dist.Length;
        double[] arrival = new double[n];

        for (int i = 0; i < n; i++)
        {
            arrival[i] = (double)dist[i] / speed[i];
        }

        Array.Sort(arrival);

        int eliminated = 0;
        for (int minute = 0; minute < n; minute++)
        {
            if (arrival[minute] > minute)
            {
                eliminated++;
            }
            else
            {
                break;
            }
        }

        return eliminated;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting the arrival times.
- **Space:** `O(n)` for the arrival-time array.
