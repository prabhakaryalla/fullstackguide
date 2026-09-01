# 3707. Equal Score Substrings

**Difficulty:** Easy
**Category:** String, Prefix Sum

## Problem

You are given a string `s` consisting of lowercase English letters.

The score of a string is the sum of the positions of its characters in the alphabet, where `'a' = 1`, `'b' = 2`, ..., `'z' = 26`.

Determine whether there exists an index `i` such that `s` can be split into two non-empty substrings `s[0..i]` and `s[(i+1)..(n-1)]` that have equal scores.

Return `true` if such a split exists, otherwise return `false`.

### Example

```
Input: s = "adcb"
Output: true
Explanation: Split at index 1: "ad" (score 5) and "cb" (score 5).
```

### Constraints

- `2 <= s.length <= 100`
- `s` consists of lowercase English letters.

## Approach

Compute the total score of the string, then scan left to right accumulating a running left-side score. At each possible split point, the right-side score is the total minus the running left score; if the two are equal, a valid split has been found.

## C# Solution

```csharp
public class Solution
{
    public bool ScoreBalance(string s)
    {
        int n = s.Length;
        int[] score = new int[n];
        for (int i = 0; i < n; i++)
        {
            score[i] = s[i] - 'a' + 1;
        }

        int totalScore = 0;
        foreach (int sc in score) totalScore += sc;

        int leftScore = 0;
        for (int i = 0; i < n - 1; i++)
        {
            leftScore += score[i];
            int rightScore = totalScore - leftScore;

            if (leftScore == rightScore)
            {
                return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)`.
