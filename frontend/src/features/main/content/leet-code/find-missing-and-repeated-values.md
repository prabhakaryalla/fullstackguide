# 2965. Find Missing and Repeated Values

**Difficulty:** Easy
**Category:** Array, Hash Table, Math, Matrix

## Problem

You are given a 0-indexed 2D integer matrix `grid` of size `n x n` with values in the range `[1, n²]`. Each integer should appear exactly once, but one integer appears twice and another is missing.

Return an array `[duplicate, missing]`.

### Example

```
Input: grid = [[1,3],[2,2]]
Output: [2,4]
Explanation: 2 appears twice, 4 is missing.

Input: grid = [[9,1,7],[8,9,2],[3,4,6]]
Output: [9,5]
```

## Approach

Flatten the matrix and use a frequency map or set to find which number appears twice and which is missing from the range [1, n²].

## C# Solution

```csharp
public class Solution
{
    public int[] FindMissingAndRepeatedValues(int[][] grid)
    {
        int n = grid.Length;
        int total = n * n;
        var seen = new HashSet<int>();
        int duplicate = -1;

        foreach (var row in grid)
        {
            foreach (int num in row)
            {
                if (!seen.Add(num))
                {
                    duplicate = num;
                }
            }
        }

        for (int i = 1; i <= total; i++)
        {
            if (!seen.Contains(i))
            {
                return new int[] { duplicate, i };
            }
        }

        return new int[] { duplicate, -1 };
    }
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(n²)
