# 3714. Longest Balanced Substring II

**Difficulty:** Medium
**Category:** Hash Table, String, Prefix Sum

## Problem

Same as "Longest Balanced Substring I" but `s` can be much longer, so the solution must run in linear time.

### Example

s = "010101" → the entire string is balanced (3 zeros, 3 ones), so the answer is 6.

## Approach

The prefix-sum technique from the first version is already linear: map `'0'` to `-1`, `'1'` to `+1`, track the first index of each prefix sum in a hash map, and take the maximum span between repeated prefix values.

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
