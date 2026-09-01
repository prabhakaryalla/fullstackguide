# 2126. Destroying Asteroids

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You have a planet of mass `mass`. You can destroy asteroids with masses less than or equal to your planet's mass, absorbing their mass. Given an array of asteroid masses, return `true` if you can destroy all asteroids.

### Example

```
Input: mass = 10, asteroids = [3,9,19,5,21]
Output: true
Explanation: Destroy in order: 3(13), 5(18), 9(27), 19(46), 21(67)
```

## Approach

Sort asteroids by mass ascending. Greedily destroy asteroids in this order, adding each destroyed asteroid's mass to your planet. If at any point you can't destroy the next asteroid, return false.

## C# Solution

```csharp
public class Solution
{
    public bool AsteroidsDestroyed(int mass, int[] asteroids)
    {
        Array.Sort(asteroids);
        long currentMass = mass;
        
        foreach (int asteroid in asteroids)
        {
            if (currentMass < asteroid)
                return false;
            currentMass += asteroid;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1)
