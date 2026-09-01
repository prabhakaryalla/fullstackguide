# 3633. Earliest Finish Time for Land and Water Rides I

**Difficulty:** Easy
**Category:** Array, Greedy

## Problem

You are given `landStartTime`/`landDuration` and `waterStartTime`/`waterDuration` arrays describing available land and water rides. A rider must take exactly one land ride and one water ride, in either order; a ride cannot start before its listed start time, and the second ride's finish time is `max(secondStartTime, firstFinishTime) + secondDuration`. Return the earliest possible finish time.

### Example

`landStartTime=[5]`, `landDuration=[2]`, `waterStartTime=[1]`, `waterDuration=[3]`: land then water finishes at `max(1,7)+3=10`; water then land finishes at `max(5,4)+2=7`. Answer is 7.

## Approach

Try both possible orders for every pair of one land ride and one water ride, computing the finish time for each order, and keep the minimum found.

## C# Solution

```csharp
public class Solution 
{
    public int EarliestFinishTime(int[] landStartTime, int[] landDuration, int[] waterStartTime, int[] waterDuration) 
    {
        int result = int.MaxValue;
        int n = landStartTime.Length, m = waterStartTime.Length;

        for (int i = 0; i < n; i++) 
        {
            int landFinish = landStartTime[i] + landDuration[i];
            for (int j = 0; j < m; j++) 
            {
                int waterFinish = waterStartTime[j] + waterDuration[j];
                int landThenWater = Math.Max(waterStartTime[j], landFinish) + waterDuration[j];
                int waterThenLand = Math.Max(landStartTime[i], waterFinish) + landDuration[i];
                result = Math.Min(result, Math.Min(landThenWater, waterThenLand));
            }
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n*m)
- **Space:** O(1)
