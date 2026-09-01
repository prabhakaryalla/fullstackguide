# 418. Sentence Screen Fitting

**Difficulty:** Medium
**Category:** Array, String, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `rows x cols` screen and a `sentence` (an array of words), return how many times the given sentence can be fit on the screen, where words are placed left to right, wrap to the next row when they don't fit, and a single space separates consecutive words.

### Example

```
Input: sentence = ["hello","world"], rows = 2, cols = 8
Output: 1
```

### Constraints

- `1 <= sentence.length <= 100`
- `1 <= sentence[i].length <= 10`
- `1 <= rows, cols <= 2 * 10^4`

## Approach

Concatenate the sentence into one string separated by single spaces, with a trailing space added so the pattern repeats cleanly. Simulate filling each row by jumping the position pointer forward by `cols` characters (treating the combined string as circular via modulo); if that lands mid-word, back up to the previous space so no word gets split across rows. The total sentence repetitions after processing all rows is the final position divided by the combined string's length.

## C# Solution

```csharp
public class Solution
{
    public int WordsTyping(string[] sentence, int rows, int cols)
    {
        var combined = string.Join(" ", sentence) + " ";
        int length = combined.Length;
        int start = 0;

        for (int i = 0; i < rows; i++)
        {
            start += cols;

            if (combined[start % length] == ' ')
            {
                start++;
            }
            else
            {
                while (start > 0 && combined[(start - 1) % length] != ' ')
                    start--;
            }
        }

        return start / length;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` in the worst case for the back-up scan, though typically much faster.
- **Space:** `O(total sentence length)` for the combined string.
