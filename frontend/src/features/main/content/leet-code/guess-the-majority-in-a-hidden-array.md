# 1538. Guess the Majority in a Hidden Array

**Difficulty:** Medium
**Category:** Array, Interactive

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

There is a hidden integer array of length `n` with only two distinct values. Using only the interactive `ArrayReader.query(a, b, c)` API — which reports how many of `arr[a]`, `arr[b]`, `arr[c]` are equal to each other (`2` if all three match, `1` if exactly one pair matches, `0` if all three differ) — determine and return the index of any element belonging to the majority value. Return `-1` if there is a tie.

### Example

```
Input: arr = [0,0,1,0,1,1,1,1]
Output: 5
```

## Approach

Fix indices `0`, `1`, and `2` as three reference points, and classify every later index `i >= 3` as matching the group anchored at index `1` or the group anchored at index `2`, by comparing `query(0, 1, i)` and `query(0, 2, i)` — a result of `2` for `query(0, 1, i)` implies `arr[i]` equals whichever of `arr[0]`/`arr[1]` are already known to agree. The initial `query(0, 1, 2)` result seeds how indices 0-2 are split between the two candidate groups. After classifying every index into one of the two candidate groups, whichever group has more than `n / 2` elements is the majority; otherwise return `-1`.

## C# Solution

```csharp
public class Solution
{
    public int GuessMajority(ArrayReader reader)
    {
        int n = reader.Length();
        if (n < 3)
        {
            return 0;
        }

        int baseResult = reader.Query(0, 1, 2);

        // countA groups with index 1's value, countB groups with index 2's value.
        int countA = baseResult == 2 ? 3 : 2;
        int countB = baseResult == 2 ? 3 : 1;
        int candidateA = 1;
        int candidateB = 2;

        for (int i = 3; i < n; i++)
        {
            if (reader.Query(0, 1, i) == 2)
            {
                countA++;
            }
            if (reader.Query(0, 2, i) == 2)
            {
                countB++;
            }
        }

        if (countA == countB)
        {
            return -1;
        }

        return countA > countB ? candidateA : candidateB;
    }
}
```

## Complexity

- **Time:** `O(n)` interactive queries — a constant number of queries per index.
- **Space:** `O(1)`.
