# 2753. Count Houses in a Circular Street II

**Difficulty:** Hard
**Category:** Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

This is an interactive problem. You are given a `Street` class with methods to interact with houses on a circular street. The street has `n` houses numbered from 1 to n arranged in a circle. You start at house 1.

The `Street` class has these methods:
- `void moveRight()`: Move to the next house clockwise
- `void moveLeft()`: Move to the previous house counterclockwise  
- `int getColor()`: Get the color of the current house (1 or 2)

Count the total number of houses on the street. You can call the methods at most 10^4 times.

### Example

```
Input: n = 10
Output: 10
Explanation: By moving right and tracking when we return to the starting position, we determine there are 10 houses.
```

## Approach

Mark the starting house by its color. Move right repeatedly until we return to a house with the same color as the starting house. To distinguish the starting house from other houses with the same color, we need to use a pattern:

1. Record the starting color
2. Move right once and record that color
3. Continue moving right, counting steps
4. When we encounter the starting color pattern again, we've completed the circle

To handle cases where all houses have the same color, we use position tracking and pattern matching.

## C# Solution

```csharp
public class Solution
{
    public int CountHouses(Street street)
    {
        int startColor = street.GetColor();
        int count = 1;
        
        street.MoveRight();
        
        while (street.GetColor() != startColor)
        {
            count++;
            street.MoveRight();
        }
        
        int verifyCount = 0;
        street.MoveRight();
        verifyCount++;
        
        while (street.GetColor() != startColor || verifyCount < count)
        {
            verifyCount++;
            street.MoveRight();
        }
        
        if (verifyCount == count)
        {
            return count;
        }
        
        return count + 1;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of houses
- **Space:** O(1) using only constant extra space
