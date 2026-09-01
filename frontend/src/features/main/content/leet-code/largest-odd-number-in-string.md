# 1903. Largest Odd Number in String

**Difficulty:** Easy
**Category:** Math, String, Greedy

## Problem

Given a string `num` representing a large non-negative integer, return the largest-valued odd substring that is a prefix of `num` (i.e., `num[0..i]` for some `i`), or an empty string `""` if no odd substring prefix exists.

### Example

```
Input: num = "52"
Output: "5"
Explanation: "5" is odd, but the whole string "52" ends in an even digit, so trimming from the right gives the longest odd prefix.
```

### Constraints

- `1 <= num.length <= 10^5`
- `num` only consists of digits and does not contain any leading zeros unless the digit itself is `0`.

## Approach

The value of a prefix's parity is determined entirely by its last digit. Scan from the rightmost character of `num` toward the left, and return the substring ending at the first odd digit found. If no digit is odd, return an empty string.

## C# Solution

```csharp
public class Solution
{
    public string LargestOddNumber(string num)
    {
        for (int i = num.Length - 1; i >= 0; i--)
        {
            int digit = num[i] - '0';
            if (digit % 2 == 1)
            {
                return num.Substring(0, i + 1);
            }
        }

        return "";
    }
}
```

## Complexity

- **Time:** `O(n)` — scans at most the whole string once from the right.
- **Space:** `O(1)` extra space (excluding the returned substring).
