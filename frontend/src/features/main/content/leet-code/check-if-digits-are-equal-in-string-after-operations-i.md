# 3461. Check If Digits Are Equal in String After Operations I

**Difficulty:** Easy
**Category:** String, Simulation, Math

## Problem

You are given a string `s` consisting of digits. Repeatedly perform the following operation until the string has exactly two digits left: for every pair of adjacent digits, compute their sum modulo 10 and replace the whole string with this new sequence (one character shorter each round). Return `true` if the final two digits are equal, otherwise `false`.

### Example

`s = "3902"` → step 1 combines adjacent pairs `(3+9)%10=2`, `(9+0)%10=9`, `(0+2)%10=2`, giving `"292"`; step 2 gives `(2+9)%10=1`, `(9+2)%10=1`, giving `"11"`. Both final digits are `1`, so the answer is `true`.

## Approach

Since the string length is small, simulate the process directly: repeatedly build a new sequence where each position is the modulo-10 sum of two adjacent digits from the previous sequence, shrinking the sequence by one each round, until only two digits remain, then compare them.

## C# Solution

```csharp
public class Solution 
{
    public bool HasSameDigits(string s) 
    {
        char[] cur = s.ToCharArray();
        int len = cur.Length;

        while (len > 2)
        {
            for (int i = 0; i < len - 1; i++)
            {
                int d = (cur[i] - '0' + cur[i + 1] - '0') % 10;
                cur[i] = (char)('0' + d);
            }
            len--;
        }

        return cur[0] == cur[1];
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n)
