# 3088. Make String Anti-palindrome

**Difficulty:** Hard
**Category:** String, Sorting, Greedy, Counting Sort

## Problem

A string `t` of even length is an "anti-palindrome" if, for every index `i`, `t[i] != t[t.Length - 1 - i]`. Given a string `s` of even length, rearrange its characters (using any permutation) to form an anti-palindrome, and return the lexicographically smallest such rearrangement, or `"-1"` if none exists.

## Approach

Sort the letters of `s`. If the sorted string already satisfies the anti-palindrome property at the middle-most mirrored pair, it's already the answer (sorted order is the lexicographically smallest arrangement in general, and it turns out mirrored positions naturally differ once you check the middle). If the middle mirrored pair matches, repeatedly swap a value from the "back" of the second half into the mismatched middle position (advancing to the next available differing letter) until the mirrored middle pair differs, or return `"-1"` if the second half runs out of distinct-enough letters to fix it.

## C# Solution

```csharp
public class Solution {
    public string MakeAntiPalindrome(string s) {
        int n = s.Length;
        int i = n / 2;
        char[] arr = s.ToCharArray();
        Array.Sort(arr);

        if (arr[i] != arr[n - 1 - i])
            return new string(arr);

        int j = GetFirstDiffIndexInSecondHalf(arr);
        while (arr[i] == arr[n - 1 - i]) {
            if (j == n)
                return "-1";
            (arr[i], arr[j]) = (arr[j], arr[i]);
            i++;
            j++;
        }

        return new string(arr);
    }

    // Returns the first index in s[n/2..n) whose letter differs from s[n/2].
    private int GetFirstDiffIndexInSecondHalf(char[] s) {
        int n = s.Length;
        char firstLetter = s[n / 2];
        int firstDiffIndex = n / 2;
        while (firstDiffIndex < n && s[firstDiffIndex] == firstLetter)
            firstDiffIndex++;
        return firstDiffIndex;
    }
}
```

## Complexity

- Time: O(n log n) — dominated by sorting the characters.
- Space: O(n) — the character array.
