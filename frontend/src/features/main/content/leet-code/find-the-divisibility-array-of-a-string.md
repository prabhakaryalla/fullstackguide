# 2575. Find the Divisibility Array of a String

**Difficulty:** Medium
**Category:** Array, Math, String

## Problem

You are given a 0-indexed string `word` of length `n` consisting of digits, and a positive integer `m`.

The divisibility array `div` of `word` is an integer array of length `n` such that:

- `div[i] = 1` if the numeric value of `word[0,...,i]` is divisible by `m`, or
- `div[i] = 0` otherwise

Return the divisibility array of `word`.

### Example

```
Input: word = "998244353", m = 3
Output: [1,1,0,0,0,1,1,0,0]
Explanation:
9 % 3 = 0 → div[0] = 1
99 % 3 = 0 → div[1] = 1
998 % 3 = 2 → div[2] = 0
...
998244 % 3 = 0 → div[5] = 1
```

## Approach

Cannot convert the entire prefix to an integer due to overflow. Instead, maintain a running remainder modulo `m`.

For each digit:
- Update remainder: `remainder = (remainder * 10 + digit) % m`
- If remainder is 0, the prefix is divisible by `m`

This uses the property: `(a * 10 + b) % m = ((a % m) * 10 + b) % m`

## C# Solution

```csharp
public class Solution
{
    public int[] DivisibilityArray(string word, int m)
    {
        int n = word.Length;
        int[] div = new int[n];
        long remainder = 0;
        
        for (int i = 0; i < n; i++)
        {
            int digit = word[i] - '0';
            remainder = (remainder * 10 + digit) % m;
            div[i] = remainder == 0 ? 1 : 0;
        }
        
        return div;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of word
- **Space:** O(1) excluding the output array
