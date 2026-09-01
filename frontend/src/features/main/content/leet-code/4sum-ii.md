# 454. 4Sum II

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Given four integer arrays `nums1`, `nums2`, `nums3`, and `nums4`, all of length `n`, return the number of tuples `(i, j, k, l)` such that `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`.

### Example

```
Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
Output: 2
```

### Constraints

- `n == nums1.length == nums2.length == nums3.length == nums4.length`
- `1 <= n <= 200`
- `-2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28`

## Approach

Split the four arrays into two pairs. Precompute every possible sum of one element from `nums1` and one from `nums2`, counting how many times each sum occurs in a hash map. Then for every pair of elements from `nums3` and `nums4`, look up how many `nums1`/`nums2` pairs sum to the negation of that pair's sum, and add that count to the total.

## C# Solution

```csharp
public class Solution
{
    public int FourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4)
    {
        var sumCounts = new Dictionary<int, int>();

        foreach (var a in nums1)
            foreach (var b in nums2)
                sumCounts[a + b] = sumCounts.GetValueOrDefault(a + b) + 1;

        int count = 0;
        foreach (var c in nums3)
            foreach (var d in nums4)
                count += sumCounts.GetValueOrDefault(-(c + d));

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the sum-count map.
