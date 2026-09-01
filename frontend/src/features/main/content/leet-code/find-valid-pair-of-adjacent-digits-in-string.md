# 3438. Find Valid Pair of Adjacent Digits in String

**Difficulty:** Easy
**Category:** String, Hash Table

## Problem

You are given a digit string `s`. Find the first pair of **adjacent** digits `s[i]` and `s[i+1]` such that:

- `s[i] != s[i+1]`
- The digit `s[i]` occurs in `s` exactly `s[i]` times (its own value).
- The digit `s[i+1]` occurs in `s` exactly `s[i+1]` times (its own value).

Return that pair as a 2-character substring, or an empty string `""` if no such pair exists.

### Example

`s = "022233"`

Digit counts: `0` occurs 1 time, `2` occurs 3 times, `3` occurs 2 times. Checking adjacent pairs left to right:
- `(0,2)` at index 0: `0` needs a count of `0` but occurs 1 time — invalid.
- `(2,2)` at index 1: digits are equal — invalid.
- `(2,2)` at index 2: digits are equal — invalid.
- `(2,3)` at index 3: `2` occurs 3 times but needs a count of `2` — invalid.
- `(3,3)` at index 4: digits are equal — invalid.

For a string like `s = "3323"`, counts are `3`->3 (matches value 3), `2`->1 (needs 2, fails). A valid match requires a digit `d` whose total count in the string equals `d` itself, adjacent to a different digit with the same property — the algorithm below finds the first such pair by scanning left to right, or returns `""` if none exists.

## Approach

Precompute the frequency of each digit `0-9` in `s`. Scan adjacent pairs left to right; return the first pair where both digits differ and each digit's total count in `s` equals its own numeric value.

## C# Solution

```csharp
public class Solution 
{
    public string FindValidPair(string s) 
    {
        int[] count = new int[10];
        foreach (char c in s) 
        {
            count[c - '0']++;
        }

        for (int i = 0; i + 1 < s.Length; i++) 
        {
            int a = s[i] - '0';
            int b = s[i + 1] - '0';
            if (a != b && count[a] == a && count[b] == b) 
            {
                return s.Substring(i, 2);
            }
        }
        return "";
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
