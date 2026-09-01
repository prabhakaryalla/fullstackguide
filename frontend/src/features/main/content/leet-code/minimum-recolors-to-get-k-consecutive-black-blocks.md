# 2270. Minimum Recolors to Get K Consecutive Black Blocks

**Difficulty:** Easy
**Category:** String, Sliding Window

## Problem

You are given a string `blocks` of length `n`, where `blocks[i]` is either 'W' (white) or 'B' (black), and an integer `k`. In one operation, you can change the color of one white block to black.

Return the minimum number of operations needed so that there exists at least one occurrence of `k` consecutive black blocks.

### Example

```
Input: blocks = "WBBWWBBWBW", k = 7
Output: 3
Explanation: Change blocks[0], blocks[3], blocks[4] to black. Now "BBBWWBBWBW" has 7 consecutive blacks starting at index 0.
```

## Approach

Use a sliding window of size `k`. For each window, count the number of white blocks — that's the number of operations needed for that window. Track the minimum across all windows.

## C# Solution

```csharp
public class Solution
{
    public int MinimumRecolors(string blocks, int k)
    {
        int minOps = int.MaxValue;
        int whiteCount = 0;
        
        for (int i = 0; i < blocks.Length; i++)
        {
            if (blocks[i] == 'W') whiteCount++;
            
            if (i >= k && blocks[i - k] == 'W') whiteCount--;
            
            if (i >= k - 1) minOps = Math.Min(minOps, whiteCount);
        }
        
        return minOps;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of blocks.
- **Space:** O(1).
