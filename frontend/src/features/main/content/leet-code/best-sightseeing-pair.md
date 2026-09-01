# 1014. Best Sightseeing Pair

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an array `values` where `values[i]` is the value of the `i`-th sightseeing spot, the score of a pair `(i, j)` with `i < j` is `values[i] + values[j] + i - j`. Return the maximum score of any pair.

### Example

```
Input: values = [8,1,5,2,6]
Output: 11
Explanation: i = 0, j = 2, values[0] + values[2] + 0 - 2 = 8 + 5 - 2 = 11
```

## Approach

Rewrite the score as `(values[i] + i) + (values[j] - j)`. Scan left to right while tracking the best `values[i] + i` seen among all indices before the current one; at each `j`, the best possible pair ending at `j` is `best + values[j] - j`. Update the running maximum and then fold `values[j] + j` into `best` for future indices.

## C# Solution

```csharp
public class Solution
{
    public int MaxScoreSightseeingPair(int[] values)
    {
        int best = values[0];
        int answer = int.MinValue;

        for (int j = 1; j < values.Length; j++)
        {
            answer = Math.Max(answer, best + values[j] - j);
            best = Math.Max(best, values[j] + j);
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
