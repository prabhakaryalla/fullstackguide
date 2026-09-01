# 1178. Number of Valid Words for Each Puzzle

**Difficulty:** Hard
**Category:** Array, Hash Table, String, Bit Manipulation

## Problem

Given `words` and `puzzles`, a word is valid for a puzzle if it contains the puzzle's first letter and every letter of the word is one of the puzzle's (at most 7 distinct) letters. Return, for each puzzle, the count of valid words.

### Example

```
Input: words = ["aaaa","asas","able","ability","actt","actor","access"], puzzles = ["aboy","abrodyz","abslute","absoryz","actresz","gaswxyz"]
Output: [1,1,3,2,4,0]
```

## Approach

Encode every word as a 26-bit mask of the distinct letters it uses, and count how many words share each mask. For each puzzle, build its own letter mask and enumerate every subset of its non-first letters (a classic "submask enumeration" trick), always OR-ing in the puzzle's first-letter bit; summing the word-mask counts for every such subset mask gives the total valid words for that puzzle.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindNumOfValidWords(string[] words, string[] puzzles)
    {
        var wordMaskCount = new Dictionary<int, int>();

        foreach (var word in words)
        {
            int mask = 0;
            foreach (char c in word) mask |= 1 << (c - 'a');
            wordMaskCount[mask] = wordMaskCount.GetValueOrDefault(mask) + 1;
        }

        var result = new List<int>();

        foreach (var puzzle in puzzles)
        {
            int firstBit = 1 << (puzzle[0] - 'a');
            int fullMask = 0;
            foreach (char c in puzzle) fullMask |= 1 << (c - 'a');

            int otherBits = fullMask & ~firstBit;
            int count = 0;
            int subset = otherBits;

            while (true)
            {
                int candidateMask = subset | firstBit;
                if (wordMaskCount.TryGetValue(candidateMask, out int wc)) count += wc;

                if (subset == 0) break;
                subset = (subset - 1) & otherBits;
            }

            result.Add(count);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(sum of word lengths + puzzles.Length · 2^6)`.
- **Space:** `O(distinct word masks)`.
