# 912. Sort an Array

**Difficulty:** Medium
**Category:** Array, Divide and Conquer, Sorting, Heap, Merge Sort, Bucket Sort, Radix Sort, Counting Sort

## Problem

Given an array of integers `nums`, sort it in ascending order without using the built-in sort function.

### Example

```
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
```

## Approach

Implement merge sort: recursively split the array in half, sort each half, then merge the two sorted halves back together with a linear scan, guaranteeing `O(n log n)` regardless of input order.

## C# Solution

```csharp
public class Solution
{
    public int[] SortArray(int[] nums)
    {
        MergeSort(nums, 0, nums.Length - 1);
        return nums;
    }

    private void MergeSort(int[] a, int l, int r)
    {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        MergeSort(a, l, m);
        MergeSort(a, m + 1, r);
        Merge(a, l, m, r);
    }

    private void Merge(int[] a, int l, int m, int r)
    {
        var temp = new int[r - l + 1];
        int i = l, j = m + 1, k = 0;

        while (i <= m && j <= r) temp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i <= m) temp[k++] = a[i++];
        while (j <= r) temp[k++] = a[j++];

        Array.Copy(temp, 0, a, l, temp.Length);
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the merge buffer.
