# 2079. Watering Plants

**Difficulty:** Medium
**Category:** Array, Simulation

## Problem

You have `n` plants in a row, needing `plants[i]` units of water each. You start at a water tap at position `-1` with a watering can of capacity `capacity`, initially full. Walking one step (in either direction) takes one step of "time". You must walk to each plant in order from left to right and water it fully; if your can doesn't have enough water for the next plant, you must first walk back to the tap to refill (a full refill), then walk back to that plant. Return *the total number of steps needed to water all the plants*.

## Approach

Simulate the walk left to right, tracking the current water remaining in the can and the current position. For each plant, if the remaining water is enough, water it directly (subtract its requirement, add `1` step for moving to it). Otherwise, add the steps needed to walk back to the tap (twice the current position + 1, to return to the tap and then walk back out to this plant), refill to full capacity, then water the plant.

## C# Solution

```csharp
public class Solution
{
    public int WateringPlants(int[] plants, int capacity)
    {
        int steps = 0;
        int water = capacity;

        for (int i = 0; i < plants.Length; i++)
        {
            if (water < plants[i])
            {
                steps += 2 * i;
                water = capacity;
            }

            water -= plants[i];
            steps++;
        }

        return steps;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
