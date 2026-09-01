# 1396. Design Underground System

**Difficulty:** Medium
**Category:** Hash Table, String, Design

## Problem

Design an underground system that tracks customer check-ins and check-outs by station and time, and can report the average travel time between any two stations.

### Example

```
Input: ["UndergroundSystem","checkIn","checkOut","getAverageTime","checkIn","checkOut","getAverageTime"]
[[],[1,"A",3],[1,"B",8],["A","B"],[2,"A",10],[2,"B",20],["A","B"]]
Output: [null,null,null,5.0,null,null,7.0]
```

## Approach

On check-in, remember the customer's start station and time. On check-out, look up that pending check-in, compute the elapsed time, and accumulate it into a running total-time and trip-count keyed by the `(startStation, endStation)` pair; drop the pending check-in afterward. Answering an average query is then a direct division of the accumulated total by the trip count.

## C# Solution

```csharp
public class UndergroundSystem
{
    private readonly Dictionary<int, (string station, int time)> checkIns = new();
    private readonly Dictionary<(string, string), (long totalTime, int count)> trips = new();

    public void CheckIn(int id, string stationName, int t)
    {
        checkIns[id] = (stationName, t);
    }

    public void CheckOut(int id, string stationName, int t)
    {
        var (startStation, startTime) = checkIns[id];
        checkIns.Remove(id);

        var key = (startStation, stationName);
        var (totalTime, count) = trips.GetValueOrDefault(key, (0L, 0));
        trips[key] = (totalTime + (t - startTime), count + 1);
    }

    public double GetAverageTime(string startStation, string endStation)
    {
        var (totalTime, count) = trips[(startStation, endStation)];
        return (double)totalTime / count;
    }
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(active check-ins + distinct station pairs)`.
