# 1940. Longest Common Subsequence Between Sorted Arrays

**Difficulty:** Medium
**Category:** Array, Hash Table, Counting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of integer arrays `arrays`, where each inner array is sorted in strictly increasing order, return an array of the integers that appear in every one of the inner arrays, sorted in ascending order.

### Example

```
Input: arrays = [[1,3,4],[1,4,7,9]]
Output: [1,4]
Explanation: 1 and 4 appear in both arrays.
```

### Constraints

- `2 <= arrays.length <= 100`
- `1 <= arrays[i].length <= 100`
- `1 <= arrays[i][j] <= 100`
- `arrays[i]` is sorted in strictly increasing order.

## Approach

Since each inner array is already strictly increasing (no duplicates within an array) and values are bounded by 100, maintain a frequency counter across all arrays: for each value seen in any array, increment its count once (since it's guaranteed to appear at most once per array). After processing all arrays, any value whose count equals `arrays.Length` appears in every array — collect and sort those values (naturally in ascending order if the counting array is scanned from 1 to 100).

## C# Solution

```csharp
public class Solution
{
    public IList<int> LongestCommonSubsequence(IList<IList<int>> arrays)
    {
        int[] count = new int[101];

        foreach (var arr in arrays)
        {
            foreach (int value in arr)
            {
                count[value]++;
            }
        }

        var result = new List<int>();
        for (int v = 1; v <= 100; v++)
        {
            if (count[v] == arrays.Count)
            {
                result.Add(v);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(total elements + 100)` — one pass over all values plus a fixed-size scan.
- **Space:** `O(100)` for the counting array.
