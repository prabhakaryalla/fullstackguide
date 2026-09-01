# 2380. Time Needed to Rearrange a Binary String

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Simulation

## Problem

You are given a binary string `s`. In one second, all occurrences of `"01"` are simultaneously replaced with `"10"`. This process repeats until no occurrences of `"01"` exist.

Return the number of seconds needed to complete this process.

### Example

```
Input: s = "0110101"
Output: 4
Explanation: 
After 1 second: "1011010"
After 2 seconds: "1101100"
After 3 seconds: "1110100"
After 4 seconds: "1111000"
```

## Approach

Count how many swaps each '1' needs to move past '0's to its right. The maximum distance any '1' needs to move is the answer. For each '1', count zeros to its right; the time is the maximum of these counts.

## C# Solution

```csharp
public class Solution
{
    public int SecondsToRemoveOccurrences(string s)
    {
        int n = s.Length;
        int seconds = 0;
        int zeros = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '0')
            {
                zeros++;
            }
            else if (zeros > 0)
            {
                seconds = Math.Max(seconds + 1, zeros);
            }
        }
        
        return seconds;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
