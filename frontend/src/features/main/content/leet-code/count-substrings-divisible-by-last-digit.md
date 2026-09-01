# 3448. Count Substrings Divisible By Last Digit

**Difficulty:** Hard
**Category:** Hash Table, String, Dynamic Programming, Math

## Problem
Given a string `s` of digits, return the number of substrings such that the substring, interpreted as an integer, is divisible by its last digit. Note: `0` cannot be the last digit of a valid divisor, so substrings ending in `0` are counted with divisor rule using... actually substrings ending in digit `d` (1-9) must be divisible by `d`; if the substring ends in `0`, since dividing by zero is invalid, such substrings are excluded from counting (per the constraint that the last digit is treated as the divisor, and division by 0 is undefined, these are skipped).

## Approach
For each ending index `j` and each possible last digit `d` (1-9), maintain the value of the substring `s[i..j]` modulo `d` for all starting indices `i`. Directly maintaining this per digit is expensive, so instead: for each starting index `i`, iterate over ending indices `j >= i`, maintaining a running remainder `mod[d]` for each divisor `d` from 1 to 9 as `mod[d] = (mod[d] * 10 + digit) % d`. When `s[j]` is the last digit `d` (1-9) of the substring `s[i..j]`, check if `mod[d] == 0` and increment the count. This runs in O(n^2) since digits 1-9 are a small constant factor.

## C# Solution

```csharp
public class Solution 
{
    public long CountSubstrings(string s) 
    {
        int n = s.Length;
        long count = 0;

        for (int i = 0; i < n; i++)
        {
            int[] mod = new int[10]; // mod[d] = current substring value mod d, for d in 1..9
            for (int j = i; j < n; j++)
            {
                int digit = s[j] - '0';
                for (int d = 1; d <= 9; d++)
                {
                    mod[d] = (mod[d] * 10 + digit) % d;
                }

                if (digit != 0 && mod[digit] == 0)
                {
                    count++;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n^2 * 9) which simplifies to O(n^2)
- **Space:** O(1) auxiliary (fixed-size array of 10)
