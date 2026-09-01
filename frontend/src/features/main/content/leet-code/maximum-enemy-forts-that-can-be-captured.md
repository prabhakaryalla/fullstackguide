# 2511. Maximum Enemy Forts That Can Be Captured

**Difficulty:** Easy
**Category:** Array, Two Pointers

## Problem

You are given an integer array `forts` of length `n` representing the positions of several forts. `forts[i]` can be -1, 0, or 1 where:
- -1 represents an empty position
- 0 represents an enemy fort
- 1 represents a fort you can control

You can move your army from one of your forts at position `i` to an empty position `j` such that:
- The positions between `i` and `j` (excluding `i` and including `j`) contain only enemy forts
- You capture all the enemy forts between `i` and `j`

Return the maximum number of enemy forts that can be captured in a single move.

### Example

```
Input: forts = [1,0,0,-1,0,0,0,0,1]
Output: 4
Explanation: Move from position 0 to position 3. You capture forts at positions 1 and 2.
Actually the maximum is moving from 8 to 3, capturing 4 forts.
```

## Approach

Use two pointers to find segments between a controlled fort (1) and an empty position (-1). Count the number of enemy forts (0) in between. Try all valid segments and return the maximum count.

## C# Solution

```csharp
public class Solution
{
    public int CaptureForts(int[] forts)
    {
        int n = forts.Length;
        int maxCapture = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (forts[i] == 1 || forts[i] == -1)
            {
                int j = i + 1;
                int count = 0;
                
                while (j < n && forts[j] == 0)
                {
                    count++;
                    j++;
                }
                
                if (j < n && forts[i] + forts[j] == 0)
                {
                    maxCapture = Math.Max(maxCapture, count);
                }
            }
        }
        
        return maxCapture;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of forts array
- **Space:** O(1)
