# 554. Brick Wall

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Given a rectangular brick wall represented as a list of rows, where each row is a list of brick widths summing to the same total width, return the minimum number of bricks crossed by drawing a single vertical line from top to bottom (edges at the wall's boundary don't count as crossed).

### Example

```
Input: wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
Output: 2
```

### Constraints

- `1 <= wall.length <= 10^4`
- `1 <= wall[i].length <= 10^4`

## Approach

For each row, compute the running cumulative offset of every brick edge except the final one (which is the wall's outer boundary), and count how many rows share each edge position in a hash map. The optimal line to draw passes through the position with the most shared edges — minimizing bricks crossed — so the answer is the total row count minus the maximum edge-position frequency.

## C# Solution

```csharp
public class Solution
{
    public int LeastBricks(IList<IList<int>> wall)
    {
        var edgeCounts = new Dictionary<int, int>();

        foreach (var row in wall)
        {
            int position = 0;
            for (int i = 0; i < row.Count - 1; i++)
            {
                position += row[i];
                edgeCounts[position] = edgeCounts.GetValueOrDefault(position) + 1;
            }
        }

        int maxEdges = edgeCounts.Count > 0 ? edgeCounts.Values.Max() : 0;
        return wall.Count - maxEdges;
    }
}
```

## Complexity

- **Time:** `O(total bricks)`.
- **Space:** `O(total bricks)` for the edge-count map.
