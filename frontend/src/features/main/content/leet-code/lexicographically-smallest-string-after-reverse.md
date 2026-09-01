# 3722. Lexicographically Smallest String After Reverse

**Difficulty:** Medium
**Category:** String, Greedy, Two Pointers

## Problem

Given a string `s`, you must reverse exactly one contiguous substring of `s` (possibly of length 1, i.e. no visible change). Return the lexicographically smallest string achievable.

### Example

s = "cba" → reversing the whole string gives "abc", the smallest possible result.

## Approach

Find the first index `i` where `s[i] > s[i+1]`; if no such index exists, `s` is already non-decreasing and reversing a single character leaves it optimal. Otherwise, find the smallest character in `s[i..]` and its last occurrence index `j` (reversing up to the last occurrence pulls the most characters into better order), then reverse `s[i..j]`.

## C# Solution

```csharp
public class Solution 
{
    public string SmallestStringAfterReverse(string s) 
    {
        char[] arr = s.ToCharArray();
        int n = arr.Length;
        int i = 0;
        while (i + 1 < n && arr[i] <= arr[i + 1]) i++;
        if (i + 1 == n) return s;

        char minChar = arr[i + 1];
        int j = i + 1;
        for (int k = i + 1; k < n; k++) 
        {
            if (arr[k] <= minChar) 
            {
                minChar = arr[k];
                j = k;
            }
        }

        Array.Reverse(arr, i, j - i + 1);
        return new string(arr);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
