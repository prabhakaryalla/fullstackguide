# 3571. Find the Shortest Superstring II

**Difficulty:** Easy
**Category:** String, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two strings `str1` and `str2`. Return the shortest string that contains both `str1` and `str2` as substrings. If there are multiple valid shortest strings, return any one of them.

### Example

`str1 = "abc"`, `str2 = "bcd"`. `"bc"` is a suffix of `str1` and a prefix of `str2`, so merging them at the overlap gives `"abcd"`, which contains both `"abc"` and `"bcd"` as substrings.

## Approach

If one string already contains the other as a substring, the longer string is the answer. Otherwise, try merging `str1` followed by `str2`, and `str2` followed by `str1`: for each ordering, find the largest overlap where a suffix of the first string matches a prefix of the second string, and merge them at that overlap. Return whichever of the two merges is shorter.

## C# Solution

```csharp
public class Solution 
{
    public string ShortestSuperstring(string str1, string str2) 
    {
        if (str1.Contains(str2))
        {
            return str1;
        }
        if (str2.Contains(str1))
        {
            return str2;
        }

        string merge1 = Merge(str1, str2);
        string merge2 = Merge(str2, str1);

        return merge1.Length <= merge2.Length ? merge1 : merge2;
    }

    private string Merge(string a, string b) 
    {
        int maxOverlap = Math.Min(a.Length, b.Length);
        for (int len = maxOverlap; len > 0; len--)
        {
            if (a.Substring(a.Length - len) == b.Substring(0, len))
            {
                return a + b.Substring(len);
            }
        }
        return a + b;
    }
}
```

## Complexity

- **Time:** O((n + m)^2)
- **Space:** O(n + m)
