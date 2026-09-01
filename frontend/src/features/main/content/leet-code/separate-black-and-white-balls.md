# 2938. Separate Black and White Balls

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

You are given a binary string `s` representing balls where '1' is black and '0' is white. In one move, you can swap two adjacent balls. Return the minimum number of swaps to group all black balls to the right side.

### Example

```
Input: s = "100"
Output: 2
Explanation: Swap to get "001". First swap "100" → "010", then "010" → "001".
```

## Approach

Count the number of black balls. For each black ball, calculate how many positions it needs to move to the right to reach its final position. Sum all movements. Alternatively, iterate from left to right, tracking how many white balls have been seen; each black ball must swap with all preceding white balls.

## C# Solution

```csharp
public class Solution 
{
    public long MinimumSteps(string s) 
    {
        long swaps = 0;
        int whiteCount = 0;
        
        for (int i = 0; i < s.Length; i++) 
        {
            if (s[i] == '0') 
            {
                whiteCount++;
            } 
            else 
            {
                swaps += whiteCount;
            }
        }
        
        return swaps;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
