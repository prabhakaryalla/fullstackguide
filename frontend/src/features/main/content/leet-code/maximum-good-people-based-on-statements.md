# 2151. Maximum Good People Based on Statements

**Difficulty:** Hard
**Category:** Array, Backtracking, Bit Manipulation, Enumeration

## Problem

There are `n` people (0-indexed). You are given a 2D integer array `statements` where `statements[i][j]` could be:
- 0: person i says person j is bad
- 1: person i says person j is good  
- 2: person i doesn't make a statement about person j

Return the maximum number of people that can be good, assuming at least one person is good and good people always tell the truth.

### Example

```
Input: statements = [[2,1,2],[1,2,2],[2,0,2]]
Output: 2
Explanation: Assuming persons 0 and 1 are good gives a valid configuration.
```

## Approach

Since n is small (≤15), try all 2^n possible combinations of good/bad assignments using bitmasks. For each assignment:
1. Check if all good people's statements are consistent
2. Track the maximum number of good people in any valid assignment

A statement is consistent if: when a good person says X about Y, that statement matches our assignment for Y.

## C# Solution

```csharp
public class Solution
{
    public int MaximumGood(int[][] statements)
    {
        int n = statements.Length;
        int maxGood = 0;
        
        // Try all 2^n combinations
        for (int mask = 0; mask < (1 << n); mask++)
        {
            if (IsValid(statements, mask, n))
            {
                maxGood = Math.Max(maxGood, CountBits(mask));
            }
        }
        
        return maxGood;
    }
    
    private bool IsValid(int[][] statements, int mask, int n)
    {
        // Check if this assignment is consistent
        for (int i = 0; i < n; i++)
        {
            // If person i is good (bit is set)
            if ((mask & (1 << i)) != 0)
            {
                // Check all their statements
                for (int j = 0; j < n; j++)
                {
                    if (statements[i][j] == 2)
                        continue;
                    
                    bool jIsGood = (mask & (1 << j)) != 0;
                    bool iSaysJIsGood = statements[i][j] == 1;
                    
                    // Good person's statement must match reality
                    if (jIsGood != iSaysJIsGood)
                        return false;
                }
            }
        }
        return true;
    }
    
    private int CountBits(int mask)
    {
        int count = 0;
        while (mask > 0)
        {
            count += mask & 1;
            mask >>= 1;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(2^n * n²) for trying all masks and validating
- **Space:** O(1)
