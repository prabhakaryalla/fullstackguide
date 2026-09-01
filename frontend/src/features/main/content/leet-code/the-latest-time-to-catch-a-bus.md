# 2332. The Latest Time to Catch a Bus

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Sorting

## Problem

You are given a sorted array `buses` representing the departure times of buses, and a sorted array `passengers` representing the arrival times of passengers. You are also given an integer `capacity` representing the maximum number of passengers that can board each bus.

Passengers will board the first bus that arrives at or after their arrival time, provided the bus has not reached capacity. You want to arrive at the latest possible time so that you can still catch a bus.

Return the latest time you may arrive at the bus stop to catch a bus. You cannot arrive at the same time as another passenger.

### Example

```
Input: buses = [10,20], passengers = [2,17,18,19], capacity = 2
Output: 16
Explanation: The first bus departs at time 10 and can take 2 passengers (passengers arriving at 2 and 17).
The second bus departs at time 20 and can take 2 passengers (passengers arriving at 18 and 19).
To maximize arrival time, arrive at 16, board the first bus.
```

## Approach

Simulate the boarding process: sort both arrays, then iterate through buses. For each bus, board as many passengers as possible (up to capacity, and only those arriving before or at bus time). After simulation, work backwards to find the latest available slot — either the last bus time if it's not full, or just before the last passenger who boarded.

## C# Solution

```csharp
public class Solution
{
    public int LatestTimeCatchTheBus(int[] buses, int[] passengers, int capacity)
    {
        Array.Sort(buses);
        Array.Sort(passengers);
        
        int passengerIdx = 0;
        int lastBoarded = -1;
        
        foreach (int busTime in buses)
        {
            int count = 0;
            while (passengerIdx < passengers.Length && 
                   passengers[passengerIdx] <= busTime && 
                   count < capacity)
            {
                lastBoarded = passengers[passengerIdx];
                passengerIdx++;
                count++;
            }
        }
        
        int latestTime = (passengerIdx == 0 || (passengerIdx < passengers.Length && 
                          passengers[passengerIdx - 1] < buses[buses.Length - 1]) || 
                          passengerIdx % capacity != 0)
                         ? buses[buses.Length - 1]
                         : passengers[passengerIdx - 1];
        
        HashSet<int> passengerSet = new HashSet<int>(passengers);
        
        while (passengerSet.Contains(latestTime))
        {
            latestTime--;
        }
        
        return latestTime;
    }
}
```

## Complexity

- **Time:** O(n log n + m log m) where n is buses length and m is passengers length (sorting)
- **Space:** O(m) for the passenger hash set
