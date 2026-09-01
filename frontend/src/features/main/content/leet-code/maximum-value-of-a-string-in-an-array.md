# 2496. Maximum Value of a String in an Array

**Difficulty:** Easy
**Category:** Array, String

## Problem

The value of an alphanumeric string can be defined as:
- The numeric value of the string if it represents a number (contains only digits)
- The length of the string otherwise

Given an array of strings `strs`, return the maximum value of any string in the array.

### Example

```
Input: strs = ["alic3","bob","3","4","00000"]
Output: 5
Explanation: 
- "alic3" has a value of 5 (length)
- "bob" has a value of 3 (length)
- "3" has a value of 3 (numeric)
- "4" has a value of 4 (numeric)
- "00000" has a value of 0 (numeric)
Maximum is 5

Input: strs = ["1","01","001","0001"]
Output: 1
```

## Approach

For each string:
1. Check if it consists of only digits
2. If yes, parse it as an integer for its value
3. If no, its value is its length
4. Track and return the maximum value seen

## C# Solution

```csharp
public class Solution
{
    public int MaximumValue(string[] strs)
    {
        int maxValue = 0;
        
        foreach (string str in strs)
        {
            int value;
            if (IsNumeric(str))
            {
                value = int.Parse(str);
            }
            else
            {
                value = str.Length;
            }
            maxValue = Math.Max(maxValue, value);
        }
        
        return maxValue;
    }
    
    private bool IsNumeric(string s)
    {
        foreach (char c in s)
        {
            if (!char.IsDigit(c))
            {
                return false;
            }
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n × m) where n is the number of strings and m is the average length
- **Space:** O(1)
