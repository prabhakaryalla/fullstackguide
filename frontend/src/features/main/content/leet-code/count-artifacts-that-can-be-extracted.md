# 2201. Count Artifacts That Can Be Extracted

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

There is an `n x n` grid representing an excavation site. You are given integers `n` and an array `artifacts` describing the locations of rectangular artifacts where `artifacts[i] = [r1i, c1i, r2i, c2i]` denotes that the i-th artifact covers cells from `(r1i, c1i)` to `(r2i, c2i)` inclusive.

You are also given a 2D array `dig` where `dig[i] = [ri, ci]` indicates that you will excavate the cell `(ri, ci)`.

Return the number of artifacts that you can extract. An artifact can be extracted if every cell it covers has been excavated.

### Example

```
Input: n = 2, artifacts = [[0,0,0,0],[0,1,1,1]], dig = [[0,0],[0,1]]
Output: 1
Explanation:
Artifact 0 covers cell (0,0) which is excavated.
Artifact 1 covers cells (0,1), (1,1) but only (0,1) is excavated.
Only artifact 0 can be extracted.
```

## Approach

1. Store all excavated cells in a set for O(1) lookup
2. For each artifact, check if all its cells have been excavated
3. Count artifacts where all cells are excavated

## C# Solution

```csharp
public class Solution
{
    public int DigArtifacts(int n, int[][] artifacts, int[][] dig)
    {
        HashSet<(int, int)> excavated = new HashSet<(int, int)>();
        
        foreach (var cell in dig)
        {
            excavated.Add((cell[0], cell[1]));
        }
        
        int count = 0;
        
        foreach (var artifact in artifacts)
        {
            int r1 = artifact[0], c1 = artifact[1];
            int r2 = artifact[2], c2 = artifact[3];
            
            bool canExtract = true;
            
            for (int r = r1; r <= r2; r++)
            {
                for (int c = c1; c <= c2; c++)
                {
                    if (!excavated.Contains((r, c)))
                    {
                        canExtract = false;
                        break;
                    }
                }
                if (!canExtract) break;
            }
            
            if (canExtract)
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(d + a * s), where d is dig operations, a is artifacts, s is average artifact size
- **Space:** O(d), for the excavated set
