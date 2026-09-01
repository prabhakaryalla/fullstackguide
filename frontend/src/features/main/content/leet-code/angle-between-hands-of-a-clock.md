# 1344. Angle Between Hands of a Clock

**Difficulty:** Medium
**Category:** Math

## Problem

Given the current time `hour` and `minutes`, return the smaller angle in degrees between the hour and minute hands of a 12-hour analog clock.

### Example

```
Input: hour = 3, minutes = 30
Output: 75
```

## Approach

The minute hand moves `6` degrees per minute, so its angle is `6 * minutes`. The hour hand moves `30` degrees per hour plus an extra `0.5` degrees per minute (since it creeps forward within the hour). Compute the absolute difference between the two angles, then return whichever of that value or `360` minus it is smaller.

## C# Solution

```csharp
public class Solution
{
    public double AngleClock(int hour, int minutes)
    {
        double minuteAngle = 6.0 * minutes;
        double hourAngle = 30.0 * (hour % 12) + 0.5 * minutes;

        double diff = Math.Abs(hourAngle - minuteAngle);
        return Math.Min(diff, 360 - diff);
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
