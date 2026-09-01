# 832. Flipping an Image

**Difficulty:** Easy
**Category:** Array, Two Pointers, Matrix, Simulation

## Problem

Given a binary matrix `image`, first horizontally flip every row (reverse it), then invert every bit (`0` becomes `1` and vice versa). Return the resulting image.

### Example

```
Input: image = [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
```

## Approach

Process each row with two pointers starting from both ends, moving inward. At each step, swap the two pointed-at values while also inverting them (combining the reversal and inversion into a single pass), since flipping a row and then inverting each bit is equivalent to swapping mirrored positions with their inverted values.

## C# Solution

```csharp
public class Solution
{
    public int[][] FlipAndInvertImage(int[][] image)
    {
        int n = image.Length;

        foreach (var row in image)
        {
            int left = 0, right = n - 1;

            while (left <= right)
            {
                int temp = row[left] ^ 1;
                row[left] = row[right] ^ 1;
                row[right] = temp;

                left++;
                right--;
            }
        }

        return image;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)` extra.
