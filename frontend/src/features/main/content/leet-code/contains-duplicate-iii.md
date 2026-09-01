# 220. Contains Duplicate III

**Difficulty:** Hard
**Category:** Array, Sorting, Bucket Sort, Ordered Set, Sliding Window

## Problem

Given an integer array `nums` and two integers `indexDiff` and `valueDiff`, return `true` if there exist two distinct indices `i` and `j` such that `abs(i - j) <= indexDiff` and `abs(nums[i] - nums[j]) <= valueDiff`.

### Example

```
nums = [1,2,3,1], indexDiff = 3, valueDiff = 0 -> true
nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3 -> false
```

## Approach

Bucket values into buckets of width `valueDiff + 1` (so two values in the same bucket are automatically within `valueDiff` of each other), maintaining only a sliding window of the last `indexDiff` elements. For each new value, check its own bucket plus the immediately neighboring buckets (values close enough that they might straddle a bucket boundary); slide the window by removing the bucket entry that falls outside `indexDiff`.

## C# Solution

```csharp
public class Solution
{
    public bool ContainsNearbyAlmostDuplicate(int[] nums, int indexDiff, long valueDiff)
    {
        var buckets = new Dictionary<long, long>();
        long bucketWidth = valueDiff + 1;

        for (int i = 0; i < nums.Length; i++)
        {
            long bucketId = GetBucketId(nums[i], bucketWidth);

            if (buckets.ContainsKey(bucketId)) return true;

            if (buckets.TryGetValue(bucketId - 1, out long left) && Math.Abs(nums[i] - left) < bucketWidth)
            {
                return true;
            }

            if (buckets.TryGetValue(bucketId + 1, out long right) && Math.Abs(nums[i] - right) < bucketWidth)
            {
                return true;
            }

            buckets[bucketId] = nums[i];

            if (i >= indexDiff)
            {
                buckets.Remove(GetBucketId(nums[i - indexDiff], bucketWidth));
            }
        }

        return false;
    }

    private long GetBucketId(long value, long bucketWidth)
    {
        return value >= 0 ? value / bucketWidth : (value + 1) / bucketWidth - 1;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass with constant-time bucket lookups.
- **Space:** `O(min(n, indexDiff))` — the bucket map holds at most a sliding window's worth of entries.
