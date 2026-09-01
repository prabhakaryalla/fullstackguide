# 2207. Maximize Number of Subsequences in a String

**Difficulty:** Medium
**Category:** String, Greedy, Prefix Sum

## Problem

You are given a string `text` and a string `pattern` of length 2, where `pattern` consists of two different characters.

You can add either `pattern[0]` or `pattern[1]` anywhere in `text` exactly once. You want to maximize the number of times `pattern` can occur as a subsequence of the modified `text`.

Return the maximum number of times `pattern` can occur as a subsequence.

### Example

```
Input: text = "abdcdbc", pattern = "ac"
Output: 4
Explanation: If we add pattern[0] = 'a' at the beginning, text = "aabdcdbc".
Number of "ac" subsequences = 4 (using 'a' at positions 0 and 1 with 'c' at positions 4, 5, 6).
```

## Approach

For pattern "xy", the number of subsequences is determined by counting: for each 'y', how many 'x' characters appear before it.

Strategy:
1. Calculate current count of "xy" subsequences
2. Try adding 'x' at the beginning (maximizes pairs with existing 'y's)
3. Try adding 'y' at the end (maximizes pairs with existing 'x's)
4. Return the maximum

## C# Solution

```csharp
public class Solution
{
    public long MaximumSubsequenceCount(string text, string pattern)
    {
        char first = pattern[0];
        char second = pattern[1];
        
        long count = 0;
        long firstCount = 0;
        long secondCount = 0;
        
        // Count current subsequences
        foreach (char c in text)
        {
            if (c == second)
            {
                count += firstCount;
                secondCount++;
            }
            if (c == first)
            {
                firstCount++;
            }
        }
        
        // Option 1: Add first at beginning
        long option1 = count + secondCount;
        
        // Option 2: Add second at end
        long option2 = count + firstCount;
        
        return Math.Max(option1, option2);
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of text
- **Space:** O(1)
