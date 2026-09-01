# 2878. Get the Size of a Dataframe

**Difficulty:** Easy
**Category:** Pandas

## Problem
Given a `DataFrame` named `players`, return its shape as a two-element array `[numberOfRows, numberOfColumns]`.

### Example
```
Input: players has 10 rows and 5 columns
Output: [10, 5]
```

## Approach
Adapted using the same `List<Dictionary<string, object>>` representation as other DataFrame-adaptation problems in this repository: the row count is the list's length, and the column count is the number of keys in any row's dictionary (`0` if there are no rows).

## C# Solution

```csharp
public class Solution
{
    public static int[] GetDataframeSize(List<Dictionary<string, object>> players)
    {
        int rows = players.Count;
        int cols = rows > 0 ? players[0].Count : 0;
        return new[] { rows, cols };
    }
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
