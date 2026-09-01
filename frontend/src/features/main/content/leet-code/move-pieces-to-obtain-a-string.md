# 2337. Move Pieces to Obtain a String

**Difficulty:** Medium
**Category:** String, Two Pointers

## Problem

You are given two strings `start` and `target`, both of length `n`. Each string consists only of the characters `'L'`, `'R'`, and `'_'` where:

- The characters `'L'` and `'R'` represent pieces, where a piece `'L'` can move to the left only if there is a blank space directly to its left, and a piece `'R'` can move to the right only if there is a blank space directly to its right.
- The character `'_'` represents a blank space that can be occupied by any of the `'L'` or `'R'` pieces.

Return `true` if it is possible to obtain the string `target` by moving the pieces of the string `start` any number of times. Otherwise, return `false`.

### Example

```
Input: start = "_L__R__R_", target = "L______RR"
Output: true
Explanation: L moves left, R's move right
```

## Approach

First, verify that both strings have the same sequence of 'L' and 'R' pieces (ignoring '_'). Then check movement constraints: each 'L' can only move left (index in start >= index in target) and each 'R' can only move right (index in start <= index in target).

## C# Solution

```csharp
public class Solution
{
    public bool CanChange(string start, string target)
    {
        if (start.Replace("_", "") != target.Replace("_", ""))
            return false;
        
        int n = start.Length;
        int i = 0, j = 0;
        
        while (i < n && j < n)
        {
            while (i < n && start[i] == '_') i++;
            while (j < n && target[j] == '_') j++;
            
            if (i == n && j == n) return true;
            if (i == n || j == n) return false;
            
            if (start[i] != target[j]) return false;
            
            if (start[i] == 'L' && i < j) return false;
            if (start[i] == 'R' && i > j) return false;
            
            i++;
            j++;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
