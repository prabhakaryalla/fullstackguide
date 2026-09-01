# 3330. Find the Original Typed String I

**Difficulty:** Easy
**Category:** String

## Problem

Alice is typing a string but may hold a key too long, causing a character to be typed multiple times **at most once**. Given the resulting string `word`, return the number of possible original strings she might have intended to type.

### Example

Input: `word = "abbcccc"`

Output: `5`

Explanation: The possible originals are `"abbcccc"`, `"abbccc"`, `"abbcc"`, `"abbc"`, and `"abcccc"`.

## Approach

Split `word` into maximal runs of identical consecutive characters. Since at most one run can be the site of the "held too long" mistake, and that run of length `L` could have originally been any length from `1` to `L`, the total count is `1` (no mistake at all, i.e., the string as typed exactly) plus the sum over each run of `(L - 1)` possible shorter originals for that run alone.

## C# Solution

```csharp
public class Solution 
{
    public int PossibleStringCount(string word) 
    {
        int n = word.Length;
        int ans = 1;
        int i = 0;
        while (i < n)
        {
            int j = i;
            while (j < n && word[j] == word[i]) j++;
            ans += (j - i) - 1;
            i = j;
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1) extra space.
