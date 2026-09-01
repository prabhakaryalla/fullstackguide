# 1183. Maximum Number of Ones

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `height x width` binary matrix constraint where every `sideLength x sideLength` submatrix may contain at most `maxOnes` ones, return the maximum possible total number of ones in the entire matrix.

### Example

```
Input: width = 3, height = 3, sideLength = 2, maxOnes = 1
Output: 4
```

## Approach

Because the constraint applies uniformly to every `sideLength x sideLength` window, cell `(i, j)` is forced to share the same value as every other cell `(i', j')` where `i ≡ i' (mod sideLength)` and `j ≡ j' (mod sideLength)` — they fall in the same "equivalence class". Count how many matrix cells belong to each of the `sideLength^2` classes, then greedily set the `maxOnes` largest classes entirely to `1` (since setting an entire class to `1` maximizes reuse of the allowed ones per window).

## C# Solution

```csharp
public class Solution
{
    public int MaximumNumberOfOnes(int width, int height, int sideLength, int maxOnes)
    {
        var classCounts = new List<int>();

        for (int r = 0; r < sideLength; r++)
        {
            for (int c = 0; c < sideLength; c++)
            {
                int rowCount = (height - r + sideLength - 1) / sideLength;
                int colCount = (width - c + sideLength - 1) / sideLength;
                classCounts.Add(rowCount * colCount);
            }
        }

        classCounts.Sort((a, b) => b.CompareTo(a));

        long total = 0;
        for (int i = 0; i < maxOnes && i < classCounts.Count; i++)
        {
            total += classCounts[i];
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(sideLength^2 log(sideLength^2))`.
- **Space:** `O(sideLength^2)`.
