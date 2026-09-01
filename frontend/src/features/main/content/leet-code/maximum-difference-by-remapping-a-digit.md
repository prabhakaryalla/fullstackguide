# 2566. Maximum Difference by Remapping a Digit

**Difficulty:** Easy
**Category:** Math, Greedy

## Problem

You are given an integer `num`. You can remap one of the digits in `num` to another digit (0-9), and all occurrences of that digit must be replaced.

Return the maximum difference between the maximum and minimum values obtainable by remapping exactly one digit.

### Example

```
Input: num = 11891
Output: 99009
Explanation:
To get max: remap 1→9 to get 99899
To get min: remap 1→0 to get 00890 = 890
Difference = 99899 - 890 = 99009

Input: num = 90
Output: 99
Explanation:
Max: remap 0→9 to get 99
Min: already minimum (can't make smaller by remapping)
Difference = 99 - 90 = 9
```

## Approach

To maximize:
- Find the first digit from the left that is not 9
- Replace all occurrences of that digit with 9

To minimize:
- If the first digit is not 1, replace all occurrences with 1
- Otherwise, find the first digit from left that is not 0 or 1, and replace all occurrences with 0

Calculate the difference between the two resulting numbers.

## C# Solution

```csharp
public class Solution
{
    public int MinMaxDifference(int num)
    {
        string s = num.ToString();
        
        // Find maximum
        int maxNum = num;
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] != '9')
            {
                maxNum = int.Parse(s.Replace(s[i], '9'));
                break;
            }
        }
        
        // Find minimum
        int minNum = num;
        if (s[0] != '1')
        {
            minNum = int.Parse(s.Replace(s[0], '1'));
        }
        else
        {
            for (int i = 1; i < s.Length; i++)
            {
                if (s[i] != '0' && s[i] != '1')
                {
                    minNum = int.Parse(s.Replace(s[i], '0'));
                    break;
                }
            }
        }
        
        return maxNum - minNum;
    }
}
```

## Complexity

- **Time:** O(d) where d is the number of digits
- **Space:** O(d) for string operations
