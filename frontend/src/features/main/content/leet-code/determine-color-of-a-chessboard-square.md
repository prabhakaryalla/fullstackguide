# 1812. Determine Color of a Chessboard Square

**Difficulty:** Easy
**Category:** Math

## Problem

Given `coordinates` such as `"a1"` for a square on an 8x8 chessboard, return `true` if the square is white, `false` if black.

### Example

```
Input: coordinates = "a1"
Output: false
```

## Approach

Convert the column letter and row digit to 0-indexed values. A square is white exactly when the sum of its 0-indexed column and row is odd (this alternating pattern matches the standard chessboard coloring where `a1` is black).

## C# Solution

```csharp
public class Solution
{
    public bool SquareIsWhite(string coordinates)
    {
        int col = coordinates[0] - 'a';
        int row = coordinates[1] - '1';
        return (col + row) % 2 == 1;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
