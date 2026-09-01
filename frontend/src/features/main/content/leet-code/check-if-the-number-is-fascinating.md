# 2729. Check if The Number is Fascinating

**Difficulty:** Easy
**Category:** Math, String

## Problem

You are given an integer `n`. We call `n` fascinating if after performing the following concatenation operation, the resulting number contains all the digits from 1 to 9 exactly once and does not contain any 0's:
- Concatenate `n` with the numbers `2 * n` and `3 * n`.

Return `true` if `n` is fascinating, or `false` otherwise.

### Example

```
Input: n = 192
Output: true
Explanation: 192 + 384 + 576 = "192384576" contains all 1-9 exactly once
```

## Approach

Concatenate `n`, `2*n`, and `3*n` into a string. Check if the result has length 9, contains all digits 1-9 exactly once, and contains no zeros.

## C# Solution

```csharp
public class Solution
{
    public bool IsFascinating(int n)
    {
        string concat = n.ToString() + (2 * n).ToString() + (3 * n).ToString();
        
        if (concat.Length != 9)
        {
            return false;
        }
        
        var freq = new int[10];
        
        foreach (char c in concat)
        {
            int digit = c - '0';
            freq[digit]++;
        }
        
        if (freq[0] > 0) return false;
        
        for (int i = 1; i <= 9; i++)
        {
            if (freq[i] != 1) return false;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
