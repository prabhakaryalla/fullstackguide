# 1603. Design Parking System

**Difficulty:** Easy
**Category:** Design, Simulation

## Problem

Design a parking system for a lot with three kinds of spaces: big, medium, and small. Implement `ParkingSystem(int big, int medium, int small)` to initialize capacities, and `bool AddCar(int carType)` (1 = big, 2 = medium, 3 = small) that returns `true` and decrements the corresponding space count if a spot is available, or `false` otherwise.

### Example

```
Input: ["ParkingSystem","addCar","addCar","addCar","addCar"]
       [[1,1,0],[1],[2],[3],[1]]
Output: [null,true,true,false,false]
```

## Approach

Store remaining capacities in an array indexed by `carType` (index 0 unused). `AddCar` checks whether the count for that type is positive; if so, decrement and return `true`, otherwise return `false`.

## C# Solution

```csharp
public class ParkingSystem
{
    private readonly int[] slots;

    public ParkingSystem(int big, int medium, int small)
    {
        slots = new int[] { 0, big, medium, small };
    }

    public bool AddCar(int carType)
    {
        if (slots[carType] > 0)
        {
            slots[carType]--;
            return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(1)`.
