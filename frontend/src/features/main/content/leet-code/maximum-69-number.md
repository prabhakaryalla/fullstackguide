# 1323. Maximum 69 Number

**Difficulty:** Easy
**Category:** Greedy, Math

## Problem

Given a positive integer `num` consisting only of digits `6` and `9`, return the maximum value obtainable by changing at most one digit.

### Example

```
Input: num = 9669
Output: 9969
```

## Approach

Changing the leftmost `6` to `9` always yields the largest possible number, since higher place values dominate the numeric value. Scan the digits from the most significant, flip the first `6` found to `9`, and stop.

## C# Solution

```csharp
public class Solution
{
    public int Maximum69Number(int num)
    {
        var digits = num.ToString().ToCharArray();

        for (int i = 0; i < digits.Length; i++)
        {
            if (digits[i] == '6')
            {
                digits[i] = '9';
                break;
            }
        }

        return int.Parse(new string(digits));
    }
}
```

## Complexity

- **Time:** `O(d)` where `d` is the number of digits.
- **Space:** `O(d)` for the character array.
