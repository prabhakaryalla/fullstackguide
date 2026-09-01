# 3270. Find the Key of the Numbers

**Difficulty:** Easy
**Category:** Math

## Problem

You are given three positive integers `num1`, `num2`, and `num3`. The key of the three numbers is defined as a four-digit number formed as follows: first, if a number has fewer than four digits, pad it with leading zeros so all three numbers have exactly four digits. Then, for each digit position (1-indexed from the left), the digit of the key at that position is the smallest of the corresponding digits among the three padded numbers. Return the key as an integer, without any leading zeros.

### Example

```
Input: num1 = 1, num2 = 10, num3 = 1000
Output: 0
Explanation:
Padded: "0001", "0010", "1000"
Key digits: min(0,0,1)=0, min(0,0,0)=0, min(0,1,0)=0, min(1,0,0)=0 -> "0000" -> 0
```

## Approach

Pad each number's string representation to length 4 with leading zeros. Build the key digit by digit by taking the minimum character (digit) among the three padded strings at each position. Parse the resulting 4-character string back into an integer, which automatically strips any leading zeros.

## C# Solution

```csharp
public class Solution 
{
    public int GenerateKey(int num1, int num2, int num3) 
    {
        string s1 = num1.ToString().PadLeft(4, '0');
        string s2 = num2.ToString().PadLeft(4, '0');
        string s3 = num3.ToString().PadLeft(4, '0');

        char[] key = new char[4];
        for (int i = 0; i < 4; i++) 
        {
            key[i] = (char)Math.Min(s1[i], Math.Min(s2[i], s3[i]));
        }

        return int.Parse(new string(key));
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
