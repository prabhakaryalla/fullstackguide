# 1255. Maximum Score Words Formed by Letters

**Difficulty:** Hard
**Category:** Array, String, Backtracking, Bit Manipulation

## Problem

Given a list of `words`, an array of available `letters`, and a `score` for each letter of the alphabet, choose a subset of words that can be spelled simultaneously using the available letters (each letter used at most as many times as it appears) to maximize the total score of the chosen words.

### Example

```
Input: words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,0,0,3,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
```

## Approach

Count the available letters into a 26-length array. Backtrack over the words one at a time: for each word, either skip it, or (if there are enough remaining letters) "use" it by deducting its required letters from the available pool, recursing into the rest of the words, and restoring the pool afterward. Take the best score seen between skipping and using each word.

## C# Solution

```csharp
public class Solution
{
    public int MaxScoreWords(string[] words, char[] letters, int[] score)
    {
        var available = new int[26];
        foreach (char c in letters) available[c - 'a']++;

        return Backtrack(words, 0, available, score);
    }

    private int Backtrack(string[] words, int index, int[] available, int[] score)
    {
        if (index == words.Length) return 0;

        int skip = Backtrack(words, index + 1, available, score);

        var used = new int[26];
        int wordScore = 0;
        bool canUse = true;

        foreach (char c in words[index])
        {
            int letter = c - 'a';
            used[letter]++;
            wordScore += score[letter];
            if (used[letter] > available[letter]) canUse = false;
        }

        if (!canUse) return skip;

        for (int i = 0; i < 26; i++) available[i] -= used[i];
        int take = wordScore + Backtrack(words, index + 1, available, score);
        for (int i = 0; i < 26; i++) available[i] += used[i];

        return Math.Max(skip, take);
    }
}
```

## Complexity

- **Time:** `O(2^n * L)`, where `n` is the number of words and `L` is the max word length.
- **Space:** `O(n)` for the recursion stack.
