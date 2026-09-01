# 2677. Chunk Array

**Difficulty:** Easy
**Category:** Array

## Problem

Given a one-dimensional array `arr` and a chunk `size`, split `arr` into a two-dimensional array where each inner array (chunk) has exactly `size` elements, except possibly the last chunk, which may contain fewer elements if `arr.length` is not evenly divisible by `size`.

### Example

```
Input: arr = [1, 2, 3, 4, 5], size = 1
Output: [[1], [2], [3], [4], [5]]

Input: arr = [1, 9, 6, 3, 2], size = 3
Output: [[1, 9, 6], [3, 2]]
```

## Approach

Iterate through the array in steps of `size`, slicing out each contiguous chunk (clamping the end index to the array's length for the final, possibly shorter, chunk).

## C# Solution

```csharp
public class Solution
{
    public static List<List<int>> ChunkArray(int[] arr, int size)
    {
        var result = new List<List<int>>();

        for (int i = 0; i < arr.Length; i += size)
        {
            int end = Math.Min(i + size, arr.Length);
            result.Add(arr[i..end].ToList());
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `arr`.
- **Space:** O(n) for the output.
