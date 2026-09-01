# 2271. Maximum White Tiles Covered by a Carpet

**Difficulty:** Medium
**Category:** Array, Binary Search, Greedy, Sorting, Prefix Sum

## Problem

You are given a 2D integer array `tiles` where `tiles[i] = [li, ri]` represents that every tile `j` in the range `li <= j <= ri` is white. You are also given an integer `carpetLen` representing the length of a single carpet that can be placed anywhere. Return the maximum number of white tiles that can be covered by the carpet.

### Example

```
Input: tiles = [[1,5],[10,11],[12,18],[20,25],[30,32]], carpetLen = 10
Output: 9
```

## Approach

Sort tiles by start position. Use a sliding window with two pointers. For each starting position, expand the window to include as many tiles as possible within carpetLen. Use prefix sums to quickly compute tile coverage.

## C# Solution

```csharp
public class Solution
{
    public int MaximumWhiteTiles(int[][] tiles, int carpetLen)
    {
        Array.Sort(tiles, (a, b) => a[0].CompareTo(b[0]));
        
        int n = tiles.Length;
        var prefix = new int[n + 1];
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + tiles[i][1] - tiles[i][0] + 1;
        }
        
        int maxCovered = 0;
        int j = 0;
        
        for (int i = 0; i < n; i++)
        {
            int carpetEnd = tiles[i][0] + carpetLen - 1;
            
            while (j < n && tiles[j][1] <= carpetEnd)
            {
                j++;
            }
            
            int covered = prefix[j] - prefix[i];
            if (j < n && tiles[j][0] <= carpetEnd)
            {
                covered += carpetEnd - tiles[j][0] + 1;
            }
            
            maxCovered = Math.Max(maxCovered, covered);
        }
        
        return maxCovered;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
