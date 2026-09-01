# 1432. Max Difference You Can Get From Changing an Integer

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

Given a positive integer `num` with no leading or trailing zeros, form `num2` by picking a digit `x` and replacing every occurrence of `x` in `num` with another digit `y` (0-9), maximizing the result; form `num1` similarly but minimizing the result. Both replacements must keep `num2`/`num1` free of leading zeros. Return `num2 - num1`.

### Example

```
Input: num = 555
Output: 888
```

## Approach

To maximize: replace the first digit that isn't `9` with `9` everywhere it appears (leaves smaller digits untouched, and it's always safe since replacing with a bigger digit never introduces a leading zero). To minimize: if the leading digit isn't `1`, replace it (and every occurrence) with `1`; otherwise, find the first digit after the leading one that is neither `0` nor equal to the leading digit, and replace it with `0` (the leading digit is protected from becoming `0`).

## C# Solution

```csharp
public class Solution
{
    public int MaxDiff(int num)
    {
        string s = num.ToString();

        string maxS = s;
        foreach (var c in s)
        {
            if (c != '9')
            {
                maxS = s.Replace(c, '9');
                break;
            }
        }

        string minS = s;
        if (s[0] != '1')
        {
            minS = s.Replace(s[0], '1');
        }
        else
        {
            for (int i = 1; i < s.Length; i++)
            {
                if (s[i] != '0' && s[i] != s[0])
                {
                    minS = s.Replace(s[i], '0');
                    break;
                }
            }
        }

        return int.Parse(maxS) - int.Parse(minS);
    }
}
```

## Complexity

- **Time:** `O(d)` where `d` is the number of digits in `num`.
- **Space:** `O(d)` for the string representations.
