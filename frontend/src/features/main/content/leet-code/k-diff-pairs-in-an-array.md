# 532. K-diff Pairs in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Two Pointers, Sorting

## Problem

Given an array of integers `nums` and an integer `k`, return the number of unique `k`-diff pairs — pairs `(nums[i], nums[j])` such that `i != j` and `|nums[i] - nums[j]| == k`.

### Example

```
Input: nums = [3,1,4,1,5], k = 2
Output: 2
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^7 <= nums[i] <= 10^7`
- `0 <= k <= 10^7`

## Approach

Count occurrences of every value. If `k == 0`, a valid pair requires two occurrences of the same value, so count how many values appear more than once. If `k > 0`, for each distinct value, check whether `value + k` also exists in the map — this counts each valid pair exactly once since only the smaller element of each pair is used as the anchor.

## C# Solution

```csharp
public class Solution
{
    public int FindPairs(int[] nums, int k)
    {
        if (k < 0) return 0;

        var counts = new Dictionary<int, int>();
        foreach (var num in nums)
            counts[num] = counts.GetValueOrDefault(num) + 1;

        int result = 0;

        foreach (var pair in counts)
        {
            if (k == 0)
            {
                if (pair.Value > 1) result++;
            }
            else if (counts.ContainsKey(pair.Key + k))
            {
                result++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the count map.
