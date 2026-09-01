# 699. Falling Squares

**Difficulty:** Hard
**Category:** Array, Segment Tree, Ordered Set

## Problem

Given a sequence of falling squares dropped onto a number line, where `positions[i] = [left, sideLength]` describes each square's drop position and size, return an array where each entry is the height of the tallest stack after that square lands (squares stack on top of any square they overlap horizontally with).

### Example

```
Input: positions = [[1,2],[2,3],[6,1]]
Output: [2,5,5]
```

## Approach

Maintain a list of previously placed squares, each recorded with its horizontal span and resting height. For each new square, scan all previously placed squares to find the maximum height among those whose horizontal span overlaps the new square's span — the new square rests on top of that maximum (or on the ground if none overlap). Record the new square's height and track a running maximum across all squares placed so far for the output at each step.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FallingSquares(int[][] positions)
    {
        var heights = new List<(int Left, int Right, int Height)>();
        var result = new List<int>();
        int maxHeight = 0;

        foreach (var position in positions)
        {
            int left = position[0];
            int size = position[1];
            int right = left + size;

            int base_ = 0;
            foreach (var (existingLeft, existingRight, existingHeight) in heights)
            {
                if (existingLeft < right && left < existingRight)
                    base_ = Math.Max(base_, existingHeight);
            }

            int newHeight = base_ + size;
            heights.Add((left, right, newHeight));

            maxHeight = Math.Max(maxHeight, newHeight);
            result.Add(maxHeight);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the placed-square records.
