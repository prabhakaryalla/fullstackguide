# 299. Bulls and Cows

**Difficulty:** Medium
**Category:** Hash Table, String, Counting

## Problem

Given a secret code `secret` and a guess `guess`, both strings of the same length made of digits, return a hint in the form `"xAyB"` where `x` is the number of "bulls" (digits matching in both value and position) and `y` is the number of "cows" (digits present in both but at different positions).

### Example

```
Input: secret = "1807", guess = "7810"
Output: "1A3B"
```

## Approach

First pass: count bulls (positions where `secret[i] == guess[i]`), and for the non-matching positions, tally digit frequencies separately for `secret` and `guess`. The total number of cows-plus-bulls contributed by each digit is the minimum of its frequency in the two (non-matching) tallies; summing those minimums over all digits and subtracting the bulls already counted gives the cow count.

## C# Solution

```csharp
public class Solution
{
    public string GetHint(string secret, string guess)
    {
        int bulls = 0;
        var secretCounts = new int[10];
        var guessCounts = new int[10];

        for (int i = 0; i < secret.Length; i++)
        {
            if (secret[i] == guess[i])
            {
                bulls++;
            }
            else
            {
                secretCounts[secret[i] - '0']++;
                guessCounts[guess[i] - '0']++;
            }
        }

        int cows = 0;
        for (int d = 0; d < 10; d++)
        {
            cows += Math.Min(secretCounts[d], guessCounts[d]);
        }

        return $"{bulls}A{cows}B";
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the strings plus a constant-size (10-digit) summary pass.
- **Space:** `O(1)` — fixed-size digit count arrays.
