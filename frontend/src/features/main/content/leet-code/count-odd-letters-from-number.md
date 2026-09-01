# 3581. Count Odd Letters From Number

**Difficulty:** Easy
**Category:** Math, String

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a non-negative integer `num`.

Convert `num` to a string by spelling out each of its digits individually using its English digit name (`0 -> "zero"`, `1 -> "one"`, ..., `9 -> "nine"`), and concatenating the digit names together in order.

Return the number of distinct letters that appear an **odd** number of times in the resulting string.

### Example

```
Input: num = 121
Output: 3
Explanation: "one" + "two" + "one" = "onetwoone".
Letter frequencies: o=3, n=2, e=2, t=1, w=1. Odd frequencies: o, t, w -> answer is 3.
```

**Constraints:**
- `0 <= num <= 10^9`

## Approach
Build the concatenated string by mapping each digit of `num` to its English word using a fixed lookup table. Then count the frequency of each of the 26 lowercase letters in the resulting string, and return how many of those letters have an odd total frequency.

## C# Solution

```csharp
public class Solution 
{
    private static readonly string[] DigitWords = 
    {
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
    };

    public int CountOddLetters(int num) 
    {
        string s = num.ToString();
        StringBuilder sb = new StringBuilder();
        foreach (char c in s)
        {
            sb.Append(DigitWords[c - '0']);
        }

        int[] freq = new int[26];
        foreach (char c in sb.ToString())
        {
            freq[c - 'a']++;
        }

        int count = 0;
        foreach (int f in freq)
        {
            if (f % 2 == 1) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(d), where d is the number of digits in `num` (the spelled-out string length is bounded by a constant factor of d).
- **Space:** O(1), the letter-frequency table has fixed size 26.
