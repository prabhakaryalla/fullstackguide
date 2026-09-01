# 564. Find the Closest Palindrome

**Difficulty:** Hard
**Category:** Math, String

## Problem

Given a numeric string `n`, return the closest integer (as a string) that is a palindrome and not equal to `n`. If multiple exist, return the smaller one.

### Example

```
Input: n = "123"
Output: "121"
```

### Constraints

- `1 <= n.length <= 18`
- `n` consists of only digits.
- `n` has no leading zeros.

## Approach

The closest palindrome candidates always come from a small fixed set: the all-9s number one digit shorter, the `100...001` number one digit longer, and the palindromes formed by mirroring the first half of `n` itself after adjusting that half by `-1`, `0`, or `+1` (handling the carry/borrow into the mirrored half). Generate all these candidates, exclude `n` itself, and pick whichever remaining candidate is numerically closest (breaking ties by choosing the smaller value).

## C# Solution

```csharp
public class Solution
{
    public string NearestPalindromic(string n)
    {
        int len = n.Length;
        long num = long.Parse(n);

        var candidates = new HashSet<long>
        {
            (long)Math.Pow(10, len - 1) - 1,
            (long)Math.Pow(10, len) + 1
        };

        long prefix = long.Parse(n.Substring(0, (len + 1) / 2));

        for (long delta = -1; delta <= 1; delta++)
        {
            var prefixStr = (prefix + delta).ToString();
            var candidate = BuildPalindrome(prefixStr, len % 2 == 0);
            candidates.Add(candidate);
        }

        long best = -1;
        foreach (var candidate in candidates)
        {
            if (candidate == num) continue;

            if (best == -1
                || Math.Abs(candidate - num) < Math.Abs(best - num)
                || (Math.Abs(candidate - num) == Math.Abs(best - num) && candidate < best))
            {
                best = candidate;
            }
        }

        return best.ToString();
    }

    private long BuildPalindrome(string prefix, bool evenLength)
    {
        var reversed = new string(prefix.Reverse().ToArray());
        var full = evenLength ? prefix + reversed : prefix + new string(reversed.Skip(1).ToArray());
        return long.Parse(full);
    }
}
```

## Complexity

- **Time:** `O(len)`.
- **Space:** `O(len)` for the candidate strings.
