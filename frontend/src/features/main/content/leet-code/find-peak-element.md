# 162. Find Peak Element

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

A peak element is an element strictly greater than its neighbors. Given an integer array `nums`, find a peak element and return its index (if the array has multiple peaks, return the index of any of them). Assume `nums[-1] = nums[n] = -infinity`. You must write an algorithm with `O(log n)` runtime complexity.

### Example 1

```
Input: nums = [1,2,3,1]
Output: 2
```

```mermaid
graph LR
    A["1"] --- B["2"] --- C["3"] --- D["1"]
    style C fill:#4caf50,color:#fff
```

### Example 2

```
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: index 1 (value 2) or index 5 (value 6) are both valid peaks.
```

### Constraints

- `1 <= nums.length <= 1000`
- `nums[i] != nums[i + 1]` for all valid `i`.

## Approach

Binary search using the local slope: if `nums[mid] < nums[mid + 1]`, the array is still rising, so a peak must exist somewhere to the right (following the rising slope always leads toward a peak, since values are bounded and neighbors differ). Otherwise, a peak exists at `mid` or to its left. This converges to a valid peak in logarithmic time.

## C# Solution

```csharp
public class Solution
{
    public int FindPeakElement(int[] nums)
    {
        int lo = 0, hi = nums.Length - 1;

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;

            if (nums[mid] < nums[mid + 1])
            {
                lo = mid + 1;
            }
            else
            {
                hi = mid;
            }
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(log n)` — binary search halving.
- **Space:** `O(1)`.
