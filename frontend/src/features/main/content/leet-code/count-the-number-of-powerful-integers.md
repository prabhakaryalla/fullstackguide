# 2999. Count the Number of Powerful Integers

**Difficulty:** Hard
**Category:** Math, String, Dynamic Programming

## Problem

You are given three integers `start`, `finish`, `limit`, and a string `s`. An integer is powerful if:
- It's in the range `[start, finish]`
- Each digit is at most `limit`
- It ends with the string `s`

Return the count of powerful integers.

### Example

```
Input: start = 1, finish = 6000, limit = 4, s = "124"
Output: 5
Explanation: Powerful integers: 124, 1124, 2124, 3124, 4124

Input: start = 15, finish = 215, limit = 6, s = "10"
Output: 2
Explanation: 110, 210
```

## Approach

Use digit DP. For numbers ending with `s`, the prefix digits must each be at most `limit`. Count valid prefixes that, when combined with suffix `s`, fall in `[start, finish]`.

## C# Solution

```csharp
public class Solution
{
    public long NumberOfPowerfulInt(long start, long finish, int limit, string s)
    {
        return CountPowerful(finish, limit, s) - CountPowerful(start - 1, limit, s);
    }

    private long CountPowerful(long n, int limit, string s)
    {
        if (n < 0) return 0;

        string nStr = n.ToString();
        int suffixLen = s.Length;

        if (nStr.Length < suffixLen) return 0;

        // Check if suffix fits
        if (nStr.Length == suffixLen)
        {
            return long.Parse(nStr) >= long.Parse(s) ? 1 : 0;
        }

        int prefixLen = nStr.Length - suffixLen;
        long count = 0;

        // Count numbers with fewer digits in prefix
        for (int len = 1; len < prefixLen; len++)
        {
            count += (long)Math.Pow(limit + 1, len);
        }

        // Count numbers with same prefix length
        string prefix = nStr.Substring(0, prefixLen);
        string suffix = nStr.Substring(prefixLen);

        for (int i = 0; i < prefixLen; i++)
        {
            int digit = prefix[i] - '0';
            int maxDigit = Math.Min(digit - 1, limit);

            if (maxDigit >= 0)
            {
                count += (maxDigit + 1) * (long)Math.Pow(limit + 1, prefixLen - i - 1);
            }

            if (digit > limit) return count;
        }

        // Check if current number with suffix s is valid
        if (long.Parse(suffix) >= long.Parse(s))
        {
            count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(log(finish))
- **Space:** O(1)
