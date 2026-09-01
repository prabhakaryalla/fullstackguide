# 2211. Count Collisions on a Road

**Difficulty:** Medium
**Category:** String, Stack

## Problem

There are `n` cars on an infinitely long road. You are given a string `directions` where `directions[i]` can be:
- `'L'`: the i-th car is moving left
- `'R'`: the i-th car is moving right
- `'S'`: the i-th car is stationary

Two cars moving in opposite directions will collide and both become stationary. A car moving towards a stationary car will collide with it and also become stationary.

Return the total number of collisions.

### Example

```
Input: directions = "RLRSLL"
Output: 5
Explanation:
Position 0 'R' and position 1 'L' collide -> 2 collisions, both become 'S'
Position 2 'R' collides with the 'S' at position 1 -> 1 collision
Position 3 'S' is already stationary
Positions 4-5 'LL' move left and collide with 'S' at position 3 -> 2 collisions
```

## Approach

Key observations:
1. Leading 'L' cars and trailing 'R' cars never collide
2. Any 'R' followed by 'L' causes collisions
3. Any 'R' followed by 'S' causes a collision
4. Any 'L' preceded by 'S' causes a collision

Count collisions by tracking the first 'R' or 'S' from the left and last 'L' or 'S' from the right. Everything in between collides.

## C# Solution

```csharp
public class Solution
{
    public int CountCollisions(string directions)
    {
        int n = directions.Length;
        
        // Remove leading 'L's - they escape to the left
        int left = 0;
        while (left < n && directions[left] == 'L')
        {
            left++;
        }
        
        // Remove trailing 'R's - they escape to the right
        int right = n - 1;
        while (right >= 0 && directions[right] == 'R')
        {
            right--;
        }
        
        // Everything between left and right that's not 'S' will collide
        int collisions = 0;
        for (int i = left; i <= right; i++)
        {
            if (directions[i] != 'S')
            {
                collisions++;
            }
        }
        
        return collisions;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of directions
- **Space:** O(1)
