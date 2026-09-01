# 3726. Remove Zeros in Decimal Representation

**Difficulty:** Easy
**Category:** Math, String

## Problem

Given a positive integer `num`, remove every digit `'0'` from its decimal representation and return the resulting integer.

### Example

num = 1020304 → removing zeros leaves "1234". Answer = 1234.

## Approach

Convert the number to a string, filter out all `'0'` characters, and parse the remaining digits back into an integer.

## C# Solution

```csharp
public class Solution 
{
    public int RemoveZeros(int num) 
    {
        string filtered = new string(num.ToString().Where(c => c != '0').ToArray());
        return int.Parse(filtered);
    }
}
```

## Complexity

- **Time:** O(d), where d is the number of digits
- **Space:** O(d)
