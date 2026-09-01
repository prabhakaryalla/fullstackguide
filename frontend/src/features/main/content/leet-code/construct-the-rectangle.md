# 492. Construct the Rectangle

**Difficulty:** Easy
**Category:** Math

## Problem

Given the area of a web page's rectangular content in square pixels, return the dimensions `[length, width]` of the rectangle that has minimum difference between length and width, with `length >= width` and `length * width == area`.

### Example

```
Input: area = 4
Output: [2,2]
```

### Constraints

- `1 <= area <= 10^7`

## Approach

Start searching for a width at `⌊√area⌋` (the closest a factor pair can be to equal) and decrement until a value that evenly divides `area` is found. Since we search downward from the square root, the first factor found gives the width closest to the length, minimizing their difference.

## C# Solution

```csharp
public class Solution
{
    public int[] ConstructRectangle(int area)
    {
        int width = (int)Math.Sqrt(area);

        while (area % width != 0)
            width--;

        return new[] { area / width, width };
    }
}
```

## Complexity

- **Time:** `O(√area)`.
- **Space:** `O(1)`.
