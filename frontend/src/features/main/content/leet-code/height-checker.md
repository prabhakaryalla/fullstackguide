# 1051. Height Checker

**Difficulty:** Easy
**Category:** Array, Sorting, Counting Sort

## Problem

A queue of `n` students has heights `heights`. Return the number of indices where the current height differs from what it would be if the students stood in non-decreasing order of height.

### Example

```
Input: heights = [1,1,4,2,1,3]
Output: 3
```

## Approach

Build the "expected" arrangement by sorting a copy of `heights`. Compare it element-by-element against the original array, counting every position where the two differ.

## C# Solution

```csharp
public class Solution
{
    public int HeightChecker(int[] heights)
    {
        var expected = (int[])heights.Clone();
        Array.Sort(expected);

        int count = 0;
        for (int i = 0; i < heights.Length; i++)
        {
            if (heights[i] != expected[i]) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(n)` for the expected array.
