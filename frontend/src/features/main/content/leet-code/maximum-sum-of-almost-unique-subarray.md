# 2841. Maximum Sum of Almost Unique Subarray

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

You are given an integer array `nums` and two integers `m` and `k`. Return the maximum sum among all subarrays of length `k` that contain at least `m` distinct elements. If no such subarray exists, return `0`.

### Example

Input: nums = [2,6,7,3,1,7], m = 3, k = 4
Output: 18
Explanation: The subarray [7,3,1,7] has length 4, contains 3 distinct elements, and sums to 18.

## Approach

Maintain a fixed-size sliding window of length `k` using a frequency map to track element counts and the number of distinct elements currently in the window, along with a running window sum. As the window slides one position at a time (add the incoming element, remove the outgoing element once the window exceeds length `k`), whenever the window is fully length `k` and has at least `m` distinct elements, compare its sum against the running maximum.

## C# Solution

```csharp
public class Solution 
{
    public long MaxSum(IList<int> nums, int m, int k) 
    {
        var freq = new Dictionary<int, int>();
        long windowSum = 0;
        long best = 0;
        int distinct = 0;

        for (int i = 0; i < nums.Count; i++) 
        {
            int val = nums[i];
            windowSum += val;
            freq[val] = freq.GetValueOrDefault(val, 0) + 1;
            if (freq[val] == 1) distinct++;

            if (i >= k) 
            {
                int outVal = nums[i - k];
                windowSum -= outVal;
                freq[outVal]--;
                if (freq[outVal] == 0) 
                {
                    distinct--;
                    freq.Remove(outVal);
                }
            }

            if (i >= k - 1 && distinct >= m) 
            {
                best = Math.Max(best, windowSum);
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(k)
