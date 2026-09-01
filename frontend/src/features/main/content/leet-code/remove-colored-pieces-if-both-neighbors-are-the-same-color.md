# 2038. Remove Colored Pieces if Both Neighbors are the Same Color

**Difficulty:** Medium
**Category:** String, Math, Greedy, Game Theory

## Problem

There are `n` pieces arranged in a line, each colored `'A'` or `'B'`, given as a string `colors`. Alice removes `'A'` pieces and Bob removes `'B'` pieces, alternating turns with Alice first. A piece may only be removed if **both** its neighbors are the same color as itself (so endpoints can never be removed). A player who cannot move on their turn loses. Assuming both play optimally, return `true` if Alice wins.

## Approach

Since a move only removes an interior piece whose both neighbors share its color, the number of legal moves for each color depends only on the lengths of maximal same-color runs. A run of length `L` of a single color allows exactly `L - 2` removable moves (if `L >= 3`, otherwise `0`), because each move can only be made on interior positions and removing them doesn't create new opportunities across colors (there's no interaction between an `'A'` run's move count and `'B'`'s).

So, scan `colors` to find every maximal run; for a run of color `'A'` with length `L >= 3`, add `L - 2` to Alice's total available moves; for a run of `'B'` add to Bob's total. Since both players simply keep making any of their independent available moves until they run out (order doesn't affect the count of total moves each side can make), Alice wins exactly when her total move count exceeds Bob's.

## C# Solution

```csharp
public class Solution
{
    public bool WinnerOfGame(string colors)
    {
        int aliceMoves = 0, bobMoves = 0;
        int n = colors.Length;
        int i = 0;

        while (i < n)
        {
            int j = i;
            while (j < n && colors[j] == colors[i]) j++;

            int runLength = j - i;
            if (runLength >= 3)
            {
                int movesInRun = runLength - 2;
                if (colors[i] == 'A') aliceMoves += movesInRun;
                else bobMoves += movesInRun;
            }

            i = j;
        }

        return aliceMoves > bobMoves;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
