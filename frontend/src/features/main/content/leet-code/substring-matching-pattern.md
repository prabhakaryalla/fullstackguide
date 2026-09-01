# 3407. Substring Matching Pattern

**Difficulty:** Easy
**Category:** String, Two Pointers

## Problem

You are given strings `s` and `p` where `p` contains **exactly one** `'*'` character. The `'*'` in `p` can be replaced with any sequence of zero or more lowercase English letters.

Return `true` if it's possible to replace the `'*'` in `p` such that the resulting string can be found as a **substring** of `s`; otherwise return `false`.

### Example

`s = "leetcode"`, `p = "ee*e"`

Splitting `p` at `'*'` gives `left = "ee"` and `right = "e"`. `"ee"` occurs in `s` starting at index 1 (`"ee..."`), and `"e"` occurs at index 7 (which is after `1 + 2 = 3`). So `p` can be matched (e.g., `"eetcod" + "e"`... more directly `"ee" + "tcod" + "e"`), and the answer is `true`.

## Approach

Split `p` around the single `'*'` into a left part `L` and a right part `R`. A match exists if there is some occurrence of `L` in `s` (at index `a`) and some occurrence of `R` in `s` (starting at index `b`) such that `b >= a + |L|` (so the `'*'` can absorb everything in between).

To maximize the chance of finding a valid pair, take the **leftmost** occurrence of `L` (minimizes `a`) and the **rightmost** occurrence of `R` (maximizes `b`). If these two extreme choices satisfy the gap condition, a valid replacement exists; if they don't, no other combination could work either.

## C# Solution

```csharp
public class Solution 
{
    public bool HasMatch(string s, string p) 
    {
        int starIndex = p.IndexOf('*');
        string left = p.Substring(0, starIndex);
        string right = p.Substring(starIndex + 1);

        int leftPos = s.IndexOf(left, StringComparison.Ordinal);
        if (leftPos == -1) 
        {
            return false;
        }

        int searchStart = leftPos + left.Length;
        if (right.Length == 0) 
        {
            return true;
        }

        int rightPos = s.LastIndexOf(right, StringComparison.Ordinal);
        return rightPos != -1 && rightPos >= searchStart;
    }
}
```

## Complexity

- **Time:** O(n * m), where n = |s| and m = max(|left|, |right|)
- **Space:** O(1) extra space
