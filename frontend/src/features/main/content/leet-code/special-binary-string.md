# 761. Special Binary String

**Difficulty:** Hard
**Category:** String, Recursion, Sorting, Divide and Conquer

## Problem

A special binary string satisfies: it has an equal number of `0`s and `1`s, and every prefix has at least as many `1`s as `0`s. Given a special binary string `s`, you may swap any two contiguous, non-empty special substrings and repeat any number of times. Return the lexicographically largest resulting string.

### Example

```
Input: s = "11011000"
Output: "11100100"
```

## Approach

Decompose `s` into its top-level primitive special substrings (each starting and ending exactly when a running balance of `1`s minus `0`s returns to zero). Each such substring has the form `"1" + inner + "0"`, where `inner` is itself a special string; recursively maximize `inner`. After recursively maximizing every primitive piece, sort the resulting pieces in descending lexicographic order and concatenate them — since each piece starts with `1` and ends with `0`, ordinary string comparison correctly determines which arrangement produces the largest combined string.

## C# Solution

```csharp
public class Solution
{
    public string MakeLargestSpecial(string s)
    {
        if (s.Length <= 2) return s;

        var subStrings = new List<string>();
        int count = 0, start = 0;

        for (int i = 0; i < s.Length; i++)
        {
            count += s[i] == '1' ? 1 : -1;

            if (count == 0)
            {
                subStrings.Add("1" + MakeLargestSpecial(s.Substring(start + 1, i - start - 1)) + "0");
                start = i + 1;
            }
        }

        subStrings.Sort(StringComparer.Ordinal);
        subStrings.Reverse();

        return string.Concat(subStrings);
    }
}
```

## Complexity

- **Time:** `O(n^2 log n)` in the worst case, due to recursive splitting and sorting.
- **Space:** `O(n^2)` for the recursion and intermediate substrings.
