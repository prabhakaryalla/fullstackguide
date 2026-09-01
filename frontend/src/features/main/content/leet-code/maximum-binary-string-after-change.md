# 1702. Maximum Binary String After Change

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

You are given a binary string `binary` consisting only of `0`s and `1`s. You can apply either of the following operations any number of times: replace `"00"` with `"10"`, or replace `"10"` with `"01"`. Return the maximum binary string (as a numeric value) you can obtain after any number of operations.

### Example

```
Input: binary = "000110"
Output: "111011"
```

## Approach

Repeatedly applying `"10" -> "01"` lets any `1` "bubble" rightward past zeros for free, so all zeros except one can effectively be pushed together and turned into ones via `"00" -> "10"`. If there is at most one zero the string is already optimal. Otherwise, keep the leading run of ones untouched, place all-but-one of the remaining zeros as ones, then a single `0`, then fill the rest with ones.

## C# Solution

```csharp
public class Solution
{
    public string MaximumBinaryString(string binary)
    {
        int n = binary.Length;
        int zeroCount = 0, firstZero = -1;
        for (int i = 0; i < n; i++)
        {
            if (binary[i] == '0')
            {
                zeroCount++;
                if (firstZero == -1) firstZero = i;
            }
        }

        if (zeroCount <= 1) return binary;

        var sb = new System.Text.StringBuilder();
        sb.Append('1', firstZero);
        sb.Append('1', zeroCount - 1);
        sb.Append('0');
        sb.Append('1', n - firstZero - zeroCount);
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result string.
