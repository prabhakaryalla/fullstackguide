# 493. Reverse Pairs

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Segment Tree, Merge Sort

## Problem

Given an integer array `nums`, return the number of reverse pairs — pairs `(i, j)` where `i < j` and `nums[i] > 2 * nums[j]`.

### Example

```
Input: nums = [1,3,2,3,1]
Output: 2
```

### Constraints

- `1 <= nums.length <= 5 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Approach

Use merge sort, counting cross-pairs while merging two already-sorted halves. Since both halves are sorted, for each element in the left half, a two-pointer sweep through the right half finds how many right-half elements are less than half of it, without needing a nested comparison loop; these counts, summed across all merge steps, give the total reverse pairs.

## C# Solution

```csharp
public class Solution
{
    public int ReversePairs(int[] nums)
    {
        return MergeCount(nums, 0, nums.Length - 1, new int[nums.Length]);
    }

    private int MergeCount(int[] nums, int left, int right, int[] buffer)
    {
        if (left >= right) return 0;

        int mid = left + (right - left) / 2;
        int count = MergeCount(nums, left, mid, buffer) + MergeCount(nums, mid + 1, right, buffer);

        int j = mid + 1;
        for (int i = left; i <= mid; i++)
        {
            while (j <= right && nums[i] > 2L * nums[j])
                j++;

            count += j - (mid + 1);
        }

        int p1 = left, p2 = mid + 1, idx = left;
        while (p1 <= mid && p2 <= right)
            buffer[idx++] = nums[p1] <= nums[p2] ? nums[p1++] : nums[p2++];
        while (p1 <= mid) buffer[idx++] = nums[p1++];
        while (p2 <= right) buffer[idx++] = nums[p2++];

        Array.Copy(buffer, left, nums, left, right - left + 1);
        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the merge buffer.
