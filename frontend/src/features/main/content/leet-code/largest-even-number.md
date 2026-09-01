# 3798. Largest Even Number

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` consisting only of `'1'` and `'2'`, delete any number of characters (preserving order) to form the largest possible resultant string representing an even integer. Return that string, or `""` if impossible.

### Example

Input: `s = "221"`
Output: `"22"`

Deleting `'1'` leaves `"22"`, an even number.

## Approach

An even number must end in `'2'` (since digits are only 1 or 2). To maximize the value, keep the string as long as possible and ending as late as possible: find the last occurrence of `'2'` in `s`. If none exists, return `""`; otherwise return the prefix up to and including that index.

## C# Solution

```csharp
public class Solution 
{
    public string LargestEvenNumber(string s) 
    {
        int lastTwo = s.LastIndexOf('2');
        if (lastTwo == -1) return "";
        return s.Substring(0, lastTwo + 1);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
