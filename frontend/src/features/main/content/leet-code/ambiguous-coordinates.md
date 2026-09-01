# 816. Ambiguous Coordinates

**Difficulty:** Medium
**Category:** String, Backtracking

## Problem

A machine outputs coordinates like `"(123)"` by removing all commas, decimal points, and spaces from an original `(x, y)` pair. Given such a string, return every possible original representation `"(x, y)"` that could have produced it, where neither `x` nor `y` has extraneous leading zeroes (except `"0"` itself) or a trailing zero after a decimal point.

### Example

```
Input: s = "(123)"
Output: ["(1, 23)","(12, 3)","(1.2, 3)","(1, 2.3)"]
```

## Approach

Strip the outer parentheses, then try every way to split the remaining digits into a left part (for `x`) and a right part (for `y`). For each part, generate every valid way to insert a decimal point (or no decimal point at all): a part with no decimal point is valid unless it has a leading zero (and length > 1); a part split into integer and fractional pieces is valid only if the integer piece has no invalid leading zero and the fractional piece has no trailing zero. Combine every valid left option with every valid right option.

## C# Solution

```csharp
public class Solution
{
    public IList<string> AmbiguousCoordinates(string s)
    {
        var inner = s.Substring(1, s.Length - 2);
        var result = new List<string>();

        for (int i = 1; i < inner.Length; i++)
        {
            var left = inner.Substring(0, i);
            var right = inner.Substring(i);

            var leftOptions = GenerateNumbers(left);
            var rightOptions = GenerateNumbers(right);

            foreach (var l in leftOptions)
            {
                foreach (var r in rightOptions)
                {
                    result.Add($"({l}, {r})");
                }
            }
        }

        return result;
    }

    private List<string> GenerateNumbers(string s)
    {
        var options = new List<string>();

        if (s.Length == 1)
        {
            options.Add(s);
            return options;
        }

        if (s[0] != '0')
            options.Add(s);

        for (int i = 1; i < s.Length; i++)
        {
            var intPart = s.Substring(0, i);
            var fracPart = s.Substring(i);

            if (intPart.Length > 1 && intPart[0] == '0') continue;
            if (fracPart[fracPart.Length - 1] == '0') continue;

            options.Add(intPart + "." + fracPart);
        }

        return options;
    }
}
```

## Complexity

- **Time:** `O(n^3)` in the worst case.
- **Space:** `O(n^2)` for the generated candidates.
