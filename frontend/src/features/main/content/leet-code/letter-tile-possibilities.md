# 1079. Letter Tile Possibilities

**Difficulty:** Medium
**Category:** String, Backtracking, Counting, Hash Table

## Problem

Given a string `tiles` of uppercase letters representing tiles you own, return the number of distinct non-empty sequences of letters you can form using some or all of the tiles.

### Example

```
Input: tiles = "AAB"
Output: 8
```

## Approach

Count how many of each letter (`A-Z`) are available. Backtrack over the 26 possible letters: for each letter still available, "use" one copy of it (count it as one more valid sequence), recurse to build longer sequences from the remaining tiles, then restore the count before trying the next letter. Counting duplicate letters via a frequency array (rather than tracking used indices) automatically avoids counting duplicate sequences from repeated letters.

## C# Solution

```csharp
public class Solution
{
    public int NumTilePossibilities(string tiles)
    {
        var counts = new int[26];
        foreach (var c in tiles) counts[c - 'A']++;

        return Backtrack(counts);
    }

    private int Backtrack(int[] counts)
    {
        int total = 0;

        for (int i = 0; i < 26; i++)
        {
            if (counts[i] == 0) continue;

            counts[i]--;
            total++;
            total += Backtrack(counts);
            counts[i]++;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(26 * n)` roughly, bounded by the number of distinct sequences explored.
- **Space:** `O(n)` recursion depth, plus `O(1)` for the fixed 26-letter counts array.
