# 1668. Maximum Repeating Substring

**Difficulty:** Easy
**Category:** String, Dynamic Programming, String Matching

## Problem

Given `sequence` and `word`, return the maximum `k` such that `word` repeated `k` times is a substring of `sequence` (return `0` if `word` never appears).

### Example

```
Input: sequence = "ababc", word = "ab"
Output: 2
```

## Approach

Repeatedly build up the candidate repeated string (`word`, `word+word`, ...) and check for its presence in `sequence` with a simple substring search, stopping as soon as a repetition count fails to appear.

## C# Solution

```csharp
public class Solution
{
    public int MaxRepeating(string sequence, string word)
    {
        int count = 0;
        string repeated = word;

        while (sequence.Contains(repeated))
        {
            count++;
            repeated += word;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(k * n)`, where `k` is the answer and `n` the length of `sequence`.
- **Space:** `O(k * |word|)` for the growing repeated string.
