# 697. Degree of an Array

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given a non-empty array of non-negative integers `nums`, its degree is the maximum frequency of any element. Return the length of the smallest contiguous subarray that has the same degree as `nums`.

### Example

```
Input: nums = [1,2,2,3,1]
Output: 2
```

### Constraints

- `1 <= nums.length <= 5 * 10^4`

## Approach

Track the first index, last index, and total count of every distinct value in a single pass. The overall degree is the maximum count seen. For every value that achieves this maximum degree, the shortest subarray containing all its occurrences spans from its first index to its last index; take the minimum such span across all values tied for the maximum degree.

## C# Solution

```csharp
public class Solution
{
    public int FindShortestSubArray(int[] nums)
    {
        var firstIndex = new Dictionary<int, int>();
        var lastIndex = new Dictionary<int, int>();
        var counts = new Dictionary<int, int>();

        for (int i = 0; i < nums.Length; i++)
        {
            if (!firstIndex.ContainsKey(nums[i]))
                firstIndex[nums[i]] = i;

            lastIndex[nums[i]] = i;
            counts[nums[i]] = counts.GetValueOrDefault(nums[i]) + 1;
        }

        int degree = counts.Values.Max();
        int minLength = int.MaxValue;

        foreach (var pair in counts)
        {
            if (pair.Value == degree)
            {
                int length = lastIndex[pair.Key] - firstIndex[pair.Key] + 1;
                minLength = Math.Min(minLength, length);
            }
        }

        return minLength;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the tracking dictionaries.
