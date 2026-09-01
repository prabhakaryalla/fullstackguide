# 2187. Minimum Time to Complete Trips

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

You are given an array `time` where `time[i]` denotes the time taken by the i-th bus to complete one trip.

Each bus can make multiple consecutive trips successively. However, each bus operates independently.

Given an integer `totalTrips`, return the minimum time required for all buses to complete at least `totalTrips` trips in total.

### Example

```
Input: time = [1,2,3], totalTrips = 5
Output: 3
Explanation:
- At time t = 1, trips completed by each bus are [1,0,0].
- At time t = 2, trips completed by each bus are [2,1,0].
- At time t = 3, trips completed by each bus are [3,1,1], total = 5.
```

## Approach

Use binary search on the answer. The minimum time is 1 and the maximum time is when the slowest bus completes all trips alone.

For a given time `t`, we can calculate how many trips can be completed: `sum(t / time[i])`.

Binary search to find the minimum `t` where the total trips is at least `totalTrips`.

## C# Solution

```csharp
public class Solution
{
    public long MinimumTime(int[] time, int totalTrips)
    {
        long left = 1;
        long right = (long)time.Max() * totalTrips;
        
        while (left < right)
        {
            long mid = left + (right - left) / 2;
            
            if (CanComplete(time, mid, totalTrips))
            {
                right = mid;
            }
            else
            {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private bool CanComplete(int[] time, long t, int totalTrips)
    {
        long trips = 0;
        
        foreach (int busTime in time)
        {
            trips += t / busTime;
            if (trips >= totalTrips) return true;
        }
        
        return trips >= totalTrips;
    }
}
```

## Complexity

- **Time:** O(n * log(max(time) * totalTrips)), where n is the number of buses
- **Space:** O(1)
