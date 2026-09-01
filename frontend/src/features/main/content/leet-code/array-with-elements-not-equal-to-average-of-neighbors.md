# 1968. Array With Elements Not Equal to Average of Neighbors

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

Given an array `nums`, rearrange it so that for every index `i` (not the first or last), `nums[i]` is not equal to the average of `nums[i-1]` and `nums[i+1]`. Return any valid rearrangement.

### Example

```
Input: nums = [1,2,3,4,5]
Output: [1,2,4,5,3]
Explanation: No middle element equals the average of its neighbors.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

## Approach

Sort the array, then interleave the lower half and upper half: place the smallest, then a larger one from the upper half, alternating. Concretely, sort `nums`, split into two halves (`lowerHalf` = first `ceil(n/2)` elements, `upperHalf` = remaining), and build the result by alternating one element from `lowerHalf` then one from `upperHalf`. Since every middle element is either strictly less than both neighbors or strictly greater than both neighbors (given the zig-zag construction using disjoint low/high halves), it can never equal their average.

## C# Solution

```csharp
public class Solution
{
    public int[] RearrangeArray(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int half = (n + 1) / 2;

        int[] result = new int[n];
        int lowIdx = 0, highIdx = half;
        int pos = 0;

        while (lowIdx < half || highIdx < n)
        {
            if (lowIdx < half)
            {
                result[pos++] = nums[lowIdx++];
            }
            if (highIdx < n)
            {
                result[pos++] = nums[highIdx++];
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting.
- **Space:** `O(n)` for the result array.
