# 3002. Maximum Size of a Set After Removals

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy

## Problem

You are given two 0-indexed integer arrays `nums1` and `nums2` of even length `n`. You must remove exactly `n / 2` elements from `nums1` and exactly `n / 2` elements from `nums2`. After the removals, insert all remaining elements of `nums1` and `nums2` into a set `s`. Return the maximum possible size of `s`.

### Example

```
Input: nums1 = [1,2,1,2], nums2 = [1,1,1,1]
Output: 2
Explanation: Remove two 1's from nums1 (leaving [2,2]) and any two elements from nums2 (leaving [1,1]).
The set formed is {1, 2}, which has size 2.
```

## Approach

Only distinct values matter, so start from the distinct sets of each array. Let `n1`/`n2` be the number of distinct values in `nums1`/`nums2`, and `common` be the number of values shared by both.

- From `nums1`, at most `n1 - common` values are "exclusive" to it, but we can keep at most `n / 2` of them (the removal budget).
- Symmetrically for `nums2` with `n2 - common`.
- Every common value only needs to survive in one of the two arrays to appear in the final set, so all `common` values can always be kept.

The answer is the smaller of `n` (set can't exceed total remaining elements) and the sum of the capped exclusive counts plus the common count.

## C# Solution

```csharp
public class Solution {
    public int MaximumSetSize(int[] nums1, int[] nums2) {
        var set1 = new HashSet<int>(nums1);
        var set2 = new HashSet<int>(nums2);

        int common = 0;
        foreach (int num in set1)
            if (set2.Contains(num))
                common++;

        int n = nums1.Length;
        int maxUnique1 = Math.Min(set1.Count - common, n / 2);
        int maxUnique2 = Math.Min(set2.Count - common, n / 2);
        return Math.Min(n, maxUnique1 + maxUnique2 + common);
    }
}
```

## Complexity

- Time: O(n) — building the two hash sets and scanning them.
- Space: O(n) — storing the distinct values of each array.
