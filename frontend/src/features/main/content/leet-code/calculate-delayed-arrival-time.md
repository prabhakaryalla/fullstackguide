# 2651. Calculate Delayed Arrival Time

**Difficulty:** Easy
**Category:** Math

## Problem

You are given a positive integer `arrivalTime` denoting the arrival time of a train in hours, and another positive integer `delayedTime` denoting the amount of delay in hours.

Return the time when the train will arrive at the station. Note that the time is in 24-hour format and goes from 0 to 23. A time greater than or equal to 24 should wrap around.

### Example

```
Input: arrivalTime = 15, delayedTime = 5
Output: 20
Explanation: Arrival time is 15 and it is delayed by 5 hours, so the new arrival is (15 + 5) = 20.

Input: arrivalTime = 13, delayedTime = 11
Output: 0
Explanation: Arrival time is 13 and it is delayed by 11 hours, so the new arrival is (13 + 11) = 24, which wraps around to 0.
```

## Approach

Add the arrival time and delayed time, then use modulo 24 to wrap around if needed. This handles the 24-hour clock format.

## C# Solution

```csharp
public class Solution
{
    public int FindDelayedArrivalTime(int arrivalTime, int delayedTime)
    {
        return (arrivalTime + delayedTime) % 24;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
