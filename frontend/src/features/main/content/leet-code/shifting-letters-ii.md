# 2381. Shifting Letters II

**Difficulty:** Medium
**Category:** Array, String, Prefix Sum

## Problem

You are given a string `s` of lowercase English letters and a 2D integer array `shifts` where `shifts[i] = [start_i, end_i, direction_i]`. For every `i`, shift the characters in `s` from the index `start_i` to the index `end_i` (inclusive) forward if `direction_i = 1`, or shift the characters backward if `direction_i = 0`.

Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that `'z'` becomes `'a'`). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that `'a'` becomes `'z'`).

Return the final string after all such shifts to `s` are applied.

### Example

```
Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
Output: "ace"
```

## Approach

Use a difference array to efficiently apply range updates. For each shift operation, mark the start and end+1 positions. Compute prefix sum to get net shift for each position, then apply to characters.

## C# Solution

```csharp
public class Solution
{
    public string ShiftingLetters(string s, int[][] shifts)
    {
        int n = s.Length;
        var diff = new int[n + 1];
        
        foreach (var shift in shifts)
        {
            int start = shift[0], end = shift[1], direction = shift[2];
            int delta = direction == 1 ? 1 : -1;
            diff[start] += delta;
            diff[end + 1] -= delta;
        }
        
        var result = new char[n];
        int netShift = 0;
        
        for (int i = 0; i < n; i++)
        {
            netShift += diff[i];
            int shifted = ((s[i] - 'a') + netShift) % 26;
            if (shifted < 0) shifted += 26;
            result[i] = (char)('a' + shifted);
        }
        
        return new string(result);
    }
}
```

## Complexity

- **Time:** O(n + m) where m is number of shifts
- **Space:** O(n)
