# 2864. Maximum Odd Binary Number

**Difficulty:** Easy
**Category:** String, Math, Greedy

## Problem

You are given a binary string `s` that contains at least one '1'. You can rearrange the bits in any order to form a new binary number.

Return the maximum odd binary number you can create. The result should be returned as a string. Note that the resulting string can have leading zeros.

### Example

```
Input: s = "010"
Output: "001"
Explanation:
To make the number odd, the last digit must be '1'.
The maximum odd number is "001".
```

## Approach

For a binary number to be odd, it must end with '1'. To maximize the value, place all remaining '1's at the beginning and all '0's in the middle.

Count the number of '1's and '0's. Place `count1 - 1` ones at the start, then all zeros, then one '1' at the end.

## C# Solution

```csharp
public class Solution
{
    public string MaximumOddBinaryNumber(string s)
    {
        int count1 = s.Count(c => c == '1');
        int count0 = s.Length - count1;
        
        return new string('1', count1 - 1) + new string('0', count0) + '1';
    }
}
```

## Complexity

- **Time:** `O(n)` to count characters and build result.
- **Space:** `O(n)` for the result string.
