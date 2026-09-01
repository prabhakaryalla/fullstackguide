# 870. Advantage Shuffle

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Two Pointers

## Problem

Given two arrays `nums1` and `nums2` of equal length, reorder `nums1` (an "advantage shuffle") so that the number of indices `i` where `nums1[i] > nums2[i]` is maximized. Return any such optimal reordering.

### Example

```
Input: nums1 = [2,7,11,15], nums2 = [1,10,4,11]
Output: [2,11,7,15]
```

## Approach

Sort `nums1` ascending. Sort the indices of `nums2` by value, and process them from the largest value down to the smallest. For each `nums2` value (largest remaining first), check whether the largest remaining `nums1` value can beat it; if so, assign it there. Otherwise, that particular `nums1` value can't beat this or any smaller `nums2` value already processed, so it should be "sacrificed": assign the smallest remaining `nums1` value to this position instead, since it's guaranteed to lose here regardless.

## C# Solution

```csharp
public class Solution
{
    public int[] AdvantageCount(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        var sortedNums1 = (int[])nums1.Clone();
        Array.Sort(sortedNums1);

        var sortedIndices2 = Enumerable.Range(0, n).OrderBy(i => nums2[i]).ToArray();

        var result = new int[n];
        int left = 0, right = n - 1;

        for (int i = n - 1; i >= 0; i--)
        {
            int idx = sortedIndices2[i];

            if (sortedNums1[right] > nums2[idx])
            {
                result[idx] = sortedNums1[right];
                right--;
            }
            else
            {
                result[idx] = sortedNums1[left];
                left++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the sorted array and indices.
