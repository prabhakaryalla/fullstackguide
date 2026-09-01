# 2914. Minimum Number of Changes to Make Binary String Beautiful

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

A binary string is called beautiful if it can be partitioned into one or more substrings where each substring has an even length and contains only '0's or only '1's. Return the minimum number of character changes needed to make the string beautiful.

### Example

```
Input: s = "1001"
Output: 2
Explanation: Change to "1111" (2 changes). It can be partitioned as "11" + "11".
```

## Approach

Use a greedy approach by processing pairs of characters. Since each beautiful substring must have even length and all same characters, the optimal strategy is to process the string in chunks of size 2. For each pair, if the characters differ, we need one change to make them the same.

## C# Solution

```csharp
public class Solution 
{
    public int MinChanges(string s) 
    {
        int changes = 0;
        
        for (int i = 0; i < s.Length; i += 2) 
        {
            if (s[i] != s[i + 1]) 
            {
                changes++;
            }
        }
        
        return changes;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
