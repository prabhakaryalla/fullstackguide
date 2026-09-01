# 2120. Execution of All Suffix Instructions Staying in a Grid

**Difficulty:** Medium
**Category:** Array, String, Simulation

## Problem

You start at position `(0, 0)` on an n x n grid. Given a string `s` of movement instructions (L/R/U/D), for each starting index i, count how many instructions from s[i..] can be executed before moving out of bounds.

### Example

```
Input: n = 3, startPos = [0,1], s = "RRDDLU"
Output: [1,5,4,3,1,0]
```

## Approach

For each starting index i, simulate the movement instructions from s[i] onward. Track the current position and count valid moves until going out of bounds or reaching the end of the string.

## C# Solution

```csharp
public class Solution
{
    public int[] ExecuteInstructions(int n, int[] startPos, string s)
    {
        int m = s.Length;
        int[] result = new int[m];
        
        for (int i = 0; i < m; i++)
        {
            int r = startPos[0], c = startPos[1];
            int count = 0;
            
            for (int j = i; j < m; j++)
            {
                if (s[j] == 'L') c--;
                else if (s[j] == 'R') c++;
                else if (s[j] == 'U') r--;
                else r++;
                
                if (r < 0 || r >= n || c < 0 || c >= n)
                    break;
                count++;
            }
            result[i] = count;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m²) where m is the length of s
- **Space:** O(1) excluding output
