# 3400. Maximum Number of Matching Indices After Right Shifts

**Difficulty:** Medium
**Category:** Array, Hash Table, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given two 0-indexed integer arrays `nums1` and `nums2`, both of length `n`. A right shift by `k` (0 <= k < n) transforms `nums1` into `shifted`, where `shifted[i] = nums1[(i - k + n) % n]`. For a given `k`, define `match(k)` as the number of indices `i` where `shifted[i] == nums2[i]`. Return the maximum value of `match(k)` over all valid `k`.

## Approach
For every pair of indices `(j, i)` with `nums1[j] == nums2[i]`, the shift `k = (i - j) mod n` gains one match. Group the indices of `nums1` by value in a hash map. For each index `i` of `nums2`, look up all indices `j` where `nums1[j] == nums2[i]`, compute `k = (i - j + n) % n`, and increment a counter array of size `n` at position `k`. The answer is the maximum value in the counter array.

## C# Solution

```csharp
public class Solution 
{
    public int MaxMatchingIndices(int[] nums1, int[] nums2) 
    {
        int n = nums1.Length;
        var positionsByValue = new Dictionary<int, List<int>>();
        for (int j = 0; j < n; j++)
        {
            if (!positionsByValue.TryGetValue(nums1[j], out var list))
            {
                list = new List<int>();
                positionsByValue[nums1[j]] = list;
            }
            list.Add(j);
        }

        int[] count = new int[n];
        int best = 0;
        for (int i = 0; i < n; i++)
        {
            if (positionsByValue.TryGetValue(nums2[i], out var list))
            {
                foreach (int j in list)
                {
                    int k = ((i - j) % n + n) % n;
                    count[k]++;
                    if (count[k] > best) best = count[k];
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n^2) worst case (all elements equal), typically much faster
- **Space:** O(n)
