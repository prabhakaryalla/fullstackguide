# 3682. Minimum Index Sum of Common Elements

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two integer arrays `nums1` and `nums2`, which may each contain duplicate values.

For every integer value that appears in both arrays, define its index sum as the minimum index at which it occurs in `nums1` plus the minimum index at which it occurs in `nums2`.

Return a sorted array of all common values that achieve the smallest possible index sum. If multiple values tie for the smallest index sum, include all of them.

### Example

```
Input: nums1 = [1,2,3,2], nums2 = [2,1,4]
Output: [1,2]
Explanation: Value 1 has index sum 0 + 1 = 1. Value 2 has index sum 1 + 0 = 1. Both tie for the minimum, so both are returned.
```

### Constraints

- `1 <= nums1.length, nums2.length <= 1000`
- `1 <= nums1[i], nums2[i] <= 10^5`

## Approach

Record the first (minimum) index at which each value occurs in `nums1` and in `nums2` using two hash maps. Then, for every value present in both maps, compute the index sum and track the overall minimum, collecting all values that achieve it. Finally sort the collected values before returning.

## C# Solution

```csharp
public class Solution
{
    public IList<int> MinIndexSum(int[] nums1, int[] nums2)
    {
        Dictionary<int, int> firstIndex1 = new Dictionary<int, int>();
        for (int i = 0; i < nums1.Length; i++)
        {
            if (!firstIndex1.ContainsKey(nums1[i]))
            {
                firstIndex1[nums1[i]] = i;
            }
        }

        Dictionary<int, int> firstIndex2 = new Dictionary<int, int>();
        for (int j = 0; j < nums2.Length; j++)
        {
            if (!firstIndex2.ContainsKey(nums2[j]))
            {
                firstIndex2[nums2[j]] = j;
            }
        }

        int bestSum = int.MaxValue;
        List<int> result = new List<int>();

        foreach (var entry in firstIndex1)
        {
            if (firstIndex2.TryGetValue(entry.Key, out int idx2))
            {
                int sum = entry.Value + idx2;
                if (sum < bestSum)
                {
                    bestSum = sum;
                    result.Clear();
                    result.Add(entry.Key);
                }
                else if (sum == bestSum)
                {
                    result.Add(entry.Key);
                }
            }
        }

        result.Sort();
        return result;
    }
}
```

## Complexity

- **Time:** `O(n + m)`, where `n` and `m` are the lengths of the two arrays.
- **Space:** `O(n + m)` for the hash maps.
