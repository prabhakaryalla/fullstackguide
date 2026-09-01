# 1662. Check If Two String Arrays are Equivalent

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given two string arrays `word1` and `word2`, return whether they represent the same overall string when each array's elements are concatenated in order.

### Example

```
Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
Output: true
```

## Approach

Concatenate every element of each array into a single string and compare the two results directly.

## C# Solution

```csharp
public class Solution
{
    public bool ArrayStringsAreEqual(string[] word1, string[] word2)
    {
        return string.Concat(word1) == string.Concat(word2);
    }
}
```

## Complexity

- **Time:** `O(n + m)`, the total character counts of both arrays.
- **Space:** `O(n + m)` for the concatenated strings.
