# 2426. Number of Pairs Satisfying Inequality

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Divide and Conquer, Merge Sort, Ordered Set

## Problem

You are given two indexed arrays `nums1` and `nums2`, each of length `n`, and an integer `diff`. Find the number of pairs `(i, j)` such that:
- `0 <= i < j < n`
- `nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff`

Return the number of pairs that satisfy the conditions.

### Example

```
Input: nums1 = [3,2,5], nums2 = [2,2,1], diff = 1
Output: 3
Explanation:
There are 3 pairs that satisfy the conditions:
- (0, 1): 3 - 2 <= 2 - 2 + 1. Since i < j and 1 <= 1, this pair is valid.
- (0, 2): 3 - 5 <= 2 - 1 + 1. Since i < j and -2 <= 2, this pair is valid.
- (1, 2): 2 - 5 <= 2 - 1 + 1. Since i < j and -3 <= 2, this pair is valid.
Therefore, we return 3.
```

## Approach

Rearrange the inequality:
`nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff`
⇒ `nums1[i] - nums2[i] <= nums1[j] - nums2[j] + diff`

Let `a[i] = nums1[i] - nums2[i]`. We need to count pairs where `a[i] <= a[j] + diff` and `i < j`.

Use merge sort to count inversions: as we process elements from left to right, for each `a[j]`, count how many previous `a[i]` satisfy `a[i] <= a[j] + diff`.

## C# Solution

```csharp
public class Solution
{
    private long count = 0;
    
    public long NumberOfPairs(int[] nums1, int[] nums2, int diff)
    {
        int n = nums1.Length;
        long[] a = new long[n];
        
        for (int i = 0; i < n; i++)
        {
            a[i] = nums1[i] - nums2[i];
        }
        
        MergeSort(a, 0, n - 1, diff);
        return count;
    }
    
    private void MergeSort(long[] a, int left, int right, int diff)
    {
        if (left >= right)
            return;
        
        int mid = left + (right - left) / 2;
        MergeSort(a, left, mid, diff);
        MergeSort(a, mid + 1, right, diff);
        
        // Count pairs
        int j = mid + 1;
        for (int i = left; i <= mid; i++)
        {
            while (j <= right && a[i] <= a[j] + diff)
            {
                j++;
            }
            count += (j - (mid + 1));
        }
        
        // Merge
        Merge(a, left, mid, right);
    }
    
    private void Merge(long[] a, int left, int mid, int right)
    {
        List<long> temp = new List<long>();
        int i = left, j = mid + 1;
        
        while (i <= mid && j <= right)
        {
            if (a[i] <= a[j])
                temp.Add(a[i++]);
            else
                temp.Add(a[j++]);
        }
        
        while (i <= mid)
            temp.Add(a[i++]);
        
        while (j <= right)
            temp.Add(a[j++]);
        
        for (int k = 0; k < temp.Count; k++)
        {
            a[left + k] = temp[k];
        }
    }
}
```

## Complexity

- **Time:** O(n log n) for merge sort
- **Space:** O(n) for temporary arrays
