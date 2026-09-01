# 1007. Minimum Domino Rotations For Equal Row

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

In a row of dominoes, `tops[i]` and `bottoms[i]` are the values on the `i`-th domino. In one move, swap the top and bottom values of any single domino. Return the minimum number of swaps so that all values in `tops` are the same, or all values in `bottoms` are the same. Return `-1` if impossible.

### Example

```
Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
```

## Approach

Whatever the final common value is, it must appear somewhere in the first domino (either `tops[0]` or `bottoms[0]`). So only two candidate target values need checking. For a candidate target, scan every domino: if neither its top nor bottom equals the target, the candidate fails; otherwise count how many swaps are needed to make all tops equal the target versus all bottoms equal the target, and take the smaller. The overall answer is the best result across both candidates.

## C# Solution

```csharp
public class Solution
{
    public int MinDominoRotations(int[] tops, int[] bottoms)
    {
        int n = tops.Length;
        int result = TryValue(tops[0], tops, bottoms, n);
        if (result != -1) return result;
        return TryValue(bottoms[0], tops, bottoms, n);
    }

    private int TryValue(int target, int[] tops, int[] bottoms, int n)
    {
        int rotateTop = 0, rotateBottom = 0;

        for (int i = 0; i < n; i++)
        {
            if (tops[i] != target && bottoms[i] != target) return -1;
            if (tops[i] != target) rotateTop++;
            else if (bottoms[i] != target) rotateBottom++;
        }

        return Math.Min(rotateTop, rotateBottom);
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes at most.
- **Space:** `O(1)`.
