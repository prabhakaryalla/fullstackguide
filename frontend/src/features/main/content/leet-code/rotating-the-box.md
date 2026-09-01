# 1861. Rotating the Box

**Difficulty:** Medium
**Category:** Array, Two Pointers, Simulation, Matrix

## Problem

Given a 2D `box` where `'#'` is a stone, `'*'` is a fixed obstacle, and `'.'` is empty, gravity first causes every stone to slide as far right as possible in its row (blocked by obstacles or the wall), then the box is rotated 90 degrees clockwise. Return the box after both effects.

### Example

```
Input: box = [["#",".","#"]]
Output: [["."],["#"],["#"]]
```

## Approach

Process each row from right to left, tracking the next free "landing" column for a falling stone (`insertPos`, initialized to the rightmost column). When an obstacle is hit, reset `insertPos` to just left of it. When a stone is found, clear its original cell and place it at `insertPos`, then decrement `insertPos`. After gravity is applied to every row, build the rotated result by mapping `result[c][r] = box[rows-1-r][c]`.

## C# Solution

```csharp
public class Solution
{
    public char[][] RotateTheBox(char[][] box)
    {
        int rows = box.Length, cols = box[0].Length;

        foreach (var row in box)
        {
            int insertPos = cols - 1;
            for (int c = cols - 1; c >= 0; c--)
            {
                if (row[c] == '*')
                {
                    insertPos = c - 1;
                }
                else if (row[c] == '#')
                {
                    row[c] = '.';
                    row[insertPos] = '#';
                    insertPos--;
                }
            }
        }

        var result = new char[cols][];
        for (int c = 0; c < cols; c++)
        {
            result[c] = new char[rows];
            for (int r = 0; r < rows; r++)
            {
                result[c][r] = box[rows - 1 - r][c];
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the rotated output.
