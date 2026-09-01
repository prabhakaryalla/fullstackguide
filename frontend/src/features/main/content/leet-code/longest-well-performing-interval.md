# 1124. Longest Well-Performing Interval

**Difficulty:** Medium
**Category:** Array, Hash Table, Stack, Prefix Sum

## Problem

Given `hours[i]` representing hours worked on day `i`, a day is "tiring" if `hours[i] > 8`. A well-performing interval is a contiguous subarray where the number of tiring days is strictly greater than the number of non-tiring days. Return the length of the longest well-performing interval.

### Example

```
Input: hours = [9,9,6,0,6,6,9]
Output: 3
```

## Approach

Convert each day into `+1` (tiring) or `-1` (not tiring) and track a running `score` (prefix sum). If `score > 0` at index `i`, the whole prefix up to `i` is well-performing. Otherwise, look for the earliest index where the prefix sum was exactly `score - 1`; the interval after that index up to `i` sums to `1`, making it well-performing. A hash map storing the first occurrence of each prefix-sum value supports this lookup in `O(1)`.

## C# Solution

```csharp
public class Solution
{
    public int LongestWpi(int[] hours)
    {
        var firstIndex = new Dictionary<int, int>();
        int score = 0, answer = 0;

        for (int i = 0; i < hours.Length; i++)
        {
            score += hours[i] > 8 ? 1 : -1;

            if (score > 0)
            {
                answer = i + 1;
            }
            else
            {
                if (!firstIndex.ContainsKey(score)) firstIndex[score] = i;
                if (firstIndex.TryGetValue(score - 1, out int idx))
                    answer = Math.Max(answer, i - idx);
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix-sum index map.
