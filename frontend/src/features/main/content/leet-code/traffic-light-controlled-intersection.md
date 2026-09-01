# 1279. Traffic Light Controlled Intersection

**Difficulty:** Easy
**Category:** Concurrency
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Model a traffic light at a four-way intersection with roads `1`/`3` (one street) and `2`/`4` (the crossing street). Implement `TrafficLight.CarArrived` so that cars on the currently-green street can cross, while ensuring cars from the two perpendicular roads never cross at the same time, and the light only switches when a car from the non-green street arrives.

## Approach

Guard the whole intersection with a single lock so only one car's arrival is processed at a time. Track which street currently has the green light; if the arriving car's road belongs to the other street, invoke the provided `turnGreen` callback to switch signals and update the tracked state before letting the car cross via `crossCar`. Serializing all arrivals through one lock trivially prevents any two perpendicular cars from crossing simultaneously.

## C# Solution

```csharp
public class TrafficLight
{
    private int currentGreenRoad = 1;
    private readonly object lockObj = new();

    public void CarArrived(
        int carId,
        int roadId,
        int direction,
        Action turnGreen,
        Action crossCar)
    {
        lock (lockObj)
        {
            if (roadId != currentGreenRoad)
            {
                turnGreen();
                currentGreenRoad = roadId;
            }

            crossCar();
        }
    }
}
```

## Complexity

- **Time:** `O(1)` synchronization overhead per car (excluding time blocked waiting for the lock).
- **Space:** `O(1)`.
