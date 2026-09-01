# 2546. Apply Bitwise Operations to Make Strings Equal

**Difficulty:** Medium
**Category:** String, Bit Manipulation

## Problem

You are given two 0-indexed binary strings `s` and `target` of the same length `n`. You can do the following operation any number of times:
- Choose two different indices `i` and `j` where `0 <= i, j < n`
- Simultaneously, replace `s[i]` with `(s[i] OR s[j])` and `s[j]` with `(s[i] XOR s[j])`

Return `true` if you can make `s` equal to `target`, or `false` otherwise.

### Example

```
Input: s = "1010", target = "0110"
Output: true
Explanation: Multiple operations can transform s to target.
```

## Approach

Key insight: the operation preserves the presence of at least one '1' in the string. If s has at least one '1', we can transform it to any other string with at least one '1'. If s is all '0's, we cannot introduce a '1'. Check if both strings have the same "has at least one 1" property.

## C# Solution

```csharp
public class Solution
{
    public bool MakeStringsEqual(string s, string target)
    {
        bool sHasOne = s.Contains('1');
        bool targetHasOne = target.Contains('1');
        
        return sHasOne == targetHasOne;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the strings
- **Space:** O(1)
