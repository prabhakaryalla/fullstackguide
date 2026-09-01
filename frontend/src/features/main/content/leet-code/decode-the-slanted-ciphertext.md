# 2075. Decode the Slanted Ciphertext

**Difficulty:** Medium
**Category:** String, Simulation

## Problem

An original text was encoded into a matrix with `rows` rows by writing the text along diagonals moving down-right, wrapping to the next diagonal's starting column each time the bottom row is reached, and finally reading the matrix row by row (left to right, top to bottom) to produce the encoded string `encodedText`. Given `encodedText` and `rows`, return the decoded original text (trailing spaces may be trimmed).

## Approach

Reconstruct the matrix implicitly: since `encodedText.Length` is a multiple of `rows`, the number of columns is `cols = encodedText.Length / rows`, and `encodedText[r * cols + c]` gives the character at matrix row `r`, column `c`.

To decode, walk each diagonal starting at row `0` for every column `c` from `0` to `cols - 1`, then step down-right (`row++`, `col++`) collecting characters until falling off the bottom of the matrix, before moving to the next starting column. Concatenate all collected characters in order, then trim trailing spaces.

## C# Solution

```csharp
public class Solution
{
    public string DecodeCiphertext(string encodedText, int rows)
    {
        int cols = encodedText.Length / rows;
        var sb = new StringBuilder();

        for (int startCol = 0; startCol < cols; startCol++)
        {
            int row = 0, col = startCol;
            while (row < rows && col < cols)
            {
                sb.Append(encodedText[row * cols + col]);
                row++;
                col++;
            }
        }

        return sb.ToString().TrimEnd(' ');
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n = encodedText.Length` (every character is visited once).
- **Space:** `O(n)` for the output buffer.
