# 3713. Longest Balanced Substring I

**Difficulty:** Medium
**Category:** Hash Table, String, Prefix Sum

## Problem

Given a binary string `s` (containing only `'0'` and `'1'`), find the length of the longest substring that contains an equal number of `'0'`s and `'1'`s.

### Example

s = "00110" → the substring "0011" has two `'0'`s and two `'1'`s, length 4, which is the longest balanced substring.

## Approach

Map `'0'` to `-1` and `'1'` to `+1`, and compute a running prefix sum. A substring `s[i+1..j]` is balanced exactly when `prefix[j] == prefix[i]`. Track the first index at which each prefix value occurs in a hash map, and update the best length whenever the same prefix value is seen again.

## C# Solution

```csharp
public class Solution 
{
    public int LongestBalancedSubstring(string s) 
    {
        var firstSeen = new Dictionary<int, int> { { 0, -1 } };
        int prefix = 0, best = 0;
        for (int i = 0; i < s.Length; i++) 
        {
            prefix += s[i] == '1' ? 1 : -1;
            if (firstSeen.TryGetValue(prefix, out int idx)) 
            {
                best = Math.Max(best, i - idx);
            } 
            else 
            {
                firstSeen[prefix] = i;
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
