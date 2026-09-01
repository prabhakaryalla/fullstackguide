# 2024. Maximize the Confusion of an Exam

**Difficulty:** Medium
**Category:** String, Binary Search, Sliding Window

## Problem

You are given a string `answerKey` of `'T'` and `'F'` characters representing a true/false exam key, and an integer `k` representing the maximum number of answers you're allowed to flip. Return *the maximum number of consecutive same-answer questions you can achieve* after performing at most `k` flips.

## Approach

Run a sliding window twice: once trying to make everything `'T'` (counting how many `'F'`s are inside the window and flipping them), and once trying to make everything `'F'`. In each pass, expand the window's right edge, and whenever the count of "characters to flip" exceeds `k`, shrink from the left until it's valid again. Track the best window length found across both passes.

## C# Solution

```csharp
public class Solution
{
    public int MaxConsecutiveAnswers(string answerKey, int k)
    {
        return Math.Max(MaxLength(answerKey, k, 'T'), MaxLength(answerKey, k, 'F'));
    }

    private int MaxLength(string s, int k, char flipChar)
    {
        int left = 0, flips = 0, best = 0;

        for (int right = 0; right < s.Length; right++)
        {
            if (s[right] == flipChar) flips++;

            while (flips > k)
            {
                if (s[left] == flipChar) flips--;
                left++;
            }

            best = Math.Max(best, right - left + 1);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)` for each of the two passes.
- **Space:** `O(1)`.
