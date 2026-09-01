# 2710. Remove Trailing Zeros From a String

**Difficulty:** Easy
**Category:** Two Pointers, String, Simulation

## Problem

Given a positive integer represented as a string `num`, remove any trailing zeros and return the resulting string.

### Example

Input: num = "51230100"
Output: "512301"
Explanation: The trailing zeros "00" are removed, leaving "512301".

## Approach

Scan from the end of the string and find the last index that is not `'0'`. Return the substring from the start of the string up to (and including) that index. Since `num` represents a positive integer, it is guaranteed to have at least one non-zero digit remaining.

## C# Solution

```csharp
public class Solution 
{
    public string RemoveTrailingZeros(string num)
    {
        int end = num.Length;
        while (end > 0 && num[end - 1] == '0')
        {
            end--;
        }
        return num.Substring(0, end);
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `num`.
- **Space:** O(n) for the resulting substring.
