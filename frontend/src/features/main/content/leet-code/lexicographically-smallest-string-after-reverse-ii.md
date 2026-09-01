# 3735. Lexicographically Smallest String After Reverse II

**Difficulty:** Medium
**Category:** String, Greedy, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a string `s`. In one operation you may choose two indices `i` and `j` such that `s[i] == s[j]`, and reverse the substring `s[i..j]`. You may perform this operation any number of times (including zero).

Return the lexicographically smallest string that can be obtained.

## Approach
Only the region between the **first** and **last** occurrence of the smallest character in `s` can ever be rearranged: any reversal must be anchored at two equal characters, and repeatedly reversing overlapping substrings anchored at occurrences of the smallest character lets that entire span be freely permuted into sorted order. Characters outside this span have no equal anchor pair available to move them, so they remain fixed.

Find the smallest character in `s`, locate its first and last occurrence, and sort the substring between them (inclusive) in ascending order, leaving the rest of the string unchanged.

## C# Solution

```csharp
public class Solution
{
    public string FindSmallestString(string s)
    {
        char[] arr = s.ToCharArray();
        int n = arr.Length;

        char minChar = arr[0];
        for (int i = 1; i < n; i++)
        {
            if (arr[i] < minChar) minChar = arr[i];
        }

        int first = Array.IndexOf(arr, minChar);
        int last = Array.LastIndexOf(arr, minChar);

        if (last > first)
        {
            Array.Sort(arr, first, last - first + 1);
        }

        return new string(arr);
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
