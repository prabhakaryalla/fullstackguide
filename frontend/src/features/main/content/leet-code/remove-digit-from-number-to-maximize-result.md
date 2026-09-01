# 2259. Remove Digit From Number to Maximize Result

**Difficulty:** Easy
**Category:** String, Greedy, Enumeration

## Problem

You are given a string `number` representing a positive integer and a character `digit`. Return the resulting string after removing exactly one occurrence of `digit` from `number` such that the value of the resulting string is maximized.

### Example

```
Input: number = "123", digit = "3"
Output: "12"
Explanation: Only one "3", so remove it. Result is "12".

Input: number = "1231", digit = "1"
Output: "231"
Explanation: Remove the first "1" to get "231" (larger than "123" from removing second "1").
```

## Approach

Find all positions where `digit` appears. For each position, remove that digit and compare the resulting strings lexicographically. Return the maximum.

## C# Solution

```csharp
public class Solution
{
    public string RemoveDigit(string number, char digit)
    {
        string max = "";
        
        for (int i = 0; i < number.Length; i++)
        {
            if (number[i] == digit)
            {
                string candidate = number.Substring(0, i) + number.Substring(i + 1);
                if (string.Compare(candidate, max) > 0)
                {
                    max = candidate;
                }
            }
        }
        
        return max;
    }
}
```

## Complexity

- **Time:** O(n²) for string operations.
- **Space:** O(n) for candidate strings.
