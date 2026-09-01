# 2315. Count Asterisks

**Difficulty:** Easy
**Category:** String

## Problem

You are given a string `s`, where every two consecutive vertical bars `'|'` are grouped into a pair. In other words, the 1st and 2nd `'|'` make a pair, the 3rd and 4th `'|'` make a pair, and so forth.

Return the number of `'*'` in `s`, excluding the `'*'` between each pair of `'|'`.

### Example

```
Input: s = "l|*e*et|c**o|*de|"
Output: 2
Explanation: The asterisks outside pairs are at index 1 and index 12.
```

## Approach

Track whether we are currently inside a pair (between two bars). Toggle this state each time we encounter a `'|'`. Only count asterisks when we are outside pairs.

## C# Solution

```csharp
public class Solution
{
    public int CountAsterisks(string s)
    {
        int count = 0;
        bool insidePair = false;
        
        foreach (char c in s)
        {
            if (c == '|')
            {
                insidePair = !insidePair;
            }
            else if (c == '*' && !insidePair)
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n) where n is length of s
- **Space:** O(1)
