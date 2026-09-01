# 1128. Number of Equivalent Domino Pairs

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

Given a list of dominoes `dominoes[i] = [a, b]`, two dominoes are equivalent if one can be obtained from the other by swapping its two numbers. Return the number of pairs `(i, j)` with `i < j` such that `dominoes[i]` and `dominoes[j]` are equivalent.

### Example

```
Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
Output: 1
```

## Approach

Since domino values are digits `1` through `9`, encode each domino as `min(a, b) * 10 + max(a, b)` to normalize equivalent dominoes to the same key, regardless of order. Track how many dominoes have produced each key so far, and each time a repeat key is seen, add the current count of that key to the running answer before incrementing it.

## C# Solution

```csharp
public class Solution
{
    public int NumEquivDominoPairs(int[][] dominoes)
    {
        int[] count = new int[100];
        int pairs = 0;

        foreach (var d in dominoes)
        {
            int key = Math.Min(d[0], d[1]) * 10 + Math.Max(d[0], d[1]);
            pairs += count[key];
            count[key]++;
        }

        return pairs;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` (fixed-size counting array).
