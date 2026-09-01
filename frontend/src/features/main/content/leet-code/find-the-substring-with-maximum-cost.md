# 2606. Find the Substring With Maximum Cost

**Difficulty:** Medium
**Category:** Array, String, Dynamic Programming

## Problem

You are given a string `s`, a string `chars` of distinct characters, and an integer array `vals` of the same length as `chars`. The cost of a string is the sum of values of its characters. The value of a character is defined as follows:

- If the character is not in `chars`, then its value is its position (1-indexed) in the alphabet.
- Otherwise, its value is `vals[i]` where `i` is the index such that `chars[i] == character`.

Return the maximum cost among all non-empty substrings of `s`.

### Example

```
Input: s = "adaa", chars = "d", vals = [-1000]
Output: 2
Explanation: The substring "aa" has cost 1 + 1 = 2.
```

## Approach

Build a value map for each character. Then use Kadane's algorithm to find the maximum subarray sum, treating each character's value as an element in the array.

## C# Solution

```csharp
public class Solution
{
    public int MaximumCostSubstring(string s, string chars, int[] vals)
    {
        var valueMap = new Dictionary<char, int>();
        
        for (int i = 0; i < chars.Length; i++)
            valueMap[chars[i]] = vals[i];
        
        int maxCost = 0;
        int currentCost = 0;
        
        foreach (char c in s)
        {
            int value = valueMap.ContainsKey(c) ? valueMap[c] : c - 'a' + 1;
            currentCost = Math.Max(value, currentCost + value);
            maxCost = Math.Max(maxCost, currentCost);
        }
        
        return maxCost;
    }
}
```

## Complexity

- **Time:** O(n) — single pass through the string
- **Space:** O(1) — fixed size character map
