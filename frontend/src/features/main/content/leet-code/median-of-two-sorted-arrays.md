# 4. Median of Two Sorted Arrays

**Difficulty:** Hard
**Category:** Array, Binary Search, Divide and Conquer

## Problem

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.

The overall run time complexity should be `O(log (m+n))`.

### Example 1

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3], median is 2.
```

```mermaid
graph LR
    A1["1"] --- A2["2"] --- A3["3"]
    style A2 fill:#4caf50,color:#fff
```

### Example 2

```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4], median is (2 + 3) / 2 = 2.5.
```

### Constraints

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

## Approach

Binary search on the smaller array to find a partition point where every element on the left side of both arrays combined is `<=` every element on the right side. Once the partitions balance (`maxLeftX <= minRightY` and `maxLeftY <= minRightX`), the median can be read directly from the boundary values, without merging the arrays.

## C# Solution

```csharp
public class Solution
{
    public double FindMedianSortedArrays(int[] nums1, int[] nums2)
    {
        if (nums1.Length > nums2.Length)
        {
            return FindMedianSortedArrays(nums2, nums1);
        }

        int m = nums1.Length, n = nums2.Length;
        int lo = 0, hi = m;

        while (lo <= hi)
        {
            int partitionX = (lo + hi) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;

            int maxLeftX = partitionX == 0 ? int.MinValue : nums1[partitionX - 1];
            int minRightX = partitionX == m ? int.MaxValue : nums1[partitionX];

            int maxLeftY = partitionY == 0 ? int.MinValue : nums2[partitionY - 1];
            int minRightY = partitionY == n ? int.MaxValue : nums2[partitionY];

            if (maxLeftX <= minRightY && maxLeftY <= minRightX)
            {
                if ((m + n) % 2 == 0)
                {
                    return (Math.Max(maxLeftX, maxLeftY) + Math.Min(minRightX, minRightY)) / 2.0;
                }

                return Math.Max(maxLeftX, maxLeftY);
            }

            if (maxLeftX > minRightY)
            {
                hi = partitionX - 1;
            }
            else
            {
                lo = partitionX + 1;
            }
        }

        throw new ArgumentException("Input arrays are not sorted.");
    }
}
```

## Complexity

- **Time:** `O(log(min(m, n)))` — binary search over the shorter array's partition index.
- **Space:** `O(1)` — no extra data structures.
