# 2833. Furthest Point From Origin

**Difficulty:** Easy
**Category:** String, Greedy

## Problem

You are given a string moves consisting only of the characters 'L', 'R', and '_', representing left, right, and blank moves.

Starting from origin (position 0) on a number line, you process each character:
- 'L': move one unit to the left
- 'R': move one unit to the right
- '_': move one unit in either direction (your choice)

Return the furthest distance from the origin you can be after processing all moves.

### Example

```
Input: moves = "_L__R"
Output: 3
Explanation: Use '_' to maximize distance: go left. L, left, left, right = position -3
```

## Approach

To maximize the distance from the origin, we should move all blank ('_') characters in the direction that increases the distance the most.

First, count the net displacement from 'L' and 'R' moves:
- Each 'L' contributes -1 to position
- Each 'R' contributes +1 to position

Then, count the number of '_' characters. To maximize distance, we add all '_' moves to whichever direction increases the absolute value of our position.

The furthest distance is: |netPosition| + blankCount

## C# Solution

```csharp
public class Solution
{
    public int FurthestDistanceFromOrigin(string moves)
    {
        int position = 0;
        int blanks = 0;
        
        foreach (char move in moves)
        {
            if (move == 'L')
                position--;
            else if (move == 'R')
                position++;
            else
                blanks++;
        }
        
        return Math.Abs(position) + blanks;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of moves
- **Space:** O(1) for auxiliary variables
