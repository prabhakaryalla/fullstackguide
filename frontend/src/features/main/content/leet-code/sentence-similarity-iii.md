# 1813. Sentence Similarity III

**Difficulty:** Medium
**Category:** Array, Two Pointers, String

## Problem

Two sentences are similar if one can be made equal to the other by inserting one arbitrary (possibly empty) sequence of words in exactly one place. Given `sentence1` and `sentence2`, return whether they are similar.

### Example

```
Input: sentence1 = "My name is Haley", sentence2 = "My Haley"
Output: true
Explanation: Inserting "name is" between "My" and "Haley" in sentence2 produces sentence1.
```

## Approach

Split both sentences into word arrays and make `w1` the shorter one. Match a common prefix between `w1` and `w2` from the front, then match a common suffix from the back (only within what wasn't already consumed as prefix). If the prefix and suffix matches together cover all of `w1`'s words, the missing middle portion of `w2` can be treated as the single inserted block, so the sentences are similar.

## C# Solution

```csharp
public class Solution
{
    public bool AreSentencesSimilar(string sentence1, string sentence2)
    {
        var w1 = sentence1.Split(' ');
        var w2 = sentence2.Split(' ');

        if (w1.Length > w2.Length) (w1, w2) = (w2, w1);

        int i = 0;
        while (i < w1.Length && w1[i] == w2[i]) i++;

        int j = 0;
        while (j < w1.Length - i && w1[w1.Length - 1 - j] == w2[w2.Length - 1 - j]) j++;

        return i + j >= w1.Length;
    }
}
```

## Complexity

- **Time:** `O(n + m)` where `n`/`m` are the word counts of the two sentences.
- **Space:** `O(n + m)` for the split word arrays.
