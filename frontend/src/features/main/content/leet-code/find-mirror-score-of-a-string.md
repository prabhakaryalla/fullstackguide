# 3412. Find Mirror Score of a String

**Difficulty:** Medium
**Category:** String, Stack, Hash Table

## Problem

You are given a string `s`. We define the **mirror** of a letter as the corresponding letter when the alphabet is reversed (for example, the mirror of `'a'` is `'z'`, and the mirror of `'y'` is `'b'`).

Process the string from left to right. For each index `i`, if there exists an index `j < i` such that `s[j]` is the mirror of `s[i]` and `s[j]` has not yet been matched, choose the **closest** such `j`, add `i - j` to the total score, and mark both indices as matched. Otherwise, do nothing for that index (it becomes available to be matched by a future index).

Return the total score after processing the whole string.

### Example

`s = "aczzx"`

- `i=0` (`'a'`): no unmatched `'z'` yet, do nothing.
- `i=1` (`'c'`): no unmatched `'x'` yet, do nothing.
- `i=2` (`'z'`): mirror of `'z'` is `'a'`; index 0 is unmatched, so match with it. Score += `2 - 0 = 2`.
- `i=3` (`'z'`): no unmatched `'a'` remains, do nothing.
- `i=4` (`'x'`): mirror of `'x'` is `'c'`; index 1 is unmatched, so match with it. Score += `4 - 1 = 3`.

Total score: `5`.

## Approach

Keep 26 stacks (one per letter), each storing the indices of that letter that haven't been matched yet. For each character at index `i`, check the stack of its mirror letter: if it's non-empty, pop the most recent index `j` and add `i - j` to the score (this greedily matches with the closest unmatched mirror, which is optimal since it never blocks a later match more than an earlier one would). Otherwise, push `i` onto the current character's own stack so it can be matched later.

## C# Solution

```csharp
public class Solution 
{
    public long CalculateScore(string s) 
    {
        var indexStacks = new Stack<int>[26];
        for (int i = 0; i < 26; i++) 
        {
            indexStacks[i] = new Stack<int>();
        }

        long score = 0;
        for (int i = 0; i < s.Length; i++) 
        {
            int c = s[i] - 'a';
            int mirror = 25 - c;
            if (indexStacks[mirror].Count > 0) 
            {
                int j = indexStacks[mirror].Pop();
                score += i - j;
            } 
            else 
            {
                indexStacks[c].Push(i);
            }
        }
        return score;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
