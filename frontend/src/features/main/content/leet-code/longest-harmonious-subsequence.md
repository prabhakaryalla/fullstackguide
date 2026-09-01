# 594. Longest Harmonious Subsequence

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

A harmonious array is one where the maximum and minimum values differ by exactly `1`. Given an integer array `nums`, return the length of its longest harmonious subsequence.

### Example

```
Input: nums = [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence uses value 3 and 2, with length 5.
```

### Constraints

- `1 <= nums.length <= 2 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

## Approach

Count occurrences of every distinct value. Any harmonious subsequence must consist entirely of two values that differ by exactly 1, so for each distinct value, check whether `value + 1` also exists; if so, the combined count of both values is a candidate answer. Track the maximum across all such pairs.

## C# Solution

```csharp
public class Solution
{
    public int FindLHS(int[] nums)
    {
        var counts = new Dictionary<int, int>();
        foreach (var num in nums)
            counts[num] = counts.GetValueOrDefault(num) + 1;

        int maxLength = 0;

        foreach (var pair in counts)
        {
            if (counts.TryGetValue(pair.Key + 1, out var nextCount))
                maxLength = Math.Max(maxLength, pair.Value + nextCount);
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the count map.
