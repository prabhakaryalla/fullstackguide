# 164. Maximum Gap

**Difficulty:** Hard
**Category:** Array, Sorting, Bucket Sort, Radix Sort

## Problem

Given an integer array `nums`, return the maximum difference between two successive elements in its sorted form. If the array contains fewer than two elements, return `0`. Your solution must run in linear time and use linear extra space.

### Example 1

```
Input: nums = [3,6,9,1]
Output: 3
Explanation: sorted form is [1,3,6,9]; the maximum gap is between 3 and 6, or 6 and 9 (both 3).
```

### Example 2

```
Input: nums = [10]
Output: 0
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`

## Approach

A comparison sort would cost `O(n log n)`, violating the linear-time requirement, so use a bucket-based approach (pigeonhole principle): with `n` numbers spanning a range, at least one bucket of size `ceil(range / (n-1))` must be empty, so the maximum gap can never occur *within* a bucket — only *between* the max of one non-empty bucket and the min of the next non-empty bucket. Distribute numbers into buckets accordingly, then scan the buckets in order comparing each bucket's min to the previous bucket's max.

## C# Solution

```csharp
public class Solution
{
    public int MaximumGap(int[] nums)
    {
        if (nums.Length < 2) return 0;

        int min = nums.Min(), max = nums.Max();
        if (min == max) return 0;

        int n = nums.Length;
        int bucketSize = Math.Max(1, (max - min) / (n - 1));
        int bucketCount = (max - min) / bucketSize + 1;

        var bucketMin = new int[bucketCount];
        var bucketMax = new int[bucketCount];
        Array.Fill(bucketMin, int.MaxValue);
        Array.Fill(bucketMax, int.MinValue);

        foreach (int num in nums)
        {
            int idx = (num - min) / bucketSize;
            bucketMin[idx] = Math.Min(bucketMin[idx], num);
            bucketMax[idx] = Math.Max(bucketMax[idx], num);
        }

        int maxGap = 0;
        int prevMax = min;

        for (int i = 0; i < bucketCount; i++)
        {
            if (bucketMin[i] > bucketMax[i]) continue; // empty bucket

            maxGap = Math.Max(maxGap, bucketMin[i] - prevMax);
            prevMax = bucketMax[i];
        }

        return maxGap;
    }
}
```

## Complexity

- **Time:** `O(n)` — bucket distribution and a single scan across buckets.
- **Space:** `O(n)` — for the bucket arrays.
