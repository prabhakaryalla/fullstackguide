# 2384. Largest Palindromic Number

**Difficulty:** Medium
**Category:** String, Hash Table, Greedy

## Problem

You are given a string `num` consisting of digits only.

Return the largest palindromic integer (in the form of a string) that can be formed using digits taken from `num`. It should not contain leading zeroes.

Notes:

- You do not need to use all the digits of `num`, but you must use at least one digit.
- The digits can be reordered.

### Example

```
Input: num = "444947137"
Output: "7449447"
```

## Approach

Count frequency of each digit. Use pairs of digits symmetrically from largest to smallest. Pick the largest odd-count digit for the middle. Handle the special case of leading zeros.

## C# Solution

```csharp
public class Solution
{
    public string LargestPalindromic(string num)
    {
        var freq = new int[10];
        foreach (char c in num)
        {
            freq[c - '0']++;
        }
        
        var left = new StringBuilder();
        int middle = -1;
        
        for (int d = 9; d >= 0; d--)
        {
            int pairs = freq[d] / 2;
            if (left.Length == 0 && d == 0)
                continue;
            
            left.Append(new string((char)('0' + d), pairs));
            
            if (middle == -1 && freq[d] % 2 == 1)
            {
                middle = d;
            }
        }
        
        if (left.Length == 0 && middle == -1)
            return "0";
        
        var result = new StringBuilder(left.ToString());
        if (middle != -1)
            result.Append((char)('0' + middle));
        
        for (int i = left.Length - 1; i >= 0; i--)
        {
            result.Append(left[i]);
        }
        
        return result.ToString();
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
