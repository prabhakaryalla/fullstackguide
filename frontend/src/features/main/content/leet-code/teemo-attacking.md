# 495. Teemo Attacking

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

Given a non-decreasing array `timeSeries` of attack timestamps and a `duration`, where each attack poisons the target for `duration` seconds (re-applying the poison timer if attacked again while already poisoned), return the total number of seconds the target is poisoned.

### Example

```
Input: timeSeries = [1,4], duration = 2
Output: 4
```

### Constraints

- `1 <= timeSeries.length <= 10^4`
- `0 <= timeSeries[i] <= 10^7`
- `timeSeries` is sorted in non-decreasing order.
- `1 <= duration <= 10^7`

## Approach

For each attack except the last, the poisoned duration it fully contributes is either the full `duration`, or, if the next attack arrives before the current poison would have expired, only the gap until that next attack (since the timer resets at that point). The last attack always contributes its full `duration`.

## C# Solution

```csharp
public class Solution
{
    public int FindPoisonedDuration(int[] timeSeries, int duration)
    {
        int total = 0;

        for (int i = 0; i < timeSeries.Length; i++)
        {
            if (i == timeSeries.Length - 1)
            {
                total += duration;
            }
            else
            {
                total += Math.Min(duration, timeSeries[i + 1] - timeSeries[i]);
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
