# 3274. Check if Two Chessboard Squares Have the Same Color

**Difficulty:** Easy
**Category:** Math, String

## Problem

You are given two strings `coordinate1` and `coordinate2` representing squares of a standard 8x8 chessboard, each in algebraic notation (a letter `'a'` to `'h'` followed by a digit `'1'` to `'8'`). Return `true` if the two squares have the same color, otherwise `false`.

### Example

```
Input: coordinate1 = "a1", coordinate2 = "c3"
Output: true
Explanation: Both squares are the same color (dark squares).
```

## Approach

On a chessboard, a square's color is determined by the parity of the sum of its column index and row index. Convert each coordinate's letter to a 0-based column index and its digit to a 0-based row index, sum them, and compare the parities of the two sums.

## C# Solution

```csharp
public class Solution 
{
    public bool CheckTwoChessboards(string coordinate1, string coordinate2) 
    {
        int sum1 = (coordinate1[0] - 'a') + (coordinate1[1] - '1');
        int sum2 = (coordinate2[0] - 'a') + (coordinate2[1] - '1');

        return (sum1 % 2) == (sum2 % 2);
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
