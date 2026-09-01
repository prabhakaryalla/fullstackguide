# 2444. Count Subarrays With Fixed Bounds

**Difficulty:** Hard
**Category:** Array, Queue, Sliding Window, Monotonic Queue

## Problem

You are given an integer array `nums` and two integers `minK` and `maxK`. Return the number of subarrays where:

- The minimum value in the subarray equals `minK`
- The maximum value in the subarray equals `maxK`

### Example

```
Input: nums = [1,3,5,2,7,5], minK = 1, maxK = 5
Output: 2
Explanation: The subarrays are [1,3,5] and [1,3,5,2].
```

## Approach

Use a sliding window approach. Track the last positions where we saw `minK`, `maxK`, and any value outside the range `[minK, maxK]` (which breaks valid subarrays). For each position, count how many valid subarrays end at this position by finding the leftmost valid starting position.

The key insight: a subarray is valid if it contains at least one `minK`, at least one `maxK`, and no values outside `[minK, maxK]`.

## C# Solution

```csharp
public class Solution
{
    public long CountSubarrays(int[] nums, int minK, int maxK)
    {
        long result = 0;
        int lastInvalid = -1;
        int lastMin = -1;
        int lastMax = -1;
        
        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] < minK || nums[i] > maxK)
            {
                lastInvalid = i;
            }
            
            if (nums[i] == minK)
            {
                lastMin = i;
            }
            
            if (nums[i] == maxK)
            {
                lastMax = i;
            }
            
            // Count subarrays ending at i
            int leftBound = Math.Min(lastMin, lastMax);
            if (leftBound > lastInvalid)
            {
                result += leftBound - lastInvalid;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(1)
